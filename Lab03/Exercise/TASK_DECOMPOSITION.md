# TASK_DECOMPOSITION.md — Lab 3: Production React 19

- Project folder: `Lab3/Exercise/` (Vite + React 19). All paths below are relative to this folder.
- AI governance rules: `project-rules.md`.
- Task IDs (T0.1, T1.3, ...) are shared with the step-by-step coding guide `CODE_GUIDE.md`.
- 4-stage loop for every task: **1) Slice → 2) Contract (props/state) → 3) Small constrained AI generation → 4) DevTools verification + commit**.
- ★ = commit message mandated by the slide; type it verbatim. The slide requires at least 6–8 commits; this plan has about 35.

---

## Working with GitHub Desktop

1. **Before starting:** click _Fetch origin_; if there are changes, _Pull_.
2. **1 task = 1 commit, committed immediately after the task is done.** This keeps the _Changes_ tab limited to that task's edits, so you never need to select individual lines.
3. **Before committing:** compare the _Changes_ tab with the "Files changed" column below. If anything unexpected appears (`node_modules`, `dist`, Lab 2 files), stop and do not tick it.
4. **Summary field:** copy the message from the table exactly. **Description field** (optional): one line on why you did it; this helps you during the live defense.
5. **Push origin:** after each checkpoint (T1.9, T2.10, T3.8) and at the end of each session.
6. **Work on `main`.** Do not squash, amend, or undo commits that are already pushed.
7. **Tags (optional):** _History_ tab → right-click the checkpoint commit → _Create Tag_ (`lab3-checkpoint-1`, ...).

---

## BLOCK 0 — Bridge & Setup (00:00–00:40)

| ID   | Task                                                          | Files changed                                                                                                                                      | Commit summary                                | Verify                                                                                  |
| ---- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------- |
| T0.1 | Scaffold Vite React inside `Lab03/Exercise`                   | All Vite scaffold files (`package.json`, `package-lock.json`, `index.html`, `vite.config.js`, `eslint.config.js`, `.gitignore`, `src/`, `public/`) | `chore: init react19 vite & rules` ★          | `npm ls react` shows 19.x; `npm run dev` works; `node_modules` is not listed in Changes |
| T0.2 | Add AI governance rules                                       | `project-rules.md`                                                                                                                                 | `docs: add project-rules AI governance`       | File is in `Lab3/Exercise`                                                              |
| T0.3 | Add this task file                                            | `TASK_DECOMPOSITION.md`                                                                                                                            | `docs: add TASK_DECOMPOSITION wbs`            | File is in `Lab3/Exercise`                                                              |
| T0.4 | Mount with `createRoot` + `StrictMode`, remove template files | `src/main.jsx`; delete `src/App.css`, `src/assets/react.svg`                                                                                       | `chore: bootstrap createRoot with StrictMode` | No console warnings                                                                     |
| T0.5 | Global CSS (tokens, reset), check viewport meta               | `src/index.css`, `index.html`                                                                                                                      | `style: add global css tokens and reset`      | No horizontal scroll at 375px                                                           |
| T0.6 | Semantic App shell (`main` + 3 `section`)                     | `src/App.jsx`                                                                                                                                      | `feat(app): add semantic main shell`          | No `<div>` in App.jsx                                                                   |

---

## BLOCK 2 — EXERCISE 1: DeveloperCard + SkillBadge (35 min)

Goals: zero `<div>` in `DeveloperCard.jsx`, zero `http://`, CSS Modules, correct at 375px, 2 mandated (★) commits.

