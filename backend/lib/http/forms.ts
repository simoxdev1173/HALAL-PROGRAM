// Transform + validate the raw JSON payloads that the public application forms
// (JoinProgram + Halal certificate/mark) POST, into Prisma create inputs.
//
// The forms already validate on the client; everything here is a server-side
// safety net that returns structured, field-level errors (HTTP 400) so the UI
// can surface professional messages instead of a generic failure.

import type {
  CompanyNature,
  CertPurpose,
  YesNo,
} from "@prisma/client";
import type {
  DesignationBodyFormData,
  CertificateFormData,
} from "../db/applications";

export type FieldErrors = Record<string, string>;

export class ValidationError extends Error {
  fields: FieldErrors;
  constructor(fields: FieldErrors) {
    super("VALIDATION_ERROR");
    this.name = "ValidationError";
    this.fields = fields;
  }
}

export type AttachmentInput = {
  category: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSizeBytes?: number;
  mimeType?: string;
};

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const str = (value: unknown): string => (typeof value === "string" ? value.trim() : "");
const optStr = (value: unknown): string | undefined => {
  const v = str(value);
  return v.length ? v : undefined;
};
const bool = (value: unknown): boolean => value === true || value === "true";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const isEmail = (value: string) => EMAIL_RE.test(value);

const AR_YES = "نعم";
const AR_NO = "لا";

const toYesNo = (value: unknown): YesNo | undefined => {
  const v = str(value);
  if (v === AR_YES || v === "YES" || v === "yes") return "YES";
  if (v === AR_NO || v === "NO" || v === "no") return "NO";
  return undefined;
};

const toDate = (value: unknown): Date | null => {
  const v = str(value);
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};

const REQUIRED = "هذا الحقل مطلوب.";
const INVALID_EMAIL = "يرجى إدخال بريد إلكتروني صحيح.";
const INVALID_DATE = "يرجى إدخال تاريخ صحيح.";

// ===========================================================================
// 1. Designation Body application  (JoinProgram form)
// ===========================================================================

export function parseDesignationBodyPayload(raw: unknown): DesignationBodyFormData {
  const payload = (raw ?? {}) as Record<string, any>;
  const org = (payload.organization ?? {}) as Record<string, unknown>;
  const mgmt = (payload.seniorManagement ?? {}) as Record<string, unknown>;
  const contact = (payload.contactOfficer ?? {}) as Record<string, unknown>;
  const report = (payload.firstApplicationReport ?? {}) as Record<string, unknown>;
  const attach = (payload.attachments ?? {}) as Record<string, unknown>;
  const national = (payload.nationalHalalCertification ?? {}) as Record<string, unknown>;
  const other = (payload.otherCertificates ?? {}) as Record<string, unknown>;
  const ack = (payload.acknowledgement ?? {}) as Record<string, unknown>;

  const errors: FieldErrors = {};

  const requireText = (field: string, value: string) => {
    if (!value) errors[field] = REQUIRED;
    return value;
  };

  const organizationNameAr = requireText("organizationNameAr", str(org.nameAr));
  const organizationNameEn = requireText("organizationNameEn", str(org.nameEn));
  const organizationAddressAr = requireText("organizationAddressAr", str(org.addressAr));
  const organizationAddressEn = requireText("organizationAddressEn", str(org.addressEn));
  const country = requireText("country", str(org.country));
  const phone = requireText("phone", str(org.phone));
  const email = requireText("email", str(org.email));
  if (email && !isEmail(email)) errors.email = INVALID_EMAIL;

  const headName = requireText("headName", str(mgmt.headName));
  const headEmail = requireText("headEmail", str(mgmt.headEmail));
  if (headEmail && !isEmail(headEmail)) errors.headEmail = INVALID_EMAIL;
  const headMobile = requireText("headMobile", str(mgmt.headMobile));

  const contactOfficerName = requireText("contactOfficerName", str(contact.name));
  const contactOfficerEmail = requireText("contactOfficerEmail", str(contact.email));
  if (contactOfficerEmail && !isEmail(contactOfficerEmail)) errors.contactOfficerEmail = INVALID_EMAIL;
  const contactOfficerMobile = requireText("contactOfficerMobile", str(contact.mobile));

  const isFirstApplication = toYesNo(report.isFirstApplication);
  if (!isFirstApplication) errors.isFirstApplication = REQUIRED;
  const firstApplicationReportFiles = Array.isArray(report.files)
    ? report.files.map(str).filter(Boolean)
    : [];
  if (isFirstApplication === "YES" && firstApplicationReportFiles.length === 0) {
    errors.firstApplicationReportFiles = "يرجى إرفاق تقرير التقديم لأول مرة.";
  }

  const signatureHeadName = requireText("signatureHeadName", str(ack.signatureHeadName));
  const signatureDate = toDate(ack.signatureDate);
  if (!str(ack.signatureDate)) errors.signatureDate = REQUIRED;
  else if (!signatureDate) errors.signatureDate = INVALID_DATE;
  if (!bool(ack.acceptedConditions)) errors.applicantAcknowledgement = "يجب الموافقة على الشروط قبل الإرسال.";

  if (Object.keys(errors).length) throw new ValidationError(errors);

  return {
    organizationNameAr,
    organizationNameEn,
    organizationAddressAr,
    organizationAddressEn,
    country,
    phone,
    fax: optStr(org.fax),
    website: optStr(org.website),
    email,

    headName,
    headEmail,
    headMobile,

    contactOfficerName,
    contactOfficerEmail,
    contactOfficerMobile,

    isFirstApplication,

    accreditationCertificatesCopy: bool(attach.accreditationCertificatesCopy),
    appointmentDesignationCopy: bool(attach.appointmentDesignationCopy),
    otherDocuments: bool(attach.otherDocuments),
    otherDocumentsDescription: optStr(attach.otherDocumentsDescription),

    grantsNationalHalalCertificate: toYesNo(national.grantsNationalHalalCertificate),
    nationalHalalCertificateName: optStr(national.nationalHalalCertificateName),
    nationalHalalReferenceStandard: optStr(national.nationalHalalReferenceStandard),
    coveredProductCategories: optStr(national.coveredProductCategories),
    hasOtherNationalHalalBodies: toYesNo(national.hasOtherNationalHalalBodies),
    otherNationalHalalBodiesNames: optStr(national.otherNationalHalalBodiesNames),

    grantsOtherCertificates: toYesNo(other.grantsOtherCertificates),
    otherCertificatesNames: optStr(other.otherCertificatesNames),
    otherCertificatesReferenceStandards: optStr(other.otherCertificatesReferenceStandards),
    otherCertificatesScope: optStr(other.otherCertificatesScope),

    applicantAcknowledgement: bool(ack.acceptedConditions),
    signatureHeadName,
    signatureDate: signatureDate as Date,
    additionalNotes: optStr(ack.additionalNotes),
  };
}

