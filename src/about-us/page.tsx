"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, ShieldCheck, Award } from "lucide-react";

export default function AboutProgram() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen " dir="rtl">
      {/* 
        HERO SECTION 
        صورة علوية بعرض الشاشة (Banner) مع عنوان الصفحة
      */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="/hero-photo.png" 
            alt="عن البرنامج العربي للحلال" 
            className="w-full h-full object-cover"
          />
          {/* طبقة تظليل داكنة لضمان وضوح النص */}
          <div className="absolute inset-0 bg-slate-900/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        </motion.div>
        
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6 mt-10">
      
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
          >
            عن البرنامج العربي الحلال
          </motion.h1>
       
        </div>
      </section>

      {/* 
        TYPOGRAPHY & CONTENT SECTION 
        النص المطلوب مع تصميم تحريري راقي (Editorial Design)
      */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* العنوان الجانبي */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 sticky top-32"
          >
            <div className="w-12 h-1 bg-[#EEB422] mb-8"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-[1.4]">
              حماية المستهلك <br/>
              <span className="text-[#007A55] font-light">وبناء الثقة العالمية.</span>
            </h2>
          </motion.div>

          {/* النص الدقيق المطلوب */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 space-y-8 text-lg md:text-xl text-stone-600 font-light leading-relaxed text-justify"
          >
            <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-[#007A55] first-letter:ml-3 first-letter:float-right">
              تم وضع البرنامج العربي الموحد للحلال من قبل الدول العربية ممثلة في المنظمة العربية للتنمية الصناعية والتقييس والتعدين بهدف حماية المستهلك المسلم في الدول العربية وفي جميع دول العالم ليس فقط من شهادات وعلامات الحلال المزورة، بل أيضا من الشهادات والعلامات التي تمنحها جهات لا تتوفر فيها شروط المهنية والشرعية والمصداقية اللازمة لمثل هذا المجال.
            </p>
            <p>
              ويعتبر البرنامج بمثابة تأسيس لمنظومة اعتراف متعدد الأطراف، بشهادة وعلامة الحلال العربية، بين الدول العربية المنضمة إليه، وقد وضعت بنوده بما يتوافق مع مواصفة تقييم المطابقة - المصطلحات والمبادئ العامة <span className="font-sans font-medium text-slate-800 tracking-wider inline-block" dir="ltr">ISO/IEC 17000</span>، والمتطلبات الفنية للمواصفات الدولية (<span className="font-sans font-medium text-slate-800 tracking-wider inline-block" dir="ltr">ISO/IEC 17065</span>, <span className="font-sans font-medium text-slate-800 tracking-wider inline-block" dir="ltr">ISO/IEC 17067</span>) والمواصفات القياسية العربية في قطاع الحلال، وهي المراجع الفنية للمنتجات المشمولة في مجال تطبيق هذا البرنامج، والتي اُعدت هذه المنظومة بناءً عليها. 
            </p>
            <p className="p-6 bg-stone-50 border-r-4 border-[#EEB422] rounded-l-xl text-slate-800 font-medium">
              مع الأخذ بعين الاعتبار إمكانية تعديل وتحديث هذه المنظومة لتشمل منتجات أخرى تقترح الدول العربية ضمها إلى مجال عمل هذه الوثيقة حال إصدار المواصفات القياسية العربية الموحدة ذات العلاقة.
            </p>
          </motion.div>

        </div>
      </section>

      {/* 
        FEATURES / PILLARS SECTION 
      */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-stone-50 rounded-bl-full opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h3 className="text-sm font-bold text-[#EEB422] tracking-widest uppercase mb-4">أهداف النظام</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">ركائز منظومة الحلال العربية</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <ShieldCheck size={32} strokeWidth={1.5} />,
                title: "الحماية والشفافية",
                desc: "حماية المستهلك المسلم من الشهادات المزورة وضمان توافر شروط الشرعية والمصداقية.",
                delay: 0.1
              },
              {
                icon: <Globe size={32} strokeWidth={1.5} />,
                title: "الاعتراف المتبادل",
                desc: "تأسيس منظومة اعتراف متعدد الأطراف بشهادة وعلامة الحلال بين الدول العربية.",
                delay: 0.2
              },
              {
                icon: <Award size={32} strokeWidth={1.5} />,
                title: "المطابقة الدولية",
                desc: "التوافق التام مع مواصفات تقييم المطابقة ISO/IEC 17000 والمواصفات القياسية العربية.",
                delay: 0.3
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: item.delay }}
                className="group p-10 bg-stone-50 hover:bg-white rounded-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 border border-transparent hover:border-stone-100"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#007A55] mb-8 group-hover:scale-110 group-hover:text-[#EEB422] transition-all duration-500">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h4>
                <p className="text-stone-500 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        QUOTE SECTION
      */}
      <section className="py-32 px-6 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#EEB422] rounded-full mix-blend-overlay opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#007A55] rounded-full mix-blend-overlay opacity-20 blur-3xl"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <svg className="w-12 h-12 mx-auto text-[#EEB422] mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <h2 className="text-3xl md:text-5xl font-light text-white leading-tight mb-10">
            "غايتنا حماية المستهلك المسلم وبناء منظومة موثوقة تعزز مكانة التجارة البينية العربية والدولية."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-stone-600"></div>
            <span className="text-stone-400 text-sm tracking-widest uppercase">البرنامج العربي للحلال</span>
            <div className="w-12 h-[1px] bg-stone-600"></div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}