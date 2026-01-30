import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CourseDescriptionProps {
  description: string;
  highlights?: string[];
}

const CourseDescription = ({
  description,
  highlights,
}: CourseDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedLength = 400;
  const shouldTruncate = description.length > truncatedLength;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Description</h2>
      <div className="prose prose-sm max-w-none text-muted-foreground">
        <p className={!isExpanded && shouldTruncate ? "line-clamp-4" : ""}>
          {description}
        </p>

        {highlights && highlights.length > 0 && isExpanded && (
          <div className="mt-4">
            <p className="font-semibold text-foreground mb-2">
              In this course, you'll learn:
            </p>
            <ul className="space-y-2">
              {highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 mt-4 text-primary font-medium hover:text-primary/80 transition-colors"
        >
          <span>{isExpanded ? "Show Less" : "Read More"}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
};

export default CourseDescription;
