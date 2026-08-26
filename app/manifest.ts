import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sericant",
    short_name: "Sericant",
    description: "AI-native company intelligence for professional and cross-border research.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f4ef",
    theme_color: "#171817"
  };
}