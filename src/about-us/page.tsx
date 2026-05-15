"use client";

import { motion } from "framer-motion";

export default function AboutProgram() {
  return (
    <div className="bg-[#FAF9F6] min-h-screen font-arabic" dir="rtl">

      {/* --- HERO --- */}
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
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-[#FAF9F6]"></div>
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#CA8A04] opacity-[0.05] blur-[150px] rounded-full pointer-events-none"></div>
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-7xl font-light text-white leading-tight tracking-tight mb-6">
              عن <strong className="font-bold text-[#FFFFFF]">البرنامج العربي للحلال</strong>
            </h1>
      
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 1: ABOUT — full paragraphs verbatim from brief --- */}
      <section className="relative py-20 lg:py-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <span className="text-[#CA8A04] font-black tracking-widest text-[10px] uppercase block">عن البرنامج</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-[1.3] tracking-tight">
                  حماية المستهلك المسلم في الدول العربية{" "}
                  <span className="text-[#007A55]">وفي جميع دول العالم.</span>
                </h2>

                {/* PARAGRAPH 1 — verbatim */}
                <p className="text-lg text-slate-500 font-light leading-relaxed">
                  تم وضع البرنامج العربي الموحد للحلال من قبل الدول العربية ممثلة في المنظمة العربية للتنمية الصناعية والتقييس والتعدين بهدف حماية المستهلك المسلم في الدول العربية وفي جميع دول العالم ليس فقط من شهادات وعلامات الحلال المزورة، بل أيضا من الشهادات والعلامات التي تمنحها جهات لا تتوفر فيها شروط المهنية والشرعية والمصداقية اللازمة لمثل هذا المجال.
                </p>
              </div>

              <div className="space-y-6 text-base text-slate-600 font-light leading-relaxed">

                {/* PARAGRAPH 2 — verbatim */}
                <p>
                  ويعتبر البرنامج بمثابة تأسيس لمنظومة اعتراف متعدد الأطراف، بشهادة وعلامة الحلال العربية، بين الدول العربية المنضمة إليه، وقد وضعت بنوده بما يتوافق مع مواصفة تقييم المطابقة - المصطلحات والمبادئ العامة{" "}
                  <span dir="ltr" className="font-semibold text-slate-800">ISO/IEC 17000</span>،
                  والمتطلبات الفنية للمواصفات الدولية (<span dir="ltr" className="font-semibold text-slate-800">ISO/IEC 17065، ISO/IEC 17067</span>)
                  والمواصفات القياسية العربية في قطاع الحلال، وهي المراجع الفنية للمنتجات المشمولة في مجال تطبيق هذا البرنامج، والتي اُعدت هذه المنظومة بناءً عليها. مع الأخذ بعين الاعتبار إمكانية تعديل وتحديث هذه المنظومة لتشمل منتجات أخرى تقترح الدول العربية ضمها إلى مجال عمل هذه الوثيقة حال إصدار المواصفات القياسية العربية الموحدة ذات العلاقة.
                </p>

                {/* HIGHLIGHT BOX — pulled phrase from brief p2 */}
                <div className="relative p-8 bg-[#FAF9F6] rounded-[2.5rem] overflow-hidden group">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#CA8A04]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <p className="relative z-10 text-slate-900 font-medium text-lg leading-relaxed">
                    منظومة اعتراف متعدد الأطراف بشهادة وعلامة الحلال العربية — بين الدول العربية المنضمة إليه.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Image side */}
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
                  alt="البرنامج العربي للحلال"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004D36]/90 via-[#004D36]/20 to-transparent"></div>
                {/* FROM BRIEF: "ليس فقط من شهادات وعلامات الحلال المزورة... شروط المهنية والشرعية والمصداقية" */}
                <div className="absolute bottom-8 right-8 left-8">
                  <p className="text-white text-xl font-light leading-relaxed italic">
                    "ليس فقط من شهادات وعلامات الحلال المزورة، بل أيضاً من الشهادات التي تمنحها جهات لا تتوفر فيها شروط المهنية والشرعية والمصداقية."
                  </p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-48 bg-[#CA8A04]/10 rounded-full blur-[70px]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: DARK BANNER — from brief: multilateral recognition + standards alignment --- */}
      <section className="relative py-20 lg:py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/workflow/w-4.png"
            alt="المواصفات الدولية"
            className="w-full h-full object-cover opacity-10 scale-110 blur-sm"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-8">
            {/* FROM BRIEF: "تأسيس لمنظومة اعتراف متعدد الأطراف" */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight"
            >
              تأسيس لمنظومة <span className="text-[#CA8A04]">اعتراف متعدد الأطراف.</span>
            </motion.h3>

            {/* FROM BRIEF: "وضعت بنوده بما يتوافق مع مواصفة تقييم المطابقة والمواصفات القياسية العربية" */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed"
            >
              وُضعت بنوده بما يتوافق مع مواصفة تقييم المطابقة — المصطلحات والمبادئ العامة، والمواصفات القياسية العربية في قطاع الحلال.
            </motion.p>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: THREE PILLARS — all derived from brief --- */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-3">
              <span className="text-[#CA8A04] font-black tracking-widest text-[10px] uppercase block">محاور البرنامج</span>
              {/* FROM BRIEF: the 3 core purposes extracted: protection, recognition, expandability */}
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">ثلاثة محاور أساسية</h2>
              <p className="text-slate-500 max-w-md pt-3 text-lg font-light leading-relaxed">
                الحماية، الاعتراف المتعدد الأطراف، وإمكانية التحديث والتوسع.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                // FROM BRIEF: "من شهادات وعلامات الحلال المزورة... شروط المهنية والشرعية والمصداقية"
                title: "الحماية والمصداقية",
                desc: "حماية المستهلك المسلم من شهادات وعلامات الحلال المزورة، ومن الجهات التي لا تتوفر فيها شروط المهنية والشرعية والمصداقية اللازمة.",
                image: "/process/process-1.png",
                overlay: "bg-emerald-950/80"
              },
              {
                // FROM BRIEF: "منظومة اعتراف متعدد الأطراف بين الدول العربية المنضمة إليه"
                title: "الاعتراف المتعدد الأطراف",
                desc: "تأسيس منظومة اعتراف متعدد الأطراف بشهادة وعلامة الحلال العربية بين الدول العربية المنضمة إلى البرنامج.",
                image: "/workflow/w-3.png",
                overlay: "bg-amber-950/80"
              },
              {
                // FROM BRIEF: "إمكانية تعديل وتحديث هذه المنظومة لتشمل منتجات أخرى"
                title: "التحديث والتوسع",
                desc: "إمكانية تعديل وتحديث المنظومة لتشمل منتجات أخرى تقترح الدول العربية ضمها حال إصدار المواصفات القياسية العربية الموحدة ذات العلاقة.",
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

      {/* --- QUOTE SECTION — from brief: core purpose sentence --- */}
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
            <span className="text-white/50 text-[9px] font-black uppercase tracking-widest">هدف البرنامج</span>
          </div>

          {/* FROM BRIEF: verbatim purpose — "بهدف حماية المستهلك المسلم في الدول العربية وفي جميع دول العالم" */}
          <h2 className="text-3xl md:text-4xl font-light text-white leading-[1.4] mb-12 tracking-tight">
            " بهدف حماية المستهلك المسلم في الدول العربية وفي{" "}
            <span className="text-[#CA8A04] font-bold">جميع دول العالم</span>{" "}
            — من كل شهادة لا تتوفر فيها شروط المهنية والشرعية والمصداقية "
          </h2>
        </motion.div>
      </section>

    </div>
  );
}