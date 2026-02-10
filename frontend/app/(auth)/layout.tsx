"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchUserProfile, loginUser, registerUser } from "@/lib/store/slices/authSlice";

// Typewriter Component
export function Typewriter({ text, speed = 60, cursor = "_" }: any) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentText = text || "";

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
  children,
  logoSrc,
  imageSrc,
  backLink,
  quoteText,
}: any) {
  const pathname = usePathname();
  const isSignIn = pathname.includes("login");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated, user } = useAppSelector(
    (state) => state.auth,
  );


  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(
        user.role === "instructor" ? "/instructor/dashboard" : "/learner/dashboard",
      );
    }else{
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 overflow-hidden">
      {/* Left Column - Visuals */}
      <div className="hidden lg:flex relative w-1/2 flex-col justify-between p-12 border-r border-white/5">
        {imageSrc && (
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        )}

        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] z-0" />

        <Link href="/" className="relative z-10 flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Image
            src="/images/logo.png"
            width={40}
            height={40}
            alt="CourseLoop"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            CourseLoop
          </span>
        </Link>

        <div className="relative z-10">
          <div className="space-y-4 max-w-md">
            <h2 className="text-4xl font-black text-white leading-[1.1] tracking-tighter">
              <Typewriter
                key={isSignIn ? "login" : "signup"}
                text={
                  quoteText ||
                  (isSignIn ? "Welcome back!" : "Join the community.")
                }
              />
            </h2>
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          © 2026 CourseLoop Inc.
        </div>
      </div>

      {/* Right Column - Form Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 relative">
        {backLink && (
          <Link
            href={backLink.href}
            className="absolute top-8 left-8 lg:left-auto lg:right-12 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            {backLink.text}
          </Link>
        )}

        <div className="w-full max-w-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
