import { useTranslation } from "react-i18next";
import {
  DefinitionPanel,
  FinalActionPanel,
  InformationPanel,
  InnerPageHero,
  PageSection,
  ProcessTimeline,
  SectionHeading,
  SectionReveal,
} from "../components/InternalPage";

type Step = { title: string; text: string };
type ComparisonItem = { title: string; text: string };

const arabicMarkConditionsText =
  "يمكن للمورِّد وضع شعار علامة الحلال العربية على المنتَج أو الوثائق الخاصة بالخدمة أو النظام، وذلك بعد حصوله على الترخيص باستخدام علامة الحلال العربية لذلك المنتَج أو الخدمة أو النظام، مع الالتزام بشروط استخدام العلامة الواردة في هذا البرنامج.";

const arabicLicensingIntro =
  "تقوم الجهة المعيَّنة بإصدار الترخيص باستخدام علامة الحلال العربية وفقاً للملحق (7)، وذلك عندما يستوفي المورِّد أو المنشأة ما يلي:";

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
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const checklist = t("halalMark.conditions.checklist", { returnObjects: true }) as string[];
  const comparison = t("halalMark.conditions.comparison", { returnObjects: true }) as ComparisonItem[];
  const licensingSteps = t("halalMark.licensing.steps", { returnObjects: true }) as Step[];
  const nationalOptions = t("halalMark.nationalIntegration.withNationalOptions", { returnObjects: true }) as string[];

  return (
    <main className={`min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF9F6] ${isRtl ? "font-arabic" : "font-english"}`} dir={isRtl ? "rtl" : "ltr"}>
      <InnerPageHero
        title={t("halalMark.hero.title")}
        description={t("halalMark.hero.description")}
      />

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
            <div className="grid gap-6 lg:grid-cols-[.82fr_1.18fr] lg:items-stretch">
              <aside className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[var(--shadow-ind-card)]">
                <div className="bg-[#FAF9F6] p-4">
                  <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white p-3 shadow-[var(--shadow-ind-sharp)]">
                    <img src="/licence-template.png" alt={t("halalMark.licenseForm.templateAlt")} className="mx-auto h-auto w-full max-w-[360px] object-contain" />
                  </div>
                </div>
                <div className="border-t border-stone-200 p-5 text-center">
                  <h2 className="text-xl font-black leading-8 text-slate-950">{t("halalMark.licenseForm.previewTitle")}</h2>
                  <p className="mt-2 text-sm font-bold leading-7 text-slate-600">{t("halalMark.licenseForm.previewDescription")}</p>
                </div>
              </aside>
              <FinalActionPanel
                title={t("halalMark.finalCta.title")}
                description={t("halalMark.finalCta.description")}
                primary={{ label: t("halalMark.finalCta.primary"), to: "/documents#document-library" }}
                secondary={{ label: t("halalMark.finalCta.secondary"), to: "/certificate-verification" }}
              />
            </div>
          </SectionReveal>
        </PageSection>
      </div>
    </main>
  );
}
