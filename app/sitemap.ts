import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.hossibarani.com";
  const core: Array<[string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = [
    ["", 1, "weekly"],
    ["/start", 0.9, "monthly"],
    ["/about", 0.9, "monthly"],
    ["/research", 0.95, "monthly"],
    ["/research/malay-ethical-constitutionalism", 0.95, "monthly"],
    ["/publications", 0.9, "monthly"],
    ["/books", 0.8, "monthly"],
    ["/opinions", 0.9, "weekly"],
    ["/journal", 0.8, "monthly"],
    ["/raja-ali-haji", 0.95, "monthly"],
    ["/raja-ali-haji/programmes/pemikiran-raja-ali-haji", 0.9, "monthly"],
    ["/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-1", 0.8, "monthly"],
    ["/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-2", 0.8, "monthly"],
    ["/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-3", 0.8, "monthly"],
    ["/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-4", 0.8, "monthly"],
    ["/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-5", 0.8, "monthly"],
    ["/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-6", 0.8, "monthly"],
    ["/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-7", 0.8, "monthly"],
    ["/raja-ali-haji/programmes/pemikiran-raja-ali-haji/module-8", 0.8, "monthly"],
    ["/constitutional-justice", 0.85, "monthly"],
    ["/hukumpreneur", 0.9, "weekly"],
    ["/simak", 0.85, "monthly"],
    ["/lexnusa", 0.9, "monthly"],
    ["/lexnusa/about", 0.75, "monthly"],
    ["/lexnusa/services", 0.85, "monthly"],
    ["/lexnusa/evidence", 0.8, "monthly"],
    ["/lexnusa/lex-eval", 0.85, "monthly"],
    ["/lexnusa/lex-eval-sample", 0.75, "monthly"],
    ["/lexnusa/pilot", 0.8, "monthly"],
    ["/hw-kepri", 0.8, "monthly"],
    ["/digital-archive", 0.75, "monthly"],
    ["/gallery", 0.7, "monthly"],
    ["/contact", 0.7, "yearly"],
    ["/id", 0.9, "weekly"],
    ["/id/about", 0.8, "monthly"],
    ["/id/research", 0.9, "monthly"],
    ["/id/publications", 0.85, "monthly"],
    ["/id/contact", 0.7, "yearly"],
  ];

  return core.map(([path, priority, changeFrequency]) => ({
    url: `${base}${path}`,
    priority,
    changeFrequency,
  }));
}
