"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { img, projects, site } from "@/lib/content";

const links = [
  { href: "/", label: "Home", preview: img("the-unwritten", "") },
  { href: "/work", label: "Work", preview: img("the-gathering", "") },
  { href: "/shop", label: "Shop", preview: img("hands-of-unity-print", "") },
  { href: "/info", label: "Info", preview: img("studio-apron", "") },
  { href: "/contact", label: "Contact", preview: img("studio-sovereign", "") },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

function LagosTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time ? `Lagos ${time} WAT` : site.location}</span>;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [opened, setOpened] = useState(false); // load menu previews only once it's been opened

  const current = Math.max(0, links.findIndex((l) => isActive(pathname, l.href)));
  const shown = hover ?? current;

  // Close on navigation
  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  // Esc closes; lock page scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.toggle("menu-open", open);
    if (open) setOpened(true);
    if (!open) setHover(null);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Hide while scrolling down, return on a solid bar when scrolling up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 160);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const cls = [
    "header",
    open && "is-open",
    !open && scrolled && "is-solid",
    !open && hidden && "is-hidden",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={cls}>
        <Link href="/" className="label" aria-label={`${site.name} — home`}>
          {site.name}
        </Link>
        <div className="header-actions">
          <ThemeToggle />
          <button
            className={`burger${open ? " is-open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="burger-label" aria-hidden>
              <span>Menu</span>
              <span>Close</span>
            </span>
            <span className="burger-lines" aria-hidden>
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        className={`menu${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="menu-inner">
          <nav
            className={`menu-links${hover !== null ? " has-hover" : ""}`}
            aria-label="Main"
            onMouseLeave={() => setHover(null)}
          >
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className={`menu-link${hover === i ? " is-hover" : ""}`}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onClick={() => setOpen(false)}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="ml-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="ml-mask">
                  <span className="ml-text">{l.label}</span>
                </span>
              </Link>
            ))}
          </nav>

          <aside className="menu-aside">
            <div className="menu-preview">
              {opened && links.map((l, i) => (
                <div key={l.href} className={`mp-slide${shown === i ? " on" : ""}`}>
                  <Image
                    loading="eager"
                    src={l.preview.src}
                    width={l.preview.width}
                    height={l.preview.height}
                    alt=""
                    sizes="(max-width: 900px) 1px, 26vw"
                  />
                </div>
              ))}
            </div>
            <div className="menu-series">
              <p className="small">Series</p>
              <ul>
                {projects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/work/${p.slug}`} className="ulink" onClick={() => setOpen(false)}>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="menu-foot">
          <a className="ulink" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <ul>
            {site.socials.map((s) => (
              <li key={s.href}>
                <a className="ulink" href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <LagosTime />
          <ThemeToggle withLabel />
        </div>
      </div>
    </>
  );
}
