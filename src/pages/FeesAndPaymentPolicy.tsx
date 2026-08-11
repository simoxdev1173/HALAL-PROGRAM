import { useTranslation } from "react-i18next";
import {
  BadgeDollarSign,
  CheckCircle2,
  Landmark,
  Mail,
  ShieldCheck,
} from "lucide-react";

const content = {
  ar: {
    title: "الرسوم والتكاليف وسياسة الدفع",
    intro: "مرجع واضح للرسوم الرسمية، والجهات الملزمة بها، وتوقيت السداد قبل منح التفويض أو الترخيص.",
    noticeTitle: "هذه الصفحة مرجع للرسوم وليست بوابة دفع",
    noticeBody:
      "لا تتوفر خدمة الدفع الإلكتروني عبر الموقع حالياً. ترسل تعليمات السداد الرسمية بعد مراجعة الطلب والموافقة عليه.",
    feesTitle: "الرسوم الرسمية للمنظمة",
    feesDescription: "تستحق هذه الرسوم في مراحل محددة من مسار التفويض أو الترخيص، ولا تُدفع عند إرسال الطلب الأولي.",
    delegation: {
      amount: "250",
      currency: "دولار أمريكي",
      title: "تكلفة التفويض لتشغيل البرنامج",
      body: "عن كل مجال تفويض لمدة ثلاث سنوات.",
      payerLabel: "الجهة الملزمة بالسداد",
      payer: "جهة تقييم المطابقة المعينة غير الحكومية",
      timingLabel: "موعد السداد",
      timing: "بعد موافقة جهة التعيين الحلال في الدولة وقبل منح التفويض",
    },
    mark: {
      amount: "100",
      currency: "دولار أمريكي",
      title: "حق استخدام علامة الحلال العربية",
      body: "عن كل سنة من كل ترخيص صادر.",
      payerLabel: "الجهة الملزمة بالسداد",
      payer: "المورد أو المنشأة الحاصلة على الموافقة",
      timingLabel: "موعد السداد",
      timing: "بعد الموافقة على الطلب وقبل منح الترخيص باستخدام العلامة",
    },
    policyTitle: "سياسة الدفع",
    policyPoints: [
      "جميع الرسوم المدفوعة غير قابلة للاسترجاع.",
      "لا يُطلب السداد قبل موافقة الجهة المختصة على الطلب.",
      "يجب أن يرتبط كل سداد برقم طلب أو إشعار رسمي صادر عن البرنامج.",
      "لا تشمل رسوم المنظمة تكاليف الجهات الوطنية أو نفقات التفتيش والسفر.",
    ],
    contactTitle: "للاستفسار عن الرسوم",
    contactBody: "يمكن التواصل مع فريق البرنامج قبل تنفيذ أي عملية سداد للتأكد من التعليمات الرسمية.",
    contactCta: "راسلنا عبر البريد",
  },
  en: {
    title: "Fees, Costs and Payment Policy",
    intro: "A clear reference for official fees, responsible payers, and when payment becomes due.",
    noticeTitle: "This page explains fees. It is not a payment gateway",
    noticeBody:
      "Online payment is not currently available on this website. Official payment instructions are sent after the application is reviewed and approved.",
    feesTitle: "Official organization fees",
    feesDescription: "These fees become due at defined points in the delegation or licensing process, not when the initial application is submitted.",
    delegation: {
      amount: "250",
      currency: "USD",
      title: "Program operation delegation fee",
      body: "For each delegated field for a three-year period.",
      payerLabel: "Responsible payer",
      payer: "The appointed non-governmental conformity assessment body",
      timingLabel: "Payment timing",
      timing: "After approval by the national Halal designation body and before delegation is granted",
    },
    mark: {
      amount: "100",
      currency: "USD",
      title: "Arab Halal Mark usage fee",
      body: "For each year of every issued licence.",
      payerLabel: "Responsible payer",
      payer: "The approved supplier or establishment",
      timingLabel: "Payment timing",
      timing: "After application approval and before the mark usage licence is granted",
    },
    policyTitle: "Payment policy",
    policyPoints: [
      "All paid fees are non-refundable.",
      "Payment is not requested before the competent body approves the application.",
      "Every payment must reference an official application number or payment notice.",
      "Organization fees do not include national body charges or inspection and travel expenses.",
    ],
    contactTitle: "Questions about fees",
    contactBody: "Contact the program team before making any payment to confirm the official instructions.",
    contactCta: "Contact by email",
  },
} as const;

