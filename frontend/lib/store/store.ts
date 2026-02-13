import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import instructorReducer from './slices/instructorSlice'
import courseReducer from "./slices/courseClice";
import cartReducers from "./slices/cartSlice";
import learningReducer from "./slices/learningSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    instructor: instructorReducer,
    courses: courseReducer,
    cart: cartReducers,
    learning: learningReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/loginUser/fulfilled",
          "auth/registerUser/fulfilled",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
