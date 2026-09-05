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
          <a href="#due-diligence">Report service</a>
          <Link href="/methodology">Methodology</Link>
          <Link href="/sample-report">Sample report</Link>
          <a href="#about">About</a>
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
          MAINLAND CHINA & HONG KONG COMPANY INTELLIGENCE
        </div>

        <div className="serviceHeroLayout">
          <h1>
            <span>Know who you&apos;re</span>
            <span>doing business with</span>
            <span>in China.</span>
          </h1>

          <div className="serviceHeroAside">
            <p className="serviceHeroStatement">
              See the evidence clearly.
            </p>

            <p className="heroText">
              Source-based company intelligence for professionals evaluating
              Mainland Chinese and Hong Kong counterparties. Clear English
              research with sources and limitations made visible.
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

      <section className="section reportFirst" id="due-diligence">
  <div className="sectionLabel">
    01 / COMPANY INTELLIGENCE BRIEF
  </div>

  <div className="twoCol">
    <div>
      <div className="miniLabel">
        AVAILABLE NOW
      </div>

      <h2>
        Company intelligence,
        <br />
        <em>delivered as a report.</em>
      </h2>
    </div>

    <div className="bodyCopy">
      <p>
        Sericant provides structured, AI-assisted company research
        for professionals evaluating Mainland Chinese and Hong Kong
        companies.
      </p>

      <p>
        Each Company Intelligence Brief combines structured
        research, source review and AI-assisted synthesis into a
        focused professional research deliverable.
      </p>

      <div
        style={{
          marginTop: "32px",
          paddingTop: "28px",
          borderTop: "1px solid var(--line)"
        }}
      >
        <div className="miniLabel">
          COMPANY INTELLIGENCE BRIEF
        </div>

        <div
          style={{
            fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: 700,
            lineHeight: 1,
            margin: "14px 0 18px"
          }}
        >
          From US$149
        </div>

        <p>
          Introductory promotional pricing for one identifiable Mainland
          Chinese or Hong Kong target company.
          Scope, fee and estimated delivery date are confirmed before payment.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "28px"
          }}
        >
          <Link
            href="/due-diligence"
            className="btn primary"
          >
            View Report Service →
          </Link>

          <Link href="/due-diligence/intake" className="btn secondary">
            Request Scope Confirmation →
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>


      <section className="section homeSample" id="sample">
        <div className="sectionLabel">02 / SEE THE DELIVERABLE</div>
        <div className="homeSampleGrid">
          <div>
            <h2>A closer look<br /><em>at the evidence.</em></h2>
            <p className="sampleIntro">See how a brief separates company information, source references and unanswered questions.</p>
            <p className="sampleDisclaimer">Fictional company · Format demonstration only. This is not a completed client engagement or a live database result.</p>
            <Link href="/sample-report" className="btn primary">View full sample report</Link>
          </div>
          <article className="homeReportExcerpt" aria-label="Fictional sample report excerpt">
            <div className="excerptTop"><strong>SERICANT</strong><span>ILLUSTRATIVE SAMPLE</span></div>
            <h3>Harbour Peak Technologies<br />(Shenzhen) Co., Ltd.</h3>
            <p className="excerptSubtitle">Company Intelligence Brief · Selected excerpt</p>
            <dl className="excerptFacts">
              <div><dt>Jurisdiction</dt><dd>Mainland China · Shenzhen</dd></div>
              <div><dt>Registration status</dt><dd>Active <small>Illustrative record</small></dd></div>
              <div><dt>Source</dt><dd>Illustrative registry extract</dd></div>
            </dl>
            <div className="excerptGap"><h4>What remains unverified</h4><p>Beneficial ownership beyond the direct shareholders is not established. Physical operations were not independently verified.</p></div>
            <p className="excerptBoundary">No conclusion is made about solvency, legal compliance or suitability as a counterparty.</p>
          </article>
        </div>
      </section>
      <section className="section opportunitySection">
        <div className="sectionLabel">03 / THE OPPORTUNITY</div>

        <div className="opportunityGrid">
          <h2>
            Enterprise information is abundant.
            <br />
            <em>Understanding it shouldn&apos;t be difficult.</em>
          </h2>

          <div className="bodyCopy opportunityCopy">
            <p>
              China has one of the world&apos;s largest and most active corporate
              ecosystems. Yet enterprise information can be fragmented,
              complex and difficult to interpret — especially for users
              outside Mainland China.
            </p>
          </div>
        </div>
      </section>


      <section className="section homeMethod" id="product">
        <div className="sectionLabel">04 / RESEARCH APPROACH</div>
        <div className="homeMethodIntro">
          <h2>Sources first.<br /><em>Clear boundaries.</em></h2>
          <div><p>Structured research and AI-assisted synthesis, with the scope and information limits made explicit.</p><Link href="/methodology" className="textLink">Explore our methodology →</Link></div>
        </div>
        <div className="homeMethodCards" id="workflow">
          <article><span>01</span><h3>Identify the company</h3><p>Define the target entity and the questions within the agreed research scope.</p></article>
          <article><span>02</span><h3>Review the sources</h3><p>Organise available, lawfully usable records and distinguish evidence from interpretation.</p></article>
          <article><span>03</span><h3>Explain the limits</h3><p>Present findings alongside source references and gaps that require further investigation.</p></article>
        </div>
        <details className="homeTechnicalDetails">
          <summary>Explore the illustrative prototype and product roadmap</summary>
          <p className="technicalNotice">The prototype below uses preset fictional or illustrative content. It does not perform live research. Planned platform features are separate from the report service available now.</p>
                <section className="demoSection" id="demo">
        <div className="sectionLabel light">
          ILLUSTRATIVE DEMO
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
            Run illustrative demo →
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
              <span>Playing illustrative workflow…</span>
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

                <section className="section" id="roadmap">
        <div className="sectionLabel">
          PRODUCT ROADMAP
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


        </details>
      </section>
      <section className="section" id="about">
        <div className="sectionLabel">
          05 / FOUNDER STORY
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
          06 / RESPONSIBLE AI & DATA
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
          07 / HONG KONG
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
          08 / THE NAME
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
          09 / REQUEST A BRIEF
        </div>

        <h2>
          Know your next
          <br />
          counterparty.
        </h2>

        <div className="heroActions"><Link href="/due-diligence/intake" className="btn primary">Check a company</Link><Link href="/sample-report" className="btn secondary">View sample report</Link></div>
        <p>Scope, fee and estimated delivery date confirmed before payment.</p>
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
          <Link href="/sample-report">Sample report</Link>

          <Link href="/methodology">Methodology</Link>

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
