import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Turf<span className="text-emerald-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              The premier sports arena booking and venue management platform. Built for players, loved by turf owners.
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live Availability
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/all-turfs" className="hover:text-emerald-400 transition-colors">Find Arenas</Link>
              </li>
              <li>
                <Link to="/all-turfs?sectionType=football" className="hover:text-emerald-400 transition-colors">Football Turfs</Link>
              </li>
              <li>
                <Link to="/all-turfs?sectionType=cricket" className="hover:text-emerald-400 transition-colors">Cricket Arenas</Link>
              </li>
              <li>
                <Link to="/all-turfs?sectionType=badminton" className="hover:text-emerald-400 transition-colors">Badminton Courts</Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">Help & Contact</Link>
              </li>
              <li>
                <Link to="/auth/register" className="hover:text-emerald-400 transition-colors">List Your Turf</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Owner Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Security & Reliability */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Security & Trust</h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Fast, secure online slot reservation with instant payment confirmation via Stripe.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% Guaranteed Booking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TurfHub Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