// Keep declared file names as a fallback for old drafts or requests that reach
// the API without their multipart binary. Real uploads are matched by category
// and name in the route handler, so no duplicate attachment is persisted.
export function collectDesignationBodyDeclaredFiles(raw: unknown): AttachmentInput[] {
  const payload = (raw ?? {}) as Record<string, any>;
  const report = (payload.firstApplicationReport ?? {}) as Record<string, unknown>;
  const attach = (payload.attachments ?? {}) as Record<string, unknown>;

  const groups: { category: string; names: unknown }[] = [
    { category: "first-application-report", names: report.files },
    { category: "accreditation-certificates", names: attach.accreditationCertificatesFiles },
    { category: "appointment-designation", names: attach.appointmentDesignationFiles },
    { category: "other-documents", names: attach.otherDocumentsFiles },
  ];

  const out: AttachmentInput[] = [];
  for (const group of groups) {
    if (!Array.isArray(group.names)) continue;
    for (const name of group.names) {
      const fileName = str(name);
      if (!fileName) continue;
      out.push({
        category: group.category,
        fileName,
        fileUrl: `declared://${encodeURIComponent(fileName)}`,
      });
    }
  }
  return out;
}

// ===========================================================================
// 2. Certificate application  (Halal certificate / Halal mark form)
// ===========================================================================

