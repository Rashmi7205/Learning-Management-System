// User & Auth Types
export interface Avatar {
  publicId: string;
  secureUrl: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string;
  authProvider: "local" | "google";
  lastLoginAt?: Date;
  role: "student" | "instructor" | "admin";
  isActive: boolean;
  avatar?: Avatar;
  bio?: string;
  gender?: string;
  dob?: Date;
  country?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  notificationSettings?: Record<string, any>;
  darkMode: boolean;
  totalCoursesEnrolled: number;
  totalCoursesCompleted: number;
  totalLearningTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeaturedInstructor {
  _id: string;
  user: {
    avatar: {
      publicId: string;
      secureUrl: string;
    };
    _id: string;
    firstName: string;
    lastName: string;
  };
  title: string;
  website: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  rating: number;
  totalReviews: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Instructor {
  _id: string;
  user: {
    avatar?: {
      publicId?: string;
      secureUrl?: string;
    };
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    bio?: string;
    phone?: string;
    office?: string;
  };
  title?: string;
  expertise?: string[];
  yearsOfExperience?: number;
  education?: string;
  certifications?: string[];
  website?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  rating: number;
  totalReviews?: number;
  totalStudents?: number;
  totalCourses?: number;
  totalEarnings?: number;
  pendingPayout?: number;
  payoutMethod?: string;
  identityVerified?: boolean;
  isFeatured?: boolean;
  isSuspended?: boolean;
  suspensionReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Course Types
export interface Media {
  publicId: string;
  secureUrl: string;
}

export interface Attachment {
  filename: string;
  publicId: string;
  secureUrl: string;
}

export interface Lecture {
  _id: string;
  section?: string;
  title: string;
  description?: string;
  videoUrl?: Media;
  videoProvider?: string;
  duration?: number;
  attachments?: Attachment[];
  isPreview?: boolean;
  isDownloadable?: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Section {
  _id: string;
  course?: string;
  title: string;
  description?: string;
  order?: number;
  totalLectures?: number;
  totalDuration?: number;
  isFreePreview?: boolean;
  lectures?: Lecture[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Course {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  whatYouWillLearn: string[];
  requirements: string[];
  instructor: Instructor;
  category: string[];
  thumbnail?: Media;
  promoVideo?: Media;
  price: number;
  discountPrice?: number;
  currency?: string;
  status?: "draft" | "review" | "published" | "rejected";
  isFree?: boolean;
  totalSections?: number;
  totalLectures?: number;
  totalDuration?: number;
  rating?: number;
  totalReviews?: number;
  publishedAt?: Date;
  slug?: string;
  isFeatured?: boolean;
  bestseller?: boolean;
  previewLectures?: string[];
  isArchived?: boolean;
  archivedAt?: Date;
  createdAt?: string;
  updatedAt?: string;
}

// Extended interface for course details with populated sections
export interface CourseDetailsData extends Omit<Course, "instructor"> {
  instructor: Instructor;
  sections: Section[];
  reviewCount?: number;
  averageRating?: number;
}

export interface CourseWithSections extends Course {
  sections: SectionWithLectures[];
  reviewCount: number;
  averageRating: number;
}

export interface SectionWithLectures extends Section {
  lectures: Lecture[];
  totalLectures: number;
  totalDuration: number;
}
export interface CourseCardData {
  _id: string;

  title: string;
  subtitle: string;
  description: string;

  instructor: {
    _id: string;
    user: {
      firstName: string;
      lastName: string;
      avatar: {
        publicId: string;
        secureUrl: string;
      };
    };
  };

  category: string[];

  thumbnail: {
    publicId: string;
    secureUrl: string;
  };

  price: number;
  discountPrice: number;
  currency: "INR" | "USD" | "EUR";
  isFree: boolean;

  status: "draft" | "published" | "archived";
  publishedAt: string; // ISO date string

  slug: string;
  totalSections: number;
  totalLectures: number;
  totalDuration: number;
  isFeatured: boolean;
  bestseller: boolean;

  createdAt: string; // ISO date string

  enrollmentCount: number;
  reviewCount: number;
  averageRating: number;
  completionRate: number;
}

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
  enrolledAt: Date;
  expiresAt?: Date;
  isCompleted: boolean;
  completedAt?: Date;
  certificateIssued: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  _id: string;
  user: string;
  course: string;
  rating: number;
  title: string;
  comment: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Progress {
  _id: string;
  user: string;
  course: string;
  completedLectures: string[];
  lastAccessedLecture?: string;
  progressPercentage: number;
  totalWatchTime: number;
  lastAccessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Certificate {
  _id: string;
  user: string;
  course: string;
  certificateId: string;
  certificateUrl?: Media;
  issuedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export interface UserSnapshot {
  email: string;
  firstName: string;
  lastName: string;
  country?: string;
}

export interface CourseSnapshot {
  title: string;
  instructor: string;
  price: number;
}

export interface RefundInfo {
  reason?: string;
  amount?: number;
  requestedAt?: Date;
  approvedAt?: Date;
  processedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  status: "none" | "requested" | "approved" | "rejected" | "processed";
}

export interface OrderMetadata {
  ipAddress?: string;
  userAgent?: string;
  deviceType?: string;
  source?: string;
}

export interface Order {
  _id: string;
  user: string;
  course: string;
  orderNumber: string;
  originalPrice: number;
  discountAmount: number;
  couponCode?: string;
  couponDiscount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  status:
    | "pending"
    | "processing"
    | "paid"
    | "failed"
    | "cancelled"
    | "refunded";
  paymentStatus: "pending" | "authorized" | "captured" | "failed" | "refunded";
  paymentIntentId?: string;
  paidAt?: Date;
  cancelledAt?: Date;
  refundedAt?: Date;
  expiresAt?: Date;
  userSnapshot: UserSnapshot;
  courseSnapshot: CourseSnapshot;
  refund: RefundInfo;
  metadata: OrderMetadata;
  invoiceNumber?: string;
  invoiceUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Payment Types
export interface PaymentMethod {
  type: string;
  last4?: string;
  brand?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cardType?: string;
  bankName?: string;
  walletName?: string;
}

export interface Refund {
  refundId: string;
  amount: number;
  reason?: string;
  status: string;
  processedAt?: Date;
  createdAt: Date;
}

export interface PaymentMetadata {
  ipAddress?: string;
  userAgent?: string;
  country?: string;
  riskScore?: number;
  fraudStatus: "safe" | "flagged" | "blocked";
}

export interface WebhookEvent {
  event: string;
  receivedAt: Date;
  processed: boolean;
}

export interface Payment {
  _id: string;
  order: string;
  user: string;
  provider: "stripe" | "razorpay";
  paymentId: string;
  transactionId?: string;
  paymentIntentId?: string;
  chargeId?: string;
  amount: number;
  currency: string;
  status:
    | "pending"
    | "processing"
    | "authorized"
    | "captured"
    | "succeeded"
    | "failed"
    | "cancelled"
    | "refunded"
    | "partially_refunded";
  paymentMethod?: PaymentMethod;
  authorizedAt?: Date;
  capturedAt?: Date;
  failedAt?: Date;
  refundedAt?: Date;
  failureCode?: string;
  failureMessage?: string;
  failureReason?: string;
  refunds: Refund[];
  totalRefunded: number;
  webhookVerified: boolean;
  metadata: PaymentMetadata;
  receiptUrl?: string;
  receiptNumber?: string;
  platformFee?: number;
  processingFee?: number;
  instructorPayout?: number;
  webhookEvents: WebhookEvent[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Auth Response Types
export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: User;
}
export interface ApiResponse<T> {
    success:boolean,
    message:string,
    data?:T;
}

// Pagination
export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    courses: T[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}
export interface Category {
  name: string;
  count: number;
}
