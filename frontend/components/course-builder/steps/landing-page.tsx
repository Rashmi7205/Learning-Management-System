"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface LandingPageStepProps {
  courseData: any;
  setCourseData: any;
}

export default function LandingPageStep({
  courseData,
  setCourseData,
}: LandingPageStepProps) {
  const handleChange = (field: string, value: any) => {
    setCourseData((prev: any) => ({ ...prev, [field]: value }));
  };

  const addLearningOutcome = () => {
    const newOutcomes = [...courseData.whatYouWillLearn, ""];
    handleChange("whatYouWillLearn", newOutcomes);
  };

  const updateLearningOutcome = (index: number, value: string) => {
    const newOutcomes = [...courseData.whatYouWillLearn];
    newOutcomes[index] = value;
    handleChange("whatYouWillLearn", newOutcomes);
  };

  const removeLearningOutcome = (index: number) => {
    const newOutcomes = courseData.whatYouWillLearn.filter(
      (_: string, i: number) => i !== index,
    );
    handleChange("whatYouWillLearn", newOutcomes);
  };

  const addRequirement = () => {
    const newRequirements = [...courseData.requirements, ""];
    handleChange("requirements", newRequirements);
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...courseData.requirements];
    newRequirements[index] = value;
    handleChange("requirements", newRequirements);
  };

  const removeRequirement = (index: number) => {
    const newRequirements = courseData.requirements.filter(
      (_: string, i: number) => i !== index,
    );
    handleChange("requirements", newRequirements);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Landing Page
        </h2>
        <p className="text-muted-foreground">
          Define what students will learn and their requirements
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left: Edit Mode */}
        <div className="space-y-8">
          {/* What You'll Learn */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-4">
              What You'll Learn *
            </label>
            <div className="space-y-3">
              {courseData.whatYouWillLearn?.map(
                (outcome: string, index: number) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="text-muted-foreground mt-2">•</span>
                    <div className="flex-1">
                      <Input
                        value={outcome}
                        onChange={(e) =>
                          updateLearningOutcome(index, e.target.value)
                        }
                        placeholder="e.g., Build React apps from scratch"
                        maxLength={200}
                        className="bg-input border-border"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {outcome.length}/200
                      </p>
                    </div>
                    <button
                      onClick={() => removeLearningOutcome(index)}
                      className="text-destructive hover:text-destructive/80 mt-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ),
              )}
            </div>
            <Button
              onClick={addLearningOutcome}
              variant="outline"
              className="mt-3 gap-2 bg-transparent"
            >
              <Plus className="w-4 h-4" />
              Add Learning Outcome
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Minimum 4 learning outcomes required
            </p>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-4">
              Requirements
            </label>
            <div className="space-y-3">
              {courseData.requirements?.map(
                (requirement: string, index: number) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="text-muted-foreground mt-2">•</span>
                    <div className="flex-1">
                      <Input
                        value={requirement}
                        onChange={(e) =>
                          updateRequirement(index, e.target.value)
                        }
                        placeholder="e.g., Basic HTML knowledge"
                        maxLength={200}
                        className="bg-input border-border"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {requirement.length}/200
                      </p>
                    </div>
                    <button
                      onClick={() => removeRequirement(index)}
                      className="text-destructive hover:text-destructive/80 mt-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ),
              )}
            </div>
            <Button
              onClick={addRequirement}
              variant="outline"
              className="mt-3 gap-2 bg-transparent"
            >
              <Plus className="w-4 h-4" />
              Add Requirement
            </Button>
          </div>

          {/* Preview Lectures */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-4">
              Preview Lectures
            </label>
            <p className="text-sm text-muted-foreground mb-3">
              Select free preview lectures from your curriculum
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="preview-1" className="rounded" />
                <label htmlFor="preview-1" className="text-sm text-foreground">
                  Section 1, Lecture 1
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="preview-2" className="rounded" />
                <label htmlFor="preview-2" className="text-sm text-foreground">
                  Section 1, Lecture 2
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="bg-secondary/50 border border-border rounded-lg p-6 sticky top-20 h-fit">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Live Preview
          </h3>

          {/* Preview: Learning Outcomes */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">
              What You'll Learn
            </h4>
            <ul className="space-y-2">
              {courseData.whatYouWillLearn
                ?.filter((item: string) => item)
                .map((item: string, index: number) => (
                  <li
                    key={index}
                    className="text-sm text-foreground flex gap-2"
                  >
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Preview: Requirements */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">
              Requirements
            </h4>
            <ul className="space-y-2">
              {courseData.requirements
                ?.filter((item: string) => item)
                .map((item: string, index: number) => (
                  <li
                    key={index}
                    className="text-sm text-foreground flex gap-2"
                  >
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="text-xs text-muted-foreground space-y-2 border-t border-border pt-4">
            <p>
              Learning Outcomes:{" "}
              {courseData.whatYouWillLearn?.filter((item: string) => item)
                .length || 0}
            </p>
            <p>
              Requirements:{" "}
              {courseData.requirements?.filter((item: string) => item).length ||
                0}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <p className="text-sm text-blue-400">
          💡 Tip: Add 4-6 learning outcomes for best results
        </p>
      </div>
    </div>
  );
}
