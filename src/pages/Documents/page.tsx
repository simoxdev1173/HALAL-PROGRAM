"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Download,
  Eye,
  FileSignature,
  FileStack,
  Mail,
  Paintbrush,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

type DocumentCategory =
  | "forms"
  | "templates"
  | "brand"
  | "operations"
  | "standards"
  | "regulations";

interface DocumentItem {
  id: string;
  category: DocumentCategory;
  section: string;
  title: string;
  audience: string;
  type: string;
  image: string;
  code: string;
  tone: "green" | "gold" | "rose" | "blue" | "violet" | "slate";
  description: string;
  url: string;
}

const CATEGORY_META: Record<
  DocumentCategory,
  {
    title: string;
    icon: typeof FileSignature;
    accent: string;
    soft: string;
  }
> = {
  forms: {
    title: "النماذج الرسمية",
    icon: FileSignature,
    accent: "text-[#CA8A04]",
    soft: "bg-[#CA8A04]/10 border-[#CA8A04]/20",
  },
  templates: {
    title: "قوالب الشهادة والترخيص",
    icon: FileStack,
    accent: "text-[#007A55]",
    soft: "bg-[#007A55]/10 border-[#007A55]/20",
  },
  brand: {
    title: "دليل العلامة والهوية",
    icon: Paintbrush,
    accent: "text-rose-600",
    soft: "bg-rose-50 border-rose-100",
  },
  operations: {
    title: "وثائق تشغيل البرنامج",
    icon: Briefcase,
    accent: "text-blue-600",
    soft: "bg-blue-50 border-blue-100",
  },
  standards: {
    title: "المواصفات والمراجع الفنية",
    icon: BookOpen,
    accent: "text-violet-600",
    soft: "bg-violet-50 border-violet-100",
  },
  regulations: {
    title: "اللوائح والتشريعات",
    icon: Scale,
    accent: "text-slate-700",
    soft: "bg-slate-100 border-slate-200",
  },
};

const DOCUMENTS: DocumentItem[] = [
  {
    id: "annex-1",
    category: "forms",
    section: "النماذج الرسمية",
    type: "تقديم/تجديد",
    audience: "الشركات والموردين",
    title: "الملحق (1): نموذج طلب الحصول / تجديد شهادة وعلامة الحلال العربية",
    image: "/certificate-template.png",
    code: "AR-HALAL-FORM-01",
    tone: "gold",
    description: "نموذج مخصص لطلبات الحصول على شهادة وعلامة الحلال العربية أو تجديدها.",
    url: "#",
  },
  {
    id: "annex-2",
    category: "forms",
    section: "النماذج الرسمية",
    type: "انضمام",
    audience: "الجهات المعنية بالحلال",
    title: "الملحق (2): نموذج طلب الانضمام إلى البرنامج العربي للحلال",
    image: "/licence-template.png",
    code: "AR-HALAL-JOIN-02",
    tone: "green",
    description: "نموذج انضمام الجهات المعنية بالحلال إلى منظومة البرنامج العربي للحلال.",
    url: "#",
  },
  {
    id: "annex-3",
    category: "templates",
    section: "قوالب الشهادة والترخيص",
    type: "شهادة",
    audience: "الاطلاع والتحقق من رقم الشهادة",
    title: "الملحق (3): قالب شهادة الحلال العربية",
    image: "/certificate-template.png",
    code: "AR-HALAL-CERT-03",
    tone: "green",
    description: "القالب الرسمي المعتمد لشهادة الحلال العربية مع بيانات التحقق.",
    url: "#",
  },
  {
    id: "annex-7",
    category: "templates",
    section: "قوالب الشهادة والترخيص",
    type: "ترخيص + QR",
    audience: "الاطلاع والتحقق من رقم الترخيص/QR",
    title: "الملحق (7): قالب ترخيص استخدام علامة الحلال العربية (يتضمن QR وتواريخ)",
    image: "/licence-template.png",
    code: "AR-HALAL-LIC-07",
    tone: "green",
    description: "قالب الترخيص الرسمي لاستخدام علامة الحلال العربية على المنتجات والعبوات.",
    url: "#",
  },
  {
    id: "annex-4",
    category: "brand",
    section: "دليل العلامة والهوية",
    type: "Brand",
    audience: "المصممون والشركات المرخّصة",
    title: "الملحق (4): التصميم المعتمد لعلامة الحلال العربية (الألوان/الخطوط/الأبعاد)",
    image: "/certificate-template.png",
    code: "AR-HALAL-BRAND-04",
    tone: "rose",
    description: "مرجع الهوية البصرية للعلامة، ويشمل الألوان والخطوط ونسب الاستخدام.",
    url: "#",
  },
  {
    id: "annex-5",
    category: "operations",
    section: "وثائق تشغيل البرنامج",
    type: "تعاون",
    audience: "الجهات المعنية بالحلال / التشغيل",
    title: "الملحق (5): وثيقة التعاون الفني",
    image: "/licence-template.png",
    code: "AR-HALAL-OPS-05",
    tone: "blue",
    description: "وثيقة تشغيلية تنظم التعاون الفني بين الجهات المعنية بالبرنامج.",
    url: "#",
  },
  {
    id: "annex-6",
    category: "operations",
    section: "وثائق تشغيل البرنامج",
    type: "تقرير",
    audience: "الجهات المتعاقدة لتشغيل البرنامج",
    title: "الملحق (6): التقرير الدوري (كل 6 أشهر)",
    image: "/certificate-template.png",
    code: "AR-HALAL-REPORT-06",
    tone: "blue",
    description: "نموذج التقرير الدوري المستخدم لمتابعة تشغيل البرنامج كل ستة أشهر.",
    url: "#",
  },
  {
    id: "annex-8",
    category: "standards",
    section: "المواصفات والمراجع الفنية",
    type: "Standards",
    audience: "مرجع فني",
    title: "الملحق (8): قائمة المواصفات القياسية المعتمدة ضمن البرنامج العربي للحلال",
    image: "/licence-template.png",
    code: "AR-HALAL-STD-08",
    tone: "violet",
    description: "قائمة مرجعية للمواصفات القياسية الفنية المعتمدة داخل البرنامج.",
    url: "#",
  },
  {
    id: "reg-1",
    category: "regulations",
    section: "اللوائح والتشريعات",
    type: "لائحة",
    audience: "عام",
    title: "اللائحة العربية لعلامة الحلال",
    image: "/certificate-template.png",
    code: "AR-HALAL-REG-01",
    tone: "slate",
    description: "اللائحة المنظمة لاستخدام علامة الحلال العربية وأحكامها العامة.",
    url: "#",
  },
  {
    id: "reg-2",
    category: "regulations",
    section: "اللوائح والتشريعات",
    type: "اعتماد",
    audience: "جهات تقييم المطابقة",
    title: "اللائحة العربية لتعيين جهات تقييم المطابقة في قطاع الحلال",
    image: "/licence-template.png",
    code: "AR-HALAL-CAB-02",
    tone: "slate",
    description: "لائحة تعيين واعتماد جهات تقييم المطابقة العاملة في قطاع الحلال.",
    url: "#",
  },
];

