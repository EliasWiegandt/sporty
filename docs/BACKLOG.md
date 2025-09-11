# Backlog (short-horizon)

Now
- Verify Worker proxy for `/api/submit` with `BACKEND_URL` + `BACKEND_API_KEY`.
- Worker `GET /api/healthz` quick check (no backend call).
- Improve frontend form UX (required fields, better errors, loading state).
- Adult-only copy and validation; add simple result page.
 - Draft legal pages: Privacy + Terms (docs only for now).

Next
- Supabase setup (auth + Postgres), dev project and initial schemas (see `docs/supabase/SCHEMA.md`).
- Consent UX for data retention; persist only after consent.
- Sports taxonomy v0 (list + attributes) and mapping to fields.
 - RLS policies for adults; all writes via backend with service role.
 - Import `optimal_bodies` dataset into Supabase.

Later
- Scoring function v1; plug into backend (use synthetic/test data to calibrate).
- Child + parents flow design (defer implementation).
- Add simple analytics (page views + submission counts).
 - Add parent/guardian-specific consent + child tables; expand RLS policies.

Family & Guardians (Next)
- FE: Add Child Wizard (M)
  - Parental gate, form validation, success state, unit tests.
- FE: Guardians Tab (M)
  - List active guardians; list pending invites; approve button; revoke option (MVP+1).
- FE: Invite Modal (S)
  - Email input (optional), copy link, state feedback, expiry display.
- FE: Accept Invite Page (S)
  - Token handling, login redirect, success/pending state.
- FE: Error Handling & Toast System (S)
  - Normalize Supabase error messages; friendly copy.
