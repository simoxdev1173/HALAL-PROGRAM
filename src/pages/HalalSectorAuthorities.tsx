import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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

const englishCountries = [
  {
    shortName: "Jordan",
    officialName: "Hashemite Kingdom of Jordan",
    code: "jo",
    authority: "Jordan Standards and Metrology Organization (JSMO)",
    intro: "A national governmental body for standardization, metrology, and conformity assessment, participating in SMIIC committees related to Halal food, Halal cosmetics, and Halal supply chains.",
    phone: "+962 6 530 1225",
    email: "jsmo@jsmo.gov.jo",
    website: "https://www.jsmo.gov.jo",
  },
  {
    shortName: "UAE",
    officialName: "United Arab Emirates",
    code: "ae",
    authority: "Ministry of Industry and Advanced Technology (MoIAT)",
    intro: "The federal authority supervising the UAE national Halal mark system and publishing registered Halal certification bodies under the Halal program.",
    phone: "Via MoIAT portal",
    email: "AU_STR@moiat.gov.ae",
    website: "https://www.moiat.gov.ae/en/programs/halal",
  },
  {
    shortName: "Bahrain",
    officialName: "Kingdom of Bahrain",
    code: "bh",
    authority: "Halal Department - Ministry of Municipalities Affairs and Agriculture",
    intro: "Bahrain manages a national Halal system linked to GSO requirements and the Gulf Accreditation Center as technical partner for assessing and accrediting Halal certification bodies.",
    phone: "17981000",
    email: "halal@mun.gov.bh",
    website: "https://www.mun.gov.bh/newportal/en/municipal-affairs/services/application-authorization-issue-bahraini-halal-certificate",
  },
  {
    shortName: "Tunisia",
    officialName: "Republic of Tunisia",
    code: "tn",
    authority: "National Institute for Standardization and Industrial Property (INNORPI)",
    intro: "A Tunisian public institution responsible for standardization and conformity certificates, providing certificates for Halal products and participating in related SMIIC committees.",
    phone: "+216 71 806 758",
    email: "innorpi@planet.tn",
    website: "https://www.innorpi.tn",
  },
  {
    shortName: "Algeria",
    officialName: "People's Democratic Republic of Algeria",
    code: "dz",
    authority: "Algerian Institute for Standardization (IANOR)",
    intro: "Algeria's national standardization body, responsible for preparing and publishing national standards and representing Algeria in relevant Islamic technical committees, including Halal matters.",
    phone: "+213 21 78 21 35",
    email: "dg@ianor.dz",
    website: "https://www.ianor.dz",
  },
  {
    shortName: "Djibouti",
    officialName: "Republic of Djibouti",
    code: "dj",
    authority: "Djiboutian Agency for Standardization and Quality Promotion (ADN)",
    intro: "The national body concerned with standardization and quality promotion in Djibouti, participating in SMIIC committees for Halal food, supply chains, and Halal management.",
    phone: "+253 21 35 60 71",
    email: "omar.wais@adnq.org",
    website: "https://smiic.org/en/member/38",
  },
  {
    shortName: "Saudi Arabia",
    officialName: "Kingdom of Saudi Arabia",
    code: "sa",
    authority: "Halal Center - Saudi Food and Drug Authority (SFDA)",
    intro: "Halal Center is the official electronic system for obtaining Halal certification for establishments, including food, pharmaceutical, cosmetic, and service providers.",
    phone: "19999",
    email: "halal@sfda.gov.sa",
    website: "https://www.sfda.gov.sa/en/eservices/69133",
  },
  {
    shortName: "Sudan",
    officialName: "Republic of Sudan",
    code: "sd",
    authority: "Sudanese Standards and Metrology Organization (SSMO)",
    intro: "A national body for standardization, metrology, and quality control, with broad participation in SMIIC committees including Halal food, Halal cosmetics, and Halal management systems.",
    phone: "+249 183 77 52 47",
    email: "info@ssmo.gov.sd",
    website: "https://smiic.org/en/member/13",
  },
  {
    shortName: "Syria",
    officialName: "Syrian Arab Republic",
    code: "sy",
    authority: "Syrian Arab Standards and Metrology Organization (SASMO)",
    intro: "A national body established in 1969 under the Ministry of Industry, responsible for preparing and approving national standards and coordinating standardization and metrology activities.",
    phone: "+963 11 613 1852",
    email: "sasmo@net.sy",
    website: "https://www.iso.org/organization/2116.html",
  },
  {
    shortName: "Somalia",
    officialName: "Federal Republic of Somalia",
    code: "so",
    authority: "Somali Bureau of Standards (SOBS)",
    intro: "Somalia's national standards bureau, representing the country in SMIIC committees concerned with Halal food, cosmetics, and Halal supply chains.",
    phone: "+252 61 0742473",
    email: "dg@sobs.gov.so",
    website: "https://smiic.org/en/member/14",
  },
  {
    shortName: "Iraq",
    officialName: "Republic of Iraq",
    code: "iq",
    authority: "Central Organization for Standardization and Quality Control (COSQC)",
    intro: "An official Iraqi body affiliated with the Ministry of Planning, responsible for standards and quality control and representing Iraq in several SMIIC committees related to Halal.",
    phone: "+964 1 776 1980",
    email: "cosqc@cosqc.gov.iq",
    website: "https://www.cosqc.gov.iq",
  },
  {
    shortName: "Oman",
    officialName: "Sultanate of Oman",
    code: "om",
    authority: "Ministry of Commerce, Industry and Investment Promotion - Directorate General for Standards and Metrology",
    intro: "The Directorate General for Standards and Metrology is Oman's national standardization body within the Ministry of Commerce, Industry and Investment Promotion, managing conformity and market-related standards activities.",
    phone: "+968 80000070",
    email: "info@Tejarah.om",
    website: "https://gov.om/en/ministry-of-commerce-industry-and-investment-promotion",
  },
  {
    shortName: "Palestine",
    officialName: "State of Palestine",
    code: "ps",
    authority: "Palestine Standards Institution (PSI)",
    intro: "A national institution established in 1996 working in standardization, certification, and metrology, and participating in SMIIC committees including Halal food and Halal management systems.",
    phone: "+970 2 298 9014",
    email: "info@psi.pna.ps",
    website: "https://www.psi.pna.ps",
  },
  {
    shortName: "Qatar",
    officialName: "State of Qatar",
    code: "qa",
    authority: "Qatar General Organization for Standards and Metrology (QS)",
    intro: "Develops and publishes Qatari and Gulf standards and technical regulations, grants quality and conformity marks, and participates in SMIIC committees for Halal food.",
    phone: "+974 4034 4444",
    email: "standard@qs.gov.qa",
    website: "https://smiic.org/en/member/42",
  },
  {
    shortName: "Kuwait",
    officialName: "State of Kuwait",
    code: "kw",
    authority: "Public Authority for Industry - Standards and Metrology Department (PAI)",
    intro: "The Standards and Metrology Department within the Public Authority for Industry handles standardization, laboratories, and quality activities, and represents Kuwait in SMIIC Halal-related committees.",
    phone: "+965 25302990",
    email: "m.aladwani@pai.gov.kw",
    website: "https://www.pai.gov.kw",
  },
  {
    shortName: "Lebanon",
    officialName: "Lebanese Republic",
    code: "lb",
    authority: "Lebanese Standards Institution (LIBNOR)",
    intro: "An independent public institution concerned with preparing and publishing Lebanese standards and granting the conformity mark. It is a SMIIC member and observes Halal committees.",
    phone: "+961 1 485 927",
    email: "libnor@libnor.org",
    website: "https://www.libnor.org",
  },
  {
    shortName: "Libya",
    officialName: "State of Libya",
    code: "ly",
    authority: "Libyan National Centre for Standardization and Metrology (LNCSM)",
    intro: "A Libyan governmental institution established in 1991 that prepares national standards, grants the quality mark, accredits inspection bodies, and participates in SMIIC Halal committees.",
    phone: "+218 21 462 7280",
    email: "info@lncsm.org.ly",
    website: "https://www.lncsm.org.ly",
  },
  {
    shortName: "Egypt",
    officialName: "Arab Republic of Egypt",
    code: "eg",
    authority: "Egyptian Organization for Standardization and Quality (EOS)",
    intro: "Egypt's official body for standardization, quality, and industrial metrology, participating in SMIIC committees for Halal food and Halal cosmetics.",
    phone: "+202 22845522",
    email: "eos@eos.org.eg",
    website: "https://www.eos.org.eg",
  },
  {
    shortName: "Morocco",
    officialName: "Kingdom of Morocco",
    code: "ma",
    authority: "Moroccan Institute for Standardization (IMANOR)",
    intro: "Morocco's official standardization institute responsible for standards, certification, and technical information, participating in multiple SMIIC committees related to Halal.",
    phone: "+212 5 37 57 19 48",
    email: "imanor@imanor.gov.ma",
    website: "https://www.imanor.ma",
  },
  {
    shortName: "Mauritania",
    officialName: "Islamic Republic of Mauritania",
    code: "mr",
    authority: "National Office for Standardization and Metrology (ONANOR)",
    intro: "A public institution responsible for standardization, metrology, and conformity assessment in Mauritania, appearing among SMIIC members and observers in Halal committees.",
    phone: "BP 387 - Nouakchott",
    email: "contact@onanor.mr",
    website: "https://onanor.mr",
  },
  {
    shortName: "Yemen",
    officialName: "Republic of Yemen",
    code: "ye",
    authority: "Yemen Standardization, Metrology and Quality Control Organization (YSMO)",
    intro: "The sole authority responsible for preparing and developing standards and managing standardization and quality activities in Yemen, appearing among SMIIC members.",
    phone: "+967 2 230 973",
    email: "ysmo.aden.Yemen@gmail.com",
    website: "https://www.ysmo.org",
  },
];

