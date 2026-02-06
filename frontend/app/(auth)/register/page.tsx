"use client";

import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/store/hooks";
import { registerUser } from "@/lib/store/slices/authSlice";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { isLoading, error } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      return alert("Please accept the terms and conditions to continue.");
    }

    const result = await dispatch(
      registerUser({
        firstName: formData.fname,
        lastName: formData.lname,
        email: formData.email,
        password: formData.password,
      }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      // New users usually default to student dashboard
      router.push("/dashboard");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-black tracking-tight text-white">
          Create Account
        </h1>
        <p className="text-slate-400">
          Join the community and start learning today.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fname">First Name</Label>
            <Input
              id="fname"
              placeholder="John"
              className="bg-white/[0.03] border-white/10 h-12 text-white"
              onChange={(e) =>
                setFormData({ ...formData, fname: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lname">Last Name</Label>
            <Input
              id="lname"
              placeholder="Doe"
              className="bg-white/[0.03] border-white/10 h-12 text-white"
              onChange={(e) =>
                setFormData({ ...formData, lname: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="bg-white/[0.03] border-white/10 h-12 text-white"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="bg-white/[0.03] border-white/10 h-12 pr-10 text-white"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 accent-purple-600"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <Label
            htmlFor="terms"
            className="text-xs text-slate-400 leading-normal"
          >
            I agree to the{" "}
            <span className="text-purple-400">Terms of Service</span> and{" "}
            <span className="text-purple-400">Privacy Policy</span>.
          </Label>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/login")}
          className="font-bold text-purple-400 hover:text-purple-300 transition-colors"
        >
          Log in here
        </button>
      </p>
    </div>
  );
}
