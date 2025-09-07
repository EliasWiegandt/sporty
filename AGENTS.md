# Sporty — Collaboration Guide for AI Agents

Purpose: help agents collaborate across `sporty-frontend` (Cloudflare Worker + static site) and `sporty-backend` (FastAPI) within a single VS Code workspace.

## Goals
- Serve the static UI via a Cloudflare Worker.
- Proxy `POST /api/submit` from the Worker to the backend `POST /recommend`.
- Keep the API key secret by injecting `X-API-Key` in the Worker.

## Guiding Principles
- User-first: simple flows, fast feedback, clear errors.
- Privacy-by-default: secrets live in platform env, never in code.
- Thin client: Worker proxies and injects auth; backend owns logic.
- Iterative delivery: small, testable steps with visible progress.
- Document decisions: prefer ADR entries to implicit choices.

## Product Vision (summary)
- Suggest sports that fit a person’s body and personality.
- Fun, educational tool; not medical advice.
- Killer feature: child + parents inputs → projected body model → early sport suggestions.
- Future: auth (Supabase), payments (Stripe), datasets of sports/body comps, research references.

Full vision: `docs/product/VISION.md`.

## Non-Goals
- Exposing backend directly to the browser.
- Storing secrets in the repo.

## Repos
- Frontend: `sporty-frontend` (this repo)
- Backend: `sporty-backend` (sibling folder: `../sporty-backend`)

## Important Files
- Frontend:
  - `site/index.html`: Form posting to `/api/submit`.
  - `src/worker.js`: Worker entry; should proxy to backend.
  - `wrangler.toml`: Worker config and routes.
- Backend:
  - `app/main.py`: FastAPI app with `/recommend` endpoint.

## Env Vars
- Worker secrets:
  - `BACKEND_URL`: Base URL for backend (e.g., `http://127.0.0.1:8000` or Render URL).
  - `BACKEND_API_KEY`: API key to send as `X-API-Key`.
  - Local dev: put these in `.dev.vars` (ignored by git). Example in `.dev.vars.example`.
- Backend env:
  - `API_KEY`: Must match `BACKEND_API_KEY`.

## Local Dev Commands
- Start backend:
  - `cd ../sporty-backend`
  - `export API_KEY=dev-key-123 && uvicorn app.main:app --reload`
- Start worker:
  - `cd ../sporty-frontend`
  - `wrangler dev`

Use VS Code task "Dev: Both (Worker + Backend)" to run both.

## Deploy
- Backend: Render.com (see `../sporty-backend/render.yaml`). Set `API_KEY`.
- Frontend: Cloudflare Worker. Set secrets `BACKEND_URL`, `BACKEND_API_KEY` per environment.

## Style & Conventions
- Keep docs concise and colocated (`docs/` per repo).
- Prefer simple, static HTML/JS in frontend for now.
- Validate request/response contract before changing fields.

## Memory Index (What to Read First)
- Vision: `docs/product/VISION.md`
- Architecture: `docs/architecture.md`
- Current state: `docs/state.yml`
- Roadmap: `docs/ROADMAP.md`
- Backlog: `docs/BACKLOG.md`
- Decisions (ADR): `docs/DECISIONS.md`
