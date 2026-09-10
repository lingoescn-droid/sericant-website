import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Source Categories",
  description: "How Sericant approaches source categories, provenance and coverage limits in company research.",
  alternates: { canonical: "/sources" }
};

const categories = [
  ["Official corporate records", "Public enterprise-registration, filing and disclosure records that are relevant and lawfully available for the agreed research scope."],
  ["Regulatory and public-authority materials", "Public notices, registers, approvals or other authority publications where relevant to the requested question."],
  ["Court and other public records", "Publicly available judicial or administrative materials only where they are included in the confirmed scope and can be reliably identified."],
  ["Lawfully usable supplementary information", "Licensed, authorised or other lawfully usable information may assist research, subject to applicable terms, source limits and the confirmed scope."]
];

export default function SourcesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="hero compactHero">
        <div className="eyebrow">SOURCE CATEGORIES</div>
        <h1>Sources first.<br /><em>Claims second.</em></h1>
        <p className="heroText">Sericant’s research begins with the source categories relevant to the agreed question, then identifies what the available material does — and does not — support.</p>
      </section>
      <section className="section">
        <div className="sectionLabel">HOW WE APPROACH SOURCES</div>
        <div className="homeMethodCards">
          {categories.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
      <section className="darkSection">
        <div className="twoCol">
          <h2>Coverage is<br /><em>scope-dependent.</em></h2>
          <div className="bodyCopy lightCopy"><p>Source availability varies by entity, jurisdiction, date, access conditions and the customer’s requested purpose. A category listed here is not a promise that every source will be searched for every engagement.</p><p>Sericant distinguishes source-supported facts, AI-assisted organisation or interpretation, and information gaps. We do not present an AI output as an independent factual source.</p><Link href="/methodology" className="textLink">Read the methodology →</Link></div>
        </div>
      </section>
      <section className="contact"><div className="sectionLabel">REQUEST A BRIEF</div><h2>Start with the<br />right scope.</h2><Link href="/due-diligence/intake" className="contactEmail">Request scope confirmation →</Link><p>Scope, fee and estimated delivery date confirmed before payment.</p></section>
    </main>
  );
}
