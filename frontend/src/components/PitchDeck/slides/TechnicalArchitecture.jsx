import React from 'react';
import { Monitor, GitBranch, Link2, Database, CheckCircle } from 'lucide-react';

const TechnicalArchitecture = ({ data }) => {
  const layerIcons = [Monitor, GitBranch, Link2, Database];
  const layerColors = [
    'from-teal-500 to-teal-600',
    'from-blue-500 to-blue-600',
    'from-indigo-500 to-indigo-600',
    'from-slate-500 to-slate-600'
  ];
  
  return (
    <div className="min-h-screen pt-24 pb-32 px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-12">
          <p className="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">
            {data.subtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
            {data.title}
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {data.content.layers.map((layer, index) => {
              const Icon = layerIcons[index];
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className="flex items-stretch bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`w-16 bg-gradient-to-br ${layerColors[index]} flex items-center justify-center shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 p-4">
                      <h4 className="font-semibold text-slate-800 mb-2">{layer.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {layer.components.map((comp, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < data.content.layers.length - 1 && (
                    <div className="absolute left-8 top-full h-4 w-px bg-slate-300" />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-6">Key Features</h3>
            <div className="space-y-4">
              {data.content.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalArchitecture;
