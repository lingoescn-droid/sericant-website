import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.sericant.com", lastModified: new Date(), priority: 1 },
    { url: "https://www.sericant.com/due-diligence", lastModified: new Date(), priority: 0.9 },
    { url: "https://www.sericant.com/due-diligence/intake", lastModified: new Date(), priority: 0.7 },
    { url: "https://www.sericant.com/sample-report", lastModified: new Date(), priority: 0.8 },
    { url: "https://www.sericant.com/methodology", lastModified: new Date(), priority: 0.7 },
    { url: "https://www.sericant.com/responsible-ai-data", lastModified: new Date(), priority: 0.8 },
    { url: "https://www.sericant.com/refund-delivery", lastModified: new Date(), priority: 0.5 },
    { url: "https://www.sericant.com/privacy", lastModified: new Date(), priority: 0.4 },
    { url: "https://www.sericant.com/terms", lastModified: new Date(), priority: 0.4 }
  ];
}
