import { ChevronDown, Lock, Play, FileText, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Lecture {
  title: string;
  type: "video" | "quiz" | "article" | "resource";
  duration?: string;
  isPreview?: boolean;
  isLocked?: boolean;
}

interface Section {
  title: string;
  duration: string;
  lectures: Lecture[];
}

interface CourseCurriculumProps {
  curriculum: Section[];
  totalSections: number;
  totalLectures: number;
  totalDuration: string;
}

const CourseCurriculum = ({
  curriculum,
  totalSections,
  totalLectures,
  totalDuration,
}: CourseCurriculumProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set([0]),
  );

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />;
      case "quiz":
        return <CheckCircle className="w-4 h-4" />;
      case "article":
        return <FileText className="w-4 h-4" />;
      case "resource":
        return <FileText className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Course Curriculum
        </h2>
        <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Sections</p>
            <p className="text-lg font-semibold text-foreground">
              {totalSections}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Lectures</p>
            <p className="text-lg font-semibold text-foreground">
              {totalLectures}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="text-lg font-semibold text-foreground">
              {totalDuration}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {curriculum.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border border-border rounded-lg">
            <button
              onClick={() => toggleSection(sectionIndex)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 text-left">
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    expandedSections.has(sectionIndex)
                      ? "rotate-0"
                      : "-rotate-90"
                  }`}
                />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {section.lectures.length} lectures • {section.duration}
                  </p>
                </div>
              </div>
            </button>

            {expandedSections.has(sectionIndex) && (
              <div className="border-t border-border bg-muted/30">
                {section.lectures.map((lecture, lectureIndex) => (
                  <div
                    key={lectureIndex}
                    className="flex items-center gap-3 p-4 border-t border-border/50 last:border-t-0 hover:bg-muted/50 transition-colors"
                  >
                    {lecture.isLocked ? (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      getIcon(lecture.type)
                    )}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm ${
                          lecture.isLocked
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {lecture.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      {lecture.isPreview && (
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                          Preview
                        </span>
                      )}
                      {lecture.duration && (
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
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
    </div>
  );
};

export default CourseCurriculum;
