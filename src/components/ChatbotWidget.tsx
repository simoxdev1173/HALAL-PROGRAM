import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export const ChatbotWidget = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("en") ? "en" : "ar";
  const isRtl = lang === "ar";
  const dockSide = isRtl ? "left-4 sm:left-8" : "right-4 sm:right-8";
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 1, text: t("chatbot.initial"), sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!isOpen) setShowGreeting(true);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (showGreeting) setShowGreeting(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showGreeting]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { id: Date.now(), text: trimmed, sender: "user" }]);
    setInput("");

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: t("chatbot.reply"), sender: "bot" },
      ]);
    }, 1000);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowGreeting(false);
  };

  const userAlign = isRtl ? "justify-start" : "justify-end";
  const botAlign = isRtl ? "justify-end" : "justify-start";
  const renderedMessages = messages.map((msg) =>
    msg.id === 1 && msg.sender === "bot" ? { ...msg, text: t("chatbot.initial") } : msg
  );

  return (
    <div className={`fixed bottom-4 ${dockSide} sm:bottom-8 z-[100]`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="relative flex items-center">
        <AnimatePresence>
          {!isOpen && (
            <>
              {showGreeting && (
                <motion.div
                  initial={{ opacity: 0, x: isRtl ? -20 : 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: isRtl ? -10 : 10, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`absolute w-max max-w-[min(260px,calc(100vw-7rem))] cursor-pointer rounded-2xl border border-stone-100 bg-white p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] ${isRtl ? "left-[115%] ml-4" : "right-[115%] mr-4"}`}
                  onClick={handleOpenChat}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGreeting(false);
                    }}
                    aria-label={t("common.close")}
                    className={`absolute -top-2 ${isRtl ? "-right-2" : "-left-2"} z-20 flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 bg-white text-[10px] text-stone-500 shadow-sm transition-colors hover:bg-stone-50 hover:text-stone-700`}
                  >
                    x
                  </button>
                  <div className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 rounded-sm bg-white ${isRtl ? "-left-2 border-b border-l border-stone-100" : "-right-2 border-r border-t border-stone-100"}`} />
                  <div className="flex items-start gap-3">
                    <div className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#007A55] opacity-40" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#007A55]" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="mb-1 text-xs font-black uppercase tracking-wider text-[#004D36]">
                        {t("chatbot.bubbleTitle")}
                      </span>
                      <p className="text-sm font-medium leading-relaxed text-stone-600">
                        {t("chatbot.bubbleText")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.button
                type="button"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenChat}
                aria-label={t("chatbot.title")}
                className="group relative z-10 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[#CA8A04]/30"
              >
                <div className="absolute inset-0 scale-110 rounded-full bg-[#007A55]/20 opacity-0 blur-xl transition-all duration-500 group-hover:animate-pulse group-hover:opacity-100" />
                <div className="relative z-10 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_10px_30px_-5px_rgba(0,77,54,0.3)] transition-transform duration-300 sm:h-20 sm:w-20">
                  <img src="/ai-l.png" alt={t("chatbot.alt")} className="h-full w-full bg-[#FAF9F6] object-cover" />
                </div>
                <div className={`absolute -bottom-1 ${isRtl ? "-right-1 sm:-right-2" : "-left-1 sm:-left-2"} z-20 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white bg-[#EEB422] shadow-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 sm:-bottom-2 sm:h-9 sm:w-9`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-[#004D36] sm:h-4 sm:w-4">
                    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9s-4.428-9-9.75-9-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ transformOrigin: isRtl ? "bottom left" : "bottom right" }}
            className={`fixed bottom-4 ${dockSide} z-[100] flex h-[600px] max-h-[85vh] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-stone-200 bg-[#FAF9F6] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.3)] sm:bottom-8 sm:w-[400px] sm:rounded-[2.5rem]`}
          >
            <div className="relative z-10 flex-shrink-0 bg-gradient-to-br from-[#004D36] to-[#007A55] p-6 shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white/20 bg-white/10 p-0.5 shadow-inner">
                      <img src="/ai-l.png" alt={t("chatbot.alt")} className="h-full w-full rounded-full bg-white object-cover" />
                    </div>
                    <div className={`absolute bottom-0 ${isRtl ? "right-0" : "left-0"} h-3.5 w-3.5 rounded-full border-2 border-[#004D36] bg-[#EEB422] shadow-sm`} />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <h3 className="truncate text-lg font-bold tracking-tight text-white sm:text-xl">{t("chatbot.title")}</h3>
                    <span className="truncate text-[10px] font-black uppercase tracking-[0.1em] text-[#EEB422] opacity-90 sm:text-xs">
                      {t("chatbot.online")}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={t("common.close")}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-light text-white/90 shadow-sm transition-all hover:bg-white/20 hover:text-white"
                >
                  x
                </button>
              </div>
            </div>

            <div className="flex-grow space-y-5 overflow-y-auto bg-stone-50 p-5 sm:p-6">
              {renderedMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? userAlign : botAlign}`}>
                  <div
                    className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "rounded-2xl rounded-tr-sm bg-[#004D36] text-white shadow-md"
                        : "rounded-2xl rounded-tl-sm border border-stone-200 bg-white font-medium text-slate-700 shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-shrink-0 border-t border-stone-200 bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t("chatbot.input")}
                  className={`min-w-0 flex-grow rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm transition-all placeholder:text-stone-400 focus:border-[#EEB422] focus:outline-none focus:ring-2 focus:ring-[#EEB422]/40 ${isRtl ? "text-right" : "text-left"}`}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className="flex shrink-0 items-center justify-center rounded-xl bg-[#004D36] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#007A55] active:scale-95 sm:px-6"
                >
                  {t("chatbot.send")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
