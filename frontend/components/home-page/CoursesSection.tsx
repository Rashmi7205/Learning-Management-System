import { Star, Clock, Users, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import course1 from "@/public/assets/course-1.png";
import course2 from "@/public/assets/course-2.png";
import course3 from "@/public/assets/course-3.png";
import course4 from "@/public/assets/course-4.png";
import course5 from "@/public/assets/course-1.png";
import course6 from "@/public/assets/course-2.png";
import course7 from "@/public/assets/course-3.png";
import course8 from "@/public/assets/course-4.png";
import Image from "next/image";

const courses = [
  {
    id: 1,
    title: "Full Web Designing Course With 10+ Templates",
    instructor: "Dr. James Wilson",
    instructorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    image: course1,
    rating: 4.9,
    reviews: 128,
    students: 12500,
    lessons: 24,
    duration: "24 hours",
    price: 89,
    originalPrice: 129,
    categories: ["Data Science", "Development"],
    isFree: false,
  },
  {
    id: 2,
    title: "Python for Data Science Masterclass",
    instructor: "Sarah Chen",
    instructorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    image: course2,
    rating: 4.8,
    reviews: 256,
    students: 18200,
    lessons: 32,
    duration: "32 hours",
    price: 0,
    originalPrice: 79,
    categories: ["Python", "Data Science"],
    isFree: true,
  },
  {
    id: 3,
    title: "Deep Learning with TensorFlow 2.0",
    instructor: "Dr. Michael Park",
    instructorImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    image: course3,
    rating: 4.9,
    reviews: 89,
    students: 8900,
    lessons: 40,
    duration: "40 hours",
    price: 129,
    originalPrice: 199,
    categories: ["Deep Learning", "AI"],
    isFree: false,
  },
  {
    id: 4,
    title: "Data Analytics & Visualization Complete",
    instructor: "Emily Roberts",
    instructorImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    image: course4,
    rating: 4.7,
    reviews: 156,
    students: 15600,
    lessons: 28,
    duration: "28 hours",
    price: 69,
    originalPrice: 99,
    categories: ["Analytics", "Business"],
    isFree: false,
  },
  {
    id: 5,
    title: "Natural Language Processing Fundamentals",
    instructor: "Dr. Lisa Wang",
    instructorImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    image: course5,
    rating: 4.8,
    reviews: 67,
    students: 6700,
    lessons: 36,
    duration: "36 hours",
    price: 0,
    originalPrice: 109,
    categories: ["NLP", "AI"],
    isFree: true,
  },
  {
    id: 6,
    title: "Computer Vision Mastery Course",
    instructor: "Alex Thompson",
    instructorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    image: course6,
    rating: 4.9,
    reviews: 54,
    students: 5400,
    lessons: 44,
    duration: "44 hours",
    price: 139,
    originalPrice: 199,
    categories: ["Computer Vision", "AI"],
    isFree: false,
  },
  {
    id: 7,
    title: "Reinforcement Learning From Scratch",
    instructor: "Dr. David Kim",
    instructorImage:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
    image: course7,
    rating: 4.7,
    reviews: 42,
    students: 4200,
    lessons: 38,
    duration: "38 hours",
    price: 119,
    originalPrice: 159,
    categories: ["Machine Learning", "AI"],
    isFree: false,
  },
  {
    id: 8,
    title: "MLOps & Cloud Deployment Guide",
    instructor: "Jennifer Martinez",
    instructorImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    image: course8,
    rating: 4.8,
    reviews: 78,
    students: 7800,
    lessons: 30,
    duration: "30 hours",
    price: 0,
    originalPrice: 99,
    categories: ["MLOps", "Cloud"],
    isFree: true,
  },
];

const CoursesSection = () => {
  return (
    <section id="courses" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Popular Courses
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Explore Our Best Courses
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Learn from industry experts and world-class researchers with our
              most popular courses.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Courses →
          </Button>
        </div>

        {/* Course Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-card rounded-2xl border border-border overflow-hidden card-hover shadow-soft group cursor-pointer"
            >
              {/* Course Image */}
              <div className="relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  className="course-image w-full"
                />
                {course.isFree ? (
                  <span className="free-badge">Free</span>
                ) : (
                  <span className="price-badge">${course.price}</span>
                )}
                {/* Categories */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {course.categories.slice(0, 2).map((cat, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-white/90 text-foreground text-xs"
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Course Info */}
              <div className="p-5">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  {course.title}
                </h3>

                {/* Instructor */}
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={course.instructorImage}
                    alt={course.instructor}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="text-sm text-muted-foreground">
                    {course.instructor}
                  </span>
                </div>

                {/* Rating & Price */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="font-semibold text-foreground">
                      {course.rating}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      ({course.reviews.toString().padStart(2, "0")})
                    </span>
                  </div>
                  <Button size="sm" className="btn-cta text-xs py-1 px-4">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
