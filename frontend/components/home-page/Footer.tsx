"use client";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Send,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const footerLinks = {
    Platform: [
      { name: "All Courses", href: "#" },
      { name: "Learning Paths", href: "#" },
      { name: "Certificates", href: "#" },
      { name: "Enterprise", href: "#" },
    ],
    Company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Partners", href: "#" },
    ],
    Resources: [
      { name: "Blog", href: "#" },
      { name: "Community", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Cookies", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <a href="/" className="flex items-center gap-3 mb-6 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter">
                  Course<span className="text-blue-500">Loop</span>
                </span>
              </a>
              <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
                Empowering the next generation of digital leaders with
                world-class technical education and hands-on community support.
              </p>
            </div>

            <div className="relative max-w-sm">
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">
                Join our newsletter
              </h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="name@email.com"
                  className="bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 rounded-xl focus-visible:ring-blue-500 focus-visible:border-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-5 transition-all">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="mt-3 text-[10px] text-slate-500">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">
                  {category}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-blue-400 transition-colors text-sm flex items-center group/link"
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-white/5">
          <div className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-500">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">support@courseloop.com</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-500">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">+1 (555) 000-1234</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-blue-500">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Silicon Valley, CA</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-slate-500 font-medium">
              © {new Date().getFullYear()} CourseLoop Inc. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
