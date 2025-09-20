import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

const asciiExamples: Record<string, string> = {
  "serverless-image-resizer": `
+---------+        PutObject        +--------+       Invoke       +-----------+
|  Client |  -------------------->  |  S3    |  --------------->  |  Lambda   |
+---------+                         +--------+                    +-----------+
                                        |                                |
                                        |   CloudFront Origin            |
                                        v                                |
                                    +----------+                         |
                                    | CloudFront|  <---------------------+
                                    +----------+
`.trim(),
  "cost-explorer-mini-dashboard": `
+-----------+    Scheduled    +---------+     Write     +-----------+
| EventBridge|  ------------> | Lambda  |  ---------->  | DynamoDB  |
+-----------+                 +---------+               +-----------+
                                    |    Read/Expose
                                    v
                              +-------------+
                              | API Gateway |
                              +-------------+
`.trim(),
};

export default function ProjectDetail() {
  const { query } = useRouter();
  const slug = String(query.slug || "");
  const title = slug ? slug.replaceAll("-", " ") : "Project";

  const ascii = asciiExamples[slug] ?? `
+------ placeholder ------+
|   Add your diagram here |
+-------------------------+
`.trim();

  return (
    <>
      <Head>
        <title>{`${title} — Project — Jom Smith`}</title>
        <meta name="description" content={`Details and architecture for ${title}.`} />
      </Head>

      <article className="max-w-3xl mx-auto card card-hover">
        <h1 className="text-2xl font-bold capitalize">{title}</h1>
        <p className="mt-2 muted">
          Coming soon: detailed write-up, architecture diagram, Infrastructure-as-Code snippets,
          and lessons learned.
        </p>

        <section className="mt-6">
          <h2 className="text-lg font-semibold">Architecture (draft)</h2>
          <pre className="mt-2 overflow-auto rounded-lg border p-4 bg-gray-50 dark:bg-slate-900 dark:border-slate-700 text-sm leading-6">
{ascii}
          </pre>
        </section>

        <div className="mt-6 flex gap-3">
          <Link href="/projects" className="btn btn-ghost">← Back to Projects</Link>
        </div>
      </article>
    </>
  );
}
