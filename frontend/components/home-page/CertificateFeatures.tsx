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
} from "lucide-react";

const features = [
  {
    title: "Building Strong Foundational Skills",
    desc: "Master the fundamentals with structured learning paths designed by industry experts.",
    bg: "bg-[#2845D6]/5",
    icon: Building2,
    iconColor: "text-[#2845D6]",
  },
  {
    title: "Free Resources",
    desc: "Access a wealth of free learning materials, tutorials, and practice exercises.",
    bg: "bg-[#06D001]/5",
    icon: Gift,
    iconColor: "text-[#06D001]",
  },
  {
    title: "Learn Anytime, Anywhere",
    desc: "Flexible learning on your schedule with lifetime access to all course materials.",
    bg: "bg-purple-500/5",
    icon: Lightbulb,
    iconColor: "text-purple-600",
  },
  {
    title: "Skill-Based Learning",
    desc: "Focus on practical skills that matter in the real world and advance your career.",
    bg: "bg-orange-500/5",
    icon: Settings,
    iconColor: "text-orange-600",
  },
];

const CertificateFeatures = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* -------- Left: Certificate Image -------- */}
          <div className="relative flex justify-center lg:justify-start animate-scale-in">
            <div className="relative">
              {/* Certificate Image */}
              <div className="relative rounded-2xl shadow-2xl border-4 border-slate-200 p-8 transform hover:-rotate-1 transition-transform duration-300">
                <Image
                  src="/images/certificate.png"
                  alt="Certificate of Completion"
                  width={600}
                  height={420}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Floating Badge */}
              <div
                className="absolute -bottom-4 -right-4 bg-[#06D001] rounded-xl shadow-xl p-4 animate-slide-in-right"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#06D001]" />
                  </div>
                  <div className="text-white">
                    <div className="font-bold text-lg">Certified</div>
                    <div className="text-sm opacity-90">
                      By Industry Experts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -------- Right: Feature Cards -------- */}
          <div>
            {/* Section Header */}
            <div className="mb-8 animate-slide-in-right">
              <h2 className="font-display text-4xl lg:text-4xl font-bold text-slate-100 mb-4">
                Earn Industry-Recognized
                <span className="gradient-text block">Certificates</span>
              </h2>
              <p className="text-lg text-slate-200">
                Complete courses and earn certificates that showcase your
                expertise to employers and peers worldwide.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`rounded-xl p-6 ${item.bg} border-2 border-slate-100 hover:border-[#2845D6] transition-all duration-300 hover:shadow-lg group animate-slide-in-right`}
                    style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}
                      >
                        <Icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-100 mb-1 group-hover:text-[#2845D6] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Info */}
            <div
              className="mt-8 p-6 bg-gradient-to-br from-[#2845D6]/5 to-[#2845D6]/10 rounded-xl border-2 border-[#2845D6]/20 animate-slide-in-right"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#06D001] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-100 mb-1">
                    Shareable & Verifiable
                  </h4>
                  <p className="text-sm text-slate-200">
                    Share your certificates on LinkedIn, add them to your
                    resume, or showcase them in your portfolio. All certificates
                    are digitally verified and recognized by top employers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateFeatures;