const TONE_STYLES = {
  green: {
    text: "text-[#007A55]",
    bg: "bg-[#007A55]",
    soft: "bg-[#007A55]/10",
    ring: "border-[#007A55]/25",
  },
  gold: {
    text: "text-[#CA8A04]",
    bg: "bg-[#CA8A04]",
    soft: "bg-[#CA8A04]/10",
    ring: "border-[#CA8A04]/25",
  },
  rose: {
    text: "text-rose-600",
    bg: "bg-rose-600",
    soft: "bg-rose-50",
    ring: "border-rose-100",
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    soft: "bg-blue-50",
    ring: "border-blue-100",
  },
  violet: {
    text: "text-violet-600",
    bg: "bg-violet-600",
    soft: "bg-violet-50",
    ring: "border-violet-100",
  },
  slate: {
    text: "text-slate-700",
    bg: "bg-slate-700",
    soft: "bg-slate-100",
    ring: "border-slate-200",
  },
};

const categoryOrder: Array<DocumentCategory | "all"> = [
  "all",
  "forms",
  "templates",
  "brand",
  "operations",
  "standards",
  "regulations",
];

function DocumentPreview({ doc, large = false }: { doc: DocumentItem; large?: boolean }) {
  const tone = TONE_STYLES[doc.tone];

  return (
    <div
      className={`relative mx-auto bg-white border ${tone.ring} shadow-[0_22px_50px_-28px_rgba(15,23,42,0.45)] overflow-hidden ${
        large ? "w-full max-w-[320px] p-3" : "w-full max-w-[160px] p-2"
      }`}
      aria-hidden="true"
    >
      <div className={`absolute top-0 right-0 h-1.5 w-full ${tone.bg}`} />
      <div className="aspect-[3/4] bg-[#F8F9FA] border border-slate-100 overflow-hidden flex items-start justify-center">
        <img
          src={doc.image}
          alt=""
          className="h-full w-full object-contain object-top bg-white transition duration-500 group-hover:grayscale-0"
        />
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className={`h-1.5 rounded-full ${tone.bg} ${large ? "w-16" : "w-10"}`} />
        <span className="h-1.5 w-8 rounded-full bg-slate-200" />
      </div>
      <div className="mt-2 space-y-1.5">
        <span className="block h-1.5 rounded-full bg-slate-200" />
        <span className="block h-1.5 w-2/3 rounded-full bg-slate-100" />
      </div>
    </div>
  );
}

