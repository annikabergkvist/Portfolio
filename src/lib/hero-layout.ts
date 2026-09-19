/**
 * Hero top padding: below `xl`, layout already offsets the header (`pt-16`). Desktop sits
 * the copy in the visual field rather than under a large empty band.
 */
export const HERO_SECTION_TOP_CLASS = "max-xl:pt-6 xl:pt-0";

/**
 * Centered copy, optically sitting in the hero field so the WebGL curtain
 * and the sentence share the first screen.
 */
export const HERO_MAIN_BLOCK_LAYOUT_CLASS =
  "flex min-h-0 flex-1 flex-col items-center justify-center text-center -translate-y-[min(6.5dvh,3.25rem)]";

/**
 * Below `xl`, layout keeps `pt-16` for the mobile header — min-height subtracts 4rem so
 * the hero (and chevron) fits the first viewport. `xl+`: no header offset, tall hero.
 */
export const HERO_SECTION_MIN_HEIGHT_CLASS =
  "min-h-[calc(100svh-4rem)] xl:min-h-[115dvh]";

/** Home logo above rotated nav (xl+). */
export const SIDEBAR_LOGO_TOP_CLASS = "pt-24 mb-8";

/** Fixed sidebar nav (xl+). Space between logo block and first link. */
export const SIDEBAR_NAV_TOP_CLASS = "pt-8";
