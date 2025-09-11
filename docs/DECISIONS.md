# Decisions (ADR-style)

ADR-001 — Frontend on Cloudflare Worker
Status: Accepted
Rationale: Simple static hosting + edge proxy for injecting API key and centralizing requests.

ADR-002 — Backend on Render (FastAPI)
Status: Accepted
Rationale: Quick to deploy; suits Python; simple env var management.

ADR-003 — Auth with Supabase (Planned)
Status: Accepted (Next)
Rationale: Managed Postgres + auth; easy JS SDK for frontend. Will be used to authenticate users and persist adult intake submissions and generated results with explicit consent.

ADR-004 — Payments with Stripe (Planned)
Status: Proposed
Rationale: Standard, reliable checkout for later monetization.

ADR-005 — Worker ↔ Backend Auth via `X-API-Key`
Status: Accepted
Rationale: Keep key server-side; browser never sees it.

ADR-006 — Data Store (Supabase Postgres) (Planned)
Status: Accepted (Next)
Rationale: Unified with auth; good for structured sports taxonomy and profiles; store submissions and results once consented.

ADR-007 — Frontend Env Naming + Secrets Location
Status: Accepted
Rationale: Standardize on `BACKEND_API_KEY` as the only frontend variable name for the API key (avoid alias `API_KEY`) to reduce confusion across repos and docs. Treat `BACKEND_URL` as a Worker secret per environment to keep configuration out of git and align with privacy-by-default, even though the URL is not sensitive.
Consequences: Update docs and examples to reference `BACKEND_API_KEY` only on the frontend; backend keeps using `API_KEY`. Remove `BACKEND_URL` from `wrangler.toml` env vars and set it via `wrangler secret` for staging/production and local dev (`.dev.vars`).
Alternatives: Keep `BACKEND_URL` in `wrangler.toml` as a non-secret; allow `API_KEY` alias in the Worker. Rejected to avoid drift and ambiguous naming.

ADR-008 — Scope: Adult-only MVP first
Status: Accepted
Rationale: Ship a simple, private MVP quickly. Child + parents growth projection requires additional safeguards (parental consent, UX) and is deferred.
Consequences: Intake and API are modeled for adults only. UIs and docs clearly state adult scope. Child-related inputs and storage are excluded for now.

ADR-009 — Consent and Data Retention
Status: Accepted (Next)
Rationale: Before persisting any user data, present clear consent and allow opting out. For child data (later), require parent/guardian consent with appropriate auth and controls.
Consequences: Implement consent UX and storage toggles with Supabase. Document data handling and retention clearly. Avoid storing PII until consented.
