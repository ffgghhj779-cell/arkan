"use client";

import { Beef, Carrot, Drumstick, Pizza, Info, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "./ToastProvider";

const categories = [
  { id: 1, title: "الخضروات", icon: Carrot },
  { id: 2, title: "منتجات البرغر", icon: Beef },
  { id: 3, title: "منتجات البقسماط", icon: Pizza },
  { id: 4, title: "قطع دجاج مثالية", icon: Drumstick },
  { id: 5, title: "دجاج كامل", icon: Drumstick },
];

export default function ProductCategories() {
  const [activeCat, setActiveCat] = useState(5);
  const { addToast } = useToast();

  const handleCatChange = (id: number, title: string) => {
    setActiveCat(id);
    addToast(`تم تصفية المنتجات لـ: ${title}`);
  };

  return (
    <section className="relative w-full z-10 flex flex-col items-center justify-center pt-16">
       {/* Background Split (Orange top, Beige bottom) */}
       <div className="absolute inset-0 flex flex-col z-0">
          <div className="h-1/2 bg-arkan-orange w-full" />
          <div className="h-1/2 bg-arkan-beige w-full" />
       </div>

       <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-10 drop-shadow-sm">
             مجموعة منتجاتنا
          </h2>

          <div className="flex items-center justify-center gap-2 md:gap-8 w-full mt-4">
             <button className="w-8 h-8 rounded-full bg-arkan-orange-hover text-white flex items-center justify-center shadow-md">
                <ArrowRight className="w-5 h-5" />
             </button>

             <div className="flex overflow-x-auto hide-scrollbar gap-2 md:gap-4 py-4 px-2 w-full max-w-4xl justify-center items-end h-[160px]">
                {categories.map((cat) => {
                  const isActive = activeCat === cat.id;
                  return (
                    <button 
                      key={cat.id}
                      onClick={() => handleCatChange(cat.id, cat.title)}
                      className={`relative flex flex-col items-center justify-center transition-all duration-300 
                        ${isActive 
                           ? "bg-arkan-beige text-arkan-orange w-32 h-[140px] shadow-lg rounded-t-lg -mb-4 z-20 border-t-2 border-x-2 border-white/50 shrink-0" 
                           : "text-arkan-navy opacity-70 hover:opacity-100 hover:text-arkan-orange w-24 h-24 mb-4 z-10 shrink-0"
                        }`}
                    >
                       <cat.icon strokeWidth={1.5} className={`${isActive ? "w-12 h-12 mb-3" : "w-8 h-8 mb-2"}`} />
                       <span className={`text-center leading-tight ${isActive ? "font-bold text-sm" : "font-semibold text-xs"}`}>
                         {cat.title}
                       </span>
                    </button>
                  );
                })}
             </div>

             <button className="w-8 h-8 rounded-full bg-arkan-orange-hover text-white flex items-center justify-center shadow-md">
                <ArrowLeft className="w-5 h-5" />
             </button>
          </div>
       </div>
    </section>
  );
}
