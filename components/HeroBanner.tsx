"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "./ToastProvider";
import { useLanguage } from "./LanguageProvider";
import { fluidSpring, revealTransition, mobileFadeReveal, gpuLayerClass, gpuLayerStyle } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { heroSlideImages, slideIds, type SlideId } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const isMobile = useIsMobile();
  const { addToast } = useToast();
  const { t, isRtl } = useLanguage();

  const slides = useMemo(
    () =>
      slideIds.map((id) => ({
        id,
        ...t.hero.slides[id],
        image: heroSlideImages[id].image,
      })),
    [t]
  );

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const slide = slides[current];
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section
      id="about"
      className="relative w-full min-h-[85vh] md:min-h-[92vh] overflow-hidden bg-arkan-navy-deep flex items-center justify-center border-b border-white/5"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-arkan-navy-deep via-arkan-navy to-[#2a3f5f]" />
        <div className="absolute left-1/2 bottom-[-55%] w-[160vmax] h-[160vmax] rounded-full border-[3px] border-arkan-orange/20 animate-arc-spin transform-gpu" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-48%] w-[130vmax] h-[130vmax] rounded-full border border-white/5" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-42%] w-[105vmax] h-[105vmax] rounded-full bg-gradient-to-t from-arkan-orange/25 via-arkan-orange/8 to-transparent" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${slide.id}-${t.meta.title}`}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn("absolute inset-0", gpuLayerClass)}
            style={gpuLayerStyle}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={current === 0}
              loading={current === 0 ? undefined : "lazy"}
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
            key={`content-${slide.id}-${t.meta.title}`}
            custom={direction}
            initial={isMobile ? { opacity: 0 } : { opacity: 0, y: direction > 0 ? 24 : -24 }}
            animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={isMobile ? { opacity: 0 } : { opacity: 0, y: direction > 0 ? -24 : 24 }}
            transition={isMobile ? mobileFadeReveal : revealTransition}
            className={cn("flex flex-col items-center justify-center gap-2 md:gap-3", gpuLayerClass)}
            style={gpuLayerStyle}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-arkan-gold leading-[1.08] tracking-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
              {slide.lineTop}
              <br />
              <span className="text-white">{slide.lineBottom}</span>
            </h1>

            <motion.button
              type="button"
              onClick={() => addToast(t.hero.welcomeToast)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={fluidSpring}
              className="my-4 md:my-6 w-36 h-24 md:w-40 md:h-28 bg-arkan-orange text-white rounded-[38%] flex flex-col items-center justify-center font-black text-2xl shadow-glass border border-white/20 backdrop-blur-sm -rotate-2 hover:rotate-0 transition-transform cursor-pointer leading-none pt-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 transform-gpu will-change-transform"
              aria-label={t.hero.aboutArkan}
            >
              <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase mb-1 opacity-90">
                {t.common.brandEn}
              </span>
              <span>{t.common.brand}</span>
            </motion.button>

            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white/95 leading-[1.12] tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
              {slide.accent}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ delay: isMobile ? 0 : 0.4, ...(isMobile ? mobileFadeReveal : revealTransition) }}
          className={cn("mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-4", gpuLayerClass)}
          style={gpuLayerStyle}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={fluidSpring}
            onClick={scrollToProducts}
            className="px-8 py-3.5 bg-white text-arkan-orange font-black text-base md:text-lg rounded-full shadow-premium hover:shadow-premium-hover border border-black/5 transition-shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 transform-gpu will-change-transform"
          >
            {t.hero.discoverProducts}
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={fluidSpring}
            onClick={() =>
              document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3.5 bg-white/15 backdrop-blur-md text-white font-bold text-base md:text-lg rounded-full border border-white/20 hover:bg-white/25 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 transform-gpu will-change-transform"
          >
            {t.hero.freezingBenefits}
          </motion.button>
        </motion.div>
      </div>

      <motion.button
        type="button"
        aria-label={t.hero.prevSlide}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={fluidSpring}
        onClick={prev}
        className={`absolute ${isRtl ? "right-4 md:right-8" : "left-4 md:left-8"} top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center z-30 border border-white/20 hover:bg-white/30 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 transform-gpu will-change-transform`}
      >
        <PrevIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </motion.button>
      <motion.button
        type="button"
        aria-label={t.hero.nextSlide}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={fluidSpring}
        onClick={next}
        className={`absolute ${isRtl ? "left-4 md:left-8" : "right-4 md:right-8"} top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center z-30 border border-white/20 hover:bg-white/30 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 transform-gpu will-change-transform`}
      >
        <NextIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </motion.button>

      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`${t.hero.goToSlide} ${i + 1}`}
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
        aria-label={t.hero.scrollToProducts}
        onClick={scrollToProducts}
        className={`absolute bottom-8 md:bottom-12 ${isRtl ? "right-6 md:right-10" : "left-6 md:left-10"} z-30 p-2 text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full animate-scroll-hint transform-gpu`}
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
}
