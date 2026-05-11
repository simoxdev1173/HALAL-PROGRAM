import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
      dir="rtl"
    >
      <h1 className="text-4xl md:text-6xl font-black text-[#004D36] mb-8">عن البرنامج العربي للحلال</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-lg text-stone-600 leading-relaxed mb-6 font-medium">
            البرنامج العربي للحلال هو مبادرة استراتيجية تهدف إلى توحيد معايير الحلال في الدول العربية وتعزيز الثقة في المنتجات المعتمدة.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed mb-6 font-medium">
            نحن نعمل على بناء منظومة اعتراف متبادل تضمن أعلى مستويات الجودة والشرعية، مما يسهل التبادل التجاري ويدعم الاقتصاد الحلال في المنطقة.
          </p>
        </div>
        <div className="bg-[#007A55]/5 rounded-[3rem] p-12 border border-[#007A55]/10 shadow-inner">
           <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#EEB422] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">١</div>
                <span className="text-xl font-bold text-[#004D36]">توحيد المعايير الفنية</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#007A55] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">٢</div>
                <span className="text-xl font-bold text-[#004D36]">تعزيز الثقة في شهادات الحلال</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#004D36] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">٣</div>
                <span className="text-xl font-bold text-[#004D36]">تسهيل النفاذ للأسواق</span>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
