import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SectionReveal } from "../components/InternalPage";

const content = {
  ar: {
    back: "العودة إلى الصفحة السابقة",
    requirementsTitle: "متطلبات الاستفادة من البرنامج",
    requirementsIntro:
      "إذا كنتم هيئة مانحة لشهادات الحلال خارج المنطقة العربية، وغير معتمدة من قبل جهة تعيين عربية موقعة على وثيقة التعاون الفني مع المنظمة العربية للتنمية الصناعية والتقييس والتعدين وعضو في البرنامج، فيمكن لكم التواصل مع إحدى الجهات الوطنية المعيّنة الأعضاء في البرنامج للحصول على الاعتماد، بعد استيفاء جميع الشروط المنصوص عليها في البرنامج العربي للحلال.",
    requirements: [
      {
        title: "اختيار جهة التعيين",
        text: "التواصل مع جهة تعيين حلال وطنية في دولة عربية، موقعة على وثيقة التعاون الفني مع المنظمة وعضو في البرنامج.",
      },
      {
        title: "استيفاء شروط الاعتماد",
        text: "استيفاء المتطلبات المهنية والشرعية والفنية المنصوص عليها في البرنامج العربي للحلال والمواصفات ذات العلاقة.",
      },
      {
        title: "الحصول على الاعتماد",
        text: "استكمال إجراءات التقييم والاعتماد لدى جهة التعيين العربية قبل منح شهادات حلال معترف بها ضمن البرنامج.",
      },
    ],
    recognitionTitle: "ما الذي يتيحه الاعتماد؟",
    recognitionText:
      "يتيح الاعتماد منح شهادات حلال معترف بها، بما يساهم في تسهيل نفاذ المنتجات إلى الأسواق العربية، وتعزيز موثوقية شهادات الحلال، وحماية المستهلك المسلم.",
  },
  en: {
    back: "Back to the previous page",
    requirementsTitle: "Program access requirements",
    requirementsIntro:
      "A Halal certification body outside the Arab region that is not accredited by an Arab designation authority participating in the program may contact a national designation authority that has signed the technical cooperation agreement and seek accreditation after meeting all Arab Halal Program conditions.",
    requirements: [
      {
        title: "Select a designation authority",
        text: "Contact a national Halal designation authority in an Arab state that has signed the technical cooperation agreement and participates in the program.",
      },
      {
        title: "Meet accreditation conditions",
        text: "Satisfy the professional, Sharia, and technical requirements of the Arab Halal Program and applicable standards.",
      },
      {
        title: "Obtain accreditation",
        text: "Complete assessment and accreditation before issuing Halal certificates recognized under the program.",
      },
    ],
    recognitionTitle: "What does accreditation provide?",
    recognitionText:
      "Accreditation supports recognized Halal certification, market access across Arab states, stronger certificate reliability, and protection for Muslim consumers.",
  },
} as const;

export default function ProgramBenefits() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const copy = isRtl ? content.ar : content.en;

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className={`min-h-screen overflow-x-hidden bg-[#071711] text-white ${isRtl ? "font-arabic" : "font-english"}`}>
      <section
        id="requirements"
        className="relative scroll-mt-[9rem] overflow-hidden border-b border-white/10 px-5 pb-16 sm:px-8 lg:pb-24"
        style={{ paddingTop: "calc(var(--fixed-chrome-offset, 9rem) + 3.5rem)" }}
      >
        <img src="/header-bg.png" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071711]/72 via-[#0B261B]/78 to-[#0B261B]/92" />

        <div className="relative mx-auto max-w-6xl">
          <SectionReveal>
            <button
              type="button"
              onClick={handleBack}
              className="mb-10 inline-flex min-h-11 w-fit items-center whitespace-nowrap rounded-xl border border-white/20 bg-[#071711]/55 px-4 py-2 text-sm font-black text-white backdrop-blur-md transition-[color,background-color,border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#E7B93F]/70 hover:bg-[#E7B93F] hover:text-[#071711] hover:shadow-[0_12px_32px_-18px_rgba(231,185,63,.9)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E7B93F]/25 active:translate-y-px motion-reduce:transform-none"
            >
              {copy.back}
            </button>
            <div className="w-full">
              <h1 className="text-3xl font-black leading-tight text-white lg:text-[2rem]">{copy.requirementsTitle}</h1>
              <p className="mt-5 w-full text-base font-bold leading-9 text-stone-200 lg:text-lg lg:leading-10">{copy.requirementsIntro}</p>
            </div>
          </SectionReveal>

          <div className="mt-12">
            <SectionReveal>
              <ol className="border-b border-white/20">
                {copy.requirements.map((requirement, index) => (
                  <li
                    key={requirement.title}
                    className="group grid gap-3 border-t border-white/20 py-7 sm:grid-cols-[4rem_minmax(0,.8fr)_minmax(0,1.3fr)] sm:items-start sm:gap-6 lg:py-8"
                  >
                    <div className="flex items-start gap-4 sm:contents">
                      <span className="shrink-0 font-mono text-3xl font-black leading-none text-[#E7B93F] transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transform-none" dir="ltr">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-base font-black leading-7 text-white sm:text-lg">{requirement.title}</h3>
                    </div>
                    <p className="text-sm font-bold leading-7 text-stone-300 sm:text-base sm:leading-8">{requirement.text}</p>
                  </li>
                ))}
              </ol>
            </SectionReveal>

            <SectionReveal>
              <aside className="mt-12 grid gap-5 border-y border-[#E7B93F]/45 py-8 sm:grid-cols-[minmax(0,.65fr)_minmax(0,1.35fr)] sm:gap-10 lg:py-10">
                <h2 className="text-xl font-black leading-8 text-[#F2D57D] lg:text-2xl">{copy.recognitionTitle}</h2>
                <p className="text-base font-bold leading-8 text-stone-200 lg:leading-9">{copy.recognitionText}</p>
              </aside>
            </SectionReveal>
          </div>
        </div>
      </section>

    </main>
  );
}
