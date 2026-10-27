# AI Failure Audit — Lab 02

## Audit scope

This document records implementation risks that must be tested.
A risk is not labelled as an observed defect until it has been reproduced.

## Case 1 — Unsafe HTML Rendering

- Risk:
  AI-generated code may inject user-controlled content with innerHTML.
- Detection:
  Inspect rendering code and search for innerHTML usage.
- Safer implementation:
  Render user content as React text nodes or DOM textContent.
- Verification:
  Render strings containing HTML-like markup and verify they appear as text.

## Case 2 — Audio Resource and Animation Leaks

- Risk:
  AudioBufferSourceNode, AudioContext or animation frames may remain active
  after a component unmounts.
- Detection:
  Repeatedly mount and unmount the audio component; inspect playback,
  console output and resource behavior.
- Safer implementation:
  Stop and disconnect active sources, cancel requestAnimationFrame,
  abort active fetches and close AudioContext when appropriate.
- Verification:
  Confirm playback and animation stop after unmount and that the queue
  settles cancelled tasks.

## Case 3 — Inventory Race Condition

- Risk:
  Two buyers may read stale inventory state and reserve the same remaining
  stock in a naive implementation.
- Detection:
  Submit overlapping reservation operations and check inventory invariants.
- Safer implementation:
  Perform inventory validation and updates atomically on the server.
- Verification:
  Run simultaneous reservation tests against the same final unit of stock.

## Evidence log

For each reproduced defect, record:

- Date and environment.
- Commit containing the faulty implementation.
- Steps used to reproduce the defect.
- Console, test or DevTools evidence.
- Commit containing the fix.
- Test result after the fix.

Do not report a hypothetical risk as a reproduced AI defect.
Do not claim a test passed until it has actually been executed.
