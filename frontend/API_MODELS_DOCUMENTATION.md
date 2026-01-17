# LMS Dashboard - API & Models Documentation

## Overview

This document outlines the complete API structure and TypeScript types for the Learning Management System (LMS) Dashboard, based on the backend models.

## Database Models

### 1. **User Model**

Handles both students and instructors with comprehensive profile management.

```typescript
{
  // Identity
  firstName: string;
  lastName: string;
  email: string (unique);
  phone?: string;

  // Auth
  password: string (hashed);
  authProvider: "local" | "google";
  lastLoginAt?: Date;

  // Roles & Access
  role: "student" | "instructor" | "admin";
  isActive: boolean;

  // Profile
  avatar?: { publicId, secureUrl };
  bio?: string;
  gender?: string;
  dob?: Date;
  country?: string;

  // Verification
  emailVerified: boolean;
  phoneVerified: boolean;

  // Preferences
  notificationSettings?: object;
  darkMode: boolean;

  // Analytics
  totalCoursesEnrolled: number;
  totalCoursesCompleted: number;
  totalLearningTime: number;

  timestamps: { createdAt, updatedAt }
}
```

### 2. **Instructor Model**

Extends user functionality for course creators.

```typescript
{
  user: ObjectId (ref: User);

  // Professional
  title?: string;
  expertise: string[];
  yearsOfExperience?: number;
  education?: string;
  certifications: string[];

  // Social Links
  website?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;

  // Ratings & Stats
  rating: number;
  totalReviews: number;
  totalStudents: number;
  totalCourses: number;

  // Earnings
  totalEarnings: number;
  pendingPayout: number;
  payoutMethod?: string;

  // Compliance
  identityVerified: boolean;
  isFeatured: boolean;
  isSuspended: boolean;
  suspensionReason?: string;

  timestamps: { createdAt, updatedAt }
}
```

### 3. **Course Model**

Comprehensive course structure with sections and lectures.

```typescript
{
  // Basic Info
  title: string;
  subtitle: string;
  description: string;
  whatYouWillLearn: string[];
  requirements: string[];

  // Ownership
  instructor: ObjectId (ref: Instructor);
  category: string[];

  // Media
  thumbnail?: { publicId, secureUrl };
  promoVideo?: { publicId, secureUrl };

  // Pricing
  price: number;
  discountPrice?: number;
  currency: string;
  isFree: boolean;

  // Content Stats
  totalSections: number;
  totalLectures: number;
  totalDuration: number;

  // Ratings
  rating: number;
  totalReviews: number;

  // Publishing
  status: "draft" | "review" | "published" | "rejected";
  publishedAt?: Date;
  slug: string;

  // Marketing
  isFeatured: boolean;
  bestseller: boolean;
  previewLectures: ObjectId[] (ref: Lecture);

  // Admin
  isArchived: boolean;
  archivedAt?: Date;

  timestamps: { createdAt, updatedAt }
}
```

### 4. **Section Model**

Organizes lectures within a course.

```typescript
{
  course: ObjectId (ref: Course);
  title: string;
  description?: string;
  order: number;
  totalLectures: number;
  totalDuration: number;
  isFreePreview: boolean;

  timestamps: { createdAt, updatedAt }
}
```

### 5. **Lecture Model**

Individual video lessons with attachments.

```typescript
{
  section: ObjectId (ref: Section);
  title: string;
  description?: string;

  // Media
  videoUrl?: { publicId, secureUrl };
  videoProvider?: string;
  duration: number;

  // Resources
  attachments: [
    {
      filename: string;
      publicId: string;
      secureUrl: string;
    }
  ];

  // Access
  isPreview: boolean;
  isDownloadable: boolean;
  order: number;

  timestamps: { createdAt, updatedAt }
}
```

### 6. **Enrollment Model**

Tracks student-course relationships.

