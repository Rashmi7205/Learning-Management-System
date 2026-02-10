"use client";

import { useEffect, useState } from "react";
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
import { courseService } from "@/lib/services/api";
import { useSearchParams } from "next/navigation";
import { CourseDetailsData } from "@/lib/types";
import CourseDetailsLoader from "@/components/courseDetails/CourseDetailsLoader";
import CourseNotFound from "@/components/courseDetails/CourseNotFound";
import { set } from "date-fns";

export default function CourseDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "section-1",
  );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState<CourseDetailsData>();
  const [courseNotFound, setCourseNotFound] = useState(false);

  const handleOpenPreview = (url: string) => {
    setActiveVideo(url);
    setIsModalOpen(true);
  };

  const searchParams = useSearchParams();
  const courseId = searchParams.get("cid") || "";
  const getCourseData = async () => {
    try {
      if (!courseId) {
        setIsLoading(false);
        alert("Course Not Found");
      }
      const data = await courseService.getById(courseId);
      if (data.success) {
        setCourseData(data.data);
        setIsLoading(false);
        setCourseNotFound(false);
      } else {
        setIsLoading(false);
        setCourseNotFound(false);
      }
    } catch (error) {
      setIsLoading(false);
      setCourseNotFound(true);
      console.log(error);
    }
  };
  const features = [
    { icon: Clock, text: "60 hours on-demand video" },
    { icon: Smartphone, text: "Access on mobile and TV" },
    { icon: Infinity, text: "Full lifetime access" },
    { icon: Award, text: "Certificate of completion" },
  ];

  useEffect(() => {
    if (courseId) {
      getCourseData();
    }
  }, [courseId]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <Header />
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={activeVideo}
        courseTitle={courseData?.title}
/>
      {isLoading ? (
        <CourseDetailsLoader />
      ) : courseNotFound ? (
        <CourseNotFound />
      ) : (
        courseData && (
          <>
            <CourseHero course={courseData} />
            <main className="max-w-7xl mx-auto px-4 py-12">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content Area */}
                <div className="lg:col-span-2">
                  {/* Tabs Navigation */}
                  <nav className="sticky top-20 z-40 flex gap-8 border-b border-white/10 bg-[#020617]/80 backdrop-blur-md mb-8">
                    {["overview", "curriculum", "instructor"].map(
                      (tab) => (
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
                      ),
                    )}
                  </nav>

                  <div className="min-h-[400px]">
                    {activeTab === "overview" && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Video Player Section */}
                        <div className="mb-12">
                          <LectureVideoPlayer
                            url={courseData.promoVideo?.secureUrl || "#"}
                            thumbnail={courseData.thumbnail?.secureUrl}
                          />
                        </div>

                        {/* Course Description */}
                        <div className="space-y-6">
                          <h3 className="text-2xl font-bold text-white font-display tracking-tight">
                            Description
                          </h3>

                          <div className="prose prose-slate prose-invert max-w-none">
                            <p className="text-slate-400 text-lg leading-relaxed">
                             {courseData.description}
                            </p>
                          </div>

                          {/* Feature Grid */}
                          <div className="pt-6 border-t border-white/5">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-blue-500 mb-4">
                              What you'll learn
                            </h4>
                            <ul className="grid sm:grid-cols-2 gap-4">
                              {courseData?.whatYouWillLearn?.map((item, i) => (
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
                        curriculum={courseData.sections}
                        expandedSection={expandedSection}
                        setExpandedSection={setExpandedSection}
                      />
                    )}

                    {activeTab === "instructor" && (
                      <CourseInstructor instructor={courseData.instructor} />
                    )}
                  </div>
                </div>

                {/* Sticky Sidebar */}
                <div className="lg:col-span-1">
                  <CourseSidebar
                    course={courseData}
                    features={features}
                  />
                </div>
              </div>
            </main>
          </>
        )
      )}

      <Footer />
    </div>
  );
}
