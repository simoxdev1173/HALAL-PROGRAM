import { motion } from "framer-motion";

interface AINoticeProps {
  message: string;
  label: string;
}

export const AINotice = ({ message, label }: AINoticeProps) => {
  const isArabic = /[\u0600-\u06FF]/.test(`${message} ${label}`);
  const ctaLabel = isArabic ? "اضغط للسؤال" : "Tap to ask";

  const handleClick = () => {
    const event = new CustomEvent("trigger-chatbot", {
      detail: { message },
    });
    window.dispatchEvent(event);
  };

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      aria-label={`${label}`}
      className="group relative flex max-w-[280px] cursor-pointer items-center gap-2.5 text-start focus-visible:outline-none"
    >
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative shrink-0"
      >
        <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-[#007A55]/20 bg-white shadow-[0_14px_28px_-18px_rgba(0,77,54,0.75)] ring-4 ring-[#007A55]/8 transition-all duration-300 group-hover:border-[#007A55]/45 group-hover:ring-[#007A55]/16 group-focus-visible:ring-[#CA8A04]/30">
          {isArabic ? (
           <img
              src="/ai-logo-3.png"
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            
             <img
              src="/ai-logo-1.png"
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
         
        </div>
      </motion.div>

      <div
        className="relative min-w-0 rounded-2xl border border-stone-200 bg-white px-3.5 py-2.5 shadow-[0_16px_34px_-24px_rgba(15,23,42,0.75)] transition-all duration-300 after:absolute after:top-4 after:-start-1.5 after:h-3 after:w-3 after:rotate-45 after:border-b after:border-s after:border-stone-200 after:bg-white group-hover:-translate-y-0.5 group-hover:border-[#007A55]/35 group-hover:bg-[#F8FFFB] group-hover:after:border-[#007A55]/35 group-hover:after:bg-[#F8FFFB] group-focus-visible:ring-4 group-focus-visible:ring-[#007A55]/18"
      >
        <span className="block text-xs font-black leading-5 text-slate-950">
          {label}
        </span>
        <span className="mt-1 inline-flex items-center rounded-full bg-[#007A55]/8 px-2 py-0.5 text-[9px] font-black leading-4 text-[#006B4B] transition-colors group-hover:bg-[#007A55] group-hover:text-white">
          {ctaLabel}
        </span>
      </div>
    </motion.button>
  );
};
