import { useEffect, useRef, useState, type ElementType } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FeatureItem {
  id: number;
  icon?: ElementType;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
}

interface FeaturesProps {
  features: FeatureItem[];
  eyebrow?: string;
  title: string;
  subtitle?: string;
  currentLabel?: string;
  dir?: "rtl" | "ltr";
}

export function Features({ features, eyebrow, title, subtitle, currentLabel = "المحور الحالي", dir = "rtl" }: FeaturesProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const featureRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isRtl = dir === "rtl";

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 90);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = window.setTimeout(() => {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }, 180);

      return () => window.clearTimeout(timeout);
    }
  }, [features.length, progress]);

  useEffect(() => {
    const activeFeatureElement = featureRefs.current[currentFeature];
    const container = containerRef.current;

    if (activeFeatureElement && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeFeatureElement.getBoundingClientRect();

      container.scrollTo({
        left: activeFeatureElement.offsetLeft - (containerRect.width - elementRect.width) / 2,
        behavior: "smooth",
      });
    }
  }, [currentFeature]);

  const activeFeature = features[currentFeature];

  return (
     <section className="relative z-10 py-20 lg:py-32 px-6 overflow-hidden bg-[#FAF9F6] border-y border-stone-300 shadow-[var(--shadow-ind-card)]" dir={dir}>
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#636e72 1px, transparent 1px), linear-gradient(90deg, #636e72 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 text-center lg:mb-16">
          {eyebrow && (
            <span className="inline-flex rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-black text-[#007A55] shadow-[var(--shadow-ind-sharp)]">
              {eyebrow}
            </span>
          )}
          <h2 className="mx-auto mt-5 max-w-4xl text-xl font-black leading-tight text-slate-900 md:text-2xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-xl text-sm font-bold leading-7 text-slate-600 md:text-base">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-16">
          <div
            ref={containerRef}
            className="order-2 flex gap-4 overflow-x-auto pb-4 scroll-smooth lg:order-1 lg:h-full lg:flex-col lg:gap-6 lg:overflow-visible lg:pb-0"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = currentFeature === index;

              return (
                <button
                  key={feature.id}
                  ref={(el) => {
                    featureRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => {
                    setCurrentFeature(index);
                    setProgress(0);
                  }}
                  className={`relative min-w-[270px] flex-shrink-0 rounded-2xl border p-4 ${isRtl ? "text-right" : "text-left"} transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#007A55]/20 md:min-w-[360px] lg:min-w-0 ${
                    isActive
                      ? "border-[#007A55]/30 bg-white shadow-[var(--shadow-ind-floating)]"
                      : "border-stone-200 bg-white/70 shadow-[var(--shadow-ind-card)] hover:border-[#007A55]/20 hover:bg-white"
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex gap-4">
                    {Icon && (
                      <div
                        className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 md:flex ${
                          isActive
                            ? "border-[#CA8A04]/40 bg-gradient-to-br from-[#1C4C2A] to-[#007A55] text-[#CA8A04] shadow-[0_14px_30px_rgba(0,122,85,0.22)]"
                            : "border-stone-200 bg-gradient-to-br from-white to-stone-100 text-[#1C4C2A] shadow-[var(--shadow-ind-card)]"
                        }`}
                      >
                        <Icon className="h-8 w-8" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className={`text-base font-black transition-colors md:text-lg ${isActive ? "text-slate-950" : "text-slate-700"}`}>
                          {feature.title}
                        </h3>
                        <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-black text-stone-500">
                          0{index + 1}
                        </span>
                      </div>
                      <p className={`mt-2 text-sm font-bold leading-7 transition-colors ${isActive ? "text-slate-600" : "text-slate-500"}`}>
                        {feature.description}
                      </p>
                      <div className="mt-4 h-1 overflow-hidden rounded-full bg-stone-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)]">
                        {isActive && (
                          <motion.div
                            className="h-full bg-gradient-to-l from-[#CA8A04] to-[#007A55]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative order-1 mx-auto flex h-full w-full max-w-xl lg:order-2 lg:max-w-none lg:self-stretch">
            <div className="absolute -inset-4 rounded-[2rem] bg-[#007A55]/10 blur-2xl" />
            <div className="relative flex h-full w-full rounded-[2rem] border border-stone-200 bg-white p-3 shadow-[var(--shadow-ind-floating)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 36, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -24, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative min-h-[340px] w-full overflow-hidden rounded-[1.5rem] bg-slate-900 lg:h-full lg:min-h-0"
                >
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={activeFeature.image}
                    alt={activeFeature.imageAlt ?? activeFeature.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-0 right-0 left-0 p-6">
                    <p className="text-xs font-black text-[#CA8A04]">{currentLabel}</p>
                    <p className="mt-2 text-2xl font-black text-white">{activeFeature.title}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
