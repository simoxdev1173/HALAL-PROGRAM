import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Copy, FileText, House, Printer } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FormLanguageSwitcher } from "../components/FormLanguageSwitcher";
import { JoinProgramPrintDocument } from "../components/JoinProgramPrintDocument";
import { CertificateApplicationPrintDocument } from "../components/CertificateApplicationPrintDocument";
import {
  JOIN_PROGRAM_PRINT_SESSION_KEY,
  type JoinProgramPrintSession,
} from "../lib/joinProgramPrint";
import {
  CERTIFICATE_APPLICATION_PRINT_SESSION_KEY,
  type CertificateApplicationPrintSession,
} from "../lib/certificateApplicationPrint";

type ApplicationType = "join" | "certificate";

const copy = {
  ar: {
    eyebrow: "تم استلام الطلب",
    title: "تم إرسال طلبك بنجاح",
    subtitle: {
      join: "سيتواصل معك فريق البرنامج العربي للحلال عبر البريد الإلكتروني قريباً.",
      certificate: "سيتم التحقق من البيانات والوثائق المرفقة والتواصل معكم بعد مراجعة الطلب.",
    },
    requestLabel: "رقم الطلب",
    keepNote: "يرجى الاحتفاظ برقم الطلب لمتابعة حالته لاحقاً.",
    home: "العودة إلى الصفحة الرئيسية",
    copied: "تم النسخ",
    copy: "نسخ الرقم",
    documentTitle: "نسخة الطلب المكتملة",
    print: "طباعة / حفظ PDF",
    unavailable: "تعذر العثور على بيانات النسخة المطبوعة في هذه الجلسة. يمكنك متابعة الطلب باستخدام الرقم أعلاه.",
  },
  en: {
    eyebrow: "Application received",
    title: "Your application was submitted successfully",
    subtitle: {
      join: "The Arab Halal Program team will contact you by email soon.",
      certificate: "Your data and attached documents will be reviewed and we will contact you after the review.",
    },
    requestLabel: "Request number",
    keepNote: "Please keep this request number to follow up on its status later.",
    home: "Back to homepage",
    copied: "Copied",
    copy: "Copy number",
    documentTitle: "Completed application copy",
    print: "Print / Save PDF",
    unavailable: "The printable application data is unavailable in this session. You can still track the request using the number above.",
  },
};

function readJoinPrintSession(requestNumber: string): JoinProgramPrintSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(JOIN_PROGRAM_PRINT_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<JoinProgramPrintSession>;
    if (!parsed.data || typeof parsed.data !== "object") return null;
    return {
      requestNumber: parsed.requestNumber || requestNumber,
      submittedAt: parsed.submittedAt || new Date().toISOString(),
      data: parsed.data,
    };
  } catch {
    return null;
  }
}

function readCertificatePrintSession(requestNumber: string): CertificateApplicationPrintSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(CERTIFICATE_APPLICATION_PRINT_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CertificateApplicationPrintSession>;
    if (!parsed.data || typeof parsed.data !== "object") return null;
    return {
      requestNumber: parsed.requestNumber || requestNumber,
      submittedAt: parsed.submittedAt || new Date().toISOString(),
      data: parsed.data,
    };
  } catch {
    return null;
  }
}

function printDocument(elementId: string, title: string) {
  const source = document.getElementById(elementId);
  if (!source) return;

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    window.print();
    return;
  }

  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((node) => node.outerHTML)
    .join("\n");

  printWindow.document.open();
  printWindow.document.write(`<!doctype html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        ${styles}
      </head>
      <body>${source.outerHTML}</body>
    </html>`);
  printWindow.document.close();

  const runPrint = () => {
    printWindow.focus();
    printWindow.print();
  };

  void printWindow.document.fonts.ready.then(() => window.setTimeout(runPrint, 150));
}

