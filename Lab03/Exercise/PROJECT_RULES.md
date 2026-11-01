# UIT S3T - LAB 3 AI GOVERNANCE RULES (.cursorrules)

1. STACK: React 19 + Vite + ES2024 (builds on Lab 2). Import only explicit hooks from 'react'; no `import * as React`.
2. NO LEGACY APIS: ban `class extends React.Component`, `ReactDOM.render`, `defaultProps`, `keyCode`, `window.alert`.
3. ZERO DIV-SOUP: use `<main>`, `<section>`, `<article>`, `<header>`, `<hgroup>`, `<dl>`, `<dt>`, `<dd>`, `<figure>`, `<output>`, Fragment.
4. A11Y FORMS: pair every `<input>`/`<select>` with `<label htmlFor={id}>` using `useId()`. Every `<button>` has an explicit `type`.
5. STATE HYGIENE: immutable updates only (spread, `filter`, `.toSorted`). Never sync derived filter/sort state inside `useEffect`.
6. EFFECT CLEANUP: every timer, listener, or fetch in `useEffect` MUST return a cleanup / AbortController. Ignore `AbortError` in catch.
7. KEYS: stable entity ids, never array index or raw text.
8. NUMBER INPUTS: read `e.target.valueAsNumber`, guard with `Number.isNaN`.
9. SECURITY: https:// only, no `dangerouslySetInnerHTML`, no inline styles; use CSS Modules + custom properties.
10. RESPONSIVE: mobile-first, must work at 375px with zero horizontal scroll; images have explicit width/height.
11. SCOPE: generate one small component or function per prompt, never a whole exercise.
