"use client";

import { Input } from "@/components/ui/input";

interface PricingStepProps {
  courseData: any;
  setCourseData: any;
}

export default function PricingStep({
  courseData,
  setCourseData,
}: PricingStepProps) {
  const handleChange = (field: string, value: any) => {
    setCourseData((prev: any) => ({ ...prev, [field]: value }));
  };

  const platformFee = courseData.isFree ? 0 : courseData.discountPrice * 0.15;
  const instructorEarnings = courseData.isFree
    ? 0
    : courseData.discountPrice - platformFee;
  const estimatedMonthly = instructorEarnings * 50;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Pricing & Marketing
        </h2>
        <p className="text-muted-foreground">
          Set your pricing model and marketing flags
        </p>
      </div>

      {/* Pricing Model */}
      <div className="bg-secondary/50 border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Pricing Model
        </h3>
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-secondary/50">
            <input
              type="radio"
              name="pricing-model"
              checked={courseData.isFree}
              onChange={() => handleChange("isFree", true)}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-foreground">Free Course</p>
              <p className="text-sm text-muted-foreground">
                No payment required, accessible to all
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-secondary/50">
            <input
              type="radio"
              name="pricing-model"
              checked={!courseData.isFree}
              onChange={() => handleChange("isFree", false)}
              className="mt-1"
            />
            <div>
              <p className="font-medium text-foreground">Paid Course</p>
              <p className="text-sm text-muted-foreground">
                Charge students for enrollment
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Course Pricing */}
      {!courseData.isFree && (
        <div className="bg-secondary/50 border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Course Pricing
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Currency
              </label>
              <select
                value={courseData.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>INR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Regular Price *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-foreground">$</span>
                <Input
                  type="number"
                  value={courseData.price}
                  onChange={(e) =>
                    handleChange("price", parseFloat(e.target.value))
                  }
                  placeholder="49.99"
                  className="bg-input border-border flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Discount Price (Optional)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-foreground">$</span>
                <Input
                  type="number"
                  value={courseData.discountPrice}
                  onChange={(e) =>
                    handleChange("discountPrice", parseFloat(e.target.value))
                  }
                  placeholder="29.99"
                  className="bg-input border-border flex-1"
                />
              </div>
              {courseData.discountPrice < courseData.price && (
                <p className="text-sm text-accent mt-2">
                  You save: {courseData.currency}{" "}
                  {(courseData.price - courseData.discountPrice).toFixed(2)} (
                  {Math.round(
                    ((courseData.price - courseData.discountPrice) /
                      courseData.price) *
                      100,
                  )}
                  % off) 🎉
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Estimated Earnings */}
      {!courseData.isFree && (
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            💰 Estimated Earnings
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-medium text-foreground">
                {courseData.currency} {courseData.discountPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Platform Fee (15%):</span>
              <span className="font-medium text-foreground">
                -{courseData.currency} {platformFee.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-accent/30 my-2" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">You Earn:</span>
              <span className="font-medium text-accent">
                {courseData.currency} {instructorEarnings.toFixed(2)} per sale
              </span>
            </div>
            <div className="border-t border-accent/30 my-2" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Estimated Monthly (50 sales):
              </span>
              <span className="font-medium text-accent">
                {courseData.currency} {estimatedMonthly.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Marketing Flags - Admin Only */}
      <div className="bg-secondary/50 border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Marketing Flags (Admin Only)
        </h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={courseData.isFeatured}
              onChange={(e) => handleChange("isFeatured", e.target.checked)}
            />
            <span className="text-foreground">
              Featured Course (show on homepage)
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={courseData.bestseller}
              onChange={(e) => handleChange("bestseller", e.target.checked)}
            />
            <span className="text-foreground">Mark as Bestseller</span>
          </label>
        </div>
      </div>
    </div>
  );
}
