import { memo, useMemo } from "react";
import { PIANO_NOTES, WHITE_COUNT } from "./pianoNotes";
import { PianoKey } from "./PianoKey";

const WHITE_WIDTH = 28;
const BLACK_WIDTH = 18;

export const PianoKeyboard = memo(function PianoKeyboard({
  active,
  onDown,
  onUp,
}) {
  const positions = useMemo(() => {
    let whites = 0;

    return PIANO_NOTES.map((note) => {
      const x = note.isBlack
        ? whites * WHITE_WIDTH - BLACK_WIDTH / 2
        : whites++ * WHITE_WIDTH;

      return { note, x };
    });
  }, []);

  return (
    <div
      className="piano-scroll"
      role="group"
      aria-label="88 piano keys"
      tabIndex={0}
    >
      <div
        className="piano-keyboard"
        style={{
          width: WHITE_COUNT * WHITE_WIDTH,
        }}
      >
        {positions.map(({ note, x }) => (
          <PianoKey
            key={note.midi}
            note={note}
            x={x}
            pressed={active.has(note.midi)}
            onDown={onDown}
            onUp={onUp}
          />
        ))}
      </div>
    </div>
  );
});
