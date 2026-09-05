import SericantLogo from "../components/SericantLogo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Public Records Research Sample | Sericant",
  description: "Read Sericant’s watermarked public sample: an English methodology illustration based on a Chinese enterprise-credit disclosure report.",
  alternates: { canonical: "/sample-report" }
};
const pdf = "/reports/sericant-sample-shenzhen-unionpay.pdf";

export default function SampleReportPage() {
  return (
    <main>
      <header className="topbar"><Link href="/" className="logo"><SericantLogo /></Link><nav className="desktopNav"><Link href="/due-diligence">Report service</Link><Link href="/methodology">Methodology</Link><Link href="/responsible-ai-data">Responsible AI & Data</Link></nav><Link href="/due-diligence/intake" className="topCta">Check a company</Link></header>
      <section className="section realSampleIntro">
        <div className="sectionLabel">PUBLIC SAMPLE / PUBLIC-RECORDS RESEARCH</div>
        <div className="homeSampleGrid">
          <div>
            <h1>See the method.<br /><em>Read the evidence.</em></h1>
            <p className="sampleIntro">Entity identifier: 91440300279257697T</p>
            <p lang="zh-Hans">深圳市银联金融网络有限公司</p>
            <p className="sampleDisclaimer">The PDF uses the English rendering “Shenzhen UnionPay Financial Network Co., Ltd.” as a Sericant translation. It is not presented as a verified registered English name.</p>
            <p className="sampleStatus">REGISTRY STATUS: DEREGISTERED · APPROVAL DATE: 27 AUGUST 2026</p>
            <p className="sampleIntro">A public methodology illustration showing how an official Chinese disclosure report is organised into English findings, source references and explicit information gaps.</p>
            <dl className="sampleDetails"><div><dt>Format</dt><dd>15-page English PDF · Watermarked</dd></div><div><dt>Research cut-off</dt><dd>5 September 2026</dd></div><div><dt>Reference</dt><dd>SER-SAMPLE-20260905-001</dd></div></dl>
            <div className="sampleActions"><a href={pdf} target="_blank" rel="noopener noreferrer" className="btn primary">Read PDF ↗</a><a href={pdf} download="Sericant-Public-Records-Research-Sample.pdf" className="btn secondary">Download PDF ↓</a></div>
            <p className="sampleDisclaimer">No sign-up required. This sample was not commissioned by or endorsed by the subject company, its shareholders, China UnionPay, ChinaUMS or any authority. It is not legal advice, a formal KYC determination or an AML certification. The public report separately states a deregistered status and an approval date; it does not establish a precise deregistration date.</p>
          </div>
          <figure className="pdfPreviewCard"><a href={pdf} target="_blank" rel="noopener noreferrer" aria-label="Open the sample PDF in a new tab"><img src="/images/reports/sample-cover.webp" width="850" height="1100" alt="Cover of Sericant’s watermarked public-records research sample PDF" fetchPriority="high" /></a><figcaption>ACTUAL PDF · COVER / PAGE 1</figcaption></figure>
        </div>
      </section>
      <section className="section sampleScopeSection">
        <div className="sectionLabel">UNDERSTAND THE SCOPE</div>
        <div className="homeSampleGrid">
          <figure className="pdfPreviewCard"><a href={`${pdf}#page=2`} target="_blank" rel="noopener noreferrer" aria-label="Open the research scope on page 2"><img src="/images/reports/sample-scope.webp" width="850" height="1100" loading="lazy" alt="Actual PDF page 2: report control, included source, material exclusions and use limitation" /></a><figcaption>ACTUAL PDF · RESEARCH SCOPE / PAGE 2</figcaption></figure>
          <div><h2>What this sample<br /><em>does—and does not—cover.</em></h2>
            <p className="sampleIntro">Based solely on an Enterprise Credit Information Disclosure Report from the National Enterprise Credit Information Publicity System, generated on 5 September 2026.</p>
            <p className="sampleIntro">Findings are limited to the fields displayed in that report. “No information displayed” does not establish that no record or issue exists.</p>
            <p className="sampleDisclaimer">No interviews, site visit, document authentication, litigation search, adverse-media review, legal analysis, KYC determination or beneficial-ownership verification are included. No separate regulator notice was reviewed, so the sample does not verify a payment-licence cancellation date. This sample does not establish the scope of every paid engagement.</p>
            <Link href="/methodology" className="textLink">Read our methodology →</Link>
          </div>
        </div>
      </section>
      <section className="contact"><div className="sectionLabel">REQUEST A BRIEF</div><h2>Research your<br />next counterparty.</h2><Link href="/due-diligence/intake" className="contactEmail">Request scope confirmation →</Link><p>Scope, fee and estimated delivery date confirmed before payment.</p></section>
    </main>
  );
}
