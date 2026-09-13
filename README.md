# ✈️ SpiceJet — Next-Gen SaaS Airline Experience

> A premium, SaaS-quality reskin and interactive flight booking platform for **SpiceJet** ([spicejet.com](https://www.spicejet.com/)). Built with modern React, Tailwind CSS, Lucide Icons, and verified live airline data.

---

## 🌟 Highlights & Features

- **Strict Header Geometry**: 
  - Every interactive nav item, dropdown, and CTA shares the **exact same vertical baseline (`top: 16px`)** and **uniform `40px` height**.
  - Active routes render with a soft brand tint pill (`rgba(195,11,18,0.08)`).
  - Currency selector (`INR | ₹`) and SpiceClub loyalty dropdown include interactive chevron carets.
  - Primary CTA (*Login / Sign Up*) visually outranks siblings through contrast and weight without breaking height parity.

- **Verified Brand Identity (Zero Approximations)**:
  - **Primary Brand Red**: `#C30B12` (RGB: `195, 11, 18`)
  - **Secondary CTA Amber**: `#F7941D` (RGB: `247, 148, 29`)
  - **Typography**: `Poppins, sans-serif` paired with tabular-figure monospace numerals (`JetBrains Mono` / `ui-monospace`) for flight times, flight numbers, and prices.
  - **Brand Assets**: Official logo and live promotional campaign assets.

- **Full 6-Screen Interactive Flight Booking Funnel**:
  1. **Homepage (`/`)**: Dynamic hero, real-time flight search widget (Indian airport selectors `DEL`, `BOM`, `BLR`, `CCU`, etc., date pickers, passenger counter, special fare categories), quick access services, and promotional deal cards.
  2. **Flight Search Results (`/search`)**: 7-day lowest fare carousel, route modifier, live flight cards (`SG 162`, `SG 254`, `SG 8193`), and expandable fare tiers (`SpiceSaver` ₹22,301, `SpiceFlex` ₹22,721, `SpiceMax` ₹23,613).
  3. **Passenger Details (`/passengers`)**: Primary traveler details, SpiceClub loyalty reward points integration, GST business invoicing, travel insurance toggle, and itemized official tax breakdown.
  4. **Aircraft Cabin Seat Map (`/seats`)**: Boeing 737 interactive cabin layout featuring `SpiceMax` extra-legroom seats (Rows 1–3, Exit rows 12–13), forward preferred seats, and standard seats, plus SpiceCafé gourmet meals pre-booking.
  5. **Payment Checkout (`/payment`)**: 256-bit encrypted checkout supporting instant UPI QR scan, credit/debit cards, net banking, and SpiceClub points redemption.
  6. **Booking Confirmation (`/confirmation`)**: Confirmed PNR reference (`SG-7K9B2M`), digital boarding pass with Delhi Airport Terminal 3 gate guidance, e-Gate QR code, PDF print/download, and Apple/Google Wallet actions.

- **Interactive Quick-Jump Toolbar**:
  - A fixed bottom toolbar enables instant jumping between any of the 6 screens for testing and inspection.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) (consistent `1.75px` stroke and uniform sizing)
- **Typography**: Google Fonts [Poppins](https://fonts.google.com/specimen/Poppins)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/TricksXTech/SpiceJet.git

# Navigate into the project
cd SpiceJet

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📄 License
MIT License. Created for demonstration and UI/UX modernization purposes.
