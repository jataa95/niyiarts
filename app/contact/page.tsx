import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Enquiries for ${site.name} — available works, prints, commissions, exhibitions and press.`,
};

export default function Contact() {
  return (
    <>
      <main className="page wrap contact">
        <h1 className="page-title">Contact</h1>

        <div className="contact-grid section">
          <div className="contact-side">
            <p className="statement" style={{ fontSize: "clamp(20px, 2vw, 30px)" }}>
              For available paintings, prints, commissions, exhibitions and press — write to the
              studio.
            </p>
            <dl className="contact-list">
              <div>
                <dt>Email</dt>
                <dd>
                  <a className="ulink" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Studio</dt>
                <dd>
                  {site.studio}
                  <br />
                  {site.location}
                </dd>
              </div>
              <div>
                <dt>Follow</dt>
                <dd>
                  {site.socials.map((s) => (
                    <a key={s.href} className="ulink" href={s.href} target="_blank" rel="noreferrer">
                      {s.label} ↗
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <Suspense fallback={<div className="contact-form" aria-busy="true" />}>
            <ContactForm />
          </Suspense>
        </div>
      </main>
      <Footer cta={false} />
    </>
  );
}
