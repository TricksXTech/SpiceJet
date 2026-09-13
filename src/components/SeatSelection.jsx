import React, { useState } from 'react';
import { 
  Plane, 
  Sparkles, 
  Utensils, 
  Luggage, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Info,
  ShieldCheck
} from 'lucide-react';
import { SEAT_MAP_ROWS, MEAL_OPTIONS } from '../data/spicejetRealData';

export default function SeatSelection({ 
  selectedSeat, 
  setSelectedSeat, 
  selectedMeal, 
  setSelectedMeal, 
  excessBaggage, 
  setExcessBaggage, 
  onBack, 
  onProceed 
}) {
  const [activeTab, setActiveTab] = useState('seats'); // 'seats' | 'meals' | 'baggage'

  const handleSeatClick = (seatCode, price, type) => {
    if (selectedSeat?.code === seatCode) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat({ code: seatCode, price, type });
    }
  };

  const occupiedSeats = ['1B', '1C', '2E', '3A', '4C', '5D', '6A', '12B', '13E'];

  const seatCost = selectedSeat?.price || 0;
  const mealCost = selectedMeal?.price || 0;
  const baggageCost = excessBaggage?.price || 0;
  const addOnsTotal = seatCost + mealCost + baggageCost;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Category Tabs: Seats, Meals, Baggage */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('seats')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'seats'
              ? 'bg-[#C30B12] text-white shadow-brand-glow'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Plane className="w-4 h-4" />
          <span>Seat Selection {selectedSeat && `(${selectedSeat.code})`}</span>
        </button>

        <button
          onClick={() => setActiveTab('meals')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'meals'
              ? 'bg-[#C30B12] text-white shadow-brand-glow'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>SpiceCafé Meals {selectedMeal && '✓'}</span>
        </button>

        <button
          onClick={() => setActiveTab('baggage')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'baggage'
              ? 'bg-[#C30B12] text-white shadow-brand-glow'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Luggage className="w-4 h-4" />
          <span>Excess Baggage {excessBaggage && '✓'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          
          {activeTab === 'seats' && (
            <div className="bg-white rounded-2xl p-6 shadow-resting border border-slate-200/90 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900">Aircraft Cabin Seat Map</h3>
                  <p className="text-xs text-slate-500">Boeing 737-800 • 3x3 Seating Configuration</p>
                </div>

                {/* Seat Legend */}
                <div className="flex items-center gap-3 text-xs flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-amber-100 border border-[#F7941D]" />
                    <span className="text-slate-600">SpiceMax (₹1,200)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-blue-50 border border-blue-300" />
                    <span className="text-slate-600">Preferred (₹450)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300" />
                    <span className="text-slate-600">Standard (₹250)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-slate-300 border border-slate-400" />
                    <span className="text-slate-400">Occupied</span>
                  </div>
                </div>
              </div>

              {/* Cabin Shell */}
              <div className="max-w-md mx-auto bg-slate-50 border-2 border-slate-200 rounded-3xl p-4 sm:p-6 relative">
                
                {/* Airplane Nose / Cockpit indicator */}
                <div className="text-center pb-4 mb-4 border-b border-slate-200">
                  <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                    ▲ FRONT OF AIRCRAFT / COCKPIT
                  </span>
                </div>

                {/* Column Headers: A B C [Aisle] D E F */}
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-xs font-bold text-slate-400 mb-3">
                  <div>A</div>
                  <div>B</div>
                  <div>C</div>
                  <div className="text-[10px] text-slate-300 flex items-center justify-center">AISLE</div>
                  <div>D</div>
                  <div>E</div>
                  <div>F</div>
                </div>

                {/* Seat Rows */}
                <div className="space-y-2">
                  {SEAT_MAP_ROWS.map((rowItem) => {
                    const rowNum = rowItem.row;
                    const isSpiceMax = rowItem.type === 'spicemax';
                    const isPreferred = rowItem.type === 'preferred';
                    const isExit = rowItem.type === 'exit';

                    return (
                      <div key={rowNum} className="grid grid-cols-7 gap-1.5 sm:gap-2 items-center">
                        {['A', 'B', 'C'].map((col) => {
                          const seatCode = `${rowNum}${col}`;
                          const isOccupied = occupiedSeats.includes(seatCode);
                          const isSelected = selectedSeat?.code === seatCode;

                          let seatColor = 'bg-white border-slate-300 hover:border-slate-500 text-slate-700';
                          if (isSpiceMax) seatColor = 'bg-amber-50 border-[#F7941D] hover:bg-amber-100 text-amber-900';
                          if (isPreferred) seatColor = 'bg-blue-50 border-blue-300 hover:bg-blue-100 text-blue-900';
                          if (isExit) seatColor = 'bg-emerald-50 border-emerald-400 hover:bg-emerald-100 text-emerald-900';
                          if (isOccupied) seatColor = 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed';
                          if (isSelected) seatColor = 'bg-[#C30B12] border-[#C30B12] text-white font-bold shadow-sm';

                          return (
                            <button
                              key={seatCode}
                              disabled={isOccupied}
                              onClick={() => handleSeatClick(seatCode, rowItem.price, rowItem.type)}
                              className={`h-9 rounded-lg border text-xs font-mono transition-all flex items-center justify-center ${seatColor}`}
                              title={isOccupied ? `${seatCode} (Occupied)` : `${seatCode} (₹${rowItem.price})`}
                            >
                              {col}
                            </button>
                          );
                        })}

                        {/* Row Number in Aisle */}
                        <div className="text-center font-bold text-xs text-slate-400 font-mono">
                          {rowNum}
                        </div>

                        {['D', 'E', 'F'].map((col) => {
                          const seatCode = `${rowNum}${col}`;
                          const isOccupied = occupiedSeats.includes(seatCode);
                          const isSelected = selectedSeat?.code === seatCode;

                          let seatColor = 'bg-white border-slate-300 hover:border-slate-500 text-slate-700';
                          if (isSpiceMax) seatColor = 'bg-amber-50 border-[#F7941D] hover:bg-amber-100 text-amber-900';
                          if (isPreferred) seatColor = 'bg-blue-50 border-blue-300 hover:bg-blue-100 text-blue-900';
                          if (isExit) seatColor = 'bg-emerald-50 border-emerald-400 hover:bg-emerald-100 text-emerald-900';
                          if (isOccupied) seatColor = 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed';
                          if (isSelected) seatColor = 'bg-[#C30B12] border-[#C30B12] text-white font-bold shadow-sm';

                          return (
                            <button
                              key={seatCode}
                              disabled={isOccupied}
                              onClick={() => handleSeatClick(seatCode, rowItem.price, rowItem.type)}
                              className={`h-9 rounded-lg border text-xs font-mono transition-all flex items-center justify-center ${seatColor}`}
                              title={isOccupied ? `${seatCode} (Occupied)` : `${seatCode} (₹${rowItem.price})`}
                            >
                              {col}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                <div className="text-center pt-4 mt-4 border-t border-slate-200 text-[11px] text-slate-400">
                  ▼ REAR OF AIRCRAFT & GALLEY
                </div>
              </div>
            </div>
          )}

          {activeTab === 'meals' && (
            <div className="bg-white rounded-2xl p-6 shadow-resting border border-slate-200/90 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-slate-900">SpiceCafé Gourmet Pre-book Meals</h3>
                <p className="text-xs text-slate-500">Freshly prepared inflight meal served hot at 30,000 feet</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MEAL_OPTIONS.map((meal) => {
                  const isSelected = selectedMeal?.id === meal.id;
                  return (
                    <div
                      key={meal.id}
                      onClick={() => setSelectedMeal(isSelected ? null : meal)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-50/70 border-[#F7941D] shadow-sm ring-1 ring-[#F7941D]'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                          meal.type === 'veg' ? 'border-emerald-600' : 'border-red-600'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${meal.type === 'veg' ? 'bg-emerald-600' : 'bg-red-600'}`} />
                        </span>
                        <span className="font-mono font-bold text-sm text-slate-900">₹ {meal.price}</span>
                      </div>
                      <div className="font-bold text-xs text-slate-900">{meal.name}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{meal.calories}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'baggage' && (
            <div className="bg-white rounded-2xl p-6 shadow-resting border border-slate-200/90 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-slate-900">Excess Baggage Allowance</h3>
                <p className="text-xs text-slate-500">Pre-book extra baggage up to 6 hours before departure and save up to 40%</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'bag-5', weight: '5 kg Extra', price: 1900 },
                  { id: 'bag-10', weight: '10 kg Extra', price: 3700 },
                  { id: 'bag-15', weight: '15 kg Extra', price: 5400 },
                ].map(item => {
                  const isSelected = excessBaggage?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setExcessBaggage(isSelected ? null : item)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all text-center ${
                        isSelected
                          ? 'bg-red-50/70 border-[#C30B12] shadow-sm ring-1 ring-[#C30B12]'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <Luggage className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                      <div className="font-bold text-sm text-slate-900">{item.weight}</div>
                      <div className="font-mono font-bold text-sm text-[#C30B12] mt-1">₹ {item.price.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-emerald-600 font-medium mt-1">Save ₹600 vs Airport</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6">
            <button
              id="seats-back-btn"
              onClick={onBack}
              className="h-11 px-5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-semibold text-slate-700 flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Passengers</span>
            </button>

            <button
              id="seats-proceed-btn"
              onClick={onProceed}
              className="h-12 px-7 rounded-xl bg-[#F7941D] hover:bg-[#E08012] text-slate-950 font-bold text-sm flex items-center gap-2 shadow-cta-glow transition-all hover:-translate-y-0.5"
            >
              <span>Proceed to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right Column: Selected Add-ons Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl p-5 shadow-elevated border border-slate-200/90 space-y-4 sticky top-24">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Selected Add-ons</h3>
              <p className="text-xs text-slate-500">Customized flight preferences</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Assigned Seat</div>
                  <div className="text-slate-500">{selectedSeat ? `${selectedSeat.code} (${selectedSeat.type})` : 'None selected'}</div>
                </div>
                <div className="font-mono font-bold text-slate-900">
                  {selectedSeat ? `₹ ${selectedSeat.price}` : 'Free'}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">SpiceCafé Meal</div>
                  <div className="text-slate-500">{selectedMeal ? selectedMeal.name : 'None selected'}</div>
                </div>
                <div className="font-mono font-bold text-slate-900">
                  {selectedMeal ? `₹ ${selectedMeal.price}` : '₹ 0'}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">Pre-booked Baggage</div>
                  <div className="text-slate-500">{excessBaggage ? excessBaggage.weight : 'Standard 15kg'}</div>
                </div>
                <div className="font-mono font-bold text-slate-900">
                  {excessBaggage ? `₹ ${excessBaggage.price}` : '₹ 0'}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <span className="text-xs text-slate-500">Add-ons Subtotal:</span>
              <span className="font-mono font-bold text-base text-slate-900">₹ {addOnsTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
