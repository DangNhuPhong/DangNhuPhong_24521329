# Lab 03 — Production React 19 Homework

## 1. Project Overview

This project implements three homework assignments from Lab 03 using **React 19 and Vite**.

The project focuses on React Hooks, component architecture, accessibility, immutable state, asynchronous operations, performance optimization, and resource cleanup.

### Homework Assignments

| Homework | Title                      | Main Features                                                                                 |
| -------- | -------------------------- | --------------------------------------------------------------------------------------------- |
| HW1      | Production Studio Drum Kit | Keyboard controls, Web Audio API, hit history, visual audio meter                             |
| HW2      | 88-Key Polyphonic Piano    | 88 generated keys, 8-voice polyphony, FIFO voice stealing, recording and replay               |
| HW3      | KRAFTON PUBG Vietnam Arena | Anti-drift countdown, optimistic claim, HTTP 409 rollback, leaderboard, virtualized kill feed |

## 2. Technologies

- React 19
- Vite
- JavaScript (ES Modules)
- JSX
- CSS3
- Web Audio API
- React Hooks
- Git and GitHub Desktop

## 3. Project Structure

```text
Lab03/
├── Exercise/
└── Homework/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── hw1/
    │   │   ├── drumConfig.js
    │   │   ├── drumAudio.js
    │   │   ├── useDrumKeyboard.js
    │   │   ├── DrumPad.jsx
    │   │   ├── HitHistory.jsx
    │   │   ├── DecibelMeter.jsx
    │   │   ├── DrumMachine.jsx
    │   │   └── DrumMachine.css
    │   ├── hw2/
    │   │   ├── pianoNotes.js
    │   │   ├── PianoKey.jsx
    │   │   ├── PianoKeyboard.jsx
    │   │   ├── PolyphonicSynth.js
    │   │   ├── PianoSequencer.js
    │   │   ├── PianoControls.jsx
    │   │   ├── RecordingPanel.jsx
    │   │   ├── GrandPiano88.jsx
    │   │   └── GrandPiano88.css
    │   ├── hw3/
    │   │   ├── pubgData.js
    │   │   ├── usePubgAirdropTimer.js
    │   │   ├── pubgApi.js
    │   │   ├── useCrateClaim.js
    │   │   ├── ClaimButton.jsx
    │   │   ├── AirdropCard.jsx
    │   │   ├── SquadLeaderboard.jsx
    │   │   ├── KillFeed.jsx
    │   │   ├── KraftonPubgVnArena.jsx
    │   │   └── KraftonPubgVnArena.css
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── project-rules.md
    ├── TASK_DECOMPOSITION.md
    ├── AI_FAILURE_AUDIT.md
    ├── package.json
    └── vite.config.js
```

## 4. Installation and Running

### Step 1: Open the Homework directory

```bash
cd Lab03/Homework
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Start development server

```bash
npm run dev
```

Open the local URL displayed by Vite.

### Step 4: Check code quality

```bash
npm run lint
```

### Step 5: Build for production

```bash
npm run build
```

## 5. Homework 1 — Production Studio Drum Kit

### Features

- Seven drum pads controlled by W, A, S, D, J, K, and L.
- Keyboard input using `event.code`.
- Prevention of repeated keydown triggers using `event.repeat`.
- Keyboard shortcut isolation when typing into form controls.
- Audio generated with the Web Audio API.
- Interactive drum pad buttons with accessible states.
- Recent hit history.
- Visual audio energy meter.
- Event listener and audio cleanup.

### Lab 2 Connection

HW1 applies accessibility principles, keyboard event handling, and focus management from Lab 2.

## 6. Homework 2 — 88-Key Polyphonic Piano

### Features

- Algorithmic generation of 88 piano keys from A0 to C8.
- 52 white keys and 36 black keys.
- Frequency calculation using:

`f = 440 × 2^((midi - 69) / 12)`

- Maximum eight simultaneous audio voices.
- FIFO voice stealing when the voice limit is exceeded.
- React `memo()` for component render optimization.
- Note recording and asynchronous replay.
- Replay speeds of 0.5×, 1× and 2×.
- Playback cancellation and audio resource cleanup.

### Lab 2 Connection

HW2 extends the FIFO queue and memoization concepts from Lab 2 into an interactive polyphonic audio application.

## 7. Homework 3 — PUBG Vietnam Arena

### Features

- Timed airdrop events.
- Countdown calculated from timestamp differences.
- Timer synchronization after browser tab visibility changes.
- Four airdrop phases:
  - `WARMUP`
  - `AIRDROP_LIVE`
  - `LOOTED_OUT`
  - `EXPIRED`
- Optimistic stock updates.
- Duplicate claim prevention.
- HTTP 409 conflict simulation and rollback.
- PUBG Vietnam squad leaderboard.
- Search and sorting by WWCD, placement points and kill points.
- Virtualized kill feed.
- Vietnamese currency formatting.

### Lab 2 Connection

HW3 extends Lab 2's anti-drift timer, inventory state management, and virtual scrolling principles into a React 19 application.

The inventory API uses simulated data for frontend demonstration and is not a production transaction service.

## 8. Testing and Verification

The following checks should be completed before submission:

- All three Homeworks render correctly.
- Keyboard events and audio work correctly.
- Event listeners and audio resources are cleaned up.
- Piano voice management follows FIFO behavior.
- Recording and replay work at all supported speeds.
- Countdown remains synchronized after switching tabs.
- Inventory rollback works when a claim fails.
- Leaderboard filtering and sorting work correctly.
- Responsive layout works at a viewport width of 375px.
- `npm run lint` passes.
- `npm run build` passes.
- React DevTools Profiler is used to inspect rendering behavior.

## 9. Git Workflow

Development is divided into small atomic commits.

Each component, hook, service, or major integration step has a corresponding commit documented in `TASK_DECOMPOSITION.md`.

GitHub Desktop is used to review changes, commit tasks, and push updates to the repository.

## 10. AI Failure Audit

`AI_FAILURE_AUDIT.md` documents at least three real issues discovered during AI-assisted development, including:

- The original prompt and generated code.
- A description of the issue.
- Reproduction steps.
- Evidence from browser DevTools.
- Root cause analysis.
- Corrected implementation.
- Related Git commit.

## 11. References

- Lab 03 — Production React 19, KRAFTON PUBG VN & State Machine.
- Lab 02 — Modern React, Virtual DOM, FIFO Audio Queue and Anti-Drift Timer.
- React documentation.
- MDN Web Docs.

## 12. Conclusion

This project demonstrates practical React 19 application development through accessible audio interfaces, concurrent audio management, asynchronous state handling, and inventory synchronization.

The three Homework assignments are implemented in a single Vite project while keeping the Lab 2 source code separate.
