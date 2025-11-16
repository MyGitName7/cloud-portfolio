// pages/about.tsx
import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About — Cloud Portfolio</title>
        <meta name="description" content="About this Cloud & Cybersecurity portfolio." />
      </Head>

      <main className="min-h-screen py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header row */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar badge with neutral initials */}
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand/20 to-brand/40 text-lg font-bold text-slate-900 dark:from-brand/15 dark:to-brand/25 dark:text-white">
                CP
              </div>
              <div>
                <h1 className="text-3xl font-extrabold">About this portfolio</h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Cloud &amp; Security • Serverless • AWS
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/projects"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 dark:bg-white dark:text-slate-900"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Contact
              </Link>
            </div>
          </div>

          <p className="mt-6 text-slate-600 dark:text-slate-300/90">
            This site tracks a learning journey into Cloud and Cybersecurity. The goal is to
            build practical, serverless projects on AWS and document the process—what worked,
            what didn’t, and why decisions were made. Expect small, iterative apps with clear
            write-ups rather than glossy demos.
          </p>

          <section className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Focus areas */}
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold">Focus Areas</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300/90">
                <li>Serverless patterns on AWS (Lambda, API Gateway, S3, CloudFront)</li>
                <li>Security-minded defaults and basic guardrails</li>
                <li>Infrastructure as Code using AWS CDK</li>
                <li>Clear docs and reproducible steps</li>
              </ul>
            </article>

            {/* Current skills */}
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold">Current Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {[
                  "AWS (Lambda, API Gateway, S3, CloudFront, IAM, CDK)",
                  "Python",
                  "TypeScript / Next.js",
                  "Tailwind CSS",
                  "Linux / WSL",
                  "Git & CI/CD",
                ].map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-slate-100 px-2.5 py-0.5 dark:bg-slate-800"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          </section>

          {/* Roadmap */}
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold">Roadmap (near term)</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300/90">
              <li>Finish a serverless contact form (Lambda + SES)</li>
              <li>Ship a minimal URL shortener with CDK</li>
              <li>Add write-ups for each project (design, tradeoffs, next steps)</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
