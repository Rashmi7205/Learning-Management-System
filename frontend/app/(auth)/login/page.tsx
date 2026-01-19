"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthUI } from "../layout";
import { useAuth } from "@/lib/store/hooks";


export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated,user } = useAuth();


  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router,]);

  return (
    <AuthUI
      mode="signin"
      logoSrc="./images/logo.png"
      backLink={{
        text: "Back to website",
        href: "/",
      }}
      imageSrc="/images/auth-bg.jpg"
      quoteText="Welcome Back! Your learning journey continues."
    />
  );
}
