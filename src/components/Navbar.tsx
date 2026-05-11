"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type Lang = "ar" | "en";

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

interface MegaLink {
  text: string;
  href: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface MenuContent {
  links: { name: string; href: string; isExternal?: boolean }[];
  mega: {
    links: { title: string; items: MegaLink[] };
    faq: { title: string; items: FaqItem[] };
    contact: { title: string; desc: string; email: string; btn: string };
  };
  searchPlaceholder: string;
  searchModalTitle: string;
  searchSuggestions: string[];
  menuBtn: string;
}

const menuData: Record<Lang, MenuContent> = {
  ar: {
    links: [
      { name: "عن البرنامج", href: "/about-us" },
      { name: "التحقق من شهادة", href: "/#standards" },
      { name: "الانضمام للبرنامج", href: "/#join" },
      { name: "النماذج والوثائق", href: "/#directory" },
    ],
    mega: {
      links: {
        title: "روابط هامة",
        items: [
          { text: "آلية الانضمام للبرنامج", href: "#" },
          { text: "تكاليف الحصول على الشهادة", href: "#" },
          { text: "شروط استخدام العلامة", href: "#" },
          { text: "محرك البحث والتحقق", href: "#" }
        ]
      },
      faq: {
        title: "أسئلة شائعة",
        items: [
          { q: "من يحق له الانضمام؟", a: "جهات التعيين الحكومية في الدول العربية." },
          { q: "ما هي مدة صلاحية الترخيص؟", a: "ثلاث سنوات مع إمكانية التجديد." }
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
      { name: "About Us", href: "/about-us" },
      { name: "Verification", href: "/#standards" },
      { name: "Accreditation", href: "/#join" },
      { name: "Directory", href: "/#directory" },
    ],
    mega: {
      links: {
        title: "Important Links",
        items: [
          { text: "How to Join", href: "#" },
          { text: "Certification Costs", href: "#" },
          { text: "Label Usage Terms", href: "#" },
          { text: "Verification Engine", href: "#" }
        ]
      },
      faq: {
        title: "FAQ",
        items: [
          { q: "Who can join?", a: "Governmental accreditation bodies in Arab countries." },
          { q: "License validity?", a: "Three years, subject to renewal." }
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

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  const d = menuData[lang];
  const isRtl = lang === "ar";

  const languages: { name: string; code: Lang }[] = [
    { name: "عربي", code: "ar" },
    { name: "إنجليزي", code: "en" }
  ];

  // Snappy, clean animation curve
  const customEase: [number, number, number, number] = [0.25, 1, 0.5, 1];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-40 transition-all duration-300 bg-white ${
          scrolled 
            ? "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border-b border-stone-100 py-0" 
            : "border-b-2 border-[#007A55]/10 py-2"
        }`}
        dir={(isRtl ? "rtl" : "ltr") as "rtl" | "ltr"}
        onMouseLeave={() => {
          setMegaMenuOpen(false);
          setIsLangOpen(false);
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo & Desktop Links Grouped to fix spacing */}
          <div className="flex items-center gap-10 lg:gap-14 h-full z-20">
            <Link to="/">
              <img 
                src="/logo.svg" 
                alt="Logo" 
                className="h-19 w-auto object-contain shrink-0"
              />
            </Link>

            {/* Desktop Links */}
            <div 
              className="hidden lg:flex items-center h-full"
              onMouseEnter={() => setMegaMenuOpen(true)}
            >
              <ul className="flex items-center gap-1.5 h-full">
                {d.links.map((link, i) => (
                  <li key={i} className="h-full flex items-center">
                    <Link 
                      to={link.href}
                      className="relative px-5 py-2.5 rounded-xl text-[12px] font-bold text-stone-600 hover:text-white hover:bg-[#007A55] transition-all duration-300 uppercase tracking-widest cursor-pointer whitespace-nowrap"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 z-20 shrink-0">
            
            {/* Search Placeholder Button (Triggers Modal - ⌘K removed) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-3 px-5 py-3 bg-stone-50 border border-stone-200 text-stone-500 rounded-xl hover:bg-stone-100 hover:border-stone-300 transition-all group"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-[#007A55] transition-colors">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="text-xs font-bold tracking-wide w-36 text-start opacity-70 group-hover:opacity-100 transition-opacity">
                {d.searchPlaceholder}
              </span>
            </button>

            {/* Mobile Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="sm:hidden p-3 bg-stone-50 text-stone-600 rounded-xl hover:bg-stone-100 hover:text-[#007A55] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Language Switcher (Displays AR/EN) */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`w-16 h-[46px] transition-colors rounded-xl flex items-center justify-center gap-1.5 font-bold text-[12px] tracking-wider ${isLangOpen ? 'bg-[#004D36] text-white' : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-[#004D36]'}`}
              >
                {lang.toUpperCase()}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isLangOpen ? "rotate-180 transition-transform" : "transition-transform"}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: customEase }}
                    className={`absolute top-full mt-3 ${isRtl ? 'left-0' : 'right-0'} w-36 bg-white rounded-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] border-2 border-stone-100 p-2 overflow-hidden`}
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                        className={`w-full px-4 py-3 text-sm flex items-center justify-between rounded-lg transition-all duration-200 ${lang === l.code ? 'bg-[#007A55] text-white font-black' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900 font-bold'}`}
                      >
                        {l.name}
                        {lang === l.code && <span className="w-2 h-2 bg-white rounded-full"></span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-3 bg-stone-50 text-stone-800 rounded-xl hover:bg-stone-100 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: customEase }}
              className="absolute top-full left-0 w-full bg-white border-b-4 border-[#007A55] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 p-12">
                
                {/* Links */}
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b-2 border-stone-100 pb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#EEB422]/20 flex items-center justify-center text-[#EEB422]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    </div>
                    <h4 className="text-[14px] font-black text-stone-800 uppercase tracking-widest">
                      {d.mega.links.title}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    {d.mega.links.items.map((item, i) => (
                      <li key={i}>
                        <a href={item.href} className="flex items-center gap-3 text-stone-500 hover:text-[#007A55] hover:bg-[#007A55]/5 p-2 rounded-lg text-[14px] font-bold transition-all group">
                          <span className="w-1.5 h-1.5 rounded-sm bg-stone-300 group-hover:bg-[#007A55] transition-colors"></span>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQ */}
                <div>
                  <div className="flex items-center gap-3 mb-6 border-b-2 border-stone-100 pb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#007A55]/10 flex items-center justify-center text-[#007A55]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                    <h4 className="text-[14px] font-black text-stone-800 uppercase tracking-widest">
                      {d.mega.faq.title}
                    </h4>
                  </div>
                  <div className="space-y-6">
                    {d.mega.faq.items.map((item, i) => (
                      <div key={i} className="group cursor-default bg-stone-50 p-4 rounded-xl hover:bg-[#007A55] hover:shadow-lg transition-all duration-300">
                        <h5 className="text-[13px] font-black text-stone-800 group-hover:text-white transition-colors mb-2">
                          {item.q}
                        </h5>
                        <p className="text-[12px] font-medium text-stone-500 group-hover:text-white/80 leading-relaxed transition-colors">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Card */}
                <div className="md:col-span-2 relative rounded-2xl p-10 flex flex-col justify-center overflow-hidden group border border-stone-100">
                  {/* Background Image & Overlay */}
                  <div className="absolute inset-0 bg-slate-900">
                    <img 
                      src="/header-nav.png" 
                      alt="Contact Background"
                      className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    {/* Brand gradient overlay for depth and legibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#004D36]/95 via-[#004D36]/60 to-transparent" />
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className="font-black text-white text-3xl mb-4">{d.mega.contact.title}</h4>
                    <p className="text-white/80 text-base font-medium leading-relaxed max-w-md">
                      {d.mega.contact.desc}
                    </p>
                  </div>
                  
                  <a 
                    href={`mailto:${d.mega.contact.email}`}
                    className="relative z-10 mt-8 self-start bg-white text-[#004D36] px-8 py-4 rounded-xl font-black text-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                  >
                    {d.mega.contact.btn}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </a>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- STYLISH SEARCH OVERLAY (Command Palette) --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4" dir={(isRtl ? "rtl" : "ltr") as "rtl" | "ltr"}>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: customEase }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-stone-200 overflow-hidden flex flex-col"
            >
              {/* Input Area */}
              <div className="flex items-center px-6 py-5 border-b border-stone-100 bg-white">
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
                  className="flex-1 px-5 text-xl font-bold bg-transparent outline-none text-stone-800 placeholder-stone-300"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-lg text-xs font-black tracking-widest transition-colors uppercase"
                >
                  ESC
                </button>
              </div>

              {/* Suggestions / Results Area */}
              <div className="p-6 bg-stone-50/50">
                <h5 className="text-[11px] font-black text-stone-400 uppercase tracking-widest mb-4">
                  {d.searchModalTitle}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {d.searchSuggestions.map((suggestion, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setSearchQuery(suggestion)}
                      className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-600 hover:text-[#007A55] hover:border-[#007A55] hover:shadow-md transition-all"
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

      {/* --- MOBILE FULLSCREEN MENU (Solid Design) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? "-100%" : "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: isRtl ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-stone-50 lg:hidden flex flex-col"
            dir={(isRtl ? "rtl" : "ltr") as "rtl" | "ltr"}
          >
            {/* Mobile Header */}
            <div className="h-24 px-6 flex items-center justify-between bg-white border-b-2 border-stone-200">
              <img src="/logo.svg" alt="Logo" className="h-12 w-auto object-contain" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-stone-100 text-stone-800 rounded-xl hover:bg-stone-200 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 overflow-y-auto px-6 py-10">
              <ul className="space-y-4">
                {d.links.map((link, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, ease: customEase }}
                  >
                    <Link 
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="bg-white p-6 rounded-2xl text-xl font-black text-stone-800 hover:text-white hover:bg-[#007A55] transition-colors block border border-stone-100 shadow-sm flex justify-between items-center"
                    >
                      {link.name}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={isRtl ? "rotate-180" : ""}>
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile Language Switcher */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.4 }}
                className="mt-10 bg-white p-2 rounded-2xl border border-stone-200 flex"
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setIsMobileMenuOpen(false); }}
                    className={`flex-1 py-4 rounded-xl text-sm font-black transition-all ${lang === l.code ? 'bg-[#004D36] text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
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