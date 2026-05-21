import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const StatusSeal = () => (
  <svg viewBox="0 0 72 72" className="h-16 w-16 text-[#CA8A04]" fill="none" aria-hidden="true">
    <path d="M36 6 58 18.7v34.6L36 66 14 53.3V18.7L36 6Z" fill="currentColor" opacity=".14" />
    <path d="M36 9.5 55 20.5v31L36 62.5 17 51.5v-31L36 9.5Z" stroke="currentColor" strokeWidth="3" />
    <path d="M25 37h22M29 29h14M33 45h6" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" />
  </svg>
);

export default function JoinedCountries() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF9F6] pt-24 font-arabic" dir="rtl">
      <section className="relative flex h-[50vh] min-h-[430px] items-center justify-center overflow-hidden border-b border-stone-300 bg-slate-950 px-6 text-center shadow-[var(--shadow-ind-card)] lg:h-[60vh] lg:min-h-[520px]">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src="/slider/i-1.png" alt="الدول المنضمة" className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-slate-950/35 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/74 via-slate-950/18 to-[#FAF9F6]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="text-4xl font-black leading-tight text-white drop-shadow-[0_8px_24px_rgba(0,0,0,.45)] md:text-6xl lg:text-7xl"
          >
            الدول <span className="text-[#CA8A04]">المنضمة</span>
          </motion.h1>
        </div>
      </section>

      <section className="relative px-6 py-16 lg:py-24">
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex justify-center  items-center gap-4"
          >
            
            <p className="max-w-2xl text-center text-sm font-bold leading-7 text-slate-600 lg:text-base">
              هذه الصفحة مخصصة لعرض الدول التي تم اعتماد انضمامها رسمياً إلى البرنامج العربي للحلال.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-6 text-center shadow-[var(--shadow-ind-floating)] lg:p-10"
          >
            <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
            <div className="relative z-10">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] border border-stone-200 bg-[#FAF9F6] shadow-[var(--shadow-ind-card)]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  className="absolute h-20 w-20 rounded-full border-4 border-[#CA8A04]/15 border-t-[#CA8A04]"
                />
                <StatusSeal />
              </div>
              <h3 className="mt-8 text-3xl font-black text-slate-900 lg:text-5xl">سيتم تحديثها قريباً</h3>
              <p className="mx-auto mt-5 max-w-2xl text-base font-bold leading-8 text-slate-600 lg:text-lg">
                لا توجد دول منضمة في المرحلة الحالية، وسيتم عرض الدول المنضمة هنا فور اعتماد انضمامها رسمياً إلى البرنامج العربي للحلال.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 px-6 py-16 lg:py-24">
        <div className="absolute inset-0">
          <img src="/workflow/w-4.png" alt="" className="h-full w-full object-cover opacity-12" />
          <div className="absolute inset-0 bg-gradient-to-bl from-[#1C4C2A]/78 via-slate-950/92 to-slate-950" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-7xl"
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black leading-tight text-white lg:text-5xl">استكمل مسار الانضمام</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-7 text-stone-300 lg:text-base">
              انتقل إلى شروط الانضمام أو دليل الجهات المعنية بقطاع الحلال في الدول العربية.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Link
              to="/join-program"
              className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-[#CA8A04]/35 bg-slate-950 p-7 text-white shadow-[var(--shadow-ind-floating)] transition-all duration-500 hover:-translate-y-1 hover:border-[#CA8A04]/80 hover:shadow-[0_28px_80px_rgba(202,138,4,0.24)] focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/30"
            >
              <img
                src="/workflow/w-1.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-48 transition duration-700 ease-out group-hover:scale-110 group-hover:opacity-62"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/68 to-[#CA8A04]/24 transition duration-500 group-hover:from-slate-950/95 group-hover:via-slate-950/52" />
              <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              <div className="absolute -left-24 top-0 h-full w-24 skew-x-[-18deg] bg-white/18 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[760px]" />
              <div className="absolute bottom-0 right-0 h-1 w-0 bg-[#CA8A04] transition-all duration-500 group-hover:w-full" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <span className="w-fit rounded-full border border-white/15 bg-white/12 px-4 py-2 text-xs font-black text-[#CA8A04] shadow-[var(--shadow-ind-sharp)] backdrop-blur">دليل الإنضمام</span>
                <div>
                  <h3 className="text-3xl font-black lg:text-4xl">شروط الانضمام</h3>
                  <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-stone-200">
                    تعرف على الجهات التي لها الحق في الانضمام وآلية تقديم الطلب وتقييمه.
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/halal-sector-authorities"
              className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-white/12 bg-slate-950 p-7 text-white shadow-[var(--shadow-ind-card)] transition-all duration-500 hover:-translate-y-1 hover:border-[#007A55]/70 hover:shadow-[0_28px_80px_rgba(0,122,85,0.22)] focus:outline-none focus:ring-4 focus:ring-[#007A55]/30"
            >
              <img
                src="/slider/i-1.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-42 transition duration-700 ease-out group-hover:scale-110 group-hover:opacity-58"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-[#1C4C2A]/78 to-slate-950/30 transition duration-500 group-hover:via-[#1C4C2A]/58" />
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              <div className="absolute -left-24 top-0 h-full w-24 skew-x-[-18deg] bg-white/16 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[760px]" />
              <div className="absolute bottom-0 right-0 h-1 w-0 bg-[#007A55] transition-all duration-500 group-hover:w-full" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <span className="w-fit rounded-full border border-white/15 bg-white/12 px-4 py-2 text-xs font-black text-white shadow-[var(--shadow-ind-sharp)] backdrop-blur">دليل الجهات</span>
                <div>
                  <h3 className="text-3xl font-black lg:text-4xl">عرض الجهات المعنية</h3>
                  <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-stone-200">
                    استعرض الجهات المعنية بقطاع الحلال في الدول العربية وبياناتها التنظيمية.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
