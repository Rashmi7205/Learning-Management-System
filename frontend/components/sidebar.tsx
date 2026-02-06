"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";

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

  // For mobile, close sidebar when a link is clicked
  const handleLinkClick = () => {
    if (isOpen && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out ${
          isCollapsed ? "md:w-20" : "md:w-64"
        } ${
          isOpen ? "w-64" : "w-0 md:w-64"
        } bg-sidebar shadow-lg overflow-hidden`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-center h-16 bg-linear-to-r from-primary to-primary/80 ${
            isCollapsed ? "md:px-2" : "px-4"
          }`}
        >
          {isCollapsed ? (
            <div>
              <Image
                src="/images/logo.png"
                alt="CourseLoop Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
          ) : (
            <div className="flex items-center justify-evenly">
              <Image
                src="/images/logo.png"
                alt="CourseLoop Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="sr-only text-amber-100 font-semibold">CourseLoop</span>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 space-y-2 px-3">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
                title={isCollapsed ? link.label : ""}
              >
                <span
                  className={`text-lg transition-all duration-300 ${
                    isCollapsed ? "md:mx-0" : "mr-3"
                  }`}
                >
                  {link.icon}
                </span>
                {!isCollapsed && (
                  <span className="transition-all duration-300">
                    {link.label}
                  </span>
                )}
              </Link>
            );
          })}

          <hr className="my-4 border-border" />

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className={`w-full flex items-center px-4 py-3 text-sidebar-foreground rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group ${
              isCollapsed ? "md:justify-center" : ""
            }`}
            title={isCollapsed ? "Logout" : ""}
          >
            <span
              className={`text-lg transition-all duration-300 ${
                isCollapsed ? "md:mx-0" : "mr-3"
              }`}
            >
              {/* Logout Icon */}
              <LogOut />
            </span>
            {!isCollapsed && <span>Logout</span>}
          </button>
        </nav>
      </aside>
    </>
  );
}
