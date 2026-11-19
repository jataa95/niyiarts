import { site } from "@/lib/content";

/**
 * Contact form endpoint.
 *
 * Sends the enquiry by email through Resend (https://resend.com) when these
 * environment variables are set on the host:
 *   RESEND_API_KEY      – API key
 *   CONTACT_TO_EMAIL    – inbox that receives enquiries (defaults to the studio email)
 *   CONTACT_FROM_EMAIL  – verified sender, e.g. "Niyi Art Studio <studio@yourdomain.com>"
 *
 * Without them it answers { fallback: true } and the form opens a pre-filled
 * email in the visitor's mail app instead, so no enquiry is lost.
 */

type Payload = {
  name?: string;
  email?: string;
  type?: string;
  work?: string;
  message?: string;
  company?: string; // honeypot
};

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success.
  if (clean(body.company, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const type = clean(body.type, 60) || "General";
  const work = clean(body.work, 160);
  const message = clean(body.message, 5000);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return Response.json(
      { ok: false, error: "Please add your name, a valid email and a short message." },
      { status: 422 }
    );
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) return Response.json({ ok: false, fallback: true }, { status: 503 });

  const subject = `${type}${work ? ` — ${work}` : ""} · from ${name}`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO_EMAIL || site.email],
      reply_to: email,
      subject,
      text: `Name: ${name}\nEmail: ${email}\nEnquiry: ${type}\nWork: ${work || "—"}\n\n${message}`,
      html: `<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Enquiry:</b> ${esc(
        type
      )}<br><b>Work:</b> ${esc(work || "—")}</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) return Response.json({ ok: false, fallback: true }, { status: 502 });
  return Response.json({ ok: true });
}
