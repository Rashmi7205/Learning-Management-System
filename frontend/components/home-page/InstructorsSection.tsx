"use client";
import {
  Star,
  Youtube,
  Twitter,
  Linkedin,
  Globe,
  Users,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect } from "react";
import { fetchFeaturedInstructors } from "@/lib/store/slices/instructorSlice";
import Link from "next/link";

const InstructorsSection = () => {
  const instructors =
    useAppSelector((state) => state.instructor.featuredInstructors) || [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!instructors.length) {
      dispatch(fetchFeaturedInstructors());
    }
  }, [dispatch, instructors.length]);

  return (
    <section
      id="instructors"
      className="relative py-24 bg-[#020617] overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Learn from the{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Best
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our instructors are industry veterans from top tech companies,
            dedicated to your growth.
          </p>
        </div>

        {/* Grid */}
        {instructors.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-[2.5rem] bg-white/5 animate-pulse border border-white/10"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor, index) => (
              <div
                key={instructor._id}
                className="group relative flex flex-col items-center p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.06] hover:border-blue-500/50 transition-all duration-500"
              >
                {/* Avatar with Verified Ring */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
                    <div className="h-full w-full bg-[#020617] rounded-full" />
                  </div>
                  <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-white/10 group-hover:scale-95 transition-transform duration-500">
                    <img
                      src={
                        instructor?.user?.avatar?.secureUrl ||
                        "/assets/default-avatar.png"
                      }
                      alt="Instructor"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1.5 border-4 border-[#020617] shadow-xl">
                    <ShieldCheck className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center w-full">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {instructor?.user?.firstName} {instructor?.user?.lastName}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
                    {instructor.title || "Industry Expert"}
                  </p>

                  {/* Stats Bento Box */}
                  <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 mb-8">
                    <div className="bg-[#020617]/40 p-3">
                      <p className="text-lg font-black text-white">
                        {instructor.rating || "5.0"}
                      </p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">
                        Rating
                      </p>
                    </div>
                    <div className="bg-[#020617]/40 p-3">
                      <p className="text-lg font-black text-white">
                        {instructor.totalReviews > 999
                          ? `${(instructor.totalReviews / 1000).toFixed(1)}k`
                          : instructor.totalReviews}
                      </p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">
                        Students
                      </p>
                    </div>
                  </div>

                  {/* Socials & Action */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-2">
                      {instructor.linkedin && (
                        <a
                          href={instructor.linkedin}
                          className="p-2 rounded-lg bg-white/5 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 transition-all"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {instructor.twitter && (
                        <a
                          href={instructor.twitter}
                          className="p-2 rounded-lg bg-white/5 hover:bg-sky-600/20 text-slate-400 hover:text-sky-400 transition-all"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <Link
                      href={`/instructors/${instructor._id}`}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        className="w-full rounded-xl bg-white text-black font-bold hover:bg-blue-600 hover:text-white transition-all"
                      >
                        Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default InstructorsSection;
