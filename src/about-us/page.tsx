"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutProgram() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen font-arabic" dir="rtl">
      
      {/* --- HERO SECTION --- 
          Preserving this exactly as the user likes it.
      */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden pt-20 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img 
            src="/about-us-bg.png" 
            alt="عن البرنامج العربي للحلال" 
            className="w-full h-full object-cover"
          />
          {/* Brand Gradient Overlays */}
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-[#FAF9F6]"></div>
          
          {/* Subtle gold glow to match homepage */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#CA8A04] opacity-[0.05] blur-[150px] rounded-full pointer-events-none"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-7xl font-light text-[#FFFFFF] leading-tight tracking-tight mb-6 whitespace-nowrap">
              عن البرنامج <strong className="font-bold text-[#007A55]">العربي للحلال</strong>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 1: THE VISIONARY NARRATIVE --- 
          Scaled down: py-24 instead of py-40. Image h-[500px] instead of h-[600px].
      */}
      <section className="relative py-20 lg:py-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
          

            {/* Intellectual Narrative Block */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-[1.2] tracking-tight whitespace-nowrap">
                                  حماية المستهلك <span className="text-[#007A55]">أولوية حضارية.</span>
                                </h2>
                <p className="text-lg text-slate-500 font-light leading-relaxed max-w-xl">
                  البرنامج العربي الموحد للحلال هو نتاج تعاون استراتيجي بين الدول العربية، يهدف إلى خلق بيئة آمنة للمستهلك المسلم في كافة أنحاء العالم.
                </p>
              </div>
              
              <div className="space-y-6 text-base text-slate-600 font-light leading-relaxed">
                <p>
                  نحن لا نكتفي بمكافحة التزييف، بل نسعى لرفع كفاءة الجهات المانحة للشهادات، لضمان استيفاء أعلى معايير المهنية والشرعية والمصداقية.
                </p>
                
                <div className="relative p-8 bg-[#FAF9F6] rounded-[2.5rem] overflow-hidden group">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#CA8A04]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <p className="relative z-10 text-slate-900 font-medium text-lg">
                    يؤسس البرنامج لمنظومة اعتراف متعدد الأطراف، توحد الرؤية العربية وتسهل انسيابية المنتجات والخدمات الحلال.
                  </p>
                </div>

                <p className="text-sm text-slate-400">
                  تم إعداد هذه المنظومة بالاعتماد على مراجع فنية دولية دقيقة، مما يجعلها مرجعاً عالمياً موثوقاً في قطاع الحلال.
                </p>
              </div>
            </motion.div>

              {/* Visual Storytelling Component */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:w-1/2 relative"
            >
              <div className="relative h-[450px] md:h-[500px] w-full rounded-[3rem] overflow-hidden shadow-xl">
                <img 
                  src="/section-bg-1.jpeg" 
                  alt="Commitment to Quality" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004D36]/90 via-[#004D36]/20 to-transparent"></div>
                {/* Floating Statement */}
                <div className="absolute bottom-8 right-8 left-8">
                   <p className="text-white text-xl font-light leading-relaxed italic">
                    "نبني منظومة تتجاوز الحدود، لترسيخ مفهوم الحلال كمعيار عالمي للثقة والجودة."
                   </p>
                </div>
              </div>
              
              {/* Abstract blurred shapes */}
              <div className="absolute -top-10 -right-10 w-40 h-48 bg-[#CA8A04]/10 rounded-full blur-[70px]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE GLOBAL STANDARD --- 
          Scaled down: py-24 instead of py-32. Heading text-5xl instead of text-7xl.
      */}
      <section className="relative py-20 lg:py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/workflow/w-4.png" 
            alt="International Compliance" 
            className="w-full h-full object-cover opacity-10 scale-110 blur-sm"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-8">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight"
            >
              التميز من خلال <span className="text-[#CA8A04]">المطابقة الدولية.</span>
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed"
            >
              يتوافق البرنامج تماماً مع مواصفة <span className="text-white font-bold" dir="ltr">ISO/IEC 17000</span> والمواصفات القياسية العربية، مما يضمن اعترافاً دولياً واسع النطاق.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex justify-center"
            >
               {/* <div className="px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white/60 text-xs font-black tracking-[0.3em] uppercase">
                 معايير الجودة العالمية
               </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: THE PILLARS --- 
          Scaled down: Card height 500px instead of 650px. py-24 instead of py-32.
      */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-3">
              <h4 className="text-[#CA8A04] font-black tracking-widest text-[10px] uppercase">الأهداف الاستراتيجية</h4>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">جوهر المنظومة</h2>
               <p className="text-slate-500 max-w-sm pt-3 text-xl text-nowrap font-light leading-relaxed">
              ثلاث ركائز أساسية تشكل مستقبل صناعة الحلال في الوطن العربي والعالم.
            </p>
            </div>
           
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "الشفافية المطلقة",
                desc: "حماية كاملة من خلال أنظمة تدقيق رقمية وفنية متطورة تضمن مصداقية كل شهادة.",
                image: "/process/process-1.png",
                overlay: "bg-emerald-950/80"
              },
              {
                title: "الانسجام العربي",
                desc: "توحيد الجهود لتعزيز التبادل التجاري وتسهيل نفاذ المنتجات المعتمدة للأسواق.",
                image: "/workflow/w-3.png",
                overlay: "bg-amber-950/80"
              },
              {
                title: "التطور المستمر",
                desc: "منظومة مرنة تستجيب للمتغيرات العالمية وتحدث معاييرها باستمرار.",
                image: "/process/process-3.png",
                overlay: "bg-slate-950/80"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-lg cursor-default"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className={`absolute inset-0 ${item.overlay} opacity-50 group-hover:opacity-80 transition-all duration-700`}></div>
                
                <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                  <h4 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-[#CA8A04] transition-colors">{item.title}</h4>
                  <p className="text-white/80 text-sm leading-relaxed font-light opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- QUOTE SECTION --- 
          Scaled down: py-32 instead of py-48. text-5xl instead of text-7xl.
      */}
      <section className="py-24 lg:py-32 px-6 bg-slate-950 text-center relative overflow-hidden">
        <div className="absolute inset-0">
           <img src="/section-bg-1.jpeg" alt="Background" className="w-full h-full object-cover blur-[4px] opacity-10" />
        </div>
        
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#CA8A04]/20 via-transparent to-[#007A55]/20 blur-[100px]"
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <div className="mb-10">
            <span className="text-white text-[9px] font-black uppercase">كلمة البرنامج</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light text-white leading-[1.2] mb-12 tracking-tight">
            " غايتنا حماية المستهلك المسلم وبناء منظومة موثوقة تعزز مكانة التجارة البينية <span className="text-[#CA8A04] font-bold">العربية والدولية</span> "
          </h2>
          
          {/* <div className="flex flex-col items-center gap-8">
            <button className="bg-white hover:bg-[#CA8A04] text-slate-900 hover:text-white px-12 py-4 rounded-full font-bold text-sm transition-all shadow-[0_15px_40px_rgba(0,0,0,0.4)] cursor-pointer uppercase tracking-[0.2em] active:scale-95 border border-white/5">
              اكتشف المعايير الفنية
            </button>
          </div> */}
        </motion.div>
      </section>

    </div>
  );
}
