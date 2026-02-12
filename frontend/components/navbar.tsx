"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, User, Settings, ChevronDown, Bell, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAuth } from "@/lib/store/hooks";
import { logoutUser, fetchUserProfile } from "@/lib/store/slices/authSlice";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleLogout = async () => {
    // @ts-ignore
    await dispatch(logoutUser());
    router.push("/login");
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const initials =
    `${user?.firstName?.[0] || "U"}${user?.lastName?.[0] || ""}`.toUpperCase();

  return (
    <header className="sticky top-0 h-20 flex items-center justify-between px-8 bg-white/70 dark:bg-[#020617]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 z-40">
      <div className="flex items-center gap-6">
        <button
          onClick={onToggleSidebar}
          className="p-2.5 bg-slate-100 dark:bg-white/5 hover:bg-[#2845D6]/10 text-slate-600 dark:text-slate-400 hover:text-[#2845D6] rounded-xl transition-all"
        >
          <Menu size={20} />
        </button>
        <div className="hidden lg:block">
          <p className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Knowledge Lab
          </p>
          <h1 className="font-serif font-bold text-lg leading-none mt-1">
            Learner Center
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Activity Notification */}
        <button className="p-2.5 text-slate-400 hover:text-[#2845D6] transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#06D001] rounded-full border-2 border-white dark:border-[#020617]" />
        </button>

        <ThemeToggle />

        <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2" />

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 bg-slate-100/50 dark:bg-white/5 border border-transparent hover:border-[#2845D6]/20 rounded-2xl transition-all group"
          >
            <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-800 shadow-sm transition-transform group-hover:scale-95">
              <AvatarImage src={user?.avatar?.secureUrl} />
              <AvatarFallback className="bg-[#2845D6] text-white text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="hidden sm:block text-left mr-2">
              <p className="text-sm font-bold leading-none">
                {user?.firstName || "Learner"}
              </p>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter mt-1">
                Premium Plan
              </p>
            </div>
            <ChevronDown
              size={14}
              className={cn(
                "text-slate-400 transition-transform",
                isProfileOpen && "rotate-180",
              )}
            />
          </button>

          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#0F172A] rounded-[1.5rem] shadow-2xl border border-slate-200/50 dark:border-white/10 z-20 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-5 bg-slate-50/50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5">
                  <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
                    Signed in as
                  </p>
                  <p className="font-bold text-sm truncate">{user?.email}</p>
                </div>

                <div className="p-2">
                  <Link
                    href="/learner/profile"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-[#2845D6]/5 hover:text-[#2845D6] transition-colors"
                  >
                    <User size={16} /> Profile Settings
                  </Link>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl hover:bg-[#2845D6]/5 hover:text-[#2845D6] transition-colors">
                    <Settings size={16} /> Preferences
                  </button>
                  <div className="h-px bg-slate-100 dark:bg-white/5 my-2 mx-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
