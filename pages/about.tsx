// pages/about.tsx
import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About — Jom Smith</title>
        <meta name="description" content="About Jom Smith — Cloud & Security portfolio." />
      </Head>

      <main className="min-h-screen py-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-extrabold">About</h1>
          <p className="mt-3 text-slate-600">
            I’m Jom—an Army veteran and Cloud/Cybersecurity professional based in Minnesota.
            I design and ship practical AWS projects, with a focus on serverless architectures,
            clear documentation, and security-minded defaults.
          </p>

          <section className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Snapshot */}
            <article className="rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Snapshot</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>• BS in Cybersecurity; AS in Web Programming & Database Dev</li>
                <li>• 7 years Army National Guard (Team Lead / QRF / SOC coordination)</li>
                <li>• IT Field Support → growing Cloud/Security engineering track</li>
                <li>• Building with Next.js, Python, AWS (Lambda, API Gateway, S3, CloudFront)</li>
              </ul>
            </article>

            {/* Skills */}
            <article className="rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Core Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {[
                  "AWS (Lambda, API Gateway, S3, CloudFront, IAM, CDK)",
                  "Python",
                  "TypeScript / Next.js",
                  "Tailwind CSS",
                  "Security fundamentals",
                  "Linux / WSL",
                  "Git & CI/CD",
                ].map((s) => (
                  <span key={s} className="rounded-full bg-slate-100 px-2.5 py-0.5">
                    {s}
                  </span>
                ))}
              </div>
            </article>
          </section>

          {/* Certifications */}
          <section className="mt-10 rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Certifications & Training</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li>AWS Cloud Practitioner — in review phase</li>
              <li>Security+ practice & SOC Level 1 training (TryHackMe)</li>
              <li>BLS; EMT coursework planned (separate track)</li>
            </ul>
          </section>

          {/* CTA */}
          <section className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              View Projects
            </Link>
            <a
              href="mailto:you@example.com"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Contact
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
