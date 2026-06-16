"use client";

import Link from "next/link";
import {
  Search,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "./ToastProvider";
import ArkanBrandLockup from "./ArkanBrandLockup";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "./LanguageProvider";
import { fluidSpring, mobileDrawerSpring } from "@/lib/motion";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
import { navHrefs, type NavLinkKey } from "@/lib/i18n/translations";

const dropdownKeys: NavLinkKey[] = ["products", "recipes", "whatsNew"];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuInteractive, setMenuInteractive] = useState(false);
  const { addToast } = useToast();
  const { t, isRtl } = useLanguage();

  const closeMenu = useCallback(() => {
    setMenuInteractive(false);
    unlockBodyScroll();
    setIsMobileMenuOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setMenuInteractive(true);
    setIsMobileMenuOpen(true);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    lockBodyScroll();
    setMenuInteractive(true);
    return () => unlockBodyScroll();
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (isMobileMenuOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen, closeMenu]);

  const handleNavClick = (
    e: React.MouseEvent,
    key: NavLinkKey,
    label: string
  ) => {
    const href = navHrefs[key];
    if (href === "#" && key !== "home") {
      e.preventDefault();
      addToast(`"${label}" ${t.common.sectionComingSoon}`);
    }
    closeMenu();
  };

  const drawerSide = isRtl ? "right" : "left";
  const drawerHiddenX = isRtl ? "100%" : "-100%";

  return (
    <header className="w-full glass-nav text-white z-50 sticky top-0 isolate">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link
            href="#"
            className="shrink min-w-0 flex items-center h-full py-1 touch-target tactile-active pe-2"
            aria-label={t.common.homeAria}
          >
            <motion.div
              whileTap={{ scale: 0.97 }}
              transition={fluidSpring}
              className="flex items-center min-w-0"
            >
              <ArkanBrandLockup variant="nav" priority />
            </motion.div>
          </Link>

          <nav className="hidden xl:flex items-center gap-6" aria-label="Main">
            {t.navKeys.map((key) => (
              <Link
                key={key}
                href={navHrefs[key]}
                onClick={(e) => handleNavClick(e, key, t.nav[key])}
                className="font-bold text-sm lg:text-base hover:text-white/80 transition-colors duration-200 flex items-center gap-1 group relative pb-1"
              >
                {t.nav[key]}
                {dropdownKeys.includes(key) && (
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
                <span className="absolute bottom-0 start-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:start-0" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3 z-50 shrink-0">
            <div className="hidden sm:flex items-center gap-2">
              {(
                [
                  [Facebook, t.common.openingFacebook, "Facebook"],
                  [Instagram, t.common.openingInstagram, "Instagram"],
                  [Twitter, t.common.openingTwitter, "Twitter"],
                  [Youtube, t.common.openingYoutube, "YouTube"],
                ] as const
              ).map(([Icon, toast, label]) => (
                <motion.a
                  key={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={fluidSpring}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast(toast);
                  }}
                  className="touch-target tactile-active hover:text-white transition-colors rounded-full"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
              <div className="w-px h-4 bg-white/30 mx-1 hidden md:block" />
            </div>

            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              transition={fluidSpring}
              onClick={() => addToast(t.common.openingSearch)}
              className="hidden xl:flex touch-target tactile-active bg-white/15 md:backdrop-blur-sm max-md:bg-white/20 rounded-full border border-white/15 transition-colors hover:bg-white hover:text-arkan-orange text-white"
              aria-label={t.common.search}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <button
              type="button"
              onClick={openMenu}
              className="xl:hidden touch-target tactile-active bg-white/20 max-md:backdrop-blur-none md:backdrop-blur-sm rounded-xl border border-white/15 transition-colors active:bg-white/30"
              aria-label={t.common.openMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div
            className="xl:hidden fixed inset-0 z-[100]"
            role="presentation"
            style={{ pointerEvents: menuInteractive ? "auto" : "none" }}
          >
            <motion.button
              type="button"
              aria-label={t.common.closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closeMenu}
              className="absolute inset-0 bg-black/65 max-md:bg-black/70 md:backdrop-blur-[2px] cursor-default"
            />

            <motion.nav
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: drawerHiddenX }}
              animate={{ x: 0 }}
              exit={{ x: drawerHiddenX }}
              transition={mobileDrawerSpring}
              className={`fixed top-0 ${drawerSide}-0 h-[100dvh] w-[min(88vw,320px)] bg-white z-[101] flex flex-col shadow-2xl border-e border-black/5`}
            >
              <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3 border-b border-black/5 shrink-0 gap-3">
                <ArkanBrandLockup variant="drawer" />
                <button
                  type="button"
                  onClick={closeMenu}
                  className="touch-target tactile-active rounded-xl bg-arkan-bg text-arkan-navy border border-black/5 shrink-0"
                  aria-label={t.common.closeMenu}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
                <div className="mb-5 flex justify-center sm:hidden">
                  <LanguageSwitcher variant="light" />
                </div>

                <ul className="flex flex-col gap-1">
                  {t.navKeys.map((key) => (
                    <li key={key}>
                      <Link
                        href={navHrefs[key]}
                        onClick={(e) => handleNavClick(e, key, t.nav[key])}
                        className="flex items-center min-h-[48px] px-4 py-3 rounded-xl text-base font-bold text-arkan-navy border border-transparent active:scale-[0.98] active:bg-arkan-orange/8 active:border-arkan-orange/15 transition-[transform,background-color,border-color] duration-100 tactile-active"
                      >
                        {t.nav[key]}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-black/5">
                  <p className="text-xs font-bold text-arkan-navy/40 uppercase tracking-wider text-center mb-4">
                    {t.common.brandEn}
                  </p>
                  <div className="flex justify-center gap-3">
                    {(
                      [
                        [Facebook, t.common.openingFacebook],
                        [Twitter, t.common.openingTwitter],
                        [Instagram, t.common.openingInstagram],
                      ] as const
                    ).map(([Icon, toast]) => (
                      <a
                        key={toast}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          addToast(toast);
                        }}
                        className="touch-target tactile-active rounded-full border border-black/5 text-arkan-navy active:bg-arkan-orange active:text-white active:border-arkan-orange transition-colors duration-100"
                        aria-label={toast}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 h-[env(safe-area-inset-bottom,0px)]" />
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
