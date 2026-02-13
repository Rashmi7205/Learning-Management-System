"use client";

import { useState, useEffect, useMemo } from "react"; // Added useMemo
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, PlayCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store/store";
import { EnrolledCoursesSkeleton } from "./EnrolledCoursesSkeleton";
import { EnrolledCourse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { getEnrolledCoursesAction } from "@/lib/store/slices/courseClice";

const CATEGORIES = ["All", "In Progress", "Completed", "Not Started"];

export const EnrolledCoursesGrid = () => {
  const [activeTab, setActiveTab] = useState("All");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { enrolledCourses, loading } = useSelector(
    (state: RootState) => state.courses
  );

  useEffect(() => {
    dispatch(getEnrolledCoursesAction());
  }, [dispatch]);

  // --- FILTER LOGIC ---
  const filteredCourses = useMemo(() => {
    if (!enrolledCourses) return [];

    switch (activeTab) {
      case "In Progress":
        return enrolledCourses.filter(
          (item) => item.progress.percentage > 0 && item.progress.percentage < 100
        );
      case "Completed":
        return enrolledCourses.filter((item) => item.progress.percentage === 100);
      case "Not Started":
        return enrolledCourses.filter((item) => item.progress.percentage === 0);
      default:
        return enrolledCourses; // "All"
    }
  }, [activeTab, enrolledCourses]);

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
            {filteredCourses.length} {activeTab} Enrollments
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

      {/* GRID LAYOUT */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course: EnrolledCourse) => (
              <motion.div
                key={course.enrollmentId}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group h-full flex flex-col overflow-hidden rounded-[2.5rem] border-none bg-white dark:bg-slate-900/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={
                        course.course.thumbnail?.secureUrl ||
                        `https://picsum.photos/seed/${course.course._id}/800/450`
                      }
                      alt={course.course.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-[#06D001] rounded-lg text-[10px] font-bold text-white uppercase tracking-tighter shadow-md">
                        {course.progress.percentage === 100
                          ? "Completed"
                          : `${course.progress.percentage}%`}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-bold text-lg leading-snug line-clamp-2 min-h-[3.5rem] group-hover:text-[#2845D6] transition-colors">
                        {course.course.title}
                      </h4>
                      <button className="shrink-0 p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors">
                        <MoreHorizontal className="w-5 text-slate-400" />
                      </button>
                    </div>

                    <div className="space-y-1.5 py-2">
                      <div className="flex justify-between text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">
                        <span>Curriculum Progress</span>
                        <span className="text-[#2845D6]">
                          {course.progress.percentage}%
                        </span>
                      </div>
                      <Progress
                        value={course.progress.percentage}
                        className="h-1.5 bg-slate-100 dark:bg-white/5"
                      />
                    </div>

                    <div className="flex pt-2">
                      <Button
                        onClick={() =>
                          router.push(`/learner/courses/${course.course._id}`)
                        }
                        className="w-full rounded-xl bg-[#2845D6] hover:bg-[#1e36af] text-white shadow-lg shadow-blue-500/20 cursor-pointer transition-transform active:scale-95"
                      >
                        {course.progress.percentage === 0 ? "Start" : "Resume"}
                        <PlayCircle className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center"
            >
              <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">
                No courses {activeTab !== "All" ? `marked as "${activeTab}"` : "found"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};