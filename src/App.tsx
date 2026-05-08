// App.js
import  { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ArabHalalProgram from "./components/ArabHalalProgram";
import ExploreSectors from "./components/PrioritySection";
import AccreditationWorkflow from "./components/AccreditationWorkflow";
import OfficialMarkAndDocuments from "./components/OfficialMarkAndDocuments";
import FAQSection from "./components/FaqSection";
import { Hero } from "./components/Hero";
import IntroAnimation from "./components/IntroAnimation";
import Footer from "./components/Footer";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="bg-slate-950"> {/* Base background to prevent white flashes */}
      <IntroAnimation onComplete={() => setIsIntroComplete(true)} />
      
      {isIntroComplete && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`min-h-screen bg-white ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}
        >
          <Navbar lang={lang} setLang={setLang} />
          <main>
            <Hero/>
            <ArabHalalProgram />
            <AccreditationWorkflow />
            <ExploreSectors />
            <OfficialMarkAndDocuments />
            <FAQSection />
          </main>
          <Footer lang={lang} onChatOpen={() => setIsChatOpen(true)} />
          
          <ChatbotWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;600;700&family=Inter:wght@400;700&display=swap');
            .font-arabic { font-family: 'Readex Pro', sans-serif; }
            .font-sans { font-family: 'Inter', sans-serif; }
            button { border-radius: 0 !important; }
          `}</style>
        </motion.div>
      )}
    </div>
  );
}

export default App;