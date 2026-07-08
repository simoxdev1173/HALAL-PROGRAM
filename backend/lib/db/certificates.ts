import type { Prisma, CertificateStatus, CertPurpose } from "@prisma/client";
import { prisma } from "../prisma";
import type {
  Certificate,
  CertificateDetail,
  PaginatedResult,
  PaginationParams,
} from "./types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const INITIAL_ISSUANCE_REASON = "شهادة جديدة";

export async function getCertificateById(id: string): Promise<CertificateDetail | null> {
  return prisma.certificate.findUnique({
    where: { id },
    include: {
      statusHistory: true,
      appointedBody: true,
      certificateApp: true,
    },
  });
}

export async function listCertificates(
  filters: {
    status?: CertificateStatus;
    appointedBodyId?: string;
    expiryBefore?: Date;
  } & PaginationParams = {}
): Promise<PaginatedResult<Certificate>> {
  const page = filters.page ?? DEFAULT_PAGE;
  const limit = filters.limit ?? DEFAULT_LIMIT;

  const where: Prisma.CertificateWhereInput = {
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.appointedBodyId ? { appointedBodyId: filters.appointedBodyId } : {}),
    ...(filters.expiryBefore ? { expiryDate: { lte: filters.expiryBefore } } : {}),
  };

  const [data, total] = await prisma.$transaction([
    prisma.certificate.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { issueDate: "desc" },
    }),
    prisma.certificate.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

async function generateCertificateNumber(tx: Prisma.TransactionClient): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `AHP-${year}-`;

  const count = await tx.certificate.count({
    where: { certificateNumber: { startsWith: prefix } },
  });

  const sequence = String(count + 1).padStart(5, "0");
  return `${prefix}${sequence}`;
}

export async function createCertificate(data: {
  certificateAppId: string;
  appointedBodyId: string;
  purpose: CertPurpose;
  productNames: string[];
  issueDate: Date;
  expiryDate: Date;
}): Promise<Certificate> {
  return prisma.$transaction(async (tx) => {
    const certificateNumber = await generateCertificateNumber(tx);

    const certificate = await tx.certificate.create({
      data: {
        certificateAppId: data.certificateAppId,
        appointedBodyId: data.appointedBodyId,
        certificateNumber,
        purpose: data.purpose,
        productNames: data.productNames,
        issueDate: data.issueDate,
        expiryDate: data.expiryDate,
        status: "ACTIVE",
      },
    });

    await tx.certificateStatusLog.create({
      data: {
        certificateId: certificate.id,
        fromStatus: "ACTIVE",
        toStatus: "ACTIVE",
        reason: INITIAL_ISSUANCE_REASON,
      },
    });

    return certificate;
  });
}

export async function changeCertificateStatus(
  id: string,
  toStatus: CertificateStatus,
  changedBy: string,
  reason?: string
): Promise<Certificate> {
  return prisma.$transaction(async (tx) => {
    const current = await tx.certificate.findUniqueOrThrow({
      where: { id },
      select: { status: true },
    });

    const updated = await tx.certificate.update({
      where: { id },
      data: { status: toStatus },
    });

    await tx.certificateStatusLog.create({
      data: {
        certificateId: id,
        fromStatus: current.status,
        toStatus,
        changedBy,
        reason: reason ?? null,
      },
    });

    return updated;
  });
}

export async function getExpiringCertificates(withinDays: number): Promise<Certificate[]> {
  const threshold = new Date();
  threshold.setDate(threshold.getDate() + withinDays);

  return prisma.certificate.findMany({
    where: {
      status: "ACTIVE",
      expiryDate: { lte: threshold },
    },
    orderBy: { expiryDate: "asc" },
  });
}
