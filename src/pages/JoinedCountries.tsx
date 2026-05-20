"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,  ArrowUpRight, Clock,
   ShieldCheck, Info, Award, Package, Calendar,  ArrowLeft, 
} from "lucide-react";

// --------------------------------------------------------------
// Types
// --------------------------------------------------------------
interface Entity {
  name: string;
  role: string;
  status: "Active" | "Pending";
  statusAr: string;
  description: string;
  website: string;
  logo: string;
}

interface Manufacturer {
  id: string;
  name: string;
  logo: string;
  products: string[];
  halalMark: {
    name: string;
    imageUrl: string;
    certificateNumber: string;
    issueDate: string;
    expiryDate: string;
    status: "active" | "suspended" | "expired";
  };
  feePaid?: number;
}

interface Country {
  id: string;
  code: string;
  name: string;
  status: "Joined" | "Upcoming";
  scenery: string;
  entities: Entity[];
  manufacturers: Manufacturer[];
  designationBodyFeeExempt?: boolean;
}

// --------------------------------------------------------------
// Data
// --------------------------------------------------------------
const COUNTRIES: Country[] = [
  {
    id: "morocco",
    code: "ma",
    name: "المملكة المغربية",
    status: "Joined",
    scenery: "https://images.unsplash.com/photo-1598022124758-26d09adcb7b6?q=80&w=1170&auto=format&fit=crop",
    designationBodyFeeExempt: true,
    entities: [
      {
        name: "المعهد المغربي للتقييس (IMANOR)",
        role: "جهة التعيين",
        status: "Active",
        statusAr: "نشط",
        description: "المسؤولة عن تقديم طلب التشغيل للمنظمة، وتعيين جهات منح الشهادات محلياً، والتنسيق مع الجهات الرقابية.",
        website: "https://www.imanor.gov.ma",
        logo: "https://data.gov.ma/data/uploads/group/2021-11-15-235551.444609logo-IMANOR.png"
      },
      {
        name: "المكتب الوطني للسلامة الصحية للمنتجات الغذائية (ONSSA)",
        role: "الجهات الرقابية ومسح السوق",
        status: "Active",
        statusAr: "نشط",
        description: "تتولى التحقق من المنتجات في المنافذ والأسواق، سحب العينات، وإبلاغ جهات التعيين بالمخالفات.",
        website: "http://www.onssa.gov.ma",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY9WxXXAnrVE2wqk8-J8ad5e4VzRUM0T6Upg&s"
      }
    ],
    manufacturers: [
      {
        id: "lesieur-cristal",
        name: "مجموعة لوسيور كريستال",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKI99rJGtIhhuiYRw1CfcsepgoPd7a_qqX_A&s",
        products: ["زيوت الطعام المكررة", "المايونيز", "الصلصات"],
        halalMark: {
          name: "علامة حلال المغرب",
          imageUrl: "https://images.seeklogo.com/logo-png/55/2/label-halal-de-imanor-logo-png_seeklogo-551817.png",
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
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjnoAA_IV-T6ERABjcVk6ZOdlQtK44S_72vg&s",
        products: ["مياه معدنية طبيعية", "مياه منكهة"],
        halalMark: {
          name: "علامة حلال المغرب",
          imageUrl: "https://images.seeklogo.com/logo-png/55/2/label-halal-de-imanor-logo-png_seeklogo-551817.png",
          certificateNumber: "HAL-MA-089-24",
          issueDate: "2024-03-10",
          expiryDate: "2027-03-09",
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
    status: "Upcoming",
    scenery: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
    entities: [],
    manufacturers: []
  },
  {
    id: "saudi",
    code: "sa",
    name: "السعودية",
    status: "Upcoming",
    scenery: "https://images.unsplash.com/photo-1586724230472-4017f86d9f3c?q=80&w=2072&auto=format&fit=crop",
    entities: [],
    manufacturers: []
  },
  {
    id: "egypt",
    code: "eg",
    name: "مصر",
    status: "Upcoming",
    scenery: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop",
    entities: [],
    manufacturers: []
  },
  {
    id: "jordan",
    code: "jo",
    name: "الأردن",
    status: "Upcoming",
    scenery: "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=2074&auto=format&fit=crop",
    entities: [],
    manufacturers: []
  }
];

const JoinedCountries = () => {
  const [selectedId, setSelectedId] = useState(COUNTRIES[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const selectedCountry = useMemo(() =>
    COUNTRIES.find(c => c.id === selectedId) || COUNTRIES[0]
  , [selectedId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = {
    heroTitle: "الدول",
    heroAccent: "المنضمة",
    introTitle: "شبكة التعاون العربية الموحدة",
    introDesc: "يمثل البرنامج العربي للحلال منظومة استراتيجية تهدف إلى تحقيق التكامل الاقتصادي العربي من خلال توحيد المعايير الفنية والشرعية. نحن نعمل على بناء جسور الثقة بين المستهلك والمنتج، مما يضمن سيادة الجودة ورفع تنافسية المنتجات العربية في الأسواق العالمية عبر نظام اعتراف متبادل رصين.",
    directoryTitle: "دليل الدول الأعضاء",
    joined: "منضم",
    upcoming: "قيد الانضمام",
    institutional: "شبكة الكيانات المؤسسية",
    manufacturersTitle: "الموردين والمنشآت المعتمدة",
    visit: "زيارة الموقع الرسمي",
    hq: "مقر البرنامج الرئيسي",
    empty: "قيد استكمال الإجراءات الفنية للانضمام",
    tag: "جهة معتمدة رسمياً",
    ctaTitle: "انضم للبرنامج العربي للحلال",
    ctaDesc: "انضم إلى المنظومة العربية الموحدة وساهم في تعزيز تجارة المنتجات الحلال عالمياً وضمان جودتها ومصداقيتها.",
    certificate: "الشهادة رقم",
    issueDate: "تاريخ الإصدار",
    expiryDate: "تاريخ الانتهاء",
    products: "المنتجات المعتمدة",
    statusActive: "نشط",
    statusSuspended: "معلق",
    statusExpired: "منتهي",
    feeNote: "رسوم الشهادة: 100 دولار عن كل استخدام",
    designationFeeNote: "جهة التعيين حكومية → معفاة من الرسوم"
  };

  const statusConfig = {
    active: { color: "text-[#007A55]", bg: "bg-[#007A55]/10", led: "bg-[#007A55]" },
    suspended: { color: "text-[#CA8A04]", bg: "bg-[#CA8A04]/10", led: "bg-[#CA8A04]" },
    expired: { color: "text-rose-600", bg: "bg-rose-500/10", led: "bg-rose-600" },
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-16 lg:pt-20 font-arabic flex flex-col overflow-hidden" dir="rtl">
      
      {/* Industrial noise overlay */}
      <div className="fixed inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-50" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[40vh] min-h-[350px] overflow-hidden pt-16 lg:pt-20 flex items-center justify-center border-b border-stone-300 shadow-[var(--shadow-ind-card)]">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="/about-us-bg.png" 
            alt="Joined Countries" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-[#FAF9F6]"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >  
             <div className="inline-flex items-center gap-3 mb-6 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-[var(--shadow-ind-floating)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#CA8A04] animate-pulse shadow-[0_0_10px_rgba(202,138,4,1)]"></div>
                <span className="text-white text-[10px] lg:text-xs font-black uppercase tracking-[0.2em]">شبكة التعاون الدولية</span>
             </div>

            <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              {t.heroTitle} <span className="text-[#CA8A04]">{t.heroAccent}</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro Text - Technical Brief Style */}
      <section className="relative py-16 lg:py-24 bg-white border-b border-stone-200 overflow-hidden">
        {/* ISO Grid Background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="space-y-8"
          >
            <div className="inline-flex items-center justify-center gap-3 mb-2">
               <div className="w-8 h-1 bg-[#007A55] rounded-full"></div>
               <h2 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tight">{t.introTitle}</h2>
               <div className="w-8 h-1 bg-[#007A55] rounded-full"></div>
            </div>
            
            <div className="p-8 lg:p-10 ind-card border border-stone-100 bg-[#FAF9F6] relative">
               <p className="text-base lg:text-xl text-slate-600 font-medium leading-relaxed">
                 {t.introDesc}
               </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Country Nav (Control Panel Strip) */}
      <nav className="sticky top-16 lg:top-20 z-40 bg-[#e0e5ec] border-b border-stone-300 pt-6 px-6 lg:px-10 shadow-[var(--shadow-ind-card)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-[#007A55] shadow-[0_0_5px_rgba(0,122,85,1)]"></div>
               <h3 className="text-[10px] lg:text-xs font-black text-stone-500 uppercase tracking-widest flex items-center gap-2">
                 {t.directoryTitle}
               </h3>
            </div>
          </div>
          
          <div ref={scrollContainerRef} className="flex items-center gap-6 lg:gap-8 overflow-x-auto no-scrollbar pb-4">
            {COUNTRIES.map(country => {
              const isActive = selectedId === country.id;
              return (
                <button 
                  key={country.id} 
                  onClick={() => setSelectedId(country.id)} 
                  className={`flex flex-col items-center gap-2 min-w-max transition-all pb-3 border-b-4 relative group cursor-pointer ${
                    isActive ? "border-[#1C4C2A] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-white shadow-[var(--shadow-ind-sharp)]' : 'bg-transparent'}`}>
                    <img 
                      src={`https://flagcdn.com/w80/${country.code}.png`} 
                      alt={country.name} 
                      className="w-8 h-5 object-cover rounded shadow-sm" 
                    />
                  </div>
                  <span className={`text-[10px] lg:text-[11px] font-black tracking-tight uppercase ${isActive ? 'text-[#1C4C2A]' : 'text-stone-500'}`}>
                    {country.name}
                  </span>
                  {country.status === 'Joined' && !isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#CA8A04] rounded-full shadow-[0_0_5px_rgba(202,138,4,1)]"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12 relative z-10">
        
        {/* Schematic overlay for main content */}
        <div className="absolute inset-0 opacity-[0.01] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#636e72 1px, transparent 1px), linear-gradient(90deg, #636e72 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedId} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }} 
            className="space-y-16"
          >
            {/* Country Scenery Module */}
            <div className="ind-card p-3 lg:p-4 border border-stone-200/50 rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-white">
              <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2rem] overflow-hidden border border-stone-100">
                 <img src={selectedCountry.scenery} alt={selectedCountry.name} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                 
                 <div className="absolute bottom-10 right-10 left-10 flex flex-col md:flex-row justify-between items-end gap-10">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#CA8A04] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg border border-white/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                        <span>{selectedCountry.status === 'Joined' ? t.joined : t.upcoming}</span>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="p-1 bg-white rounded-xl shadow-2xl hidden md:block border border-stone-100">
                           <img src={`https://flagcdn.com/w160/${selectedCountry.code}.png`} className="w-20 h-12 object-cover rounded-lg" />
                        </div>
                        <div>
                          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-xl">{selectedCountry.name}</h2>
                          <div className="flex items-center gap-3 text-[#CA8A04] text-xs font-black mt-3 uppercase tracking-wider">
                            <MapPin size={16} />
                            {selectedCountry.id === 'morocco' ? t.hq : selectedCountry.name}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {selectedCountry.status === 'Joined' && selectedCountry.designationBodyFeeExempt && (
                      <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4 lg:p-6 text-white border border-white/10 shadow-2xl">
                        <div className="flex items-center gap-3 mb-1">
                           <div className="w-2 h-2 rounded-full bg-[#007A55] shadow-[0_0_8px_rgba(0,122,85,1)]"></div>
                           <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">بروتوكول الإعفاء</span>
                        </div>
                        <p className="text-xs lg:text-sm font-bold">{t.designationFeeNote}</p>
                      </div>
                    )}
                 </div>
              </div>
            </div>

            {selectedCountry.status === 'Joined' ? (
              <>
                {/* 1. INSTITUTIONAL ENTITIES (Rack Modules) */}
                <div className="space-y-12">
                  <div className="inline-flex items-center gap-4 px-4 border-r-4 border-[#007A55]">
                    <h3 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">{t.institutional}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {selectedCountry.entities.map((entity, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: i * 0.1 }} 
                        className="ind-card p-8 lg:p-10 border border-stone-200/50 bg-white rounded-[2.5rem] relative group overflow-hidden"
                      >
                        <div className="absolute top-6 left-6 flex items-center gap-3 bg-[#e0e5ec] px-4 py-2 rounded-xl border border-white shadow-sm">
                          <img src={`https://flagcdn.com/w40/${selectedCountry.code}.png`} className="w-5 h-3 rounded shadow-xs" />
                          <span className="text-[9px] font-black text-stone-500 uppercase tracking-widest">{t.tag}</span>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row items-start gap-8 pt-10">
                          <div className="shrink-0 w-24 h-24 bg-white border border-stone-100 rounded-2xl p-4 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                            <img src={entity.logo} alt={entity.name} className="w-full h-full object-contain" />
                          </div>
                          
                          <div className="space-y-5 flex-1 text-right">
                            <div className="inline-block px-3 py-1 rounded-md bg-[#CA8A04]/10 text-[#CA8A04] text-[10px] font-black uppercase tracking-widest shadow-sm">
                               {entity.role}
                            </div>
                            <h4 className="text-xl lg:text-2xl font-black text-slate-800 leading-tight drop-shadow-[0_1px_0_#ffffff]">{entity.name}</h4>
                            <p className="text-sm lg:text-base text-stone-500 font-medium leading-relaxed">{entity.description}</p>
                            
                            <a href={entity.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-xs font-black text-[#007A55] pt-4 group/link">
                              <span className="pb-1 border-b-2 border-transparent group-hover/link:border-[#007A55] transition-all">{t.visit}</span>
                              <div className="w-6 h-6 rounded bg-[#e0e5ec] flex items-center justify-center shadow-[var(--shadow-ind-sharp)] group-hover:shadow-[var(--shadow-ind-floating)] group-hover:-translate-y-0.5 transition-all">
                                 <ArrowUpRight size={14} />
                              </div>
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 2. MANUFACTURERS (Technical Grid) */}
                <div className="space-y-12 pt-12 border-t border-stone-200">
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-4 border-r-4 border-[#CA8A04]">
                     <div>
                        <h3 className="text-2xl lg:text-3xl font-black text-slate-800 tracking-tight">{t.manufacturersTitle}</h3>
                        <p className="text-sm font-medium text-stone-500 mt-2">سجل الموردين المعتمدين والموثقين بالبرنامج</p>
                     </div>
                     <div className="px-5 py-2.5 bg-[#FAF9F6] border border-stone-200 rounded-xl shadow-[var(--shadow-ind-sharp)] text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-3">
                        <Info size={14} className="text-[#CA8A04]" /> 
                        {t.feeNote}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {selectedCountry.manufacturers.map((m) => {
                      const config = statusConfig[m.halalMark.status];
                      return (
                        <motion.div 
                          key={m.id} 
                          initial={{ opacity: 0, y: 20 }} 
                          whileInView={{ opacity: 1, y: 0 }} 
                          viewport={{ once: true }} 
                          className="ind-card bg-white border border-stone-200/50 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all group"
                        >
                          <div className="p-6 lg:p-8 border-b border-stone-100 bg-[#e0e5ec]/30 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 p-2 bg-white rounded-xl shadow-sm border border-stone-100 flex items-center justify-center">
                                 <img src={m.logo} alt={m.name} className="w-full h-full object-contain" />
                              </div>
                              <div>
                                <h4 className="font-black text-lg text-slate-800">{m.name}</h4>
                                <div className="flex items-center gap-2 text-[10px] font-black text-stone-400 mt-1">
                                  <Award size={12} className="text-[#CA8A04]" />
                                  {t.certificate}: {m.halalMark.certificateNumber}
                                </div>
                              </div>
                            </div>
                            
                            <div className={`px-3 py-1.5 rounded-lg text-[10px] font-black flex items-center gap-2 shadow-[var(--shadow-ind-sharp)] border border-white/50 ${config.bg} ${config.color}`}>
                               <div className={`w-1.5 h-1.5 rounded-full ${config.led} animate-pulse`} />
                               {m.halalMark.status === 'active' ? t.statusActive : m.halalMark.status === 'suspended' ? t.statusSuspended : t.statusExpired}
                            </div>
                          </div>
                          
                          <div className="p-8 lg:p-10 space-y-8">
                            {/* Halal Mark Panel */}
                            <div className="bg-stone-50 p-4 lg:p-6 rounded-2xl flex items-center gap-6 border border-stone-100 shadow-sm">
                              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-stone-200 shadow-md group-hover:scale-105 transition-transform duration-500">
                                <img src={m.halalMark.imageUrl} alt="Halal Mark" className="w-12 h-12 object-contain" />
                              </div>
                              <div className="space-y-1">
                                <div className="font-black text-base text-slate-800">{m.halalMark.name}</div>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                   <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400">
                                      <Calendar size={12} className="text-[#007A55]" />
                                      {t.issueDate}: {new Date(m.halalMark.issueDate).toLocaleDateString('ar-MA')}
                                   </div>
                                   <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400">
                                      <Clock size={12} className="text-rose-600" />
                                      {t.expiryDate}: {new Date(m.halalMark.expiryDate).toLocaleDateString('ar-MA')}
                                   </div>
                                </div>
                              </div>
                            </div>

                            {/* Products Section */}
                            <div className="space-y-3">
                              <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                                 <Package size={14} /> 
                                 {t.products}
                              </div>
                              <div className="flex flex-wrap gap-2.5">
                                {m.products.map((p, idx) => (
                                  <div key={idx} className="bg-white border border-stone-200 text-stone-700 text-xs px-4 py-2 rounded-lg font-black shadow-[var(--shadow-ind-sharp)] hover:shadow-[var(--shadow-ind-floating)] transition-all">
                                     {p}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Verification Badge */}
                            <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                               <div className="flex items-center gap-2">
                                  <ShieldCheck size={16} className="text-[#007A55]" />
                                  <span className="text-[9px] font-mono font-black text-stone-400 uppercase tracking-tighter">مزود خدمة موثق</span>
                               </div>
                               <div className="text-[11px] font-mono font-black text-stone-800">
                                 $ {m.feePaid}.00 دولار
                               </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              /* Upcoming Protocol State */
              <div className="ind-card border border-stone-200/50 bg-[#e0e5ec]/40 rounded-[3rem] p-20 lg:p-32 text-center relative overflow-hidden shadow-xl">
                 <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                      style={{ backgroundImage: 'linear-gradient(#636e72 1px, transparent 1px), linear-gradient(90deg, #636e72 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                 <div className="relative z-10 space-y-8 flex flex-col items-center">
                    <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-[var(--shadow-ind-floating)] border border-stone-200 mb-4 animate-pulse">
                       <Clock size={48} className="text-[#CA8A04]" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-3xl font-black text-slate-800 tracking-tight">{t.upcoming}</h3>
                       <p className="text-lg text-stone-500 font-medium max-w-md mx-auto leading-relaxed">{t.empty}</p>
                    </div>
                    <button onClick={() => window.location.href = '/join-program'} className="btn-primary !bg-[#1C4C2A] h-[54px] px-10 group">
                       بدء إجراءات الربط الفني
                       <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Final Action Display (High-Contrast technical panel) */}
      <section className="relative py-24 bg-stone-900 overflow-hidden border-t border-stone-800 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 z-0">
           <img src="/workflow/w-4.png" alt="Support" className="w-full h-full object-cover opacity-10 scale-105" />
           <div className="absolute inset-0 bg-[#1C4C2A]/40 mix-blend-multiply"></div>
        </div>
        
        {/* Carbon Fiber Overlay */}
        <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-12">
             
             <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto border border-white/10 shadow-[var(--shadow-ind-floating)]">
                <ShieldCheck className="text-[#CA8A04]" size={32} />
             </div>

             <div className="space-y-6">
               <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-xl">
                 {t.ctaTitle}
               </h2>
               <p className="text-base lg:text-xl text-stone-300 font-medium max-w-3xl mx-auto leading-relaxed border-r-4 border-[#CA8A04] pr-6 bg-white/5 py-4 rounded-sm">
                 {t.ctaDesc}
               </p>
             </div>

             <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
               <button onClick={() => window.location.href = '/join-program'} className="btn-primary !bg-[#CA8A04] !text-[#1C4C2A] h-[60px] px-12 group shadow-[0_15px_40px_rgba(202,138,4,0.3)]">
                 ابدأ إجراءات الانضمام الرسمية
                 <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
               </button>
               <button onClick={() => window.location.href = '/about-us'} className="flex items-center justify-center gap-4 px-12 py-5 bg-white/5 text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
                 دليل السياسات الفنية
               </button>
             </div>
          </motion.div>
        </div>
        
        {/* Hardware Detail */}
        <div className="absolute bottom-10 right-10 flex gap-2">
           <div className="h-2 w-10 rounded-full bg-black/60 shadow-inner" />
           <div className="h-2 w-10 rounded-full bg-black/60 shadow-inner" />
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default JoinedCountries;
