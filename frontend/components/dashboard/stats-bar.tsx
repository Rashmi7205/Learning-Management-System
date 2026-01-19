"use client";

import { Card } from "@/components/ui/card";
import { color } from "framer-motion";
import { BookOpen, TrendingUp, CheckCircle2, Clock } from "lucide-react";

interface StatsBarProps {
  coursesEnrolled: number;
  coursesCompleted: number;
  learningHours: number;
}

export function StatsBar({
  coursesEnrolled,
  coursesCompleted,
  learningHours,
}: StatsBarProps) {
  const completionRate =
    coursesEnrolled > 0
      ? Math.round((coursesCompleted / coursesEnrolled) * 100)
      : 0;

  const stats = [
    {
      label: "Courses Enrolled",
      value: coursesEnrolled,
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600",
      bg: "url('/images/cta1.svg')",
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
      bg: "url('/images/cta2.svg')",
    },
    {
      label: "Courses Completed",
      value: coursesCompleted,
      icon: CheckCircle2,
      color: "bg-yellow-50 text-yellow-600",
       bg: "url('/images/cta1.svg')",
    },
    {
      label: "Learning Hours",
      value: learningHours,
      icon: Clock,
      color: "bg-purple-50 text-purple-600",
      bg: "url('/images/cta2.svg')",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className={`p-6 bg-cover bg-center`} style={{ backgroundImage: stat.bg }}>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-white font-semibold">{stat.label}</p>
                <p className="text-2xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
