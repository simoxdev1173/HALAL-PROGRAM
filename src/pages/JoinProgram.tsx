import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const processSteps = [
  {
    number: "01",
    title: "تقديم الطلب",
    text: "تقديم طلب تشغيل البرنامج العربي للحلال إلى المنظمة مرفقا به الوثائق المطلوبة.",
  },
  {
    number: "02",
    title: "تقييم الملف",
    text: "تقوم المنظمة بتقييم الطلب وفقا للإجراءات المتبعة لديها.",
  },
  {
    number: "03",
    title: "الرد الرسمي",
    text: "يتم الرد على الطلب بالقبول أو الرفض خلال فترة شهر من تاريخ استلام الطلب.",
  },
  {
    number: "04",
    title: "وثيقة التعاون الفني",
    text: "عند قبول الطلب يتم توقيع وثيقة تعاون فني بين الطرفين وفقا للنموذج المعتمد.",
  },
];

type JoinStep = {
  title: string;
  text: string;
};

type JoinCopy = {
  badge: string;
  titleBefore: string;
  titleHighlight: string;
  intro: string;
  who: string;
  p1: string;
  p2: string;
  processTitle: string;
  steps: JoinStep[];
  noteTitle: string;
  note: string;
  countries: string;
  authorities: string;
};

export default function JoinProgram() {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const join = t("pages.join", { returnObjects: true }) as JoinCopy;
  const displaySteps = processSteps.map((step, index) => ({
    number: step.number,
    title: isRtl ? step.title : join.steps[index]?.title ?? step.title,
    text: isRtl ? step.text : join.steps[index]?.text ?? step.text,
  }));

  return (
    <main className={`min-h-screen overflow-hidden bg-[#FAF9F6] pt-24 ${isRtl ? "font-arabic" : "font-english"}`} dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src="/slider/i-1.png" alt={isRtl ? "شروط الانضمام للبرنامج" : `${join.titleBefore} ${join.titleHighlight}`} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-[#1C4C2A]/74 to-[#FAF9F6]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#CA8A04] shadow-[var(--shadow-ind-sharp)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#CA8A04] shadow-[0_0_12px_rgba(202,138,4,.9)]" />
              {isRtl ? "الانضمام للبرنامج" : join.badge}
            </div>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
              {isRtl ? "شروط" : join.titleBefore} <span className="text-[#CA8A04]">{isRtl ? "الانضمام" : join.titleHighlight}</span>
            </h1>
            <p className="mt-7 max-w-3xl text-base font-bold leading-9 text-stone-100 lg:text-xl">
              {isRtl ? "من له الحق في الانضمام للبرنامج وكيف تتم عملية الانضمام." : join.intro}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[var(--shadow-ind-card)] lg:p-10"
          >
            <div className="mb-8 flex items-center gap-4 border-b border-stone-200 pb-6">
              <span className="h-10 w-2 rounded-full bg-[#007A55] shadow-[var(--shadow-ind-sharp)]" />
              <h2 className="text-2xl font-black text-slate-900 lg:text-4xl">{isRtl ? "من له الحق في الانضمام؟" : join.who}</h2>
            </div>
            <div className="space-y-6 text-justify text-base font-bold leading-9 text-slate-700 lg:text-lg">
              <p>
                {isRtl ? "الجهات التي لها الحق في الانضمام إلى البرنامج هي جهات التعيين الحلال في الدول العربية الأعضاء الراغبة في تطبيق هذا البرنامج والراغبة في تفويضها لمنح علامة الحلال العربية، وجهات التعيين هي جهات حكومية مخوَّلة بتعيين جهات تقييم المطابقة في مجال الحلال أو تعليق تعيينها أو إلغائه." : join.p1}
              </p>
              <p>
                {isRtl ? "ويتم الانضمام إلى البرنامج العربي للحلال بتقديم طلب تشغيل البرنامج العربي للحلال إلى المنظمة مُرفقا به الوثائق المطلوبة، وتقوم المنظمة بتقييم الطلب وفقا للإجراءات المتَّبعة لديها، والرد على الطلب بالقبول أو الرفض خلال فترة شهر من تاريخ استلام الطلب، مع توضيح الأسباب في حالة الرفض. وعند قبول الطلب يتم توقيع وثيقة تعاون فني بين الطرفين وفقا لنموذج وثيقة التعاون الفني التي يمكن تحميلها من الموقع الإلكتروني." : join.p2}
              </p>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-[#e0e5ec] p-5 shadow-[var(--shadow-ind-floating)]"
          >
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#636e72 1px, transparent 1px), linear-gradient(90deg, #636e72 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
            <div className="relative overflow-hidden rounded-[1.5rem] bg-slate-950 p-7 text-white lg:p-9">
              <img src="/workflow/w-2.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-14" />
              <div className="absolute inset-0 bg-gradient-to-bl from-[#1C4C2A]/82 to-slate-950" />
              <div className="relative z-10">
                <p className="text-lg font-black text-[#CA8A04]">{isRtl ? "كيف تتم عملية الانضمام" : join.processTitle}</p>
                <div className="mt-5 space-y-4">
                  {displaySteps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#CA8A04] font-mono text-sm font-black text-slate-950 shadow-[var(--shadow-ind-sharp)]">
                          {step.number}
                        </span>
                        <h3 className="text-base font-black">{step.title}</h3>
                      </div>
                      <p className="mt-3 text-sm font-bold leading-7 text-stone-300">{step.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="px-6 pb-16 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-7xl rounded-[2rem] border border-[#CA8A04]/30 bg-[#CA8A04]/10 p-7 shadow-[var(--shadow-ind-card)] lg:p-10"
        >
          <h2 className="text-2xl font-black text-slate-900">{isRtl ? "ملاحظة" : join.noteTitle}</h2>
          <p className="mt-4 text-justify text-base font-bold leading-9 text-slate-700 lg:text-lg">
            {isRtl ? "يمكن لجهة التعيين الحلال، الموقِّعة على وثيقة التعاون، تفويض جهات تقييم مطابقة غير حكومية في مجال معيَّن وفقاً لهذا البرنامج، على ان تقوم بإبلاغ المنظمة تحريرياً بذلك، وعلى جهة التعيين الحلال وجهات تقييم المطابقة غير الحكومية (التي تُعينها) مراعاة دفع التكاليف المنصوص عليه ." : join.note}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/joined-countries" className="flex min-h-12 items-center justify-center rounded-xl bg-[#007A55] px-7 py-4 text-sm font-black text-white shadow-[var(--shadow-ind-floating)] hover:-translate-y-0.5">
              {isRtl ? "عرض الدول المنضمة" : join.countries}
            </Link>
            <Link to="/halal-sector-authorities" className="flex min-h-12 items-center justify-center rounded-xl border border-stone-200 bg-white px-7 py-4 text-sm font-black text-slate-800 shadow-[var(--shadow-ind-card)] hover:text-[#007A55]">
              {isRtl ? "الجهات المعنية بقطاع الحلال" : join.authorities}
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
