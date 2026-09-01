"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function DueDiligenceIntakePage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
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
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "32px",
              borderBottom: "1px solid #cfcfc8",
            }}
          >
            <Link
              href="/"
              style={{
                color: "#111",
                textDecoration: "none",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              SERICANT
            </Link>

            <Link
              href="/due-diligence"
              style={{
                color: "#111",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Company Due Diligence
            </Link>
          </header>

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
              Thank you. Sericant has received the information for your
              Company Due Diligence Report.
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
              Research will normally begin after the submitted company
              information has been reviewed. If clarification is required,
              Sericant may contact you using the email address provided.
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
        padding: "40px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "32px",
            borderBottom: "1px solid #cfcfc8",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#111",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            SERICANT
          </Link>

          <Link
            href="/due-diligence"
            style={{
              color: "#111",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Company Due Diligence
          </Link>
        </header>

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
            COMPANY DUE DILIGENCE / INTAKE
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
            Please provide enough information to identify the target company
            and explain what you would like Sericant to focus on.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          style={{
            borderTop: "1px solid #cfcfc8",
            paddingTop: "48px",
            paddingBottom: "100px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
            }}
          >
            <Field label="Customer name *">
              <input
                name="customerName"
                required
                style={inputStyle}
              />
            </Field>

            <Field label="Email *">
              <input
                name="email"
                type="email"
                required
                style={inputStyle}
              />
            </Field>

            <Field label="Target company legal name *">
              <input
                name="companyLegalName"
                required
                style={inputStyle}
              />
            </Field>

            <Field label="Chinese company name">
              <input
                name="companyChineseName"
                style={inputStyle}
              />
            </Field>

            <Field label="Jurisdiction *">
              <select
                name="jurisdiction"
                required
                defaultValue=""
                style={inputStyle}
              >
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

            <Field label="Registration number">
              <input
                name="registrationNumber"
                placeholder="e.g. Unified Social Credit Code / CR No."
                style={inputStyle}
              />
            </Field>

            <Field label="Company website">
              <input
                name="website"
                type="url"
                placeholder="https://"
                style={inputStyle}
              />
            </Field>

            <Field label="Research purpose *">
              <select
                name="researchPurpose"
                required
                defaultValue=""
                style={inputStyle}
              >
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

          <div
            style={{
              display: "grid",
              gap: "32px",
              marginTop: "32px",
            }}
          >
            <Field label="Specific questions or concerns">
              <textarea
                name="specificQuestions"
                rows={6}
                placeholder="What would you particularly like Sericant to investigate?"
                style={textareaStyle}
              />
            </Field>

            <Field label="Additional information">
              <textarea
                name="additionalInformation"
                rows={5}
                placeholder="Any other information that may help identify or research the company."
                style={textareaStyle}
              />
            </Field>
          </div>

          <div
            style={{
              marginTop: "40px",
              padding: "24px",
              border: "1px solid #cfcfc8",
              fontSize: "13px",
              lineHeight: 1.7,
              color: "#555",
            }}
          >
            Please do not submit passwords, bank card details, identity
            documents, authentication codes or other highly sensitive personal
            information through this form.
          </div>

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

          <button
            type="submit"
            disabled={submitting}
            style={{
              marginTop: "36px",
              background: submitting ? "#666" : "#111",
              color: "#fff",
              border: "none",
              padding: "17px 26px",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting
              ? "SUBMITTING..."
              : "SUBMIT COMPANY INFORMATION →"}
          </button>
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
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label
      style={{
        display: "grid",
        gap: "10px",
      }}
    >
      <span
        style={{
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>

      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "15px 16px",
  border: "1px solid #aaa",
  background: "#fff",
  color: "#111",
  fontSize: "16px",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical" as const,
  lineHeight: 1.6,
};
