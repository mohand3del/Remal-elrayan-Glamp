import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../LanguageContext";

interface PreloaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export default function Preloader({ onComplete, forceShow = false }: PreloaderProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    t("preloaderStage0"),
    t("preloaderStage1"),
    t("preloaderStage2"),
    t("preloaderStage3"),
  ];

  useEffect(() => {
    let stageInterval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % stages.length);
    }, 700);

    let timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) {
        onComplete();
      }
    }, 3200);

    return () => {
      clearInterval(stageInterval);
      clearTimeout(timer);
    };
  }, [onComplete, stages.length]);

  if (!loading && !forceShow) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-desert-offwhite text-desert-dark cursor-wait select-none"
      >
        <div className="absolute top-8 left-8 flex items-center space-x-2">
          <span className="font-mono text-xs tracking-widest text-desert-dark/40">{t("preloaderEst")}</span>
        </div>

        <div className="absolute top-8 right-8 flex items-center space-x-2">
          <span className="font-mono text-xs tracking-widest text-desert-dark/45">{t("preloaderSilent")}</span>
        </div>

        <div className="relative flex flex-col items-center justify-center max-w-md px-6 text-center">
          {/* Shifting Line Motion Graphic - Dune -> Dome -> Oasis Cycle */}
          <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
            {/* Soft Ambient Radial Blur (Oasis Concept) */}
            <motion.div
              animate={{
                scale: [1, 1.15, 0.95, 1],
                opacity: [0.3, 0.5, 0.4, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-36 h-36 bg-desert-blue blur-3xl opacity-30 rounded-full"
            />

            {/* Dynamic Morphing Vector Shape */}
            <svg
              viewBox="0 0 200 200"
              className="w-40 h-40"
              style={{ overflow: "visible" }}
            >
              {/* Outer circle rotating slowly */}
              <motion.circle
                cx="100"
                cy="100"
                r="72"
                fill="none"
                stroke="#C3DBEB"
                strokeWidth="1"
                strokeDasharray="4 8"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              {/* Shifting Dune-into-Geodesic Dome path */}
              <motion.path
                d="M 30,140 Q 100,20 170,140" // Dome/Dune shape
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: [0, 1, 1, 0],
                  d: [
                    "M 30,140 Q 100,50 170,140", // Curve 1: Sand Dune
                    "M 30,140 L 65,75 L 100,40 L 135,75 L 170,140 Z", // Structural Dome Geometric Lines
                    "M 30,140 Q 100,10 170,140", // High Arch
                    "M 30,140 Q 100,50 170,140" // Return
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Geodesic internal struts appearing elegantly with custom stroke */}
              <motion.path
                d="M 65,75 L 100,140 M 135,75 L 100,140 M 100,40 L 100,140"
                fill="none"
                stroke="#C3DBEB"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0, 1, 1, 0, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Floating starlight indicator */}
              <motion.circle
                cx="100"
                cy="40"
                r="4"
                fill="#C3DBEB"
                animate={{
                  y: [-3, 3, -3],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </div>

          {/* Kinetic Branding Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-2"
          >
            <img
              src="/images/logo.svg"
              alt="Glamp logo"
              className="h-24 md:h-28 w-auto object-contain mx-auto mb-2"
            />
            <p className="font-mono text-[10px] tracking-widest text-[#777] uppercase">
              {t("brandSubtitle")}
            </p>
          </motion.div>

          {/* Sliding Phase Indicators */}
          <div className="h-6 overflow-hidden mt-6 relative w-72">
            <AnimatePresence mode="wait">
              <motion.div
                key={stages[currentStage]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="font-sans text-xs tracking-wide text-desert-charcoal text-center"
              >
                {stages[currentStage]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sleek Horizontal Loading Bar */}
          <div className="w-48 h-[2px] bg-desert-blue/30 mt-6 relative overflow-hidden rounded-full">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{
                duration: 3.2,
                ease: "easeInOut",
              }}
              className="absolute top-0 bottom-0 w-1/2 bg-desert-dark"
            />
          </div>
        </div>

        {/* Footer info decoration */}
        <div className="absolute bottom-8 text-center">
          <p className="font-mono text-[9px] tracking-widest text-desert-dark/30 uppercase">
            Wadi El Rayan Nature Protectorate • Fayoum Oasis, Egypt
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
