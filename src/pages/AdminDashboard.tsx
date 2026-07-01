import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowUpDown,
  BadgeCheck,
  Ban,
  Bell,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  Download,
  Eye,
  FileCheck2,
  Filter,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Mail,
  Plus,
  RotateCcw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Store,
  Trash2,
  User,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import LoginForm from "../components/ui/login-form";

type AdminSection =
  | "overview"
  | "designation-bodies"
  | "appointed-bodies"
  | "suppliers"
  | "certificates"
  | "violations"
  | "payments"
  | "settings";

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
};

type ApiListResponse = {
  data?: Record<string, unknown>[];
  items?: Record<string, unknown>[];
  total?: number;
  page?: number;
  limit?: number;
};

type Toast = { id: number; text: string; tone: "success" | "warning" };
type ConfirmAction = { title: string; body: string; confirmLabel: string } | null;

const navItems: { section: AdminSection; label: string; icon: LucideIcon }[] = [
  { section: "overview", label: "لوحة التحكم", icon: LayoutDashboard },
  { section: "designation-bodies", label: "جهات التعيين", icon: Building2 },
  { section: "appointed-bodies", label: "الجهات المعيّنة", icon: BadgeCheck },
  { section: "suppliers", label: "الموردون والمنشآت", icon: Store },
  { section: "certificates", label: "الشهادات والتراخيص", icon: FileCheck2 },
  { section: "violations", label: "تقارير المخالفات", icon: AlertTriangle },
  { section: "payments", label: "الرسوم والمدفوعات", icon: CreditCard },
  { section: "settings", label: "الإعدادات", icon: Settings },
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

const resourceConfigs: Record<Exclude<AdminSection, "overview" | "settings">, ResourceConfig> = {
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
  },
  suppliers: {
    section: "suppliers",
    resource: "suppliers",
    title: "الموردون والمنشآت",
    eyebrow: "متابعة المنشآت والمنتجات والشهادات والمدفوعات",
    searchPlaceholder: "بحث بالاسم أو رقم التسجيل",
    primaryAction: "إضافة مورد",
    columns: [
      { key: "name", label: "اسم المنشأة" },
      { key: "country", label: "الدولة" },
      { key: "category", label: "الفئة" },
      { key: "appointedBodyName", label: "الجهة المعيّنة" },
      { key: "registeredAt", label: "تاريخ التسجيل" },
      { key: "status", label: "الحالة" },
    ],
    emptyTitle: "لا توجد منشآت مطابقة للمرشحات الحالية",
    emptyAction: "إضافة مورد",
    filters: [
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
  violations: {
    section: "violations",
    resource: "violations",
    title: "تقارير المخالفات",
    eyebrow: "بلاغات التفتيش والإشعارات وسجل المعالجة",
    columns: [
      { key: "inspectionDate", label: "تاريخ التفتيش" },
      { key: "location", label: "الموقع" },
      { key: "productName", label: "المنتج المخالف" },
      { key: "supplierName", label: "المورد" },
      { key: "severity", label: "درجة الخطورة" },
      { key: "designationBodyName", label: "جهة التعيين المُبلَّغة" },
      { key: "status", label: "الحالة" },
    ],
    emptyTitle: "لا توجد تقارير مخالفات ضمن المرشحات الحالية",
    emptyAction: "إرسال إشعار",
    filters: [
      { key: "severity", label: "الخطورة", options: [{ value: "all", label: "كل الدرجات" }, { value: "low", label: "منخفضة" }, { value: "medium", label: "متوسطة" }, { value: "high", label: "عالية" }] },
      { key: "status", label: "الحالة", options: [{ value: "all", label: "كل الحالات" }, { value: "open", label: "مفتوح" }, { value: "review", label: "قيد المراجعة" }, { value: "resolved", label: "تم الحل" }] },
      { key: "designationBody", label: "جهة التعيين", options: [{ value: "all", label: "كل الجهات" }] },
      { key: "dateRange", label: "الفترة", options: [{ value: "all", label: "كل الفترات" }] },
    ],
  },
  payments: {
    section: "payments",
    resource: "payments",
    title: "الرسوم والمدفوعات",
    eyebrow: "رسوم التفويض واستخدام الشهادات وحالة الإيصالات",
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

function StatusBadge({ status }: { status?: string }) {
  const normalized = status || "review";
  return (
    <span className={`inline-flex min-h-7 items-center rounded-full border px-3 text-xs font-black ${statusTone[normalized] ?? statusTone.review}`}>
      {statusLabels[normalized] ?? normalized}
    </span>
  );
}

function EmptyState({ title, action, onAction }: { title: string; action: string; onAction: () => void }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-[#FAF9F6] p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#007A55] shadow-[var(--shadow-ind-card)]">
        <ListChecks size={26} />
      </div>
      <h3 className="mt-5 text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 max-w-md text-sm font-bold leading-7 text-stone-500">لا توجد بيانات من واجهة الربط حالياً. ستظهر السجلات هنا تلقائياً عند توفرها من النظام الخلفي.</p>
      <button type="button" onClick={onAction} className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-[#007A55] px-5 text-sm font-black text-white shadow-[var(--shadow-ind-sharp)] hover:bg-[#004D36]">
        {action}
      </button>
    </div>
  );
}

function AdminLogin({ onLogin }: { onLogin: () => void }) {
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

function useAdminList(config?: ResourceConfig, page = 1, search = "", filters: Record<string, string> = {}) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!config) return;
    const controller = new AbortController();
    const params = new URLSearchParams({ page: String(page), limit: "20" });
    if (search) params.set("search", search);
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all") params.set(key, value);
    });
    setIsLoading(true);
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
  }, [config, filters, page, search]);

  return { rows, total, isLoading };
}

