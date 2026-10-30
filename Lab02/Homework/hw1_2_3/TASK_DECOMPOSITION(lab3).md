TASK DECOMPOSITION

Lab 03 – Production React 19, Fiber Hooks & Concurrent UI

Project: Lab 03 Exercises 1–3
Based on: Lab 02 – Mini React and React 19 projects
Technology: React 19, Vite, JavaScript (ES Modules), CSS Modules
Status: Planned

1. Project Overview

The objective of Lab 03 is to extend the concepts and implementation experience gained from Lab 02 into production-oriented React 19 development.

The work covers three exercises:

Exercise 1: Semantic Engineer & Pro-Gamer Profile Card

Exercise 2: Interactive Scientist & Pioneer Directory

Exercise 3: KRAFTON PUBG Vietnam Live Telemetry

The implementation must demonstrate semantic HTML, reusable components, React Hooks, immutable state updates, derived state, stable list keys, asynchronous state management, request cancellation, and accessible user interfaces.

2. Existing Lab 02 Projects

Two existing projects must be preserved.

2.1 Mini React Project

Location: Exercise/lab02-modern-react/

Existing implementation:

mini-react.js: VNode creation and DOM rendering.

reactive-engine.js: custom state management and event delegation.

task-app.js: Reactive Task Manager.

data-feed.js: asynchronous data loading and state handling.

Existing project documentation and configuration.

Relevant concepts to reuse:

Virtual DOM and DOM rendering.

Custom useState implementation.

State storage and cursor-based Hooks.

Event delegation.

Asynchronous loading states.

AbortController and request cancellation.

2.2 React 19 Project

Location: Homework/hw1_2_3/

Existing implementation:

src/hw1/: DataGrid.

src/hw2/: AudioQueue and AudioVisualizer.

src/hw3/: FlashSale, Inventory, and inventoryMachine.

Existing React 19 and Vite configuration.

This project will be used as the implementation environment for Lab 03 Exercises.

Preservation rule: Existing Lab 02 source files must not be deleted, overwritten, or unnecessarily refactored during the implementation of Lab 03.

3. Work Breakdown Structure

Phase 0 – Project Preparation

Objective: Prepare the existing React 19 project without damaging Lab 02 work.

Task ID

Task

Description

Deliverable

P0.1

Inspect existing project

Review package.json, source structure, and dependencies.

Project inspection

P0.2

Verify React version

Confirm React 19 and React DOM compatibility.

Verified environment

P0.3

Install dependencies

Install missing dependencies if necessary.

Updated dependencies

P0.4

Create Exercise folders

Create components, data, and services folders.

Project structure

P0.5

Document project rules

Define coding conventions and implementation constraints.

project-rules.md

P0.6

Plan implementation

Define task dependencies and acceptance criteria.

TASK_DECOMPOSITION.md

Acceptance criteria:

The existing project starts successfully.

Existing Lab 02 modules remain functional.

React 19 dependencies are available.

New Exercise files are separated from existing HW1, HW2, and HW3 modules.

Phase 1 – Exercise 1: Semantic Engineer & Pro-Gamer Profile Card

Objective: Build reusable and accessible profile components using semantic HTML and CSS Modules.

Task breakdown

Task ID

Task

Description

EX1.1

Define component structure

Plan DeveloperCard and SkillBadge responsibilities.

EX1.2

Implement SkillBadge

Create a reusable skill badge component with name and tier props.

EX1.3

Implement DeveloperCard

Display profile information using semantic HTML.

EX1.4

Implement metrics

Render metrics using description-list elements.

EX1.5

Implement skills list

Render skills using a list and stable keys.

EX1.6

Implement avatar fallback

Display initials when the avatar image fails to load.

EX1.7

Create CSS Module

Style the card using scoped CSS.

EX1.8

Implement responsive layout

Support a viewport width of 375px.

EX1.9

Accessibility verification

Check semantic structure, accessible names, and image alternatives.

Technical requirements

Use <article>, <header>, <hgroup>, <dl>, <dt>, <dd>, <ul>, and <li> where appropriate.

Do not use <div> elements inside DeveloperCard.jsx.

Use React Fragment with stable keys when rendering metric pairs.

Use CSS Modules for DeveloperCard styling.

Use an HTTPS avatar URL.

Specify image width and height.

Provide an initials fallback when the image fails.

Ensure the layout works at 375px viewport width.

Dependencies

EX1.1 → EX1.2 → EX1.3 → EX1.4 → EX1.5 → EX1.6 → EX1.7 → EX1.8 → EX1.9

Acceptance criteria

DeveloperCard displays profile information correctly.

SkillBadge can be reused for multiple skills.

No <div> exists in DeveloperCard.jsx.

Metric and skill lists use stable keys.

Avatar fallback works.

The component remains usable at 375px width.

No React key warnings appear in the console.
