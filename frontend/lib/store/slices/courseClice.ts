//course slice
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { CourseCardData } from "@/lib/types";
import { courseService } from "@/lib/services/api";

const initialState: CourseCardData[] = [];

export const fetchCourses = createAsyncThunk<CourseCardData[]>(
  "courses/fetchCourses",
  async (_, thunkAPI) => {
    try {
      const response = await courseService.getAll();
      const courseData: CourseCardData[] = response.data.map(
        (course: any) => ({
          ...course,
          enrollmentCount: course.enrollmentCount || 0,
          reviewCount: course.reviewCount || 0,
          averageRating: course.averageRating || 0,
          completionRate: course.completionRate || 0,
        }),
      );
      return courseData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        console.error("Failed to fetch courses:", action.payload);
      });
  },
});
const courseReducer =  courseSlice.reducer;
export default courseReducer;