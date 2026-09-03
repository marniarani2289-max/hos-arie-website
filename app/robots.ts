import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/auth/",
          "/dashboard",
          "/forgot-password",
          "/login",
          "/pilot/",
          "/register",
          "/reset-password",
          "/studio/",
          "/lexnusa/ops/",
          "/raja-ali-haji/admin/",
        ],
      },
    ],

    sitemap: "https://www.hossibarani.com/sitemap.xml",
    host: "https://www.hossibarani.com",
  };
}
