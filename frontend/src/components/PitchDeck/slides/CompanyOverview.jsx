import React from 'react';
import { Globe, Shield, Zap, Code, ArrowRightLeft } from 'lucide-react';

const CompanyOverview = ({ data }) => {
  const icons = [Shield, ArrowRightLeft, Zap, Globe, Code];
  
  return (
    <div className="min-h-screen pt-24 pb-32 px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">
                {data.subtitle}
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                {data.content.headline}
              </h2>
            </div>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              {data.content.description}
            </p>
            
            <a
              href={data.content.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors group"
            >
              <Globe className="w-4 h-4" />
              <span>{data.content.website.replace('https://', '')}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
          
          <div className="space-y-3">
            {data.content.keyPoints.map((point, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-50 group-hover:bg-teal-100 flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <p className="text-slate-700 font-medium pt-2 text-sm">{point}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
