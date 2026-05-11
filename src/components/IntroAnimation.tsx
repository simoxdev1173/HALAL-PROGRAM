import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3200); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { 
              duration: 1.4, 
              ease: [0.85, 0, 0.15, 1],
            }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 overflow-hidden"
        >
          {/* Background Image with Deep Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero-photo.png" 
              alt="Background" 
              className="w-full h-full object-cover object-center opacity-30 scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90"></div>
          </div>

          {/* Main Logo and Text Container */}
          <motion.div 
            exit={{ 
              y: -150,
              opacity: 0,
              transition: { duration: 0.8, ease: "easeIn" }
            }}
            className="relative z-10 flex flex-col items-center w-full px-4"
          >
            <motion.div
              initial={{ scale: 0.4, opacity: 0, filter: "blur(20px)" }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                filter: "blur(0px)",
                transition: { 
                  duration: 1.8, 
                  ease: [0.34, 1.56, 0.64, 1] 
                }
              }}
              className="relative mb-16 flex items-center justify-center"
            >
              {/* Powerful Whitish Aura (Radial Glow) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.8, scale: 1.2 }}
                transition={{ duration: 2.5, delay: 0.2 }}
                className="absolute w-[150%] h-[150%] bg-white/30 rounded-full blur-[80px] pointer-events-none"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 2, delay: 0.4 }}
                className="absolute w-[110%] h-[110%] bg-white rounded-full blur-[40px] pointer-events-none"
              />
              
              <img 
                src="/logo.svg" 
                alt="AIDSMO Logo" 
                className="h-64 md:h-80 lg:h-[40vh] w-auto object-contain relative z-10 drop-shadow-[0_0_50px_rgba(255,255,255,0.6)]"
              />
              
              {/* Expanding Rings */}
              {[...Array(4)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ 
                    scale: 3.5, 
                    opacity: [0, 0.2, 0],
                    transition: { 
                      duration: 4, 
                      repeat: Infinity,
                      delay: i * 0.9,
                      ease: "easeOut"
                    }
                  }}
                  className="absolute inset-0 border border-white/5 rounded-full"
                />
              ))}
            </motion.div>

            {/* Cinematic Brand Name */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: { delay: 1.2, duration: 1.2 }
              }}
              className="text-center w-full"
            >
              <motion.h1 
                initial={{ letterSpacing: "0.5em", opacity: 0 }}
                animate={{ letterSpacing: "0.15em", opacity: 1 }}
                transition={{ delay: 1.2, duration: 1.8, ease: "easeOut" }}
                className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-black text-white leading-none uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] tracking-[0.15em]"
              >
                البرنامج العربي للحلال
              </motion.h1>
            </motion.div>
          </motion.div>

          {/* Decorative Ambient Colors */}
          <div className="absolute inset-0 pointer-events-none z-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 3 }}
              className="absolute top-[-20%] right-[-20%] w-[80%] aspect-square bg-[#EEB422] rounded-full blur-[180px]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 3, delay: 0.5 }}
              className="absolute bottom-[-20%] left-[-20%] w-[80%] aspect-square bg-[#007A55] rounded-full blur-[180px]"
            />
          </div>

          {/* Elegant Loading Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="absolute bottom-20 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent origin-center z-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
