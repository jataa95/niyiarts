"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { enquiryTypes, products, site } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export default function ContactForm() {
  const params = useSearchParams();
  const initialType = enquiryTypes.find((t) => t === params.get("type")) ?? enquiryTypes[0];
  const initialWork = products.find((p) => p.slug === params.get("work"))?.title ?? "";

  const [type, setType] = useState<string>(initialType);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    data.type = type;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (json.fallback) {
        // No mail service configured: hand the enquiry to the visitor's mail app
        const subject = `${type}${data.work ? ` — ${data.work}` : ""}`;
        const body = `${data.message}\n\n— ${data.name}\n${data.email}`;
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
        setStatus("mailto");
        return;
      }
      setError(json.error || "Something went wrong. Please email the studio directly.");
      setStatus("error");
    } catch {
      setError("Network error. Please try again or email the studio directly.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <p className="statement">Thank you — your message is with the studio.</p>
        <p className="small">You’ll hear back by email, usually within a few days.</p>
        <button className="btn" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <fieldset className="field">
        <legend>What’s it about?</legend>
        <div className="chips">
          {enquiryTypes.map((t) => (
            <button
              type="button"
              key={t}
              className={`chip${type === t ? " is-on" : ""}`}
              aria-pressed={type === t}
              onClick={() => setType(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input name="name" required autoComplete="name" maxLength={120} />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" maxLength={200} />
        </label>
      </div>

      <label className="field">
        <span>Artwork (optional)</span>
        <select name="work" defaultValue={initialWork}>
          <option value="">— None in particular —</option>
          {products.map((p) => (
            <option key={p.slug} value={p.title}>
              {p.title}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={6}
          maxLength={5000}
          placeholder={
            type === "Commission"
              ? "Tell us about the story or people you’d like painted, the size and your timeline."
              : "Tell us a little about what you’re looking for."
          }
        />
      </label>

      {/* honeypot */}
      <label className="sr-only" aria-hidden>
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="form-foot">
        <button className="btn btn-solid" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"} <span aria-hidden>→</span>
        </button>
        <p className="small" role="status" aria-live="polite">
          {status === "error" && <span className="form-error">{error}</span>}
          {status === "mailto" && "Your mail app should open with the message ready to send."}
          {(status === "idle" || status === "sending") && <>Or write to {site.email}</>}
        </p>
      </div>
    </form>
  );
}
