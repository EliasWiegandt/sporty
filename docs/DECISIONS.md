# Decisions (ADR-style)

ADR-001 — Frontend on Cloudflare Worker
Status: Accepted
Rationale: Simple static hosting + edge proxy for injecting API key and centralizing requests.

ADR-002 — Backend on Render (FastAPI)
Status: Accepted
Rationale: Quick to deploy; suits Python; simple env var management.

ADR-003 — Auth with Supabase (Planned)
Status: Proposed
Rationale: Managed Postgres + auth; easy JS SDK for frontend.

ADR-004 — Payments with Stripe (Planned)
Status: Proposed
Rationale: Standard, reliable checkout for later monetization.

ADR-005 — Worker ↔ Backend Auth via `X-API-Key`
Status: Accepted
Rationale: Keep key server-side; browser never sees it.

ADR-006 — Data Store (Supabase Postgres) (Planned)
Status: Proposed
Rationale: Unified with auth; good for structured sports taxonomy and profiles.

ADR-007 — Frontend Env Naming + Secrets Location
Status: Accepted
Rationale: Standardize on `BACKEND_API_KEY` as the only frontend variable name for the API key (avoid alias `API_KEY`) to reduce confusion across repos and docs. Treat `BACKEND_URL` as a Worker secret per environment to keep configuration out of git and align with privacy-by-default, even though the URL is not sensitive.
Consequences: Update docs and examples to reference `BACKEND_API_KEY` only on the frontend; backend keeps using `API_KEY`. Remove `BACKEND_URL` from `wrangler.toml` env vars and set it via `wrangler secret` for staging/production and local dev (`.dev.vars`).
Alternatives: Keep `BACKEND_URL` in `wrangler.toml` as a non-secret; allow `API_KEY` alias in the Worker. Rejected to avoid drift and ambiguous naming.
