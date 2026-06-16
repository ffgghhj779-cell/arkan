"use client";

import Image from "next/image";
import { useToast } from "./ToastProvider";

export default function SplitFeatures() {
  const { addToast } = useToast();

  const handleAction = (title: string) => {
    addToast(`جاري استكشاف ${title}...`);
  };

  return (
    <section id="benefits" className="w-full flex flex-col md:flex-row border-t-8 border-[#00B4D8]"> {/* Using the cyan border strip seen in screenshot */}
       {/* Left Column (RTL so this is actually the right half in code visually, but logically the first div) */}
       <div 
         className="w-full md:w-1/2 h-[500px] relative group cursor-pointer overflow-hidden"
         onClick={() => handleAction("فوائد التجميد")}
       >
          {/* Collage of images under overlay */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0 group-hover:scale-105 transition-transform duration-700">
             <div className="relative w-full h-full"><Image src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400&auto=format&fit=crop" alt="food" fill className="object-cover" /></div>
             <div className="relative w-full h-full"><Image src="https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=400&auto=format&fit=crop" alt="food" fill className="object-cover" /></div>
             <div className="relative w-full h-full"><Image src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop" alt="food" fill className="object-cover" /></div>
             <div className="relative w-full h-full"><Image src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop" alt="food" fill className="object-cover" /></div>
             <div className="relative w-full h-full"><Image src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop" alt="food" fill className="object-cover" /></div>
             <div className="relative w-full h-full"><Image src="https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop" alt="food" fill className="object-cover" /></div>
          </div>
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
          
          <div className="absolute inset-0 flex items-center justify-center p-4">
             <div className="bg-[#E85D04]/85 backdrop-blur-sm w-3/4 h-1/2 flex items-center justify-center shadow-xl border border-white/10 group-hover:bg-arkan-orange transition-colors">
                <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-md">
                   فوائد التجميد
                </h2>
             </div>
          </div>
       </div>

       {/* Right Column */}
       <div 
         className="w-full md:w-1/2 h-[500px] relative group cursor-pointer overflow-hidden"
         onClick={() => handleAction("قصة نجاح أركان")}
       >
          <Image 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop"
            alt="Farm Landscape"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />

          <div className="absolute inset-0 flex items-center justify-center p-4">
             <div className="bg-[#E85D04]/85 backdrop-blur-sm w-3/4 h-1/2 flex items-center justify-center shadow-xl border border-white/10 group-hover:bg-arkan-orange transition-colors">
                <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-md">
                   قصة نجاح أركان
                </h2>
             </div>
          </div>
       </div>
    </section>
  );
}
