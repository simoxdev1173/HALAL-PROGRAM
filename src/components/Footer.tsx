import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ChevronLeft,
  Sparkles,
  MessageSquareText
} from 'lucide-react';

interface FooterProps {
  lang: 'ar' | 'en';
  onChatOpen?: () => void;
}

const Footer: React.FC<FooterProps> = ({ lang, onChatOpen }) => {
  const isRtl = lang === 'ar';
  const { t } = useTranslation();

  const content = {
    ar: {
      cta: {
        badge: "دعم مدعوم بالذكاء الاصطناعي",
        title: "لديك استفسار؟ تحدث مع مساعدنا الذكي",
        desc: "مساعدنا متاح على مدار الساعة للإجابة الفورية على تساؤلاتكم حول الاعتماد والبرنامج العربي للحلال.",
        btn1: "بدء المحادثة",
        btn2: "طلب الترخيص"
      },
      brand: {
        name: "البرنامج العربي للحلال"
      },
      links: {
        title: "الاستكشاف وخريطة الموقع",
        items: [
          { name: "عن البرنامج", href: "/about-us" },
          { name: "التحقق من شهادة", href: "/#standards" },
          { name: "الانضمام للبرنامج", href: "/join-program" },
        ]
      },
      support: {
        title: "الدعم الفني",
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        send: "إرسال الطلب"
      },
      contact: {
        title: "تواصل مهني",
        email: "halal@aidsmo.org",
        phone: "+212 537 276 000",
        address: "شارع فرنسا، الرباط، المملكة المغربية"
      },
      copyright: "© 2026 البرنامج العربي للحلال. جميع الحقوق محفوظة."
    },
    en: {
      cta: {
        badge: "AI Powered Support",
        title: "Questions? Talk to our AI",
        desc: "Our assistant is available 24/7 to answer your inquiries regarding accreditation and the Halal Program.",
        btn1: "Start Chat",
        btn2: "Request License"
      },
      brand: {
        name: "ARAB HALAL PROGRAM"
      },
      links: {
        title: "Explore & Site Map",
        items: [
          { name: "About Us", href: "/about-us" },
          { name: "Verification", href: "/#standards" },
          { name: "Accreditation", href: "/#join" },
        ]
      },
      support: {
        title: "Technical Support",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Request"
      },
      contact: {
        title: "Professional Inquiry",
        email: "halal@aidsmo.org",
        phone: "+212 537 276 000",
        address: "Avenue de France, Rabat, Morocco"
      },
      copyright: "© 2026 Arab Halal Program. All rights reserved."
    }
  };

  const fallback = content[lang];
  const translatedFooter = t("footer", { returnObjects: true }) as Partial<typeof fallback> & {
    cta?: Partial<typeof fallback.cta> & { online?: string };
    brand?: Partial<typeof fallback.brand>;
    links?: Partial<typeof fallback.links>;
    support?: Partial<typeof fallback.support>;
    contact?: Partial<typeof fallback.contact>;
  };
  const d = {
    ...fallback,
    ...translatedFooter,
    cta: { ...fallback.cta, ...translatedFooter.cta },
    brand: { ...fallback.brand, ...translatedFooter.brand },
    links: { ...fallback.links, ...translatedFooter.links },
    support: { ...fallback.support, ...translatedFooter.support },
    contact: { ...fallback.contact, ...translatedFooter.contact },
  };
  const onlineLabel = (d.cta as typeof fallback.cta & { online?: string }).online ?? d.cta.btn1;
  const programDefinition = isRtl
    ? "تم وضع البرنامج العربي الموحد للحلال من قبل الدول العربية ممثلة في المنظمة العربية للتنمية الصناعية والتقييس والتعدين بهدف حماية المستهلك المسلم في الدول العربية وفي جميع دول العالم ليس فقط من شهادات وعلامات الحلال المزورة، بل أيضا من الشهادات والعلامات التي تمنحها جهات لا تتوفر فيها شروط المهنية والشرعية والمصداقية اللازمة لمثل هذا المجال."
    : "The Arab Unified Halal Program was established by Arab countries through the Arab Organization for Industrial Development, Standardization and Mining to protect Muslim consumers in Arab countries and worldwide from counterfeit Halal certificates and marks, and from certificates and marks issued by bodies that lack the professional, Sharia, and credibility requirements needed in this field.";
  const contactLabels = {
    email: isRtl ? "البريد الإلكتروني" : "Email",
    phone: isRtl ? "الهاتف" : "Phone",
    office: isRtl ? "المقر" : "Office",
  };
  const footerGroups = [
    {
      title: isRtl ? "مسارات البرنامج" : "Program Paths",
      links: [
        { name: isRtl ? "تعريف البرنامج" : "Program Definition", href: "/program-definition" },
        { name: isRtl ? "أهداف البرنامج" : "Program Goals", href: "/program-goals" },
        { name: isRtl ? "مجال البرنامج" : "Program Scope", href: "/program-scope" },
        { name: isRtl ? "متطلبات البرنامج" : "Program Requirements", href: "/program-requirements" },
      ],
    },
    {
      title: d.links.title,
      links: d.links.items,
    },
    {
      title: isRtl ? "الشهادة والعلامة" : "Certificate & Mark",
      links: [
        { name: isRtl ? "شهادة الحلال" : "Halal Certificate", href: "/halal-certificate" },
        { name: isRtl ? "علامة الحلال" : "Halal Mark", href: "/halal-mark" },
        { name: isRtl ? "النماذج الرسمية" : "Official Forms", href: "/documents" },
      ],
    },
  ];

  return (
    <footer dir={isRtl ? 'rtl' : 'ltr'} className="w-full bg-[#FAF9F6] relative z-10 flex flex-col border-t border-stone-200">
      
      {/* Industrial noise overlay */}

      {/* --- CTA CARD --- */}
      <div className="relative z-10 py-20 lg:py-32 px-6 overflow-hidden bg-[#FAF9F6] border-y border-stone-300 shadow-[var(--shadow-ind-card)]">
       
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#636e72 1px, transparent 1px), linear-gradient(90deg, #636e72 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-2xl lg:rounded-[2rem] bg-gradient-to-br from-[#004D36] via-[#003827] to-[#001f15] border border-[#CA8A04]/20 shadow-2xl overflow-hidden relative p-6 lg:p-8 xl:p-12"
        >
          {/* UAE-Style Pattern from previous version */}
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
            <img 
              src="/chatbot-cta-bg.png" 
              alt="Arabesque Pattern" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Premium Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 lg:w-64 lg:h-64 bg-[#CA8A04] opacity-[0.08] blur-[60px] rounded-full pointer-events-none z-0"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 xl:gap-12">
            
            {/* Text Content */}
            <div className={`min-w-0 flex-grow order-2 lg:order-1 text-center ${isRtl ? "lg:text-right" : "lg:text-left"}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#CA8A04]/30 bg-[#CA8A04]/10 backdrop-blur-md mb-4 lg:mb-6">
                <Sparkles size={10} className="text-[#CA8A04]" />
                <span className="text-[#CA8A04] text-[8px] lg:text-[9px] font-black uppercase tracking-[0.16em]">
                  {d.cta.badge}
                </span>
              </div>
              
              <h2 className={`text-xl md:text-2xl lg:text-3xl font-black text-white mb-3 lg:mb-4 leading-tight tracking-tight ${isRtl ? "lg:text-right" : "lg:text-left"}`}>
                {d.cta.title}
              </h2>
              <p className={`text-white/75 text-xs md:text-sm lg:text-base font-light leading-relaxed mb-6 lg:mb-8 max-w-lg lg:mx-0 mx-auto border-[#CA8A04] py-2 ${isRtl ? "lg:text-right border-r-2 pr-4 bg-gradient-to-l from-white/5 to-transparent" : "lg:text-left border-l-2 pl-4 bg-gradient-to-r from-white/5 to-transparent"}`}>
                {d.cta.desc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
                <button 
                  onClick={onChatOpen}
                  className="flex max-w-full items-center justify-center gap-3 px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-[#CA8A04] text-[#004D36] font-black text-xs lg:text-sm hover:bg-white transition-all shadow-[0_15px_30px_-5px_rgba(238,180,34,0.3)] group overflow-hidden relative cursor-pointer active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CA8A04]/30"
                >
                  <MessageSquareText size={16}  />
                  <span className="min-w-0 truncate">{d.cta.btn1}</span>
                  <ChevronLeft size={14} className={`${isRtl ? "group-hover:-translate-x-1" : "rotate-180 group-hover:translate-x-1"} transition-transform`} />
                </button>
              </div>
            </div>

            {/* AI Persona Portrait */}
            <div className="relative shrink-0 w-full lg:w-auto flex justify-center order-1 lg:order-2">
              <div className="w-32 h-32 md:w-48 md:h-48 xl:w-56 xl:h-56 rounded-xl lg:rounded-[2.5rem] overflow-hidden border-4 border-white/5 shadow-2xl relative group bg-black/20">
                <img 
                  src="/ai-agent-small.png" 
                  alt="AI Assistant" 
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004D36]/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Status Badge */}
              <div className="absolute -bottom-2 lg:-bottom-3 bg-white text-[#004D36] px-3 lg:px-4 py-1.5 lg:py-2 rounded-xl lg:rounded-2xl shadow-2xl flex items-center gap-2 border border-stone-100">
                <div className="relative flex h-2 w-2 lg:h-2.5 lg:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 lg:h-2.5 w-2 lg:w-2.5 bg-emerald-500"></span>
                </div>
                <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest">{onlineLabel}</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* --- FOOTER CONTENT --- */}
      <div className="relative z-10 w-full overflow-hidden border-y border-white/10 bg-slate-950 text-white shadow-[0_32px_90px_-42px_rgba(15,23,42,0.9)]">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/cover-2.png" alt="" className="h-full w-full object-cover opacity-[0.10]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,77,54,.92),rgba(15,23,42,.96)_48%,rgba(2,6,23,.98))]" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.05fr_1.45fr] lg:px-10 lg:py-14 xl:px-12">
          <section className={`${isRtl ? "text-right" : "text-left"}`}>
            <div className={`flex ${isRtl ? "justify-start" : "justify-end"}`}>
              <span className="inline-flex overflow-hidden rounded-full bg-white leading-none shadow-[0_18px_38px_-28px_rgba(255,255,255,.35)]">
                <img src="/logo.svg" alt={d.brand.name} className="block h-28 w-auto object-contain sm:h-32 lg:h-36" />
              </span>
            </div>
            <h3 className="mt-7 max-w-md text-2xl font-black leading-tight text-white lg:text-3xl">{d.brand.name}</h3>
            <p className="mt-5 max-w-xl text-justify text-sm font-bold leading-8 text-stone-300 lg:text-[15px]">{programDefinition}</p>
          </section>

          <section className="grid gap-7">
            <div className="grid gap-5 md:grid-cols-3">
              {footerGroups.map((group) => (
                <nav key={group.title} aria-label={group.title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                  <h4 className={`mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-[#CA8A04] ${isRtl ? "text-right" : "text-left"}`}>{group.title}</h4>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          to={link.href}
                          className={`block rounded-xl px-2 py-1.5 text-sm font-bold leading-6 text-stone-300 transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CA8A04]/20 ${isRtl ? "text-right" : "text-left"}`}
                        >
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-5 md:grid-cols-3">
              <a href={`mailto:${d.contact.email}`} className="group rounded-xl border border-white/10 bg-slate-950/30 p-4 transition-colors duration-200 hover:border-[#CA8A04]/35 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#CA8A04]/20">
                <Mail size={18} className="text-[#CA8A04]" />
                <span className="mt-3 block text-[10px] font-black tracking-[0.08em] text-stone-500">{contactLabels.email}</span>
                <span className="mt-1 block break-all text-sm font-black text-stone-100" dir="ltr">{d.contact.email}</span>
              </a>
              <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
                <Phone size={18} className="text-[#CA8A04]" />
                <span className="mt-3 block text-[10px] font-black tracking-[0.08em] text-stone-500">{contactLabels.phone}</span>
                <span className="mt-1 block text-sm font-black text-stone-100" dir="ltr">{d.contact.phone}</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-950/30 p-4">
                <MapPin size={18} className="text-[#CA8A04]" />
                <span className="mt-3 block text-[10px] font-black tracking-[0.08em] text-stone-500">{contactLabels.office}</span>
                <span className="mt-1 block text-sm font-bold leading-6 text-stone-200">{d.contact.address}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="relative border-t border-white/10 px-6 py-5 sm:px-8 lg:px-10 xl:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
              <p className="text-[11px] font-bold leading-6 text-stone-400">{d.copyright}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#CA8A04]">
                {isRtl ? "منظومة عربية موحدة للحلال" : "Unified Arab Halal System"}
              </p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