export default function DocumentsModels() {
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | "all">("all");
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedDoc(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const visibleDocuments = useMemo(() => {
    if (activeCategory === "all") return DOCUMENTS;
    return DOCUMENTS.filter((doc) => doc.category === activeCategory);
  }, [activeCategory]);

  const selectedTone = selectedDoc ? TONE_STYLES[selectedDoc.tone] : TONE_STYLES.green;

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-16 lg:pt-20 font-arabic overflow-hidden" dir="rtl">
      <section className="relative overflow-hidden border-b border-stone-200 bg-[#F7F5EF]">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,122,85,.18) 1px, transparent 1px), linear-gradient(rgba(202,138,4,.16) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAF9F6] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-14 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-3 mb-6 rounded-full border border-[#007A55]/15 bg-white/85 px-4 py-2 shadow-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007A55]/10 text-[#007A55]">
                  <FileStack size={16} />
                </span>
                <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.18em] text-[#007A55]">
                  المستودع الرسمي للملفات
                </span>
              </div>

              <h1 className="max-w-3xl text-4xl md:text-5xl lg:text-7xl font-black leading-[1.08] text-slate-950">
                النماذج <span className="text-[#007A55]">والوثائق</span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm lg:text-lg leading-8 text-slate-600 font-medium">
                اللوائح الفنية، الأدلة الاسترشادية، والملاحق الرسمية للبرنامج العربي للحلال - معاينة وتحميل فقط.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#document-library"
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#007A55] px-5 py-3 text-sm font-black text-white shadow-[var(--shadow-ind-floating)] hover:bg-[#004D36] focus:outline-none focus:ring-4 focus:ring-[#007A55]/20"
                >
                  <Search size={17} />
                  استعراض الملفات
                </a>
                <a
                  href="mailto:halal@aidsmo.org"
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-black text-slate-700 hover:border-[#CA8A04]/40 hover:text-[#CA8A04] focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/20"
                  dir="ltr"
                >
                  <Mail size={17} />
                  halal@aidsmo.org
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -right-5 top-8 h-72 w-72 rounded-full bg-[#007A55]/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white bg-white/75 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.6)] backdrop-blur">
                <div className="grid grid-cols-2 gap-4">
                  <div className="pt-10">
                    <DocumentPreview doc={DOCUMENTS[2]} large />
                  </div>
                  <div>
                    <DocumentPreview doc={DOCUMENTS[3]} large />
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black tracking-[0.18em] text-slate-400 uppercase">
                        الملفات المتاحة
                      </p>
                      <p className="mt-1 text-3xl font-black text-slate-950">{DOCUMENTS.length}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#CA8A04]/10 text-[#CA8A04]">
                      <CheckCircle2 size={22} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="document-library" className="relative py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#CA8A04]/10 px-3 py-1.5 text-[10px] font-black tracking-[0.16em] text-[#CA8A04] uppercase">
                <Sparkles size={13} />
                مكتبة الملفات
              </div>
              <h2 className="text-2xl lg:text-4xl font-black text-slate-950">كل الوثائق في مكان واحد</h2>
              <p className="mt-3 max-w-2xl text-sm lg:text-base leading-7 text-slate-600">
                اختر التصنيف أو افتح أي ملف للمعاينة. البطاقات تعرض صورة الوثيقة ونوعها والجهة المستفيدة مباشرة.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#007A55]/10 text-[#007A55]">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-[10px] font-black text-slate-400">كيفية تقديم الطلبات</p>
                  <p className="mt-1 text-xs leading-6 text-slate-600">
                    يتم تحميل النموذج المناسب، تعبئته، ثم إرساله مع الوثائق المطلوبة وفق التعليمات داخل النموذج.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
            {categoryOrder.map((category) => {
              const isAll = category === "all";
              const isActive = activeCategory === category;
              const meta = isAll
                ? {
                    title: "كل الملفات",
                    icon: FileStack,
                    accent: "text-[#007A55]",
                    soft: "bg-[#007A55]/10 border-[#007A55]/20",
                  }
                : CATEGORY_META[category];
              const Icon = meta.icon;
              const count = isAll ? DOCUMENTS.length : DOCUMENTS.filter((doc) => doc.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-black transition-colors focus:outline-none focus:ring-4 focus:ring-[#007A55]/15 ${
                    isActive
                      ? "border-[#007A55] bg-[#007A55] text-white shadow-[var(--shadow-ind-floating)]"
                      : `${meta.soft} ${meta.accent} hover:bg-white`
                  }`}
                >
                  <Icon size={16} />
                  {meta.title}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] ${
                      isActive ? "bg-white/15 text-white" : "bg-white/80 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibleDocuments.map((doc, index) => {
                const tone = TONE_STYLES[doc.tone];

                return (
                  <motion.article
                    layout
                    key={doc.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, delay: index * 0.025 }}
                    className="group flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-colors hover:border-[#007A55]/35 hover:shadow-[0_24px_70px_-45px_rgba(15,23,42,0.45)]"
                  >
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="grid flex-1 cursor-pointer grid-cols-[132px_1fr] gap-4 p-4 text-right focus:outline-none focus:ring-4 focus:ring-[#007A55]/15 sm:grid-cols-[150px_1fr]"
                    >
                      <div className={`rounded-2xl border ${tone.ring} ${tone.soft} p-3`}>
                        <DocumentPreview doc={doc} />
                      </div>

                      <div className="flex min-w-0 flex-col">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className={`rounded-lg px-2.5 py-1 text-[10px] font-black ${tone.soft} ${tone.text}`}>
                            {doc.type}
                          </span>
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-black text-slate-500">
                            PDF
                          </span>
                        </div>

                        <p className="text-[11px] font-black text-slate-400">{doc.section}</p>
                        <h3 className="mt-2 text-sm lg:text-base font-black leading-7 text-slate-950 transition-colors group-hover:text-[#007A55]">
                          {doc.title}
                        </h3>

                        <div className="mt-auto pt-4">
                          <div className="flex items-start gap-2 text-[11px] font-bold leading-5 text-slate-500">
                            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-slate-400" />
                            <span>{doc.audience}</span>
                          </div>
                        </div>
                      </div>
                    </button>

                    <div className="grid grid-cols-2 border-t border-stone-100">
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 border-l border-stone-100 text-xs font-black text-slate-600 hover:bg-slate-50 hover:text-[#007A55] focus:outline-none focus:ring-4 focus:ring-[#007A55]/15"
                      >
                        <Eye size={15} />
                        معاينة
                      </button>
                      <a
                        href={doc.url}
                        className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 text-xs font-black text-white bg-[#007A55] hover:bg-[#004D36] focus:outline-none focus:ring-4 focus:ring-[#007A55]/20"
                      >
                        <Download size={15} />
                        تحميل PDF
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedDoc && (
          <>
            <motion.button
              aria-label="إغلاق المعاينة"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoc(null)}
              className="fixed inset-0 z-[100] cursor-default bg-slate-950/35 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 230 }}
              className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-xl flex-col bg-white shadow-2xl"
              dir="rtl"
            >
              <div className="border-b border-stone-100 bg-white p-5 lg:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black ${selectedTone.soft} ${selectedTone.text}`}>
                      <span className={`h-2 w-2 rounded-full ${selectedTone.bg}`} />
                      {selectedDoc.type}
                    </div>
                    <h3 className="text-lg lg:text-2xl font-black leading-9 text-slate-950">{selectedDoc.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-200"
                    aria-label="إغلاق"
                  >
                    <X size={19} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto bg-[#F8F9FA] p-5 lg:p-7">
                <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <DocumentPreview doc={selectedDoc} large />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-stone-200 bg-white p-4">
                    <p className="text-[10px] font-black text-slate-400">الرقم المرجعي</p>
                    <p className="mt-2 text-xs font-black text-slate-900" dir="ltr">
                      {selectedDoc.code}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-stone-200 bg-white p-4">
                    <p className="text-[10px] font-black text-slate-400">الجهة المستفيدة</p>
                    <p className="mt-2 text-xs font-black leading-5 text-slate-900">{selectedDoc.audience}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-stone-200 bg-white p-5">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-black text-slate-950">
                    <ShieldCheck size={17} className={selectedTone.text} />
                    وصف الوثيقة
                  </h4>
                  <p className="text-sm leading-8 text-slate-600">{selectedDoc.description}</p>
                </div>
              </div>

              <div className="border-t border-stone-200 bg-white p-4">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={selectedDoc.url}
                    className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#007A55] px-4 py-3 text-sm font-black text-white hover:bg-[#004D36] focus:outline-none focus:ring-4 focus:ring-[#007A55]/20"
                  >
                    <Download size={17} />
                    تحميل PDF
                  </a>
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
                  >
                    العودة
                    <ArrowLeft size={17} />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
