"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MOCK_CONTINUE = [
  {
    id: "1",
    title: "Advanced React Patterns & Performance",
    instructor: "Dr. Sarah Jenkins",
    progress: 65,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Editorial Design with Typography",
    instructor: "Marcus Aurelius",
    progress: 32,
    thumbnail:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "System Design Masterclass",
    instructor: "Eng. David Miller",
    progress: 12,
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?w=800&auto=format&fit=crop",
  },
];

export const ContinueLearning = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 1.5
          : scrollLeft + clientWidth / 1.5;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-serif font-black tracking-tight italic">
            Continue <span className="text-[#2845D6]">Learning</span>
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
            Pick up where you left off
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full h-10 w-10 border-slate-200 dark:border-white/10 hover:bg-[#2845D6] hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full h-10 w-10 border-slate-200 dark:border-white/10 hover:bg-[#2845D6] hover:text-white transition-all shadow-sm"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth",
          "no-scrollbar", // Ensure this utility is in your globals.css
        )}
      >
        {MOCK_CONTINUE.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -8 }}
            className="min-w-[320px] md:min-w-[450px] snap-center first:ml-1 last:mr-1 group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-xl border border-slate-200/50 dark:border-white/5"
          >
            {/* Thumbnail Area */}
            <div className="aspect-[21/9] relative overflow-hidden">
              <img
                src={course.thumbnail}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                alt={course.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

              <div className="absolute top-5 right-5 bg-[#06D001] text-white font-mono text-[10px] px-3 py-1 rounded-full font-black shadow-lg">
                {course.progress}% COMPLETE
              </div>
            </div>

            {/* Info Area */}
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold line-clamp-1 leading-tight tracking-tight">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium mt-1 italic font-serif">
                  with {course.instructor}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-slate-400">
                  <span>Current Module Progress</span>
                  <span className="text-[#2845D6]">{course.progress}%</span>
                </div>
                <div className="relative">
                  <Progress
                    value={course.progress}
                    className="h-2 bg-slate-100 dark:bg-slate-800"
                  />
                  {/* Subtle Glow Effect on Progress */}
                  <div
                    className="absolute top-0 left-0 h-full bg-[#2845D6] blur-md opacity-20 transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <Button className="w-full h-12 bg-[#2845D6] hover:bg-[#1f38b0] rounded-2xl group/btn transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                <span className="font-bold">Resume Lecture</span>
                <Play className="ml-3 w-4 h-4 fill-current transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
