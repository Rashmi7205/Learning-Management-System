import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Category, CourseCardData, EnrolledCourse } from "@/lib/types";
import { courseService } from "@/lib/services/api";

interface InitialCourseState {
  featuredCourses: CourseCardData[];
  courseList: CourseCardData[];
  enrolledCourses: any[];
  loading: boolean;
  page: number;
  limit: number;
  totalCourses: number;
  totalPages: number;
  error: string | null;
  categories: Category[];
}

const initialState: InitialCourseState = {
  enrolledCourses: [],
  featuredCourses: [],
  courseList: [],
  loading: false,
  page: 1,
  limit: 9,
  totalCourses: 0,
  totalPages: 1,
  error: null,
  categories: [],
};


const formatCourseData = (courses: any[]): CourseCardData[] =>
  courses.map((course) => ({
    ...course,
    enrollmentCount: course.enrollmentCount ?? 0,
    reviewCount: course.reviewCount ?? 0,
    averageRating: course.averageRating ?? 0,
    completionRate: course.completionRate ?? 0,
  }));

export const getCoursesList = createAsyncThunk<
  { courses: CourseCardData[]; pagination: any },
  {
    page?: number;
    limit?: number;
    searchText?: string;
    category?: string[] | string;
  }
>("courses/getAllcourses", async (params, thunkAPI) => {
  try {
    const { page = 1, limit = 9, searchText, category } = params;
    const response = await courseService.getAll(
      page,
      limit,
      searchText,
      category,
    );
    console.log(response);
    return {
      courses: formatCourseData(response.data.courses),
      pagination: response.data.pagination,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || "Failed to fetch courses");
  }
});
export const getEnrolledCoursesAction = createAsyncThunk<EnrolledCourse[]>(
  "courses/getEnrolled",
  async (_, thunkAPI) => {
    try {
      // Assuming you added getEnrolledCourses to your courseService
      const response = await courseService.getEnrolledCourses();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch your courses",
      );
    }
  },
);
export const getFeaturedCoursesList = createAsyncThunk<
  CourseCardData[],
  { limit?: number } | void
>("courses/getFeaturedCourses", async (params, thunkAPI) => {
  try {
    const limit = params?.limit || 10;
    const response = await courseService.getFeatured(limit);

    return formatCourseData(response.data);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || "Failed to fetch featured courses",
    );
  }
});

export const getAllCategoryList = createAsyncThunk<Category[]>(
  "courses/categories",
  async (_, thunkAPI) => {
    try {
      const response = await courseService.getCategoryList();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch featured courses",
      );
    }
  },
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearCourseList: (state) => {
      state.courseList = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getCoursesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoursesList.fulfilled, (state, action) => {
        state.loading = false;
        state.courseList = action.payload.courses;
        state.page = action.payload.pagination.page;
        state.limit = action.payload.pagination.limit;
        state.totalCourses = action.payload.pagination.total;
        state.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(getCoursesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getFeaturedCoursesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeaturedCoursesList.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredCourses = action.payload;
      })
      .addCase(getFeaturedCoursesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllCategoryList.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getEnrolledCoursesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEnrolledCoursesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses = action.payload;
      })
      .addCase(getEnrolledCoursesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCourseList } = courseSlice.actions;
export default courseSlice.reducer;
