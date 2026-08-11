import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Eye,
  FileArchive,
  FileText,
  FolderOpen,
  LoaderCircle,
  Printer,
  ShieldCheck,
} from "lucide-react";
import { JoinProgramPrintDocument } from "../components/JoinProgramPrintDocument";
import { CertificateApplicationPrintDocument } from "../components/CertificateApplicationPrintDocument";
import type { JoinProgramPrintData, JoinProgramPrintSession, JoinProgramPrintValue } from "../lib/joinProgramPrint";
import type { CertificateApplicationPrintSession } from "../lib/certificateApplicationPrint";
import { CountryFlag } from "../lib/countryFlags";
import "./admin-application-preview.css";

type Attachment = {
  id: string;
  category: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSizeBytes?: number;
  mimeType?: string;
  uploadedAt?: string;
  available: boolean;
};

type ApplicationDetails = {
  id: string;
  source: "database" | "offline";
  applicationType: "join" | "certificate";
  requestNumber: string;
  submittedAt: string;
  status: string;
  name: string;
  country: string;
  purpose: string;
  formData: Record<string, unknown>;
  attachments: Attachment[];
};

type PreviewTab = "details" | "files" | "template";

const labels: Record<string, string> = {
  organizationNameAr: "اسم الجهة بالعربية",
  organizationNameEn: "اسم الجهة بالإنجليزية",
  organizationAddressAr: "العنوان المسجل بالعربية",
  organizationAddressEn: "العنوان المسجل بالإنجليزية",
  companyRegisteredNameAr: "اسم المنشأة بالعربية",
  companyRegisteredNameEn: "اسم المنشأة بالإنجليزية",
  companyRegisteredAddressAr: "عنوان المنشأة بالعربية",
  companyRegisteredAddressEn: "عنوان المنشأة بالإنجليزية",
  country: "الدولة",
  phone: "الهاتف",
  fax: "الفاكس",
  website: "الموقع الإلكتروني",
  email: "البريد الإلكتروني",
  companyEmail: "البريد الإلكتروني للشركة",
  headName: "رئيس الجهة",
  headEmail: "بريد رئيس الجهة",
  headMobile: "هاتف رئيس الجهة",
  contactOfficerName: "ضابط الاتصال",
  contactOfficerEmail: "بريد ضابط الاتصال",
  contactOfficerMobile: "هاتف ضابط الاتصال",
  responsiblePersonName: "المسؤول في الشركة",
  managerEmail: "بريد المدير",
  responsiblePersonMobile: "هاتف المسؤول",
  qualityManagerName: "مدير الجودة",
  companyNature: "طبيعة الشركة",
  branchAddresses: "عناوين الفروع",
  isFirstApplication: "طلب لأول مرة",
  purposes: "غرض الطلب",
  requestedProducts: "المنتجات المطلوبة",
  productDescription: "وصف المنتجات",
  otherFactoryProducts: "منتجات المصنع الأخرى",
  hasOtherHalalCertificate: "شهادة حلال أخرى",
  otherHalalCertificateScope: "نطاق الشهادة الأخرى",
  otherHalalReferenceStandard: "المواصفة المرجعية",
  otherHalalCertifyingBody: "الجهة المانحة",
  applicantName: "مقدم الطلب",
  applicantJobTitle: "المسمى الوظيفي",
  applicationDate: "تاريخ الطلب",
  signatureHeadName: "اسم الموقع",
  signatureDate: "تاريخ التوقيع",
  additionalNotes: "ملاحظات إضافية",
  grantsNationalHalalCertificate: "تمنح شهادة حلال وطنية",
  nationalHalalCertificateName: "اسم الشهادة الوطنية",
  nationalHalalReferenceStandard: "مرجع الشهادة الوطنية",
  coveredProductCategories: "فئات المنتجات المغطاة",
  hasOtherNationalHalalBodies: "جهات وطنية أخرى",
  otherNationalHalalBodiesNames: "أسماء الجهات الوطنية الأخرى",
  grantsOtherCertificates: "تمنح شهادات أخرى",
  otherCertificatesNames: "أسماء الشهادات الأخرى",
  otherCertificatesReferenceStandards: "مراجع الشهادات الأخرى",
  otherCertificatesScope: "نطاق الشهادات الأخرى",
};

