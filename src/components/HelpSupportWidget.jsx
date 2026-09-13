import React, { useState, useEffect, useRef } from 'react';
import { 
  HelpCircle, 
  X, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Phone, 
  Mail, 
  BookOpen, 
  Send, 
  Sparkles,
  ShieldCheck,
  Plane
} from 'lucide-react';

export default function HelpSupportWidget({ theme = 'light' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('guide'); // 'guide' | 'faqs' | 'contact' | 'chat'
  const [expandedFaq, setExpandedFaq] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Namaste! Welcome to SpiceJet Support. How can we assist with your journey today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const fabRef = useRef(null);
  const panelRef = useRef(null);

  // Close on Escape key & return focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        fabRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let reply = "Thank you for reaching out! For flight SG 162 and booking inquiries, our team is available 24x7 at +91 124 4983410.";
      if (userText.toLowerCase().includes('baggage')) {
        reply = "SpiceSaver includes 7kg cabin and 15kg check-in baggage. SpiceMax includes 20kg check-in baggage.";
      } else if (userText.toLowerCase().includes('refund') || userText.toLowerCase().includes('cancel')) {
        reply = "Free cancellation is available on SpiceFlex up to 2 hours before departure. SpiceSaver cancellations incur a ₹3,750 standard fee.";
      }
      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
    }, 600);
  };

  const faqs = [
    {
      q: "What is the standard baggage allowance?",
      a: "For all domestic flights, SpiceSaver allows 7kg hand baggage and 15kg checked luggage per passenger. SpiceMax allows 20kg checked baggage."
    },
    {
      q: "Can I reschedule or change my flight date?",
      a: "Yes! SpiceFlex and SpiceMax include zero date-change fees when modified up to 2 hours prior to flight departure. Only fare differences apply."
    },
    {
      q: "When does airport web check-in open?",
      a: "Web check-in opens 48 hours prior to scheduled departure and closes 60 minutes before departure for domestic flights."
    },
    {
      q: "What are the benefits of booking SpiceMax?",
      a: "SpiceMax passengers enjoy up to 34 inches of extra legroom, priority baggage delivery, priority boarding, and a complimentary hot gourmet meal and beverage."
    },
    {
      q: "How do refund requests work?",
      a: "Eligible refunds are processed back to the original payment method (or SpiceClub wallet) within 5–7 business days upon cancellation."
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      
      {/* Expanded Support Panel */}
      {isOpen && (
        <div 
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="SpiceJet Help & Support"
          className="absolute bottom-16 sm:bottom-20 right-0 w-[calc(100vw-32px)] sm:w-96 max-w-sm max-h-[75vh] bg-white dark:bg-[#1C1D24] rounded-2xl shadow-elevated border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Panel Header */}
          <div className="bg-[#C30B12] dark:bg-[#FF3B46] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white leading-tight">Help & Support</h3>
                <p className="text-[11px] text-white/80">SpiceJet Passenger Assistance</p>
              </div>
            </div>

            <button
              onClick={() => { setIsOpen(false); fabRef.current?.focus(); }}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close support panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#14151A] p-1 gap-1 text-xs font-semibold">
            {[
              { id: 'guide', label: 'How to Book' },
              { id: 'faqs', label: 'FAQs' },
              { id: 'chat', label: 'Live Chat' },
              { id: 'contact', label: 'Contact' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-[#1C1D24] text-[#C30B12] dark:text-[#FF3B46] shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panel Content Scroll Area */}
          <div className="p-4 overflow-y-auto flex-1 text-xs space-y-4 text-slate-700 dark:text-slate-300">
            
            {/* Tab 1: How to Book Mini Guide */}
            {activeTab === 'guide' && (
              <div className="space-y-3">
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  Booking in 4 Easy Steps
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#C30B12] dark:bg-[#FF3B46] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      1
                    </span>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Search Flights:</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">Choose origin, destination, and departure date from the booking widget.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#C30B12] dark:bg-[#FF3B46] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      2
                    </span>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Select Fare Tier:</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">Compare SpiceSaver, SpiceFlex, and SpiceMax for extra baggage and legroom.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#C30B12] dark:bg-[#FF3B46] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      3
                    </span>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Traveler Details & Seats:</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">Enter contact information and select preferred seats on the Boeing 737 seat map.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                    <span className="w-5 h-5 rounded-full bg-[#C30B12] dark:bg-[#FF3B46] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      4
                    </span>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Instant Confirmation:</span>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">Pay via UPI QR or card to receive your confirmed PNR and boarding pass.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Interactive FAQs Accordion */}
            {activeTab === 'faqs' && (
              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isExpanded = expandedFaq === idx;
                  return (
                    <div 
                      key={idx}
                      className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        className="w-full text-left p-3 font-semibold text-slate-900 dark:text-white flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-white/5"
                      >
                        <span>{faq.q}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                      </button>
                      {isExpanded && (
                        <div className="px-3 pb-3 pt-0 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-white/5 animate-in fade-in">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 3: Minimal Live Chat Stub */}
            {activeTab === 'chat' && (
              <div className="flex flex-col h-64">
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                  {chatMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-2.5 rounded-xl text-xs ${
                          msg.sender === 'user'
                            ? 'bg-[#C30B12] dark:bg-[#FF3B46] text-white rounded-br-none'
                            : 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="pt-2 flex gap-1.5 border-t border-slate-200 dark:border-white/10">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about baggage, fare rules..."
                    className="flex-1 h-9 px-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-9 px-3 bg-[#C30B12] dark:bg-[#FF3B46] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 4: Real Support Contact Information */}
            {activeTab === 'contact' && (
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl text-amber-900 dark:text-amber-300 text-[11px]">
                  <strong>Portfolio Demo Notice:</strong> Below are the official public support channels for SpiceJet passenger inquiries.
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                    <Phone className="w-4 h-4 text-[#F7941D]" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">24x7 Customer Support</div>
                      <div className="text-slate-500 dark:text-slate-400">+91 124 4983410 / +91 124 5053333</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                    <Mail className="w-4 h-4 text-[#C30B12] dark:text-[#FF3B46]" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Customer Relations Email</div>
                      <div className="text-slate-500 dark:text-slate-400">custrelations@spicejet.com</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                    <Plane className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Cargo Reservations</div>
                      <div className="text-slate-500 dark:text-slate-400">cargo@spicejet.com</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        ref={fabRef}
        id="help-support-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open help and support"
        aria-expanded={isOpen}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C30B12] dark:bg-[#FF3B46] text-white flex items-center justify-center shadow-brand-glow hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#C30B12]/30"
      >
        {isOpen ? (
          <X className="w-6 h-6" strokeWidth={2.5} />
        ) : (
          <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
        )}
      </button>

    </div>
  );
}
