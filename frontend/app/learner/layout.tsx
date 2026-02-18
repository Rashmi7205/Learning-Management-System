"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/lib/store/slices/authSlice";
import { LayoutDashboard, BookOpen, TrendingUp, Settings, ShoppingCartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/learner/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "Courses",
    href: "/learner/courses",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    label: "Progress",
    href: "/learner/progress",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: "Explore Course",
    href: "/courses",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: <ShoppingCartIcon className="w-5 h-5" />,
  },
  {
    label: "Settings",
    href: "/learner/profile",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = useDispatch();

  // Handle responsive sidebar behavior
  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const handleLogout = async () => {
    // @ts-ignore - handling async thunk dispatch
    await dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#020617] font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* KNOWLEDGE LAB BACKGROUND ELEMENTS
          Subtle gradients and noise texture to ground the UI
      */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2845D6]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#06D001]/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />
      </div>

      {/* SIDEBAR - Passes through the brand colors and Knowledge Lab title */}
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        links={sidebarLinks}
        title="COURSE LOOP"
        onLogout={handleLogout}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* NAVBAR - Glassmorphism effect */}
        <Navbar
          onToggleSidebar={handleToggleSidebar}
        />

        {/* PAGE CONTENT - Scrollable with custom styling */}
        <main
          className={cn(
            "flex-1 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out relative z-10",
            "p-4 md:p-8 lg:p-10",
            "scrollbar-thin scrollbar-thumb-slate-200 dark:scroll-bar-thumb-slate-800",
          )}
        >
          {/* Staggered Content Animation Wrapper */}
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-45 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
