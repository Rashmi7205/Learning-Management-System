"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  Mail,
  ExternalLink,
  MapPin,
  Clock,
  Star,
  Users,
  BookOpen,
  Award,
  Linkedin,
  Twitter,
  Youtube,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Instructor } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchInstructorProfile } from "@/lib/store/slices/instructorSlice";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState<Partial<Instructor>>({});
  const [instructorData, setInstructorData] = useState<Instructor>({
    _id: "",
    user: {
      avatar: {
        publicId: "#",
        secureUrl: "",
      },
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      phone: "",
      office: "",
    },
    title: "",
    expertise: [],
    yearsOfExperience: 8,
    education: "",
    certifications: [],
    website: "",
    linkedin: "",
    twitter: "",
    youtube: "",
    rating: 0,
    totalReviews: 0,
    totalStudents: 0,
    totalCourses: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    totalEarnings: 0,
    pendingPayout: 0,
    identityVerified: false,
    isFeatured: false,
    isSuspended: false,
  });

  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector(
    (state) => state.instructor,
  );

  useEffect(() => {
    dispatch(fetchInstructorProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setInstructorData(profile);
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      //  API to update profile
      // const updated = await updateInstructorProfile(instructorData._id, editData)
      // if (updated) setInstructorData(updated)

      setIsEditing(false);
      setEditData({});
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    instructorData && (
      <div className="p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Header */}
        <Card className="bg-card border-border">
          <div className="p-6 flex items-start justify-between">
            <div className="flex items-start gap-6">
              <img
                src={instructorData?.user?.avatar?.secureUrl || "/placeholder.svg"}
                alt={`${instructorData?.user?.firstName} ${instructorData?.user?.lastName}`}
                className="w-24 h-24 rounded-lg border-2 border-primary"
              />
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {instructorData?.user?.firstName} {instructorData?.user?.lastName}
                </h2>
                <p className="text-muted-foreground">{instructorData.title}</p>

                {/* Rating and Stats */}
                <div className="flex gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">
                      {instructorData.rating}
                    </span>
                    <span className="text-muted-foreground">
                      ({instructorData.totalReviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {instructorData.totalStudents} students
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {instructorData.totalCourses} courses
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Badge variant="outline">
                    {instructorData.yearsOfExperience}+ years experience
                  </Badge>
                  <Badge variant="secondary">
                    Joined{" "}
                    {new Date(instructorData.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-6">
          {/* Contact & Expertise */}
          <div className="space-y-6">
            {/* Social Links */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Connect
              </h3>
              <div className="space-y-3">
                {instructorData.website && (
                  <a
                    href={instructorData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">
                      Personal Website
                    </span>
                  </a>
                )}
                {instructorData.linkedin && (
                  <a
                    href={instructorData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">LinkedIn</span>
                  </a>
                )}
                {instructorData.twitter && (
                  <a
                    href={instructorData.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">Twitter</span>
                  </a>
                )}
                {instructorData.youtube && (
                  <a
                    href={instructorData.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <Youtube className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">YouTube</span>
                  </a>
                )}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Overview
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Active Courses
                  </p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    {instructorData.totalCourses}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {instructorData.totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Years Teaching
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {instructorData.yearsOfExperience}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Education & Expertise */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Education & Background
              </h3>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Education
                    </label>
                    <input
                      type="text"
                      defaultValue={instructorData.education}
                      onChange={(e) =>
                        setEditData({ ...editData, education: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      defaultValue={instructorData.yearsOfExperience}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          yearsOfExperience: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Education</p>
                    <p className="text-sm text-foreground font-medium">
                      {instructorData.education}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Years of Experience
                    </p>
                    <p className="text-sm text-foreground font-medium">
                      {instructorData.yearsOfExperience}+ years
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {/* Expertise & Skills */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Expertise & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {instructorData.expertise.map((skill, idx) => (
                  <Badge
                    key={idx}
                    className="bg-primary text-primary-foreground"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Certifications */}
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certifications
              </h3>
              <div className="space-y-2">
                {instructorData.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-secondary rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                    <span className="text-sm text-foreground">{cert}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {isEditing && (
          <Card className="bg-card border-border">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                Edit Profile
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    defaultValue={instructorData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    defaultValue={instructorData.website}
                    onChange={(e) =>
                      setEditData({ ...editData, website: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    defaultValue={instructorData.linkedin}
                    onChange={(e) =>
                      setEditData({ ...editData, linkedin: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    defaultValue={instructorData.twitter}
                    onChange={(e) =>
                      setEditData({ ...editData, twitter: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  YouTube Channel
                </label>
                <input
                  type="url"
                  defaultValue={instructorData.youtube}
                  onChange={(e) =>
                    setEditData({ ...editData, youtube: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({});
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </Card>
        )}
        {/* Account Actions */}
        <Card className="bg-card border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Account</h3>
          </div>
          <div className="p-6 space-y-3">
            <Button variant="outline" className="w-full bg-transparent">
              Change Password
            </Button>
            <Button
              variant="outline"
              className="w-full text-destructive bg-transparent"
            >
              Sign Out All Devices
            </Button>
          </div>
        </Card>
      </div>
    )
  );
}
