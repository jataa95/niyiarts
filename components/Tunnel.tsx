"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import type { Img } from "@/lib/content";

type Item = { image: Img; slug: string };

const Z_FAR = -1900;
const Z_NEAR = 760;
const BASE_SPEED = 70; // px of depth per second
const COUNT = 22;

// Small deterministic PRNG so layout is stable between renders
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Tunnel({ items }: { items: Item[] }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLAnchorElement | null)[]>([]);

  const layout = useMemo(() => {
    const rand = mulberry32(1995);
    return Array.from({ length: COUNT }, (_, i) => {
      const item = items[i % items.length];
      let x = 0;
      let y = 0;
      // keep the centre (where the name sits) mostly clear
      do {
        x = (rand() - 0.5) * 2;
        y = (rand() - 0.5) * 2;
      } while (Math.abs(x) < 0.42 && Math.abs(y) < 0.4);
      return {
        ...item,
        x,
        y,
        w: 0.08 + rand() * 0.07, // fraction of viewport width
        z: Z_FAR + (i / COUNT) * (Z_NEAR - Z_FAR) * 0.92 + rand() * 60,
      };
    });
  }, [items]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = layout.map((l) => ({ z: l.z }));
    let vel = 0;
    let last = performance.now();
    let raf = 0;
    let vw = window.innerWidth;
    let vh = window.innerHeight;

    const place = () => {
      const mobile = vw < 700;
      for (let i = 0; i < layout.length; i++) {
        const el = nodes.current[i];
        if (!el) continue;
        const l = layout[i];
        const z = state[i].z;
        const fadeIn = Math.min(1, Math.max(0, (z - Z_FAR) / 900));
        const fadeOut = Math.min(1, Math.max(0, (Z_NEAR - z) / 420));
        const w = Math.max(110, (mobile ? l.w * 2.1 : l.w) * vw);
        el.style.width = `${w}px`;
        el.style.opacity = String(Math.min(fadeIn, fadeOut));
        el.style.pointerEvents = fadeOut < 0.25 || fadeIn < 0.25 ? "none" : "auto";
        el.style.transform = `translate3d(calc(-50% + ${l.x * vw * 0.62}px), calc(-50% + ${
          l.y * vh * 0.66
        }px), ${z}px)`;
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      vel *= Math.pow(0.04, dt); // ease the scroll boost out
      const speed = (reduce ? 0 : BASE_SPEED) + vel;
      const span = Z_NEAR - Z_FAR;
      for (const s of state) {
        s.z += speed * dt;
        if (s.z > Z_NEAR) s.z -= span;
        if (s.z < Z_FAR) s.z += span;
      }
      place();
      raf = requestAnimationFrame(tick);
    };

    const boost = (d: number) => {
      vel = Math.max(-2400, Math.min(2400, vel + d));
    };
    // Rush forward when the preloader hands over to the page
    const onReady = () => !reduce && boost(2400);
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      boost(e.deltaY * 2.2);
    };
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => (touchY = e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      boost((touchY - y) * 6);
      touchY = y;
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) boost(900);
      if (["ArrowUp", "PageUp"].includes(e.key)) boost(-900);
    };
    const onMove = (e: PointerEvent) => {
      if (reduce || e.pointerType !== "mouse" || !sceneRef.current) return;
      const mx = e.clientX / vw - 0.5;
      const my = e.clientY / vh - 0.5;
      sceneRef.current.style.transform = `rotateY(${mx * 5}deg) rotateX(${-my * 5}deg)`;
    };
    const onResize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
    };

    window.addEventListener("niyi:ready", onReady);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);
    place();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("niyi:ready", onReady);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [layout]);

  return (
    <div className="tunnel" aria-label="Selected paintings">
      <div className="tunnel-scene" ref={sceneRef}>
        {layout.map((l, i) => (
          <Link
            key={i}
            href={`/work/${l.slug}`}
            className="tunnel-item"
            ref={(el) => {
              nodes.current[i] = el;
            }}
            tabIndex={i < items.length ? 0 : -1}
            aria-hidden={i >= items.length}
          >
            <Image
              src={l.image.src}
              width={l.image.width}
              height={l.image.height}
              alt={l.image.alt}
              sizes="(max-width: 700px) 45vw, 22vw"
              loading="eager"
              draggable={false}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
