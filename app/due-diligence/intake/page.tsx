"use client";

import Link from "next/link";
import { FocusEvent, FormEvent, useEffect, useState } from "react";
import SiteHeader from "../../components/SiteHeader";

import { briefProducts, isBriefProduct, type BriefProduct } from "../../lib/brief-products";

type FieldErrors = Record<string, string>;

function validateValue(name: string, value: string, checked = false) {
  const trimmed = value.trim();
  if (["customerName", "companyLegalName", "jurisdiction", "researchPurpose"].includes(name) && !trimmed) {
    return "This field is required.";
  }
  if (name === "email") {
    if (!trimmed) return "Enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email address.";
  }
  if (name === "website" && trimmed) {
    try {
      const url = new URL(trimmed);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
    } catch {
      return "Enter a complete URL beginning with https://, or leave this field blank.";
    }
  }
  if (name === "termsAccepted" && !checked) return "Please confirm before submitting.";
  return "";
}

export default function DueDiligenceIntakePage() {
  const [product, setProduct] = useState<BriefProduct>("standard");
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("product");
    if (isBriefProduct(requested)) setProduct(requested);
  }, []);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validateField(event: FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    const field = event.currentTarget;
    const message = validateValue(field.name, field.value, field instanceof HTMLInputElement && field.checked);
    setFieldErrors(current => ({ ...current, [field.name]: message }));
  }

  function handleFormChange(event: FormEvent<HTMLFormElement>) {
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement)) return;
    if (!fieldErrors[field.name]) return;
    const message = validateValue(field.name, field.value, field instanceof HTMLInputElement && field.checked);
    setFieldErrors(current => ({ ...current, [field.name]: message }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors: FieldErrors = {};
    ["customerName", "email", "companyLegalName", "jurisdiction", "website", "researchPurpose", "termsAccepted"].forEach(name => {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | null;
      if (field) nextErrors[name] = validateValue(name, field.value, field instanceof HTMLInputElement && field.checked);
    });
    const firstInvalid = Object.keys(nextErrors).find(name => nextErrors[name]);
    if (firstInvalid) {
      setFieldErrors(nextErrors);
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setSubmitting(true);
    setError("");
    setFieldErrors({});

    const payload = {
      product,
      customerName: formData.get("customerName"),
      email: formData.get("email"),
      companyLegalName: formData.get("companyLegalName"),
      companyChineseName: formData.get("companyChineseName"),
      jurisdiction: formData.get("jurisdiction"),
      registrationNumber: formData.get("registrationNumber"),
      website: formData.get("website"),
      researchPurpose: formData.get("researchPurpose"),
      specificQuestions: formData.get("specificQuestions"),
      additionalInformation: formData.get("additionalInformation"),
      termsAccepted: formData.get("termsAccepted") === "yes",
      faxNumber: formData.get("faxNumber"),
    };

    try {
      const response = await fetch("/api/due-diligence/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSuccess(true);
      form.reset();
    } catch {
      setError(
        "We could not submit your request. Please try again or contact hello@sericant.com."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f3f1e9",
          color: "#111",
          padding: 0,
        }}
      >
        <SiteHeader />
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "40px 24px",
          }}
        >

          <section
            style={{
              padding: "110px 0",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                marginBottom: "24px",
              }}
            >
              REQUEST RECEIVED
            </div>

            <h1
              style={{
                fontSize: "clamp(48px, 8vw, 88px)",
                lineHeight: 0.95,
                letterSpacing: "-0.05em",
                margin: "0 0 36px",
                maxWidth: "760px",
              }}
            >
              Company details
              <br />
              received.
            </h1>

            <p
              style={{
                fontSize: "19px",
                lineHeight: 1.6,
                maxWidth: "680px",
              }}
            >
              Thank you. Sericant has received your company research
              scope request for {briefProducts[product].name}.
            </p>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.7,
                maxWidth: "680px",
                color: "#555",
                marginTop: "20px",
              }}
            >
              We will first confirm the target entity, available scope,
              proposed fee and estimated delivery date. No payment is due
              until you accept that confirmation.
            </p>

            <Link
              href="/"
              style={{
                display: "inline-block",
                marginTop: "40px",
                background: "#111",
                color: "#fff",
                padding: "16px 24px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              RETURN TO SERICANT →
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f3f1e9",
        color: "#111",
        padding: 0,
      }}
    >
      <SiteHeader />
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >

        <section
          style={{
            padding: "90px 0 60px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              marginBottom: "24px",
            }}
          >
            COMPANY INTELLIGENCE / SCOPE REQUEST
          </div>

          <h1
            style={{
              fontSize: "clamp(46px, 7vw, 80px)",
              lineHeight: 0.98,
              letterSpacing: "-0.05em",
              margin: "0 0 30px",
              maxWidth: "820px",
            }}
          >
            Tell us which
            <br />
            company to research.
          </h1>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              maxWidth: "700px",
              color: "#555",
            }}
          >
            Please provide enough information to identify the target company.
            We will confirm scope, price and delivery timing before payment.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          onChange={handleFormChange}
          noValidate
          className="intakeForm"
        >
          <div aria-hidden="true" style={{ position: "absolute", left: "-10000px" }}>
            <label>
              Fax number
              <input name="faxNumber" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <p className="intakeTiming">Takes about 2 minutes. No payment is required at this stage.</p>

          <fieldset className="intakeGroup intakeProductGroup">
            <legend><span>01</span> Choose a report</legend>
            <Field label="Report product *" name="product">
              <select id="product" name="product" value={product} onChange={event => { if (isBriefProduct(event.target.value)) setProduct(event.target.value); }} required className="intakeControl" aria-describedby="product-description">
                <option value="quick">Quick Scan Brief — US$49</option>
                <option value="standard">Company Intelligence Brief — From US$149</option>
              </select>
              <span id="product-description" className="intakeHelp">{briefProducts[product].summary} Estimated delivery: {briefProducts[product].timing} after payment and sufficient identifying information. {product === "quick" ? "Three sections: entity identification, registration status, and information gaps. Excludes ownership tracing, litigation and adverse-media searches, financial review and legal analysis." : "Final scope and price confirmed before payment."}</span>
            </Field>
          </fieldset>

          <fieldset className="intakeGroup">
            <legend><span>02</span> Your contact details</legend>
            <div className="intakeGrid twoFields">
            <Field label="Customer name *" name="customerName" error={fieldErrors.customerName}>
              <input id="customerName" name="customerName" required className="intakeControl" onBlur={validateField} aria-invalid={Boolean(fieldErrors.customerName)} />
            </Field>
            <Field label="Email *" name="email" error={fieldErrors.email}>
              <input id="email" name="email" type="email" required className="intakeControl" onBlur={validateField} aria-invalid={Boolean(fieldErrors.email)} />
            </Field>
            </div>
          </fieldset>

          <fieldset className="intakeGroup">
            <legend><span>03</span> Target company</legend>
            <p className="intakeGroupIntro">Provide the Chinese legal name or registration number where available. Either can materially improve entity matching.</p>
            <div className="intakeGrid">
            <Field label="Target company legal name *" name="companyLegalName" error={fieldErrors.companyLegalName}>
              <input id="companyLegalName" name="companyLegalName" required className="intakeControl" onBlur={validateField} aria-invalid={Boolean(fieldErrors.companyLegalName)} />
            </Field>
            <Field label="Chinese company name" name="companyChineseName">
              <input id="companyChineseName" name="companyChineseName" className="intakeControl" />
            </Field>
            <Field label="Jurisdiction *" name="jurisdiction" error={fieldErrors.jurisdiction}>
              <select id="jurisdiction" name="jurisdiction" required defaultValue="" className="intakeControl" onBlur={validateField} aria-invalid={Boolean(fieldErrors.jurisdiction)}>
                <option value="" disabled>
                  Select jurisdiction
                </option>
                <option value="Mainland China">
                  Mainland China
                </option>
                <option value="Hong Kong SAR">
                  Hong Kong SAR
                </option>
                <option value="Other">
                  Other
                </option>
              </select>
            </Field>
            <Field label="Registration number" name="registrationNumber">
              <input id="registrationNumber" name="registrationNumber" placeholder="e.g. Unified Social Credit Code / CR No." className="intakeControl" />
            </Field>
            <Field label="Company website" name="website" error={fieldErrors.website} help="Enter a complete URL beginning with https://, or leave blank.">
              <input id="website" name="website" type="url" inputMode="url" placeholder="https://www.example.com" className="intakeControl" onBlur={validateField} aria-invalid={Boolean(fieldErrors.website)} />
            </Field>
            </div>
          </fieldset>

          <fieldset className="intakeGroup">
            <legend><span>04</span> Research request</legend>
            <div className="intakeGrid twoFields">
            <Field label="Research purpose *" name="researchPurpose" error={fieldErrors.researchPurpose}>
              <select id="researchPurpose" name="researchPurpose" required defaultValue="" className="intakeControl" onBlur={validateField} aria-invalid={Boolean(fieldErrors.researchPurpose)}>
                <option value="" disabled>
                  Select purpose
                </option>

                <option value="Business partnership">
                  Business partnership
                </option>

                <option value="Supplier / vendor assessment">
                  Supplier / vendor assessment
                </option>

                <option value="Customer assessment">
                  Customer assessment
                </option>

                <option value="Investment research">
                  Investment research
                </option>

                <option value="Market research">
                  Market research
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </Field>
            </div>

          <div className="intakeTextareas">
            <Field label="Specific questions or concerns" name="specificQuestions">
              <textarea
                id="specificQuestions"
                name="specificQuestions"
                rows={6}
                placeholder="What would you particularly like Sericant to investigate?"
                className="intakeTextarea"
              />
            </Field>

            <Field label="Additional information" name="additionalInformation">
              <textarea
                id="additionalInformation"
                name="additionalInformation"
                rows={5}
                placeholder="Any other information that may help identify or research the company."
                className="intakeTextarea"
              />
            </Field>
          </div>
          </fieldset>

          <div className="intakeSafetyNote">
            Please do not submit passwords, bank card details, identity
            documents, authentication codes or other highly sensitive personal
            information through this form.
          </div>

          <label className="intakeTerms">
            <input
              type="checkbox"
              name="termsAccepted"
              value="yes"
              required
              onBlur={validateField}
              onChange={event => setFieldErrors(current => ({ ...current, termsAccepted: validateValue("termsAccepted", event.target.value, event.target.checked) }))}
              aria-invalid={Boolean(fieldErrors.termsAccepted)}
            />
            <span>
              I acknowledge the <Link href="/terms" style={{ textDecoration: "underline" }}>Service Terms</Link>{" "}
              and <Link href="/privacy" style={{ textDecoration: "underline" }}>Privacy Policy</Link>, and confirm
              that I am authorised to submit this business research request.
            </span>
          </label>
          {fieldErrors.termsAccepted && <span className="fieldError" role="alert">{fieldErrors.termsAccepted}</span>}

          {error && (
            <div
              style={{
                marginTop: "24px",
                padding: "18px",
                border: "1px solid #a00",
                color: "#900",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <div className="intakeSubmitRow">
          <button type="submit" disabled={submitting} className="intakeSubmit">
            {submitting
              ? "SUBMITTING..."
              : "REQUEST SCOPE CONFIRMATION →"}
          </button>
          <p>Prefer email? <a href="mailto:hello@sericant.com">hello@sericant.com</a></p>
          </div>
        </form>

        <footer
          style={{
            padding: "30px 0",
            borderTop: "1px solid #cfcfc8",
            fontSize: "13px",
          }}
        >
          Sericant Limited · Hong Kong
        </footer>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  children,
  error,
  help,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  error?: string;
  help?: string;
}) {
  return (
    <div className="intakeField">
      <label htmlFor={name}>{label}</label>
      {children}
      {error ? <span className="fieldError" role="alert">{error}</span> : help ? <span className="fieldHelp">{help}</span> : null}
    </div>
  );
}
