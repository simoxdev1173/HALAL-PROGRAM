import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  AlertTriangle,
  ArrowUpDown,
  BadgeCheck,
  Ban,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Database,
  Download,
  Eye,
  FileBadge2,
  FileCheck2,
  FileClock,
  Filter,
  History as HistoryIcon,
  Landmark,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Plus,
  ReceiptText,
  RefreshCw,
  RotateCcw,
  Save,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Trash,
  Trash2,
  Undo2,
  User,
  Users as UsersIcon,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import LoginForm from "../components/ui/login-form";
import {
  performResourceAction,
  undoResourceAction,
  fetchActionLog,
  fetchAdminUsers,
  createAdminUserApi,
  updateAdminUserApi,
  uploadResourceLogo,
  createDesignationBodyApi,
  createAppointedBodyApi,
} from "../lib/api";
import type { AdminUser, ResourceKind, ActionLogEntry, AdminUserRecord } from "../lib/api";
import { CountryFlag } from "../lib/countryFlags";

type AdminSection =
  | "overview"
  | "designation-bodies"
  | "appointed-bodies"
  | "suppliers"
  | "certificates"
  | "payments"
  | "history"
  | "users"
  | "settings";

type ResourceSection = Exclude<AdminSection, "overview" | "history" | "users" | "settings">;

type StatusKind = "active" | "suspended" | "revoked" | "review" | "expired" | "pending" | "paid" | "overdue" | "resolved" | "open";

type TableColumn = {
  key: string;
  label: string;
};

type ResourceConfig = {
  section: AdminSection;
  resource: string;
  title: string;
  eyebrow: string;
  searchPlaceholder?: string;
  primaryAction?: string;
  columns: TableColumn[];
  emptyTitle: string;
  emptyAction: string;
  filters: { key: string; label: string; options: { value: string; label: string }[] }[];
  registryTabs?: {
    requestsLabel: string;
    registeredLabel: string;
    registeredColumns: TableColumn[];
  };
};

type ApiListResponse = {
  data?: Record<string, unknown>[];
  items?: Record<string, unknown>[];
  total?: number;
  page?: number;
  limit?: number;
};

type Toast = { id: number; text: string; tone: "success" | "warning"; onUndo?: () => void };
type ConfirmAction = { title: string; body: string; confirmLabel: string; onConfirm: () => void } | null;
type NotifyFn = (text: string, tone?: Toast["tone"], onUndo?: () => void) => void;
type ConfirmFn = (action: ConfirmAction) => void;

const navItems: { section: AdminSection; label: string; icon: LucideIcon }[] = [
  { section: "overview", label: "لوحة التحكم", icon: LayoutDashboard },
  { section: "designation-bodies", label: "جهات التعيين", icon: Building2 },
  { section: "appointed-bodies", label: "الجهات المعيّنة", icon: BadgeCheck },
  { section: "suppliers", label: "طلبات الشهادة والعلامة", icon: FileBadge2 },
  { section: "certificates", label: "الشهادات والتراخيص", icon: FileCheck2 },
  { section: "payments", label: "الرسوم والمدفوعات", icon: CreditCard },
  { section: "history", label: "سجل العمليات", icon: HistoryIcon },
  { section: "users", label: "المستخدمون", icon: UsersIcon },
];

const statusLabels: Record<string, string> = {
  active: "نشط",
  suspended: "معلّق",
  revoked: "مسحوب",
  review: "قيد المراجعة",
  pending: "قيد المراجعة",
  expired: "منتهي",
  paid: "مدفوع",
  overdue: "متأخر",
  resolved: "تم الحل",
  open: "مفتوح",
  all: "الكل",
};

const statusTone: Record<string, string> = {
  active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  suspended: "border-amber-200 bg-amber-50 text-amber-700",
  revoked: "border-red-200 bg-red-50 text-red-700",
  review: "border-sky-200 bg-sky-50 text-sky-700",
  pending: "border-sky-200 bg-sky-50 text-sky-700",
  expired: "border-stone-200 bg-stone-100 text-stone-600",
  paid: "border-emerald-200 bg-emerald-50 text-emerald-700",
  overdue: "border-red-200 bg-red-50 text-red-700",
  resolved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  open: "border-amber-200 bg-amber-50 text-amber-700",
};

const allStatuses = [
  { value: "all", label: "كل الحالات" },
  { value: "active", label: "نشط" },
  { value: "suspended", label: "معلّق" },
  { value: "pending", label: "قيد المراجعة" },
  { value: "revoked", label: "مسحوب" },
];

const resourceConfigs: Record<ResourceSection, ResourceConfig> = {
  "designation-bodies": {
    section: "designation-bodies",
    resource: "designation-bodies",
    title: "جهات التعيين",
    eyebrow: "",
    searchPlaceholder: "بحث بالاسم أو الدولة",
    primaryAction: "إضافة جهة تعيين",
    columns: [
      { key: "name", label: "الاسم" },
      { key: "country", label: "الدولة" },
      { key: "type", label: "النوع" },
      { key: "joinedAt", label: "تاريخ الانضمام" },
      { key: "status", label: "الحالة" },
    ],
    emptyTitle: "لا توجد جهات تعيين مطابقة للبحث الحالي",
    emptyAction: "إضافة جهة تعيين",
    filters: [{ key: "status", label: "الحالة", options: allStatuses }],
    registryTabs: {
      requestsLabel: "طلبات الانضمام",
      registeredLabel: "الجهات المسجّلة",
      registeredColumns: [
        { key: "logo", label: "الشعار" },
        { key: "name", label: "اسم الجهة" },
        { key: "country", label: "الدولة" },
        { key: "email", label: "البريد الإلكتروني" },
        { key: "phone", label: "الهاتف" },
        { key: "website", label: "الموقع الإلكتروني" },
        { key: "joinedAt", label: "تاريخ التسجيل" },
        { key: "status", label: "الحالة" },
      ],
    },
  },
  "appointed-bodies": {
    section: "appointed-bodies",
    resource: "appointed-bodies",
    title: "الجهات المعيّنة",
    eyebrow: "جهات منح الشهادات العاملة تحت جهات التعيين",
    searchPlaceholder: "بحث باسم الجهة",
    primaryAction: "إضافة جهة معيّنة",
    columns: [
      { key: "name", label: "الاسم" },
      { key: "designationBodyName", label: "جهة التعيين الأم" },
      { key: "scope", label: "نطاق الاعتماد" },
      { key: "appointedAt", label: "تاريخ التعيين" },
      { key: "status", label: "الحالة" },
    ],
    emptyTitle: "لا توجد جهات معيّنة مطابقة للبحث الحالي",
    emptyAction: "إضافة جهة معيّنة",
    filters: [
      { key: "designationBody", label: "جهة التعيين", options: [{ value: "all", label: "كل جهات التعيين" }] },
      { key: "status", label: "الحالة", options: allStatuses },
    ],
    registryTabs: {
      requestsLabel: "طلبات التسجيل",
      registeredLabel: "الجهات المسجّلة",
      registeredColumns: [
        { key: "logo", label: "الشعار" },
        { key: "name", label: "اسم الجهة" },
        { key: "country", label: "الدولة" },
        { key: "designationBodyName", label: "جهة التعيين الأم" },
        { key: "scope", label: "نطاق الاعتماد" },
        { key: "appointedAt", label: "تاريخ التسجيل" },
        { key: "status", label: "الحالة" },
      ],
    },
  },
  suppliers: {
    section: "suppliers",
    resource: "suppliers",
    title: "طلبات الشهادة والعلامة",
    eyebrow: "مراجعة طلبات شهادة الحلال العربية وعلامة الحلال العربية",
    searchPlaceholder: "بحث باسم المنشأة أو رقم الطلب",
    primaryAction: "تصدير الطلبات",
    columns: [
      { key: "requestNumber", label: "رقم الطلب" },
      { key: "name", label: "اسم المنشأة" },
      { key: "purpose", label: "الغرض من الطلب" },
      { key: "country", label: "الدولة" },
      { key: "registeredAt", label: "تاريخ التسجيل" },
      { key: "status", label: "الحالة" },
    ],
    emptyTitle: "لا توجد طلبات مطابقة للمرشحات الحالية",
    emptyAction: "إعادة ضبط المرشحات",
    filters: [
      { key: "purpose", label: "نوع الطلب", options: [{ value: "all", label: "كل الطلبات" }, { value: "ARAB_HALAL_CERTIFICATE", label: "طلبات الشهادة" }, { value: "ARAB_HALAL_MARK", label: "طلبات العلامة" }] },
      { key: "country", label: "الدولة", options: [{ value: "all", label: "كل الدول" }] },
      { key: "category", label: "الفئة", options: [{ value: "all", label: "كل الفئات" }] },
      { key: "appointedBody", label: "الجهة المعيّنة", options: [{ value: "all", label: "كل الجهات" }] },
      { key: "status", label: "الحالة", options: allStatuses },
    ],
  },
  certificates: {
    section: "certificates",
    resource: "certificates",
    title: "الشهادات والتراخيص",
    eyebrow: "إدارة الشهادات النشطة والمعلقة والمنتهية وتجديداتها",
    searchPlaceholder: "بحث برقم الشهادة أو اسم المورد",
    primaryAction: "تصدير CSV",
    columns: [
      { key: "certificateNumber", label: "رقم الشهادة" },
      { key: "supplierName", label: "اسم المورد" },
      { key: "productName", label: "اسم المنتج" },
      { key: "appointedBodyName", label: "الجهة المعيّنة" },
      { key: "issuedAt", label: "تاريخ الإصدار" },
      { key: "expiresAt", label: "تاريخ الانتهاء" },
      { key: "status", label: "الحالة" },
    ],
    emptyTitle: "لا توجد شهادات مطابقة للبحث الحالي",
    emptyAction: "تصدير النتائج",
    filters: [
      { key: "status", label: "الحالة", options: [{ value: "all", label: "كل الحالات" }, { value: "active", label: "نشط" }, { value: "suspended", label: "معلّق" }, { value: "revoked", label: "مسحوب" }, { value: "expired", label: "منتهي" }] },
      { key: "appointedBody", label: "الجهة المعيّنة", options: [{ value: "all", label: "كل الجهات" }] },
      { key: "dateRange", label: "الفترة", options: [{ value: "all", label: "كل الفترات" }, { value: "issue", label: "تاريخ الإصدار" }, { value: "expiry", label: "تاريخ الانتهاء" }] },
    ],
  },
  payments: {
    section: "payments",
    resource: "payments",
    title: "الرسوم والمدفوعات",
    eyebrow: "سجل مالي موحد للرسوم والتحصيل والإيصالات",
    searchPlaceholder: "بحث باسم الدافع أو رقم الشهادة",
    primaryAction: "تصدير CSV",
    columns: [
      { key: "payerName", label: "اسم الجهة/المورد" },
      { key: "feeType", label: "نوع الرسوم" },
      { key: "amount", label: "المبلغ" },
      { key: "currency", label: "العملة" },
      { key: "status", label: "الحالة" },
      { key: "paidAt", label: "تاريخ الدفع" },
      { key: "receipt", label: "الإيصال" },
    ],
    emptyTitle: "لا توجد مدفوعات مطابقة للمرشحات الحالية",
    emptyAction: "إرسال تذكير",
    filters: [
      { key: "payerType", label: "الدافع", options: [{ value: "all", label: "الكل" }, { value: "designationBody", label: "جهة تعيين" }, { value: "supplier", label: "مورد" }] },
      { key: "status", label: "الحالة", options: [{ value: "all", label: "كل الحالات" }, { value: "paid", label: "مدفوع" }, { value: "pending", label: "معلق" }, { value: "overdue", label: "متأخر" }] },
      { key: "dateRange", label: "الفترة", options: [{ value: "all", label: "كل الفترات" }] },
    ],
  },
};

