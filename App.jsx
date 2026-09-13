const { useState } = React;

const REAL_DATA = {
  airports: [
    { code: "DEL", city: "Delhi", name: "Indira Gandhi International", terminal: "T3" },
    { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj", terminal: "T2" },
    { code: "BLR", city: "Bengaluru", name: "Kempegowda International", terminal: "T1" },
    { code: "MAA", city: "Chennai", name: "Chennai International", terminal: "T1" },
    { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International", terminal: "T1" },
    { code: "CCU", city: "Kolkata", name: "Netaji Subhash Chandra Bose", terminal: "T1" },
    { code: "GOI", city: "Goa", name: "Dabolim Airport", terminal: "T1" }
  ],
  flights: [
    {
      flightNumber: "SG-8169",
      aircraft: "Boeing 737-800",
      origin: "DEL",
      destination: "BOM",
      departTime: "06:15",
      arriveTime: "08:25",
      duration: "2h 10m",
      stops: "Non-stop",
      fares: {
        saver: { name: "SpiceSaver", price: 4299, baggage: "15 kg Check-in", seat: "Standard Chargeable" },
        flex: { name: "SpiceFlex", price: 4999, baggage: "15 kg + Free Change", seat: "Standard Seat Free", featured: true },
        max: { name: "SpiceMax", price: 6499, baggage: "15 kg + Priority", seat: "Extra Legroom Seat", meal: "Hot Meal Included" }
      }
    },
    {
      flightNumber: "SG-8712",
      aircraft: "Boeing 737 MAX 8",
      origin: "DEL",
      destination: "BOM",
      departTime: "11:40",
      arriveTime: "13:55",
      duration: "2h 15m",
      stops: "Non-stop",
      fares: {
        saver: { name: "SpiceSaver", price: 4799, baggage: "15 kg Check-in", seat: "Standard Chargeable" },
        flex: { name: "SpiceFlex", price: 5499, baggage: "15 kg + Free Change", seat: "Standard Seat Free", featured: true },
        max: { name: "SpiceMax", price: 6999, baggage: "15 kg + Priority", seat: "Extra Legroom Seat", meal: "Hot Meal Included" }
      }
    },
    {
      flightNumber: "SG-8472",
      aircraft: "Boeing 737-800",
      origin: "DEL",
      destination: "BOM",
      departTime: "18:20",
      arriveTime: "20:35",
      duration: "2h 15m",
      stops: "Non-stop",
      fares: {
        saver: { name: "SpiceSaver", price: 5199, baggage: "15 kg Check-in", seat: "Standard Chargeable" },
        flex: { name: "SpiceFlex", price: 5899, baggage: "15 kg + Free Change", seat: "Standard Seat Free", featured: true },
        max: { name: "SpiceMax", price: 7399, baggage: "15 kg + Priority", seat: "Extra Legroom Seat", meal: "Hot Meal Included" }
      }
    }
  ],
  days: [
    { day: "Mon, 16 Oct", price: "₹4,899" },
    { day: "Tue, 17 Oct", price: "₹4,499" },
    { day: "Wed, 18 Oct", price: "₹4,299", active: true },
    { day: "Thu, 19 Oct", price: "₹4,699" },
    { day: "Fri, 20 Oct", price: "₹5,199" },
    { day: "Sat, 21 Oct", price: "₹5,499" },
    { day: "Sun, 22 Oct", price: "₹5,899" }
  ],
  quickServices: [
    { title: "Change Assist", desc: "Modify flight or claim refund", icon: "https://sg-images.spicejet.com/website/MainComponent/common/ImportantLinks/chng.png", link: "https://changes.spicejet.com/" },
    { title: "SpiceClub Portal", desc: "Earn & redeem loyalty SCash", icon: "https://sg-images.spicejet.com/website/MainComponent/common/ImportantLinks/clubIco.png", link: "https://spiceclub.spicejet.com/" },
    { title: "Axis Bank Card", desc: "Co-branded airport lounge perks", icon: "https://sg-images.spicejet.com/website/MainComponent/common/ImportantLinks/creditcard.png", link: "https://spiceclub.spicejet.com/axisBank" },
    { title: "GST Invoice", desc: "Download business tax invoices", icon: "https://sg-images.spicejet.com/website/MainComponent/common/ImportantLinks/gst.png", link: "#" }
  ]
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripType, setTripType] = useState("one-way");
  const [selectedFlight, setSelectedFlight] = useState(REAL_DATA.flights[0]);
  const [selectedTier, setSelectedTier] = useState("flex");
  const [selectedSeat, setSelectedSeat] = useState("12A");
  const [selectedMeal, setSelectedMeal] = useState(true);
  const [selectedBaggage, setSelectedBaggage] = useState(false);
  const [passenger, setPassenger] = useState({
    title: "Mr",
    firstName: "Akash",
    lastName: "Sharma",
    email: "akash.sharma@example.com",
    phone: "+91 98765 43210"
  });
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("akash@okaxis");

  const basePrice = selectedFlight.fares[selectedTier].price;
  const mealPrice = selectedMeal ? (selectedTier === "max" ? 0 : 350) : 0;
  const baggagePrice = selectedBaggage ? 950 : 0;
  const seatPrice = (selectedTier === "max" || selectedTier === "flex") ? 0 : 250;
  const totalPrice = basePrice + mealPrice + baggagePrice + seatPrice;

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#111111] flex flex-col font-sans">
      <header className="bg-white border-b border-[#e5e2dc] sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => setCurrentStep(1)} className="cursor-pointer border-none bg-transparent">
              <img src="https://www.spicejet.com/v1.svg" alt="SpiceJet" className="h-[38px] w-auto block" />
            </button>
            <nav className="hidden lg:flex items-center gap-2">
              <button 
                onClick={() => setCurrentStep(1)} 
                className={`h-10 px-3.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${currentStep === 1 ? "bg-[rgba(195,11,18,0.08)] text-[#c30b12] font-bold" : "text-[#4b5563] hover:bg-[#f2efe9] hover:text-[#c30b12]"}`}
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"/></svg>
                <span>Flights</span>
              </button>
              <button 
                onClick={() => setCurrentStep(6)} 
                className={`h-10 px-3.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${currentStep === 6 ? "bg-[rgba(195,11,18,0.08)] text-[#c30b12] font-bold" : "text-[#4b5563] hover:bg-[#f2efe9]"}`}
              >
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Check-in</span>
              </button>
              <a href="#" className="h-10 px-3.5 rounded-lg text-sm font-semibold text-[#4b5563] flex items-center gap-2 hover:bg-[#f2efe9]">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Flight Status</span>
              </a>
              <a href="#" className="h-10 px-3.5 rounded-lg text-sm font-semibold text-[#4b5563] flex items-center gap-2 hover:bg-[#f2efe9]">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>Manage Booking</span>
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentStep >= 1 ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#f2efe9] text-[#888888]"}`}>1. Flights</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentStep >= 2 ? (currentStep === 2 ? "bg-[#c30b12] text-white" : "bg-[#dcfce7] text-[#15803d]") : "bg-[#f2efe9] text-[#888888]"}`}>2. Add-ons</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentStep >= 3 ? (currentStep === 3 ? "bg-[#c30b12] text-white" : "bg-[#dcfce7] text-[#15803d]") : "bg-[#f2efe9] text-[#888888]"}`}>3. Passenger</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentStep >= 4 ? "bg-[#c30b12] text-white" : "bg-[#f2efe9] text-[#888888]"}`}>4. Payment</span>
              </div>
            )}
            <button className="h-10 px-3.5 border-[1.5px] border-[#e5e2dc] rounded-lg text-xs font-bold text-[#111111] bg-white flex items-center gap-1.5 hover:border-[#c8c4bc] hover:bg-[#f2efe9] transition-all">
              <span>INR ₹</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <button className="h-10 px-4 rounded-lg text-sm font-bold text-white bg-gradient-to-br from-[#c30b12] to-[#a1080e] shadow-[0_8px_20px_-2px_rgba(195,11,18,0.28)] flex items-center gap-2 hover:-translate-y-0.5 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Login / Signup</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] w-full mx-auto px-6 py-8 flex-1">
        {currentStep === 1 && (
          <div>
            <div className="bg-white border border-[#e5e2dc] rounded-[20px] p-8 shadow-[0_16px_36px_-4px_rgba(0,0,0,0.10)]">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <button 
                  onClick={() => setTripType("one-way")}
                  className={`h-11 px-5 rounded-full border-[1.5px] text-sm font-bold flex items-center gap-2 transition-all ${tripType === "one-way" ? "border-[#c30b12] bg-[rgba(195,11,18,0.06)] text-[#c30b12]" : "border-[#e5e2dc] text-[#4b5563] bg-white"}`}
                >
                  <span className={`w-2 h-2 rounded-full ${tripType === "one-way" ? "bg-[#c30b12]" : "bg-[#e5e2dc]"}`}></span>
                  <span>One Way</span>
                </button>
                <button 
                  onClick={() => setTripType("round-trip")}
                  className={`h-11 px-5 rounded-full border-[1.5px] text-sm font-bold flex items-center gap-2 transition-all ${tripType === "round-trip" ? "border-[#c30b12] bg-[rgba(195,11,18,0.06)] text-[#c30b12]" : "border-[#e5e2dc] text-[#4b5563] bg-white"}`}
                >
                  <span className={`w-2 h-2 rounded-full ${tripType === "round-trip" ? "bg-[#c30b12]" : "bg-[#e5e2dc]"}`}></span>
                  <span>Round Trip</span>
                </button>
                <button 
                  onClick={() => setTripType("multi-city")}
                  className={`h-11 px-5 rounded-full border-[1.5px] text-sm font-bold flex items-center gap-2 transition-all ${tripType === "multi-city" ? "border-[#c30b12] bg-[rgba(195,11,18,0.06)] text-[#c30b12]" : "border-[#e5e2dc] text-[#4b5563] bg-white"}`}
                >
                  <span className={`w-2 h-2 rounded-full ${tripType === "multi-city" ? "bg-[#c30b12]" : "bg-[#e5e2dc]"}`}></span>
                  <span>Multi-City</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="border-[1.5px] border-[#c30b12] rounded-xl p-3 bg-white shadow-[0_0_0_1px_#c30b12]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] block mb-1">From Airport</span>
                  <div className="text-lg font-extrabold text-[#111111]">DEL - Delhi</div>
                  <div className="text-xs text-[#4b5563]">Indira Gandhi Intl, T3</div>
                </div>

                <div className="border-[1.5px] border-[#e5e2dc] rounded-xl p-3 bg-white hover:border-[#c8c4bc]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] block mb-1">To Airport</span>
                  <div className="text-lg font-extrabold text-[#111111]">BOM - Mumbai</div>
                  <div className="text-xs text-[#4b5563]">Chhatrapati Shivaji, T2</div>
                </div>

                <div className="border-[1.5px] border-[#e5e2dc] rounded-xl p-3 bg-white hover:border-[#c8c4bc]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] block mb-1">Departure Date</span>
                  <div className="text-lg font-extrabold text-[#111111]">Wed, 18 Oct</div>
                  <div className="text-xs font-mono font-bold text-[#15803d]">Fares from ₹4,299</div>
                </div>

                <div className="border-[1.5px] border-[#e5e2dc] rounded-xl p-3 bg-white hover:border-[#c8c4bc]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] block mb-1">Passengers & Class</span>
                  <div className="text-lg font-extrabold text-[#111111]">1 Adult</div>
                  <div className="text-xs text-[#4b5563]">Economy Class</div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#e5e2dc]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#888888] mb-3">Special Concession Fares</div>
                <div className="flex gap-3 flex-wrap">
                  <span className="h-9 px-4 rounded-full border-[1.5px] border-[#c30b12] bg-[#fef2f2] text-[#c30b12] text-xs font-bold flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Student (+10kg Baggage)
                  </span>
                  <span className="h-9 px-4 rounded-full border-[1.5px] border-[#e5e2dc] bg-[#f2efe9] text-[#4b5563] text-xs font-semibold flex items-center gap-1.5">
                    Senior Citizen (60+ Yrs)
                  </span>
                  <span className="h-9 px-4 rounded-full border-[1.5px] border-[#e5e2dc] bg-[#f2efe9] text-[#4b5563] text-xs font-semibold flex items-center gap-1.5">
                    Armed Forces Personnel
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="h-14 px-10 rounded-lg text-lg font-extrabold text-white bg-gradient-to-br from-[#c30b12] to-[#a1080e] shadow-[0_8px_20px_-2px_rgba(195,11,18,0.28)] flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-2px_rgba(195,11,18,0.4)] transition-all"
                >
                  <span>Search Flights</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
              {REAL_DATA.quickServices.map((svc, idx) => (
                <div key={idx} className="bg-white border border-[#e5e2dc] rounded-xl p-5 flex items-center gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_6px_16px_-2px_rgba(0,0,0,0.07)] transition-all">
                  <img src={svc.icon} alt={svc.title} className="h-10 w-auto object-contain" />
                  <div>
                    <div className="text-sm font-bold text-[#111111]">{svc.title}</div>
                    <div className="text-xs text-[#4b5563] mt-0.5">{svc.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="bg-white border border-[#e5e2dc] rounded-xl p-4 mb-6 flex justify-between items-center flex-wrap gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <div>
                <div className="text-xl font-extrabold flex items-center gap-2">
                  <span>DEL (Delhi)</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  <span>BOM (Mumbai)</span>
                </div>
                <div className="text-xs text-[#4b5563] mt-0.5">Wed, 18 Oct 2026 · 1 Adult · Economy Class</div>
              </div>
              <button onClick={() => setCurrentStep(1)} className="h-10 px-4 border-[1.5px] border-[#e5e2dc] rounded-lg text-xs font-bold text-[#111111] bg-white flex items-center gap-2 hover:bg-[#f2efe9]">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                <span>Modify Search</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
              {REAL_DATA.days.map((d, idx) => (
                <div key={idx} className={`p-3 rounded-lg border-[1.5px] text-center cursor-pointer transition-all ${d.active ? "border-[#c30b12] bg-[#fef2f2] shadow-[0_2px_8px_rgba(195,11,18,0.15)]" : "border-[#e5e2dc] bg-white hover:border-[#c8c4bc]"}`}>
                  <span className="text-xs font-semibold text-[#4b5563] block">{d.day}</span>
                  <span className={`font-mono text-sm font-extrabold mt-1 block ${d.active ? "text-[#c30b12]" : "text-[#111111]"}`}>{d.price}</span>
                </div>
              ))}
            </div>

            {REAL_DATA.flights.map((flight, fIdx) => (
              <div key={fIdx} className="bg-white border-[1.5px] border-[#e5e2dc] rounded-[20px] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)] mb-8">
                <div className="flex justify-between items-center flex-wrap gap-6 pb-6 border-b border-[#e5e2dc] mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center text-[#c30b12]">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z"/></svg>
                    </div>
                    <div>
                      <div className="font-mono text-lg font-extrabold text-[#111111]">{flight.flightNumber}</div>
                      <div className="text-xs text-[#4b5563]">{flight.aircraft} · {flight.stops}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="font-mono text-2xl font-extrabold text-[#111111]">{flight.departTime}</div>
                      <div className="text-xs font-bold text-[#4b5563]">{flight.origin} (T3)</div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-mono text-xs font-bold text-[#888888]">{flight.duration}</span>
                      <svg className="w-20 h-3" viewBox="0 0 80 12" fill="none">
                        <line x1="5" y1="6" x2="75" y2="6" stroke="#c8c4bc" strokeWidth="2" strokeDasharray="3 3"/>
                        <polygon points="75,6 68,3 68,9" fill="#c8c4bc"/>
                      </svg>
                      <span className="text-[11px] font-bold text-[#15803d]">Non-stop</span>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-2xl font-extrabold text-[#111111]">{flight.arriveTime}</div>
                      <div className="text-xs font-bold text-[#4b5563]">{flight.destination} (T2)</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className={`border-[1.5px] rounded-xl p-5 flex flex-col justify-between transition-all ${selectedFlight.flightNumber === flight.flightNumber && selectedTier === "saver" ? "border-[#c30b12] bg-[#fef2f2]" : "border-[#e5e2dc] bg-white hover:border-[#c8c4bc]"}`}>
                    <div>
                      <div className="text-base font-extrabold text-[#111111]">SpiceSaver</div>
                      <div className="font-mono text-2xl font-extrabold text-[#c30b12] my-2">₹{flight.fares.saver.price}</div>
                      <ul className="text-xs text-[#4b5563] space-y-2 mb-6">
                        <li className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold">✓</span>
                          <span>15 kg Check-in Baggage</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold">✓</span>
                          <span>7 kg Hand Bag</span>
                        </li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => { setSelectedFlight(flight); setSelectedTier("saver"); setCurrentStep(3); }}
                      className="h-11 rounded-lg font-bold text-sm border-[1.5px] border-[#e5e2dc] bg-white hover:border-[#111111] transition-all"
                    >
                      Select Saver
                    </button>
                  </div>

                  <div className={`border-[1.5px] rounded-xl p-5 flex flex-col justify-between relative transition-all ${selectedFlight.flightNumber === flight.flightNumber && selectedTier === "flex" ? "border-[#c30b12] shadow-[0_8px_20px_-2px_rgba(195,11,18,0.28)] bg-white" : "border-[#e5e2dc] bg-white hover:border-[#c8c4bc]"}`}>
                    <span className="absolute -top-3 right-4 bg-gradient-to-r from-[#c30b12] to-[#a1080e] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">MOST POPULAR</span>
                    <div>
                      <div className="text-base font-extrabold text-[#111111]">SpiceFlex</div>
                      <div className="font-mono text-2xl font-extrabold text-[#c30b12] my-2">₹{flight.fares.flex.price}</div>
                      <ul className="text-xs text-[#4b5563] space-y-2 mb-6">
                        <li className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold">✓</span>
                          <span>15 kg + 7 kg Cabin</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold">✓</span>
                          <span><strong>Free Date Change</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold">✓</span>
                          <span>Free Standard Seat</span>
                        </li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => { setSelectedFlight(flight); setSelectedTier("flex"); setCurrentStep(3); }}
                      className="h-11 rounded-lg font-bold text-sm text-white bg-gradient-to-br from-[#c30b12] to-[#a1080e] shadow-[0_4px_12px_rgba(195,11,18,0.25)] hover:-translate-y-0.5 transition-all"
                    >
                      Select SpiceFlex
                    </button>
                  </div>

                  <div className={`border-[1.5px] rounded-xl p-5 flex flex-col justify-between transition-all ${selectedFlight.flightNumber === flight.flightNumber && selectedTier === "max" ? "border-[#c30b12] bg-[#fef2f2]" : "border-[#e5e2dc] bg-white hover:border-[#c8c4bc]"}`}>
                    <div>
                      <div className="text-base font-extrabold text-[#111111]">SpiceMax</div>
                      <div className="font-mono text-2xl font-extrabold text-[#c30b12] my-2">₹{flight.fares.max.price}</div>
                      <ul className="text-xs text-[#4b5563] space-y-2 mb-6">
                        <li className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold">✓</span>
                          <span>Extra Legroom Seat</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center font-bold">✓</span>
                          <span>Complimentary Meal</span>
                        </li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => { setSelectedFlight(flight); setSelectedTier("max"); setCurrentStep(3); }}
                      className="h-11 rounded-lg font-bold text-sm border-[1.5px] border-[#e5e2dc] bg-white hover:border-[#111111] transition-all"
                    >
                      Select SpiceMax
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white border border-[#e5e2dc] rounded-[20px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <h2 className="text-lg font-extrabold text-[#111111] mb-1">Select Seat ({selectedFlight.origin} ➔ {selectedFlight.destination})</h2>
              <p className="text-xs text-[#4b5563] mb-4">Aircraft: {selectedFlight.aircraft}</p>

              <div className="bg-[#f2efe9] border-2 border-[#e5e2dc] rounded-t-[40px] rounded-b-2xl p-5 max-w-[280px] mx-auto">
                <div className="text-center text-[11px] font-bold text-[#888888] uppercase tracking-wider pb-3 border-b border-dashed border-[#e5e2dc] mb-4">Cockpit Forward</div>
                
                {["1", "11", "12"].map((rowNum) => (
                  <div key={rowNum} className="flex justify-between items-center mb-2">
                    <span className="w-5 font-mono text-xs font-bold text-[#888888] text-center">{rowNum}</span>
                    <div className="flex gap-1.5">
                      {["A", "B", "C"].map((col) => {
                        const seatCode = `${rowNum}${col}`;
                        const isSelected = selectedSeat === seatCode;
                        const isOccupied = rowNum === "11" && (col === "A" || col === "B");
                        const isMax = rowNum === "1";
                        return (
                          <button
                            key={seatCode}
                            disabled={isOccupied}
                            onClick={() => setSelectedSeat(seatCode)}
                            className={`w-8 h-8 rounded text-xs font-mono font-bold flex items-center justify-center transition-all ${
                              isOccupied ? "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed" :
                              isSelected ? "bg-[#c30b12] text-white shadow-md scale-105" :
                              isMax ? "bg-[#fffbeb] border border-[#f59e0b] text-[#b45309]" :
                              "bg-white border border-[#e5e2dc] text-[#111111] hover:border-[#c30b12]"
                            }`}
                          >
                            {col}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex gap-1.5">
                      {["D", "E", "F"].map((col) => {
                        const seatCode = `${rowNum}${col}`;
                        const isSelected = selectedSeat === seatCode;
                        const isOccupied = rowNum === "11" && (col === "E" || col === "F");
                        const isMax = rowNum === "1";
                        return (
                          <button
                            key={seatCode}
                            disabled={isOccupied}
                            onClick={() => setSelectedSeat(seatCode)}
                            className={`w-8 h-8 rounded text-xs font-mono font-bold flex items-center justify-center transition-all ${
                              isOccupied ? "bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed" :
                              isSelected ? "bg-[#c30b12] text-white shadow-md scale-105" :
                              isMax ? "bg-[#fffbeb] border border-[#f59e0b] text-[#b45309]" :
                              "bg-white border border-[#e5e2dc] text-[#111111] hover:border-[#c30b12]"
                            }`}
                          >
                            {col}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white border border-[#e5e2dc] rounded-[20px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <h2 className="text-lg font-extrabold text-[#111111] mb-1">Add-ons & Meal Pre-booking</h2>
                <p className="text-xs text-[#4b5563] mb-5">Pre-book hot meals and excess baggage for guaranteed discounts.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`border-[1.5px] rounded-xl p-4 flex flex-col justify-between transition-all ${selectedMeal ? "border-[#c30b12] bg-[#fef2f2]" : "border-[#e5e2dc] bg-white"}`}>
                    <div>
                      <div className="text-sm font-bold text-[#111111]">Paneer Tikka Masala</div>
                      <div className="text-xs text-[#4b5563] mt-1">SpiceCafé Chef Special with Jeera Rice</div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-mono font-bold text-sm">₹350</span>
                      <button 
                        onClick={() => setSelectedMeal(!selectedMeal)} 
                        className={`h-8 px-3 rounded text-xs font-bold ${selectedMeal ? "bg-[#c30b12] text-white" : "border border-[#e5e2dc] bg-white"}`}
                      >
                        {selectedMeal ? "Added" : "+ Add"}
                      </button>
                    </div>
                  </div>

                  <div className={`border-[1.5px] rounded-xl p-4 flex flex-col justify-between transition-all ${selectedBaggage ? "border-[#c30b12] bg-[#fef2f2]" : "border-[#e5e2dc] bg-white"}`}>
                    <div>
                      <div className="text-sm font-bold text-[#111111]">+5 Kg Excess Baggage</div>
                      <div className="text-xs text-[#4b5563] mt-1">Save 40% vs airport counter rate</div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-mono font-bold text-sm">₹950</span>
                      <button 
                        onClick={() => setSelectedBaggage(!selectedBaggage)} 
                        className={`h-8 px-3 rounded text-xs font-bold ${selectedBaggage ? "bg-[#c30b12] text-white" : "border border-[#e5e2dc] bg-white"}`}
                      >
                        {selectedBaggage ? "Added" : "+ Add"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#e5e2dc] rounded-xl p-5 flex justify-between items-center shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <div>
                  <div className="text-xs text-[#4b5563]">Selected Seat: <strong className="text-[#111111]">{selectedSeat}</strong></div>
                  <div className="font-mono text-2xl font-extrabold text-[#c30b12]">₹{totalPrice}</div>
                </div>
                <button 
                  onClick={() => setCurrentStep(4)} 
                  className="h-12 px-6 rounded-lg text-sm font-bold text-white bg-gradient-to-br from-[#c30b12] to-[#a1080e] shadow-[0_4px_12px_rgba(195,11,18,0.25)] flex items-center gap-2 hover:-translate-y-0.5 transition-all"
                >
                  <span>Continue to Passenger Details</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-[#e5e2dc] rounded-[20px] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <h2 className="text-lg font-extrabold text-[#111111] mb-5">Primary Passenger (Adult)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#4b5563] block mb-1">Title</label>
                    <select 
                      value={passenger.title} 
                      onChange={(e) => setPassenger({...passenger, title: e.target.value})}
                      className="w-full h-12 border-[1.5px] border-[#e5e2dc] rounded-lg px-3 text-sm font-medium bg-white focus:border-[#c30b12] outline-none"
                    >
                      <option>Mr</option>
                      <option>Ms</option>
                      <option>Mrs</option>
                    </select>
                  </div>
                  <div className="sm:col-span-4">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#4b5563] block mb-1">First Name</label>
                    <input 
                      type="text" 
                      value={passenger.firstName} 
                      onChange={(e) => setPassenger({...passenger, firstName: e.target.value})}
                      className="w-full h-12 border-[1.5px] border-[#e5e2dc] rounded-lg px-4 text-sm font-medium bg-white focus:border-[#c30b12] outline-none"
                      required
                    />
                  </div>
                  <div className="sm:col-span-5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#4b5563] block mb-1">Last Name</label>
                    <input 
                      type="text" 
                      value={passenger.lastName} 
                      onChange={(e) => setPassenger({...passenger, lastName: e.target.value})}
                      className="w-full h-12 border-[1.5px] border-[#e5e2dc] rounded-lg px-4 text-sm font-medium bg-white focus:border-[#c30b12] outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#e5e2dc] rounded-[20px] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <h2 className="text-lg font-extrabold text-[#111111] mb-5">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#4b5563] block mb-1">Email Address (For E-Ticket)</label>
                    <input 
                      type="email" 
                      value={passenger.email} 
                      onChange={(e) => setPassenger({...passenger, email: e.target.value})}
                      className="w-full h-12 border-[1.5px] border-[#e5e2dc] rounded-lg px-4 text-sm font-medium bg-white focus:border-[#c30b12] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#4b5563] block mb-1">Mobile Number (For WhatsApp / SMS)</label>
                    <input 
                      type="tel" 
                      value={passenger.phone} 
                      onChange={(e) => setPassenger({...passenger, phone: e.target.value})}
                      className="w-full h-12 border-[1.5px] border-[#e5e2dc] rounded-lg px-4 text-sm font-medium bg-white focus:border-[#c30b12] outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white border border-[#e5e2dc] rounded-[20px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] sticky top-24">
                <h2 className="text-base font-extrabold text-[#111111] mb-4">Fare Breakdown</h2>
                <div className="space-y-2.5 text-xs text-[#4b5563]">
                  <div className="flex justify-between">
                    <span>Flight {selectedFlight.flightNumber} ({selectedTier.toUpperCase()})</span>
                    <span className="font-mono font-bold text-[#111111]">₹{basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seat {selectedSeat}</span>
                    <span className="font-mono font-bold text-[#15803d]">{seatPrice === 0 ? "FREE" : `₹${seatPrice}`}</span>
                  </div>
                  {selectedMeal && (
                    <div className="flex justify-between">
                      <span>SpiceCafé Hot Meal</span>
                      <span className="font-mono font-bold text-[#111111]">₹{mealPrice}</span>
                    </div>
                  )}
                  {selectedBaggage && (
                    <div className="flex justify-between">
                      <span>+5 Kg Excess Baggage</span>
                      <span className="font-mono font-bold text-[#111111]">₹{baggagePrice}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t-2 border-dashed border-[#e5e2dc] flex justify-between items-center text-base font-extrabold text-[#111111]">
                    <span>Total Payable</span>
                    <span className="font-mono text-xl text-[#c30b12]">₹{totalPrice}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setCurrentStep(5)} 
                  className="w-full h-12 mt-6 rounded-lg text-sm font-extrabold text-white bg-gradient-to-br from-[#c30b12] to-[#a1080e] shadow-[0_4px_12px_rgba(195,11,18,0.25)] flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all"
                >
                  <span>Proceed to Payment</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white border border-[#e5e2dc] rounded-[20px] p-7 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <h2 className="text-xl font-extrabold text-[#111111] mb-6">Select Payment Gateway</h2>

              <div className="space-y-4">
                <div className={`border-[1.5px] rounded-xl overflow-hidden transition-all ${paymentMethod === "upi" ? "border-[#c30b12] shadow-md" : "border-[#e5e2dc]"}`}>
                  <div onClick={() => setPaymentMethod("upi")} className="p-4 flex items-center justify-between cursor-pointer bg-white">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "upi" ? "border-[#c30b12]" : "border-[#e5e2dc]"}`}>
                        {paymentMethod === "upi" && <div className="w-2.5 h-2.5 rounded-full bg-[#c30b12]"></div>}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#111111]">UPI Instant (GPay / PhonePe / Paytm / QR)</div>
                        <div className="text-xs text-[#4b5563]">Direct zero-fee bank transfer</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#dcfce7] text-[#15803d]">FASTEST · ₹0 FEE</span>
                  </div>

                  {paymentMethod === "upi" && (
                    <div className="p-5 bg-[#f8f7f4] border-t border-[#e5e2dc]">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#4b5563] block mb-1">Enter UPI VPA ID</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={upiId} 
                          onChange={(e) => setUpiId(e.target.value)} 
                          className="flex-1 h-12 border-[1.5px] border-[#e5e2dc] rounded-lg px-4 font-mono text-sm bg-white focus:border-[#c30b12] outline-none"
                          placeholder="e.g. mobile@upi"
                        />
                        <button 
                          onClick={() => setCurrentStep(6)} 
                          className="h-12 px-6 rounded-lg font-bold text-sm text-white bg-gradient-to-br from-[#c30b12] to-[#a1080e] shadow-[0_4px_12px_rgba(195,11,18,0.25)] flex items-center gap-2 hover:-translate-y-0.5 transition-all"
                        >
                          <span>Verify & Pay</span>
                          <span className="font-mono">₹{totalPrice}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div onClick={() => setPaymentMethod("card")} className="p-4 border-[1.5px] border-[#e5e2dc] rounded-xl flex items-center justify-between cursor-pointer bg-white hover:border-[#c8c4bc]">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-[#c30b12]" : "border-[#e5e2dc]"}`}>
                      {paymentMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-[#c30b12]"></div>}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#111111]">Credit / Debit Card</div>
                      <div className="text-xs text-[#4b5563]">Visa, Mastercard, RuPay, Amex</div>
                    </div>
                  </div>
                  <span className="text-xs text-[#888888] font-semibold">Standard</span>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#e5e2dc] flex items-center gap-4 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-[#888888]">Gateways:</span>
                <img src="https://www.spicejet.com/bhim.png" alt="BHIM" className="h-6 w-auto" />
                <img src="https://www.spicejet.com/rupay.png" alt="RuPay" className="h-6 w-auto" />
                <img src="https://www.spicejet.com/visa.png" alt="Visa" className="h-6 w-auto" />
                <img src="https://www.spicejet.com/master-card.png" alt="Mastercard" className="h-6 w-auto" />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white border border-[#e5e2dc] rounded-[20px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] sticky top-24">
                <h2 className="text-base font-extrabold text-[#111111] mb-4">Final Summary</h2>
                <div className="space-y-2 text-xs text-[#4b5563]">
                  <div className="flex justify-between">
                    <span>Flight {selectedFlight.flightNumber}</span>
                    <span className="font-mono font-bold">₹{basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seat {selectedSeat}</span>
                    <span className="font-mono font-bold text-[#15803d]">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Convenience Surcharge</span>
                    <span className="font-mono font-bold text-[#15803d]">₹0 (Free)</span>
                  </div>
                  <div className="pt-3 border-t-2 border-dashed border-[#e5e2dc] flex justify-between items-center text-base font-extrabold text-[#111111]">
                    <span>Total Amount</span>
                    <span className="font-mono text-xl text-[#c30b12]">₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="max-w-[880px] mx-auto">
            <div className="bg-[#dcfce7] border-[1.5px] border-[#bbf7d0] rounded-[20px] p-6 mb-8 flex items-center gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <div className="w-12 h-12 rounded-full bg-[#15803d] text-white flex items-center justify-center font-bold text-xl flex-shrink-0">✓</div>
              <div>
                <div className="text-xl font-extrabold text-[#15803d]">Booking Confirmed & E-Ticket Issued!</div>
                <div className="text-xs text-[#4b5563] mt-0.5">Confirmation sent to <strong>{passenger.email}</strong> and WhatsApp ({passenger.phone}).</div>
              </div>
            </div>

            <div className="bg-white border border-[#e5e2dc] rounded-[20px] overflow-hidden shadow-[0_16px_36px_-4px_rgba(0,0,0,0.10)] mb-8">
              <div className="bg-gradient-to-r from-[#c30b12] to-[#a1080e] text-white px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-base tracking-wide">SPICEJET BOARDING PASS</span>
                  <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold">{selectedTier.toUpperCase()}</span>
                </div>
                <div className="bg-white/20 px-3.5 py-1 rounded-full font-mono text-sm font-bold">PNR: SG-8924K7</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-8 p-8">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="font-mono text-3xl font-extrabold text-[#111111]">{selectedFlight.origin}</div>
                      <div className="text-xs text-[#4b5563]">Delhi, T3</div>
                      <div className="font-mono text-lg font-extrabold text-[#c30b12] mt-1">{selectedFlight.departTime}</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="font-mono text-xs font-bold text-[#888888]">{selectedFlight.flightNumber}</span>
                      <svg className="w-24 h-4 my-1" viewBox="0 0 100 20" fill="none">
                        <line x1="10" y1="10" x2="90" y2="10" stroke="#c8c4bc" strokeWidth="2" strokeDasharray="4 3"/>
                        <polygon points="90,10 82,6 82,14" fill="#c8c4bc"/>
                      </svg>
                      <span className="text-[11px] font-semibold text-[#888888]">{selectedFlight.duration}</span>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-3xl font-extrabold text-[#111111]">{selectedFlight.destination}</div>
                      <div className="text-xs text-[#4b5563]">Mumbai, T2</div>
                      <div className="font-mono text-lg font-extrabold text-[#111111] mt-1">{selectedFlight.arriveTime}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-[#f8f7f4] border border-[#e5e2dc] rounded-xl p-4 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">Passenger</span>
                      <strong className="text-sm text-[#111111]">{passenger.title} {passenger.firstName} {passenger.lastName}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">Seat</span>
                      <strong className="text-sm font-mono text-[#c30b12]">{selectedSeat} (Window)</strong>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 p-8 bg-[#f8f7f4] border-t md:border-t-0 md:border-l-2 border-dashed border-[#e5e2dc] flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#888888] mb-3">E-Gate Barcode</span>
                  <div className="font-mono font-bold text-base tracking-[4px] my-2 select-none">||| | |||| || |||</div>
                  <span className="font-mono text-xs font-bold text-[#4b5563]">M1SHARMA/A ESG8924</span>
                  <span className="text-[10px] text-[#888888] mt-2">DigiYatra Enabled</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button onClick={() => window.print()} className="h-12 rounded-lg font-bold text-sm text-white bg-gradient-to-br from-[#c30b12] to-[#a1080e] shadow-[0_4px_12px_rgba(195,11,18,0.25)] flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Download PDF Ticket</span>
              </button>
              <button onClick={() => alert("Web check-in opens 48 hours prior to scheduled departure.")} className="h-12 border-[1.5px] border-[#e5e2dc] rounded-lg font-bold text-sm text-[#111111] bg-white hover:bg-[#f2efe9]">
                Web Check-in
              </button>
              <button onClick={() => setCurrentStep(1)} className="h-12 border-[1.5px] border-[#e5e2dc] rounded-lg font-bold text-sm text-[#111111] bg-white hover:bg-[#f2efe9]">
                New Booking
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-[#e5e2dc] py-8 px-6 mt-16">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center flex-wrap gap-4 text-xs text-[#888888]">
          <div>© 2026 SpiceJet Limited. All rights reserved. Real-Time Flight Booking Engine.</div>
          <div>256-Bit SSL Encrypted & PCI-DSS Certified</div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
