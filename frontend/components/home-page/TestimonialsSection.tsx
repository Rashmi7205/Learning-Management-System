"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Card Components (matching Course Loop design)
const Card = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`rounded-xl bg-white border border-slate-200 ${className}`} {...props}>
    {children}
  </div>
);

// Avatar Components
const Avatar = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props} />
);

const AvatarImage = ({ className = '', ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img className={`aspect-square h-full w-full object-cover ${className}`} {...props} />
);

const AvatarFallback = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-slate-200 ${className}`} {...props} />
);

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Software Engineer",
    image: "/assets/ist.png",
    quote:
      "Course Loop transformed my career. The web development bootcamp gave me the skills to land my dream job in just 6 months.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "UX Designer",
    image: "/assets/ist.png",
    quote:
      "The quality of instruction is outstanding. Every course I've taken has been practical, engaging, and worth every penny.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chang",
    role: "Marketing Director",
    image: "/assets/ist.png",
    quote:
      "I've tried many e-learning platforms, but Course Loop stands out. The instructors are genuinely invested in student success.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sofia Garcia",
    role: "Data Analyst",
    image: "/assets/ist.png",
    quote:
      "As a researcher, I appreciate the depth and rigor of the content. The courses are perfect for all skill levels.",
    rating: 5,
  },
  {
    id: 5,
    name: "Raj Patel",
    role: "Product Manager",
    image: "/assets/ist.png",
    quote:
      "The business courses helped me understand the full lifecycle of product development. Now I lead a successful team.",
    rating: 5,
  },
  {
    id: 6,
    name: "Emma Schmidt",
    role: "Entrepreneur",
    image: "/assets/ist.png",
    quote:
      "Even as a business owner, continuous learning is crucial. Course Loop made complex concepts accessible and actionable.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemsPerView = 3;

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  // Get visible testimonials based on screen size
  const getVisibleTestimonials = () => {
    // For mobile, show all in grid
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return testimonials.slice(0, 3);
    }
    return testimonials;
  };

  return (
    <section className="py-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-200 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-slate-100 max-w-xl">
              Hear from students who transformed their careers through Course
              Loop
            </p>
          </div>

          {/* Navigation Buttons - Hidden on mobile, shown on desktop */}
          <div className="hidden md:flex gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-[#2845D6] text-[#2845D6] hover:bg-[#2845D6] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-[#2845D6] text-[#2845D6] hover:bg-[#2845D6] hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Desktop: Carousel */}
        <div className="hidden md:block overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-[#2845D6] h-full">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#06D001] text-[#06D001]"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-slate-700 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-[#2845D6]/10 text-[#2845D6] font-semibold">
                        {testimonial.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: testimonials.length - itemsPerView + 1 }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "bg-[#2845D6] w-8"
                      : "bg-slate-300 hover:bg-slate-400 w-2"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ),
            )}
          </div>
        </div>

        {/* Mobile: Static Grid */}
        <div className="md:hidden grid gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-[#2845D6] animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#06D001] text-[#06D001]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback className="bg-[#2845D6]/10 text-[#2845D6] font-semibold">
                    {testimonial.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;