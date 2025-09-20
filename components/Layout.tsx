import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'

type LayoutProps = { children: ReactNode }

export default function Layout({ children }: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Initialize from DOM (set by _document) or system preference
  useEffect(() => {
    const htmlHasDark = document.documentElement.classList.contains('dark')
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const initial = stored ?? (htmlHasDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    localStorage.setItem('theme', next)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="header-dark">
        <div className="container flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Jom Smith</h1>
          <nav className="flex items-center gap-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/projects" className="hover:underline">Projects</Link>
            <a
              href="https://github.com/MyGitName7"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>

            <button
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              className="ml-2 btn btn-ghost"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 container p-6">{children}</main>

      {/* Footer */}
      <footer className="footer-dark text-center p-4 text-sm">
        © {new Date().getFullYear()} Jom Smith — Cloud & Security Portfolio
      </footer>
    </div>
  )
}
