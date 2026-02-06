"use client";
import { Button } from "@/components/ui/button";
import {
  Code,
  Github,
  Chrome,
  Cpu,
  Terminal,
  Smartphone,
  Layout,
  Server,
  Layers,
  Disc,
  Wind,
  Coffee,
} from "lucide-react";
import {
  Globe,
  BookOpen,
  Users,
  Database,
  Play,
  Award,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import Header from "./Header";
import MultiRingOrbitWithTooltips from "./MultiRingOrbitWithTooltips";

const HeroSection = () => {
  const stats = [
    { icon: Users, value: "50K+", label: "Active Students" },
    { icon: BookOpen, value: "200+", label: "Expert Courses" },
    { icon: Award, value: "95%", label: "Success Rate" },
  ];

  const rings = [
    {
      id: "ring-0",
      size: "w-[250px] h-[250px]",
      speed: "animate-[spin_20s_linear_infinite]",
      icons: [Github, Chrome, Smartphone, Database],
      color: "from-emerald-400 to-cyan-400",
    },
    {
      id: "ring-1",
      size: "w-[400px] h-[400px]",
      speed: "animate-[spin_35s_linear_infinite_reverse]",
      icons: [Terminal, Layout, Play],
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "ring-2",
      size: "w-[550px] h-[550px]",
      speed: "animate-[spin_50s_linear_infinite]",
      icons: [Cpu, Server, Layers, Wind, Zap, Coffee, Globe, Disc],
      color: "from-amber-400 to-orange-500",
    },
  ];
  const trendingTags = [
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Digital Marketing",
    "UI/UX Design",
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <section className="relative overflow-hidden noise-bg bg-hero">
      <Header />
      <div className="absolute top-0 right-10 w-72 h-72 bg-[#2845D6]/20 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 left-10 w-96 h-96 bg-[#06D001]/15 rounded-full blur-3xl"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-1">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div
            className={`space-y-8 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 via-rose-500/10 to-amber-400/10 border border-rose-400/20 rounded-full px-4 py-2 animate-slide-in-left backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 via-rose-500 to-amber-600 bg-clip-text text-transparent font-mono">
                New: AI-Powered Learning Paths
              </span>
            </div>

            <h1 className="font-display text-5xl lg:text-7xl font-black text-white leading-tight animate-slide-up">
              Master Skills That
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.35)]">
                Matter Most
              </span>
            </h1>

            <p className="text-xl text-white leading-relaxed animate-slide-up delay-100">
              Join 50,000+ learners transforming their careers through
              expert-led courses. From beginner to pro, we've got your learning
              journey covered.
            </p>

            <div className="flex flex-wrap items-center gap-6 animate-slide-up delay-200">
              <Button className="group relative h-14 px-8 text-lg font-bold rounded-xl overflow-hidden bg-gradient-to-r from-emerald-500 via-amber-400 to-blue-600 border-none text-white shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95">
                <span className="relative z-10 flex items-center gap-3">
                  Start Learning
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />
              </Button>

              <Button
                variant="outline"
                className="h-14 px-8 text-lg font-bold rounded-xl border-2 border-emerald-500/30 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300"
              >
                <Play className="w-6 h-6 mr-3 text-emerald-400 group-hover:text-blue-400 transition-colors" />
                Watch Demo
              </Button>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 animate-slide-up delay-300">
              <div>
                <div className="font-display text-3xl font-bold text-white">
                  50K+
                </div>
                <div className="text-sm text-slate-200 mt-1">
                  Active Students
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-white">
                  1,200+
                </div>
                <div className="text-sm text-slate-200 mt-1">
                  Quality Courses
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-white">
                  4.8★
                </div>
                <div className="text-sm text-slate-200 mt-1">
                  Average Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right visual element */}
          <div className="relative animate-scale-in delay-200">
          <MultiRingOrbitWithTooltips/>
            {/* <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 border-4 border-slate-900 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/banner-thumbnail.png"
                  alt="Students learning"
                  width={400}
                  height={200}
                  className=""
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-white"
                    ></div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-slate-900">
                    2,450 enrolled this week
                  </div>
                  <div className="text-slate-600">Join the community</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge>Live Sessions</Badge>
                <Badge variant="secondary">Certificate Included</Badge>
              </div>
            </div>

            <div className="absolute -top-6 -left-3 bg-white rounded-xl shadow-xl p-4 border-2 border-[#06D001] animate-float z-20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#06D001] rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    Quick Start
                  </div>
                  <div className="text-sm text-slate-600">
                    Begin in 2 minutes
                  </div>
                </div>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
