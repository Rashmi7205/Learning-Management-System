"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import {motion} from 'framer-motion';

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose?: () => void;
  links: SidebarLink[];
  title: string;
  onLogout: () => void;
}

export function Sidebar({
  isOpen,
  isCollapsed,
  onClose,
  links,
  title,
  onLogout,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay - Knowledge Lab Glass effect */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 transition-all duration-500 ease-in-out",
          "bg-white dark:bg-[#020617] border-r border-slate-200/50 dark:border-white/5",
          isCollapsed ? "lg:w-24" : "lg:w-72",
          isOpen
            ? "w-72 translate-x-0"
            : "w-72 -translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header - Branding */}
        <div className="h-20 flex items-center px-6 border-b border-slate-200/50 dark:border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-xl shadow-lg shadow-blue-500/20 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={24}
                height={24}
                className="brightness-0 invert"
              />
            </div>
            {!isCollapsed && (
              <span className="font-serif font-black italic text-lg tracking-tight whitespace-nowrap animate-in fade-in slide-in-from-left-2">
                COURSE<span className="text-[#2845D6]">LOOP</span>
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => isOpen && onClose?.()}
                className={cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative",
                  isActive
                    ? "bg-[#2845D6]/5 text-[#2845D6] dark:text-blue-400"
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5",
                )}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-6 bg-[#2845D6] rounded-r-full"
                  />
                )}

                <span
                  className={cn(
                    "shrink-0 transition-transform duration-300 group-hover:scale-110",
                    isActive ? "text-[#2845D6]" : "text-slate-400",
                  )}
                >
                  {link.icon}
                </span>

                {!isCollapsed && (
                  <span className="font-sans font-semibold text-sm tracking-wide whitespace-nowrap">
                    {link.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200/50 dark:border-white/5">
          <button
            onClick={onLogout}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all group",
              isCollapsed && "justify-center",
            )}
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            {!isCollapsed && (
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                Terminate Session
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
