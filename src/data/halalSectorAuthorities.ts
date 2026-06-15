import authorities from "./halal-sector-authorities.json";

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

export const halalSectorAuthorities = authorities as HalalSectorAuthority[];
