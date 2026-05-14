import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ShieldCheck, MapPin, CheckCircle2, 
  ShieldAlert, Info, SlidersHorizontal, ArrowLeft, Download, Award, Mail, Phone
} from "lucide-react";

interface Certificate {
  id: string;
  companyName: string;
  licenseNumber: string;
  status: "Active" | "Expired" | "Pending";
  nextFollowUp: string;
  expiryDate: string;
  standards: string[];
  certificateUrl: string;
  location: string;
  category: string;
  image: string;
}

const MOCK_DATA: Certificate[] = [
  {
    id: "1",
    companyName: "شركة الغذاء النقي للتجارة",
    licenseNumber: "HALAL-2024-001",
    status: "Active",
    nextFollowUp: "2024-12-15",
    expiryDate: "2026-05-20",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "/intro.pdf",
    location: "الرياض، السعودية",
    category: "لحوم ومنتجاتها",
    image: "/domains/meat.jpg"
  },
  {
    id: "2",
    companyName: "مصنع الشرق للحلويات",
    licenseNumber: "HALAL-2024-002",
    status: "Expired",
    nextFollowUp: "---",
    expiryDate: "2023-11-10",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "#",
    location: "دبي، الإمارات",
    category: "حلويات وسكاكر",
    image: "/domains/added.jpg"
  },
  {
    id: "3",
    companyName: "مجموعة الألبان العربية",
    licenseNumber: "HALAL-2024-003",
    status: "Active",
    nextFollowUp: "2025-01-20",
    expiryDate: "2027-02-15",
    standards: ["GSO 2055-1:2015", "ISO 9001"],
    certificateUrl: "#",
    location: "عمان، الأردن",
    category: "ألبان وأجبان",
    image: "/domains/prod.webp"
  },
  {
    id: "4",
    companyName: "شركة زيوت النخيل العالمية",
    licenseNumber: "HALAL-2024-004",
    status: "Pending",
    nextFollowUp: "2024-06-10",
    expiryDate: "---",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "#",
    location: "القاهرة، مصر",
    category: "زيوت ودهون",
    image: "/domains/added.jpg"
  },
  {
    id: "5",
    companyName: "المطاحن الوطنية الكبرى",
    licenseNumber: "HALAL-2024-005",
    status: "Active",
    nextFollowUp: "2025-03-05",
    expiryDate: "2026-08-12",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "#",
    location: "الدوحة، قطر",
    category: "حبوب وبقوليات",
    image: "/domains/prod.webp"
  },
  {
    id: "6",
    companyName: "عصائر الطبيعة المحدودة",
    licenseNumber: "HALAL-2024-006",
    status: "Active",
    nextFollowUp: "2025-05-10",
    expiryDate: "2026-11-20",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "#",
    location: "جدة، السعودية",
    category: "مشروبات",
    image: "/domains/drinks.jpg"
  },
  {
    id: "7",
    companyName: "مزارع الوادي الأخضر",
    licenseNumber: "HALAL-2024-007",
    status: "Active",
    nextFollowUp: "2024-09-15",
    expiryDate: "2025-10-30",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "#",
    location: "المنامة، البحرين",
    category: "لحوم ومنتجاتها",
    image: "/domains/meat.jpg"
  },
  {
    id: "8",
    companyName: "شركة المخبوزات الذهبية",
    licenseNumber: "HALAL-2024-008",
    status: "Expired",
    nextFollowUp: "---",
    expiryDate: "2024-01-05",
    standards: ["GSO 2055-1:2015"],
    certificateUrl: "#",
    location: "الكويت، قطر",
    category: "مخبوزات",
    image: "/domains/added.jpg"
  }
];

const statusConfig = {
  Active: { label: "نشط", color: "text-emerald-700", bg: "bg-emerald-50", icon: CheckCircle2 },
  Expired: { label: "منتهي", color: "text-rose-700", bg: "bg-rose-50", icon: ShieldAlert },
  Pending: { label: "قيد المراجعة", color: "text-amber-700", bg: "bg-amber-50", icon: Info },
};

