// Shapes Prisma rows into the exact column keys + lowercase status tokens that
// src/pages/AdminDashboard.tsx renders. Every list returns { data, total }.

import type {
  EntityStatus,
  CertificateStatus,
  PaymentStatus,
  Prisma,
} from "@prisma/client";
import { prisma } from "../prisma";

export type ListParams = {
  page?: number;
  limit?: number;
  offset?: number;
  search?: string;
  status?: string;
  purpose?: string;
  expiresWithin?: number;
  view?: "requests" | "registered";
};

export type ListResult = { data: Record<string, unknown>[]; total: number; page: number };

export type CreateDesignationBodyInput = {
  nameAr: string;
  nameEn?: string;
  country: string;
  email: string;
  phone: string;
  website?: string;
  address?: string;
  bodyType?: "GOVERNMENTAL" | "NON_GOVERNMENTAL";
  headName?: string;
  contactOfficerName?: string;
};

export type CreateAppointedBodyInput = {
  designationBodyId: string;
  name: string;
  country: string;
  accreditationScope: string;
};

const DEFAULT_LIMIT = 20;
const clampLimit = (n?: number) => Math.min(Math.max(n ?? DEFAULT_LIMIT, 1), 100);

const fmtDate = (d?: Date | null): string => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

// DB status enums -> dashboard status tokens (statusLabels / statusTone keys).
const entityStatusToken: Record<EntityStatus, string> = {
  PENDING: "pending",
  ACTIVE: "active",
  SUSPENDED: "suspended",
  WITHDRAWN: "revoked",
};
const certificateStatusToken: Record<CertificateStatus, string> = {
  ACTIVE: "active",
  SUSPENDED: "suspended",
  REVOKED: "revoked",
  EXPIRED: "expired",
};
const paymentStatusToken: Record<PaymentStatus, string> = {
  PENDING: "pending",
  CONFIRMED: "paid",
  OVERDUE: "overdue",
};

// Dashboard status token (from query) -> DB EntityStatus for filtering.
const tokenToEntityStatus: Record<string, EntityStatus> = {
  pending: "PENDING",
  active: "ACTIVE",
  suspended: "SUSPENDED",
  revoked: "WITHDRAWN",
};
const tokenToCertificateStatus: Record<string, CertificateStatus> = {
  active: "ACTIVE",
  suspended: "SUSPENDED",
  revoked: "REVOKED",
  expired: "EXPIRED",
};

const companyNatureLabel: Record<string, string> = { MANUFACTURER: "مصنّعة", SUPPLIER: "مورّدة" };
const bodyTypeLabel: Record<string, string> = { GOVERNMENTAL: "حكومية", NON_GOVERNMENTAL: "غير حكومية" };
const feeTypeLabel: Record<string, string> = {
  DESIGNATION_BODY_3YR: "رسوم تفويض (3 سنوات)",
  CERTIFICATE_USE: "رسوم استخدام الشهادة",
};

const certificatePurposeLabel: Record<string, string> = {
  ARAB_HALAL_CERTIFICATE: "شهادة الحلال العربية",
  ARAB_HALAL_MARK: "علامة الحلال العربية",
};
const yesNoLabel: Record<string, string> = { YES: "نعم", NO: "لا" };

const jsonToList = (value: Prisma.JsonValue | null | undefined): string => {
  if (Array.isArray(value)) return value.map((v) => String(v)).filter(Boolean).join("، ");
  if (typeof value === "string") return value;
  return "";
};

