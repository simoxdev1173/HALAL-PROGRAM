import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Globe, Mail, Phone, UploadCloud, 
  CheckCircle2, Landmark, ShieldCheck, Send, Info,
  ChevronRight, ChevronLeft, FileText, User, Calendar, MapPin, Award, FileSignature
} from "lucide-react";

const STEPS = [
  { id: 1, title: "البيانات الإدارية" },
  { id: 2, title: "معلومات عامة" },
  { id: 3, title: "الإدارة والاتصال" },
  { id: 4, title: "المرفقات" },
  { id: 5, title: "شهادات الحلال" },
  { id: 6, title: "شهادات أخرى" },
  { id: 7, title: "التوقيع والاعتماد" },
];

const JoinProgram = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1
    orderNumber: "",
    orderDate: "",
    // Step 2
    arabicName: "",
    englishName: "",
    arabicAddress: "",
    englishAddress: "",
    country: "",
    phone: "",
    fax: "",
    website: "",
    email: "",
    // Step 3
    managerName: "",
    managerEmail: "",
    managerPhone: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    // Step 4
    accreditationCopies: false,
    assignmentCopy: false,
    otherDocs: false,
    otherDocsDetails: "",
    // Step 5
    issuesNationalHalal: "",
    referenceStandard: "",
    coveredProducts: "",
    otherEntitiesIssue: "",
    otherEntitiesNames: "",
    // Step 6
    issuesOtherCerts: "",
    whatAreThey: "",
    otherReferenceStandard: "",
    otherCoveredProducts: "",
    // Step 7
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
    }, 2000);
  };

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3, ease: "easeIn" }
    })
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-arabic" dir="rtl">
      
      {/* --- HERO SECTION --- */}
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
              <strong className="font-bold text-[#007A55]">للبرنامج</strong>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 1: ELIGIBILITY & PROCESS --- */}
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
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-[1.2] tracking-tight">
                  من له الحق <br/>
                  <span className="text-[#007A55]">في الانضمام؟</span>
                </h2>
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

      {/* --- SECTION 2: MULTI-STEP WIZARD FORM --- */}
      <section className="relative py-20 lg:py-24 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              نموذج طلب <span className="text-[#007A55]">الانضمام</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">يرجى تعبئة النموذج عبر الخطوات التالية ليتم مراجعته بدقة.</p>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden relative">
            
            {/* Steps Progress Header */}
            {!isSuccess && (
              <div className="mb-10 pb-8 border-b border-slate-100 relative">
                <div className="flex justify-between items-center relative z-10">
                  {STEPS.map((step, idx) => {
                    const isActive = step.id === currentStep;
                    const isPassed = step.id < currentStep;
                    return (
                      <div key={step.id} className="flex flex-col items-center gap-3 relative z-10 flex-1">
                        <div 
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                            isActive ? 'bg-[#007A55] text-white shadow-lg shadow-[#007A55]/30 scale-110' : 
                            isPassed ? 'bg-emerald-100 text-[#007A55]' : 
                            'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {isPassed ? <CheckCircle2 size={18} /> : step.id}
                        </div>
                        <span className={`text-[10px] sm:text-xs font-bold text-center transition-colors hidden sm:block ${
                          isActive ? 'text-[#007A55]' : isPassed ? 'text-slate-700' : 'text-slate-400'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Progress Bar Background */}
                <div className="absolute top-5 left-10 right-10 h-1 bg-slate-100 -z-0 rounded-full">
                  <motion.div 
                    className="h-full bg-[#007A55] rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>
            )}

            {/* Form Body with Animations */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait" custom={direction}>
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">تم استلام طلبكم بنجاح</h3>
                    <p className="text-slate-500 font-medium max-w-md">
                      شكراً لاهتمامكم بالانضمام للبرنامج العربي للحلال. سيقوم فريقنا بمراجعة الطلب والتواصل معكم خلال فترة لا تتجاوز شهراً واحداً.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key={currentStep}
                    custom={direction}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    onSubmit={currentStep === STEPS.length ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}
                    className="space-y-8"
                  >
                    
                    {/* --- STEP 1: Admin Data --- */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4 items-start mb-8">
                          <Info className="text-blue-500 shrink-0 mt-1" size={24} />
                          <div>
                            <h4 className="font-bold text-slate-900 mb-2">تعليمات إدارية هامة</h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium">
                              هذه المعلومات للاستخدام الداخلي للمنظمة. يجب تعبئة هذا النموذج بالكامل وإرسال النسخة الموقعة إلكترونياً إلى العناوين التالية: <br/>
                              <strong className="text-[#007A55]">smc@aidsmo.org</strong> و <strong className="text-[#007A55]">aidsmo@aidsmo.org</strong>
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">رقم الطلب (إن وجد)</label>
                            <input type="text" name="orderNumber" value={formData.orderNumber} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl py-4 px-4 font-medium focus:border-[#007A55] focus:ring-4 focus:ring-[#007A55]/10 outline-none transition-all" placeholder="يترك فارغاً للطلبات الجديدة" />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">تاريخ الاستلام</label>
                            <div className="relative">
                              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                              <input type="date" name="orderDate" value={formData.orderDate} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl py-4 pr-12 pl-4 font-medium focus:border-[#007A55] outline-none transition-all" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- STEP 2: General Info --- */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">معلومات عامة عن الجهة</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">الاسم المسجل (عربي) <span className="text-rose-500">*</span></label>
                            <input required type="text" name="arabicName" value={formData.arabicName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 outline-none focus:border-[#007A55]" />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">Registered Name (English) <span className="text-rose-500">*</span></label>
                            <input required type="text" name="englishName" value={formData.englishName} onChange={handleChange} dir="ltr" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 outline-none focus:border-[#007A55] text-left" />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">العنوان البريدي (عربي)</label>
                            <input type="text" name="arabicAddress" value={formData.arabicAddress} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 outline-none focus:border-[#007A55]" />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">Registered Address (English)</label>
                            <input type="text" name="englishAddress" value={formData.englishAddress} onChange={handleChange} dir="ltr" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 outline-none focus:border-[#007A55] text-left" />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">الدولة</label>
                            <select name="country" value={formData.country} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 outline-none focus:border-[#007A55]">
                              <option value="">اختر الدولة...</option>
                              <option value="SA">المملكة العربية السعودية</option>
                              <option value="AE">الإمارات العربية المتحدة</option>
                              <option value="MA">المملكة المغربية</option>
                              <option value="EG">مصر</option>
                              <option value="OTHER">أخرى</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">الموقع الإلكتروني</label>
                            <input type="url" name="website" value={formData.website} onChange={handleChange} dir="ltr" placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 outline-none focus:border-[#007A55] text-left" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- STEP 3: Management & Contact --- */}
                    {currentStep === 3 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><User className="text-[#007A55]" size={20}/> الإدارة العليا</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase">اسم رئيس الجهة</label>
                              <input type="text" name="managerName" value={formData.managerName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55]" />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase">البريد الإلكتروني</label>
                              <input type="email" name="managerEmail" value={formData.managerEmail} onChange={handleChange} dir="ltr" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55] text-left" />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase">رقم الجوال</label>
                              <input type="tel" name="managerPhone" value={formData.managerPhone} onChange={handleChange} dir="ltr" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55] text-left" />
                            </div>
                          </div>
                        </div>
                        <div className="pt-6 border-t border-slate-100">
                          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Phone className="text-[#CA8A04]" size={20}/> ضابط الاتصال (للتواصل المباشر)</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase">اسم ضابط الاتصال</label>
                              <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55]" />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase">البريد الإلكتروني</label>
                              <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} dir="ltr" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55] text-left" />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase">رقم الجوال</label>
                              <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} dir="ltr" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55] text-left" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- STEP 4: Attachments --- */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div className="bg-[#007A55]/5 border border-[#007A55]/20 rounded-2xl p-6 mb-6">
                          <p className="text-sm text-slate-700 font-medium leading-relaxed">
                            <strong className="text-[#007A55]">للطلبات الجديدة:</strong> يرجى إرفاق تقرير شامل يوضح (الهيكل التنظيمي، الإمكانات الفنية والبشرية، قائمة المفتشين، إجراءات إصدار الشهادات، سجل الشهادات السابقة، وقائمة أسماء وعناوين الموردين).
                          </p>
                        </div>

                        <div className="w-full border-2 border-dashed border-slate-200 hover:border-[#007A55]/50 bg-slate-50 rounded-3xl p-10 flex flex-col items-center justify-center transition-colors cursor-pointer group">
                          <UploadCloud className="text-slate-400 group-hover:text-[#007A55] mb-3 transition-colors" size={32} />
                          <span className="text-slate-700 font-bold mb-1">رفع التقرير الشامل والوثائق</span>
                          <span className="text-slate-400 text-xs">PDF, DOCX, ZIP (Max 20MB)</span>
                          <input type="file" className="hidden" multiple accept=".pdf,.zip,.doc,.docx" />
                        </div>

                        <div className="pt-6">
                          <h4 className="font-bold text-slate-900 mb-4">تأكيد المرفقات الإضافية:</h4>
                          <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input type="checkbox" name="accreditationCopies" checked={formData.accreditationCopies} onChange={handleChange} className="w-5 h-5 accent-[#007A55] rounded" />
                              <span className="text-sm font-medium text-slate-700">نسخة عن شهادات الاعتماد (إن وجدت)</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input type="checkbox" name="assignmentCopy" checked={formData.assignmentCopy} onChange={handleChange} className="w-5 h-5 accent-[#007A55] rounded" />
                              <span className="text-sm font-medium text-slate-700">نسخة عن التكليف بالتعيين الرسمي</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input type="checkbox" name="otherDocs" checked={formData.otherDocs} onChange={handleChange} className="w-5 h-5 accent-[#007A55] rounded" />
                              <span className="text-sm font-medium text-slate-700">أخرى (برجاء التوضيح)</span>
                            </label>
                          </div>
                          
                          <AnimatePresence>
                            {formData.otherDocs && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 overflow-hidden">
                                <input type="text" name="otherDocsDetails" value={formData.otherDocsDetails} onChange={handleChange} placeholder="اكتب تفاصيل الوثائق الأخرى هنا..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55] text-sm" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    )}

                    {/* --- STEP 5: National Halal Logic --- */}
                    {currentStep === 5 && (
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-slate-900">هل تمنح الجهة شهادة حلال وطنية؟</h3>
                          <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer p-4 border border-slate-200 rounded-xl hover:border-[#007A55] transition-colors flex-1 bg-slate-50">
                              <input type="radio" name="issuesNationalHalal" value="yes" checked={formData.issuesNationalHalal === "yes"} onChange={handleChange} className="w-5 h-5 accent-[#007A55]" />
                              <span className="font-bold text-slate-700">نعم، نمنح شهادات وطنية</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer p-4 border border-slate-200 rounded-xl hover:border-[#007A55] transition-colors flex-1 bg-slate-50">
                              <input type="radio" name="issuesNationalHalal" value="no" checked={formData.issuesNationalHalal === "no"} onChange={handleChange} className="w-5 h-5 accent-[#007A55]" />
                              <span className="font-bold text-slate-700">لا نمنح</span>
                            </label>
                          </div>
                        </div>

                        <AnimatePresence mode="wait">
                          {formData.issuesNationalHalal === "yes" && (
                            <motion.div key="yes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">ما هي المواصفة المرجعية لها؟</label>
                                <input type="text" name="referenceStandard" value={formData.referenceStandard} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55]" />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">تصنيف المنتجات المغطاة في مجال المنح</label>
                                <input type="text" name="coveredProducts" value={formData.coveredProducts} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55]" placeholder="مثال: لحوم، ألبان، مستحضرات تجميل..." />
                              </div>
                            </motion.div>
                          )}
                          
                          {formData.issuesNationalHalal === "no" && (
                            <motion.div key="no" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                              <label className="block text-sm font-bold text-slate-700">هل توجد جهات معينة تقوم بمنح شهادة الحلال الوطنية في دولتكم؟</label>
                              <div className="flex gap-6 mb-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" name="otherEntitiesIssue" value="yes" checked={formData.otherEntitiesIssue === "yes"} onChange={handleChange} className="w-4 h-4 accent-[#007A55]" />
                                  <span className="font-medium text-slate-700">نعم</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" name="otherEntitiesIssue" value="no" checked={formData.otherEntitiesIssue === "no"} onChange={handleChange} className="w-4 h-4 accent-[#007A55]" />
                                  <span className="font-medium text-slate-700">لا</span>
                                </label>
                              </div>
                              
                              <AnimatePresence>
                                {formData.otherEntitiesIssue === "yes" && (
                                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                    <label className="block text-sm font-bold text-slate-700 mb-2">الرجاء ذكر أسماء هذه الجهات:</label>
                                    <textarea name="otherEntitiesNames" value={formData.otherEntitiesNames} onChange={handleChange} rows={2} className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55] resize-none" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* --- STEP 6: Other Certificates Logic --- */}
                    {currentStep === 6 && (
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-slate-900">هل تمنح الجهة شهادات أخرى؟</h3>
                          <p className="text-sm text-slate-500 font-medium">مثل أنظمة الإدارة، الجودة، السلامة الغذائية، أو غيرها.</p>
                          <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer p-4 border border-slate-200 rounded-xl hover:border-[#007A55] transition-colors flex-1 bg-slate-50">
                              <input type="radio" name="issuesOtherCerts" value="yes" checked={formData.issuesOtherCerts === "yes"} onChange={handleChange} className="w-5 h-5 accent-[#007A55]" />
                              <span className="font-bold text-slate-700">نعم</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer p-4 border border-slate-200 rounded-xl hover:border-[#007A55] transition-colors flex-1 bg-slate-50">
                              <input type="radio" name="issuesOtherCerts" value="no" checked={formData.issuesOtherCerts === "no"} onChange={handleChange} className="w-5 h-5 accent-[#007A55]" />
                              <span className="font-bold text-slate-700">لا</span>
                            </label>
                          </div>
                        </div>

                        <AnimatePresence>
                          {formData.issuesOtherCerts === "yes" && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">ما هي هذه الشهادات؟</label>
                                <input type="text" name="whatAreThey" value={formData.whatAreThey} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55]" placeholder="مثال: ISO 9001, HACCP..." />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">ما هي المواصفة المرجعية لها؟</label>
                                <input type="text" name="otherReferenceStandard" value={formData.otherReferenceStandard} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55]" />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-sm font-bold text-slate-700">مجال منح هذه الشهادات</label>
                                <textarea name="otherCoveredProducts" value={formData.otherCoveredProducts} onChange={handleChange} rows={2} className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#007A55] resize-none" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* --- STEP 7: Terms & Signatures --- */}
                    {currentStep === 7 && (
                      <div className="space-y-8">
                        <div className="bg-slate-900 rounded-2xl p-8 text-white">
                          <h3 className="text-xl font-bold mb-4 text-[#CA8A04] flex items-center gap-2">
                            <ShieldCheck size={24} />
                            شروط وتوضيحات هامة
                          </h3>
                          <ul className="space-y-3 text-sm font-medium leading-relaxed text-white/80 list-disc list-inside">
                            <li>تقوم المنظمة بمراجعة الطلب والرد خلال فترة لا تتجاوز شهراً واحداً.</li>
                            <li>تلتزم المنظمة بالسرية التامة والمطلقة لجميع البيانات والوثائق المقدمة.</li>
                            <li>تلتزم الجهة المتقدمة بتنفيذ كافة المتطلبات والشروط الواردة في البرنامج العربي للحلال.</li>
                            <li>في حال القبول، يتم الالتزام بتوقيع وثيقة التعاون الفني الملحق (5) واعتمادها رسمياً.</li>
                          </ul>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">اسم وتوقيع رئيس الجهة المعتمد</label>
                            <div className="relative">
                              <FileSignature className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                              <input required type="text" name="managerNameSign" value={formData.managerNameSign} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pr-12 pl-4 font-bold focus:border-[#007A55] outline-none transition-all" placeholder="الاسم الكامل للرئيس" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700">تاريخ التقديم</label>
                            <div className="relative">
                              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                              <input required type="date" name="dateSign" value={formData.dateSign} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pr-12 pl-4 font-medium focus:border-[#007A55] outline-none transition-all" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-bold text-slate-700">ملاحظات إضافية (اختياري)</label>
                          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 font-medium focus:border-[#007A55] outline-none transition-all resize-none" />
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-1 border-2 border-dashed border-slate-200 hover:border-[#007A55]/50 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center transition-colors cursor-pointer group">
                            <UploadCloud className="text-slate-400 group-hover:text-[#007A55] mb-2" size={24} />
                            <span className="text-sm font-bold text-slate-700">رفع التوقيع الرقمي</span>
                          </div>
                          <div className="flex-1 border-2 border-dashed border-slate-200 hover:border-[#007A55]/50 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center transition-colors cursor-pointer group">
                            <Award className="text-slate-400 group-hover:text-[#007A55] mb-2" size={24} />
                            <span className="text-sm font-bold text-slate-700">رفع الختم الرسمي</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- Navigation Buttons --- */}
                    <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-4">
                      {currentStep > 1 ? (
                        <button type="button" onClick={handleBack} className="px-6 py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2">
                          <ChevronRight size={20} />
                          السابق
                        </button>
                      ) : (
                        <div /> // Spacer
                      )}

                      {currentStep < STEPS.length ? (
                        <button type="button" onClick={handleNext} className="px-8 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-[#007A55] transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                          التالي
                          <ChevronLeft size={20} />
                        </button>
                      ) : (
                        <button type="submit" disabled={isSubmitting} className={`px-10 py-4 rounded-xl font-bold text-white flex items-center gap-2 shadow-lg transition-all ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#007A55] hover:bg-[#006344] hover:shadow-xl hover:-translate-y-0.5'}`}>
                          {isSubmitting ? (
                            <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> جاري التقديم...</>
                          ) : (
                            <><Send size={20} className="rotate-180" /> تأكيد وإرسال الطلب</>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: FULL WIDTH FOOTER SEPARATOR --- */}
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

    </div>
  );
};

export default JoinProgram;