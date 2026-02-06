"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What courses do you offer?",
    answer:
      "We offer a wide range of courses covering web development, data science, machine learning, digital marketing, UI/UX design, and more. Our courses are designed by industry experts and updated regularly.",
  },
  {
    question: "High-Quality Video Lessons?",
    answer:
      "All our courses feature professionally produced HD video lessons. You can watch them anytime, anywhere, and as many times as you need. Our videos include closed captions and are optimized for all devices.",
  },
  {
    question: "Personalized Feedback and Support?",
    answer:
      "Yes! Our instructors provide personalized feedback on assignments and projects. Additionally, our 24/7 support team is always ready to help you with any questions or technical issues.",
  },
  {
    question: "Access to Course Materials and Resources?",
    answer:
      "When you enroll in a course, you get lifetime access to all course materials including video lessons, downloadable resources, project files, and community forums.",
  },
  {
    question: "Do you offer certificates upon completion?",
    answer:
      "Yes, upon successfully completing a course, you'll receive a verified certificate that you can share on LinkedIn and add to your resume. Our certificates are recognized by top employers worldwide.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee on all courses. If you're not satisfied with your purchase for any reason, simply contact our support team within 30 days for a full refund.",
  },
];

const FAQSection = () => {
  return (
    <section
      className="py-24 bg-[#020617] text-white relative overflow-hidden"
      id="faq"
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Content - Sticky Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <HelpCircle className="w-3 h-3" />
              Support Center
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Everything You <span className="text-blue-500">Need to Know</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Find answers to commonly asked questions about our platform,
              billing, and the learning experience.
            </p>

            {/* Support Card */}
            <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-bold text-white mb-1">
                  Still have questions?
                </p>
                <a
                  href="#contact"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm font-semibold transition-colors"
                >
                  Contact Support <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Accordion */}
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="group bg-white/[0.02] border border-white/5 rounded-2xl px-6 transition-all duration-300 data-[state=open]:bg-white/[0.05] data-[state=open]:border-blue-500/30"
                >
                  <AccordionTrigger className="text-left font-bold text-lg text-slate-200 hover:text-white py-6 hover:no-underline transition-all">
                    <span className="flex items-center gap-4">
                      <span className="text-blue-500/50 group-data-[state=open]:text-blue-500 font-mono text-sm uppercase">
                        Q{index + 1}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 pb-6 text-base leading-relaxed pl-10">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
