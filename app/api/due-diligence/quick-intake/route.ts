import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  customerName?: unknown; email?: unknown; companyLegalName?: unknown;
  companyChineseName?: unknown; jurisdiction?: unknown; registrationNumber?: unknown;
  website?: unknown; researchPurpose?: unknown; specificQuestions?: unknown;
  additionalInformation?: unknown; termsAccepted?: unknown; faxNumber?: unknown;
};

function clean(value: unknown, maxLength = 2000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}
function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
function validEmail(email: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function requestId() {
  const now = new Date();
  const date = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}`;
  return `SER-QS-${date}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Payload;
    const customerName = clean(body.customerName, 150);
    const email = clean(body.email, 254);
    const companyLegalName = clean(body.companyLegalName, 300);
    const companyChineseName = clean(body.companyChineseName, 300);
    const jurisdiction = clean(body.jurisdiction, 100);
    const registrationNumber = clean(body.registrationNumber, 150);
    const website = clean(body.website, 500);
    const researchPurpose = clean(body.researchPurpose, 300);
    const specificQuestions = clean(body.specificQuestions, 5000);
    const additionalInformation = clean(body.additionalInformation, 5000);
    const faxNumber = clean(body.faxNumber, 100);

    if (faxNumber) return NextResponse.json({ ok: true });
    if (!customerName || !email || !companyLegalName || !jurisdiction || !researchPurpose || body.termsAccepted !== true) {
      return NextResponse.json({ ok: false, error: "Required fields or consent are missing." }, { status: 400 });
    }
    if (!validEmail(email)) return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.ORDER_NOTIFICATION_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const paymentLink = process.env.STRIPE_QUICK_PAYMENT_LINK;
    if (!apiKey || !notificationEmail || !fromEmail || !paymentLink?.startsWith("https://")) {
      console.error("Quick Scan checkout configuration is missing.");
      return NextResponse.json({ ok: false, error: "Server configuration error." }, { status: 500 });
    }

    const id = requestId();
    const value = (text: string) => escapeHtml(text || "Not provided");
    const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:700px">
      <h1>New Quick Scan checkout</h1>
      <p><strong>Reference:</strong> ${value(id)}<br/><strong>Status:</strong> Customer sent directly to Stripe checkout</p>
      <h2>Customer</h2><p><strong>Name:</strong> ${value(customerName)}<br/><strong>Email:</strong> ${value(email)}</p>
      <h2>Target company</h2><p><strong>Legal name:</strong> ${value(companyLegalName)}<br/><strong>Chinese name:</strong> ${value(companyChineseName)}<br/><strong>Jurisdiction:</strong> ${value(jurisdiction)}<br/><strong>Registration number:</strong> ${value(registrationNumber)}<br/><strong>Website:</strong> ${value(website)}</p>
      <h2>Research request</h2><p><strong>Product:</strong> Quick Scan Brief<br/><strong>Price:</strong> US$49<br/><strong>Purpose:</strong> ${value(researchPurpose)}</p>
      <p><strong>Specific questions:</strong><br/>${value(specificQuestions).replaceAll("\n", "<br/>")}</p>
      <p><strong>Additional information:</strong><br/>${value(additionalInformation).replaceAll("\n", "<br/>")}</p>
      <p><strong>Terms and privacy acknowledged:</strong> Yes</p>
      <p style="font-size:12px;color:#666">Begin research only after the corresponding Stripe payment is confirmed.</p>
    </div>`;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: fromEmail, to: [notificationEmail], reply_to: email, subject: `${id} — Quick Scan checkout — ${companyLegalName}`, html })
    });
    if (!emailResponse.ok) {
      console.error("Failed to record Quick Scan intake:", await emailResponse.text());
      return NextResponse.json({ ok: false, error: "Unable to process the request." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, requestId: id, checkoutUrl: paymentLink });
  } catch (error) {
    console.error("Quick Scan intake error:", error);
    return NextResponse.json({ ok: false, error: "Unable to process the request." }, { status: 500 });
  }
}
