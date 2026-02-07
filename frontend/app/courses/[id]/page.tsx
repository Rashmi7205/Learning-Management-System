"use client";

import { useState } from "react";
import {
  Clock,
  Smartphone,
  Infinity,
  Award,
  HelpCircle,
  Play,
  Check,
} from "lucide-react";

import Header from "@/components/home-page/Header";
import Footer from "@/components/home-page/Footer";
import { CourseHero } from "@/components/courseDetails/CourseHero";
import { CourseCurriculum } from "@/components/courseDetails/CourseCurriculum";
import { CourseInstructor } from "@/components/courseDetails/CourseInstructor";
import { CourseSidebar } from "@/components/courseDetails/CourseSidebar";
import { LectureVideoPlayer } from "@/components/courseDetails/LectureVideoPlayer";
import { VideoModal } from "@/components/courseDetails/VideoModal";

export default function CourseDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "section-1",
  );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");

  const handleOpenPreview = (url: string) => {
    setActiveVideo(url);
    setIsModalOpen(true);
  };
  // Mock data (This would eventually come from your getCourseDetails fetch)
  const course = {
    title: "Complete Web Development Bootcamp 2024",
    subtitle:
      "Learn HTML, CSS, JavaScript, React, Node.js, and More - Build 15 Real Projects",
    rating: 4.9,
    reviewCount: 12453,
    students: 85234,
    instructor: {
      name: "Sarah Chen",
      title: "Senior Full-Stack Developer",
      avatar: "https://i.pravatar.cc/150?img=1",
      bio: "Sarah is a seasoned software engineer with over a decade of experience in building scalable web applications.",
      reviews: 45000,
      students: 125000,
      rating: 4.8,
    },
    price: 89.99,
    originalPrice: 199.99,
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
    language: "English",
    category: "Development",
  };

  const curriculum = [
    {
      id: "section-1",
      title: "Getting Started",
      lectures: 12,
      duration: "2h 30m",
      lessons: [
        { title: "Course Introduction", duration: "05:32", preview: true },
        { title: "Environment Setup", duration: "15:23", preview: false },
      ],
    },
    // ... rest of curriculum
  ];

  const features = [
    { icon: Clock, text: "60 hours on-demand video" },
    { icon: Smartphone, text: "Access on mobile and TV" },
    { icon: Infinity, text: "Full lifetime access" },
    { icon: Award, text: "Certificate of completion" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <Header />
      <CourseHero course={course} />
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={activeVideo}
      />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <nav className="sticky top-20 z-40 flex gap-8 border-b border-white/10 bg-[#020617]/80 backdrop-blur-md mb-8">
              {["overview", "curriculum", "instructor", "faq"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${
                    activeTab === tab
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <div className="min-h-[400px]">
              {activeTab === "overview" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Video Player Section */}
                  <div className="mb-12">
                    <LectureVideoPlayer
                      url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      thumbnail={course.thumbnail}
                    />
                  </div>

                  {/* Course Description */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white font-display tracking-tight">
                      Description
                    </h3>

                    <div className="prose prose-slate prose-invert max-w-none">
                      <p className="text-slate-400 text-lg leading-relaxed">
                        This comprehensive course covers everything you need to
                        build modern, responsive websites from scratch. You'll
                        master the entire stack, from frontend aesthetics to
                        backend architecture.
                      </p>
                    </div>

                    {/* Feature Grid */}
                    <div className="pt-6 border-t border-white/5">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-4">
                        What you'll learn
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-4">
                        {[
                          "15 Real-world Projects",
                          "React 18 & Modern Hooks",
                          "Backend with Node.js",
                          "Cloud Deployment (AWS)",
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-colors"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                              <Check className="w-4 h-4 text-emerald-500" />
                            </div>
                            <span className="text-slate-300 font-medium">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "curriculum" && (
                <CourseCurriculum
                  onPlay={handleOpenPreview}
                  curriculum={curriculum}
                  expandedSection={expandedSection}
                  setExpandedSection={setExpandedSection}
                />
              )}

              {activeTab === "instructor" && (
                <CourseInstructor instructor={course.instructor} />
              )}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <CourseSidebar
              course={course}
              features={features}
              isWishlisted={isWishlisted}
              onWishlistToggle={() => setIsWishlisted(!isWishlisted)}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
