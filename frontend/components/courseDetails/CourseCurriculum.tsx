import { Section } from "@/lib/types";
import { ChevronDown, Play, BookOpen } from "lucide-react";

interface CourseCurriculumProps {
  curriculum: Section[];
  expandedSection: string | null;
  setExpandedSection: (id: string | null) => void;
  onPlay: (url: string) => void;
}

export const CourseCurriculum = ({
  curriculum,
  expandedSection,
  setExpandedSection,
  onPlay,
}: CourseCurriculumProps) => (
  <div className="space-y-4 animate-in fade-in duration-500">
    {curriculum.map((section: any) => (
      <div
        key={section._id}
        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
      >
        <button
          onClick={() =>
            setExpandedSection(
              expandedSection === section._id ? null : section._id,
            )
          }
          className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <ChevronDown
              className={`w-5 h-5 text-blue-500 transition-transform ${
                expandedSection === section._id ? "" : "-rotate-90"
              }`}
            />
            <span className="font-bold text-white text-lg">
              {section.title}
            </span>
          </div>
          <span className="text-sm text-slate-500 hidden sm:inline">
            {section.totalLectures} lectures • {section.duration}
          </span>
        </button>

        {expandedSection === section._id && (
          <div className="px-6 pb-6 space-y-3">
            {section.lectures.map((lecture: any, i: number) => (
              <div
                key={lecture._id}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-white/5 group hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  {lecture.isPreview ? (
                    <Play className="w-4 h-4 text-blue-400" />
                  ) : (
                    <BookOpen className="w-4 h-4 text-slate-600" />
                  )}
                  <span className="text-sm text-slate-300 font-medium">
                    {lecture.title}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {lecture.isPreview ? (
                    <div className="flex items-center gap-3">
                      <span className="hidden md:inline text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Free Preview
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlay(
                            lecture.videoUrl.secureUrl ||
                              "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                          );
                        }}
                        className="flex items-center gap-2 text-[10px] font-bold text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-lg border border-blue-400/20 hover:bg-blue-400/20 transition-colors shadow-sm"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Watch
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono">
                      {lecture.duration}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);
