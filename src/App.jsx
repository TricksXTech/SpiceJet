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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [activeBookingTab, setActiveBookingTab] = useState('flights');
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

  const handleNavigate = (screen, tab = null) => {
    setCurrentScreen(screen);
    if (tab) {
      setActiveBookingTab(tab);
    }
    if (screen === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#F8FAFC] dark:bg-[#14151A] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Global SaaS Header with Theme Toggle */}
      <Header 
        currentScreen={currentScreen} 
        activeBookingTab={activeBookingTab}
        onNavigate={handleNavigate}
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
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {currentScreen === 'home' && (
          <HomeView
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            activeTab={activeBookingTab}
            setActiveTab={setActiveBookingTab}
            onSearch={() => setCurrentScreen('search')}
            onNavigate={handleNavigate}
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

      {/* Persistent Floating Help & Support FAB Widget (Strictly unobstructed at bottom-right) */}
      <HelpSupportWidget theme={theme} />

      {/* Global SaaS Footer */}
      <Footer />
    </div>
  );
}
