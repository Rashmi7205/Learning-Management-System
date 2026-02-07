import { Star, MessageSquare, Users } from "lucide-react";
import Image from "next/image";

export const CourseInstructor = ({ instructor }: { instructor: any }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex flex-col md:flex-row gap-8 items-start bg-white/5 p-8 rounded-[32px] border border-white/10">
      <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-[24px] overflow-hidden shrink-0">
        <Image
          src={instructor.avatar}
          alt={instructor.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="text-3xl font-bold text-white mb-1 font-display">
          {instructor.name}
        </h3>
        <p className="text-blue-400 font-medium mb-4">{instructor.title}</p>
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold">
              {instructor.rating} Rating
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold">
              {instructor.reviews.toLocaleString()} Reviews
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold">
              {instructor.students.toLocaleString()} Students
            </span>
          </div>
        </div>
        <p className="text-slate-400 leading-relaxed">{instructor.bio}</p>
      </div>
    </div>
  </div>
);
