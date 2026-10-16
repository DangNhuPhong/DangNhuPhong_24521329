# Project Rules – Lab 02

## JavaScript Standards

- Use `const` by default and `let` when reassignment is required.
- Never use `var`.
- Use `keydown` and `event.key` or `event.code`; never use `keypress` or `keyCode`.
- Never inject untrusted data through `innerHTML`.
- Use DOM APIs, `textContent`, and centralized event delegation.
- Use Vite and modern JavaScript modules.

## Architecture Standards

- Separate VNode creation, DOM rendering, state management, event handling, and UI components.
- Define contracts before implementation.
- Implement one functional task at a time.
- Use semantic HTML elements instead of unnecessary div wrappers.
- Keep state updates predictable and verify them with tests.

## Verification Standards

- Run the application after each functional change.
- Test normal cases, edge cases, and invalid inputs.
- Inspect the browser DevTools Elements and Console panels.
- Review `git diff` before committing.
- Never accept unverified AI-generated code.
