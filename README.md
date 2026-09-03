# ⚽ TurfHub — Frontend Web Application

A sleek, high-converting, and modern enterprise sports arena booking and venue management client built with **React 19**, **Vite**, and **Tailwind CSS**.

---

## ✨ Features

- 🌟 **Enterprise Sports UI/UX**: Designed with deep slate, emerald accents, glassmorphism headers, and smooth micro-interactions.
- 🔍 **Interactive Discovery & Search**: Hero search bar with instant filtering by location, sport category (Football, Cricket, Badminton, Tennis, Volleyball), and price range.
- 🏟️ **Venue Showcase & Court Sections**: Detailed arena views featuring photo galleries, pitch specs (5v5, 7v7), floodlight amenities, and verified player reviews.
- ⏱️ **Real-Time Slot Reservation**: Visual time-slot selection with automatic conflict detection, booking duration calculation, and pricing breakdown.
- 💳 **Stripe Payment Checkout**: Seamless online card checkout with instant confirmation and booking verification.
- 📊 **Business Dashboard Suites**:
  - **Player Suite**: View match schedules, upcoming games, past bookings, and write reviews.
  - **Venue Partner Suite**: Manage arenas, update sport courts, inspect live reservation calendars, and view revenue analytics.
  - **Admin Suite**: Moderate users, approve new venue partners, review listings, and inspect system reports.
- 📈 **Data Visualizations**: Recharts-powered revenue trends, booking frequency, and sport-wise earnings breakdown.
- 🌓 **Dark & Light Mode**: Seamless theme switching with persistent custom themes (`turf-light` and `turf-dark`).

---

## 🛠️ Tech Stack

- **Core Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Charts & Graphs**: [Recharts](https://recharts.org/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/) & [SweetAlert2](https://sweetalert2.github.io/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Authentication & Backend**: Firebase Authentication & REST API
- **Deployment**: [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

## 📁 Project Structure

```
Turf-management-system-frontend/
├── public/                   # Static assets & favicon
├── src/
│   ├── api/
│   │   └── axios.js          # Configured Axios instance with JWT interceptors
│   ├── components/
│   │   ├── Footer.jsx        # 4-column enterprise footer with trust badges
│   │   ├── ImageUpload.jsx   # Drag-and-drop image uploader
│   │   └── Navbar.jsx        # Sticky glassmorphism header & responsive nav
│   ├── layouts/
│   │   ├── AuthLayout.jsx    # Authentication layout
│   │   ├── DashboardLayout.jsx # Enterprise sidebar & header dashboard layout
│   │   └── HomeLayout.jsx    # Public customer navigation layout
│   ├── pages/
│   │   ├── dashboard/        # Dashboard suites (Admin, Owner, Player)
│   │   │   ├── AddTurf.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── DashboardHome.jsx
│   │   │   ├── Earnings.jsx
│   │   │   ├── EditTurf.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── MyTurfs.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Schedule.jsx
│   │   ├── About.jsx         # Platform mission & story
│   │   ├── AllTurfs.jsx      # Arenas directory & sport category filtering
│   │   ├── Contact.jsx       # Help center & inquiries
│   │   ├── Home.jsx          # Interactive landing page
│   │   ├── Login.jsx         # Modern credentials authentication
│   │   ├── Payment.jsx       # Checkout flow
│   │   ├── Register.jsx      # Player & Venue Partner onboarding
│   │   ├── SectionBooking.jsx # Slot picker & checkout trigger
│   │   └── TurfDetails.jsx   # Venue profile & reviews
│   ├── provider/
│   │   ├── AuthProvider.jsx  # Global auth context & session storage
│   │   ├── PrivateRoute.jsx  # Route guards for authenticated users
│   │   └── ThemeProvider.jsx # Light / Dark mode context
│   ├── router/
│   │   └── router.jsx        # Route definitions and data loaders
│   ├── utils/
│   │   └── imageUrl.js       # Cloudinary / local image URL resolver
│   ├── index.css             # Theme variables, typography, and utility styles
│   └── main.jsx              # React app mount & provider wrappers
├── .firebaserc               # Firebase project mapping
├── firebase.json             # Firebase SPA hosting rules
├── package.json              # Frontend dependencies and scripts
└── vite.config.js            # Vite bundler configuration
```

---

## ⚙️ Environment Variables

Create a `.env` file inside `Turf-management-system-frontend/`:

```env
# Backend REST API endpoint (Local or Live Vercel URL)
VITE_API_URL=https://your-turf-backend.vercel.app/api

# Stripe Publishable Key (for credit card checkout)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:...
```

---

## 🏁 Getting Started Locally

### 1. Navigate & Install
```bash
cd Turf-management-system-frontend
npm install
```

### 2. Configure Environment
Ensure your `.env` is created and points to your running backend:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
This compiles the production-optimized files into the `dist/` directory.

---

## ☁️ Deployment (Firebase Hosting)

1. Ensure the project is built:
   ```bash
   npm run build
   ```
2. Login to Firebase CLI:
   ```bash
   npx -y firebase-tools login
   ```
3. Deploy to Firebase:
   ```bash
   npx -y firebase-tools deploy
   ```
The terminal will output your live URL (e.g. `https://your-project.web.app`).
