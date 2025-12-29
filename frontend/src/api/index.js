import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  register: async (email, password, role = 'USER') => {
    const response = await api.post('/auth/register', { email, password, role });
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};

// Ramp API (for users)
export const rampApi = {
  getPrices: async () => {
    const response = await api.get('/ramp/prices');
    return response.data;
  },
  createOnrampQuote: async (fiatAmount, cryptoCurrency) => {
    const response = await api.post('/ramp/onramp/quote', {
      fiat_amount: fiatAmount,
      crypto_currency: cryptoCurrency,
    });
    return response.data;
  },
  executeOnramp: async (quoteId, walletAddress) => {
    const response = await api.post('/ramp/onramp/execute', {
      quote_id: quoteId,
      wallet_address: walletAddress,
    });
    return response.data;
  },
  createOfframpQuote: async (cryptoAmount, cryptoCurrency) => {
    const response = await api.post('/ramp/offramp/quote', {
      crypto_amount: cryptoAmount,
      crypto_currency: cryptoCurrency,
    });
    return response.data;
  },
  executeOfframp: async (quoteId, bankAccount) => {
    const response = await api.post('/ramp/offramp/execute', {
      quote_id: quoteId,
      bank_account: bankAccount,
    });
    return response.data;
  },
  getTransactions: async () => {
    const response = await api.get('/ramp/transactions');
    return response.data;
  },
};

// Developer API
export const devApi = {
  getApiKeys: async () => {
    const response = await api.get('/dev/api-keys');
    return response.data;
  },
  createApiKey: async (name, description = '', rateLimit = 1000) => {
    const response = await api.post('/dev/api-keys', {
      name,
      description,
      rate_limit: rateLimit,
    });
    return response.data;
  },
  revokeApiKey: async (keyId) => {
    const response = await api.delete(`/dev/api-keys/${keyId}`);
    return response.data;
  },
  getDashboard: async () => {
    const response = await api.get('/dev/dashboard');
    return response.data;
  },
};

// Health check
export const healthApi = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
  rampHealth: async () => {
    const response = await api.get('/ramp-api-health');
    return response.data;
  },
};

export default api;
