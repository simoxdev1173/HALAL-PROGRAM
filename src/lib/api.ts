// Thin client for the Arab Halal Program API (backend/server.ts).
// All requests go through the Vite dev proxy at /api (see vite.config.ts).

export type FieldErrors = Record<string, string>;

export type ApiSuccess<T> = { ok: true; data: T };
export type ApiFailure = { ok: false; message: string; fields?: FieldErrors };
export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

const NETWORK_ERROR_AR = "تعذر الاتصال بالخادم. يرجى التأكد من الاتصال والمحاولة مرة أخرى.";

async function readJson(response: Response): Promise<Record<string, unknown>> {
  try {
    return (await response.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

async function handle<T>(request: Promise<Response>): Promise<ApiResult<T>> {
  let response: Response;
  try {
    response = await request;
  } catch {
    return { ok: false, message: NETWORK_ERROR_AR };
  }

  const body = await readJson(response);

  if (!response.ok || body.ok === false) {
    return {
      ok: false,
      message: typeof body.message === "string" ? body.message : NETWORK_ERROR_AR,
      fields: (body.fields as FieldErrors | undefined) ?? undefined,
    };
  }

  return { ok: true, data: body as T };
}

export type SubmissionResult = { id: string; requestNumber: string | null; status: string };

export function submitDesignationBodyApplication(payload: unknown | FormData): Promise<ApiResult<SubmissionResult>> {
  const isMultipart = payload instanceof FormData;
  return handle<SubmissionResult>(
    fetch("/api/applications/designation-body", {
      method: "POST",
      headers: isMultipart ? undefined : { "Content-Type": "application/json" },
      body: isMultipart ? payload : JSON.stringify(payload),
    })
  );
}

export function submitCertificateApplication(formData: FormData): Promise<ApiResult<SubmissionResult>> {
  return handle<SubmissionResult>(
    fetch("/api/applications/certificate", {
      method: "POST",
      body: formData,
    })
  );
}

export type AdminUser = { id: string; name: string; email: string; role: string };

export function adminLogin(email: string, password: string): Promise<ApiResult<{ user: AdminUser }>> {
  return handle<{ user: AdminUser }>(
    fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  );
}

// ---------------------------------------------------------------------------
// Admin — resource actions, history/undo, users
// ---------------------------------------------------------------------------

export type ResourceKind = "designation-bodies" | "appointed-bodies" | "suppliers" | "certificates";

export function performResourceAction(
  resource: ResourceKind,
  id: string,
  action: string,
  opts: { actorId?: string; reason?: string } = {}
): Promise<ApiResult<{ status: string; logId: string }>> {
  return handle(
    fetch(`/api/admin/${resource}/${id}/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
    })
  );
}

export function undoResourceAction(logId: string, actorId?: string): Promise<ApiResult<{ status: string }>> {
  return handle(
    fetch(`/api/admin/action-log/${logId}/undo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actorId }),
    })
  );
}

export type ActionLogEntry = {
  id: string;
  entityType: string;
  resourceLabel: string;
  entityName: string;
  action: string;
  actionLabel: string;
  fromStatus: string | null;
  toStatus: string | null;
  reason: string;
  actor: string;
  undone: boolean;
  canUndo: boolean;
  createdAt: string;
};

export async function fetchActionLog(limit = 50): Promise<ActionLogEntry[]> {
  const res = await fetch(`/api/admin/action-log?limit=${limit}`);
  if (!res.ok) return [];
  const body = (await res.json()) as { data?: ActionLogEntry[] };
  return body.data ?? [];
}

export type AdminUserRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};

export async function fetchAdminUsers(): Promise<AdminUserRecord[]> {
  const res = await fetch("/api/admin/users");
  if (!res.ok) return [];
  const body = (await res.json()) as { data?: AdminUserRecord[] };
  return body.data ?? [];
}

export function createAdminUserApi(data: {
  email: string;
  name: string;
  password: string;
  role: string;
}): Promise<ApiResult<{ user: AdminUserRecord }>> {
  return handle(
    fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  );
}

export function updateAdminUserApi(
  id: string,
  data: { isActive?: boolean; role?: string }
): Promise<ApiResult<{ user: AdminUserRecord }>> {
  return handle(
    fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  );
}
