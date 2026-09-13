import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StepNavigation from './components/StepNavigation';
import HomeView from './components/HomeView';
import FlightSearchResults from './components/FlightSearchResults';
import PassengerForm from './components/PassengerForm';
import SeatSelection from './components/SeatSelection';
import PaymentScreen from './components/PaymentScreen';
import ConfirmationScreen from './components/ConfirmationScreen';
import HelpSupportWidget from './components/HelpSupportWidget';
import { getFlightsForRoute } from './data/spicejetRealData';
import { Layers } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currency, setCurrency] = useState('INR');
  const [theme, setTheme] = useState('light'); // 'light' | 'dark'

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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

  // Dynamically load real flights for current route
  const currentRouteFlights = getFlightsForRoute(searchParams.origin, searchParams.destination);
  const selectedFlight = currentRouteFlights.find(f => f.id === selectedFlightId) || currentRouteFlights[0];

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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#14151A] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Global SaaS Header with Theme Toggle */}
      <Header 
        currentScreen={currentScreen} 
        onNavigate={(screen) => setCurrentScreen(screen)}
        currency={currency}
        onCurrencyChange={(c) => setCurrency(c)}
        theme={theme}
        onToggleTheme={toggleTheme}
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
            selectedFareType={selectedFareType}
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
            selectedFareType={selectedFareType}
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

      {/* Persistent Floating Help & Support FAB Widget (per FIX 4) */}
      <HelpSupportWidget theme={theme} />

      {/* Quick Screen Switcher Toolbar for Visual Inspection & Testing */}
      <div className="fixed bottom-4 left-4 sm:left-1/2 sm:-translate-x-1/2 z-40 bg-slate-900/90 dark:bg-black/90 backdrop-blur-md text-white px-2.5 sm:px-3 py-1.5 rounded-full shadow-2xl border border-slate-700/80 dark:border-white/10 flex items-center gap-1 sm:gap-1.5 text-xs font-semibold max-w-[calc(100vw-88px)] overflow-x-auto scrollbar-none">
        <span className="hidden xs:flex items-center gap-1 text-slate-400 pl-1 pr-1.5 border-r border-slate-700 text-[11px] shrink-0">
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
            className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] whitespace-nowrap transition-all shrink-0 ${
              currentScreen === screen.id
                ? 'bg-[#C30B12] dark:bg-[#FF3B46] text-white shadow-xs font-bold'
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
