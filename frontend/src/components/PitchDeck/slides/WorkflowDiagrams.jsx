import React from 'react';
import { ArrowRight, ArrowDown, User, Building2, Wallet, CreditCard, Banknote, Shield, CheckCircle, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

const WorkflowDiagrams = ({ data }) => {
  const { workflows, boundaries, nenoFlow } = data.content;

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
        <div className="text-center mb-8">
          <p className="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">
            {data.subtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
            {data.title}
          </h2>
        </div>

        {/* NENO Token Operating Model */}
        {nenoFlow && (
          <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 mb-6">
            <CardContent className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-900">{nenoFlow.title}</h3>
                    <p className="text-sm text-amber-700">{nenoFlow.token} • {nenoFlow.chain}</p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-amber-100 rounded-lg border border-amber-200">
                  <p className="text-xl font-bold text-amber-800">{nenoFlow.fixedValue}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-white/60 rounded-lg">
                  <p className="text-xs font-semibold text-teal-600 mb-1">ON-RAMP FLOW</p>
                  <p className="text-sm text-amber-800 font-mono">{nenoFlow.onRampFlow}</p>
                </div>
                <div className="p-3 bg-white/60 rounded-lg">
                  <p className="text-xs font-semibold text-blue-600 mb-1">OFF-RAMP FLOW</p>
                  <p className="text-sm text-amber-800 font-mono">{nenoFlow.offRampFlow}</p>
                </div>
              </div>
              <p className="text-xs text-amber-600 mt-3 text-center italic">{nenoFlow.valueNote}</p>
            </CardContent>
          </Card>
        )}

        {/* Workflow Diagrams */}
        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          {/* On-Ramp Flow */}
          <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center">
                  <Banknote className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base text-slate-800">{workflows.onRamp.title}</CardTitle>
                  <p className="text-xs text-slate-500">{workflows.onRamp.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-1.5 pt-0">
              {workflows.onRamp.steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className={`flex items-center gap-2 p-2 rounded-lg border ${getOwnerStyle(step.owner)}`}>
                    <div className={`w-5 h-5 rounded-full ${getOwnerBadge(step.owner)} flex items-center justify-center text-white text-xs font-bold`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">{step.phase}</p>
                      <p className="text-xs opacity-80 truncate">{step.description}</p>
                    </div>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-white/50 whitespace-nowrap">{step.owner.split('-')[0]}</span>
                  </div>
                  {index < workflows.onRamp.steps.length - 1 && (
                    <div className="flex justify-center">
                      <ArrowDown className="w-3 h-3 text-teal-400" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Off-Ramp Flow */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base text-slate-800">{workflows.offRamp.title}</CardTitle>
                  <p className="text-xs text-slate-500">{workflows.offRamp.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-1.5 pt-0">
              {workflows.offRamp.steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className={`flex items-center gap-2 p-2 rounded-lg border ${getOwnerStyle(step.owner)}`}>
                    <div className={`w-5 h-5 rounded-full ${getOwnerBadge(step.owner)} flex items-center justify-center text-white text-xs font-bold`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">{step.phase}</p>
                      <p className="text-xs opacity-80 truncate">{step.description}</p>
                    </div>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-white/50 whitespace-nowrap">{step.owner.split('-')[0]}</span>
                  </div>
                  {index < workflows.offRamp.steps.length - 1 && (
                    <div className="flex justify-center">
                      <ArrowDown className="w-3 h-3 text-blue-400" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Risk & Custody Boundary */}
        <Card className="border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <CardTitle className="text-base text-slate-800">{boundaries.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-500"></div>
                  <h4 className="font-semibold text-teal-800 text-sm">NeoNoble (UX & Pricing Layer)</h4>
                </div>
                <ul className="space-y-1">
                  {boundaries.neonoble.map((item, i) => (
                    <li key={i} className={`flex items-start gap-2 text-xs ${item.includes('NENO') || item.includes('price') ? 'text-amber-700 font-medium' : 'text-teal-700'}`}>
                      <CheckCircle className="w-3 h-3 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                  <h4 className="font-semibold text-blue-800 text-sm">Provider-of-Record (Regulated)</h4>
                </div>
                <ul className="space-y-1">
                  {boundaries.provider.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-blue-700">
                      <CheckCircle className="w-3 h-3 shrink-0 mt-0.5" />
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
