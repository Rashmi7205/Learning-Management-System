"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowBigRight,
  ArrowRight,
  Heart,
  Star,
  TrendingUp,
} from "lucide-react";

interface RecommendationsProps {
  featuredCourses: Course[];
  bestsellerCourses: Course[];
}

export function Recommendations({
  featuredCourses,
  bestsellerCourses,
}: RecommendationsProps) {
  const allRecommendations = [
    ...featuredCourses.map((c) => ({ ...c, type: "featured" as const })),
    ...bestsellerCourses.map((c) => ({ ...c, type: "bestseller" as const })),
  ].slice(0, 6);

  if (allRecommendations.length === 0) {
    return (
      <Card className="p-8">
        <p className="text-muted-foreground text-center">
          No recommended courses available right now.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allRecommendations.map((course) => (
        <Card className="max-w-md pt-0 relative">
          <CardContent className="px-0">
            <img
              src={course.thumbnail?.secureUrl || "/placeholder-image.png"}
              alt={course.title}
              className="aspect-video h-70 rounded-t-xl object-cover"
            />
          </CardContent>

          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{course.title}</CardTitle>
              <div className="flex items-center gap-1 text-sm">
                <Star
                  className="h-4 w-4 fill-purple-500 text-
              purple-500"
                />
                <span className="font-medium">{course.rating}</span>
              </div>
            </div>
            <CardDescription>
              {course.subtitle || "Course"}
            </CardDescription>

            <div className="flex gap-2 pt-2">
              {
                course.category && (
                 course.category.map((cat) => (
                  <Badge
                    key={cat}
                    className="bg-blue-100 text-blue-800"
                  >
                    {cat}
                  </Badge>
                 ))
                )
              }

            </div>
          </CardHeader>

          <CardFooter className="gap-3 max-sm:flex-col max-sm:items-stretch flex-row items-center justify-between">
            <div className="text-3xl font-bold">
              {course.isFree ? (
                <span className="text-emerald-600">Free</span>
              ) : course.discountPrice && course.discountPrice < course.price ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-lg line-through text-muted-foreground">
                    ${course.price.toFixed(2)}
                  </span>
                  <span className="text-2xl text-red-600">
                    ${course.discountPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-foreground">
                  ${course.price.toFixed(2)}
                </span>
              )}
            </div>
            <Link
              href={`/courses/${course._id}`}
              className="rounded-md px-4 py-2 bg-primary text-primary-foreground flex items-center gap-1 hover:underline"
            >
              View Details
              <ArrowRight />
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     {allRecommendations.map((course) => (
//       <Card
//         key={course._id}
//         className="overflow-hidden hover:shadow-lg transition-shadow group"
//       >
//         {/* Course Thumbnail */}
//         <div className="relative h-40 bg-muted overflow-hidden">
//           {course.thumbnail?.secureUrl ? (
//             <Image
//               src={course.thumbnail.secureUrl}
//               alt={course.title}
//               fill
//               className="object-cover group-hover:scale-105 transition-transform"
//             />
//           ) : (
//             <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
//               <span className="text-muted-foreground">No image</span>
//             </div>
//           )}

//           {/* Badges */}
//           <div className="absolute top-2 right-2 flex gap-2">
//             {course.type === "featured" && (
//               <Badge className="bg-primary text-primary-foreground">
//                 Featured
//               </Badge>
//             )}
//             {course.type === "bestseller" && (
//               <Badge className="bg-amber-100 text-amber-700 flex items-center gap-1">
//                 <TrendingUp className="w-3 h-3" />
//                 Bestseller
//               </Badge>
//             )}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-4 space-y-3">
//           <div>
//             <h3 className="font-semibold text-foreground line-clamp-2">
//               {course.title}
//             </h3>
//             <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
//               {course.subtitle || "Course"}
//             </p>
//           </div>

//           {/* Rating */}
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-3 h-3 ${
//                     i < Math.round(course.rating)
//                       ? "fill-amber-400 text-amber-400"
//                       : "text-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//             <span className="text-xs text-muted-foreground">
//               {course.rating.toFixed(1)} ({course.totalReviews})
//             </span>
//           </div>

//           {/* Pricing */}
//           <div className="flex items-center gap-2 pt-2 border-t border-border">
//             {course.discountPrice && course.discountPrice < course.price ? (
//               <>
//                 <span className="text-sm line-through text-muted-foreground">
//                   ${course.price.toFixed(2)}
//                 </span>
//                 <span className="text-lg font-bold text-red-600">
//                   ${course.discountPrice.toFixed(2)}
//                 </span>
//                 <Badge variant="destructive" className="ml-auto text-xs">
//                   {Math.round(
//                     ((course.price - course.discountPrice) / course.price) *
//                       100
//                   )}
//                   % OFF
//                 </Badge>
//               </>
//             ) : course.isFree ? (
//               <span className="text-lg font-bold text-emerald-600">Free</span>
//             ) : (
//               <span className="text-lg font-bold text-foreground">
//                 ${course.price.toFixed(2)}
//               </span>
//             )}
//           </div>

//           {/* Action */}
//           <Button asChild variant="outline" className="w-full text-xs">
//             <Link href={`/courses/${course._id}`}>View Course</Link>
//           </Button>
//         </div>
//       </Card>
//     ))}
//   </div>
