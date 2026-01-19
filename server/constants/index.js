/**
 * Global constants for DB schema validations
 * LMS Platform (Udemy-like)
 */

export const USER_ROLES = Object.freeze({
  STUDENT: "student",
  INSTRUCTOR: "instructor",
  ADMIN: "admin",
});

/* =========================
   COURSE RELATED CONSTANTS
========================= */

export const COURSE_STATUS = Object.freeze({
  DRAFT: "draft",
  REVIEW: "review",
  PUBLISHED: "published",
  REJECTED: "rejected",
});

export const COURSE_LEVELS = Object.freeze({
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
});

export const COURSE_CURRENCIES = Object.freeze({
  INR: "INR",
  USD: "USD",
  EUR: "EUR",
});

export const COURSE_DEFAULTS = Object.freeze({
  PRICE: 0,
  RATING: 0,
  TOTAL_REVIEWS: 0,
  TOTAL_SECTIONS: 0,
  TOTAL_LECTURES: 0,
  TOTAL_DURATION: 0,
});

/* =========================
   CATEGORY & TAGS
========================= */

export const CATEGORY_LIMITS = Object.freeze({
  MIN: 1,
  MAX: 5,
});

export const TAG_LIMITS = Object.freeze({
  MIN: 0,
  MAX: 10,
});

/* =========================
   MEDIA VALIDATIONS
========================= */

export const MEDIA_TYPES = Object.freeze({
  IMAGE: ["image/jpeg", "image/png", "image/webp"],
  VIDEO: ["video/mp4", "video/webm", "video/mkv"],
});

export const MEDIA_SIZE_LIMITS = Object.freeze({
  THUMBNAIL_MB: 5,
  PROMO_VIDEO_MB: 200,
  LECTURE_VIDEO_MB: 1024,
});

/* =========================
   PRICING & DISCOUNTS
========================= */

export const PRICING_RULES = Object.freeze({
  MIN_PRICE: 0,
  MAX_PRICE: 100000,
  MAX_DISCOUNT_PERCENT: 90,
});

/* =========================
   LECTURE & SECTION
========================= */

export const SECTION_LIMITS = Object.freeze({
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 120,
});

export const LECTURE_LIMITS = Object.freeze({
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 150,
  MIN_DURATION_SEC: 30,
});

/* =========================
   RATINGS & REVIEWS
========================= */

export const RATING_RULES = Object.freeze({
  MIN: 1,
  MAX: 5,
});

export const REVIEW_LIMITS = Object.freeze({
  MIN_LENGTH: 5,
  MAX_LENGTH: 1000,
});

/* =========================
   ENROLLMENT
========================= */

export const ENROLLMENT_SOURCES = Object.freeze({
  DIRECT: "direct",
  COUPON: "coupon",
  SUBSCRIPTION: "subscription",
});

/* =========================
   SEO
========================= */

export const SEO_LIMITS = Object.freeze({
  SLUG_MAX_LENGTH: 120,
  META_TITLE_MAX: 60,
  META_DESC_MAX: 160,
});

/* =========================
   SYSTEM / ADMIN
========================= */

export const SYSTEM_FLAGS = Object.freeze({
  ACTIVE: true,
  INACTIVE: false,
});

/* =========================
   COMMON REGEX
========================= */

export const REGEX = Object.freeze({
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  OBJECT_ID: /^[0-9a-fA-F]{24}$/,
});

/* =========================
   ERROR MESSAGES (OPTIONAL)
========================= */

