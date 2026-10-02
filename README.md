# AMBIORA ARENA

## ENTER THE ARENA. MAKE YOUR MARK.

## TOURNAMENT // 2026

AMBIORA ARENA is a responsive esports tournament experience for building five-player squads, managing a 25-player roster, and generating a ten-match round-robin schedule. Tournament data is saved locally in the browser. An optional AI Team Lab creates short team introductions through a secure serverless endpoint.

## Features

- Cinematic landing page with tournament format, stats, feature cards, and responsive navigation.
- Tournament control page for player registration, team creation, player assignment, roster status, fixtures, demo data, and reset.
- Validation for required player fields, email addresses, unique gamer tags, unique team names, and roster limits.
- Five team slots and five player slots per team. A player can be assigned to one team only.
- Round-robin fixture generation from current team records, with unique pairings and ten games for five teams.
- Filterable fixture schedule with grid and list layouts.
- Optional AI Team Lab with five tones, loading and error states, regenerate, and copy controls.
- Responsive layouts, keyboard focus styles, semantic form labels, and reduced-motion support.

## Tech stack

- React, Vite, JavaScript, React Router
- Tailwind CSS foundation plus bespoke CSS for the visual system
- Framer Motion and Lucide React
- Vercel serverless function and the official OpenAI JavaScript SDK / Responses API
- Browser localStorage for tournament state

## Project structure

```text
api/generate-hype.js       OpenAI serverless endpoint
src/App.jsx                Landing page and tournament workflows
src/index.css              Responsive visual system and motion
src/utils/fixtureGenerator.js
src/utils/storage.js
src/utils/validation.js
src/main.jsx
```

## Install and run locally

Install Node.js 18 or newer, then run:

```bash
npm install
npm run dev
```

The Vite development server serves the frontend. To exercise the Vercel function locally, install the Vercel CLI and run `vercel dev`; configure the environment variables below in the local environment. Without the API key or a local serverless runtime, the rest of the site remains usable and AI Team Lab reports that the service is unavailable or unconfigured.

## Build

```bash
npm run build
```

The output is written to `dist/`.

## Fixture generation

`generateFixtures(teams)` validates five teams with five assigned players each, then enumerates each unique unordered pair once. This produces 5 × 4 ÷ 2 = 10 matches. Fixture records store team IDs, a sequential match number, `UPCOMING` status, a display schedule label, and an arena label. The team names are looked up at render time, so generated matches track the current team data.

## Local storage

The storage utility persists a single versioned `ambiora-arena-v1` record containing players, teams, and fixtures. State is loaded when the app starts and saved after changes. Reset removes this record. No API key is read or written by the browser.

## Demo Mode

**LOAD DEMO TOURNAMENT** replaces the current local tournament with five fictional squads and 25 fictional players, assigns complete rosters, and generates all ten fixtures. It is intended to populate the UI quickly; use reset to clear it.

## AI Team Lab

Select a created team and a tone, then request a 2–4 sentence introduction. The browser posts only team and member details plus tone to `/api/generate-hype`. The server validates accepted fields and lengths, calls the OpenAI Responses API, and returns the generated text. The UI supports loading, failure, missing-configuration, regenerate, and clipboard states. AI is optional; tournament management does not depend on it.

## OpenAI configuration

Copy `.env.example` to `.env.local` for local serverless development and supply:

```dotenv
OPENAI_API_KEY=your_server_side_key
OPENAI_MODEL=gpt-4.1-mini
```

Keep the key in the server environment only. Do not prefix it with `VITE_`, put it in frontend source, or commit `.env` files. The endpoint returns a safe message when configuration is absent or an upstream request fails.

## Vercel deployment

1. Import this repository into Vercel; the Vite frontend and `api/generate-hype.js` deploy as one project.
2. Add `OPENAI_API_KEY` and optionally `OPENAI_MODEL` in the Vercel project’s server environment settings.
3. Deploy. The API route is available at `/api/generate-hype`; without a key, only AI generation is unavailable.

## GitHub setup

Create a repository, then add and push the project:

```bash
git init
git add .
git commit -m "Build AMBIORA ARENA tournament platform"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

The `.gitignore` excludes dependency/build output, environment files, logs, and Vercel local state. Review staged files before pushing and never commit a secret.

## Future improvements

- Persistent shared tournament state through a database and authenticated organizer accounts.
- Match result entry, standings, and champion tracking.
- Configurable match dates, arenas, and seeding.
- Organizer audit trail and exportable tournament data.
