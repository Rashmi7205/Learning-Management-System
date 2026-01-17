"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme");

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const darkModeEnabled = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", darkModeEnabled);
    setIsDark(darkModeEnabled);

    // Sync if changed elsewhere
    const handler = (e: any) => {
      setIsDark(e.detail.theme === "dark");
    };

    window.addEventListener("themechange", handler);
    return () => window.removeEventListener("themechange", handler);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const newIsDark = !html.classList.contains("dark");

    html.classList.toggle("dark", newIsDark);
    setIsDark(newIsDark);

    localStorage.setItem("theme", newIsDark ? "dark" : "light");

    window.dispatchEvent(
      new CustomEvent("themechange", {
        detail: { theme: newIsDark ? "dark" : "light" },
      })
    );
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center justify-center rounded-lg border border-border bg-background p-2 hover:bg-accent transition-colors"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-foreground" />
      ) : (
        <Moon className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
}
