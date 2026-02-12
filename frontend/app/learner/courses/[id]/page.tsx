"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ChevronRight,
  CheckCircle2,
  Circle,
  FileText,
  MessageSquare,
  Download,
  ArrowLeft,
  Settings,
  Maximize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LectureVideoPlayer } from "@/components/courseDetails/LectureVideoPlayer";

// Mock Data
const COURSE_CONTENT = {
  title: "Advanced React Patterns & Performance",
  currentLesson: "Compound Components in Depth",
  instructor: "Dr. Sarah Jenkins",
  sections: [
    {
      title: "Module 1: Advanced Component Patterns",
      lessons: [
        {
          id: "1",
          title: "Introduction to Patterns",
          duration: "12:05",
          completed: true,
        },
        {
          id: "2",
          title: "Compound Components in Depth",
          duration: "45:20",
          completed: false,
          active: true,
        },
        {
          id: "3",
          title: "Control Props Pattern",
          duration: "32:15",
          completed: false,
        },
      ],
    },
    {
      title: "Module 2: Performance Optimization",
      lessons: [
        {
          id: "4",
          title: "The useMemo Mystery",
          duration: "18:40",
          completed: false,
        },
        {
          id: "5",
          title: "Virtualization Strategies",
          duration: "25:00",
          completed: false,
        },
      ],
    },
  ],
};

export default function LecturePage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden bg-white dark:bg-[#020617]">
      <main className="flex-1 overflow-y-auto no-scrollbar border-r border-slate-200/50 dark:border-white/5">
        <div className="bg-slate-900 aspect-video relative group overflow-hidden shadow-2xl">
          <LectureVideoPlayer
            url={"#"}
            thumbnail="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format"
          />
        </div>

        {/* LECTURE DETAILS */}
        <div className="p-8 lg:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <Link
                href="/learner/courses"
                className="flex items-center gap-2 text-[#2845D6] font-mono text-[10px] font-black uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
              >
                <ArrowLeft className="w-3 h-3" /> Back to Course
              </Link>
              <h1 className="text-3xl font-serif font-black italic tracking-tight uppercase">
                {COURSE_CONTENT.currentLesson}
              </h1>
              <p className="text-slate-500 font-medium">
                Part of: {COURSE_CONTENT.title}
              </p>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-transparent border-b border-slate-200 dark:border-white/5 rounded-none w-full justify-start h-12 p-0 gap-8">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#2845D6] rounded-none bg-transparent font-mono text-[10px] uppercase font-bold tracking-widest"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#2845D6] rounded-none bg-transparent font-mono text-[10px] uppercase font-bold tracking-widest"
              >
                Resources (4)
              </TabsTrigger>
              <TabsTrigger
                value="qa"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#2845D6] rounded-none bg-transparent font-mono text-[10px] uppercase font-bold tracking-widest"
              >
                Q&A
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="overview"
              className="py-6 prose prose-slate dark:prose-invert max-w-none"
            >
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                In this lecture, we dive deep into the{" "}
                <strong>Compound Components</strong> pattern. You'll learn how
                to manage implicit state between components like{" "}
                <code>&lt;Tabs&gt;</code> and <code>&lt;Tabs.List&gt;</code>{" "}
                without prop drilling.
              </p>
            </TabsContent>

            <TabsContent
              value="resources"
              className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-[#2845D6]/30 transition-colors group cursor-pointer"
                >
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg group-hover:bg-[#2845D6] group-hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold font-mono">
                    Lecture_Notes_Mod_02_{i}.pdf
                  </span>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* SIDEBAR: Curriculum */}
      <aside className="w-full lg:w-[400px] bg-slate-50 dark:bg-[#020617] flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-white/5">
          <h2 className="text-lg font-serif font-black italic">
            Course <span className="text-[#2845D6]">Curriculum</span>
          </h2>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400">
              <span>4/12 Completed</span>
              <span>35% Total</span>
            </div>
            <Progress
              value={35}
              className="h-1.5 bg-slate-200 dark:bg-white/5"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {COURSE_CONTENT.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-3">
                <h3 className="px-2 text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className={cn(
                        "w-full flex items-center gap-4 p-3 rounded-2xl transition-all group text-left",
                        lesson.active
                          ? "bg-white dark:bg-[#2845D6]/10 text-[#2845D6] shadow-sm"
                          : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400",
                      )}
                    >
                      <div className="shrink-0">
                        {lesson.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-[#06D001]" />
                        ) : lesson.active ? (
                          <Play className="w-5 h-5 text-[#2845D6] fill-current" />
                        ) : (
                          <Circle className="w-5 h-5 opacity-30" />
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p
                          className={cn(
                            "text-xs font-bold truncate",
                            lesson.active && "text-[#2845D6]",
                          )}
                        >
                          {lesson.title}
                        </p>
                        <p className="text-[10px] font-mono opacity-60 mt-0.5">
                          {lesson.duration}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}
