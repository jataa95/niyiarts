import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { exhibitions, img, press, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Info",
  description: site.bio[0],
};

const portrait = img("portrait-artist", "Portrait of Olaniyi Omotayo, arms folded, in a blue shirt");
const studio = img("studio-apron", "Olaniyi Omotayo in his studio wearing a painting apron");
const signing = img("artist-signing-print", "Olaniyi Omotayo finishing a print by hand");

export default function Info() {
  return (
    <>
      <main className="page wrap">
        <h1 className="page-title">Info</h1>

        <section className="section">
          <Reveal>
            <p className="statement">{site.intro}</p>
          </Reveal>
        </section>

        <section className="section info-grid">
          <div className="info-portrait">
            <Image
              src={portrait.src}
              width={portrait.width}
              height={portrait.height}
              alt={portrait.alt}
              sizes="(max-width: 900px) 100vw, 40vw"
              preload
            />
            <p className="small" style={{ marginTop: 10 }}>
              {site.name} — {site.studio}, {site.location}
            </p>
          </div>
          <div>
            <h2 className="label caps" style={{ margin: "0 0 28px" }}>
              Artistic Journey
            </h2>
            <div className="bio">
              {site.bio.map((p, i) => (
                <Reveal key={i}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="more-head">
            <h2 className="label caps" style={{ margin: 0 }}>
              In the studio
            </h2>
            <span className="small">Lagos, Nigeria</span>
          </div>
          <div className="studio-film">
            <Reveal>
              <Image src={studio.src} width={studio.width} height={studio.height} alt={studio.alt} sizes="(max-width: 900px) 100vw, 33vw" />
            </Reveal>
            <Reveal delay={100}>
              <video
                src="/media/studio.mp4"
                poster="/media/studio-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Short film of the artist at work in the studio"
              />
            </Reveal>
            <Reveal delay={200}>
              <Image src={signing.src} width={signing.width} height={signing.height} alt={signing.alt} sizes="(max-width: 900px) 100vw, 33vw" />
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="more-head">
            <h2 className="label caps" style={{ margin: 0 }}>
              Exhibitions & Fairs
            </h2>
          </div>
          <ul className="rows">
            {exhibitions.map((e) => (
              <li key={e.title}>
                <span className="small">{e.year || "—"}</span>
                <span className="t">{e.title}</span>
                <span className="m">{e.detail}</span>
                <span className="r">{e.place}</span>
              </li>
            ))}
          </ul>
          <p className="small" style={{ marginTop: 16 }}>
            Works held by private collectors, institutions and museums.
          </p>
        </section>

        <section className="section">
          <div className="more-head">
            <h2 className="label caps" style={{ margin: 0 }}>
              Press
            </h2>
          </div>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {press.map((p) => (
              <Reveal key={p.title} className="press-card">
                <div>
                  <div className="label">{p.outlet}</div>
                  <div className="small">
                    {p.date}
                    {p.author && <> · {p.author}</>}
                  </div>
                </div>
                <div>
                  <h3 className="label" style={{ margin: "0 0 14px", fontSize: 18 }}>
                    {p.title}
                  </h3>
                  {p.quote && <blockquote>“{p.quote}”</blockquote>}
                  <p style={{ margin: "14px 0 0", maxWidth: "40em" }}>{p.excerpt}</p>
                  {p.href && (
                    <a
                      className="label ulink"
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: "inline-block", marginTop: 14 }}
                    >
                      Read the article ↗
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
