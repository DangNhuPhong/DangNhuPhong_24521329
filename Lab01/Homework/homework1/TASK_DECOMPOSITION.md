# HW1 - Production Portfolio

## 1. Objective

Build a responsive, accessible production portfolio using
semantic HTML5, modern CSS, and vanilla JavaScript ES6+.

## 2. Architectural Constraints

- Use HTML5, CSS, and vanilla JavaScript.
- Do not use jQuery, Bootstrap, Tailwind, or external script CDNs.
- Use semantic HTML landmarks.
- Use exactly one h1 per document.
- Use CSS custom properties for design tokens.
- Use mobile-first responsive design.
- Use const by default and let only when reassignment is required.
- Do not use inline event handlers.
- Do not insert untrusted input using innerHTML.
- Persist theme using localStorage key "theme".
- Verify keyboard accessibility, contrast, CSP, and performance.

## 3. Work Breakdown Structure

| Task | Responsibility             | Acceptance Criteria                   |
| ---- | -------------------------- | ------------------------------------- |
| T-01 | Semantic HTML              | Landmarks, one h1, skip link          |
| T-02 | Design tokens and reset    | CSS variables and border-box          |
| T-03 | Responsive layout          | No horizontal overflow at 375px       |
| T-04 | Portfolio components       | Hero, skills, projects, contact       |
| T-05 | Theme engine               | Toggle and persistent theme           |
| T-06 | Keyboard and accessibility | Visible focus, logical Tab order      |
| T-07 | Security                   | CSP and no inline event handlers      |
| T-08 | Performance                | Optimized assets and Lighthouse audit |

## 4. Component Contracts

- HTML defines stable IDs and semantic page structure.
- CSS controls layout, colors, typography, and focus indicators.
- JavaScript controls theme and contact-form feedback.
- Theme state uses "light" or "dark".
- All interactive controls must be keyboard accessible.
- Contact feedback must use textContent, not innerHTML.
- CSP must permit only resources required by the application.

## 5. Verification

- Check HTML structure and accessibility landmarks.
- Test navigation with Tab, Shift+Tab, and Enter.
- Test layout at 375px.
- Verify text contrast against WCAG 2.2 AA.
- Check browser console and CSP violations.
- Run Lighthouse and record the actual scores.
