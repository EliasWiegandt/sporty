# Sporty — Frontend

Static frontend served by a Cloudflare Worker that also proxies API calls to the backend and injects the API key. The worker serves the static site from `site/` and forwards `/api/submit` to the backend's `/recommend` endpoint.

## Current Scope

- Adult-only MVP: intake and suggestions are for adults. The child + parents growth projection feature is deferred to a later phase.
- No persistence yet: results are ephemeral in the browser (e.g., `sessionStorage`).
- Backend is actively experimenting with synthetic/test data that describe optimal body profiles for various sports to bootstrap scoring and examples.

## What’s Next

- Add Supabase (auth + Postgres) to handle sign-up/login and store both submitted intake data and generated suggestions.
- Add explicit consent UX: users must consent before we retain their data. Parent/guardian consent for children will be handled when we add the child feature.

## Architecture

- Client → `Cloudflare Worker` → Backend API
- The Worker serves assets from `site/` and proxies API calls.
- The Worker adds `X-API-Key` from a secret so the key never reaches the browser.

## Repo Layout

- `site/`: Static HTML/CSS/JS pages
  - `site/index.html`: Landing page
  - `site/intake.html`: Fill-in-your-data form
  - `site/result.html`: Displays returned results (reads from sessionStorage)
- `src/worker.js`: Cloudflare Worker entry (see `wrangler.toml`).
- `wrangler.toml`: Worker config, assets binding, and routes.
 - `scripts/snap_frontend.sh`: Headless Chrome snapshots helper
 - `Makefile`: convenience targets (e.g., `make snap`)

## Prerequisites

- Node.js 18+ and `npm` or `pnpm`
- Cloudflare account and `wrangler` CLI (`npm i -g wrangler`)
- Running backend (local or hosted). See `../sporty-backend`.

## Environment and Secrets (Worker)

Configure these as Cloudflare Worker secrets (they are not committed):

- `BACKEND_URL`: Base URL of the backend API, e.g. `http://127.0.0.1:8000` (local) or your Render URL.
- `BACKEND_API_KEY`: The value expected by the backend in `X-API-Key`.
  - Frontend uses the name `BACKEND_API_KEY` only.

Set locally for dev:

```
wrangler secret put BACKEND_URL
wrangler secret put BACKEND_API_KEY
```

Ensure the backend uses the same API key value (see backend README).

Supabase (for upcoming auth/storage):
- `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` (new naming) are used by the browser SDK (public). For local dev, place them in `.dev.vars`. See `docs/supabase/SCHEMA.md`.

## Local Development

1) Start the backend locally (example):

```
cd ../sporty-backend
export API_KEY=dev-key-123
uvicorn app.main:app --reload
```

2) In this repo, run the Worker with dev server for assets + proxy:

```
cd ../sporty-frontend
wrangler dev
```

Open the printed local URL. Submitting the form will POST to `/api/submit`, which the Worker should proxy to `${BACKEND_URL}/recommend` with the `X-API-Key` header.

### Health

- Quick check (Worker only): `GET /api/healthz` → `{ "ok": true }`
- Example: `curl -sS http://127.0.0.1:8787/api/healthz`

### Snapshots (optional)

If you want to generate a static screenshot of the current frontend (homepage only, desktop):

```
make snap             # defaults to http://127.0.0.1:8787
# or override Chrome binary if needed:
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" make snap
```

Screenshot lands in `screenshots/desktop_home.png`. Ensure the dev server is running first.

## Worker Proxy

The Worker intercepts `POST /api/submit` and forwards to the backend `POST /recommend`, injecting `X-API-Key` from secrets. This is implemented in `src/worker.js`.

Notes:
- The browser never calls the backend directly.
- For now, requests represent adult users only. Child + parent inputs are not collected yet.

## Deploy

- Staging preview: `wrangler deploy --env staging`
- Production: set route in `wrangler.toml` and run `wrangler deploy --env production`

Make sure production secrets are set on the Worker:

```
wrangler secret put BACKEND_URL --env production
wrangler secret put BACKEND_API_KEY --env production
```

For consistency and privacy-by-default, configure `BACKEND_URL` as a secret per environment instead of committing it in `wrangler.toml`.

## Family & Guardians (Planned)

- Multi-guardian model with parents-only creation and approval:
  - Create Child: FE calls Supabase RPC `api.create_child(name, birthdate, sex)`; caller becomes an `active` guardian.
  - Invite Guardian: FE calls `api.invite_guardian(child_id, email?)` → gets a plaintext token; FE builds `/accept-guardian?token=...` link.
  - Accept Invite: invitee logs in and calls `api.accept_guardian_invite(token)`; state becomes `accepted` (no access yet).
  - Approve Invite: an existing active guardian calls `api.approve_guardian_invite(invite_id)`; invited user becomes `active`.
  - Revoke: optional `api.revoke_guardian(child_id, guardian_user_id)`.
- RLS ensures only `active` guardians can access a child’s data; the client never performs raw table writes — only RPCs.

Supabase usage in FE:
- Browser uses `SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY` (public). Keep session via `persistSession: true`.
- Do not use service keys in the browser.

Supabase Auth & CORS:
- Enable Email (magic link) and optionally Google/Apple in Supabase Auth.
- Add dev and prod app origins to the Auth redirect allowlist (e.g., `http://127.0.0.1:8787`, staging, production domain).

## API Contract

- Frontend sends to Worker: `POST /api/submit`
- Worker forwards to Backend: `POST /recommend`
- Request JSON shape:

```json
{
  "birthday": "YYYY-MM-DD",
  "sex": "male|female|other",
  "height_cm": 180,
  "weight_kg": 75.5,
  "preferences": "optional notes"
}
```

Optional biometric fields the backend may accept (subject to change): `tags`, `arm_span_cm`, `leg_inseam_cm`, `shoulder_width_cm`, `hip_width_cm`, `hand_length_cm`, `foot_length_cm`.

- Response example (dummy for now):

```json
{
  "suggested_sport": "fencing",
  "reason": "because you have a great body",
  "ranking": 1
}
```

## Notes

- Keep API keys in Worker/Render secrets; never expose them to the client.
- If CORS issues arise, ensure requests go through the Worker; the browser never talks to the backend directly.
- Child + parents forecasting is not implemented yet; docs and UI reflect an adult-only MVP.

## Project Docs (Memory)
- Vision: `docs/product/VISION.md`
- Architecture: `docs/architecture.md`
- State: `docs/state.yml`
- Roadmap: `docs/ROADMAP.md`
- Backlog: `docs/BACKLOG.md`
- Decisions: `docs/DECISIONS.md`
- Agent guide: `AGENTS.md`
Local-only secrets for fast iteration:

- Create a `.dev.vars` file (ignored by git). Wrangler uses it for `wrangler dev`.
- Example: see `.dev.vars.example`.

Per-environment values:

- Use `--env` to scope secrets to staging/production:
  - `wrangler secret put BACKEND_URL --env staging`
  - `wrangler secret put BACKEND_URL --env production`
  - `wrangler secret put BACKEND_API_KEY --env staging`
  - `wrangler secret put BACKEND_API_KEY --env production`
  
