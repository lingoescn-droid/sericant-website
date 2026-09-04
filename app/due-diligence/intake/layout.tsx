import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Scope Confirmation",
  description: "Submit a Mainland China or Hong Kong company for entity and research scope confirmation before payment.",
  alternates: { canonical: "/due-diligence/intake" }
};

export default function IntakeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
