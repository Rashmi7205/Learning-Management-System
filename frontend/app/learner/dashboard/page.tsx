"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/store/hooks";
import { Separator } from "@/components/ui/separator";
import { StatsBar } from "@/components/dashboard/stats-bar";
import { ContinueLearning } from "@/components/dashboard/continue-learning";
import { MyCourseGrid } from "@/components/dashboard/my-courses-grid";
import { OrderHistory } from "@/components/dashboard/order-history";
import { Recommendations } from "@/components/dashboard/recommendations";
import { EmailVerificationBanner } from "@/components/dashboard/email-verification-banner";
import { Loader } from "@/components/ui/loader";
import {
  Course,
  Enrollment,
  Progress as ProgressType,
  Certificate,
  Order,
} from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { courseService } from "@/lib/services/api";

export default function LearnerDashboardPage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<
    Array<{
      enrollment: Enrollment;
      course: Course;
      certificate?: Certificate;
      daysRemaining?: number;
    }>
  >([]);
  const [progressData, setProgressData] = useState<ProgressType | null>(null);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [bestsellerCourses, setBestsellerCourses] = useState<Course[]>([]);

  //get featured and bestseller courses
  const getFeaturedAndBestsellers = async () => {
    const data = await courseService.getFeatured();
    setFeaturedCourses(data);
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Add a small delay to simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock data for demonstration
        const mockEnrollments: Array<{
          enrollment: Enrollment;
          course: Course;
          certificate?: Certificate;
          daysRemaining?: number;
        }> = [
          {
            enrollment: {
              _id: "enroll1",
              user: user?._id || "",
              course: "course1",
              enrolledAt: new Date("2025-10-15"),
              expiresAt: new Date("2026-04-15"),
              isCompleted: false,
              completedAt: undefined,
              certificateIssued: false,
              createdAt: new Date("2025-10-15"),
              updatedAt: new Date("2025-12-20"),
            },
            course: {
              _id: "course1",
              title: "React Fundamentals",
              subtitle: "Master React from basics to advanced concepts",
              description: "Learn React step by step",
              whatYouWillLearn: [
                "React hooks",
                "State management",
                "Components",
              ],
              requirements: ["JavaScript knowledge"],
              instructor: "instructor1",
              category: ["Web Development"],
              thumbnail: {
                publicId: "course1-thumb",
                secureUrl:
                  "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
              },
              promoVideo: undefined,
              price: 49.99,
              discountPrice: 29.99,
              currency: "USD",
              isFree: false,
              totalSections: 12,
              totalLectures: 48,
              totalDuration: 720,
              rating: 4.8,
              totalReviews: 328,
              status: "published",
              publishedAt: new Date("2025-08-01"),
              slug: "react-fundamentals",
              isFeatured: true,
              bestseller: true,
              previewLectures: ["lec1"],
              isArchived: false,
              createdAt: new Date("2025-07-01"),
              updatedAt: new Date("2025-12-01"),
            },
            daysRemaining: 97,
          },
          {
            enrollment: {
              _id: "enroll2",
              user: user?._id || "",
              course: "course2",
              enrolledAt: new Date("2025-11-01"),
              expiresAt: undefined,
              isCompleted: true,
              completedAt: new Date("2026-01-05"),
              certificateIssued: true,
              createdAt: new Date("2025-11-01"),
              updatedAt: new Date("2026-01-05"),
            },
            course: {
              _id: "course2",
              title: "TypeScript Essentials",
              subtitle: "Type-safe JavaScript development",
              description: "Master TypeScript",
              whatYouWillLearn: ["Types", "Interfaces", "Generics"],
              requirements: ["JavaScript basics"],
              instructor: "instructor2",
              category: ["Web Development"],
              thumbnail: {
                publicId: "course2-thumb",
                secureUrl:
                  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
              },
              promoVideo: undefined,
              price: 39.99,
              discountPrice: 19.99,
              currency: "USD",
              isFree: false,
              totalSections: 10,
              totalLectures: 42,
              totalDuration: 600,
              rating: 4.9,
              totalReviews: 512,
              status: "published",
              publishedAt: new Date("2025-09-01"),
              slug: "typescript-essentials",
              isFeatured: false,
              bestseller: true,
              previewLectures: ["lec1"],
              isArchived: false,
              createdAt: new Date("2025-08-01"),
              updatedAt: new Date("2025-12-01"),
            },
            certificate: {
              _id: "cert1",
              user: user?._id || "",
              course: "course2",
              certificateId: "CERT-2026-001",
              certificateUrl: {
                publicId: "cert1",
                secureUrl: "https://example.com/certificates/cert1.pdf",
              },
              issuedAt: new Date("2026-01-05"),
              createdAt: new Date("2026-01-05"),
              updatedAt: new Date("2026-01-05"),
            },
          },
          {
            enrollment: {
              _id: "enroll3",
              user: user?._id || "",
              course: "course3",
              enrolledAt: new Date("2025-12-10"),
              expiresAt: new Date("2026-03-10"),
              isCompleted: false,
              completedAt: undefined,
              certificateIssued: false,
              createdAt: new Date("2025-12-10"),
              updatedAt: new Date("2025-12-28"),
            },
            course: {
              _id: "course3",
              title: "Next.js Full Stack",
              subtitle: "Build modern full-stack applications",
              description: "Master Next.js",
              whatYouWillLearn: ["App Router", "API Routes", "Deployment"],
              requirements: ["React knowledge", "Node.js basics"],
              instructor: "instructor1",
              category: ["Web Development"],
              thumbnail: {
                publicId: "course3-thumb",
                secureUrl: "",
              },
              promoVideo: undefined,
              price: 59.99,
              discountPrice: 39.99,
              currency: "USD",
              isFree: false,
              totalSections: 14,
              totalLectures: 56,
              totalDuration: 840,
              rating: 4.7,
              totalReviews: 245,
              status: "published",
              publishedAt: new Date("2025-10-01"),
              slug: "nextjs-fullstack",
              isFeatured: true,
              bestseller: false,
              previewLectures: ["lec1"],
              isArchived: false,
              createdAt: new Date("2025-09-01"),
              updatedAt: new Date("2025-12-15"),
            },
            daysRemaining: 61,
          },
        ];

        const mockProgress: ProgressType | null = {
          _id: "prog1",
          user: user?._id || "",
          course: "course1",
          completedLectures: ["lec1", "lec2", "lec3"],
          lastAccessedLecture: "lec4",
          progressPercentage: 35,
          totalWatchTime: 4800,
          lastAccessedAt: new Date("2026-01-08"),
          createdAt: new Date("2025-10-15"),
          updatedAt: new Date("2026-01-08"),
        };

        const mockOrders: Order[] = [
          {
            _id: "order1",
            user: user?._id || "",
            course: "course1",
            orderNumber: "ORD-2025-001",
            originalPrice: 49.99,
            discountAmount: 20,
            couponCode: "WELCOME20",
            couponDiscount: 20,
            taxAmount: 1.6,
            totalAmount: 29.99,
            currency: "USD",
            status: "paid",
            paymentStatus: "captured",
            paymentIntentId: "pi_123456",
            paidAt: new Date("2025-10-15"),
            cancelledAt: undefined,
            refundedAt: undefined,
            expiresAt: undefined,
            userSnapshot: {
              email: user?.email || "",
              firstName: user?.firstName || "",
              lastName: user?.lastName || "",
              country: "US",
            },
            courseSnapshot: {
              title: "React Fundamentals",
              instructor: "instructor1",
              price: 49.99,
            },
            refund: {
              status: "none",
            },
            metadata: {
              ipAddress: "192.168.1.1",
              userAgent: "Mozilla/5.0",
              deviceType: "Desktop",
              source: "direct",
            },
            invoiceNumber: "INV-2025-001",
            invoiceUrl: "https://example.com/invoices/inv-001.pdf",
            notes: "Welcome discount applied",
            createdAt: new Date("2025-10-15"),
            updatedAt: new Date("2025-10-15"),
          },
          {
            _id: "order2",
            user: user?._id || "",
            course: "course2",
            orderNumber: "ORD-2025-002",
            originalPrice: 39.99,
            discountAmount: 20,
            couponCode: undefined,
            couponDiscount: 0,
            taxAmount: 1.6,
            totalAmount: 19.99,
            currency: "USD",
            status: "paid",
            paymentStatus: "captured",
            paymentIntentId: "pi_234567",
            paidAt: new Date("2025-11-01"),
            cancelledAt: undefined,
            refundedAt: undefined,
            expiresAt: undefined,
            userSnapshot: {
              email: user?.email || "",
              firstName: user?.firstName || "",
              lastName: user?.lastName || "",
              country: "US",
            },
            courseSnapshot: {
              title: "TypeScript Essentials",
              instructor: "instructor2",
              price: 39.99,
            },
            refund: {
              status: "none",
            },
            metadata: {
              ipAddress: "192.168.1.1",
              userAgent: "Mozilla/5.0",
              deviceType: "Desktop",
              source: "organic",
            },
            invoiceNumber: "INV-2025-002",
            invoiceUrl: "https://example.com/invoices/inv-002.pdf",
            notes: "Black Friday sale",
            createdAt: new Date("2025-11-01"),
            updatedAt: new Date("2025-11-01"),
          },
        ];

        const mockFeatured: Course[] = [
          {
            _id: "featured1",
            title: "Advanced React Patterns",
            subtitle: "Master advanced React design patterns",
            description: "Deep dive into React patterns",
            whatYouWillLearn: ["Custom Hooks", "Render Props", "HOC"],
            requirements: ["React experience"],
            instructor: "instructor3",
            category: ["Web Development"],
            thumbnail: {
              publicId: "feat1-thumb",
              secureUrl:
                "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
            },
            promoVideo: undefined,
            price: 79.99,
            discountPrice: 49.99,
            currency: "USD",
            isFree: false,
            totalSections: 15,
            totalLectures: 60,
            totalDuration: 900,
            rating: 4.9,
            totalReviews: 420,
            status: "published",
            publishedAt: new Date("2025-11-01"),
            slug: "advanced-react-patterns",
            isFeatured: true,
            bestseller: false,
            previewLectures: ["lec1"],
            isArchived: false,
            createdAt: new Date("2025-10-01"),
            updatedAt: new Date("2025-12-15"),
          },
          {
            _id: "featured2",
            title: "Web Performance Optimization",
            subtitle: "Learn to optimize web applications",
            description: "Master web performance",
            whatYouWillLearn: ["Core Web Vitals", "Caching", "Bundling"],
            requirements: ["Web development basics"],
            instructor: "instructor4",
            category: ["Web Development"],
            thumbnail: {
              publicId: "feat2-thumb",
              secureUrl:
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
            },
            promoVideo: undefined,
            price: 69.99,
            discountPrice: 44.99,
            currency: "USD",
            isFree: false,
            totalSections: 12,
            totalLectures: 50,
            totalDuration: 750,
            rating: 4.8,
            totalReviews: 310,
            status: "published",
            publishedAt: new Date("2025-12-01"),
            slug: "web-perf-optimization",
            isFeatured: true,
            bestseller: false,
            previewLectures: ["lec1"],
            isArchived: false,
            createdAt: new Date("2025-11-01"),
            updatedAt: new Date("2025-12-20"),
          },
        ];

        const mockBestsellers: Course[] = [
          {
            _id: "best1",
            title: "JavaScript Mastery",
            subtitle: "Complete JavaScript guide from zero to hero",
            description: "Master JavaScript",
            whatYouWillLearn: ["ES6+", "Async", "DOM"],
            requirements: ["Basic programming"],
            instructor: "instructor5",
            category: ["Web Development"],
            thumbnail: {
              publicId: "best1-thumb",
              secureUrl:
                "https://images.unsplash.com/photo-1618183479302-1461ae109845?w=500&h=300&fit=crop",
            },
            promoVideo: undefined,
            price: 34.99,
            discountPrice: 14.99,
            currency: "USD",
            isFree: false,
            totalSections: 20,
            totalLectures: 80,
            totalDuration: 1200,
            rating: 4.9,
            totalReviews: 2840,
            status: "published",
            publishedAt: new Date("2025-06-01"),
            slug: "javascript-mastery",
            isFeatured: false,
            bestseller: true,
            previewLectures: ["lec1"],
            isArchived: false,
            createdAt: new Date("2025-05-01"),
            updatedAt: new Date("2025-12-15"),
          },
          {
            _id: "best2",
            title: "CSS Grid & Flexbox",
            subtitle: "Master modern CSS layouts",
            description: "Learn CSS layouts",
            whatYouWillLearn: ["Grid", "Flexbox", "Responsive"],
            requirements: ["HTML & CSS basics"],
            instructor: "instructor6",
            category: ["Web Development"],
            thumbnail: {
              publicId: "best2-thumb",
              secureUrl:
                "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
            },
            promoVideo: undefined,
            price: 29.99,
            discountPrice: 9.99,
            currency: "USD",
            isFree: false,
            totalSections: 10,
            totalLectures: 42,
            totalDuration: 600,
            rating: 4.8,
            totalReviews: 1920,
            status: "published",
            publishedAt: new Date("2025-07-01"),
            slug: "css-grid-flexbox",
            isFeatured: false,
            bestseller: true,
            previewLectures: ["lec1"],
            isArchived: false,
            createdAt: new Date("2025-06-01"),
            updatedAt: new Date("2025-12-10"),
          },
        ];

        setEnrollments(mockEnrollments);
        setProgressData(mockProgress);
        setCurrentCourse(mockEnrollments[0].course);
        setOrders(mockOrders);
        //setFeaturedCourses(mockFeatured);
        //setBestsellerCourses(mockBestsellers);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setIsLoading(false);
      }
    };

    getFeaturedAndBestsellers();

    if (user?._id) {
      fetchDashboardData();
    } else {
      // Still load mock data even if user is not available
      fetchDashboardData();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Email Verification Banner */}
      {user && !user.emailVerified && (
        <>
          <EmailVerificationBanner
            emailVerified={user.emailVerified}
            email={user.email}
          />
        </>
      )}

      {/* Header */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('images/counter.svg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 p-6 md:p-10">
          {/* Left Section */}
          <div className="max-w-xl space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Welcome back, {user?.firstName || "Learner"} 👋
            </h1>
            <p className="text-gray-200 text-sm md:text-base">
              Here's your learning progress and recommended courses.
            </p>
            <div className="w-full flex items-center gap-4 mt-4 cursor-pointer hover:opacity-90 transition">
              <div>
                <Button
                  variant="outline"
                  className="rounded-sm border-2 border-white text-white hover:bg-white hover:text-black transition h-[40px] p-6"
                >
                  Become An Instructor
                  <ArrowRight />
                </Button>
              </div>
              <div>
                <Image
                  src="/images/become-instructor.png"
                  alt="Become An Instructor"
                  width={100}
                  height={60}
                />
              </div>
            </div>
          </div>

          {/* Right Section */}

          <div className="w-full lg:w-[380px] bg-background/95 backdrop-blur-md rounded-xl p-4 shadow-lg">
            <h2 className="text-lg font-semibold text-foreground">
              Continue Learning
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Pick up where you left off
            </p>

            <ContinueLearning
              course={currentCourse || undefined}
              progress={progressData || undefined}
            />
          </div>
        </div>
      </div>

      {/* Stats Bar - Shows enrollment and completion metrics */}
      {user && (
        <StatsBar
          coursesEnrolled={user.totalCoursesEnrolled}
          coursesCompleted={user.totalCoursesCompleted}
          learningHours={Math.round(user.totalLearningTime / 3600)}
        />
      )}

      <Separator />

      {/* My Courses & Order History Tabs */}
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="orders">Purchase History</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Your Enrolled Courses
            </h3>
            <p className="text-sm text-muted-foreground">
              View all your courses, track progress, and download certificates
            </p>
          </div>
          <MyCourseGrid enrollments={enrollments} />
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              Order History
            </h3>
            <p className="text-sm text-muted-foreground">
              View your purchases, invoices, and refund status
            </p>
          </div>
          <OrderHistory orders={orders} />
        </TabsContent>
      </Tabs>

      <Separator />

      {/* Recommendations Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          Recommended For You
        </h2>
        <p className="text-muted-foreground">
          Discover featured and bestselling courses to expand your skills
        </p>
        {featuredCourses && (
          <Recommendations
            featuredCourses={featuredCourses}
            bestsellerCourses={bestsellerCourses}
          />
        )}
      </div>
    </div>
  );
}
