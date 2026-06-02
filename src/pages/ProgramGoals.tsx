import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Features } from "../components/ui/features";

type PremiumIconProps = {
  className?: string;
};

const TradeSeal = ({ className }: PremiumIconProps) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M32 6 52 17.5v29L32 58 12 46.5v-29L32 6Z" fill="currentColor" opacity=".14" />
    <path d="M32 8.8 49.5 18.9v26.2L32 55.2 14.5 45.1V18.9L32 8.8Z" stroke="currentColor" strokeWidth="3" />
    <path d="M20 36.5h24M23 29h18M28 21.5h8" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
  </svg>
);

const ConsumerSeal = ({ className }: PremiumIconProps) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M32 7 51 14v15.5C51 42.4 43.4 51.2 32 57 20.6 51.2 13 42.4 13 29.5V14l19-7Z" fill="currentColor" opacity=".14" />
    <path d="M32 10.5 47.5 16v13.2c0 10.5-5.8 18-15.5 23.2-9.7-5.2-15.5-12.7-15.5-23.2V16L32 10.5Z" stroke="currentColor" strokeWidth="3" />
    <path d="m24.5 31.5 5.3 5.4 10.7-12" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StandardSeal = ({ className }: PremiumIconProps) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M17 9h22l8 8v38H17V9Z" fill="currentColor" opacity=".14" />
    <path d="M17 9h22l8 8v38H17V9Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <path d="M38.5 10.5V18H46" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    <path d="M24 29h16M24 37h16M24 45h10" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
  </svg>
);

const AuditSeal = ({ className }: PremiumIconProps) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M30 10a20 20 0 1 0 0 40 20 20 0 0 0 0-40Z" fill="currentColor" opacity=".14" />
    <path d="M30 13a17 17 0 1 0 0 34 17 17 0 0 0 0-34Z" stroke="currentColor" strokeWidth="3" />
    <path d="M43 43 53 53" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="m22.5 30.5 4.7 4.8 9.8-11" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const goalFeatures = [
  {
    id: 1,
    icon: TradeSeal,
    title: "تسهيل التبادل التجاري",
    description: " تسهيل التبادل التجاري للمنتجات الحلال بين الدول العربية.",
    image: "/goals-slider/goals-1.png",
  },
  {
    id: 2,
    icon: ConsumerSeal,
    title: "حماية المستهلك المسلم",
    description: "حماية المستهلك المسلم في جميع الدول من علامات وشهادات الحلال غير المعتمدة.",
    image: "/goals-slider/goals-2-3.png",
  },
  {
    id: 3,
    icon: StandardSeal,
    title: "مطابقة المنتجات الأجنبية",
    description: "ضمان مطابقة المنتجات الأجنبية لمتطلبات مواصفات الحلال العربية.",
    image: "/goals-slider/goals-3-1.png",
  },
  {
    id: 4,
    icon: AuditSeal,
    title: "إجراءات تقييم المطابقة",
    description: "يهدف إلى توضيح إجراءات تقييم المطابقة التي يجب على المورِّدين الراغبين بالحصول على شهادة الحلال العربية الالتزام بها، وذلك لضمان حِل هذه المنتجات من خلال استيفائها لمتطلبات الحلال وفقاً لأحكام الشريعة الإسلامية، بما يضمن الحفاظ على صحة وسلامة المستهلك وتسهيل تداول المنتجات الحلال. ",
    image: "/goals-slider/goals-4-1.png",
  },
];

const goalsTitle =
  "يهدف هذا البرنامج إلى تسهيل التبادل التجاري للمنتجات الحلال بين الدول العربية، وحماية المستهلك المسلم، وضمان مطابقة المنتجات الأجنبية لمتطلبات مواصفات الحلال العربية";

export default function ProgramGoals() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-20 font-arabic overflow-hidden" dir="rtl">
 
         <section className="relative w-full h-[50vh] lg:h-[60vh] min-h-[400px] lg:min-h-[500px] overflow-hidden pt-20 flex items-center justify-center border-b border-stone-300 shadow-[var(--shadow-ind-card)]">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="/about-us-bg.png"
            alt="عن البرنامج العربي للحلال"
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
               أهداف <span className="text-[#CA8A04]">البرنامج العربي للحلال</span>
            </h1>
          </motion.div>
        </div>

      </section>
      <Features
        eyebrow="أهداف"
        title={goalsTitle}
        features={goalFeatures}
      />

    </main>
  );
}
