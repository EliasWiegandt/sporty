# Architecture

Flow: Browser → Cloudflare Worker → FastAPI backend.

1) The Worker serves static assets from `site/`.
2) The browser posts JSON to `POST /api/submit` on the Worker.
3) The Worker forwards to `${BACKEND_URL}/recommend` and injects `X-API-Key: ${BACKEND_API_KEY}`.
4) The Worker returns the backend JSON response to the browser.
5) Health: the Worker exposes `GET /api/healthz` returning `{ ok: true }` without calling the backend.

Scope
- Adult-only for the MVP. Child + parents projection is not implemented yet.

Entities
- Worker env secrets: `BACKEND_URL`, `BACKEND_API_KEY`.
- Backend env var: `API_KEY` (must equal `BACKEND_API_KEY`).

Contracts
- Request JSON:
  - `birthday: YYYY-MM-DD`
  - `sex: "male" | "female" | "other"`
  - `height_cm: number`
  - `weight_kg: number`
  - `preferences?: string`
- Response JSON (current dummy):
  - `suggested_sport: string`
  - `reason: string`
  - `ranking: number`

Persistence
- Not implemented yet. Next step is integrating Supabase (auth + Postgres) to store intake submissions and generated results behind explicit user consent.
 
Family & Guardians (Planned)
- ER model (key tables):
  - `children(id, name, birthdate, sex)`
  - `guardianships(id, guardian_user_id, child_id, role, status)` with `status ∈ {active, pending, revoked}`
  - `guardian_invites(id, child_id, inviter_user_id, invitee_email, token_hash, status, invited_user_id, expires_at, accepted_at, approved_by, approved_at)`
  - Child-related inputs (e.g., `measurements`, `preferences`) reference either `auth.users` (adults) or a `children.id` (children) with RLS checks.
- RLS guardrails:
  - Only `active` guardians may read or write a child’s data.
  - No direct client inserts into `children`; clients must use RPC `api.create_child`.

Sequences (High Level)
- Create → Invite → Accept → Approve
  1) Parent logs in (Supabase Auth) and consents in UI.
  2) FE calls `api.create_child(name, birthdate, sex)` → returns `child_id`; caller becomes `active` guardian.
  3) FE calls `api.invite_guardian(child_id, email?)` → gets plaintext token; FE builds `/accept-guardian?token=...` link.
  4) Invitee visits link. If not logged in, FE prompts login; then calls `api.accept_guardian_invite(token)`.
  5) Existing active guardian approves via `api.approve_guardian_invite(invite_id)`.
  6) Invited user becomes `active` guardian; RLS allows access going forward.

Notes
- Token handling: hash stored at rest (`token_hash`); plaintext token is returned only once by the RPC and carried in the link.
- The Worker does not proxy Supabase; the browser uses the public Supabase client (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`).
