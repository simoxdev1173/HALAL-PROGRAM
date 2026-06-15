import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { House } from "lucide-react";
import { Link } from "react-router-dom";
import { ChatbotWidget } from "../components/ChatbotWidget";

type YesNo = "" | "نعم" | "لا";
type FormValue = string | boolean | string[] | null;
type FormData = Record<string, FormValue>;
type Errors = Record<string, string>;

type FieldConfig = {
  key: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "date" | "textarea";
  required?: boolean;
  readOnly?: boolean;
  helper?: string;
  placeholder?: string;
};

type ReviewGroup = {
  title: string;
  step: number;
  items: { label: string; value: FormValue }[];
};

const STORAGE_KEY = "arab-halal-join-application-draft-v1";
const YES = "نعم";
const NO = "لا";

const initialData: FormData = {
  requestNumber: "",
  receivedDate: "",
  organizationNameAr: "",
  organizationNameEn: "",
  organizationAddressAr: "",
  organizationAddressEn: "",
  country: "",
  phone: "",
  fax: "",
  website: "",
  email: "",
  headName: "",
  headEmail: "",
  headMobile: "",
  contactOfficerName: "",
  contactOfficerEmail: "",
  contactOfficerMobile: "",
  orgStructureIncluded: false,
  technicalHumanCapacityIncluded: false,
  inspectorsTrainingProceduresIncluded: false,
  approvedInspectorsAuditorsListIncluded: false,
  halalCertificateIssuingProceduresIncluded: false,
  documentRecordsProceduresIncluded: false,
  nationalHalalCertificatesLast12MonthsIncluded: false,
  suppliersFacilitiesProductsListIncluded: false,
  firstApplicationReportFiles: [],
  accreditationCertificatesCopy: false,
  accreditationCertificatesFiles: [],
  appointmentDesignationCopy: false,
  appointmentDesignationFiles: [],
  otherDocuments: false,
  otherDocumentsDescription: "",
  otherDocumentsFiles: [],
  grantsNationalHalalCertificate: "",
  nationalHalalCertificateName: "",
  nationalHalalReferenceStandard: "",
  coveredProductCategories: "",
  hasOtherNationalHalalBodies: "",
  otherNationalHalalBodiesNames: "",
  grantsOtherCertificates: "",
  otherCertificatesNames: "",
  otherCertificatesReferenceStandards: "",
  otherCertificatesScope: "",
  applicantAcknowledgement: false,
  signatureHeadName: "",
  signatureDate: "",
  signature: null,
  officialSeal: null,
  additionalNotes: "",
};

const steps = [
  { title: "معلومات الجهة", microcopy: "يرجى تزويدنا بالبيانات الرسمية للمنظمة كما هي مسجلة في السجلات المعتمدة لدينا." },
  { title: "الإدارة العليا", microcopy: "معلومات التواصل الخاصة برئيس الجهة أو المسؤول الأول عن ملف الحلال في منظمتكم." },
  { title: "ضابط الاتصال", microcopy: "تحديد الشخص المعتمد للتنسيق والمتابعة المباشرة مع فريق البرنامج العربي للحلال." },
  { title: "التقرير والوثائق", microcopy: "تحميل التقارير الفنية والوثائق المطلوبة لتقييم الجاهزية والامتثال لمتطلبات البرنامج." },
  { title: "شهادات الحلال الوطنية", microcopy: "تفاصيل الأنظمة الوطنية القائمة لشهادات الحلال والمعايير المرجعية المستخدمة حالياً." },
  { title: "شهادات أخرى", microcopy: "الإفصاح عن أي شهادات جودة أو امتثال أخرى تمنحها الجهة في مجالات تقنية أو إدارية مختلفة." },
  { title: "الإقرار والمراجعة", microcopy: "الخطوة النهائية لمراجعة كافة البيانات المدخلة بعناية والتوقيع على التعهدات القانونية المطلوبة." },
];

const requiredByStep: Record<number, string[]> = {
  0: [
    "organizationNameAr",
    "organizationNameEn",
    "organizationAddressAr",
    "organizationAddressEn",
    "country",
    "phone",
    "email",
  ],
  1: ["headName", "headEmail", "headMobile"],
  2: ["contactOfficerName", "contactOfficerEmail", "contactOfficerMobile"],
  4: ["grantsNationalHalalCertificate"],
  5: ["grantsOtherCertificates"],
  6: ["applicantAcknowledgement", "signatureHeadName", "signatureDate"],
};

const emailFields = new Set(["email", "headEmail", "contactOfficerEmail"]);
const urlFields = new Set(["website"]);
const phoneFields = new Set(["phone", "fax", "headMobile", "contactOfficerMobile"]);

const organizationFields: FieldConfig[] = [
  { key: "organizationNameAr", label: "اسم الجهة المعنية بالحلال المسجلة بالعربية", required: true },
  { key: "organizationNameEn", label: "Organization Registered Name (English)", required: true },
  {
    key: "organizationAddressAr",
    label: "العنوان البريدي المسجل للجهة المعنية بالحلال بالعربية",
    type: "textarea",
    required: true,
  },
  {
    key: "organizationAddressEn",
    label: "Organization Registered Address (English)",
    type: "textarea",
    required: true,
  },
  { key: "country", label: "الدولة", required: true },
  { key: "phone", label: "رقم الهاتف", type: "tel", required: true },
  { key: "fax", label: "رقم الفاكس", type: "tel" },
  { key: "website", label: "الموقع الإلكتروني", type: "url", placeholder: "https://example.org" },
  { key: "email", label: "البريد الإلكتروني", type: "email", required: true },
];

const managementFields: FieldConfig[] = [
  { key: "headName", label: "اسم رئيس الجهة المعنية بالحلال", required: true },
  { key: "headEmail", label: "البريد الإلكتروني الخاص به", type: "email", required: true },
  { key: "headMobile", label: "رقم الهاتف المحمول", type: "tel", required: true },
];

