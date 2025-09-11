# Backlog (short-horizon)

Now
- Verify Worker proxy for `/api/submit` with `BACKEND_URL` + `BACKEND_API_KEY`.
- Worker `GET /api/healthz` quick check (no backend call).
- Improve frontend form UX (required fields, better errors, loading state).
- Adult-only copy and validation; add simple result page.

Next
- Supabase setup (auth + Postgres), dev project and initial schemas.
- Consent UX for data retention; persist only after consent.
- Sports taxonomy v0 (list + attributes) and mapping to fields.

Later
- Scoring function v1; plug into backend (use synthetic/test data to calibrate).
- Child + parents flow design (defer implementation).
- Add simple analytics (page views + submission counts).
