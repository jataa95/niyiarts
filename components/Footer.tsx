import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { projects, site } from "@/lib/content";

const pages = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/shop", label: "Shop" },
  { href: "/info", label: "Info" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({ cta = true }: { cta?: boolean }) {
  return (
    <footer className="footer">
      {cta && (
      <div className="footer-cta">
        <p className="footer-lead">
          Available works, commissions
          <br />
          &amp; exhibition enquiries.
        </p>
        <Link href="/contact" className="footer-btn">
          <span>Get in touch</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
      )}

      <div className="footer-cols">
        <div>
          <p className="footer-h">Pages</p>
          <ul>
            {pages.map((p) => (
              <li key={p.href}>
                <Link className="ulink" href={p.href}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-h">Series</p>
          <ul>
            {projects.map((p) => (
              <li key={p.slug}>
                <Link className="ulink" href={`/work/${p.slug}`}>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-h">Contact</p>
          <ul>
            <li>
              <a className="ulink" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li className="footer-dim">{site.studio}</li>
            <li className="footer-dim">{site.location}</li>
          </ul>
        </div>
        <div>
          <p className="footer-h">Follow</p>
          <ul>
            {site.socials.map((s) => (
              <li key={s.href}>
                <a className="ulink" href={s.href} target="_blank" rel="noreferrer">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="footer-mark" aria-hidden>
        Olaniyi Omotayo
      </p>

      <div className="footer-bottom">
        <span className="footer-dim">
          © {new Date().getFullYear()} {site.name} ({site.studio})
        </span>
        <ThemeToggle withLabel />
        <a className="ulink" href="#">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
