import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
    {
        // Identity
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        phone: String,

        // Auth
        password: {
            type: String,
            required: function () {
                return this.authProvider === "local";
            },
            select: false,
        },
        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
        },
        lastLoginAt: Date,

        // Roles & Access
        role: {
            type: String,
            enum: ["student", "instructor", "admin"],
            default: "student",
        },
        isActive: { type: Boolean, default: true },

        // Profile
        avatar: {
            publicId: String,
            secureUrl: String,
        },
        bio: String,
        gender: String,
        dob: Date,
        country: String,

        // Verification
        emailVerified: { type: Boolean, default: false },
        phoneVerified: { type: Boolean, default: false },
        verificationToken: {
            type:String,
            select:false,
        },
        verificationExpiry: {
            type: String,
            select: false,
        },

        // Security
        resetPasswordToken: {
            type: String,
            select: false,
        },
        resetPasswordOtp: {
            type: String,
            select: false,
        },
        resetPasswordExpiry: {
            type: String,
            select: false,
        },
        lockUntil: Date,

        // Preferences
        notificationSettings: { type: Object, default: {} },
        darkMode: { type: Boolean, default: false },

        // Analytics
        totalCoursesEnrolled: { type: Number, default: 0 },
        totalCoursesCompleted: { type: Number, default: 0 },
        totalLearningTime: { type: Number, default: 0 },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.generateJWTtoken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY,
        }
    );
};

userSchema.methods.comparePassword = async function (plainTextPassword) {
    return bcrypt.compare(plainTextPassword, this.password);
};

userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    return resetToken;
};

const User = model("User", userSchema);

const instructorSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Professional
        title: String,
        expertise: [String],
        yearsOfExperience: Number,
        education: String,
        certifications: [String],

        // Public Profile
        website: String,
        linkedin: String,
        twitter: String,
        youtube: String,

        // Ratings
        rating: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 },
        totalStudents: { type: Number, default: 0 },
        totalCourses: { type: Number, default: 0 },

        // Earnings
        totalEarnings: { type: Number, default: 0 },
        pendingPayout: { type: Number, default: 0 },
        payoutMethod: String,
        payoutDetails: Object,

        // Compliance
        identityVerified: { type: Boolean, default: false }, 
        taxId: String,
        agreementAcceptedAt: Date,

        // Status
        isFeatured: { type: Boolean, default: false },
        isSuspended: { type: Boolean, default: false },
        suspensionReason: String,
    },
    { timestamps: true }
);

export const Instructor = model("Instructor", instructorSchema);
export default User;