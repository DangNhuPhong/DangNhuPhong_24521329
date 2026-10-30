# Lab 03 Exercise 1 Task Plan

## Scope

Build a reusable, accessible React 19 developer profile card composed of `DeveloperCard` and `SkillBadge`. Work belongs in the existing React 19 project; do not modify or remove Lab 02 projects or existing HW1, HW2, and HW3 source files.

The card must present a developer name, role, HTTPS avatar, profile metrics, and skills. `DeveloperCard.jsx` must use semantic HTML and must not contain a `div` element.

## Task Breakdown

| ID     | Task                                                                                                        | Deliverable                        |
| ------ | ----------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| EX1.1  | Inspect the React 19 app and select an isolated location for Lab 03 components.                             | Confirmed integration location     |
| EX1.2  | Define the public props for `DeveloperCard` and `SkillBadge`.                                               | Component contract                 |
| EX1.3  | Create reusable `SkillBadge` rendering a skill name and tier.                                               | `SkillBadge.jsx`                   |
| EX1.4  | Create `DeveloperCard` with `article`, `header`, `hgroup`, `dl`, `dt`, `dd`, `ul`, and `li` as appropriate. | `DeveloperCard.jsx`                |
| EX1.5  | Render metric pairs through keyed React Fragments and skills through stable skill IDs.                      | Keyed lists without wrapper `div`s |
| EX1.6  | Add HTTPS avatar handling, explicit image dimensions, alt text, and initials fallback after an image error. | Resilient avatar UI                |
| EX1.7  | Create a CSS Module for scoped card styling.                                                                | `DeveloperCard.module.css`         |
| EX1.8  | Make the layout usable at a 375px viewport.                                                                 | Responsive styles                  |
| EX1.9  | Integrate the card without disrupting existing modules.                                                     | App route or demo area             |
| EX1.10 | Run functional, responsive, accessibility, and console checks.                                              | Test evidence                      |

## Dependencies

`EX1.1 -> EX1.2 -> EX1.3 and EX1.4 -> EX1.5 -> EX1.6 -> EX1.7 -> EX1.8 -> EX1.9 -> EX1.10`

- CSS implementation depends on the component structure.
- Responsive verification depends on completed styling.
- Integration and testing depend on both components.
- Use React state only for the avatar failure state; do not introduce unrelated state.

## Acceptance Criteria

- `DeveloperCard` uses semantic elements and contains no `div` in its JSX.
- The component shows the supplied name, role, avatar, metrics, and skills.
- The avatar source uses HTTPS and declares `width` and `height`.
- If the image cannot load, an accessible initials fallback appears.
- Metrics are output as `dt`/`dd` pairs using keyed Fragments.
- Skills render as list items with stable, data-backed keys.
- `SkillBadge` is reusable for multiple skills and tiers.
- Styling is isolated with a CSS Module.
- The card remains readable and free of horizontal overflow at 375px.
- The browser console reports no React key warnings or runtime errors.
- Existing Lab 02 projects and current homework source remain unchanged.

## Testing Checklist

- [ ] Render the default profile and verify every required field is visible.
- [ ] Render at least three skills and confirm their labels and tiers are correct.
- [ ] Inspect `DeveloperCard.jsx` and confirm no `div` element is present.
- [ ] Force an avatar load error and confirm the initials fallback and accessible label appear.
- [ ] Confirm the avatar URL is HTTPS and its dimensions are set.
- [ ] Confirm metrics use `dl`, `dt`, and `dd`; confirm metric Fragment keys are stable.
- [ ] Confirm skill list keys use stable IDs rather than array indexes.
- [ ] Test at 375px and verify no clipping or horizontal scrolling.
- [ ] Navigate any interactive fallback-related behavior with the keyboard if applicable.
- [ ] Inspect the console for React warnings and runtime errors.
- [ ] Smoke-test existing Lab 02 and HW1-HW3 features after integration.
