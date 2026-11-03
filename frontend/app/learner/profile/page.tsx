"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "@/lib/store/slices/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { CheckCircle, AlertCircle, Edit3, X, Sparkles, KeyRound } from "lucide-react";
import { ProfileOverview } from "@/components/dashboard/ProfileOverview";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { UpdateProfileData } from "@/lib/types";

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Initialize form with user data
  const [formData, setFormData] = useState<UpdateProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    dob: "",
    country: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        gender: user.gender || "",
        dob: user.dob ? new Date(user.dob).toISOString() : "",
        country: user.country || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) router.push("/login");
  }, [isAuthenticated, isLoading, router]);

  if (isLoading && !user)
    return (
      <div className="h-screen flex items-center justify-center  text-white">
        <Loader />
      </div>
    );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Dedicated handler for Selects, Phone Input, and Date Picker
  const handleDirectValueChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(updateUserProfile(formData) as any);
      if (result.payload && result.payload.success) {
        setMessage({ type: "success", text: "Profile Updated!" });
        setIsEditing(false);
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: "error",
          text: result.payload.message || "Failed to update profile",
        });
        setIsEditing(false);
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Failed to update profile",
      });
    }
  };

  const initials =
    `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="min-h-screen text-slate-200 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Modern Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#2845D6]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Account Settings
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white italic">
              Profile
            </h1>
            <p className="text-slate-400 mt-1">
              Refine your digital presence within the Lab.
            </p>
          </div>

          {!isEditing ? (
            <div className="flex flex-wrap items-center gap-3">
              {/* Reset Password Button */}
              <Button
                onClick={() => router.push("/forgot-password")} // or open a modal
                variant="outline"
                className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-2xl px-6 h-12 font-bold transition-all"
              >
                <KeyRound className="w-4 h-4 mr-2 text-[#2845D6]" />
                Reset Password
              </Button>

              {/* Edit Profile Button */}
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-[#2845D6] hover:bg-[#1e36af] text-white rounded-2xl px-6 h-12 font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5 rounded-2xl px-6 h-12 font-bold"
            >
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
          )}
        </header>

        {message && (
          <div
            className={`p-4 rounded-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
              message.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-bold text-sm tracking-wide uppercase">
              {message.text}
            </span>
          </div>
        )}

        <ProfileOverview user={user} initials={initials} />

        <Card className="bg-white/5 border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-md">
          <CardHeader className="bg-white/[0.02] border-b border-white/5">
            <CardTitle className="text-xl font-bold text-white tracking-tight">
              {isEditing ? "Update Profile" : "Biography"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            {isEditing ? (
              <ProfileForm
                formData={formData}
                isLoading={isLoading}
                onInputChange={handleInputChange}
                onSelectChange={handleDirectValueChange}
                onSubmit={handleSubmit}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                <p className="text-slate-300 leading-relaxed italic text-lg font-medium opacity-80">
                  {user?.bio
                    ? `"${user.bio}"`
                    : "No biography provided yet. Tell the world about your learning journey!"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