```typescript
{
  user: ObjectId (ref: User);
  course: ObjectId (ref: Course);

  enrolledAt: Date;
  expiresAt?: Date;

  // Status
  isCompleted: boolean;
  completedAt?: Date;

  // Certificates
  certificateIssued: boolean;

  timestamps: { createdAt, updatedAt }
}
```

### 7. **Progress Model**

Tracks learning progress per student per course.

```typescript
{
  user: ObjectId (ref: User);
  course: ObjectId (ref: Course);

  completedLectures: ObjectId[] (ref: Lecture);
  lastAccessedLecture?: ObjectId (ref: Lecture);

  progressPercentage: number;
  totalWatchTime: number;
  lastAccessedAt: Date;

  timestamps: { createdAt, updatedAt }
}
```

### 8. **Review Model**

Student course reviews and ratings.

```typescript
{
  user: ObjectId (ref: User);
  course: ObjectId (ref: Course);

  rating: number;
  title: string;
  comment: string;

  // Moderation
  isApproved: boolean;

  timestamps: { createdAt, updatedAt }
}
```

### 9. **Certificate Model**

Digital certificates of completion.

```typescript
{
  user: ObjectId (ref: User);
  course: ObjectId (ref: Course);

  certificateId: string;
  certificateUrl?: { publicId, secureUrl };
  issuedAt: Date;

  timestamps: { createdAt, updatedAt }
}
```

### 10. **Order Model**

Purchase orders with comprehensive pricing.

```typescript
{
  // User & Course
  user: ObjectId (ref: User);
  course: ObjectId (ref: Course);

  // Order Details
  orderNumber: string (unique);

  // Pricing
  originalPrice: number;
  discountAmount: number;
  couponCode?: string;
  couponDiscount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;

  // Status
  status: "pending" | "processing" | "paid" | "failed" | "cancelled" | "refunded";
  paymentStatus: "pending" | "authorized" | "captured" | "failed" | "refunded";
  paymentIntentId?: string;

  // Timestamps
  paidAt?: Date;
  cancelledAt?: Date;
  refundedAt?: Date;
  expiresAt?: Date;

  // Snapshots
  userSnapshot: { email, firstName, lastName, country };
  courseSnapshot: { title, instructor, price };

  // Refund Info
  refund: {
    reason?: string;
    amount?: number;
    status: "none" | "requested" | "approved" | "rejected" | "processed";
  };

  // Metadata
  metadata: { ipAddress, userAgent, deviceType, source };

  // Invoice
  invoiceNumber?: string;
  invoiceUrl?: string;

  timestamps: { createdAt, updatedAt }
}
```

### 11. **Payment Model**

Payment gateway integration with multi-provider support.

```typescript
{
  order: ObjectId (ref: Order);
  user: ObjectId (ref: User);

  // Provider
  provider: "stripe" | "razorpay";
  paymentId: string (unique);
  transactionId?: string;
  paymentIntentId?: string;
  chargeId?: string;

  // Amount
  amount: number;
  currency: string;

  // Status
  status: "pending" | "processing" | "authorized" | "captured" |
          "succeeded" | "failed" | "cancelled" | "refunded" | "partially_refunded";

  // Payment Method
  paymentMethod?: {
    type: string;
    last4?: string;
    brand?: string;
    expiryMonth?: string;
    expiryYear?: string;
  };

  // Timestamps
  authorizedAt?: Date;
  capturedAt?: Date;
  failedAt?: Date;
  refundedAt?: Date;

  // Failure Info
  failureCode?: string;
  failureMessage?: string;
  failureReason?: string;

  // Refunds
  refunds: [
    {
      refundId: string;
      amount: number;
      reason?: string;
      status: string;
      processedAt?: Date;
    }
  ];
  totalRefunded: number;

  // Security
  webhookVerified: boolean;
  metadata: {
    ipAddress?: string;
    country?: string;
    fraudStatus: "safe" | "flagged" | "blocked";
  };

  // Financial
  platformFee?: number;
  processingFee?: number;
  instructorPayout?: number;

  timestamps: { createdAt, updatedAt }
}
```

