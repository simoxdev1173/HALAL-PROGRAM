// Generic status-change + history/undo engine backing the admin dashboard's
// approve/reject/suspend/revoke/reactivate/renew buttons and the History tab.

import { prisma } from "../prisma";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

export type ResourceKind = "designation-bodies" | "appointed-bodies" | "suppliers" | "certificates";

const RESOURCE_ACTIONS: Record<ResourceKind, string[]> = {
  "designation-bodies": ["approve", "reject", "suspend", "revoke", "reactivate"],
  "appointed-bodies": ["suspend", "revoke", "reactivate"],
  suppliers: ["approve", "reject", "suspend", "revoke", "reactivate"],
  certificates: ["suspend", "revoke", "reactivate", "renew"],
};

const resourceLabel: Record<ResourceKind, string> = {
  "designation-bodies": "جهة تعيين",
  "appointed-bodies": "جهة معيّنة",
  suppliers: "مورد/منشأة",
  certificates: "شهادة",
};

const actionLabel: Record<string, string> = {
  approve: "اعتماد",
  reject: "رفض",
  suspend: "تعليق",
  revoke: "سحب",
  reactivate: "إعادة تفعيل",
  renew: "تجديد",
  undo: "تراجع",
  delete: "حذف نهائي",
};

// A record must already be in one of these terminal statuses before it can be
// permanently deleted — prevents purging an active/pending record by mistake.
const DELETABLE_STATUSES: Record<ResourceKind, string[]> = {
  "designation-bodies": ["WITHDRAWN"],
  "appointed-bodies": ["WITHDRAWN"],
  suppliers: ["WITHDRAWN"],
  certificates: ["REVOKED", "EXPIRED"],
};

const entityStatusToken: Record<string, string> = { PENDING: "pending", ACTIVE: "active", SUSPENDED: "suspended", WITHDRAWN: "revoked" };
const certificateStatusToken: Record<string, string> = { ACTIVE: "active", SUSPENDED: "suspended", REVOKED: "revoked", EXPIRED: "expired" };

const dashboardToken = (resource: ResourceKind, status: string): string =>
  (resource === "certificates" ? certificateStatusToken[status] : entityStatusToken[status]) ?? status;

const targetStatus = (resource: ResourceKind, action: string): string => {
  const certificateMap: Record<string, string> = { suspend: "SUSPENDED", revoke: "REVOKED", reactivate: "ACTIVE", renew: "ACTIVE" };
  const entityMap: Record<string, string> = { approve: "ACTIVE", reject: "WITHDRAWN", suspend: "SUSPENDED", revoke: "WITHDRAWN", reactivate: "ACTIVE" };
  const map = resource === "certificates" ? certificateMap : entityMap;
  return map[action] ?? "ACTIVE";
};

async function getCurrentStatus(resource: ResourceKind, id: string): Promise<string | null> {
  if (resource === "designation-bodies") return (await prisma.designationBodyApplication.findUnique({ where: { id } }))?.status ?? null;
  if (resource === "appointed-bodies") return (await prisma.appointedBody.findUnique({ where: { id } }))?.status ?? null;
  if (resource === "suppliers") return (await prisma.certificateApplication.findUnique({ where: { id } }))?.status ?? null;
  return (await prisma.certificate.findUnique({ where: { id } }))?.status ?? null;
}

async function getApplicationId(resource: "designation-bodies" | "suppliers", id: string): Promise<string | null> {
  if (resource === "designation-bodies") return (await prisma.designationBodyApplication.findUnique({ where: { id } }))?.applicationId ?? null;
  return (await prisma.certificateApplication.findUnique({ where: { id } }))?.applicationId ?? null;
}

async function setStatus(resource: ResourceKind, id: string, status: string, extra: Record<string, unknown> = {}) {
  if (resource === "designation-bodies") return prisma.designationBodyApplication.update({ where: { id }, data: { status: status as never, ...extra } });
  if (resource === "appointed-bodies") return prisma.appointedBody.update({ where: { id }, data: { status: status as never, ...extra } });
  if (resource === "suppliers") return prisma.certificateApplication.update({ where: { id }, data: { status: status as never, ...extra } });
  return prisma.certificate.update({ where: { id }, data: { status: status as never, ...extra } });
}

