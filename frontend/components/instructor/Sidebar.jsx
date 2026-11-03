"use client";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Users,
  Star,
  Settings,
  HelpCircle,
  LogOut,
  X,
  Sparkles,
  Menu,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchInstructorProfile } from "@/lib/store/slices/instructorSlice";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const sidebarItems = [
  { title: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
  { title: "My Courses", href: "/instructor/courses", icon: BookOpen },
  { title: "Analytics", href: "/instructor/analytics", icon: BarChart3 },
  { title: "Students", href: "/instructor/students", icon: Users },
  { title: "Reviews", href: "/instructor/reviews", icon: Star },
];

const bottomSidebarItems = [
  { title: "Settings", href: "/instructor/settings", icon: Settings },
  { title: "Help Center", href: "/instructor/help", icon: HelpCircle },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#0F172A] border-r border-white/5 text-slate-300
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col h-screen
      `}
      >
        {/* Brand Logo */}
        <div className="flex items-center justify-between h-20 px-6 flex-shrink-0 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="bg-[#2845D6] p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-white italic">
              LAB<span className="text-[#2845D6]">.</span>
            </h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          <div>
            <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">
              Main Menu
            </p>
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      group flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#2845D6] text-white shadow-lg shadow-blue-500/20"
                          : "hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <Icon
                      className={`h-5 w-5 mr-3 transition-colors ${isActive ? "text-white" : "text-slate-500 group-hover:text-[#2845D6]"}`}
                    />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">
              Support
            </p>
            <div className="space-y-1">
              {bottomSidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all
                      ${isActive ? "bg-white/10 text-white" : "hover:bg-white/5 hover:text-white"}`}
                  >
                    <Icon className="h-5 w-5 mr-3 text-slate-500" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 mt-auto border-t border-white/5">
          <button className="w-full flex items-center px-4 py-3 text-sm font-bold text-red-400 rounded-xl hover:bg-red-500/10 transition-colors group">
            <LogOut className="h-5 w-5 mr-3 transition-transform group-hover:-translate-x-1" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};
export const Header = ({ onMenuClick }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile, loading } = useAppSelector((state) => state.instructor);

  useEffect(() => {
    if (!profile) dispatch(fetchInstructorProfile());
  }, [dispatch, profile]);

  if (!profile) return null;

  const fullName = `${profile.user.firstName} ${profile.user.lastName}`;
  const avatar =
    profile.user.avatar?.secureUrl ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.user.firstName}`;

  return (
    <header className="bg-[#0F172A]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="hidden sm:block">
            <h2 className="text-sm font-black text-white uppercase tracking-widest italic">
              Instructor <span className="text-[#2845D6]">Terminal</span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-white/5 rounded-xl"
              >
                <Bell className="h-5 w-5 text-slate-400" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-[#2845D6] rounded-full border-2 border-[#0F172A]"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-[#161F35] border-white/10 text-white rounded-2xl p-2 shadow-2xl"
            >
              <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-widest text-slate-500 p-3">
                Alerts
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem className="focus:bg-white/5 rounded-xl p-3 cursor-pointer">
                <div className="space-y-1">
                  <p className="text-sm font-bold">New student enrollment</p>
                  <p className="text-xs text-slate-400">
                    Someone just joined your Masterclass.
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 p-1 pr-3 hover:bg-white/5 rounded-2xl transition-all">
                <Avatar className="h-9 w-9 border border-white/10 shadow-lg">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="bg-[#2845D6] text-white font-bold">
                    {profile.user.firstName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start leading-none">
                  <span className="text-xs font-black text-white">
                    {fullName}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase mt-1">
                    Verified Expert
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-[#161F35] border-white/10 text-white rounded-2xl p-2 shadow-2xl"
            >
              <DropdownMenuItem
                asChild
                className="focus:bg-white/5 rounded-xl cursor-pointer py-3"
              >
                <Link
                  href="/instructor/profile"
                  className="flex items-center font-bold"
                >
                  <Users className="mr-3 h-4 w-4 text-[#2845D6]" /> Profile
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.replace("/login")}
                className="focus:bg-red-500/10 text-red-400 rounded-xl cursor-pointer py-3 font-bold"
              >
                <LogOut className="mr-3 h-4 w-4" /> Terminate Session
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};