export const ERROR_MESSAGES = Object.freeze({
  /* =========================
     COMMON / SYSTEM
  ========================= */
  INVALID_EMAIL: "Invalid email format",
  INVALID_OBJECT_ID: "Invalid ID format",
  REQUIRED_FIELD: "Required field is missing",
  INVALID_DATA_TYPE: "Invalid data type",
  NOT_FOUND: "Resource not found",
  ALREADY_EXISTS: "Resource already exists",
  OPERATION_FAILED: "Internal Server Error",
  INCORRECT_PASS_OR_USERNAME: "Invalid credentials",

  UNAUTHORIZED: "You are not authorized to perform this action",
  FORBIDDEN: "Access forbidden",
  SESSION_EXPIRED: "Session expired, please login again",

  /* =========================
     COURSE VALIDATIONS
  ========================= */

  COURSE_TITLE_REQUIRED: "Course title is required",
  COURSE_TITLE_LENGTH: "Course title length is invalid",
  COURSE_SUBTITLE_LENGTH: "Course subtitle length is invalid",
  COURSE_DESCRIPTION_REQUIRED: "Course description is required",

  COURSE_LEARNING_OUTCOMES_REQUIRED:
    "At least one learning outcome is required",

  COURSE_REQUIREMENTS_REQUIRED: "At least one course requirement is required",

  COURSE_CATEGORY_REQUIRED: "At least one category is required",

  INVALID_STATUS: "Invalid course status value",
  COURSE_NOT_PUBLISHED: "Course is not published",
  COURSE_ALREADY_PUBLISHED: "Course is already published",

  INVALID_PRICE: "Invalid course price",
  INVALID_DISCOUNT: "Invalid discount price",
  DISCOUNT_GREATER_THAN_PRICE:
    "Discount price cannot be greater than course price",

  INVALID_CURRENCY: "Invalid currency value",

  COURSE_SLUG_INVALID:
    "Invalid slug format (only lowercase letters, numbers and hyphens allowed)",
  COURSE_SLUG_ALREADY_EXISTS: "Course slug already exists",

  COURSE_ARCHIVED: "Course is archived",
  COURSE_NOT_ARCHIVED: "Course is not archived",

  /* =========================
     SECTION VALIDATIONS
  ========================= */

  SECTION_TITLE_REQUIRED: "Section title is required",
  SECTION_TITLE_LENGTH: "Section title length is invalid",
  SECTION_ORDER_INVALID: "Invalid section order value",
  SECTION_COURSE_REQUIRED: "Section must belong to a course",

  /* =========================
     LECTURE VALIDATIONS
  ========================= */

  LECTURE_TITLE_REQUIRED: "Lecture title is required",
  LECTURE_TITLE_LENGTH: "Lecture title length is invalid",
  LECTURE_DURATION_INVALID: "Lecture duration is invalid",
  LECTURE_VIDEO_REQUIRED: "Lecture video URL is required",

  LECTURE_SECTION_REQUIRED: "Lecture must belong to a section",
  LECTURE_ORDER_INVALID: "Invalid lecture order value",

  /* =========================
     ENROLLMENT VALIDATIONS
  ========================= */

  ENROLLMENT_ALREADY_EXISTS: "User already enrolled in this course",
  ENROLLMENT_NOT_FOUND: "Enrollment not found",
  ENROLLMENT_EXPIRED: "Enrollment has expired",
  ENROLLMENT_REQUIRED: "User must be enrolled to access this course",

  /* =========================
     REVIEW & RATING VALIDATIONS
  ========================= */

  REVIEW_ALREADY_EXISTS: "You have already reviewed this course",
  REVIEW_NOT_FOUND: "Review not found",

  INVALID_RATING: "Rating must be between 1 and 5",
  REVIEW_TITLE_LENGTH: "Review title length is invalid",
  REVIEW_COMMENT_LENGTH: "Review comment must be within allowed length",

  REVIEW_NOT_APPROVED: "Review is pending approval by admin",

  /* =========================
     PROGRESS VALIDATIONS
  ========================= */

  PROGRESS_NOT_FOUND: "Progress record not found",
  INVALID_PROGRESS_PERCENTAGE: "Progress percentage must be between 0 and 100",

  INVALID_LECTURE_PROGRESS: "Lecture progress data is invalid",

  /* =========================
     CERTIFICATE VALIDATIONS
  ========================= */

  CERTIFICATE_NOT_FOUND: "Certificate not found",
  CERTIFICATE_ALREADY_ISSUED: "Certificate already issued for this course",

  CERTIFICATE_NOT_ELIGIBLE:
    "Course completion required to generate certificate",

  /* =========================
     MEDIA / FILE VALIDATIONS
  ========================= */

  INVALID_MEDIA_TYPE: "Invalid media file type",
  MEDIA_SIZE_EXCEEDED: "Media file size exceeded limit",
  MEDIA_UPLOAD_FAILED: "Media upload failed",

  /* =========================
     PUBLISHING & WORKFLOW
  ========================= */

  COURSE_NOT_READY_FOR_PUBLISH: "Course is not ready for publishing",
  COURSE_REJECTED: "Course has been rejected by admin",

  /* =========================
     SEARCH / FILTER
  ========================= */

  INVALID_SEARCH_QUERY: "Invalid search query",
  INVALID_FILTER_PARAMS: "Invalid filter parameters",
});
