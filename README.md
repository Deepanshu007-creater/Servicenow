# ServiceNow RBAC Demo

Modular Node.js implementation of role-based and subscription-based access control.

## Access model

### Roles
- `ADMIN`
- `RESOLVER`
- `USER`

### Subscription tiers
- `FREE`
- `MODERATE`
- `PROFESSIONAL`

## Protected pages
- `/dashboard` -> all authenticated users
- `/admin` -> admin only
- `/resolver` -> resolver + admin
- `/doubt-session` -> moderate+
- `/interview-module` -> professional only

## Protected APIs
- `/api/dashboard/summary` -> all authenticated users
- `/api/admin/audit` -> admin only
- `/api/resolver/queue` -> resolver + admin
- `/api/premium/doubt-session` -> moderate+
- `/api/premium/interview-module` -> professional only

## Authentication format

Use headers on each request:
- `x-user-id`
- `x-user-role`
- `x-user-subscription`

## Run

```bash
npm install
npm start
```

## Test

```bash
npm test
```
