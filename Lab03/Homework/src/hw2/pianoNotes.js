const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const PIANO_NOTES = Array.from({ length: 88 }, (_, index) => {
  const midi = index + 21;
  const name = NAMES[midi % 12];

  return {
    midi,
    name: `${name}${Math.floor(midi / 12) - 1}`,
    isBlack: name.includes("#"),
    freqHz: 440 * 2 ** ((midi - 69) / 12),
  };
});

export const WHITE_COUNT = PIANO_NOTES.filter((note) => !note.isBlack).length;
