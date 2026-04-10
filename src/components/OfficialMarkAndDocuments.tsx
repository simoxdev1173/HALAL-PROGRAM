"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Maximize2, X, FileText, ShieldCheck } from 'lucide-react';

interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  code: string;
}

const OfficialMarkAndDocuments: React.FC = () => {
  const [lightboxImage, setLightboxImage] = useState<DocumentItem | null>(null);

  // Official brand specs from ملحق 4
  const brandColors = [
    {
      name: "الأخضر الرسمي",
      hex: "#1F5D3A",
      cmyk: "C87 M43 Y91 K47",
    },
    {
      name: "الذهبي الرسمي",
      hex: "#EEB422",
      cmyk: "C8 M29 Y94 K1",
    },
  ];

  const documents: DocumentItem[] = [
    {
      id: "certificate",
      title: "شهادة الحلال العربية",
      subtitle: "الملحق (3)",
      description: "النموذج الرسمي للشهادة الممنوحة للمورّدين والمنشآت المستوفية لمتطلبات البرنامج العربي للحلال.",
      image: "/certificate-template.png",
      code: "ARHalal-03",
    },
    {
      id: "license",
      title: "ترخيص علامة الحلال العربية",
      subtitle: "الملحق (7)",
      description: "نموذج الترخيص الرسمي لاستخدام علامة الحلال العربية على المنتجات المعتمدة ضمن مجال تطبيق البرنامج.",
      image: "/license-template.png",
      code: "ARHalal-07",
    },
  ];

  // Close lightbox on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="relative py-24 px-6 md:px-12 bg-white border-t border-gray-100" dir="rtl">
      <div className="max-w-7xl mx-auto">

        {/* --- SECTION HEADER --- */}
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold text-emerald-700 tracking-[0.3em] uppercase mb-4 block"
          >
            الهوية الرسمية
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-6"
          >
            علامة الحلال العربية <br />
            <span className="font-bold text-emerald-900">والوثائق الرسمية</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl leading-relaxed"
          >
            تعرّف على <strong className="font-bold text-slate-900">علامة الحلال العربية الرسمية</strong> المملوكة للمنظمة، واطلع على النماذج المعتمدة للشهادة والترخيص الممنوحين ضمن البرنامج.
          </motion.p>
        </div>

        {/* --- 1. BRAND MARK EDITORIAL BLOCK --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 rounded-[2rem] overflow-hidden border border-slate-200 bg-gradient-to-bl from-slate-50 via-white to-emerald-50/30"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">

            {/* Right side: The Mark */}
            <div className="lg:col-span-2 relative p-12 md:p-16 flex items-center justify-center bg-white border-l border-slate-100 min-h-[400px]">
              {/* Decorative corner accent */}
              <div className="absolute top-6 right-6 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                الملحق (4)
              </div>

              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src="/halal-mark.svg"
                alt="علامة الحلال العربية الرسمية"
                className="max-w-[240px] md:max-w-[280px] w-full h-auto drop-shadow-xl"
              />

              {/* Official stamp indicator */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span className="font-medium">علامة رسمية مسجلة</span>
              </div>
            </div>

            {/* Left side: Brand Specs */}
            <div className="lg:col-span-3 p-12 md:p-16 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                المواصفات الرسمية للعلامة
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-10 max-w-xl">
                تلتزم جميع المؤسسات المرخّصة باستخدام علامة الحلال العربية وفق المواصفات اللونية والطباعية المعتمدة، حفاظاً على <strong className="font-bold text-slate-900">وحدة الهوية البصرية</strong> ومصداقية العلامة في الأسواق العربية والدولية.
              </p>

              {/* Color Swatches */}
              <div className="mb-10">
                <div className="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-4">
                  الألوان المعتمدة
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  {brandColors.map((color) => (
                    <div
                      key={color.hex}
                      className="group border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all"
                    >
                      <div
                        className="h-20 w-full"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="p-4 bg-white">
                        <div className="text-sm font-bold text-slate-900 mb-1">
                          {color.name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500" dir="ltr">
                          {color.hex}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 mt-0.5" dir="ltr">
                          {color.cmyk}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specs Row */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-2">
                    الخطوط
                  </div>
                  <div className="text-sm text-slate-800 font-medium" dir="ltr">
                    AXt Manal Bold
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5" dir="ltr">
                    Helvetica Neue LT 85
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-2">
                    الحد الأدنى للحجم
                  </div>
                  <div className="text-sm text-slate-800 font-medium">
                    25 مم <span className="text-slate-400 font-normal">(ملوّنة)</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    16 مم <span className="text-slate-400">(أحادية اللون)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* --- 2. DOCUMENT TEMPLATES SHOWCASE --- */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-700 tracking-[0.3em] uppercase mb-3 block">
                نماذج الوثائق
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                الشهادة والترخيص الرسميان
              </h3>
            </div>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">
              النماذج المعتمدة من المنظمة العربية للتنمية الصناعية والتقييس والتعدين — انقر على الوثيقة لعرضها بالحجم الكامل.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {documents.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:border-emerald-300 hover:shadow-[0_20px_40px_-15px_rgba(4,47,46,0.12)] transition-all duration-500"
              >
                {/* Document Preview */}
                <div
                  onClick={() => setLightboxImage(doc)}
                  className="relative aspect-[1/1.2] bg-gradient-to-b from-slate-50 to-white overflow-hidden cursor-pointer"
                >
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="w-full h-full object-contain p-6 group-hover:scale-[1.02] transition-transform duration-700"
                  />

                  {/* Hover overlay with expand icon */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl">
                      <Maximize2 size={20} className="text-emerald-800" />
                    </div>
                  </div>

                  {/* Document code badge */}
                  <div className="absolute top-4 left-4 bg-white border border-slate-200 rounded-full px-3 py-1 text-[10px] font-bold text-slate-600 font-mono shadow-sm" dir="ltr">
                    {doc.code}
                  </div>
                </div>

                {/* Document Info */}
                <div className="p-8 border-t border-slate-100">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <span className="text-[11px] font-bold text-emerald-600 tracking-widest uppercase mb-2 block">
                        {doc.subtitle}
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                        {doc.title}
                      </h4>
                    </div>
                    <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                      <FileText size={18} className="text-emerald-700" strokeWidth={1.75} />
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {doc.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-full font-bold text-xs hover:bg-emerald-800 transition-all group/btn"
                    >
                      <Download size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                      تحميل النموذج
                    </button>
                    <button
                      type="button"
                      onClick={() => setLightboxImage(doc)}
                      className="flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 text-slate-700 rounded-full font-bold text-xs hover:border-emerald-300 hover:text-emerald-800 hover:bg-emerald-50 transition-all"
                    >
                      <Maximize2 size={14} />
                      عرض
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="fixed top-6 left-6 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all"
              aria-label="إغلاق"
            >
              <X size={20} />
            </button>

            {/* Document title */}
            <div className="fixed top-6 right-6 z-50 text-white">
              <div className="text-[11px] font-bold text-emerald-400 tracking-widest uppercase mb-1">
                {lightboxImage.subtitle}
              </div>
              <div className="text-base font-bold">
                {lightboxImage.title}
              </div>
            </div>

            {/* Scrollable image container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full my-20"
            >
              <img
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="w-full h-auto rounded-2xl shadow-2xl bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OfficialMarkAndDocuments;