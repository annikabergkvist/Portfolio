"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/** Same published scene and SDK major as the Aura inspo embed. */
const UNICORN_PROJECT_ID = "sajpUiTp7MIKdX6daDCu";
const UNICORN_SDK_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
const LOCAL_TEXTURE = "/images/hero-laser.png";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type UnicornScene = {
  destroy?: () => void;
  resize?: () => void;
  element?: HTMLElement;
};

type UnicornStudioApi = {
  isInitialized?: boolean;
  init: () => Promise<UnicornScene[] | unknown>;
  destroy?: () => void;
};

declare global {
  interface Window {
    UnicornStudio?: UnicornStudioApi;
  }
}

function isUnicornTextureUrl(value: string) {
  return (
    value.includes("firebasestorage.googleapis.com") &&
    value.includes("unicorn-studio")
  );
}

/** Unicorn loads the scene texture from Firebase; localhost is CORS-blocked. */
let textureLoadsPatched = false;

function patchUnicornTextureLoads() {
  if (textureLoadsPatched) return;
  textureLoadsPatched = true;
  const imageSrc = Object.getOwnPropertyDescriptor(
    HTMLImageElement.prototype,
    "src",
  );
  const originalFetch = window.fetch.bind(window);

  if (imageSrc?.set && imageSrc.get) {
    Object.defineProperty(HTMLImageElement.prototype, "src", {
      configurable: true,
      get() {
        return imageSrc.get!.call(this);
      },
      set(value: string) {
        imageSrc.set!.call(
          this,
          typeof value === "string" && isUnicornTextureUrl(value)
            ? LOCAL_TEXTURE
            : value,
        );
      },
    });
  }

  window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;
    if (isUnicornTextureUrl(url)) {
      return originalFetch(LOCAL_TEXTURE, init);
    }
    return originalFetch(input, init);
  }) as typeof fetch;
}

function loadUnicornSdk(): Promise<UnicornStudioApi> {
  if (window.UnicornStudio?.init) {
    return Promise.resolve(window.UnicornStudio);
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${UNICORN_SDK_SRC}"]`,
  );

  return new Promise((resolve, reject) => {
    const onReady = () => {
      if (window.UnicornStudio?.init) {
        resolve(window.UnicornStudio);
        return;
      }
      reject(new Error("Unicorn Studio SDK loaded without init"));
    };

    if (existing) {
      if (window.UnicornStudio?.init) {
        onReady();
        return;
      }
      existing.addEventListener("load", onReady, { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Unicorn Studio SDK failed to load")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = UNICORN_SDK_SRC;
    script.async = true;
    script.onload = onReady;
    script.onerror = () => reject(new Error("Unicorn Studio SDK failed to load"));
    document.head.appendChild(script);
  });
}

function seedMouse(host: HTMLElement) {
  const rect = host.getBoundingClientRect();
  if (rect.width < 8 || rect.height < 8) return;
  window.dispatchEvent(
    new MouseEvent("mousemove", {
      bubbles: true,
      clientX: rect.left + rect.width * 0.5,
      clientY: rect.top + rect.height * 0.45,
      view: window,
    }),
  );
}

export function HeroBackgroundScene({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced) return;

    patchUnicornTextureLoads();
    let cancelled = false;
    let scene: UnicornScene | null = null;
    let observer: IntersectionObserver | null = null;

    const wake = () => {
      scene?.resize?.();
      const host = hostRef.current;
      if (host) seedMouse(host);
    };

    loadUnicornSdk()
      .then(async (api) => {
        if (cancelled) return;
        api.destroy?.();
        api.isInitialized = false;
        const result = await api.init();
        api.isInitialized = true;
        if (cancelled) {
          api.destroy?.();
          api.isInitialized = false;
          return;
        }

        const host = hostRef.current;
        if (Array.isArray(result)) {
          scene =
            result.find(
              (item) =>
                item.element === host || item.element?.contains(host ?? null),
            ) ??
            result[0] ??
            null;
        }

        requestAnimationFrame(wake);

        if (host) {
          observer = new IntersectionObserver(
            ([entry]) => {
              if (entry?.isIntersecting) wake();
            },
            { threshold: 0.08 },
          );
          observer.observe(host);
        }
      })
      .catch(() => {
        // Empty dark hero if WebGL cannot start.
      });

    return () => {
      cancelled = true;
      observer?.disconnect();
      scene?.destroy?.();
      scene = null;
      const api = window.UnicornStudio;
      api?.destroy?.();
      if (api) api.isInitialized = false;
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={hostRef}
      className={cn("hero-bg-scene", className)}
      data-us-project={UNICORN_PROJECT_ID}
      aria-hidden
    />
  );
}
