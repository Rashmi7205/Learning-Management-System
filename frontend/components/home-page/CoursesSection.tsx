"use client";
import { useEffect } from "react";
import {
  Star,
  Clock,
  BookOpen,
  Users,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import {  getFeaturedCoursesList } from "@/lib/store/slices/courseClice";

const CoursesSection = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.courses.featuredCourses);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(getFeaturedCoursesList());
    }
    console.log(courses);
  }, [courses.length, dispatch]);

  return (
    <section
      id="courses"
      className="py-24 bg-[#020617] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl lg:text-5xl font-black mb-4">
              Unlock Your <span className="text-blue-500">Potential</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Expert-led courses designed to take you from beginner to
              job-ready.
            </p>
          </div>
          <Link href="/courses">
            <Button
              variant="ghost"
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
            >
              Explore Courses <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.slice(0, 8).map((course, index) => (
            <div
              key={course._id}
              className="group flex flex-col bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* Thumbnail Area */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.thumbnail?.secureUrl || "/placeholder-course.jpg"}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                {/* Category & Rating Overlay */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-blue-600/90 text-white backdrop-blur-md border-none text-[10px] font-bold">
                    {course.category[0] || "Coding"}
                  </Badge>
                </div>

                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-white">
                      {course.averageRating.toFixed(1) || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                {/* Instructor Row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={
                        course.instructor?.user?.avatar?.secureUrl ||
                        "/placeholder-avatar.jpg"
                      }
                      alt="Instructor"
                      className="w-8 h-8 rounded-full object-cover border border-white/20"
                    />
                    <div className="absolute -right-1 -bottom-1 bg-blue-500 rounded-full p-0.5 border border-[#020617]">
                      <ShieldCheck className="w-2 h-2 text-white" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium leading-none mb-1">
                      Instructor
                    </span>
                    <span className="text-sm font-bold text-white truncate w-32">
                      {course.instructor?.user?.firstName}{" "}
                      {course.instructor?.user?.lastName}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-lg leading-tight mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>

                {/* Course Stats Card */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span>{course.totalLectures || 0} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{course.totalDuration || 0} hours</span>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="mt-auto flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                      Price
                    </span>
                    <span className="text-xl font-black text-white">
                      {course.isFree ? (
                        <span className="text-green-400">FREE</span>
                      ) : (
                        `₹${course.price || 0}`
                      )}
                    </span>
                  </div>
                  <Link
                    href={`/courses/${course.title
                      .toLowerCase()
                      .trim()
                      .replace(/[^a-z0-9\s-]/g, "")
                      .replace(/\s+/g, "-")}?cid=${course._id}`}
                    className="flex-1"
                  >
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 cursor-pointer">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
