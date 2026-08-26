import Link from "next/link";

export const metadata = {
  title: "Responsible AI & Data",
  description:
    "Sericant's current principles for responsible AI, data provenance, authorised sourcing and bounded AI-assisted company research."
};

export default function Page() {
  return (
    <main className="legalPage">
      <header className="simpleHeader">
        <Link href="/" className="logo">SERICANT</Link>
        <Link href="/" className="back">← Back to home</Link>
      </header>
      <article className="legalContent">
        <div className="sectionLabel">RESPONSIBLE AI & DATA</div>
        <h1>Trust is part of the product architecture.</h1>
        <p className="lede">
          Sericant is at an early product-development stage. The principles below describe
          the intended direction of the platform and do not claim that every production
          control has already been implemented.
        </p>

        <h2>1. Authorised and lawful sourcing</h2>
        <p>
          Sericant intends to use appropriately licensed, authorised or otherwise lawfully
          usable company information. Production integrations are intended to be activated
          only where relevant data rights, contractual permissions and processing arrangements
          are in place.
        </p>

        <h2>2. Provenance and timestamps</h2>
        <p>
          The product roadmap includes retaining source provenance and update timestamps
          alongside structured facts used in research outputs.
        </p>

        <h2>3. Facts vs. AI interpretation</h2>
        <p>
          Sericant intends to distinguish source facts from AI-generated interpretation.
          AI is used to organise and summarise approved inputs rather than invent factual
          corporate information.
        </p>

        <h2>4. Bounded AI-assisted research</h2>
        <p>
          Sericant's planned agentic workflow focuses on task planning, retrieval,
          entity resolution, evidence extraction, verification and synthesis. The goal is a
          repeatable professional workflow rather than unrestricted autonomous decision-making.
        </p>

        <h2>5. Security and governance</h2>
        <p>
          Controls such as access restrictions, audit logging, prompt safeguards, vendor
          review and data minimisation are intended to be introduced proportionately as
          the product progresses from demonstration to controlled production use.
        </p>

        <h2>6. Public demo status</h2>
        <p>
          The interactive company-research experience on this website is illustrative.
          It is not a live third-party enterprise-data feed and does not imply authorisation
          from any specific data provider.
        </p>

        <div className="legalNote">
          This page describes product principles and development intentions. It is not a
          legal opinion or representation that any specific data source, workflow or cross-border
          processing activity is currently authorised.
        </div>
      </article>
    </main>
  );
}
