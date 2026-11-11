export function HitHistory({ hits }) {
  return (
    <section className="panel" aria-label="Drum hit history">
      <h3>Recent Hits</h3>

      <output role="status" aria-live="polite">
        {hits[0] ? `Last hit: ${hits[0].name}` : "Ready to play"}
      </output>

      <ul className="hit-list">
        {hits.map((hit) => (
          <li key={hit.id}>
            {hit.name}
            <small>{hit.time}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}
