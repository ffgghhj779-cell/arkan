import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 1536;
const LOGO_HEIGHT = 1024;

type ArkanLogoProps = {
  variant?: "navbar" | "footer" | "drawer";
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
        "flex items-center justify-center shrink-0",
        variant === "navbar" && "h-full max-h-16",
        variant === "footer" && "h-auto",
        variant === "drawer" && "h-auto",
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
          "h-auto object-contain transform-gpu",
          variant !== "drawer" && "mix-blend-screen",
          variant === "navbar" && "w-24 sm:w-28 md:w-32 max-h-14",
          variant === "footer" && "w-32 md:w-36 lg:w-40 max-h-16",
          variant === "drawer" && "w-24 max-h-10",
          imageClassName
        )}
      />
    </div>
  );
}
