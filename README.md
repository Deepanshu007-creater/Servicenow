# ServiceNow SaaS Starter (Next.js 14)

Production-ready authentication and base architecture for a SaaS app using:

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui style components
- Prisma ORM + MongoDB Atlas
- NextAuth JWT authentication (email/password)

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy env file and update values:

   ```bash
   cp .env.example .env
   ```

3. Generate Prisma client and push schema:

   ```bash
   npm run prisma:generate
   npm run prisma:push
   ```

4. Run the app:

   ```bash
   npm run dev
   ```

## Folder structure

```text
src/
  app/
    (auth)/
      login/
      signup/
    (protected)/
      dashboard/
    api/auth/
      [...nextauth]/
      signup/
  components/
    auth/
    dashboard/
    layout/
    ui/
  lib/
    auth/
    prisma/
    validations/
  types/
prisma/
```

## Completed scope

- Signup and login with email/password
- Password hashing with bcryptjs
- JWT sessions with role + subscription in session payload
- Prisma schema for User, Payment, enums, timestamps, indexes
- Protected dashboard route via middleware
- Modern SaaS UI shell

## Not in scope yet

- Learning modules
- Billing provider integration
- Team/workspace logic
