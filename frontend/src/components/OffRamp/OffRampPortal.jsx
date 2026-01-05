import React, { useState, useEffect } from 'react';
import { Coins, ArrowRight, Wallet, CreditCard, CheckCircle, Clock, AlertCircle, Loader2, Copy, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const OffRampPortal = () => {
  const [step, setStep] = useState(1); // 1: Quote, 2: Confirm, 3: Deposit, 4: Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [porConfig, setPorConfig] = useState(null);
  
  // Form state
  const [nenoAmount, setNenoAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [iban, setIban] = useState('');
  const [bic, setBic] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  
  // Quote & Transaction state
  const [quote, setQuote] = useState(null);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    fetchPorConfig();
  }, []);

  const fetchPorConfig = async () => {
    try {
      const response = await axios.get(`${API}/offramp/config`);
      setPorConfig(response.data);
    } catch (err) {
      console.error('Failed to fetch PoR config:', err);
    }
  };

  const createQuote = async () => {
    if (!nenoAmount || !walletAddress) {
      setError('Please enter NENO amount and wallet address');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API}/offramp/quote`, {
        neno_amount: parseFloat(nenoAmount),
        wallet_address: walletAddress,
        payout_currency: 'EUR',
        payout_method: 'sepa'
      });
      
      setQuote(response.data.quote);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create quote');
    } finally {
      setLoading(false);
    }
  };

  const executeOffRamp = async () => {
    if (!iban || !accountHolder) {
      setError('Please enter IBAN and account holder name');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API}/offramp/execute`, {
        quote_id: quote.quote_id,
        iban: iban,
        bic: bic || null,
        account_holder: accountHolder,
        accept_terms: true
      });
      
      setTransaction(response.data.transaction);
      setStep(3);
      
      // Start polling for status updates
      pollTransactionStatus(response.data.transaction.transaction_id);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to execute off-ramp');
    } finally {
      setLoading(false);
    }
  };

  const pollTransactionStatus = async (txId) => {
    const poll = async () => {
      try {
        const response = await axios.get(`${API}/offramp/transaction/${txId}`);
        setTransaction(response.data);
        
        if (!['completed', 'failed', 'cancelled'].includes(response.data.status)) {
          setTimeout(poll, 2000); // Poll every 2 seconds
        } else {
          setStep(4);
        }
      } catch (err) {
        console.error('Failed to poll status:', err);
      }
    };
    
    poll();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      quote_created: { color: 'bg-gray-100 text-gray-700', label: 'Quote Created' },
      quote_accepted: { color: 'bg-blue-100 text-blue-700', label: 'Quote Accepted' },
      deposit_pending: { color: 'bg-yellow-100 text-yellow-700', label: 'Awaiting Deposit' },
      deposit_confirmed: { color: 'bg-green-100 text-green-700', label: 'Deposit Confirmed' },
      kyc_pending: { color: 'bg-purple-100 text-purple-700', label: 'KYC Pending' },
      kyc_verified: { color: 'bg-green-100 text-green-700', label: 'KYC Verified' },
      aml_screening: { color: 'bg-purple-100 text-purple-700', label: 'AML Screening' },
      aml_cleared: { color: 'bg-green-100 text-green-700', label: 'AML Cleared' },
      settlement_processing: { color: 'bg-blue-100 text-blue-700', label: 'Processing Settlement' },
      payout_initiated: { color: 'bg-teal-100 text-teal-700', label: 'Payout Initiated' },
      payout_completed: { color: 'bg-green-100 text-green-700', label: 'Payout Completed' },
      completed: { color: 'bg-green-100 text-green-700', label: 'Completed' },
      failed: { color: 'bg-red-100 text-red-700', label: 'Failed' },
      expired: { color: 'bg-gray-100 text-gray-700', label: 'Expired' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-700', label: status };
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getProgressValue = (status) => {
    const statusOrder = [
      'quote_accepted', 'deposit_pending', 'deposit_confirmed',
      'kyc_pending', 'kyc_verified', 'aml_screening', 'aml_cleared',
      'settlement_processing', 'payout_initiated', 'payout_completed', 'completed'
    ];
    const index = statusOrder.indexOf(status);
    return index >= 0 ? ((index + 1) / statusOrder.length) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/30 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Coins className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">NENO Off-Ramp</h1>
          <p className="text-slate-600 mt-2">Convert NENO tokens to EUR via SEPA</p>
          
          {porConfig && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-amber-800 font-semibold">€10,000</span>
              <span className="text-amber-600">per NENO (fixed)</span>
            </div>
          )}
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {step > s ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 4 && <div className={`w-12 h-1 ${step > s ? 'bg-amber-500' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Step 1: Create Quote */}
        {step === 1 && (
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-amber-500" />
                Create Off-Ramp Quote
              </CardTitle>
              <CardDescription>Enter the amount of NENO to convert to EUR</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nenoAmount">NENO Amount</Label>
                <div className="relative mt-1">
                  <Input
                    id="nenoAmount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max="100"
                    placeholder="1.0"
                    value={nenoAmount}
                    onChange={(e) => setNenoAmount(e.target.value)}
                    className="pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">NENO</span>
                </div>
                {nenoAmount && (
                  <p className="mt-2 text-sm text-amber-600">
                    = €{(parseFloat(nenoAmount) * 10000).toLocaleString()} gross • €{((parseFloat(nenoAmount) * 10000) * 0.985).toLocaleString()} net (1.5% fee)
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="walletAddress">BSC Wallet Address</Label>
                <Input
                  id="walletAddress"
                  type="text"
                  placeholder="0x..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="mt-1 font-mono text-sm"
                />
                <p className="mt-1 text-xs text-slate-500">Your BSC wallet holding NENO tokens</p>
              </div>
              
              <Button
                onClick={createQuote}
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Get Quote
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Confirm & Enter Banking */}
        {step === 2 && quote && (
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-500" />
                Confirm Off-Ramp
              </CardTitle>
              <CardDescription>Review quote and enter banking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quote Summary */}
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-amber-700">Quote ID</span>
                  <span className="font-mono text-amber-800">{quote.quote_id}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-amber-700">NENO Amount</span>
                  <span className="font-semibold text-amber-800">{quote.neno_amount} NENO</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-amber-700">NENO Price</span>
                  <span className="text-amber-800">€{quote.neno_price_eur.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-amber-700">Gross Amount</span>
                  <span className="text-amber-800">€{quote.gross_amount_eur.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-amber-700">PoR Fee ({quote.fee_percentage}%)</span>
                  <span className="text-amber-800">-€{quote.fee_amount_eur.toLocaleString()}</span>
                </div>
                <div className="border-t border-amber-300 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-amber-800">Net Payout</span>
                    <span className="text-xl font-bold text-amber-900">€{quote.net_payout_eur.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Banking Details */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="accountHolder">Account Holder Name</Label>
                  <Input
                    id="accountHolder"
                    type="text"
                    placeholder="John Doe"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="iban">IBAN</Label>
                  <Input
                    id="iban"
                    type="text"
                    placeholder="DE89370400440532013000"
                    value={iban}
                    onChange={(e) => setIban(e.target.value.toUpperCase().replace(/\s/g, ''))}
                    className="mt-1 font-mono"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bic">BIC/SWIFT (Optional)</Label>
                  <Input
                    id="bic"
                    type="text"
                    placeholder="COBADEFFXXX"
                    value={bic}
                    onChange={(e) => setBic(e.target.value.toUpperCase())}
                    className="mt-1 font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={executeOffRamp}
                  disabled={loading}
                  className="flex-1 bg-amber-500 hover:bg-amber-600"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Confirm Off-Ramp
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Deposit & Processing */}
        {step >= 3 && transaction && (
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  Transaction Status
                </span>
                {getStatusBadge(transaction.status)}
              </CardTitle>
              <CardDescription>Transaction ID: {transaction.transaction_id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div>
                <Progress value={getProgressValue(transaction.status)} className="h-2" />
                <p className="text-xs text-slate-500 mt-1 text-right">
                  {Math.round(getProgressValue(transaction.status))}% complete
                </p>
              </div>

              {/* Deposit Instructions (if still pending) */}
              {['quote_accepted', 'deposit_pending'].includes(transaction.status) && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Deposit NENO</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-600">Amount</span>
                      <span className="font-semibold text-blue-800">{transaction.neno_amount} NENO</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Network</span>
                      <span className="text-blue-800">BSC (Binance Smart Chain)</span>
                    </div>
                    <div className="mt-3">
                      <Label className="text-blue-600">Deposit Address</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 p-2 bg-white rounded border border-blue-200 text-xs font-mono break-all">
                          {transaction.deposit_address}
                        </code>
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(transaction.deposit_address)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Transaction Details */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">NENO Amount</span>
                  <span className="text-slate-800">{transaction.neno_amount} NENO</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Net Payout</span>
                  <span className="font-semibold text-slate-800">€{transaction.net_payout_eur.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Payout Method</span>
                  <span className="text-slate-800">SEPA Transfer</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">IBAN</span>
                  <span className="font-mono text-slate-800">{transaction.iban.slice(0, 8)}****{transaction.iban.slice(-4)}</span>
                </div>
                {transaction.deposit_tx_hash && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Deposit TX</span>
                    <span className="font-mono text-slate-800 truncate max-w-[200px]">{transaction.deposit_tx_hash.slice(0, 16)}...</span>
                  </div>
                )}
                {transaction.payout_reference && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">SEPA Reference</span>
                    <span className="font-mono text-slate-800">{transaction.payout_reference}</span>
                  </div>
                )}
              </div>

              {/* Status History */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Status History</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {transaction.status_history?.slice().reverse().map((entry, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-slate-700">{entry.message}</p>
                        <p className="text-slate-400">{new Date(entry.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {transaction.status === 'completed' && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-800">Off-Ramp Complete!</h4>
                  <p className="text-sm text-green-600 mt-1">
                    €{transaction.net_payout_eur.toLocaleString()} has been sent to your bank account
                  </p>
                </div>
              )}

              {step === 4 && (
                <Button onClick={() => { setStep(1); setQuote(null); setTransaction(null); }} className="w-full">
                  Start New Off-Ramp
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* PoR Info */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Powered by NeoNoble Provider-of-Record Engine</p>
          <p className="mt-1">KYC/AML • SEPA Settlement • BSC Integration</p>
        </div>
      </div>
    </div>
  );
};

export default OffRampPortal;
