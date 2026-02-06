import mongoose, { model, Schema } from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    description: String,
    whatYouWillLearn: [String],
    requirements: [String],

    // Ownership
    instructor: {
      type: mongoose.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },

    category: [String],

    // Media
    thumbnail: {
      publicId: String,
      secureUrl: String,
    },
    promoVideo: {
      publicId: String,
      secureUrl: String,
    },

    // Pricing
    price: Number,
    discountPrice: Number,
    currency: String,
    isFree: Boolean,

    // Content Stats
    totalSections: Number,
    totalLectures: Number,
    totalDuration: Number,

    // Ratings
    rating: Number,
    totalReviews: Number,

    // Publishing
    status: {
      type: String,
      enum: ["draft", "review", "published", "rejected"],
    },
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
  },
  { timestamps: true },
);

const sectionSchema = new mongoose.Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: String,
    description: String,
    order: Number,
    totalLectures: Number,
    totalDuration: Number,
    isFreePreview: Boolean,
  },
  { timestamps: true },
);

const lectureSchema = new mongoose.Schema(
  {
    section: { type: Schema.Types.ObjectId, ref: "Section" },
    title: String,
    description: String,

    // Media
    videoUrl: {
      publicId: String,
      secureUrl: String,
    },
    videoProvider: String,
    duration: Number,

    // Resources
    attachments: [
      {
        filename: String,
        publicId: String,
        secureUrl: String,
      },
    ],

    // Access
    isPreview: Boolean,
    isDownloadable: Boolean,

    order: Number,
  },
  { timestamps: true },
);

const enrollmentSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },

    enrolledAt: Date,
    expiresAt: Date,

    // Status
    isCompleted: Boolean,
    completedAt: Date,

    // Certificates
    certificateIssued: Boolean,
  },
  { timestamps: true },
);

const reviewSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },

    rating: Number,
    title: String,
    comment: String,

    // Moderation
    isApproved: Boolean,
  },
  { timestamps: true },
);

const progressSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },

    completedLectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
    lastAccessedLecture: { type: Schema.Types.ObjectId, ref: "Lecture" },

    progressPercentage: Number,
    totalWatchTime: Number,
    lastAccessedAt: Date,
  },
  { timestamps: true },
);

const certificateSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },

    certificateId: String,
    certificateUrl: {
      publicId: String,
      secureUrl: String,
    },
    certificateId: String,
    issuedAt: Date,
  },
  { timestamps: true },
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
const Section =
  mongoose.models.Section || mongoose.model("Section", sectionSchema);
const Enrollment =
  mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);
const Lecture =
  mongoose.models.Lecture || mongoose.model("Lecture", lectureSchema);

const Review =
  mongoose.models.Review || mongoose.model("reviews", reviewSchema);
const Progress =
  mongoose.models.Progress || mongoose.model("progresses", progressSchema);
const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("certificates", certificateSchema);
export { Course, Section, Enrollment, Lecture, Review, Progress, Certificate };
