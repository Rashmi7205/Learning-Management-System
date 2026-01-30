import { useState } from "react";
import {
  Star,
  Users,
  BookOpen,
  Award,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Instructor {
  name: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  students: number;
  courses: number;
  bio: string;
  socialLinks?: {
    website?: string;
    twitter?: string;
    linkedin?: string;
  };
}

interface InstructorSectionProps {
  instructors: Instructor[];
}

const InstructorSection = ({ instructors }: InstructorSectionProps) => {
  const [expandedBios, setExpandedBios] = useState<number[]>([]);

  const toggleBio = (idx: number) => {
    setExpandedBios((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-6">Instructor</h2>
      <div className="space-y-8">
        {instructors.map((instructor, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Profile Image & Actions */}
              <div className="flex flex-col items-center sm:items-start gap-4">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-primary/20"
                />
                <Button variant="outline" size="sm" className="w-full">
                  Follow
                </Button>
              </div>

              {/* Info */}
              <div className="flex-1">
                <Link
                  href="/"
                  className="text-lg font-bold text-primary hover:underline"
                >
                  {instructor.name}
                </Link>
                <p className="text-muted-foreground mb-4">{instructor.title}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="text-muted-foreground">
                      {instructor.rating.toFixed(1)} Instructor Rating
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {instructor.reviews.toLocaleString()} Reviews
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {instructor.students.toLocaleString()} Students
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {instructor.courses} Courses
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                {instructor.socialLinks && (
                  <div className="flex gap-2 mb-4">
                    {instructor.socialLinks.website && (
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={instructor.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Website
                        </a>
                      </Button>
                    )}
                    {instructor.socialLinks.twitter && (
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={instructor.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Twitter
                        </a>
                      </Button>
                    )}
                    {instructor.socialLinks.linkedin && (
                      <Button variant="ghost" size="sm" asChild>
                        <a
                          href={instructor.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </a>
                      </Button>
                    )}
                  </div>
                )}

                {/* Bio */}
                <p
                  className={`text-muted-foreground text-sm leading-relaxed ${!expandedBios.includes(idx) ? "line-clamp-3" : ""}`}
                >
                  {instructor.bio}
                </p>
                {instructor.bio.length > 200 && (
                  <button
                    onClick={() => toggleBio(idx)}
                    className="flex items-center gap-1 mt-2 text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                  >
                    <span>
                      {expandedBios.includes(idx)
                        ? "Show Less"
                        : "Read Full Bio"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${expandedBios.includes(idx) ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorSection;
