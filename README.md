# Cloud Portfolio (Next.js + Tailwind, AWS Amplify-ready)

A minimal, professional portfolio to showcase AWS cloud projects. CI/CD with Amplify Hosting.

## Quick start
```bash
npm install
npm run dev
# http://localhost:3000
```

## Build & deploy
1. Create a GitHub repo and push this project.
2. In AWS Console → **Amplify** → **Host a web app** → connect your GitHub → choose `main`.
3. Accept defaults; Amplify will detect Next.js and deploy automatically.
4. Add a custom domain (Route 53) in Amplify's **Domain management** (ACM SSL is free).

## Structure
- `pages/index.tsx` — home with project cards
- `pages/projects/index.tsx` — list of projects
- `pages/projects/[slug].tsx` — project detail template (edit the `data` map)
- `pages/about.tsx` — about + resume
- `styles/globals.css` — Tailwind utilities/components
- `tailwind.config.js`, `postcss.config.js` — Tailwind setup

## Costs
- Typical personal traffic: ~$2–$5/month (Amplify/CloudFront + tiny storage + DNS).

## Customize
- Replace `YOURUSER` links with your GitHub username.
- Edit the `data` in `pages/projects/[slug].tsx` to add real projects.
- Add images under `public/` and reference them in pages.

## Security
- Enable MFA on AWS.
- Principle of least privilege for any future AWS IAM users/roles.
