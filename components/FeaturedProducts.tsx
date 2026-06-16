"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "./ToastProvider";
import { fluidSpring, revealTransition } from "@/lib/motion";

const products = [
  {
    id: 1,
    title: "برجر بقري",
    desc: "برجر بقري بخلطة البهارات العربية الأصيلة",
    badge: "برجر بقري",
    badgeColor: "bg-arkan-orange",
    accentRing: "ring-arkan-orange/20",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    weight: "1344غ",
    features: ["خالي من الألوان الاصطناعية", "خالي من المواد الحافظة", "حلال"],
  },
  {
    id: 2,
    title: "بطاطس مقلية",
    desc: "بطاطس عالية الجودة مقرمشة وجاهزة للتقديم",
    badge: "بطاطس مقلية",
    badgeColor: "bg-emerald-600",
    accentRing: "ring-emerald-500/20",
    image:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=600&auto=format&fit=crop",
    weight: "2500غ",
    features: ["خالي من الزيوت المهدرجة", "خالي من المواد الحافظة"],
  },
  {
    id: 3,
    title: "لحمة مفرومة",
    desc: "لحمة مفرومة طازجة وعالية الجودة",
    badge: "لحمة مفرومة",
    badgeColor: "bg-red-700",
    accentRing: "ring-red-500/20",
    image:
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=600&auto=format&fit=crop",
    weight: "400غ",
    features: ["لحم بقر صافي 100%", "حلال"],
  },
  {
    id: 4,
    title: "لحم مبرد",
    desc: "قطع لحم مبردة طازجة يومياً",
    badge: "لحم مبرد",
    badgeColor: "bg-blue-600",
    accentRing: "ring-blue-500/20",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
    weight: "1000غ",
    features: ["طازج يومياً", "جودة فائقة"],
  },
  {
    id: 5,
    title: "ستربس دجاج",
    desc: "قطع دجاج مقرمشة بتتبيلة حارة مميزة",
    badge: "ستربس دجاج",
    badgeColor: "bg-red-600",
    accentRing: "ring-red-500/20",
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop",
    weight: "750غ",
    features: ["لحم صدر دجاج صافي 100%", "مقرمش ولذيذ"],
  },
];

