import Razorpay from "razorpay";
import crypto from "crypto";
import { Course, Enrollment, Progress } from "../models/course.model.js";
import User, { Instructor } from "../models/user.model.js";
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

export const createOrderAndInitializePayment = async (req, res) => {
  try {
    const { courseIds } = req.body; // Array of course IDs
    const userId = req.user.id;

    // Validate input
    if (!Array.isArray(courseIds) || courseIds.length === 0) {
      return AppError(res, "Please provide at least one course", 400);
    }

    // Validate all course IDs
    const invalidIds = courseIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return AppError(res, "Invalid course ID(s) provided", 400);
    }

    // Fetch all courses
    const courses = await Course.find({
      _id: { $in: courseIds },
      status: "published"
    })
      .populate("instructor", "user")
      .select("title price discountPrice isFree status instructor");

    if (courses.length === 0) {
      return AppError(res, "No valid courses found", 404);
    }

    if (courses.length !== courseIds.length) {
      return AppError(res, "Some courses are not available", 400);
    }

    // Check for free courses
    const freeCourses = courses.filter(course => course.isFree);
    if (freeCourses.length > 0) {
      return AppError(
        res,
        `Cannot purchase free courses: ${freeCourses.map(c => c.title).join(", ")}`,
        400
      );
    }

    // Check existing enrollments
    const existingEnrollments = await Enrollment.find({
      user: userId,
      course: { $in: courseIds }
    }).select("course");

    if (existingEnrollments.length > 0) {
      const enrolledCourseIds = existingEnrollments.map(e => e.course.toString());
      const enrolledCourses = courses
        .filter(c => enrolledCourseIds.includes(c._id.toString()))
        .map(c => c.title);

      return AppError(
        res,
        `Already enrolled in: ${enrolledCourses.join(", ")}`,
        400
      );
    }

    // Check for existing pending/paid orders
    const existingOrders = await Order.find({
      user: userId,
      status: { $in: ["pending", "processing", "paid"] }
    }).populate("items.course", "title");

    const existingCourseIds = new Set();
    existingOrders.forEach(order => {
      order.items.forEach(item => {
        if (courseIds.includes(item.course._id.toString())) {
          existingCourseIds.add(item.course._id.toString());
        }
      });
    });

    if (existingCourseIds.size > 0) {
      const existingCourses = courses
        .filter(c => existingCourseIds.has(c._id.toString()))
        .map(c => c.title);

      return AppError(
        res,
        `Already have pending/paid order for: ${existingCourses.join(", ")}`,
        400
      );
    }

    // Fetch user details
    const user = await User.findById(userId).select(
      "email firstName lastName country"
    );

    // Calculate pricing for each course
    const orderItems = courses.map(course => {
      const originalPrice = course.price;
      const finalPrice = course.discountPrice || course.price;
      const discountAmount = originalPrice - finalPrice;

      return {
        course: course._id,
        originalPrice,
        discountAmount,
        finalPrice,
        courseSnapshot: {
          title: course.title,
          instructor: course.instructor._id,
          price: course.price,
        }
      };
    });

    // Calculate order totals
    const subtotal = orderItems.reduce((sum, item) => sum + item.finalPrice, 0);
    const totalDiscount = orderItems.reduce((sum, item) => sum + item.discountAmount, 0);
    const totalAmount = parseFloat((subtotal).toFixed(2));

    const orderNumber = generateOrderNumber();

    // Create Razorpay Order first (before DB order)
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: orderNumber,
      notes: {
        userId: userId.toString(),
        courseCount: courses.length,
        courseIds: courseIds.join(","),
      },
    });

    // Create order in database
    const order = await Order.create({
      user: userId,
      items: orderItems,
      subtotal,
      totalDiscount,
      totalAmount,
      currency: "INR",
      status: "processing",
      paymentIntentId: razorpayOrder.id,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      orderNumber,
      userSnapshot: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
      },
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        source: "web",
      },
    });

    // Create payment record
    await Payment.create({
      order: order._id,
      user: userId,
      provider: "razorpay",
      paymentId: razorpayOrder.id,
      amount: totalAmount,
      currency: "INR",
      status: "pending",
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
      },
    });

    // Prepare response data
    const responseData = {
      orderId: order._id,
      orderNumber: order.orderNumber,
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
      courses: courses.map(c => ({
        id: c._id,
        title: c.title,
        price: c.price,
        discountPrice: c.discountPrice,
      })),
      pricing: {
        subtotal,
        discount: totalDiscount,
        total: totalAmount,
      },
      expiresAt: order.expiresAt,
    };

    return ApiResponse(res, {
      statusCode: 201,
      message: "Order created and payment initialized successfully",
      data: responseData,
    });

  } catch (error) {
    console.error("Create order and initialize payment error:", error);
    if (error.error && error.error.description) {
      return AppError(res, `Payment gateway error: ${error.error.description}`, 500);
    }

    return AppError(res, "Failed to process order", 500);
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
