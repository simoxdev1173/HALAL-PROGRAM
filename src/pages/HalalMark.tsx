import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  FileSignature,
} from "lucide-react";

type Lang = "ar" | "en";

const copy = {
  ar: {
    heroBefore: "علامة",
    heroHighlight: "الحلال",
    badge: "علامة الحلال",
    sectionTitleBefore: "ترخيص استخدام",
    sectionTitleHighlight: "علامة الحلال العربية",
    definitionTitle: "تعريف علامة الحلال",
    definition:
      "هي علامة أو شارة أو شعار تملكها المنظمة، ويمكن وضعها على المنتجات أو على وثائق الخدمات أو نظم الإنتاج المرتبطة بها والمطابقة لمتطلبات هذا البرنامج، وذلك بعد حصولها على الترخيص باستخدام علامة الحلال العربية.",
    ownershipTitle: "ملكية العلامة",
    ownership:
      "تكون المنظمة العربية للتنمية الصناعية والتقييس والتعدين هي المالكة لعلامة الحلال العربية وما يترتب عليها من حقوق ملكية وقانونية، ويمكن تشغيلها من خلال جهات منح الشهادات المعتمدة في الدول الأعضاء أو الجهات المعنية بالحلال في الدول العربية والإسلامية وفقاً للممارسات الدولية والإجراءات المقررة في هذا البرنامج.",
    conditionsTitle: "شروط استخدام العلامة",
    conditions:
      "يمكن للمورد وضع شعار علامة الحلال العربية على المنتج أو الوثائق الخاصة بالخدمة أو النظام، بعد حصوله على الترخيص باستخدام علامة الحلال العربية لذلك المنتج أو الخدمة أو النظام، مع الالتزام بشروط استخدام العلامة الواردة في هذا البرنامج.",
    licenseTitle: "الترخيص باستخدام العلامة",
    licenseIntro:
      "تقوم الجهة المعينة بإصدار الترخيص باستخدام علامة الحلال العربية وفقاً للملحق (7)، وذلك عندما يستوفي المورد أو المنشأة الشروط المطلوبة.",
    licenseItems: [
      "استيفاء متطلبات إجراءات منح ترخيص استخدام علامة الحلال العربية والمواصفات القياسية ذات العلاقة.",
      "تسديد تكاليف حق استخدام علامة الحلال العربية كما نصت عليه الفقرة (ب) من النقطة (2) من المادة (12).",
    ],
    nationalTitle: "العلامة الوطنية والعلامة العربية",
    nationalIntro: "الدول التي لديها علامات حلال وطنية يمكنها العمل بالخيارات التالية:",
    nationalOptions: [
      "إلغاء علامة الحلال الوطنية اختيارياً، والاستعاضة عنها بعلامة الحلال العربية.",
      "التكامل بين العلامتين، من خلال استمرار علامة الحلال الوطنية واعتبار الحصول على علامة الحلال العربية مكملاً لها، وذلك بدمج عمليات الفحص والتدقيق بملف واحد للحصول على العلامتين وبتكلفة واحدة على المورد.",
    ],
    noNational:
      "في الدول العربية الأعضاء التي ليس لها علامة حلال وطنية، يتم اعتماد علامة الحلال العربية والترخيص باستخدام العلامة العربية وفقاً لمتطلبات البرنامج العربي للحلال.",
    annexTitle: "نموذج ترخيص العلامة",
    annexText: "يعتمد ترخيص استخدام علامة الحلال العربية على نموذج الملحق رقم (7).",
    docsCta: "فتح النماذج والوثائق",
    prevCta: "شهادة الحلال",
  },
  en: {
    heroBefore: "Halal",
    heroHighlight: "Mark",
    badge: "Halal Mark",
    sectionTitleBefore: "Licensing the",
    sectionTitleHighlight: "Arab Halal Mark",
    definitionTitle: "Halal Mark Definition",
    definition:
      "A mark, badge, or logo owned by the organization. It may be placed on products, service documents, or related production systems that comply with program requirements after obtaining the license to use the Arab Halal Mark.",
    ownershipTitle: "Mark Ownership",
    ownership:
      "The Arab Industrial Development, Standardization and Mining Organization owns the Arab Halal Mark and its legal and ownership rights. It may be operated through accredited certification bodies in member states or Halal authorities in Arab and Islamic countries according to international practices and program procedures.",
    conditionsTitle: "Conditions of Use",
    conditions:
      "The supplier may place the Arab Halal Mark on the product or service/system documents after obtaining the relevant license and complying with the conditions of use stated in the program.",
    licenseTitle: "Licensing Use of the Mark",
    licenseIntro:
      "The designated body issues the license to use the Arab Halal Mark according to Annex no. (7) when the supplier or establishment fulfils the required conditions.",
    licenseItems: [
      "Fulfil the procedures for granting the Arab Halal Mark license and relevant standards.",
      "Pay the costs for the right to use the Arab Halal Mark as specified in the program.",
    ],
    nationalTitle: "National Mark and Arab Mark",
    nationalIntro: "Countries with national Halal marks may work through the following options:",
    nationalOptions: [
      "Voluntarily cancel the national Halal mark and replace it with the Arab Halal Mark.",
      "Integrate both marks by keeping the national mark and treating the Arab Halal Mark as complementary, with one inspection and audit file and one supplier cost.",
    ],
    noNational:
      "In Arab member states without a national Halal mark, the Arab Halal Mark is adopted and licensed according to Arab Halal Program requirements.",
    annexTitle: "Mark License Model",
    annexText: "The license to use the Arab Halal Mark is based on the Annex no. (7) model.",
    docsCta: "Open forms and documents",
    prevCta: "Halal Certificate",
  },
} satisfies Record<Lang, {
  heroBefore: string;
  heroHighlight: string;
  badge: string;
  sectionTitleBefore: string;
  sectionTitleHighlight: string;
  definitionTitle: string;
  definition: string;
  ownershipTitle: string;
  ownership: string;
  conditionsTitle: string;
  conditions: string;
  licenseTitle: string;
  licenseIntro: string;
  licenseItems: string[];
  nationalTitle: string;
  nationalIntro: string;
  nationalOptions: string[];
  noNational: string;
  annexTitle: string;
  annexText: string;
  docsCta: string;
  prevCta: string;
}>;