| ID   | Task                                                 | Files changed                                              | Commit summary                                                 | Verify                                                   |
| ---- | ---------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------- |
| T1.1 | Define the contract: props and default values        | `src/components/DeveloperCard.jsx` (new)                   | `docs(ex1): define DeveloperCard props contract`               | File has no syntax errors                                |
| T1.2 | Card top: `article` + `header` + `hgroup`            | `DeveloperCard.jsx`                                        | `feat(ex1): add article header skeleton`                       | Accessibility tree shows `article` and a level-2 heading |
| T1.3 | Metrics with `dl` + keyed Fragment                   | `DeveloperCard.jsx`                                        | `feat(ex1): render metrics with dl and fragment keys`          | No missing-key warning in console                        |
| T1.4 | Create `SkillBadge` and the skills list              | `src/components/SkillBadge.jsx` (new), `DeveloperCard.jsx` | `feat(ex1): add SkillBadge and skills list`                    | List renders, `key` is the skill `id`                    |
| T1.5 | HTTPS avatar with width/height and initials fallback | `DeveloperCard.jsx`                                        | `feat(ex1): add https avatar with initials fallback`           | A broken image URL shows initials                        |
| T1.6 | Wire into App, run the grep checks, finish           | `src/App.jsx`                                              | `feat(ex1): implement semantic DeveloperCard and SkillBadge` ★ | `grep '<div'` and `grep 'http://'` both return nothing   |
| T1.7 | CSS Module + custom properties                       | `DeveloperCard.module.css` (new), `DeveloperCard.jsx`      | `style(ex1): add card css module with custom properties`       | No inline `style={{}}` left                              |
| T1.8 | Mobile-first responsive layout                       | `DeveloperCard.module.css`                                 | `style(ex1): add responsive 375px CSS module` ★                | iPhone SE (375px): no horizontal scroll                  |
| T1.9 | Record Checkpoint 1 results, then **Push origin**    | `CHECKPOINTS.md` (new)                                     | `docs(ex1): record checkpoint 1 audit`                         | Pushed; (optional) tag `lab3-checkpoint-1`               |

**Checkpoint 1:** no `<div` and no `http://` in `DeveloperCard.jsx`; accessibility tree shows `article → header + dl + list`; no horizontal scroll at 375px.

---

## BLOCK 3 — EXERCISE 2: ScientistDirectory (45 min)

Goals: **zero `useEffect`** for filtering and sorting, every input paired with `useId` + `label`, use `.toSorted()`, 3 mandated (★) commits.

| ID    | Task                                                  | Files changed                                                   | Commit summary                                              | Verify                                                        |
| ----- | ----------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| T2.1  | `SMART_PEOPLE` data with stable ids + component shell | `src/components/ScientistDirectory.jsx` (new)                   | `feat(ex2): normalize smartPeople schema with stable IDs` ★ | All 6 people have an `id`                                     |
| T2.2  | Render the list and mount it in App                   | `ScientistDirectory.jsx`, `src/App.jsx`                         | `feat(ex2): render directory list semantically`             | List renders with `key={p.id}`                                |
| T2.3  | Case-insensitive name search                          | `ScientistDirectory.jsx`                                        | `feat(ex2): add case-insensitive name search`               | Clicking the label focuses the input                          |
| T2.4  | Min-IQ filter using `valueAsNumber`                   | `ScientistDirectory.jsx`                                        | `feat(ex2): add min-IQ numeric filter`                      | State is always a number; an empty input does not produce NaN |
| T2.5  | Sort by IQ/Age with `.toSorted()`                     | `ScientistDirectory.jsx`                                        | `feat(ex2): add search, IQ filter & toSorted` ★             | `grep useEffect` in the file returns nothing                  |
| T2.6  | Delete button (immutable update)                      | `ScientistDirectory.jsx`                                        | `feat(ex2): add immutable delete`                           | Deleting one person leaves the other rows intact              |
| T2.7  | Reset button restoring the original data              | `ScientistDirectory.jsx`                                        | `feat(ex2): add reset to initial snapshot`                  | Reset restores all 6 people                                   |
| T2.8  | Live counter (`output`) + empty state                 | `ScientistDirectory.jsx`                                        | `feat(ex2): add delete/reset & live status` ★               | Count updates as filters change                               |
| T2.9  | CSS Module and responsive layout                      | `ScientistDirectory.module.css` (new), `ScientistDirectory.jsx` | `style(ex2): add responsive directory styles`               | No horizontal scroll at 375px                                 |
| T2.10 | Record Checkpoint 2 results, then **Push origin**     | `CHECKPOINTS.md`                                                | `docs(ex2): record checkpoint 2 profiler audit`             | Pushed; (optional) tag `lab3-checkpoint-2`                    |

**Checkpoint 2:** React DevTools Profiler shows exactly 1 render per typed character; deleting "Johann Goethe" keeps the remaining keys; Lighthouse accessibility shows every input labelled.

---

## BLOCK 4 — EXERCISE 3: PubgMatchTelemetry (35 min)

Goals: 4-state machine, `AbortController`, 220px skeleton (CLS 0.00), `role="alert"` + Retry button, **no `alert()`**, 2 mandated (★) commits.