const contactFields: FieldConfig[] = [
  { key: "contactOfficerName", label: "اسم ضابط الاتصال", required: true },
  { key: "contactOfficerEmail", label: "البريد الإلكتروني الخاص به", type: "email", required: true },
  { key: "contactOfficerMobile", label: "رقم الهاتف المحمول", type: "tel", required: true },
];

const reportChecklist = [
  {
    key: "orgStructureIncluded",
    label: "الهيكل التنظيمي للجهة المعنية بالحلال موضحاً به مسؤوليات وواجبات العاملين به في مجال منح الشهادات.",
  },
  { key: "technicalHumanCapacityIncluded", label: "الإمكانات الفنية والبشرية في مجال منح الشهادات." },
  { key: "inspectorsTrainingProceduresIncluded", label: "دليل/إجراءات اختيار وتدريب المفتشين والمدققين." },
  { key: "approvedInspectorsAuditorsListIncluded", label: "قائمة المفتشين والمدققين المعتمدين." },
  {
    key: "halalCertificateIssuingProceduresIncluded",
    label: "إجراءات إصدار شهادات الحلال وفق المتطلبات الدولية ISO/IEC 17065 و AIDSMO 3042.",
  },
  { key: "documentRecordsProceduresIncluded", label: "إجراءات توثيق المستندات والسجلات." },
  {
    key: "nationalHalalCertificatesLast12MonthsIncluded",
    label:
      "سجل شهادات الحلال الوطنية الصادرة لآخر 12 شهر، عندما تكون الجهة المعنية بالحلال تمنح شهادة الحلال الوطنية.",
  },
  {
    key: "suppliersFacilitiesProductsListIncluded",
    label:
      "قائمة أسماء وعناوين الموردين/المنشآت، المصانع والشركات، ومنتجاتها التي يشرفون عليها في قطاع الحلال، إذا كانت الجهة المعنية بالحلال تمنح شهادة الحلال الوطنية.",
  },
];

const conditions = [
  "تقوم المنظمة العربية للتنمية الصناعية والتقييس والتعدين بإبلاغ الجهة المعنية بالحلال بنتيجة مراجعة الطلب خلال شهر من تاريخ استلام الطلب.",
  "تلتزم المنظمة العربية للتنمية الصناعية والتقييس والتعدين بالحفاظ على سرية المعلومات والوثائق المتعلقة بالطلب ومرفقات الطلب.",
  "تلتزم الجهة المتقدمة للحصول على موافقة المنظمة بتشغيل البرنامج العربي للحلال بتنفيذ المتطلبات الواردة في البرنامج.",
  "في حال قبول الطلب، يلتزم الطرفان بتوقيع نموذج وثيقة التعاون الفني، الملحق 5 في البرنامج العربي للحلال، والالتزام بما يرد فيه قانونياً ومالياً.",
];

const isFilled = (value: FormValue) => {
  if (typeof value === "boolean") return value;
  if (Array.isArray(value)) return value.length > 0;
  if (value === null) return false;
  return String(value).trim().length > 0;
};

const normalize = (value: FormValue) => (typeof value === "string" ? value.trim() : value);
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
const isUrl = (value: string) => {
  if (!value.trim()) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};
const isPhone = (value: string) => !value.trim() || /^[+\d\s().-]{6,24}$/.test(value.trim());

function getRequiredFields(stepIndex: number, data: FormData) {
  const fields = [...(requiredByStep[stepIndex] ?? [])];

  if (stepIndex === 4) {
    if (data.grantsNationalHalalCertificate === YES) {
      fields.push("nationalHalalCertificateName", "nationalHalalReferenceStandard", "coveredProductCategories");
    }
    if (data.grantsNationalHalalCertificate === NO) {
      fields.push("hasOtherNationalHalalBodies");
      if (data.hasOtherNationalHalalBodies === YES) fields.push("otherNationalHalalBodiesNames");
    }
  }

  if (stepIndex === 5 && data.grantsOtherCertificates === YES) {
    fields.push("otherCertificatesNames", "otherCertificatesReferenceStandards", "otherCertificatesScope");
  }

  return fields;
}

function getStepFieldKeys(stepIndex: number, data: FormData) {
  if (stepIndex === 0) return organizationFields.map((field) => field.key);
  if (stepIndex === 1) return managementFields.map((field) => field.key);
  if (stepIndex === 2) return contactFields.map((field) => field.key);
  if (stepIndex === 3) {
    return [
      ...reportChecklist.map((item) => item.key),
      "firstApplicationReportFiles",
      "accreditationCertificatesCopy",
      "accreditationCertificatesFiles",
      "appointmentDesignationCopy",
      "appointmentDesignationFiles",
      "otherDocuments",
      "otherDocumentsDescription",
      "otherDocumentsFiles",
    ];
  }
  if (stepIndex === 4) {
    const keys = ["grantsNationalHalalCertificate"];
    if (data.grantsNationalHalalCertificate === YES) {
      keys.push("nationalHalalCertificateName", "nationalHalalReferenceStandard", "coveredProductCategories");
    }
    if (data.grantsNationalHalalCertificate === NO) {
      keys.push("hasOtherNationalHalalBodies");
      if (data.hasOtherNationalHalalBodies === YES) keys.push("otherNationalHalalBodiesNames");
    }
    return keys;
  }
  if (stepIndex === 5) {
    const keys = ["grantsOtherCertificates"];
    if (data.grantsOtherCertificates === YES) {
      keys.push("otherCertificatesNames", "otherCertificatesReferenceStandards", "otherCertificatesScope");
    }
    return keys;
  }
  return ["applicantAcknowledgement", "signatureHeadName", "signatureDate", "signature", "officialSeal", "additionalNotes"];
}

function validateFields(keys: string[], data: FormData) {
  const nextErrors: Errors = {};

  keys.forEach((key) => {
    const value = data[key];
    if (!isFilled(value)) nextErrors[key] = "هذا الحقل مطلوب.";
  });

  Object.keys(data).forEach((key) => {
    const value = String(data[key] ?? "");
    if (emailFields.has(key) && value && !isEmail(value)) nextErrors[key] = "يرجى إدخال بريد إلكتروني صحيح.";
    if (urlFields.has(key) && value && !isUrl(value)) nextErrors[key] = "يرجى إدخال رابط يبدأ بـ http أو https.";
    if (phoneFields.has(key) && value && !isPhone(value)) nextErrors[key] = "يرجى إدخال رقم هاتف صحيح.";
  });

  return nextErrors;
}

