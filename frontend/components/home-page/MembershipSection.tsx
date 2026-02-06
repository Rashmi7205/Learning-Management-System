"use client";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight, Zap } from "lucide-react";
import Image from "next/image";

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
    <section className="py-24 relative overflow-hidden bg-[#020617]">
      {/* Background decoration - Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative p-8 md:p-16 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden">
            {/* Animated Accent Line at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">
                    Limited Time Membership
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Ready to <span className="text-blue-500">Transform</span> Your
                  Career?
                </h2>
                <p className="text-lg text-slate-400 mb-8">
                  Get everything you need to go from beginner to pro. One
                  subscription, infinite possibilities.
                </p>

                {/* Benefits List */}
                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-blue-400" />
                      </div>
                      <span className="text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Box / CTA */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full" />
                <div className="relative p-8 rounded-[2.5rem] text-center">
                  <div className="flex items-center justify-center my-10">
                    <Image
                      src="/images/banner-thumbnail.png"
                      alt="banner"
                      width={300}
                      height={300}
                    />
                  </div>

                  <Button className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-lg font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95 group">
                    Get Started Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-slate-500 text-xs mt-6 flex items-center justify-center gap-2">
                    <Zap className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    Cancel anytime. No hidden fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
