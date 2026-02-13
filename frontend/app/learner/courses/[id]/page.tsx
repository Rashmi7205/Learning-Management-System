"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  CheckCircle2,
  Circle,
  Download,
  ArrowLeft,
  FileText,
  Clock,
  BookOpen,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LectureVideoPlayer } from "@/components/courseDetails/LectureVideoPlayer";
import {
  fetchCourseContent,
  markLectureComplete,
  updateLastAccessed,
  setCurrentLecture,
} from "@/lib/store/slices/learningSlice";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export default function LecturePage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const courseId = params.id as string;

  const initialLectureId = params.lectureId as string;

  const { courseContent, currentLecture, loading, error, markingComplete } =
    useAppSelector((state) => state.learning);

  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Fetch course content on mount
  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseContent(courseId));
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    if (courseContent && !currentLecture) {
      if (initialLectureId) {
        let foundLecture = null;
        let foundSection = null;

        for (const section of courseContent.sections) {
          const lecture = section.lectures.find(
            (l) => l._id === initialLectureId,
          );
          if (lecture) {
            foundLecture = lecture;
            foundSection = section;
            break;
          }
        }

        if (foundLecture && foundSection) {
          dispatch(
            setCurrentLecture({
              lecture: foundLecture,
              section: foundSection,
            }),
          );
        }
      } else if (courseContent.nextLecture) {
        // Use next lecture
      dispatch(
          setCurrentLecture({
            lecture: courseContent.nextLecture.lecture,
            section: courseContent.nextLecture.section,
          }),
        );
      } else if (
        courseContent.sections.length > 0 &&
        courseContent.sections[0].lectures.length > 0
      ) {
        // Fallback to first lecture
        dispatch(
          setCurrentLecture({
            lecture: courseContent.sections[0].lectures[0],
            section: courseContent.sections[0],
          }),
        );
      }
    }
  }, [courseContent, currentLecture, initialLectureId, dispatch]);

  // Auto-expand section containing current lecture
  useEffect(() => {
    if (currentLecture && courseContent) {
      const sectionId = courseContent.sections.find((s) =>
        s.lectures.some((l) => l._id === currentLecture._id),
      )?._id;

      if (sectionId && !expandedSections.includes(sectionId)) {
        setExpandedSections((prev) => [...prev, sectionId]);
      }
    }
  }, [currentLecture, courseContent]);

  // Handle lecture selection
  const handleLectureSelect = async (lecture: any, section: any) => {
    dispatch(setCurrentLecture({ lecture, section }));

    // Update last accessed
    try {
      await dispatch(
        updateLastAccessed({
          courseId,
          lectureId: lecture._id,
        }),
      ).unwrap();
    } catch (error) {
      console.error("Failed to update last accessed:", error);
    }
  };

  // Handle mark as complete
  const handleMarkComplete = async () => {
    if (!currentLecture) return;

    try {
      await dispatch(
        markLectureComplete({
          courseId,
          lectureId: currentLecture._id,
        }),
      ).unwrap();

      toast.success("Lecture marked as complete!");

      // Auto-play next lecture
      const nextLecture = getNextLecture();
      if (nextLecture) {
        setTimeout(() => {
          handleLectureSelect(nextLecture.lecture, nextLecture.section);
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error || "Failed to mark lecture as complete");
    }
  };

  // Get next lecture
  const getNextLecture = () => {
    if (!courseContent || !currentLecture) return null;

    for (let i = 0; i < courseContent.sections.length; i++) {
      const section = courseContent.sections[i];
      const lectureIndex = section.lectures.findIndex(
        (l) => l._id === currentLecture._id,
      );

      if (lectureIndex !== -1) {
        // Check next lecture in same section
        if (lectureIndex < section.lectures.length - 1) {
          return {
            lecture: section.lectures[lectureIndex + 1],
            section: section,
          };
        }
        // Check first lecture of next section
        if (i < courseContent.sections.length - 1) {
          const nextSection = courseContent.sections[i + 1];
          if (nextSection.lectures.length > 0) {
            return {
              lecture: nextSection.lectures[0],
              section: nextSection,
            };
          }
        }
      }
    }

    return null;
  };

  // Toggle section expand/collapse
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  // Loading state
  if (loading && !courseContent) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-[#020617]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#2845D6]" />
          <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
            Loading course content...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-[#020617]">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-serif font-black">Access Denied</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">{error}</p>
          <Button
            onClick={() => router.push("/my-courses")}
            className="bg-[#2845D6] hover:bg-[#1f38b0]"
          >
            Back to My Courses
          </Button>
        </div>
      </div>
    );
  }

  if (!courseContent || !currentLecture) {
    return null;
  }

  const currentSection = courseContent.sections.find((s) =>
    s.lectures.some((l) => l._id === currentLecture._id),
  );

  const nextLecture = getNextLecture();

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden bg-white dark:bg-[#020617]">
      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto no-scrollbar border-r border-slate-200/50 dark:border-white/5">
        {/* VIDEO PLAYER */}
        <div className="bg-slate-900 aspect-video relative group overflow-hidden shadow-2xl">
          <LectureVideoPlayer
            url={currentLecture.videoUrl?.secureUrl || "#"}
            thumbnail={courseContent.thumbnail?.secureUrl}
            onEnded={handleMarkComplete}
          />
        </div>

        {/* LECTURE DETAILS */}
        <div className="p-8 lg:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <Link
                href="/my-courses"
                className="flex items-center gap-2 text-[#2845D6] font-mono text-[10px] font-black uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
              >
                <ArrowLeft className="w-3 h-3" /> Back to My Courses
              </Link>
              <h1 className="text-3xl font-serif font-black italic tracking-tight">
                {currentLecture.title}
              </h1>
              <p className="text-slate-500 font-medium">
                Part of: {courseContent.title}
              </p>
              {currentSection && (
                <p className="text-sm text-slate-400 font-mono">
                  {currentSection.title}
                </p>
              )}
            </div>

            {/* MARK COMPLETE BUTTON */}
            <Button
              onClick={handleMarkComplete}
              disabled={currentLecture.isCompleted || markingComplete}
              className={cn(
                "font-mono text-xs font-bold uppercase tracking-wider",
                currentLecture.isCompleted
                  ? "bg-[#06D001] hover:bg-[#06D001]"
                  : "bg-[#2845D6] hover:bg-[#1f38b0]",
              )}
            >
              {markingComplete ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Marking...
                </>
              ) : currentLecture.isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Completed
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark as Complete
                </>
              )}
            </Button>
          </div>

          {/* LECTURE METADATA */}
          <div className="flex flex-wrap gap-4">
            {currentLecture.duration && (
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4" />
                <span className="font-mono">
                  {Math.floor(currentLecture.duration / 60)}:
                  {String(currentLecture.duration % 60).padStart(2, "0")}
                </span>
              </div>
            )}
            {currentLecture.order !== undefined && (
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <BookOpen className="w-4 h-4" />
                <span className="font-mono">
                  Lecture {currentLecture.order}
                </span>
              </div>
            )}
          </div>

          {/* TABS */}
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="bg-transparent border-b border-slate-200 dark:border-white/5 rounded-none w-full justify-start h-12 p-0 gap-8">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#2845D6] rounded-none bg-transparent font-mono text-[10px] uppercase font-bold tracking-widest"
              >
                Overview
              </TabsTrigger>
              {currentLecture.attachments &&
                currentLecture.attachments.length > 0 && (
                  <TabsTrigger
                    value="resources"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#2845D6] rounded-none bg-transparent font-mono text-[10px] uppercase font-bold tracking-widest"
                  >
                    Resources ({currentLecture.attachments.length})
                  </TabsTrigger>
                )}
              <TabsTrigger
                value="notes"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#2845D6] rounded-none bg-transparent font-mono text-[10px] uppercase font-bold tracking-widest"
              >
                Notes
              </TabsTrigger>
            </TabsList>

            {/* OVERVIEW TAB */}
            <TabsContent
              value="overview"
              className="py-6 prose prose-slate dark:prose-invert max-w-none"
            >
              {currentLecture.description ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentLecture.description,
                  }}
                  className="text-slate-600 dark:text-slate-400 leading-relaxed"
                />
              ) : (
                <p className="text-slate-500 dark:text-slate-500 italic">
                  No description available for this lecture.
                </p>
              )}
            </TabsContent>

            {/* RESOURCES TAB */}
            {currentLecture.attachments &&
              currentLecture.attachments.length > 0 && (
                <TabsContent
                  value="resources"
                  className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {currentLecture.attachments.map(
                    (attachment: any, i: number) => (
                      <a
                        key={i}
                        href={attachment.secureUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-[#2845D6]/30 transition-colors group cursor-pointer"
                      >
                        <div className="p-2 bg-white dark:bg-slate-900 rounded-lg group-hover:bg-[#2845D6] group-hover:text-white transition-colors">
                          <Download className="w-4 h-4" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <span className="text-xs font-bold font-mono block truncate">
                            {attachment.filename}
                          </span>
                          {currentLecture.isDownloadable && (
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">
                              Click to download
                            </span>
                          )}
                        </div>
                      </a>
                    ),
                  )}
                </TabsContent>
              )}

            {/* NOTES TAB */}
            <TabsContent value="notes" className="py-6">
              <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-6 border border-slate-200 dark:border-white/5">
                <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                  Notes feature coming soon. You'll be able to take notes while
                  watching lectures and access them anytime.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* NEXT LECTURE CARD */}
          {nextLecture && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#2845D6]/5 to-[#06D001]/5 rounded-2xl p-6 border border-[#2845D6]/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-mono font-bold text-[#2845D6] uppercase tracking-wider">
                    Up Next
                  </p>
                  <h3 className="text-lg font-bold">
                    {nextLecture.lecture.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {nextLecture.section.title}
                  </p>
                </div>
                <Button
                  onClick={() =>
                    handleLectureSelect(
                      nextLecture.lecture,
                      nextLecture.section,
                    )
                  }
                  className="bg-[#2845D6] hover:bg-[#1f38b0] shrink-0"
                >
                  <Play className="w-4 h-4 mr-2 fill-current" />
                  Play Next
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* SIDEBAR: Curriculum */}
      <aside className="w-full lg:w-[420px] h-screen sticky top-0 bg-slate-50 dark:bg-[#020617] flex flex-col border-l border-slate-200/50 dark:border-white/5">
        {/* FIXED HEADER */}
        <div className="shrink-0 p-6 border-b border-slate-200 dark:border-white/5">
          <h2 className="text-lg font-serif font-black italic">
            Course <span className="text-[#2845D6]">Curriculum</span>
          </h2>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400">
              <span>
                {courseContent.progress?.completedLectures || 0}/
                {courseContent.progress?.totalLectures || 0} Completed
              </span>
              <span>{courseContent.progress?.percentage || 0}% Total</span>
            </div>
            <Progress
              value={courseContent.progress?.percentage || 0}
              className="h-1.5 bg-slate-200 dark:bg-white/5"
            />
          </div>
        </div>

        {/* SCROLLABLE AREA */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {courseContent.sections.map((section, sIdx) => {
              const isExpanded = expandedSections.includes(section._id);
              const sectionProgress = section.progressPercentage || 0;

              return (
                <div key={section._id} className="space-y-2">
                  {/* SECTION HEADER */}
                  <button
                    onClick={() => toggleSection(section._id)}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex-1 text-left">
                      <h3 className="text-[10px] font-mono font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                        {section.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-mono text-slate-400">
                          {section.completedLectures || 0}/
                          {section.totalLectures} lectures
                        </span>
                        <span className="text-[9px] font-mono text-slate-400">
                          •
                        </span>
                        <span className="text-[9px] font-mono text-[#06D001]">
                          {sectionProgress}%
                        </span>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {/* SECTION PROGRESS BAR */}
                  <Progress
                    value={sectionProgress}
                    className="h-1 bg-slate-200 dark:bg-white/5"
                  />

                  {/* LECTURES LIST */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1 overflow-hidden"
                      >
                        {section.lectures.map((lecture) => {
                          const isActive = currentLecture?._id === lecture._id;

                          return (
                            <button
                              key={lecture._id}
                              onClick={() =>
                                handleLectureSelect(lecture, section)
                              }
                              className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-xl transition-all group text-left",
                                isActive
                                  ? "bg-white dark:bg-[#2845D6]/10 text-[#2845D6] shadow-sm border border-[#2845D6]/20"
                                  : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400",
                              )}
                            >
                              <div className="shrink-0">
                                {lecture.isCompleted ? (
                                  <CheckCircle2 className="w-5 h-5 text-[#06D001]" />
                                ) : isActive ? (
                                  <Play className="w-5 h-5 text-[#2845D6] fill-current" />
                                ) : (
                                  <Circle className="w-5 h-5 opacity-30" />
                                )}
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p
                                  className={cn(
                                    "text-xs font-bold truncate",
                                    isActive && "text-[#2845D6]",
                                  )}
                                >
                                  {lecture.title}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  {lecture.duration && (
                                    <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                                      {Math.floor(lecture.duration / 60)}:
                                      {String(lecture.duration % 60).padStart(
                                        2,
                                        "0",
                                      )}
                                    </p>
                                  )}
                                  {lecture.isPreview && (
                                    <>
                                      <span className="text-[10px] text-slate-400">
                                        •
                                      </span>
                                      <span className="text-[9px] font-mono text-[#06D001] font-bold">
                                        PREVIEW
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}