const getValue = (row: Record<string, unknown>, key: string) => {
  const value = row[key] ?? row[key.replace("Name", "")] ?? "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (value instanceof Date) return value.toLocaleDateString("ar");
  return "";
};

const actionSuccessLabel: Record<string, string> = {
  approve: "تم اعتماد الطلب",
  reject: "تم رفض الطلب",
  suspend: "تم تعليق السجل",
  revoke: "تم سحب السجل",
  reactivate: "تمت إعادة تفعيل السجل",
  renew: "تم تجديد الشهادة",
  delete: "تم حذف السجل نهائياً",
};

async function runResourceAction(
  resource: ResourceKind,
  id: string,
  action: string,
  notify: NotifyFn,
  actorId?: string,
  reason?: string
): Promise<boolean> {
  const result = await performResourceAction(resource, id, action, { actorId, reason });
  if (!result.ok) {
    notify(result.message, "warning");
    return false;
  }
  if (action === "delete") {
    notify(actionSuccessLabel.delete, "success");
    return true;
  }
  const { logId } = result.data;
  notify(actionSuccessLabel[action] ?? "تم تنفيذ الإجراء وتسجيله في سجل العمليات", "success", () => {
    void undoResourceAction(logId, actorId).then((undoResult) => {
      notify(undoResult.ok ? "تم التراجع عن الإجراء" : undoResult.message, undoResult.ok ? "success" : "warning");
    });
  });
  return true;
}

function StatusBadge({ status }: { status?: string }) {
  const normalized = status || "review";
  return (
    <span className={`inline-flex min-h-6 items-center rounded-full border px-2.5 text-[11px] font-black ${statusTone[normalized] ?? statusTone.review}`}>
      {statusLabels[normalized] ?? normalized}
    </span>
  );
}

function EmptyState({ title, action, onAction }: { title: string; action: string; onAction: () => void }) {
  return (
    <div className="flex min-h-[150px] flex-col items-center justify-center border border-dashed border-stone-300 bg-stone-50/70 p-5 text-center">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-[#007A55]">
        <ListChecks size={18} />
      </div>
      <h3 className="mt-3 text-base font-black text-slate-950">{title}</h3>
      <p className="mt-1 max-w-md text-xs font-bold leading-6 text-stone-500">لا توجد بيانات لعرضها حالياً. ستظهر السجلات هنا تلقائياً عند توفرها.</p>
      <button type="button" onClick={onAction} className="mt-3 inline-flex h-9 items-center justify-center rounded-lg border border-stone-200 bg-white px-4 text-xs font-black text-slate-700 hover:border-emerald-300 hover:text-[#007A55]">
        {action}
      </button>
    </div>
  );
}

function AdminLogin({ onLogin }: { onLogin: (user: AdminUser) => void }) {
  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-[#020617] font-arabic text-white">
      <div className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,122,85,.34),transparent_34%),linear-gradient(245deg,rgba(202,138,4,.22),transparent_36%),linear-gradient(180deg,#020617_0%,#07110e_52%,#020617_100%)]" />
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.75) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,.12),transparent)]" />
        <LoginForm onLogin={onLogin} />
      </div>
    </main>
  );
}

