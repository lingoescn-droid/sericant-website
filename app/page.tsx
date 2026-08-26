"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type DemoReport = {
  name: string;
  market: string;
  status: string;
  overview: string;
  facts: string[];
  sources: string[];
};

const DEMOS: Record<string, DemoReport> = {
  alibaba: {
    name: "Alibaba Group",
    market: "Mainland China",
    status: "Illustrative demo",
    overview:
      "A technology and commerce group used here to demonstrate how Sericant can organise company information into a concise, structured research view.",
    facts: [
      "Sector: Technology & commerce",
      "Research format: Structured company profile",
      "Output type: AI-assisted summary"
    ],
    sources: [
      "Illustrative source record A",
      "Illustrative source record B"
    ]
  },
  tencent: {
    name: "Tencent",
    market: "Mainland China",
    status: "Illustrative demo",
    overview:
      "A technology group used here to demonstrate a professional company-research workflow with structured facts, AI-assisted synthesis and provenance presentation.",
    facts: [
      "Sector: Internet & technology",
      "Research format: Company intelligence summary",
      "Output type: AI-assisted synthesis"
    ],
    sources: [
      "Illustrative source record A",
      "Illustrative source record B"
    ]
  },
  byd: {
    name: "BYD",
    market: "Mainland China",
    status: "Illustrative demo",
    overview:
      "A manufacturing and technology company used here to demonstrate how Sericant can transform structured company information into a readable intelligence brief.",
    facts: [
      "Sector: New energy & manufacturing",
      "Research format: Structured intelligence",
      "Output type: AI-assisted summary"
    ],
    sources: [
      "Illustrative source record A",
      "Illustrative source record B"
    ]
  }
};

