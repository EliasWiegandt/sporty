# Architecture

Flow: Browser → Cloudflare Worker → FastAPI backend.

1) The Worker serves static assets from `site/`.
2) The browser posts JSON to `POST /api/submit` on the Worker.
3) The Worker forwards to `${BACKEND_URL}/recommend` and injects `X-API-Key: ${BACKEND_API_KEY}`.
4) The Worker returns the backend JSON response to the browser.

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

