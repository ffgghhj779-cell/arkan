"use client";

import Link from "next/link";
import { Search, Facebook, Twitter, Instagram, Youtube, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "./ToastProvider";
import ArkanLogo from "./ArkanLogo";
import { fluidSpring, gentleSpring } from "@/lib/motion";

const navLinks = [
  { name: "الصفحة الرئيسية", href: "#" },
  { name: "عن أركان", href: "#about" },
  { name: "منتجاتنا", href: "#products", hasDropdown: true },
  { name: "وصفاتنا", href: "#recipes", hasDropdown: true },
  { name: "فوائد التجميد", href: "#benefits" },
  { name: "اختر دجاجك بعناية", href: "#" },
  { name: "جديد أركان", href: "#", hasDropdown: true },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSearch = () => {
    addToast("جاري فتح نافذة البحث...");
  };

  return (
    <header className="w-full bg-arkan-orange text-white z-50 sticky top-0 shadow-md isolate">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo — flush, centered, no overflow box */}
          <Link
            href="#"
            className="flex-shrink-0 flex items-center justify-center h-full py-2 group/logo"
            aria-label="أركان — الصفحة الرئيسية"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={fluidSpring}
              className="transform-gpu will-change-transform flex items-center justify-center"
            >
              <ArkanLogo variant="navbar" priority />
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.href === "#" && link.name !== "الصفحة الرئيسية") {
                    e.preventDefault();
                    addToast(`قسم "${link.name}" قيد التطوير`);
                  }
                }}
                className="font-bold text-sm lg:text-base hover:text-white/80 transition-colors duration-200 flex items-center gap-1 group relative pb-1 transform-gpu"
              >
                {link.name}
                {link.hasDropdown && (
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 transform-gpu"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4 z-50">
            <div className="hidden sm:flex items-center gap-3 text-sm font-bold opacity-90">
              <motion.a
                whileHover={{ scale: 1.12 }}
                transition={fluidSpring}
                href="#"
                onClick={(e) => { e.preventDefault(); addToast("جاري فتح فيسبوك..."); }}
                className="hover:text-white transition-colors transform-gpu will-change-transform"
                aria-label="فيسبوك"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12 }}
                transition={fluidSpring}
                href="#"
                onClick={(e) => { e.preventDefault(); addToast("جاري فتح انستجرام..."); }}
                className="hover:text-white transition-colors transform-gpu will-change-transform"
                aria-label="انستجرام"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12 }}
                transition={fluidSpring}
                href="#"
                onClick={(e) => { e.preventDefault(); addToast("جاري فتح تويتر..."); }}
                className="hover:text-white transition-colors transform-gpu will-change-transform"
                aria-label="تويتر"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.12 }}
                transition={fluidSpring}
                href="#"
                onClick={(e) => { e.preventDefault(); addToast("جاري فتح يوتيوب..."); }}
                className="hover:text-white transition-colors transform-gpu will-change-transform"
                aria-label="يوتيوب"
              >
                <Youtube className="w-4 h-4" />
              </motion.a>
              <div className="w-px h-4 bg-white/30 mx-1" />
              <button type="button" onClick={() => addToast("English version coming soon")} className="hover:text-white/70 transition-colors">
                EN
              </button>
              <span>|</span>
              <button type="button" className="text-white hover:text-white/70 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-white">
                العربية
              </button>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={fluidSpring}
              onClick={handleSearch}
              className="hidden xl:flex p-2 bg-arkan-orange-hover rounded-full transition-colors hover:bg-white hover:text-arkan-orange text-white transform-gpu will-change-transform"
              aria-label="بحث"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 bg-arkan-orange-hover rounded-lg transition-colors hover:bg-white/20"
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/55 z-40 xl:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={gentleSpring}
              className="fixed top-0 right-0 h-[100dvh] w-[80vw] max-w-sm bg-white z-50 xl:hidden shadow-premium overflow-y-auto pt-20 transform-gpu will-change-transform"
            >
              <div className="flex flex-col p-6 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === "#" && link.name !== "الصفحة الرئيسية") {
                        e.preventDefault();
                        addToast(`قسم "${link.name}" قيد التطوير`);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-lg font-black text-arkan-navy block py-4 border-b border-gray-100 hover:text-arkan-orange transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="mt-8 flex justify-center gap-4">
                  <a href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح فيسبوك..."); }} className="w-12 h-12 rounded-full border border-gray-200 text-arkan-navy flex items-center justify-center hover:bg-arkan-orange hover:text-white hover:border-arkan-orange transition-colors transform-gpu">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح تويتر..."); }} className="w-12 h-12 rounded-full border border-gray-200 text-arkan-navy flex items-center justify-center hover:bg-arkan-orange hover:text-white hover:border-arkan-orange transition-colors transform-gpu">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح انستجرام..."); }} className="w-12 h-12 rounded-full border border-gray-200 text-arkan-navy flex items-center justify-center hover:bg-arkan-orange hover:text-white hover:border-arkan-orange transition-colors transform-gpu">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
