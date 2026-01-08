import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    provider: {
      type: String,
      required: true,
      enum: ["stripe", "razorpay"],
      index: true,
    },
    paymentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    transactionId: {
      type: String,
      index: true,
    },
    paymentIntentId: String,
    chargeId: String,
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      default: "INR",
    },
    status: {
      type: String,
      required: true,
      enum: [
        "pending",
        "processing",
        "authorized",
        "captured",
        "succeeded",
        "failed",
        "cancelled",
        "refunded",
        "partially_refunded",
      ],
      default: "pending",
      index: true,
    },
    paymentMethod: {
      type: {
        type: String,
      },
      last4: String,
      brand: String,
      expiryMonth: String,
      expiryYear: String,
      cardType: String,
      bankName: String,
      walletName: String,
    },

    authorizedAt: Date,
    capturedAt: Date,
    failedAt: Date,
    refundedAt: Date,

    failureCode: String,
    failureMessage: String,
    failureReason: String,

    refunds: [
      {
        refundId: String,
        amount: Number,
        reason: String,
        status: String,
        processedAt: Date,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    totalRefunded: {
      type: Number,
      default: 0,
      min: 0,
    },

    providerResponse: {
      type: String,
      select: false,
    },

    // Security
    signature: {
      type: String,
      select: false,
    },
    webhookVerified: {
      type: Boolean,
      default: false,
    },

    // Metadata
    metadata: {
      ipAddress: String,
      userAgent: String,
      country: String,
      riskScore: Number,
      fraudStatus: {
        type: String,
        enum: ["safe", "flagged", "blocked"],
        default: "safe",
      },
    },

    // Receipt
    receiptUrl: String,
    receiptNumber: String,

    platformFee: Number,
    processingFee: Number,
    instructorPayout: Number,

    webhookEvents: [
      {
        event: String,
        receivedAt: Date,
        processed: Boolean,
      },
    ],

    notes: String,
    internalNotes: {
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

// Indexes
paymentSchema.index({ order: 1 });
paymentSchema.index({ user: 1, status: 1 });
paymentSchema.index({ paymentId: 1 }, { unique: true });
paymentSchema.index({ provider: 1, status: 1 });
paymentSchema.index({ createdAt: -1 });

// Virtual for net amount (after refunds)
paymentSchema.virtual("netAmount").get(function () {
  return this.amount - (this.totalRefunded || 0);
});

// Method to check if payment is successful
paymentSchema.methods.isSuccessful = function () {
  return ["succeeded", "captured", "authorized"].includes(this.status);
};

// Method to check if refundable
paymentSchema.methods.isRefundable = function () {
  return (
    this.isSuccessful() &&
    this.totalRefunded < this.amount &&
    !this.refundedAt
  );
};

export const Payment = mongoose.model("Payment", paymentSchema);