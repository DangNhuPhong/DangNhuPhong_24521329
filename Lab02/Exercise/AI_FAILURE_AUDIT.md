## Vulnerability 01: Unsafe HTML Injection

- **Risk:** Using `innerHTML` with untrusted text can cause Cross-Site Scripting (XSS).
- **Detection:** Inspect generated source code and search for `innerHTML`. Test that a string containing HTML-like content is rendered as plain text.
- **Refactoring:** Use `document.createTextNode()` or `textContent` for untrusted text.
- **Verification:** Confirm in DevTools Elements that the input is displayed as text and no unexpected HTML element is created.

## Vulnerability 02: Event Handler Duplication

- **Risk:** Registering event listeners during every render can lead to duplicated handlers, unexpected behavior, or memory leaks.
- **Detection:** Inspect the renderer and event registration code. Repeat state updates and click a control to check whether its handler executes more than once.
- **Refactoring:** Centralize supported event listeners on the root container and resolve handlers through the VNode associated with the event target.
- **Verification:** Confirm that root listeners are initialized once and repeated renders do not register additional root listeners.

## Vulnerability 03: Unstable State or Request Ordering

- **Risk:** Incorrect hook ordering can associate state with the wrong component variable. Concurrent asynchronous requests can also allow stale responses to overwrite newer data.
- **Detection:** Inspect hook calls for conditional execution. Trigger repeated data requests and observe the final displayed result.
- **Refactoring:** Keep hook calls in deterministic order. Use request cancellation and request identity checks when appropriate.
- **Verification:** Test repeated updates and overlapping requests. Confirm that state remains consistent and stale results are ignored.

## Audit Evidence

For each finding, attach:

- The affected file and code location.
- A reproduction procedure.
- DevTools or test evidence.
- The corrected implementation.
- The Git commit containing the fix.
