# LAB 03 — HOMEWORK TASK DECOMPOSITION

## 1. Project Information

- **Project:** Lab03/Homework
- **Framework:** React 19 + Vite
- **Language:** JavaScript / JSX
- **Assignments:** HW1, HW2, HW3
- **Version Control:** GitHub Desktop
- **Commit Strategy:** One small implementation step per commit

## 2. Phase 1 — Project Documentation

- [x] **1.1** Create `TASK_DECOMPOSITION.md`.
  - Commit: `docs(lab3): create task decomposition`
- [x] **1.2** Create `project-rules.md`.
  - Commit: `docs(lab3): define project rules`
- [x] **1.3** Initialize `AI_FAILURE_AUDIT.md`.
  - Commit: `docs(lab3): initialize AI failure audit`

## 3. Phase 2 — Application Setup

- [x] **2.1** Implement navigation in `src/App.jsx`.
  - Commit: `feat(app): create homework navigation`
- [x] **2.2** Implement navigation styles in `src/App.css`.
  - Commit: `style(app): add navigation styles`
- [x] **2.3** Configure `src/index.css`.
  - Commit: `style(app): configure global styles`

## 4. Phase 3 — HW1: Production Studio Drum Kit

### Step 3 — Drum Configuration and Audio

- [x] **3.1** Create `src/hw1/drumConfig.js`.
  - Define seven drum pads and keyboard mappings.
  - Commit: `feat(hw1): define drum pad configuration`

- [x] **3.2** Create `src/hw1/drumAudio.js`.
  - Implement audio synthesis and resource cleanup.
  - Commit: `feat(hw1): implement drum audio engine`

- [x] **3.3** Create `src/hw1/useDrumKeyboard.js`.
  - Handle keyboard events using `event.code`.
  - Prevent repeat spam and isolate input focus.
  - Commit: `feat(hw1): implement drum keyboard hook`

### Step 4 — Drum Interface

- [x] **4.1** Create `src/hw1/DrumPad.jsx`.
  - Commit: `feat(hw1): create accessible drum pad`

- [x] **4.2** Create `src/hw1/HitHistory.jsx`.
  - Commit: `feat(hw1): add drum hit history`

- [x] **4.3** Create `src/hw1/DecibelMeter.jsx`.
  - Commit: `feat(hw1): add visual sound meter`

- [x] **4.4** Create `src/hw1/DrumMachine.jsx`.
  - Integrate drum pads, audio, hit history and meter.
  - Commit: `feat(hw1): integrate drum machine components`

- [x] **4.5** Create `src/hw1/DrumMachine.css`.
  - Implement responsive layout.
  - Commit: `style(hw1): add responsive drum layout`

### Step 5 — Integration

- [x] **5.1** Integrate `DrumMachine` into `App.jsx`.
  - Commit: `feat(app): integrate drum machine`

## 5. Phase 4 — HW2: 88-Key Polyphonic Piano

### Step 6 — Piano Note Generation

- [x] **6.1** Create `src/hw2/pianoNotes.js`.
  - Generate MIDI notes 21–108.
  - Calculate pitch frequencies.
  - Commit: `feat(hw2): generate 88 piano notes`

### Step 7 — Piano Components

- [x] **7.1** Create `src/hw2/PianoKey.jsx`.
  - Implement individual memoized keys.
  - Commit: `feat(hw2): create memoized piano key`

- [x] **7.2** Create `src/hw2/PianoKeyboard.jsx`.
  - Render 52 white keys and 36 black keys.
  - Commit: `feat(hw2): create 88-key piano keyboard`

- [x] **7.3** Create `src/hw2/GrandPiano88.css`.
  - Implement keyboard appearance and responsive scrolling.
  - Commit: `style(hw2): implement piano keyboard layout`

### Step 8 — Polyphonic Audio

- [x] **8.1** Create `src/hw2/PolyphonicSynth.js`.
  - Support eight simultaneous voices.
  - Implement FIFO voice stealing.
  - Release oscillators safely.
  - Commit: `feat(hw2): implement polyphonic audio synth`

### Step 9 — Recording and Replay

- [x] **9.1** Create `src/hw2/PianoSequencer.js`.
  - Record and replay note timing.
  - Implement cancellation.
  - Commit: `feat(hw2): implement FIFO sequence replay`

- [x] **9.2** Create `src/hw2/PianoControls.jsx`.
  - Add recording, replay, stop and speed controls.
  - Commit: `feat(hw2): add recording controls`

- [x] **9.3** Create `src/hw2/RecordingPanel.jsx`.
  - Display recorded note events.
  - Commit: `feat(hw2): display recorded note events`

### Step 10 — Piano Integration

