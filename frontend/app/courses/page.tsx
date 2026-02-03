"use client";
import { useState, useMemo } from "react";
import { Search, Heart, Clock, BookOpen, Star, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import course1 from "@/public/assets/course-1.png";
import course2 from "@/public/assets/course-1.png";
import course3 from "@/public/assets/course-1.png";
import course4 from "@/public/assets/course-1.png";
import course5 from "@/public/assets/course-1.png";
import course6 from "@/public/assets/course-1.png";
import course7 from "@/public/assets/course-1.png";
import course8 from "@/public/assets/course-1.png";
import Header from "@/components/home-page/Header";
import Link from "next/link";
import Footer from "@/components/home-page/Footer";

const allCourses = [
  {
    id: 1,
    title: "Full Web Designing Course With 10+ Templates",
    subtitle: "Master web design from scratch with practical projects",
    instructor: "Dr. James Wilson",
    instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    image: course1,
    rating: 4.9,
    reviews: 2847,
    students: 12500,
    lessons: 45,
    duration: "24 hours",
    price: 499,
    originalPrice: 2999,
    category: "Web Development",
    isBestseller: true,
    isFree: false,
  },
  {
    id: 2,
    title: "Python for Data Science Masterclass",
    subtitle: "Learn Python programming for data analysis and visualization",
    instructor: "Sarah Chen",
    instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    image: course2,
    rating: 4.8,
    reviews: 1256,
    students: 18200,
    lessons: 32,
    duration: "32 hours",
    price: 0,
    originalPrice: 1999,
    category: "Data Science",
    isBestseller: false,
    isFree: true,
  },
  {
    id: 3,
    title: "Deep Learning with TensorFlow 2.0",
    subtitle: "Build neural networks and AI applications from scratch",
    instructor: "Dr. Michael Park",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    image: course3,
    rating: 4.9,
    reviews: 892,
    students: 8900,
    lessons: 40,
    duration: "40 hours",
    price: 799,
    originalPrice: 3499,
    category: "Data Science",
    isBestseller: true,
    isFree: false,
  },
  {
    id: 4,
    title: "Data Analytics & Visualization Complete",
    subtitle: "Transform data into actionable insights with modern tools",
    instructor: "Emily Roberts",
    instructorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    image: course4,
    rating: 4.7,
    reviews: 1156,
    students: 15600,
    lessons: 28,
    duration: "28 hours",
    price: 599,
    originalPrice: 2499,
    category: "Data Science",
    isBestseller: false,
    isFree: false,
  },
  {
    id: 5,
    title: "Natural Language Processing Fundamentals",
    subtitle: "Master NLP techniques for text analysis and chatbots",
    instructor: "Dr. Lisa Wang",
    instructorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    image: course5,
    rating: 4.8,
    reviews: 678,
    students: 6700,
    lessons: 36,
    duration: "36 hours",
    price: 0,
    originalPrice: 2999,
    category: "Data Science",
    isBestseller: false,
    isFree: true,
  },
  {
    id: 6,
    title: "Computer Vision Mastery Course",
    subtitle: "Build image recognition and object detection systems",
    instructor: "Alex Thompson",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    image: course6,
    rating: 4.9,
    reviews: 543,
    students: 5400,
    lessons: 44,
    duration: "44 hours",
    price: 899,
    originalPrice: 3999,
    category: "Data Science",
    isBestseller: true,
    isFree: false,
  },
  {
    id: 7,
    title: "Mobile App Development with React Native",
    subtitle: "Create cross-platform mobile apps with JavaScript",
    instructor: "Dr. David Kim",
    instructorImage: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
    image: course7,
    rating: 4.7,
    reviews: 423,
    students: 4200,
    lessons: 38,
    duration: "38 hours",
    price: 699,
    originalPrice: 2999,
    category: "Mobile Development",
    isBestseller: false,
    isFree: false,
  },
  {
    id: 8,
    title: "MLOps & Cloud Deployment Guide",
    subtitle: "Deploy and scale machine learning models in production",
    instructor: "Jennifer Martinez",
    instructorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    image: course8,
    rating: 4.8,
    reviews: 789,
    students: 7800,
    lessons: 30,
    duration: "30 hours",
    price: 0,
    originalPrice: 2499,
    category: "Data Science",
    isBestseller: false,
    isFree: true,
  },
  {
    id: 9,
    title: "UI/UX Design Fundamentals",
    subtitle: "Learn design principles and create stunning interfaces",
    instructor: "Anna Smith",
    instructorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
    image: course1,
    rating: 4.6,
    reviews: 1023,
    students: 9800,
    lessons: 25,
    duration: "20 hours",
    price: 449,
    originalPrice: 1999,
    category: "Design",
    isBestseller: false,
    isFree: false,
  },
  {
    id: 10,
    title: "Digital Marketing Masterclass",
    subtitle: "Master SEO, social media, and online advertising",
    instructor: "Mark Johnson",
    instructorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    image: course2,
    rating: 4.5,
    reviews: 867,
    students: 11200,
    lessons: 35,
    duration: "28 hours",
    price: 399,
    originalPrice: 1799,
    category: "Marketing",
    isBestseller: false,
    isFree: false,
  },
  {
    id: 11,
    title: "Business Strategy Essentials",
    subtitle: "Learn strategic thinking and business management",
    instructor: "Robert Brown",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    image: course3,
    rating: 4.7,
    reviews: 534,
    students: 6700,
    lessons: 22,
    duration: "18 hours",
    price: 549,
    originalPrice: 2299,
    category: "Business",
    isBestseller: false,
    isFree: false,
  },
  {
    id: 12,
    title: "Photography Masterclass",
    subtitle: "Capture stunning photos with any camera",
    instructor: "Lisa Chen",
    instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    image: course4,
    rating: 4.8,
    reviews: 1234,
    students: 14500,
    lessons: 40,
    duration: "32 hours",
    price: 0,
    originalPrice: 1999,
    category: "Photography",
    isBestseller: true,
    isFree: true,
  },
];

const categories = [
  { value: "all", label: "All Categories", count: 1234 },
  { value: "web-development", label: "Web Development", count: 456 },
  { value: "mobile-development", label: "Mobile Development", count: 234 },
  { value: "data-science", label: "Data Science", count: 189 },
  { value: "design", label: "Design", count: 345 },
  { value: "marketing", label: "Marketing", count: 267 },
  { value: "business", label: "Business", count: 189 },
  { value: "photography", label: "Photography", count: 123 },
];

const ITEMS_PER_PAGE = 12;

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "all" ||
        course.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const toggleWishlist = (courseId: number) => {
    setWishlist((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis-start" />);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis-end" />);
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Search & Filter Section */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Discover Courses
            </h1>
            <p className="text-muted-foreground mb-8">
              Find the perfect course to advance your skills
            </p>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for courses... e.g., React, Python, Design..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-6 text-lg border-2 border-border rounded-xl focus:border-primary bg-background"
              />
            </div>

            {/* Category Filter & Results Count */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full sm:w-[280px] h-12 border-2 border-border rounded-xl bg-background">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label} ({cat.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p className="text-muted-foreground">
                📊 Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> courses
              </p>
            </div>
          </div>
        </section>

        {/* Course Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {paginatedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Course Image */}
                    <div className="relative">
                      <img
                        src="/assets/course-1.png"
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(course.id)}
                        className="absolute top-3 left-3 p-2 bg-background/90 rounded-full hover:bg-background transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            wishlist.includes(course.id)
                              ? "fill-destructive text-destructive"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>

                      {/* Badges */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {course.isBestseller && (
                          <Badge className="bg-warning text-warning-foreground">
                            🔥 Bestseller
                          </Badge>
                        )}
                        {course.isFree && (
                          <Badge className="bg-success text-success-foreground">
                            Free
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="p-5">
                      {/* Title */}
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                        {course.subtitle}
                      </p>

                      {/* Instructor */}
                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={course.instructorImage}
                          alt={course.instructor}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-muted-foreground">
                          {course.instructor}
                        </span>
                      </div>

                      {/* Rating & Students */}
                      <div className="flex items-center gap-3 text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-warning text-warning" />
                          <span className="font-semibold">{course.rating}</span>
                          <span className="text-muted-foreground">
                            ({course.reviews.toLocaleString()})
                          </span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Lessons & Duration */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons} lectures</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-border pt-4">
                        {/* Price */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {course.isFree ? (
                              <span className="text-xl font-bold text-success">Free</span>
                            ) : (
                              <>
                                <span className="text-xl font-bold text-foreground">
                                  ₹{course.price}
                                </span>
                                <span className="text-sm text-muted-foreground line-through">
                                  ₹{course.originalPrice}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button className="flex-1 btn-cta" size="sm">
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/course/${course.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No courses found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredCourses.length > 0 && totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center gap-4">
                <p className="text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredCourses.length)} of {filteredCourses.length} courses
                </p>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        className={`cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
                      />
                    </PaginationItem>

                    {renderPaginationItems()}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        className={`cursor-pointer ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
