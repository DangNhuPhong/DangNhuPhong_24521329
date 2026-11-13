# Lab 04 Exercise

Student: Dang Nhu Phong
Student ID: 24521329

## Scope

Exercises 1.2, 1.3, 1.3.1, 1.3.2, 1.6 and 1.7.1.

## Technologies

React 19, Vite, React Router v7, Express 5.

## Architecture

frontend: routing, people directory, context form and forum UI.

backend: validated forum REST API and JSON persistence.

shared: message validation used by frontend and backend.

## Run

Install dependencies separately in frontend and backend.

Copy backend/.env.example to backend/.env.

Terminal 1:
cd backend
npm run dev

Terminal 2:
cd frontend
npm run dev

Open http://localhost:5173.

## Routes

/
/people
/people/:id
/form
/forum

## Verification

Frontend:
npm test
npm run lint
npm run build

Backend:
npm test

See CHECKPOINTS.md for actual results.

## Limitations

JSON persistence supports one local backend process.

The Vite API proxy is configured for development.
