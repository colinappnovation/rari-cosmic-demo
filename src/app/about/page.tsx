import type { PageProps, Metadata } from 'rari'

export default function AboutPage(_params: PageProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-on-surface mb-2">About This Demo</h1>
        <p className="text-on-surface-variant">
          A showcase of what rari can do.
        </p>
      </div>

      <div className="bg-surface-container rounded-sm p-8 ghost-border space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-on-surface mb-3">What is rari?</h2>
          <p className="text-on-surface-variant">
            rari is a performance-first React framework with a Rust runtime. It brings React Server
            Components to a high-performance Rust HTTP server with an embedded V8 engine, giving you
            the best of both worlds: React's developer experience and Rust's speed.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-on-surface mb-3">Features Demonstrated</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-low rounded-sm p-4 ghost-border">
              <h3 className="font-medium text-on-surface mb-1">Server Components</h3>
              <p className="text-sm text-on-surface-variant">
                The dashboard stats, planet detail pages, and mission timeline are all server components
                that run async code on the Rust runtime.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-sm p-4 ghost-border">
              <h3 className="font-medium text-on-surface mb-1">Client Components</h3>
              <p className="text-sm text-on-surface-variant">
                The planet search/filter, visitor counter, and interactive UI elements use the
                'use client' directive for browser interactivity.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-sm p-4 ghost-border">
              <h3 className="font-medium text-on-surface mb-1">File-Based Routing</h3>
              <p className="text-sm text-on-surface-variant">
                Routes are defined by the file structure under src/app/. Dynamic segments like
                /planets/[id] map to folder names with brackets.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-sm p-4 ghost-border">
              <h3 className="font-medium text-on-surface mb-1">Suspense &amp; Streaming</h3>
              <p className="text-sm text-on-surface-variant">
                The dashboard uses React Suspense boundaries so server components can stream in
                progressively with loading fallbacks.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-sm p-4 ghost-border">
              <h3 className="font-medium text-on-surface mb-1">Nested Layouts</h3>
              <p className="text-sm text-on-surface-variant">
                The root layout wraps all pages with a shared nav and footer. Layouts persist across
                navigations without remounting.
              </p>
            </div>
            <div className="bg-surface-container-low rounded-sm p-4 ghost-border">
              <h3 className="font-medium text-on-surface mb-1">Tailwind CSS 4</h3>
              <p className="text-sm text-on-surface-variant">
                All styling uses Tailwind CSS v4 with the Vite plugin for instant compilation
                and zero-config setup.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-on-surface mb-3">Tech Stack</h2>
          <ul className="space-y-2 text-on-surface-variant">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <strong className="text-on-surface">rari</strong> &mdash; React Server Components on Rust
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <strong className="text-on-surface">React 19</strong> &mdash; Server &amp; client components
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-dim" />
              <strong className="text-on-surface">Tailwind CSS 4</strong> &mdash; Utility-first styling
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
              <strong className="text-on-surface">Vite</strong> &mdash; Build toolchain with HMR
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-dim" />
              <strong className="text-on-surface">TypeScript</strong> &mdash; Full type safety
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'About | Cosmic Explorer',
  description: 'Learn about this rari demo application',
}
