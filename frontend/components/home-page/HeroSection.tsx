'use client';
import { Button } from "@/components/ui/button";
import {
  Search,
  Play,
  Users,
  BookOpen,
  Award,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
    <section className="relative min-h-[85vh] flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-light/10" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">
                #1 Online Learning Platform
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Skills That{" "}
              <span className="gradient-text">Drive You Forward</span>
            </h1>

            {/* Description */}
            <p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-fade-in"
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
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for courses, topics, or instructors..."
                  className="search-input pl-12 pr-40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="absolute right-2 btn-cta py-2">
                  Search
                </Button>
              </div>
            </div>

            {/* Trending Tags */}
            <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <p className="text-sm text-muted-foreground mb-3">
                <span className="font-semibold text-foreground">Trending:</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag, index) => (
                  <span key={index} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image/Cards */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Main card */}
              <div className="bg-card rounded-3xl shadow-2xl p-8 border border-border">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-light/20 rounded-2xl flex items-center justify-center mb-6">
                  <Image
                    src="/images/banner-thumbnail.png"
                    alt="hero"
                    width={400}
                    height={200}
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Watch Demo
                </h3>
                <p className="text-muted-foreground">
                  See how our platform works
                </p>
              </div>

              {/* Floating card 1 */}
              <div className="absolute -left-8 top-1/4 bg-card rounded-2xl shadow-xl p-4 border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <Image
                      src="/images/course-icon.png"
                      alt="users"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">200+</p>
                    <p className="text-sm text-muted-foreground">Courses</p>
                  </div>
                </div>
              </div>

              {/* Floating card 2 */}
              <div
                className="absolute -right-4 bottom-1/4 bg-card rounded-2xl shadow-xl p-4 border border-border animate-float"
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
                    <p className="font-bold text-foreground">50K+</p>
                    <p className="text-sm text-muted-foreground">Students</p>
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
