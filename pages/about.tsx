import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About — Jom Smith</title>
        <meta name="description" content="About Jom Smith — Cloud & Security engineer focused on AWS." />
      </Head>

      <section className="max-w-3xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold">About</h1>
          <p className="mt-2 text-gray-600">
            I’m Jom Smith — a cloud & security engineer focused on AWS. I enjoy building small,
            useful projects (serverless, IaC, cost visibility) and writing down what I learn so others
            can move faster.
          </p>
        </header>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Currently</h2>
          <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
            <li>Learning path: AWS Solutions Architect + Security specialty</li>
            <li>Tooling: Terraform, AWS CDK, Docker, GitHub Actions</li>
            <li>Focus: secure-by-default patterns and cost-aware design</li>
          </ul>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "AWS (Lambda, API Gateway, S3, CloudFront, IAM)",
              "Networking (VPC, Security Groups, NACLs)",
              "Serverless patterns",
              "Infrastructure as Code (CDK/Terraform)",
              "Monitoring (CloudWatch)"
            ].map((s) => (
              <span key={s} className="rounded-full border px-3 py-1 text-sm bg-gray-50">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Contact</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            <a className="underline" href="mailto:jmp6232@gmail.com">Email</a>
            <a className="underline" href="https://github.com/MyGitName7" target="_blank" rel="noreferrer">GitHub</a>
            <a className="underline" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </section>
    </>
  );
}
