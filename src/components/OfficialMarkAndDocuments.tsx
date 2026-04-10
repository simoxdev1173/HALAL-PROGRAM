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

  // --- UPGRADE: Prevent Body Scroll & Add Escape Key Listener ---
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

  // --- UPGRADE: Copy Color Functionality ---
  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

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
    <section className="py-24 px-6 bg-gradient-to-b from-white to-slate-50 relative" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* --- SECTION TITLE --- */}
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
          <div className="lg:col-span-8 bg-[#F8F9FA] border border-slate-100 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden rounded-sm shadow-sm hover:shadow-md transition-shadow">
             {/* Architectural Grid Background */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(#1F5D3A 1px, transparent 0)', backgroundSize: '30px 30px' }} />
             
             <div className="relative z-10 shrink-0">
               <img src="/halal-mark.svg" alt="Halal Mark" className="w-40 md:w-56 h-auto drop-shadow-xl" />
             </div>

             <div className="relative z-10 flex-grow">
               <div className="flex items-center gap-2 mb-4 text-emerald-800 bg-emerald-50 w-fit px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                 <ShieldCheck size={14} /> علامة رسمية مسجلة
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">علامة الحلال العربية</h3>
               <p className="text-slate-500 text-sm leading-relaxed max-w-lg font-light">
                 تمثل هذه العلامة الضمان الرسمي للجودة والمطابقة للشريعة الإسلامية، وهي ملكية حصرية للمنظمة العربية للتنمية الصناعية والتقييس والتعدين.
               </p>
             </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 p-10 flex flex-col justify-between rounded-sm shadow-sm">
            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">المواصفات الفنية</h4>
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 mb-4">الألوان المعتمدة (انقر للنسخ)</p>
                  <div className="flex flex-col gap-4">
                    {brandColors.map(c => (
                      <button 
                        key={c.hex} 
                        onClick={() => handleCopyColor(c.hex)}
                        className="flex items-center gap-4 p-2 -ml-2 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer text-left w-full"
                      >
                        <div className="w-12 h-12 rounded-full shadow-inner border border-slate-200 shrink-0 flex items-center justify-center relative" style={{ backgroundColor: c.hex }}>
                           <div className={`absolute inset-0 bg-white/20 rounded-full transition-opacity flex items-center justify-center ${copiedHex === c.hex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                             {copiedHex === c.hex ? <CheckCircle2 size={18} className="text-white drop-shadow-md" /> : <Copy size={16} className="text-white drop-shadow-md" />}
                           </div>
                        </div>
                        <div dir="ltr" className="flex-grow">
                          <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">{c.hex}</p>
                          <p className="text-[10px] text-slate-400 leading-none mt-1">{c.cmyk}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-500 mb-2">الخطوط</p>
                  <p className="text-xs font-bold text-slate-800" dir="ltr">AXt Manal Bold / Helvetica</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ROW 2: BIG DOCUMENTS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {documents.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedDoc(doc)}
              className="group cursor-pointer bg-white border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-emerald-900/30 rounded-sm"
            >
              <div className="aspect-[4/3] bg-slate-50 relative flex items-center justify-center p-12 overflow-hidden border-b border-slate-100">
                <img 
                  src={doc.image} 
                  alt={doc.title} 
                  className="w-full h-full object-contain shadow-2xl group-hover:scale-[1.02] transition-transform duration-700 bg-white" 
                />
                <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/5 transition-colors duration-500" />
                
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-xl border border-slate-100">
                  <Search size={20} className="text-emerald-900" />
                </div>
              </div>

              <div className="p-10 flex flex-col flex-grow relative">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-white border border-slate-200 px-4 py-1.5 text-[10px] font-mono text-slate-600 shadow-sm rounded-sm" dir="ltr">
                  {doc.code}
                </div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest mb-3 block">{doc.subtitle}</span>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors leading-tight">{doc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light italic">
                  {doc.description}
                </p>
                <div className="mt-auto flex items-center gap-4 text-sm font-bold text-emerald-900 group-hover:gap-6 transition-all duration-300">
                  <span>فتح النموذج للتحقق</span>
                  <ArrowLeft size={16} />
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
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-[101] flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                   <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-[0.3em] block mb-1">{selectedDoc.subtitle}</span>
                   <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{selectedDoc.title}</h3>
                </motion.div>
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <X size={24} strokeWidth={2} />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-8 md:p-12 bg-[#F8F9FA]">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="bg-white p-4 shadow-xl border border-slate-200 mx-auto max-w-lg"
                >
                  <img src={selectedDoc.image} alt={selectedDoc.title} className="w-full h-auto border border-slate-100" />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                   <div>
                     <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                       <ShieldCheck size={14} /> الأهمية القانونية
                     </h5>
                     <p className="text-sm text-slate-600 leading-relaxed font-light">
                       هذا النموذج محمي بموجب قوانين الملكية الفكرية، ويُعتبر المرجع الوحيد المعتمد من قبل المنظمة لضمان جودة ومصداقية شهادات الحلال. لا يُسمح بتعديله أو استخدامه دون إذن رسمي.
                     </p>
                   </div>
                   <div className="space-y-3">
                     <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm flex justify-between items-center">
                        <p className="text-[10px] font-bold text-slate-400">الرقم المرجعي</p>
                        <p className="text-xs font-mono font-bold tracking-tighter text-slate-800 bg-slate-50 px-2 py-1">{selectedDoc.code}</p>
                     </div>
                     <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm flex justify-between items-center">
                        <p className="text-[10px] font-bold text-slate-400">صيغة الملف</p>
                        <p className="text-[10px] font-bold uppercase text-slate-800 bg-slate-50 px-2 py-1">Standard PDF / 300 DPI</p>
                     </div>
                   </div>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="p-6 border-t border-slate-200 bg-white"
              >
                <button className="w-full bg-slate-900 text-white py-5 rounded-sm font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-emerald-800 transition-all group shadow-lg hover:shadow-xl">
                  <Download size={18} className="group-hover:-translate-y-1 transition-transform" /> تحميل النموذج الرسمي المعتمد
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