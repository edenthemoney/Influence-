'use client';

import { useState, useEffect } from 'react';
import { Crown, RefreshCw, DollarSign, Music, Building2, Package, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Order {
  id: string;
  amount: number;
  customerEmail: string;
  customerName: string;
  status: string;
  createdAt: string;
  promotionType: string;
  instructions: string;
  songTitle: string;
  songLink: string;
  packageTier: string;
  influencerId: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ count: 0, totalRevenue: 0 });

  const fetchOrders = async () => {
    if (!token) return;
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.status === 401) {
        setError('Invalid admin token');
        setAuthenticated(false);
        return;
      }
      
      const data = await res.json();
      setOrders(data.orders || []);
      setStats({ count: data.count, totalRevenue: data.totalRevenue });
      setAuthenticated(true);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchOrders();
      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchOrders, 30000);
      return () => clearInterval(interval);
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-zinc-900 border-white/10">
          <CardHeader className="text-center">
            <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-white">Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">Admin Token</label>
              <Input 
                type="password"
                placeholder="Enter admin token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchOrders()}
                className="bg-black border-white/20 text-white"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button 
              onClick={fetchOrders}
              className="w-full gold-gradient text-black font-bold"
            >
              Access Dashboard
            </Button>
            <p className="text-white/40 text-xs text-center">
              Default: admin123 (set ADMIN_TOKEN in env for production)
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-xl fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Crown className="h-10 w-10 text-yellow-500" />
              <span className="text-3xl font-bold gradient-text tracking-tight">ADMIN</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={fetchOrders}
                className="text-white/80 hover:text-yellow-500"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-900 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Total Orders</p>
                  <p className="text-3xl font-bold text-white">{stats.count}</p>
                </div>
                <Package className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Song Promos</p>
                  <p className="text-3xl font-bold text-white">
                    {orders.filter(o => o.promotionType === 'song').length}
                  </p>
                </div>
                <Music className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
        
        {loading && orders.length === 0 ? (
          <div className="text-center py-20">
            <RefreshCw className="h-12 w-12 text-yellow-500 animate-spin mx-auto mb-4" />
            <p className="text-white/60">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900 border border-white/10">
            <Package className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 text-lg">No orders yet</p>
            <p className="text-white/40 text-sm mt-2">Orders will appear here when customers complete purchases</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="bg-zinc-900 border-white/10">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Left: Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={order.promotionType === 'song' 
                          ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' 
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }>
                          {order.promotionType === 'song' ? (
                            <><Music className="h-3 w-3 mr-1" /> Song Promo</>
                          ) : (
                            <><Building2 className="h-3 w-3 mr-1" /> Business</>
                          )}
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {order.status}
                        </Badge>
                        <span className="text-white/40 text-sm">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-white/40 text-xs uppercase">Customer</p>
                          <p className="text-white font-medium">{order.customerEmail}</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs uppercase">Amount</p>
                          <p className="text-white font-medium text-xl">${order.amount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs uppercase">Package</p>
                          <p className="text-white font-medium">{order.packageTier}</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-xs uppercase">Influencer</p>
                          <p className="text-white font-medium">{order.influencerId}</p>
                        </div>
                      </div>

                      {/* Song Info */}
                      {order.promotionType === 'song' && (order.songTitle || order.songLink) && (
                        <div className="bg-purple-500/10 border border-purple-500/20 p-4 mb-4">
                          <p className="text-purple-400 font-medium mb-2 flex items-center">
                            <Music className="h-4 w-4 mr-2" />
                            Song Details
                          </p>
                          {order.songTitle && (
                            <p className="text-white text-sm mb-1"><span className="text-white/60">Title:</span> {order.songTitle}</p>
                          )}
                          {order.songLink && (
                            <a 
                              href={order.songLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-yellow-500 text-sm flex items-center hover:underline"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Open Song Link
                            </a>
                          )}
                        </div>
                      )}

                      {/* Instructions */}
                      {order.instructions && (
                        <div className="bg-zinc-800 p-4">
                          <p className="text-white/40 text-xs uppercase mb-2">Instructions</p>
                          <p className="text-white text-sm whitespace-pre-wrap">{order.instructions}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <a 
                        href={`mailto:${order.customerEmail}?subject=Re: Your ${order.packageTier} Order`}
                        className="inline-flex"
                      >
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Mail className="h-4 w-4 mr-2" />
                          Email Customer
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
