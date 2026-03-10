/**
 * Admin Dashboard - NeoNoble Ramp
 * Enterprise Control Center
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, Code, TrendingUp, Wallet, 
  Settings, BarChart3, Coins, ArrowUpRight, ArrowDownRight,
  Activity, Clock, DollarSign, Globe, Shield, Database,
  RefreshCw, ChevronRight, LogOut
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

// Stats Card Component
const StatsCard = ({ title, value, change, icon: Icon, color = 'purple' }) => {
  const isPositive = change >= 0;
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm">{title}</span>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {Math.abs(change)}% vs ieri
        </div>
      )}
    </div>
  );
};

// Quick Action Button
const QuickAction = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl transition-all group"
  >
    <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30">
      <Icon className="w-5 h-5 text-purple-400" />
    </div>
    <span className="text-white">{label}</span>
    <ChevronRight className="w-4 h-4 text-gray-500 ml-auto group-hover:translate-x-1 transition-transform" />
  </button>
);

// Sidebar Navigation
const Sidebar = ({ activeSection, setActiveSection }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Utenti', icon: Users },
    { id: 'developers', label: 'Developer', icon: Code },
    { id: 'trading', label: 'Trading', icon: TrendingUp },
    { id: 'tokens', label: 'Token', icon: Coins },
    { id: 'wallets', label: 'Wallet', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Impostazioni', icon: Settings },
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="text-white font-bold">Admin Panel</div>
          <div className="text-gray-500 text-xs">NeoNoble Ramp</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              activeSection === item.id
                ? 'bg-purple-500/20 text-purple-400'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="pt-4 border-t border-gray-800 space-y-2">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <Globe className="w-5 h-5" />
          Torna alla Dashboard
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

// Overview Section
const OverviewSection = ({ stats, recentActivity }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Utenti Totali" value={stats.totalUsers} change={12.5} icon={Users} color="purple" />
        <StatsCard title="Volume Trading 24h" value={`€${stats.tradingVolume}`} change={8.3} icon={TrendingUp} color="green" />
        <StatsCard title="Transazioni Oggi" value={stats.todayTransactions} change={-2.1} icon={Activity} color="blue" />
        <StatsCard title="Developer Attivi" value={stats.activeDevelopers} change={15.2} icon={Code} color="orange" />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Azioni Rapide</h3>
        <div className="space-y-3">
          <QuickAction icon={Users} label="Gestisci Utenti" />
          <QuickAction icon={Coins} label="Crea Nuovo Token" />
          <QuickAction icon={TrendingUp} label="Visualizza Trading Pairs" />
          <QuickAction icon={Database} label="Esporta Report" />
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Attività Recente</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'trade' ? 'bg-green-400' :
                activity.type === 'user' ? 'bg-blue-400' : 'bg-purple-400'
              }`} />
              <span className="text-gray-300 flex-1">{activity.message}</span>
              <span className="text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Users Section
const UsersSection = ({ users }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-white">Gestione Utenti</h2>
      <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
        + Nuovo Utente
      </button>
    </div>
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Utente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Ruolo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Stato</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Azioni</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {users.map((user, idx) => (
            <tr key={idx} className="hover:bg-gray-800/50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-400 font-medium">{user.name?.charAt(0) || '?'}</span>
                  </div>
                  <span className="text-white">{user.name || 'N/A'}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-300">{user.email}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-xs ${
                  user.role === 'ADMIN' ? 'bg-red-500/20 text-red-400' :
                  user.role === 'DEVELOPER' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-xs ${
                  user.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {user.is_active ? 'Attivo' : 'Inattivo'}
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-purple-400 hover:text-purple-300 text-sm">Modifica</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Main Admin Dashboard
export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    tradingVolume: '0',
    todayTransactions: 0,
    activeDevelopers: 0,
  });
  const [users, setUsers] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch platform stats
      const healthRes = await fetch(`${BACKEND_URL}/api/health`);
      
      // Mock data for demo - replace with real API calls
      setStats({
        totalUsers: 1247,
        tradingVolume: '2.4M',
        todayTransactions: 3842,
        activeDevelopers: 156,
      });

      setUsers([
        { name: 'Massimo F.', email: 'massimo@example.com', role: 'ADMIN', is_active: true },
        { name: 'Developer Test', email: 'dev@example.com', role: 'DEVELOPER', is_active: true },
        { name: 'User Test', email: 'user@example.com', role: 'USER', is_active: true },
      ]);

      setRecentActivity([
        { type: 'trade', message: 'Nuovo trade BTC/EUR completato', time: '2 min fa' },
        { type: 'user', message: 'Nuovo utente registrato', time: '5 min fa' },
        { type: 'token', message: 'NENO listato su exchange', time: '1 ora fa' },
        { type: 'trade', message: 'Volume giornaliero superato €1M', time: '2 ore fa' },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection stats={stats} recentActivity={recentActivity} />;
      case 'users':
        return <UsersSection users={users} />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400">Sezione in costruzione...</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
