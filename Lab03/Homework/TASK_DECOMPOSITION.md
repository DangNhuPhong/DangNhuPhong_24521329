Lab 03 / Homework — TASK_DECOMPOSITION (one substep = one commit)
Location: Lab03/Homework
Stack: React 19 + Vite + JavaScript/JSX
Convention: Each numbered substep is independently committed using GitHub Desktop.
How to commit

1. Create or modify only the file(s) for the current substep.
2. In GitHub Desktop > Changes, tick only the matching file or matching changed lines.
3. Use the exact suggested commit Summary; inspect Diff.
4. Commit to current branch, then push as appropriate.
5. Mark the checkbox complete only after relevant inspection or verification.
   Note: A source file may not yet be integrated or runnable until a later integration step. Such a commit is still valid if it contains a coherent, reviewable change. Do not fabricate fixes or debugging evidence.

WBS — 40 planned commits (one conditional bugfix commit)

- [ ] 1.1 — TASK_DECOMPOSITION.md
  - Commit: docs(lab3): create task decomposition
- [ ] 1.2 — project-rules.md
  - Commit: docs(lab3): define project rules
- [ ] 1.3 — AI_FAILURE_AUDIT.md (template)
  - Commit: docs(lab3): initialize AI failure audit
- [ ] 2.1 — src/App.jsx (navigation)
  - Commit: feat(app): create homework navigation
- [ ] 2.2 — src/App.css
  - Commit: style(app): add navigation styles
- [ ] 2.3 — src/index.css
  - Commit: style(app): configure global styles
- [ ] 3.1 — src/hw1/drumConfig.js
  - Commit: feat(hw1): define drum pad configuration
- [ ] 3.2 — src/hw1/drumAudio.js
  - Commit: feat(hw1): implement drum audio engine
- [ ] 3.3 — src/hw1/useDrumKeyboard.js
  - Commit: feat(hw1): implement drum keyboard hook
- [ ] 4.1 — src/hw1/DrumPad.jsx
  - Commit: feat(hw1): create accessible drum pad
- [ ] 4.2 — src/hw1/HitHistory.jsx
  - Commit: feat(hw1): add drum hit history
- [ ] 4.3 — src/hw1/DecibelMeter.jsx
  - Commit: feat(hw1): add visual sound meter
- [ ] 4.4 — src/hw1/DrumMachine.jsx
  - Commit: feat(hw1): integrate drum machine components
- [ ] 4.5 — src/hw1/DrumMachine.css
  - Commit: style(hw1): add responsive drum layout
- [ ] 5.1 — src/App.jsx (HW1 integration)
  - Commit: feat(app): integrate drum machine
- [ ] 6.1 — src/hw2/pianoNotes.js
  - Commit: feat(hw2): generate 88 piano notes
- [ ] 7.1 — src/hw2/PianoKey.jsx
  - Commit: feat(hw2): create memoized piano key
- [ ] 7.2 — src/hw2/PianoKeyboard.jsx
  - Commit: feat(hw2): create 88-key piano keyboard
- [ ] 7.3 — src/hw2/GrandPiano88.css
  - Commit: style(hw2): implement piano keyboard layout
- [ ] 8.1 — src/hw2/PolyphonicSynth.js
  - Commit: feat(hw2): implement polyphonic audio synth
- [ ] 9.1 — src/hw2/PianoSequencer.js
  - Commit: feat(hw2): implement FIFO sequence replay
- [ ] 9.2 — src/hw2/PianoControls.jsx
  - Commit: feat(hw2): add recording controls
- [ ] 9.3 — src/hw2/RecordingPanel.jsx
  - Commit: feat(hw2): display recorded note events
- [ ] 10.1 — src/hw2/GrandPiano88.jsx
  - Commit: feat(hw2): integrate piano components
- [ ] 11.1 — src/App.jsx (HW2 integration)
  - Commit: feat(app): integrate 88-key piano
- [ ] 12.1 — src/hw3/pubgData.js
  - Commit: feat(hw3): define PUBG arena demo data
- [ ] 13.1 — src/hw3/usePubgAirdropTimer.js
  - Commit: feat(hw3): implement anti-drift countdown
- [ ] 14.1 — src/hw3/pubgApi.js
  - Commit: feat(hw3): simulate inventory claim API
- [ ] 14.2 — src/hw3/useCrateClaim.js
  - Commit: feat(hw3): implement optimistic claim hook
- [ ] 15.1 — src/hw3/ClaimButton.jsx
  - Commit: feat(hw3): create claim button
- [ ] 15.2 — src/hw3/AirdropCard.jsx
  - Commit: feat(hw3): implement airdrop card
- [ ] 16.1 — src/hw3/SquadLeaderboard.jsx
  - Commit: feat(hw3): create squad leaderboard
- [ ] 17.1 — src/hw3/KillFeed.jsx
  - Commit: feat(hw3): implement virtualized kill feed
- [ ] 18.1 — src/hw3/KraftonPubgVnArena.jsx
  - Commit: feat(hw3): integrate PUBG arena
- [ ] 18.2 — src/hw3/KraftonPubgVnArena.css
  - Commit: style(hw3): add responsive PUBG arena styles
- [ ] 19.1 — src/App.jsx (HW3 integration)
  - Commit: feat(app): integrate PUBG arena
- [ ] 20.1 — Bugfixes found by testing (only if necessary)
  - Commit: fix(lab3): resolve verified runtime issues
- [ ] 21.1 — AI_FAILURE_AUDIT.md (verified evidence)
  - Commit: docs(lab3): record verified AI failures
- [ ] 22.1 — README.md
  - Commit: docs(lab3): document setup and testing
- [ ] 22.2 — TASK_DECOMPOSITION.md (completed checkboxes)
  - Commit: docs(lab3): update completed tasks
    Functional acceptance checklist
    HW1
- [ ] Seven pads W/A/S/D/J/K/L; both keyboard and pointer work.
- [ ] event.code, auto-repeat guard, focus isolation, cleanup.
- [ ] Hit log aria-live, visible sound level, focus styles, mobile 375px.
      HW2
- [ ] MIDI 21–108 = 88 keys (52 white, 36 black); A4 = 440 Hz.
- [ ] memo uses stable props and passes Profiler test.
- [ ] 8-voice maximum; 9th voice evicts oldest; no stuck sound.
- [ ] Recording, replay speeds 0.5/1/2×, abort on stop/unmount.
      HW3
- [ ] Timer uses deadline timestamp and visibility resync.
- [ ] All four phases; mock 409 and rollback; one in-flight claim per drop.
- [ ] Leaderboard filtering/sorting; virtual feed; 375px layout.
      Delivery
- [ ] npm run lint and npm run build both pass.
- [ ] AI_FAILURE_AUDIT.md contains at least three real validated failures with DevTools evidence and actual fix commit hashes.
- [ ] Git commits match the WBS and Lab02 code is untouched.
