// pages/projects/index.tsx
import Head from "next/head";

type Project = {
  title: string;
  status: "Live" | "Prototype" | "Planned";
  blurb: string;
  stack: string[];
  demo?: string;
  repo?: string;
};

const projects: Project[] = [
  {
    title: "Real Estate AI Content Generator",
    status: "Prototype",
    blurb:
      "Serverless Next.js + Python app on AWS Lambda that generates property listing descriptions and social captions.",
    stack: ["Next.js", "Python", "AWS Lambda", "API Gateway", "Tailwind"],
    // demo: "https://...", repo: "https://github.com/..."
  },
  {
    title: "Serverless Contact Form",
    status: "Planned",
    blurb:
      "Email contact form powered by AWS Lambda + SES with basic spam checks and CloudWatch logging. Zero servers.",
    stack: ["Lambda", "API Gateway", "SES", "CloudWatch"],
  },
  {
    title: "AI Resume/Bullet Generator",
    status: "Planned",
    blurb:
      "Paste a job description and receive tailored resume bullets and a concise professional summary.",
    stack: ["Next.js", "Lambda", "Tailwind"],
  },
  {
    title: "URL Shortener (CDK)",
    status: "Planned",
    blurb:
      "Small infra project using AWS CDK to provision a Lambda + API Gateway powered short link service.",
    stack: ["AWS CDK", "Lambda", "API Gateway"],
  },
];

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects — Jom Smith</title>
        <meta name="description" content="Hands-on AWS and serverless projects." />
      </Head>

      <main className="min-h-screen py-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-extrabold">Projects</h1>
          <p className="mt-2 text-slate-600">
            A growing collection of practical AWS labs and serverless apps.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-slate-200 p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <span
                    className={
                      "rounded-full px-2.5 py-0.5 text-xs font-medium " +
                      (p.status === "Live"
                        ? "bg-green-100 text-green-700"
                        : p.status === "Prototype"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-700")
                    }
                  >
                    {p.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-600">{p.blurb}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {(p.demo || p.repo) && (
                  <div className="mt-4 flex gap-3">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-slate-900 underline underline-offset-4"
                      >
                        Demo
                      </a>
                    )}
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-slate-900 underline underline-offset-4"
                      >
                        Repo
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
