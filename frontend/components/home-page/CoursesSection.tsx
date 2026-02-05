"use client";
import { use, useEffect, useState } from "react";
import { Star, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchCourses } from "@/lib/store/slices/courseClice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { CourseCardData } from "@/lib/types";
import Link from "next/link";


const CoursesSection = () => {
  const dispatch = useAppDispatch();
  const courses:CourseCardData[] = useAppSelector((state) => state.courses);
  useEffect(() => {
    if(courses.length === 0){
      dispatch(fetchCourses());
    }
  }, [courses.length, dispatch]);

  return (
    <section id="courses" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Popular Courses
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Explore Our Best Courses
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Learn from industry experts and world-class researchers with our
              most popular courses.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Courses →
          </Button>
        </div>

        {/* Course Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">
                No courses available at the moment.
              </p>
            </div>
          ) : (
            courses.map((course) => (
              <div
                key={course._id}
                className="bg-card rounded-2xl border border-border overflow-hidden card-hover shadow-soft group"
              >
                {/* Course Image */}
                <div className="relative">
                  <img
                    src={course.thumbnail?.secureUrl || ""}
                    alt={course.title}
                    className="course-image w-full"
                  />
                  {course.isFree ? (
                    <span className="free-badge">Free</span>
                  ) : (
                    <span className="price-badge">${course.price}</span>
                  )}
                  {/* Categories */}
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {course.category.slice(0, 2).map((cat, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-white/90 text-foreground text-xs"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-5">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.totalLectures} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.totalDuration} min</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={course?.instructor?.user?.avatar?.secureUrl || ""}
                      alt={course.instructor.user.firstName + " " + course.instructor.user.lastName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-sm text-muted-foreground">
                      {course.instructor.user.firstName} {course.instructor.user.lastName}
                    </span>
                  </div>

                  {/* Rating & Price */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span className="font-semibold text-foreground">
                        {course.averageRating.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        ({course.reviewCount.toString().padStart(2, "0")})
                      </span>
                    </div>
                    <Link
                      href={`/courses/${course._id}`}
                    >
                    <Button
                      variant="default"
                       size="sm" className="btn-cta text-xs py-3 px-4 cursor-pointer">
                        View Details
                    </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
