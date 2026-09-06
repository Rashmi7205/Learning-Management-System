"use client";

import * as React from "react";
import { useState } from "react";
import { Loader2, Lock, Eye, EyeOff, CheckCircle2, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/lib/services/api";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setError(null);

   // 1. Frontend match validation
   if (formData.password !== formData.confirmPassword) {
     setError("Passwords do not match");
     return;
   }

   setIsLoading(true);

   try {
    console.log(token)
     const result = await authService.resetPassword(
       token as string,
       formData.password,
     );
     setIsSuccess(true);
     setTimeout(() => {
       router.push("/login");
     }, 3000);
   } catch (err: any) {
     const errorMessage =
       err.response?.data?.message ||
       err.message ||
       "Token is invalid or expired";
     setError(errorMessage);
   } finally {
     setIsLoading(false);
   }
 };
  if (isSuccess) {
    return (
      <div className="space-y-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center">
          <div className="bg-emerald-500/10 p-4 rounded-full">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white">Password Updated</h1>
          <p className="text-slate-400">
            Your credentials have been synced. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-purple-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Protocol</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white">
          Create New Password
        </h1>
        <p className="text-slate-400">
          Set a strong, secure password to regain access to your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-slate-200 ml-1">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <Input
              type={showPassword ? "text" : "password"}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-white/[0.03] border-white/10 h-12 pl-10 pr-10 text-white focus:ring-purple-500 transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-slate-200 ml-1">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <Input
              type={showPassword ? "text" : "password"}
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="bg-white/[0.03] border-white/10 h-12 pl-10 text-white focus:ring-purple-500 transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !formData.password}
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>Updating...</span>
            </div>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </div>
  );
}