const hiddenDetailKeys = new Set([
  "id", "applicationId", "appointedBodyId", "status", "bodyType", "feeExempt", "contractSignedAt", "contractFileUrl",
  "applicantAcknowledgement", "declarationAccepted", "accreditationCertificatesCopy", "appointmentDesignationCopy", "otherDocuments",
  "orgStructureIncluded", "technicalHumanCapacityIncluded", "inspectorsTrainingProceduresIncluded", "approvedInspectorsAuditorsListIncluded",
  "halalCertificateIssuingProceduresIncluded", "documentRecordsProceduresIncluded", "nationalHalalCertificatesLast12MonthsIncluded",
  "suppliersFacilitiesProductsListIncluded", "attNationalHalalCertificate", "attFinalProductTestCertificate", "attRawMaterialTestCertificates",
  "attQualityOrNationalConformityCert", "attFactoryLicense", "attOtherFactoryCertificates", "attIso22000Certificate", "attHaccpCertificate", "attOther",
]);

const attachmentLabels: Record<string, string> = {
  "first-application-report": "تقرير الطلب الأول",
  "first-report-org-structure": "الهيكل التنظيمي ومسؤوليات العاملين",
  "first-report-technical-capacity": "الإمكانات الفنية والبشرية",
  "first-report-inspector-training": "اختيار وتدريب المفتشين والمدققين",
  "first-report-approved-inspectors": "قائمة المفتشين والمدققين المعتمدين",
  "first-report-certificate-procedures": "إجراءات إصدار شهادات الحلال",
  "first-report-records-procedures": "إجراءات توثيق المستندات والسجلات",
  "first-report-national-certificates": "سجل شهادات الحلال لآخر 12 شهراً",
  "first-report-suppliers-products": "قائمة الموردين والمنشآت والمنتجات",
  "accreditation-certificates": "شهادات الاعتماد",
  "appointment-designation": "وثائق التكليف والتعيين",
  "other-documents": "وثائق أخرى",
  nationalHalalCertificate: "شهادة الحلال الوطنية",
  finalProductTestCertificate: "اختبار المنتجات النهائية",
  rawMaterialTestCertificates: "اختبارات المواد الخام",
  qualityOrNationalConformityCertificate: "شهادة الجودة أو المطابقة",
  factoryLicense: "ترخيص المصنع",
  otherFactoryCertificates: "شهادات المصنع الأخرى",
  iso22000Certificate: "شهادة ISO 22000",
  haccpCertificate: "شهادة HACCP",
  other: "مرفقات أخرى",
  signature: "التوقيع",
  officialSeal: "الختم الرسمي",
};

function displayValue(value: unknown): string {
  if (Array.isArray(value)) return value.length ? value.map((item) => displayValue(item)).join("، ") : "—";
  if (typeof value === "boolean") return value ? "نعم" : "لا";
  if (value === "YES") return "نعم";
  if (value === "NO") return "لا";
  if (value === "MANUFACTURER") return "مصنّعة";
  if (value === "SUPPLIER") return "مورّدة";
  if (value === "ARAB_HALAL_CERTIFICATE") return "شهادة الحلال العربية";
  if (value === "ARAB_HALAL_MARK") return "علامة الحلال العربية";
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return new Date(value).toLocaleDateString("ar-MA");
  return String(value);
}

function categoryFiles(attachments: Attachment[], category: string) {
  return attachments.filter((file) => file.category === category).map((file) => file.fileName);
}

const firstApplicationReportCategories = new Set([
  "first-application-report",
  "first-report-org-structure",
  "first-report-technical-capacity",
  "first-report-inspector-training",
  "first-report-approved-inspectors",
  "first-report-certificate-procedures",
  "first-report-records-procedures",
  "first-report-national-certificates",
  "first-report-suppliers-products",
]);

function buildJoinSession(details: ApplicationDetails): JoinProgramPrintSession {
  const data = { ...details.formData } as Record<string, JoinProgramPrintValue>;
  data.firstApplicationReportFiles = details.attachments
    .filter((file) => firstApplicationReportCategories.has(file.category))
    .map((file) => file.fileName);
  data.accreditationCertificatesFiles = categoryFiles(details.attachments, "accreditation-certificates");
  data.appointmentDesignationFiles = categoryFiles(details.attachments, "appointment-designation");
  data.otherDocumentsFiles = categoryFiles(details.attachments, "other-documents");
  return { requestNumber: details.requestNumber, submittedAt: details.submittedAt, data: data as JoinProgramPrintData };
}

