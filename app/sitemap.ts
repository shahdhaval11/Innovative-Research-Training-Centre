import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "/home", changeFrequency: "weekly", priority: 1 },
    { path: "/aboutus", changeFrequency: "monthly", priority: 0.8 },
    { path: "/studentSupport", changeFrequency: "monthly", priority: 0.8 },
    { path: "/courses", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contactus", changeFrequency: "monthly", priority: 0.6 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
