# Learvya Brain Memory

## Mission
Learvya is an official-source-first student opportunity platform for India.

Core journey:
Discovery → Eligibility → Understanding → Official Source → Action → Tracking → Career Direction

## Current Implementation Status
- Phase 90 execution started.
- Repository bootstrap completed.
- NestJS backend initialized.
- Flutter shell initialized.
- PostgreSQL + Redis local infrastructure added.
- Supabase Auth boundary added.
- Core profile schema and RLS migration added.

## Locked Architecture
Frontend:
- Flutter mobile app

Backend:
- NestJS + TypeScript

Database:
- PostgreSQL (canonical source of truth)

Auth:
- Supabase Auth

Cache/Queue:
- Redis

Search:
- Derived search index

Official Data:
- Source registry → fetch → normalize → validate → verify → PostgreSQL

Extraction boundary:
- Python + Scrapling only for permitted official source extraction/change monitoring.

## Non-Negotiable Rules
1. Official sources are authority for official facts.
2. Verification status must be traceable.
3. Eligibility correctness overrides personalization.
4. PostgreSQL is canonical.
5. Search/cache/recommendation are derived systems.
6. No personal documents inside Application Tracker.
7. Community content is separate from official truth.
8. Security, privacy and RLS cannot be bypassed.

## Development Rule
Every major change updates:
- brain.md
- graph documentation
- decision records
- implementation status