function buildCertificateSession(details: ApplicationDetails): CertificateApplicationPrintSession {
  const data = details.formData;
  const text = (key: string) => String(data[key] ?? "");
  const list = (key: string) => Array.isArray(data[key]) ? (data[key] as unknown[]).map(String) : [];
  const attachmentFlags: Record<string, string> = {
    nationalHalalCertificate: "attNationalHalalCertificate",
    finalProductTestCertificate: "attFinalProductTestCertificate",
    rawMaterialTestCertificates: "attRawMaterialTestCertificates",
    qualityOrNationalConformityCertificate: "attQualityOrNationalConformityCert",
    factoryLicense: "attFactoryLicense",
    otherFactoryCertificates: "attOtherFactoryCertificates",
    iso22000Certificate: "attIso22000Certificate",
    haccpCertificate: "attHaccpCertificate",
    other: "attOther",
  };
  return {
    requestNumber: details.requestNumber,
    submittedAt: details.submittedAt,
    data: {
      companyInformation: {
        companyRegisteredNameAr: text("companyRegisteredNameAr"), companyRegisteredNameEn: text("companyRegisteredNameEn"),
        companyRegisteredAddressAr: text("companyRegisteredAddressAr"), companyRegisteredAddressEn: text("companyRegisteredAddressEn"),
        country: text("country"), companyNature: displayValue(data.companyNature), branchAddresses: list("branchAddresses"), phone: text("phone"),
        fax: text("fax"), website: text("website"), companyEmail: text("companyEmail"), responsiblePersonName: text("responsiblePersonName"),
        managerEmail: text("managerEmail"), responsiblePersonMobile: text("responsiblePersonMobile"), qualityManagerName: text("qualityManagerName"),
        isFirstApplication: data.isFirstApplication ? displayValue(data.isFirstApplication) : null, applicationPurpose: list("purposes").map((item) => item === "ARAB_HALAL_MARK" ? "علامة الحلال العربية" : item === "ARAB_HALAL_CERTIFICATE" ? "شهادة الحلال العربية" : item),
      },
      productInformation: {
        requestedProducts: list("requestedProducts"), productDescription: text("productDescription"), otherFactoryProducts: list("otherFactoryProducts"),
        hasOtherHalalCertificate: data.hasOtherHalalCertificate ? displayValue(data.hasOtherHalalCertificate) : null,
        otherHalalCertificateScope: text("otherHalalCertificateScope"), otherHalalReferenceStandard: text("otherHalalReferenceStandard"), otherHalalCertifyingBody: text("otherHalalCertifyingBody"),
      },
      attachments: Object.fromEntries(Object.entries(attachmentFlags).map(([category, flag]) => [category, {
        included: data[flag] === true || categoryFiles(details.attachments, category).length > 0,
        description: category === "other" ? text("attOtherDescription") : undefined,
        files: categoryFiles(details.attachments, category),
      }])),
      declarationAccepted: data.declarationAccepted === true,
      applicantInformation: {
        applicantName: text("applicantName"), applicantJobTitle: text("applicantJobTitle"), applicationDate: text("applicationDate").slice(0, 10),
        applicantSignature: categoryFiles(details.attachments, "signature")[0] ?? null, additionalNotes: text("additionalNotes"),
      },
    },
  };
}

