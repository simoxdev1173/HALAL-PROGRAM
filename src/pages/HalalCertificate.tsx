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
    heroBefore: "شهادة",
    heroHighlight: "الحلال",
    badge: "شهادة الحلال",
    sectionTitleBefore: "وثيقة اعتماد",
    sectionTitleHighlight: "المطابقة للحلال",
    definitionTitle: "تعريف شهادة الحلال",
    definition:
      "هي وثيقة صادرة عن الجهة المعينة أو جهة تقييم المطابقة، تثبت أن المنتجات أو الخدمات أو الأنظمة الحاصلة على شهادة الحلال هي منتجات أو خدمات أو أنظمة حلال مطابقة لمتطلبات هذا البرنامج والمواصفات القياسية ذات العلاقة، ومطابقة لأحكام الشريعة الإسلامية.",
    obtainTitle: "الحصول على الشهادة",
    obtainText:
      "ينظم هذا المدخل مسار الحصول على الشهادة من خلال تحديد الجهة المانحة، والمتطلبات العامة والفنية، والتكاليف، ونموذج طلب الحصول على الشهادة.",
    cards: [
      {
        title: "الجهات المانحة للشهادة",
        text: "تصدر الشهادة من الجهات المعينة أو جهات تقييم المطابقة المخولة ضمن منظومة البرنامج العربي للحلال.",
      },
      {
        title: "متطلبات عامة",
        text: "استيفاء المتطلبات الإدارية والقانونية والإجرائية المرتبطة بطلب الحصول على الشهادة.",
      },
      {
        title: "متطلبات فنية",
        text: "مطابقة المنتجات أو الخدمات أو الأنظمة لمتطلبات البرنامج والمواصفات القياسية ذات العلاقة.",
      },
      {
        title: "التكاليف",
        text: "تطبق التكاليف المقررة في البرنامج وفق طبيعة الشهادة والجهة المعنية ونطاق المنتج أو الخدمة.",
      },
    ],
    annexTitle: "نموذج طلب الحصول على الشهادة",
    annexText: "لتقديم طلب الحصول على الشهادة يتم الرجوع إلى النموذج الرسمي في الملحق رقم (1).",
    docsCta: "فتح النماذج والوثائق",
    nextCta: "علامة الحلال",
  },
  en: {
    heroBefore: "Halal",
    heroHighlight: "Certificate",
    badge: "Halal Certificate",
    sectionTitleBefore: "A document for",
    sectionTitleHighlight: "Halal conformity",
    definitionTitle: "Halal Certificate Definition",
    definition:
      "A document issued by the designated body or conformity assessment body confirming that certified products, services, or systems are Halal and comply with this program, relevant standards, and Islamic Sharia provisions.",
    obtainTitle: "Obtaining the Certificate",
    obtainText:
      "This entry organizes the certification path through issuing bodies, general and technical requirements, costs, and the official application form.",
    cards: [
      {
        title: "Certificate issuing bodies",
        text: "The certificate is issued by designated bodies or authorized conformity assessment bodies within the Arab Halal Program.",
      },
      {
        title: "General requirements",
        text: "Fulfilment of administrative, legal, and procedural requirements related to the certification request.",
      },
      {
        title: "Technical requirements",
        text: "Compliance of products, services, or systems with program requirements and relevant standards.",
      },
      {
        title: "Costs",
        text: "Approved program costs apply according to the certificate, responsible body, and product or service scope.",
      },
    ],
    annexTitle: "Certificate application form",
    annexText: "To apply for the certificate, use the official form in Annex no. (1).",
    docsCta: "Open forms and documents",
    nextCta: "Halal Mark",
  },
} satisfies Record<Lang, {
  heroBefore: string;
  heroHighlight: string;
  badge: string;
  sectionTitleBefore: string;
  sectionTitleHighlight: string;
  definitionTitle: string;
  definition: string;
  obtainTitle: string;
  obtainText: string;
  cards: { title: string; text: string }[];
  annexTitle: string;
  annexText: string;
  docsCta: string;
  nextCta: string;
}>;

export default function HalalCertificate() {
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
              className="flex h-full flex-col gap-6 lg:col-span-7"
            >
              <article className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:p-8">
                <h3 className="mb-4 text-2xl font-black text-slate-900">{d.definitionTitle}</h3>
                <p className="text-base font-bold leading-9 text-slate-600 lg:text-lg">{d.definition}</p>
              </article>

              <article className="rounded-[1.75rem] border border-stone-200 bg-[#F8F7F2] p-6 shadow-[var(--shadow-ind-card)] lg:flex-1 lg:p-8">
                <h3 className="mb-4 text-2xl font-black text-slate-900">{d.obtainTitle}</h3>
                <p className="text-base font-bold leading-9 text-slate-600">{d.obtainText}</p>
              </article>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRtl ? -30 : 30, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative h-full lg:col-span-5"
            >
              <div className="relative h-[420px] overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-3 shadow-[var(--shadow-ind-floating)] lg:h-full lg:min-h-full">
                <div className="relative h-full overflow-hidden rounded-[1.5rem] bg-slate-900 shadow-[inset_0_10px_40px_rgba(0,0,0,0.2)]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
                  <img src="/certificate-template.png" alt={d.annexTitle} className="h-full w-full bg-white object-contain p-6 transition-transform duration-1000 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C4C2A]/35 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {d.cards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[1.35rem] border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]"
              >
                <span className="mb-4 inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-[#007A55]/20 bg-[#007A55]/10 px-3 text-xs font-black text-[#007A55]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-black text-slate-900">{card.title}</h3>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-600">{card.text}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 grid gap-5 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="text-2xl font-black text-slate-900">{d.annexTitle}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-slate-600">{d.annexText}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/documents" className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#007A55] px-5 py-3 text-sm font-black text-white shadow-[var(--shadow-ind-card)] hover:bg-[#004D36] focus:outline-none focus:ring-4 focus:ring-[#007A55]/20">
                <FileSignature size={18} strokeWidth={1.8} />
                {d.docsCta}
              </Link>
              <Link to="/halal-mark" className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-stone-200 bg-[#FAF9F6] px-5 py-3 text-sm font-black text-slate-700 hover:border-[#CA8A04]/40 hover:text-[#CA8A04] focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/20">
                {d.nextCta}
                <ArrowLeft size={18} strokeWidth={1.8} className={isRtl ? "" : "rotate-180"} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
