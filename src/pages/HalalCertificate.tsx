import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DollarSign, X } from "lucide-react";
import {
  DefinitionPanel,
  InformationPanel,
  InnerPageHero,
  PageSection,
  ProcessTimeline,
  RequirementGroup,
  SectionHeading,
  SectionNav,
  type SectionNavItem,
  SectionReveal,
} from "../components/InternalPage";

type Step = { title: string; text: string };
type RequirementCopy = { title: string; description: string; items: string[] };
type CostFee = { amount: string; label: string; title: string; body: string };

export default function HalalCertificate() {
  const { t, i18n } = useTranslation();
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const processSteps = t("halalCertificate.process.steps", { returnObjects: true }) as Step[];
  const diagramItems = t("halalCertificate.grantingBodies.diagram", { returnObjects: true }) as string[];
  const generalRequirements = t("halalCertificate.requirements.general", { returnObjects: true }) as RequirementCopy;
  const technicalRequirements = t("halalCertificate.requirements.technical", { returnObjects: true }) as RequirementCopy;
  const costFees = t("halalCertificate.costs.fees", { returnObjects: true }) as CostFee[];
  const arabicCertificateJourneySteps: Step[] = [
    {
      title: "اختيار الجهة المخوّلة",
      text: "يتواصل المورّد أو المنشأة مع إحدى جهات منح شهادات الحلال المعتمدة من جهة تعيين عربية موقعة على وثيقة التعاون الفني مع المنظمة وعضو في البرنامج.",
    },
    {
      title: "التحقق من مجال المنتج أو الخدمة",
      text: "التأكد من أن المنتج أو الخدمة أو نظام الإنتاج يندرج ضمن فئات الحلال المحددة في المواصفة العربية رقم AIDSMO 3042:2019 (GSO 2055-2).",
    },
    {
      title: "تقديم طلب الشهادة",
      text: "تعبئة نموذج طلب الحصول على أو تجديد شهادة وعلامة الحلال العربية، مع تقديم طلب مستقل لكل منتج أو خدمة أو نظام إنتاج.",
    },
    {
      title: "تقييم المطابقة",
      text: "تقوم الجهة المعتمدة بدراسة الطلب وتنفيذ إجراءات تقييم المطابقة اللازمة، والتي قد تشمل مراجعة الوثائق والتدقيق والتفتيش والتحقق من استيفاء متطلبات الحلال والمواصفات ذات العلاقة.",
    },
    {
      title: "تسديد التكاليف",
      text: "يسدد مقدم الطلب تكاليف الشهادة والترخيص وفق أنظمة الجهة المختصة، إضافة إلى تكلفة حق استخدام علامة الحلال العربية، والبالغة 100 دولار أمريكي سنوياً عن كل ترخيص.",
    },
    {
      title: "إصدار الشهادة والترخيص",
      text: "بعد استيفاء المتطلبات والموافقة على الطلب، تصدر الجهة المعتمدة شهادة الحلال والترخيص باستخدام علامة الحلال العربية للمنتج أو الخدمة أو النظام المعني.",
    },
    {
      title: "استخدام العلامة وتجديد الترخيص",
      text: "توضع العلامة فقط على المنتجات أو الخدمات المشمولة بالترخيص. وتبلغ مدة صلاحية ترخيص استخدام العلامة ثلاث سنوات، وفق تقدير الجهة المختصة، مع تقديم طلب التجديد قبل انتهاء الترخيص بشهر واحد على الأقل.",
    },
  ];
  const displayedProcessTitle = isRtl ? "مسار الحصول على شهادة وعلامة الحلال العربية" : t("halalCertificate.process.title");
  const displayedProcessDescription = isRtl
    ? "يوضح هذا المسار الخطوات العملية التي يتبعها المورّد أو المنشأة للحصول على شهادة الحلال العربية والترخيص باستخدام العلامة."
    : t("halalCertificate.process.description");
  const displayedProcessSteps = isRtl ? arabicCertificateJourneySteps : processSteps;
  const arabicGrantingBodies = [
    {
      title: "جهة التعيين الحلال",
      text: "جهة حكومية مخوّلة بتعيين جهات تقييم المطابقة في مجال الحلال أو تعليق تعيينها أو إلغائه.",
    },
    {
      title: "الجهة المعيّنة",
      text: "جهة منح الشهادات المرخّص لها بمنح شهادة الحلال العربية.",
    },
    {
      title: "المورّد أو المنشأة",
      text: "الجهة المتقدّمة بطلب الحصول على الشهادة وعلامة الحلال العربية.",
    },
  ];
  const displayedGrantingBodiesTitle = isRtl ? "الجهات المانحة للشهادة" : t("halalCertificate.grantingBodies.title");
  const displayedGrantingBodiesBody = isRtl
    ? "تصدر شهادة الحلال العربية عن الجهة المعيّنة المرخّص لها بمنح شهادة الحلال العربية. إذا كنت مورّداً أو منشأةً راغبة في الحصول على الشهادة أو الترخيص باستخدام علامة الحلال، يمكن لك التواصل مع إحدى الجهات المعيّنة المعتمدة من قبل جهة تعيين عربية، موقّعة على وثيقة التعاون الفنية مع المنظمة وعضو بالبرنامج، وطلب الحصول على الترخيص لمنح الشهادة."
    : t("halalCertificate.grantingBodies.body");
  const displayedGrantingBodiesCta = isRtl ? "البحث عن جهة مانحة معتمدة" : t("halalCertificate.grantingBodies.cta");
  const displayedRequirementsTitle = isRtl ? "متطلبات الحصول على الشهادة" : t("halalCertificate.requirements.title");
  const displayedRequirementsDescription = isRtl
    ? "تتوزع متطلبات الحصول على شهادة وعلامة الحلال العربية بين متطلبات عامة مرتبطة بالطلب والترخيص، ومتطلبات فنية مرتبطة بالمطابقة والاشتراطات الشرعية والقياسية."
    : t("halalCertificate.requirements.description");
  const displayedGeneralRequirements: RequirementCopy = isRtl
    ? {
        title: "المتطلبات العامة",
        description: "المتطلبات الإدارية والتنظيمية الأساسية قبل وأثناء تقديم طلب الشهادة والترخيص.",
        items: [
          "ملء نموذج طلب الحصول على أو تجديد شهادة وعلامة الحلال العربية.",
          "تقديم طلب مستقل لكل منتج أو خدمة أو نظام.",
          "أن يكون المنتج أو الخدمة أو النظام ضمن مجالات الفئات المحددة في الجدول A.1، فئات المنتج أو الخدمة الحلال، الوارد في المواصفة العربية رقم 3042-2019 (GSO 2055-2).",
          "التواصل مع إحدى الجهات المعيّنة المعتمدة من قبل جهة تعيين عربية موقعة على وثيقة التعاون الفني مع المنظمة وعضو في البرنامج.",
          "تسديد تكاليف الحصول على الشهادة والترخيص وفقاً للأنظمة التي تعمل بها الجهة المعيّنة أو جهة التعيين الحلال.",
          "تسديد تكاليف حق استخدام علامة الحلال العربية وفقاً لما هو منصوص عليه في البرنامج.",
        ],
      }
    : generalRequirements;
  const displayedTechnicalRequirements: RequirementCopy = isRtl
    ? {
        title: "المتطلبات الفنية",
        description: "المتطلبات المرتبطة بالاشتراطات الشرعية والمواصفات القياسية وإجراءات تقييم المطابقة.",
        items: [
          "استيفاء اشتراطات الحلال وفقاً لأحكام الشريعة الإسلامية.",
          "استيفاء متطلبات إجراءات منح ترخيص استخدام علامة الحلال العربية.",
          "استيفاء متطلبات المواصفات القياسية ذات العلاقة بالمنتج أو الخدمة أو نظام الإنتاج.",
          "الخضوع لإجراءات تقييم المطابقة المطلوبة، بما في ذلك أنشطة التحقق من المطابقة مثل التفتيش أو التدقيق عند الحاجة.",
          "الالتزام بمتطلبات البيانات الإيضاحية المنصوص عليها في المواصفات القياسية العربية أو الوطنية للمنتج.",
        ],
      }
    : technicalRequirements;

  const exemptBadge = isRtl ? "الجهات الحكومية معفاة" : "Government bodies exempt";
  const additionalCostsPayer = isRtl ? "يتحملها مقدم الطلب" : "Borne by the applicant";

  const navItems = useMemo<SectionNavItem[]>(
    () => [
      { id: "definition", label: isRtl ? "التعريف" : "Definition" },
      { id: "journey", label: isRtl ? "مسار الحصول" : "Process" },
      { id: "granting-bodies", label: isRtl ? "الجهات المانحة" : "Granting bodies" },
      { id: "requirements", label: isRtl ? "المتطلبات" : "Requirements" },
      { id: "costs", label: isRtl ? "التكاليف" : "Costs" },
      { id: "application", label: isRtl ? "التقديم" : "Apply" },
    ],
    [isRtl],
  );

  return (
    <main className={`min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF9F6] ${isRtl ? "font-arabic" : "font-english"}`} dir={isRtl ? "rtl" : "ltr"}>
      <InnerPageHero
        title={t("halalCertificate.hero.title")}
        description={t("halalCertificate.hero.description")}
      />

      <SectionNav items={navItems} isRtl={isRtl} />

      <div>
        <PageSection id="definition">
          <DefinitionPanel title={t("halalCertificate.definition.title")} body={t("halalCertificate.definition.body")}  />
        </PageSection>

        <PageSection id="journey" tone="soft">
          <SectionHeading title={displayedProcessTitle} description={displayedProcessDescription} />
          <ProcessTimeline steps={displayedProcessSteps} />
        </PageSection>

        <PageSection id="granting-bodies">
          <InformationPanel title={displayedGrantingBodiesTitle} body={displayedGrantingBodiesBody}>
           
            <div className="mt-6 flex justify-center">
              <Link to="/halal-sector-authorities" className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-[#007A55] px-5 py-3 text-sm font-black text-white shadow-[var(--shadow-ind-floating)] hover:bg-[#004D36] focus:outline-none focus:ring-4 focus:ring-[#007A55]/20">
                {displayedGrantingBodiesCta}
              </Link>
            </div>
          </InformationPanel>
        </PageSection>

        <PageSection id="requirements" tone="soft">
          <SectionHeading title={displayedRequirementsTitle} description={displayedRequirementsDescription} />
          <div className="grid gap-5 lg:grid-cols-2">
            <RequirementGroup defaultOpen title={displayedGeneralRequirements.title} description={displayedGeneralRequirements.description} items={displayedGeneralRequirements.items} />
            <RequirementGroup defaultOpen title={displayedTechnicalRequirements.title} description={displayedTechnicalRequirements.description} items={displayedTechnicalRequirements.items} />
          </div>
        </PageSection>

        <PageSection id="costs">
          <div className="overflow-hidden rounded-2xl border border-[#007A55]/20 bg-white shadow-[0_26px_65px_-48px_rgba(0,77,54,.55)]">
            <header className="border-b border-[#007A55]/15 bg-[#E8F3EE] px-6 py-8 text-center sm:px-8 lg:px-10 lg:py-10">
              <h2 className="text-3xl font-black leading-tight text-[#073B2C] lg:text-4xl">{t("halalCertificate.costs.title")}</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base font-bold leading-8 text-slate-700 lg:text-lg lg:leading-9">{t("halalCertificate.costs.description")}</p>
            </header>

            <SectionReveal>
              <div>
                <div className="grid items-stretch gap-5 border-b border-[#007A55]/15 bg-[#F8FBF9] p-5 md:grid-cols-2 lg:p-6">
                  <article className="h-full rounded-xl border border-[#007A55]/15 border-t-[3px] border-t-[#007A55] bg-white p-6 shadow-[0_14px_32px_-28px_rgba(0,77,54,.55)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#007A55]/30 hover:shadow-[0_24px_44px_-26px_rgba(0,77,54,.42)] motion-reduce:transform-none motion-reduce:transition-none lg:p-8">
                    <h3 className="text-xl font-black leading-8 text-[#006747] md:min-h-16">{t("halalCertificate.costs.authorityTitle")}</h3>
                    <p className="mt-4 text-base font-bold leading-8 text-slate-700 lg:leading-9">{t("halalCertificate.costs.authorityBody")}</p>
                  </article>

                  <article className="h-full rounded-xl border border-[#007A55]/15 border-t-[3px] border-t-[#007A55] bg-white p-6 shadow-[0_14px_32px_-28px_rgba(0,77,54,.55)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#007A55]/30 hover:shadow-[0_24px_44px_-26px_rgba(0,77,54,.42)] motion-reduce:transform-none motion-reduce:transition-none lg:p-8">
                    <h3 className="text-xl font-black leading-8 text-[#006747] md:min-h-16">{t("halalCertificate.costs.organizationTitle")}</h3>
                    <p className="mt-4 text-base font-bold leading-8 text-slate-700 lg:leading-9">{t("halalCertificate.costs.organizationBody")}</p>
                  </article>
                </div>

                <div className="divide-y divide-[#007A55]/15">
                  {costFees.map((fee, index) => {
                    const numeric = fee.amount.match(/[\d.,]+/)?.[0] ?? fee.amount;
                    const currency = fee.amount.replace(numeric, "").trim();
                    const isExempt = index === 0;
                    return (
                      <article key={fee.title} className="relative z-0 grid bg-white transition-[transform,box-shadow] duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-[0_22px_42px_-30px_rgba(0,77,54,.4)] motion-reduce:transform-none motion-reduce:transition-none lg:grid-cols-[230px_1fr]">
                        <div className={`bg-[#EDF6F1] p-6 text-center lg:p-8 ${isRtl ? "lg:border-l" : "lg:border-r"} border-[#007A55]/15`}>
                          <div className="flex items-center justify-center gap-1 text-[#064E3B]" dir="ltr">
                            <DollarSign size={38} strokeWidth={2.1} aria-hidden="true" />
                            <span className="block text-6xl font-black leading-none tracking-tight lg:text-7xl">{numeric}</span>
                          </div>
                          {currency && <span className="mt-3 block text-base font-black text-[#007A55]">{currency}</span>}
                          <p className="mt-5 text-base font-black leading-8 text-[#073B2C]">{fee.label}</p>
                          {isExempt && (
                            <p className="mt-5 border-t border-[#007A55]/20 pt-4 text-sm font-black leading-7 text-[#006747]">
                              {exemptBadge}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col p-6 lg:p-8">
                          <h3 className="text-2xl font-black leading-9 text-[#073B2C]">{fee.title}</h3>
                          <p className="mt-4 text-base font-bold leading-8 text-slate-700 lg:leading-9">{fee.body}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <article className="relative z-0 grid border-t border-[#007A55]/15 bg-[#F8FBF9] transition-[transform,box-shadow] duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-[0_22px_42px_-30px_rgba(0,77,54,.4)] motion-reduce:transform-none motion-reduce:transition-none lg:grid-cols-[230px_1fr]">
                  <div className={`bg-[#E2F0E9] p-6 text-center lg:p-8 ${isRtl ? "lg:border-l" : "lg:border-r"} border-[#007A55]/15`}>
                    <h3 className="text-xl font-black leading-8 text-[#073B2C]">{t("halalCertificate.costs.additionalCostsTitle")}</h3>
                    <p className="mt-4 text-base font-black leading-8 text-[#006747]">{additionalCostsPayer}</p>
                  </div>
                  <p className="p-6 text-base font-bold leading-8 text-slate-700 lg:p-8 lg:leading-9">{t("halalCertificate.costs.additionalCostsBody")}</p>
                </article>

                <p className="border-t border-[#007A55]/15 bg-[#075E45] px-6 py-5 text-center text-base font-black leading-8 text-white lg:text-lg">
                  {t("halalCertificate.costs.notice")}
                </p>
              </div>
            </SectionReveal>
          </div>
        </PageSection>

        <PageSection id="application" tone="soft">
          <SectionReveal>
            <div className="mx-auto max-w-5xl">
              <aside className="relative overflow-hidden rounded-[1.5rem] border border-[#007A55]/15 bg-white shadow-[var(--shadow-ind-card)]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,122,85,0.08),transparent_42%),radial-gradient(circle_at_90%_12%,rgba(202,138,4,0.16),transparent_30%)]" />
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="relative grid gap-6 p-5 md:grid-cols-[320px_1fr] md:items-center lg:p-7">
                  <button
                    type="button"
                    onClick={() => setIsTemplateOpen(true)}
                    className="group relative mx-auto block w-full max-w-[300px] overflow-hidden rounded-2xl border border-stone-200 bg-white p-3 shadow-[var(--shadow-ind-sharp)] focus:outline-none focus:ring-4 focus:ring-[#007A55]/20"
                    aria-label={t("halalCertificate.finalCta.previewTitle")}
                  >
                    <img src="/certificate-template.png" alt={t("halalCertificate.finalCta.templateAlt")} className="mx-auto h-[300px] w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
                  </button>
                  <div className={isRtl ? "text-right" : "text-left"}>
                    {/* <p className="text-xs font-black uppercase tracking-[.14em] text-[#007A55]">{t("halalCertificate.finalCta.title")}</p> */}
                    <h2 className="mt-3 text-2xl font-black leading-9 text-slate-950 lg:text-3xl">{t("halalCertificate.finalCta.previewTitle")}</h2>
                    <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-slate-600 lg:text-base lg:leading-8">{t("halalCertificate.finalCta.previewDescription")}</p>
                    <div className="mt-5 max-w-md">
                      <button type="button" onClick={() => setIsTemplateOpen(true)} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-[var(--shadow-ind-sharp)] transition-colors hover:bg-[#007A55] focus:outline-none focus:ring-4 focus:ring-[#007A55]/20">
                        {isRtl ? "معاينة النموذج" : "Preview model"}
                      </button>
                      <Link to="/halal-certificate-application" className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#007A55] px-4 py-2 text-sm font-black text-white shadow-[var(--shadow-ind-sharp)] transition-colors hover:bg-[#004D36] focus:outline-none focus:ring-4 focus:ring-[#007A55]/20">
                        {isRtl ? "تعبئة نموذج طلب شهادة الحلال العربية" : "Request Arab Halal certificate"}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={t("halalCertificate.finalCta.previewTitle")}>
          <div className="relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[1.5rem] border border-white/15 bg-white p-4 shadow-[var(--shadow-ind-floating)]">
            <button
              type="button"
              onClick={() => setIsTemplateOpen(false)}
              className="absolute end-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white shadow-[var(--shadow-ind-floating)] transition-colors hover:bg-[#007A55] focus:outline-none focus:ring-4 focus:ring-[#007A55]/25"
              aria-label={isRtl ? "إغلاق" : "Close"}
            >
              <X size={20} />
            </button>
            <img src="/certificate-template.png" alt={t("halalCertificate.finalCta.templateAlt")} className="mx-auto h-auto max-h-[86vh] w-auto max-w-full object-contain" />
          </div>
        </div>
      )}
    </main>
  );
}
