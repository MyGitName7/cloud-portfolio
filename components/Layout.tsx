import { ReactNode } from 'react'
import Link from 'next/link'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Jom Smith</h1>
          <nav className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Jom Smith — Cloud & Security Portfolio
      </footer>
    </div>
  )
}
