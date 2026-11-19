import Tunnel from "@/components/Tunnel";
import { floating, site } from "@/lib/content";

export default function Home() {
  return (
    <main className="home">
      <Tunnel items={floating} />

      <div className="home-title">
        <h1>
          <span>
            <span>Olaniyi</span>
          </span>
          <span>
            <span>Omotayo</span>
          </span>
        </h1>
        <p className="home-tagline caps">
          {site.tagline[0]}
          <br />
          {site.tagline[1]}
        </p>
      </div>

      <a className="home-corner left ulink" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <span className="home-corner right">© {new Date().getFullYear()}</span>
      <span className="home-hint" aria-hidden>
        Scroll to drift
      </span>
    </main>
  );
}
