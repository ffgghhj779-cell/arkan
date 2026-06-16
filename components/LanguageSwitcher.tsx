"use client";

import { motion } from "motion/react";
import { useLanguage } from "./LanguageProvider";
import { fluidSpring } from "@/lib/motion";
import type { Locale } from "@/lib/i18n/translations";

type LanguageSwitcherProps = {
  className?: string;
  variant?: "nav" | "light";
};

export default function LanguageSwitcher({
  className = "",
  variant = "nav",
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage();

  const switchTo = (next: Locale) => {
    if (next !== locale) setLocale(next);
  };

  const isNav = variant === "nav";

  return (
    <div
      className={`relative flex items-center rounded-full p-0.5 border shadow-glass transform-gpu max-md:backdrop-blur-none md:backdrop-blur-md ${
        isNav
          ? "bg-white/15 max-md:bg-white/20 border-white/20"
          : "bg-arkan-orange/10 border-arkan-orange/20"
      } ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      {(["en", "ar"] as const).map((lang) => {
        const active = locale === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => switchTo(lang)}
            className={`relative z-10 px-3 py-2 text-xs font-bold rounded-full transition-colors duration-200 min-h-11 min-w-[3rem] tactile-active ${
              active
                ? "text-arkan-orange"
                : isNav
                  ? "text-white/80 hover:text-white"
                  : "text-arkan-navy/60 hover:text-arkan-navy"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${variant}`}
                transition={fluidSpring}
                className="absolute inset-0 bg-white rounded-full shadow-sm border border-black/5 -z-10"
              />
            )}
            {lang === "en" ? t.language.en : t.language.ar}
          </button>
        );
      })}
    </div>
  );
}
