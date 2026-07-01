import arAuthorities from "./halal-sector-authorities.json";
import enAuthorities from "./halal-sector-authorities.en.json";

export type HalalSectorAuthority = {
  id: string;
  shortName: string;
  officialName: string;
  code: string;
  authority: string;
  intro: string;
  phone: string;
  email: string;
  website: string | null;
  logo: string;
  screenshot: string | null;
  sourceStatus: "seeded" | "fetched" | "partial" | "failed" | "missing-website";
  lastFetchedAt: string | null;
};

const authoritiesByLanguage = {
  ar: arAuthorities,
  en: enAuthorities,
} as const;

export const getHalalSectorAuthorities = (language: string | undefined) => {
  const key = language?.startsWith("en") ? "en" : "ar";
  return authoritiesByLanguage[key] as HalalSectorAuthority[];
};

export const halalSectorAuthorities = arAuthorities as HalalSectorAuthority[];
