"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Building2, 
  FileCheck2, 
  Search, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
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

const HERO_SLIDES = [
  {
    image:
      "/slider/i-1.jpeg",
    alt: "منتجات غذائية وسلاسل توريد",
  },
    {
      image:
      "/slider/i-2.jpeg",
    alt: "وثائق واعتماد رسمي",
  },
  {
    image:
      "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=2200&q=85",
    alt: "تجارة وأسواق عالمية",
  },
];

const HERO_SLIDE_DURATION = 5200;

/* ---------- ACTION CARDS COMPONENT (Industrial Style) ---------- */
export function ActionCards() {
  return (
    <section className="py-24 relative z-10 bg-[#FAF9F6] overflow-hidden" dir="rtl">
      
      {/* Industrial noise overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-14 border-b border-stone-200 pb-6 shadow-[0_1px_0_rgba(255,255,255,1)]">
          <div className="w-3 h-8 bg-[#CA8A04] rounded-sm shadow-[var(--shadow-ind-sharp)]"></div>
          <h2 className="text-3xl font-black text-stone-800 tracking-tight">خدمات المنظومة</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CTA_DATA.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: card.delay, duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
              className={`group relative flex flex-col rounded-xl overflow-hidden cursor-pointer ${
                card.secondary 
                  ? "bg-stone-800 shadow-[var(--shadow-ind-floating)] border border-stone-700" 
                  : "bg-white ind-card border border-white/50"
              }`}
            >
              {/* Card Image Header */}
              <div className="relative h-48 w-full overflow-hidden ind-recessed rounded-none border-b border-stone-200/20">
                <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
                />
                
                {/* Vent Slots */}
                <div className="absolute top-4 right-1/2 translate-x-1/2 flex gap-1.5 z-20">
                  <div className="h-1.5 w-8 rounded-full bg-black/40 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]" />
                  <div className="h-1.5 w-8 rounded-full bg-black/40 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]" />
                </div>

                <div className="absolute bottom-4 right-6 z-20">
                  <span className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-white rounded shadow-[var(--shadow-ind-sharp)] border ${
                    card.secondary ? "bg-stone-700 border-[#CA8A04]/50 text-[#CA8A04]" : "bg-[#007A55] border-[#007A55]/80"
                  }`}>
                    {card.tag}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-grow relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ind-recessed transition-all duration-300 ${
                    card.secondary ? "bg-stone-900 text-[#CA8A04] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5)]" : "bg-stone-50 text-[#007A55] group-hover:bg-[#007A55] group-hover:text-white group-hover:shadow-[var(--shadow-ind-floating)]"
                  }`}>
                    <card.icon size={24} />
                  </div>
                  <h3 className={`text-xl font-black ${card.secondary ? "text-white" : "text-stone-800"}`}>{card.title}</h3>
                </div>
                
                <p className={`text-sm leading-relaxed mb-8 flex-grow font-medium ${
                  card.secondary ? "text-stone-400" : "text-stone-600"
                }`}>
                  {card.description}
                </p>

                <Link to={card.linkPath} className={`flex items-center gap-3 font-bold text-sm mt-auto w-fit group/btn transition-colors cursor-pointer uppercase tracking-wider ${
                  card.secondary ? "text-stone-300 hover:text-[#CA8A04]" : "text-stone-700 hover:text-[#007A55]"
                }`}>
                  {card.linkText}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-[var(--shadow-ind-sharp)] ${card.secondary ? "bg-stone-700" : "bg-white border border-stone-200"}`}>
                    <ArrowLeft size={14} className="group-hover/btn:-translate-x-1 transition-transform duration-300" />
                  </div>
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
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, HERO_SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  const goToSlide = (index: number) => setActiveSlide(index);
  const goToPrevious = () => {
    setActiveSlide((current) => (current === 0 ? HERO_SLIDES.length - 1 : current - 1));
  };
  const goToNext = () => {
    setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="w-full bg-slate-50" dir="rtl">
      <section className="relative w-full h-[690px] lg:h-[760px] xl:h-[840px] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={HERO_SLIDES[activeSlide].image}
              src={HERO_SLIDES[activeSlide].image}
              alt={HERO_SLIDES[activeSlide].alt}
              initial={{
                x: "-10%",
                scale: 1.12,
                opacity: 0,
                clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
              }}
              animate={{
                x: "0%",
                scale: 1,
                opacity: 1,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              }}
              exit={{
                x: "8%",
                scale: 1.04,
                opacity: 0,
                clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
              }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </AnimatePresence>

          <motion.div
            key={`wash-${activeSlide}`}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(0,122,85,0.42),transparent_32%),linear-gradient(90deg,rgba(3,7,18,0.26),rgba(3,7,18,0.72)_52%,rgba(3,7,18,0.95))]"
          />
          <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply"></div>
          <div
            className="absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
              backgroundSize: "54px 54px",
            }}
          />
        </div>

        <button
          onClick={goToPrevious}
          aria-label="الشريحة السابقة"
          className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-slate-950/30 text-white backdrop-blur-md hover:border-[#CA8A04] hover:bg-slate-950/50 hover:text-[#CA8A04] focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/30 sm:h-12 sm:w-12 xl:right-8"
        >
          <ChevronRight size={22} />
        </button>

        <button
          onClick={goToNext}
          aria-label="الشريحة التالية"
          className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-slate-950/30 text-white backdrop-blur-md hover:border-[#CA8A04] hover:bg-slate-950/50 hover:text-[#CA8A04] focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/30 sm:h-12 sm:w-12 xl:left-8"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-20 text-white">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6 drop-shadow-[0_16px_40px_rgba(0,0,0,.45)]">
              البرنامج العربي <span className="text-[#CA8A04]">للحلال</span>
            </h1>
            
            <p className="text-base md:text-lg xl:text-xl text-slate-100 leading-relaxed font-medium max-w-2xl border-r-4 border-[#CA8A04] pr-5 bg-gradient-to-l from-white/10 to-transparent py-3 backdrop-blur-[2px]">
              منظومة اعتراف متعدد الأطراف تربط <strong className="font-bold text-white">جهات التعيين الحكومية العربية</strong> بمعايير <strong className="font-bold text-white">دولية معتمدة</strong> — لضمان مصداقية شهادات الحلال وحماية المستهلك المسلم في كل الأسواق، من الدول العربية إلى كل دول العالم.
            </p>
            
            {/* CTA Buttons (Keeping Industrial Style) */}
            <div className="mt-8 xl:mt-12 flex flex-col md:flex-row items-start gap-4 xl:gap-6">
              
              {/* Primary Button: Governmental Entities */}
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <span className="text-[#CA8A04] text-xs xl:text-sm font-semibold tracking-wide px-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CA8A04] "></span>
                  خاص بالجهات الحكومية المخولة وهيئات منح الشهادات
                </span>
                
                <Link to="/join-program" className="btn-primary w-full md:w-auto h-[54px] xl:h-[60px] text-sm xl:text-base group">
                 الإنضمام لبرنامج
                  <div className="w-6 h-6 rounded-sm bg-black/20 flex items-center justify-center">
                    <ArrowLeft size={16} className="group-hover:text-[#CA8A04] transition-colors" />
                  </div>
                </Link>
              </div>

              {/* Secondary Button: Suppliers & Business Sector */}
              <div className="flex flex-col gap-2 w-full md:w-auto md:mt-[22px] xl:mt-[26px]">
                <Link to="/certificate-verification" className="btn-gold w-full md:w-auto h-[54px] xl:h-[60px] text-sm xl:text-base group !bg-slate-900/40  !border-2 !border-[#CA8A04] !text-white ">
                  طلب ترخيص العلامة للموردين
                  <div className="w-6 h-6 rounded-sm bg-black/30 flex items-center justify-center shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]">
                    <ArrowLeft size={16} className="text-[#CA8A04] group-hover:-translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 max-w-3xl"
          >
            <div className="grid grid-cols-3 gap-2 lg:gap-3">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === activeSlide;

                return (
                  <button
                    key={slide.image}
                    onClick={() => goToSlide(index)}
                    className={`group relative h-16 lg:h-20 overflow-hidden rounded-xl border text-right cursor-pointer transition-colors focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/30 ${
                      isActive ? "border-[#CA8A04] bg-white/15" : "border-white/15 bg-white/5 hover:border-white/35"
                    }`}
                    aria-label={`عرض الشريحة ${index + 1}`}
                  >
                    <img
                      src={slide.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-500 group-hover:opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />
                    <div className="absolute bottom-0 right-0 left-0 p-3">
                      <div className="h-1 overflow-hidden rounded-full bg-white/20">
                        {isActive && (
                          <motion.div
                            key={`progress-${activeSlide}`}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: HERO_SLIDE_DURATION / 1000, ease: "linear" }}
                            className="h-full rounded-full bg-[#CA8A04]"
                          />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section - Industrial Styling (User Liked This) */}
      <section className="relative z-10 py-20 lg:py-32 px-6 overflow-hidden bg-[#FAF9F6] border-y border-stone-300 shadow-[var(--shadow-ind-card)]">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#636e72 1px, transparent 1px), linear-gradient(90deg, #636e72 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
            
          

            {/* Text Content */}
            <div className="flex flex-col items-start text-right">
            

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6 xl:mb-8 tracking-tight text-stone-800 leading-tight">
                ماذا يقدم{" "}
                <span className="text-[#007A55] drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                  البرنامج العربي للحلال
                </span>{" "}
                لك؟
              </h1>

              <div className="p-6 xl:p-8 rounded-xl shadow-[var(--shadow-ind-card)] border border-stone-200 relative">
                {/* Structural highlight */}
                
                
                <p className="text-base lg:text-lg text-justify leading-relaxed text-stone-600 font-medium">
                  يعمل البرنامج على ضمان{" "}
                  <strong className="text-stone-900 font-black">حماية المستهلك المسلم</strong>{" "}
                  في الدول العربية وفي جميع دول العالم، ليس فقط من{" "}
                  <strong className="text-stone-900 font-black">شهادات وعلامات الحلال المزورة</strong>، بل أيضاً من الشهادات والعلامات التي تمنحها جهات لا تتوفر فيها{" "}
                  <strong className="text-[#CA8A04] font-black underline decoration-[#CA8A04]/30 underline-offset-4 decoration-2">شروط المهنية والشرعية والمصداقية</strong>{" "}
                  اللازمة لمثل هذا المجال. نحن نضع أسس{" "}
                  <strong className="text-stone-900 font-black">منظومة اعتراف متعدد الأطراف</strong>{" "}
                  لضمان{" "}
                  <strong className="text-stone-900 font-black border-b-2 border-[#CA8A04]/50 pb-0.5">تسهيل التبادل التجاري</strong>{" "}
                  بين الدول العربية، مع التأكد من مطابقة المنتجات العالمية{" "}
                  <strong className="text-stone-900 font-black">للمتطلبات الفنية والمواصفات القياسية العربية</strong>.
                </p>
              </div>
            </div>
  {/* Image (Visual Left in LTR / Right in RTL) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative p-3 lg:p-4 bg-white rounded-2xl shadow-[var(--shadow-ind-floating)] border border-stone-200"
            >
              <div className="relative z-10 rounded-xl overflow-hidden ind-recessed shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)]">
                <img src="/about-us-bg.png" alt="Editorial Visual" className="w-full h-auto grayscale-[20%] hover:grayscale-0 transition-all duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
