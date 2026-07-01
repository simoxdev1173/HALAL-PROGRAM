import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { House } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChatbotWidget } from "../components/ChatbotWidget";
import { FormLanguageSwitcher } from "../components/FormLanguageSwitcher";

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

const joinEnglish = {
  steps: [
    { title: "Authority Information", microcopy: "Provide the organization's official registered information as it appears in approved records." },
    { title: "Senior Management", microcopy: "Contact details for the head of the authority or the primary official responsible for the Halal file." },
    { title: "Contact Officer", microcopy: "Identify the authorized person for direct coordination and follow-up with the Arab Halal Program team." },
    { title: "Report and Documents", microcopy: "Upload technical reports and required documents for readiness and compliance assessment." },
    { title: "National Halal Certificates", microcopy: "Details of existing national Halal certification systems and current reference standards." },
    { title: "Other Certificates", microcopy: "Disclose any quality or compliance certificates granted by the authority in other technical or administrative fields." },
    { title: "Declaration and Review", microcopy: "Final review of all entered information and signature on the required legal commitments." },
  ],
  fields: {
    organizationNameAr: "Halal authority registered name in Arabic",
    organizationNameEn: "Halal authority registered name in English",
    organizationAddressAr: "Halal authority registered postal address in Arabic",
    organizationAddressEn: "Halal authority registered postal address in English",
    country: "Country",
    phone: "Telephone number",
    fax: "Fax number",
    website: "Website",
    email: "Email",
    headName: "Head of Halal authority name",
    headEmail: "Head email",
    headMobile: "Head mobile number",
    contactOfficerName: "Contact officer name",
    contactOfficerEmail: "Contact officer email",
    contactOfficerMobile: "Contact officer mobile number",
    signatureHeadName: "Head of Halal authority name",
    signatureDate: "Application date",
    additionalNotes: "Additional notes or comments",
    nationalHalalCertificateName: "Name of the national Halal certificate",
    nationalHalalReferenceStandard: "Approved reference standard",
    coveredProductCategories: "Product categories covered by the certificate scope",
    otherNationalHalalBodiesNames: "Names of these authorities",
    otherCertificatesNames: "What are these certificates?",
    otherCertificatesReferenceStandards: "Reference standards for these certificates",
    otherCertificatesScope: "Scope of granting these certificates in detail",
    otherDocumentsDescription: "Description of these documents",
  } satisfies Record<string, string>,
  reportChecklist: {
    orgStructureIncluded: "Organizational structure of the Halal authority, showing the responsibilities and duties of staff involved in certificate granting.",
    technicalHumanCapacityIncluded: "Technical and human capabilities in the field of certificate granting.",
    inspectorsTrainingProceduresIncluded: "Manual or procedures for selecting and training inspectors and auditors.",
    approvedInspectorsAuditorsListIncluded: "List of approved inspectors and auditors.",
    halalCertificateIssuingProceduresIncluded: "Procedures for issuing Halal certificates according to ISO/IEC 17065 and AIDSMO 3042 requirements.",
    documentRecordsProceduresIncluded: "Procedures for documenting records and documents.",
    nationalHalalCertificatesLast12MonthsIncluded: "Record of national Halal certificates issued during the last 12 months, when the Halal authority grants national Halal certificates.",
    suppliersFacilitiesProductsListIncluded: "List of suppliers, facilities, factories, companies, and products supervised in the Halal sector, when the Halal authority grants national Halal certificates.",
  } satisfies Record<string, string>,
  attachments: {
    firstApplicationReportFiles: "Upload the report or supporting documents",
    firstApplicationReportHelper: "PDF, DOC, DOCX, JPG, PNG (maximum 10 MB per file)",
    accreditationCertificatesCopy: "Copy of accreditation certificates",
    accreditationCertificatesFiles: "Upload files for accreditation certificates",
    appointmentDesignationCopy: "Copy of the designation appointment",
    appointmentDesignationFiles: "Upload files for the designation appointment",
    otherDocuments: "Other documents",
    otherDocumentsPlaceholder: "Please provide a brief description of the additional documents...",
    otherDocumentsFiles: "Upload additional documents",
  },
  questions: {
    grantsNationalHalalCertificate: "Does the Halal authority currently grant a national Halal certificate?",
    hasOtherNationalHalalBodies: "Are there other national authorities that grant Halal certificates?",
    grantsOtherCertificates: "Does the authority grant other certificates, such as quality management systems, product certificates, or similar certificates?",
  },
  legal: {
    conditions: [
      "The Arab Industrial Development, Standardization and Mining Organization notifies the Halal authority of the application review result within one month from the date the application is received.",
      "The Arab Industrial Development, Standardization and Mining Organization maintains the confidentiality of information, documents, and attachments related to the application.",
      "The applicant authority seeking approval to operate the Arab Halal Program commits to implementing the requirements stated in the program.",
      "If the application is accepted, both parties commit to signing the Technical Cooperation Document, Annex 5 of the Arab Halal Program, and complying with its legal and financial provisions.",
    ],
    acknowledgement: "I confirm that all information provided in this application is correct, and I fully agree to the legal terms and clarifications stated above.",
  },
  reviewLabels: {
    firstApplicationReportFiles: "Report or supporting documents",
    accreditationCertificatesFiles: "Accreditation certificate files",
    appointmentDesignationFiles: "Designation appointment files",
    otherDocumentsDescription: "Other document description",
    otherDocumentsFiles: "Other document files",
    nationalHalalCertificateName: "Certificate name",
    nationalHalalReferenceStandard: "Reference standard",
    coveredProductCategories: "Covered product categories",
    hasOtherNationalHalalBodies: "Other national Halal certification authorities",
    otherNationalHalalBodiesNames: "Names of other authorities",
    applicantAcknowledgement: "Terms acknowledgement",
    signature: "Signature",
    officialSeal: "Official seal",
  },
  sections: {
    general: "General Information",
    management: "Senior Management Information",
    contact: "Contact Officer Information",
    contactHelper: "Please identify a person who represents the Halal authority for direct communication.",
    report: "Phase One Report",
    reportHelper: "For first-time applications, please select available documents and attach supporting files.",
    attachments: "Documents Attached with the Application",
    national: "National Halal Certificates",
    otherCertificates: "Other Certificates Granted by the Authority",
    legal: "Legal Terms and Clarifications",
    signature: "Signature and Official Seal",
  },
  ui: {
    back: "Back to platform",
    portal: "Application Portal",
    saveDraft: "Save draft",
    previous: "Previous",
    next: "Next step",
    review: "Review application",
    submit: "Submit application now",
    editSection: "Edit section",
    finalReview: "Final review before submission",
    confirmData: "Verify the information",
    reviewIntro: "Please review all information and attached documents before pressing the final submit button.",
    uploadClick: "Click to upload files",
    noFiles: "No files attached",
    notAttached: "Not attached",
    notEntered: "Not entered",
    yes: "Yes",
    no: "No",
    signatureImage: "Signature image",
    officialSeal: "Authority official seal",
    signatureHelper: "Attach a clear signature image (PNG, JPG, PDF)",
    sealHelper: "Attach a clear official seal image (PNG, JPG, PDF)",
    botHelp: "I can help you fill out this form step by step.",
    required: "This field is required.",
    invalidEmail: "Please enter a valid email address.",
    invalidUrl: "Please enter a URL that starts with http or https.",
    invalidPhone: "Please enter a valid phone number.",
    successTitle: "Your application has been submitted successfully",
    successText: "The Arab Halal Program team will contact you by email soon.",
  },
};

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

