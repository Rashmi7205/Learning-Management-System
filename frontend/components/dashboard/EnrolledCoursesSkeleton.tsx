"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export const EnrolledCoursesSkeleton = () => {
  // We'll show 3 cards as placeholders
  const skeletonCards = Array.from({ length: 3 });

  return (
    <section className="space-y-8">
      {/* HEADER SKELETON */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="h-9 w-48 bg-slate-200 dark:bg-white/10 rounded-lg animate-pulse" />
          <div className="h-3 w-32 bg-slate-100 dark:bg-white/5 rounded-md animate-pulse" />
        </div>
        <div className="h-10 w-full md:w-80 bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse" />
      </div>

      {/* GRID SKELETON */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {skeletonCards.map((_, index) => (
          <Card
            key={index}
            className="h-full flex flex-col overflow-hidden rounded-[2.5rem] border-none bg-white dark:bg-slate-900/50 shadow-md"
          >
            {/* Thumbnail Area */}
            <div className="aspect-video bg-slate-200 dark:bg-white/10 animate-pulse relative">
              <div className="absolute top-4 left-4 h-6 w-16 bg-white/20 rounded-lg" />
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2 w-full">
                  <div className="h-5 w-3/4 bg-slate-200 dark:bg-white/10 rounded-md animate-pulse" />
                  <div className="h-5 w-1/2 bg-slate-200 dark:bg-white/10 rounded-md animate-pulse" />
                </div>
                <div className="h-6 w-6 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-white/10 animate-pulse" />
                <div className="h-3 w-24 bg-slate-100 dark:bg-white/5 rounded-md animate-pulse" />
              </div>

              {/* Progress Bar Area */}
              <div className="space-y-2 py-2">
                <div className="flex justify-between">
                  <div className="h-2 w-20 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                  <div className="h-2 w-8 bg-slate-100 dark:bg-white/5 rounded-full animate-pulse" />
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full" />
              </div>

              {/* Meta Info */}
              <div className="flex justify-between pt-2">
                <div className="h-3 w-16 bg-slate-100 dark:bg-white/5 rounded-md animate-pulse" />
                <div className="h-3 w-16 bg-slate-100 dark:bg-white/5 rounded-md animate-pulse" />
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="h-10 rounded-xl bg-slate-200 dark:bg-white/10 animate-pulse" />
                <div className="h-10 rounded-xl bg-slate-100 dark:bg-white/5 animate-pulse" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
