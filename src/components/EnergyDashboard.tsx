import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Battery, 
  Sun, 
  TrendingUp,
  Lightbulb,
  Home as HomeIcon,
  Factory
} from "lucide-react";
import { dbService, EnergyData } from "@/lib/database";
import { useEffect, useState } from "react";

export const EnergyDashboard = () => {
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);

  useEffect(() => {
    const data = dbService.getEnergyData('community-1');
    setEnergyData(data);
  }, []);

  const currentData = energyData[0] || {
    solar_generation: 0,
    battery_storage: 0,
    grid_consumption: 0,
    efficiency_score: 0
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Energy Commons</h1>
          <p className="text-muted-foreground">AI-managed community microgrid system</p>
        </div>
        <Badge variant="secondary" className="bg-energy-primary text-white">
          <Zap className="w-4 h-4 mr-1" />
          Grid Active
        </Badge>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-energy text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Solar Generation</p>
              <p className="text-2xl font-bold">{currentData.solar_generation.toFixed(1)} kW</p>
            </div>
            <Sun className="w-8 h-8 opacity-80" />
          </div>
          <div className="mt-4">
            <Progress value={75} className="h-2 bg-white/20" />
            <p className="text-xs mt-1 opacity-75">Peak: 120 kW</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Battery Storage</p>
              <p className="text-2xl font-bold text-foreground">{currentData.battery_storage.toFixed(0)}%</p>
            </div>
            <Battery className="w-8 h-8 text-housing-primary" />
          </div>
          <div className="mt-4">
            <Progress value={currentData.battery_storage} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">Capacity: 500 kWh</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Grid Consumption</p>
              <p className="text-2xl font-bold text-foreground">{currentData.grid_consumption.toFixed(1)} kW</p>
            </div>
            <Factory className="w-8 h-8 text-finance-primary" />
          </div>
          <div className="mt-4">
            <Progress value={40} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">Peak: 95 kW</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Efficiency Score</p>
              <p className="text-2xl font-bold text-foreground">{currentData.efficiency_score.toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-4">
            <Progress value={currentData.efficiency_score} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">Above target</p>
          </div>
        </Card>
      </div>

      {/* Energy Flow Diagram */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-energy-primary" />
          Real-time Energy Flow
        </h3>
        <div className="grid grid-cols-3 gap-8 items-center">
          {/* Solar Source */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-energy flex items-center justify-center">
              <Sun className="w-10 h-10 text-white" />
            </div>
            <h4 className="font-semibold">Solar Array</h4>
            <p className="text-sm text-muted-foreground">{currentData.solar_generation.toFixed(1)} kW generating</p>
          </div>

          {/* Battery Storage */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-housing flex items-center justify-center">
              <Battery className="w-10 h-10 text-white" />
            </div>
            <h4 className="font-semibold">Battery Grid</h4>
            <p className="text-sm text-muted-foreground">{currentData.battery_storage.toFixed(0)}% capacity</p>
          </div>

          {/* Community Load */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-finance flex items-center justify-center">
              <HomeIcon className="w-10 h-10 text-white" />
            </div>
            <h4 className="font-semibold">Community Load</h4>
            <p className="text-sm text-muted-foreground">{currentData.grid_consumption.toFixed(1)} kW consuming</p>
          </div>
        </div>

        {/* Flow Arrows */}
        <div className="flex justify-center mt-6 text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>→</span>
            <span className="text-sm">Energy Flow</span>
            <span>→</span>
          </div>
        </div>
      </Card>

      {/* AI Optimization Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-ai-primary" />
            AI Optimization Insights
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">Peak Performance Window</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Solar generation will peak at 2:30 PM today. Battery charging optimized for maximum efficiency.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Load Balancing</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI shifted 15% of non-critical loads to off-peak hours, saving $127 in grid costs.
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium">Weather Adaptation</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Cloud coverage detected. Battery discharge adjusted to maintain grid stability.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Energy Trading</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div>
                <p className="font-medium text-green-700 dark:text-green-300">Surplus Sale</p>
                <p className="text-sm text-green-600 dark:text-green-400">To Solar Springs Co-op</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700 dark:text-green-300">+$45.60</p>
                <p className="text-xs text-green-600 dark:text-green-400">15.2 kWh</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">Emergency Support</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">To EcoVillage North</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-700 dark:text-blue-300">+$28.40</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">8.5 kWh</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Today's Trading Profit</span>
                <span className="font-semibold text-green-600">+$74.00</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Historical Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Historical Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">98.7%</div>
            <div className="text-sm text-muted-foreground">Uptime This Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">$1,247</div>
            <div className="text-sm text-muted-foreground">Cost Savings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">2.8 tons</div>
            <div className="text-sm text-muted-foreground">CO₂ Avoided</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">147%</div>
            <div className="text-sm text-muted-foreground">Grid Independence</div>
          </div>
        </div>
      </Card>
    </div>
  );
};