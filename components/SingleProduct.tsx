"use client";

import Image from "next/image";
import { useToast } from "./ToastProvider";
import { motion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { RevealOnScroll } from "./RevealOnScroll";
import { gpuLayerClass, gpuLayerStyle, inViewViewport, mobileFadeReveal, revealTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function SingleProductHighlight() {
  const { addToast } = useToast();
  const isMobile = useIsMobile();

  const handleAction = () => {
    addToast("جاري نقلك لتصفح المجموعة كاملة!");
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-24 pb-0 -mt-1 relative z-0 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
        <RevealOnScroll className="flex-1 text-center md:text-right">
          <h2 className="text-3xl md:text-4xl font-black text-arkan-orange mb-6 leading-snug">
            أركان دجاج كامل مجمد<br />بدون أحشاء ٩٠٠غ
          </h2>
          <p className="text-arkan-navy font-bold text-lg leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
            يساعد منتجنا من الدجاج المجمد الجاهز للشواء في توفير وقت الشواء المنزلي و يتيح لكم المجال لابتكار وصفات جديدة، بالإضافة لميزة التحكم بمواصفات الحصص الغذائية.
          </p>
          <motion.button
            whileHover={isMobile ? undefined : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAction}
            className="bg-arkan-orange hover:bg-arkan-orange-hover text-white font-bold py-4 px-10 rounded-xl shadow-premium-hover transition-colors inline-block outline-none focus-visible:ring-4 focus-visible:ring-arkan-orange/30 transform-gpu will-change-transform"
          >
            عرض المنتجات
          </motion.button>
        </RevealOnScroll>

        <motion.div
          initial={isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
          whileInView={isMobile ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={inViewViewport}
          transition={isMobile ? mobileFadeReveal : revealTransition}
          className={cn("flex-1 flex justify-center pb-20 relative", gpuLayerClass)}
          style={gpuLayerStyle}
        >
          <div className={cn("relative w-64 h-[400px]", gpuLayerClass)} style={gpuLayerStyle}>
            <Image
              src="https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=800&auto=format&fit=crop"
              alt="Whole Frozen Chicken"
              fill
              loading="lazy"
              className="object-contain drop-shadow-2xl md:hover:scale-105 md:transition-transform md:duration-500 mix-blend-multiply transform-gpu"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={inViewViewport}
              transition={{ delay: isMobile ? 0 : 0.3, ...mobileFadeReveal }}
              className="absolute inset-x-4 bottom-16 h-24 bg-white/90 backdrop-blur rounded-2xl p-2 flex flex-col items-center justify-center border-t-4 border-arkan-orange shadow-premium transform-gpu will-change-transform"
            >
              <div className="w-12 h-6 bg-arkan-orange text-white rounded-[40%] flex items-center justify-center font-bold text-[10px] mb-1">
                أركان
              </div>
              <span className="text-xs font-bold text-arkan-navy mt-1">دجاج شواية مجمد</span>
              <span className="text-[10px] font-bold text-arkan-orange mt-1">الوزن الصافي ٩٠٠ غرام</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
