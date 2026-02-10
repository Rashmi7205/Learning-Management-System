import { Instructor } from "@/lib/types";
import {
  Star,
  MessageSquare,
  Users,
  CheckCircle2,
  Globe,
  Linkedin,
  Youtube,
  GraduationCap,
  Award,
  Briefcase,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const CourseInstructor = ({
  instructor,
}: {
  instructor: Instructor;
}) => {
  const initials = `${instructor.user.firstName?.charAt(0) || ""}${instructor.user.lastName?.charAt(0) || ""}`;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start bg-white/5 p-8 rounded-[32px] border border-white/10">
        {/* Profile Section */}
        <div className="flex flex-col items-center shrink-0 gap-4">
          <Avatar className="w-32 h-32 md:w-48 md:h-48 rounded-[24px] border-2 border-white/5 shadow-2xl">
            <AvatarImage
              src={instructor.user.avatar?.secureUrl}
              alt={instructor.user.firstName}
              className="object-cover"
            />
            <AvatarFallback className="rounded-[24px] bg-slate-800 text-3xl font-bold text-blue-400">
              {initials || "IN"}
            </AvatarFallback>
          </Avatar>

          {/* Social Links */}
          <div className="flex gap-3">
            {instructor.website && (
              <a
                href={instructor.website}
                target="_blank"
                className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-all"
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
            {instructor.linkedin && (
              <a
                href={instructor.linkedin}
                target="_blank"
                className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {instructor.twitter && (
              <a
                href={instructor.twitter}
                target="_blank"
                className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-all"
              >
                <X className="w-5 h-5" />
              </a>
            )}
            {instructor.youtube && (
              <a
                href={instructor.youtube}
                target="_blank"
                className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-3xl font-bold text-white font-display">
              {instructor.user.firstName} {instructor.user.lastName}
            </h3>
            {instructor.identityVerified && (
              <CheckCircle2
                className="w-6 h-6 text-blue-500 fill-blue-500/10"
              />
            )}
          </div>

          <p className="text-blue-400 font-medium text-lg mb-4">
            {instructor.title}
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-6 mb-6 py-4 border-y border-white/5">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-bold text-slate-200">
                {instructor.rating} Instructor Rating
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-slate-200">
                {instructor.totalReviews?.toLocaleString()} Reviews
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-slate-200">
                {instructor.totalStudents?.toLocaleString()} Students
              </span>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-4">
            {/* Experience & Education Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {instructor.yearsOfExperience && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-slate-300">
                    {instructor.yearsOfExperience} Years Experience
                  </span>
                </div>
              )}
              {instructor.education && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-slate-300">
                    {instructor.education}
                  </span>
                </div>
              )}
            </div>

            {/* Expertise Tags */}
            {instructor.expertise && instructor.expertise.length > 0 && (
              <div className="pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  {instructor.expertise.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
