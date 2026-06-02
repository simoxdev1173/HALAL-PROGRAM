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
import { useTranslation } from 'react-i18next';

const ExploreSectors = () => {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const sectorNames = t("scopeSection.sectors", { returnObjects: true }) as string[];
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
    <section className="relative py-16 lg:py-24 bg-slate-950 overflow-hidden border-y border-stone-800" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Image & Overlay from previous version */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/section-1-bg.jpeg" 
          alt="Global Logistics Background" 
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C111D]/80 via-[#0C111D]/70 to-slate-950"></div>
      </div>

      {/* Industrial noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="mb-12 lg:mb-16 flex flex-col items-center text-center relative">
          
          <div className="inline-flex items-center justify-center gap-3 mb-6">
               <div className="w-12 h-1 bg-white/10 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
               <span className="px-4 py-1.5 text-[10px] lg:text-xs font-mono font-bold uppercase tracking-widest text-[#CA8A04] rounded bg-white/5 backdrop-blur-md shadow-[var(--shadow-ind-sharp)] border border-white/10">{t("scopeSection.eyebrow")}</span>
               <div className="w-12 h-1 bg-white/10 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            {t("scopeSection.titleBefore")} <span className="text-[#007A55]">{t("scopeSection.titleHighlight")}</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base lg:text-lg text-stone-300 font-medium max-w-3xl leading-relaxed"
          >
            {t("scopeSection.desc")}
          </motion.p>

          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            href="#" 
            className="mt-6 lg:mt-8 flex items-center gap-3 px-5 py-2.5 lg:px-6 lg:py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded shadow-[var(--shadow-ind-sharp)] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,122,85,0.3)] transition-all duration-300 font-mono font-bold tracking-widest uppercase cursor-pointer group text-xs lg:text-sm"
          >
            <div className="w-7 h-7 lg:w-8 lg:h-8 rounded bg-white/10 flex items-center justify-center shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] border border-white/10">
               <FileText size={16} className="text-[#CA8A04] group-hover:scale-110 transition-transform" />
            </div>
            <span dir="ltr" className="pt-1">AIDSMO 3042-2019 (GSO 2055-2)</span>
          </motion.a>
        </div>

        {/* Cinematic Cards Grid (Industrial Style) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6">
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
                className="group relative flex flex-col items-center justify-center p-3 lg:p-4 min-h-[180px] lg:min-h-[220px] bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 cursor-pointer overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-xl"
              >
                {/* Recessed Image Area */}
                <div className="absolute top-10 left-4 right-4 bottom-14 bg-stone-900 rounded-lg overflow-hidden border-none z-10 transition-all duration-500 group-hover:shadow-[inset_2px_2px_10px_rgba(0,0,0,0.5)] shadow-[inset_1px_1px_4px_rgba(0,0,0,0.5)]">
                  <img 
                    src={sector.image} 
                    alt={sectorNames[index] ?? sector.name} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110  opacity-90 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                {/* Floating Icon Over Image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-12 h-12 rounded-lg bg-white shadow-[var(--shadow-ind-floating)] flex items-center justify-center border border-stone-200 group-hover:bg-[#007A55] transition-colors duration-500">
                    <IconComponent 
                      size={24} 
                      strokeWidth={2} 
                      className="text-[#007A55] group-hover:text-white transition-colors duration-500" 
                    />
                  </div>
                </div>
                
                {/* Sector Name Label */}
                <div className="absolute bottom-4 left-0 right-0 text-center z-20 px-2">
                  <p className="text-sm font-black text-white tracking-tight transition-colors duration-300 group-hover:text-[#CA8A04]">
                    {sectorNames[index] ?? sector.name}
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
