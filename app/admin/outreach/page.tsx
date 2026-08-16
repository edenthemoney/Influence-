'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Mail, Users, TrendingUp, Calendar, Plus, Send } from 'lucide-react';

export default function OutreachAdmin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [campaigns, setCampaigns] = useState([]);
  const [brands, setBrands] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    // Load initial data
    fetchMetrics();
    fetchCampaigns();
    fetchBrands();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/outreach/metrics');
      const data = await response.json();
      if (data.success) setMetrics(data.metrics);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/outreach/campaigns');
      const data = await response.json();
      if (data.success) setCampaigns(data.campaigns);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/outreach/brands');
      const data = await response.json();
      if (data.success) setBrands(data.brands);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    }
  };

  const sendEmail = async (brand) => {
    try {
      const response = await fetch('/api/outreach/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: brand.decisionMakers.marketing,
          template: 'ecommerce',
          brandName: brand.name,
          contactName: 'Marketing Team',
          influencerProfiles: []
        })
      });
      
      if (response.ok) {
        alert('Email sent successfully!');
        // Update brand status
        setBrands(brands.map(b => 
          b.id === brand.id ? { ...b, outreachStatus: 'contacted' } : b
        ));
      }
    } catch (error) {
      alert('Failed to send email');
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#080808]/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold" style={{ color: '#c9a96e' }}>
              Outreach Admin
            </h1>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm border border-white/20 hover:bg-white/[0.05] transition-all">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'campaigns', label: 'Campaigns', icon: Calendar },
              { id: 'brands', label: 'Brands', icon: Users },
              { id: 'email', label: 'Email', icon: Mail }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 text-sm border-b-2 transition-all ${
                  activeTab === tab.id 
                    ? 'border-[#c9a96e] text-[#c9a96e]' 
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && metrics && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Campaign Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {[
                { label: 'Emails Sent', value: metrics.totalEmailsSent, icon: Mail },
                { label: 'Opens', value: metrics.totalOpens, icon: TrendingUp },
                { label: 'Responses', value: metrics.totalResponses, icon: Users },
                { label: 'Meetings', value: metrics.totalMeetingsBooked, icon: Calendar },
                { label: 'Deals', value: metrics.totalDealsClosed, icon: TrendingUp }
              ].map(stat => (
                <div key={stat.label} className="border border-white/[0.06] p-6">
                  <stat.icon className="h-5 w-5 mb-2" style={{ color: '#c9a96e' }} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Performance Metrics */}
            <div className="border border-white/[0.06] p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Open Rate', value: `${metrics.averageOpenRate.toFixed(1)}%` },
                  { label: 'Response Rate', value: `${metrics.averageResponseRate.toFixed(1)}%` },
                  { label: 'Meeting Rate', value: `${metrics.averageMeetingRate.toFixed(1)}%` },
                  { label: 'Deal Rate', value: `${metrics.averageDealRate.toFixed(1)}%` }
                ].map(metric => (
                  <div key={metric.label}>
                    <p className="text-white/50 text-sm">{metric.label}</p>
                    <p className="text-xl font-bold">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Niches */}
            <div className="border border-white/[0.06] p-6">
              <h3 className="text-xl font-bold mb-4">Top Performing Niches</h3>
              <div className="space-y-3">
                {metrics.topPerformingNiches.map(niche => (
                  <div key={niche.niche} className="flex items-center justify-between p-4 bg-white/[0.02]">
                    <div>
                      <p className="font-bold capitalize">{niche.niche}</p>
                      <p className="text-white/50 text-sm">Response rate: {niche.responseRate}%</p>
                    </div>
                    <p className="text-[#c9a96e] font-bold">{niche.dealRate}% deal rate</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Campaigns</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#c9a96e] text-black font-bold text-sm">
                <Plus className="h-4 w-4" />
                New Campaign
              </button>
            </div>

            <div className="space-y-4">
              {campaigns.map(campaign => (
                <div key={campaign.id} className="border border-white/[0.06] p-6 hover:bg-white/[0.02] transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{campaign.name}</h3>
                      <p className="text-white/50 text-sm capitalize">{campaign.niche} · {campaign.status}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold uppercase ${
                      campaign.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-white/10'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-white/50">Target</p>
                      <p className="font-bold">{campaign.targetBrands}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Sent</p>
                      <p className="font-bold">{campaign.emailsSent}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Responses</p>
                      <p className="font-bold">{campaign.responses}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Meetings</p>
                      <p className="font-bold">{campaign.meetingsBooked}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Deals</p>
                      <p className="font-bold">{campaign.dealsClosed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'brands' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Target Brands</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#c9a96e] text-black font-bold text-sm">
                <Plus className="h-4 w-4" />
                Add Brand
              </button>
            </div>

            <div className="space-y-4">
              {brands.map(brand => (
                <div key={brand.id} className="border border-white/[0.06] p-6 hover:bg-white/[0.02] transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{brand.name}</h3>
                      <p className="text-white/50 text-sm capitalize">{brand.niche} · {brand.followers.toLocaleString()} followers</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-xs font-bold uppercase ${
                        brand.outreachStatus === 'contacted' ? 'bg-green-500/20 text-green-400' : 'bg-white/10'
                      }`}>
                        {brand.outreachStatus}
                      </span>
                      <button 
                        onClick={() => sendEmail(brand)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#c9a96e] text-black font-bold text-sm"
                      >
                        <Send className="h-4 w-4" />
                        Contact
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-white/50">Location</p>
                      <p className="font-bold">{brand.location}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Budget</p>
                      <p className="font-bold">{brand.estimatedBudget}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Contact</p>
                      <p className="font-bold">{brand.decisionMakers.marketing}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Email Templates</h2>
            
            <div className="space-y-4">
              {[
                { name: 'E-commerce Pitch', template: 'ecommerce', description: 'For fashion, beauty, and retail brands' },
                { name: 'Restaurant Pitch', template: 'restaurant', description: 'For food and beverage brands' },
                { name: 'Music Promotion', template: 'music', description: 'For artists and record labels' }
              ].map(template => (
                <div key={template.template} className="border border-white/[0.06] p-6 hover:bg-white/[0.02] transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{template.name}</h3>
                      <p className="text-white/50 text-sm">{template.description}</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:bg-white/[0.05] transition-all text-sm">
                      Edit Template
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
