import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom auth hooks
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error, successMessage } =
    useAppSelector((state) => state.auth);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    successMessage,
    dispatch,
  };
};

export const useAuthUser = () => {
  return useAppSelector((state) => state.auth.user);
};


export const useAuthIsAuthenticated = () => {
  return useAppSelector((state) => state.auth.isAuthenticated);
};

export const useAuthIsLoading = () => {
  return useAppSelector((state) => state.auth.isLoading);
};

export const useAuthError = () => {
  return useAppSelector((state) => state.auth.error);
};

export const useAuthSuccess = () => {
  return useAppSelector((state) => state.auth.successMessage);
};