function createPayload(data: FormData) {
  return {
    requestNumber: normalize(data.requestNumber),
    receivedDate: normalize(data.receivedDate),
    organization: {
      nameAr: normalize(data.organizationNameAr),
      nameEn: normalize(data.organizationNameEn),
      addressAr: normalize(data.organizationAddressAr),
      addressEn: normalize(data.organizationAddressEn),
      country: normalize(data.country),
      phone: normalize(data.phone),
      fax: normalize(data.fax),
      website: normalize(data.website),
      email: normalize(data.email),
    },
    seniorManagement: {
      headName: normalize(data.headName),
      headEmail: normalize(data.headEmail),
      headMobile: normalize(data.headMobile),
    },
    contactOfficer: {
      name: normalize(data.contactOfficerName),
      email: normalize(data.contactOfficerEmail),
      mobile: normalize(data.contactOfficerMobile),
    },
    firstApplicationReport: {
      orgStructureIncluded: Boolean(data.orgStructureIncluded),
      technicalHumanCapacityIncluded: Boolean(data.technicalHumanCapacityIncluded),
      inspectorsTrainingProceduresIncluded: Boolean(data.inspectorsTrainingProceduresIncluded),
      approvedInspectorsAuditorsListIncluded: Boolean(data.approvedInspectorsAuditorsListIncluded),
      halalCertificateIssuingProceduresIncluded: Boolean(data.halalCertificateIssuingProceduresIncluded),
      documentRecordsProceduresIncluded: Boolean(data.documentRecordsProceduresIncluded),
      nationalHalalCertificatesLast12MonthsIncluded: Boolean(data.nationalHalalCertificatesLast12MonthsIncluded),
      suppliersFacilitiesProductsListIncluded: Boolean(data.suppliersFacilitiesProductsListIncluded),
      files: data.firstApplicationReportFiles,
    },
    attachments: {
      accreditationCertificatesCopy: Boolean(data.accreditationCertificatesCopy),
      accreditationCertificatesFiles: data.accreditationCertificatesFiles,
      appointmentDesignationCopy: Boolean(data.appointmentDesignationCopy),
      appointmentDesignationFiles: data.appointmentDesignationFiles,
      otherDocuments: Boolean(data.otherDocuments),
      otherDocumentsDescription: normalize(data.otherDocumentsDescription),
      otherDocumentsFiles: data.otherDocumentsFiles,
    },
    nationalHalalCertification: {
      grantsNationalHalalCertificate: normalize(data.grantsNationalHalalCertificate),
      nationalHalalCertificateName: normalize(data.nationalHalalCertificateName),
      nationalHalalReferenceStandard: normalize(data.nationalHalalReferenceStandard),
      coveredProductCategories: normalize(data.coveredProductCategories),
      hasOtherNationalHalalBodies: normalize(data.hasOtherNationalHalalBodies),
      otherNationalHalalBodiesNames: normalize(data.otherNationalHalalBodiesNames),
    },
    otherCertificates: {
      grantsOtherCertificates: normalize(data.grantsOtherCertificates),
      otherCertificatesNames: normalize(data.otherCertificatesNames),
      otherCertificatesReferenceStandards: normalize(data.otherCertificatesReferenceStandards),
      otherCertificatesScope: normalize(data.otherCertificatesScope),
    },
    acknowledgement: {
      acceptedConditions: Boolean(data.applicantAcknowledgement),
      signatureHeadName: normalize(data.signatureHeadName),
      signatureDate: normalize(data.signatureDate),
      signature: data.signature,
      officialSeal: data.officialSeal,
      additionalNotes: normalize(data.additionalNotes),
    },
  };
}

function loadInitialData(): FormData {
  if (typeof window === "undefined") return initialData;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return initialData;
  try {
    const parsed = JSON.parse(saved) as Partial<Record<string, FormValue>>;
    const merged: FormData = { ...initialData };
    Object.entries(parsed).forEach(([key, value]) => {
      if (value !== undefined) merged[key] = value;
    });
    return merged;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return initialData;
  }
}

function fieldValue(data: FormData, key: string) {
  const value = data[key];
  return typeof value === "string" ? value : "";
}

function formatValue(value: FormValue) {
  if (Array.isArray(value)) return value.length ? value.join("، ") : "لم يتم إرفاق ملفات";
  if (typeof value === "boolean") return value ? "نعم" : "لا";
  if (value === null) return "غير مرفق";
  return String(value || "غير مدخل");
}

