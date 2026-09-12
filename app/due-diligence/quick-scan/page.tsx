"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import SiteHeader from "../../components/SiteHeader";

export default function QuickScanPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/due-diligence/quick-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: data.get("customerName"), email: data.get("email"),
          companyLegalName: data.get("companyLegalName"), companyChineseName: data.get("companyChineseName"),
          jurisdiction: data.get("jurisdiction"), registrationNumber: data.get("registrationNumber"), website: data.get("website"),
          researchPurpose: data.get("researchPurpose"), specificQuestions: data.get("specificQuestions"), additionalInformation: data.get("additionalInformation"),
          termsAccepted: data.get("termsAccepted") === "yes", faxNumber: data.get("faxNumber")
        })
      });
      const result = await response.json();
      if (!response.ok || !result.checkoutUrl) throw new Error();
      window.location.assign(result.checkoutUrl);
    } catch {
      setError("We could not continue to payment. Please try again or contact hello@sericant.com.");
      setSubmitting(false);
    }
  }

  return <main style={{ minHeight:"100vh", background:"#f3f1e9", color:"#111" }}>
    <SiteHeader />
    <div style={{ maxWidth:"980px", margin:"0 auto", padding:"40px 24px" }}>
      <section style={{ padding:"90px 0 50px" }}>
        <div style={{ fontSize:"12px", fontWeight:700, letterSpacing:".12em", marginBottom:"24px" }}>QUICK SCAN / US$49</div>
        <h1 style={{ fontSize:"clamp(46px,7vw,80px)", lineHeight:.98, letterSpacing:"-.05em", margin:"0 0 30px", maxWidth:"820px" }}>Tell us which<br/>company to check.</h1>
        <p style={{ fontSize:"18px", lineHeight:1.6, maxWidth:"700px", color:"#555" }}>Provide enough information to identify the target company. After you submit the details, you will continue directly to secure Stripe payment.</p>
      </section>

      <form onSubmit={handleSubmit} className="intakeForm">
        <div aria-hidden="true" style={{ position:"absolute", left:"-10000px" }}><input name="faxNumber" tabIndex={-1} autoComplete="off" /></div>
        <div className="intakeTiming"><p><strong>US$49 · One-off payment.</strong> No scope-confirmation email is required before checkout.</p><p>Estimated delivery: 1 business day after payment and receipt of sufficient identifying information. <Link href="/refund-delivery">Read the delivery and cancellation policy.</Link></p></div>

        <fieldset className="intakeGroup"><legend><span>01</span> Your contact details</legend><div className="intakeGrid twoFields">
          <Field label="Customer name *"><input name="customerName" required className="intakeControl" /></Field>
          <Field label="Email *"><input name="email" type="email" required className="intakeControl" /></Field>
        </div></fieldset>

        <fieldset className="intakeGroup"><legend><span>02</span> Target company</legend><p className="intakeGroupIntro">Provide the Chinese legal name or registration number where available. Either can materially improve entity matching.</p><div className="intakeGrid">
          <Field label="Target company legal name *"><input name="companyLegalName" required className="intakeControl" /></Field>
          <Field label="Chinese company name"><input name="companyChineseName" className="intakeControl" /></Field>
          <Field label="Jurisdiction *"><select name="jurisdiction" required defaultValue="" className="intakeControl"><option value="" disabled>Select jurisdiction</option><option>Mainland China</option><option>Hong Kong SAR</option><option>Other</option></select></Field>
          <Field label="Registration number"><input name="registrationNumber" placeholder="e.g. Unified Social Credit Code / CR No." className="intakeControl" /></Field>
          <Field label="Company website"><input name="website" type="url" placeholder="https://www.example.com" className="intakeControl" /></Field>
        </div></fieldset>

        <fieldset className="intakeGroup"><legend><span>03</span> Research request</legend><div className="intakeGrid twoFields">
          <Field label="Research purpose *"><select name="researchPurpose" required defaultValue="" className="intakeControl"><option value="" disabled>Select purpose</option><option>Business partnership</option><option>Supplier / vendor assessment</option><option>Customer assessment</option><option>Investment research</option><option>Market research</option><option>Other</option></select></Field>
        </div><div className="intakeTextareas">
          <Field label="Specific questions or concerns"><textarea name="specificQuestions" rows={6} className="intakeTextarea" placeholder="What would you particularly like Sericant to check?" /></Field>
          <Field label="Additional information"><textarea name="additionalInformation" rows={5} className="intakeTextarea" placeholder="Any other information that may help identify the company." /></Field>
        </div></fieldset>

        <div className="intakeSafetyNote">Please do not submit passwords, bank card details, identity documents, authentication codes or other highly sensitive personal information through this form.</div>
        <label className="intakeTerms"><input type="checkbox" name="termsAccepted" value="yes" required/><span>I acknowledge the <Link href="/terms" style={{textDecoration:"underline"}}>Service Terms</Link> and <Link href="/privacy" style={{textDecoration:"underline"}}>Privacy Policy</Link>, and confirm that I am authorised to submit this business research request.</span></label>
        {error && <div style={{ marginTop:"24px", padding:"18px", border:"1px solid #a00", color:"#900", fontSize:"14px" }}>{error}</div>}
        <div className="intakeSubmitRow"><button type="submit" disabled={submitting} className="intakeSubmit">{submitting ? "CONTINUING..." : "CONTINUE TO SECURE PAYMENT — US$49 →"}</button><p>Prefer email? <a href="mailto:hello@sericant.com">hello@sericant.com</a></p></div>
      </form>
      <footer style={{ padding:"30px 0", borderTop:"1px solid #cfcfc8", fontSize:"13px" }}>Sericant Limited · Hong Kong</footer>
    </div>
  </main>;
}

function Field({ label, children }: { label:string; children:React.ReactNode }) {
  return <div className="intakeField"><label>{label}</label>{children}</div>;
}
