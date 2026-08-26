import Link from "next/link";

export const metadata = {
  title: "Terms of Use",
  description: "Sericant website terms of use."
};

export default function Page() {
  return (
    <main className="legalPage">
      <header className="simpleHeader">
        <Link href="/" className="logo">SERICANT</Link>
        <Link href="/" className="back">← Back to home</Link>
      </header>
      <article className="legalContent">
        <div className="sectionLabel">TERMS</div>
        <h1>Terms of Use</h1>
        <p className="lede">Last updated: 25 August 2026</p>

        <h2>1. Demonstration only</h2>
        <p>
          The interactive company-research feature currently available on this website is
          an illustrative product demonstration and is not a live third-party company-data
          service.
        </p>

        <h2>2. No professional advice</h2>
        <p>
          Content on this website is provided for general informational and product-
          demonstration purposes only and should not be relied upon as legal, financial,
          investment, compliance or other professional advice.
        </p>

        <h2>3. No warranty</h2>
        <p>
          Demonstration content may be incomplete, simplified or illustrative. Sericant does
          not represent that demo content is current, complete or suitable for any decision.
        </p>

        <h2>4. Intellectual property</h2>
        <p>
          Unless otherwise stated, the Sericant name, website design, product presentation
          and original content are owned by or licensed to Sericant Limited.
        </p>

        <h2>5. Changes</h2>
        <p>
          These terms may be updated as Sericant moves from product demonstration to
          production services.
        </p>

        <h2>6. Contact</h2>
        <p>General enquiries: lingoescn@gmail.com</p>

        <div className="legalNote">
          These early-stage website terms should be reviewed before production launch,
          customer contracting or paid services.
        </div>
      </article>
    </main>
  );
}
