"use client";
import { useState, useEffect } from "react";
import {
  Palette,
  Code,
  TrendingUp,
  Megaphone,
  Camera,
  Music,
  Heart,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Art & Design",
    count: 45,
    icon: Palette,
    glow: "group-hover:shadow-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    id: 2,
    name: "Development",
    count: 78,
    icon: Code,
    glow: "group-hover:shadow-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    id: 3,
    name: "Business",
    count: 56,
    icon: TrendingUp,
    glow: "group-hover:shadow-green-500/20",
    iconColor: "text-green-400",
  },
  {
    id: 4,
    name: "Marketing",
    count: 34,
    icon: Megaphone,
    glow: "group-hover:shadow-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    id: 5,
    name: "Photography",
    count: 28,
    icon: Camera,
    glow: "group-hover:shadow-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    id: 6,
    name: "Music",
    count: 22,
    icon: Music,
    glow: "group-hover:shadow-yellow-500/20",
    iconColor: "text-yellow-400",
  },
  {
    id: 7,
    name: "Health & Fitness",
    count: 19,
    icon: Heart,
    glow: "group-hover:shadow-red-500/20",
    iconColor: "text-red-400",
  },
  {
    id: 8,
    name: "Finance",
    count: 31,
    icon: Briefcase,
    glow: "group-hover:shadow-teal-500/20",
    iconColor: "text-teal-400",
  },
];

const CategoriesSection = () => {
  return (
    <>
      <style jsx global>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <section
        id="categories"
        className="py-24 bg-[#020617] text-white relative overflow-hidden"
      >
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl lg:text-6xl font-black mb-6 tracking-tight">
                Top{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Categories
                </span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Whether you want to build a career or a hobby, we have a path
                for you.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-slate-300">
                8 Specialized Fields
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className={`group relative bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 transition-all duration-500 cursor-pointer hover:bg-white/[0.07] hover:-translate-y-2 hover:shadow-2xl ${category.glow} animate-scale-in opacity-0`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner`}
                    >
                      <Icon className={`w-7 h-7 ${category.iconColor}`} />
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-blue-500"></span>
                      <p className="text-slate-500 font-medium text-sm tracking-wide uppercase">
                        {category.count} Courses
                      </p>
                    </div>
                  </div>

                  {/* Subtle Bottom Glow Line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent group-hover:w-1/2 transition-all duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesSection;
