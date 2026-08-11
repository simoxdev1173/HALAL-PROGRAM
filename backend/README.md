# Arab Halal Program — API

Express + Prisma (PostgreSQL) API that connects the public application forms
and the internal admin dashboard to the database.

## Setup

```bash
cd backend
npm install
cp .env.example .env        # then set DATABASE_URL
npm run prisma:generate
npm run prisma:migrate      # first time only, applies the schema
npm run prisma:seed         # optional: demo data + admin user
```

Default seeded admin: `admin@aidsmo.org` / `admin1234`.

## Running (development)

Two processes — run each in its own terminal from the repo root:

```bash
npm run dev:api    # API  -> http://localhost:4000
npm run dev        # Vite -> http://localhost:5173  (proxies /api to :4000)
```

The Vite dev server proxies `/api/*` to the API (see `vite.config.ts`), so the
browser only ever talks to `localhost:5173`.

## Endpoints

Public form submissions:

| Method | Path | Used by |
| --- | --- | --- |
| `POST` | `/api/applications/designation-body` | `/join-program` (JSON) |
| `POST` | `/api/applications/certificate` | `/halal-certificate-application` (multipart + files) |

Admin (consumed by `/admin` dashboard):

| Method | Path |
| --- | --- |
| `POST` | `/api/admin/login` |
| `GET` | `/api/admin/overview/stats` |
| `GET` | `/api/admin/audit-log` |
| `GET` | `/api/admin/designation-bodies` |
| `GET` | `/api/admin/appointed-bodies` |
| `GET` | `/api/admin/suppliers` |
| `GET` | `/api/admin/certificates` |
| `GET` | `/api/admin/violations` |
| `GET` | `/api/admin/payments` |

Submissions are created as `Application` + type-specific record with status
`SUBMITTED`, an auto-generated request number (`AHP-APP-<year>-<seq>`), and any
attachments. New submissions land in the dashboard as `pending`. Uploaded files
are stored under `backend/uploads/` and served from `/api/uploads/*`.
