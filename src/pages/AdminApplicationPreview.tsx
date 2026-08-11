import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  Eye,
  FileArchive,
  FileText,
  FolderOpen,
  LoaderCircle,
  Printer,
  X,
} from "lucide-react";
import { JoinProgramPrintDocument } from "../components/JoinProgramPrintDocument";
import { CertificateApplicationPrintDocument } from "../components/CertificateApplicationPrintDocument";
import type { JoinProgramPrintData, JoinProgramPrintSession, JoinProgramPrintValue } from "../lib/joinProgramPrint";
import type { CertificateApplicationPrintSession } from "../lib/certificateApplicationPrint";
import { CountryFlag } from "../lib/countryFlags";
import { performResourceAction } from "../lib/api";
import type { AdminUser, ResourceKind } from "../lib/api";
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
type DecisionAction = "approve" | "reject";
type DetailEntry = [string, unknown];
type DetailSectionDefinition = { title: string; description: string; keys: string[] };

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
  applicantAcknowledgement: "الإقرار بصحة البيانات",
  declarationAccepted: "الموافقة على الإقرار",
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
  otherDocumentsDescription: "وصف الوثائق الأخرى",
  attOtherDescription: "وصف المرفقات الأخرى",
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
  "accreditationCertificatesCopy", "appointmentDesignationCopy", "otherDocuments",
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
  "applicant-signature": "توقيع مقدم الطلب",
  officialSeal: "الختم الرسمي",
};

const joinDetailSections: DetailSectionDefinition[] = [
  {
    title: "بيانات الجهة",
    description: "الهوية الرسمية ووسائل التواصل المسجلة في الطلب.",
    keys: ["organizationNameAr", "organizationNameEn", "organizationAddressAr", "organizationAddressEn", "country", "phone", "fax", "website", "email"],
  },
  {
    title: "الإدارة العليا",
    description: "بيانات رئيس الجهة المخول بمتابعة إجراءات الانضمام.",
    keys: ["headName", "headEmail", "headMobile"],
  },
  {
    title: "ضابط الاتصال",
    description: "نقطة الاتصال الرسمية للملف والمراسلات اللاحقة.",
    keys: ["contactOfficerName", "contactOfficerEmail", "contactOfficerMobile"],
  },
  {
    title: "طبيعة التقديم والتقرير",
    description: "حالة التقديم لأول مرة والبيانات المرتبطة بالوثائق الداعمة.",
    keys: ["isFirstApplication", "otherDocumentsDescription"],
  },
  {
    title: "شهادات الحلال الوطنية",
    description: "نشاط الجهة في منح شهادات الحلال داخل الدولة.",
    keys: ["grantsNationalHalalCertificate", "nationalHalalCertificateName", "nationalHalalReferenceStandard", "coveredProductCategories", "hasOtherNationalHalalBodies", "otherNationalHalalBodiesNames"],
  },
  {
    title: "الشهادات الأخرى",
    description: "الشهادات الأخرى التي تمنحها الجهة ومجالاتها المرجعية.",
    keys: ["grantsOtherCertificates", "otherCertificatesNames", "otherCertificatesReferenceStandards", "otherCertificatesScope"],
  },
  {
    title: "الإقرار والتوقيع",
    description: "بيانات الشخص الموقع وتاريخ اعتماد الطلب.",
    keys: ["applicantAcknowledgement", "signatureHeadName", "signatureDate", "additionalNotes"],
  },
];

const certificateDetailSections: DetailSectionDefinition[] = [
  {
    title: "بيانات المنشأة",
    description: "الاسم القانوني والعنوان وطبيعة نشاط المنشأة.",
    keys: ["companyRegisteredNameAr", "companyRegisteredNameEn", "companyRegisteredAddressAr", "companyRegisteredAddressEn", "country", "companyNature", "branchAddresses"],
  },
  {
    title: "بيانات التواصل والمسؤولين",
    description: "قنوات التواصل الرسمية والأشخاص المسؤولون عن الطلب والجودة.",
    keys: ["phone", "fax", "website", "companyEmail", "responsiblePersonName", "managerEmail", "responsiblePersonMobile", "qualityManagerName"],
  },
  {
    title: "نوع الطلب",
    description: "حالة التقديم والغرض المطلوب من البرنامج.",
    keys: ["isFirstApplication", "purposes"],
  },
  {
    title: "المنتجات والنطاق",
    description: "المنتجات المشمولة ووصف عمليات ومنتجات المنشأة.",
    keys: ["requestedProducts", "productDescription", "otherFactoryProducts"],
  },
  {
    title: "شهادات الحلال الأخرى",
    description: "تفاصيل أي شهادة حلال قائمة ونطاقها والجهة المانحة.",
    keys: ["hasOtherHalalCertificate", "otherHalalCertificateScope", "otherHalalReferenceStandard", "otherHalalCertifyingBody"],
  },
  {
    title: "الإقرار ومقدم الطلب",
    description: "اعتماد الإقرار وبيانات مقدم الطلب وتاريخ التقديم.",
    keys: ["declarationAccepted", "applicantName", "applicantJobTitle", "applicationDate", "additionalNotes", "attOtherDescription"],
  },
];

