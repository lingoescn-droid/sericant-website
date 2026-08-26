import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Sericant website privacy policy."
};

export default function Page() {
  return (
    <main className="legalPage">
      <header className="simpleHeader">
        <Link href="/" className="logo">
          SERICANT
        </Link>

        <Link href="/" className="back">
          ← Back to home
        </Link>
      </header>

      <article className="legalContent">
        <div className="sectionLabel">PRIVACY POLICY</div>

        <h1
          style={{
            fontSize: "48px",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            marginBottom: "18px"
          }}
        >
          Privacy Policy
        </h1>

        <p
          className="lede"
          style={{
            marginBottom: "52px"
          }}
        >
          Last updated: 26 August 2026
        </p>

        <section style={{ marginBottom: "44px" }}>
          <h2
            style={{
              fontSize: "30px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "12px"
            }}
          >
            1. Current website scope
          </h2>

          <p>
            This website currently functions as the corporate website of
            Sericant Limited and as an interactive product demonstration for
            Sericant&apos;s company-research concept.
          </p>

          <p>
            The public demonstration does not currently require account
            registration, does not provide a live third-party company-data
            service and does not represent a production enterprise-information
            platform.
          </p>
        </section>

        <section style={{ marginBottom: "44px" }}>
          <h2
            style={{
              fontSize: "30px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "12px"
            }}
          >
            2. Information you provide
          </h2>

          <p>
            If you contact Sericant by email or otherwise communicate with us,
            we may receive the contact information, correspondence and other
            information that you choose to provide.
          </p>
        </section>

        <section style={{ marginBottom: "44px" }}>
          <h2
            style={{
              fontSize: "30px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "12px"
            }}
          >
            3. Technical information
          </h2>

          <p>
            Our hosting, infrastructure and security service providers may
            process standard technical information in connection with operating
            and protecting this website, such as IP addresses, browser and
            device information, request logs, timestamps and security events.
          </p>
        </section>

        <section style={{ marginBottom: "44px" }}>
          <h2
            style={{
              fontSize: "30px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "12px"
            }}
          >
            4. How information may be used
          </h2>

          <p>
            Information may be used to respond to enquiries, operate and secure
            the website, maintain the product demonstration, investigate
            technical issues, improve Sericant&apos;s services and comply with
            applicable legal or regulatory requirements.
          </p>
        </section>

        <section style={{ marginBottom: "44px" }}>
          <h2
            style={{
              fontSize: "30px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "12px"
            }}
          >
            5. Company-research demo data
          </h2>

          <p>
            The current public company-research experience is illustrative. It
            is not presented as a live third-party enterprise-data feed and
            should not be understood as evidence that Sericant has activated
            any particular production data integration.
          </p>

          <p>
            Sericant intends to activate production data sources only where
            relevant data rights, licensing, contractual permissions and
            processing arrangements are in place.
          </p>
        </section>

        <section style={{ marginBottom: "44px" }}>
          <h2
            style={{
              fontSize: "30px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "12px"
            }}
          >
            6. Data retention and security
          </h2>

          <p>
            Sericant intends to retain information only for as long as reasonably
            necessary for the purpose for which it was collected, subject to
            applicable legal, operational and security requirements.
          </p>

          <p>
            Appropriate technical and organisational safeguards are intended to
            be introduced proportionately as the product progresses from public
            demonstration to controlled production use.
          </p>
        </section>

        <section style={{ marginBottom: "44px" }}>
          <h2
            style={{
              fontSize: "30px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "12px"
            }}
          >
            7. Service providers and international processing
          </h2>

          <p>
            Sericant may use technology, hosting, communications and other
            service providers to support its website and operations. Depending
            on the service used, technical or contact information may be
            processed in jurisdictions outside Hong Kong.
          </p>

          <p>
            As Sericant develops production company-intelligence services, any
            cross-border handling of regulated company or personal information
            will be assessed separately in accordance with applicable data,
            contractual and regulatory requirements.
          </p>
        </section>

        <section style={{ marginBottom: "44px" }}>
          <h2
            style={{
              fontSize: "30px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "12px"
            }}
          >
            8. Future product changes
          </h2>

          <p>
            If Sericant introduces user accounts, paid services, production
            company-data integrations, analytics, cookies, monitoring features
            or other material data-processing activities, this Privacy Policy
            may be updated to reflect those changes.
          </p>
        </section>

        <section style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "30px",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: "12px"
            }}
          >
            9. Contact
          </h2>

          <p>
            Privacy and general enquiries:{" "}
            <a href="mailto:hello@sericant.com">
              hello@sericant.com
            </a>
          </p>

          <p>
            Sericant Limited
            <br />
            Hong Kong
          </p>
        </section>
      </article>
    </main>
  );
}
