"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/content";

const filters = ["All", "Originals", "Prints"] as const;
type Filter = (typeof filters)[number];

export default function ShopGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const list = products.filter(
    (p) => filter === "All" || (filter === "Prints" ? p.kind === "Print" : p.kind === "Original")
  );

  return (
    <>
      <div className="shop-filters" role="tablist" aria-label="Filter works">
        {filters.map((f) => {
          const count = products.filter(
            (p) => f === "All" || (f === "Prints" ? p.kind === "Print" : p.kind === "Original")
          ).length;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`chip${filter === f ? " is-on" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f} <sup>{count}</sup>
            </button>
          );
        })}
      </div>

      <div className="shop-grid">
        {list.map((p) => (
          <Link key={p.slug} href={`/shop/${p.slug}`} className="product-card">
            <div className="frame">
              <Image
                src={p.images[0].src}
                width={p.images[0].width}
                height={p.images[0].height}
                alt={p.images[0].alt}
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              {p.images[1] && (
                <Image
                  className="alt"
                  src={p.images[1].src}
                  width={p.images[1].width}
                  height={p.images[1].height}
                  alt=""
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              )}
              <span className={`pill pill-${p.availability.toLowerCase()}`}>{p.availability}</span>
            </div>
            <div className="product-meta">
              <span className="t">{p.title}</span>
              <span className="k">
                {p.kind}
                {p.year ? `, ${p.year}` : ""}
              </span>
              <span className="pr">{p.price === "On request" ? "Price on request" : p.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
