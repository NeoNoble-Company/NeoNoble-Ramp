import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRightLeft, Loader2, CreditCard, Building,
  Clock, TrendingUp, TrendingDown, Plus, Repeat,
  Wallet, CheckCircle, ExternalLink, Copy, Check, AlertTriangle, Shield,
  QrCode, ArrowDownToLine, RefreshCw
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useWeb3 } from '../context/Web3Context';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

/* ── HTTP helpers ... (mantieni tutto il codice originale che avevi prima) ... */

// ================== SWAP ON-CHAIN REALE (NUOVO) ==================
const handleRealOnChainSwap = async () => {
  if (!address) {
    alert("Connetti MetaMask per eseguire lo swap on-chain");
    return;
  }
  if (!swapAmt || parseFloat(swapAmt) <= 0) {
    alert("Inserisci una quantità valida");
    return;
  }

  const payload = {
    user_id: user?.id || "system",
    from_token: swapFrom,
    to_token: swapTo,
    amount_in: parseFloat(swapAmt),
    chain: "bsc",
    slippage: 0.8,
    user_wallet_address: address
  };

  try {
    setLoading(true);
    const response = await fetch(`${BACKEND_URL}/api/swap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success) {
      alert(`✅ Swap On-Chain completato!\n\nTx Hash: ${data.tx_hash}\nAmount out: ${data.amount_out || '—'}`);
      fetchData();
      if (refetchNenoBalance) refetchNenoBalance();
      setSwapAmt("");
    } else {
      alert(`❌ Errore: ${data.error || "Swap fallito"}`);
    }
  } catch (error) {
    console.error("Errore swap on-chain:", error);
    alert("Errore di connessione con il backend");
  } finally {
    setLoading(false);
  }
};

// Poi nel ritorno JSX, sostituisci il blocco del tab 'swap' con questo:

{tab === 'swap' && (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
    <div className="grid grid-cols-5 gap-2 items-end">
      <div className="col-span-2">
        <label className="text-zinc-500 text-xs mb-1 block">Da</label>
        <select 
          value={swapFrom} 
          onChange={e => setSwapFrom(e.target.value)} 
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm"
        >
          {['NENO', ...allAssets].filter((v,i,a) => a.indexOf(v)===i).map(a => (
            <option key={a} value={a}>{a}{balances[a] ? ` (${balances[a].toFixed(4)})` : ''}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-center">
        <button 
          onClick={() => { setSwapFrom(swapTo); setSwapTo(swapFrom); }} 
          className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700"
        >
          <ArrowRightLeft className="w-4 h-4 text-purple-400" />
        </button>
      </div>
      <div className="col-span-2">
        <label className="text-zinc-500 text-xs mb-1 block">A</label>
        <select 
          value={swapTo} 
          onChange={e => setSwapTo(e.target.value)} 
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm"
        >
          {['NENO', ...allAssets].filter((v,i,a) => a.indexOf(v)===i).map(a => (
            <option key={a} value={a}>{a}{balances[a] ? ` (${balances[a].toFixed(4)})` : ''}</option>
          ))}
        </select>
      </div>
    </div>

    <input
      type="number"
      value={swapAmt}
      onChange={(e) => setSwapAmt(e.target.value)}
      placeholder="Quantità da scambiare"
      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white"
    />

    {/* Pulsante Swap INTERNO (vecchio) */}
    <button 
      onClick={handleSwap} 
      disabled={loading || !swapAmt || parseFloat(swapAmt) <= 0 || swapFrom === swapTo}
      className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-sm text-white transition-colors disabled:opacity-50"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : `Swap Interno ${swapAmt} ${swapFrom} → ${swapTo}`}
    </button>

    {/* NUOVO PULSANTE: SWAP ON-CHAIN REALE */}
    <button 
      onClick={handleRealOnChainSwap} 
      disabled={loading || !swapAmt || parseFloat(swapAmt) <= 0 || swapFrom === swapTo || !address}
      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg font-bold text-sm text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <Shield className="w-4 h-4" />
          Swap On-Chain Reale → {swapTo}
        </>
      )}
    </button>

    {!address && (
      <p className="text-amber-400 text-xs text-center">Connetti MetaMask per usare lo Swap On-Chain</p>
    )}
  </div>
)}
