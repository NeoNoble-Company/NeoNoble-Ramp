import React from 'react';
import { ShieldCheck, CheckCircle, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

const ComplianceModel = ({ data }) => {
  return (
    <div className="min-h-screen pt-24 pb-32 px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">
            {data.subtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            {data.title}
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full border border-teal-100">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span className="font-semibold text-teal-800">{data.content.model}</span>
          </div>
        </div>
        
        <p className="text-center text-lg text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          {data.content.description}
        </p>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle className="text-lg text-slate-800">
                  Provider-of-Record Partner
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.content.partnerResponsibilities.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                </div>
                <CardTitle className="text-lg text-slate-800">
                  NeoNoble Role
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.content.neonobleRole.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-teal-500 shrink-0 mt-1" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplianceModel;
