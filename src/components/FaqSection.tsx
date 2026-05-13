"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ArrowLeft } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "ما هو البرنامج العربي الموحد للحلال وما هي أهدافه؟",
    answer: "البرنامج هو منظومة اعتراف متعدد الأطراف بشهادة وعلامة الحلال العربية. يهدف إلى حماية المستهلك المسلم في جميع دول العالم من الشهادات المزورة أو غير المهنية، وتسهيل التبادل التجاري بين الدول العربية، مع ضمان مطابقة المنتجات لأحكام الشريعة الإسلامية والمواصفات الدولية مثل (ISO/IEC 17000)."
  },
  {
    question: "من يحق له الانضمام للبرنامج كجهة تعيين؟",
    answer: "الجهات التي لها الحق في الانضمام هي جهات التعيين الحلال في الدول العربية الأعضاء (الجهات الحكومية) المخولة بتعيين جهات تقييم المطابقة في مجال الحلال، أو تعليق تعيينها، أو إلغائه."
  },
  {
    question: "كيف يمكن لجهات المنح الأجنبية (خارج المنطقة العربية) الحصول على الاعتماد؟",
    answer: "يمكن للهيئات المانحة خارج المنطقة العربية التواصل مع إحدى الجهات الوطنية المعينة والموقعة على وثيقة التعاون الفني مع المنظمة للحصول على الاعتماد، وذلك بعد استيفاء جميع الشروط المنصوص عليها في البرنامج. الحصول على حقوق منح الشهادة لا يخول الولوج للأسواق العربية ما لم يتم الاعتماد من جهة تعيين عربية عضو بالبرنامج."
  },
  {
    question: "ما هي المنتجات والخدمات المشمولة في تطبيق البرنامج؟",
    answer: "يُطبق البرنامج على المنتجات المشار إليها في المواصفة (GSO2055-2). وتشمل الأولويات: اللحوم ومنتجاتها، العصائر والمشروبات، الأدوية، مستحضرات التجميل، خدمات الحلال، المنتجات المحفوظة في درجة حرارة الغرفة، المكملات الغذائية، والسياحة الحلال."
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // Slightly increased padding from py-10 to py-16 lg:py-20 to give some room
    <section className="relative py-16 lg:py-20 px-6 md:px-12  overflow-hidden" dir="rtl">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/faq-bg-g.jpeg" 
          alt="Support Background" 
          className="w-full h-full object-cover object-center opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/80 to-slate-900/80"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Increased gap between columns slightly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <motion.h2 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-light text-white leading-tight tracking-tight mb-5"
            >
              الأسئلة <span className="font-bold text-[#007A55]">الشائعة</span>
            </motion.h2>
            
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-sm font-light">
              إجابات رسمية وموثوقة حول آليات عمل البرنامج العربي للحلال، شروط الانضمام، والتفاصيل المالية والقانونية.
            </p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              // Relaxed card padding and gap
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#CA8A04]/10 flex items-center justify-center text-[#CA8A04] shrink-0">
                <HelpCircle size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-2">لديك استفسارات أخرى؟</h4>
                <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                  فريقنا الفني متاح للرد على أي استفسارات تتعلق بعمليات التفتيش أو المصادقة.
                </p>
                <a href="mailto:halal@aidsmo.org" className="inline-flex items-center gap-2 text-xs font-bold text-[#CA8A04] hover:text-[#CA8A04]/80 transition-colors uppercase tracking-widest group cursor-pointer">
                  راسلنا عبر البريد 
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN (Accordion) --- */}
          <div className="lg:col-span-8">
            <div className="border-t border-white/10">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="border-b border-white/10 group">
                    <button
                      onClick={() => toggleFAQ(index)}
                      // Increased button padding slightly for better touch target and spacing
                      className="w-full py-5 md:py-6 flex items-center justify-between gap-6 text-right transition-colors focus:outline-none cursor-pointer"
                    >
                      <h3 className={`text-base md:text-lg font-bold transition-colors ${isOpen ? 'text-[#007A55]' : 'text-slate-200 group-hover:text-white'}`}>
                        {faq.question}
                      </h3>
                      <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-[#CA8A04] bg-[#CA8A04] text-slate-900' : 'border-white/20 text-white group-hover:border-[#CA8A04] group-hover:text-[#CA8A04]'}`}>
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          {/* Relaxed margin/padding for the open answer */}
                          <div className="pb-6 pr-5 border-r-2 border-[#CA8A04]/30 mb-2">
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
                              {faq.answer}
                            </p>
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
      </div>
    </section>
  );
};

export default FAQSection;