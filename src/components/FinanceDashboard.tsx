import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Shield,
  PiggyBank,
  CreditCard,
  Handshake,
  BarChart3
} from "lucide-react";
import { dbService, FinanceData } from "@/lib/database";
import { useEffect, useState } from "react";

export const FinanceDashboard = () => {
  const [financeData, setFinanceData] = useState<FinanceData[]>([]);

  useEffect(() => {
    const data = dbService.getFinanceData('community-1');
    setFinanceData(data);
  }, []);

  const totalSavings = financeData.reduce((acc, member) => acc + member.savings_balance, 0);
  const totalLoans = financeData.reduce((acc, member) => acc + member.loan_amount, 0);
  const avgCreditScore = financeData.reduce((acc, member) => acc + member.credit_score, 0) / financeData.length || 0;
  const totalShares = financeData.reduce((acc, member) => acc + member.cooperative_shares, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Finance Cooperative</h1>
          <p className="text-muted-foreground">AI-driven inclusive financial services</p>
        </div>
        <Badge variant="secondary" className="bg-finance-primary text-white">
          <Shield className="w-4 h-4 mr-1" />
          FDIC Insured
        </Badge>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-finance text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Community Fund</p>
              <p className="text-2xl font-bold">$2.4M</p>
            </div>
            <PiggyBank className="w-8 h-8 opacity-80" />
          </div>
          <div className="mt-4">
            <Progress value={78} className="h-2 bg-white/20" />
            <p className="text-xs mt-1 opacity-75">78% of $3M target</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Credit Score</p>
              <p className="text-2xl font-bold text-foreground">{avgCreditScore.toFixed(0)}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-governance-primary" />
          </div>
          <div className="mt-4">
            <Progress value={Math.min((avgCreditScore - 300) / (850 - 300) * 100, 100)} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">Excellent range</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Loan Approval Rate</p>
              <p className="text-2xl font-bold text-foreground">89%</p>
            </div>
            <CreditCard className="w-8 h-8 text-housing-primary" />
          </div>
          <div className="mt-4">
            <Progress value={89} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">Above industry avg.</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Member Savings</p>
              <p className="text-2xl font-bold text-foreground">${(totalSavings / 1000).toFixed(0)}K</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-4">
            <Progress value={85} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">Growing 12% monthly</p>
          </div>
        </Card>
      </div>

      {/* Cooperative Ownership */}
      <Card className="p-6 bg-gradient-governance text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Handshake className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold">Cooperative Ownership</h3>
              <p className="opacity-90">Members own equity in the financial platform</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{totalShares.toLocaleString()}</div>
            <div className="text-sm opacity-90">Total Shares Outstanding</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-lg font-semibold">$4.80</div>
            <div className="text-sm opacity-90">Share Value</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">15.2%</div>
            <div className="text-sm opacity-90">Annual Dividend</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">150</div>
            <div className="text-sm opacity-90">Shareholder Members</div>
          </div>
        </div>
      </Card>

      {/* Financial Services Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-finance-primary" />
            Lending Portfolio
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <div>
                <p className="font-medium text-green-700 dark:text-green-300">Micro-loans</p>
                <p className="text-sm text-green-600 dark:text-green-400">$50 - $5,000</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700 dark:text-green-300">$247K</p>
                <p className="text-xs text-green-600 dark:text-green-400">89 active</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">Housing Loans</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Down payment assist</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-700 dark:text-blue-300">$1.2M</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">24 active</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div>
                <p className="font-medium text-purple-700 dark:text-purple-300">Business Loans</p>
                <p className="text-sm text-purple-600 dark:text-purple-400">Community enterprises</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-700 dark:text-purple-300">$380K</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">12 active</p>
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Default Rate</span>
                <span className="font-semibold text-green-600">1.2%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-finance-primary" />
            Member Financial Health
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Credit Score Improvement</span>
                <span className="text-lg font-bold text-green-600">+67 avg</span>
              </div>
              <p className="text-sm text-muted-foreground">Since joining cooperative</p>
              <Progress value={78} className="h-2 mt-2" />
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Emergency Fund Coverage</span>
                <span className="text-lg font-bold text-blue-600">4.2 months</span>
              </div>
              <p className="text-sm text-muted-foreground">Average savings buffer</p>
              <Progress value={84} className="h-2 mt-2" />
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Debt-to-Income Ratio</span>
                <span className="text-lg font-bold text-purple-600">22%</span>
              </div>
              <p className="text-sm text-muted-foreground">Well below 36% target</p>
              <Progress value={22} className="h-2 mt-2" />
            </div>
          </div>
        </Card>
      </div>

      {/* AI-Driven Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-ai-primary" />
          AI Financial Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-700 dark:text-green-300">Credit Boost Opportunity</span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400">
              47 members eligible for credit-building programs this month
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-blue-700 dark:text-blue-300">Savings Goal Achievement</span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              89% of members on track to meet emergency fund goals
            </p>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-purple-700 dark:text-purple-300">Investment Opportunity</span>
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Community solar bonds yielding 7.2% available for investment
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button className="h-16 bg-finance-primary hover:bg-finance-secondary">
          <div className="text-center">
            <DollarSign className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm">Apply for Loan</div>
          </div>
        </Button>
        <Button variant="outline" className="h-16">
          <div className="text-center">
            <PiggyBank className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm">Open Savings</div>
          </div>
        </Button>
        <Button variant="outline" className="h-16">
          <div className="text-center">
            <BarChart3 className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm">Financial Plan</div>
          </div>
        </Button>
        <Button variant="outline" className="h-16">
          <div className="text-center">
            <Handshake className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm">Buy Shares</div>
          </div>
        </Button>
      </div>
    </div>
  );
};