async function getEntityName(resource: ResourceKind, id: string): Promise<string> {
  if (resource === "designation-bodies") {
    const row = await prisma.designationBodyApplication.findUnique({ where: { id } });
    return row?.organizationNameAr || row?.organizationNameEn || "جهة تعيين";
  }
  if (resource === "appointed-bodies") {
    const row = await prisma.appointedBody.findUnique({ where: { id } });
    return row?.name ?? "جهة معيّنة";
  }
  if (resource === "suppliers") {
    const row = await prisma.certificateApplication.findUnique({ where: { id } });
    return row?.companyRegisteredNameAr || row?.companyRegisteredNameEn || "مورد/منشأة";
  }
  const row = await prisma.certificate.findUnique({ where: { id } });
  return row?.certificateNumber ?? "شهادة";
}

export async function performAction(resource: ResourceKind, id: string, action: string, actorId: string | undefined, reason?: string) {
  if (!RESOURCE_ACTIONS[resource]?.includes(action)) throw new ActionError("هذا الإجراء غير متاح لهذا النوع من السجلات.");

  const fromStatus = await getCurrentStatus(resource, id);
  if (fromStatus === null) throw new ActionError("لم يتم العثور على السجل.");

  const toStatus = targetStatus(resource, action);
  const extra: Record<string, unknown> = {};

  if (action === "renew" && resource === "certificates") {
    const cert = await prisma.certificate.findUnique({ where: { id } });
    const base = cert && cert.expiryDate > new Date() ? cert.expiryDate : new Date();
    extra.expiryDate = new Date(base.getFullYear() + 3, base.getMonth(), base.getDate());
  }

  await setStatus(resource, id, toStatus, extra);

  if ((action === "approve" || action === "reject") && (resource === "designation-bodies" || resource === "suppliers")) {
    const applicationId = await getApplicationId(resource, id);
    if (applicationId) {
      await prisma.application.update({
        where: { id: applicationId },
        data: {
          status: action === "approve" ? "ACCEPTED" : "REJECTED",
          reviewedAt: new Date(),
          reviewedBy: actorId ?? null,
          rejectionReason: action === "reject" ? reason ?? null : null,
        },
      });
    }
  }

  const log = await prisma.adminActionLog.create({
    data: { entityType: resource, entityId: id, action, fromStatus, toStatus, reason, actorId },
  });

  return { status: dashboardToken(resource, toStatus), logId: log.id };
}

export async function undoAction(logId: string, actorId?: string) {
  const log = await prisma.adminActionLog.findUnique({ where: { id: logId } });
  if (!log) throw new ActionError("لم يتم العثور على العملية.");
  if (log.undone) throw new ActionError("تم التراجع عن هذه العملية مسبقاً.");
  if (!log.fromStatus || !log.toStatus) throw new ActionError("لا يمكن التراجع عن هذه العملية.");
  if (log.action === "undo") throw new ActionError("لا يمكن التراجع عن عملية تراجع.");

  const resource = log.entityType as ResourceKind;
  const currentStatus = await getCurrentStatus(resource, log.entityId);
  if (currentStatus === null) throw new ActionError("لم يعد السجل موجوداً.");
  if (currentStatus !== log.toStatus) throw new ActionError("تعذر التراجع لأن حالة السجل تغيّرت بعد هذا الإجراء.");

  await setStatus(resource, log.entityId, log.fromStatus);

  if ((log.action === "approve" || log.action === "reject") && (resource === "designation-bodies" || resource === "suppliers")) {
    const applicationId = await getApplicationId(resource, log.entityId);
    if (applicationId) {
      await prisma.application.update({
        where: { id: applicationId },
        data: { status: "SUBMITTED", reviewedAt: null, reviewedBy: null, rejectionReason: null },
      });
    }
  }

  await prisma.adminActionLog.update({ where: { id: logId }, data: { undone: true } });
  await prisma.adminActionLog.create({
    data: {
      entityType: resource,
      entityId: log.entityId,
      action: "undo",
      fromStatus: log.toStatus,
      toStatus: log.fromStatus,
      reason: `تراجع عن إجراء: ${actionLabel[log.action] ?? log.action}`,
      actorId,
    },
  });

  return { status: dashboardToken(resource, log.fromStatus) };
}