const wideDetailKeys = new Set([
  "branchAddresses", "requestedProducts", "productDescription",
  "otherFactoryProducts", "coveredProductCategories", "otherNationalHalalBodiesNames", "otherCertificatesNames",
  "otherCertificatesReferenceStandards", "otherCertificatesScope", "otherHalalCertificateScope", "additionalNotes",
  "otherDocumentsDescription", "attOtherDescription",
]);

const emphasizedDetailKeys = new Set([
  "organizationNameAr", "companyRegisteredNameAr", "headName", "contactOfficerName", "responsiblePersonName",
  "qualityManagerName", "signatureHeadName", "applicantName",
]);

const identityHalfWidthKeys = new Set([
  "organizationNameAr", "organizationNameEn", "organizationAddressAr", "organizationAddressEn",
  "companyRegisteredNameAr", "companyRegisteredNameEn", "companyRegisteredAddressAr", "companyRegisteredAddressEn",
]);

function detailFieldLayout(sectionTitle: string, key: string, value: unknown) {
  const isWide = wideDetailKeys.has(key) || (typeof value === "string" && String(value).length > 85);
  const isIdentitySection = sectionTitle === "بيانات الجهة" || sectionTitle === "بيانات المنشأة";
  if (isWide) return isIdentitySection ? "sm:col-span-2 lg:col-span-6" : "sm:col-span-2";
  if (!isIdentitySection) return "";
  return identityHalfWidthKeys.has(key) ? "lg:col-span-3" : "lg:col-span-2";
}

function displayValue(value: unknown): string {
  if (Array.isArray(value)) return value.length ? value.map((item) => displayValue(item)).join("، ") : "غير متوفر";
  if (typeof value === "boolean") return value ? "نعم" : "لا";
  if (value === "YES") return "نعم";
  if (value === "NO") return "لا";
  if (value === "MANUFACTURER") return "مصنّعة";
  if (value === "SUPPLIER") return "مورّدة";
  if (value === "ARAB_HALAL_CERTIFICATE") return "شهادة الحلال العربية";
  if (value === "ARAB_HALAL_MARK") return "علامة الحلال العربية";
  if (value === null || value === undefined || value === "") return "غير متوفر";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return new Date(value).toLocaleDateString("ar-MA");
  return String(value);
}

function buildDetailSections(applicationType: ApplicationDetails["applicationType"], entries: DetailEntry[]) {
  const definitions = applicationType === "join" ? joinDetailSections : certificateDetailSections;
  const entryMap = new Map(entries);
  const usedKeys = new Set<string>();
  const sections = definitions.map((section) => {
    const sectionEntries = section.keys
      .filter((key) => entryMap.has(key))
      .map((key) => {
        usedKeys.add(key);
        return [key, entryMap.get(key)] as DetailEntry;
      });
    return { ...section, entries: sectionEntries };
  }).filter((section) => section.entries.length > 0);
  const unmatched = entries.filter(([key]) => !usedKeys.has(key));
  if (unmatched.length) sections.push({ title: "بيانات إضافية", description: "حقول إضافية مرتبطة بسجل الطلب.", keys: [], entries: unmatched });
  return sections;
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
        applicantSignature: categoryFiles(details.attachments, "applicant-signature")[0] ?? categoryFiles(details.attachments, "signature")[0] ?? null, additionalNotes: text("additionalNotes"),
      },
    },
  };
}

function formatBytes(bytes?: number) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAdditionalDocument(file: Attachment) {
  return file.category === "other" || file.category === "other-documents" || !attachmentLabels[file.category];
}

