"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";

type ArkanBrandLockupProps = {
  variant?: "nav" | "drawer";
  priority?: boolean;
  className?: string;
};

export default function ArkanBrandLockup({
  variant = "nav",
  priority = false,
  className,
}: ArkanBrandLockupProps) {
  const { locale, t } = useLanguage();
  const isNav = variant === "nav";
  const brandName = locale === "ar" ? t.common.brand : "ARKAN";

  return (
    <div className={cn("flex items-center gap-x-3 min-w-0", className)}>
      <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt=""
          width={48}
          height={48}
          priority={priority}
          aria-hidden
          className={cn(
            "w-12 h-12 object-contain",
            isNav && "mix-blend-screen"
          )}
        />
      </div>
      <div className="flex flex-col justify-center min-w-0 gap-0.5 leading-none">
        <span
          className={cn(
            "text-xl font-black tracking-tight truncate",
            isNav ? "text-white" : "text-[#1B263B]"
          )}
        >
          {brandName}
        </span>
        <span
          className={cn(
            "text-[10px] tracking-wider font-semibold uppercase truncate",
            isNav ? "text-white/90" : "text-[#E85D04]"
          )}
        >
          {t.common.slogan}
        </span>
      </div>
    </div>
  );
}
