# Sporty — Frontend

Static frontend served by a Cloudflare Worker that also proxies API calls to the backend and injects the API key. The worker serves the static site from `site/` and forwards `/api/submit` to the backend's `/recommend` endpoint.

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

## Worker Proxy

The Worker intercepts `POST /api/submit` and forwards to the backend `POST /recommend`, injecting `X-API-Key` from secrets. This is implemented in `src/worker.js`.

## Deploy

- Staging preview: `wrangler deploy --env staging`
- Production: set route in `wrangler.toml` and run `wrangler deploy --env production`

Make sure production secrets are set on the Worker:

```
wrangler secret put BACKEND_URL --env production
wrangler secret put BACKEND_API_KEY --env production
```

For consistency and privacy-by-default, configure `BACKEND_URL` as a secret per environment instead of committing it in `wrangler.toml`.

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
  
