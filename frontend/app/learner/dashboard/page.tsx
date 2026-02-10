"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "@/lib/store/slices/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { CheckCircle, AlertCircle, Edit3 } from "lucide-react";
import { ProfileOverview } from "@/components/dashboard/ProfileOverview";
import { ProfileForm } from "@/components/dashboard/ProfileForm";

interface updateProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  gender: string;
  dob:  Date |string;
  country: string;
}

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [formData, setFormData] = useState<updateProfileData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    gender: user?.gender || "",
    dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
    country: user?.country || "",
  });

  useEffect(() => {
    if (!isAuthenticated && !isLoading) router.push("/login");
  }, [isAuthenticated, isLoading, router]);

  if (isLoading && !user) return <div className="h-screen flex items-center justify-center"><Loader /></div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(updateUserProfile(formData));
      if (result.payload) {
        setMessage({ type: 'success', text: "Profile updated successfully!" });
        setIsEditing(false);
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || "Failed to update" });
    }
  };

  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-transparent py-12">
      <div className="max-w-4xl mx-auto px-6">
        <header className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your public profile and account details</p>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} className="rounded-full shadow-lg">
              <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          )}
        </header>

        {message && (
          <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 animate-in slide-in-from-top-2 ${
            message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        <ProfileOverview user={user} initials={initials} />

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>{isEditing ? "Modify Personal Details" : "Bio & Description"}</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <ProfileForm
                formData={formData}
                isLoading={isLoading}
                onInputChange={handleInputChange}
                onSelectChange={(n:any, v:any) => setFormData(p => ({...p, [n]: v}))}
                onSubmit={handleSubmit}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                {user?.bio || "No biography provided yet. Tell the world about yourself!"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}