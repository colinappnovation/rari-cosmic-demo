import type { LayoutProps, Metadata } from 'rari'
import VisitorCounter from '@/components/VisitorCounter'

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/planets', label: 'Planets' },
  { href: '/missions', label: 'Missions' },
  { href: '/about', label: 'About' },
]

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-2 no-underline">
                <span className="text-2xl">🔭</span>
                <span className="text-xl font-bold text-gray-900">
                  Cosmic Explorer
                </span>
              </a>
              <VisitorCounter />
            </div>
            <ul className="flex gap-1 list-none m-0">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-gray-700 no-underline hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          Built with <a href="https://rari.build" className="text-indigo-500 hover:text-indigo-600 no-underline">rari</a> &mdash; React Server Components on Rust
        </div>
      </footer>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Cosmic Explorer',
  description: 'Explore the solar system with React Server Components powered by Rust',
}
