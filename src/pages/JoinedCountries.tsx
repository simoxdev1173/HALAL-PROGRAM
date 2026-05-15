import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, ExternalLink, ChevronRight, MapPin, Star, ArrowUpRight, Clock,
  Globe, ShieldCheck, Info, Award, Package, Calendar, CheckCircle, XCircle
} from "lucide-react";

// --------------------------------------------------------------
// Types
// --------------------------------------------------------------
interface Entity {
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  status: "Active" | "Pending";
  statusAr: string;
  description: string;
  descriptionEn: string;
  website: string;
  logo: string;
}

interface Manufacturer {
  id: string;
  name: string;
  nameEn: string;
  logo: string;               // company logo
  products: string[];         // certified product list (Arabic)
  productsEn: string[];
  halalMark: {
    name: string;             // e.g. "علامة حلال المغرب"
    imageUrl: string;         // placeholder image for the mark
    certificateNumber: string;
    issueDate: string;
    expiryDate: string;
    status: "active" | "suspended" | "expired";
  };
  feePaid?: number;           // $100 per certificate use
}

interface Country {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  status: "Joined" | "Upcoming";
  scenery: string;
  // المؤسسات الرسمية (منظمة، تعيين، منح شهادات، رقابية)
  entities: Entity[];
  // الموردون والمنشآت
  manufacturers: Manufacturer[];
  // معلومات إضافية من البرنامج
  designationBodyFeeExempt?: boolean;   // هل جهة التعيين حكومية (معفاة من الرسوم)؟
}

