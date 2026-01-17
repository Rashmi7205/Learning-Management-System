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

export interface Instructor {
  _id: string;
  user: string;
  title?: string;
  expertise: string[];
  yearsOfExperience?: number;
  education?: string;
  certifications: string[];
  website?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  rating: number;
  totalReviews: number;
  totalStudents: number;
  totalCourses: number;
  totalEarnings: number;
  pendingPayout: number;
  payoutMethod?: string;
  identityVerified: boolean;
  isFeatured: boolean;
  isSuspended: boolean;
  suspensionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Course Types
export interface Media {
  publicId: string;
  secureUrl: string;
}

export interface Course {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  whatYouWillLearn: string[];
  requirements: string[];
  instructor: string;
  category: string[];
  thumbnail?: Media;
  promoVideo?: Media;
  price: number;
  discountPrice?: number;
  currency: string;
  isFree: boolean;
  totalSections: number;
  totalLectures: number;
  totalDuration: number;
  rating: number;
  totalReviews: number;
  status: "draft" | "review" | "published" | "rejected";
  publishedAt?: Date;
  slug: string;
  isFeatured: boolean;
  bestseller: boolean;
  previewLectures: string[];
  isArchived: boolean;
  archivedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Section {
  _id: string;
  course: string;
  title: string;
  description?: string;
  order: number;
  totalLectures: number;
  totalDuration: number;
  isFreePreview: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  filename: string;
  publicId: string;
  secureUrl: string;
}

export interface Lecture {
  _id: string;
  section: string;
  title: string;
  description?: string;
  videoUrl?: Media;
  videoProvider?: string;
  duration: number;
  attachments: Attachment[];
  isPreview: boolean;
  isDownloadable: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
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

// Pagination
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
