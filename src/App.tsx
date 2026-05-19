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
import Footer from "./components/Footer";
import { ChatbotWidget } from "./components/ChatbotWidget";
import AboutProgram from "./about-us/page";
import CertificateVerification from "./pages/CertificateVerification";
import JoinProgram from "./pages/JoinProgram";
import JoinedCountries from "./pages/JoinedCountries";
import DocumentsModels from "./pages/Documents/page";
import { motion } from "framer-motion";

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
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Router>
      <ScrollToHash />
      <div className="bg-slate-950"> {/* Base background to prevent white flashes */}
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
            <Route path="/joined-countries" element={<JoinedCountries />} />
            <Route path="/certificate-verification" element={<CertificateVerification />} />
            <Route path="/join-program" element={<JoinProgram />} />
            <Route path="/documents" element={<DocumentsModels />} />
          </Routes>

          <Footer lang={lang} onChatOpen={() => setIsChatOpen(true)} />

          <ChatbotWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&display=swap');
            
            :root {
              font-family: 'Readex Pro', sans-serif;
            }

            .font-arabic, .font-sans { 
              font-family: 'Readex Pro', sans-serif; 
            }
            
            h1, h2, h3, h4, h5, h6 {
              font-family: 'Readex Pro', sans-serif;
              font-weight: 700;
            }
            
            /* Professional transitions */
            a, button, [role="button"] {
              transition: all 0.2s ease-out;
            }
            
            @media (prefers-reduced-motion: reduce) {
              *, ::before, ::after {
                animation-delay: -1ms !important;
                animation-duration: 1ms !important;
                animation-iteration-count: 1 !important;
                background-attachment: initial !important;
                scroll-behavior: auto !important;
                transition-duration: 0s !important;
                transition-delay: 0s !important;
              }
            }
          `}</style>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;