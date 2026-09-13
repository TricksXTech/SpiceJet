import React from 'react';
import { Check, Plane, Users, PlusCircle, CreditCard } from 'lucide-react';

export default function StepNavigation({ currentStep = 1, onStepClick }) {
  const steps = [
    { id: 1, key: 'search', label: '1. Flights', icon: Plane },
    { id: 2, key: 'passengers', label: '2. Passengers', icon: Users },
    { id: 3, key: 'seats', label: '3. Add-ons & Seats', icon: PlusCircle },
    { id: 4, key: 'payment', label: '4. Payment', icon: CreditCard },
  ];

  return (
    <div className="bg-white border-b border-slate-200/90 py-3 shadow-resting">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between sm:justify-center sm:gap-8 md:gap-14">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            const isUpcoming = step.id > currentStep;

            return (
              <div key={step.id} className="flex items-center gap-2 sm:gap-3">
                <button
                  id={`step-nav-${step.key}`}
                  disabled={isUpcoming}
                  onClick={() => onStepClick && onStepClick(step.key)}
                  className={`flex items-center gap-2 text-xs sm:text-sm font-medium transition-all group ${
                    isActive
                      ? 'text-[#C30B12] font-semibold'
                      : isCompleted
                      ? 'text-slate-700 hover:text-slate-900 cursor-pointer'
                      : 'text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                      isActive
                        ? 'bg-[#C30B12] text-white shadow-sm ring-4 ring-[#C30B12]/15'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                    )}
                  </div>
                  <span className="hidden xs:inline">{step.label}</span>
                </button>

                {/* Connector line between steps */}
                {idx < steps.length - 1 && (
                  <div
                    className={`w-4 sm:w-8 md:w-12 h-0.5 rounded transition-colors ${
                      step.id < currentStep ? 'bg-emerald-600' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
