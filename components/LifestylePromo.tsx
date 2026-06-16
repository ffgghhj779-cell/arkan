"use client";

import Image from "next/image";
import { useToast } from "./ToastProvider";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function LifestylePromo() {
  const { addToast } = useToast();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const handleAction = () => {
    addToast("جاري تحميل أشهى الوصفات...");
  };

  return (
    <section id="recipes" ref={ref} className="relative w-full h-[600px] overflow-hidden">
       <motion.div style={{ y }} className="absolute inset-x-0 -top-[20%] -bottom-[20%] w-full">
         <Image 
           src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop"
           alt="Grilled Chicken with Broccoli"
           fill
           className="object-cover"
         />
       </motion.div>
       {/* Dark overlay for contrast */}
       <div className="absolute inset-0 bg-black/30" />

       {/* Centered Orange Overlay Box */}
       <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#E85D04]/85 backdrop-blur-md p-14 md:p-20 max-w-3xl w-full text-center shadow-premium flex flex-col items-center justify-center border border-white/20 rounded-3xl"
          >
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-md">
               أنعش حياتك
             </h2>
             <p className="text-2xl md:text-3xl text-white/90 font-bold mb-10 leading-relaxed drop-shadow-sm">
               دجاج مشوي مع الخضار لصحة أفضل
             </p>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={handleAction}
               className="bg-white text-arkan-orange hover:bg-gray-50 font-black py-4 px-10 rounded-xl transition-colors text-lg shadow-premium outline-none focus-visible:ring-4 focus-visible:ring-white/50"
             >
                استكشف وصفات أركان
             </motion.button>
          </motion.div>
       </div>
       
       {/* Bottom accent stripe */}
       <div className="absolute bottom-0 w-full h-8 flex z-20">
          <div className="w-1/4 h-full relative"><Image src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400&auto=format&fit=crop" alt="strip1" fill className="object-cover" /></div>
          <div className="w-1/4 h-full relative"><Image src="https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=400&auto=format&fit=crop" alt="strip2" fill className="object-cover" /></div>
          <div className="w-1/4 h-full relative"><Image src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop" alt="strip3" fill className="object-cover" /></div>
          <div className="w-1/4 h-full relative"><Image src="https://images.unsplash.com/photo-1562813733-b31f71025d54?q=80&w=400&auto=format&fit=crop" alt="strip4" fill className="object-cover" /></div>
       </div>
    </section>
  );
}
