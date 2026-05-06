"use client";

const ArabHalalProgram = () => {
  return (
    // UI EXPERT NOTE: Replaced standard white/grey with a warm, premium off-white gradient
    <div className="relative overflow-hidden bg-gradient-to-br from-[#fdfcfb] via-[#faf9f6] to-stone-50 text-slate-900" dir="rtl">
      
      {/* Ambient Texture Glows: Extremely subtle to avoid looking "colorful" */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EEB422] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#007A55] opacity-[0.02] blur-[150px] rounded-full pointer-events-none"></div>

      {/* Intro Section */}
      <section className="relative z-10 py-24 px-6 md:px-12 border-b border-stone-200/50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-10 tracking-tight leading-tight">
            ماذا يقدم <span className="font-bold text-[#007A55]">البرنامج العربي للحلال</span> لك؟
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-slate-600">
            يعمل البرنامج على ضمان <strong className="text-slate-900 font-bold">حماية المستهلك المسلم</strong> في جميع أنحاء العالم من <strong className="text-slate-900 font-bold">الشهادات والعلامات المزورة</strong>. 
            نحن نضع أسس <strong className="text-slate-900 font-bold">منظومة اعتراف متعدد الأطراف</strong> لضمان{' '}
            {/* UI EXPERT NOTE: Subtle gold underline to highlight a core value without changing the text color */}
            <strong className="relative text-slate-900 font-bold inline-block">
              تسهيل التبادل التجاري
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#EEB422]/50 to-transparent"></span>
            </strong>{' '}
            بين الدول العربية، مع التأكد من مطابقة المنتجات العالمية <strong className="text-slate-900 font-bold">للمتطلبات الفنية والمواصفات القياسية العربية</strong>.
          </p>
        </div>
      </section>

      {/* Three Cards Section */}
      {/* UI EXPERT NOTE: Removed the solid grey background and let the warm gradient flow through */}
      <section className="relative z-10 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Card 1 */}
          <div className="bg-white/60 backdrop-blur-md p-10 lg:p-12 flex flex-col h-full rounded-2xl border border-stone-100 border-t-4 border-t-transparent hover:border-t-[#EEB422] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-[#EEB422]/5 hover:-translate-y-1 transition-all duration-500 group">
            <h2 className="text-2xl font-bold mb-6 text-[#007A55] group-hover:text-slate-900 transition-colors">ما هو البرنامج؟</h2>
            <p className="text-lg text-slate-600 mb-10 flex-grow leading-relaxed">
              استكشف منظومتنا المتكاملة للاعتراف المتبادل، والتي تم وضع بنودها لتتوافق مع <strong className="text-slate-900 font-bold">مواصفات تقييم المطابقة الدولية ISO/IEC</strong>، بهدف تأسيس <strong className="text-slate-900 font-bold">مرجعية فنية موحدة</strong> لجميع المنتجات المشمولة في البرنامج.
            </p>
            {/* UI EXPERT NOTE: Links default to dark text with gold underline, turning fully gold on hover */}
            <a href="#" className="inline-block text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-[#EEB422]/40 pb-1 hover:text-[#EEB422] hover:border-[#EEB422] transition-all w-fit">
              تعرف على أهداف البرنامج
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-white/60 backdrop-blur-md p-10 lg:p-12 flex flex-col h-full rounded-2xl border border-stone-100 border-t-4 border-t-transparent hover:border-t-[#EEB422] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-[#EEB422]/5 hover:-translate-y-1 transition-all duration-500 group">
            <h2 className="text-2xl font-bold mb-6 text-[#007A55] group-hover:text-slate-900 transition-colors">هل تبحث عن الاعتماد؟</h2>
            <p className="text-lg text-slate-600 mb-10 flex-grow leading-relaxed">
              سواء كنت <strong className="text-slate-900 font-bold">جهة تعيين حكومية</strong> تسعى للانضمام أو <strong className="text-slate-900 font-bold">مورداً</strong> يرغب في الحصول على <strong className="text-slate-900 font-bold bg-[#EEB422]/10 px-1.5 py-0.5 rounded">ترخيص استخدام علامة الحلال</strong>، نوفر لك المسار القانوني والمهني للوصول إلى الأسواق العربية.
            </p>
            <a href="#" className="inline-block text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-[#EEB422]/40 pb-1 hover:text-[#EEB422] hover:border-[#EEB422] transition-all w-fit">
              ابدأ طلب الانضمام
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white/60 backdrop-blur-md p-10 lg:p-12 flex flex-col h-full rounded-2xl border border-stone-100 border-t-4 border-t-transparent hover:border-t-[#EEB422] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-[#EEB422]/5 hover:-translate-y-1 transition-all duration-500 group">
            <h2 className="text-2xl font-bold mb-6 text-[#007A55] group-hover:text-slate-900 transition-colors">تحقق من الشهادة</h2>
            <p className="text-lg text-slate-600 mb-10 flex-grow leading-relaxed">
              تأكد من <strong className="text-slate-900 font-bold">حالة اعتماد الشركات</strong> ومنتجاتها عبر <strong className="text-slate-900 font-bold">محرك البحث المتطور</strong>. يتيح لك النظام التحقق الفوري من رقم الترخيص وصلاحية شهادات الحلال.
            </p>
            <a href="#" className="inline-block text-sm font-black uppercase tracking-widest text-slate-900 border-b-2 border-[#EEB422]/40 pb-1 hover:text-[#EEB422] hover:border-[#EEB422] transition-all w-fit">
              انتقل إلى سجل المعتمدين
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ArabHalalProgram;