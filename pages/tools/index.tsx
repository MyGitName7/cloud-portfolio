// pages/tools/index.tsx
import Head from "next/head";

const groups = [
  {
    title: "AWS",
    items: [
      ["Lambda", "Serverless compute for APIs & jobs"],
      ["API Gateway", "Front door for serverless APIs"],
      ["S3", "Static hosting & object storage"],
      ["CloudFront", "Global CDN + HTTPS"],
      ["IAM", "Roles & least-privilege access"],
      ["CDK", "Infrastructure as code (TypeScript)"],
    ],
  },
  {
    title: "Web",
    items: [
      ["Next.js", "React framework (SSR/SSG/ISR)"],
      ["TypeScript", "Safer JavaScript with types"],
      ["Tailwind CSS", "Utility-first CSS for fast UI"],
    ],
  },
  {
    title: "Dev & Ops",
    items: [
      ["Python / Node.js", "APIs, Lambdas, tooling"],
      ["Git & GitHub", "Version control & CI/CD hooks"],
      ["CloudWatch", "Logs, metrics, alarms"],
      ["WSL / Linux", "Local dev parity with cloud"],
    ],
  },
];

export default function Tools() {
  return (
    <>
      <Head>
        <title>Tools — Jom Smith</title>
        <meta name="description" content="Stack and services used to build practical AWS projects." />
      </Head>

      <main className="min-h-screen py-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-extrabold">Tools & Stack</h1>
          <p className="mt-2 text-slate-600">
            The core services and frameworks I use to build serverless-first apps on AWS.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {groups.map((g) => (
              <section key={g.title} className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h2 className="text-lg font-semibold">{g.title}</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {g.items.map(([name, note]) => (
                    <li key={name} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-400" />
                      <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-slate-600">{note}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
