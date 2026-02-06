"use client";

import * as React from "react";
import { useState } from "react";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center lg:text-left animate-in fade-in zoom-in duration-500">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Check your email
          </h1>
          <p className="text-slate-400">
            We've sent a password reset link to your email address.
          </p>
        </div>
        <Button
          asChild
          className="w-full h-12 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl transition-all"
        >
          <Link href="/login">Return to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-black tracking-tight text-white">
          Reset Password
        </h1>
        <p className="text-slate-400">
          Enter your email and we'll send you a link to get back into your
          account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-200">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              className="bg-white/[0.03] border-white/10 h-12 pl-10 text-white placeholder:text-slate-600 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>Sending link...</span>
            </div>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>

      <div className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </div>
    </div>
  );
}
