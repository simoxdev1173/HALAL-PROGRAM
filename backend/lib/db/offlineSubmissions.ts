import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import type { ApplicationStatus, ApplicationType } from "@prisma/client";
import type { AttachmentInput } from "../http/forms";

const uploadRoot = path.resolve(process.env.UPLOAD_DIR ?? path.join(__dirname, "..", "..", "uploads"));
const OFFLINE_DIR = path.join(uploadRoot, "offline-submissions");

type OfflineSubmissionInput = {
  type: ApplicationType;
  data: unknown;
  attachments: AttachmentInput[];
};

type OfflineEntityStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "WITHDRAWN";
type OfflineActionHistory = {
  id: string;
  action: string;
  fromStatus: OfflineEntityStatus;
  toStatus: OfflineEntityStatus;
  fromApplicationStatus: ApplicationStatus;
  toApplicationStatus: ApplicationStatus;
  reason?: string;
  createdAt: string;
  undone: boolean;
};

type StoredOfflineSubmission = OfflineSubmissionInput & OfflineSubmissionResult & {
  submittedAt: string;
  entityStatus?: OfflineEntityStatus;
  actionHistory?: OfflineActionHistory[];
};

type OfflineFormData = Record<string, string | number | boolean | string[] | null | undefined>;

export class OfflineSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OfflineSubmissionError";
  }
}

export type OfflineSubmissionResult = {
  id: string;
  requestNumber: string;
  status: ApplicationStatus;
};

