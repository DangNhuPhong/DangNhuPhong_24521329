export function PianoControls({
  recording,
  replaying,
  speed,
  hasSequence,
  onStartRecording,
  onStopRecording,
  onPlay,
  onStop,
  onSpeed,
}) {
  return (
    <section className="panel stack" aria-label="Piano recording controls">
      <h3>Recording & Replay</h3>

      <div className="row">
        <button
          type="button"
          className="action primary"
          disabled={recording || replaying}
          onClick={onStartRecording}
        >
          Start Recording
        </button>

        <button
          type="button"
          className="action"
          disabled={!recording}
          onClick={onStopRecording}
        >
          End Recording
        </button>

        <button
          type="button"
          className="action primary"
          disabled={!hasSequence || recording || replaying}
          onClick={onPlay}
        >
          Replay
        </button>

        <button type="button" className="action" onClick={onStop}>
          Stop Sequence / All Notes
        </button>
      </div>

      <label htmlFor="piano-speed">Replay Speed</label>

      <select
        id="piano-speed"
        value={speed}
        onChange={(event) => onSpeed(Number(event.target.value))}
      >
        <option value={0.5}>0.5×</option>
        <option value={1}>1×</option>
        <option value={2}>2×</option>
      </select>

      <p role="status" aria-live="polite">
        {recording ? "Recording..." : replaying ? "Replaying..." : "Ready"}
      </p>
    </section>
  );
}
