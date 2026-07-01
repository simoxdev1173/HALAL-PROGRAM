import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { cn } from "../../lib/utils";

type LoginFormProps = {
  onLogin: () => void;
  className?: string;
};

export default function LoginForm({ onLogin, className }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section
      dir="ltr"
      className={cn(
        "relative grid min-h-[720px] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.06] text-white shadow-[0_40px_120px_rgba(0,0,0,.55)] backdrop-blur-2xl lg:grid-cols-[1.08fr_.92fr]",
        className
      )}
    >
      <div className="relative hidden min-h-[720px] overflow-hidden lg:order-2 lg:block">
        <img
          src="/about-us-bg.png"
          alt="واجهة تشغيلية للبرنامج العربي للحلال"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(2,6,23,.04),rgba(2,6,23,.24)_60%,rgba(2,6,23,.46)),linear-gradient(180deg,rgba(0,122,85,.06),rgba(202,138,4,.08))]" />
        <div className="absolute inset-0 opacity-[0.10]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)", backgroundSize: "38px 38px" }} />
        <div className="absolute right-8 top-8 flex h-40 w-40 items-center justify-center rounded-full bg-white p-3 shadow-[0_22px_55px_rgba(0,0,0,.38)]">
          <img src="/logo.svg" alt="شعار البرنامج العربي للحلال" className="h-full w-full object-contain" />
        </div>
      </div>

      <div dir="rtl" className="relative flex min-h-[720px] items-center p-6 sm:p-8 lg:order-1 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(0,122,85,.18),transparent_34%),radial-gradient(circle_at_12%_82%,rgba(202,138,4,.16),transparent_34%)] lg:hidden" />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onLogin();
          }}
          className="relative mx-auto flex w-full max-w-md flex-col"
        >
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <img src="/logo.svg" alt="شعار البرنامج العربي للحلال" className="h-24 w-24 rounded-full bg-white p-3 shadow-[0_24px_70px_rgba(0,0,0,.35)]" />
          </div>

          <h1 className="mt-5 text-4xl font-black leading-[1.25] text-white md:text-5xl">تسجيل الدخول</h1>
          <p className="mt-4 text-sm font-bold leading-8 text-stone-300">منصة مخصصة لفريق البرنامج العربي للحلال لإدارة الاعتمادات والشهادات والعمليات التنظيمية وفق صلاحيات داخلية معتمدة.</p>

          <div className="my-6 flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-white/15" />
            <p className="whitespace-nowrap text-xs font-bold text-stone-400">بيانات الوصول</p>
            <div className="h-px flex-1 bg-white/15" />
          </div>

          <label className="group flex h-12 w-full items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/[0.06] px-5 transition-colors focus-within:border-[#CA8A04]/60">
            <Mail size={17} className="text-stone-400 group-focus-within:text-[#CA8A04]" />
            <span className="sr-only">البريد الإلكتروني</span>
            <input
              type="email"
              defaultValue="admin@aidsmo.org"
              className="h-full min-w-0 flex-1 bg-transparent text-sm font-bold text-white outline-none placeholder:text-stone-500"
              placeholder="البريد الإلكتروني"
              required
            />
          </label>

          <label className="group mt-4 flex h-12 w-full items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/[0.06] px-5 transition-colors focus-within:border-[#CA8A04]/60">
            <LockKeyhole size={17} className="text-stone-400 group-focus-within:text-[#CA8A04]" />
            <span className="sr-only">كلمة المرور</span>
            <input
              type={showPassword ? "text" : "password"}
              defaultValue="admin"
              className="h-full min-w-0 flex-1 bg-transparent text-sm font-bold text-white outline-none placeholder:text-stone-500"
              placeholder="كلمة المرور"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CA8A04]/40"
              aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </label>

          <div className="mt-6 flex w-full items-center justify-between gap-4 text-stone-300">
            <label className="flex cursor-pointer items-center gap-2">
              <input className="h-4 w-4 accent-[#007A55]" type="checkbox" defaultChecked />
              <span className="text-xs font-bold">تذكر هذا الجهاز</span>
            </label>
            <button type="button" className="cursor-pointer text-xs font-bold underline decoration-white/30 underline-offset-4 transition-colors hover:text-white">
              استعادة الوصول
            </button>
          </div>

          <button
            type="submit"
            className="mt-8 h-12 w-full cursor-pointer rounded-full bg-[linear-gradient(145deg,#00A36F,#006747)] text-sm font-black text-white shadow-[0_22px_55px_rgba(0,122,85,.34),inset_1px_1px_2px_rgba(255,255,255,.35),inset_-2px_-2px_4px_rgba(0,0,0,.24)] outline-none transition-all hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(0,122,85,.42)] focus-visible:ring-4 focus-visible:ring-[#CA8A04]/35 active:translate-y-0"
          >
            الدخول إلى لوحة الإدارة
          </button>
        </form>
      </div>
    </section>
  );
}
