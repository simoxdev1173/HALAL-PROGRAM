import type { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import type {
  SurveillanceReport,
  SurveillanceReportDetail,
  PaginatedResult,
  PaginationParams,
} from "./types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

export async function listSurveillanceReports(
  filters: { country?: string } & PaginationParams = {}
): Promise<PaginatedResult<SurveillanceReport>> {
  const page = filters.page ?? DEFAULT_PAGE;
  const limit = filters.limit ?? DEFAULT_LIMIT;

  const where: Prisma.SurveillanceReportWhereInput = {
    ...(filters.country ? { country: filters.country } : {}),
  };

  const [data, total] = await prisma.$transaction([
    prisma.surveillanceReport.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { receivedAt: "desc" },
    }),
    prisma.surveillanceReport.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function createSurveillanceReport(data: {
  surveillanceBodyName: string;
  country: string;
  periodLabel: string;
  periodStart: Date;
  periodEnd: Date;
  reportFileUrl: string;
  reportFileName: string;
  violationsSummary?: string;
  violationsCount?: number;
  licensedProductsListUrl?: string;
  notes?: string;
  createdBy?: string;
}): Promise<SurveillanceReport> {
  return prisma.surveillanceReport.create({
    data: {
      surveillanceBodyName: data.surveillanceBodyName,
      country: data.country,
      periodLabel: data.periodLabel,
      periodStart: data.periodStart,
      periodEnd: data.periodEnd,
      reportFileUrl: data.reportFileUrl,
      reportFileName: data.reportFileName,
      violationsSummary: data.violationsSummary ?? null,
      violationsCount: data.violationsCount ?? null,
      licensedProductsListUrl: data.licensedProductsListUrl ?? null,
      notes: data.notes ?? null,
      createdBy: data.createdBy ?? null,
    },
  });
}

export async function getSurveillanceReportById(
  id: string
): Promise<SurveillanceReportDetail | null> {
  return prisma.surveillanceReport.findUnique({
    where: { id },
    include: {
      createdByUser: true,
    },
  });
}
