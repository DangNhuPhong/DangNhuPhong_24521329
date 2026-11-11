import { memo } from "react";

export const PianoKey = memo(function PianoKey({
  note,
  x,
  pressed,
  onDown,
  onUp,
}) {
  return (
    <button
      type="button"
      aria-label={`${note.name} piano key`}
      aria-pressed={pressed}
      title={`${note.name} - ${note.freqHz.toFixed(1)} Hz`}
      className={`piano-key ${note.isBlack ? "black" : "white"} ${
        pressed ? "pressed" : ""
      }`}
      style={{ left: x }}
      onPointerDown={(event) => {
        event.preventDefault();

        event.currentTarget.setPointerCapture(event.pointerId);

        onDown(note.midi);
      }}
      onPointerUp={() => onUp(note.midi)}
      onPointerCancel={() => onUp(note.midi)}
      onKeyDown={(event) => {
        if (
          (event.code === "Space" || event.code === "Enter") &&
          !event.repeat
        ) {
          event.preventDefault();
          onDown(note.midi);
        }
      }}
      onKeyUp={(event) => {
        if (event.code === "Space" || event.code === "Enter") {
          event.preventDefault();
          onUp(note.midi);
        }
      }}
    >
      <span>{note.name}</span>
    </button>
  );
});
