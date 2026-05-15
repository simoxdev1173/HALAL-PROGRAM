"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Building2, 
  FileCheck2, 
  Search, 
  ArrowLeft,
} from "lucide-react";


const CTA_DATA = [
  {
    title: "جهات التعيين الحكومية",
    description: "البرنامج مفتوح للجهات الحكومية العربية المخوَّلة بتعيين جهات تقييم المطابقة في مجال الحلال. عند انضمامكم، تنضوي تلقائياً تحت مظلتكم جميع الجهات التي تعيِّنونها داخل دولتكم.",
    icon: Building2,
    linkText: "تقديم طلب انضمام",
    linkPath: "/join-program",
    tag: "جهات حكومية فقط",
    delay: 0.1,
    image: "/card-11.png"
  },
  {
    title: "الموردون والمنشآت",
    description: "للحصول على شهادة الحلال العربية، تتقدم للجهة المعيَّنة المعتمدة من جهة التعيين الحكومية في دولتك — لا تتقدم مباشرة للمنظمة. ابحث عن الجهة المعيَّنة المناسبة لمجال منتجك.",
    icon: FileCheck2,
    linkText: "ابحث عن جهة معيَّنة معتمدة",
    linkPath: "/certificate-verification",
    tag: "قطاع الأعمال",
    delay: 0.2,
    image: "/card-1.png"
  },
  {
    title: "التحقق من شهادة الحلال",
    description: "تحقق من صحة شهادات الحلال العربية وحالة اعتماد الشركات ومنتجاتها. أدخل رقم الترخيص الموجود على ملصق المنتج أو اسم الشركة.",
    icon: Search,
    linkText: "ابحث عن شركة أو منتج",
    linkPath: "/certificate-verification",
    tag: "خدمة عامة",
    secondary: true,
    delay: 0.3,
    image: "/card-3.png"
  }
];

/* ---------- ACTION CARDS COMPONENT ---------- */
export function ActionCards() {
  return (
    // UI EXPERT NOTE: Replaced plain slate-50 with a very subtle warm gradient to avoid the "flat grey" look
    <section className="py-20 relative z-10 bg-gradient-to-br from-stone-100 via-[#faf9f6] to-stone-50" dir="rtl">
      
      {/* Subtle background ambient glow using the gold color */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#CA8A04] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-10">
          {/* UI EXPERT NOTE: Used Gold as the structural accent line instead of green */}
          <div className="w-2 h-8 bg-[#CA8A04] rounded-full shadow-[0_0_10px_rgba(202,138,4,0.3)]"></div>
          <h2 className="text-3xl font-bold text-slate-900">خدمات المنظومة</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CTA_DATA.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: card.delay, duration: 0.6, ease: "easeOut" }}
              className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg shadow-stone-200/50 hover:shadow-2xl transition-all duration-500 border cursor-pointer ${
                card.secondary ? "border-slate-800" : "border-stone-100"
              }`}
            >
              {/* Card Image Header */}
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute bottom-4 right-6 z-20">
                  {/* UI EXPERT NOTE: Added gold border to the tags for a premium finish */}
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-md shadow-sm border ${
                    card.secondary ? "bg-slate-800 border-[#CA8A04]/50" : "bg-[#007A55] border-[#007A55]"
                  }`}>
                    {card.tag}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className={`p-8 flex flex-col flex-grow ${card.secondary ? "bg-slate-900 text-white" : "bg-white"}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-colors duration-300 ${
                    card.secondary ? "bg-[#CA8A04]/10 text-[#CA8A04]" : "bg-emerald-50 text-[#007A55] group-hover:bg-[#CA8A04]/10 group-hover:text-[#CA8A04]"
                  }`}>
                    <card.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold">{card.title}</h3>
                </div>
                
                <p className={`text-sm leading-relaxed mb-8 flex-grow ${
                  card.secondary ? "text-slate-400" : "text-slate-600"
                }`}>
                  {card.description}
                </p>

                {/* UI EXPERT NOTE: Hover state changes arrow and text to Gold for interactivity */}
                <Link to={card.linkPath} className={`flex items-center gap-2 font-bold text-sm mt-auto w-fit group/btn transition-colors cursor-pointer ${
                  card.secondary ? "text-white hover:text-[#CA8A04]" : "text-slate-900 hover:text-[#CA8A04]"
                }`}>
                  {card.linkText}
                  <ArrowLeft size={16} className="group-hover/btn:-translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- MAIN LAYOUT ---------- */
