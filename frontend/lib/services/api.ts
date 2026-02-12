import apiClient from "@/lib/api-client";
import type {
  User,
  Course,
  Order,
  Payment,
  Enrollment,
  Progress,
  Certificate,
  Instructor,
  PaginatedResponse,
  LoginResponse,
  RegisterResponse,
  CourseCardData,
  CourseDetailsData,
  ApiResponse,
  CartResponse,
  AddToCartRequest,
  MoveToWishlistRequest,
  WishlistResponse,
  AddToWishlistRequest,
  MoveToCartRequest,
  CartSummaryResponse,
} from "@/lib/types";

// Auth API calls
export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const response = await apiClient.post<RegisterResponse>("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get<{ user: User }>("/auth/profile");
    return response.data;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await apiClient.put<User>("/auth/profile", data);
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string) => {
    const response = await apiClient.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await apiClient.post("/auth/verify-email", { token });
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post("/auth/refresh", { refreshToken });
    return response.data;
  },
};

// COURSES API
export const courseService = {
  getAll: async (
    page = 1,
    limit = 9,
    searchText?: string,
    category?: string[] | string,
  ) => {
    const response = await apiClient.get<PaginatedResponse<CourseCardData>>(
      "/courses",
      {
        params: {
          page,
          limit,
          searchText,
          category,
        },
      },
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<CourseDetailsData>>(
      `/courses/${id}`,
    );
    return response.data;
  },

  getFeatured: async (limit = 8) => {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: CourseCardData[];
    }>("/courses/featured", {
      params: { limit },
    });
    return response.data;
  },

  search: async (query: string, limit = 20) => {
    const response = await apiClient.get<PaginatedResponse<Course>>(
      "/courses/search",
      {
        params: { query, limit },
      },
    );
    return response.data;
  },

  create: async (data: Partial<Course>) => {
    const response = await apiClient.post<Course>("/courses", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Course>) => {
    const response = await apiClient.put<Course>(`/courses/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/courses/${id}`);
    return response.data;
  },

  publish: async (id: string) => {
    const response = await apiClient.post(`/courses/${id}/publish`);
    return response.data;
  },
  getCategoryList: async () => {
    const response = await apiClient.get(`/courses/categories`);
    return response.data;
  },
  getEnrolledCourses: async () => {
    const response = await apiClient.get("/courses/enrolled");
    return response.data;
  },
};


// PROGRESS API
export const progressService = {
  get: async (courseId: string) => {
    const response = await apiClient.get<Progress>(`/progress/${courseId}`);
    return response.data;
  },

  update: async (courseId: string, lectureId: string, watchTime: number) => {
    const response = await apiClient.put<Progress>(`/progress/${courseId}`, {
      completedLecture: lectureId,
      watchTime,
    });
    return response.data;
  },

  markLectureComplete: async (courseId: string, lectureId: string) => {
    const response = await apiClient.post<Progress>(
      `/progress/${courseId}/lecture-complete`,
      { lectureId }
    );
    return response.data;
  },
};

// ORDER API
export const orderService = {
  create: async (courseId: string, couponCode?: string) => {
    const response = await apiClient.post<Order>("/orders", {
      course: courseId,
      couponCode,
    });
    return response.data;
  },

  getAll: async (page = 1, limit = 10) => {
    const response = await apiClient.get<PaginatedResponse<Order>>("/orders", {
      params: { page, limit },
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
  },

  cancel: async (id: string) => {
    const response = await apiClient.post(`/orders/${id}/cancel`);
    return response.data;
  },

  requestRefund: async (id: string, reason: string) => {
    const response = await apiClient.post(`/orders/${id}/refund`, { reason });
    return response.data;
  },
};

// PAYMENT API
export const paymentService = {
  initiate: async (courseIds: string[]) => {
    const response = await apiClient.post("/payments/orders", {
      courseIds,
    });
    // This returns { razorpayOrderId, amount, currency, key, orderId, ... }
    return response.data;
  },

  verify: async (verificationData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    orderId: string; // The MongoDB Order ID
  }) => {
    const response = await apiClient.post(
      "/payments/razorpay/verify",
      verificationData,
    );
    return response.data;
  },

  // Administrative or User History Methods
  getById: async (id: string) => {
    const response = await apiClient.get(`/payments/${id}`);
    return response.data;
  },

  getAll: async (page = 1, limit = 10) => {
    const response = await apiClient.get("/payment", {
      params: { page, limit },
    });
    return response.data;
  },
};

// CERTIFICATE API
export const certificateService = {
  getById: async (id: string) => {
    const response = await apiClient.get<Certificate>(`/certificates/${id}`);
    return response.data;
  },

  download: async (id: string) => {
    const response = await apiClient.get(`/certificates/${id}/download`, {
      responseType: "blob",
    });
    return response.data;
  },

  getMyCertificates: async (page = 1, limit = 10) => {
    const response = await apiClient.get<PaginatedResponse<Certificate>>(
      "/certificates/my",
      {
        params: { page, limit },
      }
    );
    return response.data;
  },
};

// INSTRUCTOR API
export const instructorService = {
  getFeaturedInstructors :async (limit = 6) => {
    const response = await apiClient.get(
      "/instructors/featured",
      {
        params: { limit },
      }
    );
    return response.data;
  },
  getProfileData : async ()=>{
     const response = await apiClient.get("/instructors/");
    return response.data;
  },
  getDashboard: async () => {
    const response = await apiClient.get("/instructors/dashboard");
    return response.data;
  },

  getCourses: async () => {
    const response = await apiClient.get<Course[]>("/instructors/courses");
    return response.data;
  },

  getAnalytics: async () => {
    const response = await apiClient.get("/instructors/analytics");
    return response.data;
  },

  getStudents: async () => {
    const response = await apiClient.get("/instructors/students");
    return response.data;
  },

  createCourse: async (data: Partial<Course>) => {
    const response = await apiClient.post<Course>("/instructors/courses", data);
    return response.data;
  },

  updateCourse: async (id: string, data: Partial<Course>) => {
    const response = await apiClient.put<Course>(
      `/instructors/courses/${id}`,
      data
    );
    return response.data;
  },

  deleteCourse: async (id: string) => {
    const response = await apiClient.delete(`/instructors/courses/${id}`);
    return response.data;
  },

  getCourseDetails: async (id: string) => {
    const response = await apiClient.get<Course>(`/instructors/courses/${id}`);
    return response.data;
  },

  getStudentProgress: async (studentId: string) => {
    const response = await apiClient.get(
      `/instructors/students/${studentId}/progress`
    );
    return response.data;
  },
};

// USERS API
export const usersService = {
  getAll: async () => {
    const response = await apiClient.get<User[]>("/users");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<User>) => {
    const response = await apiClient.put<User>(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },

  getInstructor: async (id: string) => {
    const response = await apiClient.get<Instructor>(`/instructors/${id}`);
    return response.data;
  },
};

export const cartService = {
  getCart: async () => {
    const response = await apiClient.get<CartResponse>("/cart");
    return response.data;
  },
  addToCart: async (data: AddToCartRequest) => {
    const response = await apiClient.post<CartResponse>("/cart/add", data);
    return response.data;
  },
  removeFromCart: async (courseId: string) => {
    const response = await apiClient.delete<CartResponse>(
      `/cart/remove/${courseId}`
    );
    return response.data;
  },
  clearCart: async () => {
    const response = await apiClient.delete<CartResponse>("/cart/clear");
    return response.data;
  },
  moveToWishlist: async (data: MoveToWishlistRequest) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      cart: {
        items: any[];
        itemCount: number;
        wishlistItems: any[];
        wishlistCount: number;
      };
    }>("/cart/move-to-wishlist", data);
    return response.data;
  },


  getWishlist: async () => {
    const response = await apiClient.get<WishlistResponse>("/cart/wishlist");
    return response.data;
  },
  addToWishlist: async (data: AddToWishlistRequest) => {
    const response = await apiClient.post<WishlistResponse>(
      "/cart/wishlist/add",
      data
    );
    return response.data;
  },

  removeFromWishlist: async (courseId: string) => {
    const response = await apiClient.delete<WishlistResponse>(
      `/cart/wishlist/remove/${courseId}`
    );
    return response.data;
  },

  clearWishlist: async () => {
    const response = await apiClient.delete<WishlistResponse>(
      "/cart/wishlist/clear"
    );
    return response.data;
  },

  moveToCart: async (data: MoveToCartRequest) => {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      cart: {
        items: any[];
        itemCount: number;
        wishlistItems: any[];
        wishlistCount: number;
      };
    }>("/cart/wishlist/move-to-cart", data);
    return response.data;
  },
  getSummary: async () => {
    const response = await apiClient.get<CartSummaryResponse>("/summary");
    return response.data;
  },
};