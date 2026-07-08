import type { Prisma } from "@prisma/client";

// ---------------------------------------------------------------------------
// Base Prisma-derived model types (re-exported directly from the generated client)
// ---------------------------------------------------------------------------

export type {
  Application,
  Attachment,
  DesignationBodyApplication,
  CertificateApplication,
  AppointedBody,
  Certificate,
  CertificateStatusLog,
  Payment,
  SurveillanceReport,
  AdminUser,
  ApplicationType,
  ApplicationStatus,
  YesNo,
  CompanyNature,
  CertPurpose,
  DesignationBodyType,
  EntityStatus,
  CertificateStatus,
  FeeType,
  PaymentStatus,
  AdminRole,
} from "@prisma/client";

import type { AdminUser } from "@prisma/client";

// ---------------------------------------------------------------------------
// Composite (relation-inclusive) types used by lib/db helper return values
// ---------------------------------------------------------------------------

const applicationDetailArgs = {
  include: {
    designationBodyApp: true,
    certificateApp: true,
    attachments: true,
    reviewer: true,
  },
} satisfies Prisma.ApplicationDefaultArgs;
export type ApplicationDetail = Prisma.ApplicationGetPayload<typeof applicationDetailArgs>;

const designationBodyDetailArgs = {
  include: {
    appointedBodies: true,
    payments: true,
  },
} satisfies Prisma.DesignationBodyApplicationDefaultArgs;
export type DesignationBodyDetail = Prisma.DesignationBodyApplicationGetPayload<
  typeof designationBodyDetailArgs
>;

const certificateDetailArgs = {
  include: {
    statusHistory: true,
    appointedBody: true,
    certificateApp: true,
  },
} satisfies Prisma.CertificateDefaultArgs;
export type CertificateDetail = Prisma.CertificateGetPayload<typeof certificateDetailArgs>;

const surveillanceReportDetailArgs = {
  include: {
    createdByUser: true,
  },
} satisfies Prisma.SurveillanceReportDefaultArgs;
export type SurveillanceReportDetail = Prisma.SurveillanceReportGetPayload<
  typeof surveillanceReportDetailArgs
>;

const designationBodyApplicationCreateArgs = {
  include: {
    designationBodyApp: true,
  },
} satisfies Prisma.ApplicationDefaultArgs;
export type ApplicationWithDesignationBody = Prisma.ApplicationGetPayload<
  typeof designationBodyApplicationCreateArgs
>;

const certificateApplicationCreateArgs = {
  include: {
    certificateApp: true,
  },
} satisfies Prisma.ApplicationDefaultArgs;
export type ApplicationWithCertificateApp = Prisma.ApplicationGetPayload<
  typeof certificateApplicationCreateArgs
>;

export type AdminUserSafe = Omit<AdminUser, "passwordHash">;

// ---------------------------------------------------------------------------
// Shared pagination shapes
// ---------------------------------------------------------------------------

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};
