import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const StatusSeal = () => (
  <svg viewBox="0 0 72 72" className="h-16 w-16 text-[#CA8A04]" fill="none" aria-hidden="true">
    <path d="M36 6 58 18.7v34.6L36 66 14 53.3V18.7L36 6Z" fill="currentColor" opacity=".14" />
    <path d="M36 9.5 55 20.5v31L36 62.5 17 51.5v-31L36 9.5Z" stroke="currentColor" strokeWidth="3" />
    <path d="M25 37h22M29 29h14M33 45h6" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" />
  </svg>
);

export default function JoinedCountries() {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");

  return (
    <main className={`min-h-screen overflow-hidden bg-[#FAF9F6] pt-24 ${isRtl ? "font-arabic" : "font-english"}`} dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative flex h-[50vh] min-h-[430px] items-center justify-center overflow-hidden border-b border-stone-300 bg-slate-950 px-6 text-center shadow-[var(--shadow-ind-card)] lg:h-[60vh] lg:min-h-[520px]">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src="/header-bg.png" alt={isRtl ? "الدول المنضمة" : `${t("pages.countries.titleBefore")} ${t("pages.countries.titleHighlight")}`} className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-slate-950/35 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/74 via-slate-950/18 to-[#FAF9F6]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="text-4xl font-black leading-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,.45)] md:text-6xl lg:text-7xl"
          >
            {isRtl ? "الدول" : t("pages.countries.titleBefore")} <span className="text-[#CA8A04]">{isRtl ? "المنضمة" : t("pages.countries.titleHighlight")}</span>
          </motion.h1>
        </div>
      </section>

      <section className="relative px-6 py-16 lg:py-24">
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex justify-center  items-center gap-4"
          >
            
            <p className="max-w-2xl text-center text-sm font-bold leading-7 text-slate-600 lg:text-base">
              {isRtl ? "هذه الصفحة مخصصة لعرض الدول التي تم اعتماد انضمامها رسمياً إلى البرنامج العربي للحلال." : t("pages.countries.desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-6 text-center shadow-[var(--shadow-ind-floating)] lg:p-10"
          >
            <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
            <div className="relative z-10">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] border border-stone-200 bg-[#FAF9F6] shadow-[var(--shadow-ind-card)]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  className="absolute h-20 w-20 rounded-full border-4 border-[#CA8A04]/15 border-t-[#CA8A04]"
                />
                <StatusSeal />
              </div>
              <h3 className="mt-8 text-3xl font-black text-slate-900 lg:text-5xl">{isRtl ? "سيتم تحديثها قريباً" : t("pages.countries.emptyTitle")}</h3>
         
            </div>
          </motion.div>
        </div>
      </section>

 
    </main>
  );
}
