import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/lib/api-client";
import type { User } from "@/lib/types";

// Types
export interface AuthState {
  user: Omit<User, "password"> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  successMessage: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post<any>("/auth/login", credentials);

      const userData = response.data.data || response.data.user;

      // Validate user data
      if (!userData) {
        return rejectWithValue("No user data returned from server");
      }

      // Use the user data as-is, backend returns valid roles
      const mappedUser: Omit<User, "password"> = userData;

      localStorage.setItem("userRole", mappedUser.role);

      // Return user data, token is handled via HttpOnly cookie
      return { user: mappedUser, token: null };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    credentials: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post<any>("/auth/register", credentials);
      const userData = response.data.data || response.data.user;

      // Validate user data
      if (!userData) {
        return rejectWithValue("No user data returned from server");
      }

      // Use the user data as-is, backend returns valid roles
      const mappedUser: Omit<User, "password"> = userData;

      localStorage.setItem("userRole", mappedUser.role);

      // Return user data, token is handled via HttpOnly cookie
      return { user: mappedUser, token: null };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.get("/auth/logout");

      localStorage.removeItem("userRole");

      return null;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/auth/profile");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile."
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updateData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await apiClient.put("/auth/update", updateData);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile."
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/forgot-password", { email });
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset email."
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: { token: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/reset-password", data);
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password."
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/verify-email", { token });
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify email."
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (
    data: { currentPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post("/auth/change-password", data);
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change password."
      );
    }
  }
);

export const sendPhoneOTP = createAsyncThunk(
  "auth/sendPhoneOTP",
  async (phone: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/send-phone-otp", { phone });
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send phone OTP."
      );
    }
  }
);

export const sendEmailOTP = createAsyncThunk(
  "auth/sendEmailOTP",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/send-email-otp", { email });
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send email OTP."
      );
    }
  }
);

export const verifyPhoneOTP = createAsyncThunk(
  "auth/verifyPhoneOTP",
  async (
    data: { phone: string; verificationToken: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post("/auth/verify-phone", data);
      return response.data.message;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify phone."
      );
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "auth/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/auth/orders");
      return response.data.data || response.data.orders;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders."
      );
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.successMessage = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem(
        process.env.NEXT_PUBLIC_JWT_TOKEN_KEY || "courseloop_token"
      );
      if (token) {
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.successMessage = "Login successful!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.successMessage = "Registration successful!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.successMessage = "Logged out successfully!";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.successMessage = "Profile updated successfully!";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Verify Email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Change Password
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Send Phone OTP
    builder
      .addCase(sendPhoneOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendPhoneOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(sendPhoneOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Send Email OTP
    builder
      .addCase(sendEmailOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendEmailOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(sendEmailOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Verify Phone OTP
    builder
      .addCase(verifyPhoneOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyPhoneOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(verifyPhoneOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch Orders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSuccess, setUser, initializeAuth } =
  authSlice.actions;
export default authSlice.reducer;
