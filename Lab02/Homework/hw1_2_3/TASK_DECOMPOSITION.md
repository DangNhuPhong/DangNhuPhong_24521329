# Lab 02 — Task Decomposition

## Project contract

- One React + Vite application.
- Three homework modules share one package.json.
- Each module has a clear boundary and independent responsibilities.
- Validate implementation with runtime checks, tests and DevTools.
- Never claim an audit passed without recording the actual result.

## HW1 — Accessible Data-Grid

- [x] Define stable user IDs and column definitions.
- [x] Implement text filtering.
- [x] Implement ascending and descending sorting.
- [x] Implement pagination and page-size selection.
- [x] Implement row selection and deletion.
- [x] Implement arrow-key cell navigation.
- [ ] Verify complete WCAG 2.2 AA conformance.
- [ ] Run Lighthouse Accessibility and Best Practices audits.
- [ ] Record actual audit results and screenshots.

## HW2 — Audio Queue

- [x] Define FIFO queue task records.
- [x] Implement queue processing.
- [x] Support cancellation of queued and active tasks.
- [x] Fetch and decode audio buffers.
- [x] Implement FFT frequency visualization.
- [x] Implement cleanup on component unmount.
- [ ] Test real audio URLs and browser CORS behavior.
- [ ] Verify repeated mount/unmount and cancellation.
- [ ] Profile audio and animation resource usage.

## HW3 — Flash Sale

- [x] Implement timestamp-based countdown.
- [x] Define inventory and reservation states.
- [x] Implement reservation expiration.
- [x] Implement checkout and release.
- [x] Check stock invariants after state transitions.
- [ ] Test concurrent operations and boundary conditions.
- [ ] Verify backend atomicity before claiming multi-user safety.

## Verification workflow

1. Build the application.
2. Exercise every UI action.
3. Test error and boundary conditions.
4. Inspect browser console and network requests.
5. Run accessibility and performance audits.
6. Record findings in AI_FAILURE_AUDIT.md.
7. Commit each verified functional change separately.
