# Lab 02 — Modern React Architecture

## Overview

A single React + Vite application containing three homework modules:

1. HW1: Accessible Data-Grid.
2. HW2: FIFO Audio Queue and Frequency Visualizer.
3. HW3: Flash Sale Timer and Inventory State Machine.

## Requirements

- Node.js and npm.
- A modern browser with Web Audio API support for HW2.
- Direct audio URLs accessible from the browser for audio testing.

## Installation

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## HW1

- Search user records.
- Sort columns in ascending or descending order.
- Change page size and navigate between pages.
- Select and delete rows.
- Navigate data cells with arrow keys.
- Select with Enter and toggle selection with Space.

## HW2

- Enter a direct audio URL.
- Add audio tasks to the FIFO queue.
- Cancel queued or active tasks.
- Decode audio and play the loaded track.
- View the frequency spectrum using AnalyserNode.

Audio playback requires a valid URL. Cross-origin requests must be allowed
by the remote audio server.

## HW3

- View the timestamp-based countdown.
- Reserve available inventory.
- Checkout a valid reservation.
- Release a reservation.
- Inspect reservation status and expiration.

The inventory implementation is an in-browser simulation. It is not a
multi-server transactional inventory service.

## Verification

- Run npm run build.
- Test all interactive controls manually.
- Inspect browser console and network requests.
- Run Lighthouse accessibility and best-practice audits.
- Test audio cancellation and cleanup.
- Test reservation expiration and inventory invariants.

## AI verification

See TASK_DECOMPOSITION.md and AI_FAILURE_AUDIT.md.
