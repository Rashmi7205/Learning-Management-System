import { CourseDetailsData } from "@/lib/types";
import { ChevronRight, Star, Users, Globe, Clock, Book, BookOpen } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const CourseHero = ({ course }: { course: CourseDetailsData }) => (
  <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-blue-600/10 to-transparent">
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -z-10" />
    <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-6">
            <span>Courses</span> <ChevronRight className="w-4 h-4" />{" "}
            <span>{course.category}</span>
          </div>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {course.title}
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
            {course.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-8 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              <span className="font-bold text-white text-lg">
                {course.averageRating}
              </span>
              <span className="text-slate-500">
                ({course.totalReviews} reviews)
              </span>
            </div>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Clock />
              <span className="text-slate-300 font-medium">
                {Math.round((course?.totalDuration ?? 0) / 60)} hrs
              </span>
            </div>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <BookOpen />
              <span className="text-slate-300 font-medium">
                {course.totalLectures || 0} Lectures
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border-2 border-blue-500/50 p-0.5 bg-transparent">
              <AvatarImage
                src={course.instructor.user.avatar?.secureUrl}
                alt={`${course.instructor.user.firstName}'s avatar`}
                className="rounded-full object-cover"
              />
              <AvatarFallback className="bg-slate-800 text-blue-400 font-bold">
                {course.instructor.user.firstName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                Created by
              </p>
              <p className="text-white font-semibold underline decoration-blue-500/50 underline-offset-4 cursor-pointer hover:text-blue-400 transition-colors">
                {course.instructor.user.firstName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
