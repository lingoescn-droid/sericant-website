import Link from "next/link";
import BriefProducts, { BriefFAQ } from "./components/BriefProducts";
import SiteHeader from "./components/SiteHeader";
import SericantLogo from "./components/SericantLogo";

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero serviceHero">
        <div className="eyebrow">MAINLAND CHINA & HONG KONG COMPANY INTELLIGENCE</div>
        <div className="serviceHeroLayout">
          <h1><span>Know who you&apos;re</span><span>doing business with</span><span>in China.</span></h1>
          <div className="serviceHeroAside">
            <p className="serviceHeroStatement">See the evidence clearly.</p>
            <p className="heroText">Source-based company intelligence for professionals evaluating Mainland Chinese and Hong Kong counterparties. Clear English research with sources and limitations made visible.</p>
            <div className="heroActions"><Link href="/due-diligence/intake" className="btn primary">Check a company</Link><Link href="/sample-report" className="btn secondary">View sample report</Link></div>
            <div className="heroMeta heroPriceLine"><strong>From US$49</strong><i /><span>1–3 business days</span><i /><span>Scope confirmed before payment</span></div>
          </div>
        </div>
      </section>

      <section className="section reportFirst" id="due-diligence">
        <div className="sectionLabel">01 / CHOOSE YOUR BRIEF</div>
        <h2>Start with a scan.<br /><em>Go deeper when you need to.</em></h2>
        <BriefProducts />
        <h3 className="briefFAQTitle">Before you choose</h3><BriefFAQ />
      </section>

      <section className="section homeSample" id="sample">
        <div className="sectionLabel">02 / SEE THE DELIVERABLE</div>
        <div className="homeSampleGrid">
          <div>
            <h2>A closer look<br /><em>at the evidence.</em></h2>
            <p className="sampleIntro">See how a brief separates company information, source references and unanswered questions.</p>
            <p className="sampleDisclaimer">Watermarked public-records research sample based on a Chinese enterprise-credit disclosure report. Target identifier: 911101056738046445 · Chinese legal name: 沃特杰特贸易（北京）有限公司.</p>
            <div className="sampleActions"><Link href="/sample-report" className="btn primary">Explore the sample</Link><a href="/reports/sericant-sample-waterjet-beijing.pdf" download className="btn secondary">Download PDF</a></div>
            <p className="sampleDisclaimer">15-page English PDF · Official-record review. Registry status: deregistered. Approval date shown in the public disclosure report: 2 February 2026. This independent methodology sample is not a client testimonial or endorsement.</p>
          </div>
          <figure className="pdfPreviewCard"><Link href="/sample-report" aria-label="Preview the 15-page Sericant public sample report"><img src="/images/reports/sample-cover.webp" width="850" height="1100" loading="lazy" alt="Cover of Sericant’s watermarked public-records research sample" /></Link><figcaption><span>PUBLIC SAMPLE · 15 PAGES · WATERMARKED</span><Link href="/sample-report">View report →</Link></figcaption></figure>
        </div>
      </section>

      <section className="section homeMethod">
        <div className="sectionLabel">03 / HOW IT WORKS</div>
        <div className="homeMethodIntro"><h2>Sources first.<br /><em>Clear boundaries.</em></h2><div><p>We confirm the entity, scope, fee and estimated delivery date before payment. The final brief distinguishes source facts, interpretation and information gaps.</p><Link href="/methodology" className="textLink">Explore our methodology →</Link></div></div>
        <div className="homeMethodCards">
          <article><span>01</span><h3>Confirm the entity</h3><p>Provide the Chinese legal name, identifier where available, and your research purpose.</p></article>
          <article><span>02</span><h3>Confirm the scope</h3><p>We confirm available work, exclusions, fee and delivery estimate before payment.</p></article>
          <article><span>03</span><h3>Receive the brief</h3><p>Receive a bounded English research brief with applicable sources and explicit limitations.</p></article>
        </div>
      </section>

      <section className="darkSection">
        <div className="sectionLabel light">04 / RESEARCH BOUNDARIES</div>
        <div className="twoCol"><h2>Useful research.<br /><em>Not a professional determination.</em></h2><div className="bodyCopy lightCopy"><p>Sericant provides informational research, not legal advice, an audit, credit rating, investment recommendation, formal KYC determination, AML certification or guarantee.</p><p>Sources, scope and limits vary by entity and request. We make information gaps visible rather than filling them with unsupported conclusions.</p><Link href="/sources" className="textLink">See source categories →</Link></div></div>
      </section>

      <section className="hongkongSection">
        <div className="sectionLabel light">05 / HONG KONG</div>
        <h2>Built in Hong Kong.<br />Connected to China.<br /><em>Designed for the world.</em></h2>
      </section>

      <section className="contact" id="contact">
        <div className="sectionLabel">06 / REQUEST A BRIEF</div>
        <h2>Know your next<br />counterparty.</h2>
        <div className="heroActions"><Link href="/due-diligence/intake" className="btn primary">Check a company</Link><Link href="/sample-report" className="btn secondary">View sample report</Link></div>
        <p>Scope, fee and estimated delivery date confirmed before payment.</p>
        <a href="mailto:hello@sericant.com" className="contactEmail">hello@sericant.com ↗</a>
        <p>Sericant Limited · Hong Kong</p>
      </section>

      <footer>
        <div className="footerBrand"><SericantLogo /></div>
        <div className="footerLinks"><Link href="/china-supplier-check-gulf">For Gulf buyers</Link><Link href="/sample-report">Sample report</Link><Link href="/methodology">Methodology</Link><Link href="/sources">Source categories</Link><Link href="/responsible-ai-data">Responsible AI & Data</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refund-delivery">Delivery & cancellation</Link></div>
        <div>© 2026 Sericant Limited · Hong Kong<br />Room 602, 6/F, Kai Yue Commercial Building, 2C Argyle Street, Mong Kok, Kowloon, Hong Kong</div>
      </footer>
    </main>
  );
}
