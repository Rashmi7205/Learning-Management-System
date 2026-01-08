import mongoose from "mongoose";
import crypto from "crypto";

const orderSchema = new mongoose.Schema(
  {
    // User & Course
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    course: {  // Fixed typo: "courese" -> "course"
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    // Order Details
    orderNumber: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    // Pricing Information
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    couponCode: {
      type: String,
      uppercase: true,
      trim: true,
    },
    couponDiscount: {
      type: Number,
      default: 0,
      min: 0,
    },
    taxAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "USD",
      uppercase: true,
    },

    // Status & Tracking
    status: {
      type: String,
      enum: ["pending", "processing", "paid", "failed", "cancelled", "refunded"],
      default: "pending",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "authorized", "captured", "failed", "refunded"],
      default: "pending",
    },

    // Payment Intent (for Stripe, Razorpay, etc.)
    paymentIntentId: {
      type: String,
      select: false, // Don't expose by default
    },

    // Timestamps
    paidAt: Date,
    cancelledAt: Date,
    refundedAt: Date,
    expiresAt: {
      type: Date,
      index: true,
    },

    // User Information Snapshot (for records)
    userSnapshot: {
      email: String,
      firstName: String,
      lastName: String,
      country: String,
    },

    // Course Information Snapshot
    courseSnapshot: {
      title: String,
      instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
      },
      price: Number,
    },

    // Refund Information
    refund: {
      reason: String,
      amount: Number,
      requestedAt: Date,
      approvedAt: Date,
      processedAt: Date,
      rejectedAt: Date,
      rejectionReason: String,
      status: {
        type: String,
        enum: ["none", "requested", "approved", "rejected", "processed"],
        default: "none",
      },
    },

    // Metadata
    metadata: {
      ipAddress: String,
      userAgent: String,
      deviceType: String,
      source: String, // 'web', 'mobile', 'api'
    },

    // Idempotency (prevent duplicate orders)
    idempotencyKey: {
      type: String,
      unique: true,
      sparse: true,
      select: false,
    },

    // Invoice
    invoiceNumber: String,
    invoiceUrl: String,

    // Notes
    notes: String,
    adminNotes: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance
orderSchema.index({ user: 1, status: 1 });
orderSchema.index({ course: 1, status: 1 });
orderSchema.index({ orderNumber: 1 }, { unique: true });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual for payment
orderSchema.virtual("payment", {
  ref: "Payment",
  localField: "_id",
  foreignField: "order",
  justOne: true,
});


// Check if order is expired (instance)
orderSchema.methods.isExpired = function () {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
};

const Order = mongoose.model("Order", orderSchema);
export default Order;