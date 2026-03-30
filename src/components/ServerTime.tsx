// This is a React Server Component
export default async function ServerTime() {
  const timestamp = new Date().toISOString()
  await new Promise(resolve => setTimeout(resolve, 100))

  return (
    <div className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-semibold mb-4 text-on-surface">
        Server Component
      </h2>
      <p className="text-on-surface-variant mb-4">
        This component renders on the server with rari's high-performance Rust runtime.
      </p>
      <div className="glass-light rounded-lg p-4 border-b-2 border-secondary">
        <p className="text-sm text-outline mb-1" style={{ fontFamily: 'var(--font-family-label)' }}>Server timestamp:</p>
        <p className="font-mono text-lg text-on-surface">{timestamp}</p>
      </div>
      <p className="text-xs text-outline mt-4" style={{ fontFamily: 'var(--font-family-label)' }}>
        This timestamp was generated on the server and won't change on refresh.
      </p>
    </div>
  )
}
