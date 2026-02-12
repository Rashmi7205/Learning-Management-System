"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Target, Zap, Clock, BookCheck, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const progressData = [
  { course: "React Fundamentals", completed: 65, category: "Development" },
  { course: "Advanced TypeScript", completed: 100, category: "Development" },
  { course: "Next.js Mastery", completed: 30, category: "Development" },
  { course: "Web Design Principles", completed: 10, category: "Design" },
];

const achievements = [
  {
    icon: Award,
    title: "Fast Learner",
    desc: "Completed 3 courses in 3 months",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Target,
    title: "Star Student",
    desc: "Achieved 100% in a course",
    color: "text-[#06D001]",
    bg: "bg-[#06D001]/10",
  },
  {
    icon: Zap,
    title: "Getting Started",
    desc: "Enrolled in your first course",
    color: "text-[#2845D6]",
    bg: "bg-[#2845D6]/10",
  },
];

export default function LearnerProgressPage() {
  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <header>
        <h1 className="text-4xl font-serif font-black italic tracking-tight">
          Learning <span className="text-[#2845D6]">Progress</span>
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2">
          Your Educational Roadmap & Milestone tracking
        </p>
      </header>

      {/* Top Stats - Glassmorphism Lab Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Learning Hours",
            val: "42 hrs",
            detail: "↑ 5 hrs this week",
            icon: Clock,
            gradient: "from-[#2845D6] to-blue-600",
          },
          {
            label: "Completed",
            val: "5",
            detail: "62% completion rate",
            icon: BookCheck,
            gradient: "from-[#06D001] to-emerald-600",
          },
          {
            label: "Streak",
            val: "12 Days",
            detail: "Top 5% of learners",
            icon: TrendingUp,
            gradient: "from-slate-800 to-slate-900",
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className={cn(
              "p-6 text-white border-none relative overflow-hidden rounded-[2rem] shadow-xl bg-gradient-to-br",
              stat.gradient,
            )}
          >
            <div className="relative z-10">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-80">
                {stat.label}
              </p>
              <p className="text-4xl font-black mt-2 font-serif italic">
                {stat.val}
              </p>
              <p className="text-xs font-medium opacity-70 mt-4 flex items-center gap-1.5">
                <stat.icon size={14} /> {stat.detail}
              </p>
            </div>
            <stat.icon className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Detailed Progress Table */}
        <Card className="lg:col-span-2 p-8 rounded-[2.5rem] border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl">
          <h2 className="text-xl font-serif font-bold italic mb-8">
            Course Progress
          </h2>
          <div className="space-y-8">
            {progressData.map((item, idx) => (
              <motion.div
                key={item.course}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <span className="text-[9px] font-mono font-black text-[#2845D6] uppercase tracking-widest bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 mt-1">
                      {item.course}
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#06D001]">
                    {item.completed}%
                  </span>
                </div>
                <Progress
                  value={item.completed}
                  className="h-2.5 bg-slate-100 dark:bg-white/5"
                />
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Vertical Achievement List */}
        <Card className="p-8 rounded-[2.5rem] border-none bg-slate-900 text-white shadow-2xl relative overflow-hidden">
          <h2 className="text-xl font-serif font-bold italic mb-8 relative z-10">
            Achievements
          </h2>
          <div className="space-y-6 relative z-10">
            {achievements.map((achievement, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
              >
                <div
                  className={cn(
                    "p-3 rounded-xl shrink-0 transition-transform group-hover:scale-110",
                    achievement.bg,
                  )}
                >
                  <achievement.icon
                    className={cn("w-6 h-6", achievement.color)}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{achievement.title}</h3>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed uppercase font-mono tracking-tight">
                    {achievement.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#2845D6]/20 blur-[80px] rounded-full" />
        </Card>
      </div>
    </div>
  );
}
