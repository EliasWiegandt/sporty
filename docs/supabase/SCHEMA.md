Supabase Schema & Policies (Draft)

Canonical plan for auth, storage, and row-level security. Adult-only MVP first; child flows follow.

Auth
- Use Supabase Auth (email/password, optional OAuth) with `auth.users` as the authority.
- Frontend uses `SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY` (public client key).
- Backend uses `SUPABASE_SECRET_KEY` for server-side operations; never expose to clients.

Tables

1) profiles
- id: uuid PK (matches `auth.users.id`)
- created_at: timestamptz default now()
- updated_at: timestamptz default now()
- display_name: text
- birthdate: date null
- sex: text null
- is_adult: boolean not null default true

2) children
- id: uuid PK default gen_random_uuid()
- created_at: timestamptz default now()
- birthdate: date not null
- sex: text not null
- name: text null (pseudonym allowed)

3) guardianships
- id: uuid PK default gen_random_uuid()
- guardian_user_id: uuid not null references auth.users(id)
- child_id: uuid not null references children(id)
- role: text not null default 'parent'  -- e.g., parent, legal_guardian
- created_at: timestamptz default now()
- unique (guardian_user_id, child_id)

4) guardian_invites
- id: uuid PK default gen_random_uuid()
- child_id: uuid not null references children(id)
- inviter_user_id: uuid not null references auth.users(id)
- invitee_email: text null
- token_hash: text not null (sha256 of plaintext token; store only hash)
- status: text not null in ('issued','accepted','approved','revoked','expired')
- invited_user_id: uuid null (set after accept)
- issued_at: timestamptz default now()
- expires_at: timestamptz not null
- accepted_at: timestamptz null
- approved_by: uuid null references auth.users(id)
- approved_at: timestamptz null

4) measurements
- id: uuid PK default gen_random_uuid()
- subject_type: text not null check in ('adult','child')
- subject_user_id: uuid null references auth.users(id)  -- when subject_type='adult'
- subject_child_id: uuid null references children(id)   -- when subject_type='child'
- measured_at: timestamptz not null default now()
- height_cm: numeric(6,2) null
- weight_kg: numeric(6,2) null
- arm_span_cm: numeric(6,2) null
- leg_inseam_cm: numeric(6,2) null
- shoulder_width_cm: numeric(6,2) null
- hip_width_cm: numeric(6,2) null
- hand_length_cm: numeric(6,2) null
- foot_length_cm: numeric(6,2) null

5) preferences
- id: uuid PK default gen_random_uuid()
- subject_type: text not null ('adult','child')
- subject_user_id: uuid null references auth.users(id)
- subject_child_id: uuid null references children(id)
- notes: text null
- tags: text[] not null default '{}'
- created_at: timestamptz default now()

6) health_injuries
- id: uuid PK default gen_random_uuid()
- subject_type: text not null ('adult','child')
- subject_user_id: uuid null references auth.users(id)
- subject_child_id: uuid null references children(id)
- description: text not null
- onset_date: date null
- severity: text null  -- e.g., mild|moderate|severe
- created_at: timestamptz default now()

7) goals
- id: uuid PK default gen_random_uuid()
- subject_type: text not null ('adult','child')
- subject_user_id: uuid null references auth.users(id)
- subject_child_id: uuid null references children(id)
- goal_type: text not null  -- 'body' | 'skill'
- description: text not null
- target_date: date null
- created_at: timestamptz default now()

8) past_sports
- id: uuid PK default gen_random_uuid()
- subject_type: text not null ('adult','child')
- subject_user_id: uuid null references auth.users(id)
- subject_child_id: uuid null references children(id)
- sport_id: uuid references sports(id)
- liked: boolean null
- skill_rating: int2 null check 1..5
- years: int2 null
- created_at: timestamptz default now()

