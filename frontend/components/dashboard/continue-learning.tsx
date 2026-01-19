"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Course, Progress as ProgressType } from "@/lib/types";

interface ContinueLearningProps {
  course?: Course;
  progress?: ProgressType;
}

export function ContinueLearning({ course, progress }: ContinueLearningProps) {
  if (!course || !progress) {
    return (
      <Card className="p-8">
        <p className="text-muted-foreground text-center">
          No courses in progress yet. Start learning today!
        </p>
      </Card>
    );
  }

  const progressPercentage = progress.progressPercentage || 0;
  const lastAccessedLectureId = progress.lastAccessedLecture;

  return (
    <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-foreground">
                {course.title}
              </h3>
              {progressPercentage === 100 && (
                <Badge className="bg-emerald-100 text-emerald-700">
                  Completed
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {course.subtitle || "Continue where you left off"}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-foreground">
              Progress
            </span>
            <span className="text-sm text-muted-foreground">
              {progressPercentage}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Total Lectures</p>
            <p className="text-lg font-semibold text-foreground">
              {course.totalLectures}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Watch Time</p>
            <p className="text-lg font-semibold text-foreground">
              {Math.round(progress.totalWatchTime / 3600)}h
            </p>
          </div>
        </div>

        {/* Resume Button */}
        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Link
            href={`/courses/${course._id}${
              lastAccessedLectureId ? `?lecture=${lastAccessedLectureId}` : ""
            }`}
          >
            Resume Learning
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
