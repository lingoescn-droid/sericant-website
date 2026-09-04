import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research Methodology",
  description: "How Sericant identifies companies, reviews sources, separates facts from interpretation and quality-checks reports.",
  alternates: { canonical: "/methodology" }
};

const steps = [
  ["01", "Identify", "Match brand names, English names, Chinese legal names, registration identifiers and jurisdictions to the intended entity."],
  ["02", "Define", "Confirm the customer question, standard scope, exclusions, fee and estimated delivery date before payment."],
  ["03", "Retrieve", "Review public, licensed, authorised or otherwise lawfully usable sources appropriate to the engagement."],
  ["04", "Structure", "Normalise company identity, ownership, management, business activity, changes and relevant public-record events."],
  ["05", "Cross-check", "Compare identifiers, dates and material facts across available sources; record conflicts and missing information."],
  ["06", "Synthesize", "Use bounded AI assistance to organise and explain inputs without presenting generated text as an unsupported fact."],
  ["07", "Review", "Perform human review for entity accuracy, source support, language, limitations and prohibited professional conclusions."],
  ["08", "Deliver", "Provide a dated English brief with visible scope, findings, sources, uncertainties and use limitations."]
];

export default function MethodologyPage() {
  return (
    <main>
      <header className="topbar"><Link href="/" className="logo">SERICANT</Link><nav className="desktopNav"><Link href="/due-diligence">Report service</Link><Link href="/sample-report">Sample report</Link><Link href="/responsible-ai-data">Responsible AI & Data</Link></nav><Link href="/due-diligence/intake" className="topCta">Check a company</Link></header>
      <section className="hero compactHero"><div className="eyebrow">RESEARCH METHODOLOGY</div><h1>Evidence first.<br /><em>Interpretation second.</em></h1><p className="heroText">A bounded company-research workflow designed for traceability, uncertainty and professional review.</p></section>
      <section className="section" id="workflow"><div className="sectionLabel">HOW A BRIEF IS PREPARED</div><div className="workflowGrid">{steps.map(([n,t,d]) => <article className="workflowCard" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>
      <section className="darkSection"><div className="sectionLabel light">OUTPUT BOUNDARIES</div><div className="twoCol"><h2>Useful research.<br /><em>Not a professional determination.</em></h2><div className="bodyCopy lightCopy"><p>Sericant identifies source-supported facts, observable signals, inconsistencies and information gaps. It does not declare that a target is legally compliant, creditworthy, safe, investment-grade or approved for KYC.</p><p>The customer and its qualified advisers remain responsible for consequential decisions.</p><Link href="/responsible-ai-data" className="textLink">Responsible AI & Data →</Link></div></div></section>
      <section className="contact"><div className="sectionLabel">START A REQUEST</div><h2>Have a company<br />to evaluate?</h2><Link href="/due-diligence/intake" className="contactEmail">Check the scope →</Link></section>
    </main>
  );
}
