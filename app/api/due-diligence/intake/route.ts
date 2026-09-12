import crypto from "crypto";
import { briefProducts, isBriefProduct } from "../../../lib/brief-products";
import { createScopeConfirmationToken } from "../../../lib/scope-confirmation";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type IntakePayload = {
  product?: unknown; customerName?: unknown; email?: unknown; companyLegalName?: unknown;
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
function createRequestId() {
  const now = new Date();
  const date = now.getUTCFullYear().toString() + String(now.getUTCMonth() + 1).padStart(2, "0") + String(now.getUTCDate()).padStart(2, "0");
  return `SER-REQ-${date}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

async function sendResend(apiKey: string, body: Record<string, unknown>) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IntakePayload;
    const productKey = body.product === undefined ? "standard" : body.product;
    if (!isBriefProduct(productKey)) return NextResponse.json({ ok: false, error: "Invalid report product." }, { status: 400 });
    const product = briefProducts[productKey];

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
    const approvalSecret = process.env.SCOPE_APPROVAL_SECRET;
    const siteUrl = (process.env.SITE_URL || "https://www.sericant.com").replace(/\/$/, "");
    if (!apiKey || !notificationEmail || !fromEmail || !approvalSecret) {
      console.error("Due diligence request email configuration is missing.");
      return NextResponse.json({ ok: false, error: "Server configuration error." }, { status: 500 });
    }

    const requestId = createRequestId();
    const submittedAt = new Date().toISOString();
    const value = (text: string) => escapeHtml(text || "Not provided");
    const token = createScopeConfirmationToken({ requestId, customerName, email, companyLegalName, product: productKey }, approvalSecret);
    const approvalUrl = `${siteUrl}/api/due-diligence/confirm-scope?token=${encodeURIComponent(token)}`;

    const internalHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:700px">
        <h1>New Sericant Scope Request</h1>
        <p><strong>Request ID:</strong> ${value(requestId)}<br/><strong>Submitted:</strong> ${value(submittedAt)}</p>
        <h2>Customer</h2><p><strong>Name:</strong> ${value(customerName)}<br/><strong>Email:</strong> ${value(email)}</p>
        <h2>Target company</h2>
        <p><strong>Legal name:</strong> ${value(companyLegalName)}<br/><strong>Chinese name:</strong> ${value(companyChineseName)}<br/><strong>Jurisdiction:</strong> ${value(jurisdiction)}<br/><strong>Registration number:</strong> ${value(registrationNumber)}<br/><strong>Website:</strong> ${value(website)}</p>
        <h2>Research request</h2>
        <p><strong>Product:</strong> ${value(product.name)}<br/><strong>Indicative price:</strong> ${value(product.price)}<br/><strong>Delivery estimate:</strong> ${value(product.timing)} after payment and sufficient identifying information; subject to scope confirmation.<br/><strong>Purpose:</strong> ${value(researchPurpose)}</p>
        <p><strong>Specific questions:</strong><br/>${value(specificQuestions).replaceAll("\n", "<br/>")}</p>
        <p><strong>Additional information:</strong><br/>${value(additionalInformation).replaceAll("\n", "<br/>")}</p>
        <p><strong>Terms and privacy acknowledged:</strong> Yes</p>
        <hr style="border:0;border-top:1px solid #ddd;margin:28px 0"/>
        <h2>Scope review action</h2>
        <p>Only click the button after you have reviewed the entity and confirmed that the stated product, fee and delivery estimate are appropriate. Clicking it immediately emails the customer the Stripe payment link.</p>
        <p><a href="${escapeHtml(approvalUrl)}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:14px 20px;font-weight:700">CONFIRM SCOPE & SEND PAYMENT LINK →</a></p>
        <p style="font-size:12px;color:#666">This approval link expires in 7 days and is intended only for Sericant internal use. Do not forward it.</p>
      </div>`;

    const internalResponse = await sendResend(apiKey, {
      from: fromEmail, to: [notificationEmail], reply_to: email,
      subject: `${requestId} — ${product.name} — ${companyLegalName}`, html: internalHtml
    });
    if (!internalResponse.ok) {
      console.error("Failed to send scope request:", await internalResponse.text());
      return NextResponse.json({ ok: false, error: "Unable to process the request." }, { status: 502 });
    }

    const customerHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:640px">
        <h1>Sericant scope request received</h1>
        <p>Dear ${value(customerName)},</p>
        <p>We have received your request concerning <strong>${value(companyLegalName)}</strong>.</p>
        <p><strong>Requested product:</strong> ${value(product.name)} — ${value(product.price)}<br/><strong>Delivery estimate:</strong> ${value(product.timing)} after payment and sufficient identifying information; subject to scope confirmation.<br/><strong>Reference:</strong> ${value(requestId)}</p>
        <p>We normally review the target entity and requested scope within one Hong Kong business day.</p>
        <p>If we can proceed, we will email you the confirmed research scope, final fee, estimated delivery date and a secure Stripe payment link. No payment is due until you accept that confirmation.</p>
        <p>Regards,<br/>Sericant Limited<br/>Hong Kong<br/><a href="https://www.sericant.com">sericant.com</a></p>
      </div>`;

    const customerResponse = await sendResend(apiKey, {
      from: fromEmail, to: [email], reply_to: notificationEmail,
      subject: `${requestId} — Sericant Scope Request Received`, html: customerHtml
    });
    if (!customerResponse.ok) console.error("Customer acknowledgement could not be sent:", await customerResponse.text());

    return NextResponse.json({ ok: true, requestId });
  } catch (error) {
    console.error("Due diligence intake error:", error);
    return NextResponse.json({ ok: false, error: "Unable to process the request." }, { status: 500 });
  }
}
