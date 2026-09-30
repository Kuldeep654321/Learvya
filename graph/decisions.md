# Learvya Decisions

## ADR-001 Canonical Database
Decision: PostgreSQL remains the source of truth.
Reason: Derived systems must be rebuildable.

## ADR-002 Auth Boundary
Decision: Supabase Auth handles identity.
Reason: Authentication and database ownership remain separated.

## ADR-003 Official Data Trust
Decision: Official facts require source traceability and verification.

## ADR-004 Personalization Safety
Decision: Recommendation systems cannot override eligibility or verification.

## ADR-005 Extraction Boundary
Decision: Scrapling is limited to permitted official-source extraction workflows.

## ADR-006 Tracker Privacy
Decision: Application Tracker stores progress, not personal documents.
