"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, ShieldCheck, ArrowLeft, Search, Copy, CheckCircle2 } from 'lucide-react';

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
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedDoc(null);
    };

    if (selectedDoc) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [selectedDoc]);

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const brandColors = [
    { name: "الأخضر الرسمي", hex: "#1C4C2A", cmyk: "C87 M43 Y91 K47" },
    { name: "الذهبي الرسمي", hex: "#CA8A04", cmyk: "C8 M29 Y94 K1" },
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
    <section className="py-16 lg:py-24 px-6 bg-gradient-to-b from-white to-slate-50 relative min-h-screen flex flex-col justify-center border-y border-stone-200" dir="rtl">
      
      {/* Industrial noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* --- SECTION TITLE --- */}
        <div className="mb-12 lg:mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
               <div className="w-12 h-1 bg-stone-200 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]"></div>
               <span className="px-4 py-1.5 text-[10px] lg:text-xs font-mono font-bold uppercase tracking-widest text-[#007A55] rounded bg-white shadow-[var(--shadow-ind-sharp)] border border-stone-200">الوثائق الرسمية</span>
               <div className="w-12 h-1 bg-stone-200 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]"></div>
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
          >
            الهوية البصرية <span className="text-[#007A55]">والنماذج الرسمية</span>
          </motion.h2>
        </div>

        {/* --- ROW 1: BRAND IDENTITY BLOCK --- */}
        <div className="mb-8 lg:mb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-8 bg-[#F8F9FA] border border-stone-100 p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 lg:gap-8 relative cursor-default rounded-sm shadow-sm hover:shadow-md transition-shadow">
             
             {/* Hardware Details */}
             <div className="absolute top-4 left-4 w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-gradient-to-br from-stone-200 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]"></div>
             <div className="absolute top-4 right-4 w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-gradient-to-br from-stone-200 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]"></div>
             <div className="absolute bottom-4 left-4 w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-gradient-to-br from-stone-200 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]"></div>
             <div className="absolute bottom-4 right-4 w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-gradient-to-br from-stone-200 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]"></div>

             {/* ISO-Style Background from previous version */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(#1F5D3A 1px, transparent 0)', backgroundSize: '30px 30px' }} />
             
             <div className="relative z-10 shrink-0 bg-white p-5 lg:p-6 rounded shadow-lg">
               <img src="/halal-mark.svg" alt="Halal Mark" className="w-28 lg:w-32 xl:w-44 h-auto drop-shadow-xl" />
             </div>

             <div className="relative z-10 flex-grow text-center md:text-right flex flex-col md:block items-center">
               <div className="flex items-center gap-2 mb-3 lg:mb-4 bg-emerald-50 border border-emerald-100 text-[#007A55] w-fit px-3 py-1 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest rounded-full">
                 <ShieldCheck size={12} /> علامة رسمية مسجلة
               </div>
               <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-3 lg:mb-4">علامة الحلال العربية</h3>
               <p className="text-sm lg:text-base text-slate-500 font-medium leading-relaxed max-w-lg">
                 تمثل هذه العلامة الضمان الرسمي للجودة والمطابقة للشريعة الإسلامية، وهي ملكية حصرية للمنظمة العربية للتنمية الصناعية والتقييس والتعدين.
               </p>
             </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-stone-200 p-6 lg:p-8 flex flex-col justify-between relative cursor-default rounded-sm shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4 lg:mb-6 border-b border-stone-100 pb-4">
                 <h4 className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">المواصفات الفنية</h4>
                 <div className="w-2 h-2 rounded-full bg-[#007A55] shadow-[0_0_5px_rgba(0,122,85,0.8)]"></div>
              </div>
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <p className="text-[9px] lg:text-[10px] font-bold text-stone-500 mb-2 lg:mb-3">الألوان المعتمدة (انقر للنسخ)</p>
                  <div className="flex flex-col gap-2 lg:gap-3">
                    {brandColors.map(c => (
                      <button 
                        key={c.hex} 
                        onClick={() => handleCopyColor(c.hex)}
                        className="flex items-center gap-3 lg:gap-4 p-1.5 lg:p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-stone-100 transition-all group cursor-pointer text-left w-full"
                      >
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full shadow-inner border border-stone-200 shrink-0 flex items-center justify-center relative" style={{ backgroundColor: c.hex }}>
                           <div className={`absolute inset-0 bg-white/20 rounded-full transition-opacity flex items-center justify-center ${copiedHex === c.hex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                             {copiedHex === c.hex ? <CheckCircle2 size={14} className="text-white drop-shadow-md" /> : <Copy size={12} className="text-white drop-shadow-md" />}
                           </div>
                        </div>
                        <div dir="ltr" className="flex-grow flex flex-col justify-center">
                          <p className="text-[10px] lg:text-[11px] font-bold text-slate-900 uppercase tracking-wider leading-none mb-1">{c.hex}</p>
                          <p className="text-[8px] lg:text-[9px] text-slate-400 leading-none">{c.cmyk}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-3 lg:pt-4 border-t border-stone-100">
                  <p className="text-[9px] lg:text-[10px] font-bold text-stone-500 mb-1.5">الخطوط المعتمدة</p>
                  <p className="text-[11px] lg:text-xs font-bold text-slate-800" dir="ltr">AXt Manal Bold / Helvetica</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ROW 2: BIG DOCUMENTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {documents.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedDoc(doc)}
              className="group cursor-pointer bg-white border border-stone-200 overflow-hidden flex flex-row items-stretch transition-all duration-300 h-36 lg:h-44 relative rounded-sm hover:shadow-xl hover:border-[#007A55]/30"
            >
              {/* Left Side: Image Preview */}
              <div className="w-1/3 md:w-2/5 p-3 lg:p-4 shrink-0 flex items-center justify-center relative z-10 border-l border-stone-100 bg-slate-50">
                <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-2">
                    <img 
                      src={doc.image} 
                      alt={doc.title} 
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 bg-white shadow-md" 
                    />
                    <div className="absolute inset-0 bg-[#007A55]/0 group-hover:bg-[#007A55]/5 transition-colors duration-500" />
                    
                    <div className="absolute bottom-2 left-2 w-6 h-6 lg:w-8 lg:h-8 bg-white border border-stone-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-md">
                      <Search size={12} lg:size={14} className="text-[#007A55]" />
                    </div>
                </div>
              </div>

              {/* Right Side: Content Area */}
              <div className="p-4 lg:p-6 flex flex-col flex-grow justify-center relative z-10 bg-white">
                
                <span className="text-[8px] lg:text-[10px] font-bold text-[#007A55] uppercase tracking-widest mb-1 lg:mb-2 block">
                  {doc.subtitle}
                </span>
                
                <h3 className="text-base lg:text-lg font-bold text-slate-900 mb-1 lg:mb-2 leading-tight group-hover:text-[#007A55] transition-colors">{doc.title}</h3>
                
                <p className="text-slate-500 text-[10px] lg:text-xs leading-relaxed mb-3 lg:mb-4 font-light italic line-clamp-2">
                  {doc.description}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-[10px] lg:text-xs font-bold text-[#007A55] group-hover:gap-3 transition-all duration-300">
                  <span>فتح للتحقق</span>
                  <ArrowLeft size={12} lg:size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- SIDE PANEL PREVIEW (The Drawer) --- */}
      <AnimatePresence>
        {selectedDoc && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoc(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100]" 
            />
            <motion.div
              initial={{ x: '100%', boxShadow: '-20px 0 50px rgba(0,0,0,0)' }} 
              animate={{ x: 0, boxShadow: '-20px 0 50px rgba(0,0,0,0.15)' }} 
              exit={{ x: '100%', boxShadow: '-20px 0 50px rgba(0,0,0,0)' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md xl:max-w-lg bg-white z-[101] flex flex-col"
            >
              <div className="p-5 lg:p-6 border-b border-stone-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                   <span className="text-[8px] lg:text-[9px] font-bold text-emerald-700 uppercase tracking-[0.2em] block mb-1">{selectedDoc.subtitle}</span>
                   <h3 className="text-base lg:text-lg font-bold text-slate-900 tracking-tight">{selectedDoc.title}</h3>
                </motion.div>
                
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X size={18} lg:size={20} strokeWidth={2} />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-5 lg:p-6 bg-[#F8F9FA]">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="bg-white p-3 shadow-lg border border-slate-200 mx-auto max-w-sm"
                >
                  <img src={selectedDoc.image} alt={selectedDoc.title} className="w-full h-auto border border-slate-100" />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="mt-6 lg:mt-8 flex flex-col gap-4 lg:gap-6"
                >
                   <div>
                     <h5 className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <ShieldCheck size={12} lg:size={14} /> الأهمية القانونية
                     </h5>
                     <p className="text-[11px] lg:text-xs text-slate-600 leading-relaxed font-light">
                       هذا النموذج محمي بموجب قوانين الملكية الفكرية، ويُعتبر المرجع الوحيد المعتمد من قبل المنظمة لضمان جودة ومصداقية شهادات الحلال. لا يُسمح بتعديله أو استخدامه دون إذن رسمي.
                     </p>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-3">
                     <div className="p-3 bg-white border border-slate-200 rounded-sm shadow-sm flex flex-col justify-center">
                        <p className="text-[8px] lg:text-[9px] font-bold text-slate-400 mb-1">الرقم المرجعي</p>
                        <p className="text-[9px] lg:text-[10px] font-mono font-bold tracking-tighter text-slate-800">{selectedDoc.code}</p>
                     </div>
                     <div className="p-3 bg-white border border-slate-200 rounded-sm shadow-sm flex flex-col justify-center">
                        <p className="text-[8px] lg:text-[9px] font-bold text-slate-400 mb-1">صيغة الملف</p>
                        <p className="text-[9px] lg:text-[10px] font-bold uppercase text-slate-800">Standard PDF / 300 DPI</p>
                     </div>
                   </div>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="p-4 border-t border-slate-200 bg-white"
              >
                <button className="btn-primary w-full group h-[54px] text-sm">
                  تحميل النموذج المعتمد
                  <div className="w-6 h-6 rounded bg-black/10 flex items-center justify-center shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] ml-auto">
                    <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" /> 
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OfficialMarkAndDocuments;