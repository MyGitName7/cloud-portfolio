// components/Header.tsx
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import NavLink from "./NavLink";

function IconGitHub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" {...props}>
      <path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.77-1.34-1.77-1.09-.74.09-.72.09-.72 1.2.08 1.83 1.23 1.83 1.23 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.97 0-1.32.47-2.4 1.23-3.25-.12-.3-.53-1.55.12-3.23 0 0 1.01-.32 3.3 1.24a11.48 11.48 0 0 1 6.01 0c2.29-1.56 3.3-1.24 3.3-1.24.65 1.68.24 2.93.12 3.23.77.85 1.23 1.93 1.23 3.25 0 4.64-2.81 5.66-5.49 5.97.43.37.81 1.1.81 2.23v3.3c0 .32.21.69.83.57A12 12 0 0 0 12 .5Z"/>
    </svg>
  );
}
function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" {...props}>
      <path fill="currentColor" d="M20.45 20.45h-3.55v-5.59c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.68H9.37V9h3.4v1.56h.05c.47-.89 1.61-1.83 3.32-1.83 3.55 0 4.21 2.34 4.21 5.39v6.33ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.57 20.45h3.55V9H3.57v11.45Z"/>
    </svg>
  );
}
function IconSun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM3 11a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2h1Zm19 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM5.64 5.64a1 1 0 0 1 1.41 0l.71.71a1 1 0 1 1-1.41 1.41l-.71-.71a1 1 0 0 1 0-1.41Zm11.31 11.31a1 1 0 0 1 1.41 0l.71.71a1 1 0 0 1-1.41 1.41l-.71-.71a1 1 0 0 1 0-1.41Zm0-9.19a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 1 1-1.41 1.41l-.71-.71Zm-11.31 11.3a1 1 0 0 1 1.41-1.41l.71.71A1 1 0 0 1 6.34 20l-.71-.71a1 1 0 0 1 0-1.41Z"/>
    </svg>
  );
}
function IconMoon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z"/>
    </svg>
  );
}

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const toggleTheme = () => mounted && setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="h-7 w-7" />
          <span className="text-base font-semibold tracking-tight">Jom Smith</span>
          <span className="pointer-events-none ml-1 hidden h-1 w-10 rounded bg-brand/20 transition group-hover:w-16 group-hover:bg-brand/40 md:inline-block" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/tools">Tools</NavLink>

          {/* Theme toggle + icons */}
          <div className="ml-2 flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              title="Toggle theme"
            >
              {mounted && resolvedTheme === "dark" ? <IconSun /> : <IconMoon />}
            </button>
            <a
              href="https://github.com/MyGitName7"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="GitHub"
              title="GitHub"
            >
              <IconGitHub />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <IconLinkedIn />
            </a>
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          onClick={() => (document.getElementById("mobile-nav")!.classList.toggle("hidden"))}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      <nav id="mobile-nav" className="hidden border-t border-slate-200 px-4 py-3 dark:border-slate-800 md:hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/tools">Tools</NavLink>
          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              title="Toggle theme"
            >
              {mounted && resolvedTheme === "dark" ? <IconSun /> : <IconMoon />}
            </button>
            <a
              href="https://github.com/MyGitName7"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="GitHub"
              title="GitHub"
            >
              <IconGitHub />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <IconLinkedIn />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