function validateFields(keys: string[], data: FormData, lang: "ar" | "en" = "ar") {
  const nextErrors: Errors = {};
  const messages = {
    required: lang === "ar" ? "هذا الحقل مطلوب." : joinEnglish.ui.required,
    invalidEmail: lang === "ar" ? "يرجى إدخال بريد إلكتروني صحيح." : joinEnglish.ui.invalidEmail,
    invalidUrl: lang === "ar" ? "يرجى إدخال رابط يبدأ بـ http أو https." : joinEnglish.ui.invalidUrl,
    invalidPhone: lang === "ar" ? "يرجى إدخال رقم هاتف صحيح." : joinEnglish.ui.invalidPhone,
  };

  keys.forEach((key) => {
    const value = data[key];
    if (!isFilled(value)) nextErrors[key] = messages.required;
  });

  Object.keys(data).forEach((key) => {
    const value = String(data[key] ?? "");
    if (emailFields.has(key) && value && !isEmail(value)) nextErrors[key] = messages.invalidEmail;
    if (urlFields.has(key) && value && !isUrl(value)) nextErrors[key] = messages.invalidUrl;
    if (phoneFields.has(key) && value && !isPhone(value)) nextErrors[key] = messages.invalidPhone;
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

function formatValue(value: FormValue, lang: "ar" | "en" = "ar") {
  if (Array.isArray(value)) return value.length ? value.join(lang === "ar" ? "، " : ", ") : (lang === "ar" ? "لم يتم إرفاق ملفات" : joinEnglish.ui.noFiles);
  if (typeof value === "boolean") return value ? (lang === "ar" ? "نعم" : joinEnglish.ui.yes) : (lang === "ar" ? "لا" : joinEnglish.ui.no);
  if (value === null) return lang === "ar" ? "غير مرفق" : joinEnglish.ui.notAttached;
  if (lang === "en" && value === YES) return joinEnglish.ui.yes;
  if (lang === "en" && value === NO) return joinEnglish.ui.no;
  return String(value || (lang === "ar" ? "غير مدخل" : joinEnglish.ui.notEntered));
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
  const baseClass = `w-full scroll-mt-32 rounded-xl border bg-white px-4 py-3.5 text-[15px] font-medium text-[#0C111D] shadow-[var(--shadow-premium-sm)] outline-none transition-all duration-200 placeholder:text-stone-400 focus:border-[#007A55] focus:ring-4 focus:ring-[#007A55]/10 ${
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
          className={`${baseClass} min-h-24 resize-y leading-relaxed`}
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
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("en") ? "en" : "ar";
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
          <span className="block text-[13px] font-bold text-stone-900">{lang === "ar" ? "اضغط لرفع الملفات" : joinEnglish.ui.uploadClick}</span>
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
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("en") ? "en" : "ar";
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
              <span className="text-[15px] font-bold">{lang === "ar" ? option : option === YES ? joinEnglish.ui.yes : joinEnglish.ui.no}</span>
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
  stepItems,
  children,
}: {
  stepIndex: number;
  stepItems: typeof steps;
  children: ReactNode;
}) {
  const step = stepItems[stepIndex];
  return (
    <motion.section
      key={stepIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-[58rem] px-4 py-5 sm:px-5 sm:py-6 lg:px-8"
    >
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-black leading-tight text-stone-900 md:text-3xl">{step.title}</h1>
        <p className="max-w-2xl text-[14px] font-bold leading-7 text-stone-800">{step.microcopy}</p>
      </div>
      <div className="space-y-6">{children}</div>
    </motion.section>
  );
}

function SectionGroup({ title, helper, children }: { title?: string; helper?: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      {(title || helper) && (
        <div className="space-y-1.5">
          {title && <h2 className="text-lg font-black text-stone-900">{title}</h2>}
          {helper && <p className="text-[14px] font-bold leading-7 text-stone-800">{helper}</p>}
        </div>
      )}
      <div className="relative overflow-hidden rounded-2xl border border-[#D6B66A]/35 bg-[#FFF8E8]/94 p-6 shadow-[0_18px_50px_-28px_rgba(78,60,24,0.35)] ring-1 ring-white/80 backdrop-blur-xl md:p-8">
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </section>
  );
}

function StepRail({
  activeStep,
  completed,
  onJump,
  stepItems,
  isRtl,
}: {
  activeStep: number;
  completed: Set<number>;
  onJump: (step: number) => void;
  stepItems: typeof steps;
  isRtl: boolean;
}) {
  return (
    <nav aria-label={isRtl ? "مراحل الطلب" : "Application steps"} className="sticky top-0 z-40 border-b border-[#D6B66A]/30 bg-[#FFFDF6]/90 backdrop-blur-2xl">
      <div className="mx-auto max-w-5xl px-5 pb-10 pt-5 lg:px-8">
        <div className="relative flex justify-between">
          <div className="absolute top-1/2 inset-x-0 h-1 -translate-y-1/2 bg-stone-100 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full bg-[#007A55] ${isRtl ? "origin-right" : "origin-left"}`}
              initial={false}
              animate={{ scaleX: activeStep / (steps.length - 1) }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          {stepItems.map((step, index) => {
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
                <span className={`absolute top-14 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] shadow-sm ring-1 ring-stone-200/70 transition-all duration-300 ${
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

function ReviewCard({ group, onEdit, lang }: { group: ReviewGroup; onEdit: (step: number) => void; lang: "ar" | "en" }) {
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
          {lang === "ar" ? "تعديل القسم" : joinEnglish.ui.editSection}
        </button>
      </div>
      <div className="p-8">
        <dl className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {group.items.map((item) => (
            <div key={item.label} className="space-y-2 border-r-2 border-stone-50 pr-4">
              <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">{item.label}</dt>
              <dd className="text-[15px] font-bold text-stone-900 leading-relaxed">{formatValue(item.value, lang)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.section>
  );
}

export default function JoinProgram() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("en") ? "en" : "ar";
  const isRtl = lang === "ar";
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [data, setData] = useState<FormData>(() => loadInitialData());
  const [errors, setErrors] = useState<Errors>({});
  const [showReview, setShowReview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [, setLastSavedAt] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const localizedSteps = isRtl ? steps : joinEnglish.steps;
  const localizeField = useCallback((field: FieldConfig): FieldConfig => ({
    ...field,
    label: isRtl ? field.label : (joinEnglish.fields as Record<string, string>)[field.key] ?? field.label,
  }), [isRtl]);
  const labelFor = useCallback((key: string, fallback: string) => (
    isRtl ? fallback : (joinEnglish.fields as Record<string, string>)[key] ?? (joinEnglish.reviewLabels as Record<string, string>)[key] ?? fallback
  ), [isRtl]);
  const reportLabel = useCallback((item: { key: string; label: string }) => (
    isRtl ? item.label : (joinEnglish.reportChecklist as Record<string, string>)[item.key] ?? item.label
  ), [isRtl]);
  const attachmentLabel = useCallback((key: keyof typeof joinEnglish.attachments, fallback: string) => (
    isRtl ? fallback : joinEnglish.attachments[key]
  ), [isRtl]);
  const questionLabel = useCallback((key: keyof typeof joinEnglish.questions, fallback: string) => (
    isRtl ? fallback : joinEnglish.questions[key]
  ), [isRtl]);
  const displayedConditions = isRtl ? conditions : joinEnglish.legal.conditions;

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
      return;
    }
    setActiveStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const goPrevious = () => {
    if (showReview) {
      setShowReview(false);
      return;
    }
    setActiveStep((step) => Math.max(step - 1, 0));
  };

  const saveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setLastSavedAt(new Intl.DateTimeFormat("ar", { hour: "2-digit", minute: "2-digit" }).format(new Date()));
  };

  const submitApplication = () => {
    const allRequired = steps.flatMap((_, index) => getRequiredFields(index, data));
    const allVisible = steps.flatMap((_, index) => getStepFieldKeys(index, data));
    const allErrors = validateFields(allRequired, data, lang);
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
        title: isRtl ? "معلومات الجهة" : joinEnglish.steps[0].title,
        step: 0,
        items: organizationFields.map((field) => ({ label: localizeField(field).label, value: data[field.key] })),
      },
      {
        title: isRtl ? "الإدارة العليا" : joinEnglish.steps[1].title,
        step: 1,
        items: managementFields.map((field) => ({ label: localizeField(field).label, value: data[field.key] })),
      },
      {
        title: isRtl ? "ضابط الاتصال" : joinEnglish.steps[2].title,
        step: 2,
        items: contactFields.map((field) => ({ label: localizeField(field).label, value: data[field.key] })),
      },
      {
        title: isRtl ? "التقرير والوثائق" : joinEnglish.steps[3].title,
        step: 3,
        items: [
          ...reportChecklist.map((item) => ({ label: reportLabel(item), value: data[item.key] })),
          { label: attachmentLabel("firstApplicationReportFiles", "تحميل التقرير أو الوثائق الداعمة"), value: data.firstApplicationReportFiles },
          { label: attachmentLabel("accreditationCertificatesCopy", "نسخة عن شهادات الاعتماد"), value: data.accreditationCertificatesCopy },
          { label: attachmentLabel("accreditationCertificatesFiles", "ملفات شهادات الاعتماد"), value: data.accreditationCertificatesFiles },
          { label: attachmentLabel("appointmentDesignationCopy", "نسخة عن التكليف بالتعيين"), value: data.appointmentDesignationCopy },
          { label: attachmentLabel("appointmentDesignationFiles", "ملفات التكليف بالتعيين"), value: data.appointmentDesignationFiles },
          { label: attachmentLabel("otherDocuments", "أخرى"), value: data.otherDocuments },
          { label: labelFor("otherDocumentsDescription", "وصف الوثائق الأخرى"), value: data.otherDocumentsDescription },
          { label: attachmentLabel("otherDocumentsFiles", "ملفات الوثائق الأخرى"), value: data.otherDocumentsFiles },
        ],
      },
      {
        title: isRtl ? "شهادات الحلال الوطنية" : joinEnglish.steps[4].title,
        step: 4,
        items: [
          { label: questionLabel("grantsNationalHalalCertificate", "هل تمنح الجهة المعنية بالحلال شهادة حلال وطنية؟"), value: data.grantsNationalHalalCertificate },
          { label: labelFor("nationalHalalCertificateName", "ما هي؟"), value: data.nationalHalalCertificateName },
          { label: labelFor("nationalHalalReferenceStandard", "ما هي المواصفة المرجعية لها؟"), value: data.nationalHalalReferenceStandard },
          { label: labelFor("coveredProductCategories", "ذكر تصنيف المنتجات المغطاة في مجال منح الشهادات التي تمنحها جهة منح الشهادات"), value: data.coveredProductCategories },
          { label: questionLabel("hasOtherNationalHalalBodies", "هل توجد جهات معينة تقوم بمنح شهادة الحلال الوطنية؟"), value: data.hasOtherNationalHalalBodies },
          { label: labelFor("otherNationalHalalBodiesNames", "الرجاء ذكر أسماء هذه الجهات"), value: data.otherNationalHalalBodiesNames },
        ],
      },
      {
        title: isRtl ? "شهادات أخرى" : joinEnglish.steps[5].title,
        step: 5,
        items: [
          { label: questionLabel("grantsOtherCertificates", "هل تمنح الجهة المعنية بالحلال شهادات أخرى، مثل أنظمة إدارة، منتجات، أو غيرها؟"), value: data.grantsOtherCertificates },
          { label: labelFor("otherCertificatesNames", "ما هي؟"), value: data.otherCertificatesNames },
          { label: labelFor("otherCertificatesReferenceStandards", "ما هي المواصفة المرجعية لها؟"), value: data.otherCertificatesReferenceStandards },
          { label: labelFor("otherCertificatesScope", "الرجاء ذكر مجال منح الشهادات"), value: data.otherCertificatesScope },
        ],
      },
      {
        title: isRtl ? "الإقرار والتوقيع" : joinEnglish.steps[6].title,
        step: 6,
        items: [
          { label: labelFor("applicantAcknowledgement", "الإقرار بالشروط"), value: data.applicantAcknowledgement },
          { label: labelFor("signatureHeadName", "اسم رئيس الجهة المعنية بالحلال"), value: data.signatureHeadName },
          { label: labelFor("signatureDate", "التاريخ"), value: data.signatureDate },
          { label: labelFor("signature", "التوقيع"), value: data.signature },
          { label: labelFor("officialSeal", "الختم الرسمي"), value: data.officialSeal },
          { label: labelFor("additionalNotes", "ملاحظات أخرى"), value: data.additionalNotes },
        ],
      },
    ],
    [attachmentLabel, data, isRtl, labelFor, localizeField, questionLabel, reportLabel]
  );

  return (
    <main
      id="join-application"
      className={`relative min-h-screen bg-[#FDFDFD] text-stone-900 selection:bg-[#007A55]/10 selection:text-[#007A55] ${isRtl ? "font-arabic" : "font-english"}`}
      dir={isRtl ? "rtl" : "ltr"}
      onKeyDown={handleStageKeyDown}
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F7F1E3]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-28"
          style={{ backgroundImage: "url('/header-bg.png')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,250,238,0.97)_0%,rgba(250,242,220,0.88)_45%,rgba(232,238,235,0.76)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(89,111,105,0.22) 1px, transparent 1px), linear-gradient(rgba(202,138,4,0.2) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#CA8A04]/18 to-transparent opacity-45" />
      </div>
      
      <header className="relative z-10 border-b border-[#D6B66A]/30 bg-[#FFFDF6]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3.5 lg:px-8">
          <div className="flex items-center gap-6">
            <img src="/logo.svg" alt={isRtl ? "شعار البرنامج العربي للحلال" : "Arab Halal Program logo"} className="h-14 w-14 object-contain drop-shadow-xl transition-transform hover:scale-110 duration-500 sm:h-16 sm:w-16" />
            <div className="hidden h-11 w-px bg-stone-200 sm:block" />
            <div className="space-y-1 hidden sm:block">
              <h1 className="text-xl font-black tracking-tight text-stone-900">{isRtl ? "منصة تقديم الطلبات" : joinEnglish.ui.portal}</h1>
           
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FormLanguageSwitcher />
            <Link
              to="/"
              className="group flex items-center gap-3 rounded-xl border-2 border-stone-100 bg-white px-4 py-3 text-[13px] font-black text-stone-600 shadow-sm transition-all hover:border-[#007A55] hover:text-[#007A55] hover:shadow-xl active:scale-95 sm:px-6"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-50 transition-colors group-hover:bg-[#007A55]/10">
                <House size={20} className="transition-transform duration-300 group-hover:-translate-y-1" />
              </div>
              <span className="hidden sm:inline">{isRtl ? "الرجوع للمنصة" : joinEnglish.ui.back}</span>
            </Link>
          </div>
        </div>
      </header>

      <StepRail
        activeStep={activeStep}
        completed={completedSteps}
        stepItems={localizedSteps}
        isRtl={isRtl}
        onJump={(step) => {
          setShowReview(false);
          setActiveStep(step);
        }}
      />

      <div className="relative z-10 pb-32">
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
                  {isRtl ? "مراجعة نهائية قبل الإرسال" : joinEnglish.ui.finalReview}
                </div>
                <h1 className="text-4xl font-black text-stone-900 md:text-6xl tracking-tighter">{isRtl ? "تأكد من البيانات" : joinEnglish.ui.confirmData}</h1>
                <p className="max-w-2xl text-[17px] font-medium leading-relaxed text-stone-500">
                  {isRtl ? "يرجى مراجعة كافة المعلومات والوثائق المرفقة قبل الضغط على زر الإرسال النهائي." : joinEnglish.ui.reviewIntro}
                </p>
              </div>
              <div className="grid gap-8">
                {reviewGroups.map((group) => (
                  <ReviewCard
                    key={group.title}
                    group={group}
                    lang={lang}
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
                    <h2 className="mb-4 text-3xl font-black">{isRtl ? "تم إرسال طلبك بنجاح" : joinEnglish.ui.successTitle}</h2>
                    <p className="text-lg font-bold opacity-90">{isRtl ? "سيتواصل معك فريق البرنامج العربي للحلال عبر البريد الإلكتروني قريباً." : joinEnglish.ui.successText}</p>
                  </div>
                </motion.div>
              )}
            </motion.section>
          ) : (
            <QuestionStage key={activeStep} stepIndex={activeStep} stepItems={localizedSteps}>
              {activeStep === 0 && (
                <SectionGroup title={isRtl ? "معلومات عامة" : joinEnglish.sections.general}>
                  <div className="grid gap-x-8 gap-y-8 lg:grid-cols-2">
                    {organizationFields.map((field) => (
                      <InputField
                        key={field.key}
                        field={localizeField(field)}
                        value={fieldValue(data, field.key)}
                        error={errors[field.key]}
                        onChange={updateField}
                      />
                    ))}
                  </div>
                </SectionGroup>
              )}

              {activeStep === 1 && (
                <SectionGroup title={isRtl ? "معلومات الإدارة العليا" : joinEnglish.sections.management}>
                  <div className="grid gap-x-8 gap-y-8 lg:grid-cols-3">
                    {managementFields.map((field) => (
                      <InputField
                        key={field.key}
                        field={localizeField(field)}
                        value={fieldValue(data, field.key)}
                        error={errors[field.key]}
                        onChange={updateField}
                      />
                    ))}
                  </div>
                </SectionGroup>
              )}

              {activeStep === 2 && (
                <SectionGroup title={isRtl ? "معلومات ضابط الاتصال" : joinEnglish.sections.contact} helper={isRtl ? "يرجى تحديد شخص يمثل الجهة المعنية بالحلال للتواصل معه بشكل مباشر." : joinEnglish.sections.contactHelper}>
                  <div className="grid gap-x-8 gap-y-8 lg:grid-cols-3">
                    {contactFields.map((field) => (
                      <InputField
                        key={field.key}
                        field={localizeField(field)}
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
                  <SectionGroup title={isRtl ? "تقرير المرحلة الأولى" : joinEnglish.sections.report} helper={isRtl ? "في حال التقديم لأول مرة، يرجى تحديد الوثائق المتوفرة وإرفاق الملفات الداعمة." : joinEnglish.sections.reportHelper}>
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
                          <span className="text-[15px] font-bold leading-relaxed text-stone-800">{reportLabel(item)}</span>
                        </label>
                      ))}
                    </div>
                    <div className="pt-4">
                      <FileUploadBox
                        label={attachmentLabel("firstApplicationReportFiles", "تحميل التقرير أو الوثائق الداعمة")}
                        helper={isRtl ? "PDF, DOC, DOCX, JPG, PNG (حد أقصى 10 ميجابايت للملف)" : joinEnglish.attachments.firstApplicationReportHelper}
                        value={(data.firstApplicationReportFiles as string[]) ?? []}
                        onChange={(files) => updateField("firstApplicationReportFiles", files)}
                      />
                    </div>
                  </SectionGroup>

                  <SectionGroup title={isRtl ? "الوثائق المرفقة مع الطلب" : joinEnglish.sections.attachments}>
                    <div className="grid gap-6 lg:grid-cols-2">
                      {[
                        { key: "accreditationCertificatesCopy", label: attachmentLabel("accreditationCertificatesCopy", "نسخة عن شهادات الاعتماد"), upload: "accreditationCertificatesFiles" },
                        { key: "appointmentDesignationCopy", label: attachmentLabel("appointmentDesignationCopy", "نسخة عن التكليف بالتعيين"), upload: "appointmentDesignationFiles" },
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
                            label={isRtl ? `تحميل الملفات الخاصة بـ ${item.label}` : attachmentLabel(item.upload as keyof typeof joinEnglish.attachments, item.label)}
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
                          <span className="text-[15px] font-black text-stone-900">{attachmentLabel("otherDocuments", "وثائق أخرى")}</span>
                        </label>
                        <div className="grid gap-8 lg:grid-cols-2">
                          <InputField
                            field={localizeField({ key: "otherDocumentsDescription", label: "وصف هذه الوثائق", type: "textarea", placeholder: isRtl ? "يرجى تقديم وصف موجز للوثائق الإضافية..." : joinEnglish.attachments.otherDocumentsPlaceholder })}
                            value={fieldValue(data, "otherDocumentsDescription")}
                            onChange={updateField}
                          />
                          <FileUploadBox
                            label={attachmentLabel("otherDocumentsFiles", "تحميل الوثائق الإضافية")}
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
                <SectionGroup title={isRtl ? "شهادات الحلال الوطنية" : joinEnglish.sections.national}>
                  <div className="space-y-9">
                    <RadioGroupYesNo
                      label={questionLabel("grantsNationalHalalCertificate", "هل تمنح الجهة المعنية بالحلال حالياً شهادة حلال وطنية؟")}
                      value={data.grantsNationalHalalCertificate}
                      error={errors.grantsNationalHalalCertificate}
                      onChange={(value) => updateField("grantsNationalHalalCertificate", value)}
                    />
                    {data.grantsNationalHalalCertificate === YES && (
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8">
                        <InputField field={localizeField({ key: "nationalHalalCertificateName", label: "اسم الشهادة الوطنية", type: "textarea", required: true })} value={fieldValue(data, "nationalHalalCertificateName")} error={errors.nationalHalalCertificateName} onChange={updateField} />
                        <InputField field={localizeField({ key: "nationalHalalReferenceStandard", label: "المواصفة المرجعية المعتمدة", type: "textarea", required: true })} value={fieldValue(data, "nationalHalalReferenceStandard")} error={errors.nationalHalalReferenceStandard} onChange={updateField} />
                        <InputField field={localizeField({ key: "coveredProductCategories", label: "تصنيف المنتجات المغطاة في مجال منح الشهادة", type: "textarea", required: true })} value={fieldValue(data, "coveredProductCategories")} error={errors.coveredProductCategories} onChange={updateField} />
                      </motion.div>
                    )}
                    {data.grantsNationalHalalCertificate === NO && (
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        <RadioGroupYesNo
                          label={questionLabel("hasOtherNationalHalalBodies", "هل توجد جهات وطنية أخرى تقوم بمنح شهادة الحلال؟")}
                          value={data.hasOtherNationalHalalBodies}
                          error={errors.hasOtherNationalHalalBodies}
                          onChange={(value) => updateField("hasOtherNationalHalalBodies", value)}
                        />
                        {data.hasOtherNationalHalalBodies === YES && (
                          <InputField field={localizeField({ key: "otherNationalHalalBodiesNames", label: "أسماء هذه الجهات", type: "textarea", required: true })} value={fieldValue(data, "otherNationalHalalBodiesNames")} error={errors.otherNationalHalalBodiesNames} onChange={updateField} />
                        )}
                      </motion.div>
                    )}
                  </div>
                </SectionGroup>
              )}

              {activeStep === 5 && (
                <SectionGroup title={isRtl ? "شهادات أخرى تمنحها الجهة" : joinEnglish.sections.otherCertificates}>
                  <div className="space-y-9">
                    <RadioGroupYesNo
                      label={questionLabel("grantsOtherCertificates", "هل تمنح الجهة شهادات أخرى (مثل أنظمة إدارة الجودة ISO، شهادات منتجات... إلخ)؟")}
                      value={data.grantsOtherCertificates}
                      error={errors.grantsOtherCertificates}
                      onChange={(value) => updateField("grantsOtherCertificates", value)}
                    />
                    {data.grantsOtherCertificates === YES && (
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8">
                        <InputField field={localizeField({ key: "otherCertificatesNames", label: "ما هي هذه الشهادات؟", type: "textarea", required: true })} value={fieldValue(data, "otherCertificatesNames")} error={errors.otherCertificatesNames} onChange={updateField} />
                        <InputField field={localizeField({ key: "otherCertificatesReferenceStandards", label: "المواصفات المرجعية لهذه الشهادات", type: "textarea", required: true })} value={fieldValue(data, "otherCertificatesReferenceStandards")} error={errors.otherCertificatesReferenceStandards} onChange={updateField} />
                        <InputField field={localizeField({ key: "otherCertificatesScope", label: "مجال منح هذه الشهادات بالتفصيل", type: "textarea", required: true })} value={fieldValue(data, "otherCertificatesScope")} error={errors.otherCertificatesScope} onChange={updateField} />
                      </motion.div>
                    )}
                  </div>
                </SectionGroup>
              )}

              {activeStep === 6 && (
                <div className="space-y-12">
                  <SectionGroup title={isRtl ? "الشروط والتوضيحات القانونية" : joinEnglish.sections.legal}>
                    <div className="space-y-4">
                      {displayedConditions.map((condition, index) => (
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
                        {isRtl ? "أقر بصحة جميع المعلومات المقدمة في هذا الطلب، وأوافق تماماً على الشروط والتوضيحات القانونية المذكورة أعلاه." : joinEnglish.legal.acknowledgement}
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

                  <SectionGroup title={isRtl ? "التوقيع والختم الرسمي" : joinEnglish.sections.signature}>
                    <div className="grid gap-x-10 gap-y-10 lg:grid-cols-2">
                      <InputField field={localizeField({ key: "signatureHeadName", label: "اسم رئيس الجهة المعنية بالحلال", required: true })} value={fieldValue(data, "signatureHeadName")} error={errors.signatureHeadName} onChange={updateField} />
                      <InputField field={localizeField({ key: "signatureDate", label: "تاريخ الطلب", type: "date", required: true })} value={fieldValue(data, "signatureDate")} error={errors.signatureDate} onChange={updateField} />
                      <FileUploadBox label={isRtl ? "صورة التوقيع" : joinEnglish.ui.signatureImage} helper={isRtl ? "يرجى إرفاق صورة واضحة للتوقيع (PNG, JPG, PDF)" : joinEnglish.ui.signatureHelper} value={data.signature ? [String(data.signature)] : []} onChange={(files) => updateField("signature", files[0] ?? null)} />
                      <FileUploadBox label={isRtl ? "الختم الرسمي للجهة" : joinEnglish.ui.officialSeal} helper={isRtl ? "يرجى إرفاق صورة واضحة للختم الرسمي (PNG, JPG, PDF)" : joinEnglish.ui.sealHelper} value={data.officialSeal ? [String(data.officialSeal)] : []} onChange={(files) => updateField("officialSeal", files[0] ?? null)} />
                      <div className="lg:col-span-2">
                        <InputField field={localizeField({ key: "additionalNotes", label: "ملاحظات أو تعليقات إضافية", type: "textarea" })} value={fieldValue(data, "additionalNotes")} onChange={updateField} />
                      </div>
                    </div>
                  </SectionGroup>
                </div>
              )}
            </QuestionStage>
          )}
        </AnimatePresence>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D6B66A]/30 bg-[#FFFDF6]/90 px-5 py-3.5 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={saveDraft}
                className="group flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-[13px] font-black text-stone-600 shadow-sm transition-all hover:border-[#007A55] hover:text-[#007A55] active:scale-95"
              >
                <svg className="h-4 w-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span>{isRtl ? "حفظ المسودة" : joinEnglish.ui.saveDraft}</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goPrevious}
                disabled={activeStep === 0 && !showReview}
                className="inline-flex h-12 min-w-[110px] items-center justify-center rounded-xl border-2 border-stone-200 bg-white px-7 text-[14px] font-black text-stone-900 transition-all hover:border-stone-400 hover:bg-stone-50 disabled:opacity-20 active:scale-95"
              >
                {isRtl ? "السابق" : joinEnglish.ui.previous}
              </button>
              {showReview ? (
                <button
                  type="button"
                  onClick={submitApplication}
                  disabled={submitted}
                  className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl bg-[#007A55] px-8 text-[14px] font-black text-white shadow-[0_20px_40px_-12px_rgba(0,122,85,0.4)] transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
                >
                  {isRtl ? "إرسال الطلب الآن" : joinEnglish.ui.submit}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-xl bg-[#007A55] px-8 text-[14px] font-black text-white shadow-[0_20px_40px_-12px_rgba(0,122,85,0.4)] transition-all hover:brightness-110 active:scale-95"
                >
                  {activeStep === steps.length - 1 ? (isRtl ? "مراجعة الطلب" : joinEnglish.ui.review) : (isRtl ? "المرحلة التالية" : joinEnglish.ui.next)}
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
        bubbleTextOverride={isRtl ? "يمكنني مساعدتك في تعبئة هذا النموذج خطوة بخطوة." : joinEnglish.ui.botHelp}
      />
    </main>
  );
}

