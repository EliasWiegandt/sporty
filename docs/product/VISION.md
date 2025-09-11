# Product Vision — Sporty

Purpose: Make playful, data-informed sport suggestions based on a person’s body, history, and preferences. This is for learning and exploration, not medical or professional advice.

Core Experience
- Intake: birthday, sex, height/weight, history, injuries, preferences, personality.
- Suggestion: ranked sports with explanations and references.
- Learning: link to data sources and research summaries.

Killer Feature (later)
- Child + parents inputs → simple growth model → projected body composition → early sport suggestions for fun and inspiration.

Target Users
- Individuals curious about sport fit.
- Parents exploring ideas for kids.
- Educators/coaches (future enterprise tier).

Scope Now (MVP)
- Adults only: intake and suggestions target adult users.
- Static UI + Worker proxy → FastAPI endpoint.
- Validated intake payload → dummy suggestion.
- Clean, minimal UX; no accounts or payments yet.

Active Experiments
- Backend is generating synthetic/test data describing optimal body profiles per sport to seed examples and inform early scoring design.

Future (Not in MVP)
- Auth + Storage (next): Supabase for accounts and persisting intake/results with consent.
- Data: Sports taxonomy, athlete datasets, research articles.
- Models: Scoring + basic projection for child feature.
- Payments: Stripe (pay-per-analysis, subscriptions).

Constraints & Principles
- Privacy: secrets in platform env; don’t store PII until auth lands; add explicit consent when we introduce persistence.
- Iterative: ship small; instrument, refine, repeat.
- Transparency: show reasoning and data sources.
