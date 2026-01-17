# API Endpoints Configuration

## Server Base URL

```
http://localhost:3030
```

## API Configuration

### Core URLs

- **API Base URL**: `http://localhost:3030/api`
- **Auth URL**: `http://localhost:3030/api/auth`
- **Instructors URL**: `http://localhost:3030/api/instructors`
- **Courses URL**: `http://localhost:3030/api/courses`
- **Payments URL**: `http://localhost:3030/api/payments`

---

## Authentication Endpoints

| Method | Endpoint                    | Description               |
| ------ | --------------------------- | ------------------------- |
| POST   | `/api/auth/login`           | User login                |
| POST   | `/api/auth/register`        | User registration         |
| POST   | `/api/auth/logout`          | User logout               |
| GET    | `/api/auth/profile`         | Get user profile          |
| PUT    | `/api/auth/profile`         | Update user profile       |
| POST   | `/api/auth/refresh`         | Refresh JWT token         |
| POST   | `/api/auth/verify-email`    | Verify email address      |
| POST   | `/api/auth/forgot-password` | Request password reset    |
| POST   | `/api/auth/reset-password`  | Reset password with token |

---

## Instructor Endpoints

| Method | Endpoint                                 | Description                   |
| ------ | ---------------------------------------- | ----------------------------- |
| GET    | `/api/instructors/dashboard`             | Get instructor dashboard data |
| GET    | `/api/instructors/courses`               | Get instructor's courses      |
| GET    | `/api/instructors/courses/:id`           | Get course details            |
| POST   | `/api/instructors/courses`               | Create new course             |
| PUT    | `/api/instructors/courses/:id`           | Update course                 |
| DELETE | `/api/instructors/courses/:id`           | Delete course                 |
| GET    | `/api/instructors/analytics`             | Get course analytics          |
| GET    | `/api/instructors/students`              | Get all students              |
| GET    | `/api/instructors/students/:id/progress` | Get student progress          |

---

## Course Endpoints

| Method | Endpoint                    | Description                      |
| ------ | --------------------------- | -------------------------------- |
| GET    | `/api/courses`              | Get all courses                  |
| GET    | `/api/courses/:id`          | Get course details               |
| POST   | `/api/courses`              | Create course (admin/instructor) |
| PUT    | `/api/courses/:id`          | Update course                    |
| DELETE | `/api/courses/:id`          | Delete course                    |
| POST   | `/api/courses/:id/enroll`   | Enroll in course                 |
| GET    | `/api/courses/:id/progress` | Get course progress              |

---

## Payment Endpoints

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| POST   | `/api/payments/create` | Create payment      |
| POST   | `/api/payments/verify` | Verify payment      |
| GET    | `/api/payments`        | Get payment history |
| GET    | `/api/payments/:id`    | Get payment details |

---

## Usage Examples

### Using Auth Service

```typescript
import { authService } from "@/lib/services/api";

// Login
const user = await authService.login("user@example.com", "password");

// Register
const newUser = await authService.register(
  "John",
  "Doe",
  "john@example.com",
  "password"
);

// Get Profile
const profile = await authService.getProfile();

// Update Profile
const updated = await authService.updateProfile({ firstName: "Jane" });
```

### Using Course Service

```typescript
import { coursesService } from "@/lib/services/api";

// Get all courses
const courses = await coursesService.getAll();

// Get course details
const course = await coursesService.getById("course-id");

// Enroll in course
const enrollment = await coursesService.enroll("course-id");

// Get progress
const progress = await coursesService.getProgress("course-id");
```

### Using Instructor Service

```typescript
import { instructorService } from "@/lib/services/api";

// Get dashboard
const dashboard = await instructorService.getDashboard();

// Get courses
const courses = await instructorService.getCourses();

// Create course
const course = await instructorService.createCourse({
  title: "Course Title",
  description: "Description",
  price: 29.99,
});

// Get analytics
const analytics = await instructorService.getAnalytics();

// Get students
const students = await instructorService.getStudents();
```

### Using Payment Service

```typescript
import { paymentService } from "@/lib/services/api";

// Create payment
const payment = await paymentService.createPayment({
  courseId: "course-id",
  amount: 29.99,
  paymentMethod: "credit_card",
});

// Verify payment
const verified = await paymentService.verifyPayment("payment-id");

// Get history
const history = await paymentService.getPaymentHistory();
```

---

## Environment Variables

All URLs are configured in `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3030/api
NEXT_PUBLIC_AUTH_API_URL=http://localhost:3030/api/auth
NEXT_PUBLIC_INSTRUCTOR_API_URL=http://localhost:3030/api/instructors
NEXT_PUBLIC_COURSE_API_URL=http://localhost:3030/api/courses
NEXT_PUBLIC_PAYMENT_API_URL=http://localhost:3030/api/payments
```

---

## Response Format

All API endpoints follow this standard response format:

### Success Response (200-299)

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful"
}
```

### Error Response (400+)

```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error message"
}
```

---

## Authentication

All requests (except login/register) require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

The token is automatically added by the API client interceptor.

---

## Error Handling

The API client automatically handles:

- 401 Unauthorized: Refreshes token and retries request
- 403 Forbidden: Returns error
- 500 Server Error: Returns error with message
- Network Error: Returns error message

---

**Last Updated**: January 9, 2026
**Backend Server**: `http://localhost:3030`