function useAdminList(
  config?: ResourceConfig,
  page = 1,
  search = "",
  filters: Record<string, string> = {},
  reloadToken = 0,
  view?: "requests" | "registered"
) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!config) return;
    const controller = new AbortController();
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (search) params.set("search", search);
    if (view) params.set("view", view);
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all") params.set(key, value);
    });
    fetch(`/api/admin/${config.resource}?${params.toString()}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("API not ready"))))
      .then((payload: ApiListResponse) => {
        const data = payload.data ?? payload.items ?? [];
        setRows(Array.isArray(data) ? data : []);
        setTotal(Number(payload.total ?? data.length ?? 0));
      })
      .catch(() => {
        setRows([]);
        setTotal(0);
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, [config, filters, page, search, reloadToken, view]);

  return { rows, total, isLoading };
}

type ReviewQueueEntry = {
  item: Record<string, unknown>;
  resource: "designation-bodies" | "suppliers";
  kind?: string;
};

function ReviewQueueGroup({
  title,
  description,
  emptyLabel,
  entries,
  icon: Icon,
}: {
  title: string;
  description: string;
  emptyLabel: string;
  entries: ReviewQueueEntry[];
  icon: LucideIcon;
}) {
  return (
    <section className="border-b border-stone-200 last:border-b-0">
      <header className="flex items-center justify-between gap-4 bg-[#F7F8F6] px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <Icon size={18} className="shrink-0 text-[#007A55]" />
          <div className="min-w-0">
            <h3 className="text-sm font-black text-slate-950">{title}</h3>
            <p className="mt-0.5 truncate text-[10px] font-bold text-stone-500">{description}</p>
          </div>
        </div>
        <span className="inline-flex min-w-7 items-center justify-center border-r-2 border-[#007A55] px-2 text-sm font-black text-slate-900">{entries.length}</span>
      </header>

      {entries.length === 0 ? (
        <p className="px-4 py-5 text-xs font-bold text-stone-400">{emptyLabel}</p>
      ) : (
        <div>
          {entries.map(({ item, resource, kind }) => {
            const id = String(item.id);
            return (
              <article key={`${resource}-${id}`} className="grid gap-3 border-b border-stone-100 px-4 py-3.5 last:border-b-0 hover:bg-stone-50/70 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-slate-950">{getValue(item, "name") || "طلب بدون اسم"}</p>
                  {kind && <p className="mt-1 text-[10px] font-black text-[#007A55]">{kind}</p>}
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-bold text-stone-500">
                    <span dir="ltr">{getValue(item, "requestNumber") || "غير متوفر"}</span>
                    <CountryFlag country={getValue(item, "country")} />
                    <span>{getValue(item, "registeredAt") || getValue(item, "joinedAt") || "غير متوفر"}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => window.open(`/admin/application-preview/${resource}/${encodeURIComponent(id)}`, "_blank", "noopener,noreferrer")}
                  className="group inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 text-[11px] font-black text-[#007A55] transition-colors hover:border-[#007A55]/40 hover:bg-white active:translate-y-px"
                >
                  <Eye size={15} />
                  مراجعة التفاصيل
                  <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function OverviewPage() {
  const [activity, setActivity] = useState<Record<string, unknown>[]>([]);
  const [approvals, setApprovals] = useState<Record<string, unknown>[]>([]);
  const [demands, setDemands] = useState<Record<string, unknown>[]>([]);
  const [expiring, setExpiring] = useState<Record<string, unknown>[]>([]);
  const [stats, setStats] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, activityRes, approvalsRes, demandsRes, expiringRes] = await Promise.all([
          fetch("/api/admin/overview/stats"),
          fetch("/api/admin/audit-log?limit=10"),
          fetch("/api/admin/designation-bodies?status=pending&limit=10"),
          fetch("/api/admin/suppliers?status=pending&limit=10"),
          fetch("/api/admin/certificates?expiresWithin=30&limit=20"),
        ]);
        setStats(statsRes.ok ? await statsRes.json() : {});
        const activityJson: ApiListResponse = activityRes.ok ? await activityRes.json() : {};
        const approvalsJson: ApiListResponse = approvalsRes.ok ? await approvalsRes.json() : {};
        const demandsJson: ApiListResponse = demandsRes.ok ? await demandsRes.json() : {};
        const expiringJson: ApiListResponse = expiringRes.ok ? await expiringRes.json() : {};
        setActivity(activityJson.data ?? activityJson.items ?? []);
        setApprovals(approvalsJson.data ?? approvalsJson.items ?? []);
        setDemands(demandsJson.data ?? demandsJson.items ?? []);
        setExpiring(expiringJson.data ?? expiringJson.items ?? []);
      } catch {
        setStats({});
        setActivity([]);
        setApprovals([]);
        setDemands([]);
        setExpiring([]);
      }
    };
    void load();
  }, []);

  const statCards = [
    { label: "إجمالي جهات التعيين", key: "designationBodies", icon: Building2, tone: "text-[#007A55]" },
    { label: "إجمالي الجهات المعيّنة", key: "appointedBodies", icon: BadgeCheck, tone: "text-[#007A55]" },
    { label: "الشهادات النشطة", key: "activeCertificates", icon: FileCheck2, tone: "text-[#007A55]" },
    { label: "طلبات بانتظار القرار", key: "pendingApplications", icon: FileClock, tone: "text-[#9A6700]" },
  ];

  const joinQueue: ReviewQueueEntry[] = approvals.map((item) => ({ item, resource: "designation-bodies" }));
  const certificateQueue: ReviewQueueEntry[] = demands.map((item) => ({
    item,
    resource: "suppliers",
    kind: getValue(item, "purpose") || "شهادة أو علامة الحلال العربية",
  }));
  const pendingReviewCount = joinQueue.length + certificateQueue.length;

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm sm:grid sm:grid-cols-2 xl:grid-cols-4 sm:divide-x sm:divide-x-reverse sm:divide-stone-200">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.key} className="border-b border-stone-200 p-3.5 last:border-b-0 sm:border-b-0">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 ${card.tone}`}>
                  <Icon size={19} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-black text-stone-500">{card.label}</p>
                  <p className="mt-0.5 text-xl font-black text-slate-950">{String(stats[card.key] ?? "غير متوفر")}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid min-h-[calc(100vh-164px)] gap-3 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,.75fr)]">
        <section className="flex min-h-[460px] flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3">
            <div>
              <h2 className="text-base font-black text-slate-950">الطلبات التي تحتاج مراجعة</h2>
            </div>
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-slate-950 px-2 text-xs font-black text-white">{pendingReviewCount}</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ReviewQueueGroup
              title="طلبات الانضمام إلى البرنامج"
              description="طلبات جهات التعيين الراغبة في الانضمام"
              emptyLabel="لا توجد طلبات انضمام بانتظار المراجعة."
              entries={joinQueue}
              icon={Building2}
            />
            <ReviewQueueGroup
              title="طلبات شهادة وعلامة الحلال"
              description="طلبات الموردين والمنشآت للحصول على الشهادة أو العلامة"
              emptyLabel="لا توجد طلبات شهادة أو علامة بانتظار المراجعة."
              entries={certificateQueue}
              icon={FileBadge2}
            />
          </div>
        </section>

        <div className="grid min-h-[460px] gap-3 xl:grid-rows-2">
          <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3">
              <h2 className="text-sm font-black text-slate-950">آخر النشاطات</h2>
              <HistoryIcon size={16} className="text-stone-400" />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              {activity.length === 0 ? <p className="flex h-full min-h-28 items-center justify-center text-xs font-bold text-stone-400">لا توجد نشاطات حديثة</p> : <div className="space-y-2">{activity.slice(0, 6).map((item, index) => <AuditLine key={index} item={item} />)}</div>}
            </div>
          </section>
          <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-200 px-4 py-3">
              <h2 className="text-sm font-black text-slate-950">استحقاقات خلال 30 يوماً</h2>
              <FileClock size={16} className="text-[#9A6700]" />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              {expiring.length === 0 ? <p className="flex h-full min-h-28 items-center justify-center px-4 text-center text-xs font-bold text-stone-400">لا توجد شهادات قريبة الانتهاء</p> : expiring.slice(0, 6).map((item) => (
                <div key={String(item.id)} className="flex items-center justify-between gap-3 border-b border-stone-100 px-4 py-3 last:border-0">
                  <div className="min-w-0"><p className="truncate text-xs font-black text-slate-900">{getValue(item, "supplierName")}</p><p className="mt-1 text-[10px] font-bold text-stone-500" dir="ltr">{getValue(item, "certificateNumber")}</p></div>
                  <span className="shrink-0 text-[11px] font-black text-[#9A6700]">{getValue(item, "expiresAt")}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function AuditLine({ item }: { item: Record<string, unknown> }) {
  return (
    <div className="flex gap-3 rounded-lg border border-stone-100 bg-stone-50 p-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#007A55] ring-1 ring-stone-200">
        <Clock3 size={16} />
      </div>
      <div>
        <p className="text-sm font-black text-slate-950">{getValue(item, "actionType") || getValue(item, "action") || "إجراء إداري"}</p>
        <p className="mt-1 text-xs font-bold text-stone-500">{getValue(item, "actor") || "مستخدم النظام"} · {getValue(item, "timestamp") || getValue(item, "createdAt") || "وقت غير محدد"}</p>
      </div>
    </div>
  );
}

const ACTIONABLE_RESOURCES = new Set<string>(["designation-bodies", "appointed-bodies", "suppliers", "certificates"]);

type EntityCreationResource = "designation-bodies" | "appointed-bodies";
type DesignationOption = { id: string; name: string; country: string; offline?: boolean };

function AddEntityPanel({
  resource,
  onClose,
  onCreated,
  notify,
}: {
  resource: EntityCreationResource;
  onClose: () => void;
  onCreated: () => void;
  notify: NotifyFn;
}) {
  const isDesignationBody = resource === "designation-bodies";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [designationOptions, setDesignationOptions] = useState<DesignationOption[]>([]);
  const [form, setForm] = useState({
    nameAr: "",
    nameEn: "",
    name: "",
    country: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    bodyType: "GOVERNMENTAL" as "GOVERNMENTAL" | "NON_GOVERNMENTAL",
    headName: "",
    contactOfficerName: "",
    designationBodyId: "",
    accreditationScope: "",
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSubmitting, onClose]);

  useEffect(() => {
    if (isDesignationBody) return;
    const controller = new AbortController();
    fetch("/api/admin/designation-bodies?view=registered&limit=100", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("تعذر تحميل جهات التعيين")))
      .then((payload: ApiListResponse) => {
        const options = (payload.data ?? []).filter((row) => !row.offline).map((row) => ({
          id: String(row.id),
          name: getValue(row, "name"),
          country: getValue(row, "country"),
        }));
        setDesignationOptions(options);
      })
      .catch((requestError) => {
        if ((requestError as Error).name !== "AbortError") setDesignationOptions([]);
      });
    return () => controller.abort();
  }, [isDesignationBody]);

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const result = isDesignationBody
        ? await createDesignationBodyApi({
            nameAr: form.nameAr.trim(),
            nameEn: form.nameEn.trim(),
            country: form.country.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            website: form.website.trim(),
            address: form.address.trim(),
            bodyType: form.bodyType,
            headName: form.headName.trim(),
            contactOfficerName: form.contactOfficerName.trim(),
          })
        : await createAppointedBodyApi({
            designationBodyId: form.designationBodyId,
            name: form.name.trim(),
            country: form.country.trim(),
            accreditationScope: form.accreditationScope.trim(),
          });

      if (!result.ok) {
        setError(result.message);
        return;
      }

      if (logo) {
        const logoResult = await uploadResourceLogo(resource, result.data.id, logo);
        if (!logoResult.ok) notify(`تم حفظ الجهة، لكن تعذر رفع الشعار: ${logoResult.message}`, "warning");
      }
      notify(isDesignationBody ? "تمت إضافة جهة التعيين إلى السجل" : "تمت إضافة الجهة المعيّنة إلى السجل");
      onCreated();
    } catch {
      setError("تعذر حفظ الجهة. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "mt-1.5 h-11 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm font-bold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";
  const labelClass = "text-xs font-black text-stone-600";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="add-entity-title">
      <button type="button" className="absolute inset-0 cursor-default" onClick={() => !isSubmitting && onClose()} aria-label="إغلاق" />
      <aside className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/60 bg-[#FAF9F6] shadow-[0_32px_100px_rgba(15,23,42,.28)] sm:max-h-[calc(100dvh-3rem)]" dir="rtl">
        <header className="flex items-start justify-between gap-4 border-b border-stone-200 bg-white px-5 py-4 sm:px-7">
          <div>
            <p className="text-[11px] font-black text-[#007A55]">إضافة مباشرة إلى السجل</p>
            <h2 id="add-entity-title" className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
              {isDesignationBody ? "إضافة جهة تعيين" : "إضافة جهة معيّنة"}
            </h2>
            <p className="mt-1 text-xs font-bold leading-6 text-stone-500">
              {isDesignationBody ? "ستُحفظ الجهة كجهة معتمدة ومسجّلة." : "اربط الجهة بجهة تعيين مسجّلة وحدد نطاق اعتمادها."}
            </p>
          </div>
          <button type="button" onClick={onClose} disabled={isSubmitting} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-slate-950" aria-label="إغلاق"><X size={18} /></button>
        </header>

        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {isDesignationBody ? (
                <>
                  <label className={labelClass}>اسم الجهة بالعربية *<input required value={form.nameAr} onChange={(event) => update("nameAr", event.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>اسم الجهة بالإنجليزية<input dir="ltr" value={form.nameEn} onChange={(event) => update("nameEn", event.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>الدولة *<input required value={form.country} onChange={(event) => update("country", event.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>نوع الجهة *
                    <select value={form.bodyType} onChange={(event) => update("bodyType", event.target.value)} className={inputClass}>
                      <option value="GOVERNMENTAL">حكومية</option>
                      <option value="NON_GOVERNMENTAL">غير حكومية</option>
                    </select>
                  </label>
                  <label className={labelClass}>البريد الإلكتروني *<input required type="email" dir="ltr" value={form.email} onChange={(event) => update("email", event.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>رقم الهاتف *<input required dir="ltr" value={form.phone} onChange={(event) => update("phone", event.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>الموقع الإلكتروني<input type="url" dir="ltr" placeholder="https://" value={form.website} onChange={(event) => update("website", event.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>العنوان<input value={form.address} onChange={(event) => update("address", event.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>اسم رئيس الجهة<input value={form.headName} onChange={(event) => update("headName", event.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>مسؤول التواصل<input value={form.contactOfficerName} onChange={(event) => update("contactOfficerName", event.target.value)} className={inputClass} /></label>
                </>
              ) : (
                <>
                  <label className={`${labelClass} sm:col-span-2`}>جهة التعيين الأم *
                    <select
                      required
                      value={form.designationBodyId}
                      onChange={(event) => {
                        const option = designationOptions.find((item) => item.id === event.target.value);
                        update("designationBodyId", event.target.value);
                        if (option && !form.country) update("country", option.country);
                      }}
                      className={inputClass}
                    >
                      <option value="">اختر جهة التعيين</option>
                      {designationOptions.map((option) => <option key={option.id} value={option.id}>{option.name} — {option.country}</option>)}
                    </select>
                    {designationOptions.length === 0 && <span className="mt-2 block text-[11px] font-bold text-amber-700">أضف جهة تعيين مسجّلة أولًا قبل إضافة جهة معيّنة.</span>}
                  </label>
                  <label className={labelClass}>اسم الجهة *<input required value={form.name} onChange={(event) => update("name", event.target.value)} className={inputClass} /></label>
                  <label className={labelClass}>الدولة *<input required value={form.country} onChange={(event) => update("country", event.target.value)} className={inputClass} /></label>
                  <label className={`${labelClass} sm:col-span-2`}>نطاق الاعتماد *<textarea required rows={4} value={form.accreditationScope} onChange={(event) => update("accreditationScope", event.target.value)} className="mt-1.5 w-full resize-y rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm font-bold leading-6 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" /></label>
                </>
              )}

              <label className={`${labelClass} sm:col-span-2`}>
                شعار الجهة (اختياري)
                <span className="mt-1.5 flex min-h-20 cursor-pointer items-center justify-center rounded-lg border border-dashed border-stone-300 bg-white px-4 text-center text-xs font-bold text-stone-500 hover:border-emerald-400 hover:text-[#007A55]">
                  {logo ? logo.name : "اختر صورة PNG أو JPG أو WEBP أو SVG — بحد أقصى 3MB"}
                  <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="sr-only" onChange={(event) => setLogo(event.target.files?.[0] ?? null)} />
                </span>
              </label>
            </div>

            {error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}
          </div>

          <footer className="flex flex-col-reverse gap-2 border-t border-stone-200 bg-white px-5 py-4 sm:flex-row sm:gap-3 sm:px-7">
            <button type="submit" disabled={isSubmitting || (!isDesignationBody && designationOptions.length === 0)} className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-[#007A55] px-5 text-sm font-black text-white transition hover:bg-[#006747] active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-45">
              <Save size={17} /> {isSubmitting ? "جاري الحفظ..." : "حفظ الجهة"}
            </button>
            <button type="button" onClick={onClose} disabled={isSubmitting} className="h-11 rounded-lg border border-stone-200 bg-white px-5 text-sm font-black text-slate-700 hover:bg-stone-50">إلغاء</button>
          </footer>
        </form>
      </aside>
    </div>
  );
}

function ResourcePage({ config, notify, confirm, adminUserId }: { config: ResourceConfig; notify: NotifyFn; confirm: ConfirmFn; adminUserId?: string }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [listView, setListView] = useState<"requests" | "registered">("requests");
  const [sortKey, setSortKey] = useState(config.columns[0]?.key ?? "name");
  const [filters, setFilters] = useState<Record<string, string>>(() => Object.fromEntries(config.filters.map((filter) => [filter.key, "all"])));
  const [drawerRow, setDrawerRow] = useState<Record<string, unknown> | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const activeColumns = config.registryTabs && listView === "registered" ? config.registryTabs.registeredColumns : config.columns;
  const { rows, total, isLoading } = useAdminList(config, page, search, filters, reloadToken, config.registryTabs ? listView : undefined);
  const sortedRows = useMemo(() => [...rows].sort((a, b) => getValue(a, sortKey).localeCompare(getValue(b, sortKey), "ar")), [rows, sortKey]);

  useEffect(() => {
    setSearch("");
    setPage(1);
    setListView("requests");
    setCreateOpen(false);
    setSortKey(config.columns[0]?.key ?? "name");
    setFilters(Object.fromEntries(config.filters.map((filter) => [filter.key, "all"])));
  }, [config]);

  const resource = ACTIONABLE_RESOURCES.has(config.resource) ? (config.resource as ResourceKind) : undefined;
  const canCreateEntity = config.resource === "designation-bodies" || config.resource === "appointed-bodies";
  const handleView = (row: Record<string, unknown>) => {
    if (config.resource === "suppliers" || config.resource === "designation-bodies") {
      window.open(`/admin/application-preview/${config.resource}/${encodeURIComponent(String(row.id))}`, "_blank", "noopener,noreferrer");
      return;
    }
    setDrawerRow(row);
  };
  const handleLogoUpload = async (row: Record<string, unknown>, file: File) => {
    if (config.resource !== "designation-bodies" && config.resource !== "appointed-bodies") return;
    if (row.offline) {
      notify("يجب مزامنة السجل مع قاعدة البيانات قبل رفع الشعار", "warning");
      return;
    }
    const result = await uploadResourceLogo(config.resource, String(row.id), file);
    if (!result.ok) {
      notify(result.message, "warning");
      return;
    }
    notify("تم تحديث شعار الجهة");
    setReloadToken((value) => value + 1);
  };

  return (
    <div className="space-y-3">
      <div className="border-b border-stone-200 pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-black text-[#007A55]">{config.eyebrow}</p>
            <div className="mt-0.5 flex items-baseline gap-3">
              <h1 className="text-xl font-black text-slate-950 sm:text-2xl">{config.title}</h1>
              <span className="text-xs font-bold text-stone-500">{total} سجل</span>
            </div>
          </div>
          <button type="button" onClick={() => canCreateEntity ? setCreateOpen(true) : notify("هذه الميزة غير متاحة بعد")} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#007A55] px-4 text-xs font-black text-white hover:bg-[#006747]">
            {config.primaryAction?.startsWith("تصدير") ? <Download size={16} /> : <Plus size={16} />}
            {config.primaryAction}
          </button>
        </div>
        {config.registryTabs && (
          <div className="mt-3 inline-flex max-w-full overflow-x-auto rounded-lg border border-stone-200 bg-white p-1" role="tablist" aria-label={`تصنيف ${config.title}`}>
            {[
              { value: "requests" as const, label: config.registryTabs.requestsLabel, icon: FileClock },
              { value: "registered" as const, label: config.registryTabs.registeredLabel, icon: BadgeCheck },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={listView === value}
                onClick={() => {
                  setListView(value);
                  setPage(1);
                  setFilters(Object.fromEntries(config.filters.map((filter) => [filter.key, "all"])));
                  const columns = value === "registered" ? config.registryTabs?.registeredColumns : config.columns;
                  setSortKey(columns?.find((column) => column.key !== "logo")?.key ?? "name");
                }}
                className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-md px-4 text-xs font-black transition-colors ${listView === value ? "bg-slate-950 text-white" : "text-stone-500 hover:bg-stone-50 hover:text-slate-950"}`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>
        )}
        {config.section === "suppliers" && (
          <div className="mt-3 inline-flex max-w-full overflow-x-auto rounded-lg border border-stone-200 bg-white p-1" role="tablist" aria-label="نوع طلب الحلال">
            {[
              { value: "all", label: "كل الطلبات", icon: ListChecks },
              { value: "ARAB_HALAL_CERTIFICATE", label: "شهادة الحلال", icon: FileCheck2 },
              { value: "ARAB_HALAL_MARK", label: "علامة الحلال", icon: BadgeCheck },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={(filters.purpose ?? "all") === value}
                onClick={() => { setFilters((previous) => ({ ...previous, purpose: value })); setPage(1); }}
                className={`inline-flex h-8 shrink-0 items-center gap-2 rounded-md px-3 text-xs font-black transition-colors ${(filters.purpose ?? "all") === value ? "bg-slate-950 text-white" : "text-stone-500 hover:bg-stone-50 hover:text-slate-950"}`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
        )}
        <div className="mt-3 grid gap-2 lg:grid-cols-[minmax(240px,1fr)_auto]">
          {config.searchPlaceholder && (
            <label className="flex h-10 items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
              <Search size={16} className="text-stone-400" />
              <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder={config.searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-stone-400" />
            </label>
          )}
          <div className="flex flex-wrap gap-2">
            {config.filters.filter((filter) => filter.key !== "purpose").map((filter) => (
              <label key={filter.key} className="flex h-10 items-center gap-2 rounded-lg border border-stone-200 bg-white px-3">
                <Filter size={14} className="text-stone-400" />
                <span className="text-[11px] font-black text-stone-500">{filter.label}</span>
                <select value={filters[filter.key] ?? "all"} onChange={(event) => { setFilters((prev) => ({ ...prev, [filter.key]: event.target.value })); setPage(1); }} className="bg-transparent text-sm font-black text-slate-800 outline-none">
                  {filter.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
            ))}
          </div>
        </div>
      </div>

      <section className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="flex min-h-[180px] items-center justify-center text-sm font-black text-stone-500">جاري تحميل البيانات...</div>
        ) : sortedRows.length === 0 ? (
          <div className="p-3"><EmptyState title={config.emptyTitle} action={config.emptyAction} onAction={() => canCreateEntity ? setCreateOpen(true) : notify("لا توجد بيانات حالياً")} /></div>
        ) : (
          <SimpleTable
            rows={sortedRows}
            columns={activeColumns}
            sortKey={sortKey}
            onSort={setSortKey}
            onView={handleView}
            onConfirm={confirm}
            onNotify={notify}
            resource={resource}
            adminUserId={adminUserId}
            onActed={() => setReloadToken((value) => value + 1)}
            onLogoUpload={config.registryTabs && listView === "registered" ? handleLogoUpload : undefined}
          />
        )}
        <div className="flex items-center justify-end border-t border-stone-200 bg-stone-50 px-3 py-2.5">
          <div className="flex gap-2">
            <button type="button" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-slate-700 disabled:opacity-40"><ChevronRight size={16} /></button>
            <button type="button" disabled={page * 20 >= total} onClick={() => setPage((value) => value + 1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-slate-700 disabled:opacity-40"><ChevronLeft size={16} /></button>
          </div>
        </div>
      </section>

      {drawerRow && <DetailDrawer row={drawerRow} title={config.title} onClose={() => setDrawerRow(null)} />}
      {createOpen && canCreateEntity && (
        <AddEntityPanel
          resource={config.resource as EntityCreationResource}
          notify={notify}
          onClose={() => setCreateOpen(false)}
          onCreated={() => {
            setCreateOpen(false);
            setListView("registered");
            setPage(1);
            setFilters(Object.fromEntries(config.filters.map((filter) => [filter.key, "all"])));
            setReloadToken((value) => value + 1);
          }}
        />
      )}
    </div>
  );
}

type RowAction = {
  action: string;
  icon: LucideIcon;
  label: string;
  tone: string;
  needsConfirm: boolean;
  confirmTitle?: string;
  confirmBody?: string;
};

function getRowActions(resource: ResourceKind | undefined, status: string): RowAction[] {
  if (!resource) return [];
  if (status === "pending") {
    return [
      { action: "approve", icon: Check, label: "اعتماد", tone: "border-emerald-200 bg-emerald-50 text-emerald-700", needsConfirm: false },
      { action: "reject", icon: X, label: "رفض", tone: "border-red-200 bg-red-50 text-red-700", needsConfirm: true, confirmTitle: "رفض الطلب", confirmBody: "هل تريد رفض هذا الطلب؟ يمكن التراجع عن هذا الإجراء لاحقاً." },
    ];
  }
  const actions: RowAction[] = [];
  if (status === "active") {
    actions.push({ action: "suspend", icon: Ban, label: "تعليق", tone: "border-amber-200 bg-amber-50 text-amber-700", needsConfirm: true, confirmTitle: "تعليق السجل", confirmBody: "هذا الإجراء يتطلب تأكيداً قبل التنفيذ." });
  }
  if (status !== "revoked") {
    actions.push({ action: "revoke", icon: Trash2, label: "سحب", tone: "border-red-200 bg-red-50 text-red-700", needsConfirm: true, confirmTitle: "سحب السجل", confirmBody: "سيتم تسجيل العملية في سجل العمليات، ويمكن التراجع عنها لاحقاً." });
  }
  if (resource === "certificates") {
    actions.push({ action: "renew", icon: RotateCcw, label: "تجديد", tone: "border-stone-200 bg-white text-slate-700", needsConfirm: false });
  } else if (status === "suspended" || status === "revoked") {
    actions.push({ action: "reactivate", icon: RotateCcw, label: "إعادة تفعيل", tone: "border-stone-200 bg-white text-slate-700", needsConfirm: false });
  }
  if (status === "revoked" || status === "expired") {
    actions.push({
      action: "delete",
      icon: Trash,
      label: "حذف نهائي",
      tone: "border-red-300 bg-red-100 text-red-800",
      needsConfirm: true,
      confirmTitle: "حذف نهائي",
      confirmBody: "هذا الإجراء نهائي ولا يمكن التراجع عنه إطلاقاً. سيتم حذف السجل وكل البيانات المرتبطة به (الشهادات والمدفوعات والمرفقات) نهائياً من قاعدة البيانات.",
    });
  }
  return actions;
}

function SimpleTable({
  rows,
  columns,
  sortKey,
  onSort,
  onView,
  onConfirm,
  onNotify,
  resource,
  adminUserId,
  onActed,
  onLogoUpload,
}: {
  rows: Record<string, unknown>[];
  columns: TableColumn[];
  sortKey?: string;
  onSort?: (key: string) => void;
  onView?: (row: Record<string, unknown>) => void;
  onConfirm: ConfirmFn;
  onNotify: NotifyFn;
  resource?: ResourceKind;
  adminUserId?: string;
  onActed?: (id: string) => void;
  onLogoUpload?: (row: Record<string, unknown>, file: File) => Promise<void>;
}) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [logoBusyId, setLogoBusyId] = useState<string | null>(null);

  const runAction = (id: string, action: RowAction) => {
    const doIt = async () => {
      setBusyId(id);
      const ok = await runResourceAction(resource as ResourceKind, id, action.action, onNotify, adminUserId);
      setBusyId(null);
      if (ok) onActed?.(id);
    };
    if (action.needsConfirm) {
      onConfirm({ title: action.confirmTitle ?? "", body: action.confirmBody ?? "", confirmLabel: action.label, onConfirm: doIt });
    } else {
      void doIt();
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-right">
        <thead className="bg-[#FAF9F6]">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="whitespace-nowrap border-b border-stone-200 px-3 py-2.5 text-[11px] font-black text-stone-500 sm:px-4">
                <button type="button" onClick={() => onSort?.(column.key)} className="inline-flex items-center gap-2">
                  {column.label}
                  {onSort && <ArrowUpDown size={14} className={sortKey === column.key ? "text-[#007A55]" : "text-stone-300"} />}
                </button>
              </th>
            ))}
            <th className="whitespace-nowrap border-b border-stone-200 px-3 py-2.5 text-[11px] font-black text-stone-500 sm:px-4">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const id = String(row.id ?? index);
            const status = getValue(row, "status");
            const actions = getRowActions(resource, status);
            const isBusy = busyId === id;
            const logoUrl = getValue(row, "logoUrl");
            const entityName = getValue(row, "name");
            return (
              <tr key={id} className="border-b border-stone-100 last:border-b-0 hover:bg-[#FAF9F6]">
                {columns.map((column) => (
                  <td key={column.key} className="whitespace-nowrap px-3 py-3 text-xs font-bold text-slate-700 sm:px-4 sm:text-sm">
                    {column.key === "status" ? (
                      <StatusBadge status={status as StatusKind} />
                    ) : column.key === "logo" ? (
                      <label className={`group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-stone-200 bg-stone-50 ${onLogoUpload ? "cursor-pointer hover:border-emerald-400" : ""}`} title={onLogoUpload ? "رفع أو تغيير شعار الجهة" : "شعار الجهة"}>
                        {logoUrl ? (
                          <img src={logoUrl} alt={`شعار ${entityName}`} className="h-full w-full object-contain p-1" />
                        ) : (
                          <Building2 size={18} className="text-stone-400 transition-colors group-hover:text-[#007A55]" />
                        )}
                        {onLogoUpload && (
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/svg+xml"
                            disabled={logoBusyId === id}
                            className="sr-only"
                            onChange={(event) => {
                              const input = event.currentTarget;
                              const file = input.files?.[0];
                              if (!file) return;
                              setLogoBusyId(id);
                              void onLogoUpload(row, file).finally(() => {
                                setLogoBusyId(null);
                                input.value = "";
                              });
                            }}
                          />
                        )}
                      </label>
                    ) : column.key === "country" ? (
                      <CountryFlag country={getValue(row, column.key)} />
                    ) : (
                      getValue(row, column.key) || "غير متوفر"
                    )}
                  </td>
                ))}
                <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                  <div className="flex gap-1.5">
                    <button type="button" onClick={() => onView?.(row)} className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-200 bg-white text-slate-700 hover:text-[#007A55]" aria-label="عرض التفاصيل"><Eye size={15} /></button>
                    {resource ? (
                      actions.map((action) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={action.action}
                            type="button"
                            disabled={isBusy}
                            onClick={() => runAction(id, action)}
                            className={`flex h-8 w-8 items-center justify-center rounded-md border disabled:opacity-40 ${action.tone}`}
                            aria-label={action.label}
                            title={action.label}
                          >
                            <Icon size={15} />
                          </button>
                        );
                      })
                    ) : (
                      <button type="button" onClick={() => onNotify("هذه الميزة غير متاحة بعد")} className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-200 bg-white text-slate-700" aria-label="إجراء"><RotateCcw size={15} /></button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const detailFieldLabels: Record<string, string> = {
  logoUrl: "شعار الجهة",
  requestNumber: "رقم الطلب",
  name: "اسم المنشأة",
  purpose: "الغرض من الطلب",
  country: "الدولة",
  category: "طبيعة الشركة",
  registeredAt: "تاريخ التسجيل",
  status: "الحالة",
  products: "المنتجات المطلوبة",
  companyRegisteredNameAr: "اسم الشركة بالعربية",
  companyRegisteredNameEn: "اسم الشركة بالإنجليزية",
  companyRegisteredAddressAr: "العنوان بالعربية",
  companyRegisteredAddressEn: "العنوان بالإنجليزية",
  branchAddresses: "عناوين الفروع",
  companyEmail: "البريد الإلكتروني للشركة",
  phone: "رقم الهاتف",
  fax: "رقم الفاكس",
  website: "الموقع الإلكتروني",
  responsiblePerson: "المسؤول في الشركة",
  managerEmail: "البريد الإلكتروني للمدير",
  responsiblePersonMobile: "هاتف المسؤول",
  qualityManagerName: "مدير الجودة",
  firstApplication: "طلب مقدم لأول مرة",
  productDescription: "وصف المنتجات",
  otherFactoryProducts: "منتجات المصنع الأخرى",
  hasOtherHalalCertificate: "توجد شهادة حلال أخرى",
  otherHalalCertificateScope: "مجال الشهادة الأخرى",
  otherHalalReferenceStandard: "المواصفة المرجعية",
  otherHalalCertifyingBody: "الجهة المانحة",
  applicantName: "اسم مقدم الطلب",
  applicantJobTitle: "المسمى الوظيفي",
  applicationDate: "تاريخ الطلب",
  additionalNotes: "ملاحظات إضافية",
  declarationAccepted: "الموافقة على التعهدات",
};

type DashboardAttachment = {
  id?: string;
  category?: string;
  fileName?: string;
  fileUrl?: string;
  mimeType?: string;
  uploadedAt?: string;
};

function DetailDrawer({ row, title, onClose }: { row: Record<string, unknown>; title: string; onClose: () => void }) {
  const fields = Object.entries(row).filter(([key]) => !["id", "createdAt", "updatedAt", "attachments"].includes(key));
  const attachments = Array.isArray(row.attachments) ? row.attachments as DashboardAttachment[] : [];
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/40 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 cursor-default" onClick={onClose} aria-label="إغلاق التفاصيل" />
      <aside className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/60 bg-white p-4 shadow-[0_32px_100px_rgba(15,23,42,.28)] sm:max-h-[calc(100dvh-3rem)] sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.14em] text-[#007A55]">تفاصيل السجل</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>
          </div>
          <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white"><X size={20} /></button>
        </div>
        <div className="mt-6 grid gap-3">
          {fields.length === 0 ? (
            <p className="rounded-xl border border-stone-200 bg-[#FAF9F6] p-4 text-sm font-bold text-stone-600">لا توجد تفاصيل إضافية لهذا السجل.</p>
          ) : (
            fields.map(([key, value]) => (
              <div key={key} className="rounded-xl border border-stone-200 bg-[#FAF9F6] p-4">
                <p className="text-xs font-black text-stone-500">{detailFieldLabels[key] ?? key}</p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {key === "country" ? <CountryFlag country={String(value ?? "")} /> : typeof value === "object" ? JSON.stringify(value) : String(value || "غير متوفر")}
                </p>
              </div>
            ))
          )}
        </div>
        {attachments.length > 0 && (
          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
            <h3 className="text-lg font-black text-slate-950">الوثائق المرفقة</h3>
            <div className="mt-4 grid gap-2">
              {attachments.map((attachment, index) => (
                <a
                  key={attachment.id ?? `${attachment.fileName}-${index}`}
                  href={attachment.fileUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-[#FAF9F6] px-4 py-3 text-sm font-black text-slate-800 hover:border-[#007A55] hover:text-[#007A55]"
                >
                  <span className="min-w-0 truncate" dir="ltr">{attachment.fileName || "ملف مرفق"}</span>
                  <Download size={17} className="shrink-0" />
                </a>
              ))}
            </div>
          </section>
        )}
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
          <h3 className="text-lg font-black text-slate-950">سجل العمليات</h3>
          <p className="mt-3 text-sm font-bold leading-7 text-stone-500">يمكنك الاطلاع على جميع عمليات الاعتماد والتعليق والسحب والتجديد المتعلقة بهذا السجل، والتراجع عنها عند الحاجة، من تبويب «سجل العمليات» في القائمة الجانبية.</p>
        </div>
      </aside>
    </div>
  );
}

type PaymentRow = {
  id: string;
  payerName: string;
  feeType: string;
  amount: number;
  currency: string;
  status: string;
  paidAt: string;
  receipt: string;
  receiptUrl: string;
};

function PaymentsPage({ notify, adminUserId }: { notify: NotifyFn; adminUserId?: string }) {
  const [rows, setRows] = useState<PaymentRow[]>([]);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [reloadToken, setReloadToken] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ limit: "100", status });
    if (search.trim()) params.set("search", search.trim());
    setIsLoading(true);
    fetch(`/api/admin/payments?${params.toString()}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("payments unavailable")))
      .then((payload: ApiListResponse) => setRows((payload.data ?? []) as unknown as PaymentRow[]))
      .catch(() => setRows([]))
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, [reloadToken, search, status]);

  const paidRows = rows.filter((row) => row.status === "paid");
  const pendingRows = rows.filter((row) => row.status === "pending");
  const overdueRows = rows.filter((row) => row.status === "overdue");
  const collected = paidRows.reduce((sum, row) => sum + Number(row.amount || 0), 0);

  const updateStatus = async (row: PaymentRow, nextStatus: "paid" | "overdue") => {
    setBusyId(row.id);
    try {
      const response = await fetch(`/api/admin/payments/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus, actorId: adminUserId }),
      });
      const body = await response.json() as { message?: string };
      if (!response.ok) throw new Error(body.message || "تعذر تحديث الدفعة");
      notify(nextStatus === "paid" ? "تم تأكيد استلام الدفعة" : "تم تصنيف الدفعة كمتأخرة");
      setReloadToken((value) => value + 1);
    } catch (error) {
      notify(error instanceof Error ? error.message : "تعذر تحديث الدفعة", "warning");
    } finally {
      setBusyId(null);
    }
  };

  const exportCsv = () => {
    const header = ["Payer", "Fee type", "Amount", "Currency", "Status", "Paid at"];
    const lines = rows.map((row) => [row.payerName, row.feeType, row.amount, row.currency, row.status, row.paidAt]);
    const csv = [header, ...lines].map((line) => line.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `halal-payments-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const metrics = [
    { label: "إجمالي المحصّل", value: `${collected.toLocaleString("ar-MA")} USD`, icon: CircleDollarSign, tone: "text-[#007A55] bg-emerald-50" },
    { label: "دفعات مؤكدة", value: paidRows.length, icon: CheckCircle2, tone: "text-emerald-700 bg-emerald-50" },
    { label: "بانتظار التأكيد", value: pendingRows.length, icon: FileClock, tone: "text-[#9A6700] bg-amber-50" },
    { label: "دفعات متأخرة", value: overdueRows.length, icon: AlertTriangle, tone: "text-red-700 bg-red-50" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 border-b border-stone-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-[11px] font-black text-[#007A55]">الخزينة والتحصيل</p><h1 className="mt-0.5 text-xl font-black text-slate-950 sm:text-2xl">إدارة المدفوعات</h1></div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setReloadToken((value) => value + 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-slate-700" title="تحديث"><RefreshCw size={16} /></button>
          <button type="button" onClick={exportCsv} disabled={rows.length === 0} className="inline-flex h-9 items-center gap-2 rounded-lg bg-slate-950 px-4 text-xs font-black text-white disabled:opacity-40"><Download size={15} /> تصدير CSV</button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm sm:grid sm:grid-cols-2 xl:grid-cols-4 sm:divide-x sm:divide-x-reverse sm:divide-stone-200">
        {metrics.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="flex items-center gap-3 border-b border-stone-200 p-3.5 last:border-0 sm:border-b-0">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tone}`}><Icon size={18} /></div>
            <div><p className="text-[10px] font-black text-stone-500">{label}</p><p className="mt-0.5 text-lg font-black text-slate-950">{value}</p></div>
          </div>
        ))}
      </div>

      <section className="flex min-h-[calc(100vh-244px)] flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-stone-200 p-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex max-w-full overflow-x-auto rounded-lg bg-stone-100 p-1">
            {[{ value: "all", label: "الكل" }, { value: "paid", label: "مدفوع" }, { value: "pending", label: "معلّق" }, { value: "overdue", label: "متأخر" }].map((item) => (
              <button key={item.value} type="button" onClick={() => setStatus(item.value)} className={`h-8 rounded-md px-4 text-xs font-black ${status === item.value ? "bg-white text-slate-950 shadow-sm" : "text-stone-500"}`}>{item.label}</button>
            ))}
          </div>
          <label className="flex h-9 w-full items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 lg:max-w-sm">
            <Search size={15} className="text-stone-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="بحث بالدافع أو رقم الشهادة" className="min-w-0 flex-1 bg-transparent text-xs font-bold outline-none" />
          </label>
        </div>
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center text-xs font-black text-stone-400">جاري تحميل السجل المالي...</div>
        ) : rows.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#007A55]"><ReceiptText size={24} /></div>
            <h2 className="mt-4 text-base font-black text-slate-950">لا توجد دفعات مسجلة</h2>
            <p className="mt-1 max-w-md text-xs font-bold leading-6 text-stone-500">ستظهر رسوم جهات التعيين ورسوم استخدام الشهادات هنا فور تسجيلها في النظام.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-right">
              <thead className="bg-stone-50 text-[10px] font-black text-stone-500"><tr>{["الدافع", "نوع الرسوم", "المبلغ", "الحالة", "تاريخ الدفع", "الإيصال", "إجراء"].map((label) => <th key={label} className="border-b border-stone-200 px-4 py-3">{label}</th>)}</tr></thead>
              <tbody className="divide-y divide-stone-100">
                {rows.map((row) => (
                  <tr key={row.id} className="text-xs font-bold text-slate-700 hover:bg-stone-50">
                    <td className="whitespace-nowrap px-4 py-3 font-black text-slate-950">{row.payerName}</td>
                    <td className="whitespace-nowrap px-4 py-3">{row.feeType}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-black" dir="ltr">{Number(row.amount).toLocaleString("ar-MA")} {row.currency}</td>
                    <td className="whitespace-nowrap px-4 py-3"><StatusBadge status={row.status} /></td>
                    <td className="whitespace-nowrap px-4 py-3">{row.paidAt || "غير متوفر"}</td>
                    <td className="whitespace-nowrap px-4 py-3">{row.receiptUrl ? <a href={row.receiptUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#007A55]"><ReceiptText size={14} /> {row.receipt}</a> : "غير متوفر"}</td>
                    <td className="whitespace-nowrap px-4 py-3"><div className="flex gap-1.5">
                      {row.status !== "paid" && <button type="button" disabled={busyId === row.id} onClick={() => void updateStatus(row, "paid")} className="flex h-8 w-8 items-center justify-center rounded-md bg-[#007A55] text-white disabled:opacity-40" title="تأكيد الدفع"><Check size={15} /></button>}
                      {row.status === "pending" && <button type="button" disabled={busyId === row.id} onClick={() => void updateStatus(row, "overdue")} className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-700 disabled:opacity-40" title="تصنيف كمتأخر"><Clock3 size={15} /></button>}
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

type DashboardSettings = {
  programName: string;
  contactEmail: string;
  reviewDays: string;
  certificateValidityMonths: string;
  designationFee: string;
  certificateFee: string;
  currency: string;
};

const defaultDashboardSettings: DashboardSettings = {
  programName: "البرنامج العربي للحلال",
  contactEmail: "halal@aidsmo.org",
  reviewDays: "10",
  certificateValidityMonths: "36",
  designationFee: "0",
  certificateFee: "0",
  currency: "USD",
};

function SettingsPage({ notify }: { notify: NotifyFn }) {
  const [settings, setSettings] = useState<DashboardSettings>(() => {
    try {
      const saved = localStorage.getItem("halal-dashboard-settings");
      return saved ? { ...defaultDashboardSettings, ...JSON.parse(saved) as Partial<DashboardSettings> } : defaultDashboardSettings;
    } catch {
      return defaultDashboardSettings;
    }
  });
  const [system, setSystem] = useState({ database: "checking", fallback: false, pendingApplications: 0, checkedAt: "" });

  const checkSystem = async () => {
    setSystem((current) => ({ ...current, database: "checking" }));
    try {
      const [healthResponse, statsResponse] = await Promise.all([fetch("/api/health"), fetch("/api/admin/overview/stats")]);
      const health = await healthResponse.json() as { database?: string; fallback?: boolean; time?: string };
      const stats = statsResponse.ok ? await statsResponse.json() as { pendingApplications?: number } : {};
      setSystem({ database: health.database ?? "offline", fallback: Boolean(health.fallback), pendingApplications: Number(stats.pendingApplications ?? 0), checkedAt: health.time ?? new Date().toISOString() });
    } catch {
      setSystem({ database: "offline", fallback: true, pendingApplications: 0, checkedAt: new Date().toISOString() });
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => { void checkSystem(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const updateSetting = (key: keyof DashboardSettings, value: string) => setSettings((current) => ({ ...current, [key]: value }));
  const saveSettings = () => {
    localStorage.setItem("halal-dashboard-settings", JSON.stringify(settings));
    notify("تم حفظ إعدادات الإدارة");
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 border-b border-stone-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-[11px] font-black text-[#007A55]">ضبط التشغيل</p><h1 className="mt-0.5 text-xl font-black text-slate-950 sm:text-2xl">إعدادات الإدارة</h1></div>
        <button type="button" onClick={saveSettings} className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#007A55] px-4 text-xs font-black text-white"><Save size={15} /> حفظ التغييرات</button>
      </div>
      <div className="grid min-h-[calc(100vh-132px)] gap-3 xl:grid-cols-12 xl:grid-rows-[auto_1fr]">
        <SettingsCard title="هوية البرنامج" icon={ShieldCheck} className="xl:col-span-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <AdminInput label="اسم البرنامج" value={settings.programName} onChange={(value) => updateSetting("programName", value)} />
            <AdminInput label="البريد الإداري" value={settings.contactEmail} type="email" onChange={(value) => updateSetting("contactEmail", value)} />
          </div>
        </SettingsCard>
        <SettingsCard title="سياسة المعالجة" icon={SlidersHorizontal} className="xl:col-span-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <AdminInput label="مدة المراجعة المستهدفة بالأيام" value={settings.reviewDays} type="number" onChange={(value) => updateSetting("reviewDays", value)} />
            <AdminInput label="صلاحية الشهادة بالأشهر" value={settings.certificateValidityMonths} type="number" onChange={(value) => updateSetting("certificateValidityMonths", value)} />
          </div>
        </SettingsCard>
        <SettingsCard title="الرسوم الافتراضية" icon={Landmark} className="xl:col-span-7">
          <div className="grid gap-3 sm:grid-cols-3">
            <AdminInput label="رسوم جهة التعيين / 3 سنوات" value={settings.designationFee} type="number" onChange={(value) => updateSetting("designationFee", value)} />
            <AdminInput label="رسوم استخدام الشهادة" value={settings.certificateFee} type="number" onChange={(value) => updateSetting("certificateFee", value)} />
            <label className="block"><span className="text-[11px] font-black text-stone-500">العملة</span><select value={settings.currency} onChange={(event) => updateSetting("currency", event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm font-black outline-none focus:border-[#007A55]"><option value="USD">USD</option><option value="MAD">MAD</option><option value="EUR">EUR</option></select></label>
          </div>
        </SettingsCard>
        <SettingsCard title="حالة النظام" icon={Database} className="xl:col-span-5">
          <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
            <SystemStatusLine label="واجهة الخادم" value="متصلة" tone="success" />
            <SystemStatusLine label="قاعدة البيانات" value={system.database === "checking" ? "جارٍ الفحص" : system.database === "connected" ? "متصلة" : "غير متصلة"} tone={system.database === "connected" ? "success" : system.database === "checking" ? "neutral" : "warning"} />
            <SystemStatusLine label="نمط التخزين" value={system.fallback ? `محلي احتياطي · ${system.pendingApplications} طلب` : "PostgreSQL مباشر"} tone={system.fallback ? "warning" : "success"} />
          </div>
          <button type="button" onClick={() => void checkSystem()} className="mt-3 inline-flex h-8 items-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-[11px] font-black text-slate-700"><RefreshCw size={13} /> إعادة فحص الاتصال</button>
        </SettingsCard>
      </div>
    </div>
  );
}

function SettingsCard({ title, icon: Icon, children, className = "" }: { title: string; icon: LucideIcon; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-lg border border-stone-200 bg-white p-4 shadow-sm ${className}`}>
      <div className="mb-4 flex items-center gap-2.5 border-b border-stone-100 pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#007A55]"><Icon size={17} /></div>
        <h2 className="text-sm font-black text-slate-950">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
}

function AdminInput({ label, value, type = "text", onChange }: { label: string; value: string; type?: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-[11px] font-black text-stone-500">{label}</span>
      <input value={value} type={type} onChange={(event) => onChange(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm font-bold outline-none focus:border-[#007A55] focus:ring-2 focus:ring-emerald-100" />
    </label>
  );
}

function SystemStatusLine({ label, value, tone }: { label: string; value: string; tone: "success" | "warning" | "neutral" }) {
  const dot = tone === "success" ? "bg-emerald-500" : tone === "warning" ? "bg-amber-500" : "bg-stone-400";
  return <div className="flex items-center justify-between gap-3 rounded-lg bg-stone-50 px-3 py-2.5"><span className="text-[11px] font-bold text-stone-500">{label}</span><span className="inline-flex items-center gap-2 text-[11px] font-black text-slate-800"><span className={`h-2 w-2 rounded-full ${dot}`} />{value}</span></div>;
}

function HistoryPage({ notify, adminUserId }: { notify: NotifyFn; adminUserId?: string }) {
  const [entries, setEntries] = useState<ActionLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadToken, setReloadToken] = useState(0);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    fetchActionLog(100)
      .then(setEntries)
      .finally(() => setIsLoading(false));
  }, [reloadToken]);

  const handleUndo = async (entry: ActionLogEntry) => {
    setBusyId(entry.id);
    const result = await undoResourceAction(entry.id, adminUserId);
    setBusyId(null);
    if (!result.ok) {
      notify(result.message, "warning");
      return;
    }
    notify("تم التراجع عن الإجراء");
    setReloadToken((value) => value + 1);
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
        <p className="text-xs font-black uppercase tracking-[.14em] text-[#007A55]">تدقيق العمليات</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">سجل العمليات</h1>
        <p className="mt-2 text-sm font-bold text-stone-500">جميع عمليات الاعتماد والرفض والتعليق والسحب وإعادة التفعيل والتجديد، مع إمكانية التراجع.</p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[var(--shadow-ind-card)]">
        {isLoading ? (
          <div className="flex min-h-[240px] items-center justify-center text-sm font-black text-stone-500">جاري تحميل السجل...</div>
        ) : entries.length === 0 ? (
          <div className="p-5"><EmptyState title="لا توجد عمليات مسجّلة بعد" action="تحديث" onAction={() => setReloadToken((value) => value + 1)} /></div>
        ) : (
          <div className="divide-y divide-stone-100">
            {entries.map((entry) => (
              <div key={entry.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF9F6] text-[#007A55]"><Clock3 size={18} /></div>
                  <div>
                    <p className="text-sm font-black text-slate-950">
                      {entry.actionLabel} - {entry.resourceLabel} <span className="text-stone-500">"{entry.entityName}"</span>
                    </p>
                    <p className="mt-1 text-xs font-bold text-stone-500">
                      {entry.actor} · {new Date(entry.createdAt).toLocaleString("ar")}
                      {entry.reason ? ` · ${entry.reason}` : ""}
                    </p>
                    {entry.undone && (
                      <span className="mt-2 inline-flex items-center rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-[10px] font-black text-stone-500">تم التراجع عنها</span>
                    )}
                  </div>
                </div>
                {entry.canUndo && (
                  <button
                    type="button"
                    disabled={busyId === entry.id}
                    onClick={() => handleUndo(entry)}
                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 text-xs font-black text-slate-700 hover:border-[#007A55] hover:text-[#007A55] disabled:opacity-40"
                  >
                    <Undo2 size={14} /> تراجع
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function UsersPage({ notify }: { notify: NotifyFn }) {
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadToken, setReloadToken] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "VIEWER" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchAdminUsers()
      .then(setUsers)
      .finally(() => setIsLoading(false));
  }, [reloadToken]);

  const handleCreate = async () => {
    if (!form.name.trim() || !form.email.trim() || form.password.length < 6) {
      notify("يرجى إدخال الاسم والبريد الإلكتروني وكلمة مرور من 6 أحرف على الأقل.", "warning");
      return;
    }
    setIsSubmitting(true);
    const result = await createAdminUserApi(form);
    setIsSubmitting(false);
    if (!result.ok) {
      notify(result.message, "warning");
      return;
    }
    notify("تمت إضافة المستخدم بنجاح");
    setForm({ name: "", email: "", password: "", role: "VIEWER" });
    setShowForm(false);
    setReloadToken((value) => value + 1);
  };

  const toggleActive = async (user: AdminUserRecord) => {
    const result = await updateAdminUserApi(user.id, { isActive: !user.isActive });
    if (!result.ok) {
      notify(result.message, "warning");
      return;
    }
    notify(user.isActive ? "تم تعطيل المستخدم" : "تم تفعيل المستخدم");
    setReloadToken((value) => value + 1);
  };

  const roleLabel: Record<string, string> = { SUPER_ADMIN: "مدير عام", REVIEWER: "مراجع", VIEWER: "مشاهدة فقط" };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.14em] text-[#007A55]">إدارة الفريق</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">المستخدمون</h1>
          </div>
          <button type="button" onClick={() => setShowForm((value) => !value)} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#007A55] px-5 text-sm font-black text-white shadow-[var(--shadow-ind-sharp)] hover:bg-[#004D36]">
            <Plus size={18} /> إضافة مستخدم
          </button>
        </div>

        {showForm && (
          <div className="mt-5 grid gap-3 rounded-xl border border-stone-200 bg-[#FAF9F6] p-4 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-black text-stone-500">الاسم</span>
              <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="mt-2 h-11 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm font-bold outline-none focus:border-[#007A55]" />
            </label>
            <label className="block">
              <span className="text-xs font-black text-stone-500">البريد الإلكتروني</span>
              <input type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} className="mt-2 h-11 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm font-bold outline-none focus:border-[#007A55]" />
            </label>
            <label className="block">
              <span className="text-xs font-black text-stone-500">كلمة المرور</span>
              <input type="password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} className="mt-2 h-11 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm font-bold outline-none focus:border-[#007A55]" />
            </label>
            <label className="block">
              <span className="text-xs font-black text-stone-500">الصلاحية</span>
              <select value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))} className="mt-2 h-11 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm font-black outline-none focus:border-[#007A55]">
                <option value="VIEWER">مشاهدة فقط</option>
                <option value="REVIEWER">مراجع</option>
                <option value="SUPER_ADMIN">مدير عام</option>
              </select>
            </label>
            <div className="md:col-span-2">
              <button type="button" disabled={isSubmitting} onClick={handleCreate} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#007A55] px-5 text-sm font-black text-white disabled:opacity-50">
                <Save size={18} /> حفظ المستخدم
              </button>
            </div>
          </div>
        )}
      </div>

      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[var(--shadow-ind-card)]">
        {isLoading ? (
          <div className="flex min-h-[240px] items-center justify-center text-sm font-black text-stone-500">جاري تحميل المستخدمين...</div>
        ) : users.length === 0 ? (
          <div className="p-5"><EmptyState title="لا يوجد مستخدمون بعد" action="إضافة مستخدم" onAction={() => setShowForm(true)} /></div>
        ) : (
          <div className="divide-y divide-stone-100">
            {users.map((user) => (
              <div key={user.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF9F6] text-[#007A55]"><User size={20} /></div>
                  <div>
                    <p className="text-sm font-black text-slate-950">{user.name}</p>
                    <p className="mt-1 text-xs font-bold text-stone-500">{user.email} · {roleLabel[user.role] ?? user.role}</p>
                    <p className="mt-1 text-[11px] font-bold text-stone-400">{user.lastLoginAt ? `آخر دخول: ${new Date(user.lastLoginAt).toLocaleString("ar")}` : "لم يسجل الدخول بعد"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex h-8 items-center rounded-full border px-3 text-xs font-black ${user.isActive ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-stone-200 bg-stone-100 text-stone-500"}`}>
                    {user.isActive ? "نشط" : "معطّل"}
                  </span>
                  <button type="button" onClick={() => toggleActive(user)} className="inline-flex h-9 items-center rounded-lg border border-stone-200 bg-white px-4 text-xs font-black text-slate-700 hover:border-[#007A55] hover:text-[#007A55]">
                    {user.isActive ? "تعطيل" : "تفعيل"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ConfirmModal({ action, onClose, onConfirm }: { action: ConfirmAction; onClose: () => void; onConfirm: () => void }) {
  if (!action) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-floating)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600"><AlertTriangle size={24} /></div>
        <h2 className="mt-5 text-2xl font-black text-slate-950">{action.title}</h2>
        <p className="mt-3 text-sm font-bold leading-7 text-stone-600">{action.body}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-3">
          <button type="button" onClick={onConfirm} className="h-11 flex-1 rounded-xl bg-red-600 text-sm font-black text-white">{action.confirmLabel}</button>
          <button type="button" onClick={onClose} className="h-11 flex-1 rounded-xl border border-stone-200 bg-white text-sm font-black text-slate-700">إلغاء</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [isAuthed, setIsAuthed] = useState(() => localStorage.getItem("admin-session") === "true");
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const raw = localStorage.getItem("admin-user");
      return raw ? (JSON.parse(raw) as AdminUser) : null;
    } catch {
      return null;
    }
  });
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const notify: NotifyFn = (text, tone = "success", onUndo) => {
    const id = Date.now();
    setToasts((current) => [...current, { id, text, tone, onUndo }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), onUndo ? 6000 : 3200);
  };

  const login = (user: AdminUser) => {
    localStorage.setItem("admin-session", "true");
    localStorage.setItem("admin-user", JSON.stringify(user));
    setAdminUser(user);
    setIsAuthed(true);
  };

  const logout = () => {
    localStorage.removeItem("admin-session");
    localStorage.removeItem("admin-user");
    setAdminUser(null);
    setIsAuthed(false);
  };

  if (!isAuthed) return <AdminLogin onLogin={login} />;

  const pageTitle = navItems.find((item) => item.section === activeSection)?.label ?? "لوحة التحكم";
  const resourceConfig =
    activeSection !== "overview" && activeSection !== "settings" && activeSection !== "history" && activeSection !== "users" && activeSection !== "payments"
      ? resourceConfigs[activeSection]
      : undefined;

  return (
    <main dir="rtl" className="min-h-screen bg-[#FAF9F6] font-arabic text-slate-950">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between gap-3 px-3 sm:px-4 lg:px-5">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="شعار البرنامج العربي للحلال" className="h-10 w-10 rounded-full bg-white p-0.5" />
            <img src="/aidsmo.png" alt="AIDSMO" className="hidden h-8 w-auto sm:block" />
          </div>
          <div className="text-center">
            <p className="hidden text-[10px] font-black text-[#007A55] sm:block">لوحة إدارة داخلية</p>
            <h1 className="text-base font-black text-slate-950 sm:mt-0.5 sm:text-lg">{pageTitle}</h1>
          </div>
          <button type="button" onClick={logout} className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white" aria-label="تسجيل الخروج" title="تسجيل الخروج"><LogOut size={17} /></button>
        </div>
      </header>

      <aside className="fixed bottom-0 right-0 top-16 z-40 hidden w-56 border-l border-stone-200 bg-white p-2.5 lg:block">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.section;
            return (
              <button
                key={item.section}
                type="button"
                onClick={() => setActiveSection(item.section)}
                className={`flex h-10 w-full items-center gap-2.5 rounded-lg px-3 text-xs font-black transition-colors ${active ? "bg-[#007A55] text-white" : "text-stone-600 hover:bg-stone-50 hover:text-slate-950"}`}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white p-2 lg:hidden">
        <div className="flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.section} type="button" onClick={() => setActiveSection(item.section)} className={`flex min-w-[92px] flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-black ${activeSection === item.section ? "bg-[#007A55] text-white" : "text-stone-500"}`}>
                <Icon size={18} />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="min-h-screen pt-16 lg:pr-56">
        <div className="w-full px-3 py-3 pb-28 sm:px-4 lg:px-5 lg:py-4">
          {activeSection === "overview" && <OverviewPage />}
          {activeSection === "settings" && <SettingsPage notify={notify} />}
          {activeSection === "payments" && <PaymentsPage notify={notify} adminUserId={adminUser?.id} />}
          {activeSection === "history" && <HistoryPage notify={notify} adminUserId={adminUser?.id} />}
          {activeSection === "users" && <UsersPage notify={notify} />}
          {resourceConfig && <ResourcePage config={resourceConfig} notify={notify} confirm={setConfirmAction} adminUserId={adminUser?.id} />}
        </div>
      </section>

      <div className="fixed bottom-24 left-3 right-3 z-[110] space-y-2 sm:left-5 sm:right-auto sm:max-w-md lg:bottom-5">
        {toasts.map((toast) => (
          <div key={toast.id} className={`flex min-h-12 w-full items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-black shadow-[var(--shadow-ind-floating)] ${toast.tone === "success" ? "border-emerald-200 text-emerald-700" : "border-amber-200 text-amber-700"}`}>
            {toast.tone === "success" ? <Check size={18} /> : <AlertTriangle size={18} />}
            {toast.text}
            {toast.onUndo && (
              <button
                type="button"
                onClick={() => {
                  toast.onUndo?.();
                  setToasts((current) => current.filter((item) => item.id !== toast.id));
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-current px-2 py-1 text-xs"
              >
                <Undo2 size={13} /> تراجع
              </button>
            )}
          </div>
        ))}
      </div>

      <ConfirmModal
        action={confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          const action = confirmAction;
          setConfirmAction(null);
          action?.onConfirm();
        }}
      />
    </main>
  );
}
