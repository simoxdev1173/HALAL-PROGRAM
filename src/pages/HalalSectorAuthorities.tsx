import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AUTHORITY_LOGO = "https://www.imanor.gov.ma/wp-content/uploads/2016/04/Imanor2-300x146.png";

const countries = [
  {
    shortName: "الأردن",
    officialName: "المملكة الأردنية الهاشمية",
    code: "jo",
    authority: "مؤسسة المواصفات والمقاييس الأردنية (JSMO)",
    intro: "جهة حكومية وطنية للتقييس والمترولوجيا وتقييم المطابقة، وتشارك في لجان SMIIC الخاصة بالغذاء الحلال ومستحضرات التجميل الحلال وسلاسل الإمداد الحلال.",
    phone: "+962 6 530 1225",
    email: "jsmo@jsmo.gov.jo",
    website: "https://www.jsmo.gov.jo",
  },
  {
    shortName: "الإمارات",
    officialName: "دولة الإمارات العربية المتحدة",
    code: "ae",
    authority: "وزارة الصناعة والتكنولوجيا المتقدمة (MoIAT)",
    intro: "الجهة الاتحادية المشرفة على منظومة علامة الحلال الوطنية في الإمارات، وتنشر قوائم جهات منح شهادات الحلال المسجلة ضمن برنامج الحلال.",
    phone: "عبر بوابة MoIAT",
    email: "AU_STR@moiat.gov.ae",
    website: "https://www.moiat.gov.ae/en/programs/halal",
  },
  {
    shortName: "البحرين",
    officialName: "مملكة البحرين",
    code: "bh",
    authority: "إدارة الحلال - وزارة شؤون البلديات والزراعة",
    intro: "تدير البحرين منظومة وطنية للحلال مرتبطة بمتطلبات GSO وبالشريك الفني مركز الاعتماد الخليجي لتقييم واعتماد جهات منح شهادات الحلال.",
    phone: "17981000",
    email: "halal@mun.gov.bh",
    website: "https://www.mun.gov.bh/newportal/en/municipal-affairs/services/application-authorization-issue-bahraini-halal-certificate",
  },
  {
    shortName: "تونس",
    officialName: "الجمهورية التونسية",
    code: "tn",
    authority: "المعهد الوطني للمواصفات والملكية الصناعية (INNORPI)",
    intro: "مؤسسة عمومية تونسية مسؤولة عن التقييس وشهادات المطابقة، وتقدم شهادات للمنتجات الحلال وتشارك في لجان SMIIC ذات الصلة.",
    phone: "+216 71 806 758",
    email: "innorpi@planet.tn",
    website: "https://www.innorpi.tn",
  },
  {
    shortName: "الجزائر",
    officialName: "الجمهورية الجزائرية الديمقراطية الشعبية",
    code: "dz",
    authority: "المعهد الجزائري للتقييس (IANOR)",
    intro: "الهيئة الوطنية للتقييس في الجزائر، تعنى بإعداد المعايير الوطنية ونشرها وتمثيل الجزائر في اللجان الفنية الإسلامية ومنها قضايا الحلال.",
    phone: "+213 21 78 21 35",
    email: "dg@ianor.dz",
    website: "https://www.ianor.dz",
  },
  {
    shortName: "جيبوتي",
    officialName: "جمهورية جيبوتي",
    code: "dj",
    authority: "الوكالة الجيبوتية للتقييس وترقية الجودة (ADN)",
    intro: "الجهة الوطنية المعنية بالتقييس وترقية الجودة في جيبوتي، وتشارك في لجان SMIIC لقضايا الغذاء الحلال وسلسلة الإمداد وإدارة الحلال.",
    phone: "+253 21 35 60 71",
    email: "omar.wais@adnq.org",
    website: "https://smiic.org/en/member/38",
  },
  {
    shortName: "السعودية",
    officialName: "المملكة العربية السعودية",
    code: "sa",
    authority: "مركز حلال - الهيئة العامة للغذاء والدواء (SFDA)",
    intro: "مركز حلال هو النظام الإلكتروني الرسمي للحصول على شهادة حلال للمنشآت ويشمل المنتجات الغذائية والدوائية ومستحضرات التجميل ومقدمي الخدمات.",
    phone: "19999",
    email: "halal@sfda.gov.sa",
    website: "https://www.sfda.gov.sa/en/eservices/69133",
  },
  {
    shortName: "السودان",
    officialName: "جمهورية السودان",
    code: "sd",
    authority: "الهيئة السودانية للمواصفات والمقاييس (SSMO)",
    intro: "جهة وطنية للتقييس والمترولوجيا وضبط الجودة، ولها مشاركة واسعة في لجان SMIIC بما في ذلك الغذاء الحلال ومستحضرات التجميل الحلال ونظم إدارة الحلال.",
    phone: "+249 183 77 52 47",
    email: "info@ssmo.gov.sd",
    website: "https://smiic.org/en/member/13",
  },
  {
    shortName: "سوريا",
    officialName: "الجمهورية العربية السورية",
    code: "sy",
    authority: "هيئة المواصفات والمقاييس العربية السورية (SASMO)",
    intro: "هيئة وطنية تأسست عام 1969 وتتبع لوزارة الصناعة، وتعنى بإعداد واعتماد المواصفات الوطنية وتنسيق أنشطة التقييس والمترولوجيا.",
    phone: "+963 11 613 1852",
    email: "sasmo@net.sy",
    website: "https://www.iso.org/organization/2116.html",
  },
  {
    shortName: "الصومال",
    officialName: "جمهورية الصومال الفيدرالية",
    code: "so",
    authority: "المكتب الصومالي للمواصفات (SOBS)",
    intro: "المكتب الوطني للمواصفات في الصومال، ويمثل البلاد في لجان SMIIC الخاصة بقضايا الغذاء الحلال ومستحضرات التجميل وسلاسل الإمداد الحلال.",
    phone: "+252 61 0742473",
    email: "dg@sobs.gov.so",
    website: "https://smiic.org/en/member/14",
  },
  {
    shortName: "العراق",
    officialName: "جمهورية العراق",
    code: "iq",
    authority: "الجهاز المركزي للتقييس والسيطرة النوعية (COSQC)",
    intro: "جهة عراقية رسمية تابعة لوزارة التخطيط، مسؤولة عن المواصفات والسيطرة النوعية وتمثل العراق في عدد من لجان SMIIC الخاصة بالحلال.",
    phone: "+964 1 776 1980",
    email: "cosqc@cosqc.gov.iq",
    website: "https://www.cosqc.gov.iq",
  },
  {
    shortName: "عُمان",
    officialName: "سلطنة عُمان",
    code: "om",
    authority: "وزارة التجارة والصناعة وترويج الاستثمار - المديرية العامة للمواصفات والمقاييس",
    intro: "المديرية العامة للمواصفات والمقاييس هي الجهة الوطنية للتقييس ضمن وزارة التجارة والصناعة وترويج الاستثمار، وتدير أنشطة المطابقة والمعايير المرتبطة بالسوق العماني.",
    phone: "+968 80000070",
    email: "info@Tejarah.om",
    website: "https://gov.om/en/ministry-of-commerce-industry-and-investment-promotion",
  },
  {
    shortName: "فلسطين",
    officialName: "دولة فلسطين",
    code: "ps",
    authority: "مؤسسة المواصفات والمقاييس الفلسطينية (PSI)",
    intro: "مؤسسة وطنية بدأت عملها عام 1996 وتعمل في التقييس والشهادات والمترولوجيا، وتشارك في لجان SMIIC ومنها الغذاء الحلال ونظم إدارة الحلال.",
    phone: "+970 2 298 9014",
    email: "info@psi.pna.ps",
    website: "https://www.psi.pna.ps",
  },
  {
    shortName: "قطر",
    officialName: "دولة قطر",
    code: "qa",
    authority: "الهيئة العامة القطرية للمواصفات والتقييس (QS)",
    intro: "تطور وتنشر المواصفات واللوائح الفنية القطرية والخليجية، وتمنح علامات الجودة والمطابقة وتشارك في لجان SMIIC الخاصة بالغذاء الحلال.",
    phone: "+974 4034 4444",
    email: "standard@qs.gov.qa",
    website: "https://smiic.org/en/member/42",
  },
  {
    shortName: "الكويت",
    officialName: "دولة الكويت",
    code: "kw",
    authority: "الهيئة العامة للصناعة - إدارة المواصفات والمقاييس (PAI)",
    intro: "تتولى إدارة المواصفات والمقاييس ضمن الهيئة العامة للصناعة أنشطة التقييس والمختبرات والجودة وتمثل الكويت في لجان SMIIC ذات الصلة بالحلال.",
    phone: "+965 25302990",
    email: "m.aladwani@pai.gov.kw",
    website: "https://www.pai.gov.kw",
  },
  {
    shortName: "لبنان",
    officialName: "الجمهورية اللبنانية",
    code: "lb",
    authority: "مؤسسة المقاييس والمواصفات اللبنانية (LIBNOR)",
    intro: "مؤسسة عامة مستقلة معنية بإعداد ونشر المواصفات اللبنانية ومنح علامة المطابقة، وهي عضو في SMIIC ولها دور رصد في لجان الحلال.",
    phone: "+961 1 485 927",
    email: "libnor@libnor.org",
    website: "https://www.libnor.org",
  },
  {
    shortName: "ليبيا",
    officialName: "دولة ليبيا",
    code: "ly",
    authority: "المركز الوطني للمواصفات والمعايير القياسية (LNCSM)",
    intro: "مؤسسة حكومية ليبية تأسست عام 1991 وتعمل على إعداد المواصفات الوطنية ومنح علامة الجودة واعتماد جهات التفتيش، وتشارك في لجان SMIIC للحلال.",
    phone: "+218 21 462 7280",
    email: "info@lncsm.org.ly",
    website: "https://www.lncsm.org.ly",
  },
  {
    shortName: "مصر",
    officialName: "جمهورية مصر العربية",
    code: "eg",
    authority: "الهيئة المصرية العامة للمواصفات والجودة (EOS)",
    intro: "الجهة الرسمية المختصة بالتقييس والجودة والمترولوجيا الصناعية في مصر، وتشارك في لجان SMIIC الخاصة بالغذاء الحلال ومستحضرات التجميل الحلال.",
    phone: "+202 22845522",
    email: "eos@eos.org.eg",
    website: "https://www.eos.org.eg",
  },
  {
    shortName: "المغرب",
    officialName: "المملكة المغربية",
    code: "ma",
    authority: "المعهد المغربي للتقييس (IMANOR)",
    intro: "المعهد الرسمي للتقييس بالمغرب والمسؤول عن إعداد المواصفات والشهادات ونشر المعلومات الفنية، ويشارك في لجان SMIIC المتعددة المرتبطة بالحلال.",
    phone: "+212 5 37 57 19 48",
    email: "imanor@imanor.gov.ma",
    website: "https://www.imanor.ma",
  },
  {
    shortName: "موريتانيا",
    officialName: "الجمهورية الإسلامية الموريتانية",
    code: "mr",
    authority: "المكتب الوطني للتقييس والمترولوجيا (ONANOR)",
    intro: "مؤسسة عمومية مكلفة بالتقييس والمترولوجيا وتقييم المطابقة في موريتانيا، وتظهر ضمن أعضاء SMIIC ومراقبي لجان الحلال.",
    phone: "BP 387 - نواكشوط",
    email: "contact@onanor.mr",
    website: "https://onanor.mr",
  },
  {
    shortName: "اليمن",
    officialName: "الجمهورية اليمنية",
    code: "ye",
    authority: "الهيئة اليمنية للمواصفات والمقاييس وضبط الجودة (YSMO)",
    intro: "الجهة الوحيدة المسؤولة عن إعداد وتطوير المواصفات وإدارة أنشطة التقييس والجودة في اليمن، وتظهر ضمن أعضاء SMIIC.",
    phone: "+967 2 230 973",
    email: "ysmo.aden.Yemen@gmail.com",
    website: "https://www.ysmo.org",
  },
];

