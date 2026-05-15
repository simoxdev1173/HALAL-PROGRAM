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
      image: "/workflow/w-1.png"
    },
    {
      id: "2",
      title: "التقييم والقرار",
      subtitle: "المراجعة الفنية",
      description: "يخضع الطلب لتدقيق دقيق وفق مواصفات <strong class='text-slate-900 font-bold'>ISO/IEC 17000</strong>، ويتم الرد خلال <strong class='text-[#007A55] font-bold'>30 يوماً</strong> كحد أقصى.",
      icon: Search,
      bgGradient: "from-[#CA8A04]/10 to-amber-100/50",
      image: "/workflow/w-2.png"
    },
    {
      id: "3",
      title: "وثيقة التعاون الفني",
      subtitle: "الاعتماد الرسمي",
      description: "عند القبول، يتم توقيع الاتفاقية لمنح حق استخدام <strong class='text-slate-900 font-bold'>علامة الحلال العربية</strong> وتفويض الجهات التابعة.",
      icon: Handshake,
      bgGradient: "from-stone-100 to-slate-200",
      image: "/workflow/w-3.png"
    }
  ];

  // Animation Variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Slower, more cinematic stagger
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }    }
  };

  return (
    // Tightened vertical padding significantly (py-12 to py-16)
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-[#fdfcfb] via-[#faf9f6] to-stone-50 overflow-hidden" dir="rtl">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#CA8A04] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#007A55] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* --- 1. HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-6"
          >
            كيفية الانضمام <strong className="text-[#007A55] font-bold relative inline-block">
            إلى البرنامج العربي للحلال؟
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#CA8A04]/60 to-transparent"></span>
            </strong>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-base md:text-lg text-slate-600 text-nowrap max-w-3xl mb-8 leading-relaxed"
          >
            نظام عالمي يضمن <strong className="text-slate-900 font-bold">المصداقية الشرعية</strong> ويسهل 
            <strong className="text-slate-900  font-bold"> التبادل التجاري</strong> للمنتجات والخدمات عبر آلية اعتماد شفافة.
          </motion.p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/10 hover:bg-[#007A55] hover:shadow-[#007A55]/20 transition-all text-sm md:text-base cursor-pointer"
          >
            تحميل دليل وثائق البرنامج 
            <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>

        {/* --- 2. WORKFLOW TIMELINE SECTION --- */}
        <div className="relative w-full mb-20 md:mb-32">
          
          {/* The Connecting Animated Line */}
          {/* Adjusted 'top' positioning to perfectly center with the newly sized images (h-64 = 256px + gap-5 (20px) + half-badge (20px) = 296px) */}
          <div className="hidden md:block absolute top-[296px] right-0 w-full h-[2px] bg-stone-200 rounded-full z-0">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              className="h-full bg-gradient-to-l from-[#007A55] via-[#CA8A04] to-transparent origin-right rounded-full shadow-[0_0_8px_rgba(0,122,85,0.3)]"
            />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10"
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="group relative flex flex-col gap-6 text-center md:text-right"
              >
                {/* A. Top Image Block - Increased height to h-64 */}
                <div className="relative h-64 w-full rounded-3xl overflow-hidden bg-white shadow-lg shadow-stone-200/50 group-hover:shadow-2xl group-hover:shadow-[#007A55]/15 transition-all duration-700 border border-stone-100">
                  {/* Subtle Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-40 mix-blend-multiply z-10 transition-opacity duration-700 group-hover:opacity-20`}></div>
                  {/* Background Image */}
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-110 opacity-95"
                  />
                  {/* Floating Icon inside Image */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                     <div className="w-16 h-16 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center transform transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-6">
                       <step.icon className="w-8 h-8 text-[#007A55]" strokeWidth={1.5} />
                     </div>
                  </div>
                </div>

                {/* B. Middle Number Badge */}
                <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full mx-auto border-4 border-stone-50 shadow-sm group-hover:border-[#007A55] transition-colors duration-500 z-10">
                  <div className="w-full h-full bg-[#007A55] rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:bg-[#CA8A04] transition-colors duration-500 shadow-inner">
                    {step.id}
                  </div>
                </div>

                {/* C. Bottom Content Block */}
                <div className="space-y-3 px-4">
                  <span className="text-xs font-black text-[#CA8A04] tracking-widest uppercase block">
                    {step.subtitle}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-[#007A55] transition-colors">
                    {step.title}
                  </h3>
                  <p 
                    className="text-sm md:text-base text-slate-600 leading-relaxed pt-1"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

     {/* --- 3. REFINED BOTTOM CARD (Photo Background) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          // Added a subtle shadow and border color transition on hover for a premium feel
          className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group border border-stone-200/20 hover:border-[#007A55]/30 cursor-pointer"
        >
          {/* Background Image with Directed Overlay */}
          <div className="absolute inset-0 bg-slate-900">
            <img 
              src="/workflow/w-4.png" 
              alt="Professional Setting"
              // Removed mix-blend-luminosity to keep the image's true colors.
              // Changed object-fill to object-cover to prevent ugly stretching.
              // Smooth, premium scale effect on hover.
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 ease-out"
            />
            {/* 
              UI/UX Trick: Since the text is on the right (Arabic), we use 'bg-gradient-to-l' 
              to make the right side dark for text legibility, while the left side stays clear to show the image.
            */}
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950/95 via-slate-900/60 to-transparent transition-opacity duration-700" />
          </div>

          <div className="relative p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 z-10">
            
            <div className="flex-1 text-center md:text-right max-w-2xl">
              <div className="inline-block px-3 py-1 rounded-full bg-[#CA8A04]/20 border border-[#CA8A04]/30 text-[#CA8A04] text-[10px] font-bold tracking-wider mb-4 backdrop-blur-md">
                ملاحظة هامة
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-3 drop-shadow-md">
                تفويض القطاع الخاص والجهات غير الحكومية
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed font-light border-r-2 border-[#007A55] pr-4 bg-gradient-to-l from-white/10 to-transparent py-2 backdrop-blur-[2px]">
                يُمكن لجهة التعيين الحكومية <strong className="text-white font-bold">تفويض جهات تقييم مطابقة خاصة</strong> للعمل تحت مظلتها، شريطة إبلاغ المنظمة كتابياً والالتزام بسداد التكاليف المقررة لضمان <strong className="text-[#CA8A04] font-bold">نزاهة وشرعية</strong> علامة الحلال العربية.
              </p>
            </div>

            <motion.button 
              whileHover={{ x: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
  
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#007A55] bg-[#007A55]/80 backdrop-blur-md text-white hover:bg-[#007A55] hover:shadow-[0_0_20px_rgba(0,122,85,0.4)] font-bold text-xs transition-all duration-300 whitespace-nowrap group/btn w-full md:w-auto shrink-0 cursor-pointer"
            >
              الاطلاع على المتطلبات الفنية 
     
              <ArrowLeft size={16} className="text-[#CA8A04] group-hover/btn:-translate-x-1.5 transition-transform duration-300" />
            </motion.button>
            
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AccreditationWorkflow;