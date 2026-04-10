"use client";
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Handshake, 
  Download, 
  Info,
  ArrowLeft
} from 'lucide-react';

const AccreditationWorkflow = () => {
  const steps = [
    {
      id: "01",
      title: "تقديم طلب الانضمام",
      subtitle: "المرحلة الإجرائية",
      description: "تقوم <strong class='text-slate-900 font-bold'>جهات التعيين الحكومية</strong> بتقديم طلب رسمي للمنظمة مشفوعاً بكافة الوثائق القانونية والفنية.",
      details: "يجب أن تكون الجهة مخولة رسمياً بإدارة تقييم المطابقة في بلدها.",
      icon: FileText,
    },
    {
      id: "02",
      title: "التقييم والقرار",
      subtitle: "المراجعة الفنية",
      description: "يخضع الطلب لتدقيق دقيق وفق مواصفات <strong class='text-slate-900 font-bold'>ISO/IEC 17000</strong>، ويتم الرد خلال <strong class='text-emerald-700 font-bold'>30 يوماً</strong> كحد أقصى.",
      details: "التقييم يشمل الجوانب الإدارية والفنية لضمان الكفاءة والحيادية.",
      icon: Search,
    },
    {
      id: "03",
      title: "وثيقة التعاون الفني",
      subtitle: "الاعتماد الرسمي",
      description: "عند القبول، يتم توقيع الاتفاقية لمنح حق استخدام <strong class='text-slate-900 font-bold'>علامة الحلال العربية</strong> وتفويض الجهات التابعة.",
      details: "رسوم تفويض البرنامج هي 250 دولاراً لكل مجال ولمدة ثلاث سنوات.",
      icon: Handshake,
    }
  ];

  return (
    <section className="relative py-24 bg-[#F8FAFC]" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        
        {/* --- 1. HEADER & CTA --- */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6"
          >
            مسار الانضمام <span className="text-emerald-700 font-extrabold relative">
              والاعتماد الرسمي
              <span className="absolute bottom-1 right-0 w-full h-2 bg-emerald-100 -z-10 rounded-full"></span>
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-slate-500 max-w-2xl mb-10 leading-relaxed"
          >
            نظام عالمي يضمن <strong className="text-slate-800 font-medium">المصداقية الشرعية</strong> ويسهل 
            <strong className="text-slate-800 font-medium"> التبادل التجاري</strong> للمنتجات والخدمات عبر آلية اعتماد شفافة.
          </motion.p>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 px-8 py-3.5 bg-slate-900 text-white rounded-full font-medium shadow-xl shadow-slate-900/10 hover:bg-emerald-800 hover:shadow-emerald-900/20 transition-all text-sm"
          >
            <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            تحميل دليل وثائق البرنامج 
          </motion.button>
        </div>

        {/* --- 2. WORKFLOW TIMELINE & CARDS --- */}
        <div className="relative">
          {/* Timeline Connecting Line (Centered behind icons) */}
          <div className="hidden md:block absolute top-10 right-0 w-full h-[2px] bg-slate-200 z-0">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-l from-emerald-500/50 via-emerald-400/30 to-transparent origin-right"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative flex flex-col md:items-start"
              >
                {/* Floating Icon Node (On top of the line) */}
                <div className="relative w-20 h-20 bg-white border border-slate-200 rounded-[1.5rem] shadow-xl flex items-center justify-center mb-10 group-hover:-translate-y-2 group-hover:border-emerald-300 group-hover:shadow-2xl group-hover:shadow-emerald-900/10 transition-all duration-500 z-20">
                  <step.icon className="w-7 h-7 text-emerald-800 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                  
                  {/* Small step number badge */}
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-900 text-white text-[10px] flex items-center justify-center font-black rounded-full shadow-md">
                    {step.id}
                  </span>
                </div>

                {/* Premium Content Card */}
                <div className="w-full bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(4,47,46,0.08)] hover:border-emerald-200 transition-all duration-500 flex flex-col flex-grow overflow-hidden relative">
                  
                  {/* Background Watermark Number */}
                  <div className="absolute -top-6 left-2 text-8xl font-black text-slate-50 group-hover:text-emerald-50 transition-colors duration-500 select-none z-0">
                    {step.id}
                  </div>

                  <div className="relative z-10 flex flex-col h-full">
                    <span className="text-[11px] font-bold text-emerald-600 tracking-widest uppercase mb-3 block">
                      {step.subtitle}
                    </span>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-900 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p 
                      className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow"
                      dangerouslySetInnerHTML={{ __html: step.description }}
                    />
                    
                    {/* Info Details Footer */}
                    <div className="pt-5 border-t border-slate-100 flex items-start gap-3 mt-auto group-hover:border-emerald-100 transition-colors">
                      <Info size={16} className="text-slate-400 group-hover:text-emerald-500 mt-0.5 shrink-0 transition-colors" />
                      <p className="text-[13px] text-slate-500 leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- 3. REFINED BOTTOM CARD (Photo Background) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 relative rounded-[2.5rem] overflow-hidden shadow-xl group"
        >
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0">
            <img 
              src="/card-bg.jpeg" 
              alt="Professional Setting"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]" />
          </div>

          <div className="relative p-8 md:p-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            
            <div className="flex-1 text-center md:text-right max-w-3xl">
              <h4 className="text-md md:text-lg font-bold text-white mb-4">
                تفويض القطاع الخاص والجهات غير الحكومية
              </h4>
              <p className="text-sm md:text-md text-slate-300 leading-relaxed">
                يُمكن لجهة التعيين الحكومية <strong className="text-emerald-400 font-medium">تفويض جهات تقييم مطابقة خاصة</strong> للعمل تحت مظلتها، شريطة إبلاغ المنظمة كتابياً والالتزام بسداد التكاليف المقررة لضمان <strong className="text-white font-medium">نزاهة وشرعية</strong> علامة الحلال العربية.
              </p>
            </div>

            <motion.button 
              whileHover={{ x: -5 }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white font-medium text-sm transition-all whitespace-nowrap group/btn"
            >
              المتطلبات الفنية 
              <ArrowLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
            </motion.button>
            
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AccreditationWorkflow;