const stages = [
  "Interpret research request",
  "Identify target entity",
  "Retrieve approved-source information",
  "Extract structured facts",
  "Verify consistency",
  "Generate bounded synthesis",
  "Present provenance"
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [loadingStep, setLoadingStep] = useState<number | null>(null);
  const [report, setReport] = useState<DemoReport | null>(null);

  const progress = useMemo(() => {
    if (loadingStep === null) return 0;
    return Math.round(((loadingStep + 1) / stages.length) * 100);
  }, [loadingStep]);

  async function runDemo() {
    const q = query.trim();
    if (!q) return;

    setReport(null);

    for (let i = 0; i < stages.length; i++) {
      setLoadingStep(i);
      await new Promise((resolve) => setTimeout(resolve, 320));
    }

    const key = Object.keys(DEMOS).find((k) =>
      q.toLowerCase().includes(k)
    );

    setReport(
      key
        ? DEMOS[key]
        : {
            name: q,
            market: "Illustrative demo",
            status: "Illustrative demo",
            overview:
              "This interactive prototype demonstrates the intended Sericant research experience. It does not represent a live third-party enterprise-data search.",
            facts: [
              "Research mode: Illustrative",
              "Data mode: Demo content only",
              "Output type: AI-assisted research preview"
            ],
            sources: [
              "Illustrative source record A",
              "Illustrative source record B"
            ]
          }
    );

    setLoadingStep(null);
  }

  return (
    <main>
      <header className="topbar">
        <Link href="/" className="logo">
          SERICANT
        </Link>

        <nav className="desktopNav">
          <a href="#product">Product</a>
          <a href="#workflow">Technology</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#about">About</a>
          <Link href="/responsible-ai-data">
            Responsible AI & Data
          </Link>
        </nav>

        <a href="#contact" className="topCta">
          Contact
        </a>
      </header>

      <section className="hero">
        <div className="eyebrow">
          AI-NATIVE COMPANY INTELLIGENCE
        </div>

        <h1>
          Making Chinese
          <br />
          Enterprise Data
          <br />
          <em>understandable.</em>
        </h1>

        <p className="heroText">
          AI-native company intelligence for professionals researching
          Mainland Chinese and Hong Kong companies.
        </p>

        <p
          style={{
            maxWidth: "720px",
            fontSize: "15px",
            lineHeight: 1.7,
            marginTop: "-8px",
            marginBottom: "28px"
          }}
        >
          Sericant is building a professional research platform that turns
          complex company information into structured, readable and
          decision-ready intelligence for cross-border research.
        </p>

        <div className="heroActions">
          <a href="#demo" className="btn primary">
            Explore the prototype
          </a>

          <a href="#about" className="btn secondary">
            About Sericant
          </a>
        </div>

        <div className="heroMeta">
          <span>HONG KONG COMPANY</span>
          <i />
          <span>CURRENT MVP</span>
          <i />
          <span>AGENTIC AI ROADMAP</span>
        </div>
      </section>

      <section className="section">
        <div className="sectionLabel">01 / THE OPPORTUNITY</div>

        <div className="twoCol">
          <div />

          <div>
            <h2
              style={{
                fontSize: "clamp(42px, 5vw, 72px)"
              }}
            >
              Enterprise information is abundant.
              <br />
              Understanding it shouldn&apos;t be difficult.
            </h2>

            <div className="bodyCopy" style={{ marginTop: "34px" }}>
              <p>
                China has one of the world&apos;s largest and most active
                corporate ecosystems. Yet enterprise information can be
                fragmented, complex and difficult to interpret — especially
                for users outside Mainland China.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="demoSection" id="demo">
        <div className="sectionLabel light">
          02 / CURRENT MVP
        </div>

        <div className="demoIntro">
          <div>
            <div
              className="miniLabel"
              style={{ marginBottom: "18px" }}
            >
              CURRENT MVP · INTERACTIVE PROTOTYPE
            </div>

            <h2>
              From company data
              <br />
              to enterprise intelligence.
            </h2>

            <p>
              The current prototype demonstrates company-name input,
              structured research output and AI-assisted company
              summarisation.
            </p>
          </div>

          <span className="demoBadge">
            ILLUSTRATIVE PROTOTYPE
          </span>
        </div>

        <div className="searchCard">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runDemo()}
            placeholder="Enter a company name, e.g. Tencent"
            aria-label="Company name"
          />

          <button onClick={runDemo}>
            Generate research preview →
          </button>
        </div>

        <div className="suggestions">
          <span>Try:</span>

          {["Alibaba Group", "Tencent", "BYD"].map((name) => (
            <button
              key={name}
              onClick={() => setQuery(name)}
            >
              {name}
            </button>
          ))}
        </div>

        {loadingStep !== null && (
          <div className="researchProgress">
            <div className="progressHeader">
              <span>Researching...</span>
              <span>{progress}%</span>
            </div>

            <div className="progressBar">
              <div style={{ width: `${progress}%` }} />
            </div>

            <div className="stageList">
              {stages.map((stage, index) => (
                <div
                  key={stage}
                  className={
                    index <= loadingStep
                      ? "stage active"
                      : "stage"
                  }
                >
                  <span>
                    {index < loadingStep
                      ? "✓"
                      : index === loadingStep
                      ? "•"
                      : "○"}
                  </span>
                  {stage}
                </div>
              ))}
            </div>
          </div>
        )}

        {report && (
          <article className="report">
            <div className="reportHeader">
              <div>
                <div className="miniLabel">
                  SERICANT RESEARCH PREVIEW
                </div>

                <h3>{report.name}</h3>
                <p>{report.market}</p>
              </div>

              <span className="reportPill">
                {report.status}
              </span>
            </div>

            <div className="reportGrid">
              <section>
                <div className="fieldLabel">
                  AI-assisted overview
                </div>
                <p>{report.overview}</p>
              </section>

              <section>
                <div className="fieldLabel">
                  Structured facts
                </div>
                <ul>
                  {report.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
              </section>

              <section>
                <div className="fieldLabel">
                  Provenance
                </div>
                <ul>
                  {report.sources.map((source) => (
                    <li key={source}>{source}</li>
                  ))}
                </ul>
              </section>

              <section>
                <div className="fieldLabel">
                  Research status
                </div>
                <p>
                  Demo complete. Production integrations are
                  not enabled in this public prototype.
                </p>
              </section>
            </div>

            <div className="notice">
              This public prototype uses illustrative content.
              It is not a live third-party enterprise-data feed
              and does not imply authorisation from any specific
              data provider.
            </div>
          </article>
        )}
      </section>

      <section className="section" id="product">
        <div className="sectionLabel">
          03 / TECHNOLOGY
        </div>

        <h2>
          Data → Structure → AI →
          <br />
          Intelligence
        </h2>

        <div
          className="workflowGrid"
          style={{ marginTop: "70px" }}
        >
          {[
            [
              "01",
              "Data",
              "Enterprise information from lawfully usable and appropriately authorised sources."
            ],
            [
              "02",
              "Structure",
              "Entity resolution, normalisation and structured company information."
            ],
            [
              "03",
              "AI",
              "AI-assisted synthesis, explanation and research workflows."
            ],
            [
              "04",
              "Intelligence",
              "Readable, traceable and decision-oriented company intelligence."
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

      <section className="section" id="roadmap">
        <div className="sectionLabel">
          04 / ROADMAP
        </div>

        <h2>
          Building the next generation
          <br />
          of enterprise intelligence.
        </h2>

        <p
          style={{
            marginTop: "30px",
            maxWidth: "720px",
            fontSize: "16px",
            lineHeight: 1.7
          }}
        >
          Current MVP: AI-assisted company understanding.
          Roadmap: agentic company-research workflows.
        </p>

        <div
          style={{
            marginTop: "60px",
            borderTop: "1px solid var(--line)"
          }}
        >
          {[
            [
              "01",
              "AI Company Summary",
              "AVAILABLE",
              "Current company-summary prototype."
            ],
            [
              "02",
              "AI Enterprise Search",
              "IN DEVELOPMENT",
              "Search and structured research across company information."
            ],
            [
              "03",
              "Enterprise Intelligence",
              "PLANNED",
              "Analysis, structured insights and explainable outputs."
            ],
            [
              "04",
              "AI Research Agent",
              "ROADMAP",
              "Task planning, retrieval, verification and research synthesis."
            ]
          ].map(
            ([number, title, status, description]) => (
              <div
                key={number}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "70px 1.2fr 2fr auto",
                  gap: "24px",
                  padding: "24px 0",
                  borderBottom:
                    "1px solid var(--line)",
                  alignItems: "center"
                }}
              >
                <span className="miniLabel">
                  {number}
                </span>

                <strong>{title}</strong>

                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--muted)",
                    lineHeight: 1.5
                  }}
                >
                  {description}
                </span>

                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    border: "1px solid var(--line)",
                    padding: "8px 10px"
                  }}
                >
                  {status}
                </span>
              </div>
            )
          )}
        </div>
      </section>

      <section className="section" id="workflow">
        <div className="sectionLabel">
          05 / AGENTIC DIRECTION
        </div>

        <h2>
          A research workflow,
          <br />
          not a one-shot prompt.
        </h2>

        <div className="workflowGrid">
          {[
            [
              "01",
              "Interpret",
              "Understand the research request and define the task."
            ],
            [
              "02",
              "Retrieve",
              "Call only approved or otherwise lawfully usable information sources."
            ],
            [
              "03",
              "Resolve",
              "Identify the correct company entity and normalise structured fields."
            ],
            [
              "04",
              "Verify",
              "Check required fields, timestamps and cross-source consistency."
            ],
            [
              "05",
              "Synthesize",
              "Generate bounded AI-assisted analysis over structured inputs."
            ],
            [
              "06",
              "Provenance",
              "Show sources, timestamps and a clear distinction between facts and AI output."
            ]
          ].map(([number, title, description]) => (
            <article key={number} className="workflowCard">
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <p
          style={{
            marginTop: "28px",
            maxWidth: "760px",
            fontSize: "12px",
            lineHeight: 1.6,
            color: "var(--muted)"
          }}
        >
          These agentic capabilities represent Sericant&apos;s
          product roadmap unless specifically identified as
          already deployed.
        </p>
      </section>

      <section className="section" id="about">
        <div className="sectionLabel">
          06 / FOUNDER STORY
        </div>

        <div className="twoCol">
          <div>
            <h2>
              Built from
              <br />
              <em>professional experience.</em>
            </h2>
          </div>

          <div className="bodyCopy">
            <div
              className="miniLabel"
              style={{ marginBottom: "16px" }}
            >
              FOUNDER-LED FROM HONG KONG
            </div>

            <p>
              Sericant was created from first-hand
              professional experience working with company
              information and corporate research.
            </p>

            <p>
              The product is being developed around a simple
              observation: professionals may have access to
              company information, but still spend significant
              time searching, interpreting and organising it.
            </p>

            <p>
              Sericant is exploring how AI can reduce that
              friction while preserving structure, provenance
              and professional judgement.
            </p>
          </div>
        </div>
      </section>

      <section className="darkSection">
        <div className="sectionLabel light">
          07 / RESPONSIBLE AI & DATA
        </div>

        <div className="twoCol">
          <div>
            <h2>
              Trust is part of
              <br />
              the architecture.
            </h2>
          </div>

          <div className="bodyCopy lightCopy">
            <p>
              Sericant intends to activate production data
              integrations only when relevant data rights,
              licensing and processing arrangements are in
              place.
            </p>

            <p>
              Source facts and AI-generated interpretation are
              intended to be clearly separated, with provenance
              and timestamps preserved alongside research
              outputs.
            </p>

            <Link
              href="/responsible-ai-data"
              className="textLink"
            >
              Read our Responsible AI & Data approach →
            </Link>
          </div>
        </div>
      </section>

      <section className="hongkongSection">
        <div className="sectionLabel light">
          08 / HONG KONG
        </div>

        <h2>
          Built in Hong Kong.
          <br />
          Connected to China.
          <br />
          <em>Designed for the world.</em>
        </h2>

        <div className="hkGrid">
          <div>
            <strong>HONG KONG</strong>
            <span>
              International technology, professional services
              and commercialisation base.
            </span>
          </div>

          <div>
            <strong>MAINLAND CHINA</strong>
            <span>
              Enterprise-information context and future
              compliant data partnerships.
            </span>
          </div>

          <div>
            <strong>GLOBAL USERS</strong>
            <span>
              Professionals who need accessible company
              intelligence for cross-border decisions.
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sectionLabel">
          09 / THE NAME
        </div>

        <div className="twoCol">
          <div>
            <h2>
              From Serica
              <br />
              to <em>Sericant.</em>
            </h2>
          </div>

          <div className="bodyCopy">
            <p>
              Sericant is a coined name inspired by
              &quot;Serica&quot;, an ancient Western name
              associated with China and the land of silk.
            </p>

            <p>
              The name reflects a vision of building a modern
              bridge between Chinese enterprise information and
              the global business community.
            </p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="sectionLabel">
          10 / CONTACT
        </div>

        <h2>
          Let&apos;s build the
          <br />
          intelligence layer.
        </h2>

        <a
          href="mailto:hello@sericant.com"
          className="contactEmail"
        >
          hello@sericant.com ↗
        </a>

        <p>
          Sericant Limited · Hong Kong
        </p>
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
