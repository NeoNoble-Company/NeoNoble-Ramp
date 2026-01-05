import React from 'react';
import { Target, Route, ShieldCheck, Wrench, ArrowRightLeft, ArrowRight, Coins } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';

const ProductVision = ({ data }) => {
  const icons = [Coins, Target, Route, ShieldCheck];
  
  return (
    <div className="min-h-screen pt-24 pb-32 px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <p className="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">
            {data.subtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            {data.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {data.content.vision}
          </p>
        </div>
        
        {/* NENO Token Model Card */}
        {data.content.nenoModel && (
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-900">{data.content.nenoModel.token}</h3>
                  <p className="text-sm text-amber-700">{data.content.nenoModel.chain}</p>
                </div>
                <div className="ml-auto px-4 py-2 bg-amber-100 rounded-lg border border-amber-200">
                  <p className="text-2xl font-bold text-amber-800">{data.content.nenoModel.fixedValue}</p>
                  <p className="text-xs text-amber-600 text-center">per unit</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-white/60 rounded-lg border border-amber-100">
                  <p className="text-xs font-semibold text-teal-600 mb-1">ON-RAMP</p>
                  <p className="text-sm text-amber-800">{data.content.nenoModel.onRamp}</p>
                </div>
                <div className="p-3 bg-white/60 rounded-lg border border-amber-100">
                  <p className="text-xs font-semibold text-blue-600 mb-1">OFF-RAMP</p>
                  <p className="text-sm text-amber-800">{data.content.nenoModel.offRamp}</p>
                </div>
              </div>
              <p className="text-xs text-amber-600 mt-3 text-center italic">{data.content.nenoModel.valueNote}</p>
            </CardContent>
          </Card>
        )}
        
        {/* Dual Flow Section */}
        {data.content.dualFlow && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-teal-800">{data.content.dualFlow.onRamp.title}</h3>
                </div>
                <p className="text-sm text-teal-700 font-mono mb-3 bg-teal-100 px-3 py-2 rounded">
                  {data.content.dualFlow.onRamp.flow}
                </p>
                <ul className="space-y-1">
                  {data.content.dualFlow.onRamp.benefits.map((benefit, i) => (
                    <li key={i} className="text-sm text-teal-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center transform rotate-180">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800">{data.content.dualFlow.offRamp.title}</h3>
                </div>
                <p className="text-sm text-blue-700 font-mono mb-3 bg-blue-100 px-3 py-2 rounded">
                  {data.content.dualFlow.offRamp.flow}
                </p>
                <ul className="space-y-1">
                  {data.content.dualFlow.offRamp.benefits.map((benefit, i) => (
                    <li key={i} className="text-sm text-blue-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-4">
          {data.content.valueProps.map((prop, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Card
                key={index}
                className="border-slate-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg group bg-white"
              >
                <CardContent className="p-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 group-hover:from-teal-100 group-hover:to-teal-200 flex items-center justify-center mb-3 transition-colors">
                    <Icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {prop.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductVision;
