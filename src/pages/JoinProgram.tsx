"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail,  UploadCloud, 
  CheckCircle2, ShieldCheck,  Info,
  ChevronRight, ChevronLeft, User,  Award, FileSignature,
  Building2, Globe, MapPin, ClipboardCheck, ArrowLeft
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };



  return (
    <div className="bg-[#FAF9F6] min-h-screen font-arabic overflow-hidden" dir="rtl">
      
      {/* Industrial noise overlay */}
      <div className="fixed inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-50" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-[40vh] min-h-[350px] overflow-hidden pt-16 lg:pt-20 flex items-center justify-center border-b border-stone-300 shadow-[var(--shadow-ind-card)]">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="/about-us-bg.png" 
            alt="الانضمام للبرنامج" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-[#FAF9F6]"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >  
            

            <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              طلب الانضمام <span className="text-[#CA8A04]">للبرنامج</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN INTERFACE --- */}
      <section className="relative py-12 lg:py-20 overflow-hidden">
        {/* ISO Grid Background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
            
            {/* Sidebar Navigation (Machine Rack) */}
            <div className="w-full lg:w-[320px] lg:sticky lg:top-32 space-y-6 shrink-0">
              <div className="ind-card border border-stone-200/50 p-6 lg:p-8 relative bg-[#e0e5ec]">
                 {/* Hardware Details */}
                 <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-gradient-to-br from-stone-300 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]"></div>
                 <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gradient-to-br from-stone-300 to-stone-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]"></div>

                 <h3 className="text-xs font-mono font-black text-stone-500 uppercase tracking-widest mb-8 border-b border-white/40 pb-4 shadow-[0_1px_0_rgba(255,255,255,0.5)]">إجراءات الانضمام</h3>
                 
                 <div className="space-y-4">
                    {STEPS.map((step) => {
                      const isActive = step.id === currentStep;
                      const isPassed = step.id < currentStep;
                      return (
                        <div key={step.id} className="flex items-center gap-4 group cursor-default">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-xs lg:text-sm transition-all border ${
                            isActive ? 'bg-[#007A55] text-white border-transparent shadow-[var(--shadow-ind-floating)] scale-105' : 
                            isPassed ? 'bg-white text-[#007A55] border-stone-200 shadow-inner' : 'bg-white/50 text-stone-400 border-stone-200'
                          }`}>
                            {isPassed ? <CheckCircle2 size={18} /> : step.id}
                          </div>
                          <span className={`text-xs lg:text-sm font-black transition-colors ${isActive ? 'text-stone-800' : 'text-stone-500'}`}>{step.title}</span>
                        </div>
                      );
                    })}
                 </div>
                 
                 {!isSuccess && (
                   <div className="mt-10 pt-6 border-t border-white/40 shadow-[0_-1px_0_rgba(255,255,255,0.5)]">
                      <div className="h-2 w-full ind-recessed bg-stone-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                          className="h-full bg-gradient-to-l from-[#007A55] to-[#CA8A04] shadow-[0_0_10px_rgba(0,122,85,0.3)]"
                        />
                      </div>
                      <p className="text-[9px] font-mono font-black text-stone-400 uppercase mt-3 tracking-widest text-center">Protocol Progress {Math.round((currentStep / STEPS.length) * 100)}%</p>
                   </div>
                 )}
              </div>
              
              <div className="bg-stone-900 rounded-[1.5rem] p-8 text-white relative overflow-hidden shadow-[var(--shadow-ind-floating)] border border-stone-700">
                <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
                <div className="flex items-center gap-3 mb-4">
                   <ShieldCheck className="text-[#CA8A04]" size={20} />
                </div>
            
                <p className="text-stone-400 text-[10px] lg:text-lg leading-relaxed font-medium">تخضع جميع الوثائق المرفقة لأعلى معايير الحماية والسرية التامة للمنظمة.</p>
              </div>
            </div>

            {/* Main Form Area (The Console) */}
            <div className="flex-1 w-full lg:max-w-[800px]">
              <div className="ind-card border border-stone-200/50 bg-white rounded-[2rem] lg:rounded-[2.5rem] shadow-xl overflow-hidden min-h-[700px] flex flex-col relative">
                 
                 {/* Console Header */}
                 <div className="px-8 lg:px-10 py-6 lg:py-8 bg-[#e0e5ec] border-b border-stone-300 flex justify-between items-center shadow-[0_4px_10px_rgba(0,0,0,0.03)] relative z-10">
                    <AnimatePresence mode="wait">
                       <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                          <h2 className="text-xl lg:text-2xl font-black text-stone-800 tracking-tight drop-shadow-[0_1px_0_#ffffff]">
                             {isSuccess ? "اكتمل البروتوكول" : STEPS[currentStep - 1].title}
                          </h2>
                          <p className="text-stone-500 text-xs mt-1 font-bold">
                             {isSuccess ? "شكراً لتعاونكم مع المنظمة" : "يرجى إدخال البيانات الفنية بدقة عالية"}
                          </p>
                       </motion.div>
                    </AnimatePresence>
                    
                    <div className="flex gap-2">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-stone-200 text-[#CA8A04] font-mono font-black text-lg shadow-[var(--shadow-ind-sharp)]">
                         {currentStep.toString().padStart(2, '0')}
                       </div>
                    </div>
                 </div>

                 {/* Console Display Content Area */}
                 <div className="flex-1 p-8 lg:p-12 relative overflow-hidden bg-[#FAF9F6]">
                    {/* Schematic overlay inside form */}
                    <div className="absolute inset-0 opacity-[0.01] pointer-events-none" 
                         style={{ backgroundImage: 'linear-gradient(#636e72 1px, transparent 1px), linear-gradient(90deg, #636e72 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                    <AnimatePresence mode="wait" custom={direction}>
                       {isSuccess ? (
                         <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center h-full min-h-[500px]">
                            <div className="w-24 h-24 bg-[#007A55]/10 text-[#007A55] rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-[#007A55]/20">
                              <CheckCircle2 size={48} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-black text-stone-800 mb-4">تم الإرسال بنجاح</h3>
                            <p className="text-stone-500 text-base lg:text-lg max-w-md leading-relaxed font-medium">تلقينا طلب الانضمام الخاص بكم. سيقوم فريق التدقيق الفني بمراجعة الملفات والرد عبر القنوات الرسمية خلال 15 يوماً عمل.</p>
                            
                            <div className="mt-12 flex gap-4">
                               <button onClick={() => window.location.href = '/'} className="btn-primary !bg-[#1C4C2A] h-[60px] px-12 group">
                                  العودة للمنصة الرئيسية
                                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                               </button>
                            </div>
                         </motion.div>
                       ) : (
                         <motion.form 
                          key={currentStep} 
                          custom={direction} 
                          initial="enter" 
                          animate="center" 
                          exit="exit" 
                          onSubmit={currentStep === STEPS.length ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}
                          className="h-full flex flex-col relative z-10"
                         >
                            <div className="flex-1 space-y-10">
                               {currentStep === 1 && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
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
                                     <div className="pt-10 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-[0_-1px_0_white]">
                                        <InputField label="اسم ضابط الاتصال" name="contactName" value={formData.contactName} onChange={handleChange} required />
                                        <InputField label="رقم الجوال" name="contactPhone" value={formData.contactPhone} onChange={handleChange} ltr />
                                     </div>
                                  </div>
                               )}
                               {currentStep === 3 && (
                                  <div className="space-y-8">
                                     <div className="w-full h-64 border-2 border-dashed border-stone-300 bg-stone-50 hover:bg-stone-100 hover:border-[#007A55] rounded-[2rem] flex flex-col items-center justify-center transition-all cursor-pointer group shadow-[inset_0_4px_10px_rgba(0,0,0,0.03)]">
                                        <div className="w-16 h-16 rounded-2xl bg-white shadow-[var(--shadow-ind-floating)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-stone-100">
                                           <UploadCloud className="text-[#007A55]" size={32} />
                                        </div>
                                        <span className="text-stone-800 font-black">اسحب وأفلت الوثائق هنا</span>
                                        <span className="text-stone-400 text-[10px] mt-2 uppercase tracking-widest font-mono font-black">Supported Protocols: PDF, ZIP (Max 50MB)</span>
                                     </div>
                                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                                        <CheckboxCard label="شهادات الاعتماد" checked={formData.accreditationCopies} name="accreditationCopies" onChange={handleChange} />
                                        <CheckboxCard label="التكليف الرسمي" checked={formData.assignmentCopy} name="assignmentCopy" onChange={handleChange} />
                                        <CheckboxCard label="وثائق إضافية" checked={formData.otherDocs} name="otherDocs" onChange={handleChange} />
                                     </div>
                                  </div>
                               )}
                               {(currentStep === 4 || currentStep === 5) && (
                                  <div className="space-y-8">
                                     <div className="p-6 bg-[#e0e5ec]/50 rounded-2xl border border-white/50 flex gap-4 items-center shadow-inner">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-[var(--shadow-ind-floating)] flex items-center justify-center shrink-0 border border-stone-100">
                                           <Award className="text-[#CA8A04]" size={24} />
                                        </div>
                                        <p className="text-stone-600 text-sm font-bold">يرجى توضيح الشهادات والمواصفات المرجعية المعتمدة حالياً من قبل جهات التقييم.</p>
                                     </div>
                                     <InputField label="المواصفة المرجعية" name="referenceStandard" value={formData.referenceStandard} onChange={handleChange} placeholder="مثال: SMIIC 1 ..." />
                                     <TextAreaField label="المنتجات المغطاة" name="coveredProducts" value={formData.coveredProducts} onChange={handleChange} />
                                  </div>
                               )}
                               {currentStep === 6 && (
                                  <div className="space-y-10">
                                     <div className="bg-[#1C4C2A]/5 p-8 rounded-3xl border border-[#1C4C2A]/20 shadow-inner">
                                        <h4 className="text-[#1C4C2A] font-black text-sm uppercase mb-4 tracking-widest flex items-center gap-3">
                                           <div className="w-6 h-6 rounded bg-white flex items-center justify-center shadow-sm"><CheckCircle2 size={14}/></div>
                                           إقرار بصحة البيانات
                                        </h4>
                                        <p className="text-stone-600 text-sm leading-relaxed font-bold">أقر أنا الموقع أدناه بصحة جميع المعلومات الواردة في هذا الطلب، ونلتزم بتنفيذ كافة المتطلبات والشروط الواردة في ميثاق البرنامج العربي للحلال.</p>
                                     </div>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <InputField label="الاسم الكامل" name="managerNameSign" value={formData.managerNameSign} onChange={handleChange} required />
                                        <InputField label="تاريخ التوقيع" name="dateSign" type="date" value={formData.dateSign} onChange={handleChange} required />
                                     </div>
                                     <div className="ind-recessed p-10 bg-white rounded-[2rem] text-center border-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] cursor-pointer group hover:bg-stone-50 transition-colors">
                                        <div className="w-14 h-14 bg-[#FAF9F6] rounded-2xl mx-auto mb-4 flex items-center justify-center border border-stone-200 shadow-[var(--shadow-ind-sharp)] group-hover:scale-110 transition-transform">
                                           <FileSignature className="text-[#CA8A04]" size={28} />
                                        </div>
                                        <span className="text-stone-800 font-black block text-sm">رفع الختم والتوقيع الرقمي المعتمد</span>
                                     </div>
                                  </div>
                               )}
                            </div>

                            {/* Console Control Bar */}
                            <div className="mt-12 pt-8 border-t border-stone-200 flex items-center justify-between shadow-[0_-1px_0_white]">
                               {currentStep > 1 ? (
                                 <button type="button" onClick={handleBack} className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-stone-400 hover:text-[#CA8A04] hover:bg-white hover:shadow-[var(--shadow-ind-card)] transition-all cursor-pointer group">
                                   <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                   السابق
                                 </button>
                               ) : <div />}

                               <div className="flex gap-4">
                                 {currentStep < STEPS.length ? (
                                   <button type="button" onClick={handleNext} className="btn-primary !bg-[#1C4C2A] h-[54px] lg:h-[60px] px-10 group">
                                      المرحلة التالية
                                      <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                   </button>
                                 ) : (
                                   <button type="submit" disabled={isSubmitting} className={`btn-primary h-[60px] px-12 !bg-[#007A55] group ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
                                      {isSubmitting ? "جاري المعالجة..." : "تأكيد الطلب الفني"}
                                      {!isSubmitting && <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />}
                                   </button>
                                 )}
                               </div>
                            </div>
                         </motion.form>
                       )}
                    </AnimatePresence>
                 </div>
                 
                 {/* Visual Bottom Vent */}
                 <div className="h-4 bg-[#e0e5ec] border-t border-stone-300 flex items-center justify-center gap-1.5">
                    <div className="w-8 h-1 rounded-full bg-black/10"></div>
                    <div className="w-8 h-1 rounded-full bg-black/10"></div>
                    <div className="w-8 h-1 rounded-full bg-black/10"></div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HELP SECTION (Industrial Dark Panel) */}
      <section className="relative py-24 bg-stone-900 overflow-hidden border-t border-stone-800 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0">
          <img src="/workflow/w-4.png" alt="Support" className="w-full h-full object-cover opacity-10 scale-110" />
        </div>
        <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center flex flex-col items-center space-y-10">
            
            <div className="w-20 h-20 bg-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/10 shadow-[var(--shadow-ind-floating)]">
               <Info className="text-[#CA8A04]" size={32} />
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-md"
            >
              هل تحتاج إلى مساعدة <span className="text-[#CA8A04]">أثناء تعبئة البيانات؟</span>
            </motion.h3>
            
            <p className="text-base md:text-lg text-stone-400 font-medium max-w-2xl mx-auto leading-relaxed">
              فريق الدعم الفني جاهز لمساعدتك في كل خطوة من خطوات تعبئة النموذج الفني والتأكد من استيفاء كافة الوثائق المطلوبة.
            </p>
            
            <div className="flex justify-center gap-6 mt-4">
              <a href="mailto:halal@aidsmo.org" className="btn-primary !bg-[#CA8A04] !text-[#1C4C2A] h-[60px] px-12 group shadow-[0_15px_40px_rgba(202,138,4,0.3)]">
                <Mail size={22} />
                تواصل معنا فوراً
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

