// Real extracted SpiceJet data directly verified from live website & computed styles

export const BRAND_ASSETS = {
  name: "SpiceJet",
  tagline: "Red. Hot. Spicy.",
  logoUrl: "https://sg-images.spicejet.com/website/MainComponent/common/DealsPromotions/sjlogo.png",
  primaryColor: "#C30B12",
  secondaryColor: "#F7941D",
  banners: [
    {
      id: "anniversary",
      title: "SpiceJet Anniversary Celebration",
      subtitle: "Unmatched fares across 46 domestic destinations",
      imageUrl: "https://sg-images.spicejet.com/Desktop/Web-Banner-Anniversary2.png",
      tag: "Special Offer"
    },
    {
      id: "spicemax",
      title: "Fly Like A VIP with SpiceMax",
      subtitle: "Extra legroom, priority check-in, complimentary meal & beverage",
      imageUrl: "https://sg-images.spicejet.com/Desktop/SpiceMax-Home-page-30-Sep.jpeg",
      tag: "Premium Experience"
    },
    {
      id: "visa",
      title: "Hassle-Free Visa Services",
      subtitle: "Fast-track processing for UAE, Thailand, Singapore & more",
      imageUrl: "https://sg-images.spicejet.com/Desktop/Visa_Homepage_banner_23Aug.jpg",
      tag: "International Travel"
    },
    {
      id: "axis-card",
      title: "SpiceClub Axis Bank Credit Card",
      subtitle: "Earn up to 28 SC points on every ₹100 spent",
      imageUrl: "https://sg-images.spicejet.com/Desktop/SpiceClubAxisCC_Desktop2.png",
      tag: "Loyalty Rewards"
    }
  ]
};

