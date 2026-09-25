import { useState, FormEvent, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../LanguageContext";
import { 
  Utensils, Users, Calendar, Clock, Compass, Plus, Minus, 
  Trash2, Send, Beer, HelpCircle, CheckCircle2, AlertCircle, FileText, Upload, Globe, RefreshCw, ExternalLink
} from "lucide-react";

interface PreOrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface SimulatedSheetRow {
  id: string;
  guestName: string;
  phone: string;
  date: string;
  seating: string;
  category: string;
  slotTime: string;
  dishes: string;
  totalBill: string;
  paymentStatus: string;
  submittedAt: string;
}

interface LummayyaBookingProps {
  nationality: "egyptian" | "non-egyptian";
  setNationality: (nationality: "egyptian" | "non-egyptian") => void;
  currency: "EGP" | "USD";
  setCurrency: (currency: "EGP" | "USD") => void;
}

export default function LummayyaBooking({
  nationality,
  setNationality,
  currency,
  setCurrency,
}: LummayyaBookingProps) {
  const { language } = useLanguage();
  // Config & Core Switches
  const EXCHANGE_RATE = 50.0;

  // Booking Form Core State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("2026-06-21");
  const [time, setTime] = useState("14:00");
  
  // Category Select state
  const [bookingCategory, setBookingCategory] = useState<"single-slot" | "breakfast" | "day-use">("single-slot");
  const [menuFilter, setMenuFilter] = useState("all");
  const [calculatorMode, setCalculatorMode] = useState<"direct" | "calculator">("direct");
  
  // Seating Zones Selector
  const [seatingArea, setSeatingArea] = useState("Indoor");
  const [specialRequests, setSpecialRequests] = useState("");
  const [combineGroupBilling, setCombineGroupBilling] = useState(false);

  // Guests counting
  const [guestsCount, setGuestsCount] = useState(2);

  // Extras state for Breakfast Category
  const [breakfastExtras, setBreakfastExtras] = useState({
    pastrami: false,
    sausage: false,
    yogurt: false,
  });

  // Children ages for Day-Use Category
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  
  // Upload screenshot simulation
  const [uploadedReceipt, setUploadedReceipt] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-ordered dishes selection
  const [preOrderBasket, setPreOrderBasket] = useState<PreOrderItem[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [compiledMessage, setCompiledMessage] = useState("");
  const [copiedText, setCopiedText] = useState(false);

  // Simulated live Google Sheets backend rows
  const [sheetsLog, setSheetsLog] = useState<SimulatedSheetRow[]>([
    {
      id: "TS-8842",
      guestName: "Farid Mansour",
      phone: "+201002345678",
      date: "2026-06-18",
      seating: "Bedouin Seats Lake",
      category: "Breakfast Booking",
      slotTime: "10:30 AM",
      dishes: "Bedouin Breakfast Set (4x)",
      totalBill: "1,300 EGP",
      paymentStatus: "CONFIRMED",
      submittedAt: "2026-06-18 11:24 AM"
    },
    {
      id: "TS-8843",
      guestName: "Hanan El-Gamil",
      phone: "+201229876543",
      date: "2026-06-19",
      seating: "Outdoor Lake View (50 Seats)",
      category: "Day-Use Package",
      slotTime: "09:00 AM",
      dishes: "Day-use Adult Bundle (2x), Kids (1x)",
      totalBill: "4,200 EGP",
      paymentStatus: "PENDING VALIDATION",
      submittedAt: "2026-06-18 01:10 PM"
    }
  ]);

  // Pre-order options
  const preOrderOptions = [
    { 
      name: "Bedouin Breakfast Set", 
      price: 500, 
      category: "breakfast", 
      excludedInDayUse: false,
      prepTime: "Instant / Freshly baked daily",
      ingredients: "Traditional Foul (Eskandrani) or with Tehena, lemon and oil; white cheese with tomato; two eggs of your choice; Tameya; Feteer; Honey; Molasses and tehena; served with hot Fayoumi Bread."
    },
    { 
      name: "Half Mandi Bedouin Chicken", 
      price: 1000, 
      category: "lunch", 
      excludedInDayUse: false,
      prepTime: "3 Hours slow pit cook",
      ingredients: "Served with Egyptian rice with sheriah, mulukhiyah, baladi salad, baba ghanoug, and 2 dipping sauces (tumeya and dakous)."
    },
    { 
      name: "Half Mandi Bedouin Duck", 
      price: 1250, 
      category: "lunch", 
      excludedInDayUse: false,
      prepTime: "3 Hours slow pit cook",
      ingredients: "Served with Basmati rice with our oriental bedouin touch, musakaa, roasted veggies, baladi salad, and 2 dipping sauces (harisa and tehina)."
    },
    { 
      name: "Quarter Mandi Bedouin Goat (Serves 3-5)", 
      price: 5000, 
      category: "lunch", 
      excludedInDayUse: true,
      prepTime: "5 Hours deep-pit roast",
      ingredients: "Served with Egyptian rice, mulukhiyah, muskak'a, roasted vegetables, baladi salad, baba ghanoug, and 2 dipping sauces of each (tumeya, harisa, dakous, and pesto)."
    },
    { 
      name: "Half Mandi Bedouin Goat", 
      price: 8250, 
      category: "lunch", 
      excludedInDayUse: true,
      prepTime: "5 Hours deep-pit roast",
      ingredients: "Served with Egyptian rice, mulukhiyah, muskak'a, roasted vegetables, baladi salad, baba ghanoug, and dipping sauces of each (tumeya, harisa, dakous, and pesto)."
    },
    { 
      name: "Short Ribs (On firewood - 1.5kg base)", 
      price: 2000, 
      category: "lunch", 
      excludedInDayUse: true,
      prepTime: "5 Hours firewood smoke",
      ingredients: "Perfectly cooked in the Mandi oven on firewood, giving it a very special smokey taste. Served with 2 Basmati rice, roasted veggies, our infamous pesto dipping sauce, and harrisa paste."
    },
    { 
      name: "Beef Tenderloin with Mushroom Sauce", 
      price: 1500, 
      category: "lunch", 
      excludedInDayUse: true,
      prepTime: "45 Minutes fire grill",
      ingredients: "Double-thick tenderized local beef fillet cooked to choice, served with mashed potatoes and roasted veggies or sauteed green beans."
    },
    { 
      name: "Beef Medallions", 
      price: 1250, 
      category: "lunch", 
      excludedInDayUse: true,
      prepTime: "40 Minutes skillet sear",
      ingredients: "Juicy and tender rounded beef cuts. Served with mashed potatoes and sauteed green beans."
    },
    { 
      name: "Braised Oxtail (Akawi)", 
      price: 1250, 
      category: "lunch", 
      excludedInDayUse: true,
      prepTime: "2.5 Hours slow braise",
      ingredients: "Slowly cooked, tender fall-off-the-bone meat with caramelized onions. Served with rice."
    },
    { 
      name: "Stuffed Pigeon Pair", 
      price: 1250, 
      category: "lunch", 
      excludedInDayUse: false,
      prepTime: "1.5 Hours pan glaze",
      ingredients: "A pair of stuffed pigeons with rice, pan-fried with butter, and served with French fries."
    },
    { 
      name: "Quail Pair", 
      price: 1000, 
      category: "lunch", 
      excludedInDayUse: false,
      prepTime: "1 Hour wood fire cook",
      ingredients: "A pair of quails, cooked with Julian onions with a lemon twist. Served with your choice of French fries or basmati rice."
    },
    { 
      name: "Shrimp (Grilled, Fried, or Butterfly)", 
      price: 1250, 
      category: "lunch", 
      excludedInDayUse: true,
      prepTime: "30 Minutes fast-fire",
      ingredients: "Your choice of Grilled, Fried, or Butterfly Shrimps. Served with green rice and Tartar or Butterfly dipping sauce."
    },
    { 
      name: "Spaghetti Bolognese", 
      price: 1000, 
      category: "pasta", 
      excludedInDayUse: false,
      prepTime: "20 Minutes",
      ingredients: "Spaghetti cooked with rich seasoned ground beef bolognese sauce, served with parmesan cheese."
    },
    { 
      name: "Mebakbaka", 
      price: 1000, 
      category: "pasta", 
      excludedInDayUse: false,
      prepTime: "25 Minutes dynamic boiling",
      ingredients: "Tiny pasta rings cooked in a light red sauce with small diced beef Tenderloins."
    },
    { 
      name: "Penne Alfredo Chicken", 
      price: 750, 
      category: "pasta", 
      excludedInDayUse: false,
      prepTime: "20 Minutes",
      ingredients: "Penne pasta with creamy Alfredo white sauce, chicken strips, and shredded parmesan cheese."
    },
    { 
      name: "Purple Spaghetti", 
      price: 750, 
      category: "pasta", 
      excludedInDayUse: false,
      prepTime: "20 Minutes",
      ingredients: "Vibrant custom purple spaghetti served with sweet Hawaiian Chicken Sauce."
    },
    { 
      name: "Linguine with Red Sauce", 
      price: 500, 
      category: "pasta", 
      excludedInDayUse: false,
      prepTime: "15 Minutes",
      ingredients: "Classic Italian linguine tossed with house tomato sauce, fresh basil, and parmesan cheese."
    },
    { 
      name: "Linguine with White Sauce", 
      price: 500, 
      category: "pasta", 
      excludedInDayUse: false,
      prepTime: "15 Minutes",
      ingredients: "Classic Italian linguine tossed with rich buttery white cream sauce and parmesan cheese."
    },
    { 
      name: "Smash Burger (Single)", 
      price: 750, 
      category: "quick-delic", 
      excludedInDayUse: false,
      prepTime: "15 Minutes grill",
      ingredients: "Prepared with cheese, caramelized onions, pickles, tomatoes, and mayo. Served with French fries."
    },
    { 
      name: "Smash Burger (Double)", 
      price: 1000, 
      category: "quick-delic", 
      excludedInDayUse: false,
      prepTime: "15 Minutes grill",
      ingredients: "Prepared with cheese, caramelized onions, pickles, tomatoes, and mayo. Served with French fries."
    },
    { 
      name: "Boerewors", 
      price: 750, 
      category: "quick-delic", 
      excludedInDayUse: false,
      prepTime: "20 Minutes grill",
      ingredients: "A swirl of sausage with an authentic taste of Fayoumy spices, served with colored peppers and Julian onions."
    },
    { 
      name: "Fried Chicken Tenders", 
      price: 750, 
      category: "quick-delic", 
      excludedInDayUse: false,
      prepTime: "15 Minutes fry",
      ingredients: "Golden fried chicken breast tenders served with French fries and sweet chili dipping sauce."
    },
    { 
      name: "Breaded Chicken Rolls", 
      price: 750, 
      category: "quick-delic", 
      excludedInDayUse: false,
      prepTime: "20 Minutes bake",
      ingredients: "Breaded crumb chicken rolls stuffed with melty mozzarella cheese. Served with French fries and tumeya dipping sauce."
    },
    { 
      name: "Chicken Butter Lemon", 
      price: 750, 
      category: "quick-delic", 
      excludedInDayUse: false,
      prepTime: "20 Minutes",
      ingredients: "Two chicken breast fillets sautéed with tangy lemon-butter sauce, served with basmati rice."
    },
    { 
      name: "Shish Tawook", 
      price: 750, 
      category: "quick-delic", 
      excludedInDayUse: false,
      prepTime: "20 Minutes grill",
      ingredients: "Juicy marinated charcoal-grilled chicken skewers, served with French fries and tumeya dipping sauce."
    },
    { 
      name: "Tajine Okra with Meat and Rice", 
      price: 350, 
      category: "sides", 
      excludedInDayUse: false,
      prepTime: "30 Minutes clay bake",
      ingredients: "Slow-baked okra pods in spiced red sauce with chunks of tender beef, served with Egyptian rice."
    },
    { 
      name: "Roz Maamar", 
      price: 250, 
      category: "sides", 
      excludedInDayUse: false,
      prepTime: "35 Minutes clay bake",
      ingredients: "Savoury baked rice with rich milk, sweet cream, and chicken broth in rustic clay pot."
    },
    { 
      name: "Mombar", 
      price: 250, 
      category: "sides", 
      excludedInDayUse: false,
      prepTime: "20 Minutes",
      ingredients: "Stuffed beef casing with spiced herb rice, boiled and fried to golden crispiness."
    },
    { 
      name: "Rice with Mulukhiyah", 
      price: 150, 
      category: "sides", 
      excludedInDayUse: false,
      prepTime: "15 Minutes",
      ingredients: "Steaming white rice paired with aromatic, garlic-coriander spiced Egyptian mulukhiyah."
    },
    { 
      name: "Basmati Rice (with Bedouin touch)", 
      price: 150, 
      category: "sides", 
      excludedInDayUse: false,
      prepTime: "15 Minutes",
      ingredients: "Yellow long-grain basmati rice cooked with authentic Bedouin whole cardamoms and dry lime."
    },
    { 
      name: "Mosaka with Fayoumy Bread", 
      price: 150, 
      category: "sides", 
      excludedInDayUse: false,
      prepTime: "15 Minutes",
      ingredients: "Sautéed eggplants and hot green chili cooked with rich tomato sauce, served with fresh Fayoumy bread."
    },
    { 
      name: "Roasted Veggies", 
      price: 100, 
      category: "sides", 
      excludedInDayUse: false,
      prepTime: "15 Minutes",
      ingredients: "Seasoned local garden zucchinis, carrots, and sweet bell peppers lightly flame-grilled."
    },
    { 
      name: "Sambousak", 
      price: 100, 
      category: "sides", 
      excludedInDayUse: false,
      prepTime: "15 Minutes",
      ingredients: "Triangular crispy stuffed pastries with melted mixed cheeses or seasoned spiced beef."
    },
    { 
      name: "French Fries", 
      price: 100, 
      category: "sides", 
      excludedInDayUse: false,
      prepTime: "10 Minutes",
      ingredients: "Crisp and golden-fried potato fingers salted with local desert salt flakes."
    },
    { 
      name: "Mashed Potatoes", 
      price: 100, 
      category: "sides", 
      excludedInDayUse: false,
      prepTime: "10 Minutes",
      ingredients: "Buttery whipped potatoes seasoned with fresh cream, whole milk, and mild spices."
    },
    { 
      name: "Baba Ghanoug", 
      price: 50, 
      category: "salads-dips", 
      excludedInDayUse: false,
      prepTime: "10 Minutes",
      ingredients: "Smoky charcoal-grilled aubergine mashed with white tahini, fresh garlic, lemon, and olive oil."
    },
    { 
      name: "Baladi Salad", 
      price: 50, 
      category: "salads-dips", 
      excludedInDayUse: false,
      prepTime: "10 Minutes",
      ingredients: "Egyptian garden salad made of crispy cucumbers, tomatoes, onions, cilantro, and lemon dressing."
    },
    { 
      name: "Premium Dip (Tumeya)", 
      price: 50, 
      category: "salads-dips", 
      excludedInDayUse: false,
      prepTime: "5 Minutes",
      ingredients: "Creamy whipped levantine garlic sauce with sweet olive oil."
    },
    { 
      name: "Premium Dip (Tehena)", 
      price: 50, 
      category: "salads-dips", 
      excludedInDayUse: false,
      prepTime: "5 Minutes",
      ingredients: "Whipped sesame paste sauce balanced with vinegar, garlic, lemon, and fresh cumin."
    },
    { 
      name: "Premium Dip (Harisa)", 
      price: 50, 
      category: "salads-dips", 
      excludedInDayUse: false,
      prepTime: "5 Minutes",
      ingredients: "Spicy roasted red chili paste blended with garlic, olive oil, and coriander."
    },
    { 
      name: "Premium Dip (Dakous)", 
      price: 50, 
      category: "salads-dips", 
      excludedInDayUse: false,
      prepTime: "5 Minutes",
      ingredients: "Gulf-style freshly crushed raw tomatoes, green chilis, garlic, coriander, and lime juice."
    },
    { 
      name: "Parmesan Cheese", 
      price: 50, 
      category: "salads-dips", 
      excludedInDayUse: false,
      prepTime: "Immediate",
      ingredients: "Premium finely-grated dry Italian hard cheese, perfect to accompany your pasta choices."
    },
    { 
      name: "Batata Brûlée", 
      price: 500, 
      category: "dessert", 
      excludedInDayUse: true,
      prepTime: "20 Minutes clay oven bake",
      ingredients: "Sweet potato brûlée accompanied by crunchy honeycomb."
    },
    { 
      name: "Om Ali Baked Pot", 
      price: 500, 
      category: "dessert", 
      excludedInDayUse: true,
      prepTime: "20 Minutes clay bake",
      ingredients: "Puff pastry baked in hot full cream milk, finished with a dash of nuts, and served hot straight out of the oven."
    },
    { 
      name: "Apples & Dates Fokharah Cake", 
      price: 500, 
      category: "dessert", 
      excludedInDayUse: true,
      prepTime: "25 Minutes clay bake",
      ingredients: "New specialty clay pot cake loaded with sweet dates, stewed apples, and baked with cinnamon notes."
    },
    { 
      name: "Fruit Platter", 
      price: 500, 
      category: "dessert", 
      excludedInDayUse: true,
      prepTime: "15 Minutes",
      ingredients: "Beautiful assortment of local, organically grown fresh seasonal fruits of the Fayoum Oasis."
    },
    { 
      name: "Waffles", 
      price: 500, 
      category: "dessert", 
      excludedInDayUse: true,
      prepTime: "15 Minutes",
      ingredients: "Freshly griddled crispy waffles served with mountain honey or sweet date syrup."
    }
  ];

  // Check if chosen slot is after 5:00 PM (17:00)
  const isTimeAfterFivePm = (selectedTime: string) => {
    if (!selectedTime) return false;
    const [hoursStr] = selectedTime.split(":");
    const hours = parseInt(hoursStr, 10);
    return hours >= 17;
  };

  // Convert presence slot for Single Slot Booking
  const getPresenceSlot = (selectedTime: string) => {
    if (!selectedTime) return "";
    const [hoursStr, minutesStr] = selectedTime.split(":");
    let hours = parseInt(hoursStr, 10);
    if (isNaN(hours)) return "";
    
    const formatTime12h = (h: number) => {
      const finalH = (h + 24) % 24;
      const period = finalH >= 12 ? "PM" : "AM";
      const displayH = finalH % 12 === 0 ? 12 : finalH % 12;
      return `${displayH}:${minutesStr} ${period}`;
    };
    
    // presence slot is from [selectedTime - 3 hours] to [selectedTime - 2 hours]
    return `from ${formatTime12h(hours - 3)} to ${formatTime12h(hours - 2)}`;
  };

  // Check if date selection is strictly 24 hours in advance
  const isPreOrderingAvailable = () => {
    if (!date) return false;
    const selectedDateObj = new Date(date);
    const currentDateObj = new Date();
    // Reset hours to compare purely date offsets
    selectedDateObj.setHours(0,0,0,0);
    currentDateObj.setHours(0,0,0,0);
    
    const diffTime = selectedDateObj.getTime() - currentDateObj.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= 1; // Needs to be at least 1 full day ahead
  };

  // Handle addition of children ages
  const addChildAge = () => {
    setChildrenAges([...childrenAges, 10]);
  };

  // Update specific child age
  const updateChildAge = (index: number, age: number) => {
    const updated = [...childrenAges];
    updated[index] = age;
    setChildrenAges(updated);
  };

  // Remove child age
  const removeChildAge = (index: number) => {
    setChildrenAges(childrenAges.filter((_, i) => i !== index));
  };

  // Add standard pre-order item to basket
  const addToBasket = (dishName: string, price: number) => {
    const option = preOrderOptions.find(x => x.name === dishName);
    if (bookingCategory === "day-use" && option?.excludedInDayUse) {
      return; // Force exclusion block
    }
    const existing = preOrderBasket.find(x => x.name === dishName);
    if (existing) {
      setPreOrderBasket(
        preOrderBasket.map(x => x.name === dishName ? { ...x, quantity: x.quantity + 1 } : x)
      );
    } else {
      setPreOrderBasket([...preOrderBasket, { name: dishName, price, quantity: 1 }]);
    }
  };

  // Update basket counts
  const updateQuantity = (dishName: string, delta: number) => {
    setPreOrderBasket(prev => {
      return prev.map(x => {
        if (x.name === dishName) {
          const nextQty = x.quantity + delta;
          return nextQty > 0 ? { ...x, quantity: nextQty } : null;
        }
        return x;
      }).filter(Boolean) as PreOrderItem[];
    });
  };

  const removeFromBasket = (dishName: string) => {
    setPreOrderBasket(preOrderBasket.filter(x => x.name !== dishName));
  };

  // Calculate detailed bill pricing breakdown based on active category
  const calculateTotalBillDetails = () => {
    let restaurantSubtotalEgp = 0;
    let packageSubtotalEgp = 0;
    const details: string[] = [];

    const formatCharge = (amountEgp: number): string => {
      if (nationality === "non-egyptian" || currency === "USD") {
        return `$${Math.round(amountEgp / EXCHANGE_RATE)} USD`;
      }
      return `${amountEgp.toLocaleString()} EGP`;
    };

    if (bookingCategory === "breakfast") {
      // Breakfast Base - 325 EGP (Bedouin Breakfast)
      const pricePerPersonEgp = 325;
      const basePeopleBillEgp = guestsCount * pricePerPersonEgp;
      restaurantSubtotalEgp += basePeopleBillEgp;
      details.push(`${guestsCount}x Bedouin Breakfast Set (@ ${formatCharge(pricePerPersonEgp)}) = ${formatCharge(basePeopleBillEgp)}`);

      // Extras in EGP: Pastrami: 50 EGP, Sausage: 50 EGP, Yogurt: 35 EGP
      if (breakfastExtras.pastrami) {
        restaurantSubtotalEgp += guestsCount * 50;
        details.push(`Extras: Pastrami add-on (@ ${formatCharge(50)} per guest) = ${formatCharge(guestsCount * 50)}`);
      }
      if (breakfastExtras.sausage) {
        restaurantSubtotalEgp += guestsCount * 50;
        details.push(`Extras: Sausage add-on (@ ${formatCharge(50)} per guest) = ${formatCharge(guestsCount * 50)}`);
      }
      if (breakfastExtras.yogurt) {
        restaurantSubtotalEgp += guestsCount * 35;
        details.push(`Extras: Yogurt add-on (@ ${formatCharge(35)} per guest) = ${formatCharge(guestsCount * 35)}`);
      }
    } else if (bookingCategory === "day-use") {
      // Day-Use Adult base in EGP: 1600 EGP
      const priceAdultEgp = 1600;
      const baseAdultBillEgp = guestsCount * priceAdultEgp;
      packageSubtotalEgp += baseAdultBillEgp;
      details.push(`${guestsCount}x Dayuse Packages (@ ${formatCharge(priceAdultEgp)}) [Service-Exempt] = ${formatCharge(baseAdultBillEgp)}`);

      // Children age-tier pricing calculation in EGP
      childrenAges.forEach((age, index) => {
        if (age < 6) {
          details.push(`Family Child #${index + 1} (Age: ${age}) [Service-Exempt] = FREE (0 EGP)`);
        } else if (age >= 6 && age <= 11) {
          const priceChildEgp = 1000;
          packageSubtotalEgp += priceChildEgp;
          details.push(`Family Child #${index + 1} (Age: ${age}) [Service-Exempt] = ${formatCharge(priceChildEgp)}`);
        } else {
          packageSubtotalEgp += priceAdultEgp;
          details.push(`Family Child #${index + 1} (Age: ${age} counts as adult rate) [Service-Exempt] = ${formatCharge(priceAdultEgp)}`);
        }
      });
    }

    // Pre-orders basket integration
    let preorderSumEgp = 0;
    if (bookingCategory === "day-use") {
      // Each dayuse guest (adult & child) can order exactly 1 lunch/main dish for free. Extra is charged fully.
      let mealFreeSlots = guestsCount + childrenAges.length;

      preOrderBasket.forEach(item => {
        const option = preOrderOptions.find(o => o.name === item.name);
        if (option) {
          const isGoat = option.name.toLowerCase().includes("goat") || option.name.includes("جدي");
          if (option.excludedInDayUse || isGoat) {
            // Excluded items (including Goat) are charged at full price as extras
            const cost = item.price * item.quantity;
            preorderSumEgp += cost;
            const labelAr = isGoat 
              ? `وجبة جدي إكسترا إضافية على سعر الدايوز` 
              : `طبق ممتاز إكسترا غير مشمول في الباقة`;
            const labelEn = isGoat 
              ? `Goat/Jaddi (Extra charge on top of Dayuse)` 
              : `Premium item (Extra charge)`;
            details.push(`• ${item.name} (${item.quantity}x) = ${formatCharge(cost)} (${language === "ar" ? labelAr : labelEn})`);
          } else {
            // Check if it is a main lunch meal category: lunch, pasta, or quick-delic
            const isMainLunchMeal = ["lunch", "pasta", "quick-delic"].includes(option.category);
            
            if (isMainLunchMeal) {
              const freeQty = Math.min(item.quantity, mealFreeSlots);
              mealFreeSlots -= freeQty;
              const extraQty = item.quantity - freeQty;

              if (freeQty > 0) {
                const labelAr = `مشمول في وجبة غداء باقة الدايوز`;
                const labelEn = `INCLUDED in Dayuse meal allocation`;
                details.push(`• ${freeQty}x ${item.name} = 0 EGP (${language === "ar" ? labelAr : labelEn})`);
              }
              if (extraQty > 0) {
                const cost = option.price * extraQty;
                preorderSumEgp += cost;
                const labelAr = `إكسترا إضافي فوق الحد المسموح`;
                const labelEn = `Extra lunch dish beyond package limit`;
                details.push(`• Extra ${extraQty}x ${item.name} (@ ${formatCharge(option.price)}) = ${formatCharge(cost)} (${language === "ar" ? labelAr : labelEn})`);
              }
            } else {
              // Non-main dishes are always extra
              const cost = option.price * item.quantity;
              preorderSumEgp += cost;
              const labelAr = `إضافات إكسترا غير مشمولة`;
              const labelEn = `Appetizer/Side extra`;
              details.push(`• Extra ${item.quantity}x ${item.name} (@ ${formatCharge(option.price)}) = ${formatCharge(cost)} (${language === "ar" ? labelAr : labelEn})`);
            }
          }
        }
      });
      if (preorderSumEgp > 0) {
        restaurantSubtotalEgp += preorderSumEgp;
      }
    } else {
      // Normal full charges for single-slot and breakfast routes
      const sum = preOrderBasket.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
      if (sum > 0) {
        preorderSumEgp = sum;
        restaurantSubtotalEgp += preorderSumEgp;
        details.push(`Advanced Pre-ordered Dishes = ${formatCharge(preorderSumEgp)} (Subject to 12% service)`);
      }
    }

    // Apply 12% service charge strictly to restaurant (breakfast/pre-order) subtotal
    let serviceChargeEgp = 0;
    if (restaurantSubtotalEgp > 0) {
      serviceChargeEgp = Math.round(restaurantSubtotalEgp * 0.12);
      details.push(`12% Restaurant Service Charge (On ${formatCharge(restaurantSubtotalEgp)}) = +${formatCharge(serviceChargeEgp)}`);
    }

    if (nationality === "non-egyptian") {
      const extraUsd = 10;
      const extraEgp = Math.round(extraUsd * EXCHANGE_RATE);
      details.push(`⚠️ Protectorate Entrance (Paid at gate): $10 USD (${extraEgp} EGP) per visitor`);
    }

    const totalEgp = Math.round(packageSubtotalEgp + restaurantSubtotalEgp + serviceChargeEgp);
    const totalUsd = Math.round(totalEgp / EXCHANGE_RATE);

    return {
      totalEgp,
      totalUsd,
      details
    };
  };

  const billStructure = calculateTotalBillDetails();

  // Simulate dragging & uploading receipt screenshot
  const triggerImageSim = () => {
    setUploadProgress(true);
    setTimeout(() => {
      setUploadedReceipt("/images/logo.svg");
      setUploadProgress(false);
    }, 1200);
  };

  const handleBookTable = (e: FormEvent) => {
    e.preventDefault();

    // Check Single Slot Constraint
    if (bookingCategory === "single-slot" && isTimeAfterFivePm(time)) {
      alert("❌ Selection Error: No requests accepted for single-slot table bookings after 5:00 PM.");
      return;
    }

    // Check pre-order window enforcement if items exist
    if (preOrderBasket.length > 0 && !isPreOrderingAvailable()) {
      alert("Please note: Your pre-ordered slow-cooked dishes cannot be processed because they require at least 24 hours of advance preparation. You may proceed and order standard à la carte items upon arrival.");
      return;
    }

    // Formulate final dishes string
    let dishesDesc = "À la carte selection";
    if (preOrderBasket.length > 0) {
      dishesDesc = preOrderBasket.map(item => `${item.name} (${item.quantity}x)`).join(", ");
    } else if (bookingCategory === "breakfast") {
      dishesDesc = `Bedouin breakfast set for ${guestsCount} people`;
    }

    // Capture payment and upload status
    const payStatus = uploadedReceipt ? "Pending Confirmation" : "Unpaid (Requires receipt)";

    // Update Simulated Google Sheets
    const newId = `TS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRow: SimulatedSheetRow = {
      id: newId,
      guestName: name,
      phone: phone || "+20XXXXXXXXXX",
      date: date,
      seating: seatingArea,
      category: bookingCategory === "single-slot" ? "Single Slot Booking" : bookingCategory === "breakfast" ? "Breakfast Booking" : "Day-Use Package",
      slotTime: time,
      dishes: dishesDesc,
      totalBill: currency === "USD" ? `$${billStructure.totalUsd} USD` : `${billStructure.totalEgp.toLocaleString()} EGP`,
      paymentStatus: uploadedReceipt ? "PENDING VALIDATION" : "UNPAID",
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 19)
    };

    setSheetsLog([newRow, ...sheetsLog]);

    // Construct high-end messaging payload
    const dishesText = preOrderBasket.length > 0 
      ? preOrderBasket.map(item => `   - ${item.name} (${item.quantity}x @ ${currency === 'USD' || nationality === 'non-egyptian' ? '$' + Math.round(item.price / EXCHANGE_RATE) + ' USD' : item.price + ' EGP'})`).join("\n")
      : "   - À la carte order selection";

    const billingText = currency === "USD" 
      ? `$${billStructure.totalUsd} USD` 
      : `${billStructure.totalEgp.toLocaleString()} EGP`;

    const categoryLabel = bookingCategory === "single-slot" 
      ? "Single Slot Booking (1-Hour Limit)" 
      : bookingCategory === "breakfast" 
        ? "Traditional Bedouin Breakfast" 
        : "Complete Day-Use Package (9 AM - 9 PM)";

    const singleSlotPresenceHelper = bookingCategory === "single-slot"
      ? `🚨 Note: My allocated presence slot at the restaurant is strictly ${getPresenceSlot(time)} only.`
      : "";

    const groupBillText = combineGroupBilling ? "✅ Fast Checkout: Combine all group orders into a single consolidated bill." : "❌ Standard Billing: Check out separately per guest.";

    const message = `Hello Lummayya Restaurant at Remal El Rayan! 🌵🍛
I would like to submit my dining reservation and pre-order specifications:

👤 Guest Name: ${name}
📞 Contact Phone: ${phone}
📅 Reservation Date: ${date}
⏰ Arrival Time: ${time} (Arrival)
🏷️ Booking Category: ${categoryLabel}
📍 Dining Seating Zone: ${seatingArea}
👥 Attending Guests: ${guestsCount} Adults${childrenAges.length > 0 ? `, ${childrenAges.length} Children (Ages: ${childrenAges.join(", ")})` : ""}

${singleSlotPresenceHelper}

🛒 Pre-Ordered Items:
${dishesText}

🧾 Group Billing: ${groupBillText}
💳 Payment Status: ${uploadedReceipt ? "[Pending Confirmation] - Transfer receipt attached." : "[Unpaid] - Receipt not attached yet."}
💰 Estimated Bill Total: ${billingText} (Based on nationality toggle: ${nationality.toUpperCase()})

📝 Special Requests: ${specialRequests || "None"}

🌐 Required Protectorate Disclosure: I acknowledge that Wadi El Rayan Protected Area entry fees ($10) and Wadi El Hitan entrance fees ($15) are the guest's responsibility.

Please find my payment details above. Confirm my booking! ✨`;

    setCompiledMessage(message);
    setBookingSuccess(true);
    setCopiedText(false);
  };

  return (
    <div className="bg-[#F4EFE3] border-2 border-black p-6 md:p-10 shadow-brutalist max-w-7xl mx-auto my-12 text-black">
      {/* Editorial Header Section */}
      <div className="border-b-2 border-black pb-8 mb-8 flex flex-col md:flex-row md:items-end justify-between items-start gap-6">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-[#777] uppercase block mb-2">
            LUMMAYYA RESERVATION DESK
          </span>
          <h3 className="font-serif text-3xl md:text-4xl uppercase tracking-tighter">
            Lummayya Restaurant Booking
          </h3>
          <p className="font-sans text-xs text-[#555] max-w-xl mt-2 leading-relaxed">
            Register your dinner table setup by the scenic shores of Wadi Elrayan Lake. Choose between three distinct booking routes, configure customized Bedouin breakfast extras, and submit your reservation instantly to sync the ledger.
          </p>
          <div className="mt-3.5 flex flex-wrap gap-2.5">
            <a 
              href="https://docs.google.com/forms/u/1/d/17LQgGDpZsRLF5FpYE9PjMhzRnZ6zI0vgEB07L0yk9T0/edit?usp=drivesdk&ouid=105615299278686161270&chromeless=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold font-mono text-[9.5px] uppercase py-1.5 px-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              <span>{language === "ar" ? "🏜️ ارسل الحجز الرسمي عبر نموذج جوجل مباشرة" : "🏜️ Submit Official Booking via Google Form Directly"}</span>
            </a>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex flex-col md:items-end gap-2.5">
          <div className="flex bg-neutral-100 border border-black p-0.5">
            <button
              onClick={() => {
                setNationality("egyptian");
                setCurrency("EGP");
              }}
              className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider cursor-pointer ${
                nationality === "egyptian" ? "bg-black text-white" : "text-black hover:bg-neutral-200"
              }`}
            >
              Egyptian
            </button>
            <button
              onClick={() => {
                setNationality("non-egyptian");
                setCurrency("USD");
              }}
              className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider cursor-pointer ${
                nationality === "non-egyptian" ? "bg-[#c43232] text-white" : "text-black hover:bg-neutral-200"
              }`}
            >
              Non-Egyptian
            </button>
          </div>

          <div className="flex items-center space-x-1 font-mono text-[8px] uppercase text-[#777] font-bold">
            <Globe className="w-3 h-3 text-desert-blue" />
            <span>Currency mode: {currency} (Exchange: {EXCHANGE_RATE} EGP)</span>
          </div>
        </div>
      </div>

      {/* Foreigner Mandate Disclaimer Notice block */}
      {nationality === "non-egyptian" && (
        <div className="bg-[#c43232]/5 border-2 border-[#c43232] text-[#c43232] p-4 font-sans text-xs flex items-start space-x-3 mb-8">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-[#c43232]" />
          <div>
            <strong>Protectorate Environment Entry Notice:</strong> Please note: Wadi El Rayan Protected Area entry fees ($10) and Wadi El Hitan entrance fees ($15) are NOT included in hospitality quotes and are fully the guest&apos;s responsibility.
          </div>
        </div>
      )}

      {/* Main Reservation Category switches */}
      <div className="mb-10">
        <span className="font-mono text-[10px] uppercase text-[#777] block mb-3 font-semibold tracking-wider">
          Step 1: Choose Your Dining Category
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Path A */}
          <button
            type="button"
            onClick={() => {
              setBookingCategory("single-slot");
              setPreOrderBasket([]);
            }}
            className={`border-2 p-5 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
              bookingCategory === "single-slot"
                ? "bg-white border-black shadow-brutalist translate-x-[-2px] translate-y-[-2px]"
                : "bg-neutral-50/50 border-black/10 hover:border-black/30"
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-1">
                <strong className="font-serif text-sm uppercase block tracking-tight">Slot 1 Hour</strong>
                <span className="font-mono text-[8px] uppercase tracking-wider bg-black/10 px-1.5 py-0.5 text-black font-bold">1-Hr limit</span>
              </div>
              <p className="font-sans text-[11px] text-[#666] leading-relaxed">
                Dinner or Lunch Only (1 hour session). Experience premium dining. Order standard à la carte items or from our advance pre-orders.
              </p>
            </div>
            <span className="font-mono text-[9px] text-desert-blue uppercase mt-4 block font-bold">No cover rate</span>
          </button>

          {/* Path B */}
          <button
            type="button"
            onClick={() => {
              setBookingCategory("breakfast");
              setPreOrderBasket([]);
            }}
            className={`border-2 p-5 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
              bookingCategory === "breakfast"
                ? "bg-white border-black shadow-brutalist translate-x-[-2px] translate-y-[-2px]"
                : "bg-neutral-50/50 border-black/10 hover:border-black/30"
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-1">
                <strong className="font-serif text-sm uppercase block tracking-tight">Only breakfast 1 Hour</strong>
                <span className="font-mono text-[8px] uppercase tracking-wider bg-desert-blue text-black px-1.5 py-0.5 font-bold">Breakfast Only</span>
              </div>
              <p className="font-sans text-[11px] text-[#666] leading-relaxed">
                Traditional Bedouin Breakfast set (1 hour). Experience freshly baked hand-made pies, pure honey, local cheese, and authentic tea.
              </p>
            </div>
            <span className="font-mono text-[10px] text-[#111] uppercase mt-4 block font-semibold">
              {currency === "USD" ? `$${Math.round(325 / EXCHANGE_RATE)} USD` : "325 EGP"} / Person
            </span>
          </button>

          {/* Path C */}
          <button
            type="button"
            onClick={() => {
              setBookingCategory("day-use");
              setPreOrderBasket([]); // Clear basket on path change to avoid invalid premium dish inclusion
            }}
            className={`border-2 p-5 text-left transition-all relative flex flex-col justify-between cursor-pointer ${
              bookingCategory === "day-use"
                ? "bg-white border-black shadow-brutalist translate-x-[-2px] translate-y-[-2px]"
                : "bg-neutral-50/50 border-black/10 hover:border-black/30"
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-1">
                <strong className="font-serif text-sm uppercase block tracking-tight">Dayuse Packages</strong>
                <span className="font-mono text-[8px] uppercase tracking-wider bg-amber-500 text-black px-1.5 py-0.5 font-bold">
                  {language === "ar" ? "شامل كل شيء" : "All-Inclusive"}
                </span>
              </div>
              <p className="font-sans text-[11px] text-[#666] leading-relaxed">
                Includes: Breakfast + Lunch + 2 Drinks + Sandboarding. Spending a fun and relaxing 9am-9pm day at Remal el Rayan Glamp. Enjoying the most luxurious facilities that you can find in the desert!
              </p>
            </div>
            <span className="font-mono text-[10px] text-[#111] uppercase mt-4 block font-semibold">
              {currency === "USD" ? `$${Math.round(1600 / EXCHANGE_RATE)} USD` : "1,600 EGP"} / Person
            </span>
          </button>
        </div>
      </div>

      {/* Booking Flow Path Selector */}
      <div className="mb-10 border-2 border-black p-5 bg-white shadow-brutalist">
        <span className="font-mono text-[10px] uppercase text-[#777] block mb-3.5 font-bold tracking-wider rtl:text-right">
          {language === "ar" ? "الخطوة ٢: حدد طريقة المتابعة للحجز" : "Step 2: Choose Your Booking Method"}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setCalculatorMode("direct")}
            className={`border-2 p-5 text-center sm:text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between group h-full ${
              calculatorMode === "direct"
                ? "bg-black text-white border-black shadow-[4px_4px_0px_rgba(0,0,0,0.15)]"
                : "bg-[#FAF9F6] text-black border-black hover:border-black/50"
            }`}
          >
            <div>
              <span className="font-serif text-base font-extrabold uppercase tracking-tight block mb-1">
                {language === "ar" ? "حجز مباشر وسريع ⚡" : "Direct & Fast Booking ⚡"}
              </span>
              <p className="font-sans text-[11px] leading-relaxed opacity-80">
                {language === "ar" 
                  ? "تخطّ تفاصيل حساب الفواتير وتوجه مباشرةً لنموذج الحجز وتأكيد حضورك فوراً بضغطة واحدة." 
                  : "Skip the calculator. Proceed directly to the official Google Form to secure your table setup."}
              </p>
            </div>
            <div className="mt-4 font-mono text-[9px] uppercase tracking-wider font-extrabold flex items-center space-x-1">
              <span>{language === "ar" ? "اضغط هنا للدخول للحجز المباشر ⮕" : "GO DIRECTLY TO BOOK ⮕"}</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setCalculatorMode("calculator")}
            className={`border-2 p-5 text-center sm:text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between group h-full ${
              calculatorMode === "calculator"
                ? "bg-black text-white border-black shadow-[4px_4px_0px_rgba(0,0,0,0.15)]"
                : "bg-[#FAF9F6] text-black border-black hover:border-black/50"
            }`}
          >
            <div>
              <span className="font-serif text-base font-extrabold uppercase tracking-tight block mb-1">
                {language === "ar" ? "احسب تكلفة طلبك أولاً (اختياري) 🧮" : "Estimate My Order Cost First (Optional) 🧮"}
              </span>
              <p className="font-sans text-[11px] leading-relaxed opacity-80">
                {language === "ar" 
                  ? "تصفح قائمة الطعام المتكاملة، حدد أعداد ضيوفك والأطباق لحساب التكلفة التفصيلية والفاتورة المتوقعة." 
                  : "Explore the full menu, adjust guests, and add slow-cooked mandi orders to calculate your bill total."}
              </p>
            </div>
            <div className="mt-4 font-mono text-[9px] uppercase tracking-wider font-extrabold flex items-center space-x-1">
              <span>{language === "ar" ? "تفعيل حاسبة التكلفة والمنيو ⮕" : "OPEN COST CALCULATOR ⮕"}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Lummayya Restaurant Overview and Wellbeing Commitment */}
      <div className="mb-10 bg-white border-2 border-black p-6 md:p-8 shadow-brutalist relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(#C8B9A6_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between border-b border-black/10 pb-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-[9px] tracking-widest text-desert-blue uppercase font-bold block">OUR EXPERIENCE & HEALTH PHILOSOPHY</span>
            <h4 className="font-serif text-2xl uppercase tracking-tight text-desert-dark">At Lummayya Restaurant, Your Wellbeing Comes First</h4>
            <p className="font-sans text-xs text-neutral-600 leading-relaxed">
              We carefully select only the finest ingredients from trusted local suppliers across Egypt. All our meats are 100% premium, fresh, and thoroughly checked for quality. We maintain the highest hygiene standards at every step, so you can enjoy your meal with complete peace of mind, knowing that quality, cleanliness, and your health are always our top priority.
            </p>
          </div>
          <div className="bg-[#faf9f6] border-2 border-black p-4 space-y-2 max-w-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <h5 className="font-serif text-xs uppercase tracking-tight font-bold text-desert-dark">Welcome to Lummayya</h5>
            <p className="font-sans text-[11px] text-neutral-600 leading-relaxed">
              Lummayya means <strong className="text-black">“the water”</strong> in the local Bedouin dialect, and just like water, our place is here to refresh you. We designed it to bring out the beauty of the desert, blending tradition with comfort and a touch of elegance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          <div className="space-y-1.5">
            <span className="font-mono text-[9px] uppercase text-[#777] font-bold block">🕒 DINING TIME & OPTION RANGE</span>
            <p className="font-sans text-xs text-neutral-600 leading-relaxed">
              You can join us any time of the day for a laid-back lunch or a cozy dinner, or even book a whole day of use and enjoy the surroundings with our activities. Our menu is a mix of Bedouin classics, reimagined with style, along with international favorites you’ll love.
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="font-mono text-[9px] uppercase text-[#777] font-bold block">⛺ THE DUNES DESIGN & SEATING</span>
            <p className="font-sans text-xs text-neutral-600 leading-relaxed">
              The restaurant itself is designed like the desert dunes. Inside, we have <strong>85 elegant seats</strong> with wooden and bamboo details. Outside (welcoming up to <strong>100 guests</strong>), you can choose between lounges, dining tables, or a traditional Bedouin setup with cushions and rugs, or simply relax by the campfire with Bedouin tea or marshmallows. We keep you comfy all year round with fans/ventilators in summer and heaters in winter!
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="font-mono text-[9px] uppercase text-[#777] font-bold block">📐 PREMISES & THE DRY BAR</span>
            <div className="font-mono text-[10px] space-y-1 text-neutral-700">
              <div>• <strong>Indoors:</strong> 160 m² (85 seats)</div>
              <div>• <strong>Outdoors:</strong> 400 m² (200m² desert + 200m² lake views)</div>
              <div>• <strong>Full Outdoor Premises:</strong> 2,000 m²</div>
              <div>• <strong>The Dry Bar:</strong> Serving coffee, tea, sodas, and fresh juices right in the heart of the desert.</div>
            </div>
          </div>
        </div>
      </div>

      {calculatorMode === "direct" ? (
        <div className="max-w-2xl mx-auto space-y-8 animate-float-slow">
          {/* Category details so they understand what they are reserving */}
          <div className="border-2 border-black bg-white p-6 shadow-brutalist space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(#C8B9A6_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
            
            <div className="relative z-10">
              <span className="font-mono text-[10px] uppercase text-[#777] block font-bold tracking-widest mb-2">
                {language === "ar" ? "الفئة المحددة حالياً" : "CURRENTLY SELECTED CATEGORY"}
              </span>

              {bookingCategory === "single-slot" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-3xl">☕</span>
                    <div>
                      <h4 className="font-serif text-lg font-bold uppercase tracking-tight">
                        {language === "ar" ? "حجز طاولة - ساعة واحدة" : "Single Slot Table Reservation"}
                      </h4>
                      <p className="font-sans text-xs text-neutral-500">
                        {language === "ar" ? "مثالي لتناول وجبة سريعة أو مشروب بجانب البحيرة" : "Ideal for a quick bite or drinks by the scenic lake."}
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-500/5 border border-amber-500/20 p-4 font-sans text-xs text-neutral-800 space-y-2.5">
                    <span className="font-mono text-[9px] uppercase font-bold text-amber-900 block">
                      ⚠️ {language === "ar" ? "قواعد حجز الساعة الواحدة" : "SINGLE SLOT RULES & CONDITIONS"}
                    </span>
                    <p className="leading-relaxed">
                      {language === "ar"
                        ? "يقتصر حجز الطاولة القياسي على جلسة مدتها ساعة واحدة كحد أقصى. يُرجى العلم أنه لا يتم قبول الحجوزات أو الدخول بعد الساعة 5:00 مساءً."
                        : "Standard table reservation is strictly restricted to a maximum 1-hour session. Please note that no entries or new table reservations are accepted after 5:00 PM."}
                    </p>
                    <p className="leading-relaxed">
                      {language === "ar"
                        ? "لتجربة طعام متكاملة وممتدة مع دخول المرافق والأنشطة كالتزحلق على الرمال، نوصي بشدة باختيار باقة اليوم الواحد (الدايوز)."
                        : "For a relaxed dining experience including full facility access and sandboarding activities, we highly recommend selecting the Day-use Package instead."}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-black/5 pt-4">
                    <span className="font-mono text-[9px] uppercase font-bold text-[#555] block">
                      {language === "ar" ? "المعلومات الأساسية والأسعار:" : "ESSENTIAL INFORMATION & PRICING:"}
                    </span>
                    <ul className="text-xs space-y-2 list-disc pl-4 rtl:pl-0 rtl:pr-4 text-neutral-750">
                      <li><strong>{language === "ar" ? "النافذة الزمنية:" : "Time Slot:"}</strong> {language === "ar" ? "ساعة واحدة بحد أقصى." : "1 Hour maximum per table reservation."}</li>
                      <li><strong>{language === "ar" ? "الطلب المسبق:" : "Pre-Ordering Mandi:"}</strong> {language === "ar" ? "لطلب لحم المندي المطهو ببطء في حفرة الحطب البدوي، يلزم الحجز والطلب المسبق عبر النموذج." : "To order our legendary slow cooked wood-fire pit Mandi, you must pre-order in the Google Form."}</li>
                      <li><strong>{language === "ar" ? "الطلبات العادية:" : "A La Carte Orders:"}</strong> {language === "ar" ? "يمكن طلب المقبلات العادية، المشروبات، والوجبات السريعة مباشرة عند الوصول." : "Standard appetizers, cold/hot drinks, and snacks can be ordered upon arrival."}</li>
                    </ul>
                  </div>
                </div>
              )}

              {bookingCategory === "breakfast" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-3xl">🥞</span>
                    <div>
                      <h4 className="font-serif text-lg font-bold uppercase tracking-tight">
                        {language === "ar" ? "باقة الإفطار البدوي الأصيل" : "Authentic Bedouin Breakfast"}
                      </h4>
                      <p className="font-sans text-xs text-neutral-500">
                        {language === "ar" ? "تذوق الفطير الساخن والجبن المحلي في قلب الصحراء" : "Fresh handmade pies and local honey on firewood smoke."}
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-500/5 border border-amber-500/20 p-4 font-sans text-xs text-neutral-800 space-y-2.5">
                    <span className="font-mono text-[9px] uppercase font-bold text-amber-900 block">
                      🥞 {language === "ar" ? "مكونات باقة الإفطار" : "BREAKFAST PACKAGE INCLUSIONS"}
                    </span>
                    <p className="leading-relaxed">
                      {language === "ar"
                        ? "تشمل كل تذكرة إفطار بدوي متكامل: الفول الإسكندراني أو بالطحينة، الفطير الفلاحي الساخن، العسل الأبيض الطبيعي، العسل الأسود بالطحينة، الجبن الأبيض بالطماطم، بيض من اختيارك، شاي بدوي على الحطب والخبز الفيومي الطازج."
                        : "Each ticket includes our complete traditional breakfast set: Traditional Foul, fresh eggs cooked to your choice, handmade warm rustic pies (Feteer Meshaltet), pure natural honey, black molasses, local cheese, freshly baked hot bread, and authentic firewood-brewed Bedouin tea."}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-black/5 pt-4">
                    <span className="font-mono text-[9px] uppercase font-bold text-[#555] block">
                      {language === "ar" ? "الأسعار والرسوم:" : "PRICING & REQUISITES:"}
                    </span>
                    <ul className="text-xs space-y-2 list-disc pl-4 rtl:pl-0 rtl:pr-4 text-neutral-750">
                      <li>
                        <strong>{language === "ar" ? "سعر الفرد:" : "Price per person:"}</strong>{" "}
                        <span className="text-amber-700 font-bold">
                          {currency === "USD" ? `$${Math.round(325 / EXCHANGE_RATE)} USD` : "325 EGP"}
                        </span>
                      </li>
                      <li><strong>{language === "ar" ? "رسوم الخدمة:" : "Service Charge:"}</strong> {language === "ar" ? "تخضع الوجبات الفردية لرسوم الخدمة القياسية للمطعم 12%." : "Subject to standard 12% Restaurant Service Charge."}</li>
                      <li><strong>{language === "ar" ? "المدة الزمنية:" : "Breakfast Window:"}</strong> {language === "ar" ? "ساعة واحدة بحد أقصى للطاولة." : "1 Hour maximum table allocation."}</li>
                    </ul>
                  </div>
                </div>
              )}

              {bookingCategory === "day-use" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-3xl">🏜️</span>
                    <div>
                      <h4 className="font-serif text-lg font-bold uppercase tracking-tight">
                        {language === "ar" ? "باقة اليوم الكامل (الدايوز)" : "Full Day-Use Premium Package"}
                      </h4>
                      <p className="font-sans text-xs text-[#2E5A44] font-semibold">
                        {language === "ar" ? "موصى بها لتجربة متكاملة – شاملة الإفطار والغداء والأنشطة" : "Recommended for the ultimate experience — includes Breakfast, Lunch & Activities"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-500/5 border border-amber-500/20 p-4 font-sans text-xs text-neutral-800 space-y-2.5">
                    <span className="font-mono text-[9px] uppercase font-bold text-amber-950 block">
                      ✨ {language === "ar" ? "المميزات والخدمات الشاملة" : "ALL-INCLUSIVE DAY-USE BENEFITS"}
                    </span>
                    <p className="leading-relaxed">
                      {language === "ar"
                        ? "استمتع بقضاء يوم استثنائي من الساعة 9 صباحاً وحتى 9 مساءً في Remal. تشمل الباقة إفطاراً بدوياً متكاملاً، غداءً فاخراً من منيو لماية الشهير، عدد 2 مشروب منعش من اختيارك، دخولاً كاملاً لمرافق الجلالبينج، بالإضافة إلى نشاط التزحلق على الرمال بصحراء وادي الريان الساحرة."
                        : "Spend an unforgettable day from 9:00 AM to 9:00 PM at Remal. Your package includes an authentic Bedouin Breakfast, a premium lunch of your choice from the full Lummayya menu, 2 fresh drinks, complete access to glamping lounge facilities, and sandboarding across the magical dunes of Wadi El Rayan."}
                    </p>
                    <p className="text-emerald-700 font-bold leading-relaxed">
                      {language === "ar"
                        ? "✓ معفاة تماماً (0%) من رسوم الخدمة 12% لتوفر لك أعلى قيمة توفير!"
                        : "✓ Completely EXEMPT (0% service charge) from the standard 12% restaurant service fee for maximum value!"}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-black/5 pt-4">
                    <span className="font-mono text-[9px] uppercase font-bold text-[#555] block">
                      {language === "ar" ? "معلومات الأسعار وقواعد الأطفال:" : "PRICING & CHILDREN RULES:"}
                    </span>
                    <ul className="text-xs space-y-2 list-disc pl-4 rtl:pl-0 rtl:pr-4 text-neutral-750">
                      <li>
                        <strong>{language === "ar" ? "سعر البالغين:" : "Adult Ticket:"}</strong>{" "}
                        <span className="text-amber-700 font-bold">
                          {currency === "USD" ? `$${Math.round(1600 / EXCHANGE_RATE)} USD` : "1,600 EGP"} / Person
                        </span>
                      </li>
                      <li>
                        <strong>{language === "ar" ? "الأطفال من سن 6 إلى 11 سنة:" : "Children (6-11 years):"}</strong>{" "}
                        <span>
                          {currency === "USD" ? `$${Math.round(1000 / EXCHANGE_RATE)} USD` : "1,000 EGP"} / Child ({language === "ar" ? "يشمل الوجبات والأنشطة" : "Includes all meals & activities"})
                        </span>
                      </li>
                      <li><strong>{language === "ar" ? "الأطفال تحت سن 6 سنوات:" : "Children under 6:"}</strong> <span className="text-emerald-700 font-bold">{language === "ar" ? "مجاناً تماماً (0 جنيه)" : "Entirely FREE of charge"}</span></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clean, Simple Call to action for reservation */}
          <div className="bg-amber-500/10 border-2 border-amber-500 p-8 shadow-brutalist text-center space-y-6">
            <div className="space-y-3">
              <span className="text-4xl block">🏜️</span>
              <h4 className="font-serif text-xl font-bold uppercase tracking-tight">
                {language === "ar" ? "الرابط المباشر لنموذج الحجز الرسمي" : "Direct Link to Official Google Form"}
              </h4>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed max-w-md mx-auto">
                {language === "ar"
                  ? "لتأكيد حضورك وحجز الطاولة أو باقة دايوز فوراً وتفادي الطوابير، يُرجى تعبئة نموذج جوجل الرسمي للمطعم وسيقوم نظامنا بتأكيد طلبك مباشرة."
                  : "To secure your spot, submit your details in our secure central booking ledger. Once completed, your setup is officially registered on our lakefront grid."}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-3 pt-2">
              <a
                href="https://docs.google.com/forms/u/1/d/17LQgGDpZsRLF5FpYE9PjMhzRnZ6zI0vgEB07L0yk9T0/edit?usp=drivesdk&ouid=105615299278686161270&chromeless=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-black font-extrabold font-mono text-xs uppercase py-4 px-8 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <span>{language === "ar" ? "افتح نموذج حجز جوجل الآن ⮕" : "OPEN GOOGLE FORM TO BOOK NOW ⮕"}</span>
              </a>
              <span className="text-[10px] text-neutral-400 font-mono">
                {language === "ar" ? "✓ يفتح في نافذة جديدة وسريعة" : "✓ Opens in a secure new browser tab"}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column: Menu Details and Information */}
          <div className="lg:col-span-7 space-y-8">
          {/* Header */}
          <div className="border-b border-black/10 pb-4">
            <h4 className="font-serif text-lg font-bold tracking-tight uppercase flex items-center space-x-2">
              <Compass className="w-5 h-5 text-desert-blue" />
              <span>Menu Details & Booking Information</span>
            </h4>
            <p className="font-sans text-xs text-neutral-500 mt-1">
              Browse restaurant specialties, estimate your dining bill, and secure your table.
            </p>
          </div>

          {/* Official Google Form Call-To-Action */}
          <div className="bg-amber-500/10 border-2 border-amber-500 p-6 shadow-brutalist space-y-4">
            <div className="flex items-start space-x-3.5">
              <span className="text-2xl mt-0.5">🏜️</span>
              <div>
                <strong className="font-serif text-sm uppercase tracking-tight block">Official Table Reservation</strong>
                <p className="font-sans text-xs text-neutral-700 leading-relaxed mt-1">
                  To officially register your dining setup or day-use reservation by the lake, please complete our central registration form. Once submitted, your booking is processed immediately.
                </p>
              </div>
            </div>

            <a
              href="https://docs.google.com/forms/u/1/d/17LQgGDpZsRLF5FpYE9PjMhzRnZ6zI0vgEB07L0yk9T0/edit?usp=drivesdk&ouid=105615299278686161270&chromeless=1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold font-mono text-[11px] uppercase py-3.5 px-4 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center justify-center space-x-2 text-center cursor-pointer"
            >
              <span>Book through Google Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Dynamic Information Card based on chosen category */}
          <div className="border-2 border-black bg-white p-6 shadow-brutalist space-y-4">
            <span className="font-mono text-[10px] uppercase text-[#777] block font-bold tracking-wider">
              Dining Category Details
            </span>

            {bookingCategory === "single-slot" && (
              <div className="space-y-3 font-sans text-xs text-neutral-700">
                <div className="bg-amber-500/5 border border-amber-500/20 p-3.5 leading-relaxed">
                  <span className="font-bold block uppercase font-mono text-[9px] tracking-wider text-amber-900 mb-0.5">⚠️ Single Slot Rules</span>
                  Table reservation is restricted to a maximum 1-hour session. No entries accepted or booked after 5:00 PM.
                </div>
                <ul className="space-y-2 list-disc pl-4 text-[11px] leading-relaxed">
                  <li><strong>Time Window:</strong> Maximum 1-hour allocated slot per table.</li>
                  <li><strong>Mandi Pre-Orders:</strong> To guarantee slow-cooked mandi meats, food orders must be selected in advance via the Google Form.</li>
                  <li><strong>Standard Menu:</strong> A la carte appetizers, drinks, and standard dishes can be ordered upon arrival.</li>
                </ul>
              </div>
            )}

            {bookingCategory === "breakfast" && (
              <div className="space-y-3 font-sans text-xs text-neutral-700">
                <div className="bg-emerald-50/50 border border-emerald-500/20 p-3.5 leading-relaxed">
                  <span className="font-bold block uppercase font-mono text-[9px] tracking-wider text-emerald-950 mb-0.5">🥞 Breakfast Package Details</span>
                  Each seat includes our authentic Bedouin breakfast set. Traditional Bedouin Breakfast set (1 hour). Experience freshly baked hand-made pies, pure honey, local cheese, and authentic tea.
                </div>
                <ul className="space-y-2 list-disc pl-4 text-[11px] leading-relaxed">
                  <li><strong>Inclusions:</strong> Freshly baked Bedouin pies (Feteer), pure natural honey, farm-fresh local cheese, molasses, and authentic Bedouin tea.</li>
                  <li><strong>Price:</strong> {currency === "USD" ? `$${Math.round(325 / EXCHANGE_RATE)} USD` : "325 EGP"} per person.</li>
                  <li><strong>Breakfast Extras:</strong> You can choose to add premium extras like Pastrami (+50 EGP), Sausage (+50 EGP), or Fayoum Yogurt (+35 EGP) when submitting the Google Form.</li>
                  <li><strong>Service Charge:</strong> Subject to a standard <strong className="text-black">12% Restaurant Service Charge</strong>.</li>
                </ul>
              </div>
            )}

            {bookingCategory === "day-use" && (
              <div className="space-y-3 font-sans text-xs text-neutral-700">
                <div className="bg-blue-50/50 border border-blue-500/10 p-3.5 leading-relaxed">
                  <span className="font-bold block uppercase font-mono text-[9px] tracking-wider text-blue-950 mb-0.5">🏜️ Day-Use Package Details</span>
                  <div className="font-bold text-sm mb-1 text-black">Day Use Package – 1,600 EGP</div>
                  <div className="font-semibold text-[11px] text-desert-blue mb-2">Includes: Bedouin Breakfast + Reimagined Bedouin/International Lunch + 2 Drinks + Sandboarding & Glamp Facility Access</div>
                  <p className="text-[11px] leading-relaxed text-neutral-600">
                    Spend a laid-back, refreshing 9:00 AM to 9:00 PM day at Remal el Rayan Glamp. Experience true Bedouin hospitality, complete comfort, and our premier desert sanctuary facilities.
                  </p>
                </div>
                
                <div className="bg-amber-500/5 border border-amber-500/20 p-3 text-[11px] space-y-2">
                  <span className="font-bold block text-amber-900 uppercase font-mono text-[8px] tracking-wider">🌟 Venue & Dining Highlights:</span>
                  <p className="leading-relaxed text-neutral-600">
                    • <strong>Dune & Lake Spaces:</strong> Full access to our 2,000 m² premises, featuring 85 indoor wooden & bamboo seats (160 m²) and 400 m² of outdoor lounges, views, and campfire terraces.
                  </p>
                  <p className="leading-relaxed text-neutral-600">
                    • <strong>Wellbeing Commitment:</strong> 100% premium, fresh meats selected from trusted local suppliers, prepared under the highest hygiene standards for complete peace of mind.
                  </p>
                  <p className="leading-relaxed text-neutral-600">
                    • <strong>The Dry Bar:</strong> Desert-crafted coffee, premium tea, sodas, and fresh juices are fully accessible all day.
                  </p>
                  <p className="leading-relaxed text-neutral-600">
                    • <strong>Year-Round Comfort:</strong> Ventilation systems for hot days and professional heaters for crisp desert nights.
                  </p>
                </div>

                <ul className="space-y-2 list-disc pl-4 text-[11px] leading-relaxed">
                  <li><strong>Price:</strong> {currency === "USD" ? `$${Math.round(1600 / EXCHANGE_RATE)} USD` : "1,600 EGP"} per adult.</li>
                  <li><strong>Inclusions:</strong> Bedouin breakfast set, complete lunch main, 2 hot or cold beverages, full access to sandboarding, and dayuse access (9:00 AM to 9:00 PM) to desert luxury glamp facilities.</li>
                  <li><strong>Accompanying Children Rules:</strong> Children under 6 stay entirely free. Children aged 6-11 are priced at 1,000 EGP (includes breakfast, lunch, and sandboarding). Children 12 or older count at the adult rate.</li>
                  <li><strong>Service Charge Exemption:</strong> <strong className="text-emerald-700">Day-use packages are completely exempt (0%)</strong> from the 12% Restaurant Service Charge. (Any added premium/extra à la carte pre-orders remain subject to standard service).</li>
                  <li className="text-amber-850 font-semibold mt-2 list-none bg-amber-50 p-3.5 border border-amber-200">
                    {language === "ar" ? (
                      <>
                        ⚠️ تنبيه هام لغداء الدايوز:
                        <ul className="list-disc pl-5 mt-1 font-normal text-neutral-800 space-y-1">
                          <li>كل فرد في باقة الدايوز له طبق غداء واحد رئيسي فقط (فراخ، بط، برجر، باستا).</li>
                          <li>لو طلبت وجبة <strong>لحم جدي (Goat/Jaddi)</strong>، تُحسب كـ "إكسترا" كامل إضافي على سعر باقة الدايوز ولا تستهلك الوجبة المجانية.</li>
                          <li>الحلويات والأطباق الممتازة الأخرى (الضلوع، اللحم الفيليه، الجمبري) غير مشمولة في الباقة وتحسب كـ إكسترا.</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        ⚠️ Important Dayuse Meal Rules:
                        <ul className="list-disc pl-5 mt-1 font-normal text-neutral-800 space-y-1">
                          <li>Each Dayuse package includes exactly <strong>1 standard lunch main dish</strong> (Chicken, Duck, Burger, or Pasta). Additional mains are charged as extra.</li>
                          <li>If you order a <strong>Goat/Jaddi</strong> dish, it is calculated as a full <strong>extra charge</strong> on top of the Dayuse package price.</li>
                          <li>Desserts, Short Ribs, Beef Fillet, and Shrimps are excluded from the default package and charged as extras.</li>
                        </ul>
                      </>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Interactive Quote Calculator Planning Tools */}
          <div className="border-2 border-black bg-[#F4EFE3] p-6 shadow-brutalist space-y-4">
            <span className="font-mono text-xs uppercase text-black block font-bold tracking-tight">
              {language === "ar" 
                ? "اعرف تكلفة حجزك قبل الحجز من خلال الفورم / تعرف على أسعارنا" 
                : "Calculate your booking cost before reserving through the form / Explore our prices"}
            </span>
            <p className="font-sans text-[11px] text-neutral-600 leading-relaxed">
              {language === "ar"
                ? "اضبط أعداد الضيوف والأطباق أدناه لمعرفة السعر التفريطي المتوقع لرحلتك ومطابقة متطلباتك قبل تأكيد الحجز الرسمي عبر نموذج جوجل."
                : "Adjust the guests count and add dishes to estimate the total cost of your trip before completing the official reservation form."}
            </p>

            <div className="space-y-4">
              <div>
                <label className="font-mono text-[9px] uppercase text-[#666] block mb-1 font-bold">Planned Arrival Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-black focus:border-desert-blue h-10 px-3 py-2 font-mono text-xs tracking-wider outline-none transition-colors"
                />
                {!isPreOrderingAvailable() ? (
                  <span className="block mt-1 text-[9.5px] font-sans text-[#c43232] font-semibold">
                    ⚠️ Date is within 24 hours. Slow-cooked pre-orders will not be processed.
                  </span>
                ) : (
                  <span className="block mt-1 text-[9.5px] font-sans text-emerald-700 font-semibold">
                    ✓ Pre-ordering is available for this date (24h warning satisfied).
                  </span>
                )}
              </div>

              <div>
                <label className="font-mono text-[9px] uppercase text-[#666] block mb-1 font-bold">Adult Attendance Count</label>
                <div className="flex border border-black h-10 max-w-xs">
                  <button
                    type="button"
                    onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                    className="w-12 bg-white hover:bg-neutral-100 flex items-center justify-center border-r border-black font-semibold cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <div className="flex-grow flex items-center justify-center font-mono font-medium text-xs bg-white">
                    {guestsCount} adults
                  </div>
                  <button
                    type="button"
                    onClick={() => setGuestsCount(guestsCount + 1)}
                    className="w-12 bg-white hover:bg-neutral-100 flex items-center justify-center border-l border-black font-semibold cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Day-Use Children details age tracking */}
              {bookingCategory === "day-use" && (
                <div className="border border-dashed border-black/20 p-4 bg-white space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] uppercase text-[#444] font-bold">
                      Accompanying Children Count
                    </span>
                    <button
                      type="button"
                      onClick={addChildAge}
                      className="px-2.5 py-1 text-[9px] font-mono uppercase bg-black text-white hover:bg-desert-blue font-bold tracking-wider transition-all cursor-pointer"
                    >
                      + Add Child
                    </button>
                  </div>

                  {childrenAges.length === 0 ? (
                    <p className="text-[10px] text-[#888] font-sans">No children added. Under 6 stay free; age 6-11 is priced at 1,000 EGP.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {childrenAges.map((childAge, idx) => (
                        <div key={idx} className="flex items-center space-x-2 border border-black/10 p-2 bg-neutral-50 justify-between">
                          <span className="font-mono text-[9px] text-[#444]">Child #{idx+1} Age:</span>
                          <div className="flex items-center space-x-1">
                            <select
                              value={childAge}
                              onChange={(e) => updateChildAge(idx, parseInt(e.target.value, 10))}
                              className="bg-white border border-black text-[10px] px-1.5 py-0.5 outline-none font-sans"
                            >
                              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(v => (
                                <option key={v} value={v}>{v} years old</option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => removeChildAge(idx)}
                              className="text-red-600 font-bold font-sans text-xs px-1 hover:bg-red-50"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Breakfast Extras layout path checklist */}
              {bookingCategory === "breakfast" && (
                <div className="border border-black p-4 bg-white/60 space-y-2">
                  <span className="font-mono text-[9px] uppercase text-[#666] block font-bold select-none">
                    Select Bedouin Breakfast Extra Combos (Optional Quote)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex items-center space-x-2 border-2 border-black/5 p-2 bg-white hover:border-black/20 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={breakfastExtras.pastrami}
                        onChange={(e) => setBreakfastExtras({ ...breakfastExtras, pastrami: e.target.checked })}
                        className="w-4 h-4 border-black text-black focus:ring-0 checked:bg-black rounded-none"
                      />
                      <div className="text-[10px] font-sans">
                        <strong className="block text-desert-dark">Add Pastrami</strong>
                        <span className="text-[9px] text-[#888]">
                          {currency === "USD" ? `+$1 USD` : "+50 EGP"} per guest
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-2 border-2 border-black/5 p-2 bg-white hover:border-black/20 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={breakfastExtras.sausage}
                        onChange={(e) => setBreakfastExtras({ ...breakfastExtras, sausage: e.target.checked })}
                        className="w-4 h-4 border-black text-black focus:ring-0 checked:bg-black rounded-none"
                      />
                      <div className="text-[10px] font-sans">
                        <strong className="block text-desert-dark">Add Sausage</strong>
                        <span className="text-[9px] text-[#888]">
                          {currency === "USD" ? `+$1 USD` : "+50 EGP"} per guest
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center space-x-2 border-2 border-black/5 p-2 bg-white hover:border-black/20 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={breakfastExtras.yogurt}
                        onChange={(e) => setBreakfastExtras({ ...breakfastExtras, yogurt: e.target.checked })}
                        className="w-4 h-4 border-black text-black focus:ring-0 checked:bg-black rounded-none"
                      />
                      <div className="text-[10px] font-sans">
                        <strong className="block text-desert-dark">Fayoum Yogurt</strong>
                        <span className="text-[9px] text-[#888]">
                          {currency === "USD" ? `+$0.7 USD` : "+35 EGP"} per guest
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Protectorate Entry notice */}
          <div className="bg-[#c43232]/5 border-2 border-[#c43232] text-[#c43232] p-4 font-sans text-xs flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-[#c43232]" />
            <div>
              <strong>Protectorate Environment Entry Notice:</strong> Please note: Wadi El Rayan Protected Area entry fees ($10) and Wadi El Hitan entrance fees ($15) are NOT included in hospitality quotes and are fully the guest&apos;s responsibility. These must be paid in cash at the protectorate gateway.
            </div>
          </div>
        </div>

        {/* Right column: Pre-order dish selector panel */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="font-serif text-base font-bold tracking-tight uppercase flex items-center space-x-2 pb-2 border-b border-black/10">
              <Utensils className="w-4 h-4 text-desert-blue" />
              <span>Restaurant Menu & Pre-Ordering</span>
            </h4>

            {/* Check advance date window disclosure */}
            {!isPreOrderingAvailable() && (
              <div className="bg-[#F4EFE3] border border-dashed border-[#c43232] text-[#c43232] p-3.5 text-[11px] font-sans leading-relaxed">
                <span className="font-bold font-mono text-[9px] uppercase tracking-wider block mb-0.5 text-[#c43232]">
                  ⚠️ Preordering Blocked (&lt; 24h Window)
                </span>
                Slow Mandi preparation requires at least 24 hours of advance warning. For reservations today or tomorrow, please select your orders directly from the à la carte menu upon llegada.
              </div>
            )}

            {/* Menu Category Filter Tabs */}
            <div className="flex flex-wrap gap-1 border-2 border-black p-2 bg-[#F4EFE3] shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              {[
                { id: "all", label: "All Items" },
                { id: "breakfast", label: "🍳 Breakfast" },
                { id: "lunch", label: "🪵 Mandi & Meats" },
                { id: "pasta", label: "🍝 Pasta" },
                { id: "quick-delic", label: "🍔 Quick n Delic" },
                { id: "sides", label: "🍟 Sides" },
                { id: "salads-dips", label: "🥗 Salads & Dips" },
                { id: "dessert", label: "🍰 Desserts" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMenuFilter(tab.id)}
                  className={`px-2 py-1 text-[9.5px] font-mono uppercase border-2 font-bold transition-all cursor-pointer ${
                    menuFilter === tab.id 
                      ? "bg-black text-white border-black" 
                      : "bg-white text-black border-black/10 hover:border-black/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick pre-order options list */}
            <div className="max-h-[550px] overflow-y-auto border-2 border-black bg-white divide-y-2 divide-black p-1">
              {preOrderOptions
                .filter(dish => menuFilter === "all" || dish.category === menuFilter)
                .map((dish, dIdx) => {
                const isExcluded = bookingCategory === "day-use" && dish.excludedInDayUse;
                const priceEgp = dish.price;
                const priceUsd = Math.round(dish.price / EXCHANGE_RATE);
                
                return (
                  <div 
                    key={dIdx} 
                    className={`p-3.5 transition-colors ${
                      isExcluded ? "bg-neutral-50/70 opacity-60" : "hover:bg-neutral-50/50"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <span className="font-serif text-sm font-bold text-desert-dark">
                            {dish.name}
                          </span>
                          {isExcluded && (
                            <span className="font-mono text-[7.5px] font-bold tracking-wider text-red-700 bg-red-100 border border-red-300 uppercase px-1 py-0.5 rounded-none">
                              Excluded in Day-Use
                            </span>
                          )}
                        </div>
                        
                        {/* Ingredients */}
                        <div className="text-[10.5px] text-[#444] leading-relaxed">
                          <span className="font-bold text-[#666] font-mono text-[9px] uppercase tracking-wider block sm:inline mr-1">Ingredients:</span>
                          <span className="italic font-sans">{dish.ingredients}</span>
                        </div>

                        {/* Prep Time & Currencies */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[10px]">
                          <span className="font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 border border-amber-200/50 font-semibold">
                            🕒 Prep: {dish.prepTime}
                          </span>
                          <span className="font-mono text-[#222] bg-neutral-100 px-1.5 py-0.5 border border-neutral-300 font-bold flex items-center space-x-1.5">
                            <span>🪙 {priceEgp.toLocaleString()} EGP</span>
                            <span className="text-neutral-400">|</span>
                            <span className="text-desert-blue">${priceUsd} USD</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 pt-1">
                        <button
                          type="button"
                          disabled={isExcluded || !isPreOrderingAvailable()}
                          onClick={() => addToBasket(dish.name, dish.price)}
                          className={`w-9 h-9 border-2 border-black flex items-center justify-center cursor-pointer transition-all active:scale-95 ${
                            isExcluded || !isPreOrderingAvailable()
                              ? "bg-neutral-100 text-neutral-400 border-neutral-300 cursor-not-allowed"
                              : "bg-black hover:bg-desert-blue text-white hover:text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px]"
                          }`}
                          title={isExcluded ? "Excluded from the Day-Use package meal allocation" : "Add item to pre-order basket"}
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Preorder Basket */}
            <div>
              <span className="font-mono text-[9px] uppercase text-[#666] block mb-2 font-bold">
                Your Pre-Order Basket ({preOrderBasket.length} items)
              </span>
              
              {preOrderBasket.length === 0 ? (
                <div className="border border-dashed border-black/20 p-5 text-center text-xs text-[#888] bg-[#F4EFE3]">
                  No slow-cooked items added yet. Click &quot;+&quot; to queue dishes.
                </div>
              ) : (
                <div className="border border-black bg-white divide-y divide-black/15">
                  {preOrderBasket.map((basketItem, bsIdx) => (
                    <div key={bsIdx} className="flex justify-between items-center p-3">
                      <div className="max-w-[60%]">
                        <span className="font-serif text-xs font-medium block text-desert-dark">{basketItem.name}</span>
                        <span className="font-mono text-[9px] text-[#888]">
                          {currency === "USD" || nationality === "non-egyptian"
                            ? `$${Math.round(basketItem.price / EXCHANGE_RATE)} USD` 
                            : `${basketItem.price.toLocaleString()} EGP`
                          } (Each)
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex border border-black bg-white/5 h-7">
                          <button
                            type="button"
                            onClick={() => updateQuantity(basketItem.name, -1)}
                            className="w-7 flex items-center justify-center border-r border-black hover:bg-neutral-100 cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <div className="w-8 flex items-center justify-center font-mono text-[10px] bg-white">
                            {basketItem.quantity}
                          </div>
                          <button
                            type="button"
                            onClick={() => updateQuantity(basketItem.name, 1)}
                            className="w-7 flex items-center justify-center border-l border-black hover:bg-neutral-100 cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromBasket(basketItem.name)}
                          className="text-red-500 hover:bg-red-50 p-1.5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total invoice box calculation */}
            <div className="bg-black text-white p-4 border border-black shadow-brutalist">
              <span className="font-mono text-[8px] tracking-widest text-desert-blue uppercase block mb-1">
                Estimated Checkout Statement
              </span>
              
              <div className="flex justify-between items-end mb-3">
                <span className="font-serif text-xs uppercase">Est. Total Bill</span>
                <span className="font-serif text-xl font-bold text-desert-blue">
                  {currency === "USD" ? `$${billStructure.totalUsd} USD` : `${billStructure.totalEgp.toLocaleString()} EGP`}
                </span>
              </div>

              <div className="border-t border-white/10 pt-2.5">
                <span className="font-mono text-[8.5px] uppercase block mb-1 text-[#aaa]">Pricing Items Breakdown:</span>
                <ul className="text-[10px] font-sans text-neutral-350 space-y-1">
                  {billStructure.details.map((descLine, lIdx) => (
                    <li key={lIdx} className="flex justify-between text-neutral-300">
                      <span>• {descLine}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service & Google Form Booking Info Guide */}
            <div className="bg-amber-500/5 border border-amber-500/20 p-4 font-sans text-xs text-neutral-800 space-y-2">
              <span className="font-mono text-[9px] uppercase font-bold text-amber-900 block">📋 CLIENT PRICING & BOOKING GUIDE</span>
              <p className="text-[11.5px] leading-relaxed">
                This interactive tool acts as your customized pricing guide. All standard restaurant orders (breakfast & pre-ordered dishes) include a <strong className="text-black">12% Service Charge</strong>. Please note that <strong className="text-black">Day-use Packages are completely exempt</strong> from any service charge.
              </p>
              <p className="text-[11px] text-neutral-600 leading-relaxed italic">
                Use these total prices to continue and lock your reservation details inside the official Google Form above.
              </p>
            </div>
          </div>
        </div>
      </div>
      )}


    </div>
  );
}
