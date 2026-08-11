// Arab Halal Program — API server.
// Bridges the public application forms and the internal admin dashboard to the
// Postgres database via Prisma. Run with: npm run dev  (inside /backend)

import "dotenv/config";
import path from "node:path";
import fs from "node:fs";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import multer from "multer";
import bcrypt from "bcryptjs";

import { prisma } from "./lib/prisma";
import {
  parseDesignationBodyPayload,
  collectDesignationBodyDeclaredFiles,
  parseCertificatePayload,
  ValidationError,
  type AttachmentInput,
} from "./lib/http/forms";
import {
  submitDesignationBodyApplication,
  submitCertificateApplication,
} from "./lib/db/submissions";
import {
  deleteOfflineSubmission,
  getOfflineApplicationDetails,
  isDatabaseUnavailable,
  listOfflineDashboardSubmissions,
  offlineOverviewStats,
  OfflineSubmissionError,
  performOfflineSubmissionAction,
  saveOfflineSubmission,
  undoOfflineSubmissionAction,
} from "./lib/db/offlineSubmissions";
import {
  listDesignationBodies,
  listSuppliers,
  getDesignationBodyDetails,
  getSupplierApplicationDetails,
  listAppointedBodies,
  listCertificates,
  listViolations,
  listPayments,
  overviewStats,
  auditLog,
  type ListParams,
  type ListResult,
} from "./lib/http/dashboard";
import { performAction, performDelete, undoAction, listActionLog, ActionError, type ResourceKind } from "./lib/db/actionLog";
import { listAdminUsers, createAdminUser, updateAdminUser } from "./lib/db/adminUsers";
import type { AdminRole, PaymentStatus } from "@prisma/client";

const PORT = Number(process.env.API_PORT ?? 4000);
const UPLOAD_DIR = path.join(__dirname, "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Upload handling (certificate form ships real files as multipart/form-data)
// ---------------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const safe = Buffer.from(file.originalname, "latin1").toString("utf8").replace(/[^\w.-]+/g, "_");
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safe}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 40 },
  fileFilter: (_req, file, cb) => {
    const ok = /\.(pdf|jpe?g|png|docx?)$/i.test(file.originalname);
    cb(null, ok);
  },
});

const decodeName = (name: string) => Buffer.from(name, "latin1").toString("utf8");

// ---------------------------------------------------------------------------
// App setup
// ---------------------------------------------------------------------------
const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use("/api/uploads", express.static(UPLOAD_DIR));

const asyncRoute =
  (fn: (req: Request, res: Response) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res).catch(next);

const listParams = (req: Request): ListParams => ({
  page: req.query.page ? Number(req.query.page) : undefined,
  limit: req.query.limit ? Number(req.query.limit) : undefined,
  search: typeof req.query.search === "string" ? req.query.search : undefined,
  status: typeof req.query.status === "string" ? req.query.status : undefined,
  purpose: typeof req.query.purpose === "string" ? req.query.purpose : undefined,
  expiresWithin: req.query.expiresWithin ? Number(req.query.expiresWithin) : undefined,
});

async function combinedApplicationList(
  type: "DESIGNATION_BODY" | "HALAL_CERTIFICATE",
  params: ListParams,
  databaseList: (params: ListParams) => Promise<ListResult>
): Promise<ListResult> {
  const page = Math.max(params.page ?? 1, 1);
  const limit = Math.min(Math.max(params.limit ?? 20, 1), 100);
  const offset = (page - 1) * limit;
  const offline = await listOfflineDashboardSubmissions(type, { ...params, page, limit });
  const remaining = Math.max(0, limit - offline.data.length);
  const databaseOffset = Math.max(0, offset - offline.total);

  try {
    const database = await databaseList({
      ...params,
      page: 1,
      limit: Math.max(remaining, 1),
      offset: databaseOffset,
    });
    return {
      data: [...offline.data, ...database.data.slice(0, remaining)],
      total: offline.total + database.total,
      page,
    };
  } catch (error) {
    if (!isDatabaseUnavailable(error)) throw error;
    return offline;
  }
}

app.get("/api/health", asyncRoute(async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({ ok: true, database: "connected", fallback: false, time: new Date().toISOString() });
  } catch (error) {
    if (!isDatabaseUnavailable(error)) throw error;
    return res.json({ ok: true, database: "offline", fallback: true, time: new Date().toISOString() });
  }
}));

// ===========================================================================
// Public form submissions
// ===========================================================================

