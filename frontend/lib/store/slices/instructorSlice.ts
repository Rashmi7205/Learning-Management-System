import { instructorService } from "@/lib/services/api";
import { Course, FeaturedInstructor, Instructor } from "@/lib/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* ------------------ Types ------------------ */

interface InstructorState {
  featuredInstructors: FeaturedInstructor[];
  profile: Instructor | null;
  dashboard: any | null;
  analytics: any | null;
  students: any[];
  courses: Course[];
  selectedCourse: Course | null;
  loading: boolean;
  error: string | null;
}

const initialState: InstructorState = {
  featuredInstructors: [],
  profile: null,
  dashboard: null,
  analytics: null,
  students: [],
  courses: [],
  selectedCourse: null,
  loading: false,
  error: null,
};

export const fetchFeaturedInstructors = createAsyncThunk(
  "instructor/fetchFeatured",
  async (_, thunkAPI) => {
    try {
      const {data}  =  await instructorService.getFeaturedInstructors();
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load featured instructors",
      );
    }
  },
);

export const fetchInstructorProfile = createAsyncThunk(
  "instructor/fetchProfile",
  async (_, thunkAPI) => {
    try {
      return await instructorService.getProfileData();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load profile",
      );
    }
  },
);

export const fetchInstructorDashboard = createAsyncThunk(
  "instructor/fetchDashboard",
  async (_, thunkAPI) => {
    try {
      return await instructorService.getDashboard();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load dashboard",
      );
    }
  },
);

export const fetchInstructorCourses = createAsyncThunk(
  "instructor/fetchCourses",
  async (_, thunkAPI) => {
    try {
      return await instructorService.getCourses();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load courses",
      );
    }
  },
);

export const fetchInstructorAnalytics = createAsyncThunk(
  "instructor/fetchAnalytics",
  async (_, thunkAPI) => {
    try {
      return await instructorService.getAnalytics();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load analytics",
      );
    }
  },
);

export const fetchInstructorStudents = createAsyncThunk(
  "instructor/fetchStudents",
  async (_, thunkAPI) => {
    try {
      return await instructorService.getStudents();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load students",
      );
    }
  },
);

export const fetchCourseDetails = createAsyncThunk(
  "instructor/fetchCourseDetails",
  async (id: string, thunkAPI) => {
    try {
      return await instructorService.getCourseDetails(id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to load course",
      );
    }
  },
);

export const createCourse = createAsyncThunk(
  "instructor/createCourse",
  async (data: Partial<Course>, thunkAPI) => {
    try {
      return await instructorService.createCourse(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create course",
      );
    }
  },
);

export const updateCourse = createAsyncThunk(
  "instructor/updateCourse",
  async ({ id, data }: { id: string; data: Partial<Course> }, thunkAPI) => {
    try {
      return await instructorService.updateCourse(id, data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update course",
      );
    }
  },
);

export const deleteCourse = createAsyncThunk(
  "instructor/deleteCourse",
  async (id: string, thunkAPI) => {
    try {
      await instructorService.deleteCourse(id);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete course",
      );
    }
  },
);

const instructorSlice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    clearInstructorError(state) {
      state.error = null;
    },
    clearSelectedCourse(state) {
      state.selectedCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data[0];
      })
      .addCase(fetchInstructorDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchInstructorAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchInstructorStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchInstructorCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.unshift(action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (c) => c._id === action.payload._id,
        );
        if (index !== -1) state.courses[index] = action.payload;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter((c) => c._id !== action.payload);
      })
      .addCase(fetchFeaturedInstructors.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredInstructors = action.payload;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("instructor/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("instructor/") &&
          action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.loading = false;
          state.error =
            action.payload || action.error?.message || "Something went wrong";
        },
      );
  },
});

export const { clearInstructorError, clearSelectedCourse } =
  instructorSlice.actions;
export default instructorSlice.reducer;
