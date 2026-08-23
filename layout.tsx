import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sericant — AI-powered Enterprise Data Intelligence",
  description:
    "Sericant transforms enterprise information from Mainland China and Hong Kong into accessible, understandable and actionable intelligence.",
  metadataBase: new URL("https://sericant.com"),
  openGraph: {
    title: "Sericant — Enterprise Data Intelligence",
    description:
      "Making Chinese Enterprise Data Accessible, Understandable and Actionable.",
    url: "https://sericant.com",
    siteName: "Sericant",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}