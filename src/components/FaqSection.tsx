"use client";
import  { useState } from 'react';
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
    <section className="py-24 px-6 md:px-12 bg-[#FCFCFC] border-t border-slate-100" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT COLUMN (Editorial Header) --- */}
          {/* In RTL, this appears on the right side. It acts as a sticky structural anchor. */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
           
            
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 leading-[1.2] tracking-tight mb-6">
              الأسئلة <span className="font-bold text-emerald-900">الشائعة</span>
            </h2>
            
            <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-sm font-light">
              إجابات رسمية وموثوقة حول آليات عمل البرنامج العربي للحلال، شروط الانضمام، والتفاصيل المالية والقانونية للشركات وهيئات التقييم.
            </p>

            <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-sm flex flex-col items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                <HelpCircle size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">لديك استفسارات أخرى؟</h4>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  فريقنا الفني متاح للرد على أي استفسارات تتعلق بعمليات التفتيش أو المصادقة.
                </p>
                <a href="mailto:halal@aidsmo.org" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-500 transition-colors uppercase tracking-widest">
                  راسلنا عبر البريد <ArrowLeft size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN (The Accordion List) --- */}
          <div className="lg:col-span-8">
            <div className="border-t border-slate-200">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <div key={index} className="border-b border-slate-200">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full py-8 flex items-center justify-between gap-6 text-right group transition-colors"
                    >
                      <h3 className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-emerald-900' : 'text-slate-800 group-hover:text-emerald-700'}`}>
                        {faq.question}
                      </h3>
                      <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-emerald-900 bg-emerald-900 text-white' : 'border-slate-200 text-slate-400 group-hover:border-emerald-600 group-hover:text-emerald-600'}`}>
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pr-4 border-r-2 border-emerald-100/50">
                            <p className="text-slate-600 text-sm md:text-base leading-loose font-light">
                              {/* NOTE: Citations are kept in the text to trace back to the official document */}
                              {faq.answer.split(/(\))/).map((part, i) => {
                                if (part === ')') {
                                  return (
                                    <span key={i} className="align-super text-slate-300 font-mono mx-1 select-none" dir="ltr">
                                      {part}
                                    </span>
                                  );
                                }
                                return <span key={i}>{part}</span>;
                              })}
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