/* --- REFINED UI COMPONENTS --- */

const InputField = ({ label, name, value, onChange, type = "text", required = false, ltr = false, icon = null }: any) => (
  <div className="space-y-3 text-right">
    <label className="block text-[10px] font-mono font-black text-stone-400 uppercase tracking-widest px-1">{label} {required && "*"}</label>
    <div className="relative group">
       {icon && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-[#007A55] transition-colors">{icon}</div>}
       <input 
        required={required} type={type} name={name} value={value} onChange={onChange} dir={ltr ? "ltr" : "rtl"}
        className={`w-full bg-white border border-stone-200 rounded-xl py-4 ${icon ? 'pr-12' : 'px-5'} px-5 font-bold text-stone-800 ind-recessed focus:ring-2 focus:ring-[#007A55]/10 outline-none transition-all duration-300 placeholder-stone-200 text-sm`}
       />
    </div>
  </div>
);

const SelectField = ({ label, name, value, onChange, options }: any) => (
  <div className="space-y-3 text-right">
    <label className="block text-[10px] font-mono font-black text-stone-400 uppercase tracking-widest px-1">{label}</label>
    <select name={name} value={value} onChange={onChange} className="w-full bg-white border border-stone-200 rounded-xl py-4 px-5 font-bold text-stone-800 ind-recessed focus:ring-2 focus:ring-[#007A55]/10 outline-none transition-all duration-300 text-sm appearance-none">
       <option value="">اختر القائمة...</option>
       {options.map((opt:any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

const TextAreaField = ({ label, name, value, onChange }: any) => (
  <div className="space-y-3 text-right">
    <label className="block text-[10px] font-mono font-black text-stone-400 uppercase tracking-widest px-1">{label}</label>
    <textarea name={name} value={value} onChange={onChange} rows={4} className="w-full bg-white border border-stone-200 rounded-2xl py-5 px-6 font-bold text-stone-800 ind-recessed focus:ring-2 focus:ring-[#007A55]/10 outline-none transition-all duration-300 resize-none text-sm" />
  </div>
);

const CheckboxCard = ({ label, checked, name, onChange }: any) => (
  <label className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${checked ? 'bg-[#007A55]/5 border-[#007A55] shadow-inner' : 'bg-white border-stone-200 hover:border-stone-300 shadow-[var(--shadow-ind-sharp)]'}`}>
     <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${checked ? 'bg-[#007A55] border-[#007A55]' : 'bg-[#FAF9F6] border-stone-200'}`}>
        {checked && <CheckCircle2 className="text-white" size={12} />}
     </div>
     <span className={`text-[10px] font-black uppercase tracking-tight ${checked ? 'text-[#007A55]' : 'text-stone-500'}`}>{label}</span>
     <input type="checkbox" name={name} checked={checked} onChange={onChange} className="hidden" />
  </label>
);

export default JoinProgram;