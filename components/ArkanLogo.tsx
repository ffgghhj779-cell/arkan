import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 1536;
const LOGO_HEIGHT = 1024;

type ArkanLogoProps = {
  variant?: "navbar" | "footer";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export default function ArkanLogo({
  variant = "navbar",
  className,
  imageClassName,
  priority = false,
}: ArkanLogoProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        variant === "navbar" &&
          "rounded-2xl bg-white px-3 py-2 shadow-premium border-2 border-white/90",
        variant === "footer" &&
          "rounded-2xl bg-white px-4 py-3 shadow-premium border-2 border-white/90",
        className
      )}
    >
      <Image
        src="/logo.png"
        alt="Arkan Food Industry Logo"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        className={cn(
          "h-auto object-contain",
          variant === "navbar" && "w-28 md:w-36 lg:w-40",
          variant === "footer" && "w-36 md:w-40 lg:w-44",
          imageClassName
        )}
      />
    </div>
  );
}
