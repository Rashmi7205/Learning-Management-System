"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/hooks";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { fetchUserProfile } from "@/lib/store/slices/authSlice";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export function Navbar({
  onToggleSidebar,
  isSidebarCollapsed,
  userName: propUserName,
  userEmail: propUserEmail,
  userAvatar: propUserAvatar,
}: NavbarProps) {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const dispatch = require("react-redux").useDispatch();
  const {
    logoutUser,
  } = require("@/lib/store/slices/authSlice");
  const { user } = useAuth();

  // Use Redux user data first, fallback to props
  const userName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : propUserName || "User";
  const userEmail = user?.email || propUserEmail || "user@example.com";
  const userAvatar = user?.avatar?.secureUrl || propUserAvatar;

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <header className="border-b border-border bg-card shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 gap-4">
        {/* Left Section - Toggle & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-accent rounded-lg transition-colors text-foreground/70 hover:text-foreground"
            title="Toggle Sidebar"
          >
            <Menu size={24} />
          </button>
          <h1 className="hidden md:block text-lg font-semibold text-foreground">
            Learning Management System
          </h1>
        </div>

        {/* Right Section - Theme Toggle & Profile */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors group"
            >
              {/* Avatar */}
              <Avatar className="w-10 h-10 shadow-md group-hover:shadow-lg transition-shadow">
                <AvatarImage
                  src={
                    userAvatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`
                  }
                  alt={userName}
                />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>

              {/* User Info - Desktop */}
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {userName}
                </p>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </div>

              {/* Chevron */}
              <ChevronDown
                size={18}
                className={`text-muted-foreground transition-transform duration-200 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <>
                {/* Overlay to close dropdown */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileOpen(false)}
                />

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-popover rounded-lg shadow-lg border border-border z-20 overflow-hidden">
                  {/* Header */}
                  <div className="px-4 py-3 bg-accent border-b border-border">
                    <p className="text-sm font-semibold text-foreground">
                      {userName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {userEmail}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                  href="/profile"
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
                      <User size={18} />
                      <span>View Profile</span>
                    </Link>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors">
                      <Settings size={18} />
                      <span>Settings</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border" />

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors font-medium"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
