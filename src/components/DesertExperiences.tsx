import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Sparkles, MapPin, ExternalLink, Moon } from "lucide-react";
import { DesertExperience } from "../types";

export default function DesertExperiences() {
  const experiences: DesertExperience[] = [
    {
      id: "lummayya",
      title: "Lummayya Dining Ritual",
      subTitle: "FINE BOTANICAL DESERT GASTRONOMY",
      description: "An open-air culinary theatre beneath raw Fayoum starlight. Merging slow-cooked organic Egyptian roots with modern progressive plating curated by international master chefs.",
      imageUrl: "/images/campfire-night.jpeg",
      duration: "3 Hours Custom Service",
      timeOfDay: "Evening / Nightfall"
    },
    {
      id: "dunes",
      title: "Sand Dune Meditation",
      subTitle: "SILENT SANDS SOUND THERAPY",
      description: "Traverse high-cresting sand formations on private sand-caravans or luxury vehicles. At peak sunset, experience deep-vibration sound therapy using authentic ancient sound bells.",
      imageUrl: "/images/team-building.jpeg",
      duration: "2 Hours Private Journey",
      timeOfDay: "Golden Hour Sunset"
    },
    {
      id: "lake-safari",
      title: "Wadi El Rayan Lakes Voyage",
      subTitle: "THE MAGIC WATER ELEMENT",
      description: "Sail across Egypt's ancient serene desert lakes on raw wooden dhow boats or high-end kayaks. Spot rare migratory birds nesting along the golden marsh reeds.",
      imageUrl: "/images/boardwalk-lake-view.jpeg",
      duration: "4 Hours Expedition",
      timeOfDay: "Sunrise / Mid-Day"
    },
    {
      id: "stargazing",
      title: "Anomalous Horizon Stargazing",
      subTitle: "COSMIC COCKTAILS DECK ACCESS",
      description: "Sip custom botanical infusions on our scientific launch pad. Guided by professional astronomers operating dual tracking coordinates onto the Saturn rings and distant nebulas.",
      imageUrl: "/images/moonlit-lummayya.jpeg",
      duration: "As Long as Desired",
      timeOfDay: "Nightlong Cosmos"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 px-6 md:px-12 bg-black text-[#faf9f6] relative overflow-hidden">
      {/* Background Desert Silhouette Vector Accent */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#111] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="border-b border-white/10 pb-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-widest text-desert-blue uppercase mb-3 font-semibold">
              UNEARTHED ENCOUNTERS
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none uppercase">
              Desert <br />Experiences
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-xs md:text-sm text-[#bbb] leading-relaxed">
              Curated exclusively to awaken standard human fatigue. From local astronomical coordinate tracking to the Michelin-crafted desert tables of Lummayya.
            </p>
          </div>
        </div>

        {/* Immersive Tab Panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* List panel (left side 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {experiences.map((exp, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={exp.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`border-2 p-5 md:p-6 transition-all duration-500 cursor-pointer text-left relative overflow-hidden group ${
                    isActive 
                      ? "bg-white/10 border-white shadow-brutalist" 
                      : "border-white/15 hover:bg-white/5 hover:border-white/40"
                  }`}
                >
                  {/* Highlight bar */}
                  {isActive && (
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-desert-blue" />
                  )}

                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-[#777] uppercase block mb-1">
                        STAGE {String(idx + 1).padStart(2, "0")} • {exp.timeOfDay}
                      </span>
                      <h3 className="font-serif text-xl font-light text-white uppercase group-hover:text-desert-blue transition-colors">
                        {exp.title}
                      </h3>
                      <p className="font-mono text-[9px] tracking-widest text-[#aaa] uppercase mt-1">
                        {exp.subTitle}
                      </p>
                    </div>
                    <div>
                      {idx % 2 === 0 ? (
                        <Sun className="w-4 h-4 text-desert-blue/40" />
                      ) : (
                        <Moon className="w-4 h-4 text-desert-blue/40" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Preview container (right side 7 cols) with cinematic imagery */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={experiences[activeIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white/5 border-2 border-white p-6 md:p-10 flex flex-col justify-between shadow-brutalist"
              >
                {/* Photo frame */}
                <div className="relative aspect-video overflow-hidden mb-8 border border-white/5">
                  <img
                    src={experiences[activeIndex].imageUrl}
                    alt={experiences[activeIndex].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 scale-102 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black/75 px-3 py-1 font-mono text-[9px] tracking-widest text-desert-blue border border-desert-blue/20">
                    {experiences[activeIndex].duration}
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center space-x-1 font-mono text-[9px] text-[#faf9f6] bg-black/60 px-2 py-1">
                    <MapPin className="w-3 h-3 text-desert-blue" />
                    <span>WADI EL RAYAN PROTECTORATE, EGYPT</span>
                  </div>
                </div>

                {/* Info Text */}
                <span className="font-mono text-[10px] tracking-widest text-desert-blue mb-2.5 uppercase block">
                  {experiences[activeIndex].subTitle}
                </span>
                
                <h3 className="font-serif text-3xl font-light uppercase tracking-wide mb-4">
                  {experiences[activeIndex].title}
                </h3>
                
                <p className="font-sans text-xs md:text-sm text-[#ddd] leading-relaxed mb-6">
                  {experiences[activeIndex].description}
                </p>

                <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#999]">
                    * Requires 24-hour advance coordination
                  </span>

                  <button className="flex items-center space-x-2 font-mono text-xs tracking-widest text-desert-blue hover:text-white transition-colors cursor-pointer">
                    <span>EXPLORE TIMELINE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
