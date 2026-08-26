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
      "A technology group used here to demonstrate a professional research workflow with structured facts, AI-assisted synthesis and provenance presentation.",
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
      await new Promise((r) => setTimeout(r, 320));
    }

    const key = Object.keys(DEMOS).find((k) => q.toLowerCase().includes(k));
    setReport(
      key
        ? DEMOS[key]
        : {
            name: q,
            market: "Illustrative demo",
            status: "Illustrative demo",
            overview:
              "This interactive demonstration shows the intended Sericant research experience. It does not represent a live third-party enterprise-data search.",
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
        <Link href="/" className="logo">SERICANT</Link>
        <nav className="desktopNav">
          <a href="#product">Product</a>
          <a href="#workflow">Workflow</a>
          <a href="#about">About</a>
          <Link href="/responsible-ai-data">Responsible AI & Data</Link>
        </nav>
        <a href="#demo" className="topCta">Try demo</a>
      </header>

      <section className="hero">
        <div className="eyebrow">AI-NATIVE COMPANY INTELLIGENCE</div>
        <h1>Understand companies.<br /><em>Not just records.</em></h1>
        <p className="heroText">
          Sericant is building a professional research platform that turns complex
          company information into structured, readable and decision-ready intelligence
          for international users researching Mainland Chinese and Hong Kong companies.
        </p>
        <div className="heroActions">
          <a href="#demo" className="btn primary">Try Company Research Demo</a>
          <Link href="/responsible-ai-data" className="btn secondary">Responsible AI & Data</Link>
        </div>
        <div className="heroMeta">
          <span>HONG KONG COMPANY</span>
          <i />
          <span>PRE-REVENUE MVP</span>
          <i />
          <span>AGENTIC AI ROADMAP</span>
        </div>
      </section>

      <section className="trustStrip">
        <div>
          <strong>Current</strong>
          <span>Interactive company-research demonstration</span>
        </div>
        <div>
          <strong>Next</strong>
          <span>Compliant production data integration and professional pilots</span>
        </div>
        <div>
          <strong>Roadmap</strong>
          <span>Agentic research, verification and monitoring workflows</span>
        </div>
      </section>

      <section className="section" id="product">
        <div className="sectionLabel">01 / PRODUCT</div>
        <div className="twoCol">
          <div>
            <h2>From company information<br />to professional intelligence.</h2>
          </div>
          <div className="bodyCopy">
            <p>
              Sericant is not designed as a generic chatbot. The product vision is a
              repeatable company-research workflow built around structured information,
              provenance and bounded AI assistance.
            </p>
            <p>
              The current MVP demonstrates company-name input and AI-assisted company
              summarisation. Future capabilities are clearly presented as roadmap items.
            </p>
          </div>
        </div>
      </section>

      <section className="demoSection" id="demo">
        <div className="sectionLabel light">02 / INTERACTIVE DEMO</div>
        <div className="demoIntro">
          <div>
            <h2>Research a company.</h2>
            <p>
              See how Sericant is intended to move from a query to a structured research
              output with explicit provenance.
            </p>
          </div>
          <span className="demoBadge">ILLUSTRATIVE DEMO</span>
        </div>

        <div className="searchCard">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runDemo()}
            placeholder="Enter a company name, e.g. Alibaba Group"
            aria-label="Company name"
          />
          <button onClick={runDemo}>Generate research preview →</button>
        </div>

        <div className="suggestions">
          <span>Try:</span>
          {["Alibaba Group", "Tencent", "BYD"].map((x) => (
            <button key={x} onClick={() => setQuery(x)}>{x}</button>
          ))}
        </div>

        {loadingStep !== null && (
          <div className="researchProgress">
            <div className="progressHeader">
              <span>Researching...</span>
              <span>{progress}%</span>
            </div>
            <div className="progressBar"><div style={{ width: `${progress}%` }} /></div>
            <div className="stageList">
              {stages.map((s, i) => (
                <div key={s} className={i <= loadingStep ? "stage active" : "stage"}>
                  <span>{i < loadingStep ? "✓" : i === loadingStep ? "•" : "○"}</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {report && (
          <article className="report">
            <div className="reportHeader">
              <div>
                <div className="miniLabel">SERICANT RESEARCH PREVIEW</div>
                <h3>{report.name}</h3>
                <p>{report.market}</p>
              </div>
              <span className="reportPill">{report.status}</span>
            </div>

            <div className="reportGrid">
              <section>
                <div className="fieldLabel">AI-assisted overview</div>
                <p>{report.overview}</p>
              </section>
              <section>
                <div className="fieldLabel">Structured facts</div>
                <ul>{report.facts.map((f) => <li key={f}>{f}</li>)}</ul>
              </section>
              <section>
                <div className="fieldLabel">Provenance</div>
                <ul>{report.sources.map((s) => <li key={s}>{s}</li>)}</ul>
              </section>
              <section>
                <div className="fieldLabel">Research status</div>
                <p>Demo complete. Production integrations are not enabled in this public prototype.</p>
              </section>
            </div>

            <div className="notice">
              This is an interactive demonstration using illustrative content. It is not a
              live third-party enterprise-data feed and does not imply authorisation from
              any specific data provider.
            </div>
          </article>
        )}
      </section>

      <section className="section" id="workflow">
        <div className="sectionLabel">03 / AGENTIC ROADMAP</div>
        <h2>A research workflow,<br />not a one-shot prompt.</h2>
        <div className="workflowGrid">
          {[
            ["01", "Interpret", "Understand the research request and define the task."],
            ["02", "Retrieve", "Call only approved or otherwise lawfully usable information sources."],
            ["03", "Resolve", "Identify the correct company entity and normalise structured fields."],
            ["04", "Verify", "Check required fields, timestamps and cross-source consistency."],
            ["05", "Synthesize", "Generate bounded AI-assisted analysis over structured inputs."],
            ["06", "Provenance", "Show sources, timestamps and a clear distinction between facts and AI output."]
          ].map(([n, t, d]) => (
            <article key={n} className="workflowCard">
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="darkSection">
        <div className="sectionLabel light">04 / RESPONSIBLE AI & DATA</div>
        <div className="twoCol">
          <div><h2>Trust is part of<br />the architecture.</h2></div>
          <div className="bodyCopy lightCopy">
            <p>
              Sericant intends to activate production data integrations only when
              relevant data rights, licensing and processing arrangements are in place.
            </p>
            <p>
              Source facts and AI-generated interpretation are intended to be clearly
              separated, with provenance and timestamps preserved alongside research outputs.
            </p>
            <Link href="/responsible-ai-data" className="textLink">Read our Responsible AI & Data approach →</Link>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="sectionLabel">05 / FOUNDER STORY</div>
        <div className="twoCol">
          <div>
            <h2>Built from professional<br /><em>company research.</em></h2>
          </div>
          <div className="bodyCopy">
            <p>
              Sericant was founded by ZHAN CHANGYUAN, a Beijing lawyer and frequent
              professional user of corporate-information databases in legal and commercial research.
            </p>
            <p>
              That experience led to a simple insight: international users often need to
              understand Chinese companies, but raw corporate records are not always
              designed for cross-border professional research.
            </p>
            <p>
              The name “Sericant” is inspired by “Serica”, the ancient Western name
              associated with the land of silk — reflecting the ambition to build a modern
              information bridge between China and international users.
            </p>
          </div>
        </div>
      </section>

      <section className="hongkongSection">
        <div className="sectionLabel light">06 / HONG KONG</div>
        <h2>Built in Hong Kong.<br />Connected to China.<br /><em>Designed for the world.</em></h2>
        <div className="hkGrid">
          <div><strong>HONG KONG</strong><span>Technology, professional services and international commercialisation base.</span></div>
          <div><strong>MAINLAND CHINA</strong><span>Company-information context and future compliant data partnerships.</span></div>
          <div><strong>GLOBAL USERS</strong><span>Professionals who need accessible company intelligence for cross-border decisions.</span></div>
        </div>
      </section>

      <section className="section">
        <div className="sectionLabel">07 / CURRENT STATUS</div>
        <div className="statusGrid">
          <div><span>Company</span><strong>Sericant Limited</strong></div>
          <div><span>Stage</span><strong>Pre-revenue MVP</strong></div>
          <div><span>Team</span><strong>Solo founder</strong></div>
          <div><span>Website</span><strong>www.sericant.com</strong></div>
        </div>
      </section>

      <section className="contact">
        <div className="sectionLabel">08 / CONTACT</div>
        <h2>Building a trusted layer<br />for company intelligence.</h2>
        <a href="mailto:lingoescn@gmail.com" className="contactEmail">lingoescn@gmail.com ↗</a>
        <p>Sericant Limited · Hong Kong</p>
      </section>

      <footer>
        <div className="footerBrand">SERICANT</div>
        <div className="footerLinks">
          <Link href="/responsible-ai-data">Responsible AI & Data</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
        <div>© 2026 Sericant Limited</div>
      </footer>
    </main>
  );
}