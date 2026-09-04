import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sample Company Intelligence Brief",
  description: "Preview the structure, evidence presentation and limitations of a Sericant Company Intelligence Brief.",
  alternates: { canonical: "/sample-report" }
};

const rows = [
  ["Legal name", "Harbour Peak Technologies (Shenzhen) Co., Ltd.", "Illustrative registry extract", "Illustrative"],
  ["Chinese name", "海峰科技（深圳）有限公司", "Illustrative registry extract", "Illustrative"],
  ["Jurisdiction", "Mainland China · Shenzhen", "Illustrative registry extract", "Illustrative"],
  ["Registration status", "Active", "Illustrative registry extract", "Illustrative"],
  ["Established", "18 March 2018", "Illustrative registry extract", "Illustrative"]
];

export default function SampleReportPage() {
  return (
    <main>
      <header className="topbar"><Link href="/" className="logo">SERICANT</Link><nav className="desktopNav"><Link href="/due-diligence">Report service</Link><Link href="/methodology">Methodology</Link><Link href="/responsible-ai-data">Responsible AI & Data</Link></nav><Link href="/due-diligence/intake" className="topCta">Check a company</Link></header>
      <section className="hero compactHero"><div className="eyebrow">FORMAT SAMPLE · ILLUSTRATIVE COMPANY</div><h1>See what the<br /><em>evidence looks like.</em></h1><p className="heroText">A condensed preview of the Sericant Company Intelligence Brief. The company and records below are fictional and demonstrate format only.</p><div className="heroMeta"><span>ENGLISH OUTPUT</span><i /><span>SOURCE-TRACEABLE</span><i /><span>LIMITATIONS VISIBLE</span></div></section>
      <section className="section reportSample"><div className="sampleHeader"><div><div className="miniLabel">SERICANT COMPANY INTELLIGENCE BRIEF</div><h2>Harbour Peak Technologies<br />(Shenzhen) Co., Ltd.</h2></div><span className="sampleBadge">ILLUSTRATIVE</span></div>
        <div className="sampleNotice"><strong>Important:</strong> This is a fictional format sample, not a report about a real company and not evidence of live access to any named database.</div>
        <div className="sampleGrid"><article><div className="sectionLabel">01 / EXECUTIVE SUMMARY</div><p>The supplied English trading name was matched to the illustrative Chinese legal entity above. The example record shows an active private company established in Shenzhen in 2018. The sample ownership table indicates two direct shareholders. No conclusion is made about solvency, legal compliance or suitability as a counterparty.</p></article><article><div className="sectionLabel">KEY INFORMATION GAPS</div><ul><li>Beneficial ownership beyond the direct shareholders is not established.</li><li>Financial statements were not included in this illustrative scope.</li><li>Physical operations were not independently verified.</li></ul></article></div>
        <div className="sectionLabel">02 / ENTITY VERIFICATION</div><div className="sampleTable">{rows.map(([f,v,s,c]) => <div className="sampleRow" key={f}><strong>{f}</strong><span>{v}</span><small>{s}</small><small>{c}</small></div>)}</div>
        <div className="sampleGrid"><article><div className="sectionLabel">03 / OWNERSHIP & MANAGEMENT</div><p><strong>Illustrative direct ownership:</strong></p><ul><li>Harbour Peak Holdings Limited — 70%</li><li>Li Ming — 30%</li></ul><p className="mutedText">Interpretation: the available example record identifies direct shareholders only. Ultimate beneficial ownership would require further evidence.</p></article><article><div className="sectionLabel">04 / PUBLIC-RECORD SIGNALS</div><p><strong>No high-severity event shown in this format sample.</strong></p><p className="mutedText">This does not mean no event exists. Production reports state the databases, date range, retrieval date and material coverage limitations actually applicable to the engagement.</p></article></div>
        <div className="sampleGrid"><article><div className="sectionLabel">05 / SOURCE REGISTER</div><ul><li>Illustrative registry extract — retrieved 4 September 2026</li><li>Illustrative corporate filing — dated 30 June 2026</li><li>Illustrative official notice search — checked 4 September 2026</li></ul></article><article><div className="sectionLabel">06 / BOUNDARY</div><p>This brief organises information for business research. It is not a legal opinion, audit, credit rating, investment recommendation, formal KYC determination or AML certification.</p></article></div>
      </section>
      <section className="contact"><div className="sectionLabel">REQUEST A BRIEF</div><h2>Evaluate a real<br />company.</h2><Link href="/due-diligence/intake" className="contactEmail">Request scope confirmation →</Link><p>No payment until scope is confirmed.</p></section>
    </main>
  );
}
