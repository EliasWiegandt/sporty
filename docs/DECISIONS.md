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
