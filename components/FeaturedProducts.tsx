"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "./ToastProvider";

const products = [
  {
    id: 1,
    title: "برجر بقري",
    desc: "برجر بقري بخلطة البهارات العربية الأصيلة",
    badge: "برجر بقري",
    badgeColor: "bg-arkan-orange",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    weight: "1344غ",
    features: ["خالي من الألوان الاصطناعية", "خالي من المواد الحافظة", "حلال"],
  },
  {
    id: 2,
    title: "بطاطس مقلية",
    desc: "بطاطس عالية الجودة مقرمشة وجاهزة للتقديم",
    badge: "بطاطس مقلية",
    badgeColor: "bg-green-600",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=600&auto=format&fit=crop",
    weight: "2500غ",
    features: ["خالي من الزيوت المهدرجة", "خالي من المواد الحافظة"],
  },
  {
    id: 3,
    title: "لحمة مفرومة",
    desc: "لحمة مفرومة طازجة وعالية الجودة",
    badge: "لحمة مفرومة",
    badgeColor: "bg-red-700",
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=600&auto=format&fit=crop",
    weight: "400غ",
    features: ["لحم بقر صافي 100%", "حلال"],
  },
  {
    id: 4,
    title: "لحم مبرد",
    desc: "قطع لحم مبردة طازجة يومياً",
    badge: "لحم مبرد",
    badgeColor: "bg-blue-600",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
    weight: "1000غ",
    features: ["طازج يومياً", "جودة فائقة"],
  },
  {
    id: 5,
    title: "ستربس دجاج",
    desc: "قطع دجاج مقرمشة بتتبيلة حارة مميزة",
    badge: "ستربس دجاج",
    badgeColor: "bg-red-600",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600&auto=format&fit=crop",
    weight: "750غ",
    features: ["لحم صدر دجاج صافي 100%", "مقرمش ولذيذ"],
  }
];

export default function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const { addToast } = useToast();

  const handleAddToCart = (productTitle: string) => {
    addToast(`تم إضافة ${productTitle} إلى السلة بنجاح!`);
    setSelectedProduct(null); // Optional: close modal
  };

  return (
    <section id="products" className="relative py-20 overflow-hidden">
      {/* Clean Solid Background */}
      <div className="absolute inset-0 z-0 bg-[#FFF9F2]" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
         <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-arkan-navy mb-4 drop-shadow-sm">
            منتجاتنا المميزة
          </h2>
          <h3 className="text-2xl text-arkan-orange font-bold mb-6">
            منتجات لا تقاوم
          </h3>
          <p className="max-w-3xl mx-auto text-arkan-navy/80 font-medium text-lg mb-16 leading-relaxed">
            نجتهد في أركان لتحضير منتجاتنا بكل حب و شغف، لنقدم للمستهلكين تشكيلة واسعة محضرة بعناية فائقة و جودة ممتازة من المنتجات ال...
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center gap-6">
           {/* Left Arrow */}
           <button className="hidden md:flex absolute -right-12 w-12 h-12 bg-white/50 backdrop-blur rounded-full items-center justify-center hover:bg-white shadow-sm hover:shadow-md transition-all z-30 group">
              <svg className="w-6 h-6 text-arkan-navy rotate-180 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
           </button>

           <div className="flex flex-wrap justify-center gap-8 w-full">
              {products.map((product, idx) => (
                 <motion.div 
                   key={product.id}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ delay: idx * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
                   onClick={() => setSelectedProduct(product)}
                   className="w-full cursor-pointer md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] flex flex-col bg-white rounded-3xl shadow-lg border border-black/5 overflow-hidden group hover:shadow-premium transition-all duration-300 transform hover:-translate-y-2"
                 >
                    {/* Image Area simulating packaging */}
                    <div className="relative h-64 bg-gray-50/50 flex items-center justify-center overflow-hidden p-6 shrink-0">
                       <Image 
                         src={product.image}
                         alt={product.title}
                         fill
                         className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                       
                       {/* Brand Badge on Product */}
                       <div className="absolute top-4 right-4 z-20 w-16 h-10 bg-arkan-orange text-white rounded-[40%] flex items-center justify-center font-bold text-sm shadow-md border-2 border-white transform group-hover:rotate-6 transition-transform">
                         أركان
                       </div>
                    </div>

                    <div className="p-0 relative z-20 bg-white flex flex-col flex-1">
                        <div className={`text-white text-center font-bold text-lg py-3 ${product.badgeColor} w-full`}>
                          {product.title}
                        </div>
                        <div className="p-6 flex flex-col flex-1 justify-between">
                           <ul className="space-y-3 mb-6 text-right">
                             {product.features.map((feat, i) => (
                               <li key={i} className="flex items-center gap-2 text-sm text-gray-600 justify-end flex-row-reverse">
                                 <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                                 {feat}
                               </li>
                             ))}
                           </ul>
                           <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
                              <span className="text-gray-500 font-bold">{product.weight}</span>
                              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold text-xs text-arkan-navy group-hover:bg-arkan-orange group-hover:text-white group-hover:border-arkan-orange transition-colors">حلال</div>
                           </div>
                        </div>
                    </div>
                 </motion.div>
              ))}
           </div>

           {/* Right Arrow */}
           <button className="hidden md:flex absolute -left-12 w-12 h-12 bg-white/50 backdrop-blur rounded-full items-center justify-center hover:bg-white shadow-sm hover:shadow-md transition-all z-30 group">
              <svg className="w-6 h-6 text-arkan-navy group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
           </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 left-4 z-50 p-2 bg-white/80 backdrop-blur hover:bg-white rounded-full shadow-md transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-arkan-navy" />
              </button>
              
              {/* Product Image Section */}
              <div className="w-full md:w-1/2 relative bg-gray-50 h-64 md:h-auto p-8 flex items-center justify-center shrink-0">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover md:object-contain mix-blend-multiply"
                />
              </div>

              {/* Product Details Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className={`inline-block px-4 py-1 rounded-full text-white font-bold text-sm mb-6 self-start ${selectedProduct.badgeColor}`}>
                  {selectedProduct.badge}
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-arkan-navy mb-4 leading-tight">
                  {selectedProduct.title}
                </h3>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed font-medium">
                  {selectedProduct.desc}. نقدم لك في أركان أفضل المكونات الطازجة لتبدع في مطبخك وتقدم أشهى الأطباق لعائلتك بكل ثقة.
                </p>
                
                <h4 className="font-bold text-arkan-orange mb-3">المميزات:</h4>
                <ul className="space-y-3 mb-8">
                  {selectedProduct.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-arkan-navy font-bold">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-4 mt-auto">
                    <span className="text-2xl font-black text-arkan-navy">{selectedProduct.weight}</span>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(selectedProduct.title)}
                      className="flex-1 bg-arkan-orange hover:bg-arkan-orange-hover text-white py-4 px-6 rounded-xl font-black text-lg transition-colors flex items-center justify-center gap-3 shadow-premium-hover outline-none focus-visible:ring-4 focus-visible:ring-arkan-orange/30"
                    >
                      <ShoppingCart className="w-6 h-6" />
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
