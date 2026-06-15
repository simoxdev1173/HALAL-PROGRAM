import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronsLeft, ChevronsRight, Home } from "lucide-react";

type EntryKey = "home" | "program" | "joining" | "verification" | "recognition" | "certificate" | "support";

const SECTION_IDS = ["home", "about", "scope", "join", "verify", "recognition", "directory", "standards"];

const routeByPath: Record<string, { main: EntryKey; sub: string }> = {
  "/about-us": { main: "program", sub: "about" },
  "/program-definition": { main: "program", sub: "about" },
  "/program-goals": { main: "program", sub: "goals" },
  "/program-scope": { main: "program", sub: "programScope" },
  "/joined-countries": { main: "joining", sub: "countries" },
  "/halal-sector-authorities": { main: "joining", sub: "authorities" },
  "/certificate-verification": { main: "verification", sub: "verification" },
  "/join-program": { main: "joining", sub: "join" },
  "/documents": { main: "certificate", sub: "documents" },
  "/halal-certificate": { main: "certificate", sub: "halalCertificate" },
  "/halal-mark": { main: "certificate", sub: "halalMark" },
  "/halal-certificate-mark": { main: "certificate", sub: "halalCertificate" },
};

export const FloatingBreadcrumb = () => {
  const { pathname, hash } = useLocation();
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("en") ? "en" : "ar";
  const isRtl = lang === "ar";
  const [activeSection, setActiveSection] = useState(hash.replace("#", "") || "home");
  const SeparatorIcon = isRtl ? ChevronsLeft : ChevronsRight;

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: [0.18, 0.35, 0.55] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const current = useMemo(() => {
    if (pathname === "/") {
      const subKey = activeSection === "home" ? null : activeSection;

      return {
        main: "home" as EntryKey,
        mainLabel: t("breadcrumbs.home"),
        subLabel: subKey
          ? t(`breadcrumbs.sections.${subKey}`, { defaultValue: t("breadcrumbs.current") })
          : null,
      };
    }

    const route = routeByPath[pathname] ?? { main: "home" as EntryKey, sub: "current" };

    return {
      main: route.main,
      mainLabel: t(`breadcrumbs.main.${route.main}`, { defaultValue: t("breadcrumbs.home") }),
      subLabel: t(`breadcrumbs.pages.${route.sub}`, { defaultValue: t("breadcrumbs.current") }),
    };
  }, [activeSection, pathname, t]);

  return (
    <nav
      dir={isRtl ? "rtl" : "ltr"}
      aria-label={t("breadcrumbs.ariaLabel")}
      className="pointer-events-none fixed inset-x-0 top-20 z-30 lg:top-24"
    >
      <div className="w-full border-b border-[#CA8A04]/35 border-t border-stone-200 bg-[#FAF9F6]/96 shadow-[0_16px_32px_-26px_rgba(0,0,0,0.75)] backdrop-blur-xl">
        <div className="mx-auto flex h-11 max-w-7xl items-center justify-center px-4 sm:h-12 sm:px-6">
          <div className="pointer-events-auto flex min-w-0 items-center justify-center gap-2.5 text-center">
            <Link
              to="/"
              aria-label={t("breadcrumbs.home")}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#CA8A04]/35 bg-white text-[#004D36] shadow-[var(--shadow-ind-card)] transition-colors hover:border-[#CA8A04] hover:text-[#007A55] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CA8A04]/35"
            >
              <Home size={17} aria-hidden="true" strokeWidth={2.6} />
            </Link>
            <span className="flex shrink-0 items-center text-[#CA8A04]" aria-hidden="true">
              <SeparatorIcon size={18} strokeWidth={2.35} className="drop-shadow-[0_1px_0_rgba(255,255,255,0.75)]" />
            </span>
            <span className="truncate text-[13px] font-black text-[#004D36] sm:text-sm">
              {current.mainLabel}
            </span>
            {current.subLabel && (
              <>
                <span className="flex shrink-0 items-center text-[#CA8A04]" aria-hidden="true">
                  <SeparatorIcon size={18} strokeWidth={2.35} className="drop-shadow-[0_1px_0_rgba(255,255,255,0.75)]" />
                </span>
                <span className="truncate text-[13px] font-black text-slate-900 sm:text-sm">
                  {current.subLabel}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FloatingBreadcrumb;
