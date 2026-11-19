import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { getProduct, getProject, products, site } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: `${p.title} — Shop`, description: p.summary, openGraph: { images: [p.images[0].src] } };
}

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const series = product.series ? getProject(product.series) : undefined;
  const sold = product.availability === "Sold";
  const enquire = `/contact?type=${encodeURIComponent(
    product.kind === "Print" ? "Prints" : "Purchase a work"
  )}&work=${product.slug}`;
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <main className="page wrap">
        <nav className="crumbs small" aria-label="Breadcrumb">
          <Link className="ulink" href="/shop">
            Shop
          </Link>{" "}
          / {product.kind === "Print" ? "Prints" : "Originals"}
        </nav>

        <div className="product">
          <div className="product-gallery">
            {product.images.map((im, i) => (
              <figure key={im.src}>
                <Image
                  src={im.src}
                  width={im.width}
                  height={im.height}
                  alt={im.alt}
                  sizes="(max-width: 900px) 100vw, 58vw"
                  preload={i === 0}
                />
              </figure>
            ))}
          </div>

          <aside className="product-info">
            <p className="small">
              {product.kind}
              {product.year ? ` · ${product.year}` : ""}
            </p>
            <h1>{product.title}</h1>
            <p className="product-price">
              {product.price === "On request" ? "Price on request" : product.price}
              <span className={`pill pill-${product.availability.toLowerCase()}`}>
                {product.availability}
              </span>
            </p>
            <p className="product-summary">{product.summary}</p>

            <dl className="product-details">
              {product.details.map((d) => (
                <div key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>

            <div className="product-actions">
              {sold ? (
                <Link href={`/contact?type=Commission&work=${product.slug}`} className="btn btn-solid">
                  Sold — ask about similar work
                </Link>
              ) : (
                <Link href={enquire} className="btn btn-solid">
                  Enquire to purchase <span aria-hidden>→</span>
                </Link>
              )}
              <a
                className="btn"
                href={`mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${product.title}`)}`}
              >
                Email the studio
              </a>
            </div>

            <p className="small">
              Purchases are arranged directly with the studio. You’ll receive availability, price,
              shipping and payment details by email.
            </p>
            {series && (
              <p className="small">
                From{" "}
                <Link className="ulink" href={`/work/${series.slug}`} style={{ color: "var(--fg)" }}>
                  {series.title}
                </Link>
              </p>
            )}
          </aside>
        </div>

        <section className="section">
          <div className="more-head">
            <h2 className="label caps" style={{ margin: 0 }}>
              More from the shop
            </h2>
            <Link href="/shop" className="label ulink" style={{ textDecoration: "underline" }}>
              All works
            </Link>
          </div>
          <div className="mini-grid">
            {others.map((p) => (
              <Link key={p.slug} href={`/shop/${p.slug}`} className="product-card">
                <div className="frame">
                  <Image
                    src={p.images[0].src}
                    width={p.images[0].width}
                    height={p.images[0].height}
                    alt={p.images[0].alt}
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                </div>
                <div className="product-meta">
                  <span className="t">{p.title}</span>
                  <span className="k">{p.kind}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
