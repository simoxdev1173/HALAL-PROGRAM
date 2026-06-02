"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

type Lang = "ar" | "en";
type NavLink = {
  name: string;
  path: string;
  children?: { text: string; href: string }[];
};

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Solid, pronounced shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    const params = new URLSearchParams();

    if (query) {
      params.set("type", "license");
      params.set("q", query);
    }

    setIsSearchOpen(false);
    navigate(`/certificate-verification${query ? `?${params.toString()}` : ""}`);
  };

  const goToCertificateVerification = () => {
    setIsSearchOpen(false);
    navigate("/certificate-verification");
  };

  // Keyboard shortcut to close search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const menuData = {
    ar: {
      links: [
        {
          name: "عن البرنامج",
          path: "/about-us",
          children: [
            { text: "التعريف", href: "/program-definition" },
            { text: "الأهداف", href: "/program-goals" },
            { text: "مجال التطبيق", href: "/program-scope" },
          ],
        },
        {
          name: "الانضمام للبرنامج",
          path: "/join-program",
          children: [
            { text: "شروط الانضمام", href: "/join-program" },
            { text: "الدول المنضمة", href: "/joined-countries" },
            { text: "الجهات المعنية بقطاع الحلال في الدول العربية", href: "/halal-sector-authorities" },
          ],
        },
        { name: "شهادة وعلامة حلال", path: "/#" },
      ],
      mega: {
        links: {
          title: "روابط هامة",
          items: [
            { text: "التعريف بالبرنامج", href: "/program-definition" },
            { text: "شروط الانضمام", href: "/join-program" },
            { text: "الدول المنضمة", href: "/joined-countries" },
            { text: "شهادة وعلامة حلال", href: "/#" },
            { text: "محرك البحث والتحقق", href: "/certificate-verification" }
          ]
        },
        faq: {
          title: "أسئلة شائعة",
          items: [
            { q: "من يحق له الانضمام؟", a: "جهات التعيين الحكومية في الدول العربية." },
            { q: "كيف أصل للتحقق من الشهادة؟", a: "من شريط البحث في أعلى الصفحة أو بإدخال رقم الشهادة في محرك البحث." },
            { q: "أين توجد وثائق الشهادة والعلامة؟", a: "ضمن مدخل شهادة وعلامة حلال في شريط التنقل." }
          ]
        },
        contact: {
          title: "تواصل معنا",
          desc: "لأي استفسارات إضافية تتعلق بالبرنامج أو الشهادة والعلامة، يرجى التواصل معنا.",
          email: "halal@aidsmo.org",
          btn: "إرسال رسالة"
        }
      },
      searchPlaceholder: "تحقق من شهادة أو ابحث في البرنامج...",
      searchModalTitle: "البحث والتحقق",
      searchAction: "التحقق من شهادة حلال",
      searchInputLabel: "رقم شهادة الحلال أو عبارة البحث",
      searchSuggestions: ["شروط الانضمام", "الدول المنضمة", "شهادة وعلامة حلال", "الجهات المعنية بقطاع الحلال"],
      menuBtn: "القائمة"
    },
    en: {
      links: [
        {
          name: "About Program",
          path: "/about-us",
          children: [
            { text: "Definition", href: "/program-definition" },
            { text: "Objectives", href: "/program-goals" },
            { text: "Scope of Application", href: "/program-scope" },
          ],
        },
        {
          name: "Join Program",
          path: "/join-program",
          children: [
            { text: "Joining Requirements", href: "/join-program" },
            { text: "Joined Countries", href: "/joined-countries" },
            { text: "Halal Sector Authorities in Arab Countries", href: "/halal-sector-authorities" },
          ],
        },
        { name: "Halal Certificate & Mark", path: "/#" },
      ],
      mega: {
        links: {
          title: "Important Links",
          items: [
            { text: "Program Definition", href: "/program-definition" },
            { text: "Joining Requirements", href: "/join-program" },
            { text: "Joined Countries", href: "/joined-countries" },
            { text: "Halal Certificate & Mark", href: "/#" },
            { text: "Verification Engine", href: "/certificate-verification" }
          ]        },
        faq: {
          title: "FAQ",
          items: [
            { q: "Who can join?", a: "Governmental accreditation bodies in Arab countries." },
            { q: "How do I verify a certificate?", a: "Use the search bar or enter the certificate number in the verification engine." },
            { q: "Where are certificate and mark #?", a: "Open Halal Certificate & Mark from the top navigation." }
          ]
        },
        contact: {
          title: "Contact Us",
          desc: "For any additional inquiries regarding the program, certificate, or mark, please contact us.",
          email: "halal@aidsmo.org",
          btn: "Send Message"
        }
      },
      searchPlaceholder: "Verify a certificate or search the program...",
      searchModalTitle: "Search & Verification",
      searchAction: "Verify Halal Certificate",
      searchInputLabel: "Halal certificate number or search query",
      searchSuggestions: ["Joining Requirements", "Joined Countries", "Halal Certificate & Mark", "Halal Sector Authorities"],
      menuBtn: "Menu"
    }
  };

  void menuData;
  const navLanguages = t("nav.languages", { returnObjects: true }) as Record<Lang, string>;
  const d = {
    links: t("nav.links", { returnObjects: true }) as NavLink[],
    searchPlaceholder: t("nav.searchPlaceholder"),
    searchModalTitle: t("nav.searchModalTitle"),
    searchAction: t("nav.searchAction"),
    searchInputLabel: t("nav.searchInputLabel"),
    searchSuggestions: t("nav.searchSuggestions", { returnObjects: true }) as string[],
    menuBtn: t("nav.menuBtn"),
  };
  const isRtl = lang === "ar";

  const languages: { name: string; code: Lang }[] = [
    { name: navLanguages.ar, code: "ar" },
    { name: navLanguages.en, code: "en" }
  ];
  const switchLanguage = () => {
    setLang(lang === "ar" ? "en" : "ar");
  };

  const customEase: [number, number, number, number] = [0.175, 0.885, 0.32, 1.275]; // Mechanical easing

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-40 transition-all duration-300 bg-[#FAF9F6] ${
          scrolled 
            ? "shadow-[var(--shadow-ind-floating)] border-b border-stone-200" 
            : "border-b border-stone-200 shadow-[var(--shadow-ind-card)]"
        }`}
        dir={isRtl ? "rtl" : "ltr"}
        onMouseLeave={() => {
          setActiveDropdown(null);
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 lg:h-24 flex items-center gap-3 xl:gap-4">
          
          {/* Logo Zone */}
          <div className="relative flex h-full w-24 sm:w-28 lg:w-32 xl:w-36 shrink-0 items-center z-40">
            {/* BIG ROUND LOGO - Scaled for different screens */}
            <Link to="/" className="relative group block h-full w-full" aria-label="Arab Halal Program home">
               <div className="absolute top-[4px] lg:top-[6px] xl:top-[4px] left-1/2 -translate-x-1/2 w-24 h-24 lg:w-30 xl:w-34 lg:h-30 xl:h-34 bg-white rounded-full shadow-[var(--shadow-ind-floating)] border border-stone-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95 z-40 overflow-hidden">
                  <div className="absolute inset-0 bg-stone-50/50 ind-recessed rounded-full m-1"></div>
                  <img 
                    src="/logo.svg" 
                    alt="Logo" 
                    className="relative z-40 w-16 lg:w-24 xl:w-28 h-auto object-contain shrink-0"
                  />
               </div>
            </Link>
          </div>

          {/* Centered Desktop Links Zone */}
          <div className="hidden lg:flex flex-1 items-center justify-center h-full min-w-0 px-1 xl:px-3">
            <ul className="flex min-w-0 items-center justify-center gap-1 h-full">
              {d.links.map((link, i) => (
                <li
                  key={i}
                  className="relative h-full flex min-w-0 items-center"
                  onMouseEnter={() => setActiveDropdown(link.children ? link.name : null)}
                >
                  {link.path.startsWith("/#") ? (
                    <a 
                      href={link.path}
                      className="relative px-2.5 xl:px-3.5 py-2 rounded-md text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold text-stone-600 hover:text-[#007A55] transition-all duration-150 uppercase tracking-wider cursor-pointer whitespace-nowrap active:translate-y-[1px] hover:shadow-[var(--shadow-ind-sharp)] bg-white/50 flex items-center gap-1.5"
                    >
                      {link.name}
                      {link.children && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={activeDropdown === link.name ? "rotate-180 transition-transform" : "transition-transform"}>
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      )}
                    </a>
                  ) : (
                    <Link 
                      to={link.path}
                      className="relative px-2.5 xl:px-3.5 py-2 rounded-md text-[10px] xl:text-[11px] 2xl:text-[12px] font-bold text-stone-600 hover:text-[#007A55] transition-all duration-150 uppercase tracking-wider cursor-pointer whitespace-nowrap active:translate-y-[1px] hover:shadow-[var(--shadow-ind-sharp)] bg-white/50 flex items-center gap-1.5"
                    >
                      {link.name}
                      {link.children && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={activeDropdown === link.name ? "rotate-180 transition-transform" : "transition-transform"}>
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      )}
                    </Link>
                  )}

                  <AnimatePresence>
                    {link.children && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: customEase }}
                        className={`absolute top-[calc(100%-12px)] ${isRtl ? "right-0" : "left-0"} w-80 rounded-xl border border-stone-200 bg-[#FAF9F6] p-2 shadow-[var(--shadow-ind-floating)] z-50`}
                      >
                        {link.children.map((item, idx) => {
                          const itemClass = "flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-[13px] font-black text-stone-700 shadow-[var(--shadow-ind-card)] hover:text-[#007A55] hover:shadow-[var(--shadow-ind-floating)] active:translate-y-[1px] active:shadow-[var(--shadow-ind-pressed)] transition-all";
                          const dot = <span className="h-2 w-2 rounded-full bg-[#CA8A04] shadow-inner" />;

                          return item.href.startsWith("/#") || item.href.startsWith("http") ? (
                            <a key={idx} href={item.href} className={itemClass}>
                              {dot}
                              {item.text}
                            </a>
                          ) : (
                            <Link key={idx} to={item.href} className={itemClass}>
                              {dot}
                              {item.text}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 xl:gap-3 z-20 shrink-0">
          
            
            {/* Search Placeholder Button (Recessed Well) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex xl:min-w-[210px] max-w-[240px] items-center gap-3 px-3 xl:px-4 py-2.5 ind-recessed group cursor-text"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 group-hover:text-[#007A55] transition-colors">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="hidden xl:block min-w-0 flex-1 truncate text-[11px] font-bold tracking-wide text-start text-stone-500 font-mono uppercase">
                {d.searchPlaceholder}
              </span>
            </button>

            {/* Mobile Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden p-3 bg-white shadow-[var(--shadow-ind-card)] text-stone-600 rounded-md active:shadow-[var(--shadow-ind-pressed)] active:translate-y-[2px] transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Language Switcher (3D Physical Toggle) */}
            <div className="relative hidden sm:block">
              <button 
                type="button"
                onClick={switchLanguage}
                aria-label={lang === "ar" ? "Switch language to English" : "تبديل اللغة إلى العربية"}
                dir="ltr"
                className="group relative h-[44px] w-[106px] overflow-hidden rounded-xl border border-stone-300 bg-stone-100 p-1 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.10),inset_-2px_-2px_4px_rgba(255,255,255,0.9),var(--shadow-ind-card)] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),var(--shadow-ind-floating)] focus-visible:ring-4 focus-visible:ring-[#CA8A04]/30"
              >
                <span className="absolute inset-x-2 top-1 h-2 rounded-full bg-white/70 shadow-[inset_0_-1px_1px_rgba(0,0,0,0.08)]" />
                <span className="relative z-10 grid h-full grid-cols-2 items-center rounded-lg text-center text-[11px] font-black tracking-widest">
                  <span className={lang === "ar" ? "text-white drop-shadow-sm" : "text-stone-700"}>AR</span>
                  <span className={lang === "en" ? "text-white drop-shadow-sm" : "text-stone-700"}>EN</span>
                </span>
                <motion.span
                  layout
                  className="absolute top-1 bottom-1 w-[48px] rounded-lg border border-[#006747]/70 bg-[linear-gradient(145deg,#009164,#006747)] shadow-[4px_5px_10px_rgba(0,0,0,0.18),inset_1px_1px_2px_rgba(255,255,255,0.35),inset_-2px_-2px_4px_rgba(0,0,0,0.24)]"
                  animate={{ x: lang === "ar" ? 0 : 50 }}
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  style={{ left: 4 }}
                >
                  <span className="absolute left-1 right-1 top-1 h-2 rounded-full bg-white/25" />
                  <span className="absolute inset-0 rounded-lg ring-1 ring-white/10" />
                </motion.span>
              </button>
            </div>
            <img
              src="/aidsmo.png"
              alt="AIDSMO"
              className="hidden 2xl:block h-14 w-auto max-w-[128px] object-contain rounded px-2 py-1"
            />
            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label={d.menuBtn}
              className="lg:hidden p-3 bg-white shadow-[var(--shadow-ind-card)] text-stone-600 rounded-md active:shadow-[var(--shadow-ind-pressed)] active:translate-y-[2px] transition-all"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

      </nav>

      {/* --- SEARCH OVERLAY (Recessed Terminal Style) --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4" dir={isRtl ? "rtl" : "ltr"}>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: customEase }}
              className="relative w-full max-w-2xl bg-[#FAF9F6] rounded-xl shadow-[var(--shadow-ind-floating)] border border-stone-300 overflow-hidden flex flex-col"
            >
              {/* Input Area (Deep Recess) */}
              <div className="flex flex-wrap items-center gap-3 px-6 py-5 bg-stone-100 ind-recessed rounded-none border-b border-stone-300 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.05)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#007A55]">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <label htmlFor="navbar-certificate-search" className="sr-only">
                  {d.searchInputLabel}
                </label>
                <input 
                  id="navbar-certificate-search"
                  type="text" 
                  autoFocus
                  placeholder={d.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="min-w-[180px] flex-1 px-5 text-lg font-mono font-bold bg-transparent outline-none text-stone-800 placeholder-stone-400 focus-visible:shadow-none"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-[#007A55] shadow-[var(--shadow-ind-card)] hover:shadow-[var(--shadow-ind-floating)] hover:-translate-y-[1px] active:translate-y-[1px] active:shadow-[var(--shadow-ind-pressed)] text-white rounded-md text-xs font-black tracking-widest transition-all border border-[#007A55]"
                >
                  {d.searchAction}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="px-4 py-2 bg-white shadow-[var(--shadow-ind-card)] hover:shadow-[var(--shadow-ind-floating)] hover:-translate-y-[1px] active:translate-y-[1px] active:shadow-[var(--shadow-ind-pressed)] text-stone-600 rounded-md text-xs font-black tracking-widest transition-all uppercase border border-stone-200"
                >
                  ESC
                </button>
              </div>

              {/* Suggestions / Results Area */}
              <div className="p-8">
                <h5 className="text-[11px] font-mono font-black text-stone-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                  {d.searchModalTitle}
                </h5>
                <div className="flex flex-wrap gap-3">
                  {d.searchSuggestions.map((suggestion, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setSearchQuery(suggestion)}
                      className="px-4 py-2 bg-white shadow-[var(--shadow-ind-card)] hover:shadow-[var(--shadow-ind-floating)] hover:-translate-y-[1px] active:translate-y-[1px] active:shadow-[var(--shadow-ind-pressed)] border border-stone-200 rounded-md text-sm font-bold text-stone-600 hover:text-[#007A55] transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={goToCertificateVerification}
                  className="mt-6 w-full rounded-lg border border-[#007A55]/20 bg-[#007A55]/5 px-5 py-4 text-sm font-black text-[#007A55] shadow-[var(--shadow-ind-card)] hover:bg-[#007A55] hover:text-white"
                >
                  {d.searchAction}
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* --- MOBILE FULLSCREEN MENU (Panel App) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? "-100%" : "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: isRtl ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#FAF9F6] lg:hidden flex flex-col"
            dir={isRtl ? "rtl" : "ltr"}
          >
            {/* Mobile Header */}
            <div className="h-20 px-6 flex items-center justify-between bg-[#FAF9F6] border-b border-stone-300 shadow-[var(--shadow-ind-card)] z-10">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center gap-3">
                  <img src="/logo.svg" alt="Logo" className="h-14 w-auto object-contain" />
                  <img src="/aidsmo.png" alt="AIDSMO" className="h-9 w-auto object-contain" />
                </div>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-white shadow-[var(--shadow-ind-card)] active:shadow-[var(--shadow-ind-pressed)] active:translate-y-[2px] border border-stone-200 text-stone-800 rounded-md transition-all"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="space-y-4">
                {d.links.map((link, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, ease: customEase }}
                  >
                    {link.path.startsWith("/#") ? (
                      <a 
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="bg-white p-5 rounded-lg text-lg font-black text-stone-700 shadow-[var(--shadow-ind-card)] active:shadow-[var(--shadow-ind-pressed)] active:translate-y-[2px] transition-all border border-stone-200 flex justify-between items-center group"
                      >
                        {link.name}
                        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center ind-recessed group-hover:bg-[#007A55] group-hover:text-white transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={isRtl ? "rotate-180" : ""}>
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                      </a>
                    ) : (
                      <Link 
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="bg-white p-5 rounded-lg text-lg font-black text-stone-700 shadow-[var(--shadow-ind-card)] active:shadow-[var(--shadow-ind-pressed)] active:translate-y-[2px] transition-all border border-stone-200 flex justify-between items-center group"
                      >
                        {link.name}
                        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center ind-recessed group-hover:bg-[#007A55] group-hover:text-white transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={isRtl ? "rotate-180" : ""}>
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                      </Link>
                    )}
                    {link.children && (
                      <div className="mt-2 grid gap-2 pr-3">
                        {link.children.map((item, idx) =>
                          item.href.startsWith("/#") || item.href.startsWith("http") ? (
                            <a
                              key={idx}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="rounded-md bg-white/70 px-4 py-3 text-sm font-bold text-stone-600 shadow-[var(--shadow-ind-card)]"
                            >
                              {item.text}
                            </a>
                          ) : (
                            <Link
                              key={idx}
                              to={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="rounded-md bg-white/70 px-4 py-3 text-sm font-bold text-stone-600 shadow-[var(--shadow-ind-card)]"
                            >
                              {item.text}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>

              {/* Mobile Language Switcher (Physical Switch) */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.4 }}
                className="mt-8 bg-stone-100 p-2 rounded-lg border border-stone-300 ind-recessed flex"
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setIsMobileMenuOpen(false); }}
                    className={`flex-1 py-3.5 rounded-md text-sm font-black transition-all ${lang === l.code ? 'bg-white text-[#007A55] shadow-[var(--shadow-ind-card)]' : 'text-stone-500 hover:text-stone-700'}`}
                  >
                    {l.name}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
