import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ShopGrid from "@/components/ShopGrid";
import { products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Original paintings and limited prints by Olaniyi Omotayo, available directly from Niyi Art Studio.",
};

export default function Shop() {
  return (
    <>
      <main className="page wrap">
        <div className="work-head">
          <h1 className="page-title">Shop</h1>
          <Reveal>
            <p className="statement" style={{ fontSize: "clamp(18px, 1.7vw, 26px)" }}>
              Original paintings and limited prints, direct from the studio. Enquire about any work
              for availability, pricing and shipping.
            </p>
          </Reveal>
        </div>

        <ShopGrid products={products} />

        <section className="section shop-notes">
          {[
            ["Direct from the studio", "Every work is sold directly by Niyi Art Studio in Lagos."],
            ["Worldwide shipping", "Shipping, crating and framing are quoted with each enquiry."],
            ["Commissions", "Open to a limited number of portrait and story commissions."],
          ].map(([h, t], i) => (
            <Reveal key={h} delay={i * 100}>
              <p className="label">{h}</p>
              <p className="small" style={{ margin: "6px 0 0" }}>
                {t}
              </p>
            </Reveal>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
