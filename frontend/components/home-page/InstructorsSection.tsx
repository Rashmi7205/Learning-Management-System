"use client";
import {
  Star,
  Youtube,
  Twitter,
  Linkedin,
  Globe,
  BookOpen,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useState } from "react";
import { fetchFeaturedInstructors } from "@/lib/store/slices/instructorSlice";
import { FeaturedInstructor } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

// Card Components (matching Course Loop design)
const Card = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-xl bg-white border border-slate-200 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 ${className}`} {...props} />
);

// Avatar Components
const Avatar = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    {...props}
  />
);

const AvatarImage = ({
  className = "",
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    className={`aspect-square h-full w-full object-cover ${className}`}
    {...props}
  />
);

const AvatarFallback = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex h-full w-full items-center justify-center rounded-full bg-slate-200 ${className}`}
    {...props}
  />
);

const InstructorsSection = () => {
  const instructors: FeaturedInstructor[] = useAppSelector(
    (state) => state.instructor.featuredInstructors,
  );
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!instructors.length) {
      dispatch(fetchFeaturedInstructors());
    }
  }, [dispatch, instructors.length]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* Custom Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700;900&family=Space+Mono:wght@400;700&family=Work+Sans:wght@300;400;500;600&display=swap");

        .font-display {
          font-family: "Fraunces", serif;
        }

        .font-mono {
          font-family: "Space Mono", monospace;
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }

        /* Noise texture overlay */
        .noise-bg::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E");
          pointer-events: none;
        }
      `}</style>

      <section
        id="instructors"
        className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden"
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2845D6] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#06D001] rounded-full blur-3xl"></div>
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 noise-bg"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
              Meet Our Expert Instructors
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Learn from industry professionals who are passionate about
              teaching and sharing their knowledge with students worldwide.
            </p>
          </div>

          {/* Instructors Grid */}
          {instructors.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                <Users className="w-8 h-8 text-white/60" />
              </div>
              <p className="text-slate-300 text-lg">Loading instructors...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {instructors.map((instructor, index) => (
                <Card
                  key={instructor._id}
                  className="group bg-white hover:shadow-2xl transition-all duration-300 border-2 hover:border-[#2845D6] overflow-hidden animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="text-center">
                    {/* Avatar with Badge */}
                    <div className="relative mb-4 flex justify-center">
                      <Avatar className="h-24 w-24 border-4 border-[#2845D6]/20 group-hover:border-[#2845D6] transition-colors">
                        <AvatarImage
                          src={
                            instructor?.user?.avatar?.secureUrl ||
                            "/assets/default-avatar.png"
                          }
                          alt={`${instructor?.user?.firstName} ${instructor?.user?.lastName}`}
                        />
                        <AvatarFallback className="bg-[#2845D6]/10 text-[#2845D6] font-semibold text-lg">
                          {instructor?.user?.firstName?.[0]}
                          {instructor?.user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      {/* Star Badge */}
                      <div className="absolute bottom-0 right-1/2 translate-x-12 translate-y-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#06D001] shadow-lg">
                        <Star className="h-4 w-4 text-white fill-white" />
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="mb-1 text-lg font-bold text-slate-900 group-hover:text-[#2845D6] transition-colors">
                      {instructor?.user
                        ? `${instructor?.user?.firstName} ${instructor?.user?.lastName}`
                        : "Instructor"}
                    </h3>

                    {/* Title */}
                    <p className="mb-4 text-sm text-slate-600 font-mono">
                      {instructor.title || "Course Instructor"}
                    </p>

                    {/* Stats */}
                    <div className="mb-4 flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-[#06D001] text-[#06D001]" />
                        <span className="font-semibold text-slate-900">
                          {instructor.rating}
                        </span>
                      </div>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">
                        {instructor.totalReviews} reviews
                      </span>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-slate-100">
                      <div className="text-center">
                        <div className="font-display text-xl font-bold text-slate-900">
                          {instructor.totalReviews || 0}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Courses
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-display text-xl font-bold text-slate-900">
                          {instructor.totalReviews
                            ? instructor.totalReviews > 1000
                              ? `${Math.floor(instructor.totalReviews / 1000)}K`
                              : instructor.totalReviews
                            : "0"}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Students
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    {(instructor.website ||
                      instructor.linkedin ||
                      instructor.twitter ||
                      instructor.youtube) && (
                      <div className="flex justify-center gap-3 mb-4">
                        {instructor.website && (
                          <a
                            href={instructor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-[#2845D6] transition-colors"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                        {instructor.linkedin && (
                          <a
                            href={instructor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-[#2845D6] transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {instructor.twitter && (
                          <a
                            href={instructor.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-[#2845D6] transition-colors"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        {instructor.youtube && (
                          <a
                            href={instructor.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-[#2845D6] transition-colors"
                          >
                            <Youtube className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    )}

                    {/* CTA Button */}
                    <Link href={`/instructors/${instructor._id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-[#2845D6] text-[#2845D6] hover:bg-[#2845D6] hover:text-white transition-colors group/btn"
                      >
                        View Profile
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default InstructorsSection;
