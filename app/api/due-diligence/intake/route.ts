import crypto from "crypto";
import { briefProducts, isBriefProduct } from "../../../lib/brief-products";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type IntakePayload = {
  product?: unknown;
  customerName?: unknown;
  email?: unknown;
  companyLegalName?: unknown;
  companyChineseName?: unknown;
  jurisdiction?: unknown;
  registrationNumber?: unknown;
  website?: unknown;
  researchPurpose?: unknown;
  specificQuestions?: unknown;
  additionalInformation?: unknown;
  termsAccepted?: unknown;
  faxNumber?: unknown;
};

function clean(value: unknown, maxLength = 2000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createRequestId() {
  const now = new Date();
  const date =
    now.getUTCFullYear().toString() +
    String(now.getUTCMonth() + 1).padStart(2, "0") +
    String(now.getUTCDate()).padStart(2, "0");
  return `SER-REQ-${date}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IntakePayload;
    // Older cached forms without a product retain the original full-brief scope.
    const productKey = body.product === undefined ? "standard" : body.product;
    if (!isBriefProduct(productKey)) {
      return NextResponse.json({ ok: false, error: "Invalid report product." }, { status: 400 });
    }
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

    // Honeypot: accept bot submissions without forwarding them.
    if (faxNumber) {
      return NextResponse.json({ ok: true });
    }

    if (
      !customerName ||
      !email ||
      !companyLegalName ||
      !jurisdiction ||
      !researchPurpose ||
      body.termsAccepted !== true
    ) {
      return NextResponse.json(
        { ok: false, error: "Required fields or consent are missing." },
        { status: 400 }
      );
    }

    if (!validEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.ORDER_NOTIFICATION_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !notificationEmail || !fromEmail) {
      console.error("Due diligence request email configuration is missing.");
      return NextResponse.json(
        { ok: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    const requestId = createRequestId();
    const submittedAt = new Date().toISOString();
    const value = (text: string) => escapeHtml(text || "Not provided");

    const internalHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
        <h1>New Sericant Scope Request</h1>
        <p><strong>Request ID:</strong> ${value(requestId)}</p>
        <p><strong>Submitted:</strong> ${value(submittedAt)}</p>
        <h2>Customer</h2>
        <p><strong>Name:</strong> ${value(customerName)}</p>
        <p><strong>Email:</strong> ${value(email)}</p>
        <h2>Target company</h2>
        <p><strong>Legal name:</strong> ${value(companyLegalName)}</p>
        <p><strong>Chinese name:</strong> ${value(companyChineseName)}</p>
        <p><strong>Jurisdiction:</strong> ${value(jurisdiction)}</p>
        <p><strong>Registration number:</strong> ${value(registrationNumber)}</p>
        <p><strong>Website:</strong> ${value(website)}</p>
        <h2>Research request</h2>
        <p><strong>Product:</strong> ${value(product.name)}</p>
        <p><strong>Indicative price:</strong> ${value(product.price)}</p>
        <p><strong>Delivery estimate:</strong> ${value(product.timing)} after payment and sufficient identifying information; subject to scope confirmation.</p>
        <p><strong>Purpose:</strong> ${value(researchPurpose)}</p>
        <p><strong>Specific questions:</strong><br />${value(specificQuestions).replaceAll("\n", "<br />")}</p>
        <p><strong>Additional information:</strong><br />${value(additionalInformation).replaceAll("\n", "<br />")}</p>
        <p><strong>Terms and privacy acknowledged:</strong> Yes</p>
      </div>`;

    const internalResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [notificationEmail],
        reply_to: email,
        subject: `${requestId} — ${product.name} — ${companyLegalName}`,
        html: internalHtml
      })
    });

    if (!internalResponse.ok) {
      console.error("Failed to send scope request:", await internalResponse.text());
      return NextResponse.json(
        { ok: false, error: "Unable to process the request." },
        { status: 502 }
      );
    }

    const customerHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
        <h1>Sericant scope request received</h1>
        <p>Dear ${value(customerName)},</p>
        <p>We have received your request concerning <strong>${value(companyLegalName)}</strong>.</p>
        <p><strong>Requested product:</strong> ${value(product.name)} — ${value(product.price)}</p>
        <p><strong>Delivery estimate:</strong> ${value(product.timing)} after payment and sufficient identifying information; subject to scope confirmation.</p>
        <p><strong>Reference:</strong> ${value(requestId)}</p>
        <p>We will first confirm the target entity, available research scope, fee and estimated delivery date. No payment is due until you accept that confirmation.</p>
        <p>Regards,<br />Sericant Limited<br />Hong Kong</p>
      </div>`;

    const customerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        reply_to: notificationEmail,
        subject: `${requestId} — Sericant Scope Request Received`,
        html: customerHtml
      })
    });

    if (!customerResponse.ok) {
      console.error("Customer acknowledgement could not be sent:", await customerResponse.text());
    }

    return NextResponse.json({ ok: true, requestId });
  } catch (error) {
    console.error("Due diligence intake error:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to process the request." },
      { status: 500 }
    );
  }
}
