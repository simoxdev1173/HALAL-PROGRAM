import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail,  UploadCloud, 
  CheckCircle2, ShieldCheck,  Info,
  ChevronRight, ChevronLeft, User,  Award, FileSignature,
  Building2, Globe, MapPin, ClipboardCheck
} from "lucide-react";

const STEPS = [
  { id: 1, title: "معلومات عامة", icon: Building2 },
  { id: 2, title: "الإدارة والاتصال", icon: User },
  { id: 3, title: "المرفقات الرسمية", icon: UploadCloud },
  { id: 4, title: "شهادات الحلال", icon: Award },
  { id: 5, title: "شهادات أخرى", icon: ClipboardCheck },
  { id: 6, title: "التوقيع والاعتماد", icon: FileSignature },
];

const JoinProgram = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    arabicName: "",
    englishName: "",
    arabicAddress: "",
    englishAddress: "",
    country: "",
    phone: "",
    fax: "",
    website: "",
    email: "",
    managerName: "",
    managerEmail: "",
    managerPhone: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    accreditationCopies: false,
    assignmentCopy: false,
    otherDocs: false,
    otherDocsDetails: "",
    issuesNationalHalal: "",
    referenceStandard: "",
    coveredProducts: "",
    otherEntitiesIssue: "",
    otherEntitiesNames: "",
    issuesOtherCerts: "",
    whatAreThey: "",
    otherReferenceStandard: "",
    otherCoveredProducts: "",
    managerNameSign: "",
    dateSign: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2500);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 20 : -20,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    })
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-arabic" dir="rtl">
      
      {/* --- HERO SECTION (REVERTED) --- */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden pt-20 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img 
            src="/about-us-bg.png" 
            alt="الانضمام للبرنامج" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-[#FAF9F6]"></div>
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#CA8A04] opacity-[0.05] blur-[150px] rounded-full pointer-events-none"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >  
            <h1 className="text-4xl md:text-7xl font-light text-[#FFFFFF] leading-tight mb-6 whitespace-nowrap">
              الانضمام{" "}
              <strong className="font-bold text-[#FFFFFF]">للبرنامج</strong>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* --- INTRODUCTION SECTION (REVERTED) --- */}
      <section className="relative py-20 lg:py-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <div className="flex">
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-[1.2] tracking-tight">
                  من له الحق   


                 
                </h2>
                 <span className="text-[#007A55] pr-2 text-3xl md:text-5xl font-bold leading-[1.2] tracking-tight">في الانضمام؟</span>
                </div>
                
                <p className="text-lg text-slate-500 font-light leading-relaxed max-w-xl">
                  الجهات التي لها الحق في الانضمام إلى البرنامج هي جهات التعيين الحلال في الدول العربية الأعضاء الراغبة في تطبيق هذا البرنامج وتفويضها لمنح علامة الحلال العربية.
                </p>
              </div>
              <div className="space-y-6 text-base text-slate-600 font-light leading-relaxed">
                <div className="relative p-8 bg-[#FAF9F6] rounded-[2.5rem] overflow-hidden group">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#CA8A04]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <p className="relative z-10 text-slate-900 font-medium text-lg">
                    <strong className="text-[#007A55]">جهات التعيين:</strong> هي جهات حكومية مخوَّلة بتعيين جهات تقييم المطابقة في مجال الحلال أو تعليق تعيينها أو إلغائه.
                  </p>
                </div>
                <div className="flex items-start gap-4 mt-6 p-4 rounded-xl border-r-4 border-[#CA8A04] bg-orange-50/50">
                  <Info className="text-[#CA8A04] shrink-0 mt-1" size={20} />
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    ملاحظة: يمكن لجهة التعيين الحلال تفويض جهات تقييم مطابقة غير حكومية وفقاً لهذا البرنامج، على أن تقوم بإبلاغ المنظمة تحريرياً بذلك مع مراعاة دفع التكاليف المقررة.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:w-1/2 relative"
            >
              <div className="relative h-[450px] md:h-[500px] w-full rounded-[3rem] overflow-hidden shadow-xl">
                <img 
                  src="/section-1-bg.jpeg" 
                  alt="Commitment to Quality" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004D36]/90 via-[#004D36]/20 to-transparent"></div>
                <div className="absolute bottom-8 right-8 left-8">
                   <p className="text-white text-xl font-light leading-relaxed italic">
                    "نظام موحد يعزز الثقة ويضمن تطبيق أعلى معايير الجودة والشفافية."
                   </p>
                </div>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-48 bg-[#007A55]/10 rounded-full blur-[70px]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FORM SECTION (NEW DESIGN) --- */}
      <section className="relative py-24 bg-[#FAF9F6] border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Sidebar Navigation */}
            <div className="lg:w-[320px] lg:sticky lg:top-32 space-y-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200/60">
                 <h3 className="text-lg font-bold text-slate-900 mb-8 border-b border-slate-50 pb-4">مراحل التقديم</h3>
                 <div className="space-y-4">
                    {STEPS.map((step) => {
                      const isActive = step.id === currentStep;
                      const isPassed = step.id < currentStep;
                      return (
                        <div key={step.id} className="flex items-center gap-4 transition-all duration-300">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all border ${
                            isActive ? 'bg-[#007A55] text-white border-[#007A55] shadow-lg shadow-[#007A55]/20 scale-105' : 
                            isPassed ? 'bg-emerald-50 text-[#007A55] border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                          }`}>
                            {isPassed ? <CheckCircle2 size={18} /> : step.id}
                          </div>
                          <span className={`text-sm font-bold transition-colors ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{step.title}</span>
                        </div>
                      );
                    })}
                 </div>
                 
                 {!isSuccess && (
                   <div className="mt-10 pt-6 border-t border-slate-50">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                          className="h-full bg-[#007A55]"
                        />
                      </div>
                      <p className="text-[11px] font-black text-slate-400 uppercase mt-3 tracking-widest text-center">إنجاز الطلب {Math.round((currentStep / STEPS.length) * 100)}%</p>
                   </div>
                 )}
              </div>
              
              <div className="bg-[#0F172A] rounded-[2rem] p-8 text-white relative overflow-hidden">
                <ShieldCheck className="text-[#CA8A04] mb-4" size={24} />
                <h4 className="text-md font-bold mb-2">سرية المعلومات</h4>
                <p className="text-white/40 text-xs leading-relaxed font-light">تخضع جميع الوثائق المرفقة لأعلى معايير الحماية والسرية التامة للمنظمة.</p>
              </div>
            </div>

            {/* Main Form Area (Fixed Size) */}
            <div className="flex-1 lg:max-w-[800px]">
              <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/30 border border-slate-200/60 overflow-hidden min-h-[750px] flex flex-col">
                 
                 {/* Inner Header */}
                 <div className="px-10 py-8 bg-[#FAF9F6] border-b border-slate-100 flex justify-between items-center">
                    <AnimatePresence mode="wait">
                       <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{isSuccess ? "تم الإرسال" : STEPS[currentStep - 1].title}</h2>
                          <p className="text-slate-400 text-xs mt-1 font-medium">{isSuccess ? "شكراً لتعاونكم" : "يرجى تعبئة الحقول المطلوبة للانتقال للمرحلة التالية"}</p>
                       </motion.div>
                    </AnimatePresence>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-200 text-[#CA8A04] font-black text-lg shadow-sm">
                      {currentStep}
                    </div>
                 </div>

                 {/* Content Area */}
                 <div className="flex-1 p-10 relative overflow-hidden">
                    <AnimatePresence mode="wait" custom={direction}>
                       {isSuccess ? (
                         <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center h-[500px]">
                            <div className="w-24 h-24 bg-emerald-50 text-[#007A55] rounded-full flex items-center justify-center mb-8 shadow-inner">
                              <CheckCircle2 size={48} />
                            </div>
                            <h3 className="text-4xl font-black text-slate-900 mb-4">تم الإرسال بنجاح</h3>
                            <p className="text-slate-400 text-lg max-w-md leading-relaxed font-light">تلقينا طلب الانضمام الخاص بكم. سيقوم فريق التدقيق بمراجعة الملفات والرد خلال 15 يوماً عمل.</p>
                            <button onClick={() => window.location.href = '/'} className="mt-12 px-12 py-5 bg-[#0F172A] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#007A55] transition-all">العودة للرئيسية</button>
                         </motion.div>
                       ) : (
                         <motion.form 
                          key={currentStep} 
                          custom={direction} 
                          variants={slideVariants} 
                          initial="enter" 
                          animate="center" 
                          exit="exit" 
                          onSubmit={currentStep === STEPS.length ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}
                          className="h-full flex flex-col"
                         >
                            <div className="flex-1 space-y-10">
                               {currentStep === 1 && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                     <InputField label="الاسم المسجل (عربي)" name="arabicName" value={formData.arabicName} onChange={handleChange} required icon={<Building2 size={18}/>} />
                                     <InputField label="Registered Name (English)" name="englishName" value={formData.englishName} onChange={handleChange} required ltr icon={<Globe size={18}/>} />
                                     <InputField label="العنوان البريدي (عربي)" name="arabicAddress" value={formData.arabicAddress} onChange={handleChange} icon={<MapPin size={18}/>} />
                                     <InputField label="Registered Address (English)" name="englishAddress" value={formData.englishAddress} onChange={handleChange} ltr />
                                     <SelectField label="الدولة" name="country" value={formData.country} onChange={handleChange} options={[{value:'SA', label:'السعودية'}, {value:'MA', label:'المغرب'}, {value:'AE', label:'الإمارات'}]} />
                                     <InputField label="البريد الإلكتروني الرسمي" name="email" value={formData.email} onChange={handleChange} required ltr icon={<Mail size={18}/>} />
                                  </div>
                               )}
                               {currentStep === 2 && (
                                  <div className="space-y-10">
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <InputField label="اسم رئيس الجهة" name="managerName" value={formData.managerName} onChange={handleChange} required />
                                        <InputField label="البريد الإلكتروني" name="managerEmail" value={formData.managerEmail} onChange={handleChange} ltr />
                                     </div>
                                     <div className="pt-10 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <InputField label="اسم ضابط الاتصال" name="contactName" value={formData.contactName} onChange={handleChange} required />
                                        <InputField label="رقم الجوال" name="contactPhone" value={formData.contactPhone} onChange={handleChange} ltr />
                                     </div>
                                  </div>
                               )}
                               {currentStep === 3 && (
                                  <div className="space-y-8">
                                     <div className="w-full h-64 border-2 border-dashed border-slate-200 hover:border-[#007A55] hover:bg-[#007A55]/5 rounded-[2.5rem] flex flex-col items-center justify-center transition-all cursor-pointer group">
                                        <UploadCloud className="text-slate-300 group-hover:text-[#007A55] mb-4" size={48} />
                                        <span className="text-slate-900 font-bold">اسحب وأفلت الوثائق هنا</span>
                                        <span className="text-slate-400 text-[10px] mt-2 uppercase tracking-widest font-black">Max 50MB (PDF, ZIP)</span>
                                     </div>
                                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <CheckboxCard label="شهادات الاعتماد" checked={formData.accreditationCopies} name="accreditationCopies" onChange={handleChange} />
                                        <CheckboxCard label="التكليف الرسمي" checked={formData.assignmentCopy} name="assignmentCopy" onChange={handleChange} />
                                        <CheckboxCard label="وثائق إضافية" checked={formData.otherDocs} name="otherDocs" onChange={handleChange} />
                                     </div>
                                  </div>
                               )}
                               {(currentStep === 4 || currentStep === 5) && (
                                  <div className="space-y-8">
                                     <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4 items-center">
                                        <Award className="text-[#007A55]" size={28} />
                                        <p className="text-slate-600 text-sm font-medium">يرجى توضيح الشهادات والمواصفات المرجعية المعتمدة حالياً.</p>
                                     </div>
                                     <InputField label="المواصفة المرجعية" name="referenceStandard" value={formData.referenceStandard} onChange={handleChange} placeholder="مثال: SMIIC 1 ..." />
                                     <TextAreaField label="المنتجات المغطاة" name="coveredProducts" value={formData.coveredProducts} onChange={handleChange} />
                                  </div>
                               )}
                               {currentStep === 6 && (
                                  <div className="space-y-10">
                                     <div className="bg-emerald-50/60 p-8 rounded-3xl border border-emerald-100">
                                        <h4 className="text-[#007A55] font-black text-sm uppercase mb-4 tracking-widest flex items-center gap-2"><CheckCircle2 size={16}/> إقرار بصحة البيانات</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed font-light">أقر أنا الموقع أدناه بصحة جميع المعلومات الواردة في هذا الطلب، ونلتزم بتنفيذ كافة المتطلبات والشروط الواردة في ميثاق البرنامج العربي للحلال.</p>
                                     </div>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <InputField label="الاسم الكامل" name="managerNameSign" value={formData.managerNameSign} onChange={handleChange} required />
                                        <InputField label="تاريخ التوقيع" name="dateSign" type="date" value={formData.dateSign} onChange={handleChange} required />
                                     </div>
                                     <div className="border-2 border-dashed border-slate-100 p-10 rounded-[2.5rem] text-center hover:border-[#CA8A04] transition-all cursor-pointer">
                                        <FileSignature className="mx-auto text-slate-200 mb-3" size={32} />
                                        <span className="text-slate-900 font-bold block text-sm">رفع الختم والتوقيع الرقمي</span>
                                     </div>
                                  </div>
                               )}
                            </div>

                            {/* Footer Actions */}
                            <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
                               {currentStep > 1 ? (
                                 <button type="button" onClick={handleBack} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">
                                   <ChevronRight size={16} />
                                   السابق
                                 </button>
                               ) : <div />}

                               <div className="flex gap-4">
                                 {currentStep < STEPS.length ? (
                                   <button type="button" onClick={handleNext} className="bg-[#0F172A] text-white px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#007A55] transition-all shadow-lg hover:-translate-y-1 flex items-center gap-4 group">
                                      المرحلة التالية
                                      <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                   </button>
                                 ) : (
                                   <button type="submit" disabled={isSubmitting} className={`px-12 py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-white shadow-xl transition-all ${isSubmitting ? 'bg-slate-300' : 'bg-[#007A55] hover:bg-[#006042] hover:-translate-y-1'}`}>
                                      {isSubmitting ? "جاري الإرسال..." : "تأكيد الطلب"}
                                   </button>
                                 )}
                               </div>
                            </div>
                         </motion.form>
                       )}
                    </AnimatePresence>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HELP SECTION (REVERTED) */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/workflow/w-4.png" alt="Support" className="w-full h-full object-cover opacity-10 scale-110 blur-sm" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-8">
            <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              هل تحتاج إلى مساعدة <span className="text-[#CA8A04]">أثناء التعبئة؟</span>
            </h3>
            <p className="text-xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              فريق الدعم الفني جاهز لمساعدتك في كل خطوة من خطوات تعبئة النموذج والتأكد من إرفاق الوثائق بشكل سليم.
            </p>
            <div className="flex justify-center gap-6 mt-12">
              <a href="mailto:halal@aidsmo.org" className="px-10 py-5 bg-[#007A55] text-white rounded-full font-bold text-lg hover:bg-[#006344] transition-all flex items-center gap-3">
                <Mail size={20} />
                تواصل معنا فوراً
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .shadow-premium-md { box-shadow: 0 10px 40px -10px rgba(0,0,0,0.04), 0 8px 16px -4px rgba(0,0,0,0.02); }
      `}</style>
    </div>
  );
};

/* --- REFINED UI COMPONENTS --- */

const InputField = ({ label, name, value, onChange, type = "text", required = false, ltr = false, icon = null }: any) => (
  <div className="space-y-2.5 text-right">
    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{label} {required && "*"}</label>
    <div className="relative group">
       {icon && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#007A55] transition-colors">{icon}</div>}
       <input 
        required={required} type={type} name={name} value={value} onChange={onChange} dir={ltr ? "ltr" : "rtl"}
        className={`w-full bg-[#FAF9F6] border border-slate-100 rounded-xl py-4 ${icon ? 'pr-12' : 'px-5'} px-5 font-bold text-slate-900 focus:bg-white focus:border-[#007A55] focus:ring-4 focus:ring-[#007A55]/5 outline-none transition-all duration-300 placeholder-slate-200 text-sm`}
       />
    </div>
  </div>
);

const SelectField = ({ label, name, value, onChange, options }: any) => (
  <div className="space-y-2.5 text-right">
    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>
    <select name={name} value={value} onChange={onChange} className="w-full bg-[#FAF9F6] border border-slate-100 rounded-xl py-4 px-5 font-bold text-slate-900 focus:bg-white focus:border-[#007A55] outline-none transition-all duration-300 text-sm">
       <option value="">اختر القائمة...</option>
       {options.map((opt:any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

const TextAreaField = ({ label, name, value, onChange }: any) => (
  <div className="space-y-2.5 text-right">
    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>
    <textarea name={name} value={value} onChange={onChange} rows={4} className="w-full bg-[#FAF9F6] border border-slate-100 rounded-2xl py-5 px-6 font-bold text-slate-900 focus:bg-white focus:border-[#007A55] outline-none transition-all duration-300 resize-none text-sm" />
  </div>
);

const CheckboxCard = ({ label, checked, name, onChange }: any) => (
  <label className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${checked ? 'bg-[#007A55]/5 border-[#007A55]' : 'bg-[#FAF9F6] border-slate-50 hover:border-slate-100'}`}>
     <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${checked ? 'bg-[#007A55] border-[#007A55]' : 'bg-white border-slate-200'}`}>
        {checked && <CheckCircle2 className="text-white" size={12} />}
     </div>
     <span className={`text-[11px] font-bold uppercase tracking-tight ${checked ? 'text-[#007A55]' : 'text-slate-400'}`}>{label}</span>
     <input type="checkbox" name={name} checked={checked} onChange={onChange} className="hidden" />
  </label>
);

export default JoinProgram;