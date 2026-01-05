import React from 'react';
import { ShieldCheck, CheckCircle, Building, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

const ComplianceModel = ({ data }) => {
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
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span className="font-semibold text-teal-800">{data.content.model}</span>
          </div>
        </div>
        
        <p className="text-center text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          {data.content.description}
        </p>
        
        {/* Compliance Split by Direction */}
        {data.content.complianceSplit && (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="border-teal-200 bg-teal-50/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowRight className="w-5 h-5 text-teal-600" />
                  <h4 className="font-semibold text-teal-800">On-Ramp Compliance</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-teal-700 w-16">KYC:</span>
                    <span className="text-teal-600">{data.content.complianceSplit.onRamp.kyc}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-teal-700 w-16">AML:</span>
                    <span className="text-teal-600">{data.content.complianceSplit.onRamp.aml}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-teal-700 w-16">Settlement:</span>
                    <span className="text-teal-600">{data.content.complianceSplit.onRamp.settlement}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowLeft className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Off-Ramp Compliance</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-blue-700 w-16">KYB:</span>
                    <span className="text-blue-600">{data.content.complianceSplit.offRamp.kyb}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-blue-700 w-16">AML:</span>
                    <span className="text-blue-600">{data.content.complianceSplit.offRamp.aml}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-blue-700 w-16">Payout:</span>
                    <span className="text-blue-600">{data.content.complianceSplit.offRamp.payout}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="grid lg:grid-cols-2 gap-6">
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
            <CardContent className="space-y-2">
              {data.content.partnerResponsibilities.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
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
            <CardContent className="space-y-2">
              {data.content.neonobleRole.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
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
