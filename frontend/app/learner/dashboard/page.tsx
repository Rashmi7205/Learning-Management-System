"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { LearningProgressChart } from "@/components/dashboard/LearningProgressChart";
import { EnrolledCoursesGrid } from "@/components/dashboard/EnrolledCoursesGrid";
import { Achievements } from "@/components/dashboard/Achievements";
import { Zap } from "lucide-react";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] selection:bg-[#2845D6]/30">
      {/* Decorative Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('/noise.png')]"></div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <ContinueLearning />
          </div>
          <div className="space-y-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#2845D6] to-[#06D001] text-white shadow-2xl shadow-blue-500/20 overflow-hidden relative group border border-white/10"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-md">
                    <Zap className="w-4 h-4 fill-current text-white" />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-90 font-bold">
                    Current Learning Streak
                  </p>
                </div>

                <h3 className="text-5xl font-black mt-4 italic font-serif tracking-tighter">
                  12{" "}
                  <span className="text-sm not-italic font-sans opacity-80 uppercase tracking-widest ml-1">
                    Days
                  </span>
                </h3>

                <p className="text-sm mt-6 font-medium leading-relaxed opacity-95 max-w-[200px]">
                  You're in the{" "}
                  <span className="underline decoration-[#06D001] underline-offset-4 font-bold">
                    top 5%
                  </span>{" "}
                  of learners this week!
                </p>
              </div>

              {/* Animated Background Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -right-6 -bottom-6 text-white"
              >
                <Zap size={180} strokeWidth={1} className="rotate-12" />
              </motion.div>

              {/* Decorative Blur Glass */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16" />
            </motion.div>
            <Achievements />
          </div>
        </div>
        <LearningProgressChart />
        <EnrolledCoursesGrid />
      </motion.main>
    </div>
  );
}
