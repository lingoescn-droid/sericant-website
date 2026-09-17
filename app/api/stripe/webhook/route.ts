import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type StripeCheckoutSession = {
  id?: string;
  object?: string;
  client_reference_id?: string | null;
  customer_email?: string | null;
  customer_details?: { email?: string | null; name?: string | null } | null;
  amount_total?: number | null;
  currency?: string | null;
  payment_status?: string | null;
  payment_intent?: string | { id?: string } | null;
  metadata?: Record<string, string> | null;
};

type StripeEvent = {
  id?: string;
  type?: string;
  created?: number;
  data?: { object?: StripeCheckoutSession };
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safe(value: string | null | undefined, fallback = "Not provided") {
  const clean = (value || "").trim();
  return escapeHtml(clean || fallback);
}

function parseStripeSignature(header: string) {
  const parts = header.split(",").map((part) => part.trim());
  let timestamp = "";
  const signatures: string[] = [];

  for (const part of parts) {
    const index = part.indexOf("=");
    if (index < 0) continue;
    const key = part.slice(0, index);
    const value = part.slice(index + 1);
    if (key === "t") timestamp = value;
    if (key === "v1") signatures.push(value);
  }

  return { timestamp, signatures };
}

function secureEqualHex(a: string, b: string) {
  if (!/^[0-9a-f]+$/i.test(a) || !/^[0-9a-f]+$/i.test(b) || a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

function verifyStripeSignature(payload: string, header: string, secret: string) {
  const { timestamp, signatures } = parseStripeSignature(header);
  const timestampNumber = Number(timestamp);
  if (!timestamp || !Number.isFinite(timestampNumber) || signatures.length === 0) return false;

  // Stripe recommends rejecting stale signed payloads. Five minutes is the standard tolerance.
  if (Math.abs(Math.floor(Date.now() / 1000) - timestampNumber) > 300) return false;

  const expected = crypto.createHmac("sha256", secret).update(`${timestamp}.${payload}`, "utf8").digest("hex");
  return signatures.some((signature) => secureEqualHex(signature, expected));
}

function formatAmount(amountTotal: number | null | undefined, currency: string | null | undefined) {
  if (typeof amountTotal !== "number" || !currency) return "Amount unavailable";
  const code = currency.toUpperCase();
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: code }).format(amountTotal / 100);
  } catch {
    return `${code} ${(amountTotal / 100).toFixed(2)}`;
  }
}

function formatHongKongTime(unixSeconds: number | undefined) {
  if (!unixSeconds) return "Time unavailable";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(unixSeconds * 1000)) + " HKT";
}

function productLabel(product: string | undefined) {
  if (product === "quick") return "Quick Scan Brief";
  if (product === "standard") return "Company Intelligence Brief";
  return product || "Sericant order";
}

async function sendPaymentNotification(event: StripeEvent, session: StripeCheckoutSession) {
  const apiKey = process.env.RESEND_API_KEY || "";
  const notificationEmail = process.env.ORDER_NOTIFICATION_EMAIL || "";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "";
  if (!apiKey || !notificationEmail || !fromEmail) {
    throw new Error("Payment notification email is not configured.");
  }

  const metadata = session.metadata || {};
  const requestId = metadata.request_id || session.client_reference_id || session.id || "Unknown reference";
  const product = productLabel(metadata.product);
  const amount = formatAmount(session.amount_total, session.currency);
  const customerEmail = metadata.customer_email || session.customer_details?.email || session.customer_email || "";
  const customerName = metadata.customer_name || session.customer_details?.name || "";
  const paymentIntent = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || "";

  const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:720px">
    <h1>Payment received</h1>
    <p><strong>Status:</strong> PAID — RESEARCH READY<br/>
    <strong>Reference:</strong> ${safe(requestId)}<br/>
    <strong>Product:</strong> ${safe(product)}<br/>
    <strong>Amount:</strong> ${safe(amount)}<br/>
    <strong>Paid:</strong> ${safe(formatHongKongTime(event.created))}</p>

    <h2>Customer</h2>
    <p><strong>Name:</strong> ${safe(customerName)}<br/>
    <strong>Email:</strong> ${safe(customerEmail)}</p>

    <h2>Target company</h2>
    <p><strong>Legal name:</strong> ${safe(metadata.company_legal_name)}<br/>
    <strong>Chinese name:</strong> ${safe(metadata.company_chinese_name)}<br/>
    <strong>Jurisdiction:</strong> ${safe(metadata.jurisdiction)}<br/>
    <strong>Registration number:</strong> ${safe(metadata.registration_number)}</p>

    <h2>Stripe</h2>
    <p><strong>Checkout Session:</strong> ${safe(session.id)}<br/>
    <strong>PaymentIntent:</strong> ${safe(paymentIntent)}<br/>
    <strong>Stripe event:</strong> ${safe(event.id)}<br/>
    <strong>Payment status:</strong> ${safe(session.payment_status || "paid")}</p>

    <p><strong>Next action:</strong> Begin research only after this paid notification has been received.</p>
  </div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notificationEmail],
      reply_to: customerEmail || notificationEmail,
      subject: `PAYMENT RECEIVED — ${requestId} — ${product} — ${amount}`,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Payment notification email failed: ${await response.text()}`);
  }
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  if (!webhookSecret.startsWith("whsec_")) {
    console.error("Stripe webhook secret is not configured.");
    return NextResponse.json({ received: false, error: "Webhook not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature") || "";
  const rawBody = await request.text();

  if (!signature || !verifyStripeSignature(rawBody, signature, webhookSecret)) {
    console.error("Rejected Stripe webhook with invalid signature.");
    return NextResponse.json({ received: false, error: "Invalid signature." }, { status: 400 });
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(rawBody) as StripeEvent;
  } catch {
    return NextResponse.json({ received: false, error: "Invalid payload." }, { status: 400 });
  }

  const session = event.data?.object;
  if (!session || session.object !== "checkout.session") {
    return NextResponse.json({ received: true, ignored: true });
  }

  const successfulAsyncPayment = event.type === "checkout.session.async_payment_succeeded";
  const paidCompletedSession = event.type === "checkout.session.completed" && session.payment_status === "paid";

  if (!successfulAsyncPayment && !paidCompletedSession) {
    return NextResponse.json({ received: true, ignored: true });
  }

  try {
    await sendPaymentNotification(event, session);
  } catch (error) {
    console.error("Stripe payment webhook processing failed:", error);
    return NextResponse.json({ received: false, error: "Processing failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