export default function HalalSectorAuthorities() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF9F6] pt-24 font-arabic" dir="rtl">
      <section className="relative overflow-hidden bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src="/slider/i-1.png" alt="الجهات المعنية بقطاع الحلال في الدول العربية" className="h-full w-full object-cover opacity-28" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/76 via-[#1C4C2A]/78 to-[#FAF9F6]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#CA8A04] shadow-[var(--shadow-ind-sharp)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#007A55] shadow-[0_0_12px_rgba(0,122,85,.9)]" />
              دليل الدول العربية
            </div>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
              الجهات المعنية بقطاع الحلال في <span className="text-[#CA8A04]">الدول العربية</span>
            </h1>
            <p className="mt-7 max-w-3xl text-base font-bold leading-9 text-stone-100 lg:text-xl">
              دليل منظم للجهات الحكومية أو الوطنية الأقرب لاختصاص التقييس، المطابقة، أو اعتماد منظومة الحلال في الدول العربية، مع بيانات الاتصال الرسمية المتاحة.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 mx-auto max-w-[96rem] px-5 lg:px-6">
          <div className="mb-10 flex flex-col gap-4  lg:items-center lg:justify-between">
          
            <p className="max-w-5xl text-sm font-bold leading-7 text-slate-600 lg:text-lg">
              دليل يساعد المستخدم على الوصول بسرعة إلى الجهة الوطنية الأقرب لاختصاص الحلال في كل دولة، مع رابط مباشر للموقع وبيانات اتصال مختصرة.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
            {countries.map((country, index) => (
              <motion.article
                key={country.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: (index % 6) * 0.035 }}
                className="group relative flex h-full min-h-[650px] rounded-2xl border border-stone-200 bg-white p-5 shadow-[var(--shadow-ind-card)] transition-all duration-300 hover:z-20 hover:-translate-y-1 hover:border-[#CA8A04]/40 hover:shadow-[var(--shadow-ind-floating)]"
              >
                <div className="absolute inset-0 rounded-2xl opacity-[0.035]" style={{ backgroundImage: "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="relative z-10 flex h-full w-full flex-col">
                  <div className="flex min-h-[122px] items-start gap-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-[1.35rem] bg-[#FAF9F6] p-2 shadow-[var(--shadow-ind-sharp)]">
                        <img
                          src={`https://flagcdn.com/w320/${country.code}.png`}
                          alt={`علم ${country.officialName}`}
                          className="h-20 w-32 rounded-2xl object-cover shadow-sm"
                        />
                      </div>
                      <div className="pt-1">
                        <p className="text-xs font-black text-[#CA8A04]">{country.shortName}</p>
                        <h3 className="mt-2 text-xl font-black leading-tight text-slate-900 lg:text-[1.35rem]">{country.officialName}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex min-h-[315px] flex-col rounded-2xl border border-stone-100 bg-[#FAF9F6] p-5 shadow-[var(--shadow-ind-sharp)]">
                    <div className="flex items-start gap-4">
                      <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white p-2 shadow-[var(--shadow-ind-sharp)]">
                        <img src={AUTHORITY_LOGO} alt={`شعار ${country.authority}`} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-stone-500">الجهة المعنية في الحلال</p>
                        <h4 className="mt-2 min-h-[84px] text-base font-black leading-7 text-slate-900">{country.authority}</h4>
                      </div>
                    </div>
                    <p
                      className="mt-3 text-sm font-bold leading-7 text-slate-600"
                      style={{ display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    >
                      {country.intro}
                    </p>
                  </div>

                  <div className="mt-auto grid gap-3 pt-5">
                    <div className="rounded-xl border border-stone-100 bg-white p-3 shadow-[var(--shadow-ind-sharp)]">
                      <p className="text-[10px] font-black text-stone-400">الهاتف</p>
                      <p className="mt-1 break-words text-xs font-black text-slate-700" dir="ltr">{country.phone}</p>
                    </div>
                    <div className="rounded-xl border border-stone-100 bg-white p-3 shadow-[var(--shadow-ind-sharp)]">
                      <p className="text-[10px] font-black text-stone-400">البريد</p>
                      <p className="mt-1 break-words text-xs font-black text-slate-700" dir="ltr">{country.email}</p>
                    </div>
                    <div className="group/site relative">
                      <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-0 z-30 w-full translate-y-2 rounded-2xl border border-stone-200 bg-white p-2 opacity-0 shadow-[var(--shadow-ind-floating)] transition-all duration-300 group-hover/site:translate-y-0 group-hover/site:opacity-100">
                        <img src="/web-screen.png" alt="" className="h-36 w-full rounded-xl object-cover" />
                        <div className="px-2 py-2 text-right">
                          <p className="text-[10px] font-black text-stone-400">معاينة الموقع</p>
                          <p className="mt-1 truncate text-xs font-black text-slate-800" dir="ltr">{country.website}</p>
                        </div>
                      </div>
                      <a
                        href={country.website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center rounded-xl border border-[#CA8A04]/20 bg-[#CA8A04]/10 p-3 text-center text-xs font-black text-[#7A5200] shadow-[var(--shadow-ind-sharp)] transition-all hover:bg-[#CA8A04] hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/25"
                      >
                        الموقع الرسمي
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
