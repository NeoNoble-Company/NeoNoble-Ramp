import React from 'react';
import { TrendingUp, DollarSign, Rocket, Target, Users, Globe, Zap, BarChart3, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';

const RevenueStrategy = ({ data }) => {
  const driverIcons = [Users, Globe, Target, Zap, Rocket];
  
  return (
    <div className="min-h-screen pt-24 pb-32 px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <p className="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">
            {data.subtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            {data.title}
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full border border-teal-100">
            <DollarSign className="w-5 h-5 text-teal-600" />
            <span className="font-semibold text-teal-800">{data.content.revenueModel}</span>
          </div>
        </div>
        
        <p className="text-center text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          {data.content.description}
        </p>
        
        {/* Revenue Streams */}
        {data.content.revenueStreams && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {data.content.revenueStreams.map((stream, index) => (
              <Card key={index} className="border-slate-200 bg-white hover:border-teal-200 transition-colors">
                <CardContent className="p-4">
                  <div className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center ${
                    index === 0 ? 'bg-teal-100' : index === 1 ? 'bg-blue-100' : index === 2 ? 'bg-indigo-100' : 'bg-slate-100'
                  }`}>
                    {index === 0 ? <ArrowRight className="w-4 h-4 text-teal-600" /> :
                     index === 1 ? <ArrowLeft className="w-4 h-4 text-blue-600" /> :
                     <DollarSign className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-1">{stream.stream}</h4>
                  <p className="text-xs text-slate-500">{stream.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-teal-600" />
              Volume Projections
            </h3>
            <div className="space-y-3">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Early Stage</p>
                      <p className="text-xl font-bold text-slate-800">{data.content.projections.earlyStage}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      <span className="text-slate-600 font-medium text-sm">Y1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Scaling Phase</p>
                      <p className="text-xl font-bold text-slate-800">{data.content.projections.scalingPhase}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-teal-600 font-medium text-sm">Y2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-teal-200 bg-teal-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-teal-600">Growth Phase</p>
                      <p className="text-xl font-bold text-teal-800">{data.content.projections.growthPhase}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-teal-200 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-teal-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-teal-600" />
              Growth Drivers
            </h3>
            <div className="space-y-3">
              {data.content.growthDrivers.map((driver, index) => {
                const Icon = driverIcons[index];
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-teal-600" />
                    </div>
                    <span className="text-slate-700 text-sm font-medium">{driver}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueStrategy;
