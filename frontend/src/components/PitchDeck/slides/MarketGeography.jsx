import React from 'react';
import { MapPin, TrendingUp, FileCheck, Banknote } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';

const MarketGeography = ({ data }) => {
  return (
    <div className="min-h-screen pt-24 pb-32 px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">
              {data.subtitle}
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              {data.title}
            </h2>
            
            <div className="flex items-center gap-3 mb-8 p-4 bg-teal-50 rounded-xl border border-teal-100">
              <MapPin className="w-6 h-6 text-teal-600" />
              <span className="text-lg font-semibold text-teal-800">
                {data.content.primaryMarket}
              </span>
            </div>
            
            <div className="space-y-4">
              {data.content.geographicAdvantages.map((advantage, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-teal-600 text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="text-slate-700">{advantage}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            {data.content.marketStats.map((stat, index) => {
              const icons = [TrendingUp, Banknote, FileCheck];
              const Icon = icons[index];
              return (
                <Card key={index} className="border-slate-200 bg-white overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-stretch">
                      <div className="w-24 bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 p-6">
                        <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                        <p className="text-sm text-teal-600 mt-1">{stat.note}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketGeography;
