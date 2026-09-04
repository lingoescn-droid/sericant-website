import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sericant — China & Hong Kong Company Intelligence",
    template: "%s | Sericant"
  },
  description:
    "Source-based company intelligence for professionals evaluating Mainland Chinese and Hong Kong counterparties.",
  metadataBase: new URL("https://www.sericant.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sericant — China & Hong Kong Company Intelligence",
    description:
      "Know who you are doing business with in China through structured, traceable company research.",
    url: "https://www.sericant.com",
    siteName: "Sericant",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Sericant — China & Hong Kong Company Intelligence",
    description: "Source-based company intelligence for cross-border business decisions."
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
                "Company intelligence research for professionals evaluating Mainland Chinese and Hong Kong counterparties."
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
