import { WorldMap } from "../ui/WorldMap"; 
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const InternationalRecognition = () => {
  return (
    <section className="relative w-full min-h-[500px] lg:min-h-[650px] xl:min-h-[800px] bg-[#1C4C2A] overflow-hidden flex items-center justify-center py-16 lg:py-20 border-y border-stone-800" dir="rtl">
      
      {/* Carbon Fiber Texture */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      {/* World Map Component from previous version */}
      <div className="absolute inset-0 z-0">
         <WorldMap />
      </div>

helll

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >

    

          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-black text-white mb-6 lg:mb-10 tracking-tight leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            البرنامج العربي للحلال <br/>
            <span className="text-[#CA8A04] relative inline-block mt-2 lg:mt-4">
              الاعتراف والتعاون الدولي
              <svg className="absolute w-full h-2 lg:h-3 -bottom-2 lg:-bottom-4 left-0 text-[#CA8A04]/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>

          <div className="relative bg-black/10 border border-white/10 p-6 lg:p-8 xl:p-10 rounded-2xl shadow-[var(--shadow-ind-floating)] backdrop-blur-md mt-4 lg:mt-6 w-full max-w-4xl">
            <p className="text-sm md:text-base lg:text-lg xl:text-xl font-medium text-white leading-relaxed text-center">
              إذا كنتم هيئة مانحة لشهادات الحلال خارج المنطقة العربية، يمكن لكم التواصل مع إحدى الجهات
              الوطنية المعينة الموقعة على وثيقة التعاون الفني مع المنظمة والعضو بالبرنامج، وذلك للحصول
              على الاعتماد بعد استيفاء جميع الشروط.
              <br/><br/>
              ويتيح ذلك منح شهادات حلال معترف بها بما يساهم في تسهيل نفاذ المنتجات إلى الأسواق العربية،
              وتعزيز موثوقية شهادات الحلال، وحماية المستهلك المسلم.
            </p>
          </div>

          <div className="mt-8 lg:mt-14">
            <button className="flex items-center justify-center gap-3 px-8 lg:px-10 py-4 lg:py-5 rounded-full border border-white/20 bg-[#CA8A04] shadow-[0_10px_40px_rgba(202,138,4,0.3)] text-white hover:bg-white hover:text-[#1C4C2A] font-bold text-base lg:text-lg transition-all duration-300 whitespace-nowrap group/btn backdrop-blur-md cursor-pointer">
              تعرف على آلية الاستفادة من البرنامج
              <div className="w-7 lg:w-8 h-7 lg:h-8 rounded-full bg-black/10 flex items-center justify-center shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)] mr-2 group-hover:bg-[#1C4C2A]/10 transition-colors">
                 <ArrowLeft size={16}  className="group-hover/btn:-translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InternationalRecognition;
