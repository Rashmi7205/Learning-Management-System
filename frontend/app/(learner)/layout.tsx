"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { LayoutDashboard, BookOpen, TrendingUp } from "lucide-react";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "Courses",
    href: "/courses",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    label: "Progress",
    href: "/progress",
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

export default function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = require("react-redux").useDispatch();
  const { logoutUser } = require("@/lib/store/slices/authSlice");

  const handleToggleSidebar = () => {
    // On mobile, toggle open/close
    // On desktop, toggle collapsed/expanded
    if (window.innerWidth < 768) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/(auth)/login");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={handleCloseSidebar}
        links={sidebarLinks}
        title="CourseLoop"
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar
          onToggleSidebar={handleToggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
          userName={
            user?.firstName ? `${user.firstName} ${user.lastName}` : "Learner"
          }
          userEmail={user?.email || "learner@example.com"}
          userAvatar={user?.avatar}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
