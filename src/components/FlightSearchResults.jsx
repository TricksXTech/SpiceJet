import React, { useState } from 'react';
import { 
  Plane, 
  ArrowRight, 
  Clock, 
  Luggage, 
  Utensils, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { REAL_FLIGHTS, AIRPORTS } from '../data/spicejetRealData';

export default function FlightSearchResults({ 
  searchParams, 
  selectedFlight, 
  selectedFareType, 
  onSelectFlightFare, 
  onContinue,
  onModifySearch 
}) {
  const [expandedFlightId, setExpandedFlightId] = useState('SG-162');
  const [selectedDateIndex, setSelectedDateIndex] = useState(1);

  // 7-day carousel data
  const dateCarousel = [
    { date: "Sat, 19 Sep", price: 19200 },
    { date: "Sun, 20 Sep", price: 18450, selected: true },
    { date: "Mon, 21 Sep", price: 21300 },
    { date: "Tue, 22 Sep", price: 17950, lowest: true },
    { date: "Wed, 23 Sep", price: 19800 },
    { date: "Thu, 24 Sep", price: 20400 },
    { date: "Fri, 25 Sep", price: 22100 }
  ];

  const originAirport = AIRPORTS.find(a => a.code === searchParams.origin) || AIRPORTS[0];
  const destAirport = AIRPORTS.find(a => a.code === searchParams.destination) || AIRPORTS[1];

  const activeFlight = REAL_FLIGHTS.find(f => f.id === selectedFlight) || REAL_FLIGHTS[0];
  const activeFare = activeFlight.fares[selectedFareType] || activeFlight.fares.saver;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Route Summary & Modify Search Bar */}
      <div className="bg-white rounded-xl shadow-resting border border-slate-200/90 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-900">{originAirport.city}</span>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              {originAirport.code}
            </span>
            <ArrowRight className="w-4 h-4 text-[#C30B12]" />
            <span className="text-xl font-bold text-slate-900">{destAirport.city}</span>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              {destAirport.code}
            </span>
          </div>

          <div className="hidden sm:block h-5 w-px bg-slate-200" />

          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-800">Sun, 20 Sep 2026</span> • 1 Passenger • Economy
          </div>
        </div>

        <button
          id="search-results-modify-btn"
          onClick={onModifySearch}
          className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          <span>Modify Search</span>
        </button>
      </div>

      {/* 7-Day Fare Carousel */}
      <div className="bg-white rounded-xl shadow-resting border border-slate-200/90 p-2 overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {dateCarousel.map((item, idx) => (
            <button
              key={item.date}
              onClick={() => setSelectedDateIndex(idx)}
              className={`flex-1 min-w-[120px] p-3 rounded-lg text-center transition-all ${
                selectedDateIndex === idx
                  ? 'bg-red-50/90 border-2 border-[#C30B12] shadow-xs'
                  : 'border border-slate-100 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className="text-xs font-medium text-slate-500 mb-0.5">{item.date}</div>
              <div className="text-sm font-bold font-mono tracking-tight text-slate-900">
                ₹ {item.price.toLocaleString('en-IN')}
              </div>
              {item.lowest && (
                <div className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 rounded px-1.5 py-0.2 mt-1 inline-block">
                  Lowest Fare
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Flight Cards Listing */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing <strong>3</strong> Direct flights from Delhi to Mumbai</span>
          <span className="text-slate-400">Prices include all mandatory taxes & fees</span>
        </div>

        {REAL_FLIGHTS.map((flight) => {
          const isExpanded = expandedFlightId === flight.id;
          const isSelectedFlight = selectedFlight === flight.id;

          return (
            <div
              key={flight.id}
              id={`flight-card-${flight.id}`}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                isSelectedFlight
                  ? 'border-[#C30B12] shadow-elevated ring-1 ring-[#C30B12]/20'
                  : 'border-slate-200/90 shadow-resting hover:shadow-elevated hover:border-slate-300'
              }`}
            >
              {/* Flight Summary Row */}
              <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Flight Info & Times */}
                <div className="flex items-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap">
                  {/* Airline Badge */}
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    <Plane className="w-6 h-6 text-[#C30B12] -rotate-45" />
                  </div>

                  {/* Flight & Aircraft */}
                  <div>
                    <div className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-2">
                      <span>{flight.flightNumber}</span>
                      <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-1.5 py-0.5 rounded-full">
                        {flight.onTimePercentage} On-time
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">{flight.aircraft}</div>
                  </div>

                  {/* Departure */}
                  <div className="text-left">
                    <div className="text-xl font-bold font-mono text-slate-900 tracking-tight">
                      {flight.departureTime}
                    </div>
                    <div className="text-xs font-semibold text-slate-700">{flight.origin}</div>
                    <div className="text-[10px] text-slate-400">{flight.originTerminal}</div>
                  </div>

                  {/* Duration & Route */}
                  <div className="flex flex-col items-center px-2">
                    <span className="text-[11px] font-medium text-slate-400">{flight.duration}</span>
                    <div className="w-20 sm:w-28 h-0.5 bg-slate-200 relative my-1">
                      <div className="w-2 h-2 rounded-full bg-[#C30B12] absolute left-0 -top-[3px]" />
                      <div className="w-2 h-2 rounded-full bg-[#F7941D] absolute right-0 -top-[3px]" />
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                      {flight.stops}
                    </span>
                  </div>

                  {/* Arrival */}
                  <div className="text-left">
                    <div className="text-xl font-bold font-mono text-slate-900 tracking-tight">
                      {flight.arrivalTime}
                    </div>
                    <div className="text-xs font-semibold text-slate-700">{flight.destination}</div>
                    <div className="text-[10px] text-slate-400">{flight.destinationTerminal}</div>
                  </div>
                </div>

                {/* Starting Price & Expand/Collapse */}
                <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400">Starting from</div>
                    <div className="text-xl font-bold font-mono text-slate-900 tracking-tight">
                      ₹ {flight.fares.saver.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    id={`toggle-fares-${flight.id}`}
                    onClick={() => setExpandedFlightId(isExpanded ? null : flight.id)}
                    className="h-10 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all"
                  >
                    <span>{isExpanded ? 'Hide Fares' : 'View Fares'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Fare Tiers (SpiceSaver, SpiceFlex, SpiceMax) */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5 animate-in fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    
                    {/* SpiceSaver Tier */}
                    <div 
                      onClick={() => onSelectFlightFare(flight.id, 'saver')}
                      className={`cursor-pointer rounded-xl p-4 border transition-all relative ${
                        isSelectedFlight && selectedFareType === 'saver'
                          ? 'bg-white border-[#C30B12] shadow-elevated ring-2 ring-[#C30B12]/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-slate-900">SpiceSaver</span>
                        <input
                          type="radio"
                          name={`fare-${flight.id}`}
                          checked={isSelectedFlight && selectedFareType === 'saver'}
                          onChange={() => onSelectFlightFare(flight.id, 'saver')}
                          className="w-4 h-4 text-[#C30B12] focus:ring-[#C30B12]"
                        />
                      </div>
                      <div className="text-xl font-bold font-mono text-slate-900 tracking-tight mb-3">
                        ₹ {flight.fares.saver.price.toLocaleString('en-IN')}
                      </div>
                      <ul className="text-xs text-slate-600 space-y-2">
                        <li className="flex items-center gap-2">
                          <Luggage className="w-3.5 h-3.5 text-slate-400" />
                          <span>Cabin 7kg + Check-in 15kg</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-slate-400">🪑</span>
                          <span>Standard Seat Selection</span>
                        </li>
                        <li className="flex items-center gap-2 text-slate-400">
                          <Utensils className="w-3.5 h-3.5" />
                          <span>Snacks available on purchase</span>
                        </li>
                      </ul>
                    </div>

                    {/* SpiceFlex Tier */}
                    <div 
                      onClick={() => onSelectFlightFare(flight.id, 'flex')}
                      className={`cursor-pointer rounded-xl p-4 border transition-all relative ${
                        isSelectedFlight && selectedFareType === 'flex'
                          ? 'bg-white border-[#C30B12] shadow-elevated ring-2 ring-[#C30B12]/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-slate-900">SpiceFlex</span>
                          <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-semibold">Flexible</span>
                        </div>
                        <input
                          type="radio"
                          name={`fare-${flight.id}`}
                          checked={isSelectedFlight && selectedFareType === 'flex'}
                          onChange={() => onSelectFlightFare(flight.id, 'flex')}
                          className="w-4 h-4 text-[#C30B12] focus:ring-[#C30B12]"
                        />
                      </div>
                      <div className="text-xl font-bold font-mono text-slate-900 tracking-tight mb-3">
                        ₹ {flight.fares.flex.price.toLocaleString('en-IN')}
                      </div>
                      <ul className="text-xs text-slate-600 space-y-2">
                        <li className="flex items-center gap-2 text-emerald-700 font-medium">
                          <Check className="w-3.5 h-3.5" />
                          <span>Zero Change Fee</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-slate-400" />
                          <span>Complimentary standard seat</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Utensils className="w-3.5 h-3.5 text-slate-400" />
                          <span>Free snack sandwich</span>
                        </li>
                      </ul>
                    </div>

                    {/* SpiceMax Tier (Featured) */}
                    <div 
                      onClick={() => onSelectFlightFare(flight.id, 'max')}
                      className={`cursor-pointer rounded-xl p-4 border transition-all relative ${
                        isSelectedFlight && selectedFareType === 'max'
                          ? 'bg-amber-50/50 border-[#F7941D] shadow-elevated ring-2 ring-[#F7941D]/30'
                          : 'bg-white border-amber-200 hover:border-[#F7941D]'
                      }`}
                    >
                      <div className="absolute -top-2.5 right-4 bg-[#F7941D] text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        Extra Legroom & Meal
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#F7941D]" /> SpiceMax
                        </span>
                        <input
                          type="radio"
                          name={`fare-${flight.id}`}
                          checked={isSelectedFlight && selectedFareType === 'max'}
                          onChange={() => onSelectFlightFare(flight.id, 'max')}
                          className="w-4 h-4 text-[#F7941D] focus:ring-[#F7941D]"
                        />
                      </div>
                      <div className="text-xl font-bold font-mono text-slate-900 tracking-tight mb-3">
                        ₹ {flight.fares.max.price.toLocaleString('en-IN')}
                      </div>
                      <ul className="text-xs text-slate-700 space-y-2">
                        <li className="flex items-center gap-2 text-amber-900 font-semibold">
                          <Check className="w-3.5 h-3.5 text-[#F7941D]" />
                          <span>Extra legroom seat (up to 34" pitch)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#F7941D]" />
                          <span>Complimentary hot gourmet meal</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#F7941D]" />
                          <span>Priority boarding & baggage handling</span>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Bar for Selection Confirmation & Next Step */}
      <div className="sticky bottom-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-elevated-hover border border-slate-200/90 p-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500">Selected Flight & Fare:</div>
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>{activeFlight.flightNumber} ({activeFlight.origin} → {activeFlight.destination})</span>
            <span className="text-xs font-semibold bg-red-100/70 text-[#C30B12] px-2 py-0.5 rounded-full">
              {activeFare.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[11px] text-slate-400">Total Payable:</div>
            <div className="text-xl font-bold font-mono text-slate-900 tracking-tight">
              ₹ {activeFare.price.toLocaleString('en-IN')}
            </div>
          </div>

          <button
            id="flight-results-continue-btn"
            onClick={onContinue}
            className="h-12 px-6 rounded-xl bg-[#F7941D] hover:bg-[#E08012] text-slate-950 font-bold text-sm flex items-center gap-2 shadow-cta-glow transition-all hover:-translate-y-0.5"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
