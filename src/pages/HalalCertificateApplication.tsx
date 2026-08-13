import { useMemo, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, FileUp, House, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormLanguageSwitcher } from "../components/FormLanguageSwitcher";
import { SignaturePad, signatureDataUrlToFile } from "../components/SignaturePad";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { submitCertificateApplication } from "../lib/api";
import { CERTIFICATE_APPLICATION_PRINT_SESSION_KEY } from "../lib/certificateApplicationPrint";
import { countryIsoCode } from "../lib/countryCodes";

type YesNo = "" | "نعم" | "لا";
type CompanyNature = "" | "مصنعة" | "موردة";
type ApplicationPurpose = "arab_halal_certificate" | "arab_halal_mark";
type AttachmentKey =
  | "nationalHalalCertificate"
  | "finalProductTestCertificate"
  | "rawMaterialTestCertificates"
  | "qualityOrNationalConformityCertificate"
  | "factoryLicense"
  | "otherFactoryCertificates"
  | "iso22000Certificate"
  | "haccpCertificate"
  | "other";

type AttachmentValue = {
  included: boolean;
  description?: string;
  files: File[];
};

type CertificateFormData = {
  companyRegisteredNameAr: string;
  companyRegisteredNameEn: string;
  companyRegisteredAddressAr: string;
  companyRegisteredAddressEn: string;
  country: string;
  companyNature: CompanyNature;
  branchAddresses: string[];
  phone: string;
  fax: string;
  website: string;
  companyEmail: string;
  responsiblePersonName: string;
  managerEmail: string;
  responsiblePersonMobile: string;
  qualityManagerName: string;
  isFirstApplication: YesNo;
  applicationPurpose: ApplicationPurpose[];
  requestedProducts: string[];
  productDescription: string;
  otherFactoryProducts: string[];
  hasOtherHalalCertificate: YesNo;
  otherHalalCertificateScope: string;
  otherHalalReferenceStandard: string;
  otherHalalCertifyingBody: string;
  attachments: Record<AttachmentKey, AttachmentValue>;
  declarationAccepted: boolean;
  applicantName: string;
  applicantJobTitle: string;
  applicationDate: string;
  applicantSignature: File | null;
  additionalNotes: string;
};

type ErrorMap = Record<string, string>;
type FieldType = "text" | "email" | "tel" | "url" | "date" | "textarea";

type FieldConfig = {
  key: keyof CertificateFormData;
  label: string;
  type?: FieldType;
  required?: boolean;
  placeholder?: string;
};

const YES = "نعم";
const NO = "لا";
const REQUIRED = "هذا الحقل مطلوب.";
const FILE_LIMIT_MB = 10;
const FILE_LIMIT_BYTES = FILE_LIMIT_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ".pdf,.jpg,.jpeg,.png";

const today = () => new Date().toISOString().slice(0, 10);

const attachmentConfig: { key: AttachmentKey; label: string; hasDescription?: boolean }[] = [
  { key: "nationalHalalCertificate", label: "نسخة عن شهادة الحلال الوطنية" },
  { key: "finalProductTestCertificate", label: "نسخة عن شهادة اختبار المنتجات النهائية، إن وجدت" },
  { key: "rawMaterialTestCertificates", label: "نسخة عن شهادات اختبار المواد الخام" },
  { key: "qualityOrNationalConformityCertificate", label: "شهادة الجودة أو علامة المطابقة الوطنية للمنتج" },
  { key: "factoryLicense", label: "نسخة عن شهادة ترخيص المصنع" },
  { key: "otherFactoryCertificates", label: "نسخة من أي شهادات أخرى حصل عليها المصنع، غير شهادة الحلال" },
  { key: "iso22000Certificate", label: "شهادة نظام إدارة سلامة الأغذية ISO 22000" },
  { key: "haccpCertificate", label: "شهادة نظام تحليل المخاطر ونقاط التحكم الحرجة HACCP" },
  { key: "other", label: "أخرى، يرجى التوضيح", hasDescription: true },
];

const countries = [
  "الأردن",
  "الإمارات العربية المتحدة",
  "البحرين",
  "تونس",
  "الجزائر",
  "جيبوتي",
  "السعودية",
  "السودان",
  "سوريا",
  "الصومال",
  "العراق",
  "عُمان",
  "فلسطين",
  "قطر",
  "الكويت",
  "لبنان",
  "ليبيا",
  "مصر",
  "المغرب",
  "موريتانيا",
  "اليمن",
];

const countriesEnglish = [
  "Jordan",
  "United Arab Emirates",
  "Bahrain",
  "Tunisia",
  "Algeria",
  "Djibouti",
  "Saudi Arabia",
  "Sudan",
  "Syria",
  "Somalia",
  "Iraq",
  "Oman",
  "Palestine",
  "Qatar",
  "Kuwait",
  "Lebanon",
  "Libya",
  "Egypt",
  "Morocco",
  "Mauritania",
  "Yemen",
];

const countryOptions = countries.map((ar, index) => ({
  ar,
  en: countriesEnglish[index] ?? ar,
  iso: countryIsoCode(ar) ?? "",
}));

const steps = [
  { title: "معلومات عامة", microcopy: "البيانات الرسمية للشركة ومعلومات الاتصال والغرض من تقديم الطلب." },
  { title: "تفاصيل المنتج", microcopy: "تحديد المنتجات المطلوب منحها شهادة أو علامة الحلال العربية." },
  { title: "الوثائق المرفقة", microcopy: "تحديد الوثائق المرفقة وإرفاق ملفات PDF أو صور واضحة عند اختيار أي وثيقة." },
  { title: "المعلومات والتعهدات", microcopy: "قراءة المعلومات الرسمية والتعهدات المطلوبة قبل تقديم الطلب." },
  { title: "بيانات مقدم الطلب", microcopy: "بيانات الشخص المخول بتقديم الطلب والتوقيع." },
  { title: "المراجعة والإرسال", microcopy: "مراجعة البيانات والملفات قبل إرسال الطلب." },
];

const generalFields: FieldConfig[] = [
  { key: "companyRegisteredNameAr", label: "اسم الشركة المسجل بالعربية", required: true },
  { key: "companyRegisteredNameEn", label: "اسم الشركة المسجل بالإنجليزية", required: true },
  { key: "companyRegisteredAddressAr", label: "العنوان البريدي المسجل للشركة بالعربية", type: "textarea", required: true },
  { key: "companyRegisteredAddressEn", label: "العنوان البريدي المسجل للشركة بالإنجليزية", type: "textarea", required: true },
  { key: "country", label: "الدولة", required: true },
  { key: "phone", label: "رقم الهاتف", type: "tel", required: true },
  { key: "fax", label: "رقم الفاكس", type: "tel" },
  { key: "website", label: "الموقع الإلكتروني", type: "url", placeholder: "example.org" },
  { key: "companyEmail", label: "البريد الإلكتروني للشركة", type: "email", required: true },
  { key: "responsiblePersonName", label: "اسم المسؤول في الشركة", required: true },
  { key: "managerEmail", label: "البريد الإلكتروني للمدير", type: "email", required: true },
  { key: "responsiblePersonMobile", label: "رقم الهاتف المحمول للمسؤول", type: "tel", required: true },
  { key: "qualityManagerName", label: "اسم مدير الجودة", required: true },
];

const applicantFields: FieldConfig[] = [
  { key: "applicantName", label: "اسم مقدم الطلب", required: true },
  { key: "applicantJobTitle", label: "المسمى الوظيفي", required: true },
  { key: "applicationDate", label: "التاريخ", type: "date", required: true },
  { key: "additionalNotes", label: "ملاحظات أخرى", type: "textarea" },
];

