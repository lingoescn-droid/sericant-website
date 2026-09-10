import Link from "next/link";
import SericantLogo from "./SericantLogo";

const navigation = [
  { href: "/due-diligence", label: "Service" },
  { href: "/sample-report", label: "Sample" },
  { href: "/methodology", label: "Method" },
  { href: "/sources", label: "Sources" },
];

export default function SiteHeader() {
  return (
    <header className="topbar siteHeader">
      <Link href="/" className="logo" aria-label="Sericant home">
        <SericantLogo />
      </Link>

      <nav className="desktopNav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href}>{item.label}</Link>
        ))}
      </nav>

      <Link href="/due-diligence/intake" className="topCta">Request</Link>

      <details className="mobileMenu">
        <summary aria-label="Open navigation menu">Menu</summary>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
          <Link href="/china-supplier-check-gulf">For Gulf buyers</Link>
        </nav>
      </details>
    </header>
  );
}
