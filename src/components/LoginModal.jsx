import React, { useState, useEffect } from 'react';
import { X, Crown, Mail, Phone, Lock, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { BRAND_ASSETS } from '../data/spicejetRealData';

export default function LoginModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('login'); // 'login' | 'signup'
  const [loginMethod, setLoginMethod] = useState('mobile'); // 'mobile' | 'email'
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setLoggedInUser({
      name: 'Rahul Sharma',
      spiceClubId: 'SC89230192',
      tier: 'Gold',
      points: 450
    });
    setTimeout(() => {
      onClose();
      setOtpSent(false);
      setLoggedInUser(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-[#1C1D24] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 sm:p-7 text-slate-900 dark:text-white transition-all zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <img src={BRAND_ASSETS.logoUrl} alt="SpiceJet" className="h-7 w-auto object-contain" />
          <div className="h-4 w-px bg-slate-200 dark:bg-white/20" />
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full">
            <Crown className="w-3.5 h-3.5 text-[#F7941D]" /> SpiceClub
          </div>
        </div>

        {loggedInUser ? (
          <div className="text-center py-6 space-y-3 animate-in zoom-in-95">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-bold">Welcome, {loggedInUser.name}!</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              SpiceClub #{loggedInUser.spiceClubId} • {loggedInUser.points} Points Available
            </p>
          </div>
        ) : (
          <>
            {/* Tabs: Login vs Register */}
            <div className="flex border-b border-slate-100 dark:border-white/10 mb-5">
              <button
                onClick={() => { setTab('login'); setOtpSent(false); }}
                className={`flex-1 pb-2.5 text-xs sm:text-sm font-semibold transition-colors relative ${
                  tab === 'login' 
                    ? 'text-[#C30B12] dark:text-[#FF3B46]' 
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                Member Login
                {tab === 'login' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C30B12] dark:bg-[#FF3B46]" />
                )}
              </button>
              <button
                onClick={() => { setTab('signup'); setOtpSent(false); }}
                className={`flex-1 pb-2.5 text-xs sm:text-sm font-semibold transition-colors relative ${
                  tab === 'signup' 
                    ? 'text-[#C30B12] dark:text-[#FF3B46]' 
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                Join SpiceClub (Free)
                {tab === 'signup' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C30B12] dark:bg-[#FF3B46]" />
                )}
              </button>
            </div>

            {/* Login Method Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => { setLoginMethod('mobile'); setOtpSent(false); }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all ${
                  loginMethod === 'mobile'
                    ? 'bg-slate-100 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-semibold'
                    : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <Phone className="w-3.5 h-3.5" /> Mobile Number
              </button>
              <button
                type="button"
                onClick={() => { setLoginMethod('email'); setOtpSent(false); }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all ${
                  loginMethod === 'email'
                    ? 'bg-slate-100 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-semibold'
                    : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <Mail className="w-3.5 h-3.5" /> Email / Member ID
              </button>
            </div>

            {/* Input Form */}
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                {loginMethod === 'mobile' ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Mobile Number
                    </label>
                    <div className="flex rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 overflow-hidden focus-within:ring-2 focus-within:ring-[#C30B12]/20">
                      <span className="px-3 py-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-white/10">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="Enter 10-digit number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full px-3 py-2.5 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Email Address or SpiceClub ID
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. rahul.sharma@example.com or SC12345"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-[#C30B12] hover:bg-[#A8080E] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Request Login OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-4 animate-in fade-in">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#F7941D]" />
                  <span>OTP has been sent to <strong>{loginMethod === 'mobile' ? `+91 ${mobile || '9876543210'}` : (email || 'rahul@example.com')}</strong>. Enter <strong>1234</strong> to simulate login.</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Enter 4-Digit OTP
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="1234"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 text-center tracking-[0.5em] font-mono text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="h-11 px-4 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-11 rounded-xl bg-[#C30B12] hover:bg-[#A8080E] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Verify & Login</span>
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 text-center">
              By logging in, you agree to SpiceJet's <a href="#terms" onClick={(e) => e.preventDefault()} className="text-[#C30B12] dark:text-[#FF3B46] underline">Terms of Use</a> and <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-[#C30B12] dark:text-[#FF3B46] underline">Privacy Policy</a>.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
