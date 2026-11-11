export function DecibelMeter({ level }) {
  return (
    <section className="panel" aria-label="Visual sound level">
      <h3>Visual Level</h3>

      <div
        className="meter-track"
        role="meter"
        aria-label="Synthetic hit energy"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={level}
      >
        <div className="meter-fill" style={{ width: `${level}%` }} />
      </div>

      <p className="muted">{level}% — visual indicator</p>
    </section>
  );
}
