import { Star, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

import instructor1 from "@/public/assets/ist.png";
import instructor2 from "@/public/assets/ist.png";
import instructor3 from "@/public/assets/ist.png";
import instructor4 from "@/public/assets/ist.png";
import Image from "next/image";

const instructors = [
  {
    id: 1,
    name: "Albert Webber",
    role: "Chief Advisor",
    image: instructor1,
    courses: 12,
    students: 45000,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Amayah Harmon",
    role: "Digital Marketer",
    image: instructor2,
    courses: 8,
    students: 38000,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Ameer Cohen",
    role: "Web Developer",
    image: instructor3,
    courses: 15,
    students: 52000,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Baker Bonilla",
    role: "WordPress Expert",
    image: instructor4,
    courses: 6,
    students: 31000,
    rating: 4.7,
  },
];

const InstructorsSection = () => {
  return (
    <section id="instructors" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Instructors
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Course Instructors
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn from industry experts who are passionate about teaching and
            sharing their knowledge.
          </p>
        </div>

        {/* Instructors Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="instructor-card group">
              {/* Profile Image */}
              <div className="relative mb-4">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-primary/20 group-hover:border-primary transition-colors"
                />
                <div className="absolute bottom-0 right-1/2 translate-x-8 translate-y-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <Star className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                </div>
              </div>

              {/* Instructor Info */}
              <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                {instructor.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {instructor.role}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>{instructor.courses} Courses</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{(instructor.students / 1000).toFixed(0)}K</span>
                </div>
              </div>

              {/* View Profile */}
              <Button
                variant="outline"
                className="w-full mt-4 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground rounded-xl"
              >
                View Profile
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
