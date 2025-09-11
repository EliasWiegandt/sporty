# Roadmap

Phase 0 — Running Skeleton (now)
- Frontend served by Cloudflare Worker; backend on Render.
- Adult-only flow: single POST `/recommend` returns a dummy suggestion.
- Worker `GET /api/healthz` is available for quick checks (does not call backend).

Phase 1 — Solid MVP (adult-only)
- Implement/verify Worker proxy for `POST /api/submit` → backend `/recommend` with `X-API-Key`.
- Add basic input validation and UX polish on `site/index.html`.
- Add `site/result.html` and friendly error handling.
- Document API contract and example payloads.

Phase 2 — Supabase (Next)
- Add Supabase Auth (email/OAuth) and Postgres.
- Add explicit consent UX and privacy copy; persist adult intake + results only after consent.
- Define initial schemas (adult profiles, submissions, results). Exclude child-related fields for now.
 - Implement RLS policies; route writes via backend with service role.

Phase 3 — Data Foundations & Scoring
- Define sports taxonomy and attributes.
- Continue backend generation of synthetic/test data for “optimal body by sport”; use to seed examples.
- Implement simple scoring combining measurements + preferences; return ranked list with reasons.
 - Import optimal_bodies dataset from `../sporty-backend/data/optimal_bodies/generated_gpt-5-mini.jsonl` into Supabase.

Phase 4 — Child + Parents (Prototype, later)
- Lightweight projection model: height/weight curves + parental influence (transparent assumptions).
- Dedicated intake view with parent/guardian consent and appropriate safeguards.
 - Add child tables and guardianships; expand RLS.

Phase 5 — Payment & Hardening (Prep)
- Stripe checkout stubs: pay-per-analysis; feature flags to gate pages.
- Add rate limiting, logging, and error boundaries.
- Production deploy playbook and monitoring.

Always On
- Track decisions in `docs/DECISIONS.md`.
- Keep `docs/state.yml` updated with current endpoints/secrets names (no secrets).
 - Keep `docs/supabase/SCHEMA.md` authoritative for schema/policy changes.
