// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ArabHalalProgram from "./components/ArabHalalProgram";
import CompanySearch from "./components/CompanySearch";
import AccreditationWorkflow from "./components/AccreditationWorkflow";
import OfficialMarkAndDocuments from "./components/OfficialMarkAndDocuments";
import InternationalRecognition from "./components/InternationalRecognition";
import FAQSection from "./components/FaqSection";
import PrioritySection from "./components/PrioritySection";
import { Hero } from "./components/Hero";
import Footer from "./components/Footer";
import { ChatbotWidget } from "./components/ChatbotWidget";
import FontSwitcher from "./components/FontSwitcher";
import AboutProgram from "./about-us/page";
import CertificateVerification from "./pages/CertificateVerification";
import JoinProgram from "./pages/JoinProgram";
import JoinedCountries from "./pages/JoinedCountries";
import HalalSectorAuthorities from "./pages/HalalSectorAuthorities";
import DocumentsModels from "./pages/Documents/page";
import ProgramGoals from "./pages/ProgramGoals";
import ProgramScope from "./pages/ProgramScope";
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
    <section id="scope">
       <PrioritySection />
    </section>
    <section id="join">
       <AccreditationWorkflow />
    </section>
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
            <Route path="/program-definition" element={<AboutProgram />} />
            <Route path="/program-goals" element={<ProgramGoals />} />
            <Route path="/program-scope" element={<ProgramScope />} />
            <Route path="/joined-countries" element={<JoinedCountries />} />
            <Route path="/halal-sector-authorities" element={<HalalSectorAuthorities />} />
            <Route path="/certificate-verification" element={<CertificateVerification />} />
            <Route path="/join-program" element={<JoinProgram />} />
            <Route path="/documents" element={<DocumentsModels />} />
          </Routes>

          <Footer lang={lang} onChatOpen={() => setIsChatOpen(true)} />

          <ChatbotWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
          <FontSwitcher />

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Cairo:wght@400;500;600;700;800;900&family=Changa:wght@400;500;600;700;800&family=El+Messiri:wght@400;500;600;700&family=Harmattan:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Lalezar&family=Lateef:wght@400;500;600;700;800&family=Mada:wght@400;500;600;700;900&family=Markazi+Text:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@400;500;600;700;800&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700;800&family=Parastoo:wght@400;700&family=Rakkas&family=Readex+Pro:wght@200;300;400;500;600;700&family=Reem+Kufi:wght@400;500;600;700&family=Rubik:wght@400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap');
            
            :root {
              --font-heading-ar: 'Noto Kufi Arabic', sans-serif;
              --font-body-ar: 'Noto Sans Arabic', sans-serif;
              font-family: var(--font-body-ar);
            }

            .font-arabic, .font-sans { 
              font-family: var(--font-body-ar); 
            }
            
            h1, h2, h3, h4, h5, h6 {
              font-family: var(--font-heading-ar);
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