const certificateEnglish = {
  steps: [
    { title: "General Information", microcopy: "Official company information, contact details, and application purpose." },
    { title: "Product Details", microcopy: "Products requested for Arab Halal certification or Arab Halal mark licensing." },
    { title: "Attachments", microcopy: "Select attached documents and add clear PDF or image files for each selected document." },
    { title: "Notices and Commitments", microcopy: "Review the official notices and required commitments before submission." },
    { title: "Applicant Information", microcopy: "Information for the person authorized to submit and sign this application." },
    { title: "Review and Submit", microcopy: "Review all entered data and attached files before sending the application." },
  ],
  fields: {
    companyRegisteredNameAr: "Company registered name in Arabic",
    companyRegisteredNameEn: "Company registered name in English",
    companyRegisteredAddressAr: "Company registered postal address in Arabic",
    companyRegisteredAddressEn: "Company registered postal address in English",
    country: "Country",
    phone: "Telephone number",
    fax: "Fax number",
    website: "Website",
    companyEmail: "Company email",
    responsiblePersonName: "Responsible person in the company",
    managerEmail: "Manager email",
    responsiblePersonMobile: "Responsible person's mobile number",
    qualityManagerName: "Quality manager name",
    applicantName: "Applicant name",
    applicantJobTitle: "Job title",
    applicationDate: "Date",
    additionalNotes: "Other notes",
    productDescription: "Product description",
    otherHalalCertificateScope: "Certificate scope",
    otherHalalReferenceStandard: "Certificate reference standard",
    otherHalalCertifyingBody: "Certifying body",
  } satisfies Partial<Record<keyof CertificateFormData, string>>,
  sections: {
    company: "Company Information",
    requestNature: "Application Nature",
    branches: "Company Branches",
    productDetails: "Product Details",
    otherHalal: "Other Halal Certificates",
    attachments: "Documents Attached with the Application",
    notices: "Important Information and Notices",
    commitments: "After approval by the competent Halal authority or designated body, please observe the following:",
    applicant: "Applicant Information",
  },
  labels: {
    add: "Add",
    delete: "Delete",
    edit: "Edit",
    manufacturer: "Manufacturer",
    supplier: "Supplier",
    companyNature: "Company nature",
    firstApplication: "Is this the first application?",
    purpose: "What is the purpose of submitting the application?",
    certificatePurpose: "Arab Halal Certificate",
    markPurpose: "Arab Halal Mark",
    branchAddresses: "Postal addresses of company branches, if any",
    requestedProducts: "Product or products requested for Arab Halal certificate or mark",
    otherFactoryProducts: "Other products manufactured by the factory",
    hasOtherHalalCertificate: "Do the factory products hold another Halal certificate?",
    attachmentsHelper: "Please tick the appropriate box for the documents attached with the application.",
    attachmentFiles: "Attach files",
    description: "Description",
    signature: "Signature",
    selectedUpload: "Click to upload files",
    fileRules: `PDF, JPG, JPEG, PNG - maximum ${FILE_LIMIT_MB} MB per file`,
    declaration: "I acknowledge that I have read all information and commitments above, agree to comply with them, and confirm the accuracy of the data and documents submitted in this application.",
    footerNote: "Files are kept inside the form and are not uploaded before application submission.",
    previous: "Previous",
    next: "Next step",
    submit: "Submit application now",
    submitting: "Submitting...",
    portal: "Application Portal",
    back: "Back to platform",
    success: "Your application has been submitted successfully. The data and attached documents will be verified, and you will be contacted after review.",
    error: "The application could not be submitted right now. Please check the information and try again.",
  },
  validation: {
    required: "This field is required.",
    chooseCompanyNature: "Please select the company nature.",
    choosePurpose: "Please select the purpose of submitting the application.",
    invalidEmail: "Please enter a valid email address.",
    invalidPhone: "Please enter a valid phone number.",
    invalidUrl: "Please enter a valid website, such as example.org.",
    addProduct: "Please add at least one product.",
    otherHalalDetails: "Please enter the other Halal certificate details.",
    attachSelectedFile: "Please attach the selected file.",
    acceptCommitments: "You must accept the commitments before submitting the application.",
  },
  attachments: {
    nationalHalalCertificate: "Copy of the national Halal certificate",
    finalProductTestCertificate: "Copy of final product test certificate, if any",
    rawMaterialTestCertificates: "Copy of raw material test certificates",
    qualityOrNationalConformityCertificate: "Quality certificate or national product conformity mark",
    factoryLicense: "Copy of factory license certificate",
    otherFactoryCertificates: "Copy of any other certificates obtained by the factory, other than Halal certificate",
    iso22000Certificate: "ISO 22000 food safety management system certificate",
    haccpCertificate: "HACCP hazard analysis and critical control points system certificate",
    other: "Other, please specify",
  } satisfies Record<AttachmentKey, string>,
  notices: [
    "The body granting the Arab Halal certificate or mark that received this application will notify the establishment or supplier of the application review result within one month from the date of receipt.",
    "The body granting the Arab Halal certificate or mark shall maintain confidentiality of information and documents related to the application and granting procedures according to applicable principles.",
    "An establishment or supplier holding a valid national Halal mark from an Arab country may obtain the Arab Halal mark for the same validity period as the national mark.",
  ],
  commitments: [
    "The establishment or supplier submitting this application shall meet the requirements of the Arab Halal Program, the Halal-related standards stated in it, the conditions and arrangements required by the Arab Halal certificate or mark, and the conformity assessment procedures approved by the competent Halal authority.",
    "Allow representatives of the competent Halal authority in the country to visit the establishment or supplier for inspection, audit, or sampling when necessary.",
    "Do not announce or publish, in any form, that products, systems, or services have obtained the Arab Halal certificate or mark before the certificate or mark is granted for the products.",
    "Pay the costs of the right to use the Arab Halal mark into the bank account of the Arab Industrial Development, Standardization and Mining Organization.",
    "The applicant bears all expenses related to this application.",
  ],
  review: {
    company: "Company Information",
    contact: "Contact Information",
    product: "Product Information",
    attachments: "Attached Documents",
    applicant: "Applicant Information",
    notEntered: "Not entered",
    notAttached: "Not attached",
    accepted: "Accepted",
    notAccepted: "Not accepted",
  },
};

const importantNotices = [
  "تقوم الجهة المانحة لشهادة أو علامة الحلال العربية التي تلقت هذا الطلب بإبلاغ المنشأة أو المورد بنتيجة مراجعة الطلب خلال شهر من تاريخ استلام الطلب.",
  "تلتزم الجهة المانحة لشهادة أو علامة الحلال العربية بالحفاظ على سرية المعلومات والوثائق المتعلقة بالطلب وإجراءات المنح وفق الأصول المعمول بها.",
  "يمكن للمنشأة أو المورد الحاصل على علامة الحلال الوطنية لإحدى الدول العربية، سارية المفعول، الحصول على علامة الحلال العربية لنفس مدة سريان العلامة الوطنية.",
];

const commitments = [
  "تلتزم المنشأة أو المورد المتقدم بهذا الطلب بتحقيق متطلبات البرنامج العربي للحلال والمواصفات المتعلقة بالحلال الواردة فيه، والشروط والترتيبات التي تتطلبها شهادة أو علامة الحلال العربية، وإجراءات تقييم المطابقة المعتمدة من الجهة المعنية بالحلال.",
  "السماح لممثلي الجهة المعنية بالحلال في الدولة بزيارة المنشأة أو المورد لإجراء التفتيش أو التدقيق أو سحب العينات إذا لزم الأمر.",
  "عدم الإعلان أو النشر، بأي شكل من الأشكال، بأن المنتجات أو الأنظمة أو الخدمات حاصلة على شهادة أو علامة الحلال العربية قبل منح الشهادة أو العلامة للمنتجات.",
  "تسديد تكاليف حق استخدام علامة الحلال العربية في الحساب البنكي الخاص بالمنظمة العربية للتنمية الصناعية والتقييس والتعدين.",
  "يتحمل مقدم الطلب جميع النفقات المتعلقة بهذا الطلب.",
];

const initialAttachments = (): Record<AttachmentKey, AttachmentValue> =>
  attachmentConfig.reduce((acc, item) => {
    acc[item.key] = { included: false, description: "", files: [] };
    return acc;
  }, {} as Record<AttachmentKey, AttachmentValue>);

