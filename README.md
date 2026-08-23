# Sericant — Vercel-ready website

A minimal Next.js website for Sericant Limited.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Create a GitHub repository and upload this folder.
2. Import the repository into Vercel.
3. Deploy using the default Next.js settings.
4. In Vercel, open Project → Settings → Domains and add `sericant.com`.
5. Vercel will show the exact DNS records required.
6. In Alibaba Cloud DNS, add those records to the `sericant.com` zone.
7. Wait for DNS propagation and verify HTTPS.

## Before launch

- Replace the placeholder product demo with a real screenshot or live MVP.
- Confirm the founder's preferred public biography.
- Add a real business email if `hello@sericant.com` is not configured.
- Add final Privacy Policy and Terms of Use pages before collecting user data.
- Review all data/licensing/compliance claims before publishing them as factual statements.

## Suggested future architecture

- `sericant.com` — marketing/company site
- `app.sericant.com` — product application
