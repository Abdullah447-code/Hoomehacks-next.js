export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const productionFallback = "https://hoomehacks-next-js-8zv3.vercel.app";
  const candidate =
    configuredUrl && !configuredUrl.includes("localhost")
      ? configuredUrl
      : vercelUrl
        ? `https://${vercelUrl}`
        : process.env.NODE_ENV === "production"
          ? productionFallback
          : "http://localhost:3000";

  return candidate.replace(/\/$/, "");
}
