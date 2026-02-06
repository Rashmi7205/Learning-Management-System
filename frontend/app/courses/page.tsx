"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Star,
  Users,
  List,
  Check,
  Filter,
  Grid3x3,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Header from "@/components/home-page/Header";
import Footer from "@/components/home-page/Footer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllCategoryList, getCoursesList } from "@/lib/store/slices/courseClice";

function Courses() {
  const dispatch = useAppDispatch();
  const { courseList, loading, page, totalPages, totalCourses, categories } =
    useAppSelector((state) => ({
      courseList: state.courses.courseList,
      loading: state.courses.loading,
      page: state.courses.page,
      totalPages: state.courses.totalPages,
      totalCourses: state.courses.totalCourses,
      categories: state.courses.categories,
    }));

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    dispatch(
      getCoursesList({
        page: 1,
        limit: 9,
        searchText: searchQuery,
        category: selectedCategories,
      }),
    );
    if(categories.length==0){
      dispatch(getAllCategoryList());
    }
  }, [dispatch, searchQuery, selectedCategories]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(
        getCoursesList({
          page: newPage,
          limit: 9,
          searchText: searchQuery,
          category: selectedCategories,
        }),
      );
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-white">Filters</h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={() => setSelectedCategories([])}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
        <h4 className="font-semibold text-slate-100 mb-4 text-sm uppercase tracking-wider">
          Categories
        </h4>
        <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
          {categories.map((cat) => (
            <label
              key={cat.name}
              className="flex items-center justify-between group cursor-pointer py-1.5"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => toggleCategory(cat.name)}
                    className="peer w-5 h-5 rounded border-white/10 bg-slate-800 checked:bg-blue-600 appearance-none cursor-pointer transition-all"
                  />
                  <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5" />
                </div>
                <span
                  className={`text-sm transition-colors ${
                    selectedCategories.includes(cat.name)
                      ? "text-white font-medium"
                      : "text-slate-400 group-hover:text-slate-200"
                  }`}
                >
                  {cat.name}
                </span>
              </div>
              {/* Added the count badge for better UX */}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-500 group-hover:bg-white/10 transition-colors">
                {cat.count}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <Header />

      <div className="bg-[#020617] border-b border-white/5 py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
            Marketplace
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            Master New Skills.
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to learn today?"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/50 border border-white/10 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="lg:hidden py-6 bg-slate-900 text-white"
              >
                <Filter className="w-4 h-4 mr-2" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#020617] text-white">
              <FilterContent />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <FilterContent />
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-slate-400">
                Found{" "}
                <span className="text-white font-bold">{totalCourses}</span>{" "}
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
                      : "text-slate-400"
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
                      : "text-slate-400"
                  }
                >
                  <List size={20} />
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
              </div>
            ) : courseList.length > 0 ? (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "flex flex-col gap-6"
                  }
                >
                  {courseList.map((course) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    <Button
                      variant="outline"
                      disabled={page === 1}
                      onClick={() => handlePageChange(page - 1)}
                      className="border-white/10 bg-slate-900 text-white"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                    </Button>
                    <span className="text-sm text-slate-400">
                      Page <span className="text-white font-bold">{page}</span>{" "}
                      of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      disabled={page === totalPages}
                      onClick={() => handlePageChange(page + 1)}
                      className="border-white/10 bg-slate-900 text-white"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-slate-900/30 rounded-3xl border-2 border-dashed border-white/5">
                <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">
                  No courses found
                </h3>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// CourseCard remains largely the same but uses your dynamic data
function CourseCard({ course, viewMode }: { course: any; viewMode: string }) {
  return (
    <div
      className={`group relative bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 ${viewMode === "list" ? "flex h-64" : "flex flex-col"}`}
    >
      <div
        className={`relative overflow-hidden ${viewMode === "list" ? "w-1/3 h-full" : "w-full h-48"}`}
      >
        <Image
          src={course.thumbnail?.secureUrl || "/placeholder.jpg"}
          alt={course.title}
          fill
          className="object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-[#020617]/60 text-blue-400">
            {course.category[0]}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
            {course.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-slate-400">
              By {course.instructor?.user?.firstName}{" "}
              {course.instructor?.user?.lastName}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-blue-500 text-blue-500" />{" "}
              {course.averageRating}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> {course.enrollmentCount}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
          <span className="text-xl font-black text-white">
            {course.isFree ? (
              <span className="text-emerald-400">Free</span>
            ) : (
              `$${course.price}`
            )}
          </span>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 rounded-xl"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Courses;
