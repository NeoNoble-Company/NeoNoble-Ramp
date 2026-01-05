import React from 'react';
import { ArrowRight, ArrowDown, User, Building2, Wallet, CreditCard, Banknote, Shield, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

const WorkflowDiagrams = ({ data }) => {
  const { workflows, boundaries } = data.content;

  const getOwnerStyle = (owner) => {
    if (owner === 'NeoNoble') {
      return 'bg-teal-100 text-teal-700 border-teal-200';
    }
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  const getOwnerBadge = (owner) => {
    if (owner === 'NeoNoble') {
      return 'bg-teal-500';
    }
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-8 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <p className="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">
            {data.subtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
            {data.title}
          </h2>
        </div>

        {/* Workflow Diagrams */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* On-Ramp Flow */}
          <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg text-slate-800">{workflows.onRamp.title}</CardTitle>
                  <p className="text-sm text-slate-500">{workflows.onRamp.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {workflows.onRamp.steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className={`flex items-center gap-3 p-3 rounded-lg border ${getOwnerStyle(step.owner)}`}>
                    <div className={`w-6 h-6 rounded-full ${getOwnerBadge(step.owner)} flex items-center justify-center text-white text-xs font-bold`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{step.phase}</p>
                      <p className="text-xs opacity-80">{step.description}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/50">{step.owner}</span>
                  </div>
                  {index < workflows.onRamp.steps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="w-4 h-4 text-teal-400" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Off-Ramp Flow */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg text-slate-800">{workflows.offRamp.title}</CardTitle>
                  <p className="text-sm text-slate-500">{workflows.offRamp.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {workflows.offRamp.steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className={`flex items-center gap-3 p-3 rounded-lg border ${getOwnerStyle(step.owner)}`}>
                    <div className={`w-6 h-6 rounded-full ${getOwnerBadge(step.owner)} flex items-center justify-center text-white text-xs font-bold`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{step.phase}</p>
                      <p className="text-xs opacity-80">{step.description}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/50">{step.owner}</span>
                  </div>
                  {index < workflows.offRamp.steps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown className="w-4 h-4 text-blue-400" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Risk & Custody Boundary */}
        <Card className="border-slate-200 bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-lg text-slate-800">{boundaries.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                  <h4 className="font-semibold text-teal-800">NeoNoble (UX Layer)</h4>
                </div>
                <ul className="space-y-2">
                  {boundaries.neonoble.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-teal-700">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <h4 className="font-semibold text-blue-800">Provider-of-Record (Regulated)</h4>
                </div>
                <ul className="space-y-2">
                  {boundaries.provider.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowDiagrams;
