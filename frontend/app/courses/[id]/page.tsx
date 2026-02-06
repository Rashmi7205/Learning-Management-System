"use client";
import { useState } from "react";
import {
  Play, Star, Users, Clock, Award, Download,
  Smartphone, Infinity, Heart, Share2, ChevronDown,
  ChevronRight, Check, HelpCircle, Globe, Calendar,
  Trophy, BookOpen, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/components/home-page/Header";
import Footer from "@/components/home-page/Footer";

const CourseDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSection, setExpandedSection] = useState<string | null>("section-1");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const course = {
    title: "Complete Web Development Bootcamp 2024",
    subtitle: "Learn HTML, CSS, JavaScript, React, Node.js, and More - Build 15 Real Projects",
    rating: 4.9,
    reviewCount: 12453,
    students: 85234,
    instructor: {
      name: "Sarah Chen",
      title: "Senior Full-Stack Developer",
      avatar: "https://i.pravatar.cc/150?img=1",
      bio: "Sarah is a seasoned software engineer with over a decade of experience in building scalable web applications. She has taught over 100,000 students worldwide and specializes in React and Node.js ecosystems.",
      courses: 12,
      students: 125000,
      rating: 4.8,
      reviews: 45000,
    },
    price: 89.99,
    originalPrice: 199.99,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
    lastUpdated: "January 2024",
    language: "English",
    level: "All Levels",
    duration: "60 hours",
    lectures: 320,
    category: "Development",
  };

  const curriculum = [
    { id: "section-1", title: "Getting Started with Web Development", lectures: 12, duration: "2h 30m", lessons: [{ title: "Course Introduction", duration: "05:32", preview: true }, { title: "Setting Up Your Development Environment", duration: "15:23", preview: false }] },
    { id: "section-2", title: "CSS Fundamentals", lectures: 25, duration: "5h 15m", lessons: [{ title: "Introduction to CSS", duration: "10:20", preview: false }] }
  ];

  const faqs = [
    { question: "Do I need prior coding experience?", answer: "Not at all! This course is designed to take you from absolute beginner to a job-ready full-stack developer." },
    { question: "Is there a certificate upon completion?", answer: "Yes! You will receive a digital certificate of completion that you can share on LinkedIn or your resume." },
    { question: "Can I download the videos?", answer: "While videos are streamed, all code assets, cheat sheets, and project files are available for download." }
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

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Space+Grotesk:wght@400;700&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-blue-600/10 to-transparent">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-blue-400 text-sm font-bold mb-6">
                <span>Courses</span> <ChevronRight className="w-4 h-4" /> <span>{course.category}</span>
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
                {course.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold text-white text-lg">{course.rating}</span>
                  <span className="text-slate-500">({course.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300 font-medium">{course.students.toLocaleString()} students</span>
                </div>
                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300 font-medium">{course.language}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full border-2 border-blue-500/50 p-0.5">
                  <Image src={course.instructor.avatar} alt="Avatar" fill className="rounded-full object-cover" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Created by</p>
                  <p className="text-white font-semibold underline decoration-blue-500/50 underline-offset-4 cursor-pointer hover:text-blue-400 transition-colors">
                    {course.instructor.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <div className="sticky top-20 z-40 flex gap-8 border-b border-white/10 bg-[#020617]/80 backdrop-blur-md mb-8">
              {["overview", "curriculum", "instructor", "faq"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${
                    activeTab === tab ? "text-blue-500 border-b-2 border-blue-500" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="min-h-[400px]">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 group mb-12">
                    <Image src={course.thumbnail} alt="Preview" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/50 group-hover:scale-110 transition-transform cursor-pointer">
                        <Play className="w-8 h-8 text-white fill-current" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6 font-display">Description</h3>
                  <div className="prose prose-invert prose-slate max-w-none text-slate-400 leading-relaxed">
                    <p>This comprehensive course covers everything you need to know to build modern, responsive websites. From the basics of HTML and CSS to advanced React patterns and backend architecture with Node.js.</p>
                    <ul className="grid sm:grid-cols-2 gap-3 mt-6 list-none p-0">
                      {["Build 15 real-world projects", "Master React 18 & Hooks", "Deep dive into Node.js/Express", "Deploy to Vercel & AWS"].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Curriculum Tab */}
              {activeTab === "curriculum" && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  {curriculum.map((section) => (
                    <div key={section.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                        className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                      >
                        <div className="flex items-center gap-4">
                          <ChevronDown className={`w-5 h-5 text-blue-500 transition-transform ${expandedSection === section.id ? "" : "-rotate-90"}`} />
                          <span className="font-bold text-white text-lg">{section.title}</span>
                        </div>
                        <span className="text-sm text-slate-500 hidden sm:inline">{section.lectures} lectures • {section.duration}</span>
                      </button>
                      {expandedSection === section.id && (
                        <div className="px-6 pb-6 space-y-3">
                          {section.lessons.map((lesson, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-white/5 group hover:border-blue-500/30 transition-colors">
                              <div className="flex items-center gap-3">
                                {lesson.preview ? <Play className="w-4 h-4 text-blue-400" /> : <BookOpen className="w-4 h-4 text-slate-600" />}
                                <span className="text-sm text-slate-300">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                {lesson.preview && <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">Preview</span>}
                                <span className="text-xs text-slate-500 font-mono">{lesson.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Instructor Tab */}
              {activeTab === "instructor" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col md:flex-row gap-8 items-start bg-white/5 p-8 rounded-[32px] border border-white/10">
                    <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-[24px] overflow-hidden shrink-0">
                      <Image src={course.instructor.avatar} alt={course.instructor.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-1 font-display">{course.instructor.name}</h3>
                      <p className="text-blue-400 font-medium mb-4">{course.instructor.title}</p>
                      <div className="flex flex-wrap gap-6 mb-6">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-bold">{course.instructor.rating} Instructor Rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-bold">{course.instructor.reviews.toLocaleString()} Reviews</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-sm font-bold">{course.instructor.students.toLocaleString()} Students</span>
                        </div>
                      </div>
                      <p className="text-slate-400 leading-relaxed">{course.instructor.bio}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ Tab */}
              {activeTab === "faq" && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <div className="flex gap-4">
                        <HelpCircle className="w-6 h-6 text-blue-500 shrink-0" />
                        <div>
                          <h4 className="font-bold text-white mb-2">{faq.question}</h4>
                          <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <aside className="sticky top-24">
              <div className="bg-slate-900/50 backdrop-blur-2xl rounded-[32px] border border-white/10 p-8 shadow-2xl overflow-hidden relative">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 blur-[60px] rounded-full pointer-events-none" />

                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-5xl font-black text-white">${course.price}</span>
                  <span className="text-xl text-slate-500 line-through">${course.originalPrice}</span>
                </div>

                <div className="space-y-4 mb-8">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white h-14 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
                    Enroll Now
                  </Button>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={() => setIsWishlisted(!isWishlisted)} className={`h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 transition-all ${isWishlisted ? "text-red-500 border-red-500/50" : "text-white"}`}>
                      <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} /> Wishlist
                    </Button>
                    <Button variant="outline" className="h-12 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all">
                      <Share2 className="w-5 h-5 mr-2" /> Share
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-8">
                  <p className="font-bold text-white text-sm uppercase tracking-widest">Included in Course:</p>
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-400 group">
                      <feature.icon className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-6 h-6 text-emerald-500" />
                  </div>
                  <p className="text-xs text-emerald-200 font-medium">30-Day Money-Back Guarantee included</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetailsPage;