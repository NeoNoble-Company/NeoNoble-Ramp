import React from 'react';
import { Layers } from 'lucide-react';

const SlideHeader = ({ slideNumber, totalSlides }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">NeoNoble Ramp</h1>
            <p className="text-xs text-slate-500">Partnership Pitch Deck</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <div className="h-1 w-32 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-500 ease-out"
                style={{ width: `${((slideNumber + 1) / totalSlides) * 100}%` }}
              />
            </div>
          </div>
          <a
            href="https://crypto-onramp-2.emergent.host"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
          >
            Visit Platform
          </a>
        </div>
      </div>
    </header>
  );
};

export default SlideHeader;
