"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { img, site, type Img } from "@/lib/content";

/* Paintings the frame flips through; the last one fills the screen on exit. */
const FRAMES: { image: Img; series: string }[] = [
  { image: img("united-roots-2", "At the piano"), series: "United Roots" },
  { image: img("sovereign-1", "Portrait with pipe"), series: "The Sovereign Chronicles" },
  { image: img("narratives-cover", "Around the globe"), series: "Narratives of the African Folks" },
  { image: img("self-confidence-2", "Red suit"), series: "Self Confidence" },
  { image: img("united-roots-cover", "On the street"), series: "United Roots" },
  { image: img("sovereign-cover", "Seated on the throne"), series: "The Sovereign Chronicles" },
  { image: img("the-best-version-of-myself", "The Best Version of Myself"), series: "Self Confidence" },
  { image: img("the-unwritten", "The Unwritten"), series: "The Unwritten — 2026" },
];

const MIN_MS = 2600; // never faster than this, so the sequence can breathe
const MAX_MS = 8000; // never slower than this, whatever the network does
const SEEN_KEY = "niyi-seen";

type Phase = "loading" | "expanding" | "leaving" | "gone";

function Digit({ value }: { value: number }) {
  return (
    <span className="pl-digit" aria-hidden>
      <span style={{ transform: `translateY(${-value * 10}%)` }}>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i}>{i}</span>
        ))}
      </span>
    </span>
  );
}

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    // Already shown this session (set by the inline script in the layout)
    if (html.classList.contains("no-loader")) {
      setPhase("gone");
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = 0; // count from navigation start, not hydration
    let fontsDone = false;
    let raf = 0;
    let shown = 0;
    const timers: number[] = [];

    document.fonts?.ready.then(() => (fontsDone = true));

    // Real progress: fonts + every image on the page (preloader frames included)
    const measure = () => {
      const imgs = Array.from(document.images);
      const loaded = imgs.filter((i) => i.complete && i.naturalWidth > 0).length;
      const imgPart = imgs.length ? loaded / imgs.length : 1;
      return (fontsDone ? 0.15 : 0) + imgPart * 0.85;
    };

    const finish = () => {
      setProgress(100);
      setPhase("expanding");
      timers.push(
        window.setTimeout(() => {
          setPhase("leaving");
          html.classList.add("is-ready");
          window.dispatchEvent(new Event("niyi:ready"));
          try {
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {}
        }, reduce ? 0 : 1500),
        window.setTimeout(() => setPhase("gone"), reduce ? 400 : 2700)
      );
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const real = elapsed > MAX_MS ? 1 : measure();
      const timeCap = Math.min(1, elapsed / (reduce ? 300 : MIN_MS));
      const target = Math.min(real, timeCap) * 100;
      // ease toward the target so the counter never jumps
      shown += (target - shown) * 0.08;
      if (target - shown < 0.4) shown = target;
      setProgress(Math.floor(shown));
      if (shown >= 100) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === "gone") return null;

  const frame = Math.min(FRAMES.length - 1, Math.floor((progress / 100) * FRAMES.length));
  const padded = String(progress).padStart(3, "0");

  return (
    <div
      className={`preloader is-${phase}`}
      role="progressbar"
      aria-label={`Loading ${site.name}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div className="pl-top">
        <span className="pl-mask">
          <span>{site.name}</span>
        </span>
        <span className="pl-mask">
          <span>{site.studio}</span>
        </span>
      </div>

      <div className="pl-stage">
        <div className="pl-frame">
          {FRAMES.map((f, i) => (
            <div
              key={f.image.src}
              className={`pl-slide${i <= frame ? " on" : ""}`}
              style={{ zIndex: i }}
            >
              <Image
                src={f.image.src}
                width={f.image.width}
                height={f.image.height}
                alt=""
                sizes={i === FRAMES.length - 1 ? "100vw" : "260px"}
                loading="eager"
                fetchPriority={i < 2 ? "high" : "auto"}
              />
            </div>
          ))}
        </div>
        <div className="pl-caption">
          <span className="pl-mask">
            <span key={frame} className="pl-swap">
              {String(frame + 1).padStart(2, "0")} / {String(FRAMES.length).padStart(2, "0")}
              &nbsp;&nbsp;{FRAMES[frame].series}
            </span>
          </span>
        </div>
      </div>

      <div className="pl-bottom">
        <span className="pl-mask pl-note">
          <span>
            Afro-Impressionism
            <br />
            {site.location}
          </span>
        </span>
        <span className="pl-mask">
          <span className="pl-count">
            <Digit value={Number(padded[0])} />
            <Digit value={Number(padded[1])} />
            <Digit value={Number(padded[2])} />
          </span>
        </span>
      </div>

      <div className="pl-bar" style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}
