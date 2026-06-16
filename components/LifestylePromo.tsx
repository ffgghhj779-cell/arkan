"use client";

import Image from "next/image";
import { useToast } from "./ToastProvider";
import { motion } from "motion/react";
import { fluidSpring } from "@/lib/motion";
import { RevealOnScroll } from "./RevealOnScroll";
import GpuImageFrame from "./GpuImageFrame";

export default function LifestylePromo() {
  const { addToast } = useToast();

  const handleAction = () => {
    addToast("جاري تحميل أشهى الوصفات...");
  };

  return (
    <section id="recipes" className="relative w-full h-[600px] overflow-hidden gpu-composite">
      <GpuImageFrame
        src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=75&w=1280&auto=format&fit=crop"
        alt="دجاج مشوي مع الخضار"
        fill
        quality={75}
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
        <RevealOnScroll className="bg-arkan-orange/90 p-14 md:p-20 max-w-3xl w-full text-center shadow-premium flex flex-col items-center justify-center border border-white/20 rounded-3xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-md">
            أنعش حياتك
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 font-bold mb-10 leading-relaxed drop-shadow-sm">
            دجاج مشوي مع الخضار لصحة أفضل
          </p>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={fluidSpring}
            onClick={handleAction}
            className="bg-white text-arkan-orange hover:bg-gray-50 font-black py-4 px-10 rounded-xl transition-colors text-lg shadow-premium outline-none focus-visible:ring-4 focus-visible:ring-white/50 transform-gpu will-change-transform"
          >
            استكشف وصفات أركان
          </motion.button>
        </RevealOnScroll>
      </div>

      <div className="absolute bottom-0 w-full h-8 flex z-20">
        {[
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=75&w=200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=75&w=200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=75&w=200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1562813733-b31f71025d54?q=75&w=200&auto=format&fit=crop",
        ].map((src, i) => (
          <div key={i} className="w-1/4 h-full relative gpu-composite">
            <Image src={src} alt="" fill loading="lazy" className="object-cover transform-gpu" sizes="25vw" quality={60} />
          </div>
        ))}
      </div>
    </section>
  );
}
