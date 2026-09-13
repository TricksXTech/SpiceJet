import React from 'react';
import { 
  Phone, 
  Mail, 
  Smartphone
} from 'lucide-react';
import { FOOTER_SECTIONS, BRAND_ASSETS } from '../data/spicejetRealData';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 text-xs border-t border-slate-800 transition-colors overflow-hidden">
      
      {/* 24x7 Support & App Download Bar */}
      <div className="w-full border-b border-slate-800/80 bg-black/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-2 text-white font-medium">
              <Phone className="w-4 h-4 text-[#F7941D] shrink-0" />
              <span>24x7 Reservation Support: <strong className="text-white">+91 124 4983410</strong></span>
            </div>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-[#F7941D] shrink-0" />
              <span>custrelations@spicejet.com</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-slate-300 font-medium">Download Mobile App:</span>
            <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-1.5 transition-colors">
              <Smartphone className="w-3.5 h-3.5 text-[#F7941D]" />
              <span>iOS & Android</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 4-Column Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-3 min-w-0">
              <h4 className="text-white font-bold text-sm tracking-tight truncate">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link} className="min-w-0">
                    <a
                      href="#footer-link"
                      onClick={(e) => e.preventDefault()}
                      className="hover:text-white transition-colors duration-150 inline-block truncate max-w-full text-slate-400 hover:underline"
                      title={link}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Brand & Regulatory Disclaimer with Fees & Surcharges fully visible */}
        <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-3 shrink-0">
            <img 
              src={BRAND_ASSETS.logoUrl} 
              alt="SpiceJet" 
              className="h-6 w-auto brightness-0 invert opacity-60" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span>© 2026 SpiceJet Limited. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-x-3 gap-y-1.5 flex-wrap justify-center md:justify-end text-center">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">Terms & Conditions</a>
            <span>•</span>
            <a href="#charter" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">Passenger Charter</a>
            <span>•</span>
            <a href="#tariff" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 font-medium text-slate-400">Fees & Surcharges</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