function formatBytes(bytes?: number) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminApplicationPreview() {
  const { resource = "", id = "" } = useParams();
  const [details, setDetails] = useState<ApplicationDetails | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<PreviewTab>("details");
  const [selectedFile, setSelectedFile] = useState<Attachment | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/admin/applications/${encodeURIComponent(resource)}/${encodeURIComponent(id)}`, { signal: controller.signal })
      .then(async (response) => {
        const body = await response.json() as { data?: ApplicationDetails; message?: string };
        if (!response.ok || !body.data) throw new Error(body.message || "تعذر تحميل الطلب");
        setDetails(body.data);
        setSelectedFile(body.data.attachments.find((file) => file.available) ?? null);
      })
      .catch((reason) => { if (reason?.name !== "AbortError") setError(reason instanceof Error ? reason.message : "تعذر تحميل الطلب"); });
    return () => controller.abort();
  }, [id, resource]);

  const detailEntries = useMemo(() => details ? Object.entries(details.formData).filter(([key, value]) => !hiddenDetailKeys.has(key) && value !== null && value !== undefined && value !== "") : [], [details]);
  const templateSession = useMemo(() => details ? details.applicationType === "join" ? buildJoinSession(details) : buildCertificateSession(details) : null, [details]);

  if (error) return <main dir="rtl" className="flex min-h-screen items-center justify-center bg-stone-100 p-6 font-arabic"><div className="max-w-md rounded-lg border border-red-200 bg-white p-6 text-center"><FileArchive className="mx-auto text-red-600" /><h1 className="mt-3 text-lg font-black">تعذر فتح الطلب</h1><p className="mt-2 text-sm font-bold text-stone-500">{error}</p></div></main>;
  if (!details || !templateSession) return <main className="flex min-h-screen items-center justify-center bg-stone-100 text-[#007A55]"><LoaderCircle className="animate-spin" /></main>;

  const originalTemplate = details.applicationType === "join" ? "/join-program-template/template.pdf" : "/halal-mark-certificate-template/template.pdf";
  const isPdf = selectedFile?.mimeType === "application/pdf" || selectedFile?.fileName.toLowerCase().endsWith(".pdf");
  const isImage = selectedFile?.mimeType?.startsWith("image/") || /\.(png|jpe?g)$/i.test(selectedFile?.fileName ?? "");

  return (
    <main dir="rtl" className="admin-application-preview min-h-screen bg-[#F3F3F0] font-arabic text-slate-950">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur-xl admin-preview-chrome">
        <div className="mx-auto flex h-16 max-w-[1680px] items-center justify-between gap-4 px-4 lg:px-6">
          <div className="flex items-center gap-3"><img src="/logo.svg" alt="" className="h-10 w-10" /><div><p className="text-[10px] font-black text-[#007A55]">ملف طلب رسمي</p><p className="text-sm font-black">{details.applicationType === "join" ? "طلب الانضمام إلى البرنامج" : details.purpose}</p></div></div>
          <div className="flex gap-2"><button type="button" onClick={() => window.close()} className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white" title="إغلاق الصفحة"><ArrowRight size={17} /></button><button type="button" onClick={() => { setTab("template"); window.setTimeout(() => window.print(), 80); }} className="inline-flex h-9 items-center gap-2 rounded-lg bg-slate-950 px-4 text-xs font-black text-white"><Printer size={15} /> طباعة</button></div>
        </div>
      </header>

      <div className="mx-auto max-w-[1680px] px-3 py-3 lg:px-6 lg:py-5">
        <section className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm admin-preview-chrome">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="p-4 lg:p-5"><div className="flex flex-wrap items-center gap-2"><span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-black text-[#007A55]">{details.source === "offline" ? "تخزين محلي احتياطي" : "قاعدة البيانات"}</span><span className="rounded-md bg-sky-50 px-2 py-1 text-[10px] font-black text-sky-700">{details.status === "pending" ? "قيد المراجعة" : details.status}</span></div><h1 className="mt-3 text-xl font-black sm:text-2xl">{details.name}</h1><div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-bold text-stone-500"><span>رقم الطلب: <b className="text-slate-800" dir="ltr">{details.requestNumber}</b></span><span className="inline-flex items-center gap-1">الدولة: <CountryFlag country={details.country} /></span><span>تاريخ الاستلام: <b className="text-slate-800">{new Date(details.submittedAt).toLocaleDateString("ar-MA")}</b></span></div></div>
            <div className="grid grid-cols-3 border-t border-stone-200 bg-stone-50 lg:min-w-[360px] lg:border-r lg:border-t-0"><div className="p-4 text-center"><p className="text-[10px] font-bold text-stone-500">البيانات</p><p className="mt-1 text-lg font-black">{detailEntries.length}</p></div><div className="border-x border-stone-200 p-4 text-center"><p className="text-[10px] font-bold text-stone-500">المرفقات</p><p className="mt-1 text-lg font-black">{details.attachments.length}</p></div><div className="p-4 text-center"><p className="text-[10px] font-bold text-stone-500">صفحات النموذج</p><p className="mt-1 text-lg font-black">2</p></div></div>
          </div>
          <nav className="flex overflow-x-auto border-t border-stone-200 px-2" aria-label="أقسام الطلب">
            {[
              { value: "details", label: "تفاصيل الطلب", icon: Eye },
              { value: "files", label: `الملفات (${details.attachments.length})`, icon: FolderOpen },
              { value: "template", label: "معاينة النموذج", icon: FileText },
            ].map(({ value, label, icon: Icon }) => <button key={value} type="button" onClick={() => setTab(value as PreviewTab)} className={`relative inline-flex h-12 shrink-0 items-center gap-2 px-4 text-xs font-black ${tab === value ? "text-[#007A55] after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-[#007A55]" : "text-stone-500"}`}><Icon size={15} />{label}</button>)}
          </nav>
        </section>

        {tab === "details" && <section className="mt-3 grid gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 shadow-sm sm:grid-cols-2 xl:grid-cols-3 admin-preview-chrome">{detailEntries.map(([key, value]) => <div key={key} className="min-h-24 bg-white p-4"><p className="text-[10px] font-black text-stone-500">{labels[key] ?? key}</p><div className="mt-2 break-words text-sm font-bold leading-7 text-slate-900">{key === "country" ? <CountryFlag country={String(value)} /> : displayValue(value)}</div></div>)}</section>}

        {tab === "files" && <section className="mt-3 grid min-h-[calc(100vh-220px)] gap-3 lg:grid-cols-[360px_minmax(0,1fr)] admin-preview-chrome"><div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm"><div className="border-b border-stone-200 px-4 py-3"><h2 className="text-sm font-black">الوثائق المرفقة</h2></div>{details.attachments.length === 0 ? <p className="p-6 text-center text-xs font-bold text-stone-400">لا توجد ملفات مرفقة</p> : <div className="divide-y divide-stone-100">{details.attachments.map((file) => <button key={file.id} type="button" onClick={() => file.available && setSelectedFile(file)} className={`w-full p-3 text-right ${selectedFile?.id === file.id ? "bg-emerald-50" : "bg-white hover:bg-stone-50"}`}><div className="flex items-start gap-3"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${file.available ? "bg-emerald-50 text-[#007A55]" : "bg-stone-100 text-stone-400"}`}><FileText size={17} /></div><div className="min-w-0"><p className="truncate text-xs font-black text-slate-900">{file.fileName}</p><p className="mt-1 text-[10px] font-bold text-stone-500">{attachmentLabels[file.category] ?? file.category}{formatBytes(file.fileSizeBytes) ? ` · ${formatBytes(file.fileSizeBytes)}` : ""}</p>{!file.available && <p className="mt-1 text-[10px] font-black text-amber-700">اسم الملف محفوظ فقط، النسخة القديمة غير متاحة</p>}</div></div></button>)}</div>}</div><div className="flex min-h-[520px] flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">{selectedFile ? <><div className="flex items-center justify-between gap-3 border-b border-stone-200 px-4 py-3"><div className="min-w-0"><p className="truncate text-xs font-black">{selectedFile.fileName}</p><p className="mt-1 text-[10px] font-bold text-stone-500">معاينة الملف</p></div><a href={selectedFile.fileUrl} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center gap-2 rounded-md bg-slate-950 px-3 text-[11px] font-black text-white"><ExternalLink size={13} /> فتح</a></div><div className="flex flex-1 items-center justify-center bg-stone-100 p-3">{isPdf ? <iframe title={selectedFile.fileName} src={selectedFile.fileUrl} className="h-full min-h-[620px] w-full rounded border-0 bg-white" /> : isImage ? <img src={selectedFile.fileUrl} alt={selectedFile.fileName} className="max-h-[720px] max-w-full object-contain" /> : <div className="text-center"><FileArchive size={40} className="mx-auto text-stone-400" /><p className="mt-3 text-sm font-black">المعاينة المباشرة غير متاحة لهذه الصيغة</p><a href={selectedFile.fileUrl} className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-[#007A55] px-4 text-xs font-black text-white"><Download size={14} /> تنزيل الملف</a></div>}</div></> : <div className="flex flex-1 flex-col items-center justify-center p-8 text-center"><FolderOpen size={36} className="text-stone-300" /><p className="mt-3 text-sm font-black">اختر ملفاً متاحاً للمعاينة</p></div>}</div></section>}

        {tab === "template" && <section className="mt-3 admin-template-section"><div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white p-3 shadow-sm admin-preview-chrome"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-[#007A55]"><ShieldCheck size={18} /></div><div><p className="text-xs font-black">النموذج المعبأ من بيانات الطلب</p><p className="mt-0.5 text-[10px] font-bold text-stone-500">نسخة HTML مطابقة لقالب PDF الرسمي وجاهزة للطباعة</p></div></div><a href={originalTemplate} target="_blank" rel="noreferrer" className="inline-flex h-8 items-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-[11px] font-black text-slate-700"><ExternalLink size={13} /> فتح PDF الأصلي</a></div><div className="admin-template-canvas join-document-preview">{details.applicationType === "join" ? <JoinProgramPrintDocument session={templateSession as JoinProgramPrintSession} /> : <CertificateApplicationPrintDocument session={templateSession as CertificateApplicationPrintSession} />}</div></section>}
      </div>
    </main>
  );
}
