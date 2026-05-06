import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Lang = "ar" | "en";

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menuData = {
    ar: {
      brand: "البرنامج العربي للحلال",
      links: [
        { name: "عن البرنامج", id: "about" },
        { name: "التحقق من شهادة / ترخيص", id: "standards" },
        { name: "الانضمام للبرنامج", id: "join" },
        { name: "النماذج والوثائق", id: "directory" },
        { name: "العلامة المعتمدة", id: "contact" }
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
            { q: "ما هي مدة صلاحية الترخيص؟", a: "ثلاث سنوات مع إمكانية التجديد." },
            { q: "كيف أتحقق من الشهادة؟", a: "عبر محرك البحث برقم الترخيص أو الشركة." }
          ]
        },
        contact: {
          title: "تواصل معنا",
          desc: "لأي استفسارات إضافية تتعلق بعمليات الحصول على الشهادة، أو التحقق أو المصادقة أو التفتيش، يرجى التواصل معنا.",
          email: "halal@aidsmo.org",
          btn: "أرسل بريداً إلكترونياً"
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
        links: {
          title: "Important Links",
          items: [
            { text: "How to Join the Program", href: "#" },
            { text: "Certification Costs", href: "#" },
            { text: "Label Usage Terms", href: "#" },
            { text: "Verification Search Engine", href: "#" }
          ]
        },
        faq: {
          title: "FAQ",
          items: [
            { q: "Who can join?", a: "Governmental accreditation bodies in Arab countries." },
            { q: "What is the license validity?", a: "Three years, subject to renewal." },
            { q: "How to verify a certificate?", a: "Via the search engine using license or company name." }
          ]
        },
        contact: {
          title: "Contact Us",
          desc: "For any additional inquiries regarding certification, verification, or authentication processes, please contact us.",
          email: "halal@aidsmo.org",
          btn: "Send an Email"
        }
      },
      searchPlaceholder: "Search by license or company...",
    }
  };

  const d = menuData[lang];
  const isRtl = lang === "ar";

  const languages: { name: string; code: Lang }[] = [
    { name: "العربية", code: "ar" },
    { name: "الإنجليزية", code: "en" }
  ];

  const selectLanguage = (code: Lang) => {
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
            src="/logo.svg" 
            alt="AIDSMO Logo" 
            className="h-20 w-auto object-contain"
          />
          <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
          <span className="block text-lg font-black tracking-tight text-[#007A55] leading-none cursor-pointer">
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
                  className="relative text-[11px] font-bold text-slate-600 hover:text-[#007A55] transition-colors uppercase tracking-wider h-full flex items-center group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#007A55] transition-all duration-300 group-hover:w-full"></span>
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
                  className={`absolute ${isRtl ? 'left-10' : 'right-10'} h-9 px-4 text-sm bg-slate-100 border-none outline-none rounded-full text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#007A55]`}
                />
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-600 hover:text-[#007A55] transition-colors z-10 rounded-full hover:bg-slate-100"
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
              className="p-2 text-slate-600 hover:text-[#007A55] transition-colors rounded-full hover:bg-slate-100 flex items-center"
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
                      className={`w-full px-4 py-2 text-sm text-right flex items-center justify-between hover:bg-slate-50 transition-colors ${lang === l.code ? 'text-[#007A55] font-bold' : 'text-slate-600'}`}
                      dir={l.code === 'ar' ? 'rtl' : 'ltr'}
                    >
                      {l.name}
                      {lang === l.code && <div className="w-1.5 h-1.5 rounded-full bg-[#007A55]"></div>}
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
              
              {/* Column 1: Links */}
              <div>
                <h4 className="text-[10px] font-black text-[#007A55] uppercase tracking-widest mb-5">
                  {d.mega.links.title}
                </h4>
                <ul className="space-y-3">
                  {d.mega.links.items.map((item, i) => (
                    <li key={i}>
                      <a href={item.href} className="text-slate-700 hover:text-[#007A55] text-sm font-bold transition-colors">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 2: FAQ */}
              <div>
                <h4 className="text-[10px] font-black text-[#007A55] uppercase tracking-widest mb-5">
                  {d.mega.faq.title}
                </h4>
                <div className="space-y-4">
                  {d.mega.faq.items.map((item, i) => (
                    <div key={i} className="group cursor-default">
                      <h5 className="text-sm font-bold text-slate-800 group-hover:text-[#007A55] transition-colors mb-1">
                        {item.q}
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3 & 4: Contact Card */}
              <div className="md:col-span-2 bg-[#007A55] rounded-xl p-8 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#005c40] rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[#009366] rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <h4 className="font-bold text-white text-2xl mb-2">{d.mega.contact.title}</h4>
                  <p className="text-white/80 text-sm leading-relaxed max-w-sm">
                    {d.mega.contact.desc}
                  </p>
                </div>
                
                <a 
                  href={`mailto:${d.mega.contact.email}`}
                  className="relative z-10 mt-6 self-start text-[11px] font-black text-[#007A55] bg-white px-6 py-3 rounded-md hover:bg-slate-100 transition-colors uppercase tracking-widest flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  {d.mega.contact.btn}
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;