function OverviewPage({ notify, confirm }: { notify: (text: string) => void; confirm: (action: ConfirmAction) => void }) {
  const [activity, setActivity] = useState<Record<string, unknown>[]>([]);
  const [approvals, setApprovals] = useState<Record<string, unknown>[]>([]);
  const [expiring, setExpiring] = useState<Record<string, unknown>[]>([]);
  const [stats, setStats] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, activityRes, approvalsRes, expiringRes] = await Promise.all([
          fetch("/api/admin/overview/stats"),
          fetch("/api/admin/audit-log?limit=10"),
          fetch("/api/admin/designation-bodies?status=pending&limit=10"),
          fetch("/api/admin/certificates?expiresWithin=30&limit=20"),
        ]);
        setStats(statsRes.ok ? await statsRes.json() : {});
        const activityJson: ApiListResponse = activityRes.ok ? await activityRes.json() : {};
        const approvalsJson: ApiListResponse = approvalsRes.ok ? await approvalsRes.json() : {};
        const expiringJson: ApiListResponse = expiringRes.ok ? await expiringRes.json() : {};
        setActivity(activityJson.data ?? activityJson.items ?? []);
        setApprovals(approvalsJson.data ?? approvalsJson.items ?? []);
        setExpiring(expiringJson.data ?? expiringJson.items ?? []);
      } catch {
        setStats({});
        setActivity([]);
        setApprovals([]);
        setExpiring([]);
      }
    };
    void load();
  }, []);

  const statCards = [
    { label: "إجمالي جهات التعيين", key: "designationBodies", icon: Building2, tone: "text-[#007A55]" },
    { label: "إجمالي الجهات المعيّنة", key: "appointedBodies", icon: BadgeCheck, tone: "text-[#007A55]" },
    { label: "الشهادات النشطة", key: "activeCertificates", icon: FileCheck2, tone: "text-[#007A55]" },
    { label: "المخالفات المفتوحة", key: "openViolations", icon: AlertTriangle, tone: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.key} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black text-stone-500">{card.label}</p>
                  <p className="mt-3 text-3xl font-black text-slate-950">{String(stats[card.key] ?? "—")}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF9F6] ${card.tone}`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="mt-4 text-xs font-black text-stone-500">يتم احتساب المؤشر من API عند الربط</p>
            </article>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
          <h2 className="text-xl font-black text-slate-950">آخر النشاطات</h2>
          {activity.length === 0 ? (
            <EmptyState title="لا توجد نشاطات حديثة" action="تحديث السجل" onAction={() => notify("سيتم تحديث السجل عند توفر واجهة الربط")} />
          ) : (
            <div className="mt-5 space-y-3">{activity.slice(0, 10).map((item, index) => <AuditLine key={index} item={item} />)}</div>
          )}
        </section>
        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
          <h2 className="text-xl font-black text-slate-950">طلبات بانتظار الاعتماد</h2>
          {approvals.length === 0 ? (
            <EmptyState title="لا توجد طلبات اعتماد معلّقة" action="مراجعة الطلبات" onAction={() => notify("لا توجد طلبات معلقة حالياً")} />
          ) : (
            <div className="mt-5 space-y-3">
              {approvals.map((item, index) => (
                <article key={index} className="rounded-xl border border-stone-100 bg-[#FAF9F6] p-4">
                  <p className="font-black text-slate-950">{getValue(item, "name") || "طلب جهة تعيين"}</p>
                  <div className="mt-3 flex gap-2">
                    <button type="button" onClick={() => notify("تم اعتماد الطلب")} className="h-9 rounded-lg bg-[#007A55] px-4 text-xs font-black text-white">اعتماد</button>
                    <button type="button" onClick={() => confirm({ title: "رفض الطلب", body: "هل تريد رفض طلب الاعتماد؟", confirmLabel: "رفض الطلب" })} className="h-9 rounded-lg bg-red-600 px-4 text-xs font-black text-white">رفض</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
        <h2 className="text-xl font-black text-slate-950">الشهادات المنتهية خلال 30 يوماً</h2>
        {expiring.length === 0 ? (
          <EmptyState title="لا توجد شهادات قريبة الانتهاء" action="عرض الشهادات" onAction={() => notify("سيتم فتح سجل الشهادات عند توفر البيانات")} />
        ) : (
          <SimpleTable rows={expiring} columns={[{ key: "supplierName", label: "اسم المورد" }, { key: "certificateNumber", label: "رقم الشهادة" }, { key: "expiresAt", label: "تاريخ الانتهاء" }, { key: "appointedBodyName", label: "الجهة المعيّنة" }]} onConfirm={confirm} onNotify={notify} />
        )}
      </section>
    </div>
  );
}

function AuditLine({ item }: { item: Record<string, unknown> }) {
  return (
    <div className="flex gap-3 rounded-xl border border-stone-100 bg-[#FAF9F6] p-4">
      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#007A55] shadow-[var(--shadow-ind-card)]">
        <Clock3 size={18} />
      </div>
      <div>
        <p className="text-sm font-black text-slate-950">{getValue(item, "actionType") || getValue(item, "action") || "إجراء إداري"}</p>
        <p className="mt-1 text-xs font-bold text-stone-500">{getValue(item, "actor") || "مستخدم النظام"} · {getValue(item, "timestamp") || getValue(item, "createdAt") || "وقت غير محدد"}</p>
      </div>
    </div>
  );
}

function ResourcePage({ config, notify, confirm }: { config: ResourceConfig; notify: (text: string) => void; confirm: (action: ConfirmAction) => void }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState(config.columns[0]?.key ?? "name");
  const [filters, setFilters] = useState<Record<string, string>>(() => Object.fromEntries(config.filters.map((filter) => [filter.key, "all"])));
  const [drawerRow, setDrawerRow] = useState<Record<string, unknown> | null>(null);
  const { rows, total, isLoading } = useAdminList(config, page, search, filters);
  const sortedRows = useMemo(() => [...rows].sort((a, b) => getValue(a, sortKey).localeCompare(getValue(b, sortKey), "ar")), [rows, sortKey]);

  const isPayments = config.section === "payments";

  return (
    <div className="space-y-5">
      {isPayments && <PaymentSummary />}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[.14em] text-[#007A55]">{config.eyebrow}</p>
            <h1 className="mt-2 text-3xl font-black text-slate-950">{config.title}</h1>
          </div>
          <button type="button" onClick={() => notify("سيتم تنفيذ الإجراء بعد ربط API")} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#007A55] px-5 text-sm font-black text-white shadow-[var(--shadow-ind-sharp)] hover:bg-[#004D36]">
            {config.primaryAction === "تصدير CSV" ? <Download size={18} /> : <Plus size={18} />}
            {config.primaryAction}
          </button>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(240px,1fr)_auto]">
          {config.searchPlaceholder && (
            <label className="flex h-12 items-center gap-3 rounded-xl border border-stone-200 bg-[#FAF9F6] px-4">
              <Search size={18} className="text-stone-400" />
              <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder={config.searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-stone-400" />
            </label>
          )}
          <div className="flex flex-wrap gap-2">
            {config.filters.map((filter) => (
              <label key={filter.key} className="flex h-12 items-center gap-2 rounded-xl border border-stone-200 bg-white px-3">
                <Filter size={16} className="text-stone-400" />
                <span className="text-xs font-black text-stone-500">{filter.label}</span>
                <select value={filters[filter.key] ?? "all"} onChange={(event) => { setFilters((prev) => ({ ...prev, [filter.key]: event.target.value })); setPage(1); }} className="bg-transparent text-sm font-black text-slate-800 outline-none">
                  {filter.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
            ))}
          </div>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[var(--shadow-ind-card)]">
        {isLoading ? (
          <div className="flex min-h-[360px] items-center justify-center text-sm font-black text-stone-500">جاري تحميل البيانات من واجهة الربط...</div>
        ) : sortedRows.length === 0 ? (
          <div className="p-5"><EmptyState title={config.emptyTitle} action={config.emptyAction} onAction={() => notify("لا توجد بيانات حالياً")} /></div>
        ) : (
          <SimpleTable rows={sortedRows} columns={config.columns} sortKey={sortKey} onSort={setSortKey} onView={setDrawerRow} onConfirm={confirm} onNotify={notify} />
        )}
        <div className="flex items-center justify-between border-t border-stone-200 bg-[#FAF9F6] px-5 py-4">
          <p className="text-xs font-black text-stone-500">20 سجل في الصفحة · الإجمالي {total}</p>
          <div className="flex gap-2">
            <button type="button" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-slate-700 disabled:opacity-40"><ChevronRight size={18} /></button>
            <button type="button" onClick={() => setPage((value) => value + 1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-slate-700"><ChevronLeft size={18} /></button>
          </div>
        </div>
      </section>

      {drawerRow && <DetailDrawer row={drawerRow} title={config.title} onClose={() => setDrawerRow(null)} />}
    </div>
  );
}

function SimpleTable({
  rows,
  columns,
  sortKey,
  onSort,
  onView,
  onConfirm,
  onNotify,
}: {
  rows: Record<string, unknown>[];
  columns: TableColumn[];
  sortKey?: string;
  onSort?: (key: string) => void;
  onView?: (row: Record<string, unknown>) => void;
  onConfirm: (action: ConfirmAction) => void;
  onNotify: (text: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-right">
        <thead className="bg-[#FAF9F6]">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="whitespace-nowrap border-b border-stone-200 px-5 py-4 text-xs font-black text-stone-500">
                <button type="button" onClick={() => onSort?.(column.key)} className="inline-flex items-center gap-2">
                  {column.label}
                  {onSort && <ArrowUpDown size={14} className={sortKey === column.key ? "text-[#007A55]" : "text-stone-300"} />}
                </button>
              </th>
            ))}
            <th className="whitespace-nowrap border-b border-stone-200 px-5 py-4 text-xs font-black text-stone-500">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={String(row.id ?? index)} className="border-b border-stone-100 last:border-b-0 hover:bg-[#FAF9F6]">
              {columns.map((column) => (
                <td key={column.key} className="whitespace-nowrap px-5 py-4 text-sm font-bold text-slate-700">
                  {column.key === "status" ? <StatusBadge status={getValue(row, "status") as StatusKind} /> : getValue(row, column.key) || "—"}
                </td>
              ))}
              <td className="whitespace-nowrap px-5 py-4">
                <div className="flex gap-2">
                  <button type="button" onClick={() => onView?.(row)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-slate-700 hover:text-[#007A55]" aria-label="عرض التفاصيل"><Eye size={16} /></button>
                  <button type="button" onClick={() => onConfirm({ title: "تعليق السجل", body: "هذا الإجراء يتطلب تأكيداً قبل التنفيذ.", confirmLabel: "تأكيد التعليق" })} className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-700" aria-label="تعليق"><Ban size={16} /></button>
                  <button type="button" onClick={() => onConfirm({ title: "سحب السجل", body: "سيتم تسجيل العملية في سجل التدقيق.", confirmLabel: "تأكيد السحب" })} className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-700" aria-label="سحب"><Trash2 size={16} /></button>
                  <button type="button" onClick={() => onNotify("تم إرسال الإجراء إلى واجهة الربط")} className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 bg-white text-slate-700" aria-label="تجديد"><RotateCcw size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DetailDrawer({ row, title, onClose }: { row: Record<string, unknown>; title: string; onClose: () => void }) {
  const fields = Object.entries(row).filter(([key]) => !["id", "createdAt", "updatedAt"].includes(key));
  return (
    <div className="fixed inset-0 z-[90] bg-slate-950/40 backdrop-blur-sm" role="dialog" aria-modal="true">
      <aside className="fixed bottom-0 right-0 top-0 w-full max-w-xl overflow-y-auto border-l border-stone-200 bg-white p-6 shadow-[var(--shadow-ind-floating)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.14em] text-[#007A55]">تفاصيل السجل</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>
          </div>
          <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white"><X size={20} /></button>
        </div>
        <div className="mt-6 grid gap-3">
          {fields.length === 0 ? (
            <p className="rounded-xl border border-stone-200 bg-[#FAF9F6] p-4 text-sm font-bold text-stone-600">لا توجد تفاصيل إضافية في استجابة API.</p>
          ) : (
            fields.map(([key, value]) => (
              <div key={key} className="rounded-xl border border-stone-200 bg-[#FAF9F6] p-4">
                <p className="text-xs font-black text-stone-500">{key}</p>
                <p className="mt-1 text-sm font-bold text-slate-800">{typeof value === "object" ? JSON.stringify(value) : String(value || "—")}</p>
              </div>
            ))
          )}
        </div>
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
          <h3 className="text-lg font-black text-slate-950">سجل التدقيق الكامل</h3>
          <p className="mt-3 text-sm font-bold leading-7 text-stone-500">سيعرض هذا القسم جميع عمليات التعليق والسحب والتجديد والإشعارات عند ربط نموذج LicenseAction وسجلات التدقيق.</p>
        </div>
      </aside>
    </div>
  );
}

function PaymentSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        ["إجمالي المدفوعات", "السنة الحالية", CreditCard],
        ["مدفوعات معلّقة", "بانتظار التأكيد", Clock3],
        ["مدفوعات متأخرة", "تحتاج تذكير", AlertTriangle],
      ].map(([title, label, Icon]) => (
        <article key={title as string} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-slate-950">{title as string}</p>
              <p className="mt-2 text-xs font-bold text-stone-500">{label as string}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF9F6] text-[#007A55]"><Icon size={22} /></div>
          </div>
          <p className="mt-5 text-3xl font-black text-slate-950">—</p>
        </article>
      ))}
    </div>
  );
}

function SettingsPage({ notify, confirm }: { notify: (text: string) => void; confirm: (action: ConfirmAction) => void }) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
        <p className="text-xs font-black uppercase tracking-[.14em] text-[#007A55]">إعدادات النظام</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">الإعدادات</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <SettingsCard title="معلومات البرنامج" icon={ShieldCheck}>
          <AdminInput label="اسم البرنامج" value="البرنامج العربي للحلال" />
          <AdminInput label="البريد الإلكتروني" value="halal@aidsmo.org" />
          <button type="button" onClick={() => notify("تم حفظ معلومات البرنامج")} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#007A55] px-5 text-sm font-black text-white"><Save size={18} /> حفظ</button>
        </SettingsCard>
        <SettingsCard title="مجالات البرنامج" icon={ListChecks}>
          <div className="rounded-xl border border-stone-200 bg-[#FAF9F6] p-4 text-sm font-bold text-stone-600">ستتم قراءة المجالات من API عند الربط.</div>
          <button type="button" onClick={() => notify("إضافة مجال جديد")} className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-black text-white"><Plus size={18} /> إضافة مجال</button>
        </SettingsCard>
        <SettingsCard title="المستخدمون والصلاحيات" icon={User}>
          <EmptyState title="لا توجد قائمة مستخدمين من API حالياً" action="إضافة مستخدم" onAction={() => notify("إضافة مستخدم إداري")} />
        </SettingsCard>
        <SettingsCard title="إعدادات الإشعارات" icon={Bell}>
          {["تنبيهات انتهاء الشهادات", "تنبيهات المخالفات الجديدة", "تنبيهات الطلبات المعلّقة"].map((item) => (
            <label key={item} className="flex items-center justify-between rounded-xl border border-stone-200 bg-[#FAF9F6] p-4">
              <span className="text-sm font-black text-slate-800">{item}</span>
              <input type="checkbox" defaultChecked className="h-5 w-5 accent-[#007A55]" />
            </label>
          ))}
          <button type="button" onClick={() => confirm({ title: "حذف إعداد", body: "هذا مثال على نافذة تأكيد للإجراءات الحساسة.", confirmLabel: "تأكيد" })} className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#007A55] px-5 text-sm font-black text-white"><Mail size={18} /> حفظ الإشعارات</button>
        </SettingsCard>
      </div>
    </div>
  );
}

function SettingsCard({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)]">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF9F6] text-[#007A55]"><Icon size={22} /></div>
        <h2 className="text-xl font-black text-slate-950">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function AdminInput({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-xs font-black text-stone-500">{label}</span>
      <input defaultValue={value} className="mt-2 h-12 w-full rounded-xl border border-stone-200 bg-[#FAF9F6] px-4 text-sm font-bold outline-none focus:border-[#007A55]" />
    </label>
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
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={onConfirm} className="h-11 flex-1 rounded-xl bg-red-600 text-sm font-black text-white">{action.confirmLabel}</button>
          <button type="button" onClick={onClose} className="h-11 flex-1 rounded-xl border border-stone-200 bg-white text-sm font-black text-slate-700">إلغاء</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [isAuthed, setIsAuthed] = useState(() => localStorage.getItem("admin-demo-session") === "true");
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const notify = (text: string, tone: Toast["tone"] = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, text, tone }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3200);
  };

  const login = () => {
    localStorage.setItem("admin-demo-session", "true");
    setIsAuthed(true);
  };

  const logout = () => {
    localStorage.removeItem("admin-demo-session");
    setIsAuthed(false);
  };

  if (!isAuthed) return <AdminLogin onLogin={login} />;

  const pageTitle = navItems.find((item) => item.section === activeSection)?.label ?? "لوحة التحكم";
  const resourceConfig = activeSection !== "overview" && activeSection !== "settings" ? resourceConfigs[activeSection] : undefined;

  return (
    <main dir="rtl" className="min-h-screen bg-[#FAF9F6] font-arabic text-slate-950">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-xl">
        <div className="flex h-20 items-center justify-between gap-4 px-5 lg:px-7">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="شعار البرنامج العربي للحلال" className="h-14 w-14 rounded-full bg-white p-1 shadow-[var(--shadow-ind-card)]" />
            <img src="/aidsmo.png" alt="AIDSMO" className="hidden h-10 w-auto sm:block" />
          </div>
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[.16em] text-[#007A55]">لوحة إدارة داخلية</p>
            <h1 className="mt-1 text-xl font-black text-slate-950 md:text-2xl">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 rounded-xl border border-stone-200 bg-[#FAF9F6] px-3 py-2 md:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#007A55] text-white"><User size={18} /></div>
              <div>
                <p className="text-xs font-black text-slate-900">مدير النظام</p>
                <p className="text-[10px] font-bold text-stone-500">ADMIN</p>
              </div>
            </div>
            <button type="button" onClick={logout} className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white" aria-label="تسجيل الخروج"><LogOut size={19} /></button>
          </div>
        </div>
      </header>

      <aside className="fixed bottom-0 right-0 top-20 z-40 hidden w-72 border-l border-stone-200 bg-white p-4 shadow-[var(--shadow-ind-card)] lg:block">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.section;
            return (
              <button
                key={item.section}
                type="button"
                onClick={() => setActiveSection(item.section)}
                className={`flex h-12 w-full items-center gap-3 rounded-xl px-4 text-sm font-black transition-all ${active ? "bg-[#007A55] text-white shadow-[var(--shadow-ind-sharp)]" : "text-stone-600 hover:bg-[#FAF9F6] hover:text-slate-950"}`}
              >
                <Icon size={19} />
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
              <button key={item.section} type="button" onClick={() => setActiveSection(item.section)} className={`flex min-w-14 flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] font-black ${activeSection === item.section ? "bg-[#007A55] text-white" : "text-stone-500"}`}>
                <Icon size={18} />
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="min-h-screen pt-24 lg:pr-72">
        <div className="mx-auto max-w-[1500px] px-4 pb-28 lg:px-7">
          {activeSection === "overview" && <OverviewPage notify={notify} confirm={setConfirmAction} />}
          {activeSection === "settings" && <SettingsPage notify={notify} confirm={setConfirmAction} />}
          {resourceConfig && <ResourcePage config={resourceConfig} notify={notify} confirm={setConfirmAction} />}
        </div>
      </section>

      <div className="fixed bottom-5 left-5 z-[110] space-y-2">
        {toasts.map((toast) => (
          <div key={toast.id} className={`flex min-h-12 items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-black shadow-[var(--shadow-ind-floating)] ${toast.tone === "success" ? "border-emerald-200 text-emerald-700" : "border-amber-200 text-amber-700"}`}>
            {toast.tone === "success" ? <Check size={18} /> : <AlertTriangle size={18} />}
            {toast.text}
          </div>
        ))}
      </div>

      <ConfirmModal
        action={confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          setConfirmAction(null);
          notify("تم تنفيذ الإجراء وتسجيله في سجل التدقيق");
        }}
      />
    </main>
  );
}
