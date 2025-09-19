import Link from "next/link";

const projects = [
  { slug: "serverless-image-resizer", title: "Serverless Image Resizer" },
  { slug: "cost-explorer-dashboard", title: "Cost Explorer Mini-Dashboard" },
];

export default function ProjectsIndex() {
  return (
    <main className="min-h-screen">
      <section className="container py-14">
        <h1 className="text-3xl font-bold">Projects</h1>
        <ul className="list-disc pl-6 mt-6">
          {projects.map(p => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
