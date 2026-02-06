"use client";

import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/store/hooks";
import { loginUser } from "@/lib/store/slices/authSlice";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { isLoading, error } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
      }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      // Direct users based on their role
      const role = result.payload.user.role;
      router.push(
        role === "instructor" ? "/instructor/dashboard" : "/dashboard",
      );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-black tracking-tight text-white">
          Sign In
        </h1>
        <p className="text-slate-400">
          Welcome back! Please enter your details.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="bg-white/[0.03] border-white/10 h-12 text-white placeholder:text-slate-600"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="bg-white/[0.03] border-white/10 h-12 pr-10 text-white placeholder:text-slate-600"
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
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-purple-400 hover:text-purple-300 transition-colors"
        >
          Sign up for free
        </Link>
      </p>
    </div>
  );
}
