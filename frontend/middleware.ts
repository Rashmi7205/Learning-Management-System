import { NextRequest, NextResponse } from "next/server";

// Define protected routes and their required roles
const protectedRoutes = {
  "/(auth)": ["public"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookies
  const token = request.cookies.get("auth_token")?.value;
  const userRole = request.cookies.get("user_role")?.value || "public";

  // Check if route is protected
  const isAuthRoute = pathname.startsWith("/(auth)/");
  const isLearnerRoute = pathname.startsWith("/(learner)/");
  const isInstructorRoute = pathname.startsWith("/instructor/");

  // If user is authenticated and trying to access auth routes, redirect to their dashboard
  if (token && isAuthRoute && pathname !== "/login") {
    if (userRole === "learner") {
      return NextResponse.redirect(
        new URL("/(learner)/dashboard", request.url),
      );
    } else if (userRole === "instructor") {
      return NextResponse.redirect(
        new URL("/instructor/dashboard", request.url),
      );
    }
  }

  // If user is not authenticated and trying to access protected routes, redirect to login
  if (!token) {
    // if (isLearnerRoute || isInstructorRoute) {
    //   return NextResponse.redirect(new URL("/login", request.url));
    // }
  }

  // Role-based access control
  if (token) {
    if (isLearnerRoute && userRole !== "learner" && userRole !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (
      isInstructorRoute &&
      userRole !== "instructor" &&
      userRole !== "admin"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to apply middleware to
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
