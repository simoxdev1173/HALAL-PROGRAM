"use client";

import  { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
   Download, Eye, ShieldCheck, FileSignature, Award, 
  Paintbrush, Briefcase, BookOpen, Scale, Mail, Info, FileStack, 
} from "lucide-react";

const DOCUMENT_SECTIONS = [
  {
    id: "forms",
    title: "النماذج الرسمية",
    icon: FileSignature,
    color: "text-[#CA8A04]",
    led: "bg-[#CA8A04]",
    docs: [
      {
        id: "annex-1",
        title: "الملحق (1): نموذج طلب الحصول / تجديد شهادة وعلامة الحلال العربية",
        audience: "الشركات والموردين",
        type: "تقديم/تجديد",
        url: "#"
      },
      {
        id: "annex-2",
        title: "الملحق (2): نموذج طلب الانضمام إلى البرنامج العربي للحلال",
        audience: "الجهات المعنية بالحلال",
        type: "انضمام",
        url: "#"
      }
    ]
  },
  {
    id: "templates",
    title: "قوالب الشهادة والترخيص",
    icon: Award,
    color: "text-[#007A55]",
    led: "bg-[#007A55]",
    docs: [
      {
        id: "annex-3",
        title: "الملحق (3): قالب شهادة الحلال العربية",
        audience: "الاطلاع والتحقق من رقم الشهادة",
        type: "شهادة",
        url: "#"
      },
      {
        id: "annex-7",
        title: "الملحق (7): قالب ترخيص استخدام علامة الحلال العربية",
        audience: "الاطلاع والتحقق من رقم الترخيص/QR (يتضمن QR وتواريخ)",
        type: "ترخيص + QR",
        url: "#"
      }
    ]
  },
  {
    id: "brand",
    title: "دليل العلامة والهوية",
    icon: Paintbrush,
    color: "text-rose-600",
    led: "bg-rose-600",
    docs: [
      {
        id: "annex-4",
        title: "الملحق (4): التصميم المعتمد لعلامة الحلال العربية",
        audience: "المصممون والشركات المرخّصة (الألوان/الخطوط/الأبعاد)",
        type: "Brand",
        url: "#"
      }
    ]
  },
  {
    id: "operations",
    title: "وثائق تشغيل البرنامج",
    icon: Briefcase,
    color: "text-blue-600",
    led: "bg-blue-600",
    docs: [
      {
        id: "annex-5",
        title: "الملحق (5): وثيقة التعاون الفني",
        audience: "الجهات المعنية بالحلال / التشغيل",
        type: "تعاون",
        url: "#"
      },
      {
        id: "annex-6",
        title: "الملحق (6): التقرير الدوري",
        audience: "الجهات المتعاقدة لتشغيل البرنامج (كل 6 أشهر)",
        type: "تقرير",
        url: "#"
      }
    ]
  },
  {
    id: "standards",
    title: "المواصفات والمراجع الفنية",
    icon: BookOpen,
    color: "text-purple-600",
    led: "bg-purple-600",
    docs: [
      {
        id: "annex-8",
        title: "الملحق (8): قائمة المواصفات القياسية المعتمدة",
        audience: "مرجع فني ضمن البرنامج العربي للحلال",
        type: "المواصفات القياسية",
        url: "#"
      }
    ]
  },
  {
    id: "regulations",
    title: "اللوائح والتشريعات",
    icon: Scale,
    color: "text-slate-700",
    led: "bg-slate-700",
    docs: [
      {
        id: "reg-1",
        title: "اللائحة العربية لعلامة الحلال",
        audience: "عام",
        type: "لائحة",
        url: "#"
      },
      {
        id: "reg-2",
        title: "اللائحة العربية لتعيين جهات تقييم المطابقة في قطاع الحلال",
        audience: "جهات تقييم المطابقة",
        type: "اعتماد",
        url: "#"
      }
    ]
  }
];

