import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Sparkles, MapPin, Phone, Mail, Instagram, ArrowDown, Wind, Star, Linkedin, ChevronDown, Globe } from "lucide-react";
import { useLanguage, Language } from "./LanguageContext";

// Import custom components
import Preloader from "./components/Preloader";
import Accommodations from "./components/Accommodations";
import DesertExperiences from "./components/DesertExperiences";
import LummayyaMenu from "./components/LummayyaMenu";
import LummayyaBooking from "./components/LummayyaBooking";
import PolicyPage from "./components/PolicyPage";
import ExperienceHub from "./components/ExperienceHub";
import ScrollReveal from "./components/ScrollReveal";
import Gallery from "./components/Gallery";
import WeatherWidget from "./components/WeatherWidget";
import VisionMission from "./components/VisionMission";
import Consultancy from "./components/Consultancy";
import { PalmTree, AcaciaTree } from "./components/DesertTree";
import { ProtectorateMap } from "./components/ProtectorateMap";
import BookingGuide from "./components/BookingGuide";

export default function App() {
  const { t, language, setLanguage } = useLanguage();
  const [showPreloader, setShowPreloader] = useState(true);
  const [userHasVisited, setUserHasVisited] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "accommodations" | "restaurant" | "experiences" | "gallery" | "policies" | "booking-guide">("home");
  const [homeSection, setHomeSection] = useState<"all" | "story" | "map" | "philosophy" | "consultancy">("all");
  const [nationality, setNationality] = useState<"egyptian" | "non-egyptian">("egyptian");
  const [currency, setCurrency] = useState<"EGP" | "USD">("EGP");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    if (!isLangDropdownOpen) return;
    const handleOutsideClick = () => {
      setIsLangDropdownOpen(false);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isLangDropdownOpen]);

  // Synchronize currency with nationality toggler
  useEffect(() => {
    if (nationality === "egyptian") {
      setCurrency("EGP");
    } else {
      setCurrency("USD");
    }
  }, [nationality]);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setUserHasVisited(true);
  };

  const handleReplayPreloader = () => {
    setShowPreloader(true);
  };

  return (
    <div className="min-h-screen bg-desert-offwhite text-desert-dark relative antialiased selection:bg-desert-blue selection:text-desert-dark md:border-[12px] border-black">
      {/* Dynamic Vertical Side Tag Label representing Nature Protectorate Egypt from the spec */}
      <div className="hidden xl:flex fixed bottom-32 left-0 -rotate-90 origin-bottom-left items-center gap-4 z-30 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.5em] text-black/35 font-bold ml-12">Nature Protectorate Egypt</span>
        <div className="w-24 h-px bg-black/15"></div>
      </div>

      {/* 1. Global Preloader Controller */}
      <AnimatePresence>
        {showPreloader && (
          <Preloader onComplete={handlePreloaderComplete} forceShow={showPreloader} />
        )}
      </AnimatePresence>

      {/* 2. Sleek Editorial Navigation Bar Header */}
      <header className="sticky top-0 z-40 w-full bg-[#F4EFE3]/95 backdrop-blur-md border-b-2 border-black transition-all duration-300 select-none">
        {/* Top Utility Row (Desktop Only) */}
        <div className="hidden lg:flex w-full bg-[#FAF9F6] border-b border-black/10 py-2 px-6 md:px-12 justify-between items-center text-[10px] font-mono font-bold tracking-wider text-[#555]">
          <div className="flex items-center gap-4 divide-x divide-black/10">
            <a 
              href="https://maps.app.goo.gl/Ujt42ERXYAQbvkec8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 uppercase hover:text-desert-blue transition-colors group"
            >
              <MapPin size={11} className="text-desert-blue shrink-0 animate-bounce group-hover:scale-110 transition-transform" />
              <span>Wadi El Rayan • Egypt <span className="text-[#888] font-normal">({language === "ar" ? "خرائط جوجل" : "Google Maps"})</span></span>
            </a>
            <div className="pl-4 flex items-center gap-2">
              <span className="uppercase text-[#888]">{language === "ar" ? "الطقس الآن:" : "CURRENT WEATHER:"}</span>
              <WeatherWidget />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Nationality Toggle */}
            <div className="flex items-center bg-[#F4EFE3] border border-black p-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              <button
                type="button"
                onClick={() => setNationality("egyptian")}
                className={`px-2 py-0.5 font-mono uppercase tracking-wider cursor-pointer font-bold transition-all text-[9px] ${
                  nationality === "egyptian" ? "bg-black text-white" : "text-black hover:bg-neutral-200"
                }`}
              >
                🇪🇬 {language === "ar" ? "مصرى" : "EGY"}
              </button>
              <button
                type="button"
                onClick={() => setNationality("non-egyptian")}
                className={`px-2 py-0.5 font-mono uppercase tracking-wider cursor-pointer font-bold transition-all text-[9px] ${
                  nationality === "non-egyptian" ? "bg-black text-white" : "text-black hover:bg-neutral-200"
                }`}
              >
                🌐 {language === "ar" ? "أجنبى" : "INT"}
              </button>
            </div>

            {/* Elegant Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangDropdownOpen((prev) => !prev);
                }}
                className="flex items-center gap-1.5 bg-[#F4EFE3] border border-black px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-200 transition-all h-[22px]"
                aria-haspopup="listbox"
                aria-expanded={isLangDropdownOpen}
              >
                {(() => {
                  const currentLang = [
                    { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
                    { code: "ar", label: "العربية", short: "AR", flag: "🇪🇬" },
                    { code: "es", label: "Español", short: "ES", flag: "🇪🇸" },
                    { code: "fr", label: "Français", short: "FR", flag: "🇫🇷" },
                    { code: "de", label: "Deutsch", short: "DE", flag: "🇩🇪" },
                    { code: "ja", label: "日本語", short: "JA", flag: "🇯🇵" },
                    { code: "el", label: "Ελληνικά", short: "EL", flag: "🇬🇷" }
                  ].find((l) => l.code === language) || { code: "en", label: "English", short: "EN", flag: "🇬🇧" };
                  return (
                    <>
                      <span className="text-[10px]">{currentLang.flag}</span>
                      <span>{currentLang.short}</span>
                    </>
                  );
                })()}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-1 w-32 bg-[#F4EFE3] border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-50 overflow-hidden divide-y divide-black/10"
                    role="listbox"
                  >
                    {[
                      { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
                      { code: "ar", label: "العربية", short: "AR", flag: "🇪🇬" },
                      { code: "es", label: "Español", short: "ES", flag: "🇪🇸" },
                      { code: "fr", label: "Français", short: "FR", flag: "🇫🇷" },
                      { code: "de", label: "Deutsch", short: "DE", flag: "🇩🇪" },
                      { code: "ja", label: "日本語", short: "JA", flag: "🇯🇵" },
                      { code: "el", label: "Ελληνικά", short: "EL", flag: "🇬🇷" }
                    ].map((langObj) => {
                      const isSelected = language === langObj.code;
                      return (
                        <button
                          key={langObj.code}
                          type="button"
                          onClick={() => {
                            setLanguage(langObj.code as Language);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1 text-left font-mono text-[9px] tracking-wider cursor-pointer font-bold transition-colors ${
                            isSelected 
                              ? "bg-black text-white" 
                              : "text-black hover:bg-neutral-200/60"
                          }`}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px]">{langObj.flag}</span>
                            <span>{langObj.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Replay preloader */}
            <button
              type="button"
              onClick={handleReplayPreloader}
              className="font-mono text-[9px] tracking-widest bg-black text-[#F4EFE3] hover:bg-[#c8b9a6] hover:text-black px-2.5 py-0.5 uppercase border border-black cursor-pointer shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all flex items-center space-x-1 font-bold h-[22px]"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#c8b9a6]" />
              <span>{t("replay")}</span>
            </button>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="py-5 md:py-6 px-4 md:px-12 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 transition-all duration-300">
          <div className="flex flex-col">
            <button 
              type="button"
              onClick={() => {
                setActiveTab("home");
              }}
              className="text-left cursor-pointer"
            >
              <img
                src="/images/logo.svg"
                alt="Glamp logo"
                className="h-20 md:h-24 lg:h-28 xl:h-32 w-auto min-w-[220px] object-contain"
              />
            </button>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#777] uppercase mt-0.5 flex items-center gap-1 lg:hidden">
              <span>Wadi El Rayan • Egypt</span>
            </span>
          </div>

          {/* Enhanced Responsive Navigation Tabs */}
          <nav className="flex w-full lg:w-auto gap-2 justify-start lg:justify-center items-center overflow-x-auto pb-1 lg:pb-0 [-webkit-overflow-scrolling:touch]">
            {[
              { id: "home", label: t("home"), num: "01" },
              { id: "accommodations", label: t("accommodations"), num: "02" },
              { id: "restaurant", label: t("restaurant"), num: "03" },
              { id: "experiences", label: t("experiences"), num: "04" },
              { id: "gallery", label: (() => {
                const labels: Record<string, string> = {
                  en: "Gallery",
                  ar: "معرض الصور",
                  es: "Galería",
                  fr: "Galerie",
                  de: "Galerie",
                  ja: "ギャラリー"
                };
                return labels[language] || labels.en;
              })(), num: "05" },
              { id: "policies", label: t("policies"), num: "06" },
              { id: "booking-guide", label: (() => {
                const labels: Record<string, string> = {
                  en: "Booking Guide",
                  ar: "دليل الحجز",
                  es: "Guía de Reserva",
                  fr: "Guide de Réservation",
                  de: "Buchungsleitfaden",
                  ja: "予約ガイド"
                };
                return labels[language] || labels.en;
              })(), num: "07" }
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button 
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)} 
                  className={`relative shrink-0 px-3 md:px-4 py-2 font-mono text-[10px] tracking-widest uppercase font-extrabold transition-all duration-300 cursor-pointer border-2 whitespace-nowrap ${
                    isSelected 
                      ? "text-white border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]" 
                      : "bg-[#F4EFE3] text-[#333] border-black/10 hover:border-black hover:bg-white"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-black z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center">
                    <span className={`text-[9px] mr-1.5 font-bold transition-colors duration-300 ${isSelected ? "text-desert-blue" : "text-desert-blue/80"}`}>{tab.num}.</span>
                    <span>{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {activeTab === "home" && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-16">
          {/* 1. Cinematic Branded Header */}
          <ScrollReveal delay={0.1}>
            <div className="border-b-2 border-black pb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-desert-blue uppercase block mb-1.5 font-bold">
                  {t("established2021")}
                </span>
                <img
                  src="/images/home-intro-glamp.jpeg"
                  alt="Remal el Rayan glamp at night"
                  className="w-full max-w-2xl aspect-video object-cover border-2 border-black shadow-brutalist"
                />
                <p className="font-sans text-xs text-desert-charcoal/70 max-w-2xl mt-3 leading-relaxed">
                  {t("glampDescription")}
                </p>
              </div>
              
              <div className="border border-black p-4 bg-[#F4EFE3] font-mono text-[10px] flex flex-col space-y-1.5 max-w-xs shrink-0 shadow-brutalist">
                <div className="flex justify-between border-b border-black/5 pb-1">
                  <span className="text-[#777]">{t("coordinates")}</span>
                  <a 
                    href="https://maps.app.goo.gl/Ujt42ERXYAQbvkec8" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-semibold text-desert-blue hover:underline flex items-center gap-1"
                  >
                    <span>29.2818° N, 30.4344° E</span>
                    <MapPin size={9} className="animate-bounce" />
                  </a>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-1">
                  <span className="text-[#777]">{t("classification")}</span>
                  <span className="font-semibold text-black">{t("classificationValue")}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-1">
                  <span className="text-[#777]">{language === "ar" ? "الموقع الجغرافي" : "GOOGLE MAPS"}</span>
                  <a 
                    href="https://maps.app.goo.gl/Ujt42ERXYAQbvkec8" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-bold text-desert-blue hover:underline uppercase text-[9px]"
                  >
                    {language === "ar" ? "عرض الاتجاهات ↗" : "Get Directions ↗"}
                  </a>
                </div>
                <div className="flex justify-between text-[9px] text-[#888] font-semibold">
                  <span>{t("fayoumEgypt")}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Home Section Navigation Tabs */}
          <ScrollReveal delay={0.25}>
            <div className="bg-[#FAF9F6] border-2 border-black p-2 shadow-brutalist flex flex-col md:flex-row items-grid md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 px-2">
                <Compass className="w-4 h-4 text-desert-blue animate-spin-slow" />
                <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase font-bold">
                  {language === "ar" ? "تصفح أقسام رمال" : "EXPLORE REMAL SECTIONS"}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {[
                  { id: "all", en: "All Sections", ar: "جميع الأقسام", es: "Todo", fr: "Toutes les Sections", de: "Alle Bereiche", ja: "すべてのセクション" },
                  { id: "story", en: "Our Story & Oasis", ar: "قصتنا والواحة", es: "Nuestra Historia", fr: "Notre Histoire & Oasis", de: "Geschichte & Oase", ja: "ストーリー＆オアシス" },
                  { id: "map", en: "Adventure Atlas", ar: "الأطلس التفاعلي", es: "Atlas de Aventura", fr: "Atlas d'Aventure", de: "Abenteuer-Atlas", ja: "アドベンチャーアトラス" },
                  { id: "philosophy", en: "Our Philosophy", ar: "فلسفتنا ورؤيتنا", es: "Filosofía", fr: "Notre Philosophie", de: "Unsere Philosophie", ja: "経営理念とビジョン" },
                  { id: "consultancy", en: "Consultancy & Team", ar: "الاستشارات والفريق", es: "Consultoría", fr: "Conseil & Équipe", de: "Consulting & Team", ja: "コンサル＆チーム" },
                ].map((sec) => {
                  const isActive = homeSection === sec.id;
                  const label = sec[language] || sec.en;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setHomeSection(sec.id as any)}
                      className={`flex-1 md:flex-initial text-center px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-wider font-extrabold border-2 transition-all cursor-pointer ${
                        isActive
                          ? "bg-black text-[#F4EFE3] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                          : "bg-white text-[#333] border-black/15 hover:border-black/50"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* 2. Brand Identity & Redefining Luxury Eco-Tourism */}
          {(homeSection === "all" || homeSection === "story") && (
            <ScrollReveal>
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase block font-bold">
                  {t("conceptPhilosophy")}
                </span>
                <div className="space-y-3">
                  <img
                    src="/images/logo.svg"
                    alt="Glamp logo"
                    className="h-20 md:h-24 lg:h-28 w-auto object-contain"
                  />
                  <h2 className="font-serif text-3xl uppercase tracking-tight text-desert-dark">
                    <span className="text-desert-blue">{t("redefiningLuxuryTitle")}</span>
                  </h2>
                </div>
                <p className="font-sans text-xs text-desert-charcoal/95 leading-relaxed">
                  {t("sandMeaning")}
                </p>
                <p className="font-sans text-xs text-desert-charcoal/80 leading-relaxed">
                  {t("adventureComfort")}
                </p>
                
                <div className="border-l-2 border-desert-blue pl-4 py-1 italic font-serif text-sm text-neutral-700">
                  {t("balanceQuote")}
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#F4EFE3] border-2 border-black p-6 md:p-8 shadow-brutalist space-y-8">
                <div className="border-b border-black/10 pb-4">
                  <span className="font-mono text-[9px] tracking-widest text-desert-blue uppercase block font-bold mb-1">
                    {t("boardVision")}
                  </span>
                  <h3 className="font-serif text-xl font-bold uppercase text-black">{t("strategicRepositioning")}</h3>
                  <p className="font-sans text-xs text-neutral-600 mt-2 leading-relaxed">
                    {t("strategicDesc")}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[9px] tracking-widest text-desert-blue uppercase block font-bold mb-1">
                    {t("heritageImpact")}
                  </span>
                  <h3 className="font-serif text-xl font-bold uppercase text-black">{t("sustainableHeritage")}</h3>
                  <p className="font-sans text-xs text-neutral-600 mt-2 leading-relaxed">
                    {t("heritageDesc")}
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>
          )}

          {/* 3. Location Description Section */}
          {(homeSection === "all" || homeSection === "story") && (
            <ScrollReveal>
              <section className="bg-[#F4EFE3] border-2 border-black p-6 md:p-8 shadow-brutalist grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-desert-blue" />
                  <span className="font-mono text-[9px] tracking-widest text-[#777] uppercase font-bold">
                    {t("locationPortfolio")}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-tight text-desert-dark">
                  {t("sacredOasisTitle")}
                </h3>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                  {t("sacredOasisDesc1")}
                </p>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                  {t("sacredOasisDesc2")}
                </p>
                
                <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="border-l-2 border-desert-blue pl-3">
                    <span className="text-[#888] text-[9px] block uppercase">{t("distanceCairo")}</span>
                    <span className="font-bold text-black mt-0.5 block">{t("distanceCairoVal")}</span>
                  </div>
                  <div className="border-l-2 border-desert-blue pl-3">
                    <span className="text-[#888] text-[9px] block uppercase">{t("sandType")}</span>
                    <span className="font-bold text-black mt-0.5 block">{t("sandTypeVal")}</span>
                  </div>
                  <div className="border-l-2 border-desert-blue pl-3">
                    <span className="text-[#888] text-[9px] block uppercase">{t("nearestWaterbody")}</span>
                    <span className="font-bold text-black mt-0.5 block">{t("nearestWaterbodyVal")}</span>
                  </div>
                  <div className="border-l-2 border-desert-blue pl-3">
                    <span className="text-[#888] text-[9px] block uppercase">{t("placeHistory")}</span>
                    <span className="font-bold text-desert-blue mt-0.5 block">{t("placeHistoryVal")}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative border-2 border-black p-6 bg-[#F4EFE3] h-64 overflow-hidden group flex flex-col justify-between">
                <div className="absolute inset-0 bg-[radial-gradient(#C8B9A6_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                <div className="relative z-10 font-mono space-y-1">
                  <span className="text-[9px] text-[#777] uppercase block tracking-wider">{t("geoGridMap")}</span>
                  <span className="text-sm font-serif font-bold text-black block tracking-tight">WADI EL RAYAN ATLAS</span>
                  <div className="w-12 h-0.5 bg-desert-green" />
                </div>
                
                <div className="relative z-10 py-1 flex items-center gap-3">
                  <PalmTree className="text-desert-green shrink-0 animate-float-slow" size={36} color="#2E5A44" />
                  <span className="font-sans text-[11px] text-neutral-600 leading-normal">
                    {language === "ar" 
                      ? "استخدم جهاز الأطلس التفاعلي بالأسفل لتتبع مسارات الجيب الوعرة ورصد إحداثيات الجبل ومصادر المياه." 
                      : "Use the live map system below to trace off-road Jeep trails, inspect grid coordinates, and toggle protected landmarks."}
                  </span>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row gap-2">
                  <button 
                    type="button"
                    onClick={() => {
                      document.getElementById("interactive-protectorate-map")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 text-center py-2 px-3 border-2 border-black bg-white text-black font-mono text-[9px] font-extrabold tracking-wider uppercase hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Compass size={11} className="animate-spin-slow" />
                    <span>{language === "ar" ? "تشغيل الأطلس" : "LAUNCH ATLAS"}</span>
                  </button>
                  <a 
                    href="https://maps.app.goo.gl/Ujt42ERXYAQbvkec8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 px-3 border-2 border-black bg-[#E8DFD0] text-black font-mono text-[9px] font-extrabold tracking-wider uppercase hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <MapPin size={11} className="text-desert-blue animate-bounce" />
                    <span>{language === "ar" ? "خرائط جوجل" : "GOOGLE MAPS"}</span>
                  </a>
                </div>
              </div>
            </section>
          </ScrollReveal>

          )}

          {/* Fully Interactive Protectorate Map Section */}
          {(homeSection === "all" || homeSection === "map") && (
            <ScrollReveal>
              <ProtectorateMap />
            </ScrollReveal>
          )}

          {/* New Interactive Gallery Section & Desert Green Living Oasis Feature */}
          {(homeSection === "all" || homeSection === "story") && (
            <>
              <ScrollReveal>
                <Gallery />
              </ScrollReveal>
            </>
          )}

          {/* Vision and Mission Section */}
          {(homeSection === "all" || homeSection === "philosophy") && (
            <ScrollReveal>
              <VisionMission />
            </ScrollReveal>
          )}

          {/* Why Did We Start in Faiyum? Section */}
          {(homeSection === "all" || homeSection === "story") && (
            <ScrollReveal>
              <section className="bg-[#F4EFE3] border-2 border-black p-6 md:p-10 shadow-brutalist relative overflow-hidden space-y-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#C8B9A6_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
              <div className="max-w-3xl space-y-4">
                <span className="font-mono text-[9px] tracking-widest text-desert-blue uppercase font-bold block">
                  {t("conceptPhilosophy")}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight text-desert-dark">
                  {t("whyFayoumTitle")}
                </h2>
                <div className="w-16 h-[2px] bg-desert-blue" />
                <p className="font-serif text-base md:text-lg text-neutral-800 leading-relaxed italic">
                  "{t("whyFayoumOpening")}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-black/10">
                <div className="space-y-3">
                  <h3 className="font-serif text-lg uppercase tracking-tight text-desert-dark">
                    {t("whyFayoumCradleTitle")}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-neutral-600 leading-relaxed">
                    {t("whyFayoumCradleDesc")}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-lg uppercase tracking-tight text-desert-dark">
                    {t("whyFayoumCommitmentTitle")}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-neutral-600 leading-relaxed">
                    {t("whyFayoumCommitmentDesc")}
                  </p>
                </div>
              </div>
            </section>
          </ScrollReveal>
          )}

          {/* Management Philosophy Section */}
          {(homeSection === "all" || homeSection === "philosophy") && (
            <ScrollReveal>
              <section className="bg-white border-2 border-black p-6 md:p-10 shadow-brutalist relative overflow-hidden space-y-8">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(#C8B9A6_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
              
              <div className="max-w-4xl space-y-4 relative z-10">
                <span className="font-mono text-[9px] tracking-widest text-desert-blue uppercase font-bold block">
                  {language === "ar" ? "رؤيتنا الإدارية" : "OUR DIRECTION"}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight text-desert-dark">
                  {t("mgmtTitle")}
                </h2>
                <div className="w-16 h-[2px] bg-desert-blue" />
                
                <div className="font-sans text-sm md:text-base text-neutral-800 leading-relaxed space-y-4">
                  {t("mgmtIntro").split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-black/10 relative z-10">
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#777] font-bold mb-6">
                  {t("mgmtWhyHeader")}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Point 1 */}
                  <div className="border border-black p-5 bg-[#faf9f6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                    <div className="font-mono text-[9px] text-desert-blue font-bold mb-2">01 / CONCEPT</div>
                    <h4 className="font-serif text-lg uppercase tracking-tight text-desert-dark mb-2">
                      {t("mgmtPioneeringTitle")}
                    </h4>
                    <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                      {t("mgmtPioneeringDesc")}
                    </p>
                  </div>

                  {/* Point 2 */}
                  <div className="border border-black p-5 bg-[#faf9f6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                    <div className="font-mono text-[9px] text-desert-blue font-bold mb-2">02 / IMPACT</div>
                    <h4 className="font-serif text-lg uppercase tracking-tight text-desert-dark mb-2">
                      {t("mgmtEmpoweringTitle")}
                    </h4>
                    <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                      {t("mgmtEmpoweringDesc")}
                    </p>
                  </div>

                  {/* Point 3 */}
                  <div className="border border-black p-5 bg-[#faf9f6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                    <div className="font-mono text-[9px] text-desert-blue font-bold mb-2">03 / SOUL</div>
                    <h4 className="font-serif text-lg uppercase tracking-tight text-desert-dark mb-2">
                      {t("mgmtFamilyTitle")}
                    </h4>
                    <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                      {t("mgmtFamilyDesc")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-black/10 text-center relative z-10">
                <p className="font-serif text-base text-desert-dark italic max-w-2xl mx-auto leading-relaxed">
                  "{t("mgmtFooter")}"
                </p>
              </div>
            </section>
          </ScrollReveal>
          )}

          {/* Desert Hospitality Consultancy & Organization Team Section */}
          {(homeSection === "all" || homeSection === "consultancy") && (
            <>
              <ScrollReveal>
                <Consultancy />
              </ScrollReveal>

              <ScrollReveal>
                <section className="space-y-8">
              <div className="text-center max-w-xl mx-auto">
                <span className="font-mono text-[9px] tracking-widest text-[#777] uppercase font-bold mb-2 block">
                  {t("adminHospitality")}
                </span>
                <h2 className="font-serif text-3xl uppercase tracking-wider text-desert-dark">
                  {t("orgTeamTitle")}
                </h2>
                <div className="w-16 h-[2px] bg-desert-blue mx-auto mt-3" />
                <p className="font-sans text-xs text-neutral-500 mt-4 leading-relaxed max-w-lg mx-auto">
                  {t("orgTeamDesc")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Chairman block */}
                <div className="bg-[#F4EFE3] border-2 border-black p-5 flex flex-col justify-between shadow-brutalist group hover:-translate-y-1 transition-transform">
                  <div>
                    <div className="inline-block bg-desert-blue/15 text-black border border-desert-blue/30 px-2.5 py-0.5 font-mono text-[8px] tracking-widest uppercase font-bold mb-3 rounded-full">
                      {t("chairman")}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-black group-hover:text-desert-blue transition-colors">Mostafa Farouk</h4>
                    <span className="font-mono text-[9px] text-[#aaa] uppercase tracking-wider block mt-1">{t("chairman")}</span>
                    <p className="font-sans text-xs text-neutral-500 mt-3 leading-relaxed">
                      Directs absolute high-level corporate governance and coordinates Egypt expansion blueprints.
                    </p>
                  </div>
                  <div className="border-t border-black/5 pt-3 mt-5 flex justify-between items-center text-[9px] font-mono text-[#888]">
                    <span>REMAL GROUP</span>
                    <span>EST. 2021</span>
                  </div>
                </div>

                {/* CEO block */}
                <div className="bg-[#F4EFE3] border-2 border-black p-5 flex flex-col justify-between shadow-brutalist group hover:-translate-y-1 transition-transform">
                  <div>
                    <div className="inline-block bg-desert-blue/15 text-black border border-desert-blue/30 px-2.5 py-0.5 font-mono text-[8px] tracking-widest uppercase font-bold mb-3 rounded-full">
                      {t("ceo")}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-black group-hover:text-desert-blue transition-colors">Mohamed Farouk</h4>
                    <span className="font-mono text-[9px] text-[#aaa] uppercase tracking-wider block mt-1">{t("ceo")}</span>
                    <p className="font-sans text-xs text-neutral-500 mt-3 leading-relaxed">
                      Directs all operations, overall corporate hospitality strategy, and development of our oasis retreats.
                    </p>
                  </div>
                  <div className="border-t border-black/5 pt-3 mt-5 flex justify-between items-center text-[9px] font-mono text-[#888]">
                    <span>EXECUTIVE GROUP</span>
                    <span>OFFICE OF CEO</span>
                  </div>
                </div>

                {/* GM block */}
                <div className="bg-[#F4EFE3] border-2 border-black p-5 flex flex-col justify-between shadow-brutalist group hover:-translate-y-1 transition-transform">
                  <div>
                    <div className="inline-block bg-desert-blue/15 text-black border border-desert-blue/30 px-2.5 py-0.5 font-mono text-[8px] tracking-widest uppercase font-bold mb-3 rounded-full">
                      {t("generalManager")}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-black group-hover:text-desert-blue transition-colors">Mohamed Sheta</h4>
                    <span className="font-mono text-[9px] text-[#aaa] uppercase tracking-wider block mt-1">{t("generalManager")}</span>
                    <p className="font-sans text-xs text-neutral-500 mt-3 leading-relaxed">
                      Not only oversees operations, but designs customized management systems or architectures to lead this new eco-glamping concept in Egypt and direct business development.
                    </p>
                  </div>
                  <div className="border-t border-black/5 pt-3 mt-5 flex justify-between items-center text-[9px] font-mono text-[#888]">
                    <span>SYSTEMS & DEV</span>
                    <span>CAMP OPERATIONS</span>
                  </div>
                </div>

                {/* Restaurant Manager block */}
                <div className="bg-[#F4EFE3] border-2 border-black p-5 flex flex-col justify-between shadow-brutalist group hover:-translate-y-1 transition-transform">
                  <div>
                    <div className="inline-block bg-desert-blue/15 text-black border border-desert-blue/30 px-2.5 py-0.5 font-mono text-[8px] tracking-widest uppercase font-bold mb-3 rounded-full">
                      {t("restaurantManager")}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-black group-hover:text-desert-blue transition-colors">Yasser Outhman</h4>
                    <span className="font-mono text-[9px] text-[#aaa] uppercase tracking-wider block mt-1">{t("restaurantManager")}</span>
                    <p className="font-sans text-xs text-neutral-500 mt-3 leading-relaxed">
                      Manages Lummayya restaurant, client dining services, and special slow-fire Mandi dinner events.
                    </p>
                  </div>
                  <div className="border-t border-black/5 pt-3 mt-5 flex justify-between items-center text-[9px] font-mono text-[#888]">
                    <span>CULINARY TEAM</span>
                    <span>LUMMAYYA LEADER</span>
                  </div>
                </div>

                {/* Executive Chef block */}
                <div className="bg-[#F4EFE3] border-2 border-black p-5 flex flex-col justify-between shadow-brutalist group hover:-translate-y-1 transition-transform">
                  <div>
                    <div className="inline-block bg-desert-blue/15 text-black border border-desert-blue/30 px-2.5 py-0.5 font-mono text-[8px] tracking-widest uppercase font-bold mb-3 rounded-full">
                      {t("executiveChef")}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-black group-hover:text-desert-blue transition-colors">Chef Ahmed Farouk</h4>
                    <span className="font-mono text-[9px] text-[#aaa] uppercase tracking-wider block mt-1">{t("executiveChef")}</span>
                    <p className="font-sans text-xs text-neutral-500 mt-3 leading-relaxed">
                      Heads the kitchen at Lummayya, designing bedouin-style recipes and five-hour Mandi firewood dishes.
                    </p>
                  </div>
                  <div className="border-t border-black/5 pt-3 mt-5 flex justify-between items-center text-[9px] font-mono text-[#888]">
                    <span>KITCHEN DIVISION</span>
                    <span>CREATIVE CHEF</span>
                  </div>
                </div>

                {/* Reservations Manager block */}
                <div className="bg-[#F4EFE3] border-2 border-black p-5 flex flex-col justify-between shadow-brutalist group hover:-translate-y-1 transition-transform">
                  <div>
                    <div className="inline-block bg-desert-blue/15 text-black border border-desert-blue/30 px-2.5 py-0.5 font-mono text-[8px] tracking-widest uppercase font-bold mb-3 rounded-full">
                      {t("reservationsManager")}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-black group-hover:text-desert-blue transition-colors">Habiba Mehrez</h4>
                    <span className="font-mono text-[9px] text-[#aaa] uppercase tracking-wider block mt-1">{t("reservationsManager")}</span>
                    <p className="font-sans text-xs text-neutral-500 mt-3 leading-relaxed">
                      Directs all client reservations, starlit dome allocation schedules, premium room configurations, and elite guest pre-placements.
                    </p>
                  </div>
                  <div className="border-t border-black/5 pt-3 mt-5 flex justify-between items-center text-[9px] font-mono text-desert-blue font-bold">
                    <span>RESERVATIONS</span>
                    <span>ACTIVE BOOKINGS</span>
                  </div>
                </div>

                {/* Reception Manager block */}
                <div className="bg-[#F4EFE3] border-2 border-black p-5 flex flex-col justify-between shadow-brutalist group hover:-translate-y-1 transition-transform">
                  <div>
                    <div className="inline-block bg-[#F4EFE3] text-black border border-black/20 px-2.5 py-0.5 font-mono text-[8px] tracking-widest uppercase font-bold mb-3 rounded-full">
                      {t("receptionManager")}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-black group-hover:text-desert-blue transition-colors">Mohamed Sobhi</h4>
                    <span className="font-mono text-[9px] text-[#aaa] uppercase tracking-wider block mt-1">{t("receptionManager")}</span>
                    <p className="font-sans text-xs text-neutral-500 mt-3 leading-relaxed">
                      Supervises front-of-house check-ins, guest relations coordinates, custom itineraries, and specialized client support directly 24/7.
                    </p>
                  </div>
                  <div className="border-t border-black/5 pt-3 mt-5 flex justify-between items-center text-[9px] font-mono text-desert-blue font-bold">
                    <span>RECEPTION DIRECT</span>
                    <span>ONLINE ACTIVE</span>
                  </div>
                </div>

                {/* Accountant Manager block */}
                <div className="bg-[#F4EFE3] border-2 border-black p-5 flex flex-col justify-between shadow-brutalist group hover:-translate-y-1 transition-transform">
                  <div>
                    <div className="inline-block bg-[#F4EFE3] text-black border border-black/20 px-2.5 py-0.5 font-mono text-[8px] tracking-widest uppercase font-bold mb-3 rounded-full">
                      {t("accountantManager")}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-black group-hover:text-desert-blue transition-colors">Ali Elsayed</h4>
                    <span className="font-mono text-[9px] text-[#aaa] uppercase tracking-wider block mt-1">{t("accountantManager")}</span>
                    <p className="font-sans text-xs text-neutral-500 mt-3 leading-relaxed">
                      Manages corporate finance, billing estimates, accounting records, auditing, and financial reporting for our glamping operations.
                    </p>
                  </div>
                  <div className="border-t border-black/5 pt-3 mt-5 flex justify-between items-center text-[9px] font-mono text-desert-blue font-bold">
                    <span>FINANCE DIVISION</span>
                    <span>OFFICE ACTIVE</span>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
          </>
          )}
        </div>
      )
      }

      {activeTab === "accommodations" && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <Accommodations 
            nationality={nationality}
            setNationality={setNationality}
            currency={currency}
            setCurrency={setCurrency}
            onRedirectToRestaurant={() => setActiveTab("restaurant")}
          />
        </div>
      )}

      {activeTab === "restaurant" && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 space-y-16">
          <LummayyaMenu nationality={nationality} currency={currency} />
          <LummayyaBooking 
            nationality={nationality}
            setNationality={setNationality}
            currency={currency}
            setCurrency={setCurrency}
          />
        </div>
      )}

      {activeTab === "experiences" && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <ExperienceHub />
        </div>
      )}

      {activeTab === "gallery" && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <Gallery />
        </div>
      )}

      {activeTab === "policies" && (
        <div>
          <PolicyPage />
        </div>
      )}

      {activeTab === "booking-guide" && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <BookingGuide />
        </div>
      )}

      {/* 9. Sleek Quiet-Luxury Footer */}
      <footer className="bg-desert-dark text-[#faf9f6] pt-20 pb-10 border-t border-white/5 relative z-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Fine Branding Column */}
            <div className="md:col-span-2 space-y-4">
              <img
                src="/images/logo.svg"
                alt="Glamp logo"
                className="h-20 md:h-24 w-auto object-contain brightness-0 invert"
              />
              <p className="font-sans text-xs text-[#aaa] max-w-sm leading-relaxed">
                Egypt’s premier ultra-luxury wilderness dune glamp situated within the coordinates of the legendary Wadi El Rayan nature protectorate. Merging raw desert authenticity with silent boutique hospitality.
              </p>
              <div className="flex items-center space-x-1 font-mono text-[10px] text-[#888]">
                <MapPin className="w-3.5 h-3.5 text-desert-blue" />
                <span>Wadi El Rayan Nature Protectorate, Fayoum Oasis, Egypt</span>
              </div>
            </div>

            {/* Quick navigators Column */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs tracking-widest text-white uppercase font-bold">RESERVATIONS</h4>
              <ul className="space-y-2 text-xs font-mono text-[#aaa]">
                <li className="hover:text-white transition-colors">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("accommodations");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left block w-full"
                  >
                    Geodesic Dome Stay
                  </button>
                </li>
                <li className="hover:text-white transition-colors">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("accommodations");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left block w-full"
                  >
                    Safari Suite Tent Stay
                  </button>
                </li>
                <li className="hover:text-white transition-colors">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("restaurant");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left block w-full"
                  >
                    Lummayya Dining
                  </button>
                </li>
                <li className="hover:text-white transition-colors">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("experiences");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left block w-full"
                  >
                    Bespoke Inquiries
                  </button>
                </li>
                <li className="hover:text-white transition-colors text-desert-blue">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("booking-guide");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-white text-desert-blue font-bold transition-colors cursor-pointer text-left block w-full"
                  >
                    Comprehensive Booking Guide
                  </button>
                </li>
              </ul>
            </div>

            {/* High-End Contacts of VIP concierge */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs tracking-widest text-white uppercase font-bold">{t("vipHostingSatellite")}</h4>
              <div className="space-y-3 font-mono text-xs text-[#aaa]">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-desert-blue" />
                  <a href="tel:+201070188857" className="hover:text-white transition-colors">+201070188857</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-desert-blue" />
                  <a href="mailto:msheta@remalelrayan.com" className="hover:text-white transition-colors">msheta@remalelrayan.com</a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-desert-blue animate-bounce" />
                  <a href="https://maps.app.goo.gl/Ujt42ERXYAQbvkec8" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    {language === "ar" ? "خرائط جوجل ماب" : "Google Maps Location"}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Instagram className="w-3.5 h-3.5 text-desert-blue" />
                  <a href="https://www.instagram.com/remalelrayan/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@remalelrayan</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-3.5 h-3.5 text-desert-blue" />
                  <a href="https://www.linkedin.com/company/remal-elrayan-glamp" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Remal Elrayan Glamp</a>
                </div>
              </div>
            </div>

          </div>

          {/* Subheader and credits */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <p className="font-mono text-[9px] tracking-widest text-[#555] uppercase">
              © 2026 ALL RIGHTS RESERVED. EGYPT STATE TOURISM PORTAL.
            </p>
            <p className="font-mono text-[9px] tracking-widest text-[#555] uppercase">
              DEVELOPED TO SPECIFICATION FOR GOOGLE AI STUDIO IN EGYPT.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
