import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delivery and Cancellation Policy",
  description: "Delivery estimates, cancellations and refunds for Sericant company intelligence services.",
  alternates: { canonical: "/refund-delivery" }
};

export default function RefundDeliveryPage() {
  return (
    <main className="legalPage">
      <header className="simpleHeader"><Link href="/" className="logo">SERICANT</Link><Link href="/due-diligence" className="back">← Back to report service</Link></header>
      <article className="legalContent">
        <div className="sectionLabel">DELIVERY & CANCELLATION</div>
        <h1 style={{ fontSize: "48px", lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "18px" }}>Delivery and Cancellation Policy</h1>
        <p className="lede" style={{ marginBottom: "52px" }}>Last updated: 4 September 2026</p>
        <section><h2>1. Scope before payment</h2><p>Submitting a company request does not require payment. Sericant first confirms the target entity, proposed scope, fee and estimated delivery date. Payment is requested only after the customer accepts that confirmation.</p></section>
        <section><h2>2. Delivery estimate</h2><p>A standard Company Intelligence Brief is normally estimated for delivery within 2–3 business days after payment and receipt of sufficient identifying information. The written scope confirmation controls where it states a different period.</p><p>Delivery may be paused while Sericant awaits clarification. Public holidays, source outages, unusually complex structures or additional agreed work may affect timing; Sericant will communicate a material expected delay.</p></section>
        <section><h2>3. Cancellation before work begins</h2><p>If the customer cancels after payment but before substantive research begins, Sericant may issue a full refund, less any non-refundable payment-processing cost where permitted and disclosed.</p></section>
        <section><h2>4. Cancellation after work begins</h2><p>Because the service is customised, fees are generally non-refundable once substantive research has begun. Sericant may, at its discretion, provide a partial refund reflecting work not yet performed.</p></section>
        <section><h2>5. Sericant cannot accept or complete the request</h2><p>If Sericant cannot accept the request before payment, no payment will be requested. If Sericant later determines that it cannot substantially perform the confirmed scope for reasons not caused by the customer, it will offer an adjusted scope, credit or appropriate refund.</p></section>
        <section><h2>6. Information gaps</h2><p>Limited, conflicting or unavailable information is not by itself a failure to deliver where those limitations are accurately identified in the report. A report may properly state that a matter could not be verified from lawfully usable sources.</p></section>
        <section><h2>7. Requesting assistance</h2><p>Contact <a href="mailto:hello@sericant.com">hello@sericant.com</a> with the request or order reference and target company name.</p></section>
      </article>
    </main>
  );
}
