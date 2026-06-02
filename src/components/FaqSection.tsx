"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "ما هو البرنامج العربي الموحد للحلال وما هي أهدافه؟",
    answer: "البرنامج هو منظومة اعتراف متعدد الأطراف بشهادة وعلامة الحلال العربية. يهدف إلى حماية المستهلك المسلم في جميع دول العالم من الشهادات المزورة أو غير المهنية، وتسهيل التبادل التجاري بين الدول العربية، مع ضمان مطابقة المنتجات لأحكام الشريعة الإسلامية والمواصفات الدولية."
  },
  {
    question: "من يحق له الانضمام للبرنامج كجهة تعيين؟",
    answer: "الجهات التي لها الحق في الانضمام هي جهات التعيين الحلال في الدول العربية الأعضاء (الجهات الحكومية) المخولة بتعيين جهات تقييم المطابقة في مجال الحلال، أو تعليق تعيينها، أو إلغائه."
  },
  {
    question: "كيف يمكن لجهات المنح الأجنبية (خارج المنطقة العربية) الحصول على الاعتماد؟",
    answer: "يمكن للهيئات المانحة خارج المنطقة العربية التواصل مع إحدى الجهات الوطنية المعينة والموقعة على وثيقة التعاون الفني للحصول على الاعتماد. الحصول على حقوق منح الشهادة لا يخول الولوج للأسواق العربية ما لم يتم الاعتماد من جهة تعيين عربية عضو بالبرنامج."
  },
  {
    question: "ما هي المنتجات والخدمات المشمولة في تطبيق البرنامج؟",
    answer: "يُطبق البرنامج على المنتجات المشار إليها في المواصفة (GSO2055-2). وتشمل الأولويات: اللحوم، العصائر، الأدوية، مستحضرات التجميل، المكملات الغذائية، والسياحة الحلال."
  },
  {
    question: "ما هي التكاليف المالية المرتبطة بالشهادة وعلامة الحلال؟",
    answer: "تبلغ تكاليف التفويض لتشغيل البرنامج في مجال معين (250) دولار أمريكي لكل مجال لمدة ثلاث سنوات. أما تكاليف حق استخدام علامة الحلال العربية فتبلغ (100) دولار أمريكي عن كل سنة لكل ترخيص صادر، تُدفع من قبل المورد."
  },
  {
    question: "كيف يمكن التحقق من مصداقية شهادة الحلال لمنتج معين؟",
    answer: "يوفر البرنامج محرك بحث يتيح التحقق من حالة الاعتماد. يمكن إجراء البحث بإدخال رقم الترخيص الكامل الموجود على ملصق المنتج بجانب شعار العلامة، أو بكتابة أربعة أحرف على الأقل من اسم الشركة."
  }
];

const FAQSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const translatedFaqs = t("faq.items", { returnObjects: true }) as FAQItem[];
  const displayFaqs = translatedFaqs.length ? translatedFaqs : faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 lg:py-24 px-6 md:px-12 overflow-hidden border-y border-stone-800" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Image & Overlay from previous version */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/faq-bg-g.jpeg" 
          alt="Support Background" 
          className="w-full h-full object-cover object-center opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950"></div>
      </div>

      {/* Industrial noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            
            <div className="inline-flex items-center gap-3 mb-6">
               <div className="w-8 h-1 bg-white/10 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
               <span className="px-3 py-1 text-[9px] lg:text-[10px] font-mono font-bold uppercase tracking-widest text-[#CA8A04] rounded bg-white/5 backdrop-blur-md shadow-[var(--shadow-ind-sharp)] border border-white/10">{t("faq.eyebrow")}</span>
            </div>

            <motion.h2 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            >
              {t("faq.titleBefore")} <span className="text-[#007A55]">{t("faq.titleHighlight")}</span>
            </motion.h2>
            
            <p className="text-stone-300 text-sm lg:text-base leading-relaxed mb-8 max-w-sm font-medium">
              {t("faq.desc")}
            </p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-5 lg:p-6 rounded-2xl flex flex-col items-start gap-4 relative cursor-default shadow-xl"
            >
              <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-lg bg-white/10 border border-white/10 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)] flex items-center justify-center text-[#CA8A04] shrink-0">
                <HelpCircle size={20} className="lg:w-6 lg:h-6" strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-sm lg:text-base font-black text-white mb-2">{t("faq.contactTitle")}</h4>
                <p className="text-xs lg:text-sm text-stone-300 mb-6 leading-relaxed font-medium">
                  {t("faq.contactDesc")}
                </p>
                <a href="mailto:halal@aidsmo.org" className="btn-gold w-fit text-[10px] lg:text-xs group uppercase tracking-widest px-5 py-2.5 lg:px-6 lg:py-3 border border-[#CA8A04] bg-transparent text-[#CA8A04] hover:bg-[#CA8A04] hover:text-white transition-all">
                  {t("faq.contactCta")} 
                  <ArrowLeft size={14} className={`lg:w-4 lg:h-4 transition-transform ${isRtl ? "group-hover:-translate-x-1" : "rotate-180 group-hover:translate-x-1"}`} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="lg:col-span-8 flex flex-col gap-3 lg:gap-4">
              {displayFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className={`bg-white/5 backdrop-blur-sm border transition-all duration-300 rounded-xl overflow-hidden group ${isOpen ? 'border-[#007A55]/50 bg-white/10' : 'border-white/10 hover:border-white/20'}`}>
                    
                    <button
                      onClick={() => toggleFAQ(index)}
                      className={`w-full p-4 lg:p-6 flex items-center justify-between gap-4 lg:gap-6 cursor-pointer ${isRtl ? "text-right" : "text-left"}`}
                    >
                      <h3 className={`text-sm md:text-base lg:text-lg font-black transition-colors ${isOpen ? 'text-[#007A55]' : 'text-slate-200 group-hover:text-white'}`}>
                        {faq.question}
                      </h3>
                      <div className={`shrink-0 w-7 lg:w-8 h-7 lg:h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-[#CA8A04] bg-[#CA8A04] text-slate-900 shadow-[0_0_10px_rgba(202,138,4,0.5)]' : 'border-white/20 text-white group-hover:border-[#CA8A04] group-hover:text-[#CA8A04]'}`}>
                        {isOpen ? <Minus size={14} className="lg:w-4 lg:h-4" strokeWidth={3} /> : <Plus size={14} className="lg:w-4 lg:h-4" strokeWidth={3} />}
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-4 lg:px-6 pb-4 lg:pb-6 pt-0">
                            <div className="p-3 lg:p-4 bg-black/20 rounded-lg border-r-4 border-[#CA8A04]/50 shadow-inner">
                              <p className="text-stone-300 text-xs lg:text-sm md:text-base leading-relaxed font-medium">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
