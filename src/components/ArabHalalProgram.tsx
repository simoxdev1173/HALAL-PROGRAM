"use client";

import { useTranslation } from "react-i18next";

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-4 h-4 ${className}`}
  >
    <path
      fillRule="evenodd"
      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
      clipRule="evenodd"
      transform="scale(-1, 1) translate(-24, 0)"
    />
  </svg>
);

const ArabHalalProgram = () => {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const cards = t("homeGuide.cards", { returnObjects: true }) as { title: string; body: string; cta: string }[];

  return (
    <div
      className="relative overflow-hidden bg-[#1C4C2A] text-white min-h-screen flex flex-col justify-center border-y border-stone-800"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Image & Overlay from previous version */}
      <div className="absolute inset-0 z-0">
        <img
          src="/section-bg-1.jpeg"
          alt="Section Background"
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C4C2A]/50 via-[#1C4C2A]/40 to-[#1C4C2A]/40"></div>
      </div>

      {/* Industrial noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://transparenttextures.com/patterns/carbon-fibre.png")' }}></div>

      <section className="relative z-10 py-16 lg:py-24 px-6 md:px-12 flex-grow flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="text-center mb-12 lg:mb-16 relative">
            {/* Structural Title Element */}
            <div className="inline-flex items-center justify-center gap-3 mb-6">
               <div className="w-12 h-1 bg-white/20 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
               <span className="px-4 py-1.5 text-[10px] lg:text-xs font-mono font-bold uppercase tracking-widest text-[#CA8A04] rounded bg-white/5 backdrop-blur-md shadow-[var(--shadow-ind-sharp)] border border-white/10">{t("homeGuide.eyebrow")}</span>
               <div className="w-12 h-1 bg-white/20 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)]"></div>
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-6 tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {t("homeGuide.title")}
            </h2>
            <p className="text-stone-200 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto font-medium">
              {t("homeGuide.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
            {cards.map((card, index) => (
              <div key={card.title} className="relative group bg-white/5 backdrop-blur-md rounded-2xl p-8 flex flex-col border border-white/10 hover:-translate-y-1 transition-all duration-300 cursor-default shadow-xl">
                <div className="mt-6 mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 text-[#CA8A04] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] border border-white/5">
                  <span className="font-mono font-bold text-xl">{String(index + 1).padStart(2, "0")}</span>
                </div>

                <h3 className="text-xl font-black mb-4 text-[#CA8A04] leading-relaxed group-hover:-translate-y-0.5 transition-transform duration-300">
                  {card.title}
                </h3>
                
                <p className="text-stone-200 font-medium leading-relaxed flex-grow text-sm mb-8">
                  {card.body}
                </p>

                <a href="#" className="flex items-center gap-3 font-bold text-sm mt-auto w-fit group/btn transition-colors cursor-pointer text-white hover:text-[#CA8A04]">
                  {card.cta}
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-[var(--shadow-ind-sharp)] bg-white/10 border border-white/10">
                    <ArrowLeftIcon className={`w-3 h-3 transition-transform duration-300 ${isRtl ? "group-hover/btn:-translate-x-1" : "rotate-180 group-hover/btn:translate-x-1"}`} />
                  </div>
                </a>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
};

export default ArabHalalProgram;
