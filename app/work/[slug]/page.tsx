import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { getProject, projects, type Img } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.statement,
    openGraph: { images: [p.cover.src] },
  };
}

/** Group images into full-width rows and pairs, like an editorial spread. */
function rows(images: Img[]) {
  const out: Img[][] = [];
  let i = 0;
  let full = true;
  while (i < images.length) {
    const take = full || i === images.length - 1 ? 1 : 2;
    out.push(images.slice(i, i + take));
    i += take;
    full = !full;
  }
  return out;
}

function Figure({ image, sizes }: { image: Img; sizes: string }) {
  return (
    <figure>
      <Image src={image.src} width={image.width} height={image.height} alt={image.alt} sizes={sizes} />
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const more = [1, 2].map((n) => projects[(index + n) % projects.length]);

  return (
    <>
      <main>
        <section className="p-hero">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            preload
            sizes="100vw"
            quality={85}
          />
          <div className="p-hero-text">
            <h1>{project.title}</h1>
            <p>Index No. {index + 1}</p>
          </div>
        </section>

        <div className="wrap">
          <section className="p-intro">
            <Reveal>
              <p className="statement">{project.statement}</p>
            </Reveal>
            <dl className="p-meta">
              {project.meta.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>
                    {m.value.includes("@") ? (
                      <a className="ulink" href={`mailto:${m.value}`}>
                        {m.value}
                      </a>
                    ) : (
                      m.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="gallery">
            {rows(project.images).map((row, i) =>
              row.length === 1 ? (
                <Reveal
                  key={i}
                  className={`g-full${row[0].width > row[0].height * 1.15 ? " landscape" : ""}`}
                >
                  <Figure image={row[0]} sizes="100vw" />
                </Reveal>
              ) : (
                <div key={i} className="g-pair">
                  {row.map((im, j) => (
                    <Reveal key={im.src + j} delay={j * 120}>
                      <Figure image={im} sizes="(max-width: 760px) 100vw, 50vw" />
                    </Reveal>
                  ))}
                </div>
              )
            )}
          </section>

          <section className="section">
            <Reveal>
              <p className="statement">{project.statement}</p>
            </Reveal>
          </section>

          <section className="section">
            <div className="more-head">
              <h2 className="label caps" style={{ margin: 0 }}>
                More works
              </h2>
              <Link href="/work" className="label ulink" style={{ textDecoration: "underline" }}>
                All work
              </Link>
            </div>
            <div className="more-grid">
              {more.map((p) => (
                <ProjectCard key={p.slug} project={p} sizes="(max-width: 760px) 100vw, 50vw" />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
