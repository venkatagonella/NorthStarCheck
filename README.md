# NorthStarCheck

Reference implementation for **Secondary Recruiter** job-level role permissions (PHEM-2109151).

## What it demonstrates

- Role registry with Primary Recruiter and Secondary Recruiter
- `hiring_team_expanded_roles` feature flag (per-tenant)
- Secondary Recruiter can **create** jobs (template / blank / clone)
- Only **Primary Recruiter** can **delete** or **close** jobs when the flag is ON
- Server-side enforcement with UI permission endpoint

## Quick start

```bash
npm install
npm test
npm run dev
```

Send `x-user-id` and `x-tenant-id` headers on API requests.

## Spec

See `northstar/specs/001-secondary-recruiter-role-enforcement/`.
