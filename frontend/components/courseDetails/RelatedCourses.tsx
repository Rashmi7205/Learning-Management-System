import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorImage: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  isFree: boolean;
}

interface RelatedCoursesProps {
  title: string;
  courses: Course[];
  showViewAll?: boolean;
}

const RelatedCourses = ({ title, courses, showViewAll }: RelatedCoursesProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          {showViewAll && (
            <Button variant="link" asChild>
              <Link href="/">View All Courses</Link>
            </Button>
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/course/${course.id}`}
            className="flex-shrink-0 w-[280px] bg-card rounded-2xl border border-border overflow-hidden card-hover shadow-soft group"
          >
            <div className="relative">
              <img
                src="assets/course-1.jpg"
                alt={course.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {course.isFree ? (
                <span className="absolute top-3 right-3 bg-green text-white px-2 py-1 rounded text-xs font-bold">
                  Free
                </span>
              ) : (
                <span className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">
                  ₹{course.price}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="/assets/ist.png"
                  alt={course.instructor}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-muted-foreground">{course.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    {course.rating > 0 ? course.rating.toFixed(1) : "New"}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({course.reviews} reviews)
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;
