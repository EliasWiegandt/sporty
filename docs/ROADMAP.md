# Roadmap

Phase 0 — Running Skeleton (now)
- Frontend served by Cloudflare Worker; backend on Render.
- Single POST `/recommend` returns dummy suggestion.

Phase 1 — Solid MVP
- Implement Worker proxy for `POST /api/submit` → backend `/recommend` with `X-API-Key`.
- Add basic input validation and UX polish on `site/index.html`.
- Add `/healthz` endpoints (Worker passthrough + backend) for monitoring.
- Document API contract and example payloads.

Phase 2 — Data Foundations
- Define sports taxonomy and positions/subcategories.
- Choose data store (Supabase Postgres) and schema draft.
- Seed a tiny dataset (a few sports, sample athlete profiles).

Phase 3 — Accounts (Prep Only)
- Add Supabase to the frontend for basic auth gating (stub UI).
- Design backend profile endpoints (save intake + results) without persisting until data model is ready.

Phase 4 — First Real Suggestions
- Implement simple scoring combining measurements + preferences.
- Return ranked list with reasons; add result page.
- Log anonymized scoring telemetry for tuning (opt-in).

Phase 5 — Child + Parents (Prototype)
- Lightweight projection model: height/weight curves + parental influence (transparent assumptions).
- Dedicated intake view; produce playful suggestions.

Phase 6 — Payment & Hardening (Prep)
- Stripe checkout stubs: pay-per-analysis; feature flags to gate pages.
- Add rate limiting, logging, and error boundaries.
- Production deploy playbook and monitoring.

Always On
- Track decisions in `docs/DECISIONS.md`.
- Keep `docs/state.yml` updated with current endpoints/secrets names (no secrets).
