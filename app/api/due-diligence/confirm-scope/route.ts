import { NextRequest, NextResponse } from "next/server";
import { briefProducts, isBriefProduct } from "../../../lib/brief-products";
import { verifyScopeConfirmationToken } from "../../../lib/scope-confirmation";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || "";
  const secret = process.env.SCOPE_APPROVAL_SECRET || "";
  const apiKey = process.env.RESEND_API_KEY || "";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "";
  const replyTo = process.env.ORDER_NOTIFICATION_EMAIL || "";

  if (!secret || !apiKey || !fromEmail || !replyTo) {
    return new NextResponse("Scope confirmation is not configured.", { status: 500 });
  }

  const payload = verifyScopeConfirmationToken(token, secret);
  if (!payload || !isBriefProduct(payload.product)) {
    return new NextResponse("This approval link is invalid or has expired.", { status: 400 });
  }

  const product = briefProducts[payload.product];
  const paymentLink = payload.product === "quick"
    ? process.env.STRIPE_QUICK_PAYMENT_LINK
    : process.env.STRIPE_STANDARD_PAYMENT_LINK;

  if (!paymentLink || !paymentLink.startsWith("https://")) {
    return new NextResponse("The payment link for this product is not configured.", { status: 500 });
  }

  const customerName = escapeHtml(payload.customerName);
  const companyName = escapeHtml(payload.companyLegalName);
  const requestId = escapeHtml(payload.requestId);
  const productName = escapeHtml(product.name);
  const price = escapeHtml(product.price);
  const timing = escapeHtml(product.timing);

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:640px;margin:0 auto">
      <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase">Sericant Limited</p>
      <h1 style="font-size:28px;line-height:1.15">Scope confirmed</h1>
      <p>Dear ${customerName},</p>
      <p>We have reviewed your request concerning <strong>${companyName}</strong> and can proceed with the research.</p>
      <div style="border:1px solid #d9d6cc;padding:18px 20px;margin:24px 0">
        <p style="margin:0 0 8px"><strong>Research product:</strong> ${productName}</p>
        <p style="margin:0 0 8px"><strong>Confirmed fee:</strong> ${price}</p>
        <p style="margin:0 0 8px"><strong>Estimated delivery:</strong> ${timing} after payment and receipt of sufficient identifying information</p>
        <p style="margin:0"><strong>Reference:</strong> ${requestId}</p>
      </div>
      <p>Please use the secure Stripe checkout below to accept the confirmed scope and complete payment.</p>
      <p style="margin:28px 0"><a href="${escapeHtml(paymentLink)}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:14px 20px;font-weight:700">PAY SECURELY →</a></p>
      <p style="font-size:13px;color:#555">Research begins after payment is confirmed. If the target entity or requested scope changes, please reply before paying so we can reconfirm the scope.</p>
      <p>Regards,<br />Sericant Limited<br />Hong Kong<br /><a href="https://www.sericant.com">sericant.com</a></p>
    </div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: fromEmail,
      to: [payload.email],
      reply_to: replyTo,
      subject: `${payload.requestId} — Scope Confirmed — ${payload.companyLegalName}`,
      html
    })
  });

  if (!response.ok) {
    console.error("Scope confirmation email failed:", await response.text());
    return new NextResponse("Unable to send the scope confirmation email.", { status: 502 });
  }

  return new NextResponse(
    `<!doctype html><html><body style="font-family:Arial,sans-serif;padding:48px;color:#111"><h1>Scope confirmation sent.</h1><p>${requestId} — ${companyName}</p><p>The customer has been emailed the secure payment link.</p><p>You can close this window.</p></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } }
  );
}
