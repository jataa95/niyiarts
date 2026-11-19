import type { Metadata } from "next";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Enquiries for ${site.name} — ${site.email}`,
};

export default function Contact() {
  return (
    <main className="contact-page">
      <div className="lead">
        <h1>Contact</h1>
        <a className="mail ulink" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <p className="note">
          For enquiries about available paintings, prints, commissions, exhibitions and press, write
          to the studio directly.
        </p>
      </div>

      <dl className="contact-cols">
        <div>
          <dt>Studio</dt>
          <dd>{site.studio}</dd>
        </div>
        <div>
          <dt>Based in</dt>
          <dd>{site.location}</dd>
        </div>
        <div>
          <dt>Follow</dt>
          <dd>
            {site.socials.map((s) => (
              <a key={s.href} className="ulink" href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </dd>
        </div>
        <div>
          <dt>©</dt>
          <dd>
            {new Date().getFullYear()} {site.name}
          </dd>
        </div>
      </dl>
    </main>
  );
}
