"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
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
          { name: "عن البرنامج", href: "#about" },
          { name: "التحقق من شهادة", href: "#standards" },
          { name: "الانضمام للبرنامج", href: "#join" },
          { name: "النماذج والوثائق", href: "#directory" },
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
          { name: "About", href: "#about" },
          { name: "Verification", href: "#standards" },
          { name: "Accreditation", href: "#join" },
          { name: "Directory", href: "#directory" },
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
    <div dir={isRtl ? 'rtl' : 'ltr'} className="flex flex-col w-full">
      
      {/* --- SEAMLESS BACKGROUND BRIDGE FOR CTA --- */}
      {/* This guarantees the CTA sits exactly between the dark FAQ and the light Footer without layout breaks */}
      <div className="relative w-full z-20 px-6">
        
        {/* The 50/50 Background Split */}
        <div className="absolute inset-0 flex flex-col pointer-events-none -z-10">
          <div className="h-1/2 w-full bg-slate-950"></div> {/* Matches FAQ background perfectly */}
          <div className="h-1/2 w-full bg-[#FAF9F6]"></div> {/* Matches Footer background perfectly */}
        </div>

        {/* The CTA Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#004D36] via-[#003827] to-[#001f15] p-10 lg:p-16 shadow-2xl overflow-hidden relative border border-[#EEB422]/20"
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#EEB422] opacity-[0.08] blur-[100px] rounded-full pointer-events-none z-0"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Text Content (Now on the Right in RTL) */}
            <div className="flex-grow text-center lg:text-right order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#EEB422]/30 bg-[#EEB422]/10 backdrop-blur-md mb-6">
                <Sparkles size={14} className="text-[#EEB422]" />
                <span className="text-[#EEB422] text-[10px] font-black uppercase tracking-[0.3em]">
                  {d.cta.badge}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight tracking-tight">
                {d.cta.title}
              </h2>
              <p className="text-white/70 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl lg:ml-0 lg:mr-0 mx-auto border-r-4 border-[#EEB422] pr-5">
                {d.cta.desc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <button 
                  onClick={onChatOpen}
                  className="relative bg-[#EEB422] text-[#004D36] px-10 py-4 rounded-full text-base font-black hover:bg-white transition-all shadow-[0_20px_40px_rgba(238,180,34,0.3)] flex items-center justify-center gap-3 group overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent z-0"></div>
                  <div className="relative z-10 flex items-center gap-2">
                    <MessageSquareText size={20} className="text-[#004D36]" />
                    <span>{d.cta.btn1}</span>
                  </div>
                  <ChevronLeft size={20} className={`relative z-10 ${isRtl ? "group-hover:-translate-x-1" : "rotate-180 group-hover:translate-x-1"} transition-transform`} />
                </button>
              </div>
            </div>

            {/* AI Persona Portrait (Now on the Left in RTL) */}
            <div className="relative shrink-0 w-full lg:w-auto flex justify-center order-1 lg:order-2">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-[2.5rem] overflow-hidden border-8 border-white/5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative group">
                <img 
                  src="/ai.png" 
                  alt="AI Assistant" 
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004D36]/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Status Badge */}
              <div className="absolute -bottom-4 bg-white text-[#004D36] px-5 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-100">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.1em]">متصل الآن للمساعدة</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* --- PROFESSIONAL FOOTER --- */}
      <footer className="bg-[#FAF9F6] pt-20 pb-10 px-6 relative z-10">
        <div className="max-w-7xl mx-auto border-b border-stone-200 pb-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
            
            {/* Brand Signature */}
            <div className="lg:col-span-3 flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <img src="/logo.svg" alt="Logo" className="h-40 w-auto object-contain object-right" />
                <div className="space-y-1.5">
                  <h3 className="text-xl font-black tracking-tight text-[#004D36]">
                    {d.brand.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Navigation Groups */}
            <div className="lg:col-span-3">
              <h4 className="text-[12px] font-black uppercase tracking-widest text-[#004D36] mb-8 border-r-2 border-[#EEB422] pr-3">
                {d.links.title}
              </h4>
              <ul className="space-y-4">
                {d.links.items.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="text-stone-500 hover:text-[#EEB422] text-base font-bold transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EEB422] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details (Moved here) */}
            <div className="lg:col-span-3">
              <h4 className="text-[12px] font-black uppercase tracking-widest text-[#004D36] mb-8 border-r-2 border-[#EEB422] pr-3">
                {d.contact.title}
              </h4>
              <div className="space-y-6">
                <div className="group flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-sm group-hover:border-[#EEB422] transition-colors shrink-0">
                    <Mail size={18} className="text-[#004D36]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Email</span>
                    <a href={`mailto:${d.contact.email}`} className="text-base font-bold text-[#004D36] hover:text-[#EEB422] transition-colors" dir="ltr">
                      {d.contact.email}
                    </a>
                  </div>
                </div>

                <div className="group flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-sm group-hover:border-[#EEB422] transition-colors shrink-0">
                    <Phone size={18} className="text-[#004D36]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Phone</span>
                    <span className="text-base font-bold text-[#004D36]" dir="ltr">{d.contact.phone}</span>
                  </div>
                </div>

                <div className="group flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-sm group-hover:border-[#EEB422] transition-colors shrink-0">
                    <MapPin size={18} className="text-[#004D36]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Office</span>
                    <span className="text-base font-medium text-stone-600 leading-tight">
                      {d.contact.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Form */}
            <div className="lg:col-span-3 bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-stone-200 shadow-sm">
              <h4 className="text-[12px] font-black uppercase tracking-widest text-[#004D36] mb-6 border-r-2 border-[#EEB422] pr-3">
                {d.support.title}
              </h4>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                  <input 
                    type="text" 
                    placeholder={d.support.name}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#EEB422] focus:ring-1 focus:ring-[#EEB422] outline-none transition-all bg-white text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <input 
                    type="email" 
                    placeholder={d.support.email}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#EEB422] focus:ring-1 focus:ring-[#EEB422] outline-none transition-all bg-white text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <textarea 
                    placeholder={d.support.message}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#EEB422] focus:ring-1 focus:ring-[#EEB422] outline-none transition-all bg-white text-sm resize-none"
                  ></textarea>
                </div>
                <button className="w-full bg-[#004D36] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#003827] transition-all shadow-lg shadow-emerald-900/10">
                  {d.support.send}
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Bottom Branding Bar */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-[13px] font-bold text-stone-400 uppercase tracking-wider">
            {d.copyright}
          </p>
        </div>
      </footer>

      {/* Button animation keyframes */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Footer;