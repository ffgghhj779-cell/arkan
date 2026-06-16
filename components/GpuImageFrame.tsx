"use client";

import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { gpuLayerClass, gpuLayerStyle } from "@/lib/motion";

type GpuImageFrameProps = ImageProps & {
  frameClassName?: string;
};

/** GPU-composited image wrapper — lazy by default unless priority is set */
export default function GpuImageFrame({
  frameClassName,
  className,
  priority,
  fill,
  ...props
}: GpuImageFrameProps) {
  return (
    <div
      className={cn(
        fill ? "absolute inset-0" : "relative",
        gpuLayerClass,
        frameClassName
      )}
      style={gpuLayerStyle}
    >
      <Image
        {...props}
        fill={fill}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={cn(gpuLayerClass, className)}
      />
    </div>
  );
}
