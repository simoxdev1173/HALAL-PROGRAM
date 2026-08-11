import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {  X } from "lucide-react";
import {
  DefinitionPanel,
  InformationPanel,
  InnerPageHero,
  PageSection,
  ProcessTimeline,
  SectionHeading,
  SectionNav,
  type SectionNavItem,
  SectionReveal,
} from "../components/InternalPage";

type Step = { title: string; text: string };
type ComparisonItem = { title: string; text: string };

const arabicMarkConditionsText =
  "يمكن للمورِّد وضع شعار علامة الحلال العربية على المنتَج أو الوثائق الخاصة بالخدمة أو النظام، وذلك بعد حصوله على الترخيص باستخدام علامة الحلال العربية لذلك المنتَج أو الخدمة أو النظام، مع الالتزام بشروط استخدام العلامة الواردة في هذا البرنامج.";

const arabicLicensingIntro =
  "تقوم الجهة المعيَّنة بإصدار الترخيص باستخدام علامة الحلال العربية، وذلك عندما يستوفي المورِّد أو المنشأة ما يلي:";

const arabicLicensingRequirements = [
  "استيفاء متطلبات إجراءات منح ترخيص استخدام علامة الحلال العربية والمواصفات القياسية ذات العلاقة..",
  "تسديد تكاليف حق استخدام علامة الحلال العربية كما نصت عليه الفقرة (ب) من النقطة (2) من المادة (12).",
];

const arabicNationalIntro = "الدول التي لديها علامات حلال وطنية يمكنها العمل بالخيارات التالية:";

const arabicNationalOptions = [
  "إلغاء علامة الحلال الوطنية اختيارياً، والاستعاضة عنها بعلامة الحلال العربية.",
  "التكامل بين العلامتين، من خلال استمرار علامة الحلال الوطنية واعتبار الحصول على علامة الحلال العربية مكملاً لها، وذلك بدمج عمليات الفحص والتدقيق بملف واحد للحصول على العلامتين وبتكلفة واحدة على المورِّد، مع قيام المورِّد بتسديد تكاليف استخدام علامة الحلال العربية إلى المنظمة، وقيام جهة التعيين الحلال أو الجهة المعيَّنة بالترويج لعلامة الحلال العربية في استمارة التقديم على علامة الحلال الوطنية.",
];

const arabicNationalWithoutText =
  "في الدول العربية الأعضاء التي ليس لها علامة حلال وطنية، فيتم اعتماد علامة الحلال العربية والترخيص باستخدام العلامة العربية وفقا لمتطلبات البرنامج العربي للحلال.";

