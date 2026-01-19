"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

interface EmailVerificationBannerProps {
  emailVerified: boolean;
  email: string;
}

export function EmailVerificationBanner({
  emailVerified,
  email,
}: EmailVerificationBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (emailVerified || dismissed) {
    return null;
  }

  const handleResendVerification = async () => {
    try {
      // Call your resend verification endpoint
      // await api.post("/auth/resend-verification", { email });
      alert("Verification email sent! Please check your inbox.");
    } catch (error) {
      alert("Failed to resend verification email.");
    }
  };

  return (
    <Card className="p-4 bg-amber-50 border border-amber-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-900">
              Please verify your email
            </p>
            <p className="text-sm text-amber-700">
              We sent a verification link to{" "}
              <span className="font-medium">{email}</span>. Click the link to
              confirm your email address.
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <Button
            onClick={handleResendVerification}
            variant="outline"
            size="sm"
            className="text-amber-700 border-amber-200 hover:bg-amber-100"
          >
            Resend
          </Button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-amber-100 rounded transition-colors"
          >
            <X className="w-4 h-4 text-amber-600" />
          </button>
        </div>
      </div>
    </Card>
  );
}
