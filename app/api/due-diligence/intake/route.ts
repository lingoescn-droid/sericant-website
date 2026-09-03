import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type IntakePayload = {
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

  // Stripe Checkout Session ID passed from the intake page.
  sessionId?: unknown;
};

type StripeCheckoutSession = {
  id?: string;
  status?: string | null;
  payment_status?: string | null;
  payment_link?: string | null;
  payment_intent?: string | null;
  amount_total?: number | null;
  currency?: string | null;
  customer_details?: {
    email?: string | null;
    name?: string | null;
  } | null;
};

function clean(value: unknown, maxLength = 2000) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
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

function createOrderId() {
  const now = new Date();

  const date =
    now.getUTCFullYear().toString() +
    String(now.getUTCMonth() + 1).padStart(2, "0") +
    String(now.getUTCDate()).padStart(2, "0");

  const random = crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase();

  return `SER-DD-${date}-${random}`;
}

function formatStripeAmount(
  amount: number | null | undefined,
  currency: string | null | undefined
) {
  if (
    typeof amount !== "number" ||
    !currency
  ) {
    return "Not available";
  }

  const code = currency.toUpperCase();

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
    }).format(amount / 100);
  } catch {
    return `${code} ${(amount / 100).toFixed(2)}`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IntakePayload;

    const customerName = clean(body.customerName, 150);
    const email = clean(body.email, 254);
    const companyLegalName = clean(body.companyLegalName, 300);
    const companyChineseName = clean(
      body.companyChineseName,
      300
    );
    const jurisdiction = clean(body.jurisdiction, 100);
    const registrationNumber = clean(
      body.registrationNumber,
      150
    );
    const website = clean(body.website, 500);
    const researchPurpose = clean(
      body.researchPurpose,
      300
    );
    const specificQuestions = clean(
      body.specificQuestions,
      5000
    );
    const additionalInformation = clean(
      body.additionalInformation,
      5000
    );

    const sessionId = clean(body.sessionId, 300);

    if (
      !customerName ||
      !email ||
      !companyLegalName ||
      !jurisdiction ||
      !researchPurpose
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Required fields are missing.",
        },
        {
          status: 400,
        }
      );
    }

    if (!validEmail(email)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid email address.",
        },
        {
          status: 400,
        }
      );
    }

    /*
      Payment verification.
      The intake form must originate from a completed Stripe
      Checkout Session belonging to Sericant's Due Diligence
      Payment Link.
    */

    if (!sessionId) {
      return NextResponse.json(
        {
          ok: false,
          error: "Payment session is missing.",
        },
        {
          status: 400,
        }
      );
    }

    if (!sessionId.startsWith("cs_")) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid payment session.",
        },
        {
          status: 400,
        }
      );
    }

    const stripeSecretKey =
      process.env.STRIPE_SECRET_KEY;

    const expectedPaymentLinkId =
      process.env.STRIPE_PAYMENT_LINK_ID;

    if (
      !stripeSecretKey ||
      !expectedPaymentLinkId
    ) {
      console.error(
        "Stripe payment verification configuration is missing."
      );

      return NextResponse.json(
        {
          ok: false,
          error: "Server configuration error.",
        },
        {
          status: 500,
        }
      );
    }

    const stripeResponse = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(
        sessionId
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
        },
        cache: "no-store",
      }
    );

    if (!stripeResponse.ok) {
      console.error(
        "Unable to retrieve Stripe Checkout Session:",
        await stripeResponse.text()
      );

      return NextResponse.json(
        {
          ok: false,
          error: "Unable to verify payment.",
        },
        {
          status: 400,
        }
      );
    }

    const stripeSession =
      (await stripeResponse.json()) as StripeCheckoutSession;

    if (
      stripeSession.payment_status !== "paid" ||
      stripeSession.status !== "complete"
    ) {
      console.warn(
        "Stripe Checkout Session is not paid or complete:",
        {
          sessionId,
          paymentStatus:
            stripeSession.payment_status,
          status: stripeSession.status,
        }
      );

      return NextResponse.json(
        {
          ok: false,
          error: "Payment has not been completed.",
        },
        {
          status: 403,
        }
      );
    }

    if (
      stripeSession.payment_link !==
      expectedPaymentLinkId
    ) {
      console.warn(
        "Stripe Checkout Session came from an unexpected Payment Link:",
        {
          sessionId,
          paymentLink:
            stripeSession.payment_link,
        }
      );

      return NextResponse.json(
        {
          ok: false,
          error: "Payment could not be verified.",
        },
        {
          status: 403,
        }
      );
    }

    /*
      Email configuration.
    */

    const apiKey = process.env.RESEND_API_KEY;

    const notificationEmail =
      process.env.ORDER_NOTIFICATION_EMAIL;

    const fromEmail =
      process.env.RESEND_FROM_EMAIL;

    if (
      !apiKey ||
      !notificationEmail ||
      !fromEmail
    ) {
      console.error(
        "Due Diligence intake email configuration is missing."
      );

      return NextResponse.json(
        {
          ok: false,
          error: "Server configuration error.",
        },
        {
          status: 500,
        }
      );
    }

    /*
      At this point:
      - required intake data is valid
      - Stripe Checkout Session exists
      - payment is complete and paid
      - payment came from the expected Payment Link
    */

    const orderId = createOrderId();
    const submittedAt = new Date().toISOString();

    const stripeAmount = formatStripeAmount(
      stripeSession.amount_total,
      stripeSession.currency
    );

    const stripePaymentIntent =
      stripeSession.payment_intent || "Not available";

    const stripeCheckoutEmail =
      stripeSession.customer_details?.email ||
      "Not available";

    /*
      Internal Sericant notification.
    */

    const internalHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
        <h1>New Sericant Due Diligence Request</h1>

        <p>
          <strong>Order ID:</strong>
          ${escapeHtml(orderId)}
        </p>

        <p>
          <strong>Submitted:</strong>
          ${escapeHtml(submittedAt)}
        </p>

        <hr />

        <h2>Payment</h2>

        <p>
          <strong>Payment status:</strong>
          Paid
        </p>

        <p>
          <strong>Amount:</strong>
          ${escapeHtml(stripeAmount)}
        </p>

        <p>
          <strong>Stripe Checkout Session:</strong>
          ${escapeHtml(sessionId)}
        </p>

        <p>
          <strong>Stripe Payment Intent:</strong>
          ${escapeHtml(stripePaymentIntent)}
        </p>

        <p>
          <strong>Stripe checkout email:</strong>
          ${escapeHtml(stripeCheckoutEmail)}
        </p>

        <hr />

        <h2>Customer</h2>

        <p>
          <strong>Name:</strong>
          ${escapeHtml(customerName)}
        </p>

        <p>
          <strong>Email:</strong>
          ${escapeHtml(email)}
        </p>

        <h2>Target Company</h2>

        <p>
          <strong>Legal name:</strong>
          ${escapeHtml(companyLegalName)}
        </p>

        <p>
          <strong>Chinese name:</strong>
          ${escapeHtml(
            companyChineseName || "Not provided"
          )}
        </p>

        <p>
          <strong>Jurisdiction:</strong>
          ${escapeHtml(jurisdiction)}
        </p>

        <p>
          <strong>Registration number:</strong>
          ${escapeHtml(
            registrationNumber || "Not provided"
          )}
        </p>

        <p>
          <strong>Website:</strong>
          ${escapeHtml(
            website || "Not provided"
          )}
        </p>

        <h2>Research Request</h2>

        <p>
          <strong>Purpose:</strong>
          ${escapeHtml(researchPurpose)}
        </p>

        <p>
          <strong>Specific questions:</strong><br />
          ${escapeHtml(
            specificQuestions || "Not provided"
          ).replaceAll("\n", "<br />")}
        </p>

        <p>
          <strong>Additional information:</strong><br />
          ${escapeHtml(
            additionalInformation || "Not provided"
          ).replaceAll("\n", "<br />")}
        </p>
      </div>
    `;

    const internalResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [notificationEmail],
          reply_to: email,
          subject:
            `${orderId} — Due Diligence Request — ` +
            companyLegalName,
          html: internalHtml,
        }),
      }
    );

    if (!internalResponse.ok) {
      const failure =
        await internalResponse.text();

      console.error(
        "Failed to send internal intake notification:",
        failure
      );

      return NextResponse.json(
        {
          ok: false,
          error: "Unable to process the request.",
        },
        {
          status: 502,
        }
      );
    }

    /*
      Customer acknowledgement.

      Best effort:
      once execution reaches this point,
      Sericant has already received the internal order.
    */

    const customerHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
        <h1>Sericant Company Due Diligence Report</h1>

        <p>Dear ${escapeHtml(customerName)},</p>

        <p>
          Thank you. We have received the company information
          for your Sericant Company Due Diligence Report.
        </p>

        <p>
          <strong>Reference:</strong>
          ${escapeHtml(orderId)}
        </p>

        <p>
          <strong>Target company:</strong>
          ${escapeHtml(companyLegalName)}
        </p>

        <p>
          Your payment has been confirmed.
        </p>

        <p>
          Sericant will review the information submitted and
          normally begin research once sufficient identifying
          information is available.
        </p>

        <p>
          If clarification is required, we will contact you
          using this email address.
        </p>

        <p>
          Please retain the reference number above for future
          correspondence.
        </p>

        <p>
          Regards,<br />
          Sericant Limited<br />
          Hong Kong
        </p>
      </div>
    `;

    const customerResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [email],
          reply_to: notificationEmail,
          subject:
            `${orderId} — Sericant Due Diligence Request Received`,
          html: customerHtml,
        }),
      }
    );

    if (!customerResponse.ok) {
      console.error(
        "Customer acknowledgement email could not be sent:",
        await customerResponse.text()
      );
    }

    return NextResponse.json({
      ok: true,
      orderId,
      payment: {
        verified: true,
        checkoutSessionId: sessionId,
        paymentIntent:
          stripeSession.payment_intent || null,
        amountTotal:
          stripeSession.amount_total || null,
        currency:
          stripeSession.currency || null,
      },
    });
  } catch (error) {
    console.error(
      "Due Diligence intake error:",
      error
    );

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to process the request.",
      },
      {
        status: 500,
      }
    );
  }
}
