"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Building2,
  Gift,
  Lightbulb,
  Settings,
  Award,
  CheckCircle2,
  Share2,
} from "lucide-react";

const features = [
  {
    title: "Foundational Skills",
    desc: "Master the fundamentals with structured paths designed by industry experts.",
    icon: Building2,
    iconColor: "text-blue-400",
    glow: "group-hover:shadow-blue-500/20",
  },
  {
    title: "Free Resources",
    desc: "Access a wealth of free learning materials, tutorials, and practice exercises.",
    icon: Gift,
    iconColor: "text-emerald-400",
    glow: "group-hover:shadow-emerald-500/20",
  },
  {
    title: "Global Learning",
    desc: "Flexible learning on your schedule with lifetime access to all materials.",
    icon: Lightbulb,
    iconColor: "text-purple-400",
    glow: "group-hover:shadow-purple-500/20",
  },
  {
    title: "Skill-Based Growth",
    desc: "Focus on practical skills that matter in the real world and advance your career.",
    icon: Settings,
    iconColor: "text-orange-400",
    glow: "group-hover:shadow-orange-500/20",
  },
];

const CertificateFeatures = () => {
  return (
    <section className="py-24 bg-[#020617] text-white relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* -------- Left: Certificate Showcase -------- */}
          <div className="relative group">
            {/* Outer Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              {/* Certificate Container */}
              <div className="relative rounded-2xl bg-white/[0.03] border border-white/10 p-4 sm:p-8 backdrop-blur-sm transform group-hover:-rotate-1 transition-all duration-500 shadow-2xl">
                <Image
                  src="/images/certificate.png" // Ensure this path is correct in your public folder
                  alt="Certificate of Completion"
                  width={600}
                  height={420}
                  className="w-full h-auto rounded-lg shadow-inner grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Floating Award Badge */}
              <div className="absolute -bottom-6 -right-6 bg-blue-600 rounded-2xl shadow-xl p-5 border border-white/20 animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-white text-lg leading-none">
                      Verified
                    </div>
                    <div className="text-xs text-blue-100 mt-1 font-medium uppercase tracking-tighter">
                      Industry Standard
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -------- Right: Content & Grid -------- */}
          <div>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                <CheckCircle2 className="w-3 h-3" />
                Certification
              </div>
              <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight tracking-tight">
                Get Recognized <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
                  Globally
                </span>
              </h2>
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                Don't just learn—prove it. Earn verifiable certificates that
                bridge the gap between knowledge and employment.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`group relative rounded-2xl p-6 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 shadow-sm ${item.glow}`}
                  >
                    <div className="flex flex-col gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}
                      >
                        <Icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Verification Footer Card */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-500/20 flex items-center gap-5 group cursor-default">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Share2 className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  One-Click Sharing
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Instantly add your credentials to LinkedIn or your
                  professional portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateFeatures;
