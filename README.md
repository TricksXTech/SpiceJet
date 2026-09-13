# ✈️ SpiceJet — Next-Gen SaaS Airline Experience

> A premium, SaaS-quality reskin and interactive flight booking platform for **SpiceJet** ([spicejet.com](https://www.spicejet.com/)). Built with modern React, Tailwind CSS, Lucide Icons, and verified live airline data.

---

## 🌟 Highlights & Features

- **Strict Header Geometry & Responsive Overflow Prevention**: 
  - Every interactive nav item, dropdown, and CTA shares the **exact same vertical baseline (`top: 16px`)** and **uniform `40px` height**.
  - Proportional breakpoint spacing: on `< 1280px`, secondary items (*Deals*, *Help*) collapse into a **"More"** overflow menu.
  - On `< 1024px`, the full navigation cleanly collapses into a responsive hamburger drawer.
  - The primary CTA (*Login / Sign Up*) **never collapses or clips** and remains fully visible across all screen sizes (1440px, 1280px, 1024px, 768px, 375px).

- **Theme Toggle (Full Light & Dark Mode Support)**:
  - Custom CSS properties with smooth transitions: Light mode background (`#F8FAFC`) and Dark mode neutral charcoal (`#14151A`).
  - Dark mode brand red adjusted to `#FF3B46` to achieve strict **WCAG AA (4.5:1+)** contrast against dark surfaces.
  - Dark-adapted shadows, borders, and tinted badges across every screen.

- **Complete Real Station Dataset (79 Airports)**:
  - Extracted directly from SpiceJet's official live API (`/api/v1/search/getStationDetails`).
  - Real-time text search filtering in both Origin and Destination dropdowns (e.g. typing "Goa" shows both `GOI` Dabolim and `GOX` Mopa; "Dub" shows `DXB` and `DWC`).
  - Full dynamic route propagation: changing origin and destination dynamically recalculates flights, durations, terminals, and tariffs across all 6 screens.

- **Persistent Floating Help & Support FAB Widget**:
  - Fixed-position bottom-right floating action button (56px desktop / 48px mobile) accessible on every screen with zero layout overlap.
  - Animated slide-over drawer with 4 scannable tabs: **How to Book** mini-guide, interactive **FAQs accordion** (baggage, date change, check-in, refunds), **Live Chat stub** with instant replies, and **Official 24x7 Contact Details**.
  - Full keyboard accessibility: Tab focus trap, Escape key dismiss with focus return, and ARIA attributes.


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
