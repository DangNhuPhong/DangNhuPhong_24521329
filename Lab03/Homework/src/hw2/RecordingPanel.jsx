export function RecordingPanel({ events }) {
  return (
    <section className="panel">
      <h3>Recorded Notes</h3>

      <p className="muted">{events.length} note events</p>

      <ol className="sequence-list">
        {events.map((event, index) => (
          <li key={`${event.midi}-${event.deltaMs}-${index}`}>
            MIDI {event.midi}
            {" - "}
            {event.freqHz.toFixed(1)} Hz
            {" - "}
            Start: {Math.round(event.deltaMs)} ms
            {" - "}
            Duration: {Math.round(event.durationMs)} ms
          </li>
        ))}
      </ol>
    </section>
  );
}
