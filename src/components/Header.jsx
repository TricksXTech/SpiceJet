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
  Sun,
  Moon,
  MoreHorizontal
} from 'lucide-react';
import { BRAND_ASSETS } from '../data/spicejetRealData';

export default function Header({ 
  currentScreen, 
  onNavigate, 
  currency = 'INR', 
  onCurrencyChange,
  theme = 'light',
  onToggleTheme 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [spiceClubOpen, setSpiceClubOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Core nav items visible on desktop (>=1024px)
  const primaryNavItems = [
    { id: 'home', label: 'Flights', icon: Plane, screen: 'home' },
    { id: 'checkin', label: 'Check-In', icon: CheckCircle2, screen: 'home' },
    { id: 'status', label: 'Flight Status', icon: Clock, screen: 'home' },
    { id: 'manage', label: 'Manage Booking', icon: FileText, screen: 'home' },
  ];

  // Secondary nav items (collapsed into 'More' on 1024px - 1279px)
  const secondaryNavItems = [
    { id: 'deals', label: 'Deals', icon: Tag, screen: 'home' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#14151A]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-sm transition-colors duration-200">
      {/* Top Brand Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#C30B12] via-[#F7941D] to-[#C30B12] dark:from-[#FF3B46] dark:via-[#FFA439] dark:to-[#FF3B46]" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-3">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button 
              id="header-logo-btn"
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20 rounded-md py-1 shrink-0"
              aria-label="SpiceJet Homepage"
            >
              <img 
                src={BRAND_ASSETS.logoUrl} 
                alt="SpiceJet" 
                className="h-8 md:h-9 w-auto object-contain transition-transform hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <span className="hidden font-bold text-xl text-[#C30B12] dark:text-[#FF3B46] tracking-tight">
                Spice<span className="text-[#F7941D]">Jet</span>
              </span>
            </button>

            {/* Sub-badge shown on extra wide screens */}
            <div className="hidden 2xl:block h-5 w-px bg-slate-200 dark:bg-white/15" />
            <span className="hidden 2xl:inline-block text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded">
              Official Booking
            </span>
          </div>

          {/* Desktop Navigation (>= 1024px) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0" aria-label="Main Navigation">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = (currentScreen === 'home' && item.id === 'home') || 
                               (['search', 'seats', 'passengers', 'payment', 'confirmation'].includes(currentScreen) && item.id === 'home');
              return (
                <button
                  key={item.id}
                  id={`header-nav-${item.id}`}
                  onClick={() => onNavigate(item.screen)}
                  className={`h-10 px-2.5 xl:px-3.5 rounded-xl flex items-center gap-1.5 xl:gap-2 text-xs xl:text-[13.5px] font-medium transition-all duration-150 shrink-0 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#C30B12]/[0.08] dark:bg-[#FF3B46]/[0.16] text-[#C30B12] dark:text-[#FF3B46] font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C30B12] dark:text-[#FF3B46]' : 'text-slate-500 dark:text-slate-400'}`} strokeWidth={1.8} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}

            {/* On >= 1280px, show Deals directly; on 1024-1279px, it collapses into More menu below */}
            <div className="hidden xl:flex items-center gap-1.5">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`header-nav-${item.id}`}
                    onClick={() => onNavigate(item.screen)}
                    className="h-10 px-3 rounded-xl flex items-center gap-1.5 text-[13.5px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/10 transition-colors shrink-0 whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" strokeWidth={1.8} />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* FIX 1: SpiceClub Dropdown Trigger - Flex row, explicit 8px gap, shrink-0, full label visible with zero overlap */}
            <div className="relative shrink-0">
              <button
                id="header-nav-spiceclub"
                onClick={() => setSpiceClubOpen(!spiceClubOpen)}
                className="h-10 px-3 xl:px-3.5 rounded-xl flex items-center gap-2 text-xs xl:text-[13.5px] font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors shrink-0 whitespace-nowrap"
              >
                <Crown className="w-4 h-4 text-[#F7941D] shrink-0" strokeWidth={1.8} />
                <span className="whitespace-nowrap font-medium">SpiceClub</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-600/70 dark:text-amber-400/70 shrink-0" strokeWidth={2} />
              </button>

              {/* SpiceClub Dropdown Content */}
              {spiceClubOpen && (
                <div 
                  className="absolute left-0 mt-1.5 w-60 bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 rounded-xl shadow-elevated py-2 z-50 animate-in fade-in"
                  onMouseLeave={() => setSpiceClubOpen(false)}
                >
                  <div className="px-3.5 py-2 border-b border-slate-100 dark:border-white/10 bg-amber-50/60 dark:bg-amber-500/10">
                    <p className="text-xs font-semibold text-amber-900 dark:text-amber-300">SpiceClub Rewards</p>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400">Earn points on every flight booking</p>
                  </div>
                  <button className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center justify-between">
                    <span>Program Benefits & Tiers</span>
                    <span className="text-[10px] bg-amber-100 dark:bg-amber-400/20 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded font-medium">Free</span>
                  </button>
                  <button className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5">
                    Axis Bank Credit Card
                  </button>
                  <button className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5">
                    Redeem Reward Points
                  </button>
                </div>
              )}
            </div>

            {/* "More" Overflow Trigger (Active on 1024px-1279px to prevent header clipping) */}
            <div className="relative xl:hidden shrink-0">
              <button
                id="header-nav-more"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className="h-10 px-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center gap-1 transition-all shrink-0 whitespace-nowrap"
                title="More options"
              >
                <MoreHorizontal className="w-4 h-4" />
                <span>More</span>
              </button>

              {moreMenuOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-48 bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 rounded-xl shadow-elevated py-1.5 z-50 animate-in fade-in"
                  onMouseLeave={() => setMoreMenuOpen(false)}
                >
                  <button 
                    onClick={() => { onNavigate('home'); setMoreMenuOpen(false); }}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2"
                  >
                    <Tag className="w-3.5 h-3.5 text-slate-500" />
                    <span>Deals & Offers</span>
                  </button>
                  <button 
                    onClick={() => { alert('SpiceJet 24x7 Customer Support: +91 124 4983410 / custrelations@spicejet.com'); setMoreMenuOpen(false); }}
                    className="w-full text-left px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                    <span>24x7 Support & Help</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Utility Bar: Theme Toggle + Currency + Login/Signup CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Theme Toggle Button (Light / Dark Mode) */}
            <button
              id="header-theme-toggle-btn"
              onClick={onToggleTheme}
              className="h-10 w-10 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all shadow-resting hover:scale-105 shrink-0"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle light and dark mode"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" strokeWidth={2} />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" strokeWidth={2} />
              )}
            </button>

            {/* Currency Selector Dropdown */}
            <div className="relative shrink-0">
              <button
                id="header-currency-selector"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="h-10 px-2.5 sm:px-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all shadow-resting hover:bg-slate-50 dark:hover:bg-white/10 shrink-0 whitespace-nowrap"
                aria-label="Select Currency"
              >
                <span className="font-semibold text-slate-900 dark:text-white">{currency}</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span className="text-slate-500 dark:text-slate-400">₹</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-32 bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 rounded-xl shadow-elevated py-1 z-50 animate-in fade-in"
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
                        currency === curr 
                          ? 'bg-red-50 dark:bg-red-500/20 text-[#C30B12] dark:text-[#FF3B46] font-semibold' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{curr}</span>
                      {currency === curr && <span className="text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Support / Help Button (Visible on wide screens 2xl: >= 1400px, otherwise accessible via 'More' and FAB) */}
            <button
              id="header-support-btn"
              onClick={() => alert('SpiceJet 24x7 Customer Support: +91 124 4983410 / custrelations@spicejet.com')}
              className="hidden 2xl:flex h-10 px-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 text-xs font-medium items-center gap-1.5 transition-all shadow-resting hover:bg-slate-50 dark:hover:bg-white/10 shrink-0 whitespace-nowrap"
              title="Customer Support"
            >
              <HelpCircle className="w-4 h-4 text-slate-500 dark:text-slate-400" strokeWidth={1.8} />
              <span>Help</span>
            </button>

            {/* Primary CTA: Login / Signup (Strictly preserved, never clipped or collapsed) */}
            <button
              id="header-login-btn"
              onClick={() => alert('SpiceClub Member Login modal')}
              className="h-10 px-3 sm:px-4 rounded-xl bg-[#C30B12] hover:bg-[#A8080E] active:bg-[#8F060B] dark:bg-[#FF3B46] dark:hover:bg-[#FF5A63] text-white text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all shadow-sm hover:shadow-brand-glow shrink-0 whitespace-nowrap"
            >
              <User className="w-4 h-4" strokeWidth={2} />
              <span className="whitespace-nowrap">Login / Sign Up</span>
            </button>

            {/* Mobile Menu Toggle Button (Visible below 1024px) */}
            <button
              id="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer (< 1024px) */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 dark:border-white/10 space-y-1 animate-in fade-in">
            {primaryNavItems.concat(secondaryNavItems).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.screen);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-white/5 hover:text-[#C30B12] dark:hover:text-[#FF3B46]"
                >
                  <Icon className="w-4 h-4 text-[#C30B12] dark:text-[#FF3B46]" strokeWidth={1.8} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between px-3 text-xs text-slate-500 dark:text-slate-400">
              <span>Customer Care: +91 124 4983410</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">On-Time 94%</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
