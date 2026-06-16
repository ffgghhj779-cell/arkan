"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useToast } from "./ToastProvider";

export default function HeroBanner() {
  const { addToast } = useToast();

  const handleLearnMore = () => {
    addToast("جاري استكشاف تاريخ أركان العريق!");
  };

  return (
    <section id="about" className="relative w-full h-[600px] overflow-hidden bg-arkan-navy flex items-center justify-center">
      {/* Abstract Animated Arcs background to simulate the stage in screenshot */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
         <div className="absolute w-[200vw] h-[200vw] border-[100px] border-arkan-orange rounded-full bottom-[-150vw] opacity-80 shadow-2xl" />
         <div className="absolute w-[180vw] h-[180vw] border-[60px] border-[#FFF3E0] rounded-full bottom-[-130vw] opacity-10" />
         <div className="absolute w-[150vw] h-[150vw] border-[40px] border-white rounded-full bottom-[-100vw] opacity-5" />
      </div>

      {/* People / Models Placeholder */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
         {/* Center Person */}
         <div className="relative w-full max-w-5xl h-full flex items-end justify-center">
            {/* Example of food lifestyle image as a stand-in for the people in the seats */}
            <Image 
              src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1400&auto=format&fit=crop"
              alt="Family eating"
              className="absolute bottom-0 opacity-40 mix-blend-overlay w-full h-[80%] object-cover object-bottom rounded-t-full mask-image-b"
              width={1400}
              height={800}
            />
         </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 text-center w-full mt-[-100px]">
        {/* The prominent animated text */}
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="flex flex-col items-center justify-center"
        >
          <h1 className="text-6xl md:text-8xl font-black text-[#FFD54F] drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-4 leading-tight">
            يا لذُّة<br />ما جربتها
          </h1>
          
          {/* Logo Badge in Center */}
          <div 
            onClick={handleLearnMore}
            className="w-32 h-20 bg-arkan-orange text-white rounded-[40%] flex flex-col items-center justify-center font-black text-2xl shadow-xl border-4 border-white transform -rotate-3 hover:rotate-0 transition-all cursor-pointer hover:scale-110 active:scale-95 leading-none pt-1"
          >
              <span className="text-xs tracking-widest uppercase mb-1">Arkan</span>
              <span>أركان</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mt-4">
             يا تحبها
          </h2>
        </motion.div>
      </div>

      {/* Navigation arrows (decorative) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-30 cursor-pointer hover:bg-white/40 transition-colors">
        <svg className="w-6 h-6 text-white rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center z-30 cursor-pointer hover:bg-white/40 transition-colors">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
      </div>
    </section>
  );
}
