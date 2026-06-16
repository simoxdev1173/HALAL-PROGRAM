import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Mic, Compass, Layout, ArrowRight, ArrowLeft } from 'lucide-react';

interface ChatbotOnboardingProps {
  onComplete: () => void;
}

const ChatbotOnboarding: React.FC<ChatbotOnboardingProps> = ({ onComplete }) => {
  const { i18n } = useTranslation();
  const [step, setStep] = useState(0);
  const isRtl = i18n.language === 'ar';

  const steps = [
    {
      title: isRtl ? "مرحباً بك في حلال بوت" : "Welcome to Halal Bot",
      description: isRtl 
        ? "مساعدك الذكي لاستكشاف البرنامج العربي الموحد للحلال بلمسة عصرية."
        : "Your intelligent assistant for exploring the Arab Unified Halal Program with a modern touch.",
    },
    {
      title: isRtl ? "تفاعل صوتي ذكي" : "Smart Voice Interaction",
      description: isRtl
        ? "تحدث مع البرنامج مباشرة واستفسر عن كل ما يهمك بكل سهولة."
        : "Talk directly to the program and inquire about everything that matters to you with ease.",
    },
    {
      title: isRtl ? "خدمات رقمية متكاملة" : "Integrated Digital Services",
      description: isRtl
        ? "من التحقق من الشهادات إلى طلبات الانضمام، كل شيء في مكان واحد."
        : "From certificate verification to joining requests, everything is in one place.",
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    localStorage.setItem('hasSeenChatbotOnboarding', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-xl" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-xl bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden border border-white/40"
      >
        {/* Refined Progress Indicator */}
        <div className="absolute top-8 left-12 right-12 flex gap-3 z-10">
          {steps.map((_, i) => (
            <div key={i} className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-[#007A55] to-[#00A878]"
              />
            </div>
          ))}
        </div>

        {/* Close/Skip Icon */}
        <button 
          onClick={finishOnboarding}
          className="absolute top-12 right-8 text-slate-400 hover:text-[#007A55] transition-all p-2 hover:bg-slate-50 rounded-full"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">
          {/* Left Side: Visual Context */}
          <div className="hidden md:flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#007A55]/5 to-transparent opacity-50" />
            
            <motion.div
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10 w-64 h-64 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[#007A55]/10 rounded-full blur-3xl group-hover:bg-[#007A55]/20 transition-all duration-700" />
              <img src="/ai-agent.png" alt="Halal Bot" className="w-full h-full object-contain relative z-20 drop-shadow-2xl" />
            </motion.div>
          </div>

          {/* Right Side: Content & Actions */}
          <div className="p-10 pt-24 md:pt-16 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <h2 className={`text-3xl md:text-4xl font-black text-slate-900 leading-tight ${isRtl ? 'font-arabic' : 'font-english'}`}>
                  {steps[step].title}
                </h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  {steps[step].description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 space-y-4">
              <button
                onClick={handleNext}
                className="w-full py-5 bg-[#007A55] text-white rounded-2xl font-bold text-lg shadow-premium-lg hover:bg-[#008F63] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">
                  {step === steps.length - 1 ? (isRtl ? "ابدأ الاستكشاف" : "Start Exploring") : (isRtl ? "التالي" : "Next Step")}
                </span>
                {isRtl ? (
                  <ArrowLeft className="relative z-10 group-hover:-translate-x-1 transition-transform" size={20} />
                ) : (
                  <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
                )}
              </button>
              
              <div className="flex items-center justify-between px-2 pt-2">
                <div className="flex gap-4">
                  {step > 0 && (
                    <button 
                      onClick={() => setStep(step - 1)}
                      className="text-slate-400 font-bold hover:text-slate-600 transition-colors text-sm flex items-center gap-2"
                    >
                      {isRtl ? "رجوع" : "Back"}
                    </button>
                  )}
                </div>
                
                <button 
                  onClick={finishOnboarding}
                  className="text-slate-300 font-bold hover:text-[#007A55] transition-colors text-sm"
                >
                  {isRtl ? "تخطي الكل" : "Skip All"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatbotOnboarding;
