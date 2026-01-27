'use client';
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Users,
  Star,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Menu,
  LogOut,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { fetchInstructorProfile } from "@/lib/store/slices/instructorSlice";

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
  const [activeItem, setActiveItem] = useState("/instructor/dashboard");

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-gray-900 text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col h-screen
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 bg-gray-800 flex-shrink-0">
          <h1 className="text-xl font-bold">CourseLoop</h1>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.href;

              return (
                <button
                  key={item.href}
                  onClick={() => setActiveItem(item.href)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg
                    transition-colors duration-200
                    ${isActive ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}
                  `}
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{item.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="my-6 border-t border-gray-700" />

          <div className="space-y-1">
            {bottomSidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.href;

              return (
                <button
                  key={item.href}
                  onClick={() => setActiveItem(item.href)}
                  className={`
                    w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg
                    transition-colors duration-200
                    ${isActive ? "bg-indigo-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}
                  `}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-700 flex-shrink-0">
          <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Logout</span>
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
     if (!profile) {
       dispatch(fetchInstructorProfile());
     }
   }, [dispatch, profile]);

   useEffect(() => {
     if (!loading && !profile) {
       router.replace("/login");
     }
   }, [loading, profile, router]);

   if (!profile) return null;

   const fullName = `${profile.user.firstName} ${profile.user.lastName}`;
   const avatar =
     profile.user.avatar?.secureUrl ||
     `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.user.firstName}`;
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 flex-shrink-0">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Instructor Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button className="text-gray-600 hover:text-gray-900 lg:hidden">
            <Search className="h-5 w-5" />
          </button>

          <div className="hidden lg:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
              />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <p className="text-sm font-medium">New student enrolled</p>
                  <p className="text-xs text-gray-500 mt-1">
                    John Doe enrolled in "React Masterclass"
                  </p>
                  <span className="text-xs text-gray-400 mt-1">
                    2 hours ago
                  </span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
                <span className="hidden sm:block text-sm text-gray-700 font-medium">
                  {fullName}
                </span>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={avatar} alt={fullName} />
                  <AvatarFallback>
                    {profile.user.firstName[0]}
                    {profile.user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{fullName}</span>
                  <span className="text-xs text-gray-500">
                    {profile.user.email}
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/instructor/profile" className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-600 flex items-center cursor-pointer"
                onClick={() => {
                  // dispatch(logout());
                  router.replace("/login");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
