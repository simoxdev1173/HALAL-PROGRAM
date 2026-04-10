import React from 'react';

const ArabHalalProgram = () => {
  return (
    // استخدام dir="rtl" لضمان تنسيق اللغة العربية بشكل سليم
    <div className="bg-gray-50 text-gray-900" dir="rtl">
      
      {/* قسم المقدمة: مستوحى من أسلوب ISO "ماذا يمكن للمواصفات أن تفعل لك؟" */}
      <section className="py-24 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-10 tracking-tight leading-tight">
            ماذا يقدم <span className="font-bold text-emerald-900">البرنامج العربي للحلال</span> لك؟
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-600">
            يعمل البرنامج على ضمان <strong className="text-gray-900">حماية المستهلك المسلم</strong> في جميع أنحاء العالم من <strong className="text-gray-900">الشهادات والعلامات المزورة</strong>. 
            نحن نضع أسس <strong className="text-gray-900">منظومة اعتراف متعدد الأطراف</strong> لضمان <strong className="text-gray-900">تسهيل التبادل التجاري</strong> بين الدول العربية ، مع التأكد من مطابقة المنتجات العالمية <strong className="text-gray-900">للمتطلبات الفنية والمواصفات القياسية العربية</strong>.
          </p>
        </div>
      </section>

      {/* قسم البطاقات الثلاث: وصول سريع للخدمات الأساسية */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* البطاقة الأولى: التعريف بالبرنامج */}
          <div className="bg-white p-12 flex flex-col h-full border border-gray-200 hover:shadow-2xl transition-shadow duration-500">
            <h2 className="text-2xl font-bold mb-6 text-emerald-900">ما هو البرنامج؟</h2>
            <p className="text-lg text-gray-600 mb-10 flex-grow">
              استكشف منظومتنا المتكاملة للاعتراف المتبادل، والتي تم وضع بنودها لتتوافق مع <strong className="text-gray-900">مواصفات تقييم المطابقة الدولية ISO/IEC</strong> ، بهدف تأسيس <strong className="text-gray-900">مرجعية فنية موحدة</strong> لجميع المنتجات المشمولة في البرنامج.
            </p>
            <a href="#" className="inline-block text-sm font-black uppercase tracking-widest text-emerald-900 border-b-2 border-emerald-900 pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all w-fit">
              تعرف على أهداف البرنامج
            </a>
          </div>

          {/* البطاقة الثانية: طلب الاعتماد والترخيص */}
          <div className="bg-white p-12 flex flex-col h-full border border-gray-200 hover:shadow-2xl transition-shadow duration-500">
            <h2 className="text-2xl font-bold mb-6 text-emerald-900">هل تبحث عن الاعتماد؟</h2>
            <p className="text-lg text-gray-600 mb-10 flex-grow">
              سواء كنت <strong className="text-gray-900">جهة تعيين حكومية</strong> تسعى للانضمام  أو <strong className="text-gray-900">مورداً</strong> يرغب في الحصول على <strong className="text-gray-900">ترخيص استخدام علامة الحلال العربية</strong> ، نوفر لك المسار القانوني والمهني للوصول إلى الأسواق العربية بكل موثوقية.
            </p>
            <a href="#" className="inline-block text-sm font-black uppercase tracking-widest text-emerald-900 border-b-2 border-emerald-900 pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all w-fit">
              ابدأ طلب الانضمام
            </a>
          </div>

          {/* البطاقة الثالثة: محرك البحث والتحقق */}
          <div className="bg-white p-12 flex flex-col h-full border border-gray-200 hover:shadow-2xl transition-shadow duration-500">
            <h2 className="text-2xl font-bold mb-6 text-emerald-900">تحقق من الشهادة</h2>
            <p className="text-lg text-gray-600 mb-10 flex-grow">
              تأكد من <strong className="text-gray-900">حالة اعتماد الشركات</strong> ومنتجاتها عبر <strong className="text-gray-900">محرك البحث المتطور</strong>. يتيح لك النظام التحقق الفوري من <strong className="text-gray-900">رقم الترخيص</strong> وصلاحية شهادات الحلال الصادرة تحت مظلة المنظمة.
            </p>
            <a href="#" className="inline-block text-sm font-black uppercase tracking-widest text-emerald-900 border-b-2 border-emerald-900 pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all w-fit">
              انتقل إلى سجل المعتمدين
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ArabHalalProgram;