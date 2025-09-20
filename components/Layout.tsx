import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [dark, setDark] = useState(false)

  // Sync dark mode preference with <html> class
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <header className="bg-gray-900 dark:bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Jom Smith</h1>
          <nav className="space-x-4 flex items-center">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <button
              onClick={() => setDark(!dark)}
              className="ml-4 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm"
            >
              {dark ? '☀️ Light' : '🌙 Dark'}
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-center p-4 text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Jom Smith — Cloud & Security Portfolio
      </footer>
    </div>
  )
}
