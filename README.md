# Sericant Website — P0 Sellable Release

This Next.js site presents Sericant's current Company Intelligence Brief and keeps future platform capabilities clearly separated from the paid research service.

## Customer journey

1. The customer reviews the service, methodology and format sample.
2. The customer submits a scope request at `/due-diligence/intake`.
3. Sericant confirms the target entity, scope, fee and estimated delivery date by email.
4. Sericant sends an approved Stripe payment link only after the customer accepts the scope.
5. Research begins after payment and sufficient identifying information are received.

The public website deliberately does not link directly to Stripe.

## Environment variables

The scope-request API requires:

- `RESEND_API_KEY`
- `ORDER_NOTIFICATION_EMAIL`
- `RESEND_FROM_EMAIL`

Stripe secrets are not required by the public scope-request form. Payment confirmation and fulfilment should be handled through the approved payment workflow after scope confirmation.

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run typecheck
npm run build
```

GitHub Actions runs both checks for pull requests and changes to `main`.

## Deployment

The existing GitHub repository is connected to the current Vercel project. Do not create another Vercel project or change DNS. Review the preview deployment before merging to `main`.

## Required owner review before production

- Introductory pricing is confirmed as starting from US$149.
- Standard delivery is confirmed as 2–3 business days.
- Service Terms, Hong Kong governing law, fee-capped liability, Privacy Policy,
  and the Delivery and Cancellation Policy have been approved in principle by
  the owner and remain subject to final pre-publication proofreading.
- Configure the Resend variables and test both internal and customer emails.
- Update the Stripe product description and branding to match the accepted scope.
- Do not publish the founder's name, photograph or biography. Publish only
  approved company-level information.
- Replace the fictional format sample with a source-cleared real or anonymised sample when available.
