"use client";
import { Button } from "@/components/ui/button";
import {
  Search,
  Play,
  Users,
  BookOpen,
  Award,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";
import useCounter from "@/hooks/useCounter";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { icon: Users, value: "50K+", label: "Active Students" },
    { icon: BookOpen, value: "200+", label: "Expert Courses" },
    { icon: Award, value: "95%", label: "Success Rate" },
  ];

  const trendingTags = [
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Digital Marketing",
    "UI/UX Design",
  ];


  return (
    <section
      className="relative min-h-[85vh] flex items-center pt-20 pb-16 overflow-hidden
bg-[url('/bg/bg-3.jpg')] bg-cover bg-center text-white"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-purple-light/10" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <GraduationCap className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">
                #1 Online Learning Platform
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Skills That{" "}
              <span className="gradient-text">Drive You Forward</span>
            </h1>

            {/* Description */}
            <p
              className="text-lg md:text-xl text-white/80 mb-8 max-w-xl animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Technology and the world of work change fast — with us, you're
              faster. Get the skills to achieve goals and stay competitive.
            </p>

            {/* Search Bar */}
            <div
              className="relative mb-6 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative flex items-center group">
                {/* Search Icon (left) */}
                <Search
                  className="
      absolute left-5 w-5 h-5
      text-white/70
      group-focus-within:text-pink-400
      transition-colors duration-300
    "
                />

                {/* Input */}
                <input
                  type="text"
                  placeholder="Search for courses, topics, or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-44 py-4 rounded-full text-white placeholder:text-white/60 bg-gradient-to-r from-purple-500/30 via-indigo-500/2 to-pink-500/30 border border-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-pink-400/60 focus:border-pink-400/60 transition-all duration-30"
                />
                {/* Search Button */}
                <Button className="cursor-pointer absolute right-2 flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-pink-500/30 hover:from-pink-600 hover:to-purple-700 hover:shadow-lg hover:shadow-pink-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
                  <Search className="w-4 h-4 cursor-pointer" />
                  <span className="hidden sm:inline ">Search</span>
                </Button>
              </div>
            </div>

            {/* Trending Tags */}
            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <p className="text-sm text-white/80 mb-3">
                <span className="font-semibold text-white">Trending:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center gap-2 px-5 py-4 text-sm font-medium text-white bg-gradient-to-r from-[#8476e0] via-[#9c8dbe] to-[#9c59ef] border-3 border-white/10 rounded-full backdrop-blur-md hover:from-pink-600/40 hover:to-purple-600/40 hover:border-pink-400/40 transition-all duration-30 cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4 text-pink-600" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/20 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              {stats.map((stat, index) => {
                const count = useCounter(stat.value);

                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {count}
                      {stat.value}
                    </div>

                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Hero Image/Cards */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-white/20 to-purple-light/20 rounded-2xl flex items-center justify-center mb-6">
                  <Image
                    src="/images/banner-thumbnail.png"
                    alt="hero"
                    width={350}
                    height={200}
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Watch Demo
                </h3>
                <p className="text-white/80">See how our platform works</p>
              </div>

              {/* Floating card 1 */}
              <div className="absolute -left-8 top-1/4 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white/20 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-white flex items-center justify-center">
                    <Image
                      src="/images/course-icon.png"
                      alt="users"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white">200+</p>
                    <p className="text-sm text-white/80">Courses</p>
                  </div>
                </div>
              </div>

              {/* Floating card 2 */}
              <div
                className="absolute -right-4 bottom-1/4 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white/20 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-orange flex items-center justify-center">
                    <Image
                      src="/images/users.png"
                      alt="users"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white">50K+</p>
                    <p className="text-sm text-white/80">Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
