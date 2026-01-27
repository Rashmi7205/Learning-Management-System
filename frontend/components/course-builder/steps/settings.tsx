"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, AlertCircle } from "lucide-react";

interface SettingsStepProps {
  courseData: any;
  setCourseData: any;
}

export default function SettingsStep({
  courseData,
  setCourseData,
}: SettingsStepProps) {
  const [enrollmentSettings, setEnrollmentSettings] = useState({
    maxStudents: "",
    enrollmentDeadline: "",
    requiresApproval: false,
  });

  const [gradingSettings, setGradingSettings] = useState({
    passingScore: 50,
    gradeFormat: "percentage",
    displayGrades: false,
  });

  const [publishSettings, setPublishSettings] = useState({
    visibility: "draft",
    allowDownloads: false,
  });

  const [isFormValid, setIsFormValid] = useState(false); // Declare isFormValid state

  const handleChange = (field: string, value: any) => {
    setCourseData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Settings & Publishing
        </h2>
        <p className="text-muted-foreground">
          Configure course status and publishing options
        </p>
      </div>

      {/* Course Status */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Course Status
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-sm font-medium text-foreground mb-3">
              Current Status:{" "}
              <span className="text-primary">
                {courseData.status === "draft"
                  ? "📝 Draft"
                  : courseData.status === "review"
                    ? "⏳ Under Review"
                    : "✅ Published"}
              </span>
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Continue editing</li>
              <li>• Submit for review</li>
              <li>• Publish (if approved)</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Publishing Options */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Publishing Options
        </h3>
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
            <input
              type="radio"
              name="publish-action"
              checked={courseData.status === "draft"}
              onChange={() => handleChange("status", "draft")}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-foreground">Save as Draft</p>
              <p className="text-sm text-muted-foreground">
                Keep editing, not visible to students
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
            <input
              type="radio"
              name="publish-action"
              checked={courseData.status === "review"}
              onChange={() => handleChange("status", "review")}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-foreground">Submit for Review</p>
              <p className="text-sm text-muted-foreground">
                Send to admin for approval
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-secondary transition-colors cursor-pointer">
            <input
              type="radio"
              name="publish-action"
              checked={courseData.status === "published"}
              onChange={() => handleChange("status", "published")}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-foreground">Publish Immediately</p>
              <p className="text-sm text-muted-foreground">
                Make live and visible in catalog
              </p>
            </div>
          </label>
        </div>
      </Card>

      {/* Archive Settings */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Archive Settings
        </h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={courseData.isArchived}
            onChange={(e) => handleChange("isArchived", e.target.checked)}
          />
          <span className="text-foreground">Archive this course</span>
        </label>
        <p className="text-sm text-muted-foreground mt-2">
          Removes from public catalog but keeps data
        </p>
      </Card>
    </div>
  );
}