type Product = (typeof products)[0];

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function useVisibleCount() {
  const [count, setCount] = useState(getVisibleCount);

  useEffect(() => {
    const update = () => setCount(getVisibleCount());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return count;
}

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(0);
  const visibleCount = useVisibleCount();
  const { addToast } = useToast();

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

  const handleAddToCart = (productTitle: string) => {
    addToast(`تم إضافة ${productTitle} إلى السلة بنجاح!`);
    setSelectedProduct(null);
  };

  return (
    <section id="products" className="relative section-padding overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-arkan-beige via-[#FFF5EB] to-white" />
      <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_top,rgba(232,93,4,0.08),transparent_60%)]" />
      <div className="texture-overlay absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={revealTransition}
          className="text-center mb-14 md:mb-20 transform-gpu will-change-[transform,opacity]"
        >
          <h2 className="section-heading mb-5">منتجاتنا المميزة</h2>
          <h3 className="section-subheading mb-6">منتجات لا تقاوم</h3>
          <p className="section-body mx-auto">
            نجتهد في أركان لتحضير منتجاتنا بكل حب وشغف، لنقدم للمستهلكين تشكيلة
            واسعة محضرة بعناية فائقة وجودة ممتازة — من البرجر إلى الدجاج المقرمش،
            كل منتج يحمل توقيع الجودة الذي عرفتمونا به.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          <motion.button
            type="button"
            aria-label="المنتجات السابقة"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={fluidSpring}
            onClick={goPrev}
            className="hidden md:flex absolute -right-4 lg:-right-14 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full items-center justify-center shadow-arkan-card hover:shadow-premium border border-white/60 z-20 transition-shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-arkan-orange/30 transform-gpu will-change-transform"
          >
            <ChevronRight className="w-6 h-6 text-arkan-navy" />
          </motion.button>
          <motion.button
            type="button"
            aria-label="المنتجات التالية"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={fluidSpring}
            onClick={goNext}
            className="hidden md:flex absolute -left-4 lg:-left-14 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full items-center justify-center shadow-arkan-card hover:shadow-premium border border-white/60 z-20 transition-shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-arkan-orange/30 transform-gpu will-change-transform"
          >
            <ChevronLeft className="w-6 h-6 text-arkan-navy" />
          </motion.button>

          {/* Product cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${page}-${visibleCount}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transform-gpu will-change-[opacity]"
            >
              {visibleProducts.map((product, idx) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.06,
                    ...revealTransition,
                  }}
                  onClick={() => setSelectedProduct(product)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProduct(product);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`عرض تفاصيل ${product.title}`}
                  className={`group flex flex-col bg-white rounded-3xl shadow-arkan-card border border-white/80 overflow-hidden cursor-pointer hover:shadow-premium-hover hover:-translate-y-1.5 transition-all duration-300 ring-1 ${product.accentRing} focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-arkan-orange/40 transform-gpu will-change-transform`}
                >
                  {/* Image */}
                  <div className="relative h-60 md:h-64 bg-gradient-to-br from-arkan-orange-light/40 via-white to-arkan-beige/60 flex items-center justify-center overflow-hidden shrink-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 transform-gpu"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-arkan-navy/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                    {/* Brand badge */}
                    <div className="absolute top-4 right-4 z-10 w-[4.5rem] h-9 bg-arkan-orange text-white rounded-[38%] flex items-center justify-center font-bold text-sm shadow-glass border-2 border-white/90 group-hover:rotate-3 transition-transform duration-300">
                      أركان
                    </div>

                    {/* Quick view hint */}
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-bold text-arkan-navy opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm transform-gpu">
                      <Plus className="w-3.5 h-3.5" />
                      عرض التفاصيل
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <div
                      className={`text-white text-center font-bold text-base md:text-lg py-3 ${product.badgeColor}`}
                    >
                      {product.title}
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <ul className="space-y-2.5 mb-5 text-right flex-1">
                        {product.features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-center gap-2 text-sm text-arkan-navy/70 justify-end flex-row-reverse leading-relaxed"
                          >
                            <svg
                              className="w-4 h-4 text-emerald-500 shrink-0"
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
                            {feat}
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-center border-t border-arkan-navy/8 pt-4 mt-auto">
                        <span className="text-arkan-navy/60 font-bold text-sm">
                          {product.weight}
                        </span>
                        <span className="w-9 h-9 rounded-full border border-arkan-navy/10 flex items-center justify-center text-xs font-black text-arkan-navy group-hover:bg-arkan-orange group-hover:text-white group-hover:border-arkan-orange transition-colors duration-300">
                          حلال
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Mobile arrows + pagination */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-8">
            <button
              type="button"
              aria-label="السابق"
              onClick={goPrev}
              className="w-10 h-10 bg-white rounded-full shadow-arkan-card flex items-center justify-center border border-arkan-navy/5"
            >
              <ChevronRight className="w-5 h-5 text-arkan-navy" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxPage + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`صفحة ${i + 1}`}
                  onClick={() => setPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === page ? "w-6 bg-arkan-orange" : "w-2 bg-arkan-navy/20"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="التالي"
              onClick={goNext}
              className="w-10 h-10 bg-white rounded-full shadow-arkan-card flex items-center justify-center border border-arkan-navy/5"
            >
              <ChevronLeft className="w-5 h-5 text-arkan-navy" />
            </button>
          </div>

          {/* Desktop pagination dots */}
          <div className="hidden md:flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: maxPage + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`صفحة ${i + 1}`}
                onClick={() => setPage(i)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arkan-orange/50 ${
                  i === page ? "w-8 bg-arkan-orange" : "w-2 bg-arkan-navy/15 hover:bg-arkan-navy/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product detail modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-arkan-navy-deep/75"
            />
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-premium-hover flex flex-col md:flex-row z-10 border border-white/20"
            >
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 left-4 z-50 p-2.5 bg-white hover:bg-gray-50 rounded-full shadow-arkan-card transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-arkan-orange/30"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5 text-arkan-navy" />
              </button>

              <div className="w-full md:w-1/2 relative bg-gradient-to-br from-arkan-orange-light/30 to-arkan-beige min-h-[260px] md:min-h-[480px]">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover md:object-contain p-4 md:p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <div
                  className={`inline-block px-4 py-1.5 rounded-full text-white font-bold text-sm mb-5 self-start ${selectedProduct.badgeColor}`}
                >
                  {selectedProduct.badge}
                </div>
                <h3
                  id="product-modal-title"
                  className="text-3xl md:text-4xl font-black text-arkan-navy mb-4 leading-[1.15]"
                >
                  {selectedProduct.title}
                </h3>
                <p className="text-arkan-navy/70 text-base md:text-lg mb-8 leading-[1.85] font-medium">
                  {selectedProduct.desc}. نقدم لك في أركان أفضل المكونات الطازجة
                  لتبدع في مطبخك وتقدم أشهى الأطباق لعائلتك بكل ثقة.
                </p>

                <h4 className="font-black text-arkan-orange mb-3 text-sm uppercase tracking-wide">
                  المميزات
                </h4>
                <ul className="space-y-3 mb-8">
                  {selectedProduct.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-3 text-arkan-navy font-bold text-sm md:text-base"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
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

                <div className="flex flex-wrap items-center gap-4 mt-auto">
                  <span className="text-2xl font-black text-arkan-navy">
                    {selectedProduct.weight}
                  </span>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={fluidSpring}
                    onClick={() => handleAddToCart(selectedProduct.title)}
                    className="flex-1 min-w-[180px] bg-arkan-orange hover:bg-arkan-orange-hover text-white py-4 px-6 rounded-2xl font-black text-base md:text-lg transition-colors flex items-center justify-center gap-3 shadow-premium hover:shadow-premium-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-arkan-orange/30"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    أضف إلى السلة
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