export async function createRegisteredDesignationBody(input: CreateDesignationBodyInput) {
  const now = new Date();
  const requestNumber = `AHP-ADMIN-${now.toISOString().replace(/\D/g, "").slice(0, 14)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const headName = input.headName?.trim() || input.nameAr;
  const contactOfficerName = input.contactOfficerName?.trim() || headName;
  const address = input.address?.trim() || "غير محدد";

  const application = await prisma.application.create({
    data: {
      type: "DESIGNATION_BODY",
      status: "ACCEPTED",
      requestNumber,
      submittedAt: now,
      reviewedAt: now,
      designationBodyApp: {
        create: {
          organizationNameAr: input.nameAr,
          organizationNameEn: input.nameEn?.trim() || input.nameAr,
          organizationAddressAr: address,
          organizationAddressEn: address,
          country: input.country,
          phone: input.phone,
          website: input.website?.trim() || null,
          email: input.email,
          headName,
          headEmail: input.email,
          headMobile: input.phone,
          contactOfficerName,
          contactOfficerEmail: input.email,
          contactOfficerMobile: input.phone,
          applicantAcknowledgement: true,
          signatureHeadName: headName,
          signatureDate: now,
          bodyType: input.bodyType ?? "GOVERNMENTAL",
          status: "ACTIVE",
        },
      },
    },
    include: { designationBodyApp: true },
  });

  return { id: application.designationBodyApp?.id ?? "", requestNumber };
}

export async function createRegisteredAppointedBody(input: CreateAppointedBodyInput) {
  const parent = await prisma.designationBodyApplication.findFirst({
    where: { id: input.designationBodyId, status: { in: ["ACTIVE", "SUSPENDED"] } },
    select: { id: true },
  });
  if (!parent) throw new Error("جهة التعيين المحددة غير متاحة.");

  const row = await prisma.appointedBody.create({
    data: {
      designationBodyId: parent.id,
      name: input.name,
      country: input.country,
      accreditationScope: input.accreditationScope,
      status: "ACTIVE",
    },
  });
  return { id: row.id };
}

// ---------------------------------------------------------------------------
// Designation bodies  (JoinProgram submissions land here)
// ---------------------------------------------------------------------------
export async function listDesignationBodies(params: ListParams): Promise<ListResult> {
  const page = Math.max(params.page ?? 1, 1);
  const limit = clampLimit(params.limit);
  const search = (params.search ?? "").trim();
  const statusToken = (params.status ?? "").trim();

  const where: Prisma.DesignationBodyApplicationWhereInput = {};
  if (statusToken && statusToken !== "all" && tokenToEntityStatus[statusToken]) {
    where.status = tokenToEntityStatus[statusToken];
  } else if (params.view === "requests") {
    where.status = "PENDING";
  } else if (params.view === "registered") {
    where.status = { in: ["ACTIVE", "SUSPENDED"] };
  }
  if (search) {
    where.OR = [
      { organizationNameAr: { contains: search, mode: "insensitive" } },
      { organizationNameEn: { contains: search, mode: "insensitive" } },
      { country: { contains: search, mode: "insensitive" } },
    ];
  }

  const [rows, total] = await prisma.$transaction([
    prisma.designationBodyApplication.findMany({
      where,
      skip: params.offset ?? (page - 1) * limit,
      take: limit,
      orderBy: { id: "desc" },
      include: { application: true },
    }),
    prisma.designationBodyApplication.count({ where }),
  ]);

  const data = rows.map((row) => ({
    id: row.id,
    name: row.organizationNameAr || row.organizationNameEn,
    country: row.country,
    type: row.bodyType ? bodyTypeLabel[row.bodyType] ?? row.bodyType : "—",
    joinedAt: fmtDate(row.application?.submittedAt ?? row.application?.createdAt),
    status: entityStatusToken[row.status],
    requestNumber: row.application?.requestNumber ?? "—",
    email: row.email,
    phone: row.phone,
    headName: row.headName,
    contactOfficer: row.contactOfficerName,
    website: row.website ?? "—",
    logoUrl: row.logoUrl ?? "",
  }));

  return { data, total, page };
}

// ---------------------------------------------------------------------------
// Suppliers / establishments  (Halal certificate & mark submissions land here)
// ---------------------------------------------------------------------------
export async function listSuppliers(params: ListParams): Promise<ListResult> {
  const page = Math.max(params.page ?? 1, 1);
  const limit = clampLimit(params.limit);
  const search = (params.search ?? "").trim();
  const statusToken = (params.status ?? "").trim();
  const purpose = (params.purpose ?? "").trim();

  const where: Prisma.CertificateApplicationWhereInput = {
    ...(statusToken && statusToken !== "all" && tokenToEntityStatus[statusToken]
      ? { status: tokenToEntityStatus[statusToken] }
      : {}),
    ...(purpose === "ARAB_HALAL_CERTIFICATE" || purpose === "ARAB_HALAL_MARK"
      ? { purposes: { has: purpose } }
      : {}),
    ...(search
      ? {
          OR: [
            { companyRegisteredNameAr: { contains: search, mode: "insensitive" } },
            { companyRegisteredNameEn: { contains: search, mode: "insensitive" } },
            { country: { contains: search, mode: "insensitive" } },
            { companyEmail: { contains: search, mode: "insensitive" } },
            { application: { requestNumber: { contains: search, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const [rows, total] = await prisma.$transaction([
    prisma.certificateApplication.findMany({
      where,
      skip: params.offset ?? (page - 1) * limit,
      take: limit,
      orderBy: { id: "desc" },
      include: {
        application: { include: { attachments: true } },
        appointedBody: true,
      },
    }),
    prisma.certificateApplication.count({ where }),
  ]);

  const data = rows.map((row) => ({
    id: row.id,
    name: row.companyRegisteredNameAr || row.companyRegisteredNameEn,
    requestNumber: row.application?.requestNumber ?? "—",
    country: row.country,
    category: companyNatureLabel[row.companyNature] ?? row.companyNature,
    purpose: row.purposes.map((purpose) => certificatePurposeLabel[purpose] ?? purpose).join("، "),
    appointedBodyName: row.appointedBody?.name ?? "—",
    registeredAt: fmtDate(row.application?.submittedAt ?? row.application?.createdAt),
    status: entityStatusToken[row.status],
    products: jsonToList(row.requestedProducts) || "—",
    companyRegisteredNameAr: row.companyRegisteredNameAr,
    companyRegisteredNameEn: row.companyRegisteredNameEn,
    companyRegisteredAddressAr: row.companyRegisteredAddressAr,
    companyRegisteredAddressEn: row.companyRegisteredAddressEn,
    branchAddresses: jsonToList(row.branchAddresses) || "—",
    companyEmail: row.companyEmail,
    phone: row.phone,
    fax: row.fax ?? "—",
    website: row.website ?? "—",
    responsiblePerson: row.responsiblePersonName,
    managerEmail: row.managerEmail,
    responsiblePersonMobile: row.responsiblePersonMobile,
    qualityManagerName: row.qualityManagerName,
    firstApplication: yesNoLabel[row.isFirstApplication] ?? row.isFirstApplication,
    productDescription: row.productDescription,
    otherFactoryProducts: jsonToList(row.otherFactoryProducts) || "—",
    hasOtherHalalCertificate: yesNoLabel[row.hasOtherHalalCertificate] ?? row.hasOtherHalalCertificate,
    otherHalalCertificateScope: row.otherHalalCertificateScope ?? "—",
    otherHalalReferenceStandard: row.otherHalalReferenceStandard ?? "—",
    otherHalalCertifyingBody: row.otherHalalCertifyingBody ?? "—",
    applicantName: row.applicantName,
    applicantJobTitle: row.applicantJobTitle,
    applicationDate: fmtDate(row.applicationDate),
    additionalNotes: row.additionalNotes ?? "—",
    declarationAccepted: row.declarationAccepted ? "نعم" : "لا",
    attachments: row.application?.attachments.map((attachment) => ({
      id: attachment.id,
      category: attachment.category,
      fileName: attachment.fileName,
      fileUrl: attachment.fileUrl,
      mimeType: attachment.mimeType,
      uploadedAt: fmtDate(attachment.uploadedAt),
    })) ?? [],
  }));

  return { data, total, page };
}

const attachmentDetails = (attachments: Array<{
  id: string;
  category: string;
  description: string | null;
  fileName: string;
  fileUrl: string;
  fileSizeBytes: number | null;
  mimeType: string | null;
  uploadedAt: Date;
}>) => attachments.map((attachment) => ({
  ...attachment,
  uploadedAt: attachment.uploadedAt.toISOString(),
  available: true,
}));

export async function getDesignationBodyDetails(id: string) {
  const row = await prisma.designationBodyApplication.findUnique({
    where: { id },
    include: { application: { include: { attachments: true } } },
  });
  if (!row) return null;
  const { application, ...formData } = row;
  return {
    id: row.id,
    source: "database",
    applicationType: "join",
    requestNumber: application.requestNumber,
    submittedAt: application.submittedAt ?? application.createdAt,
    status: entityStatusToken[row.status],
    name: row.organizationNameAr || row.organizationNameEn,
    country: row.country,
    purpose: "طلب الانضمام إلى البرنامج",
    formData: { ...formData, signatureDate: row.signatureDate.toISOString() },
    attachments: attachmentDetails(application.attachments),
  };
}

export async function getSupplierApplicationDetails(id: string) {
  const row = await prisma.certificateApplication.findUnique({
    where: { id },
    include: { application: { include: { attachments: true } }, appointedBody: true },
  });
  if (!row) return null;
  const { application, appointedBody, ...formData } = row;
  return {
    id: row.id,
    source: "database",
    applicationType: "certificate",
    requestNumber: application.requestNumber,
    submittedAt: application.submittedAt ?? application.createdAt,
    status: entityStatusToken[row.status],
    name: row.companyRegisteredNameAr || row.companyRegisteredNameEn,
    country: row.country,
    purpose: row.purposes.map((purpose) => certificatePurposeLabel[purpose] ?? purpose).join("، "),
    appointedBodyName: appointedBody?.name ?? "—",
    formData: { ...formData, applicationDate: row.applicationDate.toISOString() },
    attachments: attachmentDetails(application.attachments),
  };
}

// ---------------------------------------------------------------------------
// Appointed bodies
// ---------------------------------------------------------------------------
export async function listAppointedBodies(params: ListParams): Promise<ListResult> {
  const page = Math.max(params.page ?? 1, 1);
  const limit = clampLimit(params.limit);
  const search = (params.search ?? "").trim();
  const statusToken = (params.status ?? "").trim();

  const where: Prisma.AppointedBodyWhereInput = {};
  if (statusToken && statusToken !== "all" && tokenToEntityStatus[statusToken]) {
    where.status = tokenToEntityStatus[statusToken];
  } else if (params.view === "requests") {
    where.status = "PENDING";
  } else if (params.view === "registered") {
    where.status = { in: ["ACTIVE", "SUSPENDED"] };
  }
  if (search) {
    where.OR = [{ name: { contains: search, mode: "insensitive" } }, { country: { contains: search, mode: "insensitive" } }];
  }

  const [rows, total] = await prisma.$transaction([
    prisma.appointedBody.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { appointedAt: "desc" },
      include: { designationBody: true },
    }),
    prisma.appointedBody.count({ where }),
  ]);

  const data = rows.map((row) => ({
    id: row.id,
    name: row.name,
    designationBodyName: row.designationBody?.organizationNameAr ?? "—",
    scope: row.accreditationScope,
    country: row.country,
    appointedAt: fmtDate(row.appointedAt),
    status: entityStatusToken[row.status],
    logoUrl: row.logoUrl ?? "",
  }));

  return { data, total, page };
}

// ---------------------------------------------------------------------------
// Certificates
// ---------------------------------------------------------------------------
export async function listCertificates(params: ListParams): Promise<ListResult> {
  const page = Math.max(params.page ?? 1, 1);
  const limit = clampLimit(params.limit);
  const search = (params.search ?? "").trim();
  const statusToken = (params.status ?? "").trim();

  const where: Prisma.CertificateWhereInput = {
    ...(statusToken && statusToken !== "all" && tokenToCertificateStatus[statusToken]
      ? { status: tokenToCertificateStatus[statusToken] }
      : {}),
    ...(params.expiresWithin
      ? { expiryDate: { lte: new Date(Date.now() + params.expiresWithin * 86400000) }, status: "ACTIVE" }
      : {}),
    ...(search ? { certificateNumber: { contains: search, mode: "insensitive" } } : {}),
  };

  const [rows, total] = await prisma.$transaction([
    prisma.certificate.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { issueDate: "desc" },
      include: { certificateApp: true, appointedBody: true },
    }),
    prisma.certificate.count({ where }),
  ]);

  const data = rows.map((row) => ({
    id: row.id,
    certificateNumber: row.certificateNumber,
    supplierName: row.certificateApp?.companyRegisteredNameAr ?? "—",
    productName: jsonToList(row.productNames) || "—",
    appointedBodyName: row.appointedBody?.name ?? "—",
    issuedAt: fmtDate(row.issueDate),
    expiresAt: fmtDate(row.expiryDate),
    status: certificateStatusToken[row.status],
  }));

  return { data, total, page };
}

// ---------------------------------------------------------------------------
// Violations  (surveillance reports)
// ---------------------------------------------------------------------------
export async function listViolations(params: ListParams): Promise<ListResult> {
  const page = Math.max(params.page ?? 1, 1);
  const limit = clampLimit(params.limit);
  const search = (params.search ?? "").trim();

  const where: Prisma.SurveillanceReportWhereInput = search
    ? { OR: [{ surveillanceBodyName: { contains: search, mode: "insensitive" } }, { country: { contains: search, mode: "insensitive" } }] }
    : {};

  const [rows, total] = await prisma.$transaction([
    prisma.surveillanceReport.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { receivedAt: "desc" },
    }),
    prisma.surveillanceReport.count({ where }),
  ]);

  const data = rows.map((row) => {
    const count = row.violationsCount ?? 0;
    return {
      id: row.id,
      inspectionDate: fmtDate(row.receivedAt ?? row.periodStart),
      location: row.country,
      productName: row.violationsSummary ?? "—",
      supplierName: row.surveillanceBodyName,
      severity: count === 0 ? "منخفضة" : count < 3 ? "متوسطة" : "عالية",
      designationBodyName: row.surveillanceBodyName,
      status: count > 0 ? "open" : "resolved",
      period: row.periodLabel,
      violationsCount: count,
    };
  });

  return { data, total, page };
}

// ---------------------------------------------------------------------------
// Payments
// ---------------------------------------------------------------------------
export async function listPayments(params: ListParams): Promise<ListResult> {
  const page = Math.max(params.page ?? 1, 1);
  const limit = clampLimit(params.limit);
  const statusToken = (params.status ?? "").trim();
  const search = (params.search ?? "").trim();

  const statusMap: Record<string, PaymentStatus> = { paid: "CONFIRMED", pending: "PENDING", overdue: "OVERDUE" };
  const where: Prisma.PaymentWhereInput = {
    ...(statusToken && statusToken !== "all" && statusMap[statusToken] ? { status: statusMap[statusToken] } : {}),
    ...(search ? {
      OR: [
        { designationBody: { organizationNameAr: { contains: search, mode: "insensitive" } } },
        { designationBody: { organizationNameEn: { contains: search, mode: "insensitive" } } },
        { certificate: { certificateNumber: { contains: search, mode: "insensitive" } } },
      ],
    } : {}),
  };

  const [rows, total] = await prisma.$transaction([
    prisma.payment.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { designationBody: true, certificate: true },
    }),
    prisma.payment.count({ where }),
  ]);

  const data = rows.map((row) => ({
    id: row.id,
    payerName: row.designationBody?.organizationNameAr ?? row.certificate?.certificateNumber ?? "—",
    feeType: feeTypeLabel[row.feeType] ?? row.feeType,
    amount: Number(row.amountUsd),
    currency: "USD",
    status: paymentStatusToken[row.status],
    paidAt: fmtDate(row.paidAt),
    receipt: row.receiptFileName ?? "—",
    receiptUrl: row.receiptUrl ?? "",
    notes: row.notes ?? "",
  }));

  return { data, total, page };
}

// ---------------------------------------------------------------------------
// Overview stats + recent activity
// ---------------------------------------------------------------------------
export async function overviewStats() {
  const [designationBodies, appointedBodies, activeCertificates, reports] = await prisma.$transaction([
    prisma.designationBodyApplication.count(),
    prisma.appointedBody.count(),
    prisma.certificate.count({ where: { status: "ACTIVE" } }),
    prisma.surveillanceReport.count({ where: { violationsCount: { gt: 0 } } }),
  ]);
  return { designationBodies, appointedBodies, activeCertificates, openViolations: reports };
}

export async function auditLog(limit = 10): Promise<ListResult> {
  const rows = await prisma.application.findMany({
    take: clampLimit(limit),
    orderBy: { updatedAt: "desc" },
    include: { reviewer: true },
  });

  const typeLabel: Record<string, string> = {
    DESIGNATION_BODY: "طلب جهة تعيين",
    HALAL_CERTIFICATE: "طلب شهادة/علامة حلال",
  };
  const statusLabel: Record<string, string> = {
    DRAFT: "مسودة",
    SUBMITTED: "تم الإرسال",
    UNDER_REVIEW: "قيد المراجعة",
    ACCEPTED: "تم الاعتماد",
    REJECTED: "مرفوض",
  };

  const data = rows.map((row) => ({
    id: row.id,
    actionType: `${typeLabel[row.type] ?? row.type} — ${statusLabel[row.status] ?? row.status}`,
    actor: row.reviewer?.name ?? "النظام",
    createdAt: fmtDate(row.updatedAt),
    timestamp: fmtDate(row.updatedAt),
  }));

  return { data, total: data.length, page: 1 };
}
