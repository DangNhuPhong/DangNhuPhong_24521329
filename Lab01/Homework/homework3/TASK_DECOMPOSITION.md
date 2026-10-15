# HW3 — Resilient Event Hub & AI Failure Audit

## Objective

Build a resilient landing page containing a drift-free UTC countdown, a state-machine form, and protection against duplicate submissions and XSS.

## Architecture

- `index.html`: Semantic page structure and form controls.
- `styles.css`: Design tokens, responsive layout, countdown and form states.
- `script.js`: Countdown engine, form state machine, validation, and event handling.
- `AI_FAILURE_AUDIT.md`: Record three AI-induced defects discovered and verified during code review.

## Slice 1 — Drift-Free Countdown Engine

**Contract**

- The target timestamp must be a valid UTC ISO 8601 timestamp.
- Calculate remaining time from the target timestamp and the current time.
- Do not decrement a stored counter once per second.
- Display days, hours, minutes, and seconds.
- Stop scheduling updates when the target is reached.
- Clean up scheduled timers when the page lifecycle requires it.

**Acceptance criteria**

- The countdown updates without accumulating interval drift.
- An invalid timestamp displays a useful fallback message.
- An expired target displays a completion message.

## Slice 2 — State-Machine Form

**States**

- `idle`: The form is ready for input.
- `submitting`: Submission is in progress and repeat submission is disabled.
- `success`: Submission has completed successfully.
- `error`: Submission failed and the user can retry.

**Acceptance criteria**

- Only valid state transitions are allowed.
- The submit button is disabled while submitting.
- Status messages are accessible to assistive technology.
- The demo must not claim that data was sent to a server when no backend exists.

## Slice 3 — Duplicate Submission & XSS Protection

**Acceptance criteria**

- Prevent multiple submissions while one is in progress.
- Validate required fields and email format.
- Render user-provided text using `textContent`, not `innerHTML`.
- Avoid inline event handlers.
- Keep HTML, CSS, and JavaScript in separate files.

## Git Workflow

- Commit the specification before implementation.
- Commit each functional slice independently.
- Review diffs before committing.
- Record actual defects, diagnostic evidence, and verified fixes in `AI_FAILURE_AUDIT.md`.

## Verification

- Test the countdown with future, expired, and invalid timestamps.
- Test invalid form input, successful submission, and retry behavior.
- Attempt rapid repeated submissions.
- Test keyboard navigation and a 375px-wide viewport.
- Inspect the browser console and verify that user input cannot create executable HTML.
