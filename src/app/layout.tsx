import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { CookieConsent } from "@/components/cookie-consent";
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar, SIDEBAR_WIDTH_CLASS } from "@/components/sidebar";
import { getSiteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import "./globals.css";

/** DM Sans via next/font; sets --font-sans on <html> for globals.css / Tailwind font-sans. */
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const manrope = Manrope({
  variable: "--font-hero",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Annika Bergkvist — Design Engineer",
    template: "%s — Annika Bergkvist",
  },
  description:
    "Design Engineer based in Kristianstad, Sweden. Bridging product design and frontend development.",
  keywords: [
    "Design Engineer",
    "UX",
    "UI",
    "frontend",
    "Next.js",
    "portfolio",
    "Kristianstad",
    "Sweden",
  ],
  authors: [{ name: "Annika Bergkvist" }],
  creator: "Annika Bergkvist",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Annika Bergkvist",
    title: "Annika Bergkvist — Design Engineer",
    description:
      "Design Engineer based in Kristianstad, Sweden. Bridging product design and frontend development.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Annika Bergkvist — Design Engineer",
    description:
      "Design Engineer based in Kristianstad, Sweden. Bridging product design and frontend development.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/images/ab-logo.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout for the App Router. `children` is the active route (e.g. home `page.tsx`).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        dmSans.variable,
        manrope.variable,
        /* "dark" enables .dark CSS variables and Tailwind dark:* variants */
        "dark",
      )}
    >
      {/*
        Below xl: mobile header + pt-16. From xl: in-flow w-24 spacer + fixed sidebar; body scrolls.
      */}
      <body className="min-h-dvh overflow-x-hidden overflow-y-auto">
        <MobileHeader />
        <Sidebar />
        <div
          className={cn(
            "flex min-h-dvh min-w-0 flex-col pt-16 xl:flex-row xl:pt-0",
          )}
        >
          <div
            className={cn("hidden shrink-0 xl:block", SIDEBAR_WIDTH_CLASS)}
            aria-hidden
          />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
