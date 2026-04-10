"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Maximize2, X, ShieldCheck, ArrowUpRight, Palette } from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  code: string;
}

const OfficialMarkAndDocuments: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(null);

  const brandColors = [
    { name: "الأخضر الرسمي", hex: "#1F5D3A", cmyk: "C87 M43 Y91 K47" },
    { name: "الذهبي الرسمي", hex: "#EEB422", cmyk: "C8 M29 Y94 K1" },
  ];

  const documents: DocumentItem[] = [
    {
      id: "certificate",
      title: "شهادة الحلال العربية",
      subtitle: "الملحق (3)",
      description: "النموذج الرسمي للمورّدين والمنشآت المستوفية للمتطلبات.",
      image: "/certificate-template.png",
      code: "ARHalal-03",
    },
    {
      id: "license",
      title: "ترخيص علامة الحلال",
      subtitle: "الملحق (7)",
      description: "نموذج الترخيص الرسمي لاستخدام العلامة على المنتجات.",
      image: "/license-template.png",
      code: "ARHalal-07",
    },
  ];

  return (
    <section className="relative py-20 px-6 bg-[#FCFCFC] overflow-hidden" dir="rtl">
      {/* Background Decorative Element - Subtle UAE pattern feel */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50/20 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        
        {/* --- COMPACT EDITORIAL HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-slate-200 pb-8">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-[1px] bg-emerald-700"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-800">الهوية الرسمية</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extralight text-slate-900 leading-[1.1]">
              علامة الحلال <span className="font-serif italic text-emerald-900">والتوثيق</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-xs mt-6 md:mt-0 leading-relaxed font-light italic">
            المعايير البصرية والنماذج المعتمدة للمنظمة العربية للتنمية الصناعية والتقييس والتعدين.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT: BRAND SPECIFICATIONS (3 Cols) --- */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-white border border-slate-100 rounded-sm shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-1 h-full bg-emerald-800 transition-all group-hover:w-2" />
              
              <div className="flex justify-between items-start mb-10">
                <div className="bg-slate-50 p-4 rounded-full">
                  <img src="/halal-mark.svg" alt="Logo" className="w-16 h-16 object-contain" />
                </div>
                <div className="text-left" dir="ltr">
                  <span className="block text-[10px] font-bold text-slate-400 tracking-tighter">REF. ANNEX</span>
                  <span className="block text-xs font-bold text-emerald-800">NO. 04</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
                    <Palette size={12} /> لوحة الألوان
                  </h4>
                  <div className="flex gap-3">
                    {brandColors.map((color) => (
                      <div key={color.hex} className="flex-1 group/color">
                        <div className="h-12 w-full rounded-sm mb-2 shadow-inner" style={{ backgroundColor: color.hex }} />
                        <span className="block text-[10px] font-mono text-slate-500" dir="ltr">{color.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                  <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">الخطوط الرسمية</h4>
                  <p className="text-sm font-medium text-slate-800" dir="ltr">AXt Manal Bold / Helvetica</p>
                </div>
                
                <div className="flex items-center gap-2 text-[10px] text-emerald-700 bg-emerald-50/50 p-3 rounded-sm border border-emerald-100/50">
                  <ShieldCheck size={14} />
                  <span className="font-bold tracking-tight">علامة تجارية مسجلة قانونياً</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: DOCUMENTS GRID (8 Cols) --- */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <motion.div
                key={doc.id}
                whileHover={{ y: -5 }}
                className="group bg-white border border-slate-200 rounded-sm overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden p-8 flex items-center justify-center">
                  <img 
                    src={doc.image} 
                    alt={doc.title} 
                    className="w-full h-full object-contain shadow-2xl group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      onClick={() => setActiveDoc(doc)}
                      className="bg-white p-4 rounded-full text-emerald-900 transform translate-y-4 group-hover:translate-y-0 transition-all"
                    >
                      <Maximize2 size={20} />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4 font-mono text-[9px] text-slate-400 bg-white/80 px-2 py-1" dir="ltr">
                    {doc.code}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold text-emerald-700 mb-2">{doc.subtitle}</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-grow">
                    {doc.description}
                  </p>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2">
                      <Download size={12} /> تحميل PDF
                    </button>
                    <button 
                      onClick={() => setActiveDoc(doc)}
                      className="w-12 flex items-center justify-center border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <ArrowUpRight size={16} className="text-slate-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- LIGHTBOX (Enhanced) --- */}
      <AnimatePresence>
        {activeDoc && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setActiveDoc(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X size={32} strokeWidth={1} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="max-w-3xl w-full bg-white p-2 rounded-sm shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{activeDoc.title}</span>
                 <span className="text-[10px] font-mono text-slate-400">{activeDoc.code}</span>
              </div>
              <img src={activeDoc.image} alt="Preview" className="w-full h-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OfficialMarkAndDocuments;