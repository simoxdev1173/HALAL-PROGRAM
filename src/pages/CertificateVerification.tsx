"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ShieldCheck, MapPin, CheckCircle2, 
  ShieldAlert, Info, SlidersHorizontal, ArrowLeft, Download, Mail,Target , Phone, X
} from "lucide-react";

interface Certificate {
  id: string;
  companyName: string;
  licenseNumber: string;
  status: "Active" | "Expired" | "Pending";
  nextFollowUp: string;
  expiryDate: string;
  standards: string[];
  certificateUrl: string;
  location: string;
  category: string;
  image: string;
}

const MOCK_DATA: Certificate[] = [
  {
    id: "1",
    companyName: "شركة الغذاء النقي للتجارة",
    licenseNumber: "HALAL-2024-001",
    status: "Active",
    nextFollowUp: "2024-12-15",
    expiryDate: "2026-05-20",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "/intro.pdf",
    location: "الرياض، السعودية",
    category: "لحوم ومنتجاتها",
    image: "/domains/meat.jpg"
  },
  {
    id: "2",
    companyName: "مصنع الشرق للحلويات",
    licenseNumber: "HALAL-2024-002",
    status: "Expired",
    nextFollowUp: "---",
    expiryDate: "2023-11-10",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "#",
    location: "دبي، الإمارات",
    category: "حلويات وسكاكر",
    image: "/domains/added.jpg"
  },
  {
    id: "3",
    companyName: "مجموعة الألبان العربية",
    licenseNumber: "HALAL-2024-003",
    status: "Active",
    nextFollowUp: "2025-01-20",
    expiryDate: "2027-02-15",
    standards: ["GSO 2055-1:2015", "ISO 9001"],
    certificateUrl: "#",
    location: "عمان، الأردن",
    category: "ألبان وأجبان",
    image: "/domains/prod.webp"
  },
  {
    id: "4",
    companyName: "شركة زيوت النخيل العالمية",
    licenseNumber: "HALAL-2024-004",
    status: "Pending",
    nextFollowUp: "2024-06-10",
    expiryDate: "---",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "#",
    location: "القاهرة، مصر",
    category: "زيوت ودهون",
    image: "/domains/added.jpg"
  },
  {
    id: "5",
    companyName: "المطاحن الوطنية الكبرى",
    licenseNumber: "HALAL-2024-005",
    status: "Active",
    nextFollowUp: "2025-03-05",
    expiryDate: "2026-08-12",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "#",
    location: "الدوحة، قطر",
    category: "حبوب وبقوليات",
    image: "/domains/prod.webp"
  },
  {
    id: "6",
    companyName: "عصائر الطبيعة المحدودة",
    licenseNumber: "HALAL-2024-006",
    status: "Active",
    nextFollowUp: "2025-05-10",
    expiryDate: "2026-11-20",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "#",
    location: "جدة، السعودية",
    category: "مشروبات",
    image: "/domains/drinks.jpg"
  },
  {
    id: "7",
    companyName: "مزارع الوادي الأخضر",
    licenseNumber: "HALAL-2024-007",
    status: "Active",
    nextFollowUp: "2024-09-15",
    expiryDate: "2025-10-30",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "#",
    location: "المنامة، البحرين",
    category: "لحوم ومنتجاتها",
    image: "/domains/meat.jpg"
  },
  {
    id: "8",
    companyName: "شركة المخبوزات الذهبية",
    licenseNumber: "HALAL-2024-008",
    status: "Expired",
    nextFollowUp: "---",
    expiryDate: "2024-01-05",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "#",
    location: "الكويت، قطر",
    category: "مخبوزات",
    image: "/domains/added.jpg"
  }
];

const statusConfig = {
  Active: { label: "نشط", color: "text-[#007A55]", bg: "bg-[#007A55]/10", led: "bg-[#007A55]", icon: CheckCircle2 },
  Expired: { label: "منتهي", color: "text-rose-600", bg: "bg-rose-500/10", led: "bg-rose-600", icon: ShieldAlert },
  Pending: { label: "قيد المراجعة", color: "text-[#CA8A04]", bg: "bg-[#CA8A04]/10", led: "bg-[#CA8A04]", icon: Info },
};

