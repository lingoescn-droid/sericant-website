type CheckoutOrder = {
  requestId: string;
  product: "quick" | "standard";
  productName: string;
  amountUsdCents: number;
  customerName: string;
  customerEmail: string;
  companyLegalName: string;
  companyChineseName?: string;
  registrationNumber?: string;
  jurisdiction?: string;
  siteUrl: string;
};

function meta(value: string | undefined, max = 450) {
  return (value || "").trim().slice(0, max);
}

async function createStripeCustomer(secretKey: string, order: CheckoutOrder, metadata: Record<string, string>) {
  const params = new URLSearchParams();
  params.set("email", order.customerEmail);
  params.set("name", order.customerName);
  params.set("description", `${order.requestId} — ${meta(order.companyLegalName, 180)}`);
  for (const [key, value] of Object.entries(metadata)) {
    params.set(`metadata[${key}]`, value);
  }

  const response = await fetch("https://api.stripe.com/v1/customers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const result = (await response.json()) as { id?: string; error?: { message?: string } };
  if (!response.ok || !result.id) {
    throw new Error(result.error?.message || "Unable to create Stripe Customer.");
  }
  return result.id;
}

export async function createStripeCheckoutSession(order: CheckoutOrder) {
  const secretKey = process.env.STRIPE_SECRET_KEY || "";
  if (!secretKey.startsWith("sk_")) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  const siteUrl = order.siteUrl.replace(/\/$/, "");
  const metadata: Record<string, string> = {
    request_id: order.requestId,
    product: order.product,
    customer_name: meta(order.customerName),
    customer_email: meta(order.customerEmail),
    company_legal_name: meta(order.companyLegalName),
    company_chinese_name: meta(order.companyChineseName),
    registration_number: meta(order.registrationNumber),
    jurisdiction: meta(order.jurisdiction),
  };

  // Passing an existing Stripe Customer with a valid email makes hosted Checkout
  // prefill that email and prevents it from being replaced accidentally.
  const customerId = await createStripeCustomer(secretKey, order, metadata);

  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("success_url", `${siteUrl}/due-diligence/thank-you?payment=success&reference=${encodeURIComponent(order.requestId)}`);
  params.set("cancel_url", order.product === "quick" ? `${siteUrl}/due-diligence/quick-scan` : `${siteUrl}/due-diligence/intake?product=standard`);
  params.set("customer", customerId);
  params.set("client_reference_id", order.requestId);

  params.set("line_items[0][price_data][currency]", "usd");
  params.set("line_items[0][price_data][unit_amount]", String(order.amountUsdCents));
  params.set("line_items[0][price_data][product_data][name]", order.productName);
  params.set("line_items[0][quantity]", "1");

  for (const [key, value] of Object.entries(metadata)) {
    params.set(`metadata[${key}]`, value);
    params.set(`payment_intent_data[metadata][${key}]`, value);
  }
  params.set(
    "payment_intent_data[description]",
    `${order.requestId} — ${meta(order.companyLegalName, 180)} — ${order.productName}`
  );

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const result = (await response.json()) as { id?: string; url?: string; error?: { message?: string } };
  if (!response.ok || !result.url) {
    throw new Error(result.error?.message || "Unable to create Stripe Checkout Session.");
  }

  return { id: result.id || "", url: result.url, customerId };
}
