"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const links = [
  { href: "/info", label: "Info" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`header${open ? " is-open" : ""}`}>
        <Link href="/" className="label" aria-label={`${site.name} — home`}>
          {site.name}
        </Link>
        <button
          className="label"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <div id="site-menu" className={`menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              tabIndex={open ? 0 : -1}
              aria-current={pathname.startsWith(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="menu-foot">
          <a className="ulink" href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>
            {site.email}
          </a>
          <ul>
            {site.socials.map((s) => (
              <li key={s.href}>
                <a
                  className="ulink"
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  tabIndex={open ? 0 : -1}
                >
                  {s.short}
                </a>
              </li>
            ))}
          </ul>
          <span>{site.location}</span>
        </div>
      </div>
    </>
  );
}
