"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function AboutProgram() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen font-arabic overflow-hidden" dir="rtl">
      
      {/* Industrial noise overlay */}
      <div className="fixed inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-50" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[50vh] lg:h-[60vh] min-h-[400px] lg:min-h-[500px] overflow-hidden pt-20 flex items-center justify-center border-b border-stone-300 shadow-[var(--shadow-ind-card)]">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="/about-us-bg.png"
            alt="عن البرنامج العربي للحلال"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-[#FAF9F6]"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
         
            
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              عن <span className="text-[#CA8A04]">البرنامج العربي للحلال</span>
            </h1>
          </motion.div>
        </div>

      </section>

      {/* --- SECTION 1: CORE MISSION --- */}
      <section id="definition" className="relative py-16 lg:py-24 overflow-hidden scroll-mt-28">
        {/* ISO Grid Background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-12 max-w-4xl text-center lg:mb-16"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-black text-[#007A55] shadow-[var(--shadow-ind-sharp)]">
              <ShieldCheck size={15} />
              <span>رسالة البرنامج</span>
            </div>
            <h2 className="text-2xl font-black leading-tight text-slate-900 md:text-3xl">
              حماية المستهلك المسلم{" "}
              <span className="text-[#007A55]">  في جميع دول العالم</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6 lg:col-span-7"
            >
              <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:p-8">
                
                <p className="text-base font-bold leading-9 text-slate-600 lg:text-lg">
                  تم وضع البرنامج العربي الموحد للحلال من قبل الدول العربية ممثلة في المنظمة العربية للتنمية الصناعية والتقييس والتعدين بهدف حماية المستهلك المسلم في الدول العربية وفي جميع دول العالم ليس فقط من شهادات وعلامات الحلال المزورة، بل أيضا من الشهادات والعلامات التي تمنحها جهات لا تتوفر فيها شروط المهنية والشرعية والمصداقية اللازمة لمثل هذا المجال.
                </p>
                
              </article>

              <article className="rounded-[1.75rem] border border-stone-200 bg-[#F8F7F2] p-6 shadow-[var(--shadow-ind-card)] lg:p-8">
              
                <p className="text-base font-bold leading-9 text-slate-600">
                  ويعتبر البرنامج بمثابة تأسيس لمنظومة اعتراف متعدد الأطراف، بشهادة وعلامة الحلال العربية، بين الدول العربية المنضمة إليه، وقد وضعت بنوده بما يتوافق مع مواصفة تقييم المطابقة - المصطلحات والمبادئ العامة{" "}
                  <span dir="ltr" className="font-black text-[#007A55] bg-white px-1.5 py-0.5 rounded shadow-inner">ISO/IEC 17000</span>.
                  والمتطلبات الفنية للمواصفات الدولية   <span dir="ltr" className="font-black text-[#007A55] bg-white px-1.5 py-0.5 rounded shadow-inner"> (ISO/IEC17065 ISO/IEC17067) </span>. والمواصفات القياسية العربية في قطاع الحلال، وهي المراجع الفنية للمنتجات المشمولة في مجال تطبيق هذا البرنامج، والتي اُعدت هذه المنظومة بناءً عليها. مع الأخذ بعين الاعتبار إمكانية تعديل وتحديث هذه المنظومة لتشمل منتجات أخرى تقترح الدول العربية ضمها إلى مجال عمل هذه الوثيقة حال إصدار المواصفات القياسية العربية الموحدة ذات العلاقة.
                </p>
                
              </article>
              
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative lg:col-span-5"
            >
              <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-3 shadow-[var(--shadow-ind-floating)] lg:h-full">
                <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-slate-900 shadow-[inset_0_10px_40px_rgba(0,0,0,0.2)]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
                  <img
                    src="/about-us-card-1.png"
                    alt="البرنامج العربي للحلال"
                    className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C4C2A]/45 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    
      

      {/* --- GUIDE CTA SECTION --- */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-16 text-center lg:py-24">
        <div className="absolute inset-0">
          <img src="/workflow/w-4.png" alt="" className="h-full w-full object-cover opacity-12" />
          <div className="absolute inset-0 bg-gradient-to-bl from-[#1C4C2A]/80 via-slate-950/92 to-slate-950" />
        </div>
        <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-4xl"
        >
          <h2 className="text-3xl font-black leading-tight text-white lg:text-5xl">
            انتقل إلى تفاصيل البرنامج
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-bold leading-7 text-stone-300 lg:text-base">
            بعد التعريف العام، يمكن متابعة أهداف البرنامج أو استعراض مجالات تطبيقه المعتمدة.
          </p>

         <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
  <Link
    to="/program-goals"
    className="group relative min-h-[240px] overflow-hidden rounded-[2rem] border border-[#CA8A04]/35 bg-slate-950 p-7 text-white shadow-[var(--shadow-ind-floating)] transition-all duration-500 hover:-translate-y-1 hover:border-[#CA8A04]/80 hover:shadow-[0_28px_80px_rgba(202,138,4,0.24)] focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/30"
  >
    <img
      src="/workflow/w-2.png"
      alt=""
      className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-700 ease-out group-hover:scale-110 group-hover:opacity-60"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-[#CA8A04]/25 transition duration-500 group-hover:from-slate-950/95 group-hover:via-slate-950/55" />

    <div
      className="absolute inset-0 opacity-15"
      style={{
        backgroundImage:
          "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    />

    <div className="absolute -left-24 top-0 h-full w-24 skew-x-[-18deg] bg-white/18 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[760px]" />
    <div className="absolute bottom-0 right-0 h-1 w-0 bg-[#CA8A04] transition-all duration-500 group-hover:w-full" />

    <div className="relative z-10 flex h-full flex-col justify-between">
      <span className="w-fit rounded-full border border-white/15 bg-white/12 px-4 py-2 text-xs font-black text-[#CA8A04] shadow-[var(--shadow-ind-sharp)] backdrop-blur">
        أهداف البرنامج
      </span>

      <div>
        <h3 className="text-3xl font-black lg:text-4xl">
          عرض أهداف البرنامج
        </h3>

        <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-stone-200">
          تعرف على الأهداف الأساسية للبرنامج العربي للحلال ودوره في حماية المستهلك وتعزيز الثقة في شهادات الحلال.
        </p>

        <div className="mt-6 flex items-center gap-3 text-sm font-black text-[#CA8A04]">
          <span>استعراض الأهداف</span>
          <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
        </div>
      </div>
    </div>
  </Link>

  <Link
    to="/program-scope"
    className="group relative min-h-[240px] overflow-hidden rounded-[2rem] border border-white/12 bg-slate-950 p-7 text-white shadow-[var(--shadow-ind-card)] transition-all duration-500 hover:-translate-y-1 hover:border-[#007A55]/70 hover:shadow-[0_28px_80px_rgba(0,122,85,0.22)] focus:outline-none focus:ring-4 focus:ring-[#007A55]/30"
  >
    <img
      src="/workflow/w-3.png"
      alt=""
      className="absolute inset-0 h-full w-full object-cover opacity-42 transition duration-700 ease-out group-hover:scale-110 group-hover:opacity-58"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-[#1C4C2A]/78 to-slate-950/30 transition duration-500 group-hover:via-[#1C4C2A]/58" />

    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    />

    <div className="absolute -left-24 top-0 h-full w-24 skew-x-[-18deg] bg-white/16 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[760px]" />
    <div className="absolute bottom-0 right-0 h-1 w-0 bg-[#007A55] transition-all duration-500 group-hover:w-full" />

    <div className="relative z-10 flex h-full flex-col justify-between">
      <span className="w-fit rounded-full border border-white/15 bg-white/12 px-4 py-2 text-xs font-black text-white shadow-[var(--shadow-ind-sharp)] backdrop-blur">
        مجالات التطبيق
      </span>

      <div>
        <h3 className="text-3xl font-black lg:text-4xl">
          مجالات التطبيق
        </h3>

        <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-stone-200">
          استعرض المنتجات والقطاعات المشمولة ضمن مجال تطبيق البرنامج والمنظومة الفنية المعتمدة.
        </p>

        <div className="mt-6 flex items-center gap-3 text-sm font-black text-white">
          <span>عرض المجالات</span>
          <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
        </div>
      </div>
    </div>
  </Link>
</div>
        </motion.div>
      </section>

    </div>
  );
}
