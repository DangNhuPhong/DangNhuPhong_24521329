# Task Decomposition

## T-01: Semantic DOM Architecture & A11y Contract

### Objective

Build the semantic HTML structure for the application using HTML5 landmark elements.

### Requirements

- Use semantic HTML5 landmark elements.
- Use exactly one h1 element.
- Use a skip link for keyboard users.
- Use zero div elements.
- Define the main content area with a unique id.
- Provide a clear landmark hierarchy.
- Do not implement CSS or JavaScript in this task.

### Acceptance Criteria

- The page contains a semantic header.
- The page contains a primary navigation area.
- The page contains one main content area.
- The main content contains appropriate sections.
- The page contains exactly one h1.
- The page contains zero div elements.
- The skip link moves keyboard focus toward the main content.
- The landmark tree can be verified using Chrome DevTools Accessibility tools.

## T-02: Enterprise Developer Portfolio

### T-02A: Tokens & Reset

#### Objective

Implement the CSS design tokens and mandatory modern CSS reset.

#### Requirements

- Define reusable design tokens under :root.
- Use CSS custom properties for colors.
- Implement box-sizing border-box.
- Reset margin and padding.
- Establish the base typography.
- Do not implement the grid layout yet.
- Do not implement JavaScript theme switching yet.

#### Acceptance Criteria

- All elements use border-box sizing.
- Default margin and padding are reset.
- Color values are centralized in CSS variables.
- The page has a consistent base font and line-height.

### T-02B: 2D Grid Layout

#### Objective

Implement the responsive portfolio grid using CSS Grid.

#### Requirements

- Use CSS Grid for the project layout.
- Use repeat(auto-fit, minmax(...)) for responsive columns.
- Use gap instead of child margin overrides.
- The layout must work at a 375px viewport.
- Do not add JavaScript.

#### Acceptance Criteria

- Project cards form a responsive grid.
- The grid automatically adapts to available width.
- There is no horizontal scrolling at 375px.
- Grid spacing uses gap.

### T-02C: Theme Engine

#### Objective

Implement an accessible dark mode theme engine.

#### Requirements

- Persist the selected theme using localStorage.
- The localStorage key must be "theme".
- Use CSS variables for theme colors.
- Provide an accessible theme toggle.
- Support keyboard activation.
- Do not introduce external libraries.

#### Acceptance Criteria

- Theme can be toggled dynamically.
- Theme preference persists after page reload.
- No console errors occur during theme switching.
- The theme toggle can be operated using Tab and Enter.

## Exercise 3 — Component Architecture & State Modeling

### Component Architecture

- Hero Section
  - High-resolution portrait with explicit dimensions
  - Headline
  - Short professional pitch

- Theme Switcher
  - Accessible button
  - Uses aria-pressed
  - Provides dynamic theme state

- Skills Matrix
  - Categorized skill badges
  - Organized using CSS Grid

- Project Cards
  - Self-contained article elements
  - Project tags
  - Project descriptions
  - Repository links

- Contact Form
  - Native HTML form
  - Required field validation
  - Client-side state handling

### Acceptance Criteria

- Components are separated into clear semantic sections.
- Project cards use self-contained article elements.
- Theme switcher remains keyboard accessible.
- Skills are displayed as categorized badges.
- Contact form uses native HTML validation.
- No external libraries are used.
