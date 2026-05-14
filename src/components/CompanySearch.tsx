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
    <section className="relative py-24 lg:py-32 bg-[#F8FAFC] overflow-hidden" dir="rtl">
      {/* خلفية شبكية خفيفة تعطي إيحاء بالدقة والمعايير (ISO Style) */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* زيادة الفجوة (gap-20) لتباعد أفضل وأكثر أناقة بين اليمين واليسار */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* --- الجانب الأيمن: النصوص ومربع البحث --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold mb-8 shadow-sm w-fit">
              <ShieldCheck size={16} className="text-[#007A55]" />
              <span className="tracking-wide">بوابة التحقق الرسمية</span>
            </div>
            
            {/* العنوان مع الحفاظ على التعديلات الخاصة بك وإضافة whitespace-nowrap */}
            <h2 className="text-2xl md:text-2xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-[1.3] tracking-tight">
              محرك البحث عن الشركات الحاصلة على{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#007A55] to-[#004f37] relative inline-block mt-2 whitespace-nowrap">
                شهادة الحلال العربية
                {/* خط زخرفي أنيق تحت الكلمة */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#CA8A04]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            <p className="text-lg text-slate-500 leading-relaxed max-w-lg mb-12 font-light">
              يتيح هذا المحرك إمكانية التحقق من حالة اعتماد الشركات ومنتجاتها بكل سهولة وموثوقية، لضمان أعلى معايير الجودة والتوافق.
            </p>

            {/* --- مربع البحث التفاعلي الأنيق --- */}
            {/* تم زيادة الـ padding (p-5) لجعل البطاقة أكثر اتساعاً */}
            <div className="bg-white rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
              
              {/* أزرار التبديل الأنيقة - أصبحت متوازنة وذات مساحات مريحة */}
              <div className="flex bg-slate-100/70 p-1.5 rounded-2xl mb-6 relative z-0 border border-slate-100 w-full">
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
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors duration-300 relative z-10 cursor-pointer ${
                        isActive ? "text-[#007A55]" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="activeSearchTabIndicator"
                          className="absolute inset-0 bg-white shadow-sm border border-slate-200/50 rounded-xl -z-10"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* حقل الإدخال - تم تحسين التصميم ليكون واضحاً للمستخدم */}
              <form 
                onSubmit={handleSearch} 
                className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-1.5 transition-all focus-within:bg-white focus-within:border-[#007A55]/50 focus-within:ring-4 focus-within:ring-[#007A55]/10"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchType === "license" ? "أدخل رقم الترخيص الكامل..." : "أدخل 4 أحرف على الأقل..."}
                  // تحسين لون الـ placeholder ليصبح مرئياً بوضوح
                  className="w-full h-14 pr-4 pl-16 bg-transparent outline-none text-slate-900 font-medium placeholder:text-slate-400 text-base md:text-lg transition-all"
                />
                
                {/* زر البحث */}
                <button
                  type="submit"
                  disabled={isSearchDisabled}
                  className="absolute left-1.5 w-12 h-12 bg-[#007A55] text-white rounded-[14px] flex items-center justify-center hover:bg-[#006344] hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all shadow-md shadow-[#007A55]/20 group cursor-pointer"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
                  )}
                </button>
              </form>
            </div>
            
          </motion.div>

          {/* --- الجانب الأيسر: الصورة والواجهة التفاعلية --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 relative h-[450px] md:h-[550px] lg:h-[600px] rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-[#007A55]/10"
          >
            <div className="absolute inset-0 ">
              <img 
                src="/searchSection.png" 
                alt="معايير الجودة والتقييس"
                className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-1000 ease-out mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#007A55]/90 via-[#007A55]/40 to-transparent mix-blend-multiply" />
            </div>

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-8 md:top-12 md:right-12 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 text-white shadow-lg"
            >
              <div className="w-12 h-12 bg-[#CA8A04] rounded-full flex items-center justify-center shadow-inner">
                <ShieldCheck size={24} className="text-slate-900" />
              </div>
              <div>
                <div className="text-xs font-medium text-white/80 uppercase tracking-wider mb-1">دقة وموثوقية</div>
                <div className="font-bold text-lg leading-none">معايير معتمدة</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 left-8 md:bottom-12 md:left-12 bg-white p-5 rounded-2xl flex items-center gap-4 shadow-xl border border-slate-100/50"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                <Globe2 size={24} className="text-[#007A55]" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 mb-1">تغطية شاملة</div>
                <div className="font-extrabold text-slate-800 text-xl leading-none">دليل عالمي</div>
              </div>
            </motion.div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CompanySearch;