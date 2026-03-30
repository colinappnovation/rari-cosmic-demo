import Rari from './Rari'

export default function Welcome() {
  return (
    <div className="bg-surface-container rounded-sm p-8 ghost-border">
      <div className="flex items-center gap-4 mb-6">
        <Rari className="w-32 h-auto text-on-surface" />
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-on-surface">
        Welcome to rari!
      </h2>
      <p className="text-on-surface-variant mb-4">
        You've successfully created a new rari application. This is a client component
        that renders on both server and client.
      </p>
      <div className="space-y-2 text-sm text-on-surface-variant">
        <p>
          <strong className="text-primary">High-performance</strong>
          {' '}
          React Server Components
        </p>
        <p>
          <strong className="text-secondary">Optimized</strong>
          {' '}
          Rust runtime
        </p>
        <p>
          <strong className="text-tertiary">Hot module</strong>
          {' '}
          reloading
        </p>
        <p>
          <strong className="text-on-surface">Zero config</strong>
          {' '}
          setup
        </p>
      </div>
    </div>
  )
}