function documentTitle(file: Attachment, attachments: Attachment[]) {
  const knownTitle = attachmentLabels[file.category];
  if (!isAdditionalDocument(file)) return knownTitle ?? "وثيقة مرفقة";
  const usefulDescription = file.description?.trim();
  if (usefulDescription) return usefulDescription;
  const additionalDocuments = attachments.filter(isAdditionalDocument);
  if (additionalDocuments.length <= 1) return "وثيقة إضافية";
  return `وثيقة إضافية ${additionalDocuments.findIndex((item) => item.id === file.id) + 1}`;
}

function documentType(file: Attachment) {
  const extension = file.fileName.split(".").pop()?.toUpperCase();
  if (extension && extension.length <= 5) return extension;
  if (file.mimeType === "application/pdf") return "PDF";
  if (file.mimeType?.startsWith("image/")) return "صورة";
  return "ملف";
}

function readAdminUser(): AdminUser | null {
  try {
    const stored = localStorage.getItem("admin-user");
    return stored ? JSON.parse(stored) as AdminUser : null;
  } catch {
    return null;
  }
}

export default function AdminApplicationPreview() {
  const { resource = "", id = "" } = useParams();
  const [details, setDetails] = useState<ApplicationDetails | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<PreviewTab>("details");
  const [selectedFile, setSelectedFile] = useState<Attachment | null>(null);
  const [decisionAction, setDecisionAction] = useState<DecisionAction | null>(null);
  const [decisionReason, setDecisionReason] = useState("");
  const [isDecisionBusy, setIsDecisionBusy] = useState(false);
  const [decisionFeedback, setDecisionFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);

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
  const detailSections = useMemo(() => details ? buildDetailSections(details.applicationType, detailEntries) : [], [detailEntries, details]);
  const templateSession = useMemo(() => details ? details.applicationType === "join" ? buildJoinSession(details) : buildCertificateSession(details) : null, [details]);

  const submitDecision = async () => {
    if (!details || !decisionAction || (resource !== "designation-bodies" && resource !== "suppliers")) return;
    setIsDecisionBusy(true);
    setDecisionFeedback(null);
    const adminUser = readAdminUser();
    const result = await performResourceAction(resource as ResourceKind, id, decisionAction, {
      actorId: adminUser?.id,
      reason: decisionReason.trim() || undefined,
    });
    setIsDecisionBusy(false);
    if (!result.ok) {
      setDecisionFeedback({ tone: "error", text: result.message });
      return;
    }
    setDetails((current) => current ? { ...current, status: result.data.status } : current);
    setDecisionFeedback({ tone: "success", text: decisionAction === "approve" ? "تم اعتماد الطلب وتسجيل القرار في سجل العمليات." : "تم رفض الطلب وتسجيل القرار في سجل العمليات." });
    setDecisionAction(null);
    setDecisionReason("");
  };

  if (error) return <main dir="rtl" className="flex min-h-screen items-center justify-center bg-stone-100 p-6 font-arabic"><div className="max-w-md rounded-lg border border-red-200 bg-white p-6 text-center"><FileArchive className="mx-auto text-red-600" /><h1 className="mt-3 text-lg font-black">تعذر فتح الطلب</h1><p className="mt-2 text-sm font-bold text-stone-500">{error}</p></div></main>;
  if (!details || !templateSession) return <main className="flex min-h-screen items-center justify-center bg-stone-100 text-[#007A55]"><LoaderCircle className="animate-spin" /></main>;

  const originalTemplate = details.applicationType === "join" ? "/join-program-template/template.pdf" : "/halal-mark-certificate-template/template.pdf";
  const normalizedStatus = details.status.toLowerCase();
  const isPendingReview = normalizedStatus === "pending" || normalizedStatus === "review";
  const statusLabel = isPendingReview ? "قيد المراجعة" : normalizedStatus === "active" || normalizedStatus === "approved" ? "معتمد" : normalizedStatus === "revoked" || normalizedStatus === "rejected" ? "مرفوض" : details.status;
  const isPdf = selectedFile?.mimeType === "application/pdf" || selectedFile?.fileName.toLowerCase().endsWith(".pdf");
  const isImage = selectedFile?.mimeType?.startsWith("image/") || /\.(png|jpe?g)$/i.test(selectedFile?.fileName ?? "");

  return (
    <main dir="rtl" className={`admin-application-preview min-h-screen bg-[#F3F3F0] font-arabic text-slate-950 ${isPendingReview ? "pb-28 sm:pb-24" : ""}`}>
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur-xl admin-preview-chrome">
        <div className="mx-auto flex h-16 max-w-[1680px] items-center justify-between gap-4 px-4 lg:px-6">
          <div className="flex items-center gap-3"><img src="/logo.svg" alt="" className="h-10 w-10" /><div><p className="text-[10px] font-black text-[#007A55]">ملف طلب رسمي</p><p className="text-sm font-black">{details.applicationType === "join" ? "طلب الانضمام إلى البرنامج" : details.purpose}</p></div></div>
          <div className="flex gap-2"><button type="button" onClick={() => window.close()} className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white" title="إغلاق الصفحة"><ArrowRight size={17} /></button><button type="button" onClick={() => { setTab("template"); window.setTimeout(() => window.print(), 80); }} className="inline-flex h-9 items-center gap-2 rounded-lg bg-slate-950 px-4 text-xs font-black text-white"><Printer size={15} /> طباعة</button></div>
        </div>
      </header>

      <div className="mx-auto max-w-[1380px] px-4 py-6 lg:px-8 lg:py-9">
        <section className="border-b border-stone-300 admin-preview-chrome">
          <div className="pb-6">
            <div className="flex items-center gap-2">
              <span className={`inline-flex min-h-8 items-center rounded-lg border px-3 py-1 text-[13px] font-black ${isPendingReview ? "border-emerald-200 bg-[#EAF4EF] text-[#007A55]" : normalizedStatus === "active" || normalizedStatus === "approved" ? "border-emerald-200 bg-emerald-50 text-[#007A55]" : "border-red-200 bg-red-50 text-red-700"}`}>{statusLabel}</span>
            </div>
            <h1 className="mt-3 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">{details.name}</h1>
            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-xs font-bold text-stone-500">
              <div><dt className="inline">رقم الطلب</dt><dd className="mr-2 inline font-black text-slate-800" dir="ltr">{details.requestNumber}</dd></div>
              <div className="inline-flex items-center gap-2"><dt>الدولة</dt><dd><CountryFlag country={details.country} /></dd></div>
              <div><dt className="inline">تاريخ الاستلام</dt><dd className="mr-2 inline font-black text-slate-800">{new Date(details.submittedAt).toLocaleDateString("ar-MA")}</dd></div>
            </dl>
          </div>
          <nav className="flex overflow-x-auto" aria-label="أقسام الطلب">
            {[
              { value: "details", label: "تفاصيل الطلب", icon: Eye },
              { value: "files", label: "المرفقات", icon: FolderOpen },
              { value: "template", label: "معاينة النموذج", icon: FileText },
            ].map(({ value, label, icon: Icon }) => <button key={value} type="button" onClick={() => setTab(value as PreviewTab)} className={`relative inline-flex h-12 shrink-0 items-center gap-2 px-4 text-xs font-black transition-colors first:pr-0 ${tab === value ? "text-[#007A55] after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-[#007A55] first:after:right-0" : "text-stone-500 hover:text-slate-900"}`}><Icon size={15} />{label}</button>)}
          </nav>
        </section>

        {tab === "details" && (
          <div className="mx-auto mt-7 max-w-[1160px] overflow-hidden border-y border-stone-300 bg-white admin-preview-chrome">
            {detailSections.map((section) => (
              <section key={section.title} className="grid border-b border-stone-300 last:border-b-0 md:grid-cols-[250px_minmax(0,1fr)]">
                <header className="bg-[#EAF4EF] px-5 py-6 md:border-l md:border-[#D4E5DC] md:px-6 md:py-8">
                  <h2 className="text-lg font-black leading-7 text-[#102C22]">{section.title}</h2>
                  <p className="mt-2 max-w-[30ch] text-[13px] font-bold leading-7 text-[#50665D]">{section.description}</p>
                </header>
                <dl className={`grid content-start gap-x-8 gap-y-6 px-5 py-7 sm:grid-cols-2 md:px-8 ${section.title === "بيانات الجهة" || section.title === "بيانات المنشأة" ? "lg:grid-cols-6" : section.entries.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
                  {section.entries.map(([key, value]) => (
                    <div key={key} className={`border-r-2 pr-4 ${detailFieldLayout(section.title, key, value)} ${emphasizedDetailKeys.has(key) ? "border-[#67A184]" : "border-stone-200"}`}>
                      <dt className="text-xs font-black leading-6 text-[#5C6C65]">{labels[key] ?? key}</dt>
                      <dd className={`mt-1.5 break-words leading-8 text-[#111F1A] ${emphasizedDetailKeys.has(key) ? "text-[16px] font-black" : "text-[15px] font-bold"}`}>{key === "country" ? <CountryFlag country={String(value)} /> : displayValue(value)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        )}

        {tab === "files" && (
          <section className="grid min-h-[calc(100vh-210px)] lg:grid-cols-[320px_minmax(0,1fr)] admin-preview-chrome">
            <aside className="border-b border-stone-300 py-7 lg:border-b-0 lg:border-l lg:pl-6">
              <h2 className="text-base font-black text-slate-950">الوثائق المرفقة</h2>
              <p className="mt-1 text-xs font-bold leading-6 text-stone-500">اختر الوثيقة لعرض محتواها.</p>
              {details.attachments.length === 0 ? (
                <p className="mt-8 text-sm font-bold text-stone-400">لا توجد وثائق مرفقة.</p>
              ) : (
                <div className="mt-5 space-y-1">
                  {details.attachments.map((file) => (
                    <button key={file.id} type="button" onClick={() => file.available && setSelectedFile(file)} className={`w-full border-r-2 px-3 py-3 text-right transition-colors ${selectedFile?.id === file.id ? "border-[#007A55] bg-emerald-50/70" : "border-transparent hover:border-stone-300 hover:bg-white"}`}>
                      <span className="block text-xs font-black leading-6 text-slate-900">{documentTitle(file, details.attachments)}</span>
                      <span className="mt-1 flex items-center gap-3 text-[10px] font-bold text-stone-500">
                        <span>{documentType(file)}</span>
                        {formatBytes(file.fileSizeBytes) && <span>{formatBytes(file.fileSizeBytes)}</span>}
                        {!file.available && <span className="text-amber-700">غير متاحة للمعاينة</span>}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </aside>
            <div className="min-w-0 py-7 lg:pr-8">
              {selectedFile ? (
                <div className="flex min-h-[660px] flex-col">
                  <div className="flex items-center justify-between gap-4 pb-4">
                    <div className="min-w-0">
                      <h2 className="text-sm font-black leading-6 text-slate-950">{documentTitle(selectedFile, details.attachments)}</h2>
                      <p className="mt-1 text-[10px] font-bold text-stone-500">{documentType(selectedFile)}{formatBytes(selectedFile.fileSizeBytes) ? `، ${formatBytes(selectedFile.fileSizeBytes)}` : ""}</p>
                    </div>
                    <a href={selectedFile.fileUrl} target="_blank" rel="noreferrer" className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg bg-slate-950 px-4 text-[11px] font-black text-white transition-transform active:translate-y-px"><ExternalLink size={13} /> فتح الوثيقة</a>
                  </div>
                  <div className="flex flex-1 items-center justify-center overflow-hidden border border-stone-300 bg-[#E7E9E6] p-3">
                    {isPdf ? <iframe title={documentTitle(selectedFile, details.attachments)} src={selectedFile.fileUrl} className="h-full min-h-[620px] w-full border-0 bg-white" /> : isImage ? <img src={selectedFile.fileUrl} alt={documentTitle(selectedFile, details.attachments)} className="max-h-[720px] max-w-full object-contain" /> : <div className="text-center"><FileArchive size={36} className="mx-auto text-stone-400" /><p className="mt-3 text-sm font-black">المعاينة المباشرة غير متاحة لهذه الصيغة.</p><a href={selectedFile.fileUrl} className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-[#007A55] px-4 text-xs font-black text-white"><Download size={14} /> تنزيل الوثيقة</a></div>}
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[600px] flex-col items-center justify-center border border-dashed border-stone-300 text-center"><FolderOpen size={34} className="text-stone-300" /><p className="mt-3 text-sm font-black text-slate-800">اختر وثيقة للمعاينة.</p></div>
              )}
            </div>
          </section>
        )}

        {tab === "template" && <section className="admin-template-section"><div className="flex flex-wrap items-center justify-between gap-4 py-6 admin-preview-chrome"><div><h2 className="text-base font-black">النموذج الرسمي المعبأ</h2><p className="mt-1 text-xs font-bold text-stone-500">راجع مطابقة البيانات مع النموذج الرسمي قبل تسجيل القرار.</p></div><a href={originalTemplate} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-lg border border-stone-300 bg-transparent px-4 text-[11px] font-black text-slate-700 transition-colors hover:border-slate-500"><ExternalLink size={13} /> قالب PDF الأصلي</a></div><div className="admin-template-canvas join-document-preview">{details.applicationType === "join" ? <JoinProgramPrintDocument session={templateSession as JoinProgramPrintSession} /> : <CertificateApplicationPrintDocument session={templateSession as CertificateApplicationPrintSession} />}</div></section>}
      </div>

      {decisionFeedback && (
        <div className={`fixed left-1/2 top-20 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-xl border bg-white px-4 py-3 text-xs font-black shadow-[0_18px_55px_rgba(15,23,42,.18)] admin-preview-chrome ${decisionFeedback.tone === "success" ? "border-emerald-200 text-emerald-700" : "border-red-200 text-red-700"}`}>
          {decisionFeedback.tone === "success" ? <Check size={16} /> : <AlertTriangle size={16} />}
          {decisionFeedback.text}
        </div>
      )}

      {isPendingReview && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-300 bg-white/95 backdrop-blur-xl admin-preview-chrome">
          <aside className="mx-auto flex max-w-[1380px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div><p className="text-xs font-black text-slate-950">القرار النهائي</p><p className="mt-1 text-[10px] font-bold text-stone-500">سجّل القرار بعد مراجعة الطلب والمرفقات والنموذج.</p></div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <button type="button" onClick={() => { setDecisionFeedback(null); setDecisionAction("reject"); }} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-5 text-xs font-black text-red-700 transition-colors hover:bg-red-50 active:translate-y-px"><X size={15} /> رفض الطلب</button>
              <button type="button" onClick={() => { setDecisionFeedback(null); setDecisionAction("approve"); }} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#007A55] px-6 text-xs font-black text-white transition-colors hover:bg-[#006A49] active:translate-y-px"><Check size={15} /> اعتماد الطلب</button>
            </div>
          </aside>
        </div>
      )}

      {decisionAction && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm admin-preview-chrome" role="dialog" aria-modal="true" aria-labelledby="decision-title">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_30px_100px_rgba(2,6,23,.4)]">
            <div className={`h-1.5 ${decisionAction === "approve" ? "bg-[#007A55]" : "bg-red-600"}`} />
            <div className="p-5 sm:p-6">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${decisionAction === "approve" ? "bg-emerald-50 text-[#007A55]" : "bg-red-50 text-red-700"}`}>{decisionAction === "approve" ? <Check size={21} /> : <X size={21} />}</div>
              <h2 id="decision-title" className="mt-4 text-lg font-black text-slate-950">{decisionAction === "approve" ? "تأكيد اعتماد الطلب" : "تأكيد رفض الطلب"}</h2>
              <p className="mt-2 text-xs font-bold leading-6 text-stone-500">{decisionAction === "approve" ? "سيتم اعتماد الطلب وتسجيل القرار باسم المستخدم الحالي في سجل العمليات." : "اذكر سبب الرفض بوضوح؛ سيُحفظ مع القرار في سجل العمليات للرجوع إليه."}</p>
              {decisionAction === "reject" && (
                <label className="mt-4 block text-xs font-black text-slate-800">
                  سبب الرفض
                  <textarea value={decisionReason} onChange={(event) => setDecisionReason(event.target.value)} rows={4} autoFocus placeholder="اكتب الملاحظة أو المتطلب غير المستوفى..." className="mt-2 w-full resize-none rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm font-bold leading-6 outline-none transition focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-50" />
                </label>
              )}
              {decisionFeedback?.tone === "error" && <p className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-[11px] font-black text-red-700"><AlertTriangle size={14} />{decisionFeedback.text}</p>}
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button type="button" disabled={isDecisionBusy} onClick={() => { setDecisionAction(null); setDecisionReason(""); setDecisionFeedback(null); }} className="h-10 rounded-xl border border-stone-200 bg-white text-xs font-black text-slate-700 disabled:opacity-50">إلغاء</button>
                <button type="button" disabled={isDecisionBusy || (decisionAction === "reject" && !decisionReason.trim())} onClick={() => void submitDecision()} className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl text-xs font-black text-white disabled:cursor-not-allowed disabled:opacity-45 ${decisionAction === "approve" ? "bg-[#007A55]" : "bg-red-600"}`}>{isDecisionBusy ? <LoaderCircle size={15} className="animate-spin" /> : decisionAction === "approve" ? <Check size={15} /> : <X size={15} />}{isDecisionBusy ? "جاري تسجيل القرار..." : decisionAction === "approve" ? "تأكيد الاعتماد" : "تأكيد الرفض"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
