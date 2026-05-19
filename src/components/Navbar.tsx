"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type Lang = "ar" | "en";

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Solid, pronounced shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        { name: "عن البرنامج", path: "/about-us" },
        { name: "الدول المنضمة", path: "/joined-countries" },
        { name: "التحقق من شهادة", path: "/certificate-verification" },  
        { name: "الانضمام للبرنامج", path: "/join-program" },
        { name: "النماذج والوثائق", path: "/documents" },
      ],
      mega: {
        links: {
          title: "روابط هامة",
          items: [
            { text: "الدول المنضمة للبرنامج", href: "/joined-countries" },
            { text: "آلية الانضمام للبرنامج", href: "/join-program" },
            { text: "تكاليف الحصول على الشهادة", href: "/join-program" },
            { text: "شروط استخدام العلامة", href: "/documents" },  
            { text: "محرك البحث والتحقق", href: "/certificate-verification" }
          ]
        },
        faq: {
          title: "أسئلة شائعة",
          items: [
            { q: "من يحق له الانضمام؟", a: "جهات التعيين الحكومية في الدول العربية." },
            { q: "ما هي مدة صلاحية الترخيص؟", a: "ثلاث سنوات مع إمكانية التجديد." },
            { q: "كيف يتم التحقق من الشهادة؟", a: "عن طريق مسح رمز الاستجابة السريعة أو إدخال رقم الشهادة في محرك البحث." }
          ]
        },
        contact: {
          title: "تواصل معنا",
          desc: "لأي استفسارات إضافية تتعلق بعمليات الحصول على الشهادة، يرجى التواصل معنا.",
          email: "halal@aidsmo.org",
          btn: "إرسال رسالة"
        }
      },
      searchPlaceholder: "ابحث في البرنامج...",
      searchModalTitle: "البحث السريع",
      searchSuggestions: ["كيفية الانضمام", "التراخيص", "الوثائق المطلوبة"],
      menuBtn: "القائمة"
    },
    en: {
      links: [
        { name: "About", path: "/about-us" },
        { name: "Joined Countries", path: "/joined-countries" },
        { name: "Verification", path: "/certificate-verification" },
        { name: "Accreditation", path: "/join-program" },
        { name: "Directory", path: "/documents" },
      ],
      mega: {
        links: {
          title: "Important Links",
          items: [
            { text: "Joined Countries", href: "/joined-countries" },
            { text: "How to Join", href: "/join-program" },
            { text: "Certification Costs", href: "/join-program" },
            { text: "Label Usage Terms", href: "/documents" },
            { text: "Verification Engine", href: "/certificate-verification" }        
          ]        },
        faq: {
          title: "FAQ",
          items: [
            { q: "Who can join?", a: "Governmental accreditation bodies in Arab countries." },
            { q: "License validity?", a: "Three years, subject to renewal." },
            { q: "How to verify a certificate?", a: "By scanning the QR code or entering the certificate number in the search engine." }
          ]
        },
        contact: {
          title: "Contact Us",
          desc: "For any additional inquiries regarding certification, please contact us.",
          email: "halal@aidsmo.org",
          btn: "Send Message"
        }
      },
      searchPlaceholder: "Search program...",
      searchModalTitle: "Quick Search",
      searchSuggestions: ["How to join", "Licenses", "Required Documents"],
      menuBtn: "Menu"
    }
  };

  const d = menuData[lang];
  const isRtl = lang === "ar";

  const languages: { name: string; code: Lang }[] = [
    { name: "عربي", code: "ar" },
    { name: "إنجليزي", code: "en" }
  ];

  const customEase = [0.175, 0.885, 0.32, 1.275]; // Mechanical easing

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
          setMegaMenuOpen(false);
          setIsLangOpen(false);
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 lg:h-20 flex items-center justify-between">
          
          {/* Logo & Desktop Links Grouped to fix spacing */}
          <div className="flex items-center gap-6 xl:gap-14 h-full z-40">
            {/* BIG ROUND LOGO - Scaled for different screens */}
            <Link to="/" className="relative group">
               <div className="absolute top-[-5px] lg:top-[-10px] left-1/2 -translate-x-1/2 w-20 h-20 lg:w-24 xl:w-28 lg:h-24 xl:h-28 bg-white rounded-full shadow-[var(--shadow-ind-floating)] border border-stone-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95 z-99 overflow-hidden">
                  <div className="absolute inset-0 bg-stone-50/50 ind-recessed rounded-full m-1"></div>
                  <img 
                    src="/logo.svg" 
                    alt="Logo" 
                    className="relative z-99 w-14 lg:w-16 xl:w-20 h-auto object-contain shrink-0"
                  />
               </div>
            </Link>

            {/* Desktop Links (Tactile tags) - Added margin to account for the big logo */}
            <div 
              className={`hidden lg:flex items-center h-full ${isRtl ? 'mr-20 xl:mr-32' : 'ml-20 xl:ml-32'}`}
              onMouseEnter={() => setMegaMenuOpen(true)}
            >
              <ul className="flex items-center gap-1 h-full">
                {d.links.map((link, i) => (
                  <li key={i} className="h-full flex items-center">
                    {link.path.startsWith("/#") ? (
                      <a 
                        href={link.path}
                        className="relative px-3 xl:px-5 py-2 rounded-md text-[11px] xl:text-[13px] font-bold text-stone-600 hover:text-[#007A55] transition-all duration-150 uppercase tracking-widest cursor-pointer whitespace-nowrap active:translate-y-[1px] hover:shadow-[var(--shadow-ind-sharp)] bg-white/50"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        to={link.path}
                        className="relative px-3 xl:px-5 py-2 rounded-md text-[11px] xl:text-[13px] font-bold text-stone-600 hover:text-[#007A55] transition-all duration-150 uppercase tracking-widest cursor-pointer whitespace-nowrap active:translate-y-[1px] hover:shadow-[var(--shadow-ind-sharp)] bg-white/50"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 z-20 shrink-0">
            
            {/* Search Placeholder Button (Recessed Well) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-3 px-5 py-2.5 ind-recessed group cursor-text"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400 group-hover:text-[#007A55] transition-colors">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="text-xs font-bold tracking-wide w-36 text-start text-stone-400 font-mono uppercase">
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

            {/* Language Switcher (Physical Toggle) */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`w-16 h-[42px] transition-all rounded-md flex items-center justify-center gap-1.5 font-bold text-[12px] tracking-wider border ${isLangOpen ? 'shadow-[var(--shadow-ind-pressed)] bg-stone-100 text-[#007A55] border-transparent translate-y-[1px]' : 'bg-white text-stone-600 shadow-[var(--shadow-ind-card)] hover:shadow-[var(--shadow-ind-floating)] border-white/40 hover:-translate-y-[1px]'}`}
              >
                {lang.toUpperCase()}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isLangOpen ? "rotate-180 transition-transform" : "transition-transform"}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: customEase }}
                    className={`absolute top-full mt-3 ${isRtl ? 'left-0' : 'right-0'} w-36 bg-[#FAF9F6] rounded-lg shadow-[var(--shadow-ind-floating)] border border-stone-200 p-2 overflow-hidden z-50`}
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                        className={`w-full px-4 py-2.5 text-sm flex items-center justify-between rounded transition-all duration-150 active:translate-y-[1px] active:shadow-[var(--shadow-ind-pressed)] ${lang === l.code ? 'bg-[#007A55] text-white shadow-[var(--shadow-ind-floating)] font-black' : 'text-stone-600 bg-white shadow-[var(--shadow-ind-card)] hover:-translate-y-[1px] hover:shadow-[var(--shadow-ind-floating)] font-bold mb-2 last:mb-0'}`}
                      >
                        {l.name}
                        {lang === l.code && <div className="w-2 h-2 bg-white rounded-full shadow-[var(--shadow-ind-glow-primary)]"></div>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
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

        {/* Desktop Mega Menu (Bolted Module) */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: customEase }}
              className="absolute top-full left-0 w-full bg-[#FAF9F6] border-y border-stone-300 shadow-[var(--shadow-ind-floating)] z-30"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 p-12 relative">
                {/* Structural Screws */}
                <div className="absolute top-6 left-6 w-3 h-3 rounded-full bg-gradient-to-br from-stone-300 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]"></div>
                <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-gradient-to-br from-stone-300 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]"></div>
                <div className="absolute bottom-6 left-6 w-3 h-3 rounded-full bg-gradient-to-br from-stone-300 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]"></div>
                <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-gradient-to-br from-stone-300 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]"></div>

                {/* Links */}
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-stone-300 pb-4 shadow-[0_1px_0_rgba(255,255,255,1)]">
                    <div className="w-8 h-8 rounded-full bg-[#CA8A04] shadow-[var(--shadow-ind-floating)] flex items-center justify-center text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    </div>
                    <h4 className="text-[14px] font-black text-stone-800 uppercase tracking-widest">
                      {d.mega.links.title}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {d.mega.links.items.map((item, i) => (
                      <li key={i}>
                        {item.href.startsWith("/#") || item.href.startsWith("http") ? (
                          <a href={item.href} className="flex items-center gap-3 text-stone-600 hover:text-[#007A55] bg-white shadow-[var(--shadow-ind-card)] hover:shadow-[var(--shadow-ind-floating)] hover:-translate-y-[1px] active:translate-y-[1px] active:shadow-[var(--shadow-ind-pressed)] p-3 rounded-md text-[13px] font-bold transition-all group">
                            <span className="w-2 h-2 rounded-full bg-stone-300 group-hover:bg-[#007A55] shadow-inner transition-colors"></span>
                            {item.text}
                          </a>
                        ) : (
                          <Link to={item.href} className="flex items-center gap-3 text-stone-600 hover:text-[#007A55] bg-white shadow-[var(--shadow-ind-card)] hover:shadow-[var(--shadow-ind-floating)] hover:-translate-y-[1px] active:translate-y-[1px] active:shadow-[var(--shadow-ind-pressed)] p-3 rounded-md text-[13px] font-bold transition-all group">
                            <span className="w-2 h-2 rounded-full bg-stone-300 group-hover:bg-[#007A55] shadow-inner transition-colors"></span>
                            {item.text}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQ */}
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b border-stone-300 pb-4 shadow-[0_1px_0_rgba(255,255,255,1)]">
                    <div className="w-8 h-8 rounded-full bg-[#007A55] shadow-[var(--shadow-ind-floating)] flex items-center justify-center text-white">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                    <h4 className="text-[14px] font-black text-stone-800 uppercase tracking-widest">
                      {d.mega.faq.title}
                    </h4>
                  </div>
                  <div className="space-y-4">
                    {d.mega.faq.items.map((item, i) => (
                      <div key={i} className="group cursor-default bg-white p-4 rounded-md shadow-[var(--shadow-ind-card)] hover:shadow-[var(--shadow-ind-floating)] hover:-translate-y-[1px] transition-all duration-300 border border-stone-100">
                        <h5 className="text-[13px] font-black text-[#007A55] mb-2 font-mono">
                          {item.q}
                        </h5>
                        <p className="text-[12px] font-medium text-stone-600 leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Card (Panel Style with Background Image) */}
             <div 
                className="md:col-span-2 rounded-xl p-8 flex flex-col justify-center relative overflow-hidden group border border-stone-300 shadow-[var(--shadow-ind-floating)]"
              >
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                  <img src="/header-nav.png" alt="Contact Background" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-[#004D36]/80 mix-blend-multiply"></div>
                </div>

                {/* Scanline overlay for screen effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
                
                {/* Tech noise */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay z-0" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

                <div className="relative z-20 flex items-start gap-4">
                  <div className="w-3 h-3 mt-2 rounded-full bg-[#CA8A04] shadow-[var(--shadow-ind-glow-gold)] animate-pulse shrink-0"></div>
                  <div>
                    <h4 className="font-mono font-black text-white text-2xl mb-3 uppercase tracking-widest drop-shadow-md">
                      {d.mega.contact.title}
                    </h4>

                    <p className="text-white/80 text-sm font-medium leading-relaxed max-w-md mb-8 drop-shadow-sm">
                      {d.mega.contact.desc}
                    </p>
                    
                    <a 
                      href={`mailto:${d.mega.contact.email}`}
                      className="inline-flex btn-primary !bg-white !text-[#007A55] hover:!bg-[#CA8A04] hover:!text-white border-none shadow-[var(--shadow-ind-floating)]"
                    >
                      {d.mega.contact.btn}
                    </a>
                  </div>
                </div>
              </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: customEase }}
              className="relative w-full max-w-2xl bg-[#FAF9F6] rounded-xl shadow-[var(--shadow-ind-floating)] border border-stone-300 overflow-hidden flex flex-col"
            >
              {/* Input Area (Deep Recess) */}
              <div className="flex items-center px-6 py-5 bg-stone-100 ind-recessed rounded-none border-b border-stone-300 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.05)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#007A55]">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                  type="text" 
                  autoFocus
                  placeholder={d.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-5 text-lg font-mono font-bold bg-transparent outline-none text-stone-800 placeholder-stone-400 focus-visible:shadow-none"
                />
                <button 
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
              </div>
            </motion.div>
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
                <img src="/logo.svg" alt="Logo" className="h-12 w-auto object-contain" />
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