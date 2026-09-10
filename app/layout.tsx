import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sericant — China Supplier & Company Checks",
    template: "%s | Sericant"
  },
  description:
    "Source-based English company research for overseas businesses assessing Mainland China suppliers and counterparties.",
  metadataBase: new URL("https://www.sericant.com"),
  alternates: { canonical: "/" },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    title: "Sericant — China Supplier & Company Checks",
    description:
      "Source-based English company research for overseas businesses assessing Mainland China suppliers and counterparties.",
    url: "https://www.sericant.com",
    siteName: "Sericant",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Sericant — China Supplier & Company Checks",
    description:
      "Source-based English company research for overseas businesses assessing Mainland China suppliers and counterparties."
  },
  verification: {
    google: "lNUrS-Q1m6x5Lr_eAyktjYE7MtDcMSpYC6ydXqjIhs4"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sericant Limited",
              url: "https://www.sericant.com",
              email: "hello@sericant.com",
              foundingLocation: "Hong Kong",
              description:
                "Source-based English company research for overseas businesses assessing Mainland China suppliers and counterparties."
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
