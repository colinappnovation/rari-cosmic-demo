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
    <div className="min-h-screen bg-surface relative overflow-hidden">
      {/* Nebula blur decorations */}
      <div className="nebula-blur" style={{ width: 600, height: 600, top: -200, left: -200, background: '#be14ee' }} />
      <div className="nebula-blur" style={{ width: 500, height: 500, bottom: -100, right: -200, background: '#00c3eb' }} />

      <nav className="glass ghost-border sticky top-0 z-50 border-b border-outline-variant/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-2 no-underline">
                <span className="text-2xl">🔭</span>
                <span className="text-xl font-bold text-on-surface">
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
                    className="px-4 py-2 text-sm font-medium text-on-surface-variant no-underline hover:text-primary hover:bg-surface-container-high rounded-md transition-colors"
                    style={{ fontFamily: 'var(--font-family-label)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">{children}</main>
      <footer className="border-t border-outline-variant/15 bg-surface-container-low mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-outline" style={{ fontFamily: 'var(--font-family-label)' }}>
          Built with <a href="https://rari.build" className="text-primary hover:text-primary-container no-underline">rari</a> &mdash; React Server Components on Rust
        </div>
      </footer>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Cosmic Explorer',
  description: 'Explore the solar system with React Server Components powered by Rust',
}
