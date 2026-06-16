"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  gpuLayerClass,
  gpuLayerStyle,
  inViewViewport,
  mobileFadeReveal,
  revealTransition,
} from "@/lib/motion";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

export function RevealOnScroll({
  children,
  className,
  disabled = false,
}: RevealOnScrollProps) {
  const isMobile = useIsMobile();

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={inViewViewport}
      transition={isMobile ? mobileFadeReveal : revealTransition}
      className={cn(gpuLayerClass, className)}
      style={gpuLayerStyle}
    >
      {children}
    </motion.div>
  );
}
