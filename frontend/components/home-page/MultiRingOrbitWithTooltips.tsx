"use client";

import {
  Brain,
  Building2,
  Server,
  Code2,
  Cloud,
  Binary,
  Database,
  Palette,
  GitBranch,
  Layout,
  Globe,
  Layers,
  FileCode,
  Bot,
  Smartphone,
  Terminal,
  Shield,
  Network,
  Figma,
  Monitor,
  Blocks,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const MultiRingOrbitWithTooltips = () => {
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);
  const [centerHovered, setCenterHovered] = useState(false);
  const rings = [
    {
      size: 12,
      speed: 40,
      items: [
        { icon: Brain, bg: "#8b5cf6", color: "#fff", name: "AI" },
        { icon: Database, bg: "#ef4444", color: "#fff", name: "Databases" },
        { icon: Binary, bg: "#f59e0b", color: "#fff", name: "DSA" },
        { icon: Bot, bg: "#6366f1", color: "#fff", name: "Machine Learning" },
      ],
    },
    {
      size: 20,
      speed: 50,
      items: [
        { icon: Layout, bg: "#06b6d4", color: "#fff", name: "Frontend" },
        { icon: Server, bg: "#10b981", color: "#fff", name: "Backend" },
        { icon: Palette, bg: "#ec4899", color: "#fff", name: "Design" },
        { icon: Figma, bg: "#f472b6", color: "#fff", name: "UI/UX" },
        {
          icon: Smartphone,
          bg: "#22c55e",
          color: "#fff",
          name: "Mobile Development",
        },
        { icon: Cloud, bg: "#3b82f6", color: "#fff", name: "Cloud Computing" },
      ],
    },
    {
      size: 30,
      speed: 65,
      items: [
        { icon: FileCode, bg: "#facc15", color: "#000", name: "JavaScript" },
        { icon: Terminal, bg: "#84cc16", color: "#000", name: "Programming" },
        { icon: GitBranch, bg: "#f97316", color: "#fff", name: "DevOps" },
        {
          icon: Monitor,
          bg: "#14b8a6",
          color: "#fff",
          name: "Web Applications",
        },
        {
          icon: Code2,
          bg: "#14b8a6",
          color: "#fff",
          name: "Backend Development",
        },
        {
          icon: Globe,
          bg: "#0ea5e9",
          color: "#fff",
          name: "Frontend Development",
        },
        { icon: Globe, bg: "#06b6d4", color: "#fff", name: "Web Development" },
        { icon: Network, bg: "#0891b2", color: "#fff", name: "System Design" },
      ],
    },
    {
      size: 40,
      speed: 80,
      items: [
        { icon: Layout, bg: "#06b6d4", color: "#fff", name: "Frontend" },
        { icon: Server, bg: "#10b981", color: "#fff", name: "Backend" },
        { icon: Palette, bg: "#ec4899", color: "#fff", name: "Design" },
      ],
    },
  ];

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative flex items-center justify-center scale-[0.6] md:scale-[0.8] lg:scale-100">
        {/* Center Logo */}
        <div
          className={`relative z-50 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_0_40px_rgba(236,72,153,0.5)] border border-white/20 transition-all duration-500 cursor-pointer ${centerHovered ? "scale-110 shadow-[0_0_60px_rgba(236,72,153,0.7)]" : ""}`}
          onMouseEnter={() => setCenterHovered(true)}
          onMouseLeave={() => setCenterHovered(false)}
        >
          <Image
            src="/images/logo.png"
            width={45}
            height={45}
            alt="Courseloop"
            className="z-10"
          />
        </div>

        {/* Orbiting System */}
        {rings.map((ring, ringIndex) => {
          const isDimmed = hoveredRing !== null && hoveredRing !== ringIndex;

          return (
            <div
              key={ringIndex}
              className={`absolute transition-all duration-700 ${centerHovered ? "opacity-20 scale-95 blur-sm" : "opacity-100 scale-100"}`}
              style={{ width: `${ring.size}rem`, height: `${ring.size}rem` }}
              onMouseEnter={() => setHoveredRing(ringIndex)}
              onMouseLeave={() => setHoveredRing(null)}
            >
              {/* Ring Visual Path */}
              <div
                className={`absolute inset-0 rounded-full border transition-colors duration-300 ${hoveredRing === ringIndex ? "border-white/30" : "border-white/5"}`}
              />

              {/* Orbit Container */}
              <div
                className="absolute inset-0 animate-spin-slow"
                style={{ animationDuration: `${ring.speed}s` }}
              >
                {ring.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  const angle = (360 / ring.items.length) * itemIndex;
                  const radius = ring.size / 2;

                  return (
                    <div
                      key={itemIndex}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translate(${radius}rem) rotate(-${angle}deg)`,
                      }}
                    >
                      {/* Icon wrapper - Fixed reverse spin to keep upright */}
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-2xl transition-all duration-300 group ${isDimmed ? "opacity-40 scale-75" : "opacity-100 hover:scale-150 z-50"}`}
                        style={{
                          backgroundColor: item.bg,
                          animation: `spin-reverse ${ring.speed}s linear infinite`,
                        }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: item.color }}
                        />

                        {/* Hover Tooltip */}
                        <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all pointer-events-none">
                          <span className="bg-black/90 text-white text-[10px] px-2 py-1 rounded border border-white/20 whitespace-nowrap backdrop-blur-sm">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default MultiRingOrbitWithTooltips;