const CertificateVerification: React.FC = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("الكل");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Extract unique categories for filter tabs
  const categories = ["الكل", ...Array.from(new Set(MOCK_DATA.map(item => item.category)))];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) setQuery(q);
    
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [location.search]);

  // Filter data based on search query and category
  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(cert => {
      const matchesQuery = 
        cert.companyName.includes(query) || 
        cert.licenseNumber.toLowerCase().includes(query.toLowerCase()) ||
        cert.location.includes(query);
      const matchesCategory = activeCategory === "الكل" || cert.category === activeCategory;
      
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCert]);

  return (
    <div className="min-h-screen bg-white pt-24 font-arabic flex flex-col" dir="rtl">
      
      {/* 1. Header & Search Area (Airbnb Style) */}
      <div className="sticky top-20 z-40 bg-white border-b border-slate-100 shadow-sm pt-4 pb-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between">
          
          <div className="w-full md:w-auto">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">الدليل الرقمي</h1>
            <p className="text-sm text-slate-500">الشركات الحاصلة على شهادة الحلال العربية</p>
          </div>

          {/* Pill Search Bar */}
          <div className="w-full md:w-auto flex-1 max-w-2xl flex items-center bg-white border border-slate-200 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow px-2 py-2">
            <div className="flex-1 px-4 border-l border-slate-200">
              <label className="block text-[10px] font-bold text-slate-800 mb-0.5">البحث</label>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="اسم المنشأة، رقم الترخيص، أو الموقع..."
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 font-medium"
              />
            </div>
            
            <button className="w-12 h-12 bg-[#007A55] rounded-full flex items-center justify-center text-white hover:bg-[#006344] transition-colors ml-1 shrink-0">
              <Search size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Filter Button (Visual only) */}
          <div className="hidden md:flex w-full md:w-auto items-center justify-end">
            <button className="flex items-center gap-2 px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-slate-800 transition-colors">
              <SlidersHorizontal size={16} />
              فلاتر متقدمة
            </button>
          </div>

        </div>

        {/* Categories Scroller */}
        <div className="max-w-7xl mx-auto mt-6 flex items-center gap-8 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex flex-col items-center gap-2 whitespace-nowrap px-1 pb-2 border-b-2 transition-colors ${
                activeCategory === cat 
                  ? "border-slate-900 text-slate-900" 
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <span className={`text-sm ${activeCategory === cat ? 'font-bold' : 'font-medium'}`}>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Results Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-8 min-h-[50vh]">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">لم نجد نتائج مطابقة</h3>
            <p className="text-slate-500">حاول البحث بكلمات مختلفة أو تغيير التصنيف.</p>
            <button 
              onClick={() => { setQuery(""); setActiveCategory("الكل"); }}
              className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
            >
              إزالة التصفية
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            <AnimatePresence>
              {filteredData.map((cert) => {
                const StatusIcon = statusConfig[cert.status].icon;
                return (
                  <motion.div 
                    key={cert.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedCert(cert)}
                  >
                    {/* Image Area */}
                    <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-4">
                      <img 
                        src={cert.image} 
                        alt={cert.companyName} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm backdrop-blur-md bg-white/90 ${statusConfig[cert.status].color}`}>
                          <StatusIcon size={12} strokeWidth={3} />
                          {statusConfig[cert.status].label}
                        </div>
                      </div>

                      {/* Halal Watermark overlay on image */}
                      <div className="absolute bottom-3 left-3 opacity-40 bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                        <ShieldCheck size={18} className="text-white" />
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="space-y-1 px-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-slate-900 truncate">{cert.companyName}</h3>
                        <div className="flex items-center gap-1 shrink-0 text-slate-500 text-xs mt-0.5">
                           <Award size={12} />
                           <span className="font-medium">{cert.category}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <MapPin size={14} className="shrink-0" />
                        <span className="truncate">{cert.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                        <span className="font-medium">رقم الترخيص:</span>
                        <span className="font-bold text-slate-700 font-mono tracking-tight">{cert.licenseNumber}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 3. Detail Modal (Appears when a card is clicked) */}
      <AnimatePresence>
        {selectedCert && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 md:inset-x-auto md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[600px] bg-white md:rounded-3xl rounded-t-3xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header Image */}
              <div className="relative h-64 w-full bg-slate-100">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.companyName} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 hover:bg-white transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 ${statusConfig[selectedCert.status].bg} ${statusConfig[selectedCert.status].color}`}>
                  {React.createElement(statusConfig[selectedCert.status].icon, { size: 14 })}
                  {statusConfig[selectedCert.status].label}
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedCert.companyName}</h2>
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-8 pb-8 border-b border-slate-100">
                  <MapPin size={16} />
                  <span>{selectedCert.location}</span>
                  <span className="mx-2">•</span>
                  <Award size={16} />
                  <span>{selectedCert.category}</span>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 mb-1">رقم الترخيص</span>
                    <span className="text-base font-bold text-slate-900 font-mono">{selectedCert.licenseNumber}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 mb-1">المواصفات</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedCert.standards.map((std, i) => (
                        <span key={i} className="text-sm font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{std}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 mb-1">تاريخ الانتهاء</span>
                    <span className="text-base font-bold text-slate-900">{selectedCert.expiryDate}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 mb-1">المتابعة القادمة</span>
                    <span className="text-base font-bold text-slate-900">{selectedCert.nextFollowUp}</span>
                  </div>
                </div>

                {selectedCert.status === "Active" && (
                  <a 
                    href={selectedCert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#007A55] text-white rounded-xl font-bold text-sm hover:bg-[#006344] transition-colors"
                  >
                    <Download size={18} />
                    تحميل الشهادة
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. Contact CTA Section */}
      <section className="relative mt-10 py-24 bg-slate-950 text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/section-bg-1.jpeg" alt="Background" className="w-full h-full object-cover blur-[4px] opacity-10" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#007A55] border border-white/10">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">هل تحتاج إلى مساعدة في التحقق؟</h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            فريق الدعم الفني للبرنامج العربي للحلال متاح للرد على استفساراتكم المتعلقة بعمليات التحقق ومطابقة الشهادات.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:halal@aidsmo.org" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#007A55] text-white rounded-xl font-bold hover:bg-[#006344] transition-colors">
              <Mail size={18} />
              راسلنا الآن
            </a>
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-colors">
              <Phone size={18} />
              الدعم الفني
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .font-arabic { font-family: 'Readex Pro', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CertificateVerification;