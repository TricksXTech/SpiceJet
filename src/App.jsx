import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StepNavigation from './components/StepNavigation';
import HomeView from './components/HomeView';
import FlightSearchResults from './components/FlightSearchResults';
import PassengerForm from './components/PassengerForm';
import SeatSelection from './components/SeatSelection';
import PaymentScreen from './components/PaymentScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import { REAL_FLIGHTS } from './data/spicejetRealData';
import { Layers } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currency, setCurrency] = useState('INR');

  // Search parameters
  const [searchParams, setSearchParams] = useState({
    origin: 'DEL',
    destination: 'BOM',
    departureDate: '2026-09-20',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    specialFare: 'regular',
  });

  // Selected booking state
  const [selectedFlightId, setSelectedFlightId] = useState('SG-162');
  const [selectedFareType, setSelectedFareType] = useState('saver'); // 'saver' | 'flex' | 'max'

  // Passenger state
  const [passengerDetails, setPassengerDetails] = useState({
    title: 'Mr',
    firstName: 'Rahul',
    lastName: 'Sharma',
    mobile: '9876543210',
    email: 'rahul.sharma@example.com',
    city: 'New Delhi',
    spiceClubId: 'SC89230192'
  });

  // Add-ons state
  const [selectedSeat, setSelectedSeat] = useState({ code: '2A', price: 1200, type: 'spicemax' });
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [excessBaggage, setExcessBaggage] = useState(null);

  const selectedFlight = REAL_FLIGHTS.find(f => f.id === selectedFlightId) || REAL_FLIGHTS[0];

  const handleSelectFlightFare = (flightId, fareType) => {
    setSelectedFlightId(flightId);
    setSelectedFareType(fareType);
  };

  const getStepNumber = () => {
    switch (currentScreen) {
      case 'search': return 1;
      case 'passengers': return 2;
      case 'seats': return 3;
      case 'payment': return 4;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      
      {/* Global SaaS Header */}
      <Header 
        currentScreen={currentScreen} 
        onNavigate={(screen) => setCurrentScreen(screen)}
        currency={currency}
        onCurrencyChange={(c) => setCurrency(c)}
      />

      {/* Step Navigation Progress Bar (Visible on active booking funnel) */}
      {['search', 'passengers', 'seats', 'payment'].includes(currentScreen) && (
        <StepNavigation 
          currentStep={getStepNumber()} 
          onStepClick={(stepKey) => setCurrentScreen(stepKey)} 
        />
      )}

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeView
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={() => setCurrentScreen('search')}
          />
        )}

        {currentScreen === 'search' && (
          <FlightSearchResults
            searchParams={searchParams}
            selectedFlight={selectedFlightId}
            selectedFareType={selectedFareType}
            onSelectFlightFare={handleSelectFlightFare}
            onContinue={() => setCurrentScreen('passengers')}
            onModifySearch={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'passengers' && (
          <PassengerForm
            flightData={selectedFlight}
            passengerDetails={passengerDetails}
            setPassengerDetails={setPassengerDetails}
            onBack={() => setCurrentScreen('search')}
            onProceed={() => setCurrentScreen('seats')}
          />
        )}

        {currentScreen === 'seats' && (
          <SeatSelection
            selectedSeat={selectedSeat}
            setSelectedSeat={setSelectedSeat}
            selectedMeal={selectedMeal}
            setSelectedMeal={setSelectedMeal}
            excessBaggage={excessBaggage}
            setExcessBaggage={setExcessBaggage}
            onBack={() => setCurrentScreen('passengers')}
            onProceed={() => setCurrentScreen('payment')}
          />
        )}

        {currentScreen === 'payment' && (
          <PaymentScreen
            flightData={selectedFlight}
            passengerDetails={passengerDetails}
            selectedSeat={selectedSeat}
            selectedMeal={selectedMeal}
            excessBaggage={excessBaggage}
            onBack={() => setCurrentScreen('seats')}
            onPaymentSuccess={() => setCurrentScreen('confirmation')}
          />
        )}

        {currentScreen === 'confirmation' && (
          <ConfirmationScreen
            flightData={selectedFlight}
            passengerDetails={passengerDetails}
            selectedSeat={selectedSeat}
            onBookAnother={() => setCurrentScreen('home')}
          />
        )}
      </main>

      {/* Quick Screen Switcher Toolbar for Visual Inspection & Testing */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-2xl border border-slate-700/80 flex items-center gap-1.5 text-xs font-semibold">
        <span className="flex items-center gap-1 text-slate-400 pl-1 pr-1.5 border-r border-slate-700 text-[11px]">
          <Layers className="w-3.5 h-3.5 text-[#F7941D]" /> Jump:
        </span>
        {[
          { id: 'home', label: '1. Home' },
          { id: 'search', label: '2. Search' },
          { id: 'passengers', label: '3. Passenger' },
          { id: 'seats', label: '4. Seats' },
          { id: 'payment', label: '5. Payment' },
          { id: 'confirmation', label: '6. Ticket' },
        ].map((screen) => (
          <button
            key={screen.id}
            onClick={() => setCurrentScreen(screen.id)}
            className={`px-2.5 py-1 rounded-full text-[11px] transition-all ${
              currentScreen === screen.id
                ? 'bg-[#C30B12] text-white shadow-xs font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {screen.label}
          </button>
        ))}
      </div>

      {/* Global SaaS Footer */}
      <Footer />
    </div>
  );
}
