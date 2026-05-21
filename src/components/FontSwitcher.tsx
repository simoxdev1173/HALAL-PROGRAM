import { useEffect, useState } from "react";

type FontOption = {
  name: string;
  family: string;
  note: string;
};

const HEADING_FONTS: FontOption[] = [
  { name: "Noto Kufi Arabic", family: "'Noto Kufi Arabic'", note: "رسمي وقوي للعناوين" },
  { name: "Changa", family: "'Changa'", note: "حديث وواضح" },
  { name: "Cairo", family: "'Cairo'", note: "متوازن ومألوف" },
  { name: "Noto Naskh Arabic", family: "'Noto Naskh Arabic'", note: "كلاسيكي ومؤسسي" },
  { name: "El Messiri", family: "'El Messiri'", note: "أنيق ومناسب للعناوين الرسمية" },
  { name: "Reem Kufi", family: "'Reem Kufi'", note: "كوفي حديث وهوية عربية واضحة" },
  { name: "Rakkas", family: "'Rakkas'", note: "شخصية قوية للعناوين القصيرة" },
  { name: "Lalezar", family: "'Lalezar'", note: "عريض ولافت للعناوين الكبيرة" },
  { name: "Markazi Text", family: "'Markazi Text'", note: "تراثي أنيق للعناوين العربية" },
  { name: "Parastoo", family: "'Parastoo'", note: "نَسخي واضح بطابع رسمي" },
  { name: "Readex Pro", family: "'Readex Pro'", note: "النمط الحالي" },
];

const BODY_FONTS: FontOption[] = [
  { name: "Noto Sans Arabic", family: "'Noto Sans Arabic'", note: "قراءة ممتازة للنصوص" },
  { name: "Tajawal", family: "'Tajawal'", note: "خفيف وعملي" },
  { name: "IBM Plex Sans Arabic", family: "'IBM Plex Sans Arabic'", note: "احترافي للشاشات" },
  { name: "Almarai", family: "'Almarai'", note: "واضح للنصوص الصغيرة" },
  { name: "Rubik", family: "'Rubik'", note: "حديث ومألوف في الواجهات" },
  { name: "Mada", family: "'Mada'", note: "هادئ ومناسب للنصوص الطويلة" },
  { name: "Harmattan", family: "'Harmattan'", note: "خفيف وواضح للمحتوى الكثيف" },
  { name: "Lateef", family: "'Lateef'", note: "نَسخي ناعم للنص العربي" },
  { name: "Markazi Text", family: "'Markazi Text'", note: "مناسب للفقرات ذات الطابع العربي الكلاسيكي" },
  { name: "Parastoo", family: "'Parastoo'", note: "مقروء للنصوص العربية الرسمية" },
  { name: "Readex Pro", family: "'Readex Pro'", note: "النمط الحالي" },
];

const STORAGE_KEY = "halal-font-preview";

type FontState = {
  heading: string;
  body: string;
};

const DEFAULT_FONTS: FontState = {
  heading: HEADING_FONTS[0].family,
  body: BODY_FONTS[0].family,
};

export default function FontSwitcher() {
  const [isLauncherVisible, setIsLauncherVisible] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [fonts, setFonts] = useState<FontState>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_FONTS, ...JSON.parse(saved) } : DEFAULT_FONTS;
    } catch {
      return DEFAULT_FONTS;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--font-heading-ar", `${fonts.heading}, sans-serif`);
    root.style.setProperty("--font-body-ar", `${fonts.body}, sans-serif`);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fonts));
  }, [fonts]);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setIsLauncherVisible((visible) => {
          if (visible) setIsPanelOpen(false);
          return !visible;
        });
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  if (!isLauncherVisible) return null;

  const selectedHeading = HEADING_FONTS.find((font) => font.family === fonts.heading);
  const selectedBody = BODY_FONTS.find((font) => font.family === fonts.body);

  return (
    <div className="fixed left-4 top-1/2 z-[120] -translate-y-1/2" dir="rtl">
      <button
        type="button"
        onClick={() => setIsPanelOpen((open) => !open)}
        className="h-12 w-12 rounded-md border border-stone-200 bg-white text-[#007A55] shadow-[var(--shadow-ind-floating)] cursor-pointer font-black hover:-translate-y-0.5 active:translate-y-0 active:shadow-[var(--shadow-ind-pressed)]"
        aria-label="تجربة الخطوط"
        title="تجربة الخطوط"
      >
        خط
      </button>

      {isPanelOpen && (
        <div className="absolute left-16 top-1/2 w-[320px] -translate-y-1/2 rounded-xl border border-stone-200 bg-[#FAF9F6] p-4 shadow-[var(--shadow-ind-floating)]">
          <div className="mb-4 flex items-start justify-between gap-4 border-b border-stone-200 pb-3">
            <div>
              <h3 className="text-sm font-black text-stone-900">اختبار الخطوط العربية</h3>
              <p className="mt-1 text-[11px] font-bold text-stone-500">Ctrl + Alt + F لإظهار أو إخفاء الزر</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsPanelOpen(false);
                setIsLauncherVisible(false);
              }}
              className="rounded-md bg-white px-3 py-2 text-xs font-black text-stone-500 shadow-[var(--shadow-ind-card)] hover:text-[#007A55]"
            >
              إخفاء
            </button>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-xs font-black text-stone-700">خط العناوين الكبيرة</span>
              <select
                value={fonts.heading}
                onChange={(e) => setFonts((current) => ({ ...current, heading: e.target.value }))}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-3 text-sm font-bold text-stone-800 outline-none focus:border-[#007A55] focus:ring-4 focus:ring-[#007A55]/10"
              >
                {HEADING_FONTS.map((font) => (
                  <option key={font.family} value={font.family}>
                    {font.name}
                  </option>
                ))}
              </select>
              <span className="mt-1 block text-[11px] font-bold text-stone-500">{selectedHeading?.note}</span>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black text-stone-700">خط النصوص الصغيرة</span>
              <select
                value={fonts.body}
                onChange={(e) => setFonts((current) => ({ ...current, body: e.target.value }))}
                className="w-full rounded-lg border border-stone-200 bg-white px-3 py-3 text-sm font-bold text-stone-800 outline-none focus:border-[#007A55] focus:ring-4 focus:ring-[#007A55]/10"
              >
                {BODY_FONTS.map((font) => (
                  <option key={font.family} value={font.family}>
                    {font.name}
                  </option>
                ))}
              </select>
              <span className="mt-1 block text-[11px] font-bold text-stone-500">{selectedBody?.note}</span>
            </label>
          </div>

          <div className="mt-5 rounded-lg bg-white p-4 shadow-[var(--shadow-ind-card)]">
            <p className="text-2xl font-black leading-tight text-stone-900">البرنامج العربي للحلال</p>
            <p className="mt-2 text-sm font-bold leading-relaxed text-stone-600">
              نموذج سريع لمعاينة وضوح النصوص الصغيرة داخل الواجهة.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
