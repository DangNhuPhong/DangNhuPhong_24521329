export function DrumPad({ pad, pressed, onHit, onRelease }) {
  return (
    <button
      type="button"
      className={pressed ? "drum-pad is-hit" : "drum-pad"}
      aria-pressed={pressed}
      onPointerDown={() => onHit(pad)}
      onPointerUp={() => onRelease(pad.id)}
      onPointerCancel={() => onRelease(pad.id)}
      onPointerLeave={() => onRelease(pad.id)}
      onClick={(event) => {
        if (event.detail === 0) {
          onHit(pad);
        }
      }}
    >
      <strong>{pad.name}</strong>
      <span>{pad.key}</span>
    </button>
  );
}
