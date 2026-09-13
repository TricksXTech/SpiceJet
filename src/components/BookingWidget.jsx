import React, { useState } from 'react';
import { 
  PlaneTakeoff, 
  PlaneLanding, 
  Calendar, 
  Users, 
  ArrowLeftRight, 
  Search, 
  ChevronDown, 
  Sparkles, 
  Check, 
  X,
  FileCheck,
  Clock,
  Briefcase,
  AlertCircle,
  QrCode,
  ArrowRight
} from 'lucide-react';
import { AIRPORTS, SPECIAL_FARES } from '../data/spicejetRealData';

export default function BookingWidget({ 
  searchParams, 
  setSearchParams, 
  activeTab = 'flights',
  setActiveTab,
  onSearch,
  onNavigate
}) {
  const [tripType, setTripType] = useState('oneWay'); // 'oneWay' | 'roundTrip'
  const [originOpen, setOriginOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [passengersOpen, setPassengersOpen] = useState(false);
  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');

  // Forms state for auxiliary tabs
  const [checkinPnr, setCheckinPnr] = useState('SG-7K9B2M');
  const [checkinContact, setCheckinContact] = useState('rahul.sharma@example.com');
  const [checkinResult, setCheckinResult] = useState(null);

  const [statusFlightNo, setStatusFlightNo] = useState('SG 162');
  const [statusDate, setStatusDate] = useState('2026-09-20');
  const [statusResult, setStatusResult] = useState(null);

  const [managePnr, setManagePnr] = useState('SG-7K9B2M');
  const [manageContact, setManageContact] = useState('9876543210');
  const [manageResult, setManageResult] = useState(null);

  // Find selected airport objects from complete 79-station list
  const originAirport = AIRPORTS.find(a => a.code === searchParams.origin) || AIRPORTS[0];
  const destAirport = AIRPORTS.find(a => a.code === searchParams.destination) || AIRPORTS[1];

  const handleSwapAirports = () => {
    setSearchParams(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  const handlePassengerChange = (field, delta) => {
    setSearchParams(prev => {
      const current = prev[field] || 0;
      const updated = Math.max(field === 'adults' ? 1 : 0, current + delta);
      return { ...prev, [field]: updated };
    });
  };

  const totalPassengers = (searchParams.adults || 1) + (searchParams.children || 0) + (searchParams.infants || 0);

  // Filter 79 real airports by search query
  const filteredOriginAirports = AIRPORTS.filter(a => 
    a.city.toLowerCase().includes(originQuery.toLowerCase()) ||
    a.code.toLowerCase().includes(originQuery.toLowerCase()) ||
    a.name.toLowerCase().includes(originQuery.toLowerCase())
  );

  const filteredDestAirports = AIRPORTS.filter(a => 
    a.city.toLowerCase().includes(destQuery.toLowerCase()) ||
    a.code.toLowerCase().includes(destQuery.toLowerCase()) ||
    a.name.toLowerCase().includes(destQuery.toLowerCase())
  );

  const handleCheckinSubmit = (e) => {
    e.preventDefault();
    setCheckinResult({
      pnr: checkinPnr.toUpperCase(),
      passenger: 'Rahul Sharma',
      flight: 'SG 162',
      route: 'Delhi (DEL) → Mumbai (BOM)',
      departure: '19:55 (Terminal 3, Gate 14)',
      seat: '2A (SpiceMax)',
      status: 'Check-In Confirmed'
    });
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    setStatusResult({
      flightNo: statusFlightNo.toUpperCase(),
      status: 'ON TIME',
      route: 'Delhi (DEL) → Mumbai (BOM)',
      departure: '19:55 (Terminal 3, Gate 14)',
      arrival: '22:40 (Terminal 2, Belt 4)',
      aircraft: 'Boeing 737-800'
    });
  };

  const handleManageSubmit = (e) => {
    e.preventDefault();
    setManageResult({
      pnr: managePnr.toUpperCase(),
      passenger: 'Rahul Sharma',
      flight: 'SG 162',
      route: 'DEL → BOM • 20 Sep 2026',
      totalFare: '₹22,301',
      spiceClubPoints: '450 pts earned'
    });
  };

  return (
    <div className="w-full bg-white dark:bg-[#1C1D24] rounded-2xl shadow-elevated border border-slate-200/90 dark:border-white/10 overflow-hidden transition-colors duration-200">
      
      {/* Top Booking Tabs: Flights, Check-in, Flight Status, Manage Booking */}
      <div className="flex border-b border-slate-100 dark:border-white/10 bg-slate-50/70 dark:bg-[#14151A] p-1.5 gap-1.5 overflow-x-auto">
        {[
          { id: 'flights', label: 'Book Flight' },
          { id: 'checkin', label: 'Web Check-In' },
          { id: 'status', label: 'Flight Status' },
          { id: 'manage', label: 'Manage Booking' },
        ].map(tab => (
          <button
            key={tab.id}
            id={`booking-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-[#1C1D24] text-[#C30B12] dark:text-[#FF3B46] shadow-sm ring-1 ring-slate-200/80 dark:ring-white/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FLIGHT SEARCH ENGINE */}
      {/* ========================================================================= */}
      {activeTab === 'flights' && (
        <div className="p-4 sm:p-6 space-y-5">
          
          {/* Trip Type Selector & Direct Flights Only */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl text-xs font-semibold">
              <button
                id="booking-trip-type-oneway"
                onClick={() => setTripType('oneWay')}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  tripType === 'oneWay'
                    ? 'bg-white dark:bg-[#1C1D24] text-slate-900 dark:text-white shadow-sm font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                One Way
              </button>
              <button
                id="booking-trip-type-roundtrip"
                onClick={() => setTripType('roundTrip')}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  tripType === 'roundTrip'
                    ? 'bg-white dark:bg-[#1C1D24] text-slate-900 dark:text-white shadow-sm font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Round Trip
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="w-3.5 h-3.5 rounded text-[#C30B12] dark:text-[#FF3B46] focus:ring-[#C30B12] border-slate-300 dark:border-white/20" 
                />
                <span>Direct Flights Only</span>
              </label>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-[#C30B12] dark:text-[#FF3B46] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Best Fare Guarantee
              </span>
            </div>
          </div>

          {/* Input Grid: Origin, Swap, Destination, Dates, Passengers */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 relative">
            
            {/* Origin Selection (From) */}
            <div className="md:col-span-3 relative">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                From
              </label>
              <button
                id="booking-widget-origin-btn"
                onClick={() => { setOriginOpen(!originOpen); setDestOpen(false); setPassengersOpen(false); }}
                className="w-full h-14 px-3.5 bg-slate-50/70 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-slate-300 rounded-xl flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <PlaneTakeoff className="w-4 h-4 text-[#C30B12] dark:text-[#FF3B46] shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="truncate">
                    <div className="font-bold text-slate-900 dark:text-white text-sm tracking-tight flex items-center gap-1.5">
                      <span>{originAirport.city}</span>
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-white/10 px-1.5 py-0.2 rounded">
                        {originAirport.code}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{originAirport.name}</div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              </button>

              {/* Origin Dropdown with Real-Time Text Search Filter */}
              {originOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-80 sm:w-96 bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 rounded-2xl shadow-elevated z-50 p-2 max-h-80 flex flex-col animate-in fade-in">
                  <div className="p-1.5 border-b border-slate-100 dark:border-white/10">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        id="origin-search-input"
                        type="text"
                        autoFocus
                        placeholder="Type city or airport (e.g. Del, Goa, Mum)..."
                        value={originQuery}
                        onChange={(e) => setOriginQuery(e.target.value)}
                        className="w-full h-9 pl-8 pr-8 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20"
                      />
                      {originQuery && (
                        <button onClick={() => setOriginQuery('')} className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="overflow-y-auto flex-1 p-1 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                      {originQuery ? `Matching Airports (${filteredOriginAirports.length})` : 'All 79 SpiceJet Stations'}
                    </div>

                    {filteredOriginAirports.length === 0 ? (
                      <div className="text-center py-4 text-xs text-slate-400">No airport found matching "{originQuery}"</div>
                    ) : (
                      filteredOriginAirports.map(airport => (
                        <button
                          key={airport.code}
                          onClick={() => {
                            setSearchParams(prev => ({ ...prev, origin: airport.code }));
                            setOriginOpen(false);
                            setOriginQuery('');
                          }}
                          className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between hover:bg-red-50/70 dark:hover:bg-white/5 transition-colors ${
                            searchParams.origin === airport.code ? 'bg-red-50 dark:bg-red-500/20 text-[#C30B12] dark:text-[#FF3B46] font-semibold' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{airport.city}</span>
                              <span className="font-mono text-[11px] bg-slate-100 dark:bg-white/10 px-1.5 py-0.2 rounded">
                                {airport.code}
                              </span>
                              {airport.isInternational && (
                                <span className="text-[9px] bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-1 rounded">Intl</span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[240px]">{airport.name}</div>
                          </div>
                          {searchParams.origin === airport.code && <Check className="w-4 h-4 text-[#C30B12] dark:text-[#FF3B46]" />}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Swap Button (Both Mobile & Desktop) */}
            <div className="flex md:col-span-1 items-center md:items-end justify-center py-1 md:pb-2">
              <button
                id="booking-widget-swap-btn"
                onClick={handleSwapAirports}
                aria-label="Swap origin and destination"
                title="Swap From and To"
                className="w-9 h-9 rounded-full bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 hover:border-[#C30B12] dark:hover:border-[#FF3B46] shadow-sm hover:shadow flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#C30B12] dark:hover:text-[#FF3B46] hover:rotate-180 transition-all duration-300"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Destination Selection (To) */}
            <div className="md:col-span-3 relative">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                To
              </label>
              <button
                id="booking-widget-dest-btn"
                onClick={() => { setDestOpen(!destOpen); setOriginOpen(false); setPassengersOpen(false); }}
                className="w-full h-14 px-3.5 bg-slate-50/70 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-slate-300 rounded-xl flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <PlaneLanding className="w-4 h-4 text-[#F7941D] shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="truncate">
                    <div className="font-bold text-slate-900 dark:text-white text-sm tracking-tight flex items-center gap-1.5">
                      <span>{destAirport.city}</span>
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-white/10 px-1.5 py-0.2 rounded">
                        {destAirport.code}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{destAirport.name}</div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              </button>

              {/* Destination Dropdown */}
              {destOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-80 sm:w-96 bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 rounded-2xl shadow-elevated z-50 p-2 max-h-80 flex flex-col animate-in fade-in">
                  <div className="p-1.5 border-b border-slate-100 dark:border-white/10">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        id="dest-search-input"
                        type="text"
                        autoFocus
                        placeholder="Type city or airport (e.g. Del, Goa, Mum)..."
                        value={destQuery}
                        onChange={(e) => setDestQuery(e.target.value)}
                        className="w-full h-9 pl-8 pr-8 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F7941D]/20"
                      />
                      {destQuery && (
                        <button onClick={() => setDestQuery('')} className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="overflow-y-auto flex-1 p-1 space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                      {destQuery ? `Matching Airports (${filteredDestAirports.length})` : 'All 79 SpiceJet Stations'}
                    </div>

                    {filteredDestAirports.length === 0 ? (
                      <div className="text-center py-4 text-xs text-slate-400">No airport found matching "{destQuery}"</div>
                    ) : (
                      filteredDestAirports.map(airport => (
                        <button
                          key={airport.code}
                          onClick={() => {
                            setSearchParams(prev => ({ ...prev, destination: airport.code }));
                            setDestOpen(false);
                            setDestQuery('');
                          }}
                          className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between hover:bg-amber-50/70 dark:hover:bg-white/5 transition-colors ${
                            searchParams.destination === airport.code ? 'bg-amber-50 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 font-semibold' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <span>{airport.city}</span>
                              <span className="font-mono text-[11px] bg-slate-100 dark:bg-white/10 px-1.5 py-0.2 rounded">
                                {airport.code}
                              </span>
                              {airport.isInternational && (
                                <span className="text-[9px] bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-1 rounded">Intl</span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[240px]">{airport.name}</div>
                          </div>
                          {searchParams.destination === airport.code && <Check className="w-4 h-4 text-[#F7941D]" />}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Departure & Return Dates */}
            <div className={`${tripType === 'roundTrip' ? 'md:col-span-3' : 'md:col-span-2'} grid ${tripType === 'roundTrip' ? 'grid-cols-2 gap-2' : 'grid-cols-1'}`}>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Departure
                </label>
                <div 
                  onClick={() => document.getElementById('booking-departure-date')?.showPicker?.()}
                  className="h-14 px-3 bg-slate-50/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center gap-2 cursor-pointer hover:border-slate-300 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                  <div className="overflow-hidden">
                    <input
                      id="booking-departure-date"
                      type="date"
                      value={searchParams.departureDate || "2026-09-20"}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, departureDate: e.target.value }))}
                      className="bg-transparent text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none w-full cursor-pointer"
                    />
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Sunday</div>
                  </div>
                </div>
              </div>

              {tripType === 'roundTrip' && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Return
                  </label>
                  <div 
                    onClick={() => document.getElementById('booking-return-date')?.showPicker?.()}
                    className="h-14 px-3 bg-slate-50/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center gap-2 cursor-pointer hover:border-slate-300 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                    <div className="overflow-hidden">
                      <input
                        id="booking-return-date"
                        type="date"
                        value={searchParams.returnDate || "2026-09-27"}
                        onChange={(e) => setSearchParams(prev => ({ ...prev, returnDate: e.target.value }))}
                        className="bg-transparent text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none w-full cursor-pointer"
                      />
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Next Sunday</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Passengers & Class Popover Trigger */}
            <div className={`${tripType === 'roundTrip' ? 'md:col-span-2' : 'md:col-span-3'} relative`}>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Passengers & Class
              </label>
              <button
                id="booking-widget-passengers-btn"
                onClick={() => { setPassengersOpen(!passengersOpen); setOriginOpen(false); setDestOpen(false); }}
                className="w-full h-14 px-3.5 bg-slate-50/70 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-slate-300 rounded-xl flex items-center justify-between text-left transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-slate-600 dark:text-slate-400 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      {totalPassengers} {totalPassengers === 1 ? 'Passenger' : 'Passengers'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Economy • INR</div>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              </button>

              {/* Passenger Count Counter Popover */}
              {passengersOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-72 bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 rounded-xl shadow-elevated z-50 p-4 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Adults</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">12+ years</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePassengerChange('adults', -1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-5 text-center font-bold text-sm text-slate-900 dark:text-white">
                        {searchParams.adults || 1}
                      </span>
                      <button
                        onClick={() => handlePassengerChange('adults', 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-white/10">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Children</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">2 - 12 years</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePassengerChange('children', -1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-5 text-center font-bold text-sm text-slate-900 dark:text-white">
                        {searchParams.children || 0}
                      </span>
                      <button
                        onClick={() => handlePassengerChange('children', 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setPassengersOpen(false)}
                    className="w-full mt-2 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Special Fares Pill Selector */}
          <div className="pt-2 border-t border-slate-100 dark:border-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Special Fare Categories
            </div>
            <div className="flex flex-wrap gap-2">
              {SPECIAL_FARES.map(fare => {
                const isSelected = searchParams.specialFare === fare.id;
                return (
                  <button
                    key={fare.id}
                    id={`booking-special-fare-${fare.id}`}
                    onClick={() => setSearchParams(prev => ({ ...prev, specialFare: fare.id }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-red-50 dark:bg-red-500/20 text-[#C30B12] dark:text-[#FF3B46] border border-[#C30B12]/30 dark:border-[#FF3B46]/30 font-semibold'
                        : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#C30B12] dark:bg-[#FF3B46]' : 'bg-slate-300 dark:bg-slate-600'}`} />
                    <span>{fare.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Action Button: Search Flight */}
          <div className="pt-2 flex justify-end">
            <button
              id="home-page-flight-cta"
              onClick={onSearch}
              className="w-full sm:w-auto px-8 h-12 rounded-xl bg-[#F7941D] hover:bg-[#E08012] text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-cta-glow hover:shadow-lg hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <span>Search Flights</span>
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: WEB CHECK-IN */}
      {/* ========================================================================= */}
      {activeTab === 'checkin' && (
        <div className="p-5 sm:p-7 space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#C30B12] dark:text-[#FF3B46]" />
              <span>Online Web Check-In & Boarding Pass</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Check in 48 hours to 60 minutes before departure for domestic flights. Generate your digital boarding pass instantly.
            </p>
          </div>

          <form onSubmit={handleCheckinSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                PNR / Booking Reference
              </label>
              <input
                id="checkin-pnr-input"
                type="text"
                required
                placeholder="e.g. SG-7K9B2M"
                value={checkinPnr}
                onChange={(e) => setCheckinPnr(e.target.value)}
                className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 text-sm font-semibold uppercase text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20"
              />
            </div>

            <div className="md:col-span-5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Email Address or Last Name
              </label>
              <input
                id="checkin-contact-input"
                type="text"
                required
                placeholder="e.g. rahul.sharma@example.com or Sharma"
                value={checkinContact}
                onChange={(e) => setCheckinContact(e.target.value)}
                className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20"
              />
            </div>

            <div className="md:col-span-2 flex items-end">
              <button
                id="checkin-submit-btn"
                type="submit"
                className="w-full h-12 rounded-xl bg-[#C30B12] hover:bg-[#A8080E] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Check-In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {checkinResult && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/20 text-slate-900 dark:text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
                  <Check className="w-3.5 h-3.5" /> {checkinResult.status}
                </div>
                <div className="font-bold text-sm">{checkinResult.passenger} • PNR: {checkinResult.pnr}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">{checkinResult.flight} • {checkinResult.route} • {checkinResult.departure}</div>
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Allocated Seat: {checkinResult.seat}</div>
              </div>

              <button
                onClick={() => onNavigate?.('confirmation')}
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold flex items-center gap-1.5 hover:opacity-90 shrink-0"
              >
                <QrCode className="w-4 h-4" />
                <span>View Boarding Pass</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: FLIGHT STATUS */}
      {/* ========================================================================= */}
      {activeTab === 'status' && (
        <div className="p-5 sm:p-7 space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#F7941D]" />
              <span>Real-Time Live Flight Status Tracker</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Check real-time arrival, departure, terminal, gate, and baggage belt information for all SpiceJet flights.
            </p>
          </div>

          <form onSubmit={handleStatusSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Flight Number
              </label>
              <input
                id="status-flight-input"
                type="text"
                required
                placeholder="e.g. SG 162"
                value={statusFlightNo}
                onChange={(e) => setStatusFlightNo(e.target.value)}
                className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 text-sm font-semibold uppercase text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F7941D]/20"
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Travel Date
              </label>
              <input
                id="status-date-input"
                type="date"
                value={statusDate}
                onChange={(e) => setStatusDate(e.target.value)}
                className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F7941D]/20"
              />
            </div>

            <div className="md:col-span-3 flex items-end">
              <button
                id="status-submit-btn"
                type="submit"
                className="w-full h-12 rounded-xl bg-[#F7941D] hover:bg-[#E08012] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-cta-glow transition-all"
              >
                <span>Track Flight</span>
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {statusResult && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{statusResult.flightNo}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">({statusResult.aircraft})</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                  ● {statusResult.status}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-slate-200/60 dark:border-white/10 pt-2">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Departure:</span>
                  <strong className="text-sm">{statusResult.departure}</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">Arrival:</span>
                  <strong className="text-sm">{statusResult.arrival}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: MANAGE BOOKING */}
      {/* ========================================================================= */}
      {activeTab === 'manage' && (
        <div className="p-5 sm:p-7 space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Manage Your Travel & Booking Services</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select seats, pre-book SpiceCafé hot meals, purchase extra baggage, download tax invoices, or modify flights.
            </p>
          </div>

          <form onSubmit={handleManageSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                PNR / Booking Reference
              </label>
              <input
                id="manage-pnr-input"
                type="text"
                required
                placeholder="e.g. SG-7K9B2M"
                value={managePnr}
                onChange={(e) => setManagePnr(e.target.value)}
                className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 text-sm font-semibold uppercase text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="md:col-span-5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Email Address or Mobile
              </label>
              <input
                id="manage-contact-input"
                type="text"
                required
                placeholder="e.g. 9876543210 or rahul@example.com"
                value={manageContact}
                onChange={(e) => setManageContact(e.target.value)}
                className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="md:col-span-2 flex items-end">
              <button
                id="manage-submit-btn"
                type="submit"
                className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Find Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {manageResult && (
            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/20 text-slate-900 dark:text-white space-y-3 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-bold text-sm">PNR: {manageResult.pnr} • {manageResult.passenger}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">{manageResult.route}</div>
                </div>
                <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                  Total Paid: {manageResult.totalFare} ({manageResult.spiceClubPoints})
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-blue-200/60 dark:border-white/10">
                <button
                  onClick={() => onNavigate?.('seats')}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 text-xs font-semibold hover:border-blue-500 transition-colors"
                >
                  Change / Upgrade Seat
                </button>
                <button
                  onClick={() => onNavigate?.('seats')}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 text-xs font-semibold hover:border-blue-500 transition-colors"
                >
                  Add SpiceCafé Meals
                </button>
                <button
                  onClick={() => alert('GST Tax invoice SG-INV-2026-0920 downloaded successfully.')}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 text-xs font-semibold hover:border-blue-500 transition-colors"
                >
                  Download Tax Invoice
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
