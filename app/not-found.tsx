import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page wrap" style={{ minHeight: "80svh" }}>
      <h1 className="page-title">404</h1>
      <p className="statement" style={{ marginTop: 32 }}>
        This page could not be found. <Link href="/work" className="ulink" style={{ textDecoration: "underline" }}>See the work</Link>.
      </p>
    </main>
  );
}
