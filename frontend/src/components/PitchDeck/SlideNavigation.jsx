import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const SlideNavigation = ({ currentSlide, totalSlides, onNavigate }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-slate-200 z-50">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate(currentSlide - 1)}
        disabled={currentSlide === 0}
        className="p-2 hover:bg-slate-100 disabled:opacity-30 transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5 text-slate-600" />
      </Button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? 'w-8 bg-teal-600'
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate(currentSlide + 1)}
        disabled={currentSlide === totalSlides - 1}
        className="p-2 hover:bg-slate-100 disabled:opacity-30 transition-all duration-200"
      >
        <ChevronRight className="w-5 h-5 text-slate-600" />
      </Button>
      
      <div className="ml-2 pl-4 border-l border-slate-200">
        <span className="text-sm font-medium text-slate-600">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>
    </div>
  );
};

export default SlideNavigation;
