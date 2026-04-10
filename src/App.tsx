// App.js
import  { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ArabHalalProgram from "./components/ArabHalalProgram";
import ExploreSectors from "./components/PrioritySection";
import AccreditationWorkflow from "./components/AccreditationWorkflow";
import OfficialMarkAndDocuments from "./components/OfficialMarkAndDocuments";
import FAQSection from "./components/FaqSection";

function App() {
  const [lang, setLang] = useState<"ar" | "en">("ar");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`min-h-screen ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <Navbar lang={lang} setLang={setLang} />
      <main>
        <Hero  />
        <ArabHalalProgram />
        <AccreditationWorkflow />
        <ExploreSectors />
        <OfficialMarkAndDocuments />
        <FAQSection />
      </main>

      {/* CSS Injection for Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;600;700&family=Inter:wght@400;700&display=swap');
        
        .font-arabic { font-family: 'Readex Pro', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        /* ISO Aesthetic Fixes */
        button { border-radius: 0 !important; }
      `}</style>
    </div>
  );
}

export default App;