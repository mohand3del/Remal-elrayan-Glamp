import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Utensils, Award, Clock, Users, Coffee, Flame, Heart } from "lucide-react";
import { PalmTree } from "./DesertTree";

interface MenuItem {
  name: string;
  price: number;
  details?: string;
  notes?: string;
}

interface MenuSection {
  category: string;
  items: MenuItem[];
}

interface LummayyaMenuProps {
  nationality: "egyptian" | "non-egyptian";
  currency: "EGP" | "USD";
}

export default function LummayyaMenu({ nationality, currency }: LummayyaMenuProps) {
  const [activeTab, setActiveTab] = useState("Breakfast & Specialties");
  const EXCHANGE_RATE = 50.0;

  const tabVisuals: Record<string, { src: string; alt: string }[]> = {
    "Breakfast & Specialties": [
      { src: "/images/lummayya-food-plating.jpeg", alt: "Lummayya signature dishes" },
      { src: "/images/restaurant-lounge-day.jpeg", alt: "Lummayya restaurant daytime seating" },
      { src: "/images/lummayya-night.jpeg", alt: "Lummayya restaurant by night" }
    ],
    "Orientals & Delicacies": [
      { src: "/images/lummayya-food-plating.jpeg", alt: "Oriental and grilled dishes" },
      { src: "/images/restaurant-night-lounge.jpeg", alt: "Night restaurant lounge" },
      { src: "/images/restaurant-lounge-day.jpeg", alt: "Restaurant lounge and seating" }
    ],
    "Quick bites & Pasta": [
      { src: "/images/lummayya-food-plating.jpeg", alt: "Quick bites and plated meals" },
      { src: "/images/restaurant-lounge-day.jpeg", alt: "Restaurant indoor and outdoor lounge" },
      { src: "/images/lummayya-night.jpeg", alt: "Restaurant atmosphere at night" }
    ],
    "Sides, Salads & Desserts": [
      { src: "/images/lummayya-food-plating.jpeg", alt: "Salads and side dishes presentation" },
      { src: "/images/restaurant-night-lounge.jpeg", alt: "Restaurant night dining mood" },
      { src: "/images/restaurant-lounge-day.jpeg", alt: "Daytime restaurant seating" }
    ]
  };

  const formatPrice = (egpPrice: number) => {
    if (currency === "USD" || nationality === "non-egyptian") {
      return `$${Math.round(egpPrice / EXCHANGE_RATE)} USD`;
    }
    return `${egpPrice.toLocaleString()} EGP`;
  };

  const menuData: Record<string, MenuSection[]> = {
    "Breakfast & Specialties": [
      {
        category: "Traditional Breakfast",
        items: [
          { 
            name: "Bedouin Breakfast Set", 
            price: 325, 
            details: "Foul (Eskandrani) or (Tehena + lemon + oil), White cheese with tomato, Two Eggs of your choice, Tameya, Feteer, Honey, Molasses and tehena, Fayoumi Bread. (Extras Available: Pastrami +50 EGP, Sausage +50 EGP, Yogurt +35 EGP)" 
          }
        ]
      },
      {
        category: "Mandi Oven Specialties (Slow Fire Cooking)",
        items: [
          { 
            name: "Half Mandi Bedouin Chicken", 
            price: 450, 
            details: "Served with Egyptian rice with sheriah, mulukhiyah, baladi salad, baba ghanoug, and 2 dipping sauces (tumeya and dakous).", 
            notes: "Cooking time: 3 hours required" 
          },
          { 
            name: "Half Mandi Bedouin Duck", 
            price: 700, 
            details: "Served with Basmati rice with our oriental bedouin touch, musakaa, roasted veggies, baladi salad, and 2 dipping sauces (harisa and tehina).", 
            notes: "Cooking time: 3 hours required" 
          },
          { 
            name: "Quarter Mandi Bedouin Goat", 
            price: 3800, 
            details: "Served with Egyptian rice, mulukhiyah, muskak'a, roasted vegetables, baladi salad, baba ghanoug, and 2 dipping sauces of each (tumeya, harisa, dakous, and pesto).", 
            notes: "Serves 3-5 guests • Cooking time: 5 hours required" 
          },
          { 
            name: "Short Ribs (On Firewood)", 
            price: 1400, 
            details: "Perfectly cooked in the Mandi oven on firewood, giving it a very special smokey taste. Served with 2 Basmati rice, roasted veggies, our infamous pesto dipping sauce, and harisa paste.", 
            notes: "Price per Kilogram • Minimum weight 1500g • Cooking time: 5 hours required" 
          }
        ]
      }
    ],
    "Orientals & Delicacies": [
      {
        category: "House Orientals",
        items: [
          { name: "Oriental Platter", price: 1200, details: "An elite selection of traditional items, designed for group sharing." },
          { name: "Tajine Grape Leaves with Trotters", price: 350, details: "Rich and slow-cooked grape leaves topped with tender beef trotters." },
          { name: "Tajine Okra with Meat", price: 240, details: "Deliciously spiced local okra cooked with tender meat." },
          { name: "Hawawshi", price: 240, details: "Traditional Egyptian spiced minced meat baked inside fresh crispy bread." },
          { name: "Roz Maamer", price: 170, details: "Creamy baked rice made with rich local milk and baked in clay pots." },
          { name: "Mombar", price: 140, details: "Spiced rice-stuffed beef sausage deep fried to golden perfection." }
        ]
      },
      {
        category: "House Delicacies",
        items: [
          { 
            name: "Beef Tenderloin", 
            price: 850, 
            details: "Served with mashed potatoes and roasted veggies or sauteed green beans with rich sauce." 
          },
          { 
            name: "Beef Medallions", 
            price: 750, 
            details: "Juicy and tender rounded beef cuts. Served with mashed potatoes and sauteed green beans." 
          },
          { 
            name: "Shrimp", 
            price: 750, 
            details: "Your choice of Grilled, Fried, or Butterfly Shrimps. Served with green rice and Tartar or Butterfly dipping sauce." 
          },
          { 
            name: "Stuffed Pigeon Pair", 
            price: 700, 
            details: "A pair of stuffed pigeons with rice, pan-fried with butter, and served with French fries." 
          },
          { 
            name: "Braised Oxtail", 
            price: 650, 
            details: "Slowly cooked, tender fall-off-the-bone meat with caramelized onions." 
          },
          { 
            name: "Quail Pair", 
            price: 550, 
            details: "A pair of quails, cooked with Julian onions with a lemon twist." 
          }
        ]
      }
    ],
    "Quick bites & Pasta": [
      {
        category: "Quick & Delicious Bites",
        items: [
          { name: "Sojok Swirl", price: 500, details: "A swirl of sausage with an authentic taste of Fayoumy spices, served with colored peppers and Julian onions." },
          { name: "Chicken Butter Lemon", price: 400, details: "Two chicken breast fillets served with basmati rice with a bedouin touch." },
          { name: "Chicken Curry", price: 400, details: "Sautéed chicken cooked in our delicious local curry sauce." },
          { name: "Breaded Chicken Rolls", price: 320, details: "Breaded crumb chicken rolls stuffed with mozzarella cheese. Served with French fries and tumeya dipping sauce." },
          { name: "Smash Burger Single", price: 240, details: "Prepared with cheese, caramelized onions, pickles, tomatoes, and mayo. Served with French fries." },
          { name: "Smash Burger Double", price: 290, details: "Prepared with cheese, caramelized onions, pickles, tomatoes, and mayo. Served with French fries." },
          { name: "Fried Chicken Tenders", price: 280, details: "Served with French fries and sweet chili dipping sauce." },
          { name: "Shish Tawook", price: 280, details: "Served with French fries and tumeya dipping sauce." }
        ]
      },
      {
        category: "Pasta & Spaghetti",
        items: [
          { name: "Mebakbaka", price: 280, details: "Tiny pasta rings cooked in a light red sauce with small diced beef Tenderloins." },
          { name: "Spaghetti Bolognese", price: 270, details: "Served with rich meat sauce and parmesan cheese." },
          { name: "Penne Alfredo Chicken", price: 250, details: "Served with rich white cream sauce and parmesan cheese." },
          { name: "Pasta with White Sauce", price: 180, details: "Classic pasta served with rich white sauce and herbs." },
          { name: "Pasta with Red Sauce", price: 160, details: "Classic pasta served with fresh tomato red sauce and basil." }
        ]
      }
    ],
    "Sides, Salads & Desserts": [
      {
        category: "Sides & Salads",
        items: [
          { name: "Greek Salad", price: 170, details: "Crisp cucumbers, tomatoes, red onions, feta cheese, and olives." },
          { name: "Sautéed Vegetables", price: 150, details: "Lightly seasoned fresh seasonal vegetables sautéed in butter." },
          { name: "Soup of the Day", price: 100, details: "Ask about our chef's daily special hot soup." },
          { name: "Mosaka", price: 90, details: "Traditional baked eggplant and bell pepper casserole with rich sauce." },
          { name: "Basmati Rice", price: 80, details: "Seasoned basmati rice cooked with bedouin aromatics." },
          { name: "Mulukhiyah", price: 70, details: "Authentic Egyptian green jute leaf broth with garlic and coriander." },
          { name: "French Fries", price: 65, details: "Golden crispy potato fries." },
          { name: "Mashed Potatoes", price: 65, details: "Creamy whipped potatoes with butter and seasoning." },
          { name: "Egyptian Rice", price: 60, details: "Traditional Egyptian white rice." },
          { name: "Roasted Veggies", price: 60, details: "Seasonal wood-fired roasted vegetables." },
          { name: "Dips & Baladi Salads (Tomeya, Tehena, Harisa, or Dakous)", price: 35, details: "Flavorful traditional dipping sauces and side salads. 35 LE each." }
        ]
      },
      {
        category: "Sweet Endings (Desserts)",
        items: [
          { name: "Om Ali", price: 150, details: "Puff pastry baked in hot full cream milk, finished with a dash of nuts." },
          { name: "Apples Fokharah Cake", price: 150, details: "Warm apples pot cake baked in traditional pottery ovens." },
          { name: "Waffles", price: 140, details: "Warm crispy waffles served with sweet chocolate syrup or honey." },
          { name: "Pancake", price: 140, details: "Fluffy breakfast pancakes served with maple syrup or sweet honey." },
          { name: "Sweet Potato Bites", price: 120, details: "Roasted sweet potato bites accompanied by caramel drizzle." },
          { name: "Fruit Platter", price: 85, details: "Selection of fresh seasonal oasis fruits." }
        ]
      }
    ]
  };

  return (
    <div className="bg-[#F4EFE3] border-2 border-black p-6 md:p-10 shadow-brutalist max-w-7xl mx-auto my-12 text-black">
      {/* Editorial Header */}
      <div className="border-b-2 border-black pb-8 mb-8 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-widest text-desert-blue uppercase block font-bold">
              CULINARY SANCTUARY
            </span>
            <h3 className="font-serif text-3xl md:text-5xl uppercase tracking-tighter text-desert-dark flex items-center gap-2">
              <PalmTree className="text-desert-green shrink-0 animate-float-slow" size={32} color="#2E5A44" />
              <span>Welcome to Lummayya</span>
            </h3>
            <p className="font-sans text-sm text-[#444] max-w-2xl leading-relaxed">
              Lummayya means <strong className="text-black">“the water”</strong> in the local Bedouin dialect, and just like water, our place is here to refresh you. We designed it to bring out the beauty of the desert, blending tradition with comfort and a touch of elegance.
            </p>
          </div>
          
          <div className="bg-desert-blue text-[#F4EFE3] p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-md">
            <h4 className="font-serif text-sm uppercase tracking-tight font-bold mb-1.5">At Lummayya, Your Wellbeing Comes First</h4>
            <p className="font-sans text-xs leading-relaxed opacity-95">
              We carefully select only the finest ingredients from trusted local suppliers across Egypt. All our meats are 100% premium, fresh, and thoroughly checked for quality.
            </p>
          </div>
        </div>

        {/* Brand narrative, philosophy and specs grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-black/10">
          <div className="md:col-span-8 space-y-4 text-xs text-neutral-800 leading-relaxed font-sans">
            <p>
              We maintain the highest hygiene standards at every step, so you can enjoy your meal with complete peace of mind, knowing that quality, cleanliness, and your health are always our top priority.
            </p>
            <p>
              You can join us any time of the day for a laid-back lunch or a cozy dinner or even book a whole day of use and enjoy the surroundings with our activities. Our menu is a mix of Bedouin classics, reimagined with style, along with international favorites you’ll love.
            </p>
            <p>
              The restaurant itself is something special, designed like the desert dunes. Inside, we have <strong>85 elegant seats</strong>, with wooden and bamboo details. Outside, you can choose between lounges, dining tables, or a traditional Bedouin setup with cushions and rugs, or simply relax by the campfire with Bedouin tea or marshmallows. Outdoors, we can welcome up to <strong>100 guests</strong>.
            </p>
            <p>
              To keep you comfy all year round, we’ve got fans and ventilators for the summer, and heaters for the cooler nights.
            </p>
            
            <div className="bg-white border-2 border-black p-4 flex items-start space-x-3.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-xl mt-0.5">☕</span>
              <div>
                <strong className="font-serif text-xs uppercase block text-desert-dark">The Dry Bar</strong>
                <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                  And don’t forget our dry bar, serving everything from coffee, tea, sodas, and fresh juices, right here in the heart of the desert.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-[#faf9f6] border-2 border-black p-5 space-y-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] self-start">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#777] font-bold block">Premises & Dimensions</span>
            <div className="space-y-4 font-mono text-xs">
              <div className="border-b border-black/5 pb-3">
                <span className="text-[#666] block text-[9px] uppercase font-bold mb-0.5">Indoors</span>
                <strong className="text-black text-sm">160 m²</strong>
                <span className="text-[10px] text-neutral-500 block mt-0.5">85 Elegant wooden & bamboo seats</span>
              </div>
              <div className="border-b border-black/5 pb-3">
                <span className="text-[#666] block text-[9px] uppercase font-bold mb-0.5">Outdoors</span>
                <strong className="text-black text-sm">400 m²</strong>
                <span className="text-[10px] text-neutral-500 block mt-0.5">200 m² desert view + 200 m² lake view (up to 100 guests)</span>
              </div>
              <div>
                <span className="text-[#666] block text-[9px] uppercase font-bold mb-0.5">Full Premises</span>
                <strong className="text-black text-sm">2,000 m²</strong>
                <span className="text-[10px] text-neutral-500 block mt-0.5">Traditional Bedouin setups, campfires & view terraces</span>
              </div>
            </div>
            <div className="text-[9px] text-[#777] leading-normal pt-2 border-t border-black/5 font-mono">
              * Menu prices are subject to a 12% Restaurant Service Charge. Day-use packages are exempt.
            </div>
          </div>
        </div>
      </div>

      {/* Tabs navigation menu */}
      <div className="flex flex-wrap gap-2 border-b border-black/15 pb-4 mb-8">
        {Object.keys(menuData).map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wide border-2 transition-all cursor-pointer ${
                isActive
                  ? "bg-black text-[#F4EFE3] border-black shadow-brutalist"
                  : "border-black/10 hover:border-black/30 text-black/70 bg-[#F4EFE3]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {(tabVisuals[activeTab] || []).map((visual, index) => (
          <div
            key={`${activeTab}-${index}`}
            className="aspect-[4/3] overflow-hidden border-2 border-black bg-[#faf9f6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <img
              src={visual.src}
              alt={visual.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Interactive Menu Items Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {menuData[activeTab].map((section, sIdx) => (
          <div key={sIdx} className="space-y-6">
            <div className="border-b-2 border-black pb-2">
              <h4 className="font-serif text-lg font-bold tracking-tight uppercase flex items-center space-x-2">
                <span className="w-2 h-2 bg-desert-blue rounded-full" />
                <span>{section.category}</span>
              </h4>
            </div>

            <div className="space-y-4">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="group border-b border-black/5 pb-4 last:border-b-0 hover:bg-desert-blue-light/20 p-2 transition-colors">
                  <div className="flex justify-between items-baseline gap-4">
                    <span className="font-serif text-md font-medium text-black group-hover:text-desert-blue transition-colors">
                      {item.name}
                    </span>
                    <span className="font-mono text-xs font-semibold whitespace-nowrap bg-black/5 px-2 py-0.5">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  {item.details && (
                    <p className="font-sans text-[11px] text-desert-charcoal/70 mt-1.5 leading-relaxed">
                      {item.details}
                    </p>
                  )}
                  {item.notes && (
                    <div className="flex items-center space-x-1 mt-1.5 font-mono text-[9px] text-[#888] uppercase">
                      <Clock className="w-3.5 h-3.5 text-desert-blue" />
                      <span>{item.notes}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-desert-blue-light border border-desert-blue/40 p-4 mt-8 flex items-start space-x-2 text-xs">
        <Flame className="w-4 h-4 text-desert-blue mt-0.5 flex-shrink-0" />
        <p className="font-sans text-[11px] text-[#444] leading-relaxed">
          <strong className="text-black uppercase">PRE-ORDER MANDATES:</strong> To guarantee absolute peak quality of slow-fire items (including Mandi Poultry and Lamb ribs), clients are requested to send preferred choices <strong className="text-black">at least 1 day prior</strong> to arrival.
        </p>
      </div>
    </div>
  );
}
