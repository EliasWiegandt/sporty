Privacy Policy (Draft)

Summary
- We process your inputs to generate sport recommendations. For the MVP, we do not store your data unless you create an account and consent to retention.
- When child data is involved, we require a verified guardian’s consent.
- You can request export or deletion of your data from your account page once persistence is live.

Key Points
- Data we process: body measurements, preferences, health/injury notes, past sports, goals.
- Purpose: generating recommendations and improving the service.
- Storage: planned via Supabase Postgres; persisted only after explicit consent.
- Access: only you (and your verified guardians for child data). We employ Row-Level Security.
- Sharing: we do not sell your data. Aggregated, anonymized insights may be published.
- Security: Supabase managed auth + RLS; service-role keys are used only on the backend.
- Retention: you can revoke consent; we will stop processing and delete retained data within a reasonable timeframe.
- Children: guardian consent required; additional safeguards apply.

This draft will evolve as we implement auth, persistence, and compliance controls.

