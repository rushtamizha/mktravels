import { navItems } from "@/lib/data";

const SITE_URL = "https://www.mktravelscoimbatore.com";

/** Mirrors the slug rules the dynamic routes use in generateStaticParams. */
function categorySlug(label) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

function findNav(label) {
  return navItems?.find((item) => item.label?.toLowerCase() === label);
}

export default function sitemap() {
  const lastModified = new Date();

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "daily" },
    { path: "/tour-packages", priority: 0.9, changeFrequency: "weekly" },
    { path: "/temple-packages", priority: 0.9, changeFrequency: "weekly" },
    { path: "/tariff", priority: 0.8, changeFrequency: "weekly" },
    { path: "/travel-places", priority: 0.7, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  ];

  const entries = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  // Category pages plus every individual route page, taken from the same
  // nav data the pages are generated from, so the sitemap cannot drift.
  const seen = new Set(entries.map((entry) => entry.url));

  for (const navLabel of ["tour packages", "temple packages"]) {
    const nav = findNav(navLabel);

    for (const category of nav?.dropdown ?? []) {
      const base = `/${navLabel.split(" ")[0] === "tour" ? "tour-packages" : "temple-packages"}/${categorySlug(category.label)}`;
      const categoryUrl = `${SITE_URL}${base}`;

      if (!seen.has(categoryUrl)) {
        seen.add(categoryUrl);
        entries.push({
          url: categoryUrl,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }

      for (const sub of category.subDropdown ?? []) {
        if (!sub.href) continue;
        const url = `${SITE_URL}${sub.href}`;
        if (seen.has(url)) continue;
        seen.add(url);
        entries.push({
          url,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  return entries;
}
