import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Beef,
  Briefcase,
  CupSoda,
  FileText,
  Package,
  Pill,
  PlaneTakeoff,
  Sparkles,
  TestTube,
} from "lucide-react";

const sectors = [
  { name: "اللحوم ومنتجاتها", detail: "ذبحاً وتصنيعاً والمنتجات الغذائية ذات الأصل الحيواني.", icon: Beef, image: "/domains/meat.jpg" },
  { name: "العصائر والمشروبات", detail: "المشروبات والمنتجات السائلة المشمولة باشتراطات الحلال.", icon: CupSoda, image: "/domains/drinks.jpg" },
  { name: "الأدوية", detail: "المنتجات الدوائية التي تتطلب تحققاً من المكونات والعمليات.", icon: Pill, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800" },
  { name: "مستحضرات التجميل", detail: "المنتجات التجميلية والعناية الشخصية ذات الصلة بالحلال.", icon: Sparkles, image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800" },
  { name: "خدمات الحلال", detail: "الخدمات المرتبطة بسلاسل القيمة والتشغيل الحلال.", icon: Briefcase, image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800" },
  { name: "المنتجات المحفوظة", detail: "المنتجات التي تحفظ في درجة حرارة الغرفة.", icon: Package, image: "/domains/prod.webp" },
  { name: "المكملات الغذائية", detail: "مكملات التغذية وما يتصل بها من مكونات وعمليات إنتاج.", icon: TestTube, image: "/domains/added.jpg" },
  { name: "السياحة الحلال", detail: "الخدمات والأنشطة السياحية المطابقة لاشتراطات الحلال.", icon: PlaneTakeoff, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" },
];


export default function ProgramScope() {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const translatedSectors = t("pages.programScope.sectors", { returnObjects: true }) as { name: string; detail: string }[];
  const translatedStats = t("pages.programScope.stats", { returnObjects: true }) as [string, string][];
  const displaySectors = sectors.map((sector, index) => ({
    ...sector,
    name: isRtl ? sector.name : translatedSectors[index]?.name ?? sector.name,
    detail: isRtl ? sector.detail : translatedSectors[index]?.detail ?? sector.detail,
  }));

  return (
    <main className={`min-h-screen bg-[#FAF9F6] pt-24 ${isRtl ? "font-arabic" : "font-english"} overflow-hidden`} dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img src="/section-1-bg.jpeg" alt={isRtl ? "مجال تطبيق البرنامج" : t("pages.programScope.heroAlt")} className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-[#1C4C2A]/75 to-slate-950" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#CA8A04] shadow-[var(--shadow-ind-sharp)] backdrop-blur">
              <FileText size={16} />
              AIDSMO 3042-2019 (GSO 2055-2)
            </div>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
              {isRtl ? "مجال تطبيق" : t("pages.programScope.titleBefore")} <span className="text-[#CA8A04]">{isRtl ? "البرنامج" : t("pages.programScope.titleHighlight")}</span>
            </h1>
            <p className="mt-8 text-base font-bold leading-9 text-stone-200 lg:text-xl">
              {isRtl ? "يُطبَق هذا البرنامج على المنتجات المشار إليها في المواصفة القياسية العربية رقم: 2019-3042 AIDSMO (GSO2055-2) التي تتطلب استيفاء اشتراطات الحلال وفقاً لأحكام الشريعة الإسلامية." : t("pages.programScope.desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {(isRtl
              ? [
                  ["المعيار المرجعي", "AIDSMO 3042-2019"],
                  ["المجالات ذات الأولوية", "8 مجالات"],
                  ["أساس التطبيق", "أحكام الشريعة الإسلامية"],
                ]
              : translatedStats
            ).map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-[var(--shadow-ind-card)] backdrop-blur">
                <p className="text-xs font-black text-stone-300">{label}</p>
                <p className="mt-2 text-xl font-black text-white">{value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              
              <h2 className="text-3xl font-black text-slate-900 lg:text-5xl">{isRtl ? "القطاعات المشمولة" : t("pages.programScope.included")}</h2>
            </div>
            <p className="max-w-2xl text-sm font-bold leading-7 text-slate-600 lg:text-base">
              {isRtl ? "بصورة عامة تكون أولوية المجالات الخاصة بتطبيق البرنامج العربي للحلال كالآتي:" : t("pages.programScope.includedDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {displaySectors.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <motion.article
                  key={sector.name}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative min-h-[310px] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[var(--shadow-ind-card)] hover:-translate-y-1 hover:shadow-[var(--shadow-ind-floating)]"
                >
                  <img src={sector.image} alt={sector.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/10" />
                  <div className="relative z-10 flex h-full min-h-[310px] flex-col justify-between p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#007A55] shadow-[var(--shadow-ind-floating)]">
                        <Icon size={24} />
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white backdrop-blur">0{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">{sector.name}</h3>
                      <p className="mt-3 text-sm font-bold leading-7 text-stone-200">{sector.detail}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
