// store/slices/learningSlice.ts
import { learningService } from "@/lib/services/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Types
interface Lecture {
  _id: string;
  title: string;
  description?: string;
  duration?: number;
  order: number;
  isDownloadable: boolean;
  attachments?: Array<{
    filename: string;
    secureUrl: string;
    publicId: string;
  }>;
  isPreview: boolean;
  videoUrl?: {
    secureUrl: string;
    publicId: string;
  };
  videoProvider?: string;
  isCompleted?: boolean;
}

interface Section {
  _id: string;
  title: string;
  description?: string;
  order: number;
  isFreePreview: boolean;
  totalLectures: number;
  totalDuration: number;
  lectures: Lecture[];
  completedLectures?: number;
  progressPercentage?: number;
}

// Simplified section reference (for nextLecture)
interface SectionReference {
  _id: string;
  title: string;
}

interface CourseContent {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  thumbnail?: {
    secureUrl: string;
  };
  instructor: {
    _id: string;
    user: {
      firstName: string;
      lastName: string;
      avatar?: {
        secureUrl: string;
      };
    };
  };
  sections: Section[];
  progress: {
    percentage: number;
    completedLectures: number;
    totalLectures: number;
    totalWatchTime: number;
    lastAccessedLecture?: string;
  };
  enrollment: {
    enrolledAt: string;
    lastAccessedAt?: string;
  };
  nextLecture?: {
    lecture: Lecture;
    section: SectionReference;
  };
}

interface LearningState {
  courseContent: CourseContent | null;
  currentLecture: Lecture | null;
  currentSection: Section | SectionReference | null;
  loading: boolean;
  error: string | null;
  markingComplete: boolean;
  updatingProgress: boolean;
}

const initialState: LearningState = {
  courseContent: null,
  currentLecture: null,
  currentSection: null,
  loading: false,
  error: null,
  markingComplete: false,
  updatingProgress: false,
};

// Async Thunks

export const fetchCourseContent = createAsyncThunk(
  "learning/fetchCourseContent",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await learningService.getCourseContent(courseId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch course content"
      );
    }
  }
);

export const markLectureComplete = createAsyncThunk(
  "learning/markLectureComplete",
  async (
    { courseId, lectureId }: { courseId: string; lectureId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await learningService.markLectureComplete(
        courseId,
        lectureId
      );
      return { lectureId, ...response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark lecture as complete"
      );
    }
  }
);

export const updateLastAccessed = createAsyncThunk(
  "learning/updateLastAccessed",
  async (
    { courseId, lectureId }: { courseId: string; lectureId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await learningService.updateLastAccessed(
        courseId,
        lectureId
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update progress"
      );
    }
  }
);

// Slice

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    setCurrentLecture: (
      state,
      action: PayloadAction<{ lecture: Lecture; section: Section | SectionReference }>
    ) => {
      state.currentLecture = action.payload.lecture;
      state.currentSection = action.payload.section;
    },
    clearLearningState: (state) => {
      state.courseContent = null;
      state.currentLecture = null;
      state.currentSection = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Course Content
      .addCase(fetchCourseContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseContent.fulfilled, (state, action) => {
        state.loading = false;
        state.courseContent = action.payload;
        state.error = null;
      })
      .addCase(fetchCourseContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Mark Lecture Complete
      .addCase(markLectureComplete.pending, (state) => {
        state.markingComplete = true;
      })
      .addCase(markLectureComplete.fulfilled, (state, action) => {
        state.markingComplete = false;

        // Update the lecture as completed in courseContent
        if (state.courseContent) {
          state.courseContent.sections = state.courseContent.sections.map(
            (section) => ({
              ...section,
              lectures: section.lectures.map((lecture) =>
                lecture._id === action.payload.lectureId
                  ? { ...lecture, isCompleted: true }
                  : lecture
              ),
            })
          );

          // Update progress
          if (action.payload.progressPercentage !== undefined) {
            state.courseContent.progress.percentage =
              action.payload.progressPercentage;
            state.courseContent.progress.completedLectures =
              action.payload.completedLectures ||
              state.courseContent.progress.completedLectures + 1;
          }

          // Recalculate section progress
          state.courseContent.sections = state.courseContent.sections.map(
            (section) => {
              const completedCount = section.lectures.filter(
                (l) => l.isCompleted
              ).length;
              return {
                ...section,
                completedLectures: completedCount,
                progressPercentage:
                  section.totalLectures > 0
                    ? Math.round((completedCount / section.totalLectures) * 100)
                    : 0,
              };
            }
          );
        }

        // Update current lecture
        if (state.currentLecture) {
          state.currentLecture.isCompleted = true;
        }
      })
      .addCase(markLectureComplete.rejected, (state) => {
        state.markingComplete = false;
      })

      // Update Last Accessed
      .addCase(updateLastAccessed.pending, (state) => {
        state.updatingProgress = true;
      })
      .addCase(updateLastAccessed.fulfilled, (state, action) => {
        state.updatingProgress = false;
        if (state.courseContent && action.payload.lastAccessedAt) {
          state.courseContent.enrollment.lastAccessedAt =
            action.payload.lastAccessedAt;
        }
      })
      .addCase(updateLastAccessed.rejected, (state) => {
        state.updatingProgress = false;
      });
  },
});

export const { setCurrentLecture, clearLearningState, clearError } =
  learningSlice.actions;
const learningReducer= learningSlice.reducer;
export default learningReducer;