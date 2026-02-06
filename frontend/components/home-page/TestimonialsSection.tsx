"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section className="relative py-24 bg-[#020617] text-white overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Star className="w-3 h-3 fill-current" />
              Testimonials
            </div>
            <h2 className="font-display text-4xl lg:text-6xl font-black mb-6 tracking-tight">
              Success{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
            <p className="text-lg text-slate-400">
              Join thousands of learners who have already leveled up their
              careers.
            </p>
          </div>

          {/* Custom Nav */}
          <div className="hidden md:flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
              >
                <div className="group relative h-full p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.06] hover:border-blue-500/50 transition-all duration-500">
                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 text-white/5 group-hover:text-blue-500/10 transition-colors">
                    <Quote className="w-12 h-12 rotate-180" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-blue-500 text-blue-500"
                      />
                    ))}
                  </div>

                  {/* Quote Content */}
                  <p className="text-slate-300 mb-8 leading-relaxed italic text-lg">
                    "{testimonial.quote}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white leading-tight">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-blue-400 font-medium uppercase tracking-wider">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: testimonials.length - itemsPerView + 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentIndex === index
                    ? "bg-blue-500 w-10"
                    : "bg-white/10 w-4 hover:bg-white/20"
                }`}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
