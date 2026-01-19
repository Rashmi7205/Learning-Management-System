"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "@/lib/store/slices/authSlice";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClassicLoader from "@/components/ui/loader";
import {
  AlertCircle,
  CheckCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
interface ProfileFormData {
  firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    gender:string;
    dob: string;
    country: string;
}
export default function ProfilePage() {
  const { user, isLoading,isAuthenticated } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    country: user?.country || "",
  });

  if (!isAuthenticated && !isLoading) {
    router.push("/login");
  }

  if (!user && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <ClassicLoader />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await dispatch(updateUserProfile(formData) as any);

      if (result.payload) {
        setSuccessMessage("Profile updated successfully!");
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error: any) {
      setErrorMessage(
        error.message || "Failed to update profile. Please try again."
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
      gender: user?.gender || "",
      dob: user?.dob || "",
      country: user?.country || "",
    });
    setIsEditing(false);
    setErrorMessage("");
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    const name = `${firstName || ""} ${lastName || ""}`.trim();
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account information
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle
              className="text-green-600 dark:text-green-400"
              size={20}
            />
            <span className="text-green-800 dark:text-green-200">
              {successMessage}
            </span>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="text-red-600 dark:text-red-400" size={20} />
            <span className="text-red-800 dark:text-red-200">
              {errorMessage}
            </span>
          </div>
        )}

        {/* Profile Overview Card */}
        <Card className="mb-6 border-2 border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Profile Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Avatar */}
              <div className="flex flex-col items-center md:col-span-1">
                <Avatar className="w-24 h-24 shadow-lg mb-3">
                  <AvatarImage
                    src={
                      user?.avatar?.secureUrl ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.firstName} ${user?.lastName}`
                    }
                    alt={`${user?.firstName} ${user?.lastName}`}
                  />
                  <AvatarFallback className="bg-gradient-l-to-br from-primary to-primary/80 text-primary-foreground text-2xl font-bold">
                    {getInitials(user?.firstName, user?.lastName)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold text-foreground text-center">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-sm text-muted-foreground text-center">
                  {user?.role &&
                    user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>

              {/* Quick Info */}
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Mail className="text-primary" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium text-foreground break-all">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Phone className="text-primary" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground">
                      {user?.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <MapPin className="text-primary" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground">Country</p>
                    <p className="text-sm font-medium text-foreground">
                      {user?.country || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Users className="text-primary" size={18} />
                  <div>
                    <p className="text-xs text-muted-foreground">Gender</p>
                    <p className="text-sm font-medium text-foreground">
                      {user?.gender || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio Section */}
        {user?.bio && (
          <Card className="mb-6 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {user.bio}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Edit Profile Form */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-xl">Edit Profile Information</CardTitle>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-primary hover:bg-primary/90"
              >
                Edit Profile
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName as string}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="mt-1"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email cannot be changed here
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone as string}
                      onChange={handleInputChange}
                      placeholder="e.g., +1234567890"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Gender & Date of Birth */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender as string}
                      onValueChange={(value) =>
                        handleSelectChange("gender", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      value={formData.dob as string}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter your country"
                    className="mt-1"
                  />
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    className="mt-1 resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.bio.length}/500 characters
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">First Name</p>
                    <p className="text-base font-medium text-foreground mt-1">
                      {user?.firstName || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Name</p>
                    <p className="text-base font-medium text-foreground mt-1">
                      {user?.lastName || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-base font-medium text-foreground mt-1">
                      {user?.email || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-base font-medium text-foreground mt-1">
                      {user?.phone || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="text-base font-medium text-foreground mt-1">
                      {user?.gender || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Date of Birth
                    </p>
                    <p className="text-base font-medium text-foreground mt-1">
                      {new Date(user?.dob || "").toLocaleDateString() || "—"}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="text-base font-medium text-foreground mt-1">
                      {user?.country || "—"}
                    </p>
                  </div>
                  {user?.bio && (
                    <div className="sm:col-span-2">
                      <p className="text-sm text-muted-foreground">Bio</p>
                      <p className="text-base font-medium text-foreground mt-1">
                        {user.bio}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
