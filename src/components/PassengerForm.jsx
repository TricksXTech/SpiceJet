import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  ArrowLeft,
  Info
} from 'lucide-react';
import { getPriceBreakdown } from '../data/spicejetRealData';

export default function PassengerForm({ 
  flightData, 
  passengerDetails, 
  setPassengerDetails, 
  selectedFareType = 'saver',
  onBack, 
  onProceed 
}) {
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [hasGst, setHasGst] = useState(false);
  const [gstDetails, setGstDetails] = useState({ number: '', company: '' });

  const selectedFare = flightData?.fares?.[selectedFareType] || flightData?.fares?.saver;
  const farePrice = selectedFare?.price || 22301;
  const breakdown = getPriceBreakdown(farePrice);

  const insuranceCost = includeInsurance ? 249 : 0;
  const totalPrice = breakdown.totalFare + insuranceCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    onProceed();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Passenger & Contact Details Form */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Primary Passenger / Contact Information Card */}
            <div className="bg-white dark:bg-[#1C1D24] rounded-2xl p-5 sm:p-6 shadow-resting border border-slate-200/90 dark:border-white/10 space-y-4 transition-colors">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/15 text-[#C30B12] dark:text-[#FF3B46] flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">Passenger & Contact Details</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Booking confirmation and e-ticket will be sent here</p>
                  </div>
                </div>

                <span className="text-[11px] bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-medium">
                  Adult 1 (Primary)
                </span>
              </div>

              {/* Title, First Name, Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Title *
                  </label>
                  <select
                    id="passenger-title-select"
                    value={passengerDetails.title}
                    onChange={(e) => setPassengerDetails(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full h-11 px-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold text-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="Mr" className="dark:bg-[#1C1D24]">Mr.</option>
                    <option value="Mrs" className="dark:bg-[#1C1D24]">Mrs.</option>
                    <option value="Ms" className="dark:bg-[#1C1D24]">Ms.</option>
                  </select>
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    First & Middle Name *
                  </label>
                  <input
                    id="passenger-firstname-input"
                    type="text"
                    required
                    placeholder="As on Govt ID (e.g. Rahul)"
                    value={passengerDetails.firstName}
                    onChange={(e) => setPassengerDetails(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full h-11 px-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Last Name *
                  </label>
                  <input
                    id="passenger-lastname-input"
                    type="text"
                    required
                    placeholder="e.g. Sharma"
                    value={passengerDetails.lastName}
                    onChange={(e) => setPassengerDetails(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full h-11 px-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20"
                  />
                </div>
              </div>

              {/* Mobile, Email, Town/City */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Mobile Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-xs font-semibold">
                      +91
                    </span>
                    <input
                      id="passenger-mobile-input"
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={passengerDetails.mobile}
                      onChange={(e) => setPassengerDetails(prev => ({ ...prev, mobile: e.target.value }))}
                      className="w-full h-11 px-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-r-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="passenger-email-input"
                    type="email"
                    required
                    placeholder="e.g. rahul.sharma@example.com"
                    value={passengerDetails.email}
                    onChange={(e) => setPassengerDetails(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full h-11 px-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    City / Town *
                  </label>
                  <input
                    id="passenger-city-input"
                    type="text"
                    required
                    placeholder="e.g. New Delhi"
                    value={passengerDetails.city}
                    onChange={(e) => setPassengerDetails(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full h-11 px-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* SpiceClub Loyalty Membership Number */}
              <div className="pt-2">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  SpiceClub Member ID (Optional)
                </label>
                <div className="relative">
                  <input
                    id="passenger-spiceclub-input"
                    type="text"
                    placeholder="Enter 10-digit SpiceClub ID to earn points"
                    value={passengerDetails.spiceClubId}
                    onChange={(e) => setPassengerDetails(prev => ({ ...prev, spiceClubId: e.target.value }))}
                    className="w-full h-11 px-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20"
                  />
                  <span className="absolute right-3 top-3 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                    +450 Points
                  </span>
                </div>
              </div>
            </div>

            {/* Travel Insurance Card */}
            <div className="bg-white dark:bg-[#1C1D24] rounded-2xl p-5 shadow-resting border border-slate-200/90 dark:border-white/10 space-y-3 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">SpiceJet Comprehensive Travel Protection</h3>
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Covers flight delays, trip cancellation, emergency medical expenses up to ₹2,50,000, and lost baggage.
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    className="w-5 h-5 rounded text-[#C30B12] dark:text-[#FF3B46] border-slate-300"
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">₹ 249</span>
                </label>
              </div>
            </div>

            {/* GST Number for Business Invoicing */}
            <div className="bg-white dark:bg-[#1C1D24] rounded-2xl p-5 shadow-resting border border-slate-200/90 dark:border-white/10 space-y-3 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Add GST Details for Business Invoicing</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasGst}
                  onChange={(e) => setHasGst(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C30B12] dark:text-[#FF3B46] border-slate-300"
                />
              </div>

              {hasGst && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-white/10">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">GST Registration Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 07AAAAA0000A1Z5"
                      value={gstDetails.number}
                      onChange={(e) => setGstDetails(prev => ({ ...prev, number: e.target.value }))}
                      className="w-full h-10 px-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Registered Company Name</label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={gstDetails.company}
                      onChange={(e) => setGstDetails(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full h-10 px-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                id="passenger-back-btn"
                onClick={onBack}
                className="h-11 px-5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 bg-white dark:bg-white/5 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-all shadow-resting"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Flights</span>
              </button>

              <button
                type="submit"
                id="passenger-proceed-btn"
                className="h-12 px-7 rounded-xl bg-[#F7941D] hover:bg-[#E08012] text-slate-950 font-bold text-sm flex items-center gap-2 shadow-cta-glow transition-all hover:-translate-y-0.5"
              >
                <span>Proceed to Add-ons & Seats</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Trip Summary & Live Tax Breakdown */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-[#1C1D24] rounded-2xl p-5 shadow-elevated border border-slate-200/90 dark:border-white/10 space-y-4 sticky top-24 transition-colors">
            
            <div className="border-b border-slate-100 dark:border-white/10 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Fare & Tax Summary</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Live SpiceJet official tariff breakdown</p>
            </div>

            {/* Flight summary */}
            <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                <span>{flightData?.flightNumber || 'SG 162'} • {selectedFare?.name || 'SpiceSaver'}</span>
                <span className="text-[#C30B12] dark:text-[#FF3B46]">{flightData?.origin} → {flightData?.destination}</span>
              </div>
              <div className="text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Sun, 20 Sep 2026</span>
                <span>{flightData?.departureTime || '19:55'} - {flightData?.arrivalTime || '22:40'}</span>
              </div>
            </div>

            {/* Itemized taxes */}
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-white/10 pb-3">
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span className="font-semibold text-slate-900 dark:text-white">₹ {breakdown.baseFare.toLocaleString('en-IN')}</span>
              </div>

              {breakdown.taxes.map(tax => (
                <div key={tax.code} className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    {tax.label}
                    <span className="text-[10px] text-slate-400 font-mono">({tax.code})</span>
                  </span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">₹ {tax.amount}</span>
                </div>
              ))}

              {includeInsurance && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                  <span>Travel Protection Insurance</span>
                  <span className="font-mono">₹ 249</span>
                </div>
              )}
            </div>

            {/* Total Payable */}
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Total Amount Payable</div>
                <div className="text-[11px] text-slate-400">All taxes included</div>
              </div>
              <div className="text-2xl font-bold font-mono text-[#C30B12] dark:text-[#FF3B46] tracking-tight">
                ₹ {totalPrice.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Instant PNR confirmation upon payment. Free baggage included.</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
