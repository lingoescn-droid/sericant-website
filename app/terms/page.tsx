import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Service Terms",
  description: "Terms governing the Sericant website and paid company intelligence services.",
  alternates: { canonical: "/terms" }
};

const sections = [
  ["1. About these Terms", <><p>These Terms govern access to sericant.com and any company intelligence, research brief or related service supplied by Sericant Limited, Hong Kong (“Sericant”, “we”, “us”). By submitting a service request or accepting a confirmed proposal, you agree to these Terms.</p><p>If a written proposal or order confirmation conflicts with these Terms, the proposal or order confirmation controls for that specific engagement.</p></>],
  ["2. Scope confirmation", <><p>A website submission is a request for scope review and does not by itself create an obligation to purchase or supply a report. Sericant may ask for further identifying information before accepting a request.</p><p>The target entity, included work, fee, estimated delivery date and any material exclusions will be confirmed before payment. Complex ownership structures, multiple entities, specialist searches or expedited work may require a separate quotation.</p></>],
  ["3. Nature of the service", <><p>Sericant supplies informational company research based on public, licensed, authorised or otherwise lawfully usable information. Outputs may combine structured research, source review and AI-assisted organisation or synthesis.</p><p>The service is not a law firm service, legal opinion, audit, credit rating, investment recommendation, valuation, formal KYC determination, AML certification or guarantee of a company&apos;s status, conduct or future performance.</p></>],
  ["4. Customer responsibilities", <><p>You must provide accurate information sufficient to identify the target company and explain the intended research purpose. You confirm that you are authorised to submit the request and that your use of the service is lawful.</p><p>You must not submit passwords, payment-card data, authentication codes, identity documents or unnecessary sensitive personal information. You remain responsible for independent judgement and for obtaining legal, accounting, tax, compliance or other specialist advice where required.</p></>],
  ["5. Sources and limitations", <><p>Company information may be incomplete, delayed, inconsistent, mistranslated or unavailable. Registry records, court information, media reports and third-party databases may have different update cycles and coverage limitations.</p><p>Absence of an event from a report does not prove that the event has not occurred. Unless expressly agreed, Sericant does not conduct site visits, interviews, forensic accounting, asset tracing or verification of documents held only by the target company.</p></>],
  ["6. AI-assisted content and human judgement", <><p>AI may assist with extraction, translation, classification, summarisation and drafting. Sericant seeks to distinguish source-derived facts from interpretation and to preserve relevant provenance where practicable.</p><p>AI-assisted content can contain errors. Reports are research aids and must not be used as the sole basis for an automated or consequential decision affecting a person or entity.</p></>],
  ["7. Fees and payment", <><p>Fees are stated in the confirmed proposal or checkout page. Prices described as introductory or promotional may be changed or withdrawn for future requests. The fee stated in an accepted scope confirmation remains applicable to that engagement.</p><p>Payment is processed by the identified payment provider. Taxes, bank charges or currency-conversion costs may apply depending on the customer&apos;s location and payment method. Work normally begins after payment and receipt of sufficient identifying information, unless Sericant confirms otherwise in writing.</p></>],
  ["8. Delivery, cancellation and refunds", <><p>Delivery estimates begin only after both payment and sufficient target-company information have been received. They are estimates rather than guaranteed deadlines unless expressly stated otherwise.</p><p>Cancellation, non-acceptance and refund arrangements are described in the <Link href="/refund-delivery">Delivery and Cancellation Policy</Link>, which forms part of these Terms.</p></>],
  ["9. Permitted use", <><p>A report may be used for the customer&apos;s internal business research and may be shared with its professional advisers or affiliated entities where reasonably necessary for the stated purpose, subject to confidentiality and applicable law.</p><p>Unless Sericant agrees in writing, reports may not be sold, republished, distributed publicly, used to create a competing database or used as training data for an external model or service.</p></>],
  ["10. Intellectual property", <><p>Sericant retains rights in its website, methodology, templates, presentation and original analysis. Source materials remain subject to the rights and terms of their respective owners. Payment grants only the limited use right described above.</p></>],
  ["11. Confidentiality and privacy", <><p>Sericant will handle customer submissions in accordance with the <Link href="/privacy">Privacy Policy</Link>. Neither party should disclose the other party&apos;s confidential information except as necessary to perform the service, to professional advisers under duties of confidence, or as required by law.</p></>],
  ["12. Sanctions and prohibited use", <><p>Sericant may decline or stop work where the request may violate applicable law, sanctions, contractual data restrictions, third-party rights or responsible-use standards. The service must not be used for harassment, unlawful surveillance, discrimination, fraud or evasion of legal obligations.</p></>],
  ["13. Disclaimers", <><p>Except to the extent required by law, the website and services are supplied on an “as available” basis. Sericant does not warrant that any report is exhaustive, error-free, continuously available or fit for an undisclosed purpose.</p></>],
  ["14. Limitation of liability", <><p>To the maximum extent permitted by law, Sericant will not be liable for indirect, consequential or special loss, loss of profit, loss of opportunity or loss arising from decisions made without appropriate independent review.</p><p>Sericant&apos;s aggregate liability arising from a specific paid service will not exceed the fee actually paid for that service, except where such limitation is prohibited by law.</p></>],
  ["15. Governing law and contact", <><p>These Terms are governed by the laws of the Hong Kong Special Administrative Region. The courts of Hong Kong have non-exclusive jurisdiction, unless the parties agree otherwise in writing.</p><p>Questions may be sent to <a href="mailto:hello@sericant.com">hello@sericant.com</a>.</p></>]
] as const;

export default function TermsPage() {
  return (
    <main className="legalPage">
      <header className="simpleHeader"><Link href="/" className="logo">SERICANT</Link><Link href="/" className="back">← Back to home</Link></header>
      <article className="legalContent">
        <div className="sectionLabel">SERVICE TERMS</div>
        <h1 style={{ fontSize: "48px", lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "18px" }}>Website and Service Terms</h1>
        <p className="lede" style={{ marginBottom: "52px" }}>Last updated: 4 September 2026</p>
        {sections.map(([title, content]) => <section key={title}><h2>{title}</h2>{content}</section>)}
      </article>
    </main>
  );
}
