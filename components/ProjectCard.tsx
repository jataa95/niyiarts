import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { projects } from "@/lib/content";

export default function ProjectCard({ project, sizes }: { project: Project; sizes: string }) {
  const index = projects.findIndex((p) => p.slug === project.slug) + 1;
  return (
    <Link href={`/work/${project.slug}`} className="card">
      <div className="frame">
        <Image
          src={project.cover.src}
          width={project.cover.width}
          height={project.cover.height}
          alt={project.cover.alt}
          sizes={sizes}
        />
      </div>
      <div className="card-meta">
        <span>
          <span className="num">{String(index).padStart(2, "0")}</span>&nbsp;&nbsp;{project.title}
        </span>
        <span className="cat">{project.category}</span>
      </div>
    </Link>
  );
}
