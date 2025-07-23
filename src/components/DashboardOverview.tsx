import { SystemCard } from "./SystemCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Home, 
  DollarSign, 
  Users, 
  Brain,
  TrendingUp,
  MapPin,
  Calendar
} from "lucide-react";
import { dbService, CommunityData } from "@/lib/database";
import { useEffect, useState } from "react";

export const DashboardOverview = () => {
  const [communities, setCommunities] = useState<CommunityData[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityData | null>(null);

  useEffect(() => {
    const communityData = dbService.getCommunities();
    setCommunities(communityData);
    if (communityData.length > 0) {
      setSelectedCommunity(communityData[0]);
    }
  }, []);

  if (!selectedCommunity) {
    return <div>Loading...</div>;
  }

  const systemCards = [
    {
      title: "Energy Commons",
      description: "AI-managed microgrids",
      icon: Zap,
      gradientClass: "bg-gradient-energy",
      colorClass: "bg-energy-primary",
      metrics: [
        { label: "Solar Generation", value: `${selectedCommunity.energy_generated}kWh`, progress: 85, trend: 'up' as const },
        { label: "Grid Efficiency", value: "94%", progress: 94, trend: 'up' as const },
        { label: "Battery Storage", value: "78%", progress: 78, trend: 'stable' as const }
      ]
    },
    {
      title: "Housing Network",
      description: "Smart modular housing",
      icon: Home,
      gradientClass: "bg-gradient-housing",
      colorClass: "bg-housing-primary",
      metrics: [
        { label: "Occupancy Rate", value: "96%", progress: 96, trend: 'up' as const },
        { label: "Affordability Index", value: "8.7/10", progress: 87, trend: 'up' as const },
        { label: "Units Available", value: selectedCommunity.housing_units, trend: 'stable' as const }
      ]
    },
    {
      title: "Finance Co-op",
      description: "Inclusive financial services",
      icon: DollarSign,
      gradientClass: "bg-gradient-finance",
      colorClass: "bg-finance-primary",
      metrics: [
        { label: "Community Fund", value: "$2.4M", progress: 78, trend: 'up' as const },
        { label: "Member Credit Avg", value: "742", progress: 84, trend: 'up' as const },
        { label: "Loan Approval Rate", value: "89%", progress: 89, trend: 'stable' as const }
      ]
    },
    {
      title: "Governance Layer",
      description: "Democratic decision making",
      icon: Users,
      gradientClass: "bg-gradient-governance",
      colorClass: "bg-governance-primary",
      metrics: [
        { label: "Active Proposals", value: selectedCommunity.governance_proposals, trend: 'up' as const },
        { label: "Participation Rate", value: "87%", progress: 87, trend: 'up' as const },
        { label: "Consensus Score", value: "9.2/10", progress: 92, trend: 'stable' as const }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Community Dashboard</h1>
          <p className="text-muted-foreground">AI-orchestrated cooperative ecosystem overview</p>
        </div>
        
        {/* Community Selector */}
        <Card className="p-4 min-w-[300px]">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">{selectedCommunity.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedCommunity.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Members</span>
              <p className="font-semibold text-foreground">{selectedCommunity.members}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Health Score</span>
              <p className="font-semibold text-foreground">{selectedCommunity.financial_health}/10</p>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Orchestration Status */}
      <Card className="p-6 bg-gradient-ai">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <Brain className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold">AI Orchestration Engine</h3>
              <p className="opacity-90">System coordination and optimization active</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">98.7%</div>
            <div className="text-sm opacity-90">System Efficiency</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold">Energy</div>
            <div className="text-sm opacity-90">Optimized</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">Housing</div>
            <div className="text-sm opacity-90">Balanced</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">Finance</div>
            <div className="text-sm opacity-90">Healthy</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">Governance</div>
            <div className="text-sm opacity-90">Active</div>
          </div>
        </div>
      </Card>

      {/* System Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systemCards.map((card, index) => (
          <SystemCard key={index} {...card} />
        ))}
      </div>

      {/* Community Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold">Growth Metrics</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Energy Independence</span>
              <span className="font-semibold">89%</span>
            </div>
            <Progress value={89} className="h-2" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Housing Affordability</span>
              <span className="font-semibold">94%</span>
            </div>
            <Progress value={94} className="h-2" />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Financial Inclusion</span>
              <span className="font-semibold">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Solar array expansion approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>New housing units occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Community loan program launched</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Governance proposal submitted</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-ai-primary" />
            <h3 className="text-lg font-semibold">AI Insights</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium">Energy Optimization</p>
              <p className="text-muted-foreground">Peak efficiency predicted for tomorrow 2-4 PM</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium">Housing Recommendation</p>
              <p className="text-muted-foreground">Consider 3BR unit construction based on demand</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};