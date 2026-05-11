// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ArabHalalProgram from "./components/ArabHalalProgram";
import ExploreSectors from "./components/PrioritySection";
import CompanySearch from "./components/CompanySearch";
import AccreditationWorkflow from "./components/AccreditationWorkflow";
import OfficialMarkAndDocuments from "./components/OfficialMarkAndDocuments";
import InternationalRecognition from "./components/InternationalRecognition";
import FAQSection from "./components/FaqSection";
import { Hero } from "./components/Hero";
import IntroAnimation from "./components/IntroAnimation";
import Footer from "./components/Footer";
import { ChatbotWidget } from "./components/ChatbotWidget";
import AboutProgram from "./about-us/page";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  return null;
};

const Home = () => (
  <main>
    <Hero />
    <section id="about">
       <ArabHalalProgram />
    </section>
    <section id="join">
       <AccreditationWorkflow />
    </section>
    <ExploreSectors />
    <CompanySearch />
    <InternationalRecognition />
    <section id="directory">
       <OfficialMarkAndDocuments />
    </section>
    <section id="standards">
       <FAQSection />
    </section>
  </main>
);

function App() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Router>
      <ScrollToHash />
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
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutProgram />} />
            </Routes>

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
    </Router>
  );
}

export default App;