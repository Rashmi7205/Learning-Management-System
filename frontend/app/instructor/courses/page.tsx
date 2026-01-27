"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CourseCard } from "@/components/course-card";

const mockCourses = [
  {
    _id: "course1",
    title: "Full Web Designing Course With 10+",
    subtitle: "Learn complete web design from scratch",
    thumbnail: {
      publicId: "course1-thumb",
      secureUrl:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    },
    totalLectures: 4,
    totalDuration: 300,
    price: 49.99,
    discountPrice: 29.99,
    isFree: false,
    currency: "USD",
    rating: 5.0,
    totalReviews: 1,
    bestseller: false,
    instructor: "instructor1",
  },
  {
    _id: "course2",
    title: "Learn 3D Modelling and design Beginners",
    subtitle: "3D art and design comprehensive guide",
    thumbnail: {
      publicId: "course2-thumb",
      secureUrl:
        "https://images.unsplash.com/photo-1618183479302-1461ae109845?w=500&h=300&fit=crop",
    },
    totalLectures: 4,
    totalDuration: 120,
    price: 39.99,
    discountPrice: 19.99,
    isFree: false,
    currency: "USD",
    rating: 5.0,
    totalReviews: 1,
    bestseller: false,
    instructor: "instructor2",
  },
  {
    _id: "course3",
    title: "Taboos about Gym you should Share.",
    subtitle: "Fitness and gym training essentials",
    thumbnail: {
      publicId: "course3-thumb",
      secureUrl:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop",
    },
    totalLectures: 4,
    totalDuration: 180,
    price: 29.99,
    isFree: true,
    currency: "USD",
    rating: 5.0,
    totalReviews: 1,
    bestseller: false,
    instructor: "instructor3",
  },
  {
    _id: "course4",
    title: "JavaScript Mastery",
    subtitle: "Complete JavaScript guide from zero to hero",
    thumbnail: {
      publicId: "course4-thumb",
      secureUrl:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    },
    totalLectures: 80,
    totalDuration: 1200,
    price: 34.99,
    discountPrice: 14.99,
    isFree: false,
    currency: "USD",
    rating: 4.9,
    totalReviews: 2840,
    bestseller: true,
    instructor: "instructor4",
  },
  {
    _id: "course5",
    title: "CSS Grid & Flexbox Mastery",
    subtitle: "Master modern CSS layouts",
    thumbnail: {
      publicId: "course5-thumb",
      secureUrl:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    },
    totalLectures: 42,
    totalDuration: 600,
    price: 29.99,
    discountPrice: 9.99,
    isFree: false,
    currency: "USD",
    rating: 4.8,
    totalReviews: 1920,
    bestseller: true,
    instructor: "instructor5",
  },
  {
    _id: "course6",
    title: "React Advanced Patterns",
    subtitle: "Advanced React concepts and patterns",
    thumbnail: {
      publicId: "course6-thumb",
      secureUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
    },
    totalLectures: 56,
    totalDuration: 840,
    price: 44.99,
    discountPrice: 24.99,
    isFree: false,
    currency: "USD",
    rating: 4.85,
    totalReviews: 1650,
    bestseller: false,
    instructor: "instructor6",
  },
];

const instructorMap = {
  instructor1: {
    name: "Millar Richard",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Millar",
  },
  instructor2: {
    name: "John Travolta",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  instructor3: {
    name: "Penelope Cruz",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Penelope",
  },
  instructor4: {
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  instructor5: {
    name: "Mike Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
  instructor6: {
    name: "Lisa Anderson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
  },
};

export default function CoursesPage() {
  return (
    <div className="h-full">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground mt-2">
            Browse and manage all available courses
          </p>
        </div>
        <Link href="/instructor/courses/builder">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            instructorInfo={
              instructorMap[course.instructor as keyof typeof instructorMap]
            }
          />
        ))}
      </div>
    </div>
  );
}
