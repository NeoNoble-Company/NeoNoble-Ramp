import React from 'react';
import { Handshake, Boxes, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

const PartnershipModel = ({ data }) => {
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
        
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {data.content.partnershipTypes.map((type, index) => {
            const icons = [Handshake, Boxes];
            const Icon = icons[index];
            return (
              <Card key={index} className="border-slate-200 bg-white hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <CardTitle className="text-xl text-slate-800">
                      {type.type}
                    </CardTitle>
                  </div>
                  <p className="text-slate-600">{type.description}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-slate-500 mb-3">Partner Benefits</p>
                  <div className="space-y-2">
                    {type.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-500" />
                        <span className="text-slate-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Integration Options</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.content.integrationOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-4 bg-white rounded-lg border border-slate-200 hover:border-teal-200 transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-teal-500 shrink-0" />
                <span className="text-slate-700 text-sm font-medium">{option}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipModel;
