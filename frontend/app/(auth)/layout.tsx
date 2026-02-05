"use client";

import * as React from "react";
import { useState, useId, useEffect } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Typewriter Component
export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

// Label Component
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

// Input Component
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm transition-colors",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary",
          "dark:border-input/50 dark:bg-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Password Input Component
export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, ...props }, ref) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    return (
      <div className="grid w-full items-center gap-2">
        {label && (
          <Label htmlFor={id} className="text-gray-300">
            {label}
          </Label>
        )}
        <div className="relative">
          <Input
            id={id}
            type={showPassword ? "text" : "password"}
            className={cn("pe-10 text-foreground bg-foreground", className)}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

// Loading Button Component
interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ isLoading, children, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || isLoading}
        className="w-full flex items-center justify-center gap-2"
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </Button>
    );
  }
);
LoadingButton.displayName = "LoadingButton";

// Sign In Form
function SignInForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = require("react-redux").useDispatch();
  const router = require("next/navigation").useRouter();
  const { isLoading, error } = require("@/lib/store/hooks").useAuth();
  const { loginUser } = require("@/lib/store/slices/authSlice");
  const {user,isAuthenticated} = require("@/lib/store/hooks").useAuth();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if(isAuthenticated && user){
        router.push("/dashboard");
        return;
      }
      const result = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(result)) {
        setEmail("");
        setPassword("");

        // Redirect based on role from backend
        const userRole = result.payload.user.role;
        let redirectPath = "/dashboard";

        if (userRole === "instructor") {
          redirectPath = "/instructor/dashboard";
        } else if (userRole === "admin") {
          redirectPath = "/admin/dashboard";
        } else if (userRole === "student") {
          redirectPath = "/dashboard";
        }

        setTimeout(() => {
          router.push(redirectPath);
          onSuccess?.();
        }, 500);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      autoComplete="on"
      className="flex flex-col gap-6 w-full"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">
          Sign in to your account
        </h1>
        <p className="text-sm text-gray-400">
          Enter your email below to sign in
        </p>
      </div>
      <div className="grid gap-4 w-full">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-gray-300">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className=" placeholder-gray-500"
          />
        </div>
        <PasswordInput
          name="password"
          label="Password"
          required
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className=" placeholder-gray-500"
        />
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}
        <LoadingButton type="submit" isLoading={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </LoadingButton>
      </div>
    </form>
  );
}

// Sign Up Form
function SignUpForm({ onSuccess }: { onSuccess?: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const dispatch = require("react-redux").useDispatch();
  const router = require("next/navigation").useRouter();
  const { isLoading, error } = require("@/lib/store/hooks").useAuth();
  const { registerUser } = require("@/lib/store/slices/authSlice");

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!termsAccepted) {
      alert("Please accept the Terms & Conditions");
      return;
    }

    try {
      const result = await dispatch(
        registerUser({
          firstName,
          lastName,
          email,
          password,
        })
      );

      if (registerUser.fulfilled.match(result)) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setTermsAccepted(false);

        // Redirect based on role from backend (new users default to "student")
        const userRole = result.payload.user.role;
        let redirectPath = "/(learner)/dashboard"; // Default for students

        if (userRole === "instructor") {
          redirectPath = "/instructor/dashboard";
        } else if (userRole === "admin") {
          redirectPath = "/admin/dashboard";
        } else if (userRole === "student") {
          redirectPath = "/(learner)/dashboard";
        }

        setTimeout(() => {
          router.push(redirectPath);
          onSuccess?.();
        }, 500);
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      autoComplete="on"
      className="flex flex-col gap-6 w-full"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Create an account</h1>
        <p className="text-sm text-gray-400">
          Enter your details below to sign up
        </p>
      </div>
      <div className="grid gap-4 w-full">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="fname" className="text-gray-300">
              First Name
            </Label>
            <Input
              id="fname"
              name="fname"
              type="text"
              placeholder="First"
              required
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lname" className="text-gray-300">
              Last Name
            </Label>
            <Input
              id="lname"
              name="lname"
              type="text"
              placeholder="Last"
              required
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email-signup" className="text-gray-300">
            Email
          </Label>
          <Input
            id="email-signup"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
          />
        </div>
        <PasswordInput
          name="password"
          label="Password"
          required
          autoComplete="new-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            disabled={isLoading}
            className="w-4 h-4 rounded bg-gray-800 border-gray-700 cursor-pointer"
          />
          <Label
            htmlFor="terms"
            className="text-sm text-gray-400 cursor-pointer"
          >
            I agree to the Terms & Conditions
          </Label>
        </div>
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}
        <LoadingButton type="submit" isLoading={isLoading}>
          {isLoading ? "Creating Account..." : "Create account"}
        </LoadingButton>
      </div>
    </form>
  );
}

