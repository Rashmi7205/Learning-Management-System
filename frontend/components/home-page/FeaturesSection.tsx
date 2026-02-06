"use client";
import { useState, useEffect } from "react";
import {
  Zap,
  Shield,
  Users,
  Trophy,
  Clock,
  Award,
  Infinity,
  CheckCircle2,
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Learn at Your Pace",
    description:
      "Access courses anytime, anywhere. Set your own schedule and learn on your terms.",
  },
  {
    icon: Award,
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with real-world experience and proven track records.",
  },
  {
    icon: Infinity,
    title: "Lifetime Access",
    description:
      "One-time purchase gives you unlimited access to course materials and future updates.",
  },
  {
    icon: CheckCircle2,
    title: "Verified Certificates",
    description:
      "Earn certificates of completion to showcase your skills to employers and peers.",
  },
  {
    icon: Trophy,
    title: "Hands-on Projects",
    description:
      "Build real-world projects to add to your portfolio and demonstrate your skills.",
  },
  {
    icon: Users,
    title: "Active Community",
    description:
      "Join 50,000+ learners. Network, collaborate, and grow together with peers.",
  },
];

const FeaturesSection = () => {
  return (
      <section className="relative py-24  overflow-hidden text-white">
        {/* Abstract Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20 animate-reveal">
            <h2 className="font-display text-4xl lg:text-6xl font-black mb-6 tracking-tight">
              Why Choose
              <span className="block bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Course Loop?
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We're your partner in professional growth, combining cutting-edge
              tech with human-centric learning experiences.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-500 animate-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-6 inline-flex w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl items-center justify-center shadow-lg shadow-blue-900/40 group-hover:rotate-6 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats Bar */}
          <div
            className="mt-24 p-8 rounded-[40px] bg-gradient-to-b from-white/10 to-transparent border-t border-white/10 animate-reveal"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { label: "Active Students", val: "50K+" },
                { label: "Quality Courses", val: "1,200+" },
                { label: "Expert Mentors", val: "200+" },
                { label: "Average Rating", val: "4.8★" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="font-display text-3xl lg:text-4xl font-black text-white mb-1">
                    {stat.val}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-400/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default FeaturesSection;
