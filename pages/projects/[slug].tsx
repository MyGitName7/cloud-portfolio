import { useRouter } from "next/router";
import Link from "next/link";

const data: Record<string, {
  title: string;
  date: string;
  services: string[];
  cost: string;
  repo?: string;
  demo?: string;
  summary: string;
  architecture: string[];
  lessons: string[];
}> = {
  "serverless-image-resizer": {
    title: "Serverless Image Resizer",
    date: "2025-09-19",
    services: ["S3","Lambda","API Gateway","CloudFront","IAM"],
    cost: "$0–$2/mo at low traffic",
    repo: "https://github.com/YOURUSER/serverless-image-resizer",
    summary: "Automatically create optimized sizes when an image is uploaded.",
    architecture: [
      "User uploads image to S3 'uploads' bucket",
      "S3 event triggers Lambda",
      "Lambda writes optimized images to 'processed' prefix",
      "CloudFront serves optimized images with caching"
    ],
    lessons: [
      "Use least-privilege IAM for Lambda to access only specific S3 prefixes",
      "Configure CloudFront cache headers for images",
      "Add CloudWatch logs and alarms for Lambda errors"
    ]
  },
  "cost-explorer-dashboard": {
    title: "Cost Explorer Mini-Dashboard",
    date: "2025-09-19",
    services: ["Lambda","EventBridge","DynamoDB","API Gateway","IAM"],
    cost: "$0–$1/mo in free tier",
    repo: "https://github.com/YOURUSER/cost-explorer-dashboard",
    summary: "Nightly job pulls cost data and exposes a simple API to render charts.",
    architecture: [
      "EventBridge scheduled rule triggers Lambda nightly",
      "Lambda queries Cost Explorer API",
      "Results stored in DynamoDB for quick reads",
      "API Gateway endpoint serves data to the front-end"
    ],
    lessons: [
      "Add AWS Budgets alerts as a guardrail",
      "Use on-demand capacity for DynamoDB to start",
      "Secure API with IAM auth (SigV4) or simple API key for demo"
    ]
  }
};

export default function ProjectPage() {
  const { query } = useRouter();
  const slug = String(query.slug || "");
  const p = data[slug];

  if (!p) {
    return (
      <main className="min-h-screen">
        <section className="container py-14">
          <h1 className="text-2xl font-semibold">Project not found</h1>
          <p className="mt-4"><Link href="/projects">Back to Projects</Link></p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <section className="container py-14 prose max-w-none">
        <p><Link href="/projects">← Back to Projects</Link></p>
        <h1>{p.title}</h1>
        <p><strong>Date:</strong> {p.date} &nbsp; | &nbsp; <strong>Cost:</strong> {p.cost}</p>
        <div className="flex flex-wrap gap-2 not-prose">
          {p.services.map(s => <span key={s} className="badge">{s}</span>)}
        </div>
        <p className="mt-4">{p.summary}</p>
        <h2>Architecture (high level)</h2>
        <ol>
          {p.architecture.map((a, i) => <li key={i}>{a}</li>)}
        </ol>
        <h2>Lessons learned</h2>
        <ul>
          {p.lessons.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
        {p.repo && <p><a href={p.repo} target="_blank" rel="noreferrer">GitHub Repo</a></p>}
      </section>
    </main>
  );
}
