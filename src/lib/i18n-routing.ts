export type Lang = "ar" | "en";

const EN_PREFIX = "/en";

export function getLanguageFromPathname(pathname: string): Lang {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? "en" : "ar";
}

export function stripLanguagePrefix(pathname: string): string {
  if (pathname === EN_PREFIX) return "/";
  if (pathname.startsWith(`${EN_PREFIX}/`)) return pathname.slice(EN_PREFIX.length) || "/";
  return pathname || "/";
}

export function localizePath(path: string, lang: Lang): string {
  if (!path || path.startsWith("http") || path.startsWith("mailto:")) return path;

  if (path.startsWith("#")) {
    return lang === "en" ? `${EN_PREFIX}/${path}` : `/${path}`;
  }

  const [baseWithQuery, hash = ""] = path.split("#");
  const [base, query = ""] = baseWithQuery.split("?");
  const normalizedBase = stripLanguagePrefix(base.startsWith("/") ? base : `/${base}`);
  const localizedBase = lang === "en" ? `${EN_PREFIX}${normalizedBase === "/" ? "" : normalizedBase}` : normalizedBase;
  const queryPart = query ? `?${query}` : "";
  const hashPart = hash ? `#${hash}` : "";

  return `${localizedBase || "/"}${queryPart}${hashPart}`;
}

export function switchLanguagePath(pathname: string, search: string, hash: string, lang: Lang): string {
  const base = stripLanguagePrefix(pathname);
  return localizePath(`${base}${search}${hash}`, lang);
}
