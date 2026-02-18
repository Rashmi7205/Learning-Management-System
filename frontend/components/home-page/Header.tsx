"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  LogIn,
  Menu,
  X,
  ShoppingCart,
  ChevronDown,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAuth } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { fetchUserProfile, logoutUser } from "@/lib/store/slices/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useAppSelector((state) => state.cart.itemCount);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated ,isLoading} = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    if(!user && !isLoading){
      // @ts-ignore
      dispatch(fetchUserProfile());
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Categories", href: "/#categories" },
    { name: "Instructors", href: "/#instructors" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    // @ts-ignore
    dispatch(logoutUser());
    router.push("/login");
  };

  const initials =
    `${user?.firstName?.[0] || "U"}${user?.lastName?.[0] || ""}`.toUpperCase();
  return (
    <>
      <header
        id="top"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-lg shadow-md bg-slate-900/80"
            : "backdrop-blur-md bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                <Image
                  src="/images/logo.png"
                  height={50}
                  width={40}
                  alt="Course Loop"
                />
              </div>
              <span className="font-display text-2xl font-bold text-white">
                Course Loop
              </span>
            </Link>

            {/* Desktop Navigation */}
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 dark:text-slate-300 hover:text-[#2845D6] dark:hover:text-white transition-all duration-300 font-bold text-sm relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2845D6] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              <div className="h-4 w-px bg-slate-200 dark:bg-white/10 mx-2" />{" "}
              {/* Refined Divider */}
              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative p-2 group transition-transform active:scale-90"
              >
                <ShoppingCart className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:text-[#2845D6] dark:group-hover:text-white transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#06D001] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-[#020617] animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 pl-2 pr-2 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-[#2845D6]/50 rounded-2xl transition-all group shadow-sm"
                  >
                    <Avatar className="w-8 h-8 border border-slate-100 dark:border-slate-800 shadow-sm transition-transform group-hover:scale-95">
                      <AvatarImage src={user?.avatar?.secureUrl} />
                      <AvatarFallback className="bg-gradient-to-br from-[#2845D6] to-[#06D001] text-white text-[10px] font-black">
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="hidden lg:block text-left mr-1">
                      <p className="text-xs font-black leading-none text-slate-900 dark:text-white">
                        {user?.firstName || "Learner"}
                      </p>
                      <p className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter mt-1">
                        {user?.role}
                      </p>
                    </div>
                    <ChevronDown
                      size={12}
                      className={cn(
                        "text-slate-400 transition-transform duration-300",
                        isProfileOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#0F172A] rounded-[2rem] shadow-2xl border border-slate-200/50 dark:border-white/10 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-5 bg-slate-50/50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5">
                          <p className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.2em] mb-1">
                            Account
                          </p>
                          <p className="font-bold text-sm truncate text-slate-900 dark:text-white">
                            {user?.email}
                          </p>
                        </div>

                        <div className="p-2">
                          <Link
                            href="/learner/dashboard"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 rounded-xl hover:bg-[#2845D6]/5 hover:text-[#2845D6] dark:hover:text-white transition-colors"
                          >
                            <LayoutDashboard size={16} /> Dashboard
                          </Link>
                          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 rounded-xl hover:bg-[#2845D6]/5 hover:text-[#2845D6] dark:hover:text-white transition-colors">
                            <Settings size={16} /> Profile Settings
                          </button>
                          <div className="h-px bg-slate-100 dark:bg-white/5 my-2 mx-2" />
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                          >
                            <LogOut size={16} /> Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-600 dark:text-slate-300 hover:text-[#2845D6] dark:hover:white font-bold"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className="bg-[#2845D6] hover:bg-[#1e36af] text-white rounded-xl px-5 font-bold shadow-lg shadow-blue-500/20"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </nav>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-4">
              <Link href="/cart" className="relative p-2">
                <ShoppingCart className="w-6 h-6 text-white" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-[#2845D6] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-[#0F172A]">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0F172A] border-b border-white/10 ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-4 py-6 space-y-4">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="px-4 py-3 text-white hover:text-[#2845D6] hover:bg-white/5 rounded-lg transition-all font-medium animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link href="/login" className="w-full">
                <Button
                  variant="ghost"
                  className="w-full text-white justify-start"
                >
                  <LogIn className="w-4 h-4 mr-2" /> Sign In
                </Button>
              </Link>
              <Link href="/register" className="w-full">
                <Button className="w-full bg-[#2845D6] text-white">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <style jsx global>{`
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default Header;
