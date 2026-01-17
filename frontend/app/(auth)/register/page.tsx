"use client";

import { AuthUI } from "../layout";


export default function RegisterPage() {
  return (
    <AuthUI
      mode="signup"
      logoSrc="./images/logo.png"
      backLink={{
        text: "Back to website",
        href: "/",
      }}
      imageSrc="/images/auth-bg.jpg"
      quoteText="Create an account. A new chapter of learning awaits."
    />
  );
}
