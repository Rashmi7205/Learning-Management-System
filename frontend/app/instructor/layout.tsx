"use client";

import { Sidebar, Header } from "@/components/instructor/Sidebar";
import { useState } from "react";
import { ReactNode } from "react";

interface InstructorLayoutProps {
  children: ReactNode;
}

export default function InstructorLayout({ children }: InstructorLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
      <div className="flex h-screen bg-[#0F172A] text-slate-200 overflow-hidden font-sans">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col overflow-hidden relative">

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />

          <Header onMenuClick={() => setIsSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto relative scrollbar-hide">
            <div className="h-full w-full">{children}</div>
          </main>
        </div>
      </div>
  );
}
