// pages/contact.tsx
import Head from "next/head";
import { useState } from "react";

type State =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export default function Contact() {
  const [state, setState] = useState<State>({ status: "idle" });
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot (must remain empty; bots often fill it)
  const [company, setCompany] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Basic client validation (server re-validates)
    if (!name.trim() || !email.trim() || !message.trim()) {
      setState({ status: "error", message: "Please fill out all required fields." });
      return;
    }

    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      if (res.ok) {
        setState({ status: "success" });
        // Clear non-honeypot fields
        setName("");
        setEmail("");
        setMessage("");
        setCompany("");
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data?.error || "Request failed");
      }
    } catch (err: any) {
      setState({ status: "error", message: err?.message || "Something went wrong" });
    }
  }

  return (
    <>
      <Head>
        <title>Contact — Cloud Portfolio</title>
        <meta name="description" content="Get in touch." />
      </Head>

      <main className="min-h-screen py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-extrabold">Contact</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Have a question or idea? Send a message below.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name <span className="text-rose-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:ring-2 focus:ring-brand/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email <span className="text-rose-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={200}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:ring-2 focus:ring-brand/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={2000}
                rows={6}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition focus:ring-2 focus:ring-brand/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="How can I help?"
              />
            </div>

            {/* Honeypot field (keep hidden; bots often fill it) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={state.status === "submitting"}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900"
              >
                {state.status === "submitting" ? "Sending…" : "Send message"}
              </button>

              {state.status === "success" && (
                <span className="text-sm text-green-600 dark:text-green-400">
                  Message sent. Thanks!
                </span>
              )}
              {state.status === "error" && (
                <span className="text-sm text-rose-600 dark:text-rose-400">
                  {state.message}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              This form uses validation, a rate limit, and a honeypot to reduce spam. Server-side sending via SES will be added next.
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
