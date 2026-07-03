import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Camera, Maximize2, Layers } from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface GalleryImage {
  id: string;
  url: string;
  category: "stays" | "nature" | "dining" | "cosmos";
  translations: {
    en: { title: string; desc: string };
    ar: { title: string; desc: string };
    es: { title: string; desc: string };
    fr: { title: string; desc: string };
    de: { title: string; desc: string };
    ja: { title: string; desc: string };
  };
}

const createTranslations = (title: string, desc: string) => ({
  en: { title, desc },
  ar: { title, desc },
  es: { title, desc },
  fr: { title, desc },
  de: { title, desc },
  ja: { title, desc },
});

const galleryData: GalleryImage[] = [
  {
    id: "stay-1",
    url: "/images/dome-room-interior.jpeg",
    category: "stays",
    translations: createTranslations("Dome Room Interior", "A warm twin-bed setup inside one of the camp's signature desert domes.")
  },
  {
    id: "stay-2",
    url: "/images/dome-room-exterior.jpeg",
    category: "stays",
    translations: createTranslations("Dome Room Exterior", "A private wood deck and dome front set directly into the open desert.")
  },
  {
    id: "stay-3",
    url: "/images/dome-suite-night-exterior.jpeg",
    category: "stays",
    translations: createTranslations("Dome Suite by Night", "The suite glows after dark with its deck, lounge seating, and private outdoor space.")
  },
  {
    id: "stay-4",
    url: "/images/safari-suite-exterior.jpeg",
    category: "stays",
    translations: createTranslations("Safari Suite Exterior", "A chalet-style suite with a private sitting area facing the sand and lake horizon.")
  },
  {
    id: "nature-1",
    url: "/images/lake-sunrise-view.jpeg",
    category: "nature",
    translations: createTranslations("Lake Sunrise View", "Morning light over Wadi El Rayan creates one of the camp's defining panoramas.")
  },
  {
    id: "nature-2",
    url: "/images/sunrise-cloudscape.jpeg",
    category: "nature",
    translations: createTranslations("Fayoum Sunrise Clouds", "Big desert skies turn each sunrise into a dramatic arrival moment.")
  },
  {
    id: "nature-3",
    url: "/images/boardwalk-lake-view.jpeg",
    category: "nature",
    translations: createTranslations("Boardwalk to the Lake", "The camp opens directly onto lake views, pathways, and soft desert light.")
  },
  {
    id: "nature-4",
    url: "/images/sunrise-golden-lake.jpeg",
    category: "nature",
    translations: createTranslations("Golden Horizon", "Sunrise across the water and dunes gives the retreat its quiet cinematic mood.")
  },
  {
    id: "dining-1",
    url: "/images/campfire-night.jpeg",
    category: "dining",
    translations: createTranslations("Campfire Gathering", "Guests unwind around the fire after sunset with the lake and dunes in the background.")
  },
  {
    id: "dining-2",
    url: "/images/lummayya-food-plating.jpeg",
    category: "dining",
    translations: createTranslations("Lummayya Signature Plates", "A closer look at the restaurant's plated meals and desert dining presentation.")
  },
  {
    id: "dining-3",
    url: "/images/restaurant-lounge-day.jpeg",
    category: "dining",
    translations: createTranslations("Open-Air Lounge", "Layered seating around the restaurant creates a relaxed all-day desert lounge.")
  },
  {
    id: "dining-4",
    url: "/images/lummayya-night.jpeg",
    category: "dining",
    translations: createTranslations("Lummayya at Night", "The restaurant and terrace become a warm focal point once the desert cools down.")
  },
  {
    id: "cosmos-1",
    url: "/images/moonlit-lummayya.jpeg",
    category: "cosmos",
    translations: createTranslations("Moonlit Desert Sky", "Clouds, moonlight, and soft camp lighting frame the evening atmosphere.")
  },
  {
    id: "cosmos-2",
    url: "/images/restaurant-night-lounge.jpeg",
    category: "cosmos",
    translations: createTranslations("Night Lounge Glow", "The camp's night lighting turns the restaurant frontage into a desert stage set.")
  },
  {
    id: "cosmos-3",
    url: "/images/dome-suite-jacuzzi-night.jpeg",
    category: "cosmos",
    translations: createTranslations("Private Night Retreat", "A dome suite and jacuzzi under the open sky deliver the most intimate night experience.")
  },
  {
    id: "cosmos-4",
    url: "/images/sunset-disc.jpeg",
    category: "cosmos",
    translations: createTranslations("Sunset Disc Over Fayoum", "A close sunset study that captures the scale and stillness of the landscape.")
  }
];

