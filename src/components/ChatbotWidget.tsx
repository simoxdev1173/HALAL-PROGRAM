"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export const ChatbotWidget = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "مرحباً بك! أنا مساعدك الذكي في البرنامج العربي للحلال. كيف يمكنني مساعدتك اليوم؟", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);

  // Trigger the greeting bubble to appear shortly after load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowGreeting(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Hide greeting on scroll to prevent covering content
  useEffect(() => {
    const handleScroll = () => {
      if (showGreeting) setShowGreeting(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showGreeting]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simple simulated bot response
    setTimeout(() => {
      const botMsg: Message = { 
        id: Date.now() + 1, 
        text: "شكراً لتواصلك. فريقنا يعمل حالياً على معالجة استفسارك. هل ترغب في الاطلاع على الدليل الفني للبرنامج؟", 
        sender: "bot" 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowGreeting(false);
  };

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100]" dir="rtl">
      
      {/* Floating Trigger & Greeting Bubble */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {!isOpen && (
            <>
              {/* The Greeting Bubble (Floats to the Left in RTL) */}
              {showGreeting && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute right-[115%] mr-4 w-max max-w-[260px] bg-white p-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-stone-100 flex items-start gap-3 cursor-pointer group"
                  onClick={handleOpenChat}
                >
                  {/* Close Button for Bubble */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGreeting(false);
                    }}
                    className="absolute -top-2 -left-2 w-6 h-6 bg-white border border-stone-200 rounded-full shadow-sm flex items-center justify-center text-[10px] text-stone-400 hover:text-stone-600 hover:bg-stone-50 transition-colors z-20"
                  >
                    ✕
                  </button>

                  {/* CSS Pointer Triangle pointing to the right */}
                  <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-4 h-4 bg-white rotate-45 border-t border-r border-stone-100 rounded-sm"></div>
                  
                  {/* Online Indicator Dot */}
                  <div className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007A55] opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#007A55]"></span>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-[#004D36] mb-1 tracking-wider uppercase">مساعد البرنامج</span>
                    <p className="text-sm text-stone-600 leading-relaxed font-medium">
                      مرحباً! أنا المساعد الذكي، هل تحتاج إلى مساعدة؟
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Main Avatar Button */}
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChat}
                className="relative flex items-center justify-center group z-10 focus:outline-none"
              >
                {/* Subtle outer glow */}
                <div className="absolute inset-0 rounded-full bg-[#007A55]/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 blur-xl"></div>

                {/* Avatar Container - Perfectly circular with clean shadow */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white bg-white shadow-[0_10px_30px_-5px_rgba(0,77,54,0.3)] overflow-hidden relative z-10 transition-transform duration-300">
                  <img 
                    src="/ai-l.png" 
                    alt="AI Assistant" 
                    className="w-full h-full object-cover bg-[#FAF9F6]"
                  />
                </div>

                {/* Chat Icon Badge - Makes it strictly look like a button */}
                <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-7 h-7 sm:w-9 sm:h-9 bg-[#EEB422] border-[3px] border-white rounded-full flex items-center justify-center shadow-lg z-20 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4 text-[#004D36]">
                    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[85vh] bg-[#FAF9F6] rounded-3xl sm:rounded-[2.5rem] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-stone-200 fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[100]"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#004D36] to-[#007A55] p-6 relative flex-shrink-0 shadow-md z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 shadow-inner bg-white/10 p-0.5">
                      <img 
                        src="/ai-l.png" 
                        alt="AI Avatar" 
                        className="w-full h-full object-cover rounded-full bg-white"
                      />
                    </div>
                    {/* Active Status Dot */}
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#EEB422] border-2 border-[#004D36] rounded-full shadow-sm"></div>
                  </div>
                  
                  <div className="flex flex-col">
                    <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight">المساعد الذكي</h3>
                    <span className="text-[#EEB422] text-[10px] sm:text-xs font-black uppercase tracking-[0.1em] opacity-90">
                      متصل الآن
                    </span>
                  </div>
                </div>

                {/* Unicode Close Button */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/90 hover:bg-white/20 hover:text-white transition-all text-sm font-light shadow-sm"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-5 sm:p-6 space-y-5 bg-stone-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-[#004D36] text-white rounded-2xl rounded-tr-sm shadow-md" 
                      : "bg-white text-slate-700 rounded-2xl rounded-tl-sm shadow-sm border border-stone-200 font-medium"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 sm:p-5 bg-white border-t border-stone-200 flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="اكتب استفسارك هنا..."
                  className="flex-grow bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#EEB422]/40 focus:border-[#EEB422] transition-all placeholder:text-stone-400"
                />
                
                {/* Text-based Send Button */}
                <button 
                  onClick={handleSend}
                  className="bg-[#004D36] text-white px-5 sm:px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#007A55] transition-all shadow-md shrink-0 active:scale-95 flex items-center justify-center"
                >
                  إرسال
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};