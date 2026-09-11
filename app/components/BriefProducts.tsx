import Link from "next/link";
import { briefProducts, type BriefProduct } from "../lib/brief-products";

export default function BriefProducts() {
  return <div className="briefProducts">
    <div className="briefProductGrid">{(Object.keys(briefProducts) as BriefProduct[]).map(key => {
      const product = briefProducts[key];
      return <article className={`briefProductCard ${key === "standard" ? "briefProductFull" : ""}`} key={key}>
        <p className="miniLabel">{key === "quick" ? "START WITH THE BASICS" : "FOR A BROADER REVIEW"}</p>
        <h3>{product.name}</h3><p className="briefPrice">{product.price}</p>
        <p className="briefTiming">{product.timing} · English PDF · One target company</p>
        <p>{product.summary}</p>
        <ul>{product.sections.map(section => <li key={section}>{section}</li>)}</ul>
        <p className="briefProductNote">{key === "quick" ? "Three sections. Excludes ownership tracing, litigation and adverse-media searches, financial review and legal analysis." : "Introductory promotional price. Coverage depends on available sources and the confirmed scope; complex or specialist work may require a separate quotation."}</p>
        <Link href={`/due-diligence/intake?product=${key}`} className={`btn ${key === "standard" ? "primary" : "secondary"}`}>{key === "quick" ? "Request a Quick Scan" : "Request a Full Brief"} →</Link>
      </article>;
    })}</div>
    <p className="briefSharedNote">Delivery estimates run from payment and receipt of sufficient identifying information. Scope, fee and estimated delivery date are confirmed before payment. Report length and available sources vary by company.</p>
  </div>;
}

export function BriefComparison() {
  const rows = [
    ["Price", "US$49", "From US$149"],
    ["Estimated delivery", "1 business day", "2–3 business days"],
    ["Entity identification", "Included", "Included"],
    ["Registration status", "Included", "Included"],
    ["Ownership & management", "Not included", "Where publicly available and within the confirmed scope"],
    ["Business activity & public-record signals", "Not included", "Where publicly available and within the confirmed scope"],
    ["Sources & information gaps", "Included", "Included"],
    ["Best suited to", "An initial identity and status check", "A broader pre-contract or pre-payment background review"],
    ["Specialist work", "Not included", "Litigation, adverse-media, financial or legal analysis requires separate written scope confirmation and may require a separate quotation"],
  ];

  return <div className="briefComparisonBlock">
    <h3>Compare the briefs</h3>
    <p>Coverage depends on the target entity, available public sources and the scope confirmed in writing before payment.</p>
    <div className="briefComparisonScroll">
      <table className="briefComparison">
        <thead><tr><th scope="col">Scope</th><th scope="col">Quick Scan</th><th scope="col">Company Intelligence Brief</th></tr></thead>
        <tbody>{rows.map(([scope, quick, standard]) => <tr key={scope}><th scope="row">{scope}</th><td>{quick}</td><td>{standard}</td></tr>)}</tbody>
      </table>
    </div>
  </div>;
}

export function BriefFAQ() {
  return <div className="briefFAQ">
    <details><summary>Which brief should I choose?</summary><p>Choose the US$49 Quick Scan for an initial check of the correct legal entity, registration status and information gaps. Choose the Company Intelligence Brief, from US$149, when you need broader company-background, available ownership and management, business-activity and relevant public-record research within a confirmed scope.</p></details>
    <details><summary>When will I receive the report?</summary><p>Quick Scan is normally delivered in 1 business day; the fuller brief in 2–3 business days, after payment and receipt of sufficient identifying information. These are business-day estimates, not a 24-hour weekend service. The written scope confirmation states your estimated delivery date. Missing information or source outages may affect timing.</p></details>
    <details><summary>Can I upgrade after a Quick Scan?</summary><p>Yes. Send your request reference and the additional questions you want answered. We will confirm the expanded scope, additional fee and delivery date before further work starts. No upgrade is automatic; any credit for earlier work must be agreed in writing.</p></details>
    <details><summary>Do I pay when I submit a request?</summary><p>No. We first confirm that we can identify the company and carry out the requested scope. You receive a payment request only after accepting the scope and fee. <Link href="/refund-delivery">Read the delivery and cancellation policy.</Link></p></details>
    <details><summary>Does either report certify that a company is safe?</summary><p>No. Both are informational research products, not legal opinions, credit ratings, investment recommendations, formal KYC determinations or AML certifications. Registration status alone does not establish operational activity, solvency or suitability as a counterparty. Information gaps are disclosed.</p></details>
  </div>;
}
