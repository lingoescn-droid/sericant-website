import Link from "next/link";
import SericantLogo from "./components/SericantLogo";

export default function NotFound() {
  return (
    <main className="notFoundPage">
      <header className="topbar">
        <Link href="/" className="logo" aria-label="Sericant home"><SericantLogo /></Link>
      </header>
      <section className="notFoundContent">
        <p className="sectionLabel">404 / PAGE NOT FOUND</p>
        <h1>That page is not<br /><em>available.</em></h1>
        <p>The link may be outdated. Start with our report service or view the public sample.</p>
        <div className="heroActions">
          <Link href="/due-diligence" className="btn primary">Report service</Link>
          <Link href="/sample-report" className="btn secondary">View sample report</Link>
        </div>
      </section>
    </main>
  );
}