const initialData = (): CertificateFormData => ({
  companyRegisteredNameAr: "",
  companyRegisteredNameEn: "",
  companyRegisteredAddressAr: "",
  companyRegisteredAddressEn: "",
  country: "",
  companyNature: "",
  branchAddresses: [""],
  phone: "",
  fax: "",
  website: "",
  companyEmail: "",
  responsiblePersonName: "",
  managerEmail: "",
  responsiblePersonMobile: "",
  qualityManagerName: "",
  isFirstApplication: "",
  applicationPurpose: [],
  requestedProducts: [""],
  productDescription: "",
  otherFactoryProducts: [""],
  hasOtherHalalCertificate: "",
  otherHalalCertificateScope: "",
  otherHalalReferenceStandard: "",
  otherHalalCertifyingBody: "",
  attachments: initialAttachments(),
  declarationAccepted: false,
  applicantName: "",
  applicantJobTitle: "",
  applicationDate: today(),
  applicantSignature: null,
  additionalNotes: "",
});

const trim = (value: string) => value.trim();
const isBlank = (value: string) => trim(value).length === 0;
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(trim(value));
const isPhone = (value: string) => /^[+\d\s().-]{6,24}$/.test(trim(value));
const normalizeWebsite = (value: string) => {
  const website = trim(value);
  if (!website) return "";
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
};
const isUrl = (value: string) => {
  if (isBlank(value)) return true;
  try {
    const parsed = new URL(normalizeWebsite(value));
    return (parsed.protocol === "http:" || parsed.protocol === "https:") && parsed.hostname.includes(".");
  } catch {
    return false;
  }
};
const isAcceptedFile = (file: File) => {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return Boolean(extension && ["pdf", "jpg", "jpeg", "png"].includes(extension)) && file.size <= FILE_LIMIT_BYTES;
};
const uniqueFiles = (existing: File[], incoming: File[]) => {
  const seen = new Set(existing.map((file) => `${file.name}-${file.size}-${file.lastModified}`));
  return [...existing, ...incoming.filter((file) => {
    const signature = `${file.name}-${file.size}-${file.lastModified}`;
    if (seen.has(signature)) return false;
    seen.add(signature);
    return true;
  })];
};
const visibleTextArray = (items: string[]) => items.map(trim).filter(Boolean);
const fileNames = (files: File[]) => files.map((file) => file.name);
const purposeLabel = (value: ApplicationPurpose, lang: "ar" | "en" = "ar") => {
  if (lang === "en") return value === "arab_halal_certificate" ? certificateEnglish.labels.certificatePurpose : certificateEnglish.labels.markPurpose;
  return value === "arab_halal_certificate" ? "شهادة حلال العربية" : "علامة الحلال العربية";
};

function createPayload(data: CertificateFormData) {
  const hasOtherCertificate = data.hasOtherHalalCertificate === YES;
  return {
    companyInformation: {
      companyRegisteredNameAr: trim(data.companyRegisteredNameAr),
      companyRegisteredNameEn: trim(data.companyRegisteredNameEn),
      companyRegisteredAddressAr: trim(data.companyRegisteredAddressAr),
      companyRegisteredAddressEn: trim(data.companyRegisteredAddressEn),
      country: trim(data.country),
      companyNature: data.companyNature,
      branchAddresses: visibleTextArray(data.branchAddresses),
      phone: trim(data.phone),
      fax: trim(data.fax),
      website: normalizeWebsite(data.website),
      companyEmail: trim(data.companyEmail),
      responsiblePersonName: trim(data.responsiblePersonName),
      managerEmail: trim(data.managerEmail),
      responsiblePersonMobile: trim(data.responsiblePersonMobile),
      qualityManagerName: trim(data.qualityManagerName),
      isFirstApplication: data.isFirstApplication || null,
      applicationPurpose: data.applicationPurpose,
    },
    productInformation: {
      requestedProducts: visibleTextArray(data.requestedProducts),
      productDescription: trim(data.productDescription),
      otherFactoryProducts: visibleTextArray(data.otherFactoryProducts),
      hasOtherHalalCertificate: data.hasOtherHalalCertificate || null,
      otherHalalCertificateScope: hasOtherCertificate ? trim(data.otherHalalCertificateScope) : "",
      otherHalalReferenceStandard: hasOtherCertificate ? trim(data.otherHalalReferenceStandard) : "",
      otherHalalCertifyingBody: hasOtherCertificate ? trim(data.otherHalalCertifyingBody) : "",
    },
    attachments: Object.fromEntries(
      attachmentConfig.map((item) => {
        const attachment = data.attachments[item.key];
        return [
          item.key,
          {
            included: attachment.included,
            ...(item.hasDescription ? { description: attachment.included ? trim(attachment.description ?? "") : "" } : {}),
            files: attachment.included ? fileNames(attachment.files) : [],
          },
        ];
      }),
    ),
    declarationAccepted: data.declarationAccepted,
    applicantInformation: {
      applicantName: trim(data.applicantName),
      applicantJobTitle: trim(data.applicantJobTitle),
      applicationDate: data.applicationDate,
      applicantSignature: data.applicantSignature?.name ?? null,
      additionalNotes: trim(data.additionalNotes),
    },
  };
}

function createSubmitFormData(data: CertificateFormData) {
  const payload = createPayload(data);
  const formData = new FormData();
  formData.append("payload", JSON.stringify(payload));
  attachmentConfig.forEach((item) => {
    const attachment = data.attachments[item.key];
    if (!attachment.included) return;
    attachment.files.forEach((file) => formData.append(`attachments.${item.key}.files`, file));
  });
  if (data.applicantSignature) formData.append("applicantInformation.applicantSignature", data.applicantSignature);
  return { payload, formData };
}

function validate(data: CertificateFormData, step?: number, lang: "ar" | "en" = "ar") {
  const errors: ErrorMap = {};
  const messages = {
    required: lang === "ar" ? REQUIRED : certificateEnglish.validation.required,
    chooseCompanyNature: lang === "ar" ? "يرجى اختيار طبيعة الشركة." : certificateEnglish.validation.chooseCompanyNature,
    choosePurpose: lang === "ar" ? "يرجى تحديد الغرض من تقديم الطلب." : certificateEnglish.validation.choosePurpose,
    invalidEmail: lang === "ar" ? "يرجى إدخال بريد إلكتروني صحيح." : certificateEnglish.validation.invalidEmail,
    invalidPhone: lang === "ar" ? "يرجى إدخال رقم هاتف صحيح." : certificateEnglish.validation.invalidPhone,
    invalidUrl: lang === "ar" ? "يرجى إدخال موقع إلكتروني صحيح، مثل example.org." : certificateEnglish.validation.invalidUrl,
    addProduct: lang === "ar" ? "يرجى إضافة منتج واحد على الأقل." : certificateEnglish.validation.addProduct,
    otherHalalDetails: lang === "ar" ? "يرجى إدخال تفاصيل شهادة الحلال الأخرى." : certificateEnglish.validation.otherHalalDetails,
    attachSelectedFile: lang === "ar" ? "يرجى إرفاق الملف المحدد." : certificateEnglish.validation.attachSelectedFile,
    acceptCommitments: lang === "ar" ? "يجب الموافقة على التعهدات قبل إرسال الطلب." : certificateEnglish.validation.acceptCommitments,
  };
  const checkText = (key: keyof CertificateFormData, message = messages.required) => {
    const value = data[key];
    if (typeof value === "string" && isBlank(value)) errors[String(key)] = message;
  };

  if (step === undefined || step === 0) {
    generalFields.filter((field) => field.required).forEach((field) => checkText(field.key));
    if (!data.companyNature) errors.companyNature = messages.chooseCompanyNature;
    if (!data.isFirstApplication) errors.isFirstApplication = messages.required;
    if (data.applicationPurpose.length === 0) errors.applicationPurpose = messages.choosePurpose;
    if (data.companyEmail && !isEmail(data.companyEmail)) errors.companyEmail = messages.invalidEmail;
    if (data.managerEmail && !isEmail(data.managerEmail)) errors.managerEmail = messages.invalidEmail;
    if (data.phone && !isPhone(data.phone)) errors.phone = messages.invalidPhone;
    if (data.fax && !isPhone(data.fax)) errors.fax = messages.invalidPhone;
    if (data.responsiblePersonMobile && !isPhone(data.responsiblePersonMobile)) errors.responsiblePersonMobile = messages.invalidPhone;
    if (data.website && !isUrl(data.website)) errors.website = messages.invalidUrl;
  }

  if (step === undefined || step === 1) {
    if (visibleTextArray(data.requestedProducts).length === 0) errors.requestedProducts = messages.addProduct;
    checkText("productDescription");
    if (!data.hasOtherHalalCertificate) errors.hasOtherHalalCertificate = messages.required;
    if (data.hasOtherHalalCertificate === YES) {
      if (isBlank(data.otherHalalCertificateScope)) errors.otherHalalCertificateScope = messages.otherHalalDetails;
      if (isBlank(data.otherHalalReferenceStandard)) errors.otherHalalReferenceStandard = messages.otherHalalDetails;
      if (isBlank(data.otherHalalCertifyingBody)) errors.otherHalalCertifyingBody = messages.otherHalalDetails;
    }
  }

  if (step === undefined || step === 2) {
    attachmentConfig.forEach((item) => {
      const attachment = data.attachments[item.key];
      if (!attachment.included) return;
      if (attachment.files.length === 0) errors[`attachments.${item.key}.files`] = messages.attachSelectedFile;
      if (item.hasDescription && isBlank(attachment.description ?? "")) errors[`attachments.${item.key}.description`] = messages.required;
    });
  }

  if (step === undefined || step === 3) {
    if (!data.declarationAccepted) errors.declarationAccepted = messages.acceptCommitments;
  }

  if (step === undefined || step === 4) {
    applicantFields.filter((field) => field.required).forEach((field) => checkText(field.key));
    if (!data.applicantSignature) errors.applicantSignature = lang === "ar" ? "يرجى رسم التوقيع الإلكتروني." : "Please draw the electronic signature.";
  }

  return errors;
}

