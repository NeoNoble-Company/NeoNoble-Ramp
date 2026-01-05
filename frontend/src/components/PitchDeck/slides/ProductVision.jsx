import React from 'react';
import { Target, Route, ShieldCheck, Wrench } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';

const ProductVision = ({ data }) => {
  const icons = [Target, Route, ShieldCheck, Wrench];
  
  return (
    <div className="min-h-screen pt-24 pb-32 px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
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
        
        <div className="grid md:grid-cols-2 gap-6">
          {data.content.valueProps.map((prop, index) => {
            const Icon = icons[index];
            return (
              <Card
                key={index}
                className="border-slate-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg group bg-white"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 group-hover:from-teal-100 group-hover:to-teal-200 flex items-center justify-center mb-6 transition-colors">
                    <Icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {prop.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
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
