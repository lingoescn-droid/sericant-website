import Link from "next/link";

export const metadata = {
  title: "Responsible AI & Data",
  description:
    "Sericant's principles for responsible AI, lawful data sourcing, provenance and bounded company research.",
  alternates: { canonical: "/responsible-ai-data" }
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
        <div className="sectionLabel">RESPONSIBLE AI & DATA</div>

        <h1
          style={{
            fontSize: "48px",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            marginBottom: "18px"
          }}
        >
          Trust is part of the product architecture.
        </h1>

        <p
          className="lede"
          style={{
            marginBottom: "52px"
          }}
        >
          These principles apply to Sericant&apos;s current research service and
          guide the development of its future platform. Roadmap capabilities
          are not presented as already deployed.
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
            1. Lawful and authorised sourcing
          </h2>

          <p>
            Sericant intends to use appropriately licensed, authorised or
            otherwise lawfully usable company information.
          </p>

          <p>
            Production data integrations are intended to be activated only
            where relevant data rights, contractual permissions, permitted-use
            terms and processing arrangements are in place.
          </p>

          <p>
            Technical accessibility to information is not treated as equivalent
            to having the legal right to use, process or transfer that
            information.
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
            2. Provenance and timestamps
          </h2>

          <p>
            Sericant&apos;s product roadmap includes retaining source
            provenance, update timestamps and other relevant metadata alongside
            structured facts used in research outputs.
          </p>

          <p>
            The objective is to make company intelligence more traceable and
            reviewable, rather than presenting AI-generated text as an
            unsupported factual conclusion.
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
            3. Source facts and AI interpretation
          </h2>

          <p>
            Sericant intends to distinguish source facts from AI-generated
            interpretation.
          </p>

          <p>
            AI is intended to organise, explain and synthesise approved inputs
            rather than invent factual corporate information. Where practical,
            research outputs should enable users to understand which elements
            originate from source information and which elements represent
            AI-assisted analysis or summarisation.
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
            4. Bounded agentic research
          </h2>

          <p>
            Sericant&apos;s long-term product direction is a vertical agentic
            company-research workflow rather than an unrestricted autonomous
            system.
          </p>

          <p>
            The intended workflow may include interpreting a research request,
            planning research tasks, retrieving approved-source information,
            resolving company entities, extracting relevant evidence,
            checking consistency, synthesising findings and presenting
            provenance.
          </p>

          <p>
            These agentic capabilities are roadmap items unless specifically
            identified as already deployed.
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
            5. Verification and human judgement
          </h2>

          <p>
            Company research can involve incomplete, conflicting or
            time-sensitive information. Sericant therefore intends to develop
            verification controls such as required-field checks, source
            comparison, timestamp review and missing-information detection.
          </p>

          <p>
            Sericant is designed to assist professional research, not to replace
            independent human judgement in legal, compliance, investment,
            credit or other consequential decisions.
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
            6. Data minimisation and purpose limitation
          </h2>

          <p>
            Sericant intends to process only information reasonably relevant to
            the research purpose and product function.
          </p>

          <p>
            As production services develop, company information, personal
            information and higher-risk data categories are intended to be
            assessed separately so that unnecessary information is not
            collected, transferred or exposed merely because it is technically
            available.
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
            7. Cross-border data governance
          </h2>

          <p>
            Sericant is being developed in Hong Kong for professional and
            cross-border company research. Any future transfer or processing of
            regulated information across jurisdictions will be assessed
            separately according to the relevant data category, source,
            contractual rights, processing purpose and applicable legal
            requirements.
          </p>

          <p>
            Sericant does not assume that information may be transferred across
            borders merely because it is publicly accessible or technically
            obtainable.
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
            8. Security and governance
          </h2>

          <p>
            As the platform progresses from demonstration to controlled
            production use, Sericant intends to introduce proportionate
            technical and organisational controls.
          </p>

          <p>
            These may include access restrictions, audit logging, vendor
            review, prompt and model safeguards, data minimisation, security
            monitoring, incident procedures and internal review of data and AI
            workflows.
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
            9. Public demo status
          </h2>

          <p>
            The interactive company-research experience currently available on
            this website is illustrative.
          </p>

          <p>
            It is not a live third-party enterprise-data feed, does not imply
            authorisation from any specific data provider and should not be
            understood as evidence that Sericant has deployed a full production
            agentic research system.
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
            10. Contact
          </h2>

          <p>
            Responsible AI, data and general enquiries:{" "}
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
