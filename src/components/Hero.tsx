"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  FileCheck2, 
  Search, 
  ArrowLeft,
  Globe2
} from "lucide-react";

/* ---------- DATA ---------- */
const CTA_DATA = [
  {
    title: "جهات التعيين الحكومية",
    description: "للقطاعات الحكومية المخولة بتعيين جهات تقييم المطابقة والرغبة في الانضمام لمنظومة الاعتراف المتبادل.",
    icon: Building2,
    linkText: "تقديم طلب انضمام",
    tag: "جهات حكومية",
    delay: 0.1,
    image: "/card-11.png" // Replace with your actual image path
  },
  {
    title: "الموردون والمنشآت",
    description: "للمنشآت الراغبة في ترخيص استخدام علامة الحلال العربية لمنتجاتها وخدماتها لولوج الأسواق العربية.",
    icon: FileCheck2,
    linkText: "طلب ترخيص العلامة",
    tag: "قطاع الأعمال",
    delay: 0.2,
    image: "/card-1.png" // Replace with your actual image path
  },
  {
    title: "محرك البحث والتحقق",
    description: "استعلم عن حالة اعتماد الشركات ومنتجاتها وتحقق من صحة تراخيص علامة الحلال العربية.",
    icon: Search,
    linkText: "ابحث عن شركة",
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
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EEB422] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-10">
          {/* UI EXPERT NOTE: Used Gold as the structural accent line instead of green */}
          <div className="w-2 h-8 bg-[#EEB422] rounded-full shadow-[0_0_10px_rgba(238,180,34,0.3)]"></div>
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
              className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg shadow-stone-200/50 hover:shadow-2xl transition-all duration-500 border ${
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
                    card.secondary ? "bg-slate-800 border-[#EEB422]/50" : "bg-[#007A55] border-[#007A55]"
                  }`}>
                    {card.tag}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className={`p-8 flex flex-col flex-grow ${card.secondary ? "bg-slate-900 text-white" : "bg-white"}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-colors duration-300 ${
                    card.secondary ? "bg-[#EEB422]/10 text-[#EEB422]" : "bg-emerald-50 text-[#007A55] group-hover:bg-[#EEB422]/10 group-hover:text-[#EEB422]"
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
                <button className={`flex items-center gap-2 font-bold text-sm mt-auto w-fit group/btn transition-colors ${
                  card.secondary ? "text-white hover:text-[#EEB422]" : "text-slate-900 hover:text-[#EEB422]"
                }`}>
                  {card.linkText}
                  <ArrowLeft size={16} className="group-hover/btn:-translate-x-2 transition-transform duration-300" />
                </button>
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
            src="/hero-image.png" 
            alt="Global Islamic Trade" 
            className="w-full h-full object-cover object-center"
          />
          {/* UI EXPERT NOTE: Added a very subtle warm hue (amber/gold) to the dark overlay to tie the colors together without being obvious */}
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#111827]/40 via-[#111827]/60 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-16 text-white">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
         
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              البرنامج العربي <span className="text-[#007A55]">للحلال</span>
            </h1>
            
            {/* UI EXPERT NOTE: Gold accent border instead of green to break up the color blocking */}
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light max-w-2xl border-r-4 border-[#EEB422] pr-5 bg-gradient-to-l from-white/5 to-transparent py-2">
              منظومة اعتراف متعدد الأطراف تربط <strong className="font-bold text-white">جهات التعيين الحكومية العربية</strong> بمعايير <strong className="font-bold text-white">دولية معتمدة</strong> — لضمان مصداقية شهادات الحلال وحماية المستهلك المسلم في كل الأسواق، من الدول العربية إلى كل دول العالم.
            </p>
            
            <div className="mt-10 flex gap-4">
              <button className="bg-[#007A55] hover:bg-[#006042] text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-[#007A55]/30 flex items-center gap-2 group border border-transparent hover:border-[#EEB422]/50">
                اكتشف المزيد
                {/* UI EXPERT NOTE: Subtle gold interaction on hover */}
                <ArrowLeft size={18} className="group-hover:text-[#EEB422] transition-colors" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="-mt-16 relative z-20">
        <ActionCards />
      </div>
    </div>
  );
};


/* ---------- ARAB HALAL PROGRAM (ISO STYLE) ---------- */
export const ArabHalalProgram = () => {
  return (
    // UI EXPERT NOTE: Applied a very soft, warm off-white gradient background. It looks clean but removes the "plain/sterile" feeling of pure white.
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-[#faf9f6] to-stone-50 text-gray-900" dir="rtl">
      
      {/* Subtle ambient light effects (Gold and Green) - Very faint */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#EEB422] opacity-[0.02] blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#007A55] opacity-[0.02] blur-[120px] rounded-full pointer-events-none"></div>

      {/* Intro Section */}
      <section className="py-24 px-6 md:px-12 border-b border-stone-200/60 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-10 tracking-tight leading-tight">
            ماذا يقدم <span className="font-bold text-[#007A55]">البرنامج العربي للحلال</span> لك؟
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-600">
            يعمل البرنامج على ضمان <strong className="text-gray-900">حماية المستهلك المسلم</strong> في جميع أنحاء العالم من <strong className="text-gray-900">الشهادات والعلامات المزورة</strong>. 
            نحن نضع أسس <strong className="text-gray-900">منظومة اعتراف متعدد الأطراف</strong> لضمان <strong className="text-gray-900 border-b-2 border-[#EEB422]/40 pb-1">تسهيل التبادل التجاري</strong> بين الدول العربية، مع التأكد من مطابقة المنتجات العالمية <strong className="text-gray-900">للمتطلبات الفنية والمواصفات القياسية العربية</strong>.
          </p>
        </div>
      </section>

      {/* Three Cards Section */}
      <section className="py-20 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Card 1 */}
          {/* UI EXPERT NOTE: Replaced standard border with a top border hover effect using the Gold accent */}
          <div className="bg-white/80 backdrop-blur-sm p-10 lg:p-12 flex flex-col h-full border border-stone-100 border-t-4 border-t-transparent hover:border-t-[#EEB422] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all duration-500 group">
            <h2 className="text-2xl font-bold mb-6 text-emerald-900 group-hover:text-[#007A55] transition-colors">ما هو البرنامج؟</h2>
            <p className="text-lg text-gray-600 mb-10 flex-grow">
              استكشف منظومتنا المتكاملة للاعتراف المتبادل، والتي تم وضع بنودها لتتوافق مع <strong className="text-gray-900">مواصفات تقييم المطابقة الدولية ISO/IEC</strong> ، بهدف تأسيس <strong className="text-gray-900">مرجعية فنية موحدة</strong> لجميع المنتجات المشمولة في البرنامج.
            </p>
            {/* UI EXPERT NOTE: Gold used for the underline, creating a highly polished interaction */}
            <a href="#" className="inline-block text-sm font-black uppercase tracking-widest text-[#007A55] border-b-2 border-[#EEB422] pb-1 hover:text-[#EEB422] transition-colors w-fit">
              تعرف على أهداف البرنامج
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-white/80 backdrop-blur-sm p-10 lg:p-12 flex flex-col h-full border border-stone-100 border-t-4 border-t-transparent hover:border-t-[#EEB422] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all duration-500 group">
            <h2 className="text-2xl font-bold mb-6 text-emerald-900 group-hover:text-[#007A55] transition-colors">هل تبحث عن الاعتماد؟</h2>
            <p className="text-lg text-gray-600 mb-10 flex-grow">
              سواء كنت <strong className="text-gray-900">جهة تعيين حكومية</strong> تسعى للانضمام أو <strong className="text-gray-900">مورداً</strong> يرغب في الحصول على <strong className="text-gray-900 bg-[#EEB422]/10 px-1 rounded">ترخيص استخدام علامة الحلال</strong> ، نوفر لك المسار القانوني والمهني.
            </p>
            <a href="#" className="inline-block text-sm font-black uppercase tracking-widest text-[#007A55] border-b-2 border-[#EEB422] pb-1 hover:text-[#EEB422] transition-colors w-fit">
              ابدأ طلب الانضمام
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white/80 backdrop-blur-sm p-10 lg:p-12 flex flex-col h-full border border-stone-100 border-t-4 border-t-transparent hover:border-t-[#EEB422] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all duration-500 group">
            <h2 className="text-2xl font-bold mb-6 text-emerald-900 group-hover:text-[#007A55] transition-colors">تحقق من الشهادة</h2>
            <p className="text-lg text-gray-600 mb-10 flex-grow">
              تأكد من <strong className="text-gray-900">حالة اعتماد الشركات</strong> ومنتجاتها عبر <strong className="text-gray-900">محرك البحث المتطور</strong>. يتيح لك النظام التحقق الفوري من رقم الترخيص وصلاحية شهادات الحلال.
            </p>
            <a href="#" className="inline-block text-sm font-black uppercase tracking-widest text-[#007A55] border-b-2 border-[#EEB422] pb-1 hover:text-[#EEB422] transition-colors w-fit">
              انتقل إلى سجل المعتمدين
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};