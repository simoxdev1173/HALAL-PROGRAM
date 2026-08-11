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
  const count = await tx.application.count({ where: { requestNumber: { startsWith: prefix } } });
  return `${prefix}${String(count + 1).padStart(5, "0")}`;
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
  return prisma.$transaction(async (tx) => {
    const requestNumber = await generateRequestNumber(tx);
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
  return prisma.$transaction(async (tx) => {
    const requestNumber = await generateRequestNumber(tx);
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
