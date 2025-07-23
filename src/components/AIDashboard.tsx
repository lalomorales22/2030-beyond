import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Activity, 
  Zap, 
  TrendingUp,
  Shield,
  Cpu,
  Network,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from "lucide-react";

export const AIDashboard = () => {
  const aiAgents = [
    {
      name: "Energy Optimizer",
      status: "active",
      efficiency: 97,
      lastAction: "Optimized solar panel angles for 14% efficiency gain",
      uptime: "99.8%"
    },
    {
      name: "Housing Coordinator",
      status: "active", 
      efficiency: 94,
      lastAction: "Scheduled maintenance for 8 units based on predictive analysis",
      uptime: "99.2%"
    },
    {
      name: "Financial Advisor",
      status: "active",
      efficiency: 92,
      lastAction: "Identified 12 members for credit improvement programs",
      uptime: "98.9%"
    },
    {
      name: "Governance Facilitator",
      status: "active",
      efficiency: 89,
      lastAction: "Translated proposal into 3 languages, predicted 85% approval",
      uptime: "99.5%"
    },
    {
      name: "Meta-Coordinator",
      status: "active",
      efficiency: 96,
      lastAction: "Synchronized cross-system optimization protocols",
      uptime: "99.9%"
    }
  ];

  const systemHealth = {
    overall: 95,
    security: 98,
    performance: 93,
    reliability: 97
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Orchestration Engine</h1>
          <p className="text-muted-foreground">Central nervous system coordinating all community systems</p>
        </div>
        <Badge variant="secondary" className="bg-ai-primary text-white">
          <Brain className="w-4 h-4 mr-1" />
          All Systems Active
        </Badge>
      </div>

      {/* System Status Overview */}
      <Card className="p-6 bg-gradient-ai text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Brain className="w-10 h-10" />
            <div>
              <h3 className="text-2xl font-bold">System Status: Optimal</h3>
              <p className="opacity-90">All AI agents functioning within normal parameters</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{systemHealth.overall}%</div>
            <div className="text-sm opacity-90">Overall Health</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-5 h-5" />
              <span className="text-lg font-semibold">{systemHealth.security}%</span>
            </div>
            <div className="text-sm opacity-90">Security</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Cpu className="w-5 h-5" />
              <span className="text-lg font-semibold">{systemHealth.performance}%</span>
            </div>
            <div className="text-sm opacity-90">Performance</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Network className="w-5 h-5" />
              <span className="text-lg font-semibold">{systemHealth.reliability}%</span>
            </div>
            <div className="text-sm opacity-90">Reliability</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Activity className="w-5 h-5" />
              <span className="text-lg font-semibold">24/7</span>
            </div>
            <div className="text-sm opacity-90">Monitoring</div>
          </div>
        </div>
      </Card>

      {/* AI Agents Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-ai-primary" />
          AI Agents Status
        </h3>
        <div className="space-y-4">
          {aiAgents.map((agent, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground">{agent.name}</h4>
                    <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                      {agent.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {agent.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{agent.lastAction}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">{agent.efficiency}%</div>
                  <div className="text-xs text-muted-foreground">Efficiency</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Performance</span>
                    <span className="font-medium">{agent.efficiency}%</span>
                  </div>
                  <Progress value={agent.efficiency} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="font-medium">{agent.uptime}</span>
                  </div>
                  <Progress value={parseFloat(agent.uptime)} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Real-time Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-ai-primary" />
            Real-time Insights
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-700 dark:text-green-300">Energy Optimization</span>
                <Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Active
                </Badge>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400">
                Predicting 15% efficiency gain through automated load balancing in next 2 hours
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-700 dark:text-blue-300">Predictive Analytics</span>
                <Badge className="ml-auto bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Learning
                </Badge>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Housing demand model suggests 3BR units will be 87% occupied within 30 days
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Network className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-purple-700 dark:text-purple-300">Cross-System Sync</span>
                <Badge className="ml-auto bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Coordinated
                </Badge>
              </div>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Financial and housing systems synchronized for optimal member assistance programs
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            System Alerts & Recommendations
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-700 dark:text-yellow-300">Maintenance Window</span>
              </div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-2">
                AI recommends updating energy optimization algorithms during low-usage period (2-4 AM)
              </p>
              <Button size="sm" variant="outline" className="text-yellow-700 border-yellow-600">
                Schedule Update
              </Button>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-700 dark:text-blue-300">Model Retraining</span>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                Financial risk models can be improved with 30 days of new member data
              </p>
              <Button size="sm" variant="outline" className="text-blue-700 border-blue-600">
                Start Training
              </Button>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-700 dark:text-green-300">Optimization Complete</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400">
                Community resource allocation optimized - 12% efficiency improvement achieved
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">1.2M</div>
            <div className="text-sm text-muted-foreground">Decisions Processed</div>
            <div className="text-xs text-green-600 mt-1">+15% this month</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">847ms</div>
            <div className="text-sm text-muted-foreground">Avg Response Time</div>
            <div className="text-xs text-green-600 mt-1">-23% improvement</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">99.7%</div>
            <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            <div className="text-xs text-green-600 mt-1">Above target</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">$47K</div>
            <div className="text-sm text-muted-foreground">Cost Savings</div>
            <div className="text-xs text-green-600 mt-1">This quarter</div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button className="h-16 bg-ai-primary hover:bg-ai-secondary">
          <div className="text-center">
            <Brain className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm">Train Models</div>
          </div>
        </Button>
        <Button variant="outline" className="h-16">
          <div className="text-center">
            <Activity className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm">View Logs</div>
          </div>
        </Button>
        <Button variant="outline" className="h-16">
          <div className="text-center">
            <Shield className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm">Security Audit</div>
          </div>
        </Button>
        <Button variant="outline" className="h-16">
          <div className="text-center">
            <Network className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm">System Config</div>
          </div>
        </Button>
      </div>
    </div>
  );
};