// Auth Form Container
function AuthFormContainer({
  isSignIn,
  onToggle,
  onSuccess,
}: {
  isSignIn: boolean;
  onToggle: () => void;
  onSuccess?: () => void;
}) {
  return (
    <div className="w-full space-y-6">
      {isSignIn ? (
        <SignInForm onSuccess={onSuccess} />
      ) : (
        <SignUpForm onSuccess={onSuccess} />
      )}

      <p className="text-center text-sm text-gray-400">
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <button
          className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
          onClick={onToggle}
        >
          {isSignIn ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}

// Auth UI Component
export interface AuthContentProps {
  image?: {
    src: string;
    alt: string;
  };
  quote?: {
    text: string;
    author: string;
  };
}

export function AuthUI({
  mode = "signin",
  logoSrc,
  backLink,
  imageSrc,
  quoteText,
}: {
  mode?: "signin" | "signup";
  logoSrc?: string;
  backLink?: { text: string; href: string };
  imageSrc?: string;
  quoteText?: string;
}) {
  const [isSignIn, setIsSignIn] = useState(mode === "signin");
  const toggleForm = () => setIsSignIn((prev) => !prev);

  const handleAuthSuccess = () => {
    // Redirect handled in form components
  };

  const defaultImage =
    imageSrc ||
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80";
  const defaultQuote =
    quoteText ||
    (isSignIn
      ? "Welcome Back! The journey continues."
      : "Create an account. A new chapter awaits.");

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
        }
      `}</style>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 min-h-screen gap-0">
        {/* Left Side - Image */}
        <div
          className="relative bg-cover bg-center bg-gray-800 overflow-hidden"
          style={{ backgroundImage: `url(${defaultImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center p-8">
            <blockquote className="space-y-4 text-center text-white max-w-sm">
              <p className="text-2xl font-semibold leading-relaxed">
                <Typewriter key={defaultQuote} text={defaultQuote} speed={60} />
              </p>
            </blockquote>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col items-center justify-center p-8 relative">
          {backLink && (
            <div className="absolute top-6 right-6">
              <a
                href={backLink.href}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-700/50 hover:bg-gray-700 text-gray-200 hover:text-white text-sm font-medium transition-colors"
              >
                {backLink.text}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          )}

          {logoSrc && (
            <div className="mb-8 flex-row w-full flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                height={50}
                width={120}
              />
              <h1 className="text-white text-xl font-bold mt-2">CourseLoop</h1>
            </div>
          )}

          <AuthFormContainer
            isSignIn={isSignIn}
            onToggle={toggleForm}
            onSuccess={handleAuthSuccess}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        {backLink && (
          <div className="flex justify-start p-4 pt-6">
            <a
              href={backLink.href}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors text-sm font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {backLink.text}
            </a>
          </div>
        )}

        {logoSrc && (
          <div className="flex justify-center py-6">
            <Image
              src="/images/logo.png"
              alt="Logo"
              height={50}
              width={120}
            />
          </div>
        )}

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-sm">
            <AuthFormContainer
              isSignIn={isSignIn}
              onToggle={toggleForm}
              onSuccess={handleAuthSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
