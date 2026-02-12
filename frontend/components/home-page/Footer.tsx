import Link from "next/link";
import {
  ChevronUp,
  GraduationCap,
  Facebook,
  Twitter,
  Instagram,
  Github,
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-white/5">
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        {/* Back to Top Button */}
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <a
            className="inline-block rounded-full bg-[#2845D6] p-2 text-white shadow-lg transition hover:bg-[#1f38b0] hover:scale-110 sm:p-3"
            href="#top"
          >
            <span className="sr-only">Back to top</span>
            <ChevronUp className="size-5" />
          </a>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            {/* Brand Logo Section */}
            <div className="flex justify-center items-center gap-2 text-[#2845D6] lg:justify-start">
              <Image
              src="/images/logo.png"
              height={40}
              width={40}
              alt="Courseloop"
              />
              <span className="text-2xl font-black tracking-tighter text-white">
                Course<span className="text-[#2845D6]">Loop</span>
              </span>
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-slate-400 lg:text-left">
              Empowering learners worldwide with industry-leading courses.
              Master new skills with our expert-led video tutorials and
              interactive assignments.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex justify-center gap-4 lg:justify-start">
              {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-slate-500 hover:text-[#2845D6] transition-colors"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            {["About", "Services", "Projects", "Blog"].map((item) => (
              <li key={item}>
                <Link
                  className="text-slate-300 font-medium transition hover:text-[#2845D6]"
                  href={`/${item.toLowerCase()}`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center text-sm text-slate-500">
            Copyright © {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
