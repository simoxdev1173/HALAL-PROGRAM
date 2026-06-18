"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { InnerPageHero } from "../components/InternalPage";

type AboutTranslation = {
  hero: string;
  heroBefore: string;
  heroHighlight: string;
  badge: string;
  titleBefore: string;
  titleHighlight: string;
  p1: string;
  p2: string;
};

const arabicAbout: AboutTranslation = {
  hero: "عن البرنامج العربي للحلال",
  heroBefore: "عن",
  heroHighlight: "البرنامج العربي للحلال",
  badge: "رسالة البرنامج",
  titleBefore: "حماية المستهلك المسلم",
  titleHighlight: "  في جميع دول العالم",
  p1: "تم وضع البرنامج العربي الموحد للحلال من قبل الدول العربية ممثلة في المنظمة العربية للتنمية الصناعية والتقييس والتعدين بهدف حماية المستهلك المسلم في الدول العربية وفي جميع دول العالم ليس فقط من شهادات وعلامات الحلال المزورة، بل أيضا من الشهادات والعلامات التي تمنحها جهات لا تتوفر فيها شروط المهنية والشرعية والمصداقية اللازمة لمثل هذا المجال.",
  p2: "ويعتبر البرنامج بمثابة تأسيس لمنظومة اعتراف متعدد الأطراف، بشهادة وعلامة الحلال العربية، بين الدول العربية المنضمة إليه، وقد وضعت بنوده بما يتوافق مع مواصفة تقييم المطابقة - المصطلحات والمبادئ العامة ISO/IEC 17000. والمتطلبات الفنية للمواصفات الدولية (ISO/IEC17065 ISO/IEC17067). والمواصفات القياسية العربية في قطاع الحلال، وهي المراجع الفنية للمنتجات المشمولة في مجال تطبيق هذا البرنامج، والتي اُعدت هذه المنظومة بناءً عليها. مع الأخذ بعين الاعتبار إمكانية تعديل وتحديث هذه المنظومة لتشمل منتجات أخرى تقترح الدول العربية ضمها إلى مجال عمل هذه الوثيقة حال إصدار المواصفات القياسية العربية الموحدة ذات العلاقة.",
};

export default function AboutProgram() {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const about = t("pages.about", { returnObjects: true }) as AboutTranslation;
  const copy = isRtl ? arabicAbout : about;

  return (
    <div className={`bg-[#FAF9F6] min-h-screen ${isRtl ? "font-arabic" : "font-english"} overflow-hidden`} dir={isRtl ? "rtl" : "ltr"}>
      {/* Industrial noise overlay */}
      <div className="fixed inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-50" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      <InnerPageHero
        title={`${copy.heroBefore} ${copy.heroHighlight}`}
        description=""
        imageSrc="/about-us-bg.png"
        imageAlt={copy.hero}
      />
      {/* --- SECTION 1: CORE MISSION --- */}
      <section id="definition" className="relative py-16 lg:py-24 overflow-hidden scroll-mt-28">
        {/* ISO Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

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
              <span>{copy.badge}</span>
            </div>
            <h2 className="text-2xl font-black leading-tight text-slate-900 md:text-3xl">
              {copy.titleBefore}{" "}
              <span className="text-[#007A55]">{copy.titleHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col gap-6 lg:col-span-7 ${isRtl ? "" : "lg:h-full"}`}
            >
              <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:p-8">
                <p className="text-base font-bold leading-9 text-slate-600 lg:text-lg">
                  {copy.p1}
                </p>
              </article>

              <article className={`rounded-[1.75rem] border border-stone-200 bg-[#F8F7F2] p-6 shadow-[var(--shadow-ind-card)] lg:p-8 ${isRtl ? "" : "lg:flex lg:flex-1 lg:items-center"}`}>
                <p className="text-base font-bold leading-9 text-slate-600">
                  {isRtl ? (
                    <>
                      ويعتبر البرنامج بمثابة تأسيس لمنظومة اعتراف متعدد الأطراف، بشهادة وعلامة الحلال العربية، بين الدول العربية المنضمة إليه، وقد وضعت بنوده بما يتوافق مع مواصفة تقييم المطابقة - المصطلحات والمبادئ العامة{" "}
                      <span dir="ltr" className="font-black text-[#007A55] bg-white px-1.5 py-0.5 rounded shadow-inner">ISO/IEC 17000</span>.
                      والمتطلبات الفنية للمواصفات الدولية   <span dir="ltr" className="font-black text-[#007A55] bg-white px-1.5 py-0.5 rounded shadow-inner"> (ISO/IEC17065 ISO/IEC17067) </span>. والمواصفات القياسية العربية في قطاع الحلال، وهي المراجع الفنية للمنتجات المشمولة في مجال تطبيق هذا البرنامج، والتي اُعدت هذه المنظومة بناءً عليها. مع الأخذ بعين الاعتبار إمكانية تعديل وتحديث هذه المنظومة لتشمل منتجات أخرى تقترح الدول العربية ضمها إلى مجال عمل هذه الوثيقة حال إصدار المواصفات القياسية العربية الموحدة ذات العلاقة.
                    </>
                  ) : (
                    copy.p2
                  )}
                </p>
              </article>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRtl ? -30 : 30, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative lg:col-span-5"
            >
              <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-3 shadow-[var(--shadow-ind-floating)] lg:h-full">
                <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-slate-900 shadow-[inset_0_10px_40px_rgba(0,0,0,0.2)]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
                  <img
                    src="/aboutus-card-1.png"
                    alt={copy.hero}
                    className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C4C2A]/45 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
