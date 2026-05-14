import { motion } from "framer-motion";
import { MessageSquare, Sparkles } from "lucide-react";

export const ChatbotCTA = ({ onClick }: { onClick: () => void }) => {
  return (
    <section className="py-16 bg-[#FAF9F6] relative overflow-hidden" dir="rtl">
      {/* Background Decor - Softened for a cleaner look */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#007A55]/5 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#EEB422]/5 blur-[100px] rounded-full"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 flex flex-col lg:flex-row items-center gap-12">
         
          {/* 1. Content Area (Now on the Right for RTL flow) */}
          <div className="flex-grow text-center lg:text-right ">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Sparkles className="text-[#EEB422]" size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                AI Driven Support
              </span>
            </div>
            
            {/* Reduced Typography Sizes for Sophistication */}
            <h2 className="text-2xl md:text-3xl font-black text-[#004D36] mb-6 leading-snug">
              هل لديك استفسارات حول <br />
              <span className="text-[#007A55]">متطلبات البرنامج العربي للحلال؟</span>
            </h2>
            
            <p className="text-base md:text-lg text-stone-500 font-normal leading-relaxed mb-8 max-w-xl">
              تحدث مع مساعدنا الذكي المدرب على أحدث المعايير الفنية. احصل على إجابات فورية ودقيقة حول التعيين والتراخيص.
            </p>

            <button 
              onClick={onClick}
              className="bg-[#007A55] text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#007A55]/20 hover:bg-[#004D36] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 mx-auto lg:mx-0 group"
            >
              ابدأ المحادثة الآن
              <MessageSquare size={18} className="group-hover:rotate-12 transition-transform" />
            </button>
          </div>
            {/* 2. Image Area (Now on the Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:w-2/5 shrink-0"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto">
              {/* Decorative Ring */}
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-dashed border-stone-200 animate-[spin_20s_linear_infinite]"></div>
              
              <div className="absolute inset-3 rounded-[2rem] overflow-hidden bg-stone-50 shadow-inner">
                <img 
                  src="/ai-assistant.png" /* Replace with your updated 'standing guy' image path */
                  alt="AI Assistant" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004D36]/20 to-transparent"></div>
              </div>

              {/* Status Tag - Refined */}
              <div className="absolute -bottom-2 -left-2 bg-white border border-stone-100 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-[11px] font-bold text-[#004D36]">مساعدك متاح الآن</span>
              </div>
            </div>
          </motion.div>

         

        </div>
      </div>
    </section>
  );
};