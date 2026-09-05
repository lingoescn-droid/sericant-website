import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "China & Hong Kong Company Intelligence Brief",
  description:
    "Request a source-based company intelligence brief for a Mainland Chinese or Hong Kong company. Scope and timing are confirmed before payment.",
  alternates: { canonical: "/due-diligence" }
};

export default function DueDiligencePage() {
  return (
    <main>
      <header className="topbar">
        <Link href="/" className="logo">
          SERICANT
        </Link>

        <nav className="desktopNav">
          <Link href="/sample-report">Sample report</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/#about">About</Link>
          <Link href="/responsible-ai-data">
            Responsible AI & Data
          </Link>
        </nav>

        <Link href="/due-diligence/intake" className="topCta">
          Check a company
        </Link>
      </header>

      <section className="hero serviceHero">
        <div className="eyebrow">
          COMPANY INTELLIGENCE BRIEF
        </div>

        <div className="serviceHeroLayout">
          <h1>
            <span>Know who you’re</span>
            <span>doing business with</span>
            <span>in China.</span>
          </h1>

          <div className="serviceHeroAside">
            <p className="serviceHeroStatement">
              See the evidence clearly.
            </p>

            <p className="heroText">
              Source-based company intelligence for professionals evaluating
              Mainland Chinese and Hong Kong counterparties, delivered in clear
              English with traceable evidence.
            </p>

            <div className="heroActions">
              <Link href="/due-diligence/intake" className="btn primary">
                Check a company
              </Link>

              <Link href="/sample-report" className="btn secondary">
                View sample report
              </Link>
            </div>

            <div className="heroMeta">
              <span>INTRODUCTORY PRICE FROM US$149</span>
              <i />
              <span>SCOPE CONFIRMED FIRST</span>
              <i />
              <span>2–3 BUSINESS DAYS</span>
            </div>
          </div>
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
              Each brief is prepared around a specific target
              company and is designed to organise relevant public
              and lawfully usable information into a clear,
              structured research output.
            </p>

            <p>
              The brief is intended to support commercial,
              investment, partnership and cross-border research.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="product">
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
              "Public-record signals",
              "Relevant legal, regulatory, operational or reputational events found in available sources."
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
              Sericant&apos;s Company Intelligence Brief is an
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
              "Submit",
              "Provide the target company identity and your principal research questions."
            ],
            [
              "02",
              "Confirm",
              "Sericant confirms the correct entity, available scope, fee and estimated delivery date."
            ],
            [
              "03",
              "Authorise",
              "Accept the confirmed scope and complete payment through secure Stripe checkout."
            ],
            [
              "04",
              "Research & delivery",
              "Sericant prepares, reviews and delivers the brief electronically."
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
              COMPANY INTELLIGENCE BRIEF
            </div>

            <h2
              style={{
                marginTop: "14px",
                fontSize: "clamp(36px, 5vw, 64px)"
              }}
            >
              From US$149
            </h2>

            <p
              style={{
                maxWidth: "640px",
                marginTop: "16px",
                color: "var(--muted)",
                lineHeight: 1.7
              }}
            >
              During the introductory promotional period, the standard brief
              starts from US$149 and covers one identifiable Mainland Chinese or
              Hong Kong company. Final scope, fee and estimated delivery date
              are confirmed before payment. Complex ownership, multiple
              entities or specialist research may require a separate quotation.
            </p>
          </div>

          <Link href="/due-diligence/intake" className="btn primary">
            Request scope confirmation →
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="sectionLabel">06 / BEFORE YOU REQUEST</div>
        <div className="twoCol">
          <div>
            <h2>Clear scope.<br /><em>No surprise charge.</em></h2>
          </div>
          <div className="bodyCopy">
            <p>Submitting a request does not create a payment obligation. Sericant first checks whether the target entity can be identified and whether the requested work fits the standard brief.</p>
            <p>Standard delivery is normally estimated at 2–3 business days after payment and receipt of sufficient identifying information. The confirmed proposal controls if a different timeframe is stated.</p>
            <p><Link href="/refund-delivery" className="textLink">Read delivery and cancellation policy →</Link></p>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="sectionLabel">
          07 / QUESTIONS
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

          <Link href="/methodology">Methodology</Link>

          <Link href="/sample-report">Sample report</Link>

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
