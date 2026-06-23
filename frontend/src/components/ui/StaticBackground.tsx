export function StaticBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(0,112,243,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(0,112,243,0.05),transparent_50%)]" />
      <div className="absolute inset-0 noise" />
    </div>
  )
}
