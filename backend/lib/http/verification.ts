import type { CertificateStatus, Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export type VerificationSearchType = "license" | "company" | "all";

const statusToken: Record<CertificateStatus, "Active" | "Suspended" | "Revoked" | "Expired"> = {
  ACTIVE: "Active",
  SUSPENDED: "Suspended",
  REVOKED: "Revoked",
  EXPIRED: "Expired",
};

const purposeLabel: Record<string, string> = {
  ARAB_HALAL_CERTIFICATE: "شهادة الحلال العربية",
  ARAB_HALAL_MARK: "علامة الحلال العربية",
};

function jsonValues(value: Prisma.JsonValue): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

export async function verifyCertificates(query: string, type: VerificationSearchType) {
  const search = query.trim();
  const companySearch: Prisma.CertificateWhereInput = {
    OR: [
      { certificateApp: { companyRegisteredNameAr: { contains: search, mode: "insensitive" } } },
      { certificateApp: { companyRegisteredNameEn: { contains: search, mode: "insensitive" } } },
    ],
  };
  const licenseSearch: Prisma.CertificateWhereInput = {
    certificateNumber: { contains: search, mode: "insensitive" },
  };

  const where: Prisma.CertificateWhereInput = !search
    ? {}
    : type === "license"
      ? licenseSearch
      : type === "company"
        ? companySearch
        : { OR: [licenseSearch, companySearch] };

  const rows = await prisma.certificate.findMany({
    where,
    take: 50,
    orderBy: { createdAt: "desc" },
    include: { certificateApp: true, appointedBody: true },
  });

  const now = new Date();
  const data = rows.map((row) => {
    const products = jsonValues(row.productNames);
    const effectiveStatus = row.status === "ACTIVE" && row.expiryDate < now ? "Expired" : statusToken[row.status];
    const companyName = row.certificateApp.companyRegisteredNameAr || row.certificateApp.companyRegisteredNameEn;
    const location = [row.certificateApp.companyRegisteredAddressAr, row.certificateApp.country].filter(Boolean).join("، ");
    return {
      id: row.id,
      companyName,
      companyNameEn: row.certificateApp.companyRegisteredNameEn,
      licenseNumber: row.certificateNumber,
      status: effectiveStatus,
      issuedAt: row.issueDate.toISOString().slice(0, 10),
      expiryDate: row.expiryDate.toISOString().slice(0, 10),
      standards: [row.certificateApp.otherHalalReferenceStandard].filter((value): value is string => Boolean(value)),
      certificateUrl: "",
      location,
      country: row.certificateApp.country,
      category: products[0] || purposeLabel[row.purpose] || "منتجات حلال",
      products,
      purpose: purposeLabel[row.purpose] || row.purpose,
      appointedBodyName: row.appointedBody.name,
      image: "/domains/prod.webp",
    };
  });

  return { data, total: data.length, query: search, type };
}
