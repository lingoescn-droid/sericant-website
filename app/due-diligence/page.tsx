import Link from "next/link";

const STRIPE_PAYMENT_LINK =
  "https://buy.stripe.com/dRm3cx62edgF14octq3Nm01";

export default function DueDiligencePage() {
  return (
    <main>
      <header className="topbar">
        <Link href="/" className="logo">
          SERICANT
        </Link>

        <nav className="desktopNav">
          <Link href="/#product">Product</Link>
          <Link href="/#workflow">Technology</Link>
          <Link href="/#roadmap">Roadmap</Link>
          <Link href="/#about">About</Link>
          <Link href="/responsible-ai-data">
            Responsible AI & Data
          </Link>
        </nav>

        <Link href="/#contact" className="topCta">
          Contact
        </Link>
      </header>

      <section className="hero">
        <div className="eyebrow">
          COMPANY DUE DILIGENCE REPORT
        </div>

        <h1>
          Structured company research.
          <br />
          <em>Delivered as a professional report.</em>
        </h1>

        <p className="heroText">
          Sericant provides AI-assisted company research for
          professionals who need a clearer understanding of
          Mainland Chinese and Hong Kong companies.
        </p>

        <div className="heroActions">
          <a
            href={STRIPE_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
          >
            Order Report — US$149
          </a>

          <Link href="/#demo" className="btn secondary">
            Explore the prototype
          </Link>
        </div>

        <div className="heroMeta">
          <span>US$149 / REPORT</span>
          <i />
          <span>AI-ASSISTED RESEARCH</span>
          <i />
          <span>SOURCE-BASED OUTPUT</span>
        </div>
      </section>

      <section className="section">
        <div className="sectionLabel">
          01 / WHAT YOU RECEIVE
        </div>

        <div className="twoCol">
          <div>
            <h2>
              A focused research brief
              <br />
              <em>for better decisions.</em>
            </h2>
          </div>

          <div className="bodyCopy">
            <p>
              Each report is prepared around a specific target
              company and is designed to organise relevant public
              and lawfully usable information into a clear,
              structured research output.
            </p>

            <p>
              The report is intended to support commercial,
              investment, partnership and cross-border research.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sectionLabel">
          02 / STANDARD SCOPE
        </div>

        <div className="workflowGrid">
          {[
            [
              "01",
              "Company profile",
              "Basic company identity, jurisdiction, business description and key corporate information."
            ],
            [
              "02",
              "Ownership & management",
              "Available information on shareholders, directors, executives and relevant corporate relationships."
            ],
            [
              "03",
              "Business activity",
              "Products, services, market positioning and publicly observable commercial activity."
            ],
            [
              "04",
              "Risk signals",
              "Publicly available legal, regulatory, operational or reputational risk indicators where relevant."
            ],
            [
              "05",
              "Source review",
              "Relevant sources reviewed and organised with provenance and timestamps where available."
            ],
            [
              "06",
              "AI-assisted synthesis",
              "A concise research summary that distinguishes source facts from AI-assisted interpretation."
            ]
          ].map(([number, title, description]) => (
            <article key={number} className="workflowCard">
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="darkSection">
        <div className="sectionLabel light">
          03 / IMPORTANT LIMITATIONS
        </div>

        <div className="twoCol">
          <div>
            <h2>
              Research support,
              <br />
              <em>not legal advice.</em>
            </h2>
          </div>

          <div className="bodyCopy lightCopy">
            <p>
              Sericant&apos;s Company Due Diligence Report is an
              informational research product. It is not a legal
              opinion, audit, credit rating, investment
              recommendation, formal KYC determination or AML
              certification.
            </p>

            <p>
              Coverage depends on the availability and lawful
              usability of relevant information. Some ownership,
              financial, litigation, regulatory or historical
              information may not be publicly available.
            </p>

            <p>
              Where specialist legal, tax, accounting or regulatory
              advice is required, users should consult appropriately
              qualified professional advisers.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sectionLabel">
          04 / HOW IT WORKS
        </div>

        <div className="workflowGrid">
          {[
            [
              "01",
              "Order",
              "Purchase one Company Due Diligence Report through secure Stripe checkout."
            ],
            [
              "02",
              "Submit company details",
              "After payment, provide the target company name, jurisdiction, website and your key research questions."
            ],
            [
              "03",
              "Research",
              "Sericant reviews relevant information and prepares a structured research report."
            ],
            [
              "04",
              "Delivery",
              "The completed report is delivered electronically to the email address provided."
            ]
          ].map(([number, title, description]) => (
            <article key={number} className="workflowCard">
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionLabel">
          05 / PRICE
        </div>

        <div
          style={{
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            padding: "42px 0",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "40px",
            alignItems: "center"
          }}
        >
          <div>
            <div className="miniLabel">
              COMPANY DUE DILIGENCE REPORT
            </div>

            <h2
              style={{
                marginTop: "14px",
                fontSize: "clamp(36px, 5vw, 64px)"
              }}
            >
              US$149
            </h2>

            <p
              style={{
                maxWidth: "640px",
                marginTop: "16px",
                color: "var(--muted)",
                lineHeight: 1.7
              }}
            >
              One report for one target company.
              Additional scope or specialist research may require
              a separate quotation.
            </p>
          </div>

          <a
            href={STRIPE_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
          >
            Order Report →
          </a>
        </div>
      </section>

      <section className="contact">
        <div className="sectionLabel">
          06 / QUESTIONS
        </div>

        <h2>
          Need to confirm
          <br />
          the research scope?
        </h2>

        <a
          href="mailto:hello@sericant.com"
          className="contactEmail"
        >
          hello@sericant.com ↗
        </a>

        <p>Sericant Limited · Hong Kong</p>
      </section>

      <footer>
        <div className="footerBrand">
          SERICANT
        </div>

        <div className="footerLinks">
          <Link href="/responsible-ai-data">
            Responsible AI & Data
          </Link>

          <Link href="/privacy">
            Privacy
          </Link>

          <Link href="/terms">
            Terms
          </Link>
        </div>

        <div>
          © 2026 Sericant Limited
        </div>
      </footer>
    </main>
  );
}
