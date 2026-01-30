import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const benefits = [
  "Unlimited access to all 200+ courses",
  "Industry-recognized certificates",
  "Exclusive community access",
  "Priority support from instructors",
  "New courses added monthly",
  "Downloadable resources",
];

const MembershipSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple to-purple-dark" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-orange-light" />
            <span className="text-white text-sm font-medium">
              Limited Time Offer
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Your Learning Journey Today
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of learners who are advancing their careers. Get
            unlimited access to all courses for one low monthly price.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-white/90"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-left">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Pricing Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-md mx-auto mb-8">
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-5xl font-bold text-white">$29</span>
              <span className="text-white/70">/month</span>
            </div>
            <p className="text-white/60 text-sm mb-6">
              Cancel anytime. 30-day money-back guarantee.
            </p>
            <Button size="lg" className="btn-orange w-full text-lg">
              Start Free Trial
            </Button>
            <p className="text-white/50 text-xs mt-4">
              No credit card required for trial
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