export default function HalalMark() {
  const { i18n } = useTranslation();
  const lang: Lang = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("en") ? "en" : "ar";
  const isRtl = lang === "ar";
  const d = copy[lang];

  return (
    <main className={`min-h-screen overflow-hidden bg-[#FAF9F6] ${isRtl ? "font-arabic" : "font-english"}`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="fixed inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-50" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }} />

      <section className="relative flex h-[50vh] min-h-[400px] w-full items-center justify-center overflow-hidden border-b border-stone-300 pt-20 shadow-[var(--shadow-ind-card)] lg:h-[60vh] lg:min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src="/cover-2.png" alt={d.heroHighlight} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-[#FAF9F6]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] md:text-5xl lg:text-7xl"
          >
            {d.heroBefore} <span className="text-[#CA8A04]">{d.heroHighlight}</span>
          </motion.h1>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 scroll-mt-28 lg:py-24">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-12 max-w-4xl text-center lg:mb-16"
          >
       
      
            <h2 className="text-2xl font-black leading-tight text-slate-900 md:text-3xl">
              {d.sectionTitleBefore} <span className="text-[#007A55]">{d.sectionTitleHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6 lg:col-span-7"
            >
              {[
                { title: d.definitionTitle, text: d.definition },
                { title: d.ownershipTitle, text: d.ownership },
                { title: d.conditionsTitle, text: d.conditions },
              ].map((item, index) => (
                <article key={item.title} className={`rounded-[1.75rem] border border-stone-200 p-6 shadow-[var(--shadow-ind-card)] lg:p-8 ${index === 1 ? "bg-[#F8F7F2]" : "bg-white"}`}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-[#007A55]/20 bg-[#007A55]/10 px-3 text-xs font-black text-[#007A55]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                  </div>
                  <p className="text-base font-bold leading-9 text-slate-600">{item.text}</p>
                </article>
              ))}
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
                  <img src="/licence-template.png" alt={d.annexTitle} className="h-full w-full bg-white object-contain p-6 transition-transform duration-1000 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C4C2A]/35 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-[#007A55]/20 bg-[#007A55]/10 px-3 text-xs font-black text-[#007A55]">
                04
              </span>
              <div>
                <h3 className="text-2xl font-black text-slate-900">{d.licenseTitle}</h3>
                <p className="mt-2 text-sm font-bold leading-7 text-slate-600">{d.licenseIntro}</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {d.licenseItems.map((item, index) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-stone-100 bg-[#FAF9F6] p-4 text-sm font-bold leading-7 text-slate-700">
                  <span className="mt-1 flex h-7 min-w-7 shrink-0 items-center justify-center rounded-lg bg-white px-2 text-[11px] font-black text-[#007A55] shadow-[var(--shadow-ind-sharp)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.75rem] bg-[#1C4C2A] p-7 text-white shadow-[var(--shadow-ind-floating)]">
              <span className="mb-6 inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-white/10 px-3 text-xs font-black text-[#CA8A04]">
                05
              </span>
              <h3 className="text-3xl font-black">{d.nationalTitle}</h3>
              <p className="mt-5 text-sm font-bold leading-8 text-stone-200">{d.nationalIntro}</p>
            </div>
            <div className="grid gap-4">
              {d.nationalOptions.map((option, index) => (
                <div key={option} className="rounded-[1.35rem] border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#CA8A04]/10 text-sm font-black text-[#CA8A04]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-bold leading-8 text-slate-700">{option}</p>
                </div>
              ))}
              <div className="rounded-[1.35rem] border border-[#007A55]/20 bg-[#007A55]/10 p-5">
                <p className="text-sm font-black leading-8 text-[#004D36]">{d.noNational}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="text-2xl font-black text-slate-900">{d.annexTitle}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-slate-600">{d.annexText}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/halal-certificate" className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-stone-200 bg-[#FAF9F6] px-5 py-3 text-sm font-black text-slate-700 hover:border-[#CA8A04]/40 hover:text-[#CA8A04] focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/20">
                <ArrowLeft size={18} strokeWidth={1.8} className={isRtl ? "rotate-180" : ""} />
                {d.prevCta}
              </Link>
              <Link to="/documents" className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#007A55] px-5 py-3 text-sm font-black text-white shadow-[var(--shadow-ind-card)] hover:bg-[#004D36] focus:outline-none focus:ring-4 focus:ring-[#007A55]/20">
                <FileSignature size={18} strokeWidth={1.8} />
                {d.docsCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
