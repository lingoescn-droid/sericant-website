import type { Metadata } from "next";
import Link from "next/link";
import BriefProducts from "../components/BriefProducts";
import SiteHeader from "../components/SiteHeader";
import SericantLogo from "../components/SericantLogo";

export const metadata: Metadata = {
  title: "China Supplier Checks for Gulf Buyers",
  description:
    "Source-based English company research for Gulf businesses assessing the legal entity behind a Mainland China supplier before payment or contract.",
  alternates: { canonical: "/china-supplier-check-gulf" },
  openGraph: {
    title: "China Supplier Checks for Gulf Buyers | Sericant",
    description:
      "Identify and assess the registered legal entity behind a Mainland China supplier through clear English research with traceable sources and visible limitations.",
    url: "https://www.sericant.com/china-supplier-check-gulf",
    type: "website"
  }
};

const riskQuestions = [
  {
    number: "01",
    title: "Which company is making the offer?",
    text: "A trading name, website or English name may not identify the registered Mainland China entity that will sign the contract."
  },
  {
    number: "02",
    title: "Do the documents point to the same entity?",
    text: "The company named in a quotation, contract, invoice and receiving account should be compared before a material payment is made."
  },
  {
    number: "03",
    title: "What can public records actually establish?",
    text: "Registration records can support an identity check, but they do not by themselves prove product quality, capacity, solvency or payment safety."
  }
];

const researchScope = [
  "Chinese legal name and available identifiers",
  "Current registration status",
  "Registered address and legal representative",
  "Publicly disclosed business scope",
  "Available ownership and management information",
  "Relevant public-record signals within the confirmed scope",
  "Traceable source references and review dates",
  "Information gaps and suggested follow-up checks"
];

export default function GulfSupplierCheckPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "China Supplier Checks for Gulf Buyers",
    serviceType: "Source-based company research",
    provider: {
      "@type": "Organization",
      name: "Sericant Limited",
      url: "https://www.sericant.com"
    },
    areaServed: [
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Place", name: "Gulf Cooperation Council" }
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Gulf buyers, importers and procurement teams"
    },
    url: "https://www.sericant.com/china-supplier-check-gulf"
  };

  return (
    <main className="gulfLanding">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <SiteHeader />

      <section className="hero serviceHero gulfHero">
        <div className="eyebrow">FOR GULF BUYERS, IMPORTERS & PROCUREMENT TEAMS</div>
        <div className="serviceHeroLayout">
          <h1>
            <span>Check the company</span>
            <span>behind your China</span>
            <span>supplier.</span>
          </h1>
          <div className="serviceHeroAside">
            <p className="serviceHeroStatement">Before contract.<br />Before payment.</p>
            <p className="heroText">
              Source-based English company research for Gulf businesses assessing
              the registered legal entity behind a Mainland China supplier.
            </p>
            <div className="heroActions">
              <Link href="/due-diligence/intake" className="btn primary">Request a supplier check</Link>
              <Link href="/sample-report" className="btn secondary">View sample report</Link>
            </div>
            <div className="heroMeta">
              <span>QUICK SCAN US$49</span><i />
              <span>FULL BRIEF FROM US$149</span><i />
              <span>DELIVERED IN ENGLISH</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section gulfRisk" id="risk">
        <div className="sectionLabel">01 / BEFORE YOU SEND A MATERIAL PAYMENT</div>
        <div className="gulfSectionIntro">
          <h2>Start with the<br /><em>right legal entity.</em></h2>
          <p>
            Finding a supplier and identifying the company legally responsible for
            the transaction are different tasks. These are three questions worth
            answering before commitment.
          </p>
        </div>
        <div className="gulfRiskGrid">
          {riskQuestions.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section gulfScope" id="scope">
        <div className="sectionLabel">02 / WHAT SERICANT CAN RESEARCH</div>
        <div className="twoCol gulfScopeLayout">
          <div>
            <h2>Evidence you can<br /><em>read and trace.</em></h2>
            <p className="gulfScopeLead">
              Each engagement begins with the target company and the decision you
              need to support. Scope, fee and estimated delivery date are confirmed
              before payment.
            </p>
          </div>
          <ul className="gulfCheckList">
            {researchScope.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="darkSection gulfBoundary">
        <div className="sectionLabel light">03 / WHAT THE BRIEF DOES NOT PROVE</div>
        <div className="twoCol">
          <h2>Company research,<br /><em>not a safety guarantee.</em></h2>
          <div className="bodyCopy lightCopy">
            <p>
              A Sericant brief does not replace a factory inspection, product test,
              sample review, contract advice or payment-control arrangement.
            </p>
            <p>
              It is informational research—not legal advice or opinion, an audit,
              credit rating, investment recommendation, formal KYC determination,
              AML certification or verification guarantee.
            </p>
            <p>
              Public information may be incomplete or delayed. Material decisions
              should combine entity research with appropriate commercial,
              inspection and professional checks.
            </p>
          </div>
        </div>
      </section>

      <section className="section gulfProducts" id="products">
        <div className="sectionLabel">04 / CHOOSE THE DEPTH</div>
        <div className="gulfProductsIntro">
          <h2>Start small.<br /><em>Go deeper when needed.</em></h2>
          <p>One target company per brief. English PDF delivery with the available sources and limitations made visible.</p>
        </div>
        <BriefProducts />
      </section>

      <section className="section gulfSample">
        <div className="sectionLabel">05 / REVIEW THE OUTPUT</div>
        <div className="twoCol gulfSampleLayout">
          <div>
            <h2>See how the<br /><em>evidence is presented.</em></h2>
          </div>
          <div className="bodyCopy">
            <p>
              Explore a watermarked 15-page public-records research sample showing
              how Sericant separates disclosed facts, source references, analysis
              boundaries and unanswered questions.
            </p>
            <div className="heroActions">
              <Link href="/sample-report" className="btn primary">Explore the sample</Link>
              <a href="/reports/sericant-sample-waterjet-beijing.pdf" download className="btn secondary">Download PDF</a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact gulfContact">
        <div className="sectionLabel">06 / REQUEST A CHINA SUPPLIER CHECK</div>
        <h2>Confirm the company<br />before you commit.</h2>
        <div className="heroActions">
          <Link href="/due-diligence/intake" className="btn primary">Submit company details</Link>
          <a href="mailto:hello@sericant.com" className="btn secondary">Email Sericant</a>
        </div>
        <p>No payment is required when you submit a request. We confirm the available scope, fee and estimated delivery date first.</p>
        <a href="mailto:hello@sericant.com" className="contactEmail">hello@sericant.com ↗</a>
        <p>Sericant Limited · Hong Kong</p>
      </section>

      <footer>
        <div className="footerBrand"><SericantLogo /></div>
        <div className="footerLinks">
          <Link href="/">Home</Link>
          <Link href="/sample-report">Sample report</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/sources">Source categories</Link>
          <Link href="/responsible-ai-data">Responsible AI & Data</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
        <div>© 2026 Sericant Limited · Hong Kong<br />Room 602, 6/F, Kai Yue Commercial Building, 2C Argyle Street, Mong Kok, Kowloon, Hong Kong</div>
      </footer>
    </main>
  );
}
