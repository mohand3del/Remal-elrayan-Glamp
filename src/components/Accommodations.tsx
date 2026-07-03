import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../LanguageContext";
import { PalmTree } from "./DesertTree";
import { 
  Compass, Eye, ShieldCheck, ExternalLink, Calendar, Users, 
  DollarSign, AlertCircle, Globe, Info, Check, HelpCircle,
  Sunset, Maximize2, Coffee, Sparkles, Flame, Bed, ShieldAlert
} from "lucide-react";

interface PricingPlan {
  double: number;
  triple: number;
  quadruple?: number;
  quintuple?: number;
}

interface ElaboratedAccommodation {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  imageUrl: string;
  interiorImageUrl: string;
  amenities: string[];
  maxOccupancy: number;
  features: string[];
  rates: {
    USD: {
      weekend: PricingPlan;
      weekday: PricingPlan;
    };
    EGP: {
      weekend: PricingPlan;
      weekday: PricingPlan;
    };
  };
  translations?: Record<string, {
    title: string;
    subTitle: string;
    description: string;
    amenities: string[];
    features: string[];
  }>;
}

interface AccommodationsProps {
  nationality: "egyptian" | "non-egyptian";
  setNationality: (nationality: "egyptian" | "non-egyptian") => void;
  currency: "EGP" | "USD";
  setCurrency: (currency: "EGP" | "USD") => void;
  onRedirectToRestaurant?: () => void;
}

