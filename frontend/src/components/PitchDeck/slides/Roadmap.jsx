import React from 'react';
import { CheckCircle, Clock, Flag, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

const Roadmap = ({ data }) => {
  const phaseColors = [
    { bg: 'bg-teal-50', border: 'border-teal-200', badge: 'bg-teal-100 text-teal-700', icon: 'text-teal-600' },
    { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', icon: 'text-blue-600' },
    { bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-700', icon: 'text-indigo-600' }
  ];
  
  return (
    <div className="min-h-screen pt-24 pb-32 px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">
            {data.subtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
            {data.title}
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {data.content.phases.map((phase, index) => {
            const colors = phaseColors[index];
            return (
              <Card
                key={index}
                className={`${colors.border} ${colors.bg} hover:shadow-lg transition-shadow`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={colors.badge}>{phase.phase}</Badge>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      {phase.timeline}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-slate-800">
                    {phase.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {phase.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className={`w-4 h-4 ${colors.icon} shrink-0 mt-1`} />
                        <span className="text-slate-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-4">
          {data.content.phases.map((phase, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center gap-2">
                <Flag className={`w-4 h-4 ${phaseColors[index].icon}`} />
                <span className="text-sm font-medium text-slate-600">{phase.phase}</span>
              </div>
              {index < data.content.phases.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-300" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
