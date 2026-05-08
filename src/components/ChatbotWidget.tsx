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
    <div className="fixed bottom-8 right-8 z-[100]" dir="rtl">
      
      {/* Floating Trigger & Greeting Bubble */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {!isOpen && (
            <>
              {/* The Greeting Bubble (Floats to the Left) */}
              {showGreeting && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute right-[110%] mr-4 w-max max-w-[280px] bg-white p-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-stone-100 flex items-start gap-3 cursor-pointer group"
                  onClick={handleOpenChat}
                >
                  {/* Close Button for Bubble */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGreeting(false);
                    }}
                    className="absolute -top-2 -left-2 w-5 h-5 bg-white border border-stone-200 rounded-full shadow-sm flex items-center justify-center text-[8px] text-stone-400 hover:text-stone-600 transition-colors z-20"
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
                      مرحباً! أنا المساعد الذكي، هل تحتاج إلى أي مساعدة؟
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
                className="relative bg-[#FCFCF w-20 rounded-4xl  h-20 shadow-[0_20px_50px_-10px_rgba(0,77,54,0.4)] flex  items-center justify-center group z-10 overflow-hidden bg-transparent"
              >
                {/* Subtle outer glow */}
                <div className="absolute inset-0 rounded-4xl border border-[#EEB422]/50 scale-[1.08] opacity-0 group-hover:opacity-100 group-hover:scale-[1.15] transition-all duration-500"></div>

                <img 
                  src="/ai-l.png" 
                  alt="AI Assistant" 
                  className="w-full bg-[#FCFCFD] rounded-4xl h-full object-cover"
                />
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
            className="w-[400px] h-[650px] bg-[#FAF9F6] rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col border border-stone-200 fixed bottom-8 right-8 z-[100]"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#004D36] to-[#007A55] p-8 relative flex-shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-[1.2rem] overflow-hidden border-2 border-white/20 shadow-inner bg-white/10 p-0.5">
                      <img 
                        src="/ai.png" 
                        alt="AI Avatar" 
                        className="w-full h-full object-cover rounded-[1rem] bg-white"
                      />
                    </div>
                    {/* Active Status Dot */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#EEB422] border-2 border-[#004D36] rounded-full shadow-lg"></div>
                  </div>
                  
                  <div className="flex flex-col">
                    <h3 className="text-white font-bold text-xl tracking-tight">المساعد الذكي</h3>
                    <span className="text-[#EEB422] text-[10px] font-black uppercase tracking-[0.2em]">
                      متصل الآن | مدعوم بالذكاء الاصطناعي
                    </span>
                  </div>
                </div>

                {/* Unicode Close Button (No Icons) */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all text-lg font-light leading-none"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-5 bg-white">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                    msg.sender === "user" 
                      ? "bg-[#004D36] text-white rounded-2xl rounded-tr-sm shadow-md shadow-[#004D36]/10" 
                      : "bg-[#F8FAFC] text-slate-700 rounded-2xl rounded-tl-sm shadow-sm border border-stone-100 font-medium"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-stone-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="اكتب استفسارك هنا..."
                  className="flex-grow bg-stone-50 border border-stone-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#EEB422]/50 focus:border-[#EEB422] transition-all placeholder:text-stone-400"
                />
                
                {/* Text-based Send Button (No Icons) */}
                <button 
                  onClick={handleSend}
                  className="bg-[#004D36] text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-[#007A55] transition-all shadow-md shrink-0 active:scale-95"
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