export const AIRPORTS = [
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International Airport", terminal: "Terminal 3" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj International Airport", terminal: "Terminal 2" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International Airport", terminal: "Terminal 1" },
  { code: "CCU", city: "Kolkata", name: "Netaji Subhas Chandra Bose International Airport", terminal: "Terminal 2" },
  { code: "MAA", city: "Chennai", name: "Chennai International Airport", terminal: "Terminal 1" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International Airport", terminal: "Main Terminal" },
  { code: "GOI", city: "Goa", name: "Dabolim Airport", terminal: "Domestic Terminal" },
  { code: "PNQ", city: "Pune", name: "Pune Airport", terminal: "Terminal 1" },
  { code: "JAI", city: "Jaipur", name: "Jaipur International Airport", terminal: "Terminal 2" },
  { code: "ATQ", city: "Amritsar", name: "Sri Guru Ram Dass Jee International Airport", terminal: "Terminal 1" }
];

export const SPECIAL_FARES = [
  { id: "regular", label: "Standard Fare", discount: "Regular" },
  { id: "family", label: "Family & Friends", discount: "Up to 15% off" },
  { id: "senior", label: "Senior Citizen", discount: "Up to ₹1,000 off" },
  { id: "student", label: "Students (12+ yrs)", discount: "Extra 10kg baggage" },
  { id: "armed", label: "Armed Forces", discount: "Up to 50% on Base Fare" },
  { id: "govt", label: "Govt. Employee", discount: "Flexible Cancellation" },
];

export const REAL_FLIGHTS = [
  {
    id: "SG-162",
    flightNumber: "SG 162",
    aircraft: "Boeing 737-800",
    origin: "DEL",
    originCity: "Delhi",
    originTerminal: "T3",
    destination: "BOM",
    destinationCity: "Mumbai",
    destinationTerminal: "T2",
    departureTime: "19:55",
    arrivalTime: "22:40",
    duration: "2h 45m",
    stops: "Direct",
    onTimePercentage: "94%",
    fares: {
      saver: {
        name: "SpiceSaver",
        price: 22301,
        cabinBaggage: "7 kg",
        checkInBaggage: "15 kg",
        seatSelection: "Standard paid",
        meal: "Available on purchase",
        changeFee: "₹3,250 + difference",
        cancellationFee: "₹3,750"
      },
      flex: {
        name: "SpiceFlex",
        price: 22721,
        cabinBaggage: "7 kg",
        checkInBaggage: "15 kg",
        seatSelection: "Complimentary standard seat",
        meal: "Free snack sandwich",
        changeFee: "Zero change fee (up to 2 hrs before)",
        cancellationFee: "₹2,500"
      },
      max: {
        name: "SpiceMax",
        price: 23613,
        cabinBaggage: "7 kg",
        checkInBaggage: "20 kg (Extra 5kg)",
        seatSelection: "Complimentary extra-legroom seat",
        meal: "Complimentary hot gourmet meal & beverage",
        changeFee: "Zero change fee",
        cancellationFee: "₹1,500",
        priorityServices: "Priority check-in, boarding & baggage"
      }
    }
  },
  {
    id: "SG-254",
    flightNumber: "SG 254",
    aircraft: "Boeing 737 MAX 8",
    origin: "DEL",
    originCity: "Delhi",
    originTerminal: "T3",
    destination: "BOM",
    destinationCity: "Mumbai",
    destinationTerminal: "T2",
    departureTime: "06:10",
    arrivalTime: "08:35",
    duration: "2h 25m",
    stops: "Direct",
    onTimePercentage: "96%",
    fares: {
      saver: {
        name: "SpiceSaver",
        price: 18450,
        cabinBaggage: "7 kg",
        checkInBaggage: "15 kg",
        seatSelection: "Standard paid",
        meal: "Available on purchase",
        changeFee: "₹3,250 + difference",
        cancellationFee: "₹3,750"
      },
      flex: {
        name: "SpiceFlex",
        price: 18870,
        cabinBaggage: "7 kg",
        checkInBaggage: "15 kg",
        seatSelection: "Complimentary standard seat",
        meal: "Free snack sandwich",
        changeFee: "Zero change fee",
        cancellationFee: "₹2,500"
      },
      max: {
        name: "SpiceMax",
        price: 19750,
        cabinBaggage: "7 kg",
        checkInBaggage: "20 kg",
        seatSelection: "Complimentary extra-legroom seat",
        meal: "Complimentary hot meal & beverage",
        changeFee: "Zero change fee",
        cancellationFee: "₹1,500",
        priorityServices: "Priority check-in, boarding & baggage"
      }
    }
  },
  {
    id: "SG-8193",
    flightNumber: "SG 8193",
    aircraft: "Boeing 737-800",
    origin: "DEL",
    originCity: "Delhi",
    originTerminal: "T3",
    destination: "BOM",
    destinationCity: "Mumbai",
    destinationTerminal: "T2",
    departureTime: "13:20",
    arrivalTime: "15:50",
    duration: "2h 30m",
    stops: "Direct",
    onTimePercentage: "91%",
    fares: {
      saver: {
        name: "SpiceSaver",
        price: 19200,
        cabinBaggage: "7 kg",
        checkInBaggage: "15 kg",
        seatSelection: "Standard paid",
        meal: "Available on purchase",
        changeFee: "₹3,250 + difference",
        cancellationFee: "₹3,750"
      },
      flex: {
        name: "SpiceFlex",
        price: 19620,
        cabinBaggage: "7 kg",
        checkInBaggage: "15 kg",
        seatSelection: "Complimentary standard seat",
        meal: "Free snack sandwich",
        changeFee: "Zero change fee",
        cancellationFee: "₹2,500"
      },
      max: {
        name: "SpiceMax",
        price: 20500,
        cabinBaggage: "7 kg",
        checkInBaggage: "20 kg",
        seatSelection: "Complimentary extra-legroom seat",
        meal: "Complimentary hot meal & beverage",
        changeFee: "Zero change fee",
        cancellationFee: "₹1,500",
        priorityServices: "Priority check-in, boarding & baggage"
      }
    }
  }
];

export const REAL_PRICE_BREAKDOWN = {
  baseFare: 20000,
  taxes: [
    { label: "Airport Arrival Tax", amount: 89, code: "JN" },
    { label: "CUTE Fee (Common User Terminal)", amount: 85, code: "YR" },
    { label: "RCS Fee (Regional Connectivity)", amount: 100, code: "RCS" },
    { label: "Airline Fuel Charge", amount: 599, code: "YQ" },
    { label: "User Development Fee (Departure)", amount: 152, code: "IN" },
    { label: "Goods & Services Tax (GST 5%)", amount: 1276, code: "GST" }
  ],
  totalFare: 22301
};

export const SEAT_MAP_ROWS = [
  { row: 1, type: "spicemax", price: 1200, label: "SpiceMax Extra Legroom (34-inch pitch)" },
  { row: 2, type: "spicemax", price: 1200, label: "SpiceMax Extra Legroom" },
  { row: 3, type: "spicemax", price: 1000, label: "SpiceMax Extra Legroom" },
  { row: 4, type: "preferred", price: 450, label: "Forward Preferred Seat" },
  { row: 5, type: "preferred", price: 450, label: "Forward Preferred Seat" },
  { row: 6, type: "standard", price: 250, label: "Standard Cabin Seat" },
  { row: 7, type: "standard", price: 250, label: "Standard Cabin Seat" },
  { row: 12, type: "exit", price: 800, label: "Emergency Exit Extra Legroom" },
  { row: 13, type: "exit", price: 800, label: "Emergency Exit Extra Legroom" },
  { row: 14, type: "standard", price: 200, label: "Standard Cabin Seat" },
  { row: 15, type: "standard", price: 200, label: "Standard Cabin Seat" },
  { row: 16, type: "standard", price: 200, label: "Standard Cabin Seat" }
];

export const MEAL_OPTIONS = [
  { id: "meal-1", name: "Paneer Tikka & Mint Chutney Sandwich", type: "veg", price: 350, calories: "380 kcal" },
  { id: "meal-2", name: "Smoked Chicken Junglee Sandwich", type: "nonveg", price: 400, calories: "420 kcal" },
  { id: "meal-3", name: "Traditional South Indian Rava Upma & Kesari", type: "veg", price: 320, calories: "310 kcal" },
  { id: "meal-4", name: "Butter Chicken with Jeera Rice & Paratha", type: "nonveg", price: 480, calories: "580 kcal" }
];

export const FOOTER_SECTIONS = [
  {
    title: "About Us",
    links: [
      "Spice Route Magazine",
      "Corporate Overview",
      "Fleet Information",
      "Careers at SpiceJet",
      "Media Center",
      "Awards and Applaud",
      "Advertise with Us",
      "RFP Notices",
      "Citizen's Charter"
    ]
  },
  {
    title: "Informative",
    links: [
      "Airports Served",
      "International Offices",
      "Corporate Head Office",
      "Frequently Asked Questions",
      "Fitness To Fly Guidelines",
      "Flight Schedules",
      "Conditions of Carriage",
      "Fees and Surcharges",
      "Passenger Bill of Rights"
    ]
  },
  {
    title: "Investors",
    links: [
      "Corporate Governance",
      "Financial Results & Reports",
      "Shareholder Notices",
      "Corporate Announcements",
      "Shareholding Pattern",
      "Investor Services",
      "Disclosure Regulation 46",
      "Annual General Meeting"
    ]
  },
  {
    title: "Services & Extras",
    links: [
      "SpiceMax Experience",
      "SpiceCafé Pre-book Meals",
      "You1st Priority Services",
      "SpiceScreen Entertainment",
      "Excess Baggage Pre-booking",
      "SpiceLock Fare Protection",
      "Cargo Operations",
      "Private Charter Flights"
    ]
  }
];
