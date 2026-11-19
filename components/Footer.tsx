import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="small" style={{ color: "#7a7a7a", margin: "0 0 18px" }}>
        Enquiries, available works & commissions
      </p>
      <a className="big ulink" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <div className="footer-row">
        <ul>
          {site.socials.map((s) => (
            <li key={s.href}>
              <a className="ulink" href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="dim">{site.location}</span>
        <span className="dim">
          © {new Date().getFullYear()} {site.name} ({site.studio})
        </span>
      </div>
    </footer>
  );
}
