import mongoose, { model, Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
  // Basic
  title: String,
  subtitle: String,
  description: String,
whatYouWillLearn: [String],
  requirements: [String],

  // Ownership
  instructor: {
    type: mongoose.Types.ObjectId,
    ref: "Instructor",
  },

  category: [String],

  // Media
  thumbnail: String,
  promoVideo: String,

  // Pricing
  price: Number,
  discountPrice: Number,
  currency: String,
  isFree: Boolean,
  subscriptionIncluded: Boolean,

  // Content Stats
  totalSections: Number,
  totalLectures: Number,
  totalDuration: Number,

  // Ratings
  rating: Number,
  totalReviews: Number,

  // Publishing
  status: { type: String, enum: ["draft", "review", "published", "rejected"] },
  publishedAt: Date,
  //seo
  slug: {
    type: String,
  },
  // Marketing
  isFeatured: Boolean,
  bestseller: Boolean,
  previewLectures: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lecture",
    },
  ],
  // Admin
  isArchived: Boolean,
  archivedAt: Date,
}, { timestamps: true });

const sectionSchema = new mongoose.Schema({
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  title: String,
  description: String,
  order: Number,
  totalLectures: Number,
  totalDuration: Number,
  isFreePreview: Boolean,
}, { timestamps: true });

const lectureSchema = new mongoose.Schema({
  section: { type: Schema.Types.ObjectId, ref: "Section" },
  title: String,
  description: String,

  // Media
  videoUrl: String,
  videoProvider: String,
  duration: Number,

  // Resources
  attachments: [String],

  // Access
  isPreview: Boolean,
  isDownloadable: Boolean,

  order: Number,
}, { timestamps: true });


const enrollmentSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  course: { type: Schema.Types.ObjectId, ref: "Course" },

  enrolledAt: Date,
  expiresAt: Date,

  // Status
  isCompleted: Boolean,
  completedAt: Date,

  // Certificates
  certificateIssued: Boolean,
}, { timestamps: true });

const reviewSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  course: { type: Schema.Types.ObjectId, ref: "Course" },

  rating: Number,
  title: String,
  comment: String,

  // Moderation
  isApproved: Boolean,

}, { timestamps: true });

const progressSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  course: { type: Schema.Types.ObjectId, ref: "Course" },

  completedLectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
  lastAccessedLecture: { type: Schema.Types.ObjectId, ref: "Lecture" },

  progressPercentage: Number,
  totalWatchTime: Number,
  lastAccessedAt: Date,
}, { timestamps: true });

const certificateSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  course: { type: Schema.Types.ObjectId, ref: "Course" },

  certificateId: String,
  certificateUrl: String,
  issuedAt: Date,
}, { timestamps: true });


export const Course = model("courses", courseSchema);
export const Section = model("section", sectionSchema);
export const Lecture = model("lectures", lectureSchema);
export const Enrollment = model("enrollments", enrollmentSchema);
export const Review = model("reviews", reviewSchema);
export const Progress = model("progresses", progressSchema);
export const  Certificate = model("certificates", certificateSchema);