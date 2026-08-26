import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sericant.com"),
  title: {
    default: "Sericant — AI-native Company Intelligence",
    template: "%s | Sericant"
  },
  description:
    "Sericant is building an AI-native company intelligence platform for professional and cross-border research on Mainland Chinese and Hong Kong companies.",
  keywords: [
    "company intelligence",
    "China company research",
    "Hong Kong company research",
    "AI research",
    "cross-border due diligence",
    "enterprise intelligence"
  ],
  openGraph: {
    title: "Sericant — AI-native Company Intelligence",
    description:
      "Structured, explainable company intelligence for professional and cross-border research.",
    url: "https://www.sericant.com",
    siteName: "Sericant",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Sericant — AI-native Company Intelligence",
    description:
      "Structured, explainable company intelligence for professional and cross-border research."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}