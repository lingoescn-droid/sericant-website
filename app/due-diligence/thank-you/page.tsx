import SericantLogo from "../../components/SericantLogo";
import Link from "next/link";

export default function DueDiligenceThankYouPage() {
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
            <SericantLogo />
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
            padding: "100px 0 80px",
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
            PAYMENT CONFIRMED
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
            Thank you.
            <br />
            Your research
            <br />
            starts here.
          </h1>

          <p
            style={{
              fontSize: "20px",
              lineHeight: 1.5,
              maxWidth: "680px",
              marginBottom: "18px",
            }}
          >
            Your payment for the Sericant Company Intelligence Brief
            has been received.
          </p>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.6,
              maxWidth: "680px",
              color: "#555",
              marginBottom: "44px",
            }}
          >
            Please provide the target company information so that
            Sericant can begin the research. The report will normally
            be delivered within 3 business days after sufficient
            company information has been received.
          </p>

          <Link
            href="/due-diligence/intake"
            style={{
              display: "inline-block",
              background: "#111",
              color: "#fff",
              padding: "16px 24px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            SUBMIT COMPANY INFORMATION →
          </Link>
        </section>

        <section
          style={{
            borderTop: "1px solid #cfcfc8",
            padding: "40px 0",
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
            WHAT HAPPENS NEXT
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "32px",
            }}
          >
            <div>
              <strong>01 / Submit</strong>
              <p>Provide the target company information.</p>
            </div>

            <div>
              <strong>02 / Research</strong>
              <p>Sericant conducts structured company research.</p>
            </div>

            <div>
              <strong>03 / Review</strong>
              <p>Research findings are reviewed and synthesized.</p>
            </div>

            <div>
              <strong>04 / Delivery</strong>
              <p>Your completed report is delivered electronically.</p>
            </div>
          </div>
        </section>

        <footer
          style={{
            marginTop: "80px",
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
