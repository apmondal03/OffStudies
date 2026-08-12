import type { MetadataRoute } from "next";
import { CORE_3000 } from "@/lib/dictionary/coreList";

const BASE_URL = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/explore", "/stream", "/saved", "/history", "/about"].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const wordRoutes = CORE_3000.map((w) => ({
    url: `${BASE_URL}/word/${w.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...wordRoutes];
}