function Field({
  field,
  value,
  error,
  onChange,
  children,
}: {
  field: FieldConfig;
  value: string;
  error?: string;
  onChange: (key: keyof CertificateFormData, value: string) => void;
  children?: ReactNode;
}) {
  const inputClass = `w-full scroll-mt-32 rounded-xl border bg-white px-3.5 py-3 text-[14px] font-medium text-[#0C111D] shadow-[var(--shadow-premium-sm)] outline-none transition-all placeholder:text-stone-400 focus:border-[#007A55] focus:ring-4 focus:ring-[#007A55]/10 ${
    error ? "border-red-500 bg-red-50/40" : "border-stone-200 hover:border-stone-300"
  }`;

  return (
    <label className="block group">
      <span className="mb-2 block text-[12px] font-bold text-stone-600 group-focus-within:text-[#007A55]">
        {field.label}
        {field.required && <span className="mr-1 text-[#CA8A04]">*</span>}
      </span>
      {children ?? (
        field.type === "textarea" ? (
          <textarea value={value} placeholder={field.placeholder} onChange={(event) => onChange(field.key, event.target.value)} className={`${inputClass} min-h-24 resize-y leading-relaxed`} />
        ) : (
          <input value={value} type={field.type ?? "text"} placeholder={field.placeholder} onChange={(event) => onChange(field.key, event.target.value)} className={inputClass} />
        )
      )}
      {error && <span className="mt-2 block text-xs font-bold text-red-600">{error}</span>}
    </label>
  );
}