export default function Gallery() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<"all" | "stays" | "nature" | "dining" | "cosmos">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const filteredImages = filter === "all" 
    ? galleryData 
    : galleryData.filter(img => img.category === filter);

  const handlePrev = () => {
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return prev === 0 ? filteredImages.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return prev === filteredImages.length - 1 ? 0 : prev + 1;
    });
  };

  const getTranslationText = (key: "all" | "stays" | "nature" | "dining" | "cosmos") => {
    const texts: Record<string, Record<string, string>> = {
      all: { en: "All Gallery", ar: "كل الصور", es: "Toda la Galería", fr: "Toute la Galerie", de: "Gesamte Galerie", ja: "すべての写真" },
      stays: { en: "Stays & Suites", ar: "أجنحة وإقامات", es: "Alojamiento", fr: "Suites & Hébergements", de: "Unterkünfte & Suiten", ja: "客室とスイート" },
      nature: { en: "Desert & Lakes", ar: "الصحراء والبحيرات", es: "Desierto y Lagos", fr: "Désert & Lacs", de: "Wüste & Seen", ja: "砂漠と湖" },
      dining: { en: "Lummayya Dining", ar: "مطعم لومايا", es: "Gastronomía", fr: "Cuisine & Feu de Camp", de: "Lummayya Kulinarik", ja: "ルフマヤ料理" },
      cosmos: { en: "Stargazing", ar: "رصد النجوم", es: "Observación Estelar", fr: "Astronomie", de: "Sternenhimmel", ja: "天体観測と星空" }
    };
    return texts[key]?.[language] || texts[key]?.["en"];
  };

  const getGeneralText = (key: "title" | "subtitle" | "close" | "prev" | "next") => {
    const texts: Record<string, Record<string, string>> = {
      title: { en: "CRAFTED RETREAT GALLERY", ar: "معرض الصور الفاخرة", es: "GALERÍA DE NUESTRO REFUGIO", fr: "GALERIE DE NOTRE REFUGE", de: "GALERIE UNSERES RETREATS", ja: "リトリート・ギャラリー" },
      subtitle: { en: "Visual moments from Egypt’s premier luxury wilderness glamp.", ar: "لقطات بصرية حية من أفضل مخيم صحراوي فاخر في مصر.", es: "Momentos visuales de nuestro exclusivo glamp de desierto.", fr: "Moments visuels de notre glamping d'exception.", de: "Visuelle Eindrücke unseres luxuriösen Wüsten-Glampings.", ja: "エジプト最高峰のラグジュアリー・グランピングを視覚的に体験する。" },
      close: { en: "Close", ar: "إغلاق", es: "Cerrar", fr: "Fermer", de: "Schließen", ja: "閉じる" },
      prev: { en: "Previous", ar: "السابق", es: "Anterior", fr: "Précédent", de: "Zurück", ja: "前へ" },
      next: { en: "Next", ar: "التالي", es: "Siguiente", fr: "Suivant", de: "Weiter", ja: "次へ" }
    };
    return texts[key]?.[language] || texts[key]?.["en"];
  };

  return (
    <div id="gallery-section" className="space-y-12">
      {/* Gallery Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-desert-blue/10 border border-desert-blue/30 text-desert-blue font-mono text-[9px] uppercase tracking-widest font-bold rounded-full">
          <Camera className="w-3.5 h-3.5" />
          <span>{language === "ar" ? "ألبوم الصور الحصري" : "PHOTO PORTFOLIO"}</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-tighter text-desert-dark">
          {getGeneralText("title")}
        </h2>
        <div className="w-16 h-[2px] bg-desert-blue mx-auto mt-2" />
        <p className="font-sans text-xs md:text-sm text-neutral-600">
          {getGeneralText("subtitle")}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {(["all", "stays", "nature", "dining", "cosmos"] as const).map((cat) => {
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase font-bold transition-all duration-200 cursor-pointer border-2 ${
                isActive
                  ? "bg-black text-white border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-[#F4EFE3] text-[#333] border-black/10 hover:border-black hover:bg-white"
              }`}
            >
              {getTranslationText(cat)}
            </button>
          );
        })}
      </div>

      {/* Grid Display */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, index) => {
            const translation = img.translations[language as keyof typeof img.translations] || img.translations.en;
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                key={img.id}
                onClick={() => setLightboxIndex(index)}
                className="bg-[#F4EFE3] border-2 border-black p-2.5 shadow-brutalist cursor-pointer group relative overflow-hidden flex flex-col h-[320px]"
              >
                {/* Image wrapper */}
                <div className="h-[210px] w-full overflow-hidden relative border border-black/10 bg-neutral-200">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10 flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
                  </div>
                  <img
                    src={img.url}
                    alt={translation.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 z-20 bg-black text-white text-[8px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 border border-white/20">
                    {img.category}
                  </div>
                </div>

                {/* Captions */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-desert-dark line-clamp-1 group-hover:text-desert-blue transition-colors">
                      {translation.title}
                    </h3>
                    <p className="font-sans text-[10.5px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                      {translation.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (() => {
          const img = filteredImages[lightboxIndex];
          const translation = img.translations[language as keyof typeof img.translations] || img.translations.en;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-6 select-none"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Lightbox Header */}
              <div className="flex justify-between items-center text-white" onClick={e => e.stopPropagation()}>
                <div className="font-mono text-xs tracking-widest text-neutral-400">
                  {lightboxIndex + 1} / {filteredImages.length}
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 bg-neutral-900 border border-white/10 hover:border-white text-white rounded-none cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox main viewport */}
              <div className="flex-1 flex items-center justify-between gap-4 py-4" onClick={e => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-3 bg-neutral-900 border border-white/10 hover:border-white hover:bg-neutral-800 text-white rounded-none cursor-pointer transition-colors"
                  aria-label={getGeneralText("prev")}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="max-w-4xl max-h-[60vh] md:max-h-[70vh] overflow-hidden flex items-center justify-center relative">
                  <motion.img
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    src={img.url}
                    alt={translation.title}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain border-2 border-white/10 shadow-2xl"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="p-3 bg-neutral-900 border border-white/10 hover:border-white hover:bg-neutral-800 text-white rounded-none cursor-pointer transition-colors"
                  aria-label={getGeneralText("next")}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Lightbox footer details */}
              <div 
                className="max-w-2xl mx-auto text-center text-white pb-6 space-y-2.5" 
                onClick={e => e.stopPropagation()}
              >
                <div className="inline-block bg-desert-blue text-black font-mono text-[8px] font-bold tracking-widest uppercase px-2.5 py-0.5">
                  {img.category}
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold uppercase tracking-wide">
                  {translation.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">
                  {translation.desc}
                </p>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
