import React from 'react';
import { Target, Route, ShieldCheck, Wrench, ArrowRightLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';

const ProductVision = ({ data }) => {
  const icons = [ArrowRightLeft, Target, Route, ShieldCheck];
  
  return (
    <div className="min-h-screen pt-24 pb-32 px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">
            {data.subtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {data.content.vision}
          </p>
        </div>
        
        {/* Dual Flow Section */}
        {data.content.dualFlow && (
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white">
              <CardContent className="p-6">
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
              <CardContent className="p-6">
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
        
        <div className="grid md:grid-cols-2 gap-6">
          {data.content.valueProps.map((prop, index) => {
            const Icon = icons[index];
            return (
              <Card
                key={index}
                className="border-slate-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg group bg-white"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 group-hover:from-teal-100 group-hover:to-teal-200 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
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
