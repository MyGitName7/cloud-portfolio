import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ProjectDetail() {
  const { query } = useRouter();
  const slug = String(query.slug || "");

  return (
    <>
      <Head>
        <title>{slug ? `${slug} — Project` : "Project"} — Jom Smith</title>
      </Head>

      <article className="max-w-3xl mx-auto card">
        <h1 className="text-2xl font-bold capitalize">{slug.replaceAll("-", " ")}</h1>
        <p className="mt-2 muted">
          Coming soon: detailed write-up, architecture diagram, IaC snippets, and lessons learned.
        </p>

        <div className="mt-6 flex gap-3">
          <Link href="/projects" className="btn btn-ghost">← Back to Projects</Link>
        </div>
      </article>
    </>
  );
}
