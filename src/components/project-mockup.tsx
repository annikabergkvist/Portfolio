"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { BlockImageSaveUI } from "@/components/block-image-save-ui";
import { cn } from "@/lib/utils";

export type ProjectMockupProps = {
  src: string;
  alt: string;
  floatDurationMs?: number;
  floatDelayMs?: number;
  className?: string;
  priority?: boolean;
};

export function ProjectMockup({
  src,
  alt,
  floatDurationMs = 6200,
  floatDelayMs = 0,
  className,
  priority = false,
}: ProjectMockupProps) {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  const sizes = useMemo(
    () => "(min-width: 1024px) 58vw, 94vw",
    [],
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <motion.div
      className={cn(
        // big + bold: roughly half+ viewport height on desktop
        "relative mx-auto flex w-full max-w-[980px] items-start justify-center",
        "min-h-[20rem] pt-2 sm:pt-3 pb-4 sm:pb-6",
        // allow the mockup to feel slightly breakout
        "overflow-visible",
        className,
      )}
      animate={
        reduceMotion || isMobile
          ? undefined
          : {
              y: [0, -12, 0],
            }
      }
      transition={
        reduceMotion || isMobile
          ? undefined
          : {
              duration: floatDurationMs / 1000,
              delay: floatDelayMs / 1000,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }
      }
    >
      {/* Rose-gold glow behind */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "rounded-[28px]",
          "bg-[radial-gradient(closest-side,rgba(183,110,121,0.32),transparent_70%)]",
          "blur-2xl opacity-90",
        )}
      />

      {/* Soft shadow pad to make PNG feel like it floats */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[34px] bg-black/25 blur-2xl"
      />

      <BlockImageSaveUI className="relative w-full">
        <Image
          src={src}
          alt={alt}
          width={2000}
          height={1500}
          sizes={sizes}
          unoptimized
          priority={priority}
          draggable={false}
          className={cn(
            // oversized/impactful
            "mx-auto h-auto w-[102%] max-w-none select-none",
            // floating transparent PNG feel
            "drop-shadow-[0_40px_90px_rgba(0,0,0,0.6)]",
          )}
        />
      </BlockImageSaveUI>
    </motion.div>
  );
}