export default function DocumentsModels() {
  const [activeTab, setActiveTab] = useState(DOCUMENT_SECTIONS[0].id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-16 lg:pt-20 font-arabic flex flex-col overflow-hidden" dir="rtl">
      
      {/* Industrial noise overlay */}
      <div className="fixed inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-50" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[35vh] min-h-[300px] overflow-hidden pt-16 lg:pt-20 flex items-center justify-center border-b border-stone-300 shadow-[var(--shadow-ind-card)]">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="/about-us-bg.png" 
            alt="النماذج والوثائق" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C4C2A]/80 via-[#1C4C2A]/60 to-[#FAF9F6]"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >  
             <div className="inline-flex items-center gap-3 mb-6 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-[var(--shadow-ind-floating)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#CA8A04] animate-pulse shadow-[0_0_10px_rgba(202,138,4,1)]"></div>
                <span className="text-white text-[10px] lg:text-xs font-black uppercase tracking-[0.2em]">المستودع الرسمي</span>
             </div>

            <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              النماذج <span className="text-[#CA8A04]">والوثائق</span>
            </h1>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto font-medium text-sm lg:text-base drop-shadow-md">
              اللوائح الفنية، الأدلة الاسترشادية، والملاحق الرسمية للبرنامج العربي للحلال — معاينة وتحميل فقط.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN INTERFACE (Control Panel Layout) --- */}
      <section className="relative py-12 lg:py-20 overflow-hidden flex-1">
        {/* ISO Grid Background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
            
            {/* Sidebar Navigation (Module Selector) */}
            <div className="w-full lg:w-[320px] lg:sticky lg:top-32 space-y-6 shrink-0">
              
              <div className="ind-card border border-stone-200/50 p-6 lg:p-8 relative bg-[#e0e5ec]">
                 <h3 className="text-[10px] lg:text-xs font-black text-stone-500 uppercase tracking-widest mb-6 border-b border-white/40 pb-4 shadow-[0_1px_0_rgba(255,255,255,0.5)]">تصنيفات الوثائق</h3>
                 
                 <div className="space-y-3">
                    {DOCUMENT_SECTIONS.map((section) => {
                      const isActive = activeTab === section.id;
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveTab(section.id)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer border text-right group ${
                            isActive 
                              ? 'bg-white border-transparent shadow-[var(--shadow-ind-floating)] scale-105 z-10 relative' 
                              : 'bg-white/50 border-stone-200 text-stone-500 hover:bg-white hover:shadow-[var(--shadow-ind-sharp)]'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors shrink-0 ${
                            isActive ? `bg-stone-50 ${section.color} border-stone-100 shadow-inner` : 'bg-transparent border-transparent'
                          }`}>
                            <Icon size={16} />
                          </div>
                          <span className={`text-xs lg:text-sm font-black transition-colors ${isActive ? 'text-stone-800' : 'text-stone-500 group-hover:text-stone-700'}`}>
                             {section.title}
                          </span>
                        </button>
                      );
                    })}
                 </div>
              </div>

              {/* Instructions Panel */}
              <div className="bg-stone-900 rounded-[1.5rem] p-6 lg:p-8 text-white relative overflow-hidden shadow-[var(--shadow-ind-floating)] border border-stone-700">
                <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
                <div className="flex items-center gap-3 mb-4">
                   <Info className="text-[#CA8A04]" size={20} />
                   <h4 className="text-sm font-black uppercase tracking-wide">كيفية تقديم الطلبات</h4>
                </div>
                <p className="text-stone-400 text-[10px] lg:text-xs leading-relaxed font-medium mb-4">
                  يتم تحميل النموذج المناسب، تعبئته، ثم إرساله مع الوثائق المطلوبة وفق التعليمات داخل النموذج. (هذه الصفحة للمعاينة والتحميل فقط).
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#CA8A04]/10 border border-[#CA8A04]/30 text-[#CA8A04] text-[10px] font-mono font-black shadow-inner">
                   <Mail size={12} />
                   <span dir="ltr">halal@aidsmo.org</span>
                </div>
              </div>

            </div>

            {/* Main Content Area (The File Viewer) */}
            <div className="flex-1 w-full lg:max-w-[850px]">
               <div className="ind-card border border-stone-200/50 bg-white rounded-[2rem] shadow-xl overflow-hidden min-h-[600px] flex flex-col relative">
                 
                 {/* Viewer Header */}
                 <AnimatePresence mode="wait">
                    {DOCUMENT_SECTIONS.map((section) => section.id === activeTab && (
                      <motion.div 
                        key={section.id} 
                        initial={{ opacity: 0, x: 20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: -20 }}
                        className="px-8 lg:px-10 py-6 lg:py-8 bg-[#e0e5ec] border-b border-stone-300 shadow-[0_4px_10px_rgba(0,0,0,0.03)] relative z-10 flex items-center justify-between"
                      >
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                               <div className={`w-2 h-2 rounded-full ${section.led} shadow-[0_0_8px_rgba(0,0,0,0.2)] animate-pulse`} />
                               <span className={`text-[9px] font-black uppercase tracking-widest ${section.color}`}>القسم النشط</span>
                            </div>
                            <h2 className="text-xl lg:text-2xl font-black text-stone-800 tracking-tight drop-shadow-[0_1px_0_#ffffff]">
                               {section.title}
                            </h2>
                         </div>
                         <div className="hidden sm:flex w-12 h-12 bg-white rounded-xl items-center justify-center border border-stone-200 shadow-[var(--shadow-ind-sharp)]">
                            <FileStack size={20} className={section.color} />
                         </div>
                      </motion.div>
                    ))}
                 </AnimatePresence>

                 {/* Viewer Content (List of Documents) */}
                 <div className="flex-1 p-6 lg:p-10 relative overflow-hidden bg-[#FAF9F6]">
                    {/* Schematic overlay inside viewer */}
                    <div className="absolute inset-0 opacity-[0.01] pointer-events-none" 
                         style={{ backgroundImage: 'linear-gradient(#636e72 1px, transparent 1px), linear-gradient(90deg, #636e72 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                    <AnimatePresence mode="wait">
                      {DOCUMENT_SECTIONS.map((section) => section.id === activeTab && (
                        <motion.div
                          key={section.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6 lg:space-y-8 relative z-10"
                        >
                           {section.docs.map((doc, idx) => (
                             <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-5 lg:p-6 shadow-[var(--shadow-ind-sharp)] hover:shadow-[var(--shadow-ind-floating)] transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                
                                <div className="flex-1 space-y-3">
                                   <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-stone-100 border border-stone-200 text-[9px] font-black uppercase tracking-widest shadow-inner">
                                      <span className={section.color}>{doc.type}</span>
                                   </div>
                                   
                                   <h4 className="text-sm lg:text-base font-black text-slate-800 leading-snug group-hover:text-[#007A55] transition-colors">
                                     {doc.title}
                                   </h4>
                                   
                                   <div className="flex items-center gap-2 text-[10px] lg:text-[11px] font-bold text-stone-500">
                                      <ShieldCheck size={14} className="text-stone-400" />
                                      {doc.audience}
                                   </div>
                                </div>

                                {/* Actions (Physical Buttons) */}
                                <div className="flex items-center gap-3 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100 w-full sm:w-auto">
                                   <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-50 hover:bg-white text-stone-600 border border-stone-200 rounded-xl font-black text-[10px] shadow-[var(--shadow-ind-sharp)] active:shadow-[var(--shadow-ind-pressed)] active:translate-y-[1px] transition-all cursor-pointer">
                                      <Eye size={14} />
                                      معاينة
                                   </button>
                                   <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1C4C2A] hover:bg-[#007A55] text-white border border-[#1C4C2A] rounded-xl font-black text-[10px] shadow-[var(--shadow-ind-floating)] active:shadow-[var(--shadow-ind-pressed)] active:translate-y-[1px] transition-all cursor-pointer">
                                      <Download size={14} />
                                      تحميل <span className="font-mono">PDF</span>
                                   </button>
                                </div>

                             </div>
                           ))}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                 </div>

                 {/* Visual Bottom Vent */}
                 <div className="h-4 bg-[#e0e5ec] border-t border-stone-300 flex items-center justify-center gap-1.5">
                    <div className="w-8 h-1 rounded-full bg-black/10"></div>
                    <div className="w-8 h-1 rounded-full bg-black/10"></div>
                    <div className="w-8 h-1 rounded-full bg-black/10"></div>
                 </div>

               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
