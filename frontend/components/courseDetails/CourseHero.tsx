import { ChevronRight, Star, Users, Globe } from "lucide-react";
import Image from "next/image";

export const CourseHero = ({ course }: { course: any }) => (
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
                {course.rating}
              </span>
              <span className="text-slate-500">
                ({course.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300 font-medium">
                {course.students.toLocaleString()} students
              </span>
            </div>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-slate-400" />
              <span className="text-slate-300 font-medium">
                {course.language}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full border-2 border-blue-500/50 p-0.5">
              <Image
                src={course.instructor.avatar}
                alt="Avatar"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                Created by
              </p>
              <p className="text-white font-semibold underline decoration-blue-500/50 underline-offset-4 cursor-pointer hover:text-blue-400 transition-colors">
                {course.instructor.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
