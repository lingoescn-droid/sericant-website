import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "Sericant website privacy policy."
};

export default function Page() {
  return (
    <main className="legalPage">
      <header className="simpleHeader">
        <Link href="/" className="logo">SERICANT</Link>
        <Link href="/" className="back">← Back to home</Link>
      </header>
      <article className="legalContent">
        <div className="sectionLabel">PRIVACY</div>
        <h1>Privacy Policy</h1>
        <p className="lede">Last updated: 25 August 2026</p>

        <h2>1. Current website scope</h2>
        <p>
          This website currently functions as a company website and interactive product
          demonstration. The public demo does not require account registration and does not
          provide a live third-party company-data service.
        </p>

        <h2>2. Information you provide</h2>
        <p>
          If you contact Sericant by email, we may receive the contact information and
          message content you choose to provide.
        </p>

        <h2>3. Technical information</h2>
        <p>
          Hosting and infrastructure providers may process standard technical information
          such as IP addresses, browser information, request logs and security events in
          connection with operating the website.
        </p>

        <h2>4. Use of information</h2>
        <p>
          Information may be used to respond to enquiries, operate and secure the website,
          improve the product demonstration and comply with applicable legal obligations.
        </p>

        <h2>5. Future product changes</h2>
        <p>
          If Sericant introduces user accounts, paid services, analytics, cookies or live
          production data services, this policy will be updated before or alongside those
          features as appropriate.
        </p>

        <h2>6. Contact</h2>
        <p>Privacy enquiries: lingoescn@gmail.com</p>

        <div className="legalNote">
          This is an early-stage website privacy notice and should be reviewed before
          launching production user accounts, payments or live data-processing services.
        </div>
      </article>
    </main>
  );
}
