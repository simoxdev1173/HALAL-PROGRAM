import type { Prisma, FeeType, PaymentStatus } from "@prisma/client";
import { prisma } from "../prisma";
import type { Payment, PaginatedResult, PaginationParams } from "./types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

export async function listPayments(
  filters: {
    feeType?: FeeType;
    status?: PaymentStatus;
  } & PaginationParams = {}
): Promise<PaginatedResult<Payment>> {
  const page = filters.page ?? DEFAULT_PAGE;
  const limit = filters.limit ?? DEFAULT_LIMIT;

  const where: Prisma.PaymentWhereInput = {
    ...(filters.feeType ? { feeType: filters.feeType } : {}),
    ...(filters.status ? { status: filters.status } : {}),
  };

  const [data, total] = await prisma.$transaction([
    prisma.payment.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.payment.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function createPayment(data: {
  feeType: FeeType;
  amountUsd: number;
  designationBodyId?: string;
  certificateId?: string;
  periodStart?: Date;
  periodEnd?: Date;
}): Promise<Payment> {
  return prisma.payment.create({
    data: {
      feeType: data.feeType,
      amountUsd: data.amountUsd,
      status: "PENDING",
      designationBodyId: data.designationBodyId ?? null,
      certificateId: data.certificateId ?? null,
      periodStart: data.periodStart ?? null,
      periodEnd: data.periodEnd ?? null,
    },
  });
}

export async function confirmPayment(
  id: string,
  receiptUrl: string,
  receiptFileName: string,
  confirmedBy: string
): Promise<Payment> {
  return prisma.payment.update({
    where: { id },
    data: {
      status: "CONFIRMED",
      paidAt: new Date(),
      receiptUrl,
      receiptFileName,
      confirmedBy,
    },
  });
}

export async function getPendingPayments(): Promise<Payment[]> {
  return prisma.payment.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
  });
}

export async function getOverduePayments(): Promise<Payment[]> {
  return prisma.payment.findMany({
    where: { status: "OVERDUE" },
  });
}
