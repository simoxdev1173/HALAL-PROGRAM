import { WorldMap } from "../ui/WorldMap"; 
import { motion } from "framer-motion";

const InternationalRecognition = () => {
  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[800px] bg-[#1F5D3A] overflow-hidden flex items-center justify-center py-20" dir="rtl">
      
      <WorldMap />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
     <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-white mb-8 uppercase tracking-tight leading-tight [text-shadow:_0_4px_24px_rgb(0_0_0_/_30%)]">
  البرنامج العربي للحلال <br/>
  <span className="text-[#EEB422]">الاعتراف والتعاون الدولي</span>
</h2>

<div className="relative inline-block bg-black/5 backdrop-blur-[2px] p-4 rounded-3xl">
  <p className="text-base md:text-lg lg:text-xl font-medium text-white leading-relaxed max-w-4xl mx-auto [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
    إذا كنتم هيئة مانحة لشهادات الحلال خارج المنطقة العربية، يمكن لكم التواصل مع إحدى الجهات
    الوطنية المعينة الموقعة على وثيقة التعاون الفني مع المنظمة والعضو بالبرنامج، وذلك للحصول
    على الاعتماد بعد استيفاء جميع الشروط المنصوص عليها في البرنامج العربي للحلال.
    <br/><br/>
    ويتيح ذلك منح شهادات حلال معترف بها بما يساهم في تسهيل نفاذ المنتجات إلى الأسواق العربية،
    وتعزيز موثوقية شهادات الحلال، وحماية المستهلك المسلم في جميع دول العالم من الشهادات
    والعلامات غير المعتمدة أو المضللة.
  </p>
</div>

<div className="mt-12">
  <button className="px-10 py-5 bg-[#EEB422] hover:bg-white text-[#1F5D3A] font-bold text-base md:text-lg rounded-full shadow-[0_10px_40px_rgba(238,180,34,0.4)] hover:shadow-[0_15px_50px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300 tracking-wide uppercase">
    تعرف على آلية الاستفادة من البرنامج
  </button>
</div>
        </motion.div>
      </div>
    </section>
  );
};

export default InternationalRecognition;