## API Endpoints

### Authentication APIs

```typescript
POST / auth / login; // Login user
POST / auth / register; // Register new user
POST / auth / logout; // Logout user
POST / auth / refresh; // Refresh token
GET / auth / me; // Get current user
POST / auth / forgot - password; // Request password reset
POST / auth / reset - password; // Reset password
POST / auth / verify - email; // Verify email
```

### User APIs

```typescript
GET    /users/:id               // Get user profile
PUT    /users/:id               // Update user profile
POST   /users/:id/avatar        // Upload avatar
GET    /instructors/:id         // Get instructor profile
```

### Course APIs

```typescript
GET    /courses                 // List all courses (paginated)
GET    /courses/:id             // Get course details
GET    /courses/featured        // Get featured courses
GET    /courses/search          // Search courses
POST   /courses                 // Create course (instructor)
PUT    /courses/:id             // Update course
DELETE /courses/:id             // Delete course
POST   /courses/:id/publish     // Publish course
```

### Enrollment APIs

```typescript
POST   /enrollments             // Enroll in course
GET    /enrollments             // Get user enrollments
GET    /enrollments/:id         // Get enrollment details
PUT    /enrollments/:id/complete// Mark course as complete
```

### Progress APIs

```typescript
GET    /progress/:courseId      // Get course progress
PUT    /progress/:courseId      // Update progress
POST   /progress/:courseId/lecture-complete  // Mark lecture complete
```

### Order APIs

```typescript
POST   /orders                  // Create order
GET    /orders                  // Get user orders
GET    /orders/:id              // Get order details
POST   /orders/:id/cancel       // Cancel order
POST   /orders/:id/refund       // Request refund
```

### Payment APIs

```typescript
POST   /payments/initiate       // Initiate payment
POST   /payments/verify         // Verify payment
GET    /payments/:id            // Get payment details
GET    /payments                // Get payment history
POST   /payments/:id/refund     // Request refund
```

### Certificate APIs

```typescript
GET    /certificates/:id        // Get certificate
GET    /certificates/:id/download  // Download certificate
GET    /certificates/my         // Get user certificates
```

### Instructor APIs

```typescript
GET    /instructors/dashboard   // Get dashboard stats
GET    /instructors/courses     // Get instructor courses
GET    /instructors/analytics   // Get analytics
GET    /instructors/students    // Get enrolled students
POST   /instructors/courses     // Create course
PUT    /instructors/courses/:id // Update course
DELETE /instructors/courses/:id // Delete course
GET    /instructors/students/:id/progress  // Student progress
```

## TypeScript Types

All types are defined in `lib/types.ts`:

- `User` - User profile
- `Instructor` - Instructor profile
- `Course` - Course details
- `Section` - Course section
- `Lecture` - Video lecture
- `Enrollment` - Enrollment record
- `Progress` - Learning progress
- `Review` - Course review
- `Certificate` - Certificate
- `Order` - Purchase order
- `Payment` - Payment record
- `PaginatedResponse<T>` - Paginated API response

## API Service Usage

```typescript
import {
  authService,
  courseService,
  enrollmentService,
  progressService,
  orderService,
  paymentService,
  certificateService,
  instructorService,
} from "@/lib/services/api";

// Login
const loginResponse = await authService.login(email, password);

// Get courses
const coursesData = await courseService.getAll(1, 10);

// Enroll in course
const enrollment = await enrollmentService.enroll(courseId);

// Get progress
const progress = await progressService.get(courseId);

// Create order
const order = await orderService.create(courseId, couponCode);

// Initiate payment
const payment = await paymentService.initiate(orderId, "stripe");
```

## Response Format

All API responses follow this structure:

```typescript
{
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  }
}
```

## Authentication

Requests include JWT token in `Authorization` header:

```
Authorization: Bearer <token>
```

Token is stored in localStorage at key: `courseloop_token`

## Error Handling

All errors are caught and returned with appropriate HTTP status codes:

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Server Error
