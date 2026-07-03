import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../LanguageContext";
import { 
  Compass, MapPin, Users, Heart, Phone, Sparkles, 
  Map, ShieldAlert, ArrowRight, Star
} from "lucide-react";

interface Activity {
  name: string;
  arabicName: string;
  price: string;
  duration: string;
  image: string;
  description: string;
}

export default function ExperienceHub() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<"activities" | "transport" | "teambuilding" | "weddings">("activities");

  const whatsappNumber = "201070188857";
  const baseWhatsappUrl = "https://wa.me/201070188857";

  const getWhatsappLink = (serviceName: string) => {
    const text = encodeURIComponent(
      `Hello Remal El Rayan! 🌵✨ I'm interested in booking your luxury "${serviceName}" service via the Reception Concierge. Please provide availability and custom itinerary planning.`
    );
    return `${baseWhatsappUrl}?text=${text}`;
  };

  const activitiesList: Activity[] = [
    {
      name: "Jeep Safari (Short Route)",
      arabicName: "سفاري الجيب (رحلة قصيرة)",
      price: "3,500 EGP",
      duration: "1.5 - 2 Hours",
      image: "/images/jeep-safari.jpeg",
      description: "Traverse high-voltage golden crest dunes and premium sand valleys around Wadi El Rayan's ancient landmarks. Optional air-conditioned vehicle is available for an additional 500 EGP."
    },
    {
      name: "Jeep Safari (Long Route)",
      arabicName: "سفاري الجيب (رحلة طويلة)",
      price: "4,000 EGP",
      duration: "3 - 4 Hours",
      image: "/images/jeep-safari-long-route.jpeg",
      description: "Deep desert exploration traversing Magic Lake, fossil valleys, and cinematic high dune sunset summits. Optional air-conditioned vehicle is available for an additional 500 EGP."
    },
    {
      name: "Salt Cave Experience",
      arabicName: "جلسة الكهف الملحى",
      price: "400 EGP",
      duration: "45 Mins",
      image: "/images/salt-cave.jpeg",
      description: "Relaxing wellness dry inhalation within crystalline Siwan rock salt caves, ideal for natural respiratory detox."
    },
    {
      name: "Pottery Workshop",
      arabicName: "ورشة صناعة الفخار",
      price: "300 EGP",
      duration: "1 Hour",
      image: "/images/pottery-workshop.jpeg",
      description: "Handicraft molding sessions taught directly by native master artisans from Tunis pottery village."
    },
    {
      name: "Horseback Riding",
      arabicName: "ركوب الخيل",
      price: "300 EGP",
      duration: "1 Hour",
      image: "/images/horse-riding.jpeg",
      description: "Scenic desert lakeside horse treks. An editorial sunset pacing along Fayoum's soft waters."
    }
  ];

  return (
    <div className="bg-[#F4EFE3] border-2 border-black p-6 md:p-12 shadow-brutalist max-w-7xl mx-auto my-8 text-black" id="concierge-hub">
      {/* Editorial Luxury Header */}
      <div className="border-b-2 border-black pb-8 mb-10 flex flex-col lg:flex-row lg:items-end justify-between items-start gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase block mb-2">
            {language === "ar" ? "مركز حجز الأنشطة والمواصلات من خلال الريسبشن • " : ""}EXPERIENCE & EVENTS CONCIERGE HUB
          </span>
          <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-tighter">
            {t("receptionServices")}
          </h2>
          <p className="font-sans text-xs text-neutral-600 max-w-xl mt-3 leading-relaxed">
            {t("receptionServicesDesc")}
          </p>
        </div>

        {/* Global Concierge Status Badge */}
        <div className="bg-black text-[#F4EFE3] px-4 py-2 font-mono text-[9px] uppercase tracking-widest border border-black flex items-center space-x-2">
          <span className="w-1.5 h-1.5 bg-[#C8B9A6] rounded-full animate-ping" />
          <span>{t("directConciergeActive")}</span>
        </div>
      </div>

      {/* Modern High-End Hub Navigation Tabs */}
      <div className="flex flex-wrap border-b border-black mb-8 gap-1 md:gap-2">
        <button
          onClick={() => setActiveCategory("activities")}
          className={`px-4 py-3 font-mono text-xs uppercase tracking-wider font-bold transition-all relative border-t-2 border-x border-black -mb-[1px] cursor-pointer ${
            activeCategory === "activities" 
              ? "bg-white border-b-2 border-b-white text-black" 
              : "bg-neutral-100 border-b border-b-black text-neutral-500 hover:text-black"
          }`}
        >
          🌵 {t("activitiesTab")}
        </button>
        <button
          onClick={() => setActiveCategory("transport")}
          className={`px-4 py-3 font-mono text-xs uppercase tracking-wider font-bold transition-all relative border-t-2 border-x border-black -mb-[1px] cursor-pointer ${
            activeCategory === "transport" 
              ? "bg-white border-b-2 border-b-white text-black" 
              : "bg-neutral-100 border-b border-b-black text-neutral-500 hover:text-black"
          }`}
        >
          🚘 {t("transportationTab")}
        </button>
        <button
          onClick={() => setActiveCategory("teambuilding")}
          className={`px-4 py-3 font-mono text-xs uppercase tracking-wider font-bold transition-all relative border-t-2 border-x border-black -mb-[1px] cursor-pointer ${
            activeCategory === "teambuilding" 
              ? "bg-white border-b-2 border-b-white text-black" 
              : "bg-neutral-100 border-b border-b-black text-neutral-500 hover:text-black"
          }`}
        >
          👔 {t("teambuildingTab")}
        </button>
        <button
          onClick={() => setActiveCategory("weddings")}
          className={`px-4 py-3 font-mono text-xs uppercase tracking-wider font-bold transition-all relative border-t-2 border-x border-black -mb-[1px] cursor-pointer ${
            activeCategory === "weddings" 
              ? "bg-white border-b-2 border-b-white text-black" 
              : "bg-neutral-100 border-b border-b-black text-neutral-500 hover:text-black"
          }`}
        >
          💍 {t("weddingsTab")}
        </button>
      </div>

      {/* Main Adaptive Sections */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeCategory === "activities" && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Intro Notice with Rule */}
              <div className="bg-white border border-black p-4 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#C8B9A6] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#C8B9A6] block">{t("importantBookingNotice")}</span>
                  <p className="font-sans text-xs text-neutral-700 leading-relaxed">
                    {t("importantBookingNoticeDesc")}
                  </p>
                </div>
              </div>

              {/* Premium matrix/carousel wrapper */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activitiesList.map((act, index) => (
                  <div 
                    key={index} 
                    className="bg-white border-2 border-black shadow-sm group hover:shadow-brutalist transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-video overflow-hidden border-b border-black bg-neutral-100">
                      <img 
                        src={act.image} 
                        alt={act.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black text-[#C8B9A6] font-mono text-[8px] tracking-widest px-2 py-0.5 uppercase">
                        {t("bookedOnSite")}
                      </div>
                    </div>
                    
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-serif text-lg font-bold tracking-tight text-black">
                            {language === "ar" ? act.arabicName : act.name}
                          </h4>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-3 font-semibold">
                          {act.duration}
                        </span>
                        <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                          {act.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 block">{t("officialTariff")}</span>
                          <span className="font-mono text-sm font-bold block">{act.price}</span>
                        </div>

                        <a
                          href={getWhatsappLink(act.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black hover:bg-[#C8B9A6] text-white hover:text-black font-mono text-[9px] uppercase tracking-widest px-3 py-2 border border-black transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{t("bookViaConcierge")}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeCategory === "transport" && (
            <motion.div
              key="transport"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              <div className="lg:col-span-7 space-y-6">
                <span className="font-mono text-[10px] tracking-wider text-[#C8B9A6] uppercase font-bold block">
                  {t("privateFleetTransfers")}
                </span>
                <h3 className="font-serif text-2xl uppercase tracking-wider text-black">
                  {t("exclusiveCairoToCamp")}
                </h3>
                <p className="font-sans text-neutral-600 text-xs leading-relaxed">
                  {t("transportDesc")}
                </p>

                {/* Minimal pricing matrix cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-black p-5 flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-500 block mb-1">{t("standardTransfer")}</span>
                      <h4 className="font-serif text-lg font-bold">{t("standardCarTitle")}</h4>
                      <p className="font-sans text-[11px] text-neutral-500 mt-2 leading-relaxed">
                        {t("standardCarDesc")}
                      </p>
                    </div>
                    <div className="border-t border-black/5 pt-4 mt-4 flex justify-between items-baseline">
                      <span className="font-mono text-sm font-bold">2,700 EGP</span>
                      <span className="font-mono text-[8px] text-neutral-400">Cairo-to-Camp</span>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-black p-5 flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-500 block mb-1">{t("premiumOption")}</span>
                      <h4 className="font-serif text-lg font-bold">{t("premiumCarTitle")}</h4>
                      <p className="font-sans text-[11px] text-neutral-500 mt-2 leading-relaxed">
                        {t("premiumCarDesc")}
                      </p>
                    </div>
                    <div className="border-t border-black/5 pt-4 mt-4 flex justify-between items-baseline">
                      <span className="font-mono text-[10px] uppercase font-bold text-[#C8B9A6]">{t("customQuote")}</span>
                      <span className="font-mono text-[8px] text-neutral-400"> {t("cairoFayoum")} </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={getWhatsappLink("Private Cairo-to-Camp Fleet Transport")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black hover:bg-[#C8B9A6] text-white hover:text-black font-mono text-xs uppercase tracking-widest px-6 py-4 border-2 border-black cursor-pointer shadow-brutalist transition-transform duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t("bookViaConcierge")}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[300px] border-4 border-black p-2 bg-white">
                <img 
                  src="/images/transport-car.jpeg"
                  alt="Glamping desert transport vehicle context"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}

          {activeCategory === "teambuilding" && (
            <motion.div
              key="teambuilding"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div className="lg:col-span-5 border-4 border-black p-2 bg-white aspect-[4/3] overflow-hidden">
                <img 
                  src="/images/team-building.jpeg"
                  alt="High-end corporate team building workspace outdoors"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="lg:col-span-7 space-y-6">
                <span className="font-mono text-[10px] tracking-wider text-[#C8B9A6] uppercase font-bold block">
                  {t("bespokeRetreats")}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-tight text-black">
                  {t("corporateOutingsTitle")}
                </h3>
                <p className="font-sans text-neutral-600 text-xs leading-relaxed">
                  {t("corporateOutingsDesc")}
                </p>

                <div className="pt-4">
                  <a
                    href={getWhatsappLink("Bespoke Corporate Team Building Setup")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black hover:bg-[#C8B9A6] text-white hover:text-black font-mono text-xs uppercase tracking-widest px-6 py-4 border-2 border-black cursor-pointer shadow-brutalist transition-transform duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t("bookViaConcierge")}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {activeCategory === "weddings" && (
            <motion.div
              key="weddings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
            >
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <span className="font-mono text-[10px] tracking-wider text-[#C8B9A6] uppercase font-bold block">
                    {t("cinematicVenue")}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl uppercase tracking-tighter text-black">
                    {t("weddingsTitle")}
                  </h3>
                  <p className="font-sans text-neutral-600 text-xs leading-relaxed mt-4">
                    {t("weddingsDesc")}
                  </p>
                </div>

                <div className="bg-white border border-black/10 p-5 font-sans space-y-2">
                  <h4 className="font-serif text-sm font-bold text-black uppercase">{t("tailoredProduction")}</h4>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    {t("tailoredProductionDesc")}
                  </p>
                </div>

                <div>
                  <a
                    href={getWhatsappLink("Cinematic Desert Wedding & Events Inquiry")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-black hover:bg-[#C8B9A6] text-white hover:text-black font-mono text-xs uppercase tracking-widest px-6 py-4 border-2 border-black cursor-pointer shadow-brutalist transition-transform duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t("bookViaConcierge")}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[350px] border-4 border-black p-2 bg-white">
                <img 
                  src="/images/wedding-setup.jpeg"
                  alt="High fashion wedding dinner table under glowing desert lights"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
