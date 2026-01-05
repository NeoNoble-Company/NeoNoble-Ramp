import React, { useState, useEffect } from 'react';
import { Key, Copy, Eye, EyeOff, Plus, Trash2, Code, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DeveloperPortal = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyResponse, setNewKeyResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const response = await axios.get(`${API}/developer/api-keys`);
      setApiKeys(response.data.api_keys || []);
    } catch (err) {
      console.error('Failed to fetch API keys:', err);
    }
  };

  const createApiKey = async () => {
    if (!newKeyName.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post(`${API}/developer/api-keys`, {
        name: newKeyName,
        permissions: ['offramp:read', 'offramp:write']
      });
      setNewKeyResponse(response.data);
      setNewKeyName('');
      fetchApiKeys();
    } catch (err) {
      console.error('Failed to create API key:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExamples = {
    quote: `// Create Off-Ramp Quote
const response = await fetch('${API}/v1/offramp/quote', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'pk_your_api_key',
    'X-API-Secret': 'sk_your_api_secret'
  },
  body: JSON.stringify({
    neno_amount: 1.0,
    wallet_address: '0xYourBSCWallet...',
    payout_currency: 'EUR',
    payout_method: 'sepa'
  })
});

const quote = await response.json();
console.log('Quote:', quote.quote.quote_id);
console.log('Net Payout:', quote.quote.net_payout_eur);`,
    execute: `// Execute Off-Ramp Transaction
const response = await fetch('${API}/v1/offramp/execute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'pk_your_api_key',
    'X-API-Secret': 'sk_your_api_secret'
  },
  body: JSON.stringify({
    quote_id: 'QT-ABCD1234...',
    iban: 'DE89370400440532013000',
    account_holder: 'John Doe',
    accept_terms: true
  })
});

const transaction = await response.json();
console.log('Transaction ID:', transaction.transaction.transaction_id);`,
    status: `// Get Transaction Status
const response = await fetch(
  '${API}/v1/offramp/transaction/TX-ABCD1234',
  {
    headers: {
      'X-API-Key': 'pk_your_api_key',
      'X-API-Secret': 'sk_your_api_secret'
    }
  }
);

const tx = await response.json();
console.log('Status:', tx.status);
console.log('Payout:', tx.net_payout_eur);`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Developer Portal</h1>
          <p className="text-slate-400 mt-2">NENO Off-Ramp API Integration</p>
        </div>

        <Tabs defaultValue="keys" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="keys" className="data-[state=active]:bg-teal-600">API Keys</TabsTrigger>
            <TabsTrigger value="docs" className="data-[state=active]:bg-teal-600">Documentation</TabsTrigger>
            <TabsTrigger value="examples" className="data-[state=active]:bg-teal-600">Code Examples</TabsTrigger>
          </TabsList>

          {/* API Keys Tab */}
          <TabsContent value="keys">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Key className="w-5 h-5 text-teal-400" />
                  API Keys
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Create and manage API keys for programmatic access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Create New Key */}
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <h4 className="text-sm font-semibold text-white mb-3">Create New API Key</h4>
                  <div className="flex gap-3">
                    <Input
                      placeholder="Key name (e.g., Production)"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                    <Button onClick={createApiKey} disabled={loading} className="bg-teal-600 hover:bg-teal-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create
                    </Button>
                  </div>
                </div>

                {/* New Key Response */}
                {newKeyResponse && (
                  <div className="p-4 bg-green-900/20 rounded-lg border border-green-700">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <h4 className="text-sm font-semibold text-green-400">API Key Created!</h4>
                    </div>
                    <div className="p-3 bg-slate-900 rounded border border-slate-700 space-y-3">
                      <div>
                        <Label className="text-slate-400 text-xs">API Key (X-API-Key)</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="flex-1 text-sm font-mono text-teal-400 bg-slate-800 px-2 py-1 rounded">
                            {newKeyResponse.key_id}
                          </code>
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(newKeyResponse.key_id)}>
                            <Copy className="w-4 h-4 text-slate-400" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-slate-400 text-xs">API Secret (X-API-Secret)</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="flex-1 text-sm font-mono text-amber-400 bg-slate-800 px-2 py-1 rounded">
                            {showSecret ? newKeyResponse.secret : '••••••••••••••••••••••••'}
                          </code>
                          <Button size="sm" variant="ghost" onClick={() => setShowSecret(!showSecret)}>
                            {showSecret ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => copyToClipboard(newKeyResponse.secret)}>
                            <Copy className="w-4 h-4 text-slate-400" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-amber-400 mt-3 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Save the secret now! It won't be shown again.
                    </p>
                  </div>
                )}

                {/* Existing Keys */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Existing Keys</h4>
                  {apiKeys.length === 0 ? (
                    <p className="text-slate-500 text-sm">No API keys created yet</p>
                  ) : (
                    <div className="space-y-2">
                      {apiKeys.map((key) => (
                        <div key={key.key_id} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700">
                          <div>
                            <p className="text-white font-medium">{key.name}</p>
                            <p className="text-xs font-mono text-slate-400">{key.key_id}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={key.is_active ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}>
                              {key.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="docs">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">API Documentation</CardTitle>
                <CardDescription className="text-slate-400">
                  NENO Off-Ramp PoR Engine API Reference
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-slate-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Authentication</h3>
                  <p className="text-sm mb-2">All API requests require two headers:</p>
                  <div className="bg-slate-900 p-3 rounded-lg font-mono text-sm">
                    <p><span className="text-teal-400">X-API-Key:</span> pk_your_api_key</p>
                    <p><span className="text-teal-400">X-API-Secret:</span> sk_your_api_secret</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Base URL</h3>
                  <code className="bg-slate-900 px-3 py-2 rounded-lg text-teal-400">{API}/v1/offramp</code>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Endpoints</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-green-700">POST</Badge>
                        <code className="text-teal-400">/quote</code>
                      </div>
                      <p className="text-sm text-slate-400">Create an off-ramp quote for NENO tokens</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-blue-700">GET</Badge>
                        <code className="text-teal-400">/quote/{'{quote_id}'}</code>
                      </div>
                      <p className="text-sm text-slate-400">Retrieve quote details</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-green-700">POST</Badge>
                        <code className="text-teal-400">/execute</code>
                      </div>
                      <p className="text-sm text-slate-400">Execute off-ramp transaction from quote</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-blue-700">GET</Badge>
                        <code className="text-teal-400">/transaction/{'{tx_id}'}</code>
                      </div>
                      <p className="text-sm text-slate-400">Get transaction status and details</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-blue-700">GET</Badge>
                        <code className="text-teal-400">/transactions</code>
                      </div>
                      <p className="text-sm text-slate-400">List all transactions for your API key</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">NENO Pricing</h3>
                  <p className="text-sm">NENO is fixed at <span className="text-amber-400 font-semibold">€10,000 per unit</span> (platform-defined, not market-driven)</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Transaction Lifecycle</h3>
                  <div className="flex flex-wrap gap-2">
                    {['quote_created', 'quote_accepted', 'deposit_pending', 'deposit_confirmed', 'kyc_verified', 'aml_cleared', 'settlement_processing', 'payout_initiated', 'payout_completed', 'completed'].map((status) => (
                      <Badge key={status} variant="outline" className="border-slate-600 text-slate-300">{status}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Examples Tab */}
          <TabsContent value="examples">
            <div className="space-y-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-base">Create Quote</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
                    <code className="text-slate-300">{codeExamples.quote}</code>
                  </pre>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-base">Execute Off-Ramp</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
                    <code className="text-slate-300">{codeExamples.execute}</code>
                  </pre>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-base">Get Transaction Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
                    <code className="text-slate-300">{codeExamples.status}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeveloperPortal;
