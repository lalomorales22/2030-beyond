import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  Wrench, 
  DollarSign,
  TrendingUp,
  MapPin,
  Calendar,
  Thermometer
} from "lucide-react";
import { dbService, HousingData } from "@/lib/database";
import { useEffect, useState } from "react";

export const HousingDashboard = () => {
  const [housingData, setHousingData] = useState<HousingData[]>([]);

  useEffect(() => {
    const data = dbService.getHousingData('community-1');
    setHousingData(data);
  }, []);

  const totalUnits = housingData.length * 10; // Simulate multiple units per type
  const occupiedUnits = Math.floor(totalUnits * 0.94);
  const averageAffordability = housingData.reduce((acc, unit) => acc + unit.affordability_index, 0) / housingData.length || 0;
  const averageEfficiency = housingData.reduce((acc, unit) => acc + unit.energy_efficiency, 0) / housingData.length || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Housing Network</h1>
          <p className="text-muted-foreground">Smart modular housing with community ownership</p>
        </div>
        <Badge variant="secondary" className="bg-housing-primary text-white">
          <Home className="w-4 h-4 mr-1" />
          {occupiedUnits}/{totalUnits} Occupied
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-housing text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Occupancy Rate</p>
              <p className="text-2xl font-bold">94%</p>
            </div>
            <Users className="w-8 h-8 opacity-80" />
          </div>
          <div className="mt-4">
            <Progress value={94} className="h-2 bg-white/20" />
            <p className="text-xs mt-1 opacity-75">{occupiedUnits} of {totalUnits} units</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Affordability Index</p>
              <p className="text-2xl font-bold text-foreground">{averageAffordability.toFixed(1)}/10</p>
            </div>
            <DollarSign className="w-8 h-8 text-finance-primary" />
          </div>
          <div className="mt-4">
            <Progress value={averageAffordability * 10} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">Above regional average</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Energy Efficiency</p>
              <p className="text-2xl font-bold text-foreground">{averageEfficiency.toFixed(0)}%</p>
            </div>
            <Thermometer className="w-8 h-8 text-energy-primary" />
          </div>
          <div className="mt-4">
            <Progress value={averageEfficiency} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">LEED Platinum equiv.</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Maintenance Score</p>
              <p className="text-2xl font-bold text-foreground">8.9/10</p>
            </div>
            <Wrench className="w-8 h-8 text-governance-primary" />
          </div>
          <div className="mt-4">
            <Progress value={89} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">Excellent condition</p>
          </div>
        </Card>
      </div>

      {/* Unit Type Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Home className="w-5 h-5 text-housing-primary" />
          Unit Type Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {housingData.map((unit, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{unit.unit_type}</h4>
                <Badge variant="outline">{Math.floor(unit.occupancy_rate)}% occupied</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Affordability</span>
                  <span className="font-medium">{unit.affordability_index.toFixed(1)}/10</span>
                </div>
                <Progress value={unit.affordability_index * 10} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Efficiency</span>
                  <span className="font-medium">{unit.energy_efficiency.toFixed(0)}%</span>
                </div>
                <Progress value={unit.energy_efficiency} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Community Land Trust Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-housing-primary" />
            Community Land Trust
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Land Value</span>
                <span className="text-lg font-bold">$4.2M</span>
              </div>
              <p className="text-sm text-muted-foreground">Community-owned, permanently affordable</p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Member Equity</span>
                <span className="text-lg font-bold">$847K</span>
              </div>
              <p className="text-sm text-muted-foreground">Average $5,647 per member</p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-700 dark:text-green-300">Affordability Protected</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400">
                Housing costs capped at 30% of area median income in perpetuity
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-governance-primary" />
            Development Pipeline
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">Phase 2 Construction</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">15 additional units</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                In Progress
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <div>
                <p className="font-medium text-yellow-700 dark:text-yellow-300">Community Center</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">Shared facilities & services</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                Planning
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div>
                <p className="font-medium text-purple-700 dark:text-purple-300">Senior Housing</p>
                <p className="text-sm text-purple-600 dark:text-purple-400">Age-in-place design</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                Proposed
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Smart Home Integration */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Smart Home Integration</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">98%</div>
            <div className="text-sm text-muted-foreground">Units Connected</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">23%</div>
            <div className="text-sm text-muted-foreground">Energy Savings</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">4.7/5</div>
            <div className="text-sm text-muted-foreground">Satisfaction Score</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">$147</div>
            <div className="text-sm text-muted-foreground">Avg Monthly Savings</div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Button variant="outline" className="flex-1">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Analytics
          </Button>
          <Button className="flex-1 bg-housing-primary hover:bg-housing-secondary">
            <MapPin className="w-4 h-4 mr-2" />
            Community Map
          </Button>
        </div>
      </Card>
    </div>
  );
};