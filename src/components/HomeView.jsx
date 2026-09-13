import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Crown, 
  Utensils, 
  Coffee, 
  Plane, 
  Tag, 
  ArrowRight,
  Tv,
  Box,
  KeyRound,
  FileCheck
} from 'lucide-react';
import BookingWidget from './BookingWidget';
import { BRAND_ASSETS } from '../data/spicejetRealData';

export default function HomeView({ searchParams, setSearchParams, onSearch }) {
  const quickServices = [
    { title: 'SpiceMax', desc: 'Extra legroom & meal', icon: Crown, color: 'text-amber-600 bg-amber-50' },
    { title: 'SpiceCafé', desc: 'Pre-book hot meals', icon: Coffee, color: 'text-red-600 bg-red-50' },
    { title: 'You1st', desc: 'Priority baggage & check-in', icon: Sparkles, color: 'text-blue-600 bg-blue-50' },
    { title: 'Visa Services', desc: 'Fast-track international', icon: FileCheck, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'SpiceLock', desc: 'Hold fare for 48h', icon: KeyRound, color: 'text-purple-600 bg-purple-50' },
    { title: 'SpiceScreen', desc: 'Free inflight media', icon: Tv, color: 'text-rose-600 bg-rose-50' },
  ];

  return (
    <div className="space-y-10 pb-12">
      
      {/* Hero Section with subtle ambient gradient & Booking Widget */}
      <section className="relative pt-6 pb-4 sm:pt-10 sm:pb-8 overflow-hidden bg-gradient-to-b from-red-50/40 via-white to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#C30B12] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> India’s Most Affordable High-Frequency Airline
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Fly Red. Hot. <span className="text-[#C30B12]">Spicy.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Direct domestic & international flight connections with real-time fares, zero hidden fees, and premier comfort.
            </p>
          </div>

          {/* Core Booking Engine Widget */}
          <div className="max-w-5xl mx-auto">
            <BookingWidget 
              searchParams={searchParams} 
              setSearchParams={setSearchParams} 
              onSearch={onSearch} 
            />
          </div>

        </div>
      </section>

      {/* Quick Access Services Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickServices.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.title} 
                className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-resting hover:shadow-elevated transition-all group cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-lg ${service.color} flex items-center justify-center mb-2 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900">{service.title}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{service.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Real Live Promotional Deals & Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Featured Offers & Experiences</h2>
            <p className="text-xs text-slate-500">Official SpiceJet promotions and travel partners</p>
          </div>
          <button className="text-xs font-semibold text-[#C30B12] hover:underline flex items-center gap-1">
            <span>View all offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRAND_ASSETS.banners.map((banner) => (
            <div 
              key={banner.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-resting hover:shadow-elevated overflow-hidden transition-all flex flex-col group cursor-pointer"
            >
              <div className="h-40 overflow-hidden relative bg-slate-100">
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback visual
                    e.target.src = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80";
                  }}
                />
                <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {banner.tag}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">{banner.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{banner.subtitle}</p>
                </div>
                <div className="pt-3 flex items-center justify-between text-xs font-semibold text-[#C30B12]">
                  <span>Explore Deal</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SpiceClub Loyalty Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/90 text-white rounded-3xl p-6 sm:p-8 shadow-elevated relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-[#F7941D]" /> SpiceClub Frequent Flyer Program
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Earn Rewards on Every Single Kilometer
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Join millions of SpiceClub members. Earn up to 28 SC points per ₹100 spent, complimentary vouchers, free seat selection, and priority boarding.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button 
              onClick={() => alert('SpiceClub Registration')}
              className="h-12 px-6 rounded-xl bg-[#F7941D] hover:bg-[#E08012] text-slate-950 font-bold text-xs sm:text-sm shadow-cta-glow transition-all"
            >
              Join SpiceClub for Free
            </button>
            <button 
              onClick={() => alert('Member Login')}
              className="h-12 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all"
            >
              Member Sign In
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
