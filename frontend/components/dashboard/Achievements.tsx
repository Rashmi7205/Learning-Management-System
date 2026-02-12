"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Zap, Target, Star, Shield, Flame, Award } from "lucide-react";

const BADGES = [
  {
    name: "Fast Learner",
    icon: Zap,
    color: "bg-amber-100 text-amber-600",
    desc: "Completed 3 lessons in one day",
  },
  {
    name: "Perfect Score",
    icon: Target,
    color: "bg-emerald-100 text-emerald-600",
    desc: "100% on a course quiz",
  },
  {
    name: "Pathfinder",
    icon: Star,
    color: "bg-blue-100 text-blue-600",
    desc: "Enrolled in your first course",
  },
  {
    name: "Night Owl",
    icon: Flame,
    color: "bg-orange-100 text-orange-600",
    desc: "Learned after midnight",
  },
];

export const Achievements = () => {
  return (
    <div className="p-6 bg-white dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 shadow-lg">
      <h3 className="text-lg font-serif font-bold italic mb-6">
        Your Achievements
      </h3>
      <div className="grid grid-cols-4 gap-4">
        <TooltipProvider>
          {BADGES.map((badge, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`aspect-square rounded-2xl flex items-center justify-center cursor-help ${badge.color} transition-all shadow-sm`}
                >
                  <badge.icon className="w-6 h-6" />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-900 text-white border-none rounded-lg p-3">
                <p className="font-bold text-xs">{badge.name}</p>
                <p className="text-[10px] opacity-70">{badge.desc}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
      <button className="flex items-center gap-2 mt-6 text-[10px] font-mono font-bold uppercase tracking-widest text-[#06D001] hover:translate-x-1 transition-transform">
        View Gallery <Award className="w-3 h-3" />
      </button>
    </div>
  );
};
