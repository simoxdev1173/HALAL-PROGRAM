"use client";

// Simple Arrow SVG component, customized for progression in an RTL layout (pointing left visually)
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-4 h-4 ${className}`}
  >
    <path
      fillRule="evenodd"
      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
      clipRule="evenodd"
      transform="scale(-1, 1) translate(-24, 0)"
    />
  </svg>
);

const ArabHalalProgram = () => {
  return (
    <div
      className="relative overflow-hidden bg-slate-900 text-white min-h-screen flex flex-col justify-center" // Ensure it fits the screen height and centers
      dir="rtl"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/section-bg-1.jpeg"
          alt="Section Background"
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/40 to-slate-900/40"></div>
      </div>

      {/* Benefit Section (Tightened to fit single screen) */}
      <section className="relative z-10 py-16 px-6 md:px-12 flex-grow flex items-center">
        {" "}
        {/* Adjusted padding, flex-grow to center content */}
        <div className="max-w-7xl mx-auto w-full">
          {" "}
          {/* Reduced max-width for tighter grouping */}
          <div className="text-center mb-10">
            {" "}
            {/* Reduced margin */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {" "}
              {/* Reduced margin */}
              كيف يمكن لك الاستفادة من البرنامج
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
              يوفر البرنامج العربي للحلال مسارات واضحة للهيئات المانحة
              والموردين والمنشآت الراغبة في الحصول على الاعتماد أو الترخيص
              باستخدام علامة الحلال العربية.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {" "}
            {/* Reduced gap */}
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-md p-8 flex flex-col rounded-2xl border border-white/10 border-t-4 border-t-transparent hover:border-t-[#CA8A04] shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:shadow-[#CA8A04]/5 hover:-translate-y-1 transition-all duration-500 group">
              {" "}
              {/* Reduced padding */}
              <h3 className="text-2xl font-bold mb-4 text-[#007A55] group-hover:text-white transition-colors leading-relaxed">
                {" "}
                {/* Reduced margin */}
                هيئة مانحة لشهادة الحلال غير معتمدة
              </h3>
              <p className="text-slate-300 leading-normal flex-grow text-base md:text-lg">
                {" "}
                {/* Updated leading to be more compact, text size */}
                إذا كنتم هيئة مانحة لشهادة الحلال (خارج المنطقة العربية) غير
                معتمدة من قبل جهة تعيين عربية موقعة على وثيقة التعاون الفنية مع
                المنظمة غير (عضو بالبرنامج)، يمكن لكم التواصل مع إحدى الجهات
                الوطنية المعينة موقعة على وثيقة التعاون الفني مع المنظمة، عضو
                بالبرنامج، للحصول على الاعتماد بعد استيفاء جميع الشروط المنصوص
                عليها في البرنامج العربي للحلال.
              </p>
              <a
                href="#"
                className="mt-8 flex items-center gap-3 text-sm font-black tracking-wide text-white border-b-2 border-[#CA8A04]/40 pb-1 hover:text-[#CA8A04] hover:border-[#CA8A04] transition-all w-fit leading-relaxed group/cta"
              >
                {" "}
                {/* Updated styling to be more prominent with arrow */}
                <span>التواصل مع جهة تعيين عربية عضو بالبرنامج</span>
                <ArrowLeftIcon className="transition-transform group-hover/cta:-translate-x-1" />
              </a>
            </div>
            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-md p-8 flex flex-col rounded-2xl border border-white/10 border-t-4 border-t-transparent hover:border-t-[#CA8A04] shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:shadow-[#CA8A04]/5 hover:-translate-y-1 transition-all duration-500 group">
              {" "}
              {/* Reduced padding */}
              <h3 className="text-2xl font-bold mb-4 text-[#007A55] group-hover:text-white transition-colors leading-relaxed">
                {" "}
                {/* Reduced margin */}
                هيئة مانحة معتمدة من جهة عربية غير عضو بالبرنامج
              </h3>
              <p className="text-slate-300 leading-normal flex-grow text-base md:text-lg">
                {" "}
                {/* Updated leading and text size */}
                إذا كنتم هيئة مانحة لشهادة الحلال معتمدة من جهة عربية غير موقعة
                على وثيقة التعاون الفنية مع المنظمة غير (عضو بالبرنامج)، يمكن
                لك التواصل مع المنظمة بهذا الشأن، إلا أن حصولك على حقوق منح
                الشهادة لا يخول للمورد أو المنشأة الحاصلة على هذه الشهادة
                الولوج إلى الأسواق العربية ما لم يتم اعتمادك من قبل جهة تعيين
                عربية عضو بالبرنامج.
              </p>
              <a
                href="#"
                className="mt-8 flex items-center gap-3 text-sm font-black tracking-wide text-white border-b-2 border-[#CA8A04]/40 pb-1 hover:text-[#CA8A04] hover:border-[#CA8A04] transition-all w-fit leading-relaxed group/cta"
              >
                {" "}
                {/* Updated styling to be more prominent with arrow */}
                <span>التواصل مع المنظمة</span>
                <ArrowLeftIcon className="transition-transform group-hover/cta:-translate-x-1" />
              </a>
            </div>
            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-md p-8 flex flex-col rounded-2xl border border-white/10 border-t-4 border-t-transparent hover:border-t-[#CA8A04] shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:shadow-[#CA8A04]/5 hover:-translate-y-1 transition-all duration-500 group">
              {" "}
              {/* Reduced padding */}
              <h3 className="text-2xl font-bold mb-4 text-[#007A55] group-hover:text-white transition-colors leading-relaxed">
                {" "}
                {/* Reduced margin */}
                مورد أو منشأة راغبة في الحصول على الشهادة
              </h3>
              <div className="text-slate-300 leading-normal flex-grow text-base md:text-lg space-y-4">
                {" "}
                {/* Updated leading, text size, element spacing */}
                <p>
                  يمكن لك التواصل مع إحدى الجهات المعينة المعتمدة من قبل جهة
                  تعيين عربية، موقعة على وثيقة التعاون الفنية مع المنظمة (عضو
                  بالبرنامج) وطلب الحصول على الترخيص لمنح الشهادة، مع ضمان أن
                  تكون المنتجات ضمن مجالات الفئات المحددة.
                </p>
                <p>
                  كما يمكن لك التواصل مع المنظمة بطلب الحصول على الترخيص
                  باستخدام العلامة مع اتباع الإجراءات المطلوبة التي تحددها
                  المنظمة بهذا الشأن.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                {" "}
                {/* Reduced gap and margin */}
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm font-black tracking-wide text-white border-b-2 border-[#CA8A04]/40 pb-1 hover:text-[#CA8A04] hover:border-[#CA8A04] transition-all w-fit leading-relaxed group/cta"
                >
                  {" "}
                  {/* Updated styling */}
                  <span>طلب الترخيص باستخدام علامة الحلال العربية</span>
                  <ArrowLeftIcon className="transition-transform group-hover/cta:-translate-x-1" />
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm font-black tracking-wide text-slate-300 border-b border-white/20 pb-1 hover:text-white hover:border-[#CA8A04]/50 transition-all w-fit leading-relaxed group/cta"
                >
                  {" "}
                  {/* Updated styling to have similar arrow effect */}
                  <span>طلب الحصول على الترخيص باستخدام العلامة</span>
                  <ArrowLeftIcon className="opacity-70 group-hover/cta:opacity-100 transition-transform group-hover/cta:-translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArabHalalProgram;