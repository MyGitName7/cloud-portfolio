import Head from "next/head";
import Link from "next/link";

type Project = {
  slug: string;
  name: string;
  summary: string;
  tech: string[];
  repo?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    slug: "serverless-image-resizer",
    name: "Serverless Image Resizer",
    summary: "S3 → Lambda → CloudFront pipeline to optimize images on upload.",
    tech: ["S3", "Lambda", "API Gateway", "CloudFront", "IAM"],
    repo: "https://github.com/MyGitName7/serverless-image-resizer"
  },
  {
    slug: "cost-explorer-mini-dashboard",
    name: "Cost Explorer Mini-Dashboard",
    summary: "Scheduled Lambda pulls Cost Explorer → DynamoDB → API Gateway UI.",
    tech: ["Lambda", "EventBridge", "DynamoDB", "IAM"],
    repo: "https://github.com/MyGitName7/cost-explorer-mini-dashboard"
  }
];

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects — Jom Smith</title>
        <meta name="description" content="AWS cloud & security projects by Jom Smith." />
      </Head>

      <section className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-2 muted">Hands-on experiments, notes, and small utilities.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="card card-hover focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-blue-500"
            >
              <header className="flex items-start justify-between">
                <h2 className="text-xl font-semibold">{p.name}</h2>
              </header>

              <p className="mt-2">{p.summary}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="badge dark:border-slate-600 bg-gray-50 dark:bg-slate-800">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/projects/${p.slug}`}
                  className="btn btn-primary"
                >
                  Project Details
                </Link>

                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost"
                  >
                    GitHub Repo
                  </a>
                )}

                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
