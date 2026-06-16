"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Plus } from "lucide-react";
import type { ProductId } from "@/lib/i18n/translations";
import { gpuLayerClass, gpuLayerStyle } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type ProductView = {
  id: ProductId;
  title: string;
  desc: string;
  badge: string;
  weight: string;
  features: string[];
  badgeColor: string;
  accentRing: string;
  image: string;
};

type ProductCardProps = {
  product: ProductView;
  brandBadge: string;
  halalLabel: string;
  quickViewLabel: string;
  viewDetailsLabel: string;
  isRtl: boolean;
  variants?: Variants;
  onSelect: (product: ProductView) => void;
};

const cardClass = (accentRing: string) =>
  `group flex flex-col luxury-card rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer ring-1 ${accentRing} focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-arkan-orange/40 transform-gpu will-change-transform tactile-active max-md:active:scale-[0.98] md:transition-all md:duration-300 md:hover:shadow-premium-hover hover-lift`;

function ProductCardContent({
  product,
  brandBadge,
  halalLabel,
  quickViewLabel,
  isRtl,
}: Omit<ProductCardProps, "variants" | "onSelect" | "viewDetailsLabel">) {
  return (
    <>
      <div
        className={cn(
          "relative h-52 sm:h-60 md:h-64 bg-gradient-to-br from-arkan-orange-light/40 via-white to-arkan-beige/60 overflow-hidden shrink-0 border-b border-black/5",
          gpuLayerClass
        )}
        style={gpuLayerStyle}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          loading="lazy"
          className="object-cover transform-gpu md:transition-transform md:duration-500 md:group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={70}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-arkan-navy/20 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="absolute top-3 end-3 z-10 min-h-9 px-3 bg-arkan-orange text-white rounded-full flex items-center justify-center font-bold text-xs border border-white/20 shadow-sm">
          {brandBadge}
        </div>

        <div className="absolute bottom-3 start-3 z-10 flex items-center gap-1.5 px-3 py-2 min-h-11 glass-overlay rounded-full text-xs font-bold text-arkan-navy opacity-90 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-200 transform-gpu pointer-events-none">
          <Plus className="w-3.5 h-3.5 shrink-0" />
          {quickViewLabel}
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div
          className={`text-white text-center font-bold text-base py-3 border-b border-black/5 ${product.badgeColor}`}
        >
          {product.title}
        </div>
        <div className="p-4 md:p-6 flex flex-col flex-1">
          <ul
            className={`space-y-2 mb-4 flex-1 ${isRtl ? "text-right" : "text-left"}`}
          >
            {product.features.slice(0, 3).map((feat) => (
              <li
                key={feat}
                className={`flex items-center gap-2 text-sm text-arkan-navy/70 leading-snug ${isRtl ? "flex-row-reverse justify-end" : ""}`}
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
          <div className="flex justify-between items-center border-t border-black/5 pt-3 mt-auto gap-3">
            <span className="text-arkan-navy/60 font-bold text-sm">
              {product.weight}
            </span>
            <span className="min-h-11 min-w-11 rounded-full border border-black/5 flex items-center justify-center text-xs font-black text-arkan-navy md:group-hover:bg-arkan-orange md:group-hover:text-white md:group-hover:border-arkan-orange transition-colors duration-200 px-2">
              {halalLabel}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProductCard({
  product,
  brandBadge,
  halalLabel,
  quickViewLabel,
  viewDetailsLabel,
  isRtl,
  variants,
  onSelect,
}: ProductCardProps) {
  const sharedProps = {
    onClick: () => onSelect(product),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(product);
      }
    },
    role: "button" as const,
    tabIndex: 0,
    "aria-label": `${viewDetailsLabel} ${product.title}`,
    className: cardClass(product.accentRing),
    style: gpuLayerStyle,
  };

  if (variants) {
    return (
      <motion.article variants={variants} {...sharedProps}>
        <ProductCardContent
          product={product}
          brandBadge={brandBadge}
          halalLabel={halalLabel}
          quickViewLabel={quickViewLabel}
          isRtl={isRtl}
        />
      </motion.article>
    );
  }

  return (
    <article {...sharedProps}>
      <ProductCardContent
        product={product}
        brandBadge={brandBadge}
        halalLabel={halalLabel}
        quickViewLabel={quickViewLabel}
        isRtl={isRtl}
      />
    </article>
  );
}
