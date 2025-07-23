import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Vote, 
  FileText, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Lightbulb
} from "lucide-react";
import { dbService, GovernanceData } from "@/lib/database";
import { useEffect, useState } from "react";

export const GovernanceDashboard = () => {
  const [governanceData, setGovernanceData] = useState<GovernanceData[]>([]);

  useEffect(() => {
    const data = dbService.getGovernanceData('community-1');
    setGovernanceData(data);
  }, []);

  const activeProposals = governanceData.filter(proposal => proposal.status === 'active');
  const approvedProposals = governanceData.filter(proposal => proposal.status === 'approved');
  const totalVotes = governanceData.reduce((acc, proposal) => acc + proposal.votes_for + proposal.votes_against, 0);
  const participationRate = 87; // Mock participation rate

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Governance Layer</h1>
          <p className="text-muted-foreground">Transparent democratic decision making</p>
        </div>
        <Badge variant="secondary" className="bg-governance-primary text-white">
          <Vote className="w-4 h-4 mr-1" />
          {activeProposals.length} Active Votes
        </Badge>
      </div>

      {/* Governance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-governance text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Participation Rate</p>
              <p className="text-2xl font-bold">{participationRate}%</p>
            </div>
            <Users className="w-8 h-8 opacity-80" />
          </div>
          <div className="mt-4">
            <Progress value={participationRate} className="h-2 bg-white/20" />
            <p className="text-xs mt-1 opacity-75">131 of 150 members</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Proposals</p>
              <p className="text-2xl font-bold text-foreground">{activeProposals.length}</p>
            </div>
            <FileText className="w-8 h-8 text-finance-primary" />
          </div>
          <div className="mt-4">
            <Progress value={60} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">Awaiting votes</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Consensus Score</p>
              <p className="text-2xl font-bold text-foreground">9.2/10</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-4">
            <Progress value={92} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">High agreement</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Implementation Rate</p>
              <p className="text-2xl font-bold text-foreground">94%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-housing-primary" />
          </div>
          <div className="mt-4">
            <Progress value={94} className="h-2" />
            <p className="text-xs mt-1 text-muted-foreground">Decisions executed</p>
          </div>
        </Card>
      </div>

      {/* Active Proposals */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Vote className="w-5 h-5 text-governance-primary" />
          Active Proposals
        </h3>
        <div className="space-y-4">
          {governanceData.map((proposal, index) => {
            const totalVotes = proposal.votes_for + proposal.votes_against;
            const supportPercentage = totalVotes > 0 ? (proposal.votes_for / totalVotes) * 100 : 0;
            
            return (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{proposal.proposal_title}</h4>
                    <p className="text-sm text-muted-foreground">{proposal.proposal_type}</p>
                  </div>
                  <Badge variant={proposal.status === 'approved' ? 'default' : 'secondary'}>
                    {proposal.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {proposal.status === 'active' && <Clock className="w-3 h-3 mr-1" />}
                    {proposal.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                    {proposal.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{proposal.votes_for}</div>
                    <div className="text-sm text-muted-foreground">For</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">{proposal.votes_against}</div>
                    <div className="text-sm text-muted-foreground">Against</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{supportPercentage.toFixed(0)}%</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
                
                <Progress value={supportPercentage} className="h-3 mb-3" />
                
                {proposal.status === 'active' && (
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Vote For
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      <XCircle className="w-4 h-4 mr-1" />
                      Vote Against
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Discuss
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Governance Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-governance-primary" />
            Participation Trends
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">This Month</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">87%</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <Progress value={87} className="h-2" />
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Last Month</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">82%</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <Progress value={82} className="h-2" />
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">3 Months Ago</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">78%</span>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
            <Progress value={78} className="h-2" />
          </div>

          <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-700 dark:text-green-300">Upward Trend</span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400">
              Participation has increased 12% over the last quarter
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-ai-primary" />
            AI Governance Insights
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-blue-700 dark:text-blue-300">Optimal Voting Window</span>
              </div>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Tuesday-Thursday 6-8 PM shows highest engagement rates
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium text-purple-700 dark:text-purple-300">Consensus Prediction</span>
              </div>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                "Community Garden Expansion" likely to pass with 78% support
              </p>
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="font-medium text-orange-700 dark:text-orange-300">Engagement Opportunity</span>
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                15 members haven't participated in recent votes - outreach recommended
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button className="h-16 bg-governance-primary hover:bg-governance-secondary">
          <div className="text-center">
            <FileText className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm">Submit Proposal</div>
          </div>
        </Button>
        <Button variant="outline" className="h-16">
          <div className="text-center">
            <Vote className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm">Review Votes</div>
          </div>
        </Button>
        <Button variant="outline" className="h-16">
          <div className="text-center">
            <MessageSquare className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm">Community Forum</div>
          </div>
        </Button>
        <Button variant="outline" className="h-16">
          <div className="text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-1" />
            <div className="text-sm">View Analytics</div>
          </div>
        </Button>
      </div>
    </div>
  );
};