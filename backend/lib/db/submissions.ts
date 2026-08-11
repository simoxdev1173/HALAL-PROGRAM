// Atomic "create + submit" for the two public application forms. Each creates
// the Application wrapper, the type-specific record, any attachments, assigns a
// request number, and marks the application SUBMITTED — all in one transaction.

import type { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import type { DesignationBodyFormData, CertificateFormData } from "./applications";
import type { AttachmentInput } from "../http/forms";

async function generateRequestNumber(tx: Prisma.TransactionClient): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `AHP-APP-${year}-`;
  const latestApplication = await tx.application.findFirst({
    where: { requestNumber: { startsWith: prefix } },
    orderBy: { requestNumber: "desc" },
    select: { requestNumber: true },
  });
  const latestSequence = Number.parseInt(
    latestApplication?.requestNumber?.slice(prefix.length) ?? "0",
    10
  );
  const nextSequence = Number.isFinite(latestSequence) ? latestSequence + 1 : 1;
  return `${prefix}${String(nextSequence).padStart(5, "0")}`;
}

function isRequestNumberConflict(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("code" in error)) return false;
  if ((error as { code?: string }).code !== "P2002") return false;

  const target = (error as { meta?: { target?: unknown } }).meta?.target;
  if (Array.isArray(target)) return target.includes("requestNumber");
  return typeof target === "string" && target.includes("requestNumber");
}

async function createWithUniqueRequestNumber<T>(
  createApplication: (tx: Prisma.TransactionClient, requestNumber: string) => Promise<T>
): Promise<T> {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await prisma.$transaction(async (tx) => {
        const requestNumber = await generateRequestNumber(tx);
        return createApplication(tx, requestNumber);
      });
    } catch (error) {
      if (!isRequestNumberConflict(error) || attempt === maxAttempts) throw error;
    }
  }

  throw new Error("Unable to generate a unique application request number.");
}

function attachmentCreateMany(attachments: AttachmentInput[]) {
  return attachments.map((a) => ({
    category: a.category,
    description: a.description ?? null,
    fileUrl: a.fileUrl,
    fileName: a.fileName,
    fileSizeBytes: a.fileSizeBytes ?? null,
    mimeType: a.mimeType ?? null,
  }));
}

export async function submitDesignationBodyApplication(
  data: DesignationBodyFormData,
  attachments: AttachmentInput[]
) {
  return createWithUniqueRequestNumber((tx, requestNumber) => {
    return tx.application.create({
      data: {
        type: "DESIGNATION_BODY",
        status: "SUBMITTED",
        submittedAt: new Date(),
        requestNumber,
        designationBodyApp: { create: data },
        ...(attachments.length ? { attachments: { create: attachmentCreateMany(attachments) } } : {}),
      },
      include: { designationBodyApp: true, attachments: true },
    });
  });
}

export async function submitCertificateApplication(
  data: CertificateFormData,
  attachments: AttachmentInput[]
) {
  return createWithUniqueRequestNumber((tx, requestNumber) => {
    return tx.application.create({
      data: {
        type: "HALAL_CERTIFICATE",
        status: "SUBMITTED",
        submittedAt: new Date(),
        requestNumber,
        certificateApp: { create: data },
        ...(attachments.length ? { attachments: { create: attachmentCreateMany(attachments) } } : {}),
      },
      include: { certificateApp: true, attachments: true },
    });
  });
}
