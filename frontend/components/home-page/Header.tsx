"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogIn, Menu, X, ShoppingCart } from "lucide-react"; // Added ShoppingCart
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Example count

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

  return (
    <>
      <header
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
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-[#2845D6] transition-colors font-medium relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2845D6] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              <div className="h-6 w-px bg-white/10 mx-2" /> {/* Divider */}
              {/* Cart Icon */}
              <Link href="/cart" className="relative p-2 group">
                <ShoppingCart className="w-5 h-5 text-white group-hover:text-[#2845D6] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#2845D6] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#0F172A]">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/login" >
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                >
                  <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="relative group overflow-hidden bg-slate-950 text-white border border-white/10 px-6 h-9 transition-all duration-300 hover:border-purple-500/50 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2 font-semibold tracking-wide">
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
                </Button>
              </Link>
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
