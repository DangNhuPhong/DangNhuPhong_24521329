# AI Failure Mode Audit — HW3

## Purpose

This report records defects introduced or suggested by AI assistance and discovered during code review. Each entry must include reproducible evidence and a verified correction.

**Important:** Replace the example candidates below with the defects actually found during your own review. Do not claim a defect was reproduced or fixed unless you verified it.

## Defect 1 — Countdown Timer Drift

### Defect description

Potential defect: a countdown implementation decrements a stored counter once per `setInterval` callback. Browser scheduling delays can cause the displayed countdown to drift from the actual target time.

### Diagnostic method

- Inspect the timer implementation in the Git diff.
- Compare the displayed countdown with the difference between the target timestamp and `Date.now()`.
- Test after delaying or backgrounding the browser tab.

### Refactored solution

Calculate the remaining time from the absolute target timestamp on every update. Schedule the next update with `setTimeout` and recalculate rather than decrementing a stored counter.

### Verification evidence

Record the actual test performed, expected result, observed result, and relevant commit.

## Defect 2 — Unsafe HTML Rendering

### Defect description

Potential defect: user-controlled input is inserted into the page through `innerHTML`, allowing the browser to interpret the value as markup instead of plain text.

### Diagnostic method

- Search the code and inspect relevant Git diffs for `innerHTML`.
- Trace how form input reaches the confirmation section.
- Use a harmless test string containing HTML-like characters and verify that it is displayed as text.

### Refactored solution

Use `textContent` for user-provided text. Validate field lengths and required values before processing the form.

### Verification evidence

Record the test input, observed rendering, and relevant commit.

## Defect 3 — Duplicate Form Submission

### Defect description

Potential defect: a submit handler does not lock the form while an asynchronous operation is pending. Rapid repeated submissions may start multiple operations.

### Diagnostic method

- Inspect the submit handler and state transitions.
- Use browser DevTools to set a breakpoint inside the submission function.
- Trigger rapid repeated submissions and verify how many operations begin.

### Refactored solution

Use a submission-in-progress guard, transition to `submitting`, and disable the submit button until the operation finishes. Restore the correct state after success or failure.

### Verification evidence

Record the test procedure, number of operations observed, expected behavior, and relevant commit.

## Final Review

- [ ] Three defects were actually reproduced or otherwise evidenced during review.
- [ ] Each diagnostic method is documented.
- [ ] Each correction was tested.
- [ ] Relevant Git commits are referenced.
- [ ] No unverified claims of success are included.
