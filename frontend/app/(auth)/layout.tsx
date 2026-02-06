"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/store/hooks";
import { loginUser, registerUser } from "@/lib/store/slices/authSlice";

// Types for the props
interface AuthUIProps {
  mode?: "signin" | "signup";
  logoSrc?: string;
  backLink?: {
    text: string;
    href: string;
  };
  imageSrc?: string;
  quoteText?: string;
}

export function Typewriter({ text, speed = 60, cursor = "_" }: any) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentText = Array.isArray(text) ? text[0] : text || "";

  useEffect(() => {
    if (currentIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentText, speed]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-purple-500 font-bold">{cursor}</span>
    </span>
  );
}

export default function AuthUI({
  mode = "signin",
  logoSrc,
  backLink,
  imageSrc,
  quoteText,
}: AuthUIProps) {
  const [isSignIn, setIsSignIn] = useState(mode === "signin");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", fname: "", lname: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { isLoading, error, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, user, router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    let result;

    if (isSignIn) {
      result = await dispatch(loginUser({ email: formData.email, password: formData.password }));
    } else {
      if (!termsAccepted) return alert("Please accept terms");
      result = await dispatch(registerUser({
        firstName: formData.fname,
        lastName: formData.lname,
        email: formData.email,
        password: formData.password
      }));
    }

    if (result.meta.requestStatus === "fulfilled") {
      const role = result.payload.user.role;
      router.push(role === "instructor" ? "/instructor/dashboard" : "/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 overflow-hidden">
      {/* Left Column */}
      <div className="hidden lg:flex relative w-1/2 flex-col justify-between p-12 border-r border-white/5">
        {/* Dynamic Background Image */}
        {imageSrc && (
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        )}

        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] z-0" />

        <Link href="/" className="relative z-10 flex items-center gap-2 group">
          {logoSrc ? (
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-lg" />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="font-black text-white">CL</span>
            </div>
          )}
          <span className="text-xl font-bold tracking-tight text-white">CourseLoop</span>
        </Link>

        <div className="relative z-10">
          <div className="space-y-4 max-w-md">
            <h2 className="text-4xl font-black text-white leading-[1.1] tracking-tighter">
              <Typewriter
                key={isSignIn ? "in" : "up"}
                text={quoteText || (isSignIn ? "Welcome back to the future of learning." : "Start your journey into mastery today.")}
              />
            </h2>
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-500">© 2026 CourseLoop Inc.</div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        {/* Back Link Component */}
        {backLink && (
          <Link
            href={backLink.href}
            className="absolute top-8 left-8 lg:left-auto lg:right-12 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            {backLink.text}
          </Link>
        )}

        <div className="w-full max-w-[400px] space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-black tracking-tight text-white">
              {isSignIn ? "Sign In" : "Create Account"}
            </h1>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {/* ... Form Inputs remain same as your provided code ... */}
            {!isSignIn && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input
                    placeholder="John"
                    className="bg-white/[0.03] border-white/10 h-12"
                    onChange={(e) => setFormData({...formData, fname: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Doe"
                    className="bg-white/[0.03] border-white/10 h-12"
                    onChange={(e) => setFormData({...formData, lname: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                className="bg-white/[0.03] border-white/10 h-12"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="bg-white/[0.03] border-white/10 h-12 pr-10"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <div className="text-red-400 text-xs">{error}</div>}

            <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg">
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : (isSignIn ? "Sign In" : "Create Account")}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsSignIn(!isSignIn)} className="ml-1 font-bold text-purple-400">
              {isSignIn ? "Sign up for free" : "Log in here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}