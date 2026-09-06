import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sericant",
    short_name: "Sericant",
    description: "Source-based English company intelligence for assessing Mainland China and Hong Kong counterparties.",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    start_url: "/",
    display: "standalone",
    background_color: "#f4f4ef",
    theme_color: "#171817"
  };
}