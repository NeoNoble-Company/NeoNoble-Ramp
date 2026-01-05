import React from 'react';
import { Monitor, GitBranch, Link2, Database, CheckCircle, Coins, DollarSign } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';

const TechnicalArchitecture = ({ data }) => {
  const layerIcons = [Monitor, DollarSign, GitBranch, Link2, Database];
  const layerColors = [
    'from-teal-500 to-teal-600',
    'from-amber-500 to-orange-500',
    'from-blue-500 to-blue-600',
    'from-indigo-500 to-indigo-600',
    'from-slate-500 to-slate-600'
  ];
  
  return (
    <div className="min-h-screen pt-24 pb-32 px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-10">
          <p className="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">
            {data.subtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
            {data.title}
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {data.content.layers.map((layer, index) => {
              const Icon = layerIcons[index % layerIcons.length];
              const isPricingLayer = layer.name.includes('Pricing');
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  <div className={`flex items-stretch bg-white rounded-xl border ${isPricingLayer ? 'border-amber-300 ring-2 ring-amber-100' : 'border-slate-200'} overflow-hidden hover:shadow-lg transition-shadow`}>
                    <div className={`w-14 bg-gradient-to-br ${layerColors[index % layerColors.length]} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 p-3">
                      <h4 className={`font-semibold mb-1.5 text-sm ${isPricingLayer ? 'text-amber-800' : 'text-slate-800'}`}>{layer.name}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {layer.components.map((comp, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2 py-0.5 rounded-md ${isPricingLayer ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < data.content.layers.length - 1 && (
                    <div className="absolute left-7 top-full h-3 w-px bg-slate-300" />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="space-y-4">
            {/* NENO Architecture Card */}
            {data.content.nenoArchitecture && (
              <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Coins className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-amber-900">{data.content.nenoArchitecture.title}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-white/60 rounded">
                      <span className="text-amber-700">Chain</span>
                      <span className="font-mono text-amber-900">{data.content.nenoArchitecture.chain}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white/60 rounded">
                      <span className="text-amber-700">Pricing</span>
                      <span className="font-semibold text-amber-900">{data.content.nenoArchitecture.pricing}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-amber-200">
                    <p className="text-xs font-semibold text-amber-700 mb-2">Layer Separation:</p>
                    <div className="space-y-1 text-xs">
                      <p className="text-amber-600"><span className="font-medium">UX:</span> {data.content.nenoArchitecture.layers.uxLayer}</p>
                      <p className="text-amber-600"><span className="font-medium">Pricing:</span> {data.content.nenoArchitecture.layers.pricingLayer}</p>
                      <p className="text-amber-600"><span className="font-medium">Provider:</span> {data.content.nenoArchitecture.layers.providerLayer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h3 className="text-base font-semibold text-slate-800 mb-4">Key Features</h3>
              <div className="space-y-2">
                {data.content.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${feature.includes('NENO') ? 'text-amber-500' : 'text-teal-500'}`} />
                    <span className={`text-sm ${feature.includes('NENO') ? 'text-amber-700 font-medium' : 'text-slate-700'}`}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalArchitecture;
