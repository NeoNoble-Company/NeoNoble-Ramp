import React from 'react';
import { Users, Building2, Code2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';

const TargetUsers = ({ data }) => {
  const segmentIcons = [Users, Building2, Code2];
  
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
        
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {data.content.userSegments.map((segment, index) => {
            const Icon = segmentIcons[index];
            return (
              <Card
                key={index}
                className="border-slate-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg bg-white"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {segment.segment}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {segment.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Primary Use Cases</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.content.useCases.map((useCase, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-teal-200 transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-teal-500 shrink-0" />
                <span className="text-slate-700">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetUsers;