export default function FeesAndPaymentPolicy() {
  const { i18n } = useTranslation();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const copy = isRtl ? content.ar : content.en;

  const feeCards = [
    { ...copy.delegation, icon: Landmark },
    { ...copy.mark, icon: BadgeDollarSign },
  ];

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className={`min-h-screen overflow-x-hidden bg-[#F7F9F7] text-slate-950 ${isRtl ? "font-arabic" : "font-english"}`}
      style={{ paddingTop: "var(--fixed-chrome-offset, 9rem)" }}
    >
      <section className="border-b border-emerald-950/10 bg-white px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1fr_260px] lg:gap-16">
          <div className={isRtl ? "text-right" : "text-left"}>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.15] tracking-tight text-[#073B2C] md:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-slate-600 lg:text-lg">
              {copy.intro}
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[260px] items-center justify-center rounded-2xl border border-[#007A55]/15 bg-[#F1F6F3] p-8 md:mx-0">
            <img src="/halal-mark.svg" alt={isRtl ? "علامة الحلال العربية" : "Arab Halal Mark"} className="h-40 w-40 object-contain md:h-48 md:w-48" />
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-8 lg:py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-y border-[#007A55]/15 py-5 sm:flex-row sm:items-start sm:py-6">
          <ShieldCheck className="mt-0.5 shrink-0 text-[#007A55]" size={28} strokeWidth={2} aria-hidden="true" />
          <div>
            <h2 className="text-lg font-black text-[#073B2C]">{copy.noticeTitle}</h2>
            <p className="mt-2 max-w-4xl text-sm font-bold leading-7 text-slate-600 lg:text-base">{copy.noticeBody}</p>
          </div>
        </div>
      </section>

      <section id="official-fees" className="scroll-mt-[11rem] px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black leading-tight text-[#073B2C] lg:text-4xl">{copy.feesTitle}</h2>
            <p className="mt-4 text-base font-bold leading-8 text-slate-600">{copy.feesDescription}</p>
          </div>

          <div className="mt-8 grid overflow-hidden rounded-2xl border border-[#007A55]/15 bg-white md:grid-cols-2">
            {feeCards.map(({ amount, currency, title, body, payerLabel, payer, timingLabel, timing, icon: Icon }, index) => (
              <article
                key={title}
                className={`p-6 lg:p-8 ${index === 1 ? `border-t border-[#007A55]/15 md:border-t-0 ${isRtl ? "md:border-r" : "md:border-l"}` : ""}`}
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-2" dir="ltr">
                      <span className="text-5xl font-black leading-none tracking-tight text-[#073B2C] lg:text-6xl">{amount}</span>
                      <span className="text-sm font-black text-[#007A55]">{currency}</span>
                    </div>
                    <p className="mt-3 text-sm font-bold leading-7 text-slate-600">{body}</p>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#007A55]/15 bg-white text-[#007A55]">
                    <Icon size={24} strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-black leading-8 text-slate-950 lg:text-2xl">{title}</h3>
                <dl className="mt-6 grid gap-5 border-t border-[#007A55]/15 pt-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  <div>
                    <dt className="text-xs font-black text-[#007A55]">{payerLabel}</dt>
                    <dd className="mt-2 text-sm font-bold leading-7 text-slate-700">{payer}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-black text-[#007A55]">{timingLabel}</dt>
                    <dd className="mt-2 text-sm font-bold leading-7 text-slate-700">{timing}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-emerald-950/10 bg-white px-5 py-12 sm:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-black text-[#073B2C]">{copy.policyTitle}</h2>
            <ul className="mt-5">
              {copy.policyPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 border-b border-[#007A55]/10 py-4 text-sm font-bold leading-7 text-slate-700 last:border-b-0">
                  <CheckCircle2 className="mt-1 shrink-0 text-[#007A55]" size={18} strokeWidth={2.2} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="mt-10 flex flex-col gap-6 border-t border-[#007A55]/15 pt-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <Mail className="shrink-0 text-[#007A55]" size={26} strokeWidth={2} aria-hidden="true" />
                <h2 className="text-2xl font-black text-[#073B2C]">{copy.contactTitle}</h2>
              </div>
              <p className="mt-3 text-sm font-bold leading-7 text-slate-600">{copy.contactBody}</p>
            </div>
            <a
              href="mailto:halal@aidsmo.org"
              className="inline-flex min-h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-[#007A55] px-6 py-3 text-sm font-black text-white transition-colors hover:bg-[#005E43] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#007A55]/25 active:translate-y-[1px]"
            >
              {copy.contactCta}
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