export const Hero = () => {
  return (
    <div className="w-full bg-slate-50" dir="rtl">
      <section className="relative w-full h-[750px] flex items-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-photo.png" 
            alt="Global Islamic Trade" 
            className="w-full h-full object-cover object-center"
          />
      
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#111827]/20 via-[#111827]/30 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-16 text-white">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
         
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              البرنامج العربي <span className="text-[#007A55]">للحلال</span>
            </h1>
            
            {/* UI EXPERT NOTE: Gold accent border instead of green to break up the color blocking */}
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light max-w-2xl border-r-4 border-[#CA8A04] pr-5 bg-gradient-to-l from-white/5 to-transparent py-2">
              منظومة اعتراف متعدد الأطراف تربط <strong className="font-bold text-white">جهات التعيين الحكومية العربية</strong> بمعايير <strong className="font-bold text-white">دولية معتمدة</strong> — لضمان مصداقية شهادات الحلال وحماية المستهلك المسلم في كل الأسواق، من الدول العربية إلى كل دول العالم.
            </p>
            
            {/* UI EXPERT NOTE: New Dual Button Layout - Prioritizing Government Entities */}
            <div className="mt-12 flex flex-col md:flex-row items-start gap-6">
              
              {/* Primary Button: Governmental Entities (Now Main) */}
              <div className="flex flex-col gap-2 w-full md:w-auto">
                {/* Micro-copy acting as a filter */}
                <span className="text-[#CA8A04] text-sm font-semibold tracking-wide px-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CA8A04]"></span>
                  خاص بالجهات الحكومية المخولة وهيئات منح الشهادات
                </span>
                
                <button className="bg-[#007A55] hover:bg-[#006042] text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-[#007A55]/30 flex items-center justify-center gap-3 group border border-transparent hover:border-[#CA8A04]/50 w-full md:w-auto h-[60px] cursor-pointer">
                  انضم كجهة تعيين حكومية
                  <ArrowLeft size={18} className="group-hover:text-[#CA8A04] transition-colors" />
                </button>
              </div>

              {/* Secondary Button: Suppliers & Business Sector */}
              <button className="bg-slate-900/40 backdrop-blur-sm hover:bg-[#CA8A04]/10 text-white border-2 border-[#CA8A04] px-8 py-4 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(202,138,4,0.15)] hover:shadow-[0_0_25px_rgba(202,138,4,0.3)] flex items-center justify-center gap-3 group w-full md:w-auto h-[60px] md:mt-[26px] cursor-pointer">
                طلب ترخيص العلامة للموردين
                <ArrowLeft size={18} className="text-[#CA8A04] group-hover:-translate-x-1 transition-transform" />
              </button>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section - Keeping editorial structure but with image on visual right and restored highlights */}
      <section className="relative z-10 py-32 px-6 overflow-hidden bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Editorial Image (Visual Right in RTL = First in DOM) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-200">
                <img src="/about-us-bg.png" alt="Editorial Visual" className="w-full h-auto" />
              </div>
              
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#007A55]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#CA8A04]/10 rounded-full blur-3xl"></div>
            </motion.div>

            {/* Text Content (Visual Left in RTL = Second in DOM) */}
            <div className="flex flex-col items-start text-right">
              <h1 className="text-3xl md:text-5xl font-light mb-10 tracking-tight leading-tight text-black">
                ماذا يقدم{" "}
                <span className="font-bold text-[#007A55]">
                  البرنامج العربي للحلال
                </span>{" "}
                لك؟
              </h1>

              <p className="text-lg md:text-xl leading-relaxed text-black/80">
                يعمل البرنامج على ضمان{" "}
                <strong className="text-black font-bold">
                  حماية المستهلك المسلم
                </strong>{" "}
                في الدول العربية وفي جميع دول العالم، ليس فقط من{" "}
                <strong className="text-black font-bold">
                  شهادات وعلامات الحلال المزورة
                </strong>
                ، بل أيضاً من الشهادات والعلامات التي تمنحها جهات لا تتوفر فيها{" "}
                <strong className="text-black font-bold underline decoration-[#CA8A04]/40 underline-offset-4">
                  شروط المهنية والشرعية والمصداقية
                </strong>{" "}
                اللازمة لمثل هذا المجال. نحن نضع أسس{" "}
                <strong className="text-black font-bold">
                  منظومة اعتراف متعدد الأطراف
                </strong>{" "}
                لضمان{" "}
                <strong className="relative text-black font-bold inline-block">
                  تسهيل التبادل التجاري
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#CA8A04]/50 to-transparent"></span>
                </strong>{" "}
                بين الدول العربية، مع التأكد من مطابقة المنتجات العالمية{" "}
                <strong className="text-black font-bold">
                  للمتطلبات الفنية والمواصفات القياسية العربية
                </strong>
                .
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
