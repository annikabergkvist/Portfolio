import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

function HeroWord({
  children,
  highlight = false,
}: {
  children: string;
  highlight?: boolean;
}) {
  return (
    <span
      className={cn(
        "hero-word inline-block bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent",
        highlight ? "opacity-100" : "opacity-60",
      )}
    >
      {children}
    </span>
  );
}

function HeroLine({ children }: { children: ReactNode }) {
  return (
    <span className="flex flex-wrap justify-center gap-x-[0.25em] overflow-visible">
      {children}
    </span>
  );
}

export function HeroHeadline() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
      <h1
        className={cn(
          "hero-copy-enter flex flex-col items-center overflow-visible font-manrope font-medium tracking-tighter",
          "gap-y-1 leading-[1.1] sm:gap-y-2",
          "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
        )}
      >
        <HeroLine>
          <HeroWord>From</HeroWord>
          <HeroWord>research</HeroWord>
        </HeroLine>
        <HeroLine>
          <HeroWord>to</HeroWord>
          <HeroWord>interface</HeroWord>
          <HeroWord>design</HeroWord>
        </HeroLine>
        <HeroLine>
          <HeroWord>to</HeroWord>
          <HeroWord>code</HeroWord>
          <HeroWord>that</HeroWord>
          <HeroWord highlight>ships.</HeroWord>
        </HeroLine>
      </h1>
      <p
        className={cn(
          "hero-copy-enter-delayed mt-8 max-w-3xl font-manrope text-xl font-medium leading-relaxed tracking-normal text-white/80 md:mt-10 md:text-2xl",
        )}
      >
        I take product interfaces through UX and UI, then write the production
        frontend.
      </p>
    </div>
  );
}