function InputField({
  field,
  value,
  error,
  onChange,
}: {
  field: FieldConfig;
  value: string;
  error?: string;
  onChange: (key: string, value: string) => void;
}) {
  const baseClass = `w-full rounded-xl border bg-white px-3.5 py-3 text-[15px] font-medium text-[#0C111D] shadow-[var(--shadow-premium-sm)] outline-none transition-all duration-200 placeholder:text-stone-400 focus:border-[#007A55] focus:ring-4 focus:ring-[#007A55]/10 ${
    error ? "border-red-500 bg-red-50/40" : "border-stone-200"
  } ${field.readOnly ? "cursor-not-allowed bg-stone-50 text-stone-500 border-stone-200" : "hover:border-stone-300"}`;

  return (
    <label className="block group">
      <span className="mb-2 block text-[12px] font-bold text-stone-600 transition-colors group-focus-within:text-[#007A55]">
        {field.label}
        {field.required && <span className="mr-1 text-[#CA8A04]">*</span>}
      </span>
      {field.type === "textarea" ? (
        <textarea
          value={value}
          readOnly={field.readOnly}
          placeholder={field.placeholder}
          onChange={(event) => onChange(field.key, event.target.value)}
          className={`${baseClass} min-h-28 resize-y leading-relaxed`}
        />
      ) : (
        <input
          value={value}
          readOnly={field.readOnly}
          type={field.type ?? "text"}
          placeholder={field.placeholder}
          onChange={(event) => onChange(field.key, event.target.value)}
          className={baseClass}
        />
      )}
      {field.helper && <span className="mt-2 block text-xs font-medium text-stone-400">{field.helper}</span>}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 block text-xs font-bold text-red-600"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

function FileUploadBox({
  label,
  helper,
  value,
  onChange,
}: {
  label: string;
  helper?: string;
  value: string[];
  onChange: (files: string[]) => void;
}) {
  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const names = Array.from(event.target.files ?? []).map((file) => file.name);
    onChange(names);
  };

  return (
    <div className="space-y-2.5">
      <span className="block text-[12px] font-bold text-stone-600">{label}</span>
      <label className="relative flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-200 bg-stone-50/50 px-5 py-6 text-center transition-all hover:border-[#007A55]/30 hover:bg-[#F0FDF4]/30 group">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-stone-200 transition-transform group-hover:scale-110 group-hover:ring-[#007A55]/20">
          <svg className="h-5 w-5 text-stone-400 transition-colors group-hover:text-[#007A55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div className="mt-3 space-y-1">
          <span className="block text-[13px] font-bold text-stone-900">اضغط لرفع الملفات</span>
          {helper && <span className="block text-xs font-medium text-stone-400">{helper}</span>}
        </div>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFiles}
          className="sr-only"
        />
      </label>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {value.map((file) => (
            <div key={file} className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-1.5 shadow-sm">
              <span className="text-xs font-bold text-stone-700">{file}</span>
              <button
                type="button"
                className="text-stone-400 hover:text-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  onChange(value.filter(v => v !== file));
                }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RadioGroupYesNo({
  label,
  value,
  error,
  onChange,
}: {
  label: string;
  value: FormValue;
  error?: string;
  onChange: (value: YesNo) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-[13px] font-bold text-stone-600">{label}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {[YES, NO].map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option as YesNo)}
              className={`flex min-h-[56px] items-center justify-between rounded-xl border px-5 py-3.5 transition-all duration-200 ${
                active 
                  ? "border-[#007A55] bg-[#007A55] text-white shadow-[0_8px_16px_-4px_rgba(0,122,85,0.25)]" 
                  : "border-stone-200 bg-white text-stone-900 hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              <span className="text-[15px] font-bold">{option}</span>
              <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                active ? "border-white bg-white/20" : "border-stone-200 bg-transparent"
              }`}>
                {active && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs font-bold text-red-600">{error}</p>}
    </fieldset>
  );
}

function QuestionStage({
  stepIndex,
  children,
}: {
  stepIndex: number;
  children: ReactNode;
}) {
  const step = steps[stepIndex];
  return (
    <motion.section
      key={stepIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-[58rem] px-5 py-9 lg:px-8"
    >
      <div className="mb-9 space-y-3">
        <h1 className="text-3xl font-black leading-tight text-stone-900 md:text-4xl">{step.title}</h1>
        <p className="max-w-2xl text-[15px] font-medium leading-relaxed text-stone-500">{step.microcopy}</p>
      </div>
      <div className="space-y-9">{children}</div>
    </motion.section>
  );
}

function SectionGroup({ title, helper, children }: { title?: string; helper?: string; children: ReactNode }) {
  return (
    <section className="space-y-6">
      {(title || helper) && (
        <div className="space-y-1.5">
          {title && <h2 className="text-lg font-black text-stone-900">{title}</h2>}
          {helper && <p className="text-[14px] font-medium text-stone-500">{helper}</p>}
        </div>
      )}
      <div className="rounded-2xl border border-stone-200 bg-white/60 p-5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.08)] backdrop-blur-xl md:p-8">
        {children}
      </div>
    </section>
  );
}

function StepRail({
  activeStep,
  completed,
  onJump,
}: {
  activeStep: number;
  completed: Set<number>;
  onJump: (step: number) => void;
}) {
  return (
    <nav aria-label="مراحل الطلب" className="sticky top-0 z-40 border-b border-stone-200/50 bg-white/80 backdrop-blur-2xl">
      <div className="mx-auto max-w-5xl px-5 py-7 lg:px-8">
        <div className="relative flex justify-between">
          <div className="absolute top-1/2 inset-x-0 h-1 -translate-y-1/2 bg-stone-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#007A55] origin-right"
              initial={false}
              animate={{ scaleX: activeStep / (steps.length - 1) }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          {steps.map((step, index) => {
            const active = index === activeStep;
            const done = completed.has(index);
            return (
              <button
                key={step.title}
                type="button"
                onClick={() => onJump(index)}
                className="group relative z-10 flex flex-col items-center focus:outline-none"
              >
                <div 
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    active 
                      ? "border-[#007A55] bg-[#007A55] text-white shadow-[0_0_0_8px_rgba(0,122,85,0.1)] scale-110" 
                      : done 
                        ? "border-[#007A55] bg-white text-[#007A55]" 
                        : "border-stone-200 bg-white text-stone-300 group-hover:border-stone-400 group-hover:text-stone-500 shadow-sm"
                  }`}
                >
                  {done ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-base font-black">{index + 1}</span>
                  )}
                </div>
                <span className={`absolute top-16 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.22em] transition-all duration-300 ${
                  active ? "text-[#007A55] opacity-100 translate-y-0" : "text-stone-400 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                } hidden md:block`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function ReviewCard({ group, onEdit }: { group: ReviewGroup; onEdit: (step: number) => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white/90 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/40 px-6 py-4">
        <h2 className="text-lg font-black text-stone-900">{group.title}</h2>
        <button
          type="button"
          onClick={() => onEdit(group.step)}
          className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2 text-[12px] font-black text-stone-600 transition-all hover:border-[#CA8A04] hover:text-[#CA8A04] hover:shadow-md active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          تعديل القسم
        </button>
      </div>
      <div className="p-8">
        <dl className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {group.items.map((item) => (
            <div key={item.label} className="space-y-2 border-r-2 border-stone-50 pr-4">
              <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">{item.label}</dt>
              <dd className="text-[15px] font-bold text-stone-900 leading-relaxed">{formatValue(item.value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.section>
  );
}

export default function JoinProgram() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [data, setData] = useState<FormData>(() => loadInitialData());
  const [errors, setErrors] = useState<Errors>({});
  const [showReview, setShowReview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [, setLastSavedAt] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLastSavedAt(new Intl.DateTimeFormat("ar", { hour: "2-digit", minute: "2-digit" }).format(new Date()));
    }, 350);
    return () => window.clearTimeout(id);
  }, [data]);

  const payload = useMemo(() => createPayload(data), [data]);

  const updateField = (key: string, value: FormValue) => {
    setData((current) => {
      const next = { ...current, [key]: value };
      if (key === "headName" && !fieldValue(current, "signatureHeadName")) next.signatureHeadName = value;
      return next;
    });
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const goNext = () => {
    setCompletedSteps((current) => new Set([...current, activeStep]));
    setErrors({});
    if (activeStep === steps.length - 1) {
      setShowReview(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setActiveStep((step) => Math.min(step + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goPrevious = () => {
    if (showReview) {
      setShowReview(false);
      return;
    }
    setActiveStep((step) => Math.max(step - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setLastSavedAt(new Intl.DateTimeFormat("ar", { hour: "2-digit", minute: "2-digit" }).format(new Date()));
  };

  const submitApplication = () => {
    const allRequired = steps.flatMap((_, index) => getRequiredFields(index, data));
    const allVisible = steps.flatMap((_, index) => getStepFieldKeys(index, data));
    const allErrors = validateFields(allRequired, data);
    const visibleErrors = Object.fromEntries(Object.entries(allErrors).filter(([key]) => allVisible.includes(key)));
    setErrors(visibleErrors);
    if (Object.keys(visibleErrors).length > 0) {
      setShowReview(false);
      const firstStepWithError = steps.findIndex((_, index) => getStepFieldKeys(index, data).some((key) => visibleErrors[key]));
      setActiveStep(Math.max(firstStepWithError, 0));
      return;
    }
    console.info("Arab Halal Join Application Payload", payload);
    localStorage.removeItem(STORAGE_KEY);
    setSubmitted(true);
  };

  const handleStageKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" || showReview) return;
    const target = event.target as HTMLElement;
    const tag = target.tagName.toLowerCase();
    const inputType = target instanceof HTMLInputElement ? target.type : "";
    if (tag === "textarea" || tag === "button" || inputType === "file" || inputType === "checkbox") return;
    event.preventDefault();
    goNext();
  };

  const reviewGroups = useMemo<ReviewGroup[]>(
    () => [
      {
        title: "معلومات الجهة",
        step: 0,
        items: organizationFields.map((field) => ({ label: field.label, value: data[field.key] })),
      },
      {
        title: "الإدارة العليا",
        step: 1,
        items: managementFields.map((field) => ({ label: field.label, value: data[field.key] })),
      },
      {
        title: "ضابط الاتصال",
        step: 2,
        items: contactFields.map((field) => ({ label: field.label, value: data[field.key] })),
      },
      {
        title: "التقرير والوثائق",
        step: 3,
        items: [
          ...reportChecklist.map((item) => ({ label: item.label, value: data[item.key] })),
          { label: "تحميل التقرير أو الوثائق الداعمة", value: data.firstApplicationReportFiles },
          { label: "نسخة عن شهادات الاعتماد", value: data.accreditationCertificatesCopy },
          { label: "ملفات شهادات الاعتماد", value: data.accreditationCertificatesFiles },
          { label: "نسخة عن التكليف بالتعيين", value: data.appointmentDesignationCopy },
          { label: "ملفات التكليف بالتعيين", value: data.appointmentDesignationFiles },
          { label: "أخرى", value: data.otherDocuments },
          { label: "وصف الوثائق الأخرى", value: data.otherDocumentsDescription },
          { label: "ملفات الوثائق الأخرى", value: data.otherDocumentsFiles },
        ],
      },
      {
        title: "شهادات الحلال الوطنية",
        step: 4,
        items: [
          { label: "هل تمنح الجهة المعنية بالحلال شهادة حلال وطنية؟", value: data.grantsNationalHalalCertificate },
          { label: "ما هي؟", value: data.nationalHalalCertificateName },
          { label: "ما هي المواصفة المرجعية لها؟", value: data.nationalHalalReferenceStandard },
          { label: "ذكر تصنيف المنتجات المغطاة في مجال منح الشهادات التي تمنحها جهة منح الشهادات", value: data.coveredProductCategories },
          { label: "هل توجد جهات معينة تقوم بمنح شهادة الحلال الوطنية؟", value: data.hasOtherNationalHalalBodies },
          { label: "الرجاء ذكر أسماء هذه الجهات", value: data.otherNationalHalalBodiesNames },
        ],
      },
      {
        title: "شهادات أخرى",
        step: 5,
        items: [
          { label: "هل تمنح الجهة المعنية بالحلال شهادات أخرى، مثل أنظمة إدارة، منتجات، أو غيرها؟", value: data.grantsOtherCertificates },
          { label: "ما هي؟", value: data.otherCertificatesNames },
          { label: "ما هي المواصفة المرجعية لها؟", value: data.otherCertificatesReferenceStandards },
          { label: "الرجاء ذكر مجال منح الشهادات", value: data.otherCertificatesScope },
        ],
      },
      {
        title: "الإقرار والتوقيع",
        step: 6,
        items: [
          { label: "الإقرار بالشروط", value: data.applicantAcknowledgement },
          { label: "اسم رئيس الجهة المعنية بالحلال", value: data.signatureHeadName },
          { label: "التاريخ", value: data.signatureDate },
          { label: "التوقيع", value: data.signature },
          { label: "الختم الرسمي", value: data.officialSeal },
          { label: "ملاحظات أخرى", value: data.additionalNotes },
        ],
      },
    ],
    [data]
  );

  return (
    <main
      id="join-application"
      className="relative min-h-screen bg-[#FDFDFD] font-arabic text-stone-900 selection:bg-[#007A55]/10 selection:text-[#007A55]"
      dir="rtl"
      onKeyDown={handleStageKeyDown}
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#007A55 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FCFBFA] to-stone-100/40" />
        <div className="absolute top-0 right-0 h-[620px] w-[620px] rounded-full bg-[#007A55]/5 blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 h-[460px] w-[460px] rounded-full bg-[#CA8A04]/5 blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>
      
      <header className="relative z-10 border-b border-stone-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5 lg:px-8">
          <div className="flex items-center gap-6">
            <img src="/logo.svg" alt="شعار البرنامج العربي للحلال" className="h-20 w-20 object-contain drop-shadow-xl transition-transform hover:scale-110 duration-500" />
            <div className="hidden h-11 w-px bg-stone-200 sm:block" />
            <div className="space-y-1 hidden sm:block">
              <h1 className="text-xl font-black tracking-tight text-stone-900">منصة تقديم الطلبات</h1>
           
            </div>
          </div>
          <Link
            to="/"
            className="group flex items-center gap-3 rounded-xl border-2 border-stone-100 bg-white px-6 py-3 text-[13px] font-black text-stone-600 shadow-sm transition-all hover:border-[#007A55] hover:text-[#007A55] hover:shadow-xl active:scale-95"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-50 transition-colors group-hover:bg-[#007A55]/10">
              <House size={20} className="transition-transform group-hover:-translate-y-1 duration-300" />
            </div>
            <span>الرجوع للمنصة</span>
          </Link>
        </div>
      </header>

      <StepRail
        activeStep={activeStep}
        completed={completedSteps}
        onJump={(step) => {
          setShowReview(false);
          setActiveStep(step);
        }}
      />

      <div className="relative z-10 pb-44">
        <AnimatePresence mode="wait">
          {showReview ? (
            <motion.section
              key="review"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto w-full max-w-[62rem] px-5 py-12 lg:px-8"
            >
              <div className="mb-14 space-y-4">
                <div className="inline-flex items-center gap-3 rounded-full bg-[#CA8A04]/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#CA8A04]">
                  <span className="h-2 w-2 rounded-full bg-[#CA8A04] animate-pulse" />
                  مراجعة نهائية قبل الإرسال
                </div>
                <h1 className="text-4xl font-black text-stone-900 md:text-6xl tracking-tighter">تأكد من البيانات</h1>
                <p className="max-w-2xl text-[17px] font-medium leading-relaxed text-stone-500">
                  يرجى مراجعة كافة المعلومات والوثائق المرفقة قبل الضغط على زر الإرسال النهائي.
                </p>
              </div>
              <div className="grid gap-8">
                {reviewGroups.map((group) => (
                  <ReviewCard
                    key={group.title}
                    group={group}
                    onEdit={(step) => {
                      setShowReview(false);
                      setActiveStep(step);
                    }}
                  />
                ))}
              </div>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative mt-14 overflow-hidden rounded-[2rem] border-4 border-white bg-green-500 p-12 text-center text-white shadow-[0_40px_100px_-20px_rgba(34,197,94,0.5)]"
                >
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white text-green-500 shadow-2xl">
                      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="mb-4 text-3xl font-black">تم إرسال طلبك بنجاح</h2>
                    <p className="text-lg font-bold opacity-90">سيتواصل معك فريق البرنامج العربي للحلال عبر البريد الإلكتروني قريباً.</p>
                  </div>
                </motion.div>
              )}
            </motion.section>
          ) : (
            <QuestionStage key={activeStep} stepIndex={activeStep}>
              {activeStep === 0 && (
                <SectionGroup title="معلومات عامة">
                  <div className="grid gap-x-8 gap-y-8 lg:grid-cols-2">
                    {organizationFields.map((field) => (
                      <InputField
                        key={field.key}
                        field={field}
                        value={fieldValue(data, field.key)}
                        error={errors[field.key]}
                        onChange={updateField}
                      />
                    ))}
                  </div>
                </SectionGroup>
              )}

              {activeStep === 1 && (
                <SectionGroup title="معلومات الإدارة العليا">
                  <div className="grid gap-x-8 gap-y-8 lg:grid-cols-3">
                    {managementFields.map((field) => (
                      <InputField
                        key={field.key}
                        field={field}
                        value={fieldValue(data, field.key)}
                        error={errors[field.key]}
                        onChange={updateField}
                      />
                    ))}
                  </div>
                </SectionGroup>
              )}

              {activeStep === 2 && (
                <SectionGroup title="معلومات ضابط الاتصال" helper="يرجى تحديد شخص يمثل الجهة المعنية بالحلال للتواصل معه بشكل مباشر.">
                  <div className="grid gap-x-8 gap-y-8 lg:grid-cols-3">
                    {contactFields.map((field) => (
                      <InputField
                        key={field.key}
                        field={field}
                        value={fieldValue(data, field.key)}
                        error={errors[field.key]}
                        onChange={updateField}
                      />
                    ))}
                  </div>
                </SectionGroup>
              )}

              {activeStep === 3 && (
                <div className="space-y-12">
                  <SectionGroup title="تقرير المرحلة الأولى" helper="في حال التقديم لأول مرة، يرجى تحديد الوثائق المتوفرة وإرفاق الملفات الداعمة.">
                    <div className="grid gap-4">
                      {reportChecklist.map((item) => (
                        <label
                          key={item.key}
                          className={`flex cursor-pointer items-start gap-4 rounded-[1.25rem] border-2 p-5 transition-all duration-300 ${
                            data[item.key]
                              ? "border-[#007A55] bg-[#007A55]/5 shadow-sm"
                              : "border-stone-100 bg-white hover:border-stone-200 hover:bg-stone-50/50"
                          }`}
                        >
                          <div className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-300 ${
                            data[item.key] ? "border-[#007A55] bg-[#007A55] text-white" : "border-stone-200 bg-white"
                          }`}>
                            {data[item.key] && (
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <input
                            type="checkbox"
                            checked={Boolean(data[item.key])}
                            onChange={(event) => updateField(item.key, event.target.checked)}
                            className="sr-only"
                          />
                          <span className="text-[15px] font-bold leading-relaxed text-stone-800">{item.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className="pt-4">
                      <FileUploadBox
                        label="تحميل التقرير أو الوثائق الداعمة"
                        helper="PDF, DOC, DOCX, JPG, PNG (حد أقصى 10 ميجابايت للملف)"
                        value={(data.firstApplicationReportFiles as string[]) ?? []}
                        onChange={(files) => updateField("firstApplicationReportFiles", files)}
                      />
                    </div>
                  </SectionGroup>

                  <SectionGroup title="الوثائق المرفقة مع الطلب">
                    <div className="grid gap-6 lg:grid-cols-2">
                      {[
                        { key: "accreditationCertificatesCopy", label: "نسخة عن شهادات الاعتماد", upload: "accreditationCertificatesFiles" },
                        { key: "appointmentDesignationCopy", label: "نسخة عن التكليف بالتعيين", upload: "appointmentDesignationFiles" },
                      ].map((item) => (
                        <div key={item.key} className="space-y-6 rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
                          <label className="flex cursor-pointer items-center gap-4">
                            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-300 ${
                              data[item.key] ? "border-[#007A55] bg-[#007A55] text-white" : "border-stone-200 bg-white"
                            }`}>
                              {data[item.key] && (
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <input
                              type="checkbox"
                              checked={Boolean(data[item.key])}
                              onChange={(event) => updateField(item.key, event.target.checked)}
                              className="sr-only"
                            />
                            <span className="text-[15px] font-black text-stone-900">{item.label}</span>
                          </label>
                          <FileUploadBox
                            label={`تحميل الملفات الخاصة بـ ${item.label}`}
                            value={(data[item.upload] as string[]) ?? []}
                            onChange={(files) => updateField(item.upload, files)}
                          />
                        </div>
                      ))}
                      <div className="space-y-6 rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm lg:col-span-2">
                        <label className="flex cursor-pointer items-center gap-4">
                          <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-300 ${
                            data.otherDocuments ? "border-[#007A55] bg-[#007A55] text-white" : "border-stone-200 bg-white"
                          }`}>
                            {data.otherDocuments && (
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <input
                            type="checkbox"
                            checked={Boolean(data.otherDocuments)}
                            onChange={(event) => updateField("otherDocuments", event.target.checked)}
                            className="sr-only"
                          />
                          <span className="text-[15px] font-black text-stone-900">وثائق أخرى</span>
                        </label>
                        <div className="grid gap-8 lg:grid-cols-2">
                          <InputField
                            field={{ key: "otherDocumentsDescription", label: "وصف هذه الوثائق", type: "textarea", placeholder: "يرجى تقديم وصف موجز للوثائق الإضافية..." }}
                            value={fieldValue(data, "otherDocumentsDescription")}
                            onChange={updateField}
                          />
                          <FileUploadBox
                            label="تحميل الوثائق الإضافية"
                            value={(data.otherDocumentsFiles as string[]) ?? []}
                            onChange={(files) => updateField("otherDocumentsFiles", files)}
                          />
                        </div>
                      </div>
                    </div>
                  </SectionGroup>
                </div>
              )}

              {activeStep === 4 && (
                <SectionGroup title="شهادات الحلال الوطنية">
                  <div className="space-y-9">
                    <RadioGroupYesNo
                      label="هل تمنح الجهة المعنية بالحلال حالياً شهادة حلال وطنية؟"
                      value={data.grantsNationalHalalCertificate}
                      error={errors.grantsNationalHalalCertificate}
                      onChange={(value) => updateField("grantsNationalHalalCertificate", value)}
                    />
                    {data.grantsNationalHalalCertificate === YES && (
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8">
                        <InputField field={{ key: "nationalHalalCertificateName", label: "اسم الشهادة الوطنية", type: "textarea", required: true }} value={fieldValue(data, "nationalHalalCertificateName")} error={errors.nationalHalalCertificateName} onChange={updateField} />
                        <InputField field={{ key: "nationalHalalReferenceStandard", label: "المواصفة المرجعية المعتمدة", type: "textarea", required: true }} value={fieldValue(data, "nationalHalalReferenceStandard")} error={errors.nationalHalalReferenceStandard} onChange={updateField} />
                        <InputField field={{ key: "coveredProductCategories", label: "تصنيف المنتجات المغطاة في مجال منح الشهادة", type: "textarea", required: true }} value={fieldValue(data, "coveredProductCategories")} error={errors.coveredProductCategories} onChange={updateField} />
                      </motion.div>
                    )}
                    {data.grantsNationalHalalCertificate === NO && (
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        <RadioGroupYesNo
                          label="هل توجد جهات وطنية أخرى تقوم بمنح شهادة الحلال؟"
                          value={data.hasOtherNationalHalalBodies}
                          error={errors.hasOtherNationalHalalBodies}
                          onChange={(value) => updateField("hasOtherNationalHalalBodies", value)}
                        />
                        {data.hasOtherNationalHalalBodies === YES && (
                          <InputField field={{ key: "otherNationalHalalBodiesNames", label: "أسماء هذه الجهات", type: "textarea", required: true }} value={fieldValue(data, "otherNationalHalalBodiesNames")} error={errors.otherNationalHalalBodiesNames} onChange={updateField} />
                        )}
                      </motion.div>
                    )}
                  </div>
                </SectionGroup>
              )}

              {activeStep === 5 && (
                <SectionGroup title="شهادات أخرى تمنحها الجهة">
                  <div className="space-y-9">
                    <RadioGroupYesNo
                      label="هل تمنح الجهة شهادات أخرى (مثل أنظمة إدارة الجودة ISO، شهادات منتجات... إلخ)؟"
                      value={data.grantsOtherCertificates}
                      error={errors.grantsOtherCertificates}
                      onChange={(value) => updateField("grantsOtherCertificates", value)}
                    />
                    {data.grantsOtherCertificates === YES && (
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8">
                        <InputField field={{ key: "otherCertificatesNames", label: "ما هي هذه الشهادات؟", type: "textarea", required: true }} value={fieldValue(data, "otherCertificatesNames")} error={errors.otherCertificatesNames} onChange={updateField} />
                        <InputField field={{ key: "otherCertificatesReferenceStandards", label: "المواصفات المرجعية لهذه الشهادات", type: "textarea", required: true }} value={fieldValue(data, "otherCertificatesReferenceStandards")} error={errors.otherCertificatesReferenceStandards} onChange={updateField} />
                        <InputField field={{ key: "otherCertificatesScope", label: "مجال منح هذه الشهادات بالتفصيل", type: "textarea", required: true }} value={fieldValue(data, "otherCertificatesScope")} error={errors.otherCertificatesScope} onChange={updateField} />
                      </motion.div>
                    )}
                  </div>
                </SectionGroup>
              )}

              {activeStep === 6 && (
                <div className="space-y-12">
                  <SectionGroup title="الشروط والتوضيحات القانونية">
                    <div className="space-y-4">
                      {conditions.map((condition, index) => (
                        <div key={condition} className="flex gap-5 rounded-[1.25rem] border border-stone-100 bg-white p-5 shadow-sm transition-all hover:bg-stone-50/30 hover:shadow-md group">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-[12px] font-black text-white transition-transform group-hover:scale-110">
                            {index + 1}
                          </span>
                          <p className="text-[15px] font-bold leading-relaxed text-stone-700">{condition}</p>
                        </div>
                      ))}
                    </div>
                    <label className={`mt-8 flex cursor-pointer items-start gap-5 rounded-[1.5rem] border-2 p-6 transition-all duration-500 ${
                      data.applicantAcknowledgement 
                        ? "border-[#007A55] bg-[#007A55]/5 shadow-[0_20px_40px_-12px_rgba(0,122,85,0.1)]" 
                        : "border-stone-100 bg-white hover:border-stone-200"
                    }`}>
                      <div className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                        data.applicantAcknowledgement ? "border-[#007A55] bg-[#007A55] text-white" : "border-stone-200 bg-white"
                      }`}>
                        {data.applicantAcknowledgement && (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={Boolean(data.applicantAcknowledgement)}
                        onChange={(event) => updateField("applicantAcknowledgement", event.target.checked)}
                        className="sr-only"
                      />
                      <span className="text-[15px] font-black leading-relaxed text-stone-900">
                        أقر بصحة جميع المعلومات المقدمة في هذا الطلب، وأوافق تماماً على الشروط والتوضيحات القانونية المذكورة أعلاه.
                      </span>
                    </label>
                    <AnimatePresence>
                      {errors.applicantAcknowledgement && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 text-sm font-black text-red-600"
                        >
                          {errors.applicantAcknowledgement}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </SectionGroup>

                  <SectionGroup title="التوقيع والختم الرسمي">
                    <div className="grid gap-x-10 gap-y-10 lg:grid-cols-2">
                      <InputField field={{ key: "signatureHeadName", label: "اسم رئيس الجهة المعنية بالحلال", required: true }} value={fieldValue(data, "signatureHeadName")} error={errors.signatureHeadName} onChange={updateField} />
                      <InputField field={{ key: "signatureDate", label: "تاريخ الطلب", type: "date", required: true }} value={fieldValue(data, "signatureDate")} error={errors.signatureDate} onChange={updateField} />
                      <FileUploadBox label="صورة التوقيع" helper="يرجى إرفاق صورة واضحة للتوقيع (PNG, JPG, PDF)" value={data.signature ? [String(data.signature)] : []} onChange={(files) => updateField("signature", files[0] ?? null)} />
                      <FileUploadBox label="الختم الرسمي للجهة" helper="يرجى إرفاق صورة واضحة للختم الرسمي (PNG, JPG, PDF)" value={data.officialSeal ? [String(data.officialSeal)] : []} onChange={(files) => updateField("officialSeal", files[0] ?? null)} />
                      <div className="lg:col-span-2">
                        <InputField field={{ key: "additionalNotes", label: "ملاحظات أو تعليقات إضافية", type: "textarea" }} value={fieldValue(data, "additionalNotes")} onChange={updateField} />
                      </div>
                    </div>
                  </SectionGroup>
                </div>
              )}
            </QuestionStage>
          )}
        </AnimatePresence>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200/60 bg-white/80 px-5 py-5 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={saveDraft}
                className="group flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-[13px] font-black text-stone-600 shadow-sm transition-all hover:border-[#007A55] hover:text-[#007A55] active:scale-95"
              >
                <svg className="h-4 w-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span>حفظ المسودة</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goPrevious}
                disabled={activeStep === 0 && !showReview}
                className="inline-flex h-12 min-w-[110px] items-center justify-center rounded-xl border-2 border-stone-200 bg-white px-7 text-[14px] font-black text-stone-900 transition-all hover:border-stone-400 hover:bg-stone-50 disabled:opacity-20 active:scale-95"
              >
                السابق
              </button>
              {showReview ? (
                <button
                  type="button"
                  onClick={submitApplication}
                  disabled={submitted}
                  className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl bg-[#007A55] px-8 text-[14px] font-black text-white shadow-[0_20px_40px_-12px_rgba(0,122,85,0.4)] transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
                >
                  إرسال الطلب الآن
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-xl bg-[#007A55] px-8 text-[14px] font-black text-white shadow-[0_20px_40px_-12px_rgba(0,122,85,0.4)] transition-all hover:brightness-110 active:scale-95"
                >
                  {activeStep === steps.length - 1 ? "مراجعة الطلب" : "المرحلة التالية"}
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>
      <ChatbotWidget
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
        bubblePlacement="top"
        bubbleTextOverride="يمكنني مساعدتك في تعبئة هذا النموذج خطوة بخطوة."
      />
    </main>
  );
}
