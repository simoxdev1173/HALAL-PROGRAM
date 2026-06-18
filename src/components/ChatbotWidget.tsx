import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Compass, Mic, X } from "lucide-react";
import { useTranslation } from "react-i18next";

type Sender = "user" | "bot";
type MessageStatus = "idle" | "streaming" | "error";

interface Message {
  id: number;
  text: string;
  sender: Sender;
  status?: MessageStatus;
  references?: unknown[];
  followups?: string[];
}

interface ConversationHistoryItem {
  role: "user" | "assistant";
  content: string;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionLike;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const LIGHTRAG_ENDPOINT = "http://188.165.162.105:9999/query/stream";
const STREAM_SLICE_SIZE = 10;
const STREAM_SLICE_DELAY_MS = 14;

const fallbackFollowups = {
  ar: ["من يحق له الانضمام؟", "ما هي الوثائق المطلوبة؟", "كم تستغرق دراسة الطلب؟"],
  en: ["Who can join?", "What documents are required?", "How long does review take?"],
};

const quickStarts = {
  ar: ["اشرح شروط الانضمام", "كيف أتحقق من شهادة؟", "ما هي علامة الحلال العربية؟"],
  en: ["Explain joining requirements", "How do I verify a certificate?", "What is the Arab Halal Mark?"],
};

export const ChatbotWidget = ({
  isOpen,
  setIsOpen,
  bubbleTextOverride,
  bubblePlacement = "side",
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  bubbleTextOverride?: string;
  bubblePlacement?: "side" | "top";
}) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("en") ? "en" : "ar";
  const isRtl = lang === "ar";
  const dockSide = isRtl ? "left-4 sm:left-8" : "right-4 sm:right-8";
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 1, text: t("chatbot.initial"), sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isGreetingDismissed, setIsGreetingDismissed] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const previousMessageCountRef = useRef(messages.length);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const showGreeting = !isOpen && !isGreetingDismissed;
  const greetingMotion = bubblePlacement === "top" ? { hidden: { y: 14 }, shown: { y: 0 }, exit: { y: 8 } } : { hidden: { x: isRtl ? -20 : 20 }, shown: { x: 0 }, exit: { x: isRtl ? -10 : 10 } };
  const greetingPosition =
    bubblePlacement === "top"
      ? "bottom-[calc(100%+0.875rem)] left-0"
      : isRtl
        ? "left-[115%] ml-4"
        : "right-[115%] mr-4";
  const pointerPosition =
    bubblePlacement === "top"
      ? "left-6 -bottom-2 border-b border-r border-stone-100"
      : isRtl
        ? "-left-2 border-b border-l border-stone-100"
        : "-right-2 border-r border-t border-stone-100";
  const userAlign = isRtl ? "justify-start" : "justify-end";
  const botAlign = isRtl ? "justify-end" : "justify-start";
  const speechSupported = typeof window !== "undefined" && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  const ui = useMemo(
    () => ({
      title: t("chatbot.title"),
      initial: t("chatbot.initial"),
      bubbleText: bubbleTextOverride ?? t("chatbot.bubbleText"),
      input: lang === "ar" ? "اسأل عن البرنامج أو الشهادة أو الانضمام..." : "Ask about the program, certificates, or joining...",
      send: t("chatbot.send"),
      
      streaming: lang === "ar" ? " يكتب الإجابة" : "Writing answer...",
      stop: lang === "ar" ? "إيقاف" : "Stop",
      mic: lang === "ar" ? "استخدم الميكروفون" : "Use microphone",
      listening: lang === "ar" ? "أستمع الآن..." : "Listening...",
      error:
        lang === "ar"
          ? "تعذر الاتصال بالمساعد الآن. يرجى المحاولة مرة أخرى."
          : "The assistant could not connect right now. Please try again.",
      followupTitle: lang === "ar" ? "أسئلة متابعة" : "Follow-up questions",
      references: lang === "ar" ? "مصادر" : "References",
      quickReplyHint: lang === "ar" ? "إجابة مختصرة، بحد أقصى 4 أسطر." : "Brief answer, max 4 lines.",
    }),
    [bubbleTextOverride, lang, t]
  );
  const isUserTyping = input.trim().length > 0 && !isStreaming && !isListening;
  const assistantStatus = isStreaming ? ui.streaming : isListening ? ui.listening : isUserTyping ? ui.send : ui.title;

  const renderedMessages = messages.map((msg) =>
    msg.id === 1 && msg.sender === "bot" ? { ...msg, text: ui.initial, followups: quickStarts[lang] } : msg
  );

  const sleep = (duration: number) =>
    new Promise((resolve) => {
      window.setTimeout(resolve, duration);
    });

  const renderInlineMarkdown = (text: string) => {
    const nodes: React.ReactNode[] = [];
    const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
    let lastIndex = 0;

    text.replace(pattern, (match, _capture, offset: number) => {
      if (offset > lastIndex) nodes.push(text.slice(lastIndex, offset));

      if (match.startsWith("**")) {
        nodes.push(
          <strong key={`${match}-${offset}`} className="font-black text-slate-950">
            {match.slice(2, -2)}
          </strong>
        );
      } else if (match.startsWith("*")) {
        nodes.push(
          <em key={`${match}-${offset}`} className="font-semibold not-italic text-slate-700">
            {match.slice(1, -1)}
          </em>
        );
      } else {
        const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(match);
        if (linkMatch) {
          nodes.push(
            <a
              key={`${match}-${offset}`}
              href={linkMatch[2]}
              target="_blank"
              rel="noreferrer"
              className="font-black text-[#006B4B] underline decoration-[#006B4B]/30 underline-offset-4"
            >
              {linkMatch[1]}
            </a>
          );
        }
      }

      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
    return nodes;
  };

  const renderMarkdown = (text: string) => {
    const rawLines = text.split(/\n/);
    const blocks: string[] = [];

    for (let index = 0; index < rawLines.length; index += 1) {
      const current = rawLines[index].trim();
      const next = rawLines[index + 1]?.trim();

      if (!current) continue;

      if (/^\d+\.$/.test(current) && next) {
        blocks.push(`${current} ${next}`);
        index += 1;
      } else {
        blocks.push(current);
      }
    }

    return blocks.map((line, index) => {
      const trimmed = line.trim();
      const heading = /^(#{1,4})\s+(.+)$/.exec(trimmed);
      const bullet = /^[-*]\s+(.+)$/.exec(trimmed);
      const numbered = /^\d+\.\s+(.+)$/.exec(trimmed);

      if (heading) {
        const level = heading[1].length;
        const sizeClass = level <= 2 ? "text-base" : "text-[15px]";

        return (
          <h4 key={`${trimmed}-${index}`} className={`${sizeClass} mt-2 font-black leading-7 text-slate-950 first:mt-0`}>
            {renderInlineMarkdown(heading[2])}
          </h4>
        );
      }

      if (bullet || numbered) {
        return (
          <div key={`${trimmed}-${index}`} className="flex gap-2.5">
            <span className="mt-0.5 min-w-4 text-[#007A55]">{numbered ? trimmed.match(/^\d+/)?.[0] : "-"}</span>
            <p className="min-w-0">{renderInlineMarkdown((bullet ?? numbered)?.[1] ?? trimmed)}</p>
          </div>
        );
      }

      return <p key={`${trimmed}-${index}`}>{renderInlineMarkdown(trimmed)}</p>;
    });
  };

  const buildConversationHistory = useCallback((items: Message[]): ConversationHistoryItem[] => {
    return items
      .filter((item) => item.id !== 1 && item.text.trim() && item.status !== "error")
      .slice(-8)
      .map((item) => ({
        role: item.sender === "user" ? "user" : "assistant",
        content: item.text,
      }));
  }, []);

  const makeFollowups = useCallback(
    (query: string, answer: string) => {
      const isJoin = /join|انضم|الانضمام|طلب/.test(`${query} ${answer}`);
      const isVerify = /verify|certificate|شهادة|تحقق|ترخيص/.test(`${query} ${answer}`);

      if (lang === "ar") {
        if (isJoin) return ["ما هي الوثائق المطلوبة؟", "من يحق له تقديم الطلب؟", "كم مدة الرد الرسمي؟"];
        if (isVerify) return ["أين أجد رقم الترخيص؟", "كيف أعرف أن الشهادة معتمدة؟", "ماذا أفعل إذا لم تظهر نتيجة؟"];
        return fallbackFollowups.ar;
      }

      if (isJoin) return ["What documents are required?", "Who may submit the request?", "How long does the official response take?"];
      if (isVerify) return ["Where is the license number?", "How do I know a certificate is valid?", "What if no result appears?"];
      return fallbackFollowups.en;
    },
    [lang]
  );

  const askLightRag = useCallback(
    async (query: string) => {
      const trimmed = query.trim();
      if (!trimmed || isStreaming) return;

      const userMessage: Message = { id: Date.now(), text: trimmed, sender: "user" };
      const botId = Date.now() + 1;
      const controller = new AbortController();
      abortRef.current = controller;
      setInput("");
      setIsStreaming(true);
      setMessages((prev) => [
        ...prev,
        userMessage,
        { id: botId, text: "", sender: "bot", status: "streaming", references: [] },
      ]);

      let completeAnswer = "";
      const revealText = async (chunk: string) => {
        for (let index = 0; index < chunk.length; index += STREAM_SLICE_SIZE) {
          if (controller.signal.aborted) return;
          completeAnswer += chunk.slice(index, index + STREAM_SLICE_SIZE);
          setMessages((prev) =>
            prev.map((item) => (item.id === botId ? { ...item, text: completeAnswer, status: "streaming" } : item))
          );
          await sleep(STREAM_SLICE_DELAY_MS);
        }
      };

      try {
        const history = buildConversationHistory([...messages, userMessage]);
        const response = await fetch(LIGHTRAG_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/x-ndjson",
          },
          body: JSON.stringify({
            query: trimmed,
            mode: "mix",
            stream: true,
            include_references: false,
            include_chunk_content: false,
            response_type: lang === "ar" ? "Markdown مختصر" : "Brief markdown",
            conversation_history: history,
            user_prompt:
              lang === "ar"
                ? `أنت "حلال بوت"، المساعد الرسمي الذكي للبرنامج العربي الموحد للحلال التابع للمنظمة العربية للتنمية الصناعية والتقييس والتعدين (أيدسمو).

## هويتك ودورك
أنت نقطة الاتصال الأولى للزوار والمستفيدين من البرنامج. مهمتك توجيههم بدقة واحترافية حول آليات البرنامج، شروط الانضمام، التحقق من الشهادات، والإجراءات المتعلقة بالاعتماد وترخيص علامة الحلال العربية.

## قواعد الهوية
- تحدث دائماً بلغة عربية فصيحة ورسمية.
- لا تنسب نفسك لأي جهة أخرى غير المنظمة العربية للتنمية الصناعية والتقييس والتعدين.
- لا تُسمَّى بـ ChatGPT أو Claude أو أي نموذج لغوي آخر — أنت "حلال بوت" فقط.

## أسلوبك
- رسمي ومحترف لكن غير جاف.
- ردود مختصرة ومنظمة، استخدم Markdown البسيط عند الحاجة (قوائم، عناوين).
- اجعل إجابتك عملية ومباشرة ولا تتجاوز 4 أسطر أو نقاط كحد أقصى.
- لا تضف مقدمات طويلة أو تكرار للسؤال.
- إذا كان الطلب غامضاً، اسأل سؤالاً توضيحياً واحداً فقط قبل الإجابة.
- اختم بعرض المساعدة أو بتوجيه واضح للخطوة التالية.`
                : `You are "Halal Bot", the official AI assistant of the Arab Unified Halal Program under the Arab Organization for Industrial Development, Standardization and Mining (AIDSMO).

## Your Role
You are the first point of contact for visitors and program beneficiaries. Your task is to guide them accurately and professionally on program mechanisms, membership conditions, certificate verification, and procedures related to accreditation and the Arab Halal Mark licensing.

## Identity Rules
- Never identify yourself as ChatGPT, Claude, or any other language model — you are "Halal Bot" only.
- Do not attribute yourself to any organization other than AIDSMO.

## Your Style
- Professional and formal, but not cold.
- Keep answers practical and direct — maximum 4 lines or bullet points.
- Use simple Markdown when helpful (lists, bold key terms).
- Do not add long preambles or repeat the user's question back to them.
- If a request is ambiguous, ask only one clarifying question before answering.
- Always end with a clear next step or offer further assistance.`,
            max_total_tokens: 420,
          }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          throw new Error(`LightRAG returned ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const cleanLine = line.trim();
            if (!cleanLine) continue;

            const data = JSON.parse(cleanLine) as {
              references?: unknown[];
              response?: string;
              error?: string;
            };

            if (data.references) {
              setMessages((prev) =>
                prev.map((item) => (item.id === botId ? { ...item, references: data.references } : item))
              );
            }

            if (data.response) {
              await revealText(data.response);
            }

            if (data.error) {
              throw new Error(data.error);
            }
          }
        }

        if (buffer.trim()) {
          const data = JSON.parse(buffer.trim()) as { response?: string; references?: unknown[]; error?: string };
          if (data.error) throw new Error(data.error);
          if (data.references) {
            setMessages((prev) =>
              prev.map((item) => (item.id === botId ? { ...item, references: data.references } : item))
            );
          }
          if (data.response) {
            await revealText(data.response);
          }
        }

        setMessages((prev) =>
          prev.map((item) =>
            item.id === botId
              ? {
                  ...item,
                  text: completeAnswer || ui.error,
                  status: completeAnswer ? "idle" : "error",
                  followups: completeAnswer ? makeFollowups(trimmed, completeAnswer) : undefined,
                }
              : item
          )
        );
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setMessages((prev) =>
            prev.map((item) =>
              item.id === botId ? { ...item, text: ui.error, status: "error", followups: fallbackFollowups[lang] } : item
            )
          );
        }
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [buildConversationHistory, isStreaming, lang, makeFollowups, messages, ui.error]
  );

  useEffect(() => {
    const handleTrigger = (event: Event) => {
      const { message } = (event as CustomEvent<{ message?: string }>).detail ?? {};
      setIsOpen(true);
      setIsGreetingDismissed(true);
      if (message) void askLightRag(message);
    };
    window.addEventListener("trigger-chatbot", handleTrigger);
    return () => window.removeEventListener("trigger-chatbot", handleTrigger);
  }, [askLightRag, setIsOpen]);

  useEffect(() => {
    const previousMessageCount = previousMessageCountRef.current;
    previousMessageCountRef.current = messages.length;

    if (messages.length > previousMessageCount) {
      scrollRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [messages.length]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsGreetingDismissed(true);
  };

  const handleStop = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
    setMessages((prev) =>
      prev.map((item) => (item.status === "streaming" ? { ...item, status: "idle" } : item))
    );
  };

  const handleMic = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition || isStreaming) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === "ar" ? "ar-MA" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let transcript = "";
      for (let index = 0; index < event.results.length; index += 1) {
        transcript += event.results[index][0].transcript;
      }
      setInput(transcript.trim());
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  };

  return (
    <div className={`fixed bottom-4 ${dockSide} sm:bottom-8 z-[100]`} dir={isRtl ? "rtl" : "ltr"}>
      <div className="relative flex items-center">
        <AnimatePresence>
          {!isOpen && (
            <>
              {showGreeting && (
                <motion.div
                  initial={{ opacity: 0, ...greetingMotion.hidden, scale: 0.9 }}
                  animate={{ opacity: 1, ...greetingMotion.shown, scale: 1 }}
                  exit={{ opacity: 0, ...greetingMotion.exit, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`absolute w-max max-w-[min(260px,calc(100vw-2rem))] cursor-pointer rounded-2xl border border-stone-100 bg-white p-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] ${greetingPosition}`}
                  onClick={() => setIsGreetingDismissed(true)}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsGreetingDismissed(true);
                    }}
                    aria-label={t("common.close")}
                    className={`absolute -top-2 ${isRtl ? "-right-2" : "-left-2"} z-20 flex h-6 w-6 items-center justify-center rounded-full border border-stone-200 bg-white text-[10px] text-stone-500 shadow-sm transition-colors hover:bg-stone-50 hover:text-stone-700`}
                  >
                    x
                  </button>
                  <div className={`absolute h-4 w-4 rotate-45 rounded-sm bg-white ${bubblePlacement === "top" ? "" : "top-1/2 -translate-y-1/2"} ${pointerPosition}`} />
                  <div className="flex items-start gap-3">
                    <div className="flex min-w-0 flex-col">
                      <p className="text-sm font-medium leading-relaxed text-stone-600">{ui.bubbleText}</p>
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
                aria-label={ui.title}
                className="group relative z-10 flex items-center justify-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[#CA8A04]/30"
              >
                <div className="absolute inset-0 scale-110 rounded-full bg-[#007A55]/20 opacity-0 blur-xl transition-all duration-500 group-hover:animate-pulse group-hover:opacity-100" />
                <div className="relative z-10 h-16 w-16 overflow-hidden  transition-transform duration-300 sm:h-20 sm:w-20">
                  <img src="/ai-agent-nobg.png" alt={t("chatbot.alt")} className="h-full w-full  object-contain" />
                </div>
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/20 px-3 py-4 backdrop-blur-[2px] sm:px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.34, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="relative grid h-[min(720px,92vh)] w-[min(980px,calc(100vw-1.5rem))] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_44px_120px_-32px_rgba(15,23,42,0.45)] md:grid-cols-[0.9fr_1.25fr] lg:rounded-[2.5rem]"
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={t("common.close")}
                className="absolute right-5 top-5 z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-500 shadow-sm transition-all hover:border-slate-300 hover:bg-white hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              <div className="relative hidden overflow-hidden border-e border-slate-200 bg-white p-7 md:flex md:flex-col">
                <div className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-[#007A55]/20 to-transparent" />
                <div className="absolute bottom-8 left-10 right-10 h-28 rounded-full bg-[#007A55]/[0.035] blur-2xl" />

                <div className="relative z-10 mt-8 flex flex-1 items-center justify-center">
                  <motion.div
                    animate={
                      isStreaming
                        ? { y: [0, -12, 0], rotate: [0, -1.5, 1.5, 0] }
                        : isListening
                          ? { scale: [1, 1.035, 1], y: [0, -4, 0] }
                          : isUserTyping
                            ? { y: [0, -6, 0], rotate: [0, 1, 0] }
                            : { y: [0, -8, 0] }
                    }
                    transition={{ duration: isStreaming ? 1.05 : isUserTyping ? 1.35 : 2.8, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <motion.div
                      animate={{ scale: isStreaming ? [1, 1.1, 1] : [1, 1.03, 1], opacity: [0.18, 0.32, 0.18] }}
                      transition={{ duration: isStreaming ? 1.2 : 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -inset-8 rounded-full bg-[#007A55]/10 blur-2xl"
                    />
                    <div className="relative flex h-72 w-72 items-center justify-center">
                      <motion.div
                        animate={{ opacity: isStreaming ? [0.25, 0.65, 0.25] : 0.28, scale: isStreaming ? [0.95, 1.04, 0.95] : 1 }}
                        transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-8 h-10 w-44 rounded-full bg-[#004D36]/10 blur-xl"
                      />
                      <img src="/ai-agent-nobg.png" alt={t("chatbot.alt")} className="relative z-10 h-full w-full object-contain drop-shadow-[0_26px_28px_rgba(0,77,54,0.16)]" />
                      <motion.div
                        animate={{ opacity: isStreaming || isListening || isUserTyping ? [0.2, 0.5, 0.2] : 0.2 }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-2 rounded-full border border-[#007A55]/15"
                      />
                    </div>
                  </motion.div>
                </div>

              </div>

              <div className="flex min-h-0 flex-col bg-white">
                <div className="relative z-10 flex-shrink-0 border-b border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-5 md:hidden">
                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <motion.div
                        animate={isStreaming || isUserTyping ? { y: [0, -4, 0] } : { y: [0, -2, 0] }}
                        transition={{ duration: isStreaming ? 0.9 : isUserTyping ? 1.25 : 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative shrink-0"
                      >
                        <div className="h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-premium-sm">
                          <img src="/ai-agent-nobg.png" alt={t("chatbot.alt")} className="h-full w-full object-contain" />
                        </div>
                      </motion.div>
                      <div className="flex min-w-0 flex-col">
                        <h3 className="truncate text-lg font-bold leading-none tracking-tight text-slate-900">{ui.title}</h3>
                        <span className="mt-1.5 truncate text-[11px] font-bold uppercase tracking-[0.16em] text-[#007A55]">{assistantStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto bg-[#F9FAFB] px-5 py-8 custom-scrollbar">
              <div className="space-y-6">
                {renderedMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? userAlign : botAlign}`}>
                    <div
                      className={`max-w-[85%] rounded-[1.5rem] px-5 py-4 text-[15px] leading-relaxed transition-all ${
                        msg.sender === "user"
                          ? "rounded-tr-none bg-[#007A55] text-white shadow-premium-md font-medium"
                          : msg.status === "error"
                            ? "rounded-tl-none border border-red-200 bg-red-50 text-red-800 shadow-sm"
                            : "rounded-tl-none border border-slate-200 bg-white text-slate-700 shadow-premium-sm"
                      }`}
                    >
                      {msg.text ? (
                        <div className="space-y-3 whitespace-pre-wrap">{renderMarkdown(msg.text)}</div>
                      ) : (
                        <div className="flex items-center gap-2.5">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.span
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="h-1.5 w-1.5 rounded-full bg-[#007A55]"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {msg.sender === "bot" && msg.references && msg.references.length > 0 && msg.status !== "streaming" && (
                        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-500 flex items-center gap-2 uppercase tracking-wider">
                          <Compass size={12} />
                          {ui.references}: {msg.references.length}
                        </div>
                      )}

                      {msg.sender === "bot" && msg.status !== "streaming" && msg.followups && msg.followups.length > 0 && (
                        <div className="mt-5 border-t border-slate-100 pt-5">
                          <p className="mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ui.followupTitle}</p>
                          <div className="flex flex-wrap gap-2">
                            {msg.followups.map((question) => (
                              <button
                                key={question}
                                type="button"
                                onClick={() => askLightRag(question)}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-[12px] font-bold text-slate-600 transition-all hover:border-[#007A55] hover:text-[#007A55] hover:shadow-premium-sm active:scale-95"
                              >
                                {question}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
                </div>

                <div className="flex-shrink-0 border-t border-slate-200 bg-white p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] sm:p-6">
              <div className="flex items-end gap-3">
                <button
                  type="button"
                  onClick={handleMic}
                  disabled={!speechSupported || isStreaming}
                  aria-label={ui.mic}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all ${
                    isListening
                      ? "bg-red-50 text-red-500 border border-red-100"
                      : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 border border-slate-200"
                  } disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  <Mic size={20} strokeWidth={2} />
                </button>
                
                <div className="relative flex-grow">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void askLightRag(input);
                      }
                    }}
                    placeholder={isListening ? ui.listening : ui.input}
                    rows={1}
                    className={`max-h-32 min-h-[48px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-[15px] transition-all placeholder:text-slate-400 focus:border-[#007A55] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#007A55]/5 ${isRtl ? "text-right" : "text-left"}`}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => (isStreaming ? handleStop() : askLightRag(input))}
                  disabled={!isStreaming && !input.trim()}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all shadow-premium-sm ${
                    isStreaming 
                      ? "bg-slate-900 text-white" 
                      : "bg-[#007A55] text-white hover:bg-[#008F63] active:scale-95 border border-[#007A55]"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {isStreaming ? <X size={20} strokeWidth={2.5} /> : <ArrowRight className={isRtl ? "rotate-180" : ""} size={20} strokeWidth={2.5} />}
                </button>
              </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
