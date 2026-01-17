"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "learner" | "instructor" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const userJson = localStorage.getItem("user");

        if (token && userJson) {
          setUser(JSON.parse(userJson));
          // Set cookie for middleware
          document.cookie = `auth_token=${token}; path=/`;
          document.cookie = `user_role=${JSON.parse(userJson).role}; path=/`;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock authentication - in real app, call your API
      const mockUser: AuthUser = {
        id: "1",
        email,
        name: email.split("@")[0],
        role: "learner", // Default role
      };

      const token = "mock_jwt_token_" + Date.now();

      setUser(mockUser);
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(mockUser));
      document.cookie = `auth_token=${token}; path=/`;
      document.cookie = `user_role=${mockUser.role}; path=/`;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock registration - in real app, call your API
      const mockUser: AuthUser = {
        id: "1",
        email,
        name,
        role: (role as "learner" | "instructor" | "admin") || "learner",
      };

      const token = "mock_jwt_token_" + Date.now();

      setUser(mockUser);
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user", JSON.stringify(mockUser));
      document.cookie = `auth_token=${token}; path=/`;
      document.cookie = `user_role=${mockUser.role}; path=/`;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    document.cookie = "auth_token=; path=/; max-age=0";
    document.cookie = "user_role=; path=/; max-age=0";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
