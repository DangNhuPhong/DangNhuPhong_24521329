export default function DetailSkeleton() {
  return (
    <section
      className="detail-card skeleton"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <p>Loading person details…</p>

      <span className="skeleton-line" aria-hidden="true" />

      <span className="skeleton-line" aria-hidden="true" />

      <span className="skeleton-line" aria-hidden="true" />
    </section>
  );
}
