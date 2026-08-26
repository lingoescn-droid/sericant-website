import Link from "next/link";

export const metadata = {
  title: "Terms of Use",
  description: "Sericant website terms of use."
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
        <div className="sectionLabel">TERMS OF USE</div>

        <h1
          style={{
            fontSize: "48px",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            marginBottom: "18px"
          }}
        >
          Terms of Use
        </h1>

        <p
          className="lede"
          style={{
            marginBottom: "52px"
          }}
        >
          Last updated: 25 August 2026
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
            1. Demonstration only
          </h2>

          <p>
            The interactive company-research feature currently available on this
            website is an illustrative product demonstration. It is not a live
            third-party company-data service and should not be understood as a
            production research platform.
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
            2. No professional advice
          </h2>

          <p>
            Content on this website is provided for general informational and
            product-demonstration purposes only. It should not be relied upon as
            legal, financial, investment, compliance or other professional
            advice.
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
            3. No warranty
          </h2>

          <p>
            Demonstration content may be incomplete, simplified or illustrative.
            Sericant does not represent that demo content is current, complete,
            accurate or suitable for any particular decision or transaction.
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
            4. Intellectual property
          </h2>

          <p>
            Unless otherwise stated, the Sericant name, website design, product
            presentation and original content are owned by or licensed to
            Sericant Limited.
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
            5. Changes
          </h2>

          <p>
            These Terms of Use may be updated from time to time as Sericant
            develops from an early-stage product demonstration toward production
            services.
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
            6. Contact
          </h2>

          <p>
            General enquiries:{" "}
            <a href="mailto:hello@sericant.com">
              hello@sericant.com
            </a>
          </p>
        </section>
      </article>
    </main>
  );
}
