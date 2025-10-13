// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-slate-600 md:flex-row md:px-6">
        <p>© {new Date().getFullYear()} Jom Smith. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a className="hover:underline" href="/about">About</a>
          <a className="hover:underline" href="/projects">Projects</a>
          <a className="hover:underline" href="mailto:you@example.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}
