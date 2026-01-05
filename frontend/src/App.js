import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PitchDeck from "./components/PitchDeck/PitchDeck";
import OffRampPortal from "./components/OffRamp/OffRampPortal";
import DeveloperPortal from "./components/Developer/DeveloperPortal";

// Navigation Header Component
const NavHeader = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
          <span className="text-white font-bold text-sm">N</span>
        </div>
        <span className="font-semibold text-white">NeoNoble</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/pitch-deck" className="text-sm text-slate-300 hover:text-white transition-colors">
          Pitch Deck
        </Link>
        <Link to="/offramp" className="text-sm text-slate-300 hover:text-white transition-colors">
          Off-Ramp
        </Link>
        <Link to="/developer" className="text-sm text-slate-300 hover:text-white transition-colors">
          Developer
        </Link>
      </div>
    </div>
  </nav>
);

// Home/Landing Page
const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mx-auto mb-6 shadow-xl">
          <span className="text-white font-bold text-3xl">N</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">NeoNoble Ramp</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Fiat-to-Crypto & Crypto-to-Fiat Routing Platform with NENO Token
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
          <span className="text-amber-400 font-semibold">NENO @ €10,000</span>
          <span className="text-amber-300/70">per unit (fixed)</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/pitch-deck" className="group">
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-teal-500/50 transition-all hover:shadow-xl hover:shadow-teal-500/10">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4 group-hover:bg-teal-500/30 transition-colors">
              <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Pitch Deck</h3>
            <p className="text-sm text-slate-400">Partnership presentation for enterprise providers</p>
          </div>
        </Link>

        <Link to="/offramp" className="group">
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-xl hover:shadow-amber-500/10">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors">
              <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">NENO Off-Ramp</h3>
            <p className="text-sm text-slate-400">Convert NENO tokens to EUR via SEPA payout</p>
          </div>
        </Link>

        <Link to="/developer" className="group">
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Developer Portal</h3>
            <p className="text-sm text-slate-400">API keys and integration documentation</p>
          </div>
        </Link>
      </div>

      <div className="mt-16 p-6 bg-slate-800/30 rounded-2xl border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Provider-of-Record Engine</h3>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="p-3 bg-slate-900/50 rounded-lg">
            <p className="text-slate-400">Status</p>
            <p className="text-green-400 font-semibold">Operational</p>
          </div>
          <div className="p-3 bg-slate-900/50 rounded-lg">
            <p className="text-slate-400">NENO Price</p>
            <p className="text-amber-400 font-semibold">€10,000</p>
          </div>
          <div className="p-3 bg-slate-900/50 rounded-lg">
            <p className="text-slate-400">PoR Fee</p>
            <p className="text-white font-semibold">1.5%</p>
          </div>
          <div className="p-3 bg-slate-900/50 rounded-lg">
            <p className="text-slate-400">Payout</p>
            <p className="text-white font-semibold">SEPA (EUR)</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-slate-500">
        <p>NeoNoble Ramp • NeoExchange • massimoadmin@neonoble.it</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pitch-deck" element={<PitchDeck />} />
          <Route path="/offramp" element={<OffRampPortal />} />
          <Route path="/developer" element={<DeveloperPortal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
