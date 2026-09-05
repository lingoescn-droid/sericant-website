import SericantLogo from "../components/SericantLogo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Sericant handles website, enquiry and company research information.",
  alternates: { canonical: "/privacy" }
};

const sections = [
  ["1. Scope", <p>This Policy explains how Sericant Limited, Hong Kong (“Sericant”, “we”, “us”) handles information relating to website visitors, contacts, scope requests and customers of our company intelligence services. The public research prototype remains illustrative and does not provide a live third-party company-data search.</p>],
  ["2. Information you provide", <><p>We may receive your name, work email, correspondence, target-company identifiers, research purpose, questions and other information you choose to submit. If you purchase a service, we may also receive payment status, transaction identifiers and limited billing details from our payment provider; Sericant does not need to receive your full card number.</p><p>Please do not submit identity documents, passwords, payment-card details, authentication codes or unnecessary sensitive personal information through the scope-request form.</p></>],
  ["3. Research information", <p>To perform an accepted engagement, Sericant may process corporate records and information about directors, shareholders, officers or other persons connected with a target company where relevant to the stated business-research purpose and lawfully available. Coverage and permitted use depend on the source, jurisdiction and applicable contractual or legal requirements.</p>],
  ["4. Technical information", <p>Hosting, infrastructure and security providers may process IP address, browser and device information, timestamps, request logs and security events needed to deliver and protect the website. If analytics or non-essential cookies are introduced, this Policy and any required consent mechanism will be updated.</p>],
  ["5. How information is used", <><p>We may use information to identify the requested company, assess and confirm scope, communicate with you, process and deliver an accepted service, maintain records, prevent abuse, improve our workflow, protect the website and comply with applicable obligations.</p><p>Information submitted for one engagement is not automatically treated as permission to publish it, resell it or use it to train a public model.</p></>],
  ["6. Service providers and international processing", <p>Sericant may use providers for hosting, communications, payment processing, security, document production and AI-assisted processing. Depending on the service and configuration, information may be processed outside Hong Kong. Sericant intends to assess data category, source rights, purpose and appropriate safeguards before activating production integrations or transferring regulated information.</p>],
  ["7. Retention", <p>Scope requests that do not proceed may be retained for a limited period for communication, fraud prevention and recordkeeping. Customer, transaction and report records may be retained for the period reasonably needed to provide the service, address questions, protect legal rights and meet applicable obligations. Information will be deleted or de-identified when it is no longer reasonably required, subject to technical backups and lawful retention requirements.</p>],
  ["8. Security", <p>Sericant applies proportionate administrative and technical safeguards and intends to expand access controls, logging, vendor review and incident procedures as the service develops. No internet transmission or storage system can be guaranteed completely secure.</p>],
  ["9. Your choices and requests", <p>You may ask about, correct or request deletion of information you submitted, subject to identity verification and applicable exceptions. You may also object to non-essential communications. Requests should be sent to <a href="mailto:hello@sericant.com">hello@sericant.com</a>.</p>],
  ["10. Third-party links and payments", <p>The website may link to third-party services, including a payment provider. Their privacy practices are governed by their own notices. Sericant should not be sent payment credentials by email or through the research form.</p>],
  ["11. Changes and contact", <><p>This Policy may be updated as the service, data sources or processing activities change. The current revision date will appear above.</p><p>Privacy enquiries: <a href="mailto:hello@sericant.com">hello@sericant.com</a><br />Sericant Limited · Hong Kong</p></>]
] as const;

export default function PrivacyPage() {
  return (
    <main className="legalPage">
      <header className="simpleHeader"><Link href="/" className="logo"><SericantLogo /></Link><Link href="/" className="back">← Back to home</Link></header>
      <article className="legalContent">
        <div className="sectionLabel">PRIVACY POLICY</div>
        <h1 style={{ fontSize: "48px", lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "18px" }}>Privacy Policy</h1>
        <p className="lede" style={{ marginBottom: "52px" }}>Last updated: 4 September 2026</p>
        {sections.map(([title, content]) => <section key={title}><h2>{title}</h2>{content}</section>)}
      </article>
    </main>
  );
}
