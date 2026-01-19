import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  Download,
  CheckCircle2,
  Clock,
  Users,
  BookOpen,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

// Type Definitions based on your data structure
interface Avatar {
  publicId: string;
  secureUrl: string;
}

interface User {
  firstName: string;
  lastName: string;
  avatar: Avatar;
}

interface Instructor {
  _id: string;
  title: string;
  expertise: string[];
  rating: number;
  totalStudents: number;
  totalCourses: number;
  isFeatured: boolean;
  user: User;
}

interface Thumbnail {
  publicId: string;
  secureUrl: string;
}

interface Course {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  instructor: Instructor;
  category?: string[];
  price: number;
  discountPrice?: number;
  currency: string;
  isFree: boolean;
  status: string;
  createdAt: string;
  enrollmentCount: number;
  reviewCount: number;
  averageRating: number;
  completionRate?: number;
  thumbnail?: Thumbnail;
  totalDuration?: number;
  totalLectures?: number;
}

interface Certificate {
  certificateUrl?: {
    secureUrl: string;
  };
}

interface Enrollment {
  isCompleted: boolean;
}

interface CourseCardProps {
  course: Course;
  enrollment?: Enrollment;
  certificate?: Certificate;
  daysRemaining?: number;
  className?: string;
}

export const CourseCard = ({
  course,
  enrollment,
  certificate,
  daysRemaining,
  className,
}: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const thumbnailUrl =
    course.thumbnail?.secureUrl ||
    "/images/course-fallback.jpg";

  const discountPercentage =
    course.discountPrice && course.discountPrice < course.price
      ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
      : 0;

  // Use averageRating if available, otherwise use instructor rating
  const displayRating =
    course.averageRating > 0
      ? course.averageRating
      : course.instructor?.rating || 0;

  return (
    <div
      className={cn(
        "w-full max-w-sm transition-all duration-300 hover:scale-[1.02]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-0">
        <CardContent className="p-6">
          {/* Image Section */}
          <div className="relative group rounded-2xl overflow-hidden mb-5 h-56">
            {/* Thumbnail Image */}
            <div className="absolute h-full w-full">
              {!thumbnailUrl && (
                <Image
                  src="/images/course-fallback.jpg"
                  alt={course.title}
                  fill
                  className="object-cover transition-all duration-300"

                />
              )}
              <Image
                src={thumbnailUrl}
                alt={course.title}
                fill
                className="object-cover transition-all duration-300"
              />
            </div>

            {/* Gradient Overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent transition-all duration-700",
                isHovered ? "opacity-0" : "opacity-100"
              )}
            />

            {/* Animated shapes on hover */}
            <div
              className={cn(
                "absolute inset-0 transition-all duration-700",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-6 left-6 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl" />
            </div>

            {/* Top Left - Category Badges */}
            {course.category && course.category.length > 0 && (
              <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-10">
                {course.category.slice(0, 2).map((cat) => (
                  <Badge
                    key={cat}
                    className="bg-white/90 text-purple-700 hover:bg-white border-0 text-xs font-semibold px-3 py-1"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            )}

            {/* Top Right - Rating & Discount */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              {displayRating > 0 && (
                <Badge className="flex items-center gap-1 bg-white/90 text-purple-700 hover:bg-white border-0">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  {displayRating.toFixed(1)}
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-xs font-bold">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>

            {/* Bottom Left - Status Badges */}
            {(enrollment?.isCompleted ||
              (daysRemaining && daysRemaining < 30)) && (
              <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap z-10">
                {enrollment?.isCompleted && (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 flex items-center gap-1 border-0">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </Badge>
                )}
                {daysRemaining && daysRemaining < 30 && (
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0">
                    {daysRemaining}d left
                  </Badge>
                )}
              </div>
            )}

            {/* Course Stats - Revealed on Hover */}
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 transition-all duration-500 z-10",
                isHovered
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              )}
            >
              <div className="flex items-center justify-between text-white text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrollmentCount || 0} enrolled</span>
                </div>
                {course.totalLectures && (
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.totalLectures} lectures</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Course Title */}
          <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight line-clamp-2">
            {course.title}
          </h3>

          {/* Subtitle with hover reveal effect */}
          {course.subtitle && (
            <p
              className={cn(
                "text-sm text-slate-500 mb-4 transition-all duration-500",
                isHovered ? "line-clamp-none" : "line-clamp-2"
              )}
            >
              {course.subtitle}
            </p>
          )}

          {/* Instructor Info */}
          {course.instructor && (
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
              <div className="relative w-10 h-10 rounded-full ring-2 ring-purple-100 overflow-hidden flex-shrink-0">
                <Image
                  src={
                    course.instructor.user?.avatar?.secureUrl ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  }
                  alt={`${course.instructor.user?.firstName || ""} ${
                    course.instructor.user?.lastName || ""
                  }`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">
                  {course.instructor.user?.firstName || ""}{" "}
                  {course.instructor.user?.lastName || ""}
                </p>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {course.instructor.title}
                </p>
              </div>
            </div>
          )}

          {/* Course Duration & Expertise - Revealed on Hover */}
          <div
            className={cn(
              "mb-4 transition-all duration-500 overflow-hidden",
              isHovered ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            {(course.totalDuration || course.totalLectures) && (
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                {course.totalDuration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.totalDuration} min</span>
                  </div>
                )}
                {course.totalLectures && (
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    <span>{course.totalLectures} lectures</span>
                  </div>
                )}
              </div>
            )}

            {/* Expertise Tags */}
            {course.instructor?.expertise &&
              course.instructor.expertise.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {course.instructor.expertise.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-lg font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
          </div>

          {/* Price and Action Buttons */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-800">
                  {course.currency === "INR" ? "₹" : "$"}
                  {course.discountPrice || course.price}
                </span>
                {course.discountPrice &&
                  course.discountPrice < course.price && (
                    <span className="text-lg text-slate-400 line-through">
                      {course.currency === "INR" ? "₹" : "$"}
                      {course.price}
                    </span>
                  )}
              </div>
              {!course.isFree && discountPercentage > 0 && (
                <p className="text-xs text-slate-500 mt-1">
                  Limited time offer
                </p>
              )}
            </div>

            <div className="flex gap-2">
              {certificate && certificate.certificateUrl?.secureUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-full hover:bg-purple-50 hover:border-purple-200 transition-all"
                >
                  <Link
                    href={certificate.certificateUrl.secureUrl}
                    target="_blank"
                  >
                    <Download className="w-5 h-5" />
                  </Link>
                </Button>
              )}
              <Button
                asChild
                className={cn(
                  "group rounded-full bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6",
                  isHovered ? "w-auto" : "w-12 h-12 p-0"
                )}
              >
                <Link href={`/courses/${course._id}`}>
                  <span
                    className={cn(
                      "transition-all duration-300 whitespace-nowrap",
                      isHovered ? "opacity-100 w-auto mr-2" : "opacity-0 w-0"
                    )}
                  >
                    {enrollment?.isCompleted ? "Review" : "Continue"}
                  </span>
                  <ArrowRight
                    className={cn(
                      "h-5 w-5 transition-transform group-hover:translate-x-1",
                      isHovered ? "" : "mx-auto"
                    )}
                  />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
