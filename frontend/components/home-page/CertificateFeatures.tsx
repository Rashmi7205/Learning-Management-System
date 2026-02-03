"use client";

import Image from "next/image";
import {
  Building2,
  Gift,
  Lightbulb,
  Settings,
} from "lucide-react";

const features = [
  {
    title: "Building Strong Foundational Skills",
    desc: "On the other hand, we denounce with righteous indignation and men.",
    bg: "bg-[#FFF4DC]",
    icon: Building2,
  },
  {
    title: "Free Resources",
    desc: "On the other hand, we denounce with righteous indignation and men.",
    bg: "bg-[#E9FBEA]",
    icon: Gift,
  },
  {
    title: "Learn Anytime, Anywhere",
    desc: "On the other hand, we denounce with righteous indignation and men.",
    bg: "bg-[#EAF7FF]",
    icon: Lightbulb,
  },
  {
    title: "Skill-Based Learning",
    desc: "On the other hand, we denounce with righteous indignation and men.",
    bg: "bg-[#F1EEFF]",
    icon: Settings,
  },
];

const CertificateFeatures = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* -------- Left Certificate -------- */}
        <div className="relative flex justify-center">
            <Image
              src="/images/certificate.png"
              alt="Certificate"
              width={600}
              height={420}
              className="relative bg-white rounded-2xl"
            />
        </div>

        {/* -------- Right Feature Cards -------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className={`rounded-2xl p-6 ${item.bg}`}>
                <Icon className="w-8 h-8 mb-4 text-gray-800" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CertificateFeatures;
