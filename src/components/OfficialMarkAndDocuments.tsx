"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, ShieldCheck, FileText, ArrowLeft, Palette, Search } from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  code: string;
}

const OfficialMarkAndDocuments: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const brandColors = [
    { name: "الأخضر الرسمي", hex: "#1F5D3A", cmyk: "C87 M43 Y91 K47" },
    { name: "الذهبي الرسمي", hex: "#EEB422", cmyk: "C8 M29 Y94 K1" },
  ];

  const documents: DocumentItem[] = [
    {
      id: "certificate",
      title: "شهادة الحلال العربية الموحدة",
      subtitle: "نموذج الملحق رقم (3)",
      description: "الوثيقة الرسمية التي تُمنح للمنشآت والمجازر التي اجتازت كافة مراحل التفتيش والتدقيق الفني.",
      image: "/certificate-template.png",
      code: "AR-HALAL-CERT-03",
    },
    {
      id: "license",
      title: "ترخيص استخدام علامة الحلال",
      subtitle: "نموذج الملحق رقم (7)",
      description: "عقد الترخيص القانوني الذي يحدد ضوابط وضع العلامة على المنتجات والعبوات التجارية.",
      image: "/licence-template.png",
      code: "AR-HALAL-LIC-07",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* --- SECTION TITLE (Matching your site's style) --- */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl text-center font-light text-slate-900 tracking-tight leading-tight mb-6"
          >
            الهوية البصرية <span className="font-bold text-emerald-900">والنماذج الرسمية</span>
          </motion.h2>
        </div>

        {/* --- ROW 1: BRAND IDENTITY BLOCK --- */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 bg-[#F8F9FA] border border-slate-100 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
             {/* Architectural Grid Background */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(#1F5D3A 1px, transparent 0)', backgroundSize: '30px 30px' }} />
             
             <div className="relative z-10 shrink-0">
               <img src="/halal-mark.svg" alt="Halal Mark" className="w-40 md:w-56 h-auto drop-shadow-xl" />
             </div>

             <div className="relative z-10 flex-grow">
               <div className="flex items-center gap-2 mb-4 text-emerald-800 bg-emerald-50 w-fit px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                 <ShieldCheck size={14} /> علامة رسمية مسجلة
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">علامة الحلال العربية</h3>
               <p className="text-slate-500 text-sm leading-relaxed max-w-lg font-light">
                 تمثل هذه العلامة الضمان الرسمي للجودة والمطابقة للشريعة الإسلامية، وهي ملكية حصرية للمنظمة العربية للتنمية الصناعية والتقييس والتعدين.
               </p>
             </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 p-10 flex flex-col justify-between">
            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">المواصفات الفنية</h4>
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 mb-4">الألوان المعتمدة</p>
                  <div className="flex gap-4">
                    {brandColors.map(c => (
                      <div key={c.hex} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full shadow-inner border border-slate-100" style={{ backgroundColor: c.hex }} />
                        <div dir="ltr" className="text-left">
                          <p className="text-[9px] font-bold text-slate-900 uppercase">{c.hex}</p>
                          <p className="text-[8px] text-slate-400 leading-none">{c.cmyk}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 mb-2">الخطوط</p>
                  <p className="text-xs font-bold text-slate-800" dir="ltr">AXt Manal Bold / Helvetica</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ROW 2: BIG DOCUMENTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedDoc(doc)}
              className="group cursor-pointer bg-white border border-slate-200 overflow-hidden flex flex-col transition-all hover:shadow-2xl hover:border-emerald-900/30"
            >
              <div className="aspect-[4/3] bg-slate-50 relative flex items-center justify-center p-12 overflow-hidden border-b border-slate-100">
                <img 
                  src={doc.image} 
                  alt={doc.title} 
                  className="w-full h-full object-contain shadow-2xl group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/5 transition-colors duration-500" />
                
                {/* Search / Preview Indicator */}
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-lg">
                  <Search size={20} className="text-emerald-900" />
                </div>
              </div>

              <div className="p-10 flex flex-col flex-grow relative">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-white border border-slate-200 px-4 py-1 text-[10px] font-mono text-slate-500 shadow-sm" dir="ltr">
                  {doc.code}
                </div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest mb-3">{doc.subtitle}</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-900 transition-colors">{doc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light italic">
                  {doc.description}
                </p>
                <div className="mt-auto flex items-center gap-4 text-sm font-bold text-emerald-900 group-hover:gap-6 transition-all">
                  <span>فتح النموذج للتحقق</span>
                  <ArrowLeft size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- SIDE PANEL PREVIEW (The PDF Drawer) --- */}
      <AnimatePresence>
        {selectedDoc && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedDoc(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100]" 
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div>
                   <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-[0.3em] block mb-1">{selectedDoc.subtitle}</span>
                   <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{selectedDoc.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors"
                >
                  <X size={28} strokeWidth={1.5} />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-8 md:p-12 bg-slate-50">
                <div className="bg-white p-6 shadow-2xl border border-slate-200">
                  <img src={selectedDoc.image} alt={selectedDoc.title} className="w-full h-auto" />
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                     <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">الأهمية القانونية</h5>
                     <p className="text-sm text-slate-600 leading-relaxed font-light">
                       هذا النموذج محمي بموجب قوانين الملكية الفكرية، ويُعتبر المرجع الوحيد المعتمد من قبل المنظمة لضمان جودة ومصداقية شهادات الحلال.
                     </p>
                   </div>
                   <div className="space-y-4">
                     <div className="p-4 bg-white border border-slate-100">
                        <p className="text-[10px] text-slate-400 mb-1">الرقم المرجعي</p>
                        <p className="text-xs font-mono font-bold tracking-tighter">{selectedDoc.code}</p>
                     </div>
                     <div className="p-4 bg-white border border-slate-100">
                        <p className="text-[10px] text-slate-400 mb-1">صيغة الملف</p>
                        <p className="text-xs font-bold uppercase">Standard PDF / 300 DPI</p>
                     </div>
                   </div>
                </div>
              </div>
              
              <div className="p-8 border-t border-slate-100 bg-white">
                <button className="w-full bg-slate-900 text-white py-5 font-bold text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-emerald-900 transition-all">
                  <Download size={18} /> تحميل النموذج الرسمي (PDF)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OfficialMarkAndDocuments;