const CertificateVerification: React.FC = () => {
  const location = useLocation();
  const [query, setQuery] = useState(() => new URLSearchParams(location.search).get("q") ?? "");
  const [activeCategory, setActiveCategory] = useState<string>("الكل");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const categories = ["الكل", ...Array.from(new Set(MOCK_DATA.map(item => item.category)))];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search]);

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(cert => {
      const matchesQuery = 
        cert.companyName.includes(query) || 
        cert.licenseNumber.toLowerCase().includes(query.toLowerCase()) ||
        cert.location.includes(query);
      const matchesCategory = activeCategory === "الكل" || cert.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCert]);

  return (
    <div className="min-h-screen bg-[#FAF9F6]  font-arabic flex flex-col overflow-hidden" dir="rtl">
      
      {/* Industrial noise overlay */}
      <div className="fixed inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-50" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      {/* 1. Header & Search Area (Industrial Control Panel) */}
      <div className="sticky top-16 lg:top-20 z-30 bg-[#e0e5ec] border-b border-stone-300 shadow-[var(--shadow-ind-card)] pt-6 pb-2 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 justify-between mb-8">
            
            <div className="w-full lg:w-auto">
              <h1 className="text-2xl lg:text-3xl pr-21 font-black text-stone-800 tracking-tight drop-shadow-[0_1px_1px_#ffffff]">الدليل الرقمي الموحد</h1>
              
            </div>

            {/* Recessed Search Bar */}
            <div className="w-full lg:w-auto flex-1 max-w-2xl relative">
               <div className="ind-recessed bg-[#FAF9F6] rounded-xl p-1.5 flex items-center shadow-[var(--shadow-ind-recessed)] focus-within:ring-2 focus-within:ring-[#007A55]/30 transition-all border-none">
                  <div className="flex-1 px-4">
                    <input 
                      type="text" 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="اسم المنشأة، رقم الترخيص، أو الموقع..."
                      className="w-full bg-transparent text-sm lg:text-base text-stone-800 outline-none placeholder:text-stone-300 font-bold"
                    />
                  </div>
                  
                  <button className="w-12 h-12 bg-[#007A55] text-white rounded-lg flex items-center justify-center hover:bg-[#006344] active:translate-y-[2px] active:shadow-[var(--shadow-ind-pressed)] transition-all shadow-[var(--shadow-ind-floating)] border border-black/10 shrink-0 cursor-pointer">
                    <Search size={20} strokeWidth={2.5} />
                  </button>
               </div>
            </div>

            {/* Filter Toggle */}
            <div className="hidden lg:flex items-center">
              <button className="flex items-center gap-3 px-6 py-3.5 bg-[#FAF9F6] border border-white rounded-xl text-sm font-black text-stone-700 shadow-[var(--shadow-ind-card)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-ind-floating)] active:translate-y-0.5 transition-all cursor-pointer group">
                <SlidersHorizontal size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                <span>إعدادات العرض</span>
              </button>
            </div>
          </div>

          {/* Categories - Printed Label Style */}
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-4 relative">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-md text-[11px] lg:text-xs font-black transition-all cursor-pointer uppercase tracking-widest ${
                    isActive 
                      ? "bg-[#007A55] text-white shadow-[var(--shadow-ind-floating)] -translate-y-0.5" 
                      : "bg-white/40 text-stone-500 hover:text-stone-800 hover:bg-white shadow-[var(--shadow-ind-sharp)]"
                  }`}
                >
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#CA8A04] animate-pulse" />}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Results Grid */}
      <div className="max-w-7xl mx-auto w-full pt-18 lg:pt-24 px-6 lg:px-10 py-12 min-h-[60vh] relative z-10">
        
        {/* Schematic Grid Overlay for content area */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#636e72 1px, transparent 1px), linear-gradient(90deg, #636e72 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 bg-[#e0e5ec] text-stone-400 rounded-3xl flex items-center justify-center mb-6 shadow-[var(--shadow-ind-recessed)]">
              <Search size={32} />
            </div>
            <h3 className="text-xl lg:text-2xl font-black text-stone-800 mb-2">قاعدة البيانات لا تستجيب للطلب</h3>
            <p className="text-stone-500 font-medium">لم نتمكن من العثور على أي سجلات مطابقة للمعايير المدخلة.</p>
            <button 
              onClick={() => { setQuery(""); setActiveCategory("الكل"); }}
              className="mt-8 px-8 py-3 bg-[#1C4C2A] text-white rounded-xl text-sm font-black shadow-[var(--shadow-ind-floating)] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              إعادة تهيئة محرك البحث
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredData.map((cert) => {
                const config = statusConfig[cert.status];
                return (
                  <motion.div 
                    key={cert.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <div className="ind-card p-3 bg-white border border-stone-200/50 rounded-[1.5rem] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-ind-floating)] cursor-pointer relative overflow-hidden">
                       
                       

                       {/* Image Area */}
                       <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white mb-5 border border-stone-100 shadow-sm">
                          <img 
                            src={cert.image} 
                            alt={cert.companyName} 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                          
                          {/* Category Tag */}
                          <div className="absolute bottom-3 right-3 z-20">
                             <div className="px-2 py-1 rounded bg-black/40 backdrop-blur-md border border-white/10 text-white text-[9px] font-mono font-black uppercase tracking-widest shadow-lg">
                                {cert.category}
                             </div>
                          </div>
                       </div>

                       {/* Content Area */}
                       <div className="px-2 pb-2 space-y-3">
                          <h3 className="font-black text-stone-800 text-lg leading-tight truncate drop-shadow-[0_1px_0_#ffffff]">{cert.companyName}</h3>
                          
                          <div className="flex items-center gap-2 text-stone-500">
                             <MapPin size={14} className="text-[#CA8A04]" />
                             <span className="text-xs font-bold truncate">{cert.location}</span>
                          </div>

                          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                             <div className="flex flex-col">
                                <span className="text-[8px] font-mono font-black text-stone-400 uppercase tracking-tighter">License ID</span>
                                <span className="text-xs font-mono font-black text-[#007A55] tracking-tight">{cert.licenseNumber}</span>
                             </div>
                             
                             <div className={`px-2.5 py-1 rounded text-[10px] font-black flex items-center gap-1.5 shadow-[var(--shadow-ind-sharp)] border border-white/50 ${config.bg} ${config.color}`}>
                                <config.icon size={12} strokeWidth={3} />
                                {config.label}
                             </div>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 3. Detail Drawer (Industrial Technical Dossier) */}
      <AnimatePresence>
        {selectedCert && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100]"
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg lg:max-w-xl bg-[#FAF9F6] shadow-[-20px_0_50px_rgba(0,0,0,0.2)] z-[101] flex flex-col border-l border-stone-300"
            >
              {/* Noise Overlay in Drawer */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

              {/* Drawer Header (Control Panel) */}
              <div className="p-6 lg:p-8 bg-[#e0e5ec] border-b border-stone-300 sticky top-0 z-20 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${statusConfig[selectedCert.status].led} shadow-[0_0_10px_rgba(0,0,0,0.1)]`} />
                      <span className="text-[10px] font-mono font-black text-stone-500 uppercase tracking-widest">Technical Report</span>
                   </div>
                   <h2 className="text-xl lg:text-2xl font-black text-stone-800 tracking-tight">{selectedCert.companyName}</h2>
                </div>
                
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl bg-white border border-white text-stone-400 hover:text-stone-900 shadow-[var(--shadow-ind-card)] hover:shadow-[var(--shadow-ind-floating)] active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-grow overflow-y-auto p-6 lg:p-10 relative z-10 space-y-10">
                
                {/* Main Visual Display */}
                <div className="ind-card p-3 border border-stone-200/50 rounded-3xl overflow-hidden relative shadow-lg">
                   <div className="h-64 lg:h-80 w-full rounded-2xl overflow-hidden relative border border-stone-100 shadow-inner">
                      <img 
                        src={selectedCert.image} 
                        alt={selectedCert.companyName} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
                      <div className="absolute bottom-6 right-6">
                         <div className="flex items-center gap-3 text-white">
                            <div className="w-10 h-10 rounded-lg bg-[#CA8A04] flex items-center justify-center shadow-lg">
                               <ShieldCheck size={24} />
                            </div>
                            <span className="text-xl font-black drop-shadow-md">وثيقة حلال رسمية</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Technical Data Points */}
                <div className="grid grid-cols-2 gap-6 lg:gap-8">
                   {[
                     { label: "License Number", value: selectedCert.licenseNumber, mono: true, color: "text-[#007A55]" },
                     { label: "Issuance Category", value: selectedCert.category, mono: false },
                     { label: "Geographic Location", value: selectedCert.location, mono: false },
                     { label: "Expiry Protocol", value: selectedCert.expiryDate, mono: true, color: "text-rose-600" },
                     { label: "Certification Status", value: statusConfig[selectedCert.status].label, mono: false, status: true },
                     { label: "Next Technical Audit", value: selectedCert.nextFollowUp, mono: true }
                   ].map((item, idx) => (
                     <div key={idx} className="space-y-1.5">
                        <span className="text-[10px] font-mono font-black text-stone-400 uppercase tracking-widest block">{item.label}</span>
                        <div className={`p-4 rounded-xl bg-white border border-stone-200 shadow-[var(--shadow-ind-sharp)] font-black text-sm lg:text-base ${item.mono ? 'font-mono tracking-tighter' : ''} ${item.color || 'text-stone-800'}`}>
                           {item.value}
                        </div>
                     </div>
                   ))}
                </div>

                {/* Standards Module */}
                <div className="ind-card p-6 border border-stone-200/50 bg-[#e0e5ec]/30 space-y-4">
                   <div className="flex items-center gap-2 mb-2">
                      <Target size={14} className="text-[#CA8A04]" />
                      <span className="text-[10px] font-mono font-black text-stone-500 uppercase tracking-widest">Compliance Standards</span>
                   </div>
                   <div className="flex flex-wrap gap-3">
                      {selectedCert.standards.map((std, i) => (
                        <div key={i} className="px-4 py-2 bg-white border border-stone-300 rounded shadow-[var(--shadow-ind-sharp)] text-xs font-black text-stone-700 flex items-center gap-2">
                           <CheckCircle2 size={12} className="text-[#007A55]" />
                           {std}
                        </div>
                      ))}
                   </div>
                </div>

                {/* Support Contact Mini-Panel */}
                <div className="flex items-center gap-4 p-4 lg:p-6 bg-stone-900 rounded-2xl border border-stone-700 shadow-[var(--shadow-ind-floating)] relative overflow-hidden group">
                   <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
                   <div className="w-12 lg:w-14 h-12 lg:h-14 rounded-xl bg-[#1C4C2A] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      <Info size={24} className="text-[#CA8A04]" />
                   </div>
                   <div>
                      <p className="text-white font-black text-sm lg:text-base">تحتاج مساعدة فنية؟</p>
                      <p className="text-stone-400 text-xs font-medium">فريق التدقيق متاح للرد على أي استفسار.</p>
                   </div>
                   <button className="mr-auto w-10 h-10 rounded-full bg-stone-800 text-[#CA8A04] flex items-center justify-center hover:bg-stone-700 transition-colors shadow-inner">
                      <Mail size={18} />
                   </button>
                </div>
              </div>

              {/* Action Area */}
              <div className="p-6 lg:p-8 bg-white border-t border-stone-200 sticky bottom-0 z-20 flex gap-4">
                {selectedCert.status === "Active" && (
                  <button className="flex-1 btn-primary h-[60px] group shadow-[0_10px_30px_rgba(0,122,85,0.2)]">
                    <Download size={20} />
                    تحميل الوثيقة المعتمدة
                  </button>
                )}
                <button className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 border-stone-200 text-stone-700 font-black text-sm lg:text-base hover:bg-stone-50 active:translate-y-0.5 transition-all">
                   طباعة التقرير
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. Contact CTA Section (Dark Technical Panel) */}
      <section className="relative mt-20 py-24 bg-[#1C4C2A] text-center overflow-hidden border-t border-stone-800">
        <div className="absolute inset-0 opacity-20 z-0">
          <img src="/section-bg-1.jpeg" alt="Background" className="w-full h-full object-cover blur-[2px]" />
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
        </div>
        
        {/* ISO Grid overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <div className="w-20 h-20 bg-black/20 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center mb-8 text-[#CA8A04] border border-white/10 shadow-[var(--shadow-ind-floating)] group hover:scale-105 transition-transform duration-500">
            <ShieldCheck size={40} className="group-hover:rotate-12 transition-transform" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-black text-white mb-6 leading-relaxed drop-shadow-lg">
             هل تحتاج إلى مساعدة <br/> 
             <span className="text-[#CA8A04]">في التحقق من البيانات؟</span>
          </h2>
          
          <p className="text-stone-300 text-base lg:text-lg mb-12 leading-relaxed max-w-2xl font-medium">
            فريق الدعم الفني للبرنامج العربي للحلال متاح على مدار الساعة للرد على استفساراتكم المتعلقة بعمليات التحقق ومطابقة الشهادات الرسمية.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto">
            <a href="mailto:halal@aidsmo.org" className="btn-primary !bg-[#CA8A04] !text-stone-900 h-[60px] px-10 group shadow-[0_15px_40px_rgba(202,138,4,0.3)] min-w-[200px]">
              <Mail size={20} />
              راسلنا الآن
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </a>
            <button className="flex items-center justify-center gap-3 px-10 py-4 rounded-xl border-2 border-white/20 text-white font-black text-lg hover:bg-white hover:text-[#1C4C2A] transition-all duration-300 active:translate-y-[2px] group">
              <Phone size={20} className="group-hover:rotate-12 transition-transform" />
              الدعم الفني
            </button>
          </div>
        </div>
        
        {/* Hardware Detail */}
        <div className="absolute top-10 right-10 flex gap-2">
           <div className="h-10 w-2 rounded-full bg-black/40 shadow-inner" />
           <div className="h-10 w-2 rounded-full bg-black/40 shadow-inner" />
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CertificateVerification;
