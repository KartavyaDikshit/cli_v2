import { BASE_URL, SEO_CONFIG } from "@/lib/config/environment";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SEO_CONFIG.companyName,
  url: BASE_URL,
  logo: `${BASE_URL}${SEO_CONFIG.logo}`,
};
