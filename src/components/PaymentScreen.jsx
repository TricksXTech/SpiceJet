import React, { useState } from 'react';
import { 
  CreditCard, 
  QrCode, 
  Building2, 
  Crown, 
  Lock, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { REAL_PRICE_BREAKDOWN } from '../data/spicejetRealData';

export default function PaymentScreen({ 
  flightData, 
  passengerDetails, 
  selectedSeat, 
  selectedMeal, 
  excessBaggage, 
  onBack, 
  onPaymentSuccess 
}) {
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'spiceclub'
  const [upiId, setUpiId] = useState('rahul.sharma@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [expiry, setExpiry] = useState('08/29');
  const [cvv, setCvv] = useState('•••');
  const [isProcessing, setIsProcessing] = useState(false);

  const seatPrice = selectedSeat?.price || 0;
  const mealPrice = selectedMeal?.price || 0;
  const baggagePrice = excessBaggage?.price || 0;
  const grandTotal = REAL_PRICE_BREAKDOWN.totalFare + seatPrice + mealPrice + baggagePrice;

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Payment Gateways Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-resting border border-slate-200/90 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Select Payment Method</h2>
                <p className="text-xs text-slate-500">100% Secure 256-Bit Encrypted Transaction</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>RBI Tokenized</span>
              </div>
            </div>

            {/* Payment Method Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'upi', label: 'UPI / QR', icon: QrCode, sub: 'GPay, PhonePe, Paytm' },
                { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, sub: 'Visa, Mastercard, RuPay' },
                { id: 'netbanking', label: 'Net Banking', icon: Building2, sub: 'All Major Indian Banks' },
                { id: 'spiceclub', label: 'SpiceClub Points', icon: Crown, sub: 'Redeem Rewards' },
              ].map(method => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-red-50/70 border-[#C30B12] shadow-sm ring-1 ring-[#C30B12]'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-[#C30B12]' : 'text-slate-500'}`} />
                    <div className="font-bold text-xs text-slate-900">{method.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">{method.sub}</div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Payment Method View */}
            <form onSubmit={handlePay} className="pt-2 space-y-4">
              
              {paymentMethod === 'upi' && (
                <div className="space-y-4 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
                  <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
                    <div className="space-y-3 flex-1">
                      <label className="block text-xs font-bold text-slate-800">
                        Enter UPI ID / VPA
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          required
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. mobile@upi or username@okhdfcbank"
                          className="w-full h-11 px-3.5 bg-white border border-slate-200 rounded-l-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C30B12]/20"
                        />
                        <button
                          type="button"
                          className="px-4 bg-slate-200 text-slate-700 text-xs font-bold rounded-r-xl hover:bg-slate-300"
                        >
                          Verify
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        A payment request will be sent to your Google Pay, PhonePe, or BHIM app.
                      </p>
                    </div>

                    <div className="text-center shrink-0 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-6">
                      <div className="w-28 h-28 mx-auto bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                        <QrCode className="w-20 h-20 text-slate-800" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 mt-1.5 block">
                        Scan with any UPI App
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="16-digit card number"
                      className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Valid Thru</label>
                      <input
                        type="text"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">CVV</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="3 or 4 digits"
                        className="w-full h-11 px-3 bg-white border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <label className="block text-xs font-bold text-slate-800">Select Bank</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(bank => (
                      <label key={bank} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 text-xs cursor-pointer hover:border-slate-300">
                        <input type="radio" name="bank" defaultChecked={bank === 'HDFC Bank'} className="text-[#C30B12]" />
                        <span className="truncate font-medium text-slate-800">{bank}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {paymentMethod === 'spiceclub' && (
                <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-[#F7941D]" />
                    <span>SpiceClub Balance: 4,850 Points</span>
                  </div>
                  <p>You can redeem up to 2,000 points (₹1,000 equivalent) on this booking.</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  id="payment-back-btn"
                  onClick={onBack}
                  className="h-11 px-5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-semibold text-slate-700 flex items-center gap-2 transition-all shadow-resting"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  id="pay-and-confirm-btn"
                  disabled={isProcessing}
                  className="h-12 px-8 rounded-xl bg-[#C30B12] hover:bg-[#A8080E] text-white font-bold text-sm flex items-center gap-2 shadow-brand-glow transition-all hover:-translate-y-0.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessing ? 'Processing...' : `Pay ₹ ${grandTotal.toLocaleString('en-IN')}`}</span>
                </button>
              </div>

            </form>

          </div>
        </div>

        {/* Right Column: Final Cost Recap */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-elevated border border-slate-200/90 space-y-4 sticky top-24">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Total Payable Amount
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Flight SG 162 Fare</span>
                <span className="font-mono text-slate-900">₹ {REAL_PRICE_BREAKDOWN.totalFare.toLocaleString('en-IN')}</span>
              </div>
              {selectedSeat && (
                <div className="flex justify-between">
                  <span>Seat {selectedSeat.code}</span>
                  <span className="font-mono text-slate-900">₹ {selectedSeat.price}</span>
                </div>
              )}
              {selectedMeal && (
                <div className="flex justify-between">
                  <span>SpiceCafé Meal</span>
                  <span className="font-mono text-slate-900">₹ {selectedMeal.price}</span>
                </div>
              )}
              {excessBaggage && (
                <div className="flex justify-between">
                  <span>Pre-booked Baggage</span>
                  <span className="font-mono text-slate-900">₹ {excessBaggage.price}</span>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-baseline justify-between">
              <div className="text-xs font-bold text-slate-900">Final Total:</div>
              <div className="text-2xl font-bold font-mono text-[#C30B12] tracking-tight">
                ₹ {grandTotal.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant PNR issued immediately upon confirmation.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
