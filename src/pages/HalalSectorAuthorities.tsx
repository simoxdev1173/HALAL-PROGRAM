import { ExternalLink, Mail, Phone, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { halalSectorAuthorities } from "../data/halalSectorAuthorities";
import { InnerPageHero } from "../components/InternalPage";

const unavailable = "غير متوفر";

const normalizeWebsite = (website: string | null) => {
  if (!website) return null;
  return website.startsWith("http://") || website.startsWith("https://") ? website : `https://${website}`;
};

const previewImage = (screenshot: string | null) => screenshot || "/default-website.jpg";

export default function HalalSectorAuthorities() {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");

  return (
    <main className={`min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF9F6] ${isRtl ? "font-arabic" : "font-english"}`} dir={isRtl ? "rtl" : "ltr"}>
      <InnerPageHero
        title={`${isRtl ? "الجهات المعنية بقطاع الحلال في" : t("pages.authorities.titleBefore")} ${isRtl ? "الدول العربية" : t("pages.authorities.titleHighlight")}`}
        description={isRtl ? "دليل منظم للجهات الحكومية أو الوطنية الأقرب لاختصاص التقييس، المطابقة، أو اعتماد منظومة الحلال في الدول العربية، مع معاينات مباشرة للمواقع وبيانات الاتصال الرسمية المتاحة." : t("pages.authorities.desc")}
        imageSrc="/header-bg.png"
        imageAlt={isRtl ? "الجهات المعنية بقطاع الحلال في الدول العربية" : `${t("pages.authorities.titleBefore")} ${t("pages.authorities.titleHighlight")}`}
      />
      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 mx-auto max-w-[96rem] px-5 lg:px-6">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-5xl text-sm font-bold leading-7 text-slate-600 lg:text-lg">
              {isRtl
                ? "دليل يساعد المستخدم على الوصول بسرعة إلى الجهة الوطنية الأقرب لاختصاص الحلال في كل دولة، مع رابط مباشر للموقع وبيانات اتصال مختصرة."
                : t("pages.authorities.intro")}
            </p>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-black text-slate-700 shadow-[var(--shadow-ind-sharp)] lg:self-auto">
              <RefreshCw size={14} className="text-[#007A55]" />
              <span>{halalSectorAuthorities.length} {isRtl ? "جهة" : "authorities"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
            {halalSectorAuthorities.map((country, index) => {
              const website = normalizeWebsite(country.website);
              const hasContact = country.phone !== unavailable || country.email !== unavailable;

              return (
                <motion.article
                  key={country.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: (index % 6) * 0.035 }}
                  className="group relative flex h-full min-h-[650px] rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)] transition-all duration-300 hover:z-20 hover:-translate-y-1 hover:border-[#CA8A04]/40 hover:shadow-[var(--shadow-ind-floating)]"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-[0.035]" style={{ backgroundImage: "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                  <div className="relative z-10 flex h-full w-full flex-col">
                    <div className="flex min-h-[122px] items-start gap-4">
                      <div className="rounded-[1.35rem] bg-[#FAF9F6] p-2 shadow-[var(--shadow-ind-sharp)]">
                        <img
                          src={`https://flagcdn.com/w320/${country.code}.png`}
                          alt={isRtl ? `علم ${country.officialName}` : t("pages.authorities.flagAlt", { country: country.officialName })}
                          className="h-20 w-32 rounded-2xl object-cover shadow-sm"
                        />
                      </div>
                      <div className="pt-1">
                        <p className="text-xs font-black text-[#CA8A04]">{country.shortName}</p>
                        <h3 className="mt-2 text-xl font-black leading-tight text-slate-900 lg:text-[1.35rem]">{country.officialName}</h3>
                      </div>
                    </div>

                    <div className="mt-6 flex min-h-[315px] flex-col rounded-2xl border border-stone-100 bg-[#FAF9F6] p-5 shadow-[var(--shadow-ind-sharp)]">
                      <div className="flex items-start gap-4">
                        <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-white p-2 shadow-[var(--shadow-ind-sharp)]">
                          <img src={country.logo} alt={isRtl ? `شعار ${country.authority}` : t("pages.authorities.logoAlt", { authority: country.authority })} className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-stone-500">{isRtl ? "الجهة المعنية في الحلال" : t("pages.authorities.authorityLabel")}</p>
                          <h4 className="mt-2 min-h-[84px] text-base font-black leading-7 text-slate-900">{country.authority}</h4>
                        </div>
                      </div>
                      <p
                        className="mt-3 text-sm font-bold leading-7 text-slate-600"
                        style={{ display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                      >
                        {country.intro}
                      </p>
                    </div>

                    <div className="mt-auto grid gap-3 pt-5">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-stone-100 bg-white p-3 shadow-[var(--shadow-ind-sharp)]">
                          <p className="flex items-center gap-1.5 text-[10px] font-black text-stone-400">
                            <Phone size={12} />
                            {isRtl ? "الهاتف" : t("common.phone")}
                          </p>
                          <p className="mt-1 break-words text-xs font-black text-slate-700" dir="ltr">{country.phone}</p>
                        </div>
                        <div className="rounded-xl border border-stone-100 bg-white p-3 shadow-[var(--shadow-ind-sharp)]">
                          <p className="flex items-center gap-1.5 text-[10px] font-black text-stone-400">
                            <Mail size={12} />
                            {isRtl ? "البريد" : t("common.email")}
                          </p>
                          <p className="mt-1 break-words text-xs font-black text-slate-700" dir="ltr">{country.email}</p>
                        </div>
                      </div>

                      <div className="group/site relative">
                        <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-0 z-30 w-full translate-y-2 rounded-2xl border border-stone-200 bg-white p-2 opacity-0 shadow-[var(--shadow-ind-floating)] transition-all duration-300 group-hover/site:translate-y-0 group-hover/site:opacity-100">
                          <div className="overflow-hidden rounded-xl bg-slate-100">
                            <img
                              src={previewImage(country.screenshot)}
                              alt=""
                              className="h-44 w-full object-cover object-top transition-transform duration-700 group-hover/site:scale-105"
                              onError={(event) => {
                                event.currentTarget.src = "/web-screen.png";
                              }}
                            />
                          </div>
                          <div className={`px-2 py-2 ${isRtl ? "text-right" : "text-left"}`}>
                            <p className="text-[10px] font-black text-stone-400">{isRtl ? "معاينة الموقع" : t("common.websitePreview")}</p>
                            <p className="mt-1 truncate text-xs font-black text-slate-800" dir="ltr">{website ?? unavailable}</p>
                            <p className="mt-1 text-[10px] font-bold text-stone-400">
                              {country.lastFetchedAt ? new Date(country.lastFetchedAt).toLocaleDateString(isRtl ? "ar-MA" : "en-US") : hasContact ? "Seed data" : "Awaiting enrichment"}
                            </p>
                          </div>
                        </div>
                        {website ? (
                          <a
                            href={website}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 rounded-xl border border-[#CA8A04]/20 bg-[#CA8A04]/10 p-3 text-center text-xs font-black text-[#7A5200] shadow-[var(--shadow-ind-sharp)] transition-all hover:bg-[#CA8A04] hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/25"
                          >
                            <span>{isRtl ? "الموقع الرسمي" : t("common.officialWebsite")}</span>
                            <ExternalLink size={14} />
                          </a>
                        ) : (
                          <div className="flex items-center justify-center rounded-xl border border-stone-200 bg-stone-100 p-3 text-center text-xs font-black text-stone-500 shadow-[var(--shadow-ind-sharp)]">
                            {isRtl ? "الموقع غير متوفر" : "Website unavailable"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

