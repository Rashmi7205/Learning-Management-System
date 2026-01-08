import Razorpay from "razorpay";
import crypto from "crypto";
import { Course, Enrollment, Progress } from "../models/course.model.js";
import  User, { Instructor } from "../models/user.model.js";
import Order from "../models/order.model.js";
import AppError from "../utils/user.error.js";
import mongoose from "mongoose";
import { generateOrderNumber } from "../utils/generateOrderNumber.js";
import ApiResponse from "../utils/apiResponse.js";
import { Payment } from "../models/payment.model.js";



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Validate course ID
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return AppError(res, "Invalid course ID", 400);
    }

    // Fetch course
    const course = await Course.findById(courseId)
      .populate("instructor", "user")
      .select("title price discountPrice isFree status instructor");

    if (!course) {
      return AppError(res, "Course not found", 404);
    }

    // Check if course is published
    if (course.status !== "published") {
      return AppError(res, "Course is not available for purchase", 400);
    }

    // Check if course is free
    if (course.isFree) {
      return AppError(res, "This is a free course, no payment required", 400);
    }

    // Check if user already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (existingEnrollment) {
      return AppError(res, "You are already enrolled in this course", 400);
    }

    // Check for pending/paid orders
    const existingOrder = await Order.findOne({
      user: userId,
      course: courseId,
      status: { $in: ["pending", "paid"] },
    });

    if (existingOrder) {
      if (existingOrder.status === "paid") {
        return AppError(res, "You have already purchased this course", 400);
      }
      // Return existing pending order
      return ApiResponse(res, {
        statusCode: 200,
        message: "Pending order found",
        data: existingOrder,
      });
    }

    // Fetch user details
    const user = await User.findById(userId).select(
      "email firstName lastName country"
    );

    // Calculate pricing
    let originalPrice = course.discountPrice || course.price;
    let discountAmount = course.price - originalPrice;


    // Calculate total
    const subtotal = originalPrice;
    const taxAmount = (subtotal * 0.18).toFixed(2); // 18% tax
    const totalAmount = (subtotal + parseFloat(taxAmount)).toFixed(2);

    const orderNumber = generateOrderNumber();

    // Create order
    const order = await Order.create({
      user: userId,
      course: courseId,
      originalPrice: course.price,
      discountAmount,
      taxAmount: parseFloat(taxAmount),
      totalAmount: parseFloat(totalAmount),
      currency: "INR",
      status: "pending",
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      orderNumber,
      userSnapshot: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
      },
      courseSnapshot: {
        title: course.title,
        instructor: course.instructor._id,
        price: course.price,
      },
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        source: "web",
      },
    });

    return ApiResponse(res, {
      statusCode: 201,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return AppError(res, "Failed to create order", 500);
  }
};



export const initializeRazorpayPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const userId = req.user.id;

    // Validate order
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return AppError(res, "Invalid order ID", 400);
    }

    const order = await Order.findById(orderId).populate("course", "title");

    if (!order) {
      return AppError(res, "Order not found", 404);
    }

    if (order.user.toString() !== userId) {
      return AppError(res, "Unauthorized access", 403);
    }

    if (order.status === "paid") {
      return AppError(res, "Order already paid", 400);
    }

    if (order.isExpired()) {
      order.status = "cancelled";
      await order.save();
      return AppError(res, "Order has expired", 400);
    }

    // Create Razorpay Order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.totalAmount * 100), // Convert to paise
      currency: order.currency,
      receipt: order.orderNumber,
      notes: {
        orderId: order._id.toString(),
        userId: userId.toString(),
        courseId: order.course._id.toString(),
      },
    });

    // Create payment record
    const payment = await Payment.create({
      order: order._id,
      user: userId,
      provider: "razorpay",
      paymentId: razorpayOrder.id,
      amount: order.totalAmount,
      currency: order.currency,
      status: "pending",
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    // Update order
    order.paymentIntentId = razorpayOrder.id;
    order.status = "processing";
    await order.save();

    return ApiResponse(res, {
      statusCode: 200,
      message: "Payment initialized successfully",
      data: {
        razorpayOrderId: razorpayOrder.id,
        orderId: order._id,
        amount: order.totalAmount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error("Initialize Razorpay payment error:", error);
    return AppError(res, "Failed to initialize payment", 500);
  }
};
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    const userId = req.user.id;

    // Validate inputs
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return AppError(res, "Missing payment verification details", 400);
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return AppError(res, "Invalid payment signature", 400);
    }

    // Fetch order
    const order = await Order.findById(orderId);

    if (!order) {
      return AppError(res, "Order not found", 404);
    }

    if (order.user.toString() !== userId) {
      return AppError(res, "Unauthorized access", 403);
    }

    // Fetch payment from Razorpay
    const razorpayPayment = await razorpay.payments.fetch(razorpay_payment_id);

    // Update payment record
    const payment = await Payment.findOne({
      order: order._id,
      paymentId: razorpay_order_id,
    });

    if (!payment) {
      return AppError(res, "Payment record not found", 404);
    }

    payment.status = "succeeded";
    payment.transactionId = razorpay_payment_id;
    payment.capturedAt = new Date();
    payment.webhookVerified = true;
    payment.paymentMethod = {
      type: razorpayPayment.method,
      ...razorpayPayment.card,
    };
    await payment.save();

    // Update order
    order.status = "paid";
    order.paymentStatus = "captured";
    order.paidAt = new Date();
    await order.save();

    // Create enrollment
    const enrollment = await Enrollment.create({
      user: userId,
      course: order.course,
      enrolledAt: new Date(),
    });

    // Create initial progress
    await Progress.create({
      user: userId,
      course: order.course,
      progressPercentage: 0,
      completedLectures: [],
    });

    // Update course stats
    await Course.findByIdAndUpdate(order.course, {
      $inc: { totalStudents: 1 },
    });

    // Update instructor stats
    await Instructor.findByIdAndUpdate(order.courseSnapshot.instructor, {
      $inc: {
        totalStudents: 1,
        totalEarnings: order.totalAmount,
      },
    });

    // Update user stats
    await User.findByIdAndUpdate(userId, {
      $inc: { totalCoursesEnrolled: 1 },
    });



    // Send confirmation email

    return ApiResponse(res, {
      statusCode: 200,
      message: "Payment verified and course enrolled successfully",
      data: {
        orderId: order._id,
        paymentId: payment._id,
        enrollmentId: enrollment._id,
        courseId: order.course,
      },
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return AppError(res, "Payment verification failed", 500);
  }
};

