"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreHorizontal,
  Users,
  Clock,
  PlayCircle,
  BookOpen,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { EnrolledCoursesSkeleton } from "./EnrolledCoursesSkeleton";
import { getEnrolledCoursesAction } from "@/lib/store/slices/courseClice";

const CATEGORIES = ["All", "In Progress", "Completed", "Not Started"];

export const EnrolledCoursesGrid = () => {
  const [activeTab, setActiveTab] = useState("All");
  const dispatch = useDispatch<AppDispatch>();

  // 1. Grab data from Redux
  const { enrolledCourses, loading } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    dispatch(getEnrolledCoursesAction());
  }, [dispatch]);
  const formattedCourses = useMemo(() => {
    if (!enrolledCourses) return [];
    return enrolledCourses.map((item: any) => ({
      id: item.course?._id,
      title: item.course?.title,
      instructor: `${item.course?.instructor?.firstName || "Unknown"} ${item.course?.instructor?.lastName || ""}`,
      category: item.course?.category?.name || "General",
      progress: item.progress?.percentage || 0,
      thumbnail: item.course?.thumbnail,
      status: item.progress?.percentage === 100
        ? "Completed"
        : item.progress?.percentage > 0
        ? "In Progress"
        : "Not Started",
      students: item.course?.totalStudents || 0,
      duration: item.course?.duration || "Self-paced",
    }));
  }, [enrolledCourses]);

  // 3. Filter the formatted courses
  const filteredCourses = useMemo(() => {
    if (activeTab === "All") return formattedCourses;
    return formattedCourses.filter((course) => course.status === activeTab);
  }, [activeTab, formattedCourses]);

  // Handle Loading State
  if (loading && enrolledCourses.length === 0) {
    return <EnrolledCoursesSkeleton />;
  }

  return (
    <section className="space-y-8">
      {/* HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-serif font-black tracking-tight italic">
            My <span className="text-[#06D001]">Courses</span>
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-1">
            {filteredCourses.length} Active Enrollments
          </p>
        </div>

        <div className="flex gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-6 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${
                activeTab === tab
                  ? "bg-white dark:bg-[#2845D6] text-[#2845D6] dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group h-full flex flex-col overflow-hidden rounded-[2.5rem] border-none bg-white dark:bg-slate-900/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={course.thumbnail || `https://picsum.photos/seed/${course.id}/800/450`}
                      alt={course.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black text-[#2845D6] uppercase tracking-tighter">
                        {course.category}
                      </span>
                    </div>

                    {course.progress > 0 && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-[#06D001] rounded-lg text-[10px] font-bold text-white uppercase tracking-tighter">
                        {course.progress === 100 ? "Completed" : `${course.progress}%`}
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-bold text-lg leading-snug line-clamp-2 min-h-[3.5rem] group-hover:text-[#2845D6] transition-colors">
                        {course.title}
                      </h4>
                      <button className="shrink-0 p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors">
                        <MoreHorizontal className="w-5 text-slate-400" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7 border border-white dark:border-slate-800">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${course.instructor}`} />
                        <AvatarFallback className="text-[10px]">IN</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-slate-500 font-sans">
                        {course.instructor}
                      </span>
                    </div>

                    <div className="space-y-1.5 py-2">
                      <div className="flex justify-between text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
                        <span>Curriculum Progress</span>
                        <span className="text-[#2845D6]">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5 bg-slate-100 dark:bg-white/5" />
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest pb-4">
                      <div className="flex items-center gap-1.5"><Users className="w-3" /> {course.students}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-3" /> {course.duration}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button className="rounded-xl bg-[#2845D6] hover:bg-[#1e36af] text-white shadow-lg shadow-blue-500/20 group/btn">
                        {course.progress === 0 ? "Start" : "Resume"}
                        <PlayCircle className="ml-2 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      </Button>
                      <Button variant="outline" className="rounded-xl border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5">
                        Details <BookOpen className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">No courses found in this category</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};