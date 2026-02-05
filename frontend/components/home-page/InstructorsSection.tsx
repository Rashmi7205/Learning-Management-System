"use client";
import { Star, Youtube, Twitter, Linkedin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect } from "react";
import { fetchFeaturedInstructors } from "@/lib/store/slices/instructorSlice";
import { FeaturedInstructor } from "@/lib/types";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const InstructorsSection = () => {
  const instructors: FeaturedInstructor[] = useAppSelector(
    (state) => state.instructor.featuredInstructors,
  );
  const dispatch = useAppDispatch();

useEffect(() => {
  if (!instructors.length) {
    dispatch(fetchFeaturedInstructors());
  }
}, [dispatch, instructors.length]);

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
            <Card
              key={instructor._id}
              className="group relative rounded-2xl border border-border bg-card shadow-soft transition-all hover:- translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-6 text-center">
                {/* Avatar */}
                <div className="relative mb-4 flex justify-center">
                  <Avatar className="h-24 w-24 border-4 border-primary/20 transition-colors group-hover:border-primary">
                    <AvatarImage
                      src={
                        instructor?.user?.avatar?.secureUrl ||
                        "/assets/default-avatar.png"
                      }
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {instructor?.user?.firstName?.[0]}
                      {instructor?.user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="absolute bottom-0 right-1/2 translate-x-10 translate-y-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-md">
                    <Star className="h-4 w-4 text-primary-foreground fill-primary-foreground" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="mb-1 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  {instructor?.user
                    ? `${instructor?.user?.firstName} ${instructor?.user?.lastName}`
                    : "Instructor"}
                </h3>

                {/* Title */}
                <p className="mb-4 text-sm text-muted-foreground">
                  {instructor.title || "Instructor"}
                </p>

                {/* Rating */}
                <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-semibold text-foreground">
                    {instructor.rating}
                  </span>
                  <span>({instructor.totalReviews} reviews)</span>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {instructor.website && (
                    <a
                      href={instructor.website}
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  )}
                  {instructor.linkedin && (
                    <a
                      href={instructor.linkedin}
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {instructor.twitter && (
                    <a
                      href={instructor.twitter}
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {instructor.youtube && (
                    <a
                      href={instructor.youtube}
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Youtube className="h-5 w-5" />
                    </a>
                  )}
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-primary/30 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