export default function ApplicationSuccess() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("en") ? "en" : "ar";
  const isRtl = lang === "ar";
  const t = copy[lang];
  const [params] = useSearchParams();
  const requestNumber = params.get("ref") ?? "";
  const type = (params.get("type") as ApplicationType) || "join";
  const [copied, setCopied] = useState(false);
  const [joinSession] = useState(() => type === "join" ? readJoinPrintSession(requestNumber) : null);
  const [certificateSession] = useState(() => type === "certificate" ? readCertificatePrintSession(requestNumber) : null);
  const printableSession = type === "join" ? joinSession : certificateSession;
  const printElementId = type === "join" ? "join-program-print-document" : "certificate-application-print-document";
  const printTitle = type === "join"
    ? "نموذج طلب الانضمام إلى البرنامج العربي للحلال"
    : "نموذج طلب شهادة وعلامة الحلال العربية";

  const handleCopy = async () => {
    if (!requestNumber) return;
    try {
      await navigator.clipboard.writeText(requestNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access is optional; the request number remains visible.
    }
  };

  const HomeArrow = isRtl ? ArrowLeft : House;

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className={`relative flex min-h-screen items-start justify-center overflow-hidden bg-[#F7F1E3] px-4 py-24 text-stone-900 ${isRtl ? "font-arabic" : "font-english"}`}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('/header-bg.png')" }} />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,250,238,0.97)_0%,rgba(250,242,220,0.9)_45%,rgba(232,238,235,0.8)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "linear-gradient(90deg, rgba(89,111,105,0.22) 1px, transparent 1px), linear-gradient(rgba(202,138,4,0.2) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#007A55]/12 to-transparent" />
      </div>

      <div className="absolute top-5 z-20 flex w-full max-w-5xl items-center justify-between px-2">
        <img src="/logo.svg" alt="" className="h-12 w-12 object-contain drop-shadow-lg sm:h-14 sm:w-14" />
        <FormLanguageSwitcher />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#D6B66A]/40 bg-white/90 p-6 text-center shadow-[0_40px_100px_-30px_rgba(78,60,24,0.45)] ring-1 ring-white/70 backdrop-blur-xl sm:p-10 lg:p-12"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#007A55] via-[#CA8A04] to-[#007A55]" />

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 16 }}
          className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-[#007A55]/10"
        >
          <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#007A55] text-white shadow-[0_18px_40px_-12px_rgba(0,122,85,0.6)]">
            <CheckCircle2 size={44} strokeWidth={2.4} />
          </span>
        </motion.div>

        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#007A55]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#007A55]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#007A55]" />
          {t.eyebrow}
        </p>

        <h1 className="text-2xl font-black leading-tight text-stone-900 sm:text-3xl">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] font-bold leading-8 text-stone-600">{t.subtitle[type]}</p>

        {requestNumber && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mx-auto mt-8 max-w-sm rounded-2xl border border-[#D6B66A]/40 bg-[#FFF8E8]/80 p-5"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8A6D1F]">{t.requestLabel}</p>
            <div className="mt-2 flex items-center justify-center gap-3">
              <span className="text-2xl font-black tracking-wider text-[#004D36]" dir="ltr">{requestNumber}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-500 transition-colors hover:border-[#007A55] hover:text-[#007A55]"
                aria-label={t.copy}
              >
                <Copy size={16} />
              </button>
            </div>
            <p className="mt-3 text-xs font-bold leading-6 text-stone-500">{copied ? t.copied : t.keepNote}</p>
          </motion.div>
        )}

        {(type === "join" || type === "certificate") && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-[#FBFAF5] text-start shadow-sm"
          >
            <div className="flex flex-col gap-4 border-b border-stone-200 bg-white/90 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#007A55]/10 text-[#007A55]">
                  <FileText size={22} />
                </span>
                <div>
                  <h2 className="text-lg font-black text-stone-900">{t.documentTitle}</h2>
                </div>
              </div>

              {printableSession && (
                <button
                  type="button"
                  onClick={() => printDocument(printElementId, printTitle)}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#007A55] px-5 text-sm font-black text-white shadow-[0_16px_30px_-16px_rgba(0,122,85,0.7)] transition-all hover:brightness-110 active:scale-[0.98]"
                >
                  <Printer size={17} />
                  {t.print}
                </button>
              )}
            </div>

            {printableSession ? (
              <div className="join-document-preview">
                {type === "join" && joinSession ? <JoinProgramPrintDocument session={joinSession} /> : null}
                {type === "certificate" && certificateSession ? <CertificateApplicationPrintDocument session={certificateSession} /> : null}
              </div>
            ) : (
              <div className="flex min-h-[220px] items-center justify-center p-8 text-center text-sm font-black leading-7 text-red-700">
                {t.unavailable}
              </div>
            )}
          </motion.div>
        )}

        <Link
          to="/"
          className="group mt-9 inline-flex h-[52px] items-center justify-center gap-3 rounded-xl bg-[#007A55] px-8 text-[15px] font-black text-white shadow-[0_20px_40px_-12px_rgba(0,122,85,0.45)] transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <HomeArrow size={20} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          {t.home}
        </Link>
      </motion.section>
    </main>
  );
}
