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
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
  },
  {
    id: 2,
    name: "Development",
    count: 78,
    icon: Code,
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
  },
  {
    id: 3,
    name: "Business",
    count: 56,
    icon: TrendingUp,
    color: "bg-green-50 hover:bg-green-100 border-green-200",
  },
  {
    id: 4,
    name: "Marketing",
    count: 34,
    icon: Megaphone,
    color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
  },
  {
    id: 5,
    name: "Photography",
    count: 28,
    icon: Camera,
    color: "bg-pink-50 hover:bg-pink-100 border-pink-200",
  },
  {
    id: 6,
    name: "Music",
    count: 22,
    icon: Music,
    color: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
  },
  {
    id: 7,
    name: "Health & Fitness",
    count: 19,
    icon: Heart,
    color: "bg-red-50 hover:bg-red-100 border-red-200",
  },
  {
    id: 8,
    name: "Finance",
    count: 31,
    icon: Briefcase,
    color: "bg-teal-50 hover:bg-teal-100 border-teal-200",
  },
];

const CategoriesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="categories"
      className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2845D6] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#06D001] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover courses across diverse fields and find your perfect
            learning path
          </p>
        </div>

        {/* Categories Grid - Responsive 2/3/4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className={`${category.color} bg-white rounded-xl p-6 border-2 hover:scale-105 transition-all duration-300 cursor-pointer group animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:translate-x-1 transition-transform" />
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-slate-600 font-mono text-sm">
                  {category.count} Courses
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
