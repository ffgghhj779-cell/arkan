"use client";

import Link from "next/link";
import { Search, Facebook, Twitter, Instagram, Youtube, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "./ToastProvider";
import ArkanLogo from "./ArkanLogo";

const navLinks = [
  { name: "الصفحة الرئيسية", href: "#" },
  { name: "عن أركان", href: "#about" },
  { name: "منتجاتنا", href: "#products", hasDropdown: true },
  { name: "وصفاتنا", href: "#recipes", hasDropdown: true },
  { name: "فوائد التجميد", href: "#benefits" },
  { name: "اختر دجاجك بعناية", href: "#" }, // Removed #choose for now
  { name: "جديد أركان", href: "#", hasDropdown: true }, // Removed #new
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const handleSearch = () => {
    addToast("جاري فتح نافذة البحث...");
  };

  return (
    <header className="w-full bg-arkan-orange text-white z-50 sticky top-0 shadow-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-50 bg-arkan-orange">
        <div className="flex justify-between items-center h-24">
          {/* Logo Area (Right side in RTL) */}
          <Link href="#" className="flex-shrink-0 relative z-50 group flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.05, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="translate-y-4 flex items-center justify-center"
            >
              <ArkanLogo variant="navbar" priority />
            </motion.div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.div key={link.name} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === "#" && link.name !== "الصفحة الرئيسية") {
                      e.preventDefault();
                      addToast(`قسم "${link.name}" قيد التطوير`);
                    }
                  }}
                  className="font-bold text-sm lg:text-base hover:text-white/80 transition-colors flex items-center gap-1 group relative pb-1"
                >
                  {link.name}
                  {link.hasDropdown && (
                    <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  {/* Premium underline effect */}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Left Area (Actions + Language) */}
          <div className="flex flex-col gap-2 items-end z-50">
            <div className="flex items-center gap-4 text-sm font-bold opacity-90">
              <div className="flex items-center gap-3">
                <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح فيسبوك..."); }} className="hover:text-white transition-all" aria-label="فيسبوك"><Facebook className="w-4 h-4" /></motion.a>
                <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح انستجرام..."); }} className="hover:text-white transition-all" aria-label="انستجرام"><Instagram className="w-4 h-4" /></motion.a>
                <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح تويتر..."); }} className="hover:text-white transition-all" aria-label="تويتر"><Twitter className="w-4 h-4" /></motion.a>
                <motion.a whileHover={{ scale: 1.2, rotate: 5 }} href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح يوتيوب..."); }} className="hover:text-white transition-all" aria-label="يوتيوب"><Youtube className="w-4 h-4" /></motion.a>
              </div>
              <div className="w-px h-4 bg-white/30 mx-2" />
              <button type="button" onClick={() => addToast("English version coming soon")} className="hover:text-white/70 transition-colors">EN</button>
              <span>|</span>
              <button type="button" className="text-white hover:text-white/70 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-white">العربية</button>
            </div>
            
            <div className="mt-2 flex items-center gap-4 hidden xl:block">
               <motion.button 
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={handleSearch} 
                 className="p-2 bg-arkan-orange-hover rounded-full transition-colors hover:bg-white hover:text-arkan-orange text-white"
               >
                 <Search className="w-5 h-5 currentColor" />
               </motion.button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="mt-2 xl:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-arkan-orange-hover rounded-lg transition-colors hover:bg-white/20 relative z-[60]"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Side slide) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-[100dvh] w-[80vw] max-w-sm bg-white z-50 xl:hidden shadow-premium overflow-y-auto pt-24"
            >
              <div className="flex flex-col p-6 gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
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
                  </motion.div>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 flex justify-center gap-4"
                >
                  <a href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح فيسبوك..."); }} className="w-12 h-12 rounded-full border border-gray-200 text-arkan-navy flex items-center justify-center hover:bg-arkan-orange hover:text-white hover:border-arkan-orange transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح تويتر..."); }} className="w-12 h-12 rounded-full border border-gray-200 text-arkan-navy flex items-center justify-center hover:bg-arkan-orange hover:text-white hover:border-arkan-orange transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); addToast("جاري فتح انستجرام..."); }} className="w-12 h-12 rounded-full border border-gray-200 text-arkan-navy flex items-center justify-center hover:bg-arkan-orange hover:text-white hover:border-arkan-orange transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