9) submissions
- id: uuid PK default gen_random_uuid()
- user_id: uuid not null references auth.users(id)  -- who submitted
- subject_type: text not null ('self','child')
- subject_child_id: uuid null references children(id)
- payload: jsonb not null  -- snapshot of all inputs
- created_at: timestamptz default now()

10) recommendations
- id: uuid PK default gen_random_uuid()
- user_id: uuid not null references auth.users(id)
- submission_id: uuid not null references submissions(id)
- model_version: text not null
- summary: text null
- created_at: timestamptz default now()

11) recommendation_items
- id: uuid PK default gen_random_uuid()
- recommendation_id: uuid not null references recommendations(id)
- sport_id: uuid references sports(id)
- rank: int2 not null
- reason: text not null

12) consents
- id: uuid PK default gen_random_uuid()
- user_id: uuid references auth.users(id)
- child_id: uuid references children(id)
- consent_type: text not null  -- 'data_retention' | 'child_guardian' | etc.
- version: text not null
- granted_at: timestamptz not null default now()
- revoked_at: timestamptz null

13) sports
- id: uuid PK default gen_random_uuid()
- name: text not null unique
- category: text null
- tags: text[] not null default '{}'

14) roles
- id: uuid PK default gen_random_uuid()
- sport_id: uuid not null references sports(id)
- name: text not null

15) optimal_bodies  (import of backend data)
- id: bigint generated always as identity primary key
- model: text not null
- sport: text not null
- category_path: text[] not null
- cohorts: jsonb not null
- spec: jsonb not null
- source: text not null default 'backend_generated'

RLS Policies (high-level)
- profiles: owner-only (auth.uid() = id).
- measurements/preferences/health_injuries/goals/past_sports: owner-only for adults; for children, allow if `auth.uid()` is in guardianships for the row’s child.
- submissions/recommendations/recommendation_items: owner-only (auth.uid() = user_id).
- consents: owner-only; for child consents, the guardian creating them can read.
- sports/roles/optimal_bodies: readable by all (SELECT), write restricted to service role.
- guardian_invites: readable by inviter, invited user, and active guardians of the child; writes via RPCs only.

NOTE: Backend using service role can bypass RLS; prefer using RLS with anon+user JWTs when practical for client reads. All writes should go through backend endpoints for validation and auditing.

Import Plan (optimal_bodies)
- Parse `../sporty-backend/data/optimal_bodies/generated_gpt-5-mini.jsonl`.
- For each line, map fields: sport, category_path, cohorts, spec, model.
- Insert into `optimal_bodies`.
- Optionally derive/normalize to link sport to `sports` and roles to `roles`.

Required Environment
- Frontend: SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY (public, client)
- Backend: SUPABASE_URL, SUPABASE_SECRET_KEY (secret, server)

Pages (planned)
- Free example (anonymous) on front page (body-only inputs, no storage).
- Adult intake (authenticated) with health, injuries, goals, tags, past sports.
- Parent intake (authenticated) to input parent data for child recommendations.
- Child intake (authenticated guardian) for child’s measurements and preferences.
- Consent screens (adult data retention; guardian consent for child data).
- Results view + history of submissions and recommendations.
- Account settings: profile, export/delete data (DSR), sign-out.
  - Legal pages: Privacy, Terms, Disclaimers.

SQL Files
- Backend keeps canonical SQL files:
  - `../sporty-backend/supabase/schema.sql` — tables and constraints
  - `../sporty-backend/supabase/policies.sql` — RLS policies
Apply them in the Supabase SQL editor (in order) or via `psql`.

RPCs (auth required)
- `api.create_child(name text, birthdate date, sex sex_kind) -> uuid`
- `api.invite_guardian(child_id uuid, invitee_email text default null, ttl_hours int default 168) -> text` (returns plaintext token)
- `api.accept_guardian_invite(token text) -> uuid` (returns child_id)
- `api.approve_guardian_invite(invite_id uuid) -> void`
- `api.revoke_guardian(child_id uuid, guardian_user_id uuid) -> void`
