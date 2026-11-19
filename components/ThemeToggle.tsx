"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "niyi-theme";

export default function ThemeToggle({
  className = "",
  withLabel = false,
  short = false,
}: {
  className?: string;
  withLabel?: boolean;
  /** compact rolling "Dark" / "Light" label, used in the header */
  short?: boolean;
}) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) || "light");
    // keep every toggle on the page in sync
    const sync = () => setTheme(document.documentElement.dataset.theme as Theme);
    window.addEventListener("niyi:theme", sync);
    return () => window.removeEventListener("niyi:theme", sync);
  }, []);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const html = document.documentElement;
    const next: Theme = html.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      html.dataset.theme = next;
      try {
        localStorage.setItem(KEY, next);
      } catch {}
      window.dispatchEvent(new Event("niyi:theme"));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

    if (!doc.startViewTransition || reduce) {
      html.classList.add("theme-fade");
      apply();
      window.setTimeout(() => html.classList.remove("theme-fade"), 550);
      return;
    }

    // Circular reveal growing out of the button
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    doc.startViewTransition(apply).ready.then(() => {
      html.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggle}
      aria-label={label}
      title={label}
      data-theme-state={theme ?? undefined}
    >
      <span className="theme-icon" aria-hidden />
      {withLabel && <span className="theme-text">{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
      {short && (
        <span className={`theme-roll${theme === "dark" ? " is-dark" : ""}`} aria-hidden>
          <span>Dark</span>
          <span>Light</span>
        </span>
      )}
    </button>
  );
}
