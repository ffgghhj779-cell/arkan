"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "./ToastProvider";
import { fluidSpring, revealTransition } from "@/lib/motion";

const slides = [
  {
    id: 1,
    lineTop: "يا لذّة",
    lineBottom: "ما جربتها",
    accent: "يا تحبها",
    image:
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=75&w=1280&auto=format&fit=crop",
    alt: "عائلة تستمتع بوجبة أركان",
  },
  {
    id: 2,
    lineTop: "جودة",
    lineBottom: "منذ ١٩٥٦",
    accent: "بكل ثقة",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=75&w=1280&auto=format&fit=crop",
    alt: "وجبة مشوية لذيذة",
  },
  {
    id: 3,
    lineTop: "نكهة",
    lineBottom: "أصيلة",
    accent: "في كل لقمة",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=75&w=1280&auto=format&fit=crop",
    alt: "طبق أركان الشهي",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const { addToast } = useToast();

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const handleLogoClick = () => {
    addToast("مرحباً بك في عالم أركان — جودة فائقة منذ ١٩٥٦");
  };

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const slide = slides[current];

  return (
    <section
      id="about"
      className="relative w-full min-h-[85vh] md:min-h-[92vh] overflow-hidden bg-arkan-navy-deep flex items-center justify-center"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-arkan-navy-deep via-arkan-navy to-[#2a3f5f]" />

        {/* CSS-only arc — no JS animation loop */}
        <div className="absolute left-1/2 bottom-[-55%] w-[160vmax] h-[160vmax] rounded-full border-[3px] border-arkan-orange/20 animate-arc-spin transform-gpu" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-48%] w-[130vmax] h-[130vmax] rounded-full border-[2px] border-white/5" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-42%] w-[105vmax] h-[105vmax] rounded-full bg-gradient-to-t from-arkan-orange/25 via-arkan-orange/8 to-transparent" />

        {/* Crossfade slides — opacity only, no scale (avoids layout thrash) */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 transform-gpu will-change-[opacity]"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={current === 0}
              quality={75}
              className="object-cover object-center opacity-35 mix-blend-luminosity"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-arkan-navy-deep/90 via-arkan-navy/60 to-arkan-navy/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full py-28 md:py-32">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, y: direction > 0 ? 24 : -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -24 : 24 }}
            transition={revealTransition}
            className="flex flex-col items-center justify-center gap-2 md:gap-3 transform-gpu will-change-[transform,opacity]"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-arkan-gold leading-[1.08] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
              {slide.lineTop}
              <br />
              <span className="text-white">{slide.lineBottom}</span>
            </h1>

            <motion.button
              type="button"
              onClick={handleLogoClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={fluidSpring}
              className="my-4 md:my-6 w-36 h-24 md:w-40 md:h-28 bg-arkan-orange text-white rounded-[38%] flex flex-col items-center justify-center font-black text-2xl shadow-glass border-[3px] border-white/90 -rotate-2 hover:rotate-0 transition-transform cursor-pointer leading-none pt-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 transform-gpu will-change-transform"
              aria-label="عن أركان"
            >
              <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase mb-1 opacity-90">
                Arkan
              </span>
              <span>أركان</span>
            </motion.button>

            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white/95 leading-[1.12] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
              {slide.accent}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ...revealTransition }}
          className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={fluidSpring}
            onClick={scrollToProducts}
            className="px-8 py-3.5 bg-white text-arkan-orange font-black text-base md:text-lg rounded-full shadow-premium hover:shadow-premium-hover transition-shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 transform-gpu will-change-transform"
          >
            اكتشف منتجاتنا
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={fluidSpring}
            onClick={() =>
              document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 bg-white/15 text-white font-bold text-base md:text-lg rounded-full border border-white/25 hover:bg-white/25 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 transform-gpu will-change-transform"
          >
            فوائد التجميد
          </motion.button>
        </motion.div>
      </div>

      <motion.button
        type="button"
        aria-label="الشريحة السابقة"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={fluidSpring}
        onClick={prev}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center z-30 border border-white/20 hover:bg-white/35 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 transform-gpu will-change-transform"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </motion.button>
      <motion.button
        type="button"
        aria-label="الشريحة التالية"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={fluidSpring}
        onClick={next}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center z-30 border border-white/20 hover:bg-white/35 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 transform-gpu will-change-transform"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </motion.button>

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`الانتقال إلى الشريحة ${i + 1}`}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
              i === current
                ? "w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="انتقل إلى المنتجات"
        onClick={scrollToProducts}
        className="absolute bottom-8 md:bottom-12 right-6 md:right-10 z-30 p-2 text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full animate-scroll-hint transform-gpu"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
}
