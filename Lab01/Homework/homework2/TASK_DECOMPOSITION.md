# HW2 — Drum Kit Engine

## 1. Objective

Build a browser-based drum kit using semantic HTML, modern CSS, and vanilla JavaScript ES6+.

## 2. Architectural Constraints

- Use HTML5, CSS, and vanilla JavaScript.
- Do not use external libraries or script CDNs.
- Define the HTML data-sound contract before implementing JavaScript.
- Separate audio playback logic from UI event handling.
- Support polyphonic audio playback.
- Use keydown and event.key.
- Ignore repeated keyboard events using event.repeat.
- Record beat events in a FIFO queue with timestamps.
- Keep all audio samples in the local assets directory.
- Do not use inline event handlers or innerHTML.

## 3. Work Breakdown Structure

| Task | Scope                           | Acceptance Criteria                    |
| ---- | ------------------------------- | -------------------------------------- |
| T-01 | HTML sound contract             | Every pad has data-key and data-sound  |
| T-02 | Audio engine                    | Multiple sounds can overlap            |
| T-03 | Keyboard controller             | Keydown mapping and repeat protection  |
| T-04 | Beat recorder                   | FIFO events with timestamps            |
| T-05 | Playback and verification       | Recorded sequence can be replayed      |
| T-06 | Accessibility and responsive UI | Keyboard, visible focus, mobile layout |

## 4. HTML Data Contract

Each drum pad must define:

- data-key: the keyboard key assigned to the pad.
- data-sound: a relative path to its local audio sample.
- A visible label describing the sound.

JavaScript reads these attributes rather than hardcoding audio paths in a switch statement.

## 5. Audio Engine Contract

- The engine receives a valid audio source path.
- Each play request creates an independent playback instance.
- Audio playback must not depend on DOM rendering.
- Audio errors must not crash the application.

## 6. Beat Recorder Contract

Each recorded event contains:

- key: the keyboard key.
- sound: the audio source path.
- timestamp: the event time in milliseconds.
- elapsed: the time since recording began.

Events are appended to the end of the queue and processed in their recorded order.

## 7. Verification

- Verify the data-sound contract before implementing JavaScript.
- Test overlapping sounds.
- Hold a key and verify event.repeat protection.
- Record several beats and check FIFO ordering.
- Replay the sequence and inspect timestamps.
- Test keyboard navigation and the 375px viewport.