// --------------------------------------------------------------
// بيانات ثابتة مستخلصة من ملف PPTX بالكامل
// --------------------------------------------------------------
const COUNTRIES: Country[] = [
  {
    id: "morocco",
    code: "ma",
    name: "المملكة المغربية",
    nameEn: "Kingdom of Morocco",
    status: "Joined",
    scenery: "https://images.unsplash.com/photo-1598022124758-26d09adcb7b6?q=80&w=1170&auto=format&fit=crop",
    designationBodyFeeExempt: true, // IMANOR جهة حكومية معفاة
    entities: [

      {
        name: "المعهد المغربي للتقييس (IMANOR)",
        nameEn: "Moroccan Institute for Standardization",
        role: "جهة التعيين",
        roleEn: "Designation Body",
        status: "Active",
        statusAr: "نشط",
        description: "المسؤولة عن تقديم طلب التشغيل للمنظمة، وتعيين جهات منح الشهادات محلياً، والتنسيق مع الجهات الرقابية.",
        descriptionEn: "Submits operation request to the org, appoints local certification bodies, coordinates with regulators.",
        website: "https://www.imanor.gov.ma",
        logo: "https://data.gov.ma/data/uploads/group/2021-11-15-235551.444609logo-IMANOR.png"
      },
  
      {
        name: "المكتب الوطني للسلامة الصحية للمنتجات الغذائية (ONSSA)",
        nameEn: "National Office for Food Safety",
        role: "الجهات الرقابية ومسح السوق",
        roleEn: "Regulatory & Market Surveillance",
        status: "Active",
        statusAr: "نشط",
        description: "تتولى التحقق من المنتجات في المنافذ والأسواق، سحب العينات، وإبلاغ جهات التعيين بالمخالفات.",
        descriptionEn: "Verifies products in ports/markets, takes samples, notifies designation bodies of violations.",
        website: "http://www.onssa.gov.ma",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY9WxXXAnrVE2wqk8-J8ad5e4VzRUM0T6Upg&s"
      }
    ],
    manufacturers: [
      {
        id: "lesieur-cristal",
        name: "مجموعة لوسيور كريستال",
        nameEn: "Lesieur Cristal",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKI99rJGtIhhuiYRw1CfcsepgoPd7a_qqX_A&s",
        products: ["زيوت الطعام المكررة", "المايونيز", "الصلصات"],
        productsEn: ["Refined Oils", "Mayonnaise", "Sauces"],
        halalMark: {
          name: "علامة حلال المغرب",
          imageUrl: "https://images.seeklogo.com/logo-png/55/2/label-halal-de-imanor-logo-png_seeklogo-551817.png", // سيتم استبداله لاحقاً بصورة حقيقية
          certificateNumber: "HAL-MA-001-24",
          issueDate: "2024-01-15",
          expiryDate: "2027-01-14",
          status: "active"
        },
        feePaid: 100
      },
      {
        id: "sotherma",
        name: "سيدي علي",
        nameEn: "Sotherma (Sidi Ali)",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjnoAA_IV-T6ERABjcVk6ZOdlQtK44S_72vg&s",
        products: ["مياه معدنية طبيعية", "مياه منكهة"],
        productsEn: ["Natural Mineral Water", "Flavored Water"],
        halalMark: {
          name: "علامة حلال المغرب",
          imageUrl: "https://images.seeklogo.com/logo-png/55/2/label-halal-de-imanor-logo-png_seeklogo-551817.png",
          certificateNumber: "HAL-MA-089-24",
          issueDate: "2024-03-10",
          expiryDate: "2027-03-09",
          status: "active"
        },
        feePaid: 100
      },
      {
        id: "centrale-laitiere",
        name: "المركزية اللبنية المغربية",
        nameEn: "Centrale Laitière",
        logo: "https://vid.alarabiya.net/legacy/images/2012/07/01/50224_223745.jpg?width=555&enable=upscale",
        products: ["منتجات الألبان الطازجة", "زبادي", "حليب مبستر"],
        productsEn: ["Dairy products", "Yogurt", "Pasteurized Milk"],
        halalMark: {
          name: "علامة حلال المغرب",
          imageUrl: "https://images.seeklogo.com/logo-png/55/2/label-halal-de-imanor-logo-png_seeklogo-551817.png",
          certificateNumber: "HAL-MA-124-23",
          issueDate: "2023-11-20",
          expiryDate: "2026-11-19",
          status: "active"
        },
        feePaid: 100
      },
      {
        id: "bimo",
        name: "مجموعة بيمو",
        nameEn: "Groupe BIMO",
        logo: "https://ar.yabiladi.com/files/articles/1f081742d6fee0d2ce7e7e78afdd3bb2_565.jpg",
        products: ["لحوم معلبة", "وجبات جاهزة", "مرق الدجاج"],
        productsEn: ["Canned Meat", "Ready Meals", "Chicken Broth"],
        halalMark: {
          name: "علامة حلال المغرب",
          imageUrl: "https://images.seeklogo.com/logo-png/55/2/label-halal-de-imanor-logo-png_seeklogo-551817.png",
          certificateNumber: "HAL-MA-205-22",
          issueDate: "2022-09-01",
          expiryDate: "2025-08-31",
          status: "active"
        },
        feePaid: 100
      },
      {
        id: "marjane-holding",
        name: "مجموعة مرجان القابضة",
        nameEn: "Marjane Holding",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxJnxEqTjTh65UssthdcZkgGkc4WvdJtn8ew&s",
        products: ["منتجات العلامة الخاصة 'Marjane' (لحوم، دواجن، أجبان)"],
        productsEn: ["Private label 'Marjane' (meats, poultry, cheeses)"],
        halalMark: {
          name: "علامة حلال المغرب",
          imageUrl: "https://images.seeklogo.com/logo-png/55/2/label-halal-de-imanor-logo-png_seeklogo-551817.png",
          certificateNumber: "HAL-MA-309-24",
          issueDate: "2024-06-05",
          expiryDate: "2027-06-04",
          status: "active"
        },
        feePaid: 100
      }
    ]
  },
  {
    id: "uae",
    code: "ae",
    name: "الإمارات",
    nameEn: "UAE",
    status: "Upcoming",
    scenery: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
    entities: [],
    manufacturers: []
  },
  {
    id: "saudi",
    code: "sa",
    name: "السعودية",
    nameEn: "Saudi Arabia",
    status: "Upcoming",
    scenery: "https://images.unsplash.com/photo-1586724230472-4017f86d9f3c?q=80&w=2072&auto=format&fit=crop",
    entities: [],
    manufacturers: []
  },
  {
    id: "egypt",
    code: "eg",
    name: "مصر",
    nameEn: "Egypt",
    status: "Upcoming",
    scenery: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop",
    entities: [],
    manufacturers: []
  },
  {
    id: "jordan",
    code: "jo",
    name: "الأردن",
    nameEn: "Jordan",
    status: "Upcoming",
    scenery: "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=2074&auto=format&fit=crop",
    entities: [],
    manufacturers: []
  }
];

