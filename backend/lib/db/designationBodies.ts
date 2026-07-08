import type { Prisma, EntityStatus, DesignationBodyType } from "@prisma/client";
import { prisma } from "../prisma";
import type {
  DesignationBodyApplication,
  DesignationBodyDetail,
  PaginatedResult,
  PaginationParams,
} from "./types";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

export async function getDesignationBodyByApplicationId(
  applicationId: string
): Promise<DesignationBodyDetail | null> {
  return prisma.designationBodyApplication.findUnique({
    where: { applicationId },
    include: {
      appointedBodies: true,
      payments: true,
    },
  });
}

export async function listDesignationBodies(
  filters: {
    status?: EntityStatus;
    country?: string;
    bodyType?: DesignationBodyType;
  } & PaginationParams = {}
): Promise<PaginatedResult<DesignationBodyApplication>> {
  const page = filters.page ?? DEFAULT_PAGE;
  const limit = filters.limit ?? DEFAULT_LIMIT;

  const where: Prisma.DesignationBodyApplicationWhereInput = {
    ...(filters.status ? { status: filters.status } : {}),
    ...(filters.country ? { country: filters.country } : {}),
    ...(filters.bodyType ? { bodyType: filters.bodyType } : {}),
  };

  const [data, total] = await prisma.$transaction([
    prisma.designationBodyApplication.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { organizationNameEn: "asc" },
    }),
    prisma.designationBodyApplication.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function updateDesignationBodyStatus(
  id: string,
  status: EntityStatus
): Promise<DesignationBodyApplication> {
  return prisma.designationBodyApplication.update({
    where: { id },
    data: { status },
  });
}

export async function signContract(
  id: string,
  contractFileUrl: string
): Promise<DesignationBodyApplication> {
  return prisma.designationBodyApplication.update({
    where: { id },
    data: {
      contractSignedAt: new Date(),
      contractFileUrl,
    },
  });
}
