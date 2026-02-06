import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What courses do you offer?",
    answer:
      "We offer a wide range of courses covering web development, data science, machine learning, digital marketing, UI/UX design, and more. Our courses are designed by industry experts and updated regularly to reflect the latest trends and technologies.",
  },
  {
    question: "High-Quality Video Lessons?",
    answer:
      "All our courses feature professionally produced HD video lessons. You can watch them anytime, anywhere, and as many times as you need. Our videos include closed captions and are optimized for all devices.",
  },
  {
    question: "Personalized Feedback and Support?",
    answer:
      "Yes! Our instructors provide personalized feedback on assignments and projects. Additionally, our 24/7 support team is always ready to help you with any questions or technical issues you might encounter.",
  },
  {
    question: "Access to Course Materials and Resources?",
    answer:
      "When you enroll in a course, you get lifetime access to all course materials including video lessons, downloadable resources, project files, and community forums. You can learn at your own pace without any time restrictions.",
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
      className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden"
      id="faq"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="lg:sticky lg:top-32">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-white">
              Transform Your Education With Our Accessible Online Courses
            </h2>
            <p className="text-muted-foreground mb-8">
              Find answers to commonly asked questions about our platform,
              courses, and learning experience.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">
                  ?
                </span>
              </div>
              <div>
                <p className="font-semibold text-slate-200">
                  Still have questions?
                </p>
                <a
                  href="#contact"
                  className="text-primary hover:underline font-medium"
                >
                  Contact our support team →
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white/20 rounded-2xl border border-border px-6 data-[state=open]:shadow-lg transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold text-white hover:text-primary py-5 hover:no-underline">
                    {index + 1}. {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slar-300 pb-5 leading-relaxed">
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
