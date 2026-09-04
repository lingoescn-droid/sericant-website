import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Confirmed",
  robots: { index: false, follow: false }
};

export default function ThankYouLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
