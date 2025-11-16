// pages/index.tsx
import Head from "next/head";
import Link from "next/link";

type Project = {
  title: string;
  status: "Prototype" | "Planned" | "Live";
  blurb: string;
  stack: string[];
  href?: string;
};

const featured: Project[] = [
  {
    title: "Real Estate AI Content Generator",
    status: "Prototype",
    blurb:
      "Serverless Python + AWS Lambda app that generates listing descriptions and captions for realtors.",
    stack: ["Next.js", "Python", "AWS Lambda", "API Gateway", "Tailwind"],
  },
  {
    title: "Serverless Contact Form",
    status: "Planned",
    blurb:
      "Contact form with AWS Lambda + SES (email) and simple spam filtering. No servers to manage.",
    stack: ["Lambda", "API Gateway", "SES", "CloudWatch"],
  },
  {
    title: "AI Resume/Bullet Generator",
    status: "Planned",
    blurb:
      "Takes a job description and outputs tailored resume bullets and a summary.",
    stack: ["Next.js", "Lambda", "Tailwind"],
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Cloud Portfolio — Projects & Learning</title>
        <meta
          name="description"
          content="Practical AWS/serverless projects and notes toward a Cloud & Cybersecurity career."
        />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(ellipse_at_top,theme(colors.brand.100),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,theme(colors.brand.900),transparent_55%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white dark:to-slate-950" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24 md:px-6">
            <div className="text-center">
              <span className="inline-block rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-medium tracking-wide text-brand-700 dark:border-brand/30 dark:bg-brand/15 dark:text-brand-300">
                Cloud • Security • Serverless
              </span>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Building a Cloud & Cybersecurity portfolio.
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300/90">
                This site documents hands-on learning with AWS and serverless development:
                small apps, infrastructure experiments, and notes that reflect real progress.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Link
                  href="/projects"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 dark:bg-white dark:text-slate-900"
                >
                  View Projects
                </Link>
                <Link
                  href="/about"
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  About This Portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="px-4 pb-20 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Featured Projects</h2>
              <span className="h-1 w-24 rounded bg-brand/30 dark:bg-brand/50" />
            </div>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              A snapshot of current builds and upcoming experiments.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {featured.map((p) => (
                <article
                  key={p.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <span
                      className={
                        "rounded-full px-2.5 py-0.5 text-xs font-medium " +
                        (p.status === "Live"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                          : p.status === "Prototype"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300")
                      }
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300/90">
                    {p.blurb}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Link
                      href="/projects"
                      className="text-sm font-medium text-slate-900 underline underline-offset-4 dark:text-white/90"
                    >
                      Details
                    </Link>
                    {p.href && (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-brand-700 underline underline-offset-4 dark:text-brand-300"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
