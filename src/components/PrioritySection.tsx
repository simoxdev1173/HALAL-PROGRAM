import React from 'react';
import { 
  Beef, 
  CupSoda, 
  Pill, 
  Sparkles, 
  Briefcase, 
  Package, 
  TestTube, 
  PlaneTakeoff,
  FileText 
} from 'lucide-react';

const ExploreSectors = () => {
  // Sector data derived from the official Arab Halal Program document
  const sectors = [
    { id: 1, name: "اللحوم ومنتجاتها", icon: Beef },
    { id: 2, name: "العصائر والمشروبات", icon: CupSoda },
    { id: 3, name: "الأدوية", icon: Pill },
    { id: 4, name: "مستحضرات التجميل", icon: Sparkles },
    { id: 5, name: "خدمات الحلال", icon: Briefcase },
    { id: 6, name: "المنتجات المحفوظة", icon: Package },
    { id: 7, name: "المكملات الغذائية", icon: TestTube },
    { id: 8, name: "السياحة الحلال", icon: PlaneTakeoff },
  ];

  return (
    // تغيير خلفية القسم إلى bg-gray-50
    <section className="py-24 px-6 md:px-12 bg-gray-50 border-t border-gray-100" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header - توسيط المحتوى بالكامل */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 tracking-tight">
            مجال تطبيق <span className="font-bold text-emerald-700">البرنامج</span>
          </h2>
          
          {/* تحسين قراءة الوصف وإبراز الكلمات المفتاحية بخط عريض */}
          <p className="mt-6 text-lg text-gray-600 max-w-3xl leading-relaxed">
            يُطبَق هذا البرنامج على كافة <strong className="font-bold text-gray-900">المنتجات</strong> التي تتطلب استيفاء <strong className="font-bold text-gray-900">اشتراطات الحلال</strong> وفقاً <strong className="font-bold text-gray-900">لأحكام الشريعة الإسلامية</strong>، والمشار إليها بالتفصيل في المرجع الفني:
          </p>

          {/* جعل المواصفة القياسية فريدة على شكل رابط مستند */}
          <a 
            href="#" 
            className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-white border border-emerald-200 text-emerald-800 rounded-full font-bold hover:bg-emerald-50 hover:border-emerald-400 hover:shadow-md transition-all duration-300"
          >
            <FileText size={20} className="text-emerald-600" />
            <span dir="ltr">AIDSMO 3042-2019 (GSO 2055-2)</span>
          </a>
        </div>

        {/* ISO-Style Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {sectors.map((sector) => {
            const IconComponent = sector.icon;
            return (
              <a 
                key={sector.id}
                href="#"
                // إضافة تأثيرات التمرير: خلفية خضراء (bg-emerald-600) وارتفاع خفيف للأعلى
                className="group bg-white border border-gray-200 flex flex-col items-center justify-center p-8 text-center aspect-square transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-emerald-600 hover:border-emerald-600 rounded-xl"
              >
                {/* تحويل لون الأيقونة إلى الأبيض عند التمرير
                */}
                <IconComponent 
                  size={64} 
                  strokeWidth={1.5} 
                  className="text-gray-700 mb-6 transition-colors duration-500 group-hover:text-white" 
                />
                
                <p className="mb-0 text-lg">
                  {/* تحويل لون النص إلى الأبيض عند التمرير */}
                  <strong className="font-bold text-gray-900 transition-colors duration-500 group-hover:text-white">
                    {sector.name}
                  </strong>
                </p>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ExploreSectors;