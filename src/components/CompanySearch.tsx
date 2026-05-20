"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Building, ShieldCheck, Globe2, ArrowLeft } from "lucide-react";

const CompanySearch = () => {
  const [searchType, setSearchType] = useState<"license" | "company">("license");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || (searchType === "company" && query.trim().length < 4)) return;
    
    setIsSearching(true);
    const searchParams = new URLSearchParams({
      type: searchType,
      q: query.trim()
    });
    window.location.href = `/certificate-verification?${searchParams.toString()}`;
  };

  const isSearchDisabled = !query || (searchType === "company" && query.trim().length < 4) || isSearching;

  return (
    <section className="relative py-16 lg:py-24 xl:py-32 bg-[#F8FAFC] overflow-hidden border-y border-stone-200 shadow-[var(--shadow-ind-card)]" dir="rtl">
      
      {/* ISO Grid from previous version */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Industrial noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* --- Right Side: Search Form --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-stone-200 text-stone-600 text-[10px] lg:text-xs font-bold mb-6 lg:mb-8 shadow-[var(--shadow-ind-sharp)] w-fit rounded-full uppercase tracking-widest">
              <ShieldCheck size={14} className="text-[#007A55]" />
              <span>بوابة التحقق الرسمية</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 mb-6 leading-[1.2] tracking-tight">
              محرك البحث عن الشركات الحاصلة على{" "}
              <span className="text-[#007A55] relative inline-block mt-2">
                شهادة الحلال العربية
                {/* Decorative underline from previous version */}
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#CA8A04]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            <p className="text-base lg:text-lg text-slate-500 leading-relaxed max-w-lg mb-8 lg:mb-12 font-medium">
              يتيح هذا المحرك إمكانية التحقق من حالة اعتماد الشركات ومنتجاتها بكل سهولة وموثوقية، لضمان أعلى معايير الجودة والتوافق.
            </p>

            {/* --- Search Panel (Industrial Control Panel) --- */}
            <div className="bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-6 relative shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
              
              {/* Status LED */}
              <div className="absolute top-3 right-1/2 translate-x-1/2">
                 <div className={`w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full ${isSearching ? 'bg-[#CA8A04] animate-pulse shadow-[0_0_8px_rgba(202,138,4,0.8)]' : 'bg-[#007A55] shadow-[0_0_8px_rgba(0,122,85,0.8)]'}`}></div>
              </div>

              {/* Toggle Buttons (Physical Switches) */}
              <div className="flex bg-slate-100/70 p-1 rounded-xl lg:rounded-2xl mb-6 relative z-0 border border-slate-100 w-full">
                {[
                  { id: "license", label: "رقم الترخيص", icon: FileText },
                  { id: "company", label: "اسم الشركة", icon: Building }
                ].map((tab) => {
                  const isActive = searchType === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => { setSearchType(tab.id as any); setQuery(""); }}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 lg:py-3 rounded-lg lg:rounded-xl text-[11px] lg:text-sm font-bold transition-all duration-300 relative z-10 cursor-pointer ${
                        isActive ? "text-[#007A55]" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="activeSearchTabIndicator"
                          className="absolute inset-0 bg-white shadow-sm border border-slate-200/50 rounded-lg lg:rounded-xl -z-10"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Recessed Input Field */}
              <form 
                onSubmit={handleSearch} 
                className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl lg:rounded-2xl p-1 lg:p-1.5 transition-all focus-within:bg-white focus-within:border-[#007A55]/50 focus-within:ring-4 focus-within:ring-[#007A55]/10"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchType === "license" ? "أدخل رقم الترخيص الكامل..." : "أدخل 4 أحرف على الأقل..."}
                  className="w-full h-12 lg:h-14 pr-4 pl-14 lg:pl-16 bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-400 text-sm lg:text-base xl:text-lg transition-all"
                />
                
                {/* Search Button (Tactile) */}
                <button
                  type="submit"
                  disabled={isSearchDisabled}
                  className="absolute left-1 lg:left-1.5 w-10 lg:w-12 h-10 lg:h-12 bg-[#007A55] text-white rounded-lg lg:rounded-[14px] flex items-center justify-center hover:bg-[#006344] active:translate-y-[2px] disabled:opacity-40 transition-all shadow-md shadow-[#007A55]/20 group cursor-pointer"
                >
                  {isSearching ? (
                    <div className="w-4 lg:w-5 h-4 lg:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ArrowLeft size={18} strokeWidth={2.5} className="lg:w-5 lg:h-5 group-hover:-translate-x-1 transition-transform" />
                  )}
                </button>
              </form>
            </div>
            
          </motion.div>

          {/* --- Left Side: Visual Image & Floating Badges --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 relative h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px] rounded-[2rem] xl:rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-[#007A55]/10"
          >
            <div className="absolute inset-0">
              <img 
                src="/searchSection.png" 
                alt="معايير الجودة والتقييس"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#007A55]/90 via-[#007A55]/40 to-transparent mix-blend-multiply transition-opacity duration-500 group-hover:opacity-70" />
            </div>

            {/* Floating Mechanical Badge 1 (Original design style) */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 md:top-10 md:right-10 bg-white/10 backdrop-blur-md border border-white/20 p-3 lg:p-4 rounded-xl lg:rounded-2xl flex items-center gap-3 lg:gap-4 text-white shadow-lg z-30"
            >
              <div className="w-10 lg:w-12 h-10 lg:h-12 bg-[#CA8A04] rounded-full flex items-center justify-center shadow-inner">
                <ShieldCheck size={20} className="lg:w-6 lg:h-6 text-slate-900" />
              </div>
              <div>
                <div className="text-[10px] lg:text-xs font-medium text-white/80 uppercase tracking-wider mb-1">دقة وموثوقية</div>
                <div className="font-bold text-base lg:text-lg leading-none">معايير معتمدة</div>
              </div>
            </motion.div>

            {/* Floating Mechanical Badge 2 */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-white p-4 lg:p-5 rounded-xl lg:rounded-2xl flex items-center gap-3 lg:gap-4 shadow-xl border border-slate-100/50 z-30"
            >
              <div className="w-10 lg:w-12 h-10 lg:h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                <Globe2 size={20} className="lg:w-6 lg:h-6 text-[#007A55]" />
              </div>
              <div>
                <div className="text-[9px] lg:text-[10px] font-bold text-slate-400 mb-1">تغطية شاملة</div>
                <div className="font-extrabold text-slate-800 text-lg lg:text-xl leading-none">دليل عالمي</div>
              </div>
            </motion.div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CompanySearch;
