import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

type FormLanguageSwitcherProps = {
  className?: string;
};

export function FormLanguageSwitcher({ className = "" }: FormLanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("en") ? "en" : "ar";

  const switchLanguage = () => {
    void i18n.changeLanguage(lang === "ar" ? "en" : "ar");
  };

  return (
    <div className={`relative inline-flex ${className}`} dir="ltr">
      <button
        type="button"
        onClick={switchLanguage}
        aria-label={lang === "ar" ? "Switch language to English" : "Switch language to Arabic"}
        aria-pressed={lang === "en"}
        className="group relative h-[44px] w-[106px] overflow-hidden rounded-xl border border-stone-300 bg-stone-100 p-1 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.10),inset_-2px_-2px_4px_rgba(255,255,255,0.9),var(--shadow-ind-card)] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.08),var(--shadow-ind-floating)] focus-visible:ring-4 focus-visible:ring-[#CA8A04]/30"
      >
        <span className="absolute inset-x-2 top-1 h-2 rounded-full bg-white/70 shadow-[inset_0_-1px_1px_rgba(0,0,0,0.08)]" />
        <span className="relative z-10 grid h-full grid-cols-2 items-center rounded-lg text-center text-[11px] font-black tracking-widest">
          <span className={lang === "ar" ? "text-white drop-shadow-sm" : "text-stone-700"}>AR</span>
          <span className={lang === "en" ? "text-white drop-shadow-sm" : "text-stone-700"}>EN</span>
        </span>
        <motion.span
          layout
          className="absolute bottom-1 top-1 w-[48px] rounded-lg border border-[#006747]/70 bg-[linear-gradient(145deg,#009164,#006747)] shadow-[4px_5px_10px_rgba(0,0,0,0.18),inset_1px_1px_2px_rgba(255,255,255,0.35),inset_-2px_-2px_4px_rgba(0,0,0,0.24)]"
          animate={{ x: lang === "ar" ? 0 : 50 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          style={{ left: 4 }}
        >
          <span className="absolute left-1 right-1 top-1 h-2 rounded-full bg-white/25" />
          <span className="absolute inset-0 rounded-lg ring-1 ring-white/10" />
        </motion.span>
      </button>
    </div>
  );
}