export default function HalalSectorAuthorities() {
  const { t, i18n } = useTranslation();
  const isRtl = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("ar");
  const displayCountries = isRtl ? countries : englishCountries;

  return (
    <main className={`min-h-screen overflow-hidden bg-[#FAF9F6] pt-24 ${isRtl ? "font-arabic" : "font-english"}`} dir={isRtl ? "rtl" : "ltr"}>
      <section className="relative overflow-hidden bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src="/slider/i-1.png" alt={isRtl ? "الجهات المعنية بقطاع الحلال في الدول العربية" : `${t("pages.authorities.titleBefore")} ${t("pages.authorities.titleHighlight")}`} className="h-full w-full object-cover opacity-28" />
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
              {isRtl ? "دليل الدول العربية" : t("pages.authorities.badge")}
            </div>
            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
              {isRtl ? "الجهات المعنية بقطاع الحلال في" : t("pages.authorities.titleBefore")} <span className="text-[#CA8A04]">{isRtl ? "الدول العربية" : t("pages.authorities.titleHighlight")}</span>
            </h1>
            <p className="mt-7 max-w-3xl text-base font-bold leading-9 text-stone-100 lg:text-xl">
              {isRtl ? "دليل منظم للجهات الحكومية أو الوطنية الأقرب لاختصاص التقييس، المطابقة، أو اعتماد منظومة الحلال في الدول العربية، مع بيانات الاتصال الرسمية المتاحة." : t("pages.authorities.desc")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 opacity-[0.018]" style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 mx-auto max-w-[96rem] px-5 lg:px-6">
          <div className="mb-10 flex flex-col gap-4  lg:items-center lg:justify-between">
          
            <p className="max-w-5xl text-sm font-bold leading-7 text-slate-600 lg:text-lg">
              {isRtl ? "دليل يساعد المستخدم على الوصول بسرعة إلى الجهة الوطنية الأقرب لاختصاص الحلال في كل دولة، مع رابط مباشر للموقع وبيانات اتصال مختصرة." : t("pages.authorities.intro")}
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayCountries.map((country, index) => (
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
                          alt={isRtl ? `علم ${country.officialName}` : t("pages.authorities.flagAlt", { country: country.officialName })}
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
                        <img src={AUTHORITY_LOGO} alt={isRtl ? `شعار ${country.authority}` : t("pages.authorities.logoAlt", { authority: country.authority })} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-stone-500">{isRtl ? "الجهة المعنية في الحلال" : t("pages.authorities.authorityLabel")}</p>
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
                      <p className="text-[10px] font-black text-stone-400">{isRtl ? "الهاتف" : t("common.phone")}</p>
                      <p className="mt-1 break-words text-xs font-black text-slate-700" dir="ltr">{country.phone}</p>
                    </div>
                    <div className="rounded-xl border border-stone-100 bg-white p-3 shadow-[var(--shadow-ind-sharp)]">
                      <p className="text-[10px] font-black text-stone-400">{isRtl ? "البريد" : t("common.email")}</p>
                      <p className="mt-1 break-words text-xs font-black text-slate-700" dir="ltr">{country.email}</p>
                    </div>
                    <div className="group/site relative">
                      <div className="pointer-events-none absolute bottom-[calc(100%+12px)] left-0 z-30 w-full translate-y-2 rounded-2xl border border-stone-200 bg-white p-2 opacity-0 shadow-[var(--shadow-ind-floating)] transition-all duration-300 group-hover/site:translate-y-0 group-hover/site:opacity-100">
                        <img src="/web-screen.png" alt="" className="h-36 w-full rounded-xl object-cover" />
                        <div className={`px-2 py-2 ${isRtl ? "text-right" : "text-left"}`}>
                          <p className="text-[10px] font-black text-stone-400">{isRtl ? "معاينة الموقع" : t("common.websitePreview")}</p>
                          <p className="mt-1 truncate text-xs font-black text-slate-800" dir="ltr">{country.website}</p>
                        </div>
                      </div>
                      <a
                        href={country.website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center rounded-xl border border-[#CA8A04]/20 bg-[#CA8A04]/10 p-3 text-center text-xs font-black text-[#7A5200] shadow-[var(--shadow-ind-sharp)] transition-all hover:bg-[#CA8A04] hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-[#CA8A04]/25"
                      >
                        {isRtl ? "الموقع الرسمي" : t("common.officialWebsite")}
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