| ID   | Task                                                      | Files changed                                                                | Commit summary                                                       | Verify                                                 |
| ---- | --------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------ |
| T3.1 | Mock data for 3 squads                                    | `public/mock/pubg/ces.json`, `te.json`, `ge.json` (new)                      | `feat(ex3): add PUBG VN squad mock data`                             | Opening `/mock/pubg/te.json` in the browser shows JSON |
| T3.2 | Abortable fetch service with simulated 35% packet loss    | `src/services/pubgTelemetry.js` (new)                                        | `feat(ex3): add abortable telemetry service with packet loss`        | Calling it sometimes succeeds, sometimes fails         |
| T3.3 | Component with 4 states + `useEffect` + `AbortController` | `src/components/PubgMatchTelemetry.jsx` (new)                                | `feat(ex3): implement PUBG VN 4-state telemetry & AbortController` ★ | Reloading repeatedly shows both SUCCESS and ERROR      |
| T3.4 | Squad selector (state lives in App)                       | `SquadSelector.jsx` (new), `src/App.jsx`                                     | `feat(ex3): add squad selector`                                      | Switching squads reloads and never mixes data          |
| T3.5 | 220px skeleton with pulse animation                       | `PubgMatchTelemetry.module.css` (new), `PubgMatchTelemetry.jsx`              | `feat(ex3): add skeleton loader`                                     | Slow 3G: the panel does not change size                |
| T3.6 | `role="alert"` error panel + Retry button                 | `PubgMatchTelemetry.jsx`                                                     | `feat(ex3): add skeleton UI & retry alert` ★                         | Retry reloads; no `alert()` anywhere                   |
| T3.7 | Responsive styles                                         | `PubgMatchTelemetry.module.css` (and the selector's CSS file if you add one) | `style(ex3): add responsive radar styles`                            | No horizontal scroll at 375px                          |
| T3.8 | Record Checkpoint 3 results, then **Push origin**         | `CHECKPOINTS.md`                                                             | `docs(ex3): record checkpoint 3 slow-3g abort test`                  | Pushed; (optional) tag `lab3-checkpoint-3`             |

**Checkpoint 3:** Network → Slow 3G → click CES → TE → GE quickly → the first two requests show `(canceled)`; switching squads rapidly never flashes an error banner.

---

## BLOCK 5 — Defense prep & polish (155–180)

| ID   | Task                                                                                                     | Files changed               | Commit summary                                    | Verify                                         |
| ---- | -------------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| T5.1 | Write `AI_FAILURE_AUDIT.md` (>= 3 real bugs: Prompt, AI Code, Bug, DevTools Proof, Fix with commit hash) | `AI_FAILURE_AUDIT.md` (new) | `docs: add AI_FAILURE_AUDIT with 3 verified bugs` | Every bug has DevTools evidence                |
| T5.2 | Final cleanup: lint, console, Lighthouse                                                                 | Any files that need fixing  | `chore: final lint and lighthouse pass`           | `npm run lint` is clean; no banned legacy APIs |
| T5.3 | Rehearse the live defense on a **temporary branch** (do not merge)                                       | —                           | —                                                 | Solve challenges A, B, C within 3 minutes each |

**Rehearsal challenges:**

- **A (Ex2):** watchlist star + "Show Watchlisted Only" checkbox, without `useEffect`.
- **B (Ex3):** 5-second polling + Pause button + cleanup.
- **C (Ex1 + Ex2):** lift `selectedId` to `App`; clicking a row in Ex2 updates the `DeveloperCard` in Ex1.

When done, delete the temporary branch in GitHub Desktop (_Branch → Delete_).

---

## Final checklist before calling the instructor

- [ ] `project-rules.md`, `TASK_DECOMPOSITION.md`, `CHECKPOINTS.md`, `AI_FAILURE_AUDIT.md` are in `Lab3/Exercise/`
- [ ] **Push origin** done; commit history matches this file; nothing squashed
- [ ] `DeveloperCard.jsx`: 0 `<div>`, 0 `http://`
- [ ] `ScientistDirectory.jsx`: 0 `useEffect`, every input has `<label htmlFor>`
- [ ] `PubgMatchTelemetry.jsx`: `controller.abort()` in cleanup and an `AbortError` guard
- [ ] No `class extends`, `ReactDOM.render`, `defaultProps`, `keyCode`, `alert(`
- [ ] No horizontal scroll at 375px; 0 console warnings
- [ ] ChatGPT/Claude/Cursor/Copilot are all closed
