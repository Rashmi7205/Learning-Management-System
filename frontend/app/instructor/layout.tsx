import React from "react";
import Link from "next/link";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <h1 className="text-xl font-bold">LMS Instructor</h1>
        </div>
        <nav className="mt-8 space-y-2 px-4">
          <Link
            href="/instructor/dashboard"
            className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span className="mr-3">📊</span>
            Dashboard
          </Link>
          <Link
            href="/instructor/courses"
            className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span className="mr-3">📚</span>
            My Courses
          </Link>
          <Link
            href="/instructor/analytics"
            className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span className="mr-3">📈</span>
            Analytics
          </Link>
          <Link
            href="/instructor/students"
            className="flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span className="mr-3">👥</span>
            Students
          </Link>
          <hr className="my-4 border-gray-700" />
          <button className="w-full flex items-center px-4 py-2 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-left">
            <span className="mr-3">🚪</span>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Instructor Dashboard
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Instructor</span>
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
                I
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}
