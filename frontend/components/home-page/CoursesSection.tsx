"use client";
import { useEffect, useState } from "react";
import { Star, Clock, BookOpen, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchCourses } from "@/lib/store/slices/courseClice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { CourseCardData } from "@/lib/types";
import Link from "next/link";

// Card Components (matching Course Loop design)
const Card = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-xl bg-white border border-slate-200 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 ${className}`} {...props} />
);

const CardContent = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);

const CoursesSection = () => {
  const dispatch = useAppDispatch();
  const courses: CourseCardData[] = useAppSelector((state) => state.courses);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [courses.length, dispatch]);

  return (
    <section
      id="courses"
      className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
            Trending Courses
          </h2>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto">
            Handpicked courses designed by industry experts to help you master
            in-demand skills
          </p>
        </div>

        {/* Course Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-500 mb-4">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 text-lg">Loading courses...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.slice(0, 8).map((course, index) => (
                <Card
                  key={course._id}
                  className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-[#2845D6] cursor-pointer animate-slide-up bg-white/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Course Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        course.thumbnail?.secureUrl || "/placeholder-course.jpg"
                      }
                      alt={course.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Category Badge - Top Left */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#2845D6]/90 text-white border-[#2845D6]/20 backdrop-blur-sm">
                        {course.category[0] || "General"}
                      </Badge>
                    </div>
                    {/* Price Badge - Top Right */}
                    <div className="absolute top-3 right-3">
                      {course.isFree ? (
                        <Badge
                          variant="secondary"
                          className="bg-[#06D001]/90 text-white border-[#06D001]/20 backdrop-blur-sm"
                        >
                          Free
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-white/90 text-slate-700 border-slate-200 backdrop-blur-sm"
                        >
                          ${course.price}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Course Info */}
                  <CardHeader className="pb-3">
                    <h3 className="font-semibold text-lg text-slate-100 group-hover:text-white transition-colors line-clamp-2 mb-2">
                      {course.title}
                    </h3>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mt-3">
                      <img
                        src={
                          course?.instructor?.user?.avatar?.secureUrl ||
                          "/placeholder-avatar.jpg"
                        }
                        alt={`${course.instructor.user.firstName} ${course.instructor.user.lastName}`}
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-sm text-slate-200">
                        {course.instructor.user.firstName}{" "}
                        {course.instructor.user.lastName}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#d7f22a] text-[#e4f52c]" />
                        <span className="font-semibold text-sm">
                          {course.averageRating.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-200">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">
                          ({course.reviewCount.toString().padStart(2, "0")})
                        </span>
                      </div>
                    </div>

                    {/* Lessons and Duration */}
                    <div className="flex items-center gap-4 text-sm text-slate-200 mb-4">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.totalLectures} Lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.totalDuration} min</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="pt-4 border-t border-slate-100">
                      <Link href={`/courses/${course._id}`} className="block">
                        <Button
                          size="sm"
                          variant="default"
                          className="w-full group/btn hover:bg-[#2845D6] hover:text-white transition-colors"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* View All Courses Button */}
            <div className="text-center mt-12">
              <Link href="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#2845D6] text-[#2845D6] hover:bg-[#2845D6] hover:text-white"
                >
                  View All Courses
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
