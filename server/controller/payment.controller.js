import Razorpay from "razorpay";
import crypto from "crypto";
import { Course, Enrollment, Progress } from "../models/course.model.js";
import User, { Instructor } from "../models/user.model.js";
import Order from "../models/order.model.js";
import AppError from "../utils/user.error.js";
import { generateOrderNumber } from "../utils/generateOrderNumber.js";
import ApiResponse from "../utils/apiResponse.js";
import { Payment } from "../models/payment.model.js";
import mongoose from "mongoose";



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrderAndInitializePayment = async (req, res) => {
  try {
    const { courseIds } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!Array.isArray(courseIds) || courseIds.length === 0) {
      return AppError(res, "Please provide at least one course", 400);
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

    const order = await Order.create({
      user: userId,
      items: orderItems,
      subtotal: subtotal,
      totalDiscount: totalDiscount,
      totalAmount: totalAmount,
      currency: "INR",
      status: "processing",
      paymentIntentId: razorpayOrder.id,
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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    const userId = req.user.id;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await session.abortTransaction();
      return AppError(res, "Invalid payment signature", 400);
    }

    const order = await Order.findById(orderId).session(session);
    if (!order) {
      await session.abortTransaction();
      return AppError(res, "Order not found", 404);
    }

    const payment = await Payment.findOne({ order: order._id, paymentId: razorpay_order_id }).session(session);
    if (!payment) {
      await session.abortTransaction();
      return AppError(res, "Payment record not found", 404);
    }
    const razorpayPayment = await razorpay.payments.fetch(razorpay_payment_id);

    payment.status = "succeeded";
    payment.transactionId = razorpay_payment_id;
    payment.capturedAt = new Date();
    await payment.save({ session });

    order.status = "paid";
    order.paymentStatus = "captured";
    order.paidAt = new Date();
    await order.save({ session });

    const enrollmentIds = [];
    for (const item of order.items) {
      const existing = await Enrollment.findOne({ user: userId, course: item.course }).session(session);

      if (!existing) {
        const [newEnrollment] = await Enrollment.create([{
          user: userId,
          course: item.course,
          order: order._id,
          enrolledAt: new Date(),
        }], { session });

        enrollmentIds.push(newEnrollment._id);

        await Progress.create([{
          user: userId,
          course: item.course,
          progressPercentage: 0,
        }], { session });

        await Course.findByIdAndUpdate(item.course, { $inc: { totalStudents: 1 } }, { session });

        await Instructor.findByIdAndUpdate(item.courseSnapshot.instructor, {
          $inc: { totalStudents: 1, totalEarnings: item.finalPrice },
        }, { session });
      }
    }

    await User.findByIdAndUpdate(userId, {
      $inc: { totalCoursesEnrolled: enrollmentIds.length },
    }, { session });

    // 5. Commit all changes
    await session.commitTransaction();
    session.endSession();

    return ApiResponse(res, {
      statusCode: 200,
      message: "Payment verified and course access granted.",
      data: { orderId: order._id, enrollmentIds },
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Transaction Aborted. Error:", error);
    return AppError(res, "Payment verification failed. Changes rolled back.", 500);
  }
};