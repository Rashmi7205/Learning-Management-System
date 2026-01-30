"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import testimonial1 from "@/public/assets/ist.png";
import testimonial2 from "@/public/assets/ist.png";
import testimonial3 from "@/public/assets/ist.png";
import testimonial4 from "@/public/assets/ist.png";
import testimonial5 from "@/public/assets/ist.png";
import testimonial6 from "@/public/assets/ist.png";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Data Scientist at Netflix",
    image: testimonial1,
    quote:
      "This platform completely transformed my career. The hands-on projects and expert guidance helped me land my dream job.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mei Lin",
    role: "ML Engineer at Spotify",
    image: testimonial2,
    quote:
      "The courses are incredibly comprehensive. I went from beginner to building production models in just 6 months.",
    rating: 5,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Senior Data Analyst",
    image: testimonial3,
    quote:
      "Best investment I've made in my career. The community support and course quality are unmatched.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sofia Garcia",
    role: "AI Researcher",
    image: testimonial4,
    quote:
      "As a researcher, I appreciate the depth and rigor of the content. Perfect for all skill levels.",
    rating: 5,
  },
  {
    id: 5,
    name: "Raj Patel",
    role: "Tech Lead at Uber",
    image: testimonial5,
    quote:
      "The MLOps courses helped me understand the full lifecycle of ML systems. Now I lead a team of engineers.",
    rating: 5,
  },
  {
    id: 6,
    name: "Emma Schmidt",
    role: "Product Manager",
    image: testimonial6,
    quote:
      "Even as a PM, understanding ML has been crucial. This platform made complex concepts accessible.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= testimonials.length - itemsPerView + 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - itemsPerView : prev - 1,
    );
  };

  return (
    <section className="py-20 section-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              What Our Students Say
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Hear from thousands of learners who have transformed their
              careers.
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-primary/20 hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-primary/20 hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Testimonials Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
              >
                <div className="bg-card rounded-2xl p-6 border border-border shadow-soft h-full">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-warning text-warning"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover border-4 border-primary/20"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: testimonials.length - itemsPerView + 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-primary w-8"
                    : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
