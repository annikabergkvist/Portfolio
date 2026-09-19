"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContactDialog, ContactDialogTrigger } from "@/components/contact-dialog";
import { HomeLogoMark } from "@/components/home-logo-mark";
import { SocialGlyph } from "@/components/social-glyphs";
import { SITE_NAV_ITEMS, SITE_SOCIAL_LINKS } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

const MENU_ICON_CLASS = "h-[25px] w-[25px]";

function focusableIn(el: Element | null) {
  if (!el) return [];
  const sel =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return [...el.querySelectorAll<HTMLElement>(sel)];
}

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const id = requestAnimationFrame(() => firstLinkRef.current?.focus());
      return () => {
        cancelAnimationFrame(id);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onDocumentTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const header = document.querySelector<HTMLElement>("[data-mobile-header]");
      const nav = document.getElementById("mobile-menu");
      const focusable = [
        ...focusableIn(header),
        ...focusableIn(nav),
      ];
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const activeInTrap = active && focusable.includes(active);

      if (e.shiftKey) {
        if (active === first || !activeInTrap) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onDocumentTab);
    return () => document.removeEventListener("keydown", onDocumentTab);
  }, [open]);

  return (
    <ContactDialog>
      <header
        data-mobile-header
        className={cn(
          "fixed left-0 right-0 top-0 flex h-16 items-center justify-between px-4 xl:hidden",
          open
            ? "z-[70] border-b-0 bg-transparent"
            : "z-50 border-b border-border/60 bg-background/90 backdrop-blur-md",
        )}
      >
        <Link
          href="/"
          className="flex min-h-10 min-w-10 items-center justify-center touch-manipulation rounded-md transition-opacity hover:opacity-80"
          aria-label="Home"
        >
          <HomeLogoMark className="size-8" />
        </Link>
        <Button
          type="button"
          variant="ghost"
          className={cn(
            "h-14 min-w-14 touch-manipulation px-0.5 text-primary",
            "hover:bg-sidebar-accent hover:text-foreground",
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <X className={MENU_ICON_CLASS} strokeWidth={1.85} aria-hidden />
          ) : (
            <Menu className={MENU_ICON_CLASS} strokeWidth={1.85} aria-hidden />
          )}
        </Button>
      </header>

      {open && (
        <>
          <button
            type="button"
            tabIndex={-1}
            className="mobile-menu-overlay fixed inset-0 z-[60] cursor-default backdrop-blur-md xl:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-menu"
            className="fixed inset-0 z-[61] flex h-dvh flex-col pointer-events-none xl:hidden"
            aria-label="Mobile navigation"
          >
            <div className="shrink-0 pt-16" aria-hidden />
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              {/*
                Nav: vertically centered, nudged slightly up (extra bottom padding).
                Social: bottom-aligned with safe-area and space below icons.
              */}
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 pb-[min(11dvh,4.25rem)] pt-2 sm:px-8">
                <ul className="pointer-events-auto flex flex-col items-center gap-10 sm:gap-11">
                  {SITE_NAV_ITEMS.map((item, i) => (
                    <li
                      key={item.type === "contact" ? "contact" : item.href}
                    >
                      {item.type === "contact" ? (
                        <ContactDialogTrigger>
                          <button
                            type="button"
                            className={cn(
                              "block text-center font-light text-primary antialiased",
                              "text-[clamp(1.75rem,6.5vw,2.375rem)] leading-none tracking-[-0.02em]",
                              "transition-colors hover:text-foreground",
                            )}
                            onClick={() => {
                              // Let the dialog open first; then close the menu.
                              requestAnimationFrame(() => setOpen(false));
                            }}
                          >
                            {item.label}
                          </button>
                        </ContactDialogTrigger>
                      ) : (
                        <Link
                          ref={i === 0 ? firstLinkRef : undefined}
                          href={item.href}
                          className={cn(
                            "block text-center font-light text-primary antialiased",
                            "text-[clamp(1.75rem,6.5vw,2.375rem)] leading-none tracking-[-0.02em]",
                            "transition-colors hover:text-foreground",
                          )}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="pointer-events-auto mt-auto flex shrink-0 justify-center gap-3 px-6 pb-[max(1.75rem,calc(env(safe-area-inset-bottom,0px)+1.5rem))] pt-2 text-sidebar-accent-foreground sm:gap-3 sm:px-8 sm:pb-10"
                aria-label="Social links"
              >
                {SITE_SOCIAL_LINKS.map(({ href, label }) => {
                  if (label === "Email") {
                    return (
                      <ContactDialogTrigger key={label}>
                        <button
                          type="button"
                          className="rounded-md p-2 text-primary transition-colors hover:bg-sidebar-accent hover:text-foreground"
                          aria-label="Contact"
                          onClick={() => setOpen(false)}
                        >
                          <SocialGlyph label={label} />
                        </button>
                      </ContactDialogTrigger>
                    );
                  }

                  return (
                    <a
                      key={label}
                      href={href}
                      className="rounded-md p-2 text-primary transition-colors hover:bg-sidebar-accent hover:text-foreground"
                      aria-label={label}
                      {...(href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      onClick={() => setOpen(false)}
                    >
                      <SocialGlyph label={label} />
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </>
      )}
    </ContactDialog>
  );
}