- [x] **10.1** Create `src/hw2/GrandPiano88.jsx`.
  - Integrate keyboard, synthesis, recording and replay.
  - Commit: `feat(hw2): integrate piano components`

### Step 11 — App Integration

- [x] **11.1** Integrate Piano into `src/App.jsx`.
  - Commit: `feat(app): integrate 88-key piano`

## 6. Phase 5 — HW3: PUBG Vietnam Arena

### Step 12 — Arena Data

- [x] **12.1** Create `src/hw3/pubgData.js`.
  - Define airdrop, leaderboard and kill-feed demo data.
  - Commit: `feat(hw3): define PUBG arena demo data`

### Step 13 — Timer

- [x] **13.1** Create `src/hw3/usePubgAirdropTimer.js`.
  - Implement timestamp-based countdown.
  - Synchronize on visibility changes.
  - Commit: `feat(hw3): implement anti-drift countdown`

### Step 14 — Claim Logic

- [x] **14.1** Create `src/hw3/pubgApi.js`.
  - Simulate claim requests and HTTP 409 responses.
  - Commit: `feat(hw3): simulate inventory claim API`

- [x] **14.2** Create `src/hw3/useCrateClaim.js`.
  - Implement optimistic stock updates and rollback.
  - Commit: `feat(hw3): implement optimistic claim hook`

### Step 15 — Airdrop Components

- [x] **15.1** Create `src/hw3/ClaimButton.jsx`.
  - Commit: `feat(hw3): create claim button`

- [x] **15.2** Create `src/hw3/AirdropCard.jsx`.
  - Render drop details, countdown, status and claim controls.
  - Commit: `feat(hw3): implement airdrop card`

### Step 16 — Leaderboard

- [x] **16.1** Create `src/hw3/SquadLeaderboard.jsx`.
  - Implement squad searching and sorting.
  - Commit: `feat(hw3): create squad leaderboard`

### Step 17 — Virtual Scrolling

- [x] **17.1** Create `src/hw3/KillFeed.jsx`.
  - Render visible rows from a large kill-event list.
  - Commit: `feat(hw3): implement virtualized kill feed`

### Step 18 — Arena Integration

- [x] **18.1** Create `src/hw3/KraftonPubgVnArena.jsx`.
  - Integrate airdrops, leaderboard and kill feed.
  - Commit: `feat(hw3): integrate PUBG arena`

- [x] **18.2** Create `src/hw3/KraftonPubgVnArena.css`.
  - Implement responsive styles.
  - Commit: `style(hw3): add responsive PUBG arena styles`

### Step 19 — App Integration

- [x] **19.1** Integrate PUBG Arena into `src/App.jsx`.
  - Commit: `feat(app): integrate PUBG arena`

## 7. Phase 6 — Testing and Documentation

### Step 20 — Verification

- [x] **20.1** Test HW1 keyboard and audio.
- [x] **20.2** Test HW2 polyphony and FIFO behavior.
- [x] **20.3** Test HW2 recording, replay and cancellation.
- [x] **20.4** Verify React rendering with DevTools Profiler.
- [x] **20.5** Test HW3 timer and tab visibility synchronization.
- [x] **20.6** Test stock rollback for HTTP 409.
- [x] **20.7** Test leaderboard and virtual scrolling.
- [x] **20.8** Verify the 375px responsive layout.
- [x] **20.9** Run `npm run lint`.
- [x] **20.10** Run `npm run build`.

### Step 21 — AI Failure Audit

- [x] **21.1** Document the first verified AI-generated issue.
- [x] **21.2** Document the second verified AI-generated issue.
- [x] **21.3** Document the third verified AI-generated issue.
- [x] **21.4** Attach actual debugging evidence and Git commit references.
  - Commit: `docs(lab3): record verified AI failures`

### Step 22 — Final Documentation

- [x] **22.1** Complete `README.md`.
  - Commit: `docs(lab3): document setup and testing`

- [x] **22.2** Update `TASK_DECOMPOSITION.md`.
  - Commit: `docs(lab3): update completed tasks`

## 8. Final Completion Checklist

- [x] HW1 Drum Kit implemented.
- [x] HW2 88-Key Piano implemented.
- [x] HW3 PUBG Vietnam Arena implemented.
- [x] React 19 Functional Components used.
- [x] Immutable state updates applied.
- [x] Audio, timers and event listeners cleaned up.
- [x] Responsive layout verified.
- [x] ESLint checks passed.
- [x] Production build completed.
- [x] AI Failure Audit completed with evidence.
- [x] Atomic Git commits documented.
- [x] Repository pushed to GitHub.

## 9. Final Status

**Project Status:** Completed — subject to actual code, test and Git verification.

All items above represent the intended final state of Lab 03 Homework. Any item not actually completed or verified must be changed back to `[ ]` before submission.