export default function Accommodations({
  nationality,
  setNationality,
  currency,
  setCurrency,
  onRedirectToRestaurant,
}: AccommodationsProps) {
  const { t, language } = useLanguage();
  const accommodationsData: ElaboratedAccommodation[] = [
    {
      id: "geo-dome-deluxe",
      title: "Geo-Dome Deluxe Tent",
      subTitle: "360° COSMIC PORTAL VIEW • BB BASIS",
      description: "Nestled beautifully against premium dunes. Crafted with timber-frame architecture, featuring panoramic portals that draw the scenic Fayoum desert sky directly inside.",
      imageUrl: "/images/dome-room-exterior.jpeg",
      interiorImageUrl: "/images/dome-room-interior.jpeg",
      maxOccupancy: 3,
      amenities: [
        "Private Star Gazing Ceiling Opening",
        "Curated Bedouin Linen Set",
        "Premium Forest Coffee Station",
        "Wadi El Rayan Lake Scenic View"
      ],
      features: [
        "Stargazing Ceiling Opening",
        "Bed & Breakfast Basis",
        "Wadi El Rayan Lake View"
      ],
      rates: {
        USD: {
          weekend: { double: 300, triple: 350 },
          weekday: { double: 280, triple: 320 }
        },
        EGP: {
          weekend: { double: 6000, triple: 7000 },
          weekday: { double: 5500, triple: 6500 }
        }
      },
      translations: {
        ar: {
          title: "قبة جيوديسية ديلوكس",
          subTitle: "إطلالة بانورامية كاملة ٣٦٠ درجة • شامل الإفطار",
          description: "مستقرة بجمال وأناقة مقابل الكثبان الرملية الذهبية الفاخرة. تم تصميمها بهيكل خشبي مميز مع نوافذ بانورامية واسعة تُدخل سحر سماء صحراء الفيوم مباشرةً إليك.",
          amenities: [
            "فتحة سقف مخصصة لرؤية النجوم",
            "أغطية ومفروشات بدوية منسقة بعناية",
            "ركن قهوة فاخر ومميز",
            "إطلالة كاملة على بحيرة وادي الريان"
          ],
          features: [
            "فتحة سقف لرؤية النجوم",
            "نظام المبيت شامل الإفطار البدوي",
            "إطلالة خلابة على بحيرة وادي الريان"
          ]
        },
        es: {
          title: "Domo Geodésico Deluxe",
          subTitle: "VISTA AL PORTAL CÓSMICO DE 360° • RÉGIMEN AD",
          description: "Ubicado hermosamente frente a dunas premium. Diseñado con arquitectura de madera, con portales panorámicos que atraen el paisaje del desierto de Fayoum directamente al interior.",
          amenities: [
            "Portal privado para observar estrellas",
            "Juego de sábanas beduinas seleccionadas",
            "Estación de café premium",
            "Fogata artesanal al aire libre"
          ],
          features: [
            "Cámara de lujo",
            "Régimen de alojamiento y desayuno",
            "Mirador en la cresta del desierto de Fayoum"
          ]
        },
        fr: {
          title: "Dôme Géodésique Deluxe",
          subTitle: "VUE PORTAIL COSMIQUE 360° • FORMULE PETIT-DÉJEUNER",
          description: "Niché magnifiquement contre les dunes de sable premium. Conçu avec une architecture en bois, doté de portails panoramiques qui invitent le ciel du désert de Fayoum directement à l'intérieur.",
          amenities: [
            "Portail d'observation des étoiles privé",
            "Ensemble de draps bédouins sélectionnés",
            "Station de café de forêt premium",
            "Espace de feu de camp artisanal en plein air"
          ],
          features: [
            "Chambre Premium",
            "Formule lit et petit-déjeuner",
            "Belvédère sur la crête du désert de Fayoum"
          ]
        },
        de: {
          title: "Geo-Dome Deluxe Zelt",
          subTitle: "360° KOSMISCHES PORTAL • INKL. FRÜHSTÜCK",
          description: "Wunderschön an exklusiven Dünen gelegen. Mit Holzrahmen-Architektur und Panorama-Fenstern, die den Wüstenhimmel direkt in Ihr Zimmer bringen.",
          amenities: [
            "Privates Teleskop zur Himmelsbeobachtung",
            "Feine Bettwäsche im Beduinen-Stil",
            "Premium-Kaffeestation",
            "Gemütliche Lagerfeuerstelle im Freien"
          ],
          features: [
            "Luxuriöser Wohnraum",
            "Übernachtung mit Frühstück",
            "Aussicht auf die Dünenkämme von Fayoum"
          ]
        },
        ja: {
          title: "ジオデシック・ドーム・デラックス",
          subTitle: "360度満天の星空ビュー • 朝食付",
          description: "美しい砂丘に優雅にたたずむドーム。温かみのある木製フレームと広々としたパノラマ窓が、ファイユーム of 神秘的な夜空を室内にそのまま引き込みます。",
          amenities: [
            "星空観測用プライベート天窓",
            "厳選された伝統ベドウィンリネン",
            "プレミアムコーヒー＆カフェマシン",
            "屋外の専用プライベート焚き火スペース"
          ],
          features: [
            "洗練された空間",
            "ベドウィンの伝統朝食付",
            "ファイユームの美しい砂丘を一望"
          ]
        }
      }
    },
    {
      id: "geo-dome-suite",
      title: "Geo-Dome Suite Tent",
      subTitle: "MAJESTIC DUNE RETREAT • BB BASIS",
      description: "Extra spacious geodesic layout offering scenic lounge comfort. Seamlessly combines Bedouin heritage touches with modern luxury components and an unparalleled panorama.",
      imageUrl: "/images/dome-suite-night-exterior.jpeg",
      interiorImageUrl: "/images/dome-suite-lake-interior.jpeg",
      maxOccupancy: 4,
      amenities: [
        "Private Luxury Outdoor Jacuzzi",
        "Private Campfire Area",
        "Stargazing Ceiling Opening & Astronomy Telescope",
        "Wadi El Rayan Lake Scenic View"
      ],
      features: [
        "Private Outdoor Jacuzzi",
        "Private Campfire Spot",
        "Wadi El Rayan Lake View"
      ],
      rates: {
        USD: {
          weekend: { double: 400, triple: 450, quadruple: 500 },
          weekday: { double: 380, triple: 420, quadruple: 450 }
        },
        EGP: {
          weekend: { double: 8500, triple: 9500, quadruple: 10500 },
          weekday: { double: 7500, triple: 8500, quadruple: 9500 }
        }
      },
      translations: {
        ar: {
          title: "جناح القبة الجيوديسية",
          subTitle: "ملاذ الكثبان الرملية المهيب • شامل الإفطار",
          description: "تخطيط جيوديسي واسع للغاية يوفر راحة معيشية استثنائية. يمزج بسلاسة بين لمسات التراث البدوي الأصيل ومكونات الفخامة المعاصرة مع إطلالة خلابة لا مثيل لها.",
          amenities: [
            "جاكوزي خارجي خاص بالسويت",
            "كامبفاير خاص بالسويت لخصوصية تامة",
            "فتحة سقف لرؤية النجوم مع تلسكوب فلكي خاص",
            "إطلالة كاملة خلابة على بحيرة وادي الريان"
          ],
          features: [
            "جاكوزي خارجي خاص بالسويت",
            "كامبفاير خاص بالسويت",
            "إطلالة كاملة على بحيرة وادي الريان"
          ]
        },
        es: {
          title: "Suite Geo-Dome",
          subTitle: "REFUGIO MAJESTUOSO EN LA DUNA • RÉGIMEN AD",
          description: "Diseño geodésico extra espacioso que ofrece una cómoda sala de estar con vistas. Combina a la perfección toques de herencia beduina con componentes de lujo moderno y un panorama inigualable.",
          amenities: [
            "Jacuzzi exterior privado de lujo",
            "Zona de hoguera privada",
            "Apertura de techo para ver estrellas y telescopio astronómico",
            "Vista panorámica del lago Wadi El Rayan"
          ],
          features: [
            "Jacuzzi exterior privado",
            "Hoguera privada",
            "Vista al lago Wadi El Rayan"
          ]
        },
        de: {
          title: "Geo-Dome Suite Zelt",
          subTitle: "MAJESTÄTISCHES DÜNEN-RETREAT • INKL. FRÜHSTÜCK",
          description: "Besonders geräumiges Geodom mit exklusivem Wohnbereich. Verbindet Beduinen-Tradition harmonisch mit zeitgenössischem Luxus und einem unvergleichlichen Ausblick.",
          amenities: [
            "Privater luxuriöser Outdoor-Whirlpool",
            "Eigene Lagerfeuerstelle",
            "Dachöffnung zur Himmelsbeobachtung & Teleskop",
            "Malerischer Blick auf den Wadi El Rayan See"
          ],
          features: [
            "Privater Outdoor-Whirlpool",
            "Eigene Lagerfeuerstelle",
            "Blick auf den Wadi El Rayan See"
          ]
        },
        fr: {
          title: "Suite Geo-Dome",
          subTitle: "REFUGE MAJESTUEUX DES DUNES • FORMULE PETIT-DÉJEUNER",
          description: "Aménagement géodésique très spacieux offrant le confort d'un salon panoramique. Allie harmonieusement touches de l'héritage bédouin et éléments de luxe moderne avec un panorama inégalé.",
          amenities: [
            "Jacuzzi extérieur privé de luxe",
            "Espace feu de camp privé",
            "Ouverture de toit pour voir les étoiles & télescope",
            "Vue panoramique sur le lac Wadi El Rayan"
          ],
          features: [
            "Jacuzzi extérieur privé",
            "Feu de camp privé",
            "Vue sur le lac Wadi El Rayan"
          ]
        },
        ja: {
          title: "ジオデシック・ドーム・スイート",
          subTitle: "壮大な砂丘の隠れ家 • 朝食付",
          description: "贅沢な広さを誇るジオデシック・スイート。伝統的なベドウィンカルチャーの美学と、最先端のコンテンポラリーラグジュアリーがシームレスに調和した、パノラマビューの特等席です。",
          amenities: [
            "専用のプライベート屋外ジャグジー",
            "専用のプライベート焚き火スペース",
            "天体観測用の開閉式天井窓＆天体望遠鏡",
            "ワディ・エル・ラヤン湖の美しい景色を一望"
          ],
          features: [
            "プライベート屋外ジャグジー",
            "プライベート焚き火スペース",
            "ワディ・エル・ラヤン湖ビュー"
          ]
        }
      }
    },
    {
      id: "safari-suite",
      title: "Safari Suite Tent",
      subTitle: "EPIC WILD SAFARI TERRACE • BB BASIS",
      description: "Our signature elite glamping mansion. Crafted from organic double-layered canvas platforms, featuring ultra-luxurious lounges and a starlit outdoor terrace.",
      imageUrl: "/images/safari-suite-exterior.jpeg",
      interiorImageUrl: "/images/safari-suite-interior.jpeg",
      maxOccupancy: 5,
      amenities: [
        "Private Luxury Outdoor Jacuzzi",
        "Private Campfire Spot",
        "Stargazing Ceiling Opening",
        "Wadi El Rayan Lake Scenic View"
      ],
      features: [
        "Private Outdoor Jacuzzi & Campfire",
        "Bed & Breakfast Basis",
        "Largest Suite of All Categories"
      ],
      rates: {
        USD: {
          weekend: { double: 450, triple: 500, quadruple: 550, quintuple: 600 },
          weekday: { double: 420, triple: 450, quadruple: 500, quintuple: 540 }
        },
        EGP: {
          weekend: { double: 9000, triple: 10000, quadruple: 11000, quintuple: 12000 },
          weekday: { double: 8000, triple: 9000, quadruple: 10000, quintuple: 11000 }
        }
      },
      translations: {
        ar: {
          title: "جناح السفاري الفاخر",
          subTitle: "تراس سفاري بري ملحمي • شامل الإفطار",
          description: "قصر التخييم الفاخر المميز والفريد لدينا. مصنوع من منصات قماشية عضوية مزدوجة الطبقات ومقاومة للعوامل الجوية، ويضم صالات جلوس فائقة الفخامة وتراساً في الهواء الطلق تحت النجوم.",
          amenities: [
            "جاكوزي خارجي خاص بالسويت",
            "كامبفاير خاص بالسويت لخصوصية تامة",
            "فتحة سقف مخصصة لرؤية النجوم",
            "إطلالة كاملة خلابة على بحيرة وادي الريان"
          ],
          features: [
            "جاكوزي خارجي وكامبفاير خاص بالسويت",
            "نظام المبيت شامل الإفطار البدوي",
            "أكبر جناح من حيث الحجم بالكامل"
          ]
        },
        es: {
          title: "Suite Safari",
          subTitle: "TERRAZA ÉPICA DE SAFARI SALVAJE • RÉGIMEN AD",
          description: "Nuestra mansión de glamping de élite. Fabricada con plataformas de lona orgánica de doble capa, con salones de ultra lujo y una terraza exterior bajo las estrellas.",
          amenities: [
            "Jacuzzi privado de lujo al aire libre",
            "Hoguera privada al aire libre",
            "Techo solar para ver las estrellas",
            "Vista panorámica del lago Wadi El Rayan"
          ],
          features: [
            "Jacuzzi y hoguera privados",
            "Régimen de alojamiento y desayuno",
            "La suite más grande de todas"
          ]
        },
        fr: {
          title: "Suite Safari",
          subTitle: "TERRASSE ÉPIQUE SAFARI SAUVAGE • FORMULE PETIT-DÉJEUNER",
          description: "Notre résidence de glamping d'élite emblématique. Conçue à partir de toiles doubles couches organiques, elle comprend des salons de luxe et une terrasse extérieure sous les étoiles.",
          amenities: [
            "Jacuzzi extérieur privé de luxe",
            "Espace feu de camp privé",
            "Ouverture de toit pour admirer les étoiles",
            "Vue panoramique sur le lac Wadi El Rayan"
          ],
          features: [
            "Jacuzzi extérieur et feu de camp privé",
            "Formule lit et petit-déjeuner",
            "La plus grande suite de toutes les catégories"
          ]
        },
        de: {
          title: "Safari Suite Zelt",
          subTitle: "SAFARI-TERRASSE UNTER STERNEN • INKL. FRÜHSTÜCK",
          description: "Unsere exklusivste Glamping-Residenz. Gefertigt aus robusten, doppellagigen Canvas-Zeltstoffen mit edlem Teakholz-Interieur, ultra-luxuriösen Lounges und einer weiten Terrasse.",
          amenities: [
            "Privater luxuriöser Outdoor-Whirlpool",
            "Eigene Lagerfeuerstelle",
            "Dachöffnung zur Himmelsbeobachtung",
            "Malerischer Blick auf den Wadi El Rayan See"
          ],
          features: [
            "Privater Whirlpool & Lagerfeuer",
            "Übernachtung mit Frühstück",
            "Größte Suite aller Kategorien"
          ]
        },
        ja: {
          title: "サファリ・スイート・テント",
          subTitle: "野生の息吹を感じるテラス • 朝食付",
          description: "当グランピングを代表する、最高峰の贅沢を詰め込んだ大邸宅テント。何重にも施された極上キャンバスに守られた、広々としたリビングサロンと星空を仰ぐ木製テラスが極上の休息を約束します。",
          amenities: [
            "プライベート展望屋外ウッドテラス & ジャグジー",
            "専用のプライベート焚き火スペース",
            "天体観測用の開閉式天井窓",
            "ワディ・エル・ラヤン湖の美しい景色を一望"
          ],
          features: [
            "プライベート屋外ジャグジー＆焚き火",
            "ベドウィンの伝統朝食付",
            "全カテゴリー中最大のスイート"
          ]
        }
      }
    }
  ];

  // States
  const [viewModes, setViewModes] = useState<Record<string, "wild" | "plush">>({
    "geo-dome-deluxe": "wild",
    "geo-dome-suite": "wild",
    "safari-suite": "wild"
  });

  const [rateModes, setRateModes] = useState<Record<string, "weekday" | "weekend">>({
    "geo-dome-deluxe": "weekend",
    "geo-dome-suite": "weekend",
    "safari-suite": "weekend"
  });

  const [capacitySelections, setCapacitySelections] = useState<Record<string, "double" | "triple" | "quadruple" | "quintuple">>({
    "geo-dome-deluxe": "double",
    "geo-dome-suite": "double",
    "safari-suite": "double"
  });

  const [embedLiveKwentra, setEmbedLiveKwentra] = useState(false);
  const EXCHANGE_RATE = 50.0;

  // Real-time simulated inventory database
  const [inventory] = useState<Record<string, Record<string, { status: "available" | "booked"; roomsLeft: number }>>>({
    "geo-dome-deluxe": {
      "18-06-2026": { status: "available", roomsLeft: 2 },
      "19-06-2026": { status: "booked", roomsLeft: 0 },
      "20-06-2026": { status: "booked", roomsLeft: 0 },
      "21-06-2026": { status: "available", roomsLeft: 4 },
      "22-06-2026": { status: "available", roomsLeft: 5 },
      "23-06-2026": { status: "available", roomsLeft: 3 },
      "24-06-2026": { status: "available", roomsLeft: 1 },
    },
    "geo-dome-suite": {
      "18-06-2026": { status: "available", roomsLeft: 1 },
      "19-06-2026": { status: "available", roomsLeft: 2 },
      "20-06-2026": { status: "booked", roomsLeft: 0 },
      "21-06-2026": { status: "booked", roomsLeft: 0 },
      "22-06-2026": { status: "available", roomsLeft: 3 },
      "23-06-2026": { status: "available", roomsLeft: 2 },
      "24-06-2026": { status: "available", roomsLeft: 4 },
    },
    "safari-suite": {
      "18-06-2026": { status: "booked", roomsLeft: 0 },
      "19-06-2026": { status: "booked", roomsLeft: 0 },
      "20-06-2026": { status: "available", roomsLeft: 1 },
      "21-06-2026": { status: "available", roomsLeft: 1 },
      "22-06-2026": { status: "available", roomsLeft: 2 },
      "23-06-2026": { status: "booked", roomsLeft: 0 },
      "24-06-2026": { status: "available", roomsLeft: 2 },
    },
  });

  const calendarDates = [
    "18-06-2026",
    "19-06-2026",
    "20-06-2026",
    "21-06-2026",
    "22-06-2026",
    "23-06-2026",
    "24-06-2026"
  ];

  const [selectedCalendarDate, setSelectedCalendarDate] = useState("18-06-2026");

  const toggleViewMode = (id: string, mode: "wild" | "plush") => {
    setViewModes(prev => ({ ...prev, [id]: mode }));
  };

  const toggleRateMode = (id: string, mode: "weekday" | "weekend") => {
    setRateModes(prev => ({ ...prev, [id]: mode }));
  };

  const chooseCapacity = (id: string, cap: "double" | "triple" | "quadruple" | "quintuple") => {
    setCapacitySelections(prev => ({ ...prev, [id]: cap }));
  };

  const [activePolicyTab, setActivePolicyTab] = useState<"checkin" | "eco" | "deposit" | "dining">("checkin");

  return (
    <section className="py-24 px-6 md:px-12 bg-desert-offwhite max-w-7xl mx-auto text-black">
      {/* Editorial Header Section */}
      <div className="border-b-2 border-black pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] tracking-widest text-desert-blue uppercase mb-3 font-semibold block">
            {t("suitesPricingSeason")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-desert-dark tracking-tight leading-none uppercase flex flex-wrap items-center gap-3">
            <PalmTree className="text-desert-green shrink-0 animate-float-slow" size={44} color="#2E5A44" />
            <span>{t("curatedDwellingsTitle")}</span>
          </h2>
          <p className="font-sans text-xs text-[#555] max-w-xl mt-3 leading-relaxed">
            {t("curatedDwellingsDesc")}
          </p>
        </div>

        {/* Global Instant Reservation Switchboard */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <a
            href={`https://manage.kwentra.com/reservation/online/#/filter?arrival=18-06-2026&departure=19-06-2026&selling_type=rooms&selling_types=Rooms&rooms_info=%5B%7B%22id%22%3A0%2C%22adults%22%3A1%2C%22children%22%3A0%7D%5D&promo=&voucher=&profile_id=&currency=${currency}&date_format=DD-MM-YYYY&room_type=&selected_hotel=653&lang=${language === "ar" ? "ar" : "en-us"}&company=151&max_num_rooms=10&child_age_dropdown_list=true&children_dropdown_list=true&terminologies=%7B%7D&hotel_selection=%7B%22dropdown%22%3Afalse%2C%22allow_empty%22%3Afalse%2C%22destinations%22%3Afalse%7D&instances=653&specific_rooms_selling=false`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 bg-black text-white hover:bg-desert-blue hover:text-black px-6 py-4 font-mono text-xs uppercase tracking-widest border-2 border-black shadow-brutalist transition-all duration-300"
          >
            <span>{t("launchBookingEngine")}</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* 2-Way Filter & Nationality Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border-2 border-black p-6 mb-8 shadow-brutalist">
        <div>
          <span className="font-mono text-[9px] uppercase text-[#666] block mb-2 font-bold tracking-wider">
            {t("selectNationalityRequired")}
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setNationality("egyptian")}
              className={`py-2 px-3 border-2 font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                nationality === "egyptian"
                  ? "bg-black text-white border-black font-semibold"
                  : "bg-white text-black border-black/15 hover:border-black/45"
              }`}
            >
              {t("egyptianIdOption")}
            </button>
            <button
              type="button"
              onClick={() => {
                setNationality("non-egyptian");
              }}
              className={`py-2 px-3 border-2 font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                nationality === "non-egyptian"
                  ? "bg-black text-white border-black font-semibold"
                  : "bg-white text-black border-black/15 hover:border-black/45"
              }`}
            >
              {t("nonEgyptianOption")}
            </button>
          </div>
        </div>

        <div>
          <span className="font-mono text-[9px] uppercase text-[#666] block mb-2 font-bold tracking-wider">
            {t("currencyPreferenceTitle")}
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCurrency("EGP")}
              className={`py-2 px-4 border-2 font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                currency === 'EGP'
                  ? "bg-black text-white border-black font-semibold"
                  : "bg-white text-black border-black/15 hover:border-[#111]"
              }`}
            >
              {t("egpOption")}
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`py-2 px-4 border-2 font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                currency === 'USD'
                  ? "bg-black text-white border-black font-semibold"
                  : "bg-white text-black border-black/15 hover:border-[#111]"
              }`}
            >
              {t("usdOption")}
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Comparison Matrix Section */}
      <div className="mb-16 bg-[#faf9f6] border-2 border-black p-6 md:p-8 shadow-brutalist space-y-6">
        <div>
          <span className="font-mono text-[9px] tracking-widest text-desert-blue uppercase font-bold block">
            {language === "ar" ? "مصفوفة مقارنة فئات الإقامة" : "LUXURY DWELLINGS MATRIX"}
          </span>
          <h4 className="font-serif text-2xl uppercase tracking-tight text-desert-dark mt-1">
            {language === "ar" ? "قارن بين فئات الإقامة والخدمات" : "Compare Room Categories & Specs"}
          </h4>
          <p className="font-sans text-xs text-[#555] max-w-2xl mt-1 leading-relaxed">
            {language === "ar"
              ? "تفاصيل ومواصفات الديكور والامتيازات لمساعدتك في اختيار القبة الفاخرة التي تلبي تطلعاتك."
              : "Review direct feature pairings and premium amenities to choose the ultimate dome accommodation that matches your dream desert getaway."}
          </p>
        </div>

        {/* Responsive Table Grid */}
        <div className="overflow-x-auto border-2 border-black">
          <table className="w-full text-left font-sans text-xs border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-black text-white font-mono text-[9px] uppercase tracking-widest border-b border-black">
                <th className="p-4 border-r border-black/30">{language === "ar" ? "الميزة / الفئة" : "Specification"}</th>
                <th className="p-4 border-r border-black/30 bg-desert-blue text-[#faf9f6]">{language === "ar" ? "قبة جيوديسية ديلوكس" : "Geo-Dome Deluxe"}</th>
                <th className="p-4 border-r border-black/30">{language === "ar" ? "جناح القبة الجيوديسية" : "Geo-Dome Suite"}</th>
                <th className="p-4">{language === "ar" ? "جناح السفاري الفاخر" : "Safari Suite Tent"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 bg-white">
              <tr>
                <td className="p-3.5 font-bold border-r border-black/10 text-desert-dark">{language === "ar" ? "الوحدات المتاحة لدينا" : "Available Units"}</td>
                <td className="p-3.5 border-r border-black/10 font-semibold text-desert-blue">4 Geo-Dome Tents (٤ خيام قبة)</td>
                <td className="p-3.5 border-r border-black/10 font-semibold text-desert-blue">2 Geo-Dome Suites (٢ أجنحة قبة)</td>
                <td className="p-3.5 font-semibold text-desert-blue">1 Safari Suite (١ جناح سفاري)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold border-r border-black/10 text-desert-dark">{language === "ar" ? "عدد الضيوف الأقصى" : "Maximum Guests"}</td>
                <td className="p-3.5 border-r border-black/10 font-mono text-neutral-800">3 {language === "ar" ? "ضيوف" : "Guests"}</td>
                <td className="p-3.5 border-r border-black/10 font-mono text-neutral-800">4 {language === "ar" ? "ضيوف" : "Guests"}</td>
                <td className="p-3.5 font-mono text-neutral-800">5 {language === "ar" ? "ضيوف" : "Guests"}</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold border-r border-black/10 text-desert-dark">{language === "ar" ? "الإطلالة" : "Scenic View"}</td>
                <td className="p-3.5 border-r border-black/10 text-neutral-800">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> {language === "ar" ? "كل الغرف تطل على بحيرة وادي الريان" : "All rooms see Wadi El Rayan Lake"}</span>
                </td>
                <td className="p-3.5 border-r border-black/10 text-neutral-800">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> {language === "ar" ? "كل الغرف تطل على بحيرة وادي الريان" : "All rooms see Wadi El Rayan Lake"}</span>
                </td>
                <td className="p-3.5 text-neutral-800">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> {language === "ar" ? "كل الغرف تطل على بحيرة وادي الريان" : "All rooms see Wadi El Rayan Lake"}</span>
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold border-r border-black/10 text-desert-dark">{language === "ar" ? "فتحة سقف لرؤية النجوم" : "Stargazing Ceiling Opening"}</td>
                <td className="p-3.5 border-r border-black/10 text-neutral-800">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> {language === "ar" ? "فتحة سقف لرؤية النجوم" : "Stargazing ceiling opening"}</span>
                </td>
                <td className="p-3.5 border-r border-black/10 text-neutral-800">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> {language === "ar" ? "فتحة سقف لرؤية النجوم" : "Stargazing ceiling opening"}</span>
                </td>
                <td className="p-3.5 text-neutral-800">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> {language === "ar" ? "فتحة سقف لرؤية النجوم" : "Stargazing ceiling opening"}</span>
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold border-r border-black/10 text-desert-dark">{language === "ar" ? "جاكوزي خارجي خاص" : "Private Outdoor Jacuzzi"}</td>
                <td className="p-3.5 border-r border-black/10 text-red-600 font-semibold">{language === "ar" ? "لا يوجد" : "Not available"}</td>
                <td className="p-3.5 border-r border-black/10 text-neutral-800">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> {language === "ar" ? "جاكوزي خاص بالسويت" : "Private outdoor jacuzzi"}</span>
                </td>
                <td className="p-3.5 text-neutral-800">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> {language === "ar" ? "جاكوزي خاص بالسويت" : "Private outdoor jacuzzi"}</span>
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold border-r border-black/10 text-desert-dark">{language === "ar" ? "منطقة شعلة النار (كامبفاير)" : "Private Campfire Area"}</td>
                <td className="p-3.5 border-r border-black/10 text-red-600 font-semibold">{language === "ar" ? "لا يوجد (للسويتات فقط)" : "Not available (Suites only)"}</td>
                <td className="p-3.5 border-r border-black/10 text-neutral-800">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> {language === "ar" ? "كامبفاير اريا للسويتات بس" : "Campfire area for suites only"}</span>
                </td>
                <td className="p-3.5 text-neutral-800">
                  <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> {language === "ar" ? "كامبفاير اريا للسويتات بس" : "Campfire area for suites only"}</span>
                </td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold border-r border-black/10 text-desert-dark">{language === "ar" ? "مواصفات وحجم الجناح" : "Suite Sizing & Volume"}</td>
                <td className="p-3.5 border-r border-black/10 text-neutral-500">{language === "ar" ? "قبة فاخرة قياسية" : "Standard luxury dome"}</td>
                <td className="p-3.5 border-r border-black/10 text-neutral-800">{language === "ar" ? "جناح قبة جيوديسية واسع" : "Spacious Geodome Suite Layout"}</td>
                <td className="p-3.5 text-emerald-700 font-bold bg-emerald-50/10">
                  {language === "ar" ? "سفاري سويت أكبر سويت من حيث الحجم" : "Safari Suite is the largest suite in terms of size"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid showing interactive quiet luxury accommodations */}
      <h3 className="font-serif text-2xl uppercase tracking-tight mb-6 text-black border-b-2 border-black pb-3">
        {t("roomCategoriesLiveRates")}
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {accommodationsData.map((room, index) => {
          const currentView = viewModes[room.id] || "wild";
          const currentPricingMode = rateModes[room.id] || "weekend";
          
          const currencyRates = currency === "USD" ? room.rates.USD : room.rates.EGP;
          const availableRates = currencyRates[currentPricingMode];
          
          const rawCap = capacitySelections[room.id] || "double";
          const currentCap = availableRates[rawCap as keyof PricingPlan] ? rawCap : "double";

          const priceToShow = availableRates[currentCap as keyof PricingPlan] || availableRates.double;

          const localized = room.translations?.[language] || {
            title: room.title,
            subTitle: room.subTitle,
            description: room.description,
            amenities: room.amenities,
            features: room.features,
          };
          const title = localized.title;
          const subTitle = localized.subTitle;
          const description = localized.description;
          const amenities = localized.amenities;
          const features = localized.features;

          const hasSelectedInventory = inventory[room.id]?.[selectedCalendarDate]?.status === "available" && (inventory[room.id]?.[selectedCalendarDate]?.roomsLeft || 0) > 0;

          return (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="flex flex-col h-full bg-white border-2 border-black p-6 transition-all duration-300 shadow-brutalist hover:-translate-y-1 relative"
            >
              {/* Media Split comparison container */}
              <div className="relative overflow-hidden aspect-video mb-6 border-2 border-black bg-neutral-100">
                <AnimatePresence mode="wait">
                  {currentView === "wild" ? (
                    <motion.img
                      key="wild"
                      src={room.imageUrl}
                      alt={`${title} ${t("exteriorLabel")}`}
                      referrerPolicy="no-referrer"
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <motion.img
                      key="plush"
                      src={room.interiorImageUrl}
                      alt={`${title} ${t("interiorLabel")}`}
                      referrerPolicy="no-referrer"
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  )}
                </AnimatePresence>

                {/* View Modes overlay selectors */}
                <div className="absolute bottom-3 left-3 flex bg-[#faf9f6] border border-black p-1 space-x-1 z-10">
                  <button
                    onClick={() => toggleViewMode(room.id, "wild")}
                    className={`px-2 py-1 font-mono text-[8px] uppercase tracking-wider transition-all cursor-pointer ${
                      currentView === "wild"
                        ? "bg-black text-white"
                        : "text-black hover:bg-desert-blue-light"
                    }`}
                  >
                    {t("exteriorLabel")}
                  </button>
                  <button
                    onClick={() => toggleViewMode(room.id, "plush")}
                    className={`px-2 py-1 font-mono text-[8px] uppercase tracking-wider transition-all cursor-pointer ${
                      currentView === "plush"
                        ? "bg-black text-white"
                        : "text-black hover:bg-desert-blue-light"
                    }`}
                  >
                    {t("interiorLabel")}
                  </button>
                </div>

                {/* Occupancy Indicator limit */}
                <div className="absolute top-3 right-3 bg-black text-white px-2 py-0.5 font-mono text-[8px] tracking-widest uppercase z-10">
                  {t("maxGuests").toUpperCase()}: {room.maxOccupancy}
                </div>
              </div>

              {/* Title & Description details */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] tracking-widest text-desert-blue uppercase font-bold">
                      {subTitle}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold tracking-tight text-desert-dark uppercase mb-3">
                    {title}
                  </h3>

                  <p className="font-sans text-[11px] text-desert-charcoal/80 leading-relaxed mb-6">
                    {description}
                  </p>

                  {/* WEEKEND vs WEEKDAYS SELECTOR BOX */}
                  <div className="bg-desert-offwhite border border-black p-3.5 mb-6">
                    <span className="font-mono text-[9px] uppercase text-[#777] block mb-2 font-bold tracking-wider">
                      {t("selectRateBasis")}
                    </span>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <button
                        onClick={() => toggleRateMode(room.id, "weekday")}
                        className={`py-1.5 px-2 border text-[9px] font-mono uppercase tracking-wider transition-all ${
                          currentPricingMode === "weekday"
                            ? "bg-black text-white border-black animate-pulse"
                            : "bg-white text-black border-black/15 hover:border-black/30"
                        }`}
                      >
                        {t("weekdaysLabel")}
                      </button>
                      <button
                        onClick={() => toggleRateMode(room.id, "weekend")}
                        className={`py-1.5 px-2 border text-[9px] font-mono uppercase tracking-wider transition-all ${
                          currentPricingMode === "weekend"
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-black/15 hover:border-black/30"
                        }`}
                      >
                        {t("weekendLabel")}
                      </button>
                    </div>

                    {/* Guest occupancy configuration selections */}
                    <span className="font-mono text-[9px] uppercase text-[#777] block mb-2 font-bold tracking-wider">
                      {t("selectOccupancy")}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.keys(availableRates).map((capKey) => {
                        const isSelected = currentCap === capKey;
                        return (
                          <button
                            key={capKey}
                            onClick={() => chooseCapacity(room.id, capKey as any)}
                            className={`px-2.5 py-1 text-[9px] font-mono border capitalize ${
                              isSelected
                                ? "bg-desert-blue text-black border-black font-semibold"
                                : "bg-white text-black border-black/15 hover:border-black/30"
                            }`}
                          >
                            {capKey === "double" ? (language === "ar" ? "شخصين" : "2 Adults") : capKey === "triple" ? (language === "ar" ? "٣ أشخاص" : "3 Adults") : capKey === "quadruple" ? (language === "ar" ? "٤ أشخاص" : "4 Adults") : (language === "ar" ? "٥ أشخاص" : "5 Adults")}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Calculated Price Display Callout */}
                  <div className="border border-black bg-black text-white p-3.5 mb-4 flex items-center justify-between shadow-[2px_2px_0px_0px_rgba(200,185,166,0.3)]">
                    <div>
                      <span className="font-mono text-[8px] tracking-widest text-[#888] uppercase block">
                        {t("calculatedRate")}
                      </span>
                      <span className="font-mono text-[9px] text-desert-blue uppercase">
                        {currentPricingMode === "weekday" ? (language === "ar" ? "أيام الأسبوع" : "Weekday basis") : (language === "ar" ? "نهاية الأسبوع" : "Weekend basis")} • {currentCap.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-lg font-bold block text-desert-blue">
                        {currency === "USD" 
                          ? `$${priceToShow.toLocaleString()} USD` 
                          : `${priceToShow.toLocaleString()} EGP`
                        }
                      </span>
                      <span className="font-sans text-[8px] text-[#aaa]">
                        {currency === "USD" 
                          ? `${t("approxLabel")} ${Math.round(priceToShow * EXCHANGE_RATE).toLocaleString()} EGP` 
                          : `${t("approxLabel")} $${Math.round(priceToShow / EXCHANGE_RATE).toLocaleString()} USD`
                        } • {t("exclTaxes")}
                      </span>
                    </div>
                  </div>

                  {/* Instant Booking Link */}
                  <a
                    href={`https://manage.kwentra.com/reservation/online/#/filter?arrival=18-06-2026&departure=19-06-2026&selling_type=rooms&selling_types=Rooms&rooms_info=%5B%7B%22id%22%3A0%2C%22adults%22%3A1%2C%22children%22%3A0%7D%5D&promo=&voucher=&profile_id=&currency=${currency}&date_format=DD-MM-YYYY&room_type=&selected_hotel=653&lang=${language === "ar" ? "ar" : "en-us"}&company=151&max_num_rooms=10&child_age_dropdown_list=true&children_dropdown_list=true&terminologies=%7B%7D&hotel_selection=%7B%22dropdown%22%3Afalse%2C%22allow_empty%22%3Afalse%2C%22destinations%22%3Afalse%7D&instances=653&specific_rooms_selling=false`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full bg-black hover:bg-desert-blue hover:text-black text-[#faf9f6] text-center font-mono py-2.5 px-4 font-bold text-[10px] tracking-wider uppercase border border-black mb-6 flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px]"
                  >
                    <span>{t("reserveThisDome")}</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>

                  {/* Amenities checklist */}
                  <div className="border-t border-black/10 pt-4 mb-6">
                    <h4 className="font-mono text-[9px] tracking-widest text-desert-dark uppercase mb-3.5 flex items-center space-x-1.5 font-bold">
                      <Compass className="w-3.5 h-3.5 text-desert-blue" />
                      <span>{t("includedComfort")}</span>
                    </h4>
                    <ul className="grid grid-cols-1 gap-1.5 text-[10px] text-desert-charcoal/90 font-sans">
                      {amenities.map((amenity, i) => (
                        <li key={i} className="flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 bg-desert-blue rounded-none transform rotate-45" />
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Features layout markers */}
                <div className="mt-auto pt-4 border-t border-black/10 flex flex-wrap gap-1.5">
                  {features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center space-x-1 font-mono text-[8px] tracking-wider text-black bg-[#C8B9A6]/15 border border-[#C8B9A6]/20 px-2 py-0.5"
                    >
                      <ShieldCheck className="w-2.5 h-2.5 text-[#C8B9A6] mr-0.5" />
                      <span>{feature}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Glamping Rules & Experience Policies Section */}
      <div className="mt-16 bg-[#F4EFE3] border-2 border-black p-6 md:p-8 shadow-brutalist space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black pb-4">
          <div>
            <span className="font-mono text-[9px] tracking-widest text-desert-blue uppercase font-bold block">
              {language === "ar" ? "السياسات والضوابط" : "GLAMPING POLICIES & COMPLIANCE"}
            </span>
            <h4 className="font-serif text-2xl uppercase tracking-tight text-desert-dark mt-1">
              {language === "ar" ? "إرشادات الإقامة والبيئة" : "Essential Guest Regulations"}
            </h4>
            <p className="font-sans text-xs text-neutral-600 max-w-2xl">
              {language === "ar"
                ? "يرجى قراءة سياسات مخيم رمال الريان البيئية لضمان إقامة مريحة وآمنة للجميع وحماية النظام البيئي الفريد."
                : "Please read our luxury glamping guidelines to guarantee a seamless stay while preserving the sensitive desert ecosystem of Wadi El Rayan."}
            </p>
          </div>
          
          <div className="flex bg-[#faf9f6] border border-black p-1 space-x-1.5 self-start overflow-x-auto max-w-full">
            {(["checkin", "eco", "deposit", "dining"] as const).map((tab) => {
              const label = {
                checkin: language === "ar" ? "الدخول والخروج" : "Check-in & Out",
                eco: language === "ar" ? "البيئة المستدامة" : "Eco-Sustainability",
                deposit: language === "ar" ? "السياسات المالية" : "Rates & Deposits",
                dining: language === "ar" ? "الوجبات والغرف" : "Meals & Dry Bar",
              }[tab];
              
              return (
                <button
                  key={tab}
                  onClick={() => setActivePolicyTab(tab)}
                  className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    activePolicyTab === tab
                      ? "bg-black text-white"
                      : "text-black hover:bg-desert-blue/10"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Policy Tab Content with AnimatePresence */}
        <div className="min-h-[140px]">
          <AnimatePresence mode="wait">
            {activePolicyTab === "checkin" && (
              <motion.div
                key="checkin"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2.5">
                  <h5 className="font-serif text-sm font-bold uppercase tracking-tight text-desert-dark flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-desert-blue" />
                    <span>{language === "ar" ? "مواعيد الدخول والخروج الرسمية" : "Standard Timing Regulations"}</span>
                  </h5>
                  <div className="font-mono text-[11px] space-y-1.5 text-neutral-700">
                    <div>• <strong>{language === "ar" ? "موعد الدخول:" : "Check-in:"}</strong> 14:00 (02:00 PM)</div>
                    <div>• <strong>{language === "ar" ? "موعد الخروج:" : "Check-out:"}</strong> 12:00 (12:00 PM) {language === "ar" ? "ظهراً" : "Noon"}</div>
                    <div>• <strong>{language === "ar" ? "طلب مغادرة متأخرة:" : "Late checkout request:"}</strong> {language === "ar" ? "خاضع لمدى التوفر وتكلفة إضافية." : "Subject to availability and surcharge."}</div>
                  </div>
                </div>
                <div className="bg-[#faf9f6] border border-black/15 p-4 space-y-2">
                  <h6 className="font-mono text-[10px] uppercase font-bold text-amber-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    <span>{language === "ar" ? "متطلبات الهوية عند الوصول" : "ID Checks Upon Arrival"}</span>
                  </h6>
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    {language === "ar"
                      ? "للحصول على أسعار المواطنين المصريين، يجب تقديم بطاقة الرقم القومي أو تصريح إقامة ساري عند مكتب الاستقبال لكل ضيف. يرجى إبراز مستندات الحجز الرسمية."
                      : "To apply Egyptian National rates, presenting a valid National ID or residence permit is mandatory for all guests during check-in. Booking paperwork is cross-checked."}
                  </p>
                </div>
              </motion.div>
            )}

            {activePolicyTab === "eco" && (
              <motion.div
                key="eco"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2.5">
                  <h5 className="font-serif text-sm font-bold uppercase tracking-tight text-desert-dark flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-desert-blue" />
                    <span>{language === "ar" ? "أخلاقيات حماية محمية وادي الريان" : "Wadi El Rayan Natural Reserve Guardrail"}</span>
                  </h5>
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    {language === "ar"
                      ? "مخيم رمال هو منشأة مستدامة تعمل بالطاقة النظيفة بالكامل. نحن ندعو زوارنا لتقليل النفايات البلاستيكية، والحفاظ على هدوء الصحراء، والامتناع عن إلقاء المخلفات في المحمية الطبيعية أو البحيرة السحرية."
                      : "Remal Glamp is a fully eco-conscious facility powered by renewable systems. We urge our guests to minimize single-use plastics, honor the natural silence of the desert after 10 PM, and preserve lake waters."}
                  </p>
                </div>
                <div className="bg-desert-blue/5 border border-desert-blue/20 p-4 space-y-2">
                  <h6 className="font-mono text-[10px] uppercase font-bold text-desert-blue">
                    🌱 {language === "ar" ? "أثرك الكربوني والبيئي" : "Our Ecological Footprint Commitment"}
                  </h6>
                  <ul className="font-sans text-xs text-neutral-600 space-y-1">
                    <li>• {language === "ar" ? "الاعتماد على المياه العذبة المحلاة محلياً" : "Pure local desalinated well waters."}</li>
                    <li>• {language === "ar" ? "تجنب الأجهزة عالية الاستهلاك للطاقة" : "Strict prevention of ultra-heavy electrical equipment."}</li>
                    <li>• {language === "ar" ? "يرجى غلق النوافذ والأبواب لحفظ الحرارة" : "Keep portals closed to maintain climate-comfort naturally."}</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activePolicyTab === "deposit" && (
              <motion.div
                key="deposit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2.5">
                  <h5 className="font-serif text-sm font-bold uppercase tracking-tight text-desert-dark flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-desert-blue" />
                    <span>{language === "ar" ? "تأمين الحجز وسياسة الإلغاء" : "Guaranteed Reservations & Cancellation"}</span>
                  </h5>
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    {language === "ar"
                      ? "تخضع الأسعار للزيادة خلال مواسم الأعياد ورأس السنة والمناسبات الوطنية. سياسة الإلغاء المجاني تتاح قبل موعد الوصول بـ 72 ساعة، وإلا سيتم احتساب قيمة الليلة الأولى كرسوم إلغاء متأخر."
                      : "Standard holiday rates apply during high seasons, local festivals, and public holidays. Free cancellation is permitted up to 72 hours prior to arrival; late cancellations incur a 1-night penalty fee."}
                  </p>
                </div>
                <div className="bg-[#faf9f6] border border-black/15 p-4 space-y-2">
                  <h6 className="font-mono text-[10px] uppercase font-bold text-neutral-800">
                    💳 {language === "ar" ? "وسائل الدفع والرسوم الإضافية" : "Secure Payments & Local Taxes"}
                  </h6>
                  <p className="font-sans text-xs text-neutral-500 leading-relaxed">
                    {language === "ar"
                      ? "يتم تسوية جميع الرسوم من خلال محرك دفع Kwentra الآمن. تخضع الأسعار لضريبة القيمة المضافة الإضافية ورسوم الخدمة البالغة 12% للمطاعم في حال طلب وجبات إضافية."
                      : "All transactions are fully processed through our secure, encrypted Kwentra Booking Engine. Nightly rates are subject to local tourism and VAT levies as listed in the checkout totals."}
                  </p>
                </div>
              </motion.div>
            )}

            {activePolicyTab === "dining" && (
              <motion.div
                key="dining"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2.5">
                  <h5 className="font-serif text-sm font-bold uppercase tracking-tight text-desert-dark flex items-center space-x-2">
                    <Coffee className="w-4 h-4 text-desert-blue" />
                    <span>{language === "ar" ? "الوجبات ومطعم لومايا الفاخر" : "Dining Inclusion Specifications"}</span>
                  </h5>
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                    {language === "ar"
                      ? "تشتمل كافة الحجوزات على وجبة إفطار بدوي مميزة في مطعم لومايا. يمكنك ترقية إقامتك لتشمل وجبة الغداء أو العشاء عبر تفعيل حزم نصف الإقامة أو الإقامة الكاملة عند التسجيل."
                      : "All overnight reservations feature a complimentary Bedouin breakfast set at Lummayya Restaurant. Optional half-board (breakfast + dinner) upgrades can be arranged directly during reservation."}
                  </p>
                </div>
                <div className="bg-desert-blue/5 border border-desert-blue/20 p-4 flex items-center justify-between">
                  <div className="space-y-1 max-w-[180px]">
                    <span className="font-serif text-xs font-bold block text-desert-dark">{language === "ar" ? "جاهز لتذوق أطباقنا؟" : "Thirsty or Hungry?"}</span>
                    <p className="font-sans text-[10px] text-neutral-500 leading-tight">
                      {language === "ar" ? "تصفح قائمة طعام لومايا الفاخرة المليئة بالأكلات المحلية والبدوي الحية." : "Explore the dry bar menu, slow-cooked tagines, and campfire marshmallow sets."}
                    </p>
                  </div>
                  {onRedirectToRestaurant && (
                    <button
                      onClick={onRedirectToRestaurant}
                      className="px-3 py-2 bg-black hover:bg-desert-blue hover:text-black text-white font-mono text-[9px] uppercase tracking-wider transition-all border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
                    >
                      {language === "ar" ? "قائمة مطعم لومايا" : "See Lummayya Menu"}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
