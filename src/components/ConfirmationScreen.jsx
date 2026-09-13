import React from 'react';
import { 
  CheckCircle2, 
  Download, 
  Share2, 
  Printer, 
  Calendar, 
  Clock, 
  Plane, 
  QrCode, 
  Luggage, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { BRAND_ASSETS } from '../data/spicejetRealData';

export default function ConfirmationScreen({ 
  flightData, 
  passengerDetails, 
  selectedSeat, 
  onBookAnother 
}) {
  const pnr = "SG-7K9B2M";
  const passengerName = `${passengerDetails.title}. ${passengerDetails.firstName} ${passengerDetails.lastName}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Success Celebration Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-emerald-100 text-center space-y-3 relative overflow-hidden">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Booking Confirmed & Ticket Issued
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Have a wonderful flight, {passengerDetails.firstName || 'Traveler'}!
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          We have sent your confirmation email and electronic boarding ticket to <strong className="text-slate-800">{passengerDetails.email || 'your email'}</strong>.
        </p>

        {/* PNR Code Pill */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-3 bg-slate-100/90 border border-slate-200 px-5 py-2.5 rounded-2xl">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Booking Reference / PNR</span>
            <span className="font-mono text-xl font-bold text-[#C30B12] tracking-wider select-all">
              {pnr}
            </span>
          </div>
        </div>
      </div>

      {/* SaaS Digital Boarding Pass Card */}
      <div className="bg-white rounded-3xl shadow-elevated-hover border border-slate-200 overflow-hidden">
        
        {/* Pass Top Banner */}
        <div className="bg-gradient-to-r from-[#C30B12] to-[#A8080E] text-white p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={BRAND_ASSETS.logoUrl} 
              alt="SpiceJet" 
              className="h-7 w-auto brightness-0 invert" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="text-xs font-semibold tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded">
              Boarding Pass
            </span>
          </div>

          <div className="text-right">
            <div className="text-xs text-white/80">Flight Number</div>
            <div className="font-mono font-bold text-lg text-white">SG 162</div>
          </div>
        </div>

        {/* Pass Flight Itinerary & Gate Info */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-100 pb-6">
            
            {/* Origin */}
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">DEL</div>
              <div className="text-sm font-semibold text-slate-700">Delhi</div>
              <div className="text-xs text-slate-400 mt-1">Terminal 3 • Gate 14B</div>
              <div className="text-lg font-bold font-mono text-[#C30B12] mt-1">19:55</div>
            </div>

            {/* Flight Path Graphic */}
            <div className="flex flex-col items-center px-4 w-full sm:w-auto">
              <span className="text-xs font-semibold text-slate-400">2h 45m (Non-stop)</span>
              <div className="w-full sm:w-48 h-0.5 bg-slate-200 relative my-2">
                <Plane className="w-4 h-4 text-[#C30B12] absolute left-1/2 -top-2 -translate-x-1/2" />
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                On Schedule
              </span>
            </div>

            {/* Destination */}
            <div className="text-left sm:text-right">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">BOM</div>
              <div className="text-sm font-semibold text-slate-700">Mumbai</div>
              <div className="text-xs text-slate-400 mt-1">Terminal 2</div>
              <div className="text-lg font-bold font-mono text-[#C30B12] mt-1">22:40</div>
            </div>

          </div>

          {/* Passenger & Seat Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">Passenger Name</span>
              <span className="font-bold text-slate-900 text-sm">{passengerName}</span>
            </div>

            <div>
              <span className="text-slate-400 block mb-0.5">Assigned Seat</span>
              <span className="font-mono font-bold text-[#C30B12] text-sm">
                {selectedSeat?.code || '2A (SpiceMax)'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block mb-0.5">Boarding Time</span>
              <span className="font-mono font-bold text-slate-900 text-sm">19:15 hrs</span>
            </div>

            <div>
              <span className="text-slate-400 block mb-0.5">Baggage</span>
              <span className="font-bold text-slate-900 text-sm">15kg Check-in + 7kg Cabin</span>
            </div>
          </div>

          {/* Barcode / QR Scan Simulation */}
          <div className="border-t border-dashed border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-900 p-1.5 rounded-xl flex items-center justify-center text-white shrink-0">
                <QrCode className="w-12 h-12" />
              </div>
              <div className="text-xs text-slate-500">
                <p className="font-semibold text-slate-900">Security Fast-Track Code</p>
                <p>Present at Delhi Airport (DEL) T3 e-Gates for seamless boarding</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="h-10 px-4 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Ticket</span>
              </button>

              <button
                onClick={() => alert('Downloaded E-Ticket PDF')}
                className="h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Return Home Button */}
      <div className="text-center pt-2">
        <button
          id="confirmation-home-btn"
          onClick={onBookAnother}
          className="h-12 px-8 rounded-xl bg-[#F7941D] hover:bg-[#E08012] text-slate-950 font-bold text-sm inline-flex items-center gap-2 shadow-cta-glow transition-all hover:-translate-y-0.5"
        >
          <span>Book Another Flight</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
