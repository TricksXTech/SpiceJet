import React, { useState } from 'react';
import { 
  Plane, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Crown, 
  Tag, 
  ChevronDown, 
  User, 
  Menu, 
  X, 
  HelpCircle,
  Globe
} from 'lucide-react';
import { BRAND_ASSETS } from '../data/spicejetRealData';

export default function Header({ currentScreen, onNavigate, currency = 'INR', onCurrencyChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [spiceClubOpen, setSpiceClubOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Flights', icon: Plane, screen: 'home' },
    { id: 'checkin', label: 'Check-In', icon: CheckCircle2, screen: 'home' },
    { id: 'status', label: 'Flight Status', icon: Clock, screen: 'home' },
    { id: 'manage', label: 'Manage Booking', icon: FileText, screen: 'home' },
    { id: 'deals', label: 'Deals', icon: Tag, screen: 'home' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 shadow-sm transition-all duration-200">
      {/* Top Banner Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#C30B12] via-[#F7941D] to-[#C30B12]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-4">
            <button 
              id="header-logo-btn"
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20 rounded-md py-1"
            >
              <img 
                src={BRAND_ASSETS.logoUrl} 
                alt="SpiceJet" 
                className="h-8 md:h-9 w-auto object-contain transition-transform hover:scale-105"
                onError={(e) => {
                  // Fallback if network drops
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <span className="hidden font-bold text-xl text-[#C30B12] tracking-tight">
                Spice<span className="text-[#F7941D]">Jet</span>
              </span>
            </button>

            <div className="hidden lg:block h-6 w-px bg-slate-200" />
            
            <span className="hidden xl:inline-block text-[11px] font-medium text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
              Official Booking
            </span>
          </div>

          {/* Desktop Primary Navigation Bar */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = (currentScreen === 'home' && item.id === 'home') || 
                               (['search', 'seats', 'passengers', 'payment', 'confirmation'].includes(currentScreen) && item.id === 'home');
              return (
                <button
                  key={item.id}
                  id={`header-nav-${item.id}`}
                  onClick={() => onNavigate(item.screen)}
                  className={`h-10 px-3.5 rounded-lg flex items-center gap-2 text-[13.5px] font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#C30B12]/[0.08] text-[#C30B12] font-semibold shadow-none'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#C30B12]' : 'text-slate-500'}`} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* SpiceClub Dropdown Trigger */}
            <div className="relative">
              <button
                id="header-nav-spiceclub"
                onClick={() => setSpiceClubOpen(!spiceClubOpen)}
                className="h-10 px-3.5 rounded-lg flex items-center gap-1.5 text-[13.5px] font-medium text-amber-700 hover:text-amber-800 hover:bg-amber-50/80 transition-colors"
              >
                <Crown className="w-4 h-4 text-[#F7941D] shrink-0" strokeWidth={1.8} />
                <span>SpiceClub</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-600/70" strokeWidth={2} />
              </button>

              {/* SpiceClub Dropdown Content */}
              {spiceClubOpen && (
                <div 
                  className="absolute left-0 mt-1.5 w-60 bg-white border border-slate-200 rounded-xl shadow-elevated py-2 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={() => setSpiceClubOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-slate-100 bg-amber-50/50">
                    <p className="text-xs font-semibold text-amber-900">SpiceClub Rewards</p>
                    <p className="text-[11px] text-amber-700">Earn points on every flight booking</p>
                  </div>
                  <button className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between">
                    <span>Program Benefits & Tiers</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">Free</span>
                  </button>
                  <button className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50">
                    Axis Bank Credit Card
                  </button>
                  <button className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50">
                    Redeem Reward Points
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Utility Buttons & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Currency Selector Dropdown */}
            <div className="relative">
              <button
                id="header-currency-selector"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="h-10 px-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-all shadow-resting hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20"
                aria-label="Select Currency"
              >
                <span className="font-semibold text-slate-900">{currency}</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-500">₹</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-32 bg-white border border-slate-200 rounded-xl shadow-elevated py-1 z-50"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {['INR', 'USD', 'AED', 'EUR', 'GBP'].map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        onCurrencyChange?.(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                        currency === curr ? 'bg-red-50 text-[#C30B12] font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{curr}</span>
                      {currency === curr && <span className="text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Support / Help Button */}
            <button
              id="header-support-btn"
              onClick={() => alert('SpiceJet 24x7 Customer Support: +91 124 4983410 / custrelations@spicejet.com')}
              className="hidden sm:flex h-10 px-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-medium items-center gap-1.5 transition-all shadow-resting hover:bg-slate-50"
              title="Customer Support"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" strokeWidth={1.8} />
              <span className="hidden lg:inline">Help</span>
            </button>

            {/* Primary CTA: Login / Signup (Strictly identical height: 40px, rounded-lg, outranks via contrast) */}
            <button
              id="header-login-btn"
              onClick={() => alert('SpiceClub Member Login modal')}
              className="h-10 px-4 rounded-lg bg-[#C30B12] hover:bg-[#A8080E] active:bg-[#8F060B] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-brand-glow focus:outline-none focus:ring-2 focus:ring-[#C30B12]/30"
            >
              <User className="w-4 h-4" strokeWidth={2} />
              <span>Login / Sign Up</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-100 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.screen);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-[#C30B12]"
                >
                  <Icon className="w-4 h-4 text-[#C30B12]" strokeWidth={1.8} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3 text-xs text-slate-500">
              <span>Customer Care: +91 124 4983410</span>
              <span className="font-semibold text-emerald-600">On-Time 94%</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
