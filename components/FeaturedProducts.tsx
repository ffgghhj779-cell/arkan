"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "./ToastProvider";
import { useLanguage } from "./LanguageProvider";
import ProductCard, { type ProductView } from "./ProductCard";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  fluidSpring,
  mobileSpring,
  staggerContainer,
  staggerItem,
  inViewViewport,
  gpuLayerClass,
  gpuLayerStyle,
} from "@/lib/motion";
import { RevealOnScroll } from "./RevealOnScroll";
import { productIds, productMeta } from "@/lib/i18n/translations";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";

function getVisibleCount(isMobile: boolean) {
  if (typeof window === "undefined") return isMobile ? 1 : 3;
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function useVisibleCount(isMobile: boolean) {
  const [count, setCount] = useState(() => getVisibleCount(isMobile));

  useEffect(() => {
    const update = () => setCount(getVisibleCount(isMobile));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isMobile]);

  return count;
}

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<ProductView | null>(null);
  const [modalInteractive, setModalInteractive] = useState(false);
  const [page, setPage] = useState(0);
  const isMobile = useIsMobile();
  const visibleCount = useVisibleCount(isMobile);
  const { addToast } = useToast();
  const { t, isRtl } = useLanguage();

  const products = useMemo<ProductView[]>(
    () =>
      productIds.map((id) => ({
        ...productMeta[id],
        ...t.products.items[id],
      })),
    [t]
  );

  const maxPage = Math.max(0, Math.ceil(products.length / visibleCount) - 1);
  const visibleProducts = products.slice(
    page * visibleCount,
    page * visibleCount + visibleCount
  );

  useEffect(() => {
    if (page > maxPage) setPage(maxPage);
  }, [maxPage, page]);

  const goNext = useCallback(() => {
    setPage((p) => (p >= maxPage ? 0 : p + 1));
  }, [maxPage]);

  const goPrev = useCallback(() => {
    setPage((p) => (p <= 0 ? maxPage : p - 1));
  }, [maxPage]);

  const openProductModal = useCallback((product: ProductView) => {
    setModalInteractive(true);
    setSelectedProduct(product);
  }, []);

  const closeProductModal = useCallback(() => {
    setModalInteractive(false);
    unlockBodyScroll();
    setSelectedProduct(null);
  }, []);

  useEffect(() => {
    if (!selectedProduct) return;
    lockBodyScroll();
    setModalInteractive(true);
    return () => unlockBodyScroll();
  }, [selectedProduct]);

  const handleAddToCart = (productTitle: string) => {
    addToast(t.products.addedToCart.replace("{product}", productTitle));
    closeProductModal();
  };

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;
  const prevClass = isRtl ? "-right-4 lg:-right-14" : "-left-4 lg:-left-14";
  const nextClass = isRtl ? "-left-4 lg:-left-14" : "-right-4 lg:-right-14";

  const containerVariants = isMobile ? undefined : staggerContainer;
  const itemVariants = isMobile ? undefined : staggerItem;

  return (
    <section
      id="products"
      className="relative section-padding overflow-hidden border-t border-black/5"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-arkan-beige via-[#FFF5EB] to-white" />
      <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(232,93,4,0.08),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center mb-10 md:mb-20">
          <h2 className="section-heading mb-4 md:mb-5">{t.products.heading}</h2>
          <h3 className="section-subheading mb-4 md:mb-6">{t.products.subheading}</h3>
          <p className="section-body mx-auto px-1">{t.products.body}</p>
        </RevealOnScroll>

        <div className="relative">
          <motion.button
            type="button"
            aria-label={t.products.prev}
            whileTap={{ scale: 0.92 }}
            transition={mobileSpring}
            onClick={goPrev}
            className={`hidden md:flex touch-target absolute ${prevClass} top-1/2 -translate-y-1/2 luxury-card rounded-full hover:shadow-premium z-20 transform-gpu will-change-transform`}
          >
            <PrevIcon className="w-6 h-6 text-arkan-navy" />
          </motion.button>
          <motion.button
            type="button"
            aria-label={t.products.next}
            whileTap={{ scale: 0.92 }}
            transition={mobileSpring}
            onClick={goNext}
            className={`hidden md:flex touch-target absolute ${nextClass} top-1/2 -translate-y-1/2 luxury-card rounded-full hover:shadow-premium z-20 transform-gpu will-change-transform`}
          >
            <NextIcon className="w-6 h-6 text-arkan-navy" />
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${page}-${visibleCount}-${t.meta.title}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: isMobile ? 0.15 : 0.35 }}
              className={gpuLayerClass}
              style={gpuLayerStyle}
            >
              <motion.div
                variants={containerVariants}
                initial={isMobile ? false : "hidden"}
                whileInView={isMobile ? undefined : "visible"}
                viewport={inViewViewport}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
              >
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    brandBadge={t.products.brandBadge}
                    halalLabel={t.common.halal}
                    quickViewLabel={t.products.quickView}
                    viewDetailsLabel={t.products.viewDetails}
                    isRtl={isRtl}
                    variants={itemVariants}
                    onSelect={openProductModal}
                  />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile carousel controls — 44px touch targets */}
          <div className="flex md:hidden items-center justify-center gap-3 mt-8">
            <button
              type="button"
              aria-label={t.products.prev}
              onClick={goPrev}
              className="touch-target tactile-active luxury-card rounded-full transform-gpu will-change-transform"
            >
              <PrevIcon className="w-5 h-5 text-arkan-navy" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`${t.products.page} ${i + 1}`}
                  aria-current={i === page ? "true" : undefined}
                  onClick={() => setPage(i)}
                  className="touch-target !min-w-11 !min-h-11 tactile-active rounded-full"
                >
                  <span
                    className={`block rounded-full transition-all duration-200 ${
                      i === page
                        ? "w-6 h-2 bg-arkan-orange"
                        : "w-2 h-2 bg-arkan-navy/20"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label={t.products.next}
              onClick={goNext}
              className="touch-target tactile-active luxury-card rounded-full transform-gpu will-change-transform"
            >
              <NextIcon className="w-5 h-5 text-arkan-navy" />
            </button>
          </div>

          <div className="hidden md:flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: maxPage + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${t.products.page} ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arkan-orange/50 ${
                  i === page
                    ? "w-8 bg-arkan-orange"
                    : "w-2 bg-arkan-navy/15 hover:bg-arkan-navy/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product modal — full-screen sheet on mobile */}
      <AnimatePresence>
        {selectedProduct && (
          <div
            className="fixed inset-0 z-[200] flex items-end md:items-center justify-center md:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            style={{ pointerEvents: modalInteractive ? "auto" : "none" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closeProductModal}
              className="absolute inset-0 bg-arkan-navy-deep/80 max-md:bg-arkan-navy-deep/85 transform-gpu"
            />
            <motion.div
              initial={{ y: isMobile ? "100%" : 24, opacity: isMobile ? 1 : 0, scale: isMobile ? 1 : 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: isMobile ? "100%" : 24, opacity: isMobile ? 1 : 0, scale: isMobile ? 1 : 0.96 }}
              transition={mobileSpring}
              className="relative w-full max-w-4xl max-h-[92dvh] md:max-h-none luxury-card rounded-t-3xl md:rounded-3xl overflow-hidden shadow-premium-hover flex flex-col md:flex-row z-10 transform-gpu will-change-transform"
            >
              <button
                type="button"
                onClick={closeProductModal}
                className="absolute top-3 start-3 z-50 touch-target tactile-active bg-white rounded-full shadow-arkan-card border border-black/5 transform-gpu"
                aria-label={t.common.close}
              >
                <X className="w-5 h-5 text-arkan-navy" />
              </button>

              <div className="w-full md:w-1/2 relative bg-gradient-to-br from-arkan-orange-light/30 to-arkan-beige min-h-[220px] sm:min-h-[260px] md:min-h-[480px] border-b md:border-b-0 md:border-e border-black/5 shrink-0">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover md:object-contain p-4 md:p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={70}
                />
              </div>

              <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center overflow-y-auto overscroll-contain">
                <div
                  className={`inline-block px-4 py-1.5 rounded-full text-white font-bold text-sm mb-4 self-start border border-white/10 ${selectedProduct.badgeColor}`}
                >
                  {selectedProduct.badge}
                </div>
                <h3
                  id="product-modal-title"
                  className="text-2xl sm:text-3xl md:text-4xl font-black text-arkan-navy mb-3 leading-[1.15]"
                >
                  {selectedProduct.title}
                </h3>
                <p className="text-arkan-navy/70 text-sm sm:text-base md:text-lg mb-6 leading-relaxed font-medium">
                  {selectedProduct.desc}. {t.products.modalExtra}
                </p>

                <h4 className="font-black text-arkan-orange mb-2 text-xs uppercase tracking-wide">
                  {t.products.features}
                </h4>
                <ul className="space-y-2 mb-6">
                  {selectedProduct.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-3 text-arkan-navy font-bold text-sm"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                        <svg
                          className="w-3.5 h-3.5 text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-auto pt-2">
                  <span className="text-xl sm:text-2xl font-black text-arkan-navy sm:me-2">
                    {selectedProduct.weight}
                  </span>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    transition={mobileSpring}
                    onClick={() => handleAddToCart(selectedProduct.title)}
                    className="flex-1 min-h-[48px] bg-arkan-orange active:bg-arkan-orange-hover text-white py-3.5 px-6 rounded-2xl font-black text-base transition-colors flex items-center justify-center gap-3 shadow-premium border border-white/10 tactile-active transform-gpu will-change-transform"
                  >
                    <ShoppingCart className="w-5 h-5 shrink-0" />
                    {t.products.addToCart}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
