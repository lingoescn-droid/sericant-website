export const briefProducts = {
  quick: {
    name: "Quick Scan Brief",
    price: "US$49",
    timing: "1 business day",
    summary: "An initial check of one company’s identity and registration status.",
    sections: ["Entity identification", "Registration status", "Information gaps & follow-up checks"]
  },
  standard: {
    name: "Company Intelligence Brief",
    price: "From US$149",
    timing: "2–3 business days",
    summary: "Broader company-background research for a more detailed counterparty review.",
    sections: ["Company identity & profile", "Available ownership & management", "Business activity", "Relevant public-record signals", "Source references & information gaps"]
  }
} as const;
export type BriefProduct = keyof typeof briefProducts;
export function isBriefProduct(value: unknown): value is BriefProduct {
  return value === "quick" || value === "standard";
}
