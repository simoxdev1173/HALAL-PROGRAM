"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  Handshake, 
  Download, 
  ArrowLeft
} from "lucide-react";

const AccreditationWorkflow = () => {
  const steps = [
    {
      id: "1",
      title: "تقديم طلب الانضمام",
      subtitle: "المرحلة الإجرائية",
      description: "تقوم <strong class='text-stone-900 font-black'>جهات التعيين الحكومية</strong> بتقديم طلب رسمي للمنظمة مشفوعاً بكافة الوثائق القانونية والفنية.",
      icon: FileText,
      image: "/workflow/w-1.png",
      delay: 0.1
    },
    {
      id: "2",
      title: "التقييم والقرار",
      subtitle: "المراجعة الفنية",
      description: "يخضع الطلب لتدقيق دقيق وفق مواصفات <strong class='text-stone-900 font-black'>ISO/IEC 17000</strong>، ويتم الرد خلال <strong class='text-[#007A55] font-black'>30 يوماً</strong> كحد أقصى.",
      icon: Search,
      image: "/workflow/w-2.png",
      delay: 0.2
    },
    {
      id: "3",
      title: "وثيقة التعاون الفني",
      subtitle: "الاعتماد الرسمي",
      description: "عند القبول، يتم توقيع الاتفاقية لمنح حق استخدام <strong class='text-stone-900 font-black'>علامة الحلال العربية</strong> وتفويض الجهات التابعة.",
      icon: Handshake,
      image: "/workflow/w-3.png",
      delay: 0.3
    }
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-[#fdfcfb] via-[#faf9f6] to-stone-50 overflow-hidden" dir="rtl">
      
      {/* Industrial noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#636e72 1px, transparent 1px), linear-gradient(90deg, #636e72 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* --- 1. HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-20 relative">
          
          <div className="inline-flex items-center justify-center gap-3 mb-6">
               <div className="w-12 h-1 bg-stone-300 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
               <span className="px-4 py-1.5 text-[10px] lg:text-xs font-mono font-bold uppercase tracking-widest text-[#007A55] rounded bg-white shadow-[var(--shadow-ind-sharp)] border border-stone-200">الإجراءات</span>
               <div className="w-12 h-1 bg-stone-300 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-stone-800 tracking-tight leading-tight mb-6 drop-shadow-[0_1px_1px_#ffffff]">
            كيفية الانضمام <span className="text-[#007A55]">للبرنامج؟</span>
          </h2>
          
          <p className="text-sm md:text-base lg:text-lg text-stone-600 font-medium max-w-3xl mb-10 leading-relaxed">
            نظام عالمي يضمن <strong className="text-stone-900 font-black">المصداقية الشرعية</strong> ويسهل 
            <strong className="text-stone-900 font-black"> التبادل التجاري</strong> للمنتجات والخدمات عبر آلية اعتماد شفافة وموثوقة.
          </p>

          <motion.button 
            whileHover={{ y: -1 }}
            whileTap={{ y: 2 }}
            className="btn-primary group h-[54px] xl:h-[60px] text-sm xl:text-base"
          >
            تحميل دليل وثائق البرنامج 
            <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-sm bg-black/10 flex items-center justify-center shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
              <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.button>
        </div>

        {/* --- 2. WORKFLOW TIMELINE SECTION --- */}
        <div className="relative w-full mb-16 lg:mb-24">
          
          {/* Physical Connector Pipe */}
          <div className="hidden md:block absolute top-[160px] xl:top-[180px] right-0 w-full h-3 rounded-full bg-stone-200 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] z-0">
             {/* Progress indicator inside pipe */}
             <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="h-full bg-gradient-to-l from-[#007A55] via-[#CA8A04] to-transparent origin-right rounded-full shadow-[0_0_8px_rgba(0,122,85,0.3)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay, duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
                className="group relative flex flex-col text-center"
              >
                {/* A. Top Image Block - Physical Module */}
                <div className="relative h-[280px] lg:h-[320px] xl:h-[360px] w-full ind-card border border-stone-200/50 p-2 lg:p-3 mb-6">
                  
                  {/* Screws */}
                  <div className="absolute top-2 left-2 w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-gradient-to-br from-stone-300 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] z-20"></div>
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-gradient-to-br from-stone-300 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] z-20"></div>
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-gradient-to-br from-stone-300 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] z-20"></div>
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-gradient-to-br from-stone-300 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] z-20"></div>

                  {/* Recessed Screen Area */}
                  <div className="relative w-full h-full ind-recessed overflow-hidden rounded-xl group-hover:shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)] transition-all">
                    {/* Scanline overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] z-10 pointer-events-none"></div>
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110 opacity-95"
                    />
                    
                    {/* Floating Icon inside Screen */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                       <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white shadow-[var(--shadow-ind-floating)] rounded-xl flex items-center justify-center border border-stone-200">
                         <step.icon className="w-6 h-6 lg:w-8 lg:h-8 text-[#007A55]" strokeWidth={2} />
                       </div>
                    </div>
                  </div>
                </div>

                {/* B. Middle Number Badge / Indicator */}
                <div className="relative flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 mx-auto mb-6 bg-stone-100 rounded-full shadow-[var(--shadow-ind-card)] border-4 border-[#FAF9F6] z-10 group-hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-full h-full rounded-full ind-recessed flex items-center justify-center">
                    <span className="font-mono font-black text-base lg:text-lg text-stone-500 group-hover:text-[#007A55] transition-colors">
                      {step.id}
                    </span>
                  </div>
                </div>

                {/* C. Bottom Content Block */}
                <div className="space-y-3 px-2">
                  <span className="inline-block px-3 py-1 bg-stone-200 text-stone-600 rounded text-[9px] lg:text-[10px] font-mono font-bold tracking-widest uppercase shadow-[var(--shadow-ind-sharp)]">
                    {step.subtitle}
                  </span>
                  <h3 className="text-lg lg:text-xl font-black text-stone-800">
                    {step.title}
                  </h3>
                  <p 
                    className="text-xs lg:text-sm text-stone-600 font-medium leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- 3. REFINED BOTTOM CARD (Dark Technical Panel) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-[var(--shadow-ind-floating)] border border-stone-700 group cursor-pointer"
        >
          {/* Background Image from previous version */}
          <div className="absolute inset-0">
            <img 
              src="/workflow/w-4.png" 
              alt="Professional Setting"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950/95 via-slate-900/60 to-transparent transition-opacity duration-700" />
          </div>

          {/* Vents */}
          <div className="absolute top-6 left-6 flex gap-1.5 z-20">
             <div className="h-2 w-6 lg:w-8 rounded-full bg-black/60 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]" />
             <div className="h-2 w-6 lg:w-8 rounded-full bg-black/60 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]" />
          </div>

          <div className="relative p-6 lg:p-10 xl:p-12 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-8 z-10">
            
            <div className="flex-1 text-right max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#CA8A04] animate-pulse shadow-[0_0_10px_rgba(202,138,4,0.6)]"></div>
                 <span className="text-[#CA8A04] font-mono text-[10px] lg:text-xs font-bold tracking-widest uppercase">ملاحظة هامة</span>
              </div>
              <h4 className="text-xl lg:text-2xl font-black text-white mb-4">
                تفويض القطاع الخاص والجهات غير الحكومية
              </h4>
              <p className="text-stone-300 text-sm lg:text-base leading-relaxed font-medium">
                يُمكن لجهة التعيين الحكومية <strong className="text-white font-black">تفويض جهات تقييم مطابقة خاصة</strong> للعمل تحت مظلتها، شريطة إبلاغ المنظمة كتابياً والالتزام بسداد التكاليف المقررة لضمان <strong className="text-[#CA8A04] font-black underline decoration-[#CA8A04]/30 underline-offset-4">نزاهة وشرعية</strong> علامة الحلال العربية.
              </p>
            </div>

            <motion.button 
              whileHover={{ y: -1 }}
              whileTap={{ y: 2 }}
              className="flex items-center justify-center gap-3 px-6 lg:px-8 py-3.5 lg:py-4 rounded-xl border-2 border-[#CA8A04] bg-[#CA8A04]/10 backdrop-blur-md shadow-[var(--shadow-ind-floating)] text-white hover:bg-[#CA8A04] font-bold text-sm lg:text-base transition-all duration-300 whitespace-nowrap group/btn w-full md:w-auto shrink-0"
            >
              الاطلاع على المتطلبات
              <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-sm bg-black/30 flex items-center justify-center shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]">
                 <ArrowLeft size={14} className="text-[#CA8A04] group-hover/btn:-translate-x-1 transition-transform" />
              </div>
            </motion.button>
            
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AccreditationWorkflow;