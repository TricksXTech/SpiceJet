import React from 'react';
import { 
  Sparkles, 
  Crown, 
  Coffee, 
  ArrowRight,
  Tv,
  KeyRound,
  FileCheck
} from 'lucide-react';
import BookingWidget from './BookingWidget';
import { BRAND_ASSETS } from '../data/spicejetRealData';

export default function HomeView({ 
  searchParams, 
  setSearchParams, 
  activeTab = 'flights', 
  setActiveTab, 
  onSearch,
  onNavigate 
}) {
  const quickServices = [
    { title: 'SpiceMax', desc: 'Extra legroom & meal', icon: Crown, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300' },
    { title: 'SpiceCafé', desc: 'Pre-book hot meals', icon: Coffee, color: 'text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-300' },
    { title: 'You1st', desc: 'Priority baggage & check-in', icon: Sparkles, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300' },
    { title: 'Visa Services', desc: 'Fast-track international', icon: FileCheck, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300' },
    { title: 'SpiceLock', desc: 'Hold fare for 48h', icon: KeyRound, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-300' },
    { title: 'SpiceScreen', desc: 'Free inflight media', icon: Tv, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300' },
  ];

  return (
    <div className="space-y-10 pb-12">
      
      {/* Hero Section with subtle ambient gradient & Booking Widget */}
      <section className="relative pt-6 pb-4 sm:pt-10 sm:pb-8 overflow-hidden bg-gradient-to-b from-red-50/40 dark:from-red-950/20 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-500/20 text-[#C30B12] dark:text-[#FF3B46] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> India’s Most Affordable High-Frequency Airline
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Fly Red. Hot. <span className="text-[#C30B12] dark:text-[#FF3B46]">Spicy.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Direct domestic & international flight connections across 79 destinations with real-time fares and premier comfort.
            </p>
          </div>

          {/* Core Booking Engine Widget */}
          <div className="max-w-5xl mx-auto">
            <BookingWidget 
              searchParams={searchParams} 
              setSearchParams={setSearchParams} 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onSearch={onSearch}
              onNavigate={onNavigate}
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
                className="bg-white dark:bg-[#1C1D24] rounded-2xl p-3.5 border border-slate-200 dark:border-white/10 shadow-resting hover:shadow-elevated transition-all group cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-xl ${service.color} flex items-center justify-center mb-2 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">{service.title}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{service.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Real Live Promotional Deals & Banners */}
      <section id="featured-offers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 scroll-mt-24">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Featured Offers & Experiences</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Official SpiceJet promotions and travel partners</p>
          </div>
          <button className="text-xs font-semibold text-[#C30B12] dark:text-[#FF3B46] hover:underline flex items-center gap-1">
            <span>View all offers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRAND_ASSETS.banners.map((banner) => (
            <div 
              key={banner.id}
              className="bg-white dark:bg-[#1C1D24] rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-resting hover:shadow-elevated overflow-hidden transition-all flex flex-col group cursor-pointer"
            >
              <div className="h-40 overflow-hidden relative bg-slate-100 dark:bg-white/5">
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80";
                  }}
                />
                <span className="absolute top-2.5 left-2.5 bg-slate-900/80 dark:bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {banner.tag}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">{banner.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{banner.subtitle}</p>
                </div>
                <div className="pt-3 flex items-center justify-between text-xs font-semibold text-[#C30B12] dark:text-[#FF3B46]">
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
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/90 text-white rounded-3xl p-6 sm:p-8 shadow-elevated relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
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
