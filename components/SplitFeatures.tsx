"use client";

import Image from "next/image";
import { useToast } from "./ToastProvider";

const collageImages = [
  "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=75&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=75&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=75&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544025162-d76694265947?q=75&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=75&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562967914-608f82629710?q=75&w=300&auto=format&fit=crop",
];

export default function SplitFeatures() {
  const { addToast } = useToast();

  const handleAction = (title: string) => {
    addToast(`جاري استكشاف ${title}...`);
  };

  return (
    <section id="benefits" className="w-full flex flex-col md:flex-row border-t-8 border-[#00B4D8]">
      <div
        className="w-full md:w-1/2 h-[500px] relative group cursor-pointer overflow-hidden"
        onClick={() => handleAction("فوائد التجميد")}
      >
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0 group-hover:scale-[1.03] transition-transform duration-500 transform-gpu will-change-transform">
          {collageImages.map((src, i) => (
            <div key={i} className="relative w-full h-full">
              <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" quality={70} />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-arkan-orange/90 w-3/4 h-1/2 flex items-center justify-center shadow-xl border border-white/10 group-hover:bg-arkan-orange transition-colors">
            <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-md">
              فوائد التجميد
            </h2>
          </div>
        </div>
      </div>

      <div
        className="w-full md:w-1/2 h-[500px] relative group cursor-pointer overflow-hidden"
        onClick={() => handleAction("قصة نجاح أركان")}
      >
        <Image
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=75&w=960&auto=format&fit=crop"
          alt="مزرعة أركان"
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500 transform-gpu will-change-transform"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="bg-arkan-orange/90 w-3/4 h-1/2 flex items-center justify-center shadow-xl border border-white/10 group-hover:bg-arkan-orange transition-colors">
            <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-md">
              قصة نجاح أركان
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
