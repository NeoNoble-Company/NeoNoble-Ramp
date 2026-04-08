import React, { useState, useEffect, useCallback } from 'react';
import { Shield, TrendingUp, Building, Activity, Globe, BarChart3, RefreshCw, ExternalLink, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL;

function xhrFetch(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'GET', url);
    Object.entries(opts.headers || {}).forEach(([k, v]) => xhr.setRequestHeader(k, v));
    xhr.onload = () => { try { resolve(JSON.parse(xhr.responseText)); } catch { reject(new Error(xhr.statusText)); } };
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.send(opts.body || null);
  });
}

const StatCard = ({ label, value, sub, icon: Icon, color = 'emerald' }) => (
  <div className={`bg-zinc-900/80 border border-${color}-500/20 rounded-xl p-4`} data-testid={`stat-${label.toLowerCase().replace(/\s/g,'-')}`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-zinc-500 text-xs uppercase tracking-wider">{label}</span>
      {Icon && <Icon className={`w-4 h-4 text-${color}-500`} />}
    </div>
    <div className={`text-xl font-bold text-${color}-400`}>{value}</div>
    {sub && <div className="text-[10px] text-zinc-600 mt-1">{sub}</div>}
  </div>
);

export default function AdminDashboard() {
  const [financials, setFinancials] = useState(null);
  const [pnl, setPnl] = useState(null);
  const [structure, setStructure] = useState(null);
  const [safeguarding, setSafeguarding] = useState(null);
  const [bankingRails, setBankingRails] = useState(null);
  const [securityStatus, setSecurityStatus] = useState(null);
  const [treasuryCheck, setTreasuryCheck] = useState(null);
  const [recentTxs, setRecentTxs] = useState([]);
  const [realTreasury, setRealTreasury] = useState(null);
  const [virtualMetrics, setVirtualMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  const headers = useCallback(() => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const h = headers();
    try {
      const [fin, p, str, saf, br, sec, tc, txs, rt, vm] = await Promise.all([
        xhrFetch(`${API}/api/institutional/financials`, { headers: h }).catch(() => null),
        xhrFetch(`${API}/api/institutional/pnl?period_hours=24`, { headers: h }).catch(() => null),
        xhrFetch(`${API}/api/institutional/structure`, { headers: h }).catch(() => null),
        xhrFetch(`${API}/api/institutional/compliance/safeguarding`, { headers: h }).catch(() => null),
        xhrFetch(`${API}/api/institutional/banking-rails`, { headers: h }).catch(() => null),
        xhrFetch(`${API}/api/neno-exchange/security-status`, { headers: h }).catch(() => null),
        xhrFetch(`${API}/api/institutional/risk/treasury-check/NENO?amount=1`, { headers: h }).catch(() => null),
        xhrFetch(`${API}/api/neno-exchange/transactions?limit=10`, { headers: h }).catch(() => null),
        xhrFetch(`${API}/api/strategic/real-treasury`, { headers: h }).catch(() => null),
        xhrFetch(`${API}/api/strategic/virtual-metrics`, { headers: h }).catch(() => null),
      ]);
      setFinancials(fin); setPnl(p); setStructure(str); setSafeguarding(saf);
      setBankingRails(br); setSecurityStatus(sec); setTreasuryCheck(tc);
      setRecentTxs(txs?.transactions || []);
      setRealTreasury(rt); setVirtualMetrics(vm);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [headers]);

  useEffect(() => { fetchAll(); const i = setInterval(fetchAll, 30000); return () => clearInterval(i); }, [fetchAll]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'real-virtual', label: 'Real vs Virtual', icon: Shield },
    { id: 'treasury', label: 'Treasury & Risk', icon: Lock },
    { id: 'structure', label: 'IPO Structure', icon: Building },
    { id: 'rails', label: 'Banking Rails', icon: Globe },
    { id: 'executions', label: 'Execution Logs', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white" data-testid="admin-dashboard">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Admin Command Center
            </h1>
            <p className="text-zinc-500 text-sm">NeoNoble Ramp — IPO-Ready Fintech Platform</p>
          </div>
          <button onClick={fetchAll} className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition" data-testid="refresh-btn">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="flex gap-1 mb-6 bg-zinc-900/50 rounded-xl p-1" data-testid="tab-nav">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                tab === t.id ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
              }`} data-testid={`tab-${t.id}`}>
              <t.icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard label="Volume Totale" value={`EUR ${(financials?.kpis?.total_volume_eur || 0).toLocaleString()}`} icon={TrendingUp} />
              <StatCard label="Transazioni" value={financials?.kpis?.total_transactions || 0} icon={Activity} color="cyan" />
              <StatCard label="Utenti" value={financials?.kpis?.total_users || 0} icon={Building} color="blue" />
              <StatCard label="Revenue/User" value={`EUR ${financials?.kpis?.revenue_per_user_eur || 0}`} icon={BarChart3} color="amber" />
            </div>
            {pnl && (
              <div className="bg-zinc-900/80 border border-emerald-500/20 rounded-xl p-4">
                <h3 className="text-sm font-bold text-emerald-400 mb-3">PnL (24h)</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-400">EUR {pnl.trading_fees?.total_eur || 0}</div>
                    <div className="text-[10px] text-zinc-500">Trading Fees ({pnl.trading_fees?.count || 0} trades)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-cyan-400">EUR {pnl.spread_revenue?.total_eur || 0}</div>
                    <div className="text-[10px] text-zinc-500">Spread Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-400">EUR {pnl.total_revenue_eur || 0}</div>
                    <div className="text-[10px] text-zinc-500">Revenue Totale</div>
                  </div>
                </div>
              </div>
            )}
            {safeguarding && (
              <div className="bg-zinc-900/80 border border-blue-500/20 rounded-xl p-4">
                <h3 className="text-sm font-bold text-blue-400 mb-2">Safeguarding EMI</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-base font-bold text-white">EUR {(safeguarding.total_client_funds_eur || 0).toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-500">Fondi Clienti</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">EUR {(safeguarding.treasury_eur || 0).toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-500">Treasury</div>
                  </div>
                  <div>
                    <div className={`text-base font-bold ${safeguarding.coverage_pct >= 100 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {safeguarding.coverage_pct}%
                    </div>
                    <div className="text-[10px] text-zinc-500">Coverage</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'real-virtual' && (
          <div className="space-y-4">
            <div className="bg-zinc-900/80 border border-emerald-500/20 rounded-xl p-4" data-testid="real-treasury-panel">
              <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Treasury REALE (On-Chain Verificato)</h3>
              {realTreasury && (
                <>
                  <div className="text-xl font-bold text-emerald-400 mb-3">EUR {(realTreasury.total_eur_value || 0).toLocaleString()}</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {realTreasury.assets && Object.entries(realTreasury.assets).map(([asset, data]) => (
                      <div key={asset} className="bg-zinc-800/50 rounded-lg p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{asset}</span>
                          {data.verified ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : <AlertTriangle className="w-3 h-3 text-red-500" />}
                        </div>
                        <div className="text-sm font-mono text-emerald-400">{data.balance}</div>
                        <div className="text-[9px] text-zinc-600">{data.source}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-[10px] text-zinc-600">
                    Hot wallet: {realTreasury.hot_wallet} | Block: {realTreasury.block_number} | Fee reali guadagnate: EUR {realTreasury.real_revenue?.total_fees_earned || 0} ({realTreasury.real_revenue?.real_trade_count || 0} trade)
                  </div>
                </>
              )}
            </div>

            <div className="bg-zinc-900/80 border border-amber-500/20 rounded-xl p-4" data-testid="virtual-metrics-panel">
              <h3 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Metriche VIRTUALI (NON sono denaro reale)</h3>
              {virtualMetrics && (
                <>
                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-2 mb-3 text-[10px] text-amber-500">
                    {virtualMetrics.warning}
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-base font-bold text-emerald-400">EUR {(virtualMetrics.real_executed_volume_eur || 0).toLocaleString()}</div>
                      <div className="text-[10px] text-zinc-500">Volume Reale</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-amber-400">EUR {(virtualMetrics.virtual_demand_volume_eur || 0).toLocaleString()}</div>
                      <div className="text-[10px] text-zinc-500">Volume Virtuale</div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-cyan-400">{virtualMetrics.conversion_rate_pct}%</div>
                      <div className="text-[10px] text-zinc-500">Conversion Rate</div>
                    </div>
                  </div>
                  <div className="mt-3 bg-zinc-800/50 rounded-lg p-2">
                    <div className="text-[10px] text-zinc-400 font-mono">
                      virtual demand → trading reale → fee/spread → treasury reale → payout
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1">
                      Reali: {virtualMetrics.real_transactions} tx | Virtuali: {virtualMetrics.virtual_transactions} tx | Totali: {virtualMetrics.total_transactions}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {tab === 'treasury' && (
          <div className="space-y-4">
            {securityStatus && (
              <div className="bg-zinc-900/80 border border-emerald-500/20 rounded-xl p-4">
                <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-1.5"><Lock className="w-4 h-4" /> Security Caps</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                    <div className="text-base font-bold text-white">EUR {securityStatus.treasury_caps?.max_single_tx_eur?.toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-500">Max/Transazione</div>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                    <div className="text-base font-bold text-white">EUR {securityStatus.treasury_caps?.max_daily_eur?.toLocaleString()}</div>
                    <div className="text-[10px] text-zinc-500">Max/Giorno</div>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-3 text-center">
                    <div className="text-base font-bold text-white">{securityStatus.treasury_caps?.max_neno_per_tx} NENO</div>
                    <div className="text-[10px] text-zinc-500">Max NENO/TX</div>
                  </div>
                </div>
                <div className="mt-3 text-[10px] text-zinc-600">
                  Rate limit: {securityStatus.rate_limit?.max_exec_ops_per_min} ops/min | Assets on-chain: {securityStatus.supported_onchain_assets?.join(', ')}
                </div>
              </div>
            )}
            {treasuryCheck && (
              <div className="bg-zinc-900/80 border border-cyan-500/20 rounded-xl p-4">
                <h3 className="text-sm font-bold text-cyan-400 mb-2">Treasury On-Chain (NENO)</h3>
                <div className="flex items-center gap-2">
                  {treasuryCheck.sufficient ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                  <span className="font-mono text-sm">{treasuryCheck.on_chain} NENO on-chain</span>
                </div>
                <div className="text-[10px] text-zinc-600 mt-1">Contract: {treasuryCheck.contract}</div>
              </div>
            )}
          </div>
        )}

        {tab === 'structure' && structure && (
          <div className="space-y-4">
            <div className="bg-zinc-900/80 border border-amber-500/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-amber-400 mb-3">Holding — {structure.holding?.name}</h3>
              <div className="text-xs text-zinc-400 mb-2">Giurisdizione: {structure.holding?.jurisdiction} | Status: <span className="text-emerald-400">{structure.holding?.status}</span></div>
              <div className="space-y-2">
                {structure.subsidiaries?.map((s, i) => (
                  <div key={i} className="bg-zinc-800/50 rounded-lg p-3">
                    <div className="text-xs font-bold text-white">{s.name}</div>
                    <div className="text-[10px] text-zinc-500">{s.jurisdiction} — {s.function}</div>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {s.licenses?.map((l, j) => (
                        <span key={j} className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">{l}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900/80 border border-blue-500/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-blue-400 mb-2">Governance</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Board Seats: {structure.governance?.board_seats}</div>
                <div>Independent Directors: {structure.governance?.independent_directors}</div>
                <div>Audit Committee: {structure.governance?.audit_committee ? 'Active' : 'N/A'}</div>
                <div>Risk Committee: {structure.governance?.risk_committee ? 'Active' : 'N/A'}</div>
                <div>Standard: {structure.governance?.reporting_standard}</div>
                <div>External Auditor: {structure.governance?.external_auditor}</div>
              </div>
            </div>
          </div>
        )}

        {tab === 'rails' && bankingRails && (
          <div className="space-y-3">
            {Object.entries(bankingRails).filter(([k]) => !['cards','clearing_systems'].includes(k)).map(([key, val]) => (
              <div key={key} className="bg-zinc-900/80 border border-zinc-700/30 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white uppercase">{key.replace('_',' ')}</div>
                  <div className="text-[10px] text-zinc-500">{val.type} | {val.coverage || val.currency || ''}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  val.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>{val.status}</span>
              </div>
            ))}
            <h3 className="text-xs font-bold text-zinc-400 mt-4">Payment Networks</h3>
            {bankingRails.cards && Object.entries(bankingRails.cards).map(([key, val]) => (
              <div key={key} className="bg-zinc-900/80 border border-zinc-700/30 rounded-xl p-3 flex items-center justify-between">
                <div className="text-xs font-bold text-white uppercase">{key}</div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">{val.status}</span>
              </div>
            ))}
            <h3 className="text-xs font-bold text-zinc-400 mt-4">Clearing Systems</h3>
            {bankingRails.clearing_systems && Object.entries(bankingRails.clearing_systems).map(([key, val]) => (
              <div key={key} className="bg-zinc-900/80 border border-zinc-700/30 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white uppercase">{key}</div>
                  <div className="text-[10px] text-zinc-500">{val.type} | {val.currency}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">{val.status}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'executions' && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-emerald-400 mb-2">Execution Logs Recenti</h3>
            {recentTxs.length === 0 && <div className="text-xs text-zinc-500">Nessuna transazione recente</div>}
            {recentTxs.map((tx, i) => (
              <div key={tx.id || i} className="bg-zinc-900/80 border border-zinc-700/30 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      tx.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      tx.status === 'pending_execution' ? 'bg-orange-500/20 text-orange-400' :
                      tx.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                      'bg-zinc-500/20 text-zinc-400'
                    }`}>{tx.status}</span>
                    <span className="text-xs text-white font-mono">{tx.type}</span>
                  </div>
                  <span className="text-[10px] text-zinc-600">{tx.created_at?.slice(0, 19)}</span>
                </div>
                <div className="mt-1 text-[10px] text-zinc-400">
                  {tx.eur_value && <span>EUR {tx.eur_value} | </span>}
                  {tx.execution_mode && <span>Mode: {tx.execution_mode} | </span>}
                  {tx.delivery_tx_hash && (
                    <a href={`https://bscscan.com/tx/${tx.delivery_tx_hash}`} target="_blank" rel="noopener noreferrer"
                       className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-0.5">
                      TX: {tx.delivery_tx_hash.slice(0, 12)}... <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
