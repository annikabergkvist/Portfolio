"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const LINK_DISTANCE = 150;
const GRAB_DISTANCE = 200;
const BASE_SPEED = 0.22;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

function cssColorToRgb(input: string): [number, number, number] {
  const value = input.trim();
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;
    return [
      Number.parseInt(full.slice(0, 2), 16),
      Number.parseInt(full.slice(2, 4), 16),
      Number.parseInt(full.slice(4, 6), 16),
    ];
  }

  const rgb = value.match(/rgba?\(\s*([\d.]+)\s*[,\s]\s*([\d.]+)\s*[,\s]\s*([\d.]+)/);
  if (rgb) {
    return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  }

  return [236, 81, 137];
}

function particleCount(width: number, height: number) {
  return Math.max(28, Math.min(72, Math.round((width * height) / 16_000)));
}

function GeometricNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
    if (reduced.matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, inView: false };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let color: [number, number, number] = [236, 81, 137];
    let frame = 0;
    let visible = true;
    let running = false;

    const readColor = () => {
      color = cssColorToRgb(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--primary")
          .trim() || "#ec5189",
      );
    };

    const seed = () => {
      const count = particleCount(width, height);
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = BASE_SPEED * (0.55 + Math.random() * 0.7);
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1.1 + Math.random() * 1.8,
        });
      }
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readColor();
      seed();
    };

    const stroke = (opacity: number) =>
      `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;

    const draw = () => {
      if (!running) return;
      frame = window.requestAnimationFrame(draw);
      if (!visible) return;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -8) p.x = width + 8;
        if (p.x > width + 8) p.x = -8;
        if (p.y < -8) p.y = height + 8;
        if (p.y > height + 8) p.y = -8;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DISTANCE) continue;
          ctx.strokeStyle = stroke(0.38 * (1 - dist / LINK_DISTANCE));
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        if (mouse.inView) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist <= GRAB_DISTANCE) {
            ctx.strokeStyle = stroke(0.78 * (1 - dist / GRAB_DISTANCE));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = stroke(0.55);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      mouse.x = event.clientX - bounds.left;
      mouse.y = event.clientY - bounds.top;
      mouse.inView =
        mouse.x >= -40 &&
        mouse.y >= -40 &&
        mouse.x <= bounds.width + 40 &&
        mouse.y <= bounds.height + 40;
    };

    const onPointerLeave = () => {
      mouse.inView = false;
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    resize();
    start();

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
      },
      { rootMargin: "80px" },
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);

    const onMotionChange = () => {
      if (reduced.matches) stop();
    };
    reduced.addEventListener("change", onMotionChange);

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      reduced.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

export function GeometricNetwork({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "geometric-network pointer-events-none sticky top-0 z-0 h-svh overflow-hidden mix-blend-screen",
        "xl:-ml-24 xl:w-[calc(100%+6rem)]",
        className,
      )}
      aria-hidden
    >
      <GeometricNetworkCanvas />
    </div>
  );
}
