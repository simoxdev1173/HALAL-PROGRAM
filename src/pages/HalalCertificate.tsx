import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  DefinitionPanel,
  FinalActionPanel,
  InformationPanel,
  InnerPageHero,
  PageSection,
  ProcessTimeline,
  RequirementGroup,
  SectionHeading,
  SectionReveal,
} from "../components/InternalPage";

type Step = { title: string; text: string };
type RequirementCopy = { title: string; description: string; items: string[] };
type CostFee = { amount: string; label: string; title: string; body: string };

export default function HalalCertificate() {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const emphasis = t("halalCertificate.definition.emphasis", { returnObjects: true }) as string[];
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

  return (
    <main className={`min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF9F6] ${isRtl ? "font-arabic" : "font-english"}`} dir={isRtl ? "rtl" : "ltr"}>
      <InnerPageHero
        title={t("halalCertificate.hero.title")}
        description={t("halalCertificate.hero.description")}
      />

      <div>
        <PageSection id="definition">
          <DefinitionPanel title={t("halalCertificate.definition.title")} body={t("halalCertificate.definition.body")} emphasis={emphasis} />
        </PageSection>

        <PageSection id="journey" tone="soft">
          <SectionHeading title={displayedProcessTitle} description={displayedProcessDescription} />
          <ProcessTimeline steps={displayedProcessSteps} />
        </PageSection>

        <PageSection id="granting-bodies">
          <InformationPanel title={displayedGrantingBodiesTitle} body={displayedGrantingBodiesBody}>
            {isRtl ? (
              <div>
                <h3 className="text-xl font-black leading-8 text-slate-950">الأطراف المعنية</h3>
                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  {arabicGrantingBodies.map((item) => (
                    <article key={item.title} className="rounded-2xl border border-stone-200 bg-[#FAF9F6] p-5 shadow-[var(--shadow-ind-sharp)]">
                      <h4 className="text-lg font-black leading-8 text-slate-950">{item.title}</h4>
                      <p className="mt-3 text-sm font-bold leading-7 text-slate-700">{item.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
                {diagramItems.map((item, index) => (
                  <div key={item} className="contents">
                    <div className="rounded-2xl border border-stone-200 bg-[#FAF9F6] p-5 text-center shadow-[var(--shadow-ind-sharp)]">
                      <p className="text-sm font-black leading-7 text-slate-800">{item}</p>
                    </div>
                    {index < diagramItems.length - 1 && <span aria-hidden="true" className="hidden h-px w-10 bg-[#CA8A04]/60 lg:block" />}
                  </div>
                ))}
              </div>
            )}
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
          <SectionHeading title={t("halalCertificate.costs.title")} description={t("halalCertificate.costs.description")} />
          <SectionReveal>
            <article className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[var(--shadow-ind-card)]">
              <div className="grid gap-0 lg:grid-cols-[.92fr_1.08fr]">
                <div className="border-b border-stone-200 bg-[#FAF9F6] p-6 lg:border-b-0 lg:border-e lg:p-8">
                  <p className="text-xs font-black uppercase tracking-[.14em] text-[#007A55]">{t("halalCertificate.costs.authorityTitle")}</p>
                  <p className="mt-4 text-base font-bold leading-9 text-slate-700">{t("halalCertificate.costs.authorityBody")}</p>
                </div>
                <div className="p-6 lg:p-8">
                  <p className="text-xs font-black uppercase tracking-[.14em] text-[#CA8A04]">{t("halalCertificate.costs.organizationTitle")}</p>
                  <p className="mt-4 text-base font-bold leading-9 text-slate-700">{t("halalCertificate.costs.organizationBody")}</p>
                </div>
              </div>

              <div className="border-t border-stone-200 bg-slate-950 p-5 text-white lg:p-7">
                <div className="grid gap-4 md:grid-cols-2">
                  {costFees.map((fee) => (
                    <section key={fee.title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                      <p className="text-2xl font-black leading-none text-[#CA8A04]">{fee.amount}</p>
                      <p className="mt-2 text-sm font-black leading-6 text-stone-100">{fee.label}</p>
                      <div className="mt-5 border-t border-white/10 pt-5">
                        <h3 className="text-lg font-black leading-8 text-white">{fee.title}</h3>
                        <p className="mt-3 text-sm font-bold leading-7 text-stone-300">{fee.body}</p>
                      </div>
                    </section>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 border-t border-stone-200 p-6 lg:grid-cols-[1fr_auto] lg:items-start lg:p-8">
                <div>
                  <h3 className="text-2xl font-black leading-9 text-slate-950">{t("halalCertificate.costs.additionalCostsTitle")}</h3>
                  <p className="mt-4 text-base font-bold leading-9 text-slate-700">{t("halalCertificate.costs.additionalCostsBody")}</p>
                </div>
                <p className="rounded-2xl border border-[#CA8A04]/30 bg-[#CA8A04]/10 p-5 text-center text-sm font-black leading-7 text-[#7A5200] lg:max-w-56">
                  {t("halalCertificate.costs.notice")}
                </p>
              </div>
            </article>
          </SectionReveal>
        </PageSection>

        <PageSection id="application" tone="soft">
          <SectionReveal>
            <div className="grid gap-6 lg:grid-cols-[.82fr_1.18fr] lg:items-stretch">
              <aside className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[var(--shadow-ind-card)]">
                <div className="bg-[#FAF9F6] p-4">
                  <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white p-3 shadow-[var(--shadow-ind-sharp)]">
                    <img src="/certificate-template.png" alt={t("halalCertificate.finalCta.templateAlt")} className="mx-auto h-auto w-full max-w-[360px] object-contain" />
                  </div>
                </div>
                <div className="border-t border-stone-200 p-5 text-center">
                  <h2 className="text-xl font-black leading-8 text-slate-950">{t("halalCertificate.finalCta.previewTitle")}</h2>
                  <p className="mt-2 text-sm font-bold leading-7 text-slate-600">{t("halalCertificate.finalCta.previewDescription")}</p>
                </div>
              </aside>
              <FinalActionPanel
                title={t("halalCertificate.finalCta.title")}
                description={t("halalCertificate.finalCta.description")}
                primary={{ label: t("halalCertificate.finalCta.primary"), to: "/documents#document-library" }}
                secondary={{ label: t("halalCertificate.finalCta.secondary"), to: "/halal-sector-authorities" }}
              />
            </div>
          </SectionReveal>
        </PageSection>

      </div>
    </main>
  );
}