const ATTACHMENT_KEY_TO_FLAG: Record<string, keyof CertificateFormData> = {
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

const toCompanyNature = (value: unknown): CompanyNature | undefined => {
  const v = str(value);
  if (v === "مصنعة" || v === "MANUFACTURER") return "MANUFACTURER";
  if (v === "موردة" || v === "SUPPLIER") return "SUPPLIER";
  return undefined;
};

const toPurposes = (value: unknown): CertPurpose[] => {
  if (!Array.isArray(value)) return [];
  const out: CertPurpose[] = [];
  for (const item of value) {
    const v = str(item);
    if (v === "arab_halal_certificate" || v === "ARAB_HALAL_CERTIFICATE") out.push("ARAB_HALAL_CERTIFICATE");
    else if (v === "arab_halal_mark" || v === "ARAB_HALAL_MARK") out.push("ARAB_HALAL_MARK");
  }
  return out;
};

const cleanArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.map(str).filter(Boolean) : [];

export function parseCertificatePayload(raw: unknown): CertificateFormData {
  const payload = (raw ?? {}) as Record<string, any>;
  const company = (payload.companyInformation ?? {}) as Record<string, unknown>;
  const product = (payload.productInformation ?? {}) as Record<string, unknown>;
  const attachments = (payload.attachments ?? {}) as Record<string, { included?: boolean; description?: string }>;
  const applicant = (payload.applicantInformation ?? {}) as Record<string, unknown>;

  const errors: FieldErrors = {};
  const requireText = (field: string, value: string) => {
    if (!value) errors[field] = REQUIRED;
    return value;
  };

  const companyRegisteredNameAr = requireText("companyRegisteredNameAr", str(company.companyRegisteredNameAr));
  const companyRegisteredNameEn = requireText("companyRegisteredNameEn", str(company.companyRegisteredNameEn));
  const companyRegisteredAddressAr = requireText("companyRegisteredAddressAr", str(company.companyRegisteredAddressAr));
  const companyRegisteredAddressEn = requireText("companyRegisteredAddressEn", str(company.companyRegisteredAddressEn));
  const country = requireText("country", str(company.country));
  const phone = requireText("phone", str(company.phone));
  const companyEmail = requireText("companyEmail", str(company.companyEmail));
  if (companyEmail && !isEmail(companyEmail)) errors.companyEmail = INVALID_EMAIL;
  const responsiblePersonName = requireText("responsiblePersonName", str(company.responsiblePersonName));
  const managerEmail = requireText("managerEmail", str(company.managerEmail));
  if (managerEmail && !isEmail(managerEmail)) errors.managerEmail = INVALID_EMAIL;
  const responsiblePersonMobile = requireText("responsiblePersonMobile", str(company.responsiblePersonMobile));
  const qualityManagerName = requireText("qualityManagerName", str(company.qualityManagerName));

  const companyNature = toCompanyNature(company.companyNature);
  if (!companyNature) errors.companyNature = "يرجى اختيار طبيعة الشركة.";

  const isFirstApplication = toYesNo(company.isFirstApplication);
  if (!isFirstApplication) errors.isFirstApplication = REQUIRED;

  const purposes = toPurposes(company.applicationPurpose);
  if (purposes.length === 0) errors.applicationPurpose = "يرجى تحديد الغرض من تقديم الطلب.";

  const requestedProducts = cleanArray(product.requestedProducts);
  if (requestedProducts.length === 0) errors.requestedProducts = "يرجى إضافة منتج واحد على الأقل.";
  const productDescription = requireText("productDescription", str(product.productDescription));

  const hasOtherHalalCertificate = toYesNo(product.hasOtherHalalCertificate);
  if (!hasOtherHalalCertificate) errors.hasOtherHalalCertificate = REQUIRED;

  const applicantName = requireText("applicantName", str(applicant.applicantName));
  const applicantJobTitle = requireText("applicantJobTitle", str(applicant.applicantJobTitle));
  const applicationDate = toDate(applicant.applicationDate);
  if (!str(applicant.applicationDate)) errors.applicationDate = REQUIRED;
  else if (!applicationDate) errors.applicationDate = INVALID_DATE;

  if (!bool(payload.declarationAccepted)) errors.declarationAccepted = "يجب الموافقة على التعهدات قبل الإرسال.";

  if (Object.keys(errors).length) throw new ValidationError(errors);

  const hasOther = hasOtherHalalCertificate === "YES";

  const data: CertificateFormData = {
    companyRegisteredNameAr,
    companyRegisteredNameEn,
    companyRegisteredAddressAr,
    companyRegisteredAddressEn,
    country,
    companyNature: companyNature as CompanyNature,
    phone,
    fax: optStr(company.fax),
    website: optStr(company.website),
    companyEmail,
    responsiblePersonName,
    managerEmail,
    responsiblePersonMobile,
    qualityManagerName,
    isFirstApplication: isFirstApplication as YesNo,
    purposes,
    branchAddresses: cleanArray(company.branchAddresses),

    requestedProducts,
    productDescription,
    otherFactoryProducts: cleanArray(product.otherFactoryProducts),
    hasOtherHalalCertificate: hasOtherHalalCertificate as YesNo,
    otherHalalCertificateScope: hasOther ? optStr(product.otherHalalCertificateScope) : undefined,
    otherHalalReferenceStandard: hasOther ? optStr(product.otherHalalReferenceStandard) : undefined,
    otherHalalCertifyingBody: hasOther ? optStr(product.otherHalalCertifyingBody) : undefined,

    attNationalHalalCertificate: false,
    attFinalProductTestCertificate: false,
    attRawMaterialTestCertificates: false,
    attQualityOrNationalConformityCert: false,
    attFactoryLicense: false,
    attOtherFactoryCertificates: false,
    attIso22000Certificate: false,
    attHaccpCertificate: false,
    attOther: false,
    attOtherDescription: undefined,

    declarationAccepted: bool(payload.declarationAccepted),
    applicantName,
    applicantJobTitle,
    applicationDate: applicationDate as Date,
    additionalNotes: optStr(applicant.additionalNotes),
  };

  for (const [key, flag] of Object.entries(ATTACHMENT_KEY_TO_FLAG)) {
    const included = bool(attachments[key]?.included);
    (data as Record<string, unknown>)[flag as string] = included;
    if (key === "other" && included) {
      data.attOtherDescription = optStr(attachments.other?.description);
    }
  }

  return data;
}
