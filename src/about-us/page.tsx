"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe2, Layers, ArrowLeft } from "lucide-react";

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
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* ISO Grid Background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-stone-200 text-[#007A55] text-[10px] font-bold shadow-[var(--shadow-ind-sharp)] rounded-full uppercase tracking-widest">
                  <ShieldCheck size={14} />
                  <span>رسالة البرنامج</span>
                </div>
                
                <h2 className="text-2xl md:text-2xl lg:text-3xl font-black text-slate-900 leading-[1.2] tracking-tight">
                  حماية المستهلك المسلم في الدول العربية{" "}
                  <span className="text-[#007A55] relative inline-block mt-2">
                    وفي جميع دول العالم.
                    <svg className="absolute w-full h-2 -bottom-2 left-0 text-[#CA8A04]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h2>

                <p className="text-base lg:text-lg text-slate-600 font-medium leading-relaxed">
                  تم وضع البرنامج العربي الموحد للحلال من قبل الدول العربية ممثلة في المنظمة العربية للتنمية الصناعية والتقييس والتعدين بهدف حماية المستهلك المسلم في الدول العربية وفي جميع دول العالم ليس فقط من شهادات وعلامات الحلال المزورة، بل أيضا من الشهادات والعلامات التي تمنحها جهات لا تتوفر فيها شروط المهنية والشرعية والمصداقية اللازمة لمثل هذا المجال.
                </p>
              </div>

              <div className="ind-card border border-stone-200/50 p-6 lg:p-8 relative">
               
                <div className="space-y-6 text-justify text-sm lg:text-base text-slate-600 font-medium leading-relaxed">
                  <p>
                    ويعتبر البرنامج بمثابة تأسيس لمنظومة اعتراف متعدد الأطراف، بشهادة وعلامة الحلال العربية، بين الدول العربية المنضمة إليه، وقد وضعت بنوده بما يتوافق مع مواصفة تقييم المطابقة - المصطلحات والمبادئ العامة{" "}
                    <span dir="ltr" className="font-black text-[#007A55] bg-stone-100 px-1.5 py-0.5 rounded shadow-inner">ISO/IEC 17000</span>.
                    والمتطلبات الفنية للمواصفات الدولية   <span dir="ltr" className="font-black text-[#007A55] bg-stone-100 px-1.5 py-0.5 rounded shadow-inner"> (ISO/IEC17065 ISO/IEC17067) </span>. والمواصفات القياسية العربية في قطاع الحلال، وهي المراجع الفنية للمنتجات المشمولة في مجال تطبيق هذا البرنامج، والتي اُعدت هذه المنظومة بناءً عليها. مع الأخذ بعين الاعتبار إمكانية تعديل وتحديث هذه المنظومة لتشمل منتجات أخرى تقترح الدول العربية ضمها إلى مجال عمل هذه الوثيقة حال إصدار المواصفات القياسية العربية الموحدة ذات العلاقة.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Image side - Machine Module */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="lg:w-1/2 relative"
            >
              <div className="ind-card p-3 lg:p-4 border border-stone-200/50 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2rem] overflow-hidden ind-recessed shadow-[inset_0_10px_40px_rgba(0,0,0,0.2)]">
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
                  
                  <img
                    src="/section-bg-1.jpeg"
                    alt="البرنامج العربي للحلال"
                    className="w-full h-full object-cover hover:grayscale-0 transition-all duration-1000 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C4C2A]/90 via-[#1C4C2A]/20 to-transparent"></div>
                  
                  <div className="absolute bottom-8 right-8 left-8 z-20">
                     <div className="w-10 h-1 bg-[#CA8A04] mb-4 shadow-[var(--shadow-ind-glow-gold)]"></div>
                     <p className="text-white text-lg lg:text-xl font-bold leading-relaxed drop-shadow-md">
                      "ليس فقط من شهادات وعلامات الحلال المزورة، بل أيضاً من الشهادات التي تمنحها جهات لا تتوفر فيها شروط المهنية والشرعية والمصداقية."
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge (Tactile) */}
              {/* <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 lg:-right-10 bg-white shadow-[var(--shadow-ind-floating)] border border-stone-200 p-4 lg:p-6 rounded-2xl z-30 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-[#CA8A04] rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                   <Target size={24} className="text-white" />
                </div>
                <div>
                   <span className="text-[10px] font-mono font-black text-stone-500 uppercase tracking-widest block mb-1">Status</span>
                   <span className="text-slate-900 font-black text-sm lg:text-base">منظومة معتمدة</span>
                </div>
              </motion.div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: TECHNICAL ALIGNMENT (Dark Display) --- */}
      <section className="relative py-20 lg:py-24 bg-[#1C4C2A] overflow-hidden border-y border-stone-800 shadow-[inset_0_10px_30px_rgba(0,0,0,0.4)]">
        <div className="absolute inset-0 z-0">
          <img
            src="/workflow/w-4.png"
            alt="المواصفات الدولية"
            className="w-full h-full object-cover opacity-10 blur-sm scale-110"
          />
        </div>
        
        {/* Carbon Fiber overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-10">
            
            <div className="flex items-center justify-center gap-4">
               <div className="h-[1px] w-12 lg:w-20 bg-white/20"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-[#CA8A04] animate-pulse"></div>
               <div className="h-[1px] w-12 lg:w-20 bg-white/20"></div>
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            >
              تأسيس لمنظومة <br/>
              <span className="text-[#CA8A04] relative inline-block mt-4">
                 اعتراف متعدد الأطراف.
                 <svg className="absolute w-full h-2 lg:h-3 -bottom-2 lg:-bottom-6 left-0 text-[#CA8A04]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                 </svg>
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-xl lg:text-2xl text-stone-300 font-medium max-w-4xl mx-auto leading-relaxed border-r-4 border-[#CA8A04] pr-6 lg:pr-8 bg-white/5 py-4 lg:py-6 rounded-sm backdrop-blur-sm"
            >
              وُضعت بنوده بما يتوافق مع مواصفة تقييم المطابقة — المصطلحات والمبادئ العامة، والمواصفات القياسية العربية في قطاع الحلال.
            </motion.p>
          </div>
        </div>
        
        {/* Vents */}
        <div className="absolute top-10 right-10 flex flex-col gap-2 z-20">
           <div className="w-1.5 h-8 rounded-full bg-black/40 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]" />
           <div className="w-1.5 h-8 rounded-full bg-black/40 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]" />
        </div>
      </section>

      {/* --- SECTION 3: THREE PILLARS (Tactile Grid) --- */}
      <section className="py-20 lg:py-32 bg-[#FAF9F6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
            
             
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight drop-shadow-[0_1px_1px_#ffffff]">ثلاثة محاور أساسية</h2>
            <p className="text-slate-600 max-w-2xl pt-6 text-base lg:text-xl font-medium leading-relaxed">
              تتمحور فلسفة البرنامج حول ثلاث ركائز تقنية تضمن الاستدامة والنمو.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                title: "الحماية والمصداقية",
                desc: "حماية المستهلك المسلم من شهادات وعلامات الحلال المزورة، ومن الجهات التي لا تتوفر فيها شروط المهنية والشرعية والمصداقية اللازمة.",
                image: "/process/process-1.png",
                icon: ShieldCheck,
                color: "text-[#007A55]"
              },
              {
                title: "الاعتراف المتعدد الأطراف",
                desc: "تأسيس منظومة اعتراف متعدد الأطراف بشهادة وعلامة الحلال العربية بين الدول العربية المنضمة إلى البرنامج.",
                image: "/workflow/w-3.png",
                icon: Globe2,
                color: "text-[#CA8A04]"
              },
              {
                title: "التحديث والتوسع",
                desc: "إمكانية تعديل وتحديث المنظومة لتشمل منتجات أخرى تقترح الدول العربية ضمها حال إصدار المواصفات القياسية العربية الموحدة ذات العلاقة.",
                image: "/process/process-3.png",
                icon: Layers,
                color: "text-slate-700"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group flex flex-col items-center text-center"
              >
                <div className="ind-card p-3 lg:p-4 border border-stone-200/50 mb-8 w-full relative">
                  <div className="relative h-[250px] lg:h-[300px] w-full rounded-2xl overflow-hidden ind-recessed group-hover:shadow-[inset_0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-500">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-100 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    
                    {/* Floating Icon Over Image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 bg-white shadow-[var(--shadow-ind-floating)] rounded-2xl flex items-center justify-center border border-stone-200 group-hover:rotate-6 transition-transform duration-500">
                          <item.icon size={32} className={item.color} />
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 px-2">
                  <h4 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight transition-colors group-hover:text-[#007A55]">{item.title}</h4>
                  <p className="text-sm lg:text-base text-slate-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA / QUOTE SECTION --- */}
      <section className="relative py-24 lg:py-32 px-6 bg-slate-900 text-center overflow-hidden border-t border-stone-800 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        <div className="absolute inset-0 opacity-20">
          <img src="/section-bg-1.jpeg" alt="Background" className="w-full h-full object-cover blur-[2px]" />
          <div className="absolute inset-0 bg-[#1C4C2A]/90 mix-blend-multiply"></div>
        </div>
        
        {/* Carbon Fiber Overlay */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="max-w-5xl mx-auto relative z-10"
        >


          <h2 className="text-2xl md:text-2xl lg:text-4xl font-light text-white leading-[1.4] mb-12 tracking-tight">
            " بهدف حماية المستهلك المسلم في الدول العربية وفي{" "}
            <span className="text-[#CA8A04] font-black underline decoration-[#CA8A04]/30 underline-offset-[8px]">جميع دول العالم</span>{" "}
            — من كل شهادة لا تتوفر فيها شروط المهنية والشرعية والمصداقية "
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-16">
            <button className="btn-primary !bg-[#CA8A04] !text-[#1C4C2A] h-[60px] text-lg px-10 group shadow-[0_10px_40px_rgba(202,138,4,0.3)]">
               تصفح محرك البحث
               <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center gap-3 px-10 py-4 rounded-xl border border-white/20 text-white font-black text-lg hover:bg-white hover:text-[#1C4C2A] transition-all duration-300 active:translate-y-[2px]">
               المتطلبات الفنية
            </button>
          </div>
        </motion.div>
        
        {/* Vents */}
        <div className="absolute bottom-10 left-10 flex gap-2">
           <div className="h-2 w-10 rounded-full bg-black/60 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]" />
           <div className="h-2 w-10 rounded-full bg-black/60 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]" />
        </div>
      </section>

    </div>
  );
}