// JoinProgram (designation body) — accepts JSON for compatibility and multipart for real uploads.
app.post("/api/applications/designation-body", upload.any(), asyncRoute(async (req, res) => {
  let payload: unknown = req.body;
  if (typeof (req.body as Record<string, unknown>)?.payload === "string") {
    try {
      payload = JSON.parse(String((req.body as Record<string, unknown>).payload));
    } catch {
      return res.status(400).json({ ok: false, error: "INVALID_PAYLOAD", message: "تعذر قراءة بيانات الطلب." });
    }
  }
  const data = parseDesignationBodyPayload(payload);
  const fileCategories: Record<string, string> = {
    firstApplicationReportFiles: "first-application-report",
    accreditationCertificatesFiles: "accreditation-certificates",
    appointmentDesignationFiles: "appointment-designation",
    otherDocumentsFiles: "other-documents",
    signature: "signature",
    officialSeal: "officialSeal",
  };
  const uploadedAttachments: AttachmentInput[] = ((req.files as Express.Multer.File[] | undefined) ?? []).map((file) => ({
    category: fileCategories[file.fieldname] ?? file.fieldname,
    fileName: decodeName(file.originalname),
    fileUrl: `/api/uploads/${encodeURIComponent(file.filename)}`,
    fileSizeBytes: file.size,
    mimeType: file.mimetype,
  }));
  const uploadedKeys = new Set(uploadedAttachments.map((attachment) => `${attachment.category}:${attachment.fileName}`));
  const declaredAttachments = collectDesignationBodyDeclaredFiles(payload).filter((attachment) => !uploadedKeys.has(`${attachment.category}:${attachment.fileName}`));
  const attachments = [...uploadedAttachments, ...declaredAttachments];
  let application;
  try {
    application = await submitDesignationBodyApplication(data, attachments);
  } catch (error) {
    if (!isDatabaseUnavailable(error)) throw error;
    application = await saveOfflineSubmission({ type: "DESIGNATION_BODY", data, attachments });
  }
  res.status(201).json({
    ok: true,
    id: application.id,
    requestNumber: application.requestNumber,
    status: application.status,
  });
}));

// Halal certificate / mark — multipart/form-data with a JSON "payload" field
// plus real files under attachments.<key>.files and applicantInformation.applicantSignature.
app.post("/api/applications/certificate", upload.any(), asyncRoute(async (req, res) => {
  let payload: unknown;
  try {
    payload = JSON.parse(String((req.body as Record<string, unknown>).payload ?? "{}"));
  } catch {
    return res.status(400).json({ ok: false, error: "INVALID_PAYLOAD", message: "تعذر قراءة بيانات الطلب." });
  }

  const data = parseCertificatePayload(payload);

  const files = (req.files as Express.Multer.File[] | undefined) ?? [];
  const attachments: AttachmentInput[] = files.map((file) => {
    const field = file.fieldname; // e.g. "attachments.factoryLicense.files" or "applicantInformation.applicantSignature"
    let category = field;
    const match = field.match(/^attachments\.([^.]+)\.files$/);
    if (match && match[1]) category = match[1];
    else if (field === "applicantInformation.applicantSignature") category = "applicant-signature";
    return {
      category,
      fileName: decodeName(file.originalname),
      fileUrl: `/api/uploads/${file.filename}`,
      fileSizeBytes: file.size,
      mimeType: file.mimetype,
    };
  });

  let application;
  try {
    application = await submitCertificateApplication(data, attachments);
  } catch (error) {
    if (!isDatabaseUnavailable(error)) throw error;
    application = await saveOfflineSubmission({ type: "HALAL_CERTIFICATE", data, attachments });
  }
  res.status(201).json({
    ok: true,
    id: application.id,
    requestNumber: application.requestNumber,
    status: application.status,
  });
}));

// ===========================================================================
// Admin — auth
// ===========================================================================
app.post("/api/admin/login", asyncRoute(async (req, res) => {
  const email = String((req.body?.email ?? "")).trim().toLowerCase();
  const password = String(req.body?.password ?? "");
  if (!email || !password) {
    return res.status(400).json({ ok: false, error: "MISSING_CREDENTIALS", message: "يرجى إدخال البريد الإلكتروني وكلمة المرور." });
  }

  const invalid = () => res.status(401).json({ ok: false, error: "INVALID_CREDENTIALS", message: "البريد الإلكتروني أو كلمة المرور غير صحيحة." });
  let admin;
  try {
    admin = await prisma.adminUser.findUnique({ where: { email } });
  } catch (error) {
    const offlineAdminEnabled = process.env.NODE_ENV !== "production" && process.env.ALLOW_OFFLINE_ADMIN !== "false";
    const offlineEmail = (process.env.OFFLINE_ADMIN_EMAIL ?? "admin@aidsmo.org").trim().toLowerCase();
    const offlinePassword = process.env.OFFLINE_ADMIN_PASSWORD ?? "admin1234";
    if (!isDatabaseUnavailable(error) || !offlineAdminEnabled) throw error;
    if (email !== offlineEmail || password !== offlinePassword) return invalid();
    return res.json({
      ok: true,
      user: {
        id: "00000000-0000-0000-0000-000000000001",
        name: "Offline Administrator",
        email: offlineEmail,
        role: "SUPER_ADMIN",
      },
      offline: true,
    });
  }
  if (!admin || !admin.isActive) return invalid();

  const match = await bcrypt.compare(password, admin.passwordHash);
  if (!match) return invalid();

  await prisma.adminUser.update({ where: { id: admin.id }, data: { lastLoginAt: new Date() } });
  res.json({ ok: true, user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } });
}));

