import type { Prisma, ApplicationType, ApplicationStatus } from "@prisma/client";
import { prisma } from "../prisma";
import type {
  Application,
  ApplicationDetail,
  ApplicationWithDesignationBody,
  ApplicationWithCertificateApp,
  PaginatedResult,
  PaginationParams,
} from "./types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

export type DesignationBodyFormData = Omit<
  Prisma.DesignationBodyApplicationCreateWithoutApplicationInput,
  "bodyType" | "status" | "feeExempt" | "contractSignedAt" | "contractFileUrl" | "appointedBodies" | "payments"
>;

export type CertificateFormData = Omit<
  Prisma.CertificateApplicationUncheckedCreateWithoutApplicationInput,
  "appointedBodyId" | "status" | "certificates"
>;

export async function getApplicationById(id: string): Promise<ApplicationDetail | null> {
  return prisma.application.findUnique({
    where: { id },
    include: {
      designationBodyApp: true,
      certificateApp: true,
      attachments: true,
      reviewer: true,
    },
  });
}

export async function listApplications(
  filters: {
    type?: ApplicationType;
    status?: ApplicationStatus;
  } & PaginationParams = {}
): Promise<PaginatedResult<Application>> {
  const page = filters.page ?? DEFAULT_PAGE;
  const limit = filters.limit ?? DEFAULT_LIMIT;

  const where: Prisma.ApplicationWhereInput = {
    ...(filters.type ? { type: filters.type } : {}),
    ...(filters.status ? { status: filters.status } : {}),
  };

  const [data, total] = await prisma.$transaction([
    prisma.application.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.application.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function createDesignationBodyApplication(
  data: DesignationBodyFormData
): Promise<ApplicationWithDesignationBody> {
  return prisma.$transaction(async (tx) => {
    return tx.application.create({
      data: {
        type: "DESIGNATION_BODY",
        status: "DRAFT",
        designationBodyApp: {
          create: data,
        },
      },
      include: {
        designationBodyApp: true,
      },
    });
  });
}

export async function createCertificateApplication(
  data: CertificateFormData
): Promise<ApplicationWithCertificateApp> {
  return prisma.$transaction(async (tx) => {
    return tx.application.create({
      data: {
        type: "HALAL_CERTIFICATE",
        status: "DRAFT",
        certificateApp: {
          create: data,
        },
      },
      include: {
        certificateApp: true,
      },
    });
  });
}

async function generateRequestNumber(tx: Prisma.TransactionClient): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `AHP-APP-${year}-`;

  const count = await tx.application.count({
    where: { requestNumber: { startsWith: prefix } },
  });

  const sequence = String(count + 1).padStart(5, "0");
  return `${prefix}${sequence}`;
}

export async function submitApplication(id: string): Promise<Application> {
  return prisma.$transaction(async (tx) => {
    const requestNumber = await generateRequestNumber(tx);

    return tx.application.update({
      where: { id },
      data: {
        status: "SUBMITTED",
        submittedAt: new Date(),
        requestNumber,
      },
    });
  });
}

export async function reviewApplication(
  id: string,
  decision: "ACCEPTED" | "REJECTED",
  reviewedBy: string,
  rejectionReason?: string
): Promise<Application> {
  return prisma.application.update({
    where: { id },
    data: {
      status: decision,
      reviewedAt: new Date(),
      reviewedBy,
      rejectionReason: decision === "REJECTED" ? rejectionReason ?? null : null,
    },
  });
}