export async function performDelete(resource: ResourceKind, id: string, actorId?: string) {
  const currentStatus = await getCurrentStatus(resource, id);
  if (currentStatus === null) throw new ActionError("لم يتم العثور على السجل.");
  if (!DELETABLE_STATUSES[resource].includes(currentStatus)) {
    throw new ActionError("يجب سحب السجل أولاً قبل حذفه نهائياً.");
  }

  const name = await getEntityName(resource, id);

  await prisma.$transaction(async (tx) => {
    if (resource === "certificates") {
      await tx.payment.deleteMany({ where: { certificateId: id } });
      await tx.certificateStatusLog.deleteMany({ where: { certificateId: id } });
      await tx.certificate.delete({ where: { id } });
      return;
    }

    if (resource === "appointed-bodies") {
      const certs = await tx.certificate.findMany({ where: { appointedBodyId: id }, select: { id: true } });
      const certIds = certs.map((cert) => cert.id);
      if (certIds.length) {
        await tx.payment.deleteMany({ where: { certificateId: { in: certIds } } });
        await tx.certificateStatusLog.deleteMany({ where: { certificateId: { in: certIds } } });
        await tx.certificate.deleteMany({ where: { id: { in: certIds } } });
      }
      await tx.certificateApplication.updateMany({ where: { appointedBodyId: id }, data: { appointedBodyId: null } });
      await tx.appointedBody.delete({ where: { id } });
      return;
    }

    if (resource === "suppliers") {
      const app = await tx.certificateApplication.findUnique({ where: { id } });
      if (!app) throw new ActionError("لم يتم العثور على السجل.");
      const certs = await tx.certificate.findMany({ where: { certificateAppId: id }, select: { id: true } });
      const certIds = certs.map((cert) => cert.id);
      if (certIds.length) {
        await tx.payment.deleteMany({ where: { certificateId: { in: certIds } } });
        await tx.certificateStatusLog.deleteMany({ where: { certificateId: { in: certIds } } });
        await tx.certificate.deleteMany({ where: { id: { in: certIds } } });
      }
      await tx.certificateApplication.delete({ where: { id } });
      await tx.attachment.deleteMany({ where: { applicationId: app.applicationId } });
      await tx.application.delete({ where: { id: app.applicationId } });
      return;
    }

    // designation-bodies
    const app = await tx.designationBodyApplication.findUnique({ where: { id } });
    if (!app) throw new ActionError("لم يتم العثور على السجل.");
    const bodies = await tx.appointedBody.findMany({ where: { designationBodyId: id }, select: { id: true } });
    const bodyIds = bodies.map((body) => body.id);
    if (bodyIds.length) {
      const certs = await tx.certificate.findMany({ where: { appointedBodyId: { in: bodyIds } }, select: { id: true } });
      const certIds = certs.map((cert) => cert.id);
      if (certIds.length) {
        await tx.payment.deleteMany({ where: { certificateId: { in: certIds } } });
        await tx.certificateStatusLog.deleteMany({ where: { certificateId: { in: certIds } } });
        await tx.certificate.deleteMany({ where: { id: { in: certIds } } });
      }
      await tx.certificateApplication.updateMany({ where: { appointedBodyId: { in: bodyIds } }, data: { appointedBodyId: null } });
      await tx.appointedBody.deleteMany({ where: { id: { in: bodyIds } } });
    }
    await tx.payment.deleteMany({ where: { designationBodyId: id } });
    await tx.designationBodyApplication.delete({ where: { id } });
    await tx.attachment.deleteMany({ where: { applicationId: app.applicationId } });
    await tx.application.delete({ where: { id: app.applicationId } });
  });

  await prisma.adminActionLog.create({
    data: {
      entityType: resource,
      entityId: id,
      action: "delete",
      fromStatus: currentStatus,
      toStatus: null,
      reason: `تم حذف "${name}" نهائياً وكل بياناته المرتبطة`,
      actorId,
    },
  });
}

export async function listActionLog(limit = 50) {
  const take = Math.min(Math.max(limit, 1), 200);
  const rows = await prisma.adminActionLog.findMany({
    take,
    orderBy: { createdAt: "desc" },
    include: { actor: true },
  });

  const data = await Promise.all(
    rows.map(async (row) => ({
      id: row.id,
      entityType: row.entityType,
      resourceLabel: resourceLabel[row.entityType as ResourceKind] ?? row.entityType,
      entityName: await getEntityName(row.entityType as ResourceKind, row.entityId).catch(() => (row.action === "delete" ? "سجل محذوف" : "—")),
      action: row.action,
      actionLabel: actionLabel[row.action] ?? row.action,
      fromStatus: row.fromStatus,
      toStatus: row.toStatus,
      reason: row.reason ?? "",
      actor: row.actor?.name ?? "النظام",
      undone: row.undone,
      canUndo: !row.undone && row.action !== "undo" && row.action !== "delete" && Boolean(row.fromStatus),
      createdAt: row.createdAt.toISOString(),
    }))
  );

  return { data, total: data.length, page: 1 };
}
