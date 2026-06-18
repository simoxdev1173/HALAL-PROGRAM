import { useTranslation } from "react-i18next";
import { Features } from "../components/ui/features";
import { InnerPageHero } from "../components/InternalPage";

const goalFeatures = [
  {
    id: 1,
    title: "تسهيل التبادل التجاري",
    description: " تسهيل التبادل التجاري للمنتجات الحلال بين الدول العربية.",
    image: "/goals-slider/goals-1.png",
  },
  {
    id: 2,
    title: "حماية المستهلك المسلم",
    description: "حماية المستهلك المسلم في جميع الدول من علامات وشهادات الحلال غير المعتمدة.",
    image: "/goals-slider/goals-2-3.png",
  },
  {
    id: 3,
    title: "مطابقة المنتجات الأجنبية",
    description: "ضمان مطابقة المنتجات الأجنبية لمتطلبات مواصفات الحلال العربية.",
    image: "/goals-slider/goals-3-2.png",
  },
  {
    id: 4,
    title: "إجراءات تقييم المطابقة",
    description: "يهدف إلى توضيح إجراءات تقييم المطابقة التي يجب على المورِّدين الراغبين بالحصول على شهادة الحلال العربية الالتزام بها، وذلك لضمان حِل هذه المنتجات من خلال استيفائها لمتطلبات الحلال وفقاً لأحكام الشريعة الإسلامية، بما يضمن الحفاظ على صحة وسلامة المستهلك وتسهيل تداول المنتجات الحلال. ",
    image: "/goals-slider/goals-3-3.png",
  },
];

const goalsTitle =
  "يهدف هذا البرنامج إلى تسهيل التبادل التجاري للمنتجات الحلال بين الدول العربية، وحماية المستهلك المسلم، وضمان مطابقة المنتجات الأجنبية لمتطلبات مواصفات الحلال العربية";

export default function ProgramGoals() {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const translatedFeatures = t("pages.goals.features", { returnObjects: true }) as { title: string; description: string }[];
  const features = goalFeatures.map((feature, index) => ({
    ...feature,
    title: isRtl ? feature.title : translatedFeatures[index]?.title ?? feature.title,
    description: isRtl ? feature.description : translatedFeatures[index]?.description ?? feature.description,
  }));

  return (
    <main className={`min-h-screen bg-[#FAF9F6] ${isRtl ? "font-arabic" : "font-english"} overflow-hidden`} dir={isRtl ? "rtl" : "ltr"}>
      <InnerPageHero
        title={`${isRtl ? "أهداف" : t("pages.goals.heroBefore")} ${isRtl ? "البرنامج العربي للحلال" : t("pages.goals.heroHighlight")}`}
        description=""
        imageSrc="/about-us-bg.png"
        imageAlt={isRtl ? "أهداف البرنامج العربي للحلال" : t("pages.about.hero")}
      />
      <Features
        eyebrow={isRtl ? "أهداف" : t("pages.goals.eyebrow")}
        title={isRtl ? goalsTitle : t("pages.goals.title")}
        features={features}
        currentLabel={t("common.currentFocus")}
        dir={isRtl ? "rtl" : "ltr"}
      />

    </main>
  );
}
