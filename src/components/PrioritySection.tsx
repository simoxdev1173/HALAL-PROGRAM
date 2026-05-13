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
import { motion } from 'framer-motion';

const ExploreSectors = () => {
  // Sector data with specific Unsplash background images for each domain
  const sectors = [
    { 
      id: 1, 
      name: "اللحوم ومنتجاتها", 
      icon: Beef, 
      image: "/domains/meat.jpg"
    },
    { 
      id: 2, 
      name: "العصائر والمشروبات", 
      icon: CupSoda, 
      image: "/domains/drinks.jpg"
    },
    { 
      id: 3, 
      name: "الأدوية", 
      icon: Pill, 
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800"
    },
    { 
      id: 4, 
      name: "مستحضرات التجميل", 
      icon: Sparkles, 
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800"
    },
    { 
      id: 5, 
      name: "خدمات الحلال", 
      icon: Briefcase, 
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
    },
    { 
      id: 6, 
      name: "المنتجات المحفوظة", 
      icon: Package, 
      image: "/domains/prod.webp"
    },
    { 
      id: 7, 
      name: "المكملات الغذائية", 
      icon: TestTube, 
      image: "/domains/added.jpg"
    },
    { 
      id: 8, 
      name: "السياحة الحلال", 
      icon: PlaneTakeoff, 
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
    },
  ];

  return (
    <section className="relative py-12 px-6 md:px-12 bg-slate-950 overflow-hidden min-h-screen flex flex-col justify-center" dir="rtl">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/section-1-bg.jpeg" 
          alt="Global Logistics Background" 
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-750/50 via-slate-750/40 to-slate-950/50"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-light text-white tracking-tight leading-tight mb-4"
          >
            مجال تطبيق <span className="font-bold text-[#007A55]">البرنامج</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed"
          >
            يُطبَق هذا البرنامج على كافة <strong className="font-bold text-white">المنتجات</strong> التي تتطلب استيفاء <strong className="font-bold text-white">اشتراطات الحلال</strong> وفقاً <strong className="font-bold text-white">لأحكام الشريعة الإسلامية</strong>، والمشار إليها بالتفصيل في المرجع الفني:
          </motion.p>

          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            href="#" 
            className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full font-bold hover:bg-[#007A55] hover:border-[#007A55] hover:shadow-[0_0_20px_rgba(0,122,85,0.3)] transition-all duration-500 text-sm md:text-base cursor-pointer"
          >
            <FileText size={18} className="text-[#CA8A04]" />
            <span dir="ltr" className="tracking-wide">AIDSMO 3042-2019 (GSO 2055-2)</span>
          </motion.a>
        </div>

        {/* Cinematic Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sectors.map((sector, index) => {
            const IconComponent = sector.icon;
            return (
              <motion.a 
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                href="#"
                className="group relative flex flex-col items-center justify-center p-6 text-center min-h-[160px] overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 cursor-pointer"
              >
                {/* Sector Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={sector.image} 
                    alt={sector.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 opacity-30 group-hover:opacity-50"
                  />
                  {/* Overlay to keep icon and text visible */}
                  <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-[#007A55]/60 transition-colors duration-500"></div>
                </div>

                {/* Content Container (Icon + Text) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-3 p-3 rounded-full bg-white/10 backdrop-blur-sm transition-colors duration-500 group-hover:bg-white/20">
                    <IconComponent 
                      size={36} 
                      strokeWidth={1.2} 
                      className="text-white transition-all duration-500 group-hover:scale-110" 
                    />
                  </div>
                  
                  <p className="text-base">
                    <strong className="font-bold text-white transition-colors duration-500">
                      {sector.name}
                    </strong>
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ExploreSectors;