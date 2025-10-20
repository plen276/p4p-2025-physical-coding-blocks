This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Prisma

After changing db

```shell
npx prisma migrate dev --name <name>
```

To explore the db

```shell
npx prisma studio
```

Either run

```bash
npx prisma migrate dev --name <name>
```

or

```bash
npx prisma db push
```

both will run `prisma generate` under the hood

### Apply schema changes

#### Versioned migrations (recommended)

```bash
npx prisma migrate dev --name <migration-name>
```

- Creates a migration file
- Applies changes to your database
- Automatically runs `prisma generate`

#### Quick prototype (no migration files)

```bash
npx prisma db push
```

- Updates the database directly from `schema.prisma`
- Automatically runs `prisma generate`
- Great for experimenting or local dev

### Explore the database

```bash
npx prisma studio
```

- Opens a visual GUI for inspecting and editing your data

### Notes

- `prisma generate` runs automatically after `migrate dev` or `db push`
- Use `migrate dev` for tracked, versioned schema changes
- Use `db push` for fast iteration or prototyping