export default function HalalMark() {
  const { t, i18n } = useTranslation();
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const checklist = t("halalMark.conditions.checklist", { returnObjects: true }) as string[];
  const comparison = t("halalMark.conditions.comparison", { returnObjects: true }) as ComparisonItem[];
  const licensingSteps = t("halalMark.licensing.steps", { returnObjects: true }) as Step[];
  const nationalOptions = t("halalMark.nationalIntegration.withNationalOptions", { returnObjects: true }) as string[];

  const navItems = useMemo<SectionNavItem[]>(
    () => [
      { id: "definition", label: isRtl ? "التعريف" : "Definition" },
      { id: "ownership", label: isRtl ? "ملكية العلامة" : "Ownership" },
      { id: "conditions", label: isRtl ? "شروط الاستخدام" : "Conditions" },
      { id: "licensing", label: isRtl ? "الترخيص" : "Licensing" },
      { id: "national-integration", label: isRtl ? "العلامة الوطنية" : "National mark" },
      { id: "license-form", label: isRtl ? "التقديم" : "Apply" },
    ],
    [isRtl],
  );

  return (
    <main className={`min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF9F6] ${isRtl ? "font-arabic" : "font-english"}`} dir={isRtl ? "rtl" : "ltr"}>
      <InnerPageHero
        title={t("halalMark.hero.title")}
        description={t("halalMark.hero.description")}
      />

      <SectionNav items={navItems} isRtl={isRtl} />

      <div>
        <PageSection id="definition">
          <DefinitionPanel
            title={t("halalMark.definition.title")}
            body={t("halalMark.definition.body")}
            aside={
              <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-[1.5rem] border border-stone-200 bg-[#FAF9F6] p-7 shadow-[var(--shadow-ind-sharp)] lg:mx-0 lg:h-52 lg:w-52">
                <img src="/halal-mark.svg" alt={t("halalMark.hero.title")} className="h-full w-full object-contain" />
              </div>
            }
          />
        </PageSection>

        <PageSection id="ownership" tone="dark">
          <InformationPanel title={t("halalMark.ownership.title")} body={t("halalMark.ownership.body")} dark>
            
          </InformationPanel>
        </PageSection>

        <PageSection id="conditions" tone="soft">
          {isRtl ? (
            <>
              <SectionHeading title="شروط استخدام العلامة" />
              <SectionReveal>
                <article className="relative overflow-hidden rounded-[1.5rem] border border-[#007A55]/15 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:p-9">
                  <p className="text-lg font-bold leading-10 text-slate-700 lg:text-xl lg:leading-[2.35]">{arabicMarkConditionsText}</p>
                </article>
              </SectionReveal>
            </>
          ) : (
            <>
              <SectionHeading title={t("halalMark.conditions.title")} description={t("halalMark.conditions.description")} />
              <div className="grid gap-6 lg:grid-cols-[1fr_.85fr]">
                <SectionReveal>
                  <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:p-8">
                    <div className="grid gap-3">
                      {checklist.map((item) => (
                        <div key={item} className="rounded-xl border border-stone-100 bg-[#FAF9F6] p-4 text-sm font-bold leading-7 text-slate-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
                <SectionReveal>
                  <div className="grid h-full gap-4">
                    {comparison.map((item, index) => (
                      <article key={item.title} className={`rounded-2xl border p-5 shadow-[var(--shadow-ind-card)] ${index === 0 ? "border-[#007A55]/20 bg-[#007A55]/10" : "border-[#CA8A04]/20 bg-[#CA8A04]/10"}`}>
                        <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
                        <p className="mt-3 text-sm font-bold leading-7 text-slate-700">{item.text}</p>
                      </article>
                    ))}
                  </div>
                </SectionReveal>
              </div>
            </>
          )}
        </PageSection>

        <PageSection id="licensing">
          {isRtl ? (
            <>
              <SectionHeading title="الترخيص بإستخدام العلامة" />
              <SectionReveal>
                <article className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:p-9">
                  <p className="text-lg font-bold leading-10 text-slate-700 lg:text-xl">{arabicLicensingIntro}</p>
                  <div className="mt-6 grid gap-4">
                    {arabicLicensingRequirements.map((requirement) => (
                      <div key={requirement} className="rounded-2xl border border-stone-100 bg-[#FAF9F6] p-5 text-base font-bold leading-9 text-slate-700">
                        {requirement}
                      </div>
                    ))}
                  </div>
                </article>
              </SectionReveal>
            </>
          ) : (
            <>
              <SectionHeading title={t("halalMark.licensing.title")} description={t("halalMark.licensing.description")} />
              <ProcessTimeline steps={licensingSteps} />
            </>
          )}
        </PageSection>

        <PageSection id="national-integration" tone="soft">
          {isRtl ? (
            <>
              <SectionHeading title="العلامة الوطنية والعلامة العربية" />
              <SectionReveal>
                <article className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:p-9">
                  <p className="text-lg font-bold leading-10 text-slate-700 lg:text-xl">{arabicNationalIntro}</p>
                  <div className="mt-6 grid gap-4">
                    {arabicNationalOptions.map((option) => (
                      <div key={option} className="rounded-2xl border border-stone-100 bg-[#FAF9F6] p-5">
                        <p className="text-base font-bold leading-9 text-slate-700">{option}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-2xl border border-[#007A55]/20 bg-[#007A55]/10 p-5">
                    <h3 className="text-xl font-black text-[#004D36]">في حال عدم وجود علامة حلال وطنية</h3>
                    <p className="mt-3 text-base font-bold leading-9 text-[#004D36]">{arabicNationalWithoutText}</p>
                  </div>
                </article>
              </SectionReveal>
            </>
          ) : (
            <>
              <SectionHeading title={t("halalMark.nationalIntegration.title")} description={t("halalMark.nationalIntegration.description")} />
              <div className="grid gap-6 lg:grid-cols-2">
                <SectionReveal>
                  <article className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-card)] lg:p-8">
                    <h3 className="text-2xl font-black text-slate-950">{t("halalMark.nationalIntegration.withNationalTitle")}</h3>
                    <div className="mt-6 grid gap-4">
                      {nationalOptions.map((option) => (
                        <div key={option} className="rounded-xl border border-stone-100 bg-[#FAF9F6] p-4 text-sm font-bold leading-7 text-slate-700">
                          {option}
                        </div>
                      ))}
                    </div>
                  </article>
                </SectionReveal>
                <SectionReveal>
                  <article className="h-full rounded-[1.5rem] border border-[#007A55]/20 bg-[#007A55]/10 p-6 shadow-[var(--shadow-ind-card)] lg:p-8">
                    <h3 className="text-2xl font-black text-[#004D36]">{t("halalMark.nationalIntegration.withoutNationalTitle")}</h3>
                    <p className="mt-6 text-base font-black leading-9 text-[#004D36]">{t("halalMark.nationalIntegration.withoutNationalText")}</p>
                  </article>
                </SectionReveal>
              </div>
            </>
          )}
        </PageSection>

        <PageSection id="license-form">
          <SectionReveal>
            <div className="mx-auto max-w-5xl">
              <aside className="relative overflow-hidden rounded-[1.5rem] border border-[#CA8A04]/25 bg-slate-950 text-white shadow-[var(--shadow-ind-card)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_15%,rgba(202,138,4,0.34),transparent_28%),linear-gradient(135deg,rgba(0,122,85,0.26),transparent_48%)]" />
                <img src="/halal-mark.svg" alt="" aria-hidden="true" className="absolute -end-12 -top-16 h-64 w-64 opacity-[0.06]" />
                <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                <div className="relative grid gap-6 p-5 md:grid-cols-[320px_1fr] md:items-center lg:p-7">
                  <button
                    type="button"
                    onClick={() => setIsTemplateOpen(true)}
                    className="group relative mx-auto block w-full max-w-[300px] overflow-hidden rounded-2xl border border-white/15 bg-white p-3 shadow-[var(--shadow-ind-floating)] focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/25"
                    aria-label={t("halalMark.licenseForm.previewTitle")}
                  >
                    <img src="/licence-template.png" alt={t("halalMark.licenseForm.templateAlt")} className="mx-auto h-[300px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
                  </button>
                  <div className={isRtl ? "text-right" : "text-left"}>
                    <p className="text-xs font-black uppercase tracking-[.14em] text-[#CA8A04]">{t("halalMark.licenseForm.title")}</p>
                    <h2 className="mt-3 text-2xl font-black leading-9 text-white lg:text-3xl">{t("halalMark.licenseForm.previewTitle")}</h2>
                    <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-stone-300 lg:text-base lg:leading-8">{t("halalMark.licenseForm.previewDescription")}</p>
                    <div className="mt-5 max-w-md">
                      <button type="button" onClick={() => setIsTemplateOpen(true)} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-950 shadow-[var(--shadow-ind-sharp)] transition-colors hover:bg-[#CA8A04] focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/25">
                        {isRtl ? "معاينة النموذج" : "Preview model"}
                      </button>
                      <Link to="/halal-certificate-application" className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#CA8A04] px-4 py-2 text-sm font-black text-slate-950 shadow-[var(--shadow-ind-sharp)] transition-colors hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/25">
                        {isRtl ? "تعبئة نموذج طلب علامة الحلال العربية" : "Request Arab Halal Mark"}
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </SectionReveal>
        </PageSection>
      </div>
      {isTemplateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={t("halalMark.licenseForm.previewTitle")}>
          <div className="relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[1.5rem] border border-white/15 bg-white p-4 shadow-[var(--shadow-ind-floating)]">
            <button
              type="button"
              onClick={() => setIsTemplateOpen(false)}
              className="absolute end-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white shadow-[var(--shadow-ind-floating)] transition-colors hover:bg-[#007A55] focus:outline-none focus:ring-4 focus:ring-[#007A55]/25"
              aria-label={isRtl ? "إغلاق" : "Close"}
            >
              <X size={20} />
            </button>
            <img src="/licence-template.png" alt={t("halalMark.licenseForm.templateAlt")} className="mx-auto h-auto max-h-[86vh] w-auto max-w-full object-contain" />
          </div>
        </div>
      )}
    </main>
  );
}
