import Link from "next/link";

const projects = [
  {
    slug: "serverless-image-resizer",
    title: "Serverless Image Resizer",
    summary: "S3 -> Lambda -> CloudFront pipeline to optimize images on upload.",
    services: ["S3","Lambda","API Gateway","CloudFront","IAM"],
    repo: "https://github.com/YOURUSER/serverless-image-resizer",
  },
  {
    slug: "cost-explorer-dashboard",
    title: "Cost Explorer Mini-Dashboard",
    summary: "Scheduled Lambda pulls Cost Explorer -> DynamoDB -> API Gateway UI.",
    services: ["Lambda","EventBridge","DynamoDB","IAM"],
    repo: "https://github.com/YOURUSER/cost-explorer-dashboard",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="container py-14">
        <h1 className="text-3xl md:text-5xl font-bold">Jom Smith — Cloud & Security</h1>
        <p className="mt-3 text-lg">AWS projects, notes, and experiments. Auto-deployed with Amplify.</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {projects.map(p => (
            <div key={p.slug} className="card">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{p.summary}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.services.map(s => (
                  <span key={s} className="badge">{s}</span>
                ))}
              </div>
              <div className="mt-4 flex gap-4">
                <Link href={`/projects/${p.slug}`}>Project Details</Link>
                <Link href={p.repo} target="_blank">GitHub Repo</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