// ===========================================================================
// Admin — read APIs consumed by the dashboard
// ===========================================================================
app.get("/api/admin/overview/stats", asyncRoute(async (_req, res) => {
  const offline = await offlineOverviewStats();
  try {
    const database = await overviewStats();
    return res.json({
      ...database,
      designationBodies: Number(database.designationBodies ?? 0) + offline.designationBodies,
      activeCertificates: Number(database.activeCertificates ?? 0) + offline.activeCertificates,
      pendingApplications: offline.pendingApplications,
    });
  } catch (error) {
    if (!isDatabaseUnavailable(error)) throw error;
    return res.json(offline);
  }
}));
app.get("/api/admin/audit-log", asyncRoute(async (req, res) =>
  res.json(await auditLog(req.query.limit ? Number(req.query.limit) : 10))
));
app.get("/api/admin/designation-bodies", asyncRoute(async (req, res) => {
  const params = listParams(req);
  return res.json(await combinedApplicationList("DESIGNATION_BODY", params, listDesignationBodies));
}));
app.get("/api/admin/appointed-bodies", asyncRoute(async (req, res) => res.json(await listAppointedBodies(listParams(req)))));
app.get("/api/admin/suppliers", asyncRoute(async (req, res) => {
  const params = listParams(req);
  return res.json(await combinedApplicationList("HALAL_CERTIFICATE", params, listSuppliers));
}));
app.get("/api/admin/applications/:resource/:id", asyncRoute(async (req, res) => {
  const resource = String(req.params.resource);
  if (resource !== "suppliers" && resource !== "designation-bodies") {
    return res.status(404).json({ ok: false, message: "نوع الطلب غير معروف." });
  }
  const id = String(req.params.id);
  const offline = await getOfflineApplicationDetails(id);
  if (offline) return res.json({ ok: true, data: offline });
  try {
    const data = resource === "suppliers" ? await getSupplierApplicationDetails(id) : await getDesignationBodyDetails(id);
    if (!data) return res.status(404).json({ ok: false, message: "لم يتم العثور على الطلب." });
    return res.json({ ok: true, data });
  } catch (error) {
    if (!isDatabaseUnavailable(error)) throw error;
    return res.status(404).json({ ok: false, message: "لم يتم العثور على الطلب في التخزين المحلي." });
  }
}));
app.get("/api/admin/certificates", asyncRoute(async (req, res) => res.json(await listCertificates(listParams(req)))));
app.get("/api/admin/violations", asyncRoute(async (req, res) => res.json(await listViolations(listParams(req)))));
app.get("/api/admin/payments", asyncRoute(async (req, res) => {
  try {
    return res.json(await listPayments(listParams(req)));
  } catch (error) {
    if (!isDatabaseUnavailable(error)) throw error;
    return res.json({ data: [], total: 0, page: Math.max(Number(req.query.page ?? 1), 1), offline: true });
  }
}));

app.patch("/api/admin/payments/:id", asyncRoute(async (req, res) => {
  const statusMap: Record<string, PaymentStatus> = {
    paid: "CONFIRMED",
    pending: "PENDING",
    overdue: "OVERDUE",
  };
  const status = statusMap[String(req.body?.status ?? "")];
  if (!status) return res.status(400).json({ ok: false, message: "حالة الدفع غير صالحة." });
  const payment = await prisma.payment.update({
    where: { id: String(req.params.id) },
    data: {
      status,
      paidAt: status === "CONFIRMED" ? new Date() : null,
      confirmedBy: status === "CONFIRMED" && typeof req.body?.actorId === "string" ? req.body.actorId : null,
    },
  });
  return res.json({ ok: true, id: payment.id, status: status === "CONFIRMED" ? "paid" : status.toLowerCase() });
}));

// ===========================================================================
// Admin — resource actions (approve/reject/suspend/revoke/reactivate/renew)
// plus the shared history log and undo.
// ===========================================================================
const RESOURCE_KINDS = new Set<ResourceKind>(["designation-bodies", "appointed-bodies", "suppliers", "certificates"]);

