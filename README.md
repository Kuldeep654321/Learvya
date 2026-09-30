# Learvya

Production bootstrap for the Learvya student opportunity platform.

## Stack

- Backend: NestJS + TypeScript
- Mobile: Flutter + Dart
- Database: PostgreSQL
- Cache/queue foundation: Redis

## Repository structure

- `backend/` — NestJS API
- `mobile/` — Flutter application
- `docker-compose.yml` — local PostgreSQL + Redis

## Local start

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Health: `GET http://localhost:3000/health`

### Infrastructure

```bash
docker compose up -d
```

### Mobile

```bash
cd mobile
flutter pub get
flutter run
```

## Implementation order

1. PostgreSQL schema + RLS
2. Supabase Auth
3. User/Profile vertical slice
4. Official Source Registry
5. First official-data ingestion adapter
6. Search + eligibility
7. Recommendations
8. Core opportunity flows
