// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import FloatingBreadcrumb from "./components/FloatingBreadcrumb";
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
    <section id="home">
      <Hero />
    </section>
    <section id="about">
       <ArabHalalProgram />
    </section>
    <section id="scope">
       <PrioritySection />
    </section>
    <section id="join">
       <AccreditationWorkflow />
    </section>
    <section id="verify">
      <CompanySearch />
    </section>
    <section id="recognition">
      <InternationalRecognition />
    </section>
    <section id="directory">
       <OfficialMarkAndDocuments />
    </section>
    <section id="standards">
       <FAQSection />
    </section>
  </main>
);

function App() {
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "ar").startsWith("en") ? "en" : "ar";
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (nextLang: "ar" | "en") => {
    void i18n.changeLanguage(nextLang);
  };

  return (
    <Router>
      <ScrollToHash />
      <div className="bg-slate-950"> {/* Base background to prevent white flashes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`min-h-screen bg-white lang-shell ${lang === 'ar' ? 'font-arabic' : 'font-english'}`}
        >
          <Navbar lang={lang} setLang={setLang} />
          <FloatingBreadcrumb />
          
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
            @import url('https://fonts.googleapis.com/css2?family=Afacad:wght@400;500;600;700;800&family=Almarai:wght@300;400;700;800&family=Cairo:wght@400;500;600;700;800;900&family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Noto+Sans+Arabic:wght@400;500;600;700;800&family=Readex+Pro:wght@200;300;400;500;600;700&family=Tajawal:wght@300;400;500;700;800;900&display=swap');
            
            :root {
              --font-heading-ar: 'Almarai', sans-serif;
              --font-body-ar: 'Noto Sans Arabic', sans-serif;
              --font-heading-en: 'Fraunces', Georgia, serif;
              --font-body-en: 'Afacad', sans-serif;
              font-family: var(--font-body-ar);
            }

            .lang-shell {
              transition: font-family 240ms ease, letter-spacing 240ms ease;
            }

            .font-arabic { 
              font-family: var(--font-body-ar); 
            }

            .font-english {
              font-family: var(--font-body-en);
            }
            
            .font-arabic h1,
            .font-arabic h2,
            .font-arabic h3,
            .font-arabic h4,
            .font-arabic h5,
            .font-arabic h6 {
              font-family: var(--font-heading-ar);
              font-weight: 700;
              letter-spacing: 0;
            }

            .font-english h1,
            .font-english h2,
            .font-english h3,
            .font-english h4,
            .font-english h5,
            .font-english h6 {
              font-family: var(--font-heading-en);
              font-weight: 700;
              letter-spacing: 0;
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