function CountrySelectControl({
  value,
  isRtl,
  error,
  onChange,
}: {
  value: string;
  isRtl: boolean;
  error?: string;
  onChange: (value: string) => void;
}) {
  const lang = isRtl ? "ar" : "en";
  return (
    <Select value={value} onValueChange={onChange} dir={isRtl ? "rtl" : "ltr"}>
      <SelectTrigger
        className={`min-h-12 w-full rounded-xl border bg-white px-3.5 py-3 text-[14px] font-medium text-[#0C111D] shadow-[var(--shadow-premium-sm)] outline-none focus:ring-4 focus:ring-[#007A55]/10 ${error ? "border-red-500 bg-red-50/40" : "border-stone-200 hover:border-stone-300"}`}
        aria-label={isRtl ? "اختيار الدولة" : "Select country"}
      >
        <SelectValue placeholder={isRtl ? "اختر الدولة" : "Select country"}>{value || undefined}</SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-80 border-stone-200 bg-white shadow-2xl" position="popper" sideOffset={6}>
        <SelectGroup>
          {countryOptions.map((country) => {
            const label = country[lang];
            return (
              <SelectItem key={country.iso} value={label} className="min-h-10 cursor-pointer rounded-lg py-2 pe-9 ps-3 text-sm font-bold text-stone-800 focus:bg-[#F0FDF4] focus:text-[#004D36]">
                <span className="flex items-center gap-3">
                  <img
                    src={`https://flagcdn.com/w40/${country.iso}.png`}
                    srcSet={`https://flagcdn.com/w80/${country.iso}.png 2x`}
                    width={28}
                    height={21}
                    alt=""
                    loading="lazy"
                    className="h-[18px] w-6 shrink-0 rounded-[2px] object-cover ring-1 ring-black/10"
                  />
                  <span>{label}</span>
                </span>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function RadioGroup<T extends string>({
  label,
  value,
  options,
  error,
  onChange,
  getOptionLabel,
}: {
  label: string;
  value: T | "";
  options: T[];
  error?: string;
  onChange: (value: T) => void;
  getOptionLabel?: (value: T) => string;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-[13px] font-bold text-stone-600">{label}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const active = value === option;
          return (
            <button key={option} type="button" onClick={() => onChange(option)} className={`flex min-h-[50px] items-center justify-between rounded-xl border px-4 py-3 transition-all ${active ? "border-[#007A55] bg-[#007A55] text-white shadow-[0_8px_16px_-4px_rgba(0,122,85,0.25)]" : "border-stone-200 bg-white text-stone-900 hover:border-stone-300 hover:bg-stone-50"}`}>
              <span className="text-[14px] font-bold">{getOptionLabel ? getOptionLabel(option) : option}</span>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${active ? "border-white bg-white/20" : "border-stone-200"}`}>
                {active && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs font-bold text-red-600">{error}</p>}
    </fieldset>
  );
}

function CheckCard({
  checked,
  label,
  error,
  onChange,
}: {
  checked: boolean;
  label: string;
  error?: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={`flex cursor-pointer items-start gap-3.5 rounded-[1.15rem] border-2 p-4 transition-all ${checked ? "border-[#007A55] bg-[#007A55]/5 shadow-sm" : "border-stone-100 bg-white hover:border-stone-200 hover:bg-stone-50/50"}`}>
      <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 ${checked ? "border-[#007A55] bg-[#007A55] text-white" : "border-stone-200 bg-white"}`}>
        {checked && <Check size={16} strokeWidth={4} />}
      </span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="sr-only" />
      <span className="text-[14px] font-bold leading-7 text-stone-800">{label}</span>
      {error && <span className="ms-auto text-xs font-bold text-red-600">{error}</span>}
    </label>
  );
}

function FileUploadBox({
  label,
  files,
  error,
  multiple = true,
  onChange,
}: {
  label: string;
  files: File[];
  error?: string;
  multiple?: boolean;
  onChange: (files: File[]) => void;
}) {
  const { i18n } = useTranslation();
  const isRtl = !(i18n.resolvedLanguage || i18n.language || "ar").startsWith("en");
  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []).filter(isAcceptedFile);
    onChange(multiple ? uniqueFiles(files, selected) : selected.slice(0, 1));
    event.target.value = "";
  };

  return (
    <div className="space-y-2.5">
      <span className="block text-[12px] font-bold text-stone-600">{label}</span>
      <label className={`relative flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 py-6 text-center transition-all group ${error ? "border-red-300 bg-red-50/40" : "border-stone-200 bg-stone-50/50 hover:border-[#007A55]/30 hover:bg-[#F0FDF4]/30"}`}>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-stone-200 transition-transform group-hover:scale-110 group-hover:ring-[#007A55]/20">
          <FileUp size={18} className="text-stone-400 group-hover:text-[#007A55]" />
        </span>
        <span className="mt-3 block text-[13px] font-bold text-stone-900">{isRtl ? "اضغط لرفع الملفات" : certificateEnglish.labels.selectedUpload}</span>
        <span className="mt-1 block text-xs font-medium text-stone-400">{isRtl ? `PDF, JPG, JPEG, PNG - حد أقصى ${FILE_LIMIT_MB} ميجابايت للملف` : certificateEnglish.labels.fileRules}</span>
        <input type="file" multiple={multiple} accept={ACCEPTED_FILE_TYPES} onChange={handleFiles} className="sr-only" />
      </label>
      {error && <p className="text-xs font-bold text-red-600">{error}</p>}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {files.map((file) => (
            <span key={`${file.name}-${file.size}-${file.lastModified}`} className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-1.5 shadow-sm">
              <span className="text-xs font-bold text-stone-700">{file.name}</span>
              <button type="button" className="text-stone-400 hover:text-red-500" onClick={() => onChange(files.filter((item) => item !== file))} aria-label={`${isRtl ? "حذف" : "Remove"} ${file.name}`}>
                <Trash2 size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
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
      <div className="relative overflow-hidden rounded-2xl border border-[#D6B66A]/35 bg-[#FFF8E8]/94 p-5 shadow-[0_18px_50px_-28px_rgba(78,60,24,0.35)] ring-1 ring-white/80 backdrop-blur-xl md:p-6">
        <div className="relative z-10">{children}</div>
      </div>
    </section>
  );
}

function StepRail({ activeStep, completed, onJump, stepItems, isRtl }: { activeStep: number; completed: Set<number>; onJump: (step: number) => void; stepItems: typeof steps; isRtl: boolean }) {
  return (
    <nav aria-label={isRtl ? "مراحل الطلب" : "Application steps"} className="sticky top-0 z-40 border-b border-[#D6B66A]/30 bg-[#FFFDF6]/90 backdrop-blur-2xl shadow-[0_12px_28px_-24px_rgba(78,60,24,0.65)]">
      <div className="mx-auto max-w-5xl px-5 pb-10 pt-5 lg:px-8">
        <div className="relative flex justify-between">
          <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-stone-100">
            <motion.div className={`h-full bg-[#007A55] ${isRtl ? "origin-right" : "origin-left"}`} animate={{ scaleX: activeStep / (steps.length - 1) }} transition={{ duration: 0.45 }} />
          </div>
          {stepItems.map((step, index) => {
            const active = index === activeStep;
            const done = completed.has(index);
            const reachable = index <= activeStep || done;
            return (
              <button key={step.title} type="button" onClick={() => reachable && onJump(index)} disabled={!reachable} aria-disabled={!reachable} className="group relative z-10 flex flex-col items-center focus:outline-none disabled:cursor-not-allowed" aria-current={active ? "step" : undefined}>
                <span className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all ${active ? "scale-110 border-[#007A55] bg-[#007A55] text-white shadow-[0_0_0_8px_rgba(0,122,85,0.1)]" : done ? "border-[#007A55] bg-white text-[#007A55]" : reachable ? "border-stone-200 bg-white text-stone-300 shadow-sm group-hover:border-stone-400 group-hover:text-stone-500" : "border-stone-100 bg-stone-50 text-stone-300 opacity-60"}`}>
                  {done ? <Check size={20} strokeWidth={3} /> : <span className="text-base font-black">{index + 1}</span>}
                </span>
                <span className={`absolute top-14 hidden whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] shadow-sm ring-1 ring-stone-200/70 transition-all md:block ${active ? "translate-y-0 text-[#007A55] opacity-100" : "-translate-y-1 text-stone-400 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"}`}>{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function ReviewGroup({ title, items, onEdit, editLabel, emptyLabel }: { title: string; items: { label: string; value: ReactNode }[]; onEdit: () => void; editLabel?: string; emptyLabel?: string }) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-black text-stone-900">{title}</h2>
        <button type="button" onClick={onEdit} className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-black text-stone-600 hover:border-[#007A55] hover:text-[#007A55]">{editLabel ?? "تعديل"}</button>
      </div>
      <dl className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl bg-stone-50 p-3">
            <dt className="text-[11px] font-bold text-stone-700">{item.label}</dt>
            <dd className="mt-1 text-sm font-black leading-6 text-stone-900">{item.value || emptyLabel || "غير مدخل"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function HalalCertificateApplication() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("en") ? "en" : "ar";
  const isRtl = lang === "ar";
  const [data, setData] = useState<CertificateFormData>(() => initialData());
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [errors, setErrors] = useState<ErrorMap>({});
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const [signatureDataUrl, setSignatureDataUrl] = useState("");

  const payload = useMemo(() => createPayload(data), [data]);
  const localizedSteps = isRtl ? steps : certificateEnglish.steps;
  const fieldLabel = (field: FieldConfig) => (isRtl ? field.label : (certificateEnglish.fields as Partial<Record<keyof CertificateFormData, string>>)[field.key] ?? field.label);
  const localizedField = (field: FieldConfig): FieldConfig => ({ ...field, label: fieldLabel(field) });
  const uiLabels = certificateEnglish.labels;
  const section = certificateEnglish.sections;
  const reviewText = certificateEnglish.review;
  const optionLabel = (value: string) => {
    if (isRtl) return value;
    if (value === YES) return "Yes";
    if (value === NO) return "No";
    if (value === "مصنعة") return uiLabels.manufacturer;
    if (value === "موردة") return uiLabels.supplier;
    return value;
  };

  const updateField = (key: keyof CertificateFormData, value: CertificateFormData[keyof CertificateFormData]) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[String(key)];
      return next;
    });
  };

  const updateSignature = (value: string | null) => {
    setSignatureDataUrl(value ?? "");
    updateField(
      "applicantSignature",
      value
        ? signatureDataUrlToFile(
            value,
            isRtl ? "توقيع-مقدم-طلب-شهادة-الحلال.png" : "halal-certificate-applicant-signature.png",
          )
        : null,
    );
  };

  const updateAttachment = (key: AttachmentKey, value: Partial<AttachmentValue>) => {
    setData((current) => {
      const included = value.included ?? current.attachments[key].included;
      return {
        ...current,
        attachments: {
          ...current.attachments,
          [key]: {
            ...current.attachments[key],
            ...value,
            included,
            files: included ? (value.files ?? current.attachments[key].files) : [],
            description: included ? (value.description ?? current.attachments[key].description ?? "") : "",
          },
        },
      };
    });
    setErrors((current) => {
      const next = { ...current };
      delete next[`attachments.${key}.files`];
      delete next[`attachments.${key}.description`];
      return next;
    });
  };

  const updateArray = (key: "branchAddresses" | "requestedProducts" | "otherFactoryProducts", index: number, value: string) => {
    setData((current) => {
      const next = [...current[key]];
      next[index] = value;
      return { ...current, [key]: next };
    });
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const addArrayItem = (key: "branchAddresses" | "requestedProducts" | "otherFactoryProducts") => setData((current) => ({ ...current, [key]: [...current[key], ""] }));
  const removeArrayItem = (key: "branchAddresses" | "requestedProducts" | "otherFactoryProducts", index: number) => {
    setData((current) => {
      const next = current[key].filter((_, itemIndex) => itemIndex !== index);
      return { ...current, [key]: next.length ? next : [""] };
    });
  };

  const goNext = () => {
    const stepErrors = validate(data, activeStep, lang);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;
    setCompletedSteps((current) => new Set([...current, activeStep]));
    setActiveStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const goPrevious = () => {
    setActiveStep((step) => Math.max(step - 1, 0));
  };

  const jumpToStep = (step: number) => {
    if (step > activeStep && !completedSteps.has(step)) return;
    setActiveStep(step);
  };

  const stepForField = (key: string): number => {
    if (key.startsWith("attachments.")) return 2;
    if (["declarationAccepted"].includes(key)) return 3;
    if (applicantFields.some((field) => field.key === key) || key === "applicantSignature") return 4;
    if (["requestedProducts", "productDescription", "hasOtherHalalCertificate", "otherHalalCertificateScope", "otherHalalReferenceStandard", "otherHalalCertifyingBody"].includes(key)) return 1;
    return 0;
  };

  const submitApplication = async () => {
    if (isSubmitting) return;
    const allErrors = validate(data, undefined, lang);
    setErrors(allErrors);
    if (Object.keys(allErrors).length > 0) {
      const firstInvalidStep = [0, 1, 2, 3, 4].find((step) => Object.keys(validate(data, step, lang)).length > 0) ?? 0;
      setActiveStep(firstInvalidStep);
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setSubmitError("");
    const submission = createSubmitFormData(data);
    const result = await submitCertificateApplication(submission.formData);
    setIsSubmitting(false);

    if (result.ok) {
      sessionStorage.setItem(
        CERTIFICATE_APPLICATION_PRINT_SESSION_KEY,
        JSON.stringify({
          requestNumber: result.data.requestNumber ?? "",
          submittedAt: new Date().toISOString(),
          data: {
            ...submission.payload,
            applicantInformation: {
              ...submission.payload.applicantInformation,
              applicantSignature: signatureDataUrl || submission.payload.applicantInformation.applicantSignature,
            },
          },
        }),
      );
      navigate(`/application-submitted?type=certificate&ref=${encodeURIComponent(result.data.requestNumber ?? "")}`);
      return;
    }

    if (result.fields && Object.keys(result.fields).length > 0) {
      setErrors(result.fields);
      const firstKey = Object.keys(result.fields)[0];
      setActiveStep(stepForField(firstKey));
      setStatus("error");
      setSubmitError(result.message);
      return;
    }
    setStatus("error");
    setSubmitError(result.message);
  };

  const renderArrayFields = (key: "branchAddresses" | "requestedProducts" | "otherFactoryProducts", label: string, type: "text" | "textarea", required?: boolean) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] font-bold text-stone-600">
          {label}
          {required && <span className="mr-1 text-[#CA8A04]">*</span>}
        </span>
        <button type="button" onClick={() => addArrayItem(key)} className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-black text-stone-700 hover:border-[#007A55] hover:text-[#007A55]">{isRtl ? "إضافة" : uiLabels.add}</button>
      </div>
      {data[key].map((value, index) => (
        <div key={`${key}-${index}`} className="flex gap-2">
          {type === "textarea" ? (
            <textarea value={value} onChange={(event) => updateArray(key, index, event.target.value)} className="min-h-20 flex-1 resize-y rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-[14px] font-medium shadow-[var(--shadow-premium-sm)] outline-none focus:border-[#007A55] focus:ring-4 focus:ring-[#007A55]/10" />
          ) : (
            <input value={value} onChange={(event) => updateArray(key, index, event.target.value)} className="flex-1 rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-[14px] font-medium shadow-[var(--shadow-premium-sm)] outline-none focus:border-[#007A55] focus:ring-4 focus:ring-[#007A55]/10" />
          )}
          <button type="button" onClick={() => removeArrayItem(key, index)} className="h-11 w-11 shrink-0 rounded-xl border border-stone-200 text-stone-400 hover:border-red-200 hover:text-red-500" aria-label={isRtl ? "حذف" : uiLabels.delete}>
            <Trash2 className="mx-auto" size={17} />
          </button>
        </div>
      ))}
      {errors[key] && <p className="text-xs font-bold text-red-600">{errors[key]}</p>}
    </div>
  );

  return (
    <main id="application-form" dir={isRtl ? "rtl" : "ltr"} className={`relative min-h-screen scroll-mt-4 overflow-hidden bg-[#F7F1E3] pb-32 ${isRtl ? "font-arabic" : "font-english"}`}>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F7F1E3]">
        <div className="absolute inset-0 bg-cover bg-center opacity-28" style={{ backgroundImage: "url('/header-bg.png')" }} />
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
      <header className="relative z-10 border-b border-[#B9953F]/45 bg-[#FFFDF6]/92 shadow-[0_18px_45px_-34px_rgba(78,60,24,0.82)] backdrop-blur-xl after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-[#007A55]/28 after:to-transparent">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
          <div className="flex items-center gap-6">
            <img src="/logo.svg" alt={isRtl ? "شعار البرنامج العربي للحلال" : "Arab Halal Program logo"} className="h-14 w-14 object-contain drop-shadow-xl transition-transform duration-500 hover:scale-110 sm:h-16 sm:w-16" />
            <div className="hidden h-11 w-px bg-stone-200 sm:block" />
            <div className="hidden space-y-1 sm:block">
              <p className="text-xl font-black tracking-tight text-stone-900">{isRtl ? "منصة تقديم الطلبات" : uiLabels.portal}</p>
              <p className="text-xs font-bold text-stone-600">{isRtl ? "البرنامج العربي للحلال" : "Arab Halal Program"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FormLanguageSwitcher />
            <Link
              to="/"
              className="group flex items-center gap-3 rounded-xl border-2 border-stone-100 bg-white px-4 py-3 text-[13px] font-black text-stone-600 shadow-sm transition-all hover:border-[#007A55] hover:text-[#007A55] hover:shadow-xl active:scale-95 sm:px-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-50 transition-colors group-hover:bg-[#007A55]/10">
                <House size={20} className="transition-transform duration-300 group-hover:-translate-y-1" />
              </span>
              <span className="hidden sm:inline">{isRtl ? "الرجوع للمنصة" : uiLabels.back}</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t border-[#B9953F]/30 px-5 pb-6 pt-5 lg:px-8">
          <div>
            <h1 className="max-w-4xl text-xl font-black leading-9 text-stone-950 md:text-3xl md:leading-[1.35]">
              {isRtl ? (
                <>
                  نموذج طلب الحصول على شهادة حلال العربية
                  <br />
                  أو الحصول على / تجديد الترخيص باستعمال علامة الحلال العربية
                </>
              ) : (
                "Arab Halal Certification and Arab Halal Mark Application Form"
              )}
            </h1>
            <p className="mt-3 rounded-xl border border-[#CA8A04]/25 bg-[#CA8A04]/10 px-4 py-2.5 text-[13px] font-bold leading-6 text-[#7A5200]">
              {isRtl ? "البيانات الواردة في هذا النموذج تمثل الحد الأدنى من البيانات الواجب توفرها." : "The information in this form represents the minimum required data."}
            </p>
          </div>
        </div>
      </header>

      <StepRail activeStep={activeStep} completed={completedSteps} onJump={jumpToStep} stepItems={localizedSteps} isRtl={isRtl} />

      <AnimatePresence mode="wait">
        <motion.section key={activeStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }} className="relative z-10 mx-auto w-full max-w-[58rem] px-4 py-5 sm:px-5 sm:py-6 lg:px-8">
          <div className="mb-6 space-y-2">
            <h2 className="text-xl font-black leading-tight text-stone-900 md:text-2xl">{localizedSteps[activeStep].title}</h2>
            <p className="max-w-2xl text-[13px] font-bold leading-6 text-stone-800">{localizedSteps[activeStep].microcopy}</p>
          </div>

          <div className="space-y-6">
            {activeStep === 0 && (
              <>
                <SectionGroup title={isRtl ? "بيانات الشركة" : section.company}>
                  <div className="grid gap-x-8 gap-y-8 lg:grid-cols-2">
                    {generalFields.map((field) => (
                      <Field key={field.key} field={localizedField(field)} value={String(data[field.key] ?? "")} error={errors[String(field.key)]} onChange={updateField}>
                        {field.key === "country" ? (
                          <CountrySelectControl value={data.country} isRtl={isRtl} error={errors.country} onChange={(value) => updateField("country", value)} />
                        ) : undefined}
                      </Field>
                    ))}
                  </div>
                </SectionGroup>
                <SectionGroup title={isRtl ? "طبيعة الطلب" : section.requestNature}>
                  <div className="grid gap-8 lg:grid-cols-2">
                    <RadioGroup label={isRtl ? "طبيعة الشركة" : uiLabels.companyNature} value={data.companyNature} options={["مصنعة", "موردة"]} error={errors.companyNature} onChange={(value) => updateField("companyNature", value)} getOptionLabel={optionLabel} />
                    <RadioGroup label={isRtl ? "هل يقدم الطلب لأول مرة؟" : uiLabels.firstApplication} value={data.isFirstApplication} options={[YES, NO]} error={errors.isFirstApplication} onChange={(value) => updateField("isFirstApplication", value)} getOptionLabel={optionLabel} />
                    <fieldset className="space-y-3 lg:col-span-2">
                      <legend className="text-[13px] font-bold text-stone-600">{isRtl ? "ما الغرض من تقديم الطلب؟" : uiLabels.purpose}</legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(["arab_halal_certificate", "arab_halal_mark"] as ApplicationPurpose[]).map((purpose) => (
                          <CheckCard
                            key={purpose}
                            checked={data.applicationPurpose.includes(purpose)}
                            label={purposeLabel(purpose, lang)}
                            onChange={(checked) => updateField("applicationPurpose", checked ? [...data.applicationPurpose, purpose] : data.applicationPurpose.filter((item) => item !== purpose))}
                          />
                        ))}
                      </div>
                      {errors.applicationPurpose && <p className="text-xs font-bold text-red-600">{errors.applicationPurpose}</p>}
                    </fieldset>
                  </div>
                </SectionGroup>
                <SectionGroup title={isRtl ? "فروع الشركة" : section.branches}>
                  {renderArrayFields("branchAddresses", isRtl ? "العناوين البريدية لفروع الشركة إن وجدت" : uiLabels.branchAddresses, "textarea")}
                </SectionGroup>
              </>
            )}

            {activeStep === 1 && (
              <>
                <SectionGroup title={isRtl ? "تفاصيل المنتج" : section.productDetails}>
                  <div className="grid gap-8">
                    {renderArrayFields("requestedProducts", isRtl ? "اسم المنتج أو المنتجات المطلوب منحها شهادة أو علامة الحلال العربية" : uiLabels.requestedProducts, "text", true)}
                    <Field field={{ key: "productDescription", label: isRtl ? "وصف المنتج أو المنتجات" : certificateEnglish.fields.productDescription, type: "textarea", required: true }} value={data.productDescription} error={errors.productDescription} onChange={updateField} />
                    {renderArrayFields("otherFactoryProducts", isRtl ? "المنتجات الأخرى التي ينتجها المصنع" : uiLabels.otherFactoryProducts, "text")}
                  </div>
                </SectionGroup>
                <SectionGroup title={isRtl ? "شهادات حلال أخرى" : section.otherHalal}>
                  <div className="space-y-8">
                    <RadioGroup label={isRtl ? "هل منتجات المصنع حاصلة على شهادة حلال أخرى؟" : uiLabels.hasOtherHalalCertificate} value={data.hasOtherHalalCertificate} options={[YES, NO]} error={errors.hasOtherHalalCertificate} getOptionLabel={optionLabel} onChange={(value) => {
                      setData((current) => ({
                        ...current,
                        hasOtherHalalCertificate: value,
                        ...(value === NO ? { otherHalalCertificateScope: "", otherHalalReferenceStandard: "", otherHalalCertifyingBody: "" } : {}),
                      }));
                    }} />
                    {data.hasOtherHalalCertificate === YES && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8">
                        <Field field={localizedField({ key: "otherHalalCertificateScope", label: "مجال الشهادة", type: "textarea", required: true })} value={data.otherHalalCertificateScope} error={errors.otherHalalCertificateScope} onChange={updateField} />
                        <Field field={localizedField({ key: "otherHalalReferenceStandard", label: "المواصفة المرجعية للشهادة", type: "textarea", required: true })} value={data.otherHalalReferenceStandard} error={errors.otherHalalReferenceStandard} onChange={updateField} />
                        <Field field={localizedField({ key: "otherHalalCertifyingBody", label: "الجهة المانحة للشهادة", required: true })} value={data.otherHalalCertifyingBody} error={errors.otherHalalCertifyingBody} onChange={updateField} />
                      </motion.div>
                    )}
                  </div>
                </SectionGroup>
              </>
            )}

            {activeStep === 2 && (
              <SectionGroup title={isRtl ? "الوثائق المرفقة مع الطلب" : section.attachments} helper={isRtl ? "الرجاء الإشارة بعلامة في المربع المناسب للوثائق المرفقة مع الطلب." : uiLabels.attachmentsHelper}>
                <div className="grid gap-5">
                  {attachmentConfig.map((item) => {
                    const attachment = data.attachments[item.key];
                    return (
                      <div key={item.key} className="rounded-[1.25rem] border border-stone-200 bg-white p-5">
                        <CheckCard checked={attachment.included} label={isRtl ? item.label : certificateEnglish.attachments[item.key]} onChange={(checked) => updateAttachment(item.key, { included: checked })} />
                        {attachment.included && (
                          <div className="mt-5 grid gap-5 lg:grid-cols-2">
                            {item.hasDescription && (
                              <Field field={{ key: "additionalNotes", label: isRtl ? "التوضيح" : uiLabels.description, type: "textarea", required: true }} value={attachment.description ?? ""} error={errors[`attachments.${item.key}.description`]} onChange={(_, value) => updateAttachment(item.key, { description: value })} />
                            )}
                            <div className={item.hasDescription ? "" : "lg:col-span-2"}>
                              <FileUploadBox label={isRtl ? "إرفاق الملفات" : uiLabels.attachmentFiles} files={attachment.files} error={errors[`attachments.${item.key}.files`]} onChange={(files) => updateAttachment(item.key, { files })} />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </SectionGroup>
            )}

            {activeStep === 3 && (
              <div className="space-y-9">
                <SectionGroup title={isRtl ? "معلومات وإشعارات مهمة" : section.notices}>
                  <div className="space-y-4">
                    {(isRtl ? importantNotices : certificateEnglish.notices).map((notice, index) => (
                      <div key={notice} className="flex items-start gap-3 rounded-[1.15rem] border border-stone-100 bg-white p-4 text-[14px] font-bold leading-7 text-stone-700">
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-stone-950 text-xs font-black text-white">{index + 1}</span>
                        <p>{notice}</p>
                      </div>
                    ))}
                  </div>
                </SectionGroup>
                <SectionGroup title={isRtl ? "بعد موافقة الجهة المعنية بالحلال أو الجهة المعينة على هذا الطلب، يرجى مراعاة ما يلي:" : section.commitments}>
                  <div className="space-y-4">
                    {(isRtl ? commitments : certificateEnglish.commitments).map((commitment, index) => (
                      <div key={commitment} className="flex items-start gap-3 rounded-[1.15rem] border border-stone-100 bg-white p-4 text-[14px] font-bold leading-7 text-stone-700">
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#007A55] text-xs font-black text-white">{index + 1}</span>
                        <p>{commitment}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <CheckCard
                      checked={data.declarationAccepted}
                      label={isRtl ? "أقر بأنني قرأت جميع المعلومات والتعهدات الواردة أعلاه، وأوافق على الالتزام بها، وأؤكد صحة البيانات والوثائق المقدمة في هذا الطلب." : uiLabels.declaration}
                      error={errors.declarationAccepted}
                      onChange={(checked) => updateField("declarationAccepted", checked)}
                    />
                  </div>
                </SectionGroup>
              </div>
            )}

            {activeStep === 4 && (
              <SectionGroup title={isRtl ? "بيانات مقدم الطلب" : section.applicant}>
                <div className="grid gap-x-8 gap-y-8 lg:grid-cols-2">
                  {applicantFields.map((field) => (
                    <div key={field.key} className={field.type === "textarea" ? "lg:col-span-2" : ""}>
                      <Field field={localizedField(field)} value={String(data[field.key] ?? "")} error={errors[String(field.key)]} onChange={updateField} />
                    </div>
                  ))}
                  <div className="lg:col-span-2">
                    <SignaturePad value={signatureDataUrl} isRtl={isRtl} onChange={updateSignature} error={errors.applicantSignature} />
                  </div>
                </div>
              </SectionGroup>
            )}

            {activeStep === 5 && (
              <div className="space-y-6">
                <ReviewGroup editLabel={isRtl ? "تعديل" : uiLabels.edit} emptyLabel={isRtl ? "غير مدخل" : reviewText.notEntered} title={isRtl ? "معلومات الشركة" : reviewText.company} onEdit={() => jumpToStep(0)} items={[
                  { label: fieldLabel(generalFields[0]), value: payload.companyInformation.companyRegisteredNameAr },
                  { label: fieldLabel(generalFields[1]), value: payload.companyInformation.companyRegisteredNameEn },
                  { label: fieldLabel(generalFields[4]), value: payload.companyInformation.country },
                  { label: isRtl ? "طبيعة الشركة" : uiLabels.companyNature, value: optionLabel(payload.companyInformation.companyNature) },
                  { label: isRtl ? "هل يقدم الطلب لأول مرة؟" : uiLabels.firstApplication, value: optionLabel(String(payload.companyInformation.isFirstApplication ?? "")) },
                  { label: isRtl ? "الغرض من الطلب" : uiLabels.purpose, value: payload.companyInformation.applicationPurpose.map((item) => purposeLabel(item, lang)).join(isRtl ? "، " : ", ") },
                ]} />
                <ReviewGroup editLabel={isRtl ? "تعديل" : uiLabels.edit} emptyLabel={isRtl ? "غير مدخل" : reviewText.notEntered} title={isRtl ? "معلومات الاتصال" : reviewText.contact} onEdit={() => jumpToStep(0)} items={[
                  { label: fieldLabel(generalFields[5]), value: payload.companyInformation.phone },
                  { label: fieldLabel(generalFields[6]), value: payload.companyInformation.fax },
                  { label: fieldLabel(generalFields[7]), value: payload.companyInformation.website },
                  { label: fieldLabel(generalFields[8]), value: payload.companyInformation.companyEmail },
                  { label: fieldLabel(generalFields[9]), value: payload.companyInformation.responsiblePersonName },
                  { label: fieldLabel(generalFields[10]), value: payload.companyInformation.managerEmail },
                  { label: fieldLabel(generalFields[11]), value: payload.companyInformation.responsiblePersonMobile },
                  { label: fieldLabel(generalFields[12]), value: payload.companyInformation.qualityManagerName },
                ]} />
                <ReviewGroup editLabel={isRtl ? "تعديل" : uiLabels.edit} emptyLabel={isRtl ? "غير مدخل" : reviewText.notEntered} title={isRtl ? "معلومات المنتج" : reviewText.product} onEdit={() => jumpToStep(1)} items={[
                  { label: isRtl ? "المنتجات المطلوبة" : uiLabels.requestedProducts, value: payload.productInformation.requestedProducts.join(isRtl ? "، " : ", ") },
                  { label: isRtl ? "وصف المنتج" : certificateEnglish.fields.productDescription, value: payload.productInformation.productDescription },
                  { label: isRtl ? "منتجات أخرى" : uiLabels.otherFactoryProducts, value: payload.productInformation.otherFactoryProducts.join(isRtl ? "، " : ", ") },
                  { label: isRtl ? "شهادة حلال أخرى" : uiLabels.hasOtherHalalCertificate, value: optionLabel(String(payload.productInformation.hasOtherHalalCertificate ?? "")) },
                  { label: isRtl ? "مجال الشهادة" : certificateEnglish.fields.otherHalalCertificateScope, value: payload.productInformation.otherHalalCertificateScope },
                  { label: isRtl ? "المواصفة المرجعية" : certificateEnglish.fields.otherHalalReferenceStandard, value: payload.productInformation.otherHalalReferenceStandard },
                  { label: isRtl ? "الجهة المانحة" : certificateEnglish.fields.otherHalalCertifyingBody, value: payload.productInformation.otherHalalCertifyingBody },
                ]} />
                <ReviewGroup editLabel={isRtl ? "تعديل" : uiLabels.edit} emptyLabel={isRtl ? "غير مدخل" : reviewText.notEntered} title={isRtl ? "الوثائق المرفقة" : reviewText.attachments} onEdit={() => jumpToStep(2)} items={attachmentConfig.map((item) => ({
                  label: isRtl ? item.label : certificateEnglish.attachments[item.key],
                  value: data.attachments[item.key].included ? fileNames(data.attachments[item.key].files).join(isRtl ? "، " : ", ") : (isRtl ? "غير مرفق" : reviewText.notAttached),
                }))} />
                <ReviewGroup editLabel={isRtl ? "تعديل" : uiLabels.edit} emptyLabel={isRtl ? "غير مدخل" : reviewText.notEntered} title={isRtl ? "بيانات مقدم الطلب" : reviewText.applicant} onEdit={() => jumpToStep(4)} items={[
                  { label: fieldLabel(applicantFields[0]), value: payload.applicantInformation.applicantName },
                  { label: fieldLabel(applicantFields[1]), value: payload.applicantInformation.applicantJobTitle },
                  { label: fieldLabel(applicantFields[2]), value: payload.applicantInformation.applicationDate },
                  { label: uiLabels.signature, value: signatureDataUrl ? (isRtl ? "تم تسجيل التوقيع الإلكتروني" : "Electronic signature captured") : payload.applicantInformation.applicantSignature },
                  { label: fieldLabel(applicantFields[3]), value: payload.applicantInformation.additionalNotes },
                  { label: isRtl ? "الموافقة على التعهدات" : "Declaration acceptance", value: payload.declarationAccepted ? (isRtl ? "تمت الموافقة" : reviewText.accepted) : (isRtl ? "لم تتم الموافقة" : reviewText.notAccepted) },
                ]} />
                {status === "error" && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black leading-7 text-red-700">{submitError || (isRtl ? "تعذر إرسال الطلب حالياً. يرجى التحقق من البيانات والمحاولة مرة أخرى." : uiLabels.error)}</p>}
              </div>
            )}
          </div>
        </motion.section>
      </AnimatePresence>

      <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D6B66A]/30 bg-[#FFFDF6]/90 px-5 py-3.5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-bold text-stone-800">{isRtl ? "يتم الاحتفاظ بالملفات داخل النموذج ولا يتم رفعها قبل إرسال الطلب." : uiLabels.footerNote}</p>
          <div className="flex items-center gap-3">
            <button type="button" onClick={goPrevious} disabled={activeStep === 0 || isSubmitting} className="inline-flex h-11 min-w-[104px] items-center justify-center rounded-xl border-2 border-stone-200 bg-white px-6 text-[13px] font-black text-stone-900 transition-all hover:border-stone-400 hover:bg-stone-50 disabled:opacity-30">{isRtl ? "السابق" : uiLabels.previous}</button>
            {activeStep === steps.length - 1 ? (
              <button type="button" onClick={submitApplication} disabled={isSubmitting} className="inline-flex h-11 min-w-[168px] items-center justify-center gap-2 rounded-xl bg-[#007A55] px-7 text-[13px] font-black text-white shadow-[0_20px_40px_-12px_rgba(0,122,85,0.4)] transition-all hover:brightness-110 disabled:opacity-50">
                {isSubmitting && (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {isSubmitting ? (isRtl ? "جار الإرسال..." : uiLabels.submitting) : (isRtl ? "إرسال الطلب الآن" : uiLabels.submit)}
              </button>
            ) : (
              <button type="button" onClick={goNext} className="inline-flex h-11 min-w-[150px] items-center justify-center rounded-xl bg-[#007A55] px-7 text-[13px] font-black text-white shadow-[0_20px_40px_-12px_rgba(0,122,85,0.4)] transition-all hover:brightness-110">{isRtl ? "المرحلة التالية" : uiLabels.next}</button>
            )}
          </div>
        </div>
      </footer>
    </main>
  );
}

