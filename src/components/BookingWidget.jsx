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
  X
} from 'lucide-react';
import { AIRPORTS, SPECIAL_FARES } from '../data/spicejetRealData';

export default function BookingWidget({ 
  searchParams, 
  setSearchParams, 
  onSearch 
}) {
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('oneWay');
  const [originOpen, setOriginOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [passengersOpen, setPassengersOpen] = useState(false);
  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');

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

  // Filter 79 real airports by search query (city, code, or name)
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

      <div className="p-4 sm:p-6 space-y-5">
        
        {/* Trip Type Selector & Direct Flights Only */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTripType('oneWay')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                tripType === 'oneWay'
                  ? 'bg-white dark:bg-[#1C1D24] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              One Way
            </button>
            <button
              onClick={() => setTripType('roundTrip')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                tripType === 'roundTrip'
                  ? 'bg-white dark:bg-[#1C1D24] text-slate-900 dark:text-white shadow-sm'
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
              onClick={() => { setOriginOpen(!originOpen); setDestOpen(false); }}
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
                {/* Search Field */}
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

                {/* Airport Results List */}
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

          {/* Swap Button */}
          <div className="hidden md:flex md:col-span-1 items-end justify-center pb-2">
            <button
              id="booking-widget-swap-btn"
              onClick={handleSwapAirports}
              aria-label="Swap origin and destination"
              className="w-9 h-9 rounded-full bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 hover:border-[#C30B12] shadow-sm hover:shadow flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#C30B12] dark:hover:text-[#FF3B46] hover:rotate-180 transition-all duration-300"
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
              onClick={() => { setDestOpen(!destOpen); setOriginOpen(false); }}
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

            {/* Destination Dropdown with Real-Time Text Search Filter */}
            {destOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-80 sm:w-96 bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 rounded-2xl shadow-elevated z-50 p-2 max-h-80 flex flex-col animate-in fade-in">
                {/* Search Field */}
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

                {/* Airport Results List */}
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

          {/* Departure Date Picker */}
          <div className="md:col-span-2">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Departure
            </label>
            <div className="h-14 px-3.5 bg-slate-50/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              <div>
                <input
                  type="date"
                  value={searchParams.departureDate || "2026-09-20"}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, departureDate: e.target.value }))}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none w-full cursor-pointer"
                />
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Sunday</div>
              </div>
            </div>
          </div>

          {/* Passengers & Class Popover Trigger */}
          <div className="md:col-span-3 relative">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Passengers & Class
            </label>
            <button
              id="booking-widget-passengers-btn"
              onClick={() => setPassengersOpen(!passengersOpen)}
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
            <span>Search Flight</span>
          </button>
        </div>

      </div>
    </div>
  );
}
