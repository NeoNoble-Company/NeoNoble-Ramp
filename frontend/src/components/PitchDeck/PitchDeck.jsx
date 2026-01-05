import React, { useState, useEffect, useCallback } from 'react';
import { slides as mockSlides } from '../../data/mockData';
import SlideHeader from './SlideHeader';
import SlideNavigation from './SlideNavigation';
import apiService from '../../services/api';

// Import all slide components
import CompanyOverview from './slides/CompanyOverview';
import ProductVision from './slides/ProductVision';
import TargetUsers from './slides/TargetUsers';
import MarketGeography from './slides/MarketGeography';
import ComplianceModel from './slides/ComplianceModel';
import TechnicalArchitecture from './slides/TechnicalArchitecture';
import PartnershipModel from './slides/PartnershipModel';
import RevenueStrategy from './slides/RevenueStrategy';
import Roadmap from './slides/Roadmap';
import ContactSlide from './slides/ContactSlide';

const slideComponents = [
  CompanyOverview,
  ProductVision,
  TargetUsers,
  MarketGeography,
  ComplianceModel,
  TechnicalArchitecture,
  PartnershipModel,
  RevenueStrategy,
  Roadmap,
  ContactSlide
];

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slides, setSlides] = useState(mockSlides);
  const [loading, setLoading] = useState(true);

  // Fetch slides from backend on mount
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await apiService.getSlides();
        if (data && data.length > 0) {
          setSlides(data);
        }
      } catch (error) {
        console.log('Using mock data - backend not available:', error.message);
        // Keep using mock data if backend fails
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const navigateToSlide = useCallback((index) => {
    if (index < 0 || index >= slides.length || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        navigateToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigateToSlide(currentSlide - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        navigateToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        navigateToSlide(slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, navigateToSlide, slides.length]);

  const CurrentSlideComponent = slideComponents[currentSlide];
  const currentSlideData = slides[currentSlide];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading presentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <SlideHeader 
        slideNumber={currentSlide} 
        totalSlides={slides.length} 
      />
      
      <main 
        className={`transition-all duration-400 ease-out ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <CurrentSlideComponent data={currentSlideData} />
      </main>
      
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onNavigate={navigateToSlide}
      />
      
      {/* Keyboard hint */}
      <div className="fixed bottom-8 right-8 hidden lg:flex items-center gap-2 text-xs text-slate-400">
        <span>Use</span>
        <kbd className="px-2 py-1 bg-slate-100 rounded text-slate-500">←</kbd>
        <kbd className="px-2 py-1 bg-slate-100 rounded text-slate-500">→</kbd>
        <span>to navigate</span>
      </div>
    </div>
  );
};

export default PitchDeck;
