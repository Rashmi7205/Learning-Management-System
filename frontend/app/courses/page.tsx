"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Star,
  Users,
  List,
  Check,
  Filter,
  Grid3x3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home-page/Header";
import Footer from "@/components/home-page/Footer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Mock course data
const mockCourses = [
  {
    _id: "1",
    title: "Complete Web Development Bootcamp 2024",
    thumbnail: {
      secureUrl:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    },
    category: ["Development", "Web Development"],
    price: 89.99,
    isFree: false,
    averageRating: 4.9,
    reviewCount: 1234,
    totalLectures: 320,
    totalDuration: 3600,
    level: "Beginner",
    language: "English",
    instructor: {
      user: {
        firstName: "Sarah",
        lastName: "Chen",
        avatar: { secureUrl: "https://i.pravatar.cc/150?img=1" },
      },
    },
    enrolledStudents: 45230,
    lastUpdated: "2024-01-15",
  },
];

function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [isFreeOnly, setIsFreeOnly] = useState(false);
  const [hasSubtitles, setHasSubtitles] = useState(false);
  const [hasCertificate, setHasCertificate] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const categories = [
    "Development",
    "Design",
    "Business",
    "Marketing",
    "Photography",
    "Music",
    "Health & Fitness",
    "Finance",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Hindi",
    "Chinese",
  ];
  const durations = ["0-2 hours", "3-6 hours", "7-17 hours", "17+ hours"];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
    );
  };

  const toggleWishlist = (courseId: string) => {
    setWishlist((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  };

  const toggleCart = (courseId: string) => {
    setCart((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedLanguages([]);
    setPriceRange([0, 200]);
    setSelectedRating(0);
    setSelectedDuration([]);
    setIsFreeOnly(false);
    setHasSubtitles(false);
    setHasCertificate(false);
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedLevels.length +
    selectedLanguages.length +
    selectedDuration.length +
    (isFreeOnly ? 1 : 0) +
    (hasSubtitles ? 1 : 0) +
    (hasCertificate ? 1 : 0) +
    (selectedRating > 0 ? 1 : 0);

  const filteredCourses = useMemo(() => {
    return mockCourses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        course.category.some((cat) => selectedCategories.includes(cat));
      const matchesLevel =
        selectedLevels.length === 0 || selectedLevels.includes(course.level);
      const matchesPrice = isFreeOnly
        ? course.isFree
        : course.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });
  }, [searchQuery, selectedCategories, selectedLevels, isFreeOnly, priceRange]);

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-white">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl space-y-8">
        {/* Categories Section */}
        <div>
          <h4 className="font-semibold text-slate-100 mb-4 text-sm uppercase tracking-wider">
            Categories
          </h4>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="peer w-5 h-5 rounded border-white/10 bg-slate-800 checked:bg-blue-600 checked:border-transparent focus:ring-offset-0 focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer"
                  />
                  {/* Custom Checkmark Icon for that premium feel */}
                  <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" />
                </div>
                <span className="text-sm text-slate-400 group-hover:text-white transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      <Header />

      {/* Banner Section - Adjusted for deeper contrast */}
      <div className="bg-[#020617] border-b border-white/5 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] -z-0" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-600/5 blur-[100px] -z-0" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Badge className="mb-4 bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
            Marketplace
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Master New Skills.
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Join thousands of students learning from industry experts in
            development, design, and business.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar - Switched to dark background */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn today?"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/50 border border-white/10 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full py-6 border-white/10 bg-slate-900 text-white hover:bg-slate-800"
                >
                  <Filter className="w-4 h-4 mr-2" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 bg-[#020617] border-r border-white/10 text-white overflow-y-auto"
              >
                <FilterContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar stays dark via the FilterContent update */}
          <aside className="hidden lg:block w-72 shrink-0">
            <FilterContent />
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-400">
                Showing{" "}
                <span className="text-white font-bold">
                  {filteredCourses.length}
                </span>{" "}
                results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-slate-400 hover:text-white"
                  }
                >
                  <Grid3x3 size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-slate-400 hover:text-white"
                  }
                >
                  <List size={20} />
                </Button>
              </div>
            </div>

            {filteredCourses.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-6"
                }
              >
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              /* Empty State - Adjusted for Dark Theme */
              <div className="text-center py-20 bg-slate-900/30 rounded-3xl border-2 border-dashed border-white/5">
                <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">
                  No courses found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function CourseCard({ course, viewMode }: { course: any; viewMode: string }) {
  return (
    <div
      className={`group relative bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden
      hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:-translate-y-1
      transition-all duration-300 ${viewMode === "list" ? "flex h-64" : "flex flex-col"}`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${viewMode === "list" ? "w-1/3 h-full" : "w-full h-48"}`}
      >
        <Image
          src={course.thumbnail.secureUrl}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark Overlay for better text readability on images */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent opacity-60" />

        <div className="absolute top-4 left-4">
          <Badge className="bg-[#020617]/60 backdrop-blur-md text-blue-400 border border-white/10 hover:bg-[#020617]">
            {course.level}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col justify-between flex-1 relative">
        <div>
          <h3 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 leading-tight">
            {course.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/10">
              <Image
                src={course.instructor.user.avatar.secureUrl}
                alt="Avatar"
                fill
              />
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {course.instructor.user.firstName}{" "}
              {course.instructor.user.lastName}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-blue-500 text-blue-500" />
              <span className="text-slate-300">{course.averageRating}</span>
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {course.enrolledStudents.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-xl font-black text-white">
              {course.isFree ? (
                <span className="text-emerald-400">Free</span>
              ) : (
                `$${course.price}`
              )}
            </span>
          </div>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-5 font-semibold shadow-lg shadow-blue-900/20 transition-all active:scale-95"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Courses;
