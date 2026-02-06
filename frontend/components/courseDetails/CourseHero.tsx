import { Star, Calendar, Globe, FileText, Award, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";

interface CourseHeroProps {
  category: string;
  subcategory: string;
  title: string;
  subtitle: string;
  rating: number;
  totalRatings: number;
  totalStudents: number;
  lastUpdated: string;
  instructor: {
    name: string;
    image: string;
  };
  language: string;
  subtitles: string[];
  badges: string[];
}

const CourseHero = ({
  category,
  subcategory,
  title,
  subtitle,
  rating,
  totalRatings,
  totalStudents,
  lastUpdated,
  instructor,
  language,
  subtitles,
  badges,
}: CourseHeroProps) => {
  return (
    <section className="relative bg-foreground text-white py-12 md:py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/98 via-foreground/95 to-foreground/90" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList className="text-white/60">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/40" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-white transition-colors">Courses</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/40" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-white transition-colors">{category}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/40" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white/80">{subcategory}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-3xl">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {badges.includes("Bestseller") && (
              <Badge className="bg-accent text-accent-foreground border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                Bestseller
              </Badge>
            )}
            {badges.includes("Highest Rated") && (
              <Badge className="bg-primary text-primary-foreground border-0">
                <Award className="w-3 h-3 mr-1" />
                Highest Rated
              </Badge>
            )}
            {badges.includes("New") && (
              <Badge className="bg-green text-white border-0">
                New
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-white/70 mb-6 leading-relaxed">
            {subtitle}
          </p>

          {/* Rating & Stats */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-accent font-bold">{rating.toFixed(1)}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-accent text-accent' : 'text-white/30'}`}
                  />
                ))}
              </div>
              <span className="text-white/60">({totalRatings.toLocaleString()} ratings)</span>
            </div>
            <span className="text-white/40">•</span>
            <span className="text-white/70">{totalStudents.toLocaleString()} students</span>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-white/60">Created by:</span>
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-8 h-8 rounded-full border-2 border-white/30 group-hover:border-primary transition-colors"
              />
              <span className="text-primary hover:text-primary-foreground transition-colors font-medium">
                {instructor.name}
              </span>
            </Link>
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              Follow +
            </Button>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Last updated {lastUpdated}</span>
            </div>
            <span className="text-white/40">|</span>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>{language}</span>
            </div>
            <span className="text-white/40">|</span>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Subtitles: {subtitles.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