function offlineRequestNumber() {
  const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  return `AHP-OFFLINE-${stamp}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
}

export async function saveOfflineSubmission(input: OfflineSubmissionInput): Promise<OfflineSubmissionResult> {
  await fs.mkdir(OFFLINE_DIR, { recursive: true });

  const id = crypto.randomUUID();
  const requestNumber = offlineRequestNumber();
  const status: ApplicationStatus = "SUBMITTED";
  const submittedAt = new Date().toISOString();

  await fs.writeFile(
    path.join(OFFLINE_DIR, `${requestNumber}.json`),
    JSON.stringify({ id, requestNumber, status, submittedAt, entityStatus: "PENDING", actionHistory: [], ...input }, null, 2),
    "utf8"
  );

  return { id, requestNumber, status };
}

async function readStoredSubmissions(): Promise<Array<{ filePath: string; record: StoredOfflineSubmission }>> {
  try {
    const names = await fs.readdir(OFFLINE_DIR);
    const records = await Promise.all(
      names
        .filter((name) => name.endsWith(".json"))
        .map(async (name) => {
          const filePath = path.join(OFFLINE_DIR, name);
          try {
            const record = JSON.parse(await fs.readFile(filePath, "utf8")) as StoredOfflineSubmission;
            return record?.id ? { filePath, record } : null;
          } catch {
            return null;
          }
        })
    );
    return records.filter((item): item is { filePath: string; record: StoredOfflineSubmission } => item !== null);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

const entityStatusToken: Record<OfflineEntityStatus, string> = {
  PENDING: "pending",
  ACTIVE: "active",
  SUSPENDED: "suspended",
  WITHDRAWN: "revoked",
};

const companyNatureLabel: Record<string, string> = {
  MANUFACTURER: "مصنعة",
  SUPPLIER: "موردة",
};

const purposeLabel: Record<string, string> = {
  ARAB_HALAL_CERTIFICATE: "شهادة الحلال العربية",
  ARAB_HALAL_MARK: "علامة الحلال العربية",
};

const listValue = (value: unknown) => Array.isArray(value) ? value.map(String).filter(Boolean).join("، ") : String(value ?? "");
const yesNo = (value: unknown) => value === "YES" ? "نعم" : value === "NO" ? "لا" : String(value ?? "—");

function certificateDashboardRow(record: StoredOfflineSubmission) {
  const data = record.data as OfflineFormData;
  return {
    id: record.id,
    offline: true,
    requestNumber: record.requestNumber,
    name: data.companyRegisteredNameAr || data.companyRegisteredNameEn || "منشأة بدون اسم",
    purpose: Array.isArray(data.purposes) ? data.purposes.map((item: string) => purposeLabel[item] ?? item).join("، ") : "—",
    country: data.country ?? "—",
    category: companyNatureLabel[String(data.companyNature ?? "")] ?? data.companyNature ?? "—",
    appointedBodyName: "—",
    registeredAt: record.submittedAt?.slice(0, 10) ?? "",
    status: entityStatusToken[record.entityStatus ?? "PENDING"],
    products: listValue(data.requestedProducts) || "—",
    companyRegisteredNameAr: data.companyRegisteredNameAr ?? "—",
    companyRegisteredNameEn: data.companyRegisteredNameEn ?? "—",
    companyRegisteredAddressAr: data.companyRegisteredAddressAr ?? "—",
    companyRegisteredAddressEn: data.companyRegisteredAddressEn ?? "—",
    branchAddresses: listValue(data.branchAddresses) || "—",
    companyEmail: data.companyEmail ?? "—",
    phone: data.phone ?? "—",
    fax: data.fax ?? "—",
    website: data.website ?? "—",
    responsiblePerson: data.responsiblePersonName ?? "—",
    managerEmail: data.managerEmail ?? "—",
    responsiblePersonMobile: data.responsiblePersonMobile ?? "—",
    qualityManagerName: data.qualityManagerName ?? "—",
    firstApplication: yesNo(data.isFirstApplication),
    productDescription: data.productDescription ?? "—",
    otherFactoryProducts: listValue(data.otherFactoryProducts) || "—",
    hasOtherHalalCertificate: yesNo(data.hasOtherHalalCertificate),
    otherHalalCertificateScope: data.otherHalalCertificateScope ?? "—",
    otherHalalReferenceStandard: data.otherHalalReferenceStandard ?? "—",
    otherHalalCertifyingBody: data.otherHalalCertifyingBody ?? "—",
    applicantName: data.applicantName ?? "—",
    applicantJobTitle: data.applicantJobTitle ?? "—",
    applicationDate: String(data.applicationDate ?? "").slice(0, 10) || "—",
    additionalNotes: data.additionalNotes ?? "—",
    declarationAccepted: data.declarationAccepted ? "نعم" : "لا",
    attachments: record.attachments.map((attachment, index) => ({
      id: `${record.id}-${index}`,
      category: attachment.category,
      fileName: attachment.fileName,
      fileUrl: attachment.fileUrl,
      mimeType: attachment.mimeType,
      uploadedAt: record.submittedAt?.slice(0, 10) ?? "",
    })),
  };
}

function designationDashboardRow(record: StoredOfflineSubmission) {
  const data = record.data as OfflineFormData;
  return {
    id: record.id,
    offline: true,
    requestNumber: record.requestNumber,
    name: data.organizationNameAr || data.organizationNameEn || "جهة بدون اسم",
    country: data.country ?? "—",
    type: data.bodyType ?? "—",
    joinedAt: record.submittedAt?.slice(0, 10) ?? "",
    status: entityStatusToken[record.entityStatus ?? "PENDING"],
    email: data.email ?? "—",
    phone: data.phone ?? "—",
    headName: data.headName ?? "—",
    contactOfficer: data.contactOfficerName ?? "—",
    website: data.website ?? "—",
    logoUrl: "",
  };
}

export async function listOfflineDashboardSubmissions(
  type: ApplicationType,
  params: { page?: number; limit?: number; search?: string; status?: string; purpose?: string; view?: "requests" | "registered" } = {}
) {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 20, 1), 100);
  const search = (params.search ?? "").trim().toLocaleLowerCase();
  const status = (params.status ?? "").trim();
  const purpose = (params.purpose ?? "").trim();
  const all = (await readStoredSubmissions())
    .map(({ record }) => record)
    .filter((record) => record.type === type)
    .filter((record) => {
      if (params.view === "requests") return (record.entityStatus ?? "PENDING") === "PENDING";
      if (params.view === "registered") return record.entityStatus === "ACTIVE" || record.entityStatus === "SUSPENDED";
      return true;
    })
    .filter((record) => {
      if (!purpose || purpose === "all") return true;
      const data = record.data as OfflineFormData;
      return Array.isArray(data.purposes) && data.purposes.includes(purpose);
    })
    .sort((a, b) => String(b.submittedAt).localeCompare(String(a.submittedAt)));

  const mapped = all
    .map((record) => type === "HALAL_CERTIFICATE" ? certificateDashboardRow(record) : designationDashboardRow(record))
    .filter((row) => !status || status === "all" || row.status === status)
    .filter((row) => !search || Object.values(row).some((item) => typeof item === "string" && item.toLocaleLowerCase().includes(search)));

  return {
    data: mapped.slice((page - 1) * limit, page * limit),
    total: mapped.length,
    page,
  };
}

export async function getOfflineApplicationDetails(id: string) {
  const item = (await readStoredSubmissions()).find(({ record }) => record.id === id);
  if (!item) return null;
  const { record } = item;
  const formData = record.data as OfflineFormData;
  const isCertificate = record.type === "HALAL_CERTIFICATE";
  return {
    id: record.id,
    source: "offline",
    applicationType: isCertificate ? "certificate" : "join",
    requestNumber: record.requestNumber,
    submittedAt: record.submittedAt,
    status: entityStatusToken[record.entityStatus ?? "PENDING"],
    name: isCertificate
      ? formData.companyRegisteredNameAr || formData.companyRegisteredNameEn || "منشأة بدون اسم"
      : formData.organizationNameAr || formData.organizationNameEn || "جهة بدون اسم",
    country: formData.country ?? "—",
    purpose: isCertificate
      ? listValue(formData.purposes).split("، ").map((value) => purposeLabel[value] ?? value).join("، ")
      : "طلب الانضمام إلى البرنامج",
    formData,
    attachments: record.attachments.map((attachment, index) => ({
      id: `${record.id}-${index}`,
      category: attachment.category,
      description: attachment.description,
      fileName: attachment.fileName,
      fileUrl: attachment.fileUrl,
      fileSizeBytes: attachment.fileSizeBytes,
      mimeType: attachment.mimeType,
      uploadedAt: record.submittedAt,
      available: !attachment.fileUrl.startsWith("declared://"),
    })),
  };
}

const targetEntityStatus: Record<string, OfflineEntityStatus> = {
  approve: "ACTIVE",
  reject: "WITHDRAWN",
  suspend: "SUSPENDED",
  revoke: "WITHDRAWN",
  reactivate: "ACTIVE",
};

export async function performOfflineSubmissionAction(id: string, action: string, reason?: string) {
  const item = (await readStoredSubmissions()).find(({ record }) => record.id === id);
  if (!item) return null;
  const toStatus = targetEntityStatus[action];
  if (!toStatus) throw new OfflineSubmissionError("هذا الإجراء غير متاح للسجل المحلي.");

  const fromStatus = item.record.entityStatus ?? "PENDING";
  const fromApplicationStatus = item.record.status;
  const toApplicationStatus: ApplicationStatus = action === "approve" ? "ACCEPTED" : action === "reject" ? "REJECTED" : fromApplicationStatus;
  const logId = `offline-${crypto.randomUUID()}`;
  const history = item.record.actionHistory ?? [];
  history.push({
    id: logId,
    action,
    fromStatus,
    toStatus,
    fromApplicationStatus,
    toApplicationStatus,
    reason,
    createdAt: new Date().toISOString(),
    undone: false,
  });
  item.record.entityStatus = toStatus;
  item.record.status = toApplicationStatus;
  item.record.actionHistory = history;
  await fs.writeFile(item.filePath, JSON.stringify(item.record, null, 2), "utf8");
  return { status: entityStatusToken[toStatus], logId };
}

export async function undoOfflineSubmissionAction(logId: string) {
  const items = await readStoredSubmissions();
  for (const item of items) {
    const history = item.record.actionHistory ?? [];
    const log = history.find((entry) => entry.id === logId);
    if (!log) continue;
    if (log.undone) throw new OfflineSubmissionError("تم التراجع عن هذا الإجراء مسبقاً.");
    item.record.entityStatus = log.fromStatus;
    item.record.status = log.fromApplicationStatus;
    log.undone = true;
    await fs.writeFile(item.filePath, JSON.stringify(item.record, null, 2), "utf8");
    return { status: entityStatusToken[log.fromStatus] };
  }
  return null;
}

export async function deleteOfflineSubmission(id: string) {
  const item = (await readStoredSubmissions()).find(({ record }) => record.id === id);
  if (!item) return false;
  if ((item.record.entityStatus ?? "PENDING") !== "WITHDRAWN") {
    throw new OfflineSubmissionError("يجب رفض أو سحب السجل قبل حذفه نهائياً.");
  }
  await fs.unlink(item.filePath);
  return true;
}

export async function offlineOverviewStats() {
  const records = (await readStoredSubmissions()).map(({ record }) => record);
  return {
    designationBodies: records.filter((record) => record.type === "DESIGNATION_BODY").length,
    appointedBodies: 0,
    activeCertificates: records.filter((record) => record.type === "HALAL_CERTIFICATE" && record.entityStatus === "ACTIVE").length,
    pendingApplications: records.filter((record) => (record.entityStatus ?? "PENDING") === "PENDING").length,
    offline: true,
  };
}

export function isDatabaseUnavailable(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const maybe = error as { code?: string; name?: string; message?: string };
  return (
    maybe.code === "P1001" ||
    maybe.name === "PrismaClientInitializationError" ||
    /Can't reach database server|connect|ECONNREFUSED|ETIMEDOUT/i.test(maybe.message ?? "")
  );
}