// NOTE: these two specific routes MUST be registered before the generic
// "/api/admin/:resource/:id/:action" route below — both match the same
// 4-segment shape, and Express dispatches to whichever was registered first.
app.get("/api/admin/action-log", asyncRoute(async (req, res) =>
  res.json(await listActionLog(req.query.limit ? Number(req.query.limit) : 50))
));

app.post("/api/admin/action-log/:id/undo", asyncRoute(async (req, res) => {
  const actorId = typeof req.body?.actorId === "string" && req.body.actorId ? req.body.actorId : undefined;
  if (String(req.params.id).startsWith("offline-")) {
    const offlineResult = await undoOfflineSubmissionAction(String(req.params.id));
    if (!offlineResult) return res.status(404).json({ ok: false, message: "لم يتم العثور على العملية المحلية." });
    return res.json({ ok: true, ...offlineResult });
  }
  const result = await undoAction(String(req.params.id), actorId);
  res.json({ ok: true, ...result });
}));

app.post("/api/admin/:resource/:id/:action", asyncRoute(async (req, res) => {
  const resource = String(req.params.resource);
  const id = String(req.params.id);
  const action = String(req.params.action);
  if (!RESOURCE_KINDS.has(resource as ResourceKind)) {
    return res.status(404).json({ ok: false, message: "مورد غير معروف." });
  }
  const actorId = typeof req.body?.actorId === "string" && req.body.actorId ? req.body.actorId : undefined;
  const reason = typeof req.body?.reason === "string" && req.body.reason ? req.body.reason : undefined;

  if (resource === "suppliers" || resource === "designation-bodies") {
    const offlineResult = action === "delete"
      ? await deleteOfflineSubmission(id).then((deleted) => deleted ? { deleted: true } : null)
      : await performOfflineSubmissionAction(id, action, reason);
    if (offlineResult) return res.json({ ok: true, ...offlineResult });
  }

  if (action === "delete") {
    await performDelete(resource as ResourceKind, id, actorId);
    return res.json({ ok: true, deleted: true });
  }

  const result = await performAction(resource as ResourceKind, id, action, actorId, reason);
  res.json({ ok: true, ...result });
}));

// ===========================================================================
// Admin — users
// ===========================================================================
app.get("/api/admin/users", asyncRoute(async (_req, res) => res.json({ data: await listAdminUsers() })));

app.post("/api/admin/users", asyncRoute(async (req, res) => {
  const email = String(req.body?.email ?? "").trim().toLowerCase();
  const name = String(req.body?.name ?? "").trim();
  const password = String(req.body?.password ?? "");
  const role = (req.body?.role as AdminRole) || "VIEWER";
  if (!email || !name || !password) {
    return res.status(400).json({ ok: false, message: "البريد الإلكتروني والاسم وكلمة المرور مطلوبة." });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createAdminUser({ email, name, role, passwordHash });
  res.status(201).json({ ok: true, user: { id: user.id, name: user.name, email: user.email, role: user.role, isActive: user.isActive } });
}));

app.patch("/api/admin/users/:id", asyncRoute(async (req, res) => {
  const data: { isActive?: boolean; role?: AdminRole } = {};
  if (typeof req.body?.isActive === "boolean") data.isActive = req.body.isActive;
  if (typeof req.body?.role === "string") data.role = req.body.role as AdminRole;
  const user = await updateAdminUser(String(req.params.id), data);
  res.json({ ok: true, user });
}));

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  void _next;
  if (err instanceof ValidationError) {
    return res.status(400).json({ ok: false, error: "VALIDATION_ERROR", fields: err.fields, message: "يرجى مراجعة الحقول المطلوبة." });
  }
  if (err instanceof ActionError) {
    return res.status(400).json({ ok: false, error: "ACTION_ERROR", message: err.message });
  }
  if (err instanceof OfflineSubmissionError) {
    return res.status(400).json({ ok: false, error: "OFFLINE_ACTION_ERROR", message: err.message });
  }
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ ok: false, error: err.code, message: "تعذر رفع الملفات. تأكد من الحجم والصيغة." });
  }
  if (typeof err === "object" && err !== null && "code" in err && (err as { code?: string }).code === "P2002") {
    return res.status(409).json({ ok: false, error: "DUPLICATE", message: "البريد الإلكتروني مستخدم بالفعل." });
  }
  console.error("[api] unhandled error:", err);
  res.status(500).json({ ok: false, error: "SERVER_ERROR", message: "حدث خطأ في الخادم. يرجى المحاولة لاحقاً." });
});

app.listen(PORT, () => {
  console.log(`[api] Arab Halal Program API listening on http://localhost:${PORT}`);
});
