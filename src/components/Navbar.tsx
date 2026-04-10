import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ lang, setLang }) => {
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuData = {
    ar: {
      brand: "البرنامج العربي للحلال",
      links: [
        { name: "عن البرنامج", id: "about" },
        { name: "المواصفات القياسية", id: "standards" },
        { name: "طلب الاعتماد", id: "join" },
        { name: "سجل المعتمدين", id: "directory" },
        { name: "اتصل بنا", id: "contact" }
      ],
      mega: {
        sectors: { title: "القطاعات ذات الأولوية", items: ["اللحوم ومنتجات الدواجن", "الصناعات الدوائية", "مستحضرات التجميل", "السياحة الحلال"] },
        resources: { title: "الموارد التقنية", items: ["ISO/IEC 17000", "دليل استخدام العلامة", "نماذج طلب الشهادة"] },
        featured: { 
          title: "الوثائق التقنية", 
          desc: "الوصول إلى أطر الامتثال ISO/IEC والمواصفات العربية الموحدة لتنظيم الحلال.", 
          btn: "تحميل السجل الكامل" 
        }
      },
      searchPlaceholder: "ابحث برقم الترخيص أو الشركة...",
    },
    en: {
      brand: "ARAB HALAL PROGRAM",
      links: [
        { name: "About", id: "about" },
        { name: "Standards", id: "standards" },
        { name: "Accreditation", id: "join" },
        { name: "Directory", id: "directory" },
        { name: "Contact", id: "contact" }
      ],
      mega: {
        sectors: { title: "Priority Sectors", items: ["Meat & Poultry", "Pharmaceuticals", "Cosmetics", "Halal Tourism"] },
        resources: { title: "Technical Resources", items: ["ISO/IEC 17000", "Brand Usage Guide", "Certification Forms"] },
        featured: { 
          title: "Technical Documents", 
          desc: "Access ISO/IEC compliance frameworks and Arab unified standards.", 
          btn: "Download Registry" 
        }
      },
      searchPlaceholder: "Search by license or company...",
    }
  };

  const d = menuData[lang];
  const isRtl = lang === "ar";

  const languages = [
    { name: "العربية", code: "ar" },
    { name: "الإنجليزية", code: "en" }
  ];

  const selectLanguage = (code) => {
    setLang(code);
    setIsLangOpen(false);
    setMegaMenuOpen(false);
  };

  return (
    <nav 
      className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300"
      dir={isRtl ? "rtl" : "ltr"}
      onMouseLeave={() => {
        setMegaMenuOpen(false);
        setIsLangOpen(false);
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand / Logo Area */}
        <div className="flex items-center gap-5 z-10">
          <img 
            src="/aidsmo.png" 
            alt="AIDSMO Logo" 
            className="h-10 w-auto object-contain"
          />
          <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
          <span className="block text-lg font-black tracking-tight text-emerald-900 leading-none cursor-pointer">
            {d.brand}
          </span>
        </div>

        {/* Main Navigation Links */}
        <div className="hidden lg:flex items-center h-full">
          <ul className="flex items-center gap-8 h-full">
            {d.links.map((link, i) => (
              <li key={i} className="h-full flex items-center">
                <button 
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  className="relative text-[11px] font-bold text-slate-600 hover:text-emerald-700 transition-colors uppercase tracking-wider h-full flex items-center group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Actions (Search & Lang) */}
        <div className="flex items-center gap-3 lg:gap-4 z-10">
          
          {/* Animated Search Bar */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  type="text"
                  placeholder={d.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`absolute ${isRtl ? 'left-10' : 'right-10'} h-9 px-4 text-sm bg-slate-100 border-none outline-none rounded-full text-slate-800 placeholder-slate-400`}
                />
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-600 hover:text-emerald-700 transition-colors z-10 rounded-full hover:bg-slate-100"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          {/* Language Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 text-slate-600 hover:text-emerald-700 transition-colors rounded-full hover:bg-slate-100 flex items-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute top-full mt-2 ${isRtl ? 'left-0' : 'right-0'} w-32 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50`}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => selectLanguage(l.code)}
                      className={`w-full px-4 py-2 text-sm text-right flex items-center justify-between hover:bg-slate-50 transition-colors ${lang === l.code ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}
                      dir={l.code === 'ar' ? 'rtl' : 'ltr'}
                    >
                      {l.name}
                      {lang === l.code && <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>

      {/* Animated Mega Menu */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-10">
              
              {/* Column 1: Sectors */}
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">
                  {d.mega.sectors.title}
                </h4>
                <ul className="space-y-3">
                  {d.mega.sectors.items.map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-slate-700 hover:text-emerald-700 text-sm font-bold transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Resources */}
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">
                  {d.mega.resources.title}
                </h4>
                <ul className="space-y-3">
                  {d.mega.resources.items.map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-slate-700 hover:text-emerald-700 text-sm font-bold transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 & 4: Featured Block */}
              <div className="md:col-span-2 bg-emerald-900 rounded-xl p-8 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-800 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <h4 className="font-bold text-white text-2xl mb-2">{d.mega.featured.title}</h4>
                  <p className="text-emerald-100/70 text-sm leading-relaxed max-w-sm">
                    {d.mega.featured.desc}
                  </p>
                </div>
                
                <button className="relative z-10 mt-6 self-start text-[10px] font-black text-emerald-900 bg-white px-5 py-3 rounded-md hover:bg-slate-100 transition-colors uppercase tracking-widest">
                  {d.mega.featured.btn}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;