// --------------------------------------------------------------
// Component
// --------------------------------------------------------------
const JoinedCountries = ({ lang = "ar" }: { lang?: "ar" | "en" }) => {
  const [selectedId, setSelectedId] = useState(COUNTRIES[0].id);
  const isRtl = lang === "ar";
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedCountry = useMemo(() =>
    COUNTRIES.find(c => c.id === selectedId) || COUNTRIES[0]
  , [selectedId]);

  const t = {
    ar: {
      heroTitle: "الدول",
      heroAccent: "المنضمة",
      introTitle: "شبكة التعاون العربية الموحدة",
      introDesc: "يمثل البرنامج العربي للحلال منظومة استراتيجية تهدف إلى تحقيق التكامل الاقتصادي العربي من خلال توحيد المعايير الفنية والشرعية. نحن نعمل على بناء جسور الثقة بين المستهلك والمنتج، مما يضمن سيادة الجودة ورفع تنافسية المنتجات العربية في الأسواق العالمية عبر نظام اعتراف متبادل رصين.",
      directoryTitle: "دليل الدول الأعضاء",
      joined: "منضم",
      upcoming: "قيد الانضمام",
      parties: "المنظومة الوطنية المعتمدة (المؤسسات والمصنعين)",
      institutional: "شبكة الكيانات المؤسسية",
      manufacturersTitle: "الموردين والمنشآت المعتمدة وعلامات الحلال",
      visit: "زيارة الموقع",
      hq: "مقر البرنامج",
      empty: "قيد استكمال الإجراءات الفنية",
      tag: "جهة معتمدة - المغرب",
      ctaTitle: "انضم للبرنامج العربي للحلال",
      ctaSubtitle:  "",
      ctaDesc: "انضم إلى المنظومة العربية الموحدة وساهم في تعزيز تجارة المنتجات الحلال عالمياً وضمان جودتها ومصداقيتها.",
      certificate: "الشهادة رقم",
      issueDate: "تاريخ الإصدار",
      expiryDate: "تاريخ الانتهاء",
      products: "المنتجات المعتمدة",
      statusActive: "نشط",
      statusSuspended: "معلق",
      statusExpired: "منتهي",
      feeNote: "رسوم الشهادة: 100 دولار عن كل استخدام للشهادة (حسب وثيقة البرنامج)",
      designationFeeNote: "جهة التعيين حكومية → معفاة من الرسوم (حسب الملحق 2 من البرنامج)"
    },
    en: {
      heroTitle: "Joined",
      heroAccent: "Countries",
      introTitle: "Unified Arab Cooperation Network",
      introDesc: "The Arab Halal Program represents a strategic system aimed at achieving Arab economic integration through the unification of technical and Sharia standards. We build trust bridges between consumers and producers, ensuring quality and enhancing Arab product competitiveness globally via a robust mutual recognition system.",
      directoryTitle: "Member States Directory",
      joined: "Joined",
      upcoming: "Upcoming",
      parties: "Authorized National Ecosystem (Entities & Manufacturers)",
      institutional: "Institutional Bodies Network",
      manufacturersTitle: "Approved Suppliers & Facilities with Halal Marks",
      visit: "Visit Site",
      hq: "Program HQ",
      empty: "Technical procedures in progress",
      tag: "Authorized Body - Morocco",
      ctaTitle: "Join the Unified Arab Halal Program",
      ctaSubtitle: "Global Leadership in Quality & Sharia",
      ctaDesc: "Join the unified Arab system and contribute to promoting global Halal trade while ensuring quality and credibility.",
      certificate: "Certificate No.",
      issueDate: "Issue Date",
      expiryDate: "Expiry Date",
      products: "Certified Products",
      statusActive: "Active",
      statusSuspended: "Suspended",
      statusExpired: "Expired",
      feeNote: "Certificate fee: $100 per certificate use (as per program document)",
      designationFeeNote: "Designation body is governmental → fee exempt (Annex 2 of the program)"
    }
  }[lang];

  // Helper to highlight keywords (unchanged from original)
  const HighlightedText = ({ text }: { text: string }) => {
    if (lang !== "ar") return <span>{text}</span>;
    const words = ["منظومة استراتيجية", "التكامل الاقتصادي", "جسور الثقة", "سيادة الجودة", "الأسواق العالمية", "اعتراف متبادل"];
    let parts = text;
    words.forEach(word => { parts = parts.split(word).join(`|${word}|`); });
    return (
      <>
        {parts.split('|').map((part, i) =>
          words.includes(part) ? <span key={i} className="text-[#007A55] font-black border-b-2 border-[#D4AF37]/30">{part}</span> : part
        )}
      </>
    );
  };

  return (
    <div className={`min-h-screen bg-[#FBFBFB] ${isRtl ? 'font-arabic' : 'font-sans'}`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Hero Section (unchanged) */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden pt-20 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
          <img src="/about-us-bg.png" alt="Joined Countries" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-[#FBFBFB]"></div>
        </motion.div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}>
            <h1 className="text-4xl md:text-7xl font-light text-white leading-tight mb-6 whitespace-nowrap">
              {t.heroTitle} <strong className="font-bold text-[#FFFFFF]">{t.heroAccent}</strong>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="relative py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">{t.introTitle}</h2>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed"><HighlightedText text={t.introDesc} /></p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Country Nav */}
      <nav className="sticky top-20 z-30 bg-white border-b border-stone-100 pt-6 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-sm font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
              <Globe size={14} className="text-[#007A55]" /> {t.directoryTitle}
            </h3>
          </div>
          <div ref={scrollContainerRef} className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-4">
            {COUNTRIES.map(country => (
              <button key={country.id} onClick={() => setSelectedId(country.id)} className={`flex flex-col items-center gap-2 min-w-max transition-all pb-3 border-b-2 relative ${selectedId === country.id ? "border-[#004D36] text-[#004D36] opacity-100" : "border-transparent text-stone-400 opacity-60 hover:opacity-100 hover:border-stone-200"}`}>
                <img src={`https://flagcdn.com/w80/${country.code}.png`} alt={country.name} className={`w-6 h-4 object-cover rounded-sm shadow-sm transition-transform ${selectedId === country.id ? 'scale-110' : ''}`} />
                <span className="text-[10px] font-black tracking-tight uppercase">{lang === "ar" ? country.name : country.nameEn}</span>
                {country.status === 'Joined' && <div className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-[#D4AF37] rounded-full ring-2 ring-white"></div>}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div key={selectedId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="space-y-16">
            {/* Country Scenery Card */}
            <div className="relative h-[350px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <img src={selectedCountry.scenery} alt={selectedCountry.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-10 right-10 left-10 flex flex-col md:flex-row justify-between items-end gap-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#D4AF37] text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                    <Star size={12} className="fill-white" />
                    <span>{selectedCountry.status === 'Joined' ? t.joined : t.upcoming}</span>
                  </div>
                  <div className="flex items-center gap-8">
                    <img src={`https://flagcdn.com/w160/${selectedCountry.code}.png`} className="w-20 h-12 object-cover rounded-xl border-4 border-white shadow-2xl hidden md:block" />
                    <div>
                      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">{lang === "ar" ? selectedCountry.name : selectedCountry.nameEn}</h2>
                      <div className="flex items-center gap-3 text-white/60 text-xs font-bold mt-2">
                        <MapPin size={14} className="text-[#D4AF37]" />
                        {selectedCountry.id === 'morocco' ? t.hq : selectedCountry.nameEn}
                      </div>
                    </div>
                  </div>
                </div>
                {selectedCountry.status === 'Joined' && selectedCountry.designationBodyFeeExempt && (
                  <div className="bg-black/50 backdrop-blur-md rounded-2xl px-4 py-2 text-white/80 text-xs font-mono">
                    🏛️ {t.designationFeeNote}
                  </div>
                )}
              </div>
            </div>

            {selectedCountry.status === 'Joined' ? (
              <>
                {/* 1. INSTITUTIONAL ENTITIES (as before) */}
                <div className="space-y-10">
                  <div className="flex items-center gap-4 px-4 border-r-8 border-[#007A55]">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-widest">{t.institutional}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedCountry.entities.map((entity, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-[3rem] p-10 shadow-xl border border-stone-100 hover:shadow-2xl hover:border-[#D4AF37]/30 transition-all group">
                        <div className="absolute top-6 right-6 flex items-center gap-3 bg-stone-50 px-4 py-2 rounded-full border border-stone-100">
                          <img src={`https://flagcdn.com/w40/${selectedCountry.code}.png`} className="w-5 h-3 rounded-xs" />
                          <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">{t.tag}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start gap-8 pt-8">
                          <div className="shrink-0 w-24 h-24 bg-stone-50 rounded-[2rem] p-4 flex items-center justify-center border border-stone-50 group-hover:bg-white group-hover:shadow-xl transition-all">
                            <img src={entity.logo} alt={entity.name} className="w-full h-full object-contain" onError={(e) => ((e.target as any).src = 'https://via.placeholder.com/150?text=LOGO')} />
                          </div>
                          <div className="space-y-4 flex-1">
                            <div className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em]">{lang === "ar" ? entity.role : entity.roleEn}</div>
                            <h4 className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-[#007A55] transition-colors">{lang === "ar" ? entity.name : entity.nameEn}</h4>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{lang === "ar" ? entity.description : entity.descriptionEn}</p>
                            <a href={entity.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-black text-[#007A55] hover:text-[#D4AF37] transition-colors pt-2 group/link">
                              {t.visit} <ArrowUpRight size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 2. MANUFACTURERS & HALAL MARKS (NEW - based on PPTX) */}
                <div className="space-y-10 mt-12">
                  <div className="flex flex-wrap justify-between items-end gap-4 border-b border-stone-200 pb-6">
                    <div className="flex items-center gap-4 px-4 border-r-8 border-[#D4AF37]">
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900">{t.manufacturersTitle}</h3>
                    </div>
                    <div className="text-xs text-stone-400 bg-stone-50 px-4 py-2 rounded-full flex items-center gap-2">
                      <Info size={14} /> {t.feeNote}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {selectedCountry.manufacturers.map((m) => (
                      <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden hover:shadow-xl transition-all group">
                        <div className="p-6 border-b border-stone-100 bg-gradient-to-r from-stone-50 to-white flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <img src={m.logo} alt={m.name} className="w-12 h-12 rounded-xl object-contain bg-white shadow-sm" />
                            <div>
                              <h4 className="font-black text-lg text-slate-800">{lang === "ar" ? m.name : m.nameEn}</h4>
                              <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400 mt-1">
                                <Award size={12} className="text-[#D4AF37]" />
                                {t.certificate}: {m.halalMark.certificateNumber}
                              </div>
                            </div>
                          </div>
                          <div className={`text-[10px] font-black px-3 py-1 rounded-full ${m.halalMark.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                            {m.halalMark.status === 'active' ? t.statusActive : m.halalMark.status === 'suspended' ? t.statusSuspended : t.statusExpired}
                          </div>
                        </div>
                        <div className="p-6 space-y-5">
                          {/* Halal Mark Display */}
                          <div className="flex items-center gap-4 bg-stone-50 p-3 rounded-2xl">
                            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center border border-stone-200 shadow-sm">
                              <img src={m.halalMark.imageUrl} alt="Halal Mark" className="w-10 h-10 object-contain" onError={(e) => ((e.target as any).src = 'https://via.placeholder.com/80?text=حلال')} />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-slate-700">{m.halalMark.name}</div>
                              <div className="text-[10px] text-stone-400 flex items-center gap-4 mt-1">
                                <span>📅 {t.issueDate}: {new Date(m.halalMark.issueDate).toLocaleDateString()}</span>
                                <span>⏳ {t.expiryDate}: {new Date(m.halalMark.expiryDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Products */}
                          <div>
                            <div className="text-xs font-black text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1"><Package size={12} /> {t.products}</div>
                            <div className="flex flex-wrap gap-2">
                              {(lang === "ar" ? m.products : m.productsEn).map((p, idx) => (
                                <span key={idx} className="bg-stone-100 text-slate-700 text-xs px-3 py-1.5 rounded-full font-medium">{p}</span>
                              ))}
                            </div>
                          </div>

                          {/* Fee paid indicator */}
                          <div className="border-t border-stone-100 pt-4 flex justify-end text-[11px] text-stone-400">
                            💵 {t.feeNote.split(':')[0]}: {m.feePaid} USD
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white border border-stone-100 rounded-[3rem] p-24 text-center space-y-8">
                <div className="w-24 h-24 bg-[#F7F7F7] rounded-full flex items-center justify-center mx-auto text-stone-300"><Clock size={48} /></div>
                <div className="space-y-4"><h3 className="text-2xl font-black text-slate-900">{t.upcoming}</h3><p className="text-lg text-stone-400 font-medium">{t.empty}</p></div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* CTA Section (unchanged) */}
      <section className="relative w-full py-32 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src="/workflow/w-4.png" alt="Decoration" className="w-full h-full object-cover scale-110 blur-sm" /></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#007A55]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#CA8A04]/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-12">
       
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">{t.ctaTitle}<br /><span className="text-[#CA8A04]">{t.ctaSubtitle}</span></h2>
              <p className="text-xl text-white font-medium max-w-3xl mx-auto leading-relaxed">{t.ctaDesc}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10">
              <button onClick={() => window.location.href = '/join-program'} className="px-12 py-5 bg-[#007A55] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#006042] transition-all shadow-xl shadow-black/20 hover:-translate-y-1 flex items-center justify-center gap-3 group">
                {lang === "ar" ? "ابدأ إجراءات الانضمام" : "Start Joining Process"} 
              </button>
              <button onClick={() => window.location.href = '/about-us'} className="px-12 py-5 bg-white/5 text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
                {lang === "ar" ? "اكتشف المزيد" : "Explore More"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&display=swap');
        .font-arabic { font-family: 'Readex Pro', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        ::selection { background: #D4AF37; color: white; }
      `}</style>
    </div>
  );
};

export default JoinedCountries;