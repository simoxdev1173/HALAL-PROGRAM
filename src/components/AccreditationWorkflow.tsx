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
      description: "تقوم <strong class='text-slate-900 font-bold'>جهات التعيين الحكومية</strong> بتقديم طلب رسمي للمنظمة مشفوعاً بكافة الوثائق القانونية والفنية.",
      icon: FileText,
      // Gradient background and image setup for the top visual
      bgGradient: "from-emerald-50 to-teal-100",
      image: "/process/process-1.png"
    },
    {
      id: "2",
      title: "التقييم والقرار",
      subtitle: "المراجعة الفنية",
      description: "يخضع الطلب لتدقيق دقيق وفق مواصفات <strong class='text-slate-900 font-bold'>ISO/IEC 17000</strong>، ويتم الرد خلال <strong class='text-[#007A55] font-bold'>30 يوماً</strong> كحد أقصى.",
      icon: Search,
      bgGradient: "from-[#EEB422]/10 to-amber-100/50",
      image: "/process/process-2.png"
    },
    {
      id: "3",
      title: "وثيقة التعاون الفني",
      subtitle: "الاعتماد الرسمي",
      description: "عند القبول، يتم توقيع الاتفاقية لمنح حق استخدام <strong class='text-slate-900 font-bold'>علامة الحلال العربية</strong> وتفويض الجهات التابعة.",
      icon: Handshake,
      bgGradient: "from-stone-100 to-slate-200",
      image: "/process/process-3.png"
    }
  ];

  // Animation Variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between each step animating in
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  };

  return (
    // Replaced standard solid background with a subtle, warm off-white gradient
    <section className="relative py-32 bg-gradient-to-br from-[#fdfcfb] via-[#faf9f6] to-stone-50 overflow-hidden" dir="rtl">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EEB422] opacity-[0.02] blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#007A55] opacity-[0.02] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* --- 1. HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-4xl font-light text-slate-900 tracking-tight leading-tight mb-6"
          >
           كيف تتم عملية الانضمام <strong className="text-[#007A55] font-bold relative inline-block">
            إلى البرنامج العربي للحلال؟
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#EEB422]/60 to-transparent"></span>
            </strong>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed"
          >
            نظام عالمي يضمن <strong className="text-slate-900 font-bold">المصداقية الشرعية</strong> ويسهل 
            <strong className="text-slate-900 font-bold"> التبادل التجاري</strong> للمنتجات والخدمات عبر آلية اعتماد شفافة.
          </motion.p>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold shadow-xl shadow-slate-900/10 hover:bg-[#007A55] hover:shadow-[#007A55]/20 transition-all text-sm"
          >
            تحميل دليل وثائق البرنامج 
            <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

        {/* --- 2. WORKFLOW TIMELINE SECTION --- */}
        <div className="relative w-full mb-32">
          
          {/* The Connecting Animated Line (Hidden on mobile) */}
          {/* Positioned exactly vertically centered with the numbered circles */}
          <div className="hidden md:block absolute top-[284px] right-0 w-full h-[3px] bg-stone-200 rounded-full z-0">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              className="h-full bg-gradient-to-l from-[#007A55] via-[#EEB422] to-transparent origin-right rounded-full shadow-[0_0_10px_rgba(0,122,85,0.3)]"
            />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10"
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className="group relative flex flex-col gap-8 text-center md:text-right"
              >
                {/* A. Top Image Block */}
                <div className="relative h-60 w-full rounded-3xl overflow-hidden bg-white shadow-lg shadow-stone-200/50 group-hover:shadow-2xl group-hover:shadow-[#007A55]/10 transition-all duration-500 border border-stone-100">
                  {/* Subtle Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-60 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-20`}></div>
                  {/* Background Image */}
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110 opacity-90"
                  />
                  {/* Floating Icon inside Image */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                     <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl flex items-center justify-center transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-3">
                       <step.icon className="w-8 h-8 text-[#007A55]" strokeWidth={1.5} />
                     </div>
                  </div>
                </div>

                {/* B. Middle Number Badge */}
                {/* This sits perfectly on top of the horizontal line */}
                <div className="relative flex items-center justify-center w-12 h-12 bg-white rounded-full mx-auto border-4 border-stone-50 shadow-md group-hover:border-[#007A55] transition-colors duration-500 z-10">
                  <div className="w-full h-full bg-[#007A55] rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:bg-[#EEB422] transition-colors duration-500 shadow-inner">
                    {step.id}
                  </div>
                </div>

                {/* C. Bottom Content Block */}
                <div className="space-y-3 px-2">
                  <span className="text-[11px] font-black text-[#EEB422] tracking-widest uppercase block mb-1">
                    {step.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-[#007A55] transition-colors">
                    {step.title}
                  </h3>
                  <p 
                    className="text-sm text-slate-600 leading-relaxed pt-2"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- 3. REFINED BOTTOM CARD (Photo Background) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group border border-stone-200/20"
        >
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 bg-slate-950">
            <img 
              src="/bg-card.png" 
              alt="Professional Setting"
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 group-hover:opacity-30 mix-blend-luminosity"
            />
            {/* Elegant dark gradient for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-slate-900/20 to-transparent" />
          </div>

          <div className="relative p-10 md:p-14 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 z-10">
            
            <div className="flex-1 text-center md:text-right max-w-3xl">
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#EEB422]/20 border border-[#EEB422]/30 text-[#EEB422] text-xs font-bold tracking-wider mb-6 backdrop-blur-sm">
                ملاحظة هامة
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
                تفويض القطاع الخاص والجهات غير الحكومية
              </h4>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed font-light border-r-4 border-[#007A55] pr-5 bg-gradient-to-l from-white/5 to-transparent py-2">
                يُمكن لجهة التعيين الحكومية <strong className="text-white font-bold">تفويض جهات تقييم مطابقة خاصة</strong> للعمل تحت مظلتها، شريطة إبلاغ المنظمة كتابياً والالتزام بسداد التكاليف المقررة لضمان <strong className="text-[#EEB422] font-bold">نزاهة وشرعية</strong> علامة الحلال العربية.
              </p>
            </div>

            <motion.button 
              whileHover={{ x: -5 }}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-[#007A55] bg-[#007A55]/20 backdrop-blur-md text-white hover:bg-[#007A55] font-bold text-sm transition-all whitespace-nowrap shadow-[0_0_20px_rgba(0,122,85,0.2)] group/btn w-full md:w-auto"
            >
              الاطلاع على المتطلبات الفنية 
              <ArrowLeft size={18} className="text-[#EEB422] group-hover/btn:-translate-x-1 transition-transform" />
            </motion.button>
            
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AccreditationWorkflow;