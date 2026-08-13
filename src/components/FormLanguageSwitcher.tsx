import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

type FormLanguageSwitcherProps = {
  className?: string;
  compact?: boolean;
};

export function FormLanguageSwitcher({ className = "", compact = false }: FormLanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("en") ? "en" : "ar";

  const switchLanguage = () => {
    void i18n.changeLanguage(lang === "ar" ? "en" : "ar");
  };

  return (
    <div className={`relative ${className || "inline-flex"}`} dir="ltr">
      <button
        type="button"
        onClick={switchLanguage}
        aria-label={lang === "ar" ? "Switch language to English" : "Switch language to Arabic"}
        aria-pressed={lang === "en"}
        className={`relative overflow-hidden rounded-xl border border-stone-300 bg-stone-100 p-1 outline-none transition-colors duration-200 hover:border-stone-400 focus-visible:ring-4 focus-visible:ring-[#CA8A04]/30 ${compact ? "h-10 w-[78px]" : "h-[44px] w-[106px]"}`}
      >
        <span className="relative z-10 grid h-full grid-cols-2 items-center rounded-lg text-center text-[11px] font-black tracking-widest">
          <span className={lang === "ar" ? "text-white" : "text-stone-600"}>AR</span>
          <span className={lang === "en" ? "text-white" : "text-stone-600"}>EN</span>
        </span>
        <motion.span
          layout
          className={`absolute bottom-1 top-1 rounded-lg bg-[#007A55] ${compact ? "w-[34px]" : "w-[48px]"}`}
          animate={{ x: lang === "ar" ? 0 : compact ? 36 : 50 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          style={{ left: 4 }}
        />
      </button>
    </div>
  );
}
