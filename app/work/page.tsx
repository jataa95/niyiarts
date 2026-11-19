import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { projects, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: site.portfolioIntro,
};

export default function WorkIndex() {
  return (
    <>
      <main className="page wrap">
        <div className="work-head">
          <h1 className="page-title">Work</h1>
          <Reveal>
            <p className="statement" style={{ fontSize: "clamp(18px, 1.7vw, 26px)" }}>
              {site.portfolioIntro}
            </p>
          </Reveal>
        </div>

        <div className="work-grid">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 120}>
              <ProjectCard project={p} sizes="(max-width: 760px) 100vw, 50vw" />
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
