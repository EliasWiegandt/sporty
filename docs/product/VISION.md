# Product Vision — Sporty

Purpose: Make playful, data-informed sport suggestions based on a person’s body, history, and preferences. This is for learning and exploration, not medical or professional advice.

Core Experience
- Intake: birthday, sex, height/weight, history, injuries, preferences, personality.
- Suggestion: ranked sports with explanations and references.
- Learning: link to data sources and research summaries.

Killer Feature
- Child + parents inputs → simple growth model → projected body composition → early sport suggestions for fun and inspiration.

Target Users
- Individuals curious about sport fit.
- Parents exploring ideas for kids.
- Educators/coaches (future enterprise tier).

Scope Now (MVP)
- Static UI + Worker proxy → FastAPI endpoint.
- Validated intake payload → dummy suggestion.
- Clean, minimal UX; no accounts or payments yet.

Future (Not in MVP)
- Auth: Supabase (email or OAuth) for saved profiles.
- Data: Sports taxonomy, athlete datasets, research articles.
- Models: Scoring + basic projection for child feature.
- Payments: Stripe (pay-per-analysis, subscriptions).

Constraints & Principles
- Privacy: secrets in platform env; don’t store PII until auth lands.
- Iterative: ship small; instrument, refine, repeat.
- Transparency: show reasoning and data sources.
