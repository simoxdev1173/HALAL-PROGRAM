import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

  const content = {
    ar: {
      cta: {
        badge: "دعم مدعوم بالذكاء الاصطناعي",
        title: "لديك استفسار؟ تحدث مع مساعد الذكي",
        desc: "مساعدنا متاح على مدار الساعة للإجابة الفورية على تساؤلاتكم حول الاعتماد والبرنامج العربي للحلال.",
        btn1: "بدء المحادثة",
        btn2: "طلب الترخيص"
      },
      brand: {
        name: "البرنامج العربي للحلال",
        tagline: "الثقة • التميز • الريادة"
      },
      links: {
        title: "الاستكشاف وخريطة الموقع",
        items: [
          { name: "عن البرنامج", href: "/about-us" },
          { name: "التحقق من شهادة", href: "/#standards" },
          { name: "الانضمام للبرنامج", href: "/join-program" },
          { name: "النماذج والوثائق", href: "/#directory" },
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
        name: "ARAB HALAL PROGRAM",
        tagline: "Trust • Excellence • Leadership"
      },
      links: {
        title: "Explore & Site Map",
        items: [
          { name: "About Us", href: "/about-us" },
          { name: "Verification", href: "/#standards" },
          { name: "Accreditation", href: "/#join" },
          { name: "Directory", href: "/#directory" },
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

  const d = content[lang];

  return (
    // Unified the background color for the whole footer component
    <footer dir={isRtl ? 'rtl' : 'ltr'} className="w-full bg-[#FAF9F6] pt-12 sm:pt-16 pb-6 px-4 sm:px-6 relative z-10 flex flex-col">
      
      {/* --- CTA CARD --- */}
      <div className="w-full relative z-20 mb-12 sm:mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-[#004D36] via-[#003827] to-[#001f15] p-6 lg:p-10 shadow-2xl overflow-hidden relative border border-[#CA8A04]/20"
        >
          {/* Subtle UAE-Style Pattern Overlay */}
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
            <img 
              src="/prioritySection.png" 
              alt="Arabesque Pattern" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Premium Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#CA8A04] opacity-[0.08] blur-[80px] rounded-full pointer-events-none z-0"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            
            {/* Text Content (Now on the Right in RTL) */}
            <div className="flex-grow text-center lg:text-right order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#CA8A04]/30 bg-[#CA8A04]/10 backdrop-blur-md mb-4">
                <Sparkles size={12} className="text-[#CA8A04]" />
                <span className="text-[#CA8A04] text-[9px] font-black uppercase tracking-[0.2em]">
                  {d.cta.badge}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-black text-white mb-3 leading-tight tracking-tight">
                {d.cta.title}
              </h2>
              <p className="text-white/70 text-sm md:text-base font-light leading-relaxed mb-6 max-w-lg lg:ml-0 lg:mr-0 mx-auto border-r-2 border-[#CA8A04] pr-4">
                {d.cta.desc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={onChatOpen}
                  className="relative bg-[#CA8A04] text-[#004D36] px-6 py-3 rounded-full text-sm font-black hover:bg-white transition-all shadow-[0_15px_30px_-5px_rgba(238,180,34,0.3)] flex items-center justify-center gap-2 group overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent z-0"></div>
                  <div className="relative z-10 flex items-center gap-2">
                    <MessageSquareText size={18} className="text-[#004D36]" />
                    <span>{d.cta.btn1}</span>
                  </div>
                  <ChevronLeft size={16} className={`relative z-10 ${isRtl ? "group-hover:-translate-x-1" : "rotate-180 group-hover:translate-x-1"} transition-transform`} />
                </button>
              </div>
            </div>

            {/* AI Persona Portrait (Now on the Left in RTL) */}
            <div className="relative shrink-0 w-full lg:w-auto flex justify-center order-1 lg:order-2">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden border-4 border-white/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] relative group">
                <img 
                  src="/ai.png" 
                  alt="AI Assistant" 
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004D36]/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Status Badge */}
              <div className="absolute -bottom-3 bg-white text-[#004D36] px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 border border-stone-100">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-[8px] font-black uppercase tracking-[0.1em]">متصل للرد</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* --- FOOTER CONTENT --- */}
      <div className="max-w-6xl mx-auto border-b border-stone-200 pb-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          
          {/* Brand Signature */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <img src="/logo.svg" alt="Logo" className="h-20 w-auto object-contain object-right" />
              <div className="space-y-1">
                <h3 className="text-lg font-black tracking-tight text-[#004D36]">
                  {d.brand.name}
                </h3>
              </div>
            </div>
          </div>

          {/* Navigation Groups */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#004D36] mb-4 border-r-2 border-[#CA8A04] pr-2">
              {d.links.title}
            </h4>
            <ul className="space-y-2">
              {d.links.items.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="text-stone-500 hover:text-[#CA8A04] text-sm font-bold transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CA8A04] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#004D36] mb-4 border-r-2 border-[#CA8A04] pr-2">
              {d.contact.title}
            </h4>
            <div className="space-y-4">
              <div className="group flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shadow-sm group-hover:border-[#CA8A04] transition-colors shrink-0">
                  <Mail size={14} className="text-[#004D36]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Email</span>
                  <a href={`mailto:${d.contact.email}`} className="text-sm font-bold text-[#004D36] hover:text-[#CA8A04] transition-colors" dir="ltr">
                    {d.contact.email}
                  </a>
                </div>
              </div>

              <div className="group flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shadow-sm group-hover:border-[#CA8A04] transition-colors shrink-0">
                  <Phone size={14} className="text-[#004D36]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Phone</span>
                  <span className="text-sm font-bold text-[#004D36]" dir="ltr">{d.contact.phone}</span>
                </div>
              </div>

              <div className="group flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shadow-sm group-hover:border-[#CA8A04] transition-colors shrink-0">
                  <MapPin size={14} className="text-[#004D36]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Office</span>
                  <span className="text-xs font-medium text-stone-600 leading-tight">
                    {d.contact.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Support Form */}
          <div className="lg:col-span-3 bg-white/50 backdrop-blur-sm p-5 rounded-2xl border border-stone-200 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#004D36] mb-4 border-r-2 border-[#CA8A04] pr-2">
              {d.support.title}
            </h4>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="text" 
                  placeholder={d.support.name}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:border-[#CA8A04] focus:ring-1 focus:ring-[#CA8A04] outline-none transition-all bg-white text-xs"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder={d.support.email}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:border-[#CA8A04] focus:ring-1 focus:ring-[#CA8A04] outline-none transition-all bg-white text-xs"
                />
              </div>
              <div>
                <textarea 
                  placeholder={d.support.message}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:border-[#CA8A04] focus:ring-1 focus:ring-[#CA8A04] outline-none transition-all bg-white text-xs resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-[#004D36] text-white py-2 rounded-lg font-bold text-xs hover:bg-[#003827] transition-all shadow-md shadow-emerald-900/10">
                {d.support.send}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Branding Bar */}
      <div className="max-w-6xl mx-auto pt-4 flex flex-col md:flex-row items-center justify-center w-full">
        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
          {d.copyright}
        </p>
      </div>

      {/* Button animation keyframes */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;