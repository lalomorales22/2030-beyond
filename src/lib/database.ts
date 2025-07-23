export interface CommunityData {
  id: string;
  name: string;
  location: string;
  members: number;
  energy_generated: number;
  energy_consumed: number;
  housing_units: number;
  governance_proposals: number;
  financial_health: number;
  created_at: string;
}

export interface EnergyData {
  id: string;
  community_id: string;
  timestamp: string;
  solar_generation: number;
  battery_storage: number;
  grid_consumption: number;
  efficiency_score: number;
}

export interface HousingData {
  id: string;
  community_id: string;
  unit_type: string;
  occupancy_rate: number;
  maintenance_score: number;
  energy_efficiency: number;
  affordability_index: number;
}

export interface FinanceData {
  id: string;
  community_id: string;
  member_id: string;
  credit_score: number;
  savings_balance: number;
  loan_amount: number;
  cooperative_shares: number;
  timestamp: string;
}

export interface GovernanceData {
  id: string;
  community_id: string;
  proposal_title: string;
  proposal_type: string;
  votes_for: number;
  votes_against: number;
  status: string;
  created_at: string;
}

class BrowserDataService {
  private communities: CommunityData[] = [];
  private energyData: EnergyData[] = [];
  private housingData: HousingData[] = [];
  private financeData: FinanceData[] = [];
  private governanceData: GovernanceData[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Check if data already exists in localStorage
    const storedCommunities = localStorage.getItem('community_2030');
    if (storedCommunities) {
      this.communities = JSON.parse(storedCommunities);
      this.energyData = JSON.parse(localStorage.getItem('energy_2030') || '[]');
      this.housingData = JSON.parse(localStorage.getItem('housing_2030') || '[]');
      this.financeData = JSON.parse(localStorage.getItem('finance_2030') || '[]');
      this.governanceData = JSON.parse(localStorage.getItem('governance_2030') || '[]');
      return;
    }

    // Seed initial data
    this.seedSampleData();
    this.saveToStorage();
  }

  private seedSampleData() {
    // Sample communities
    this.communities = [
      {
        id: 'community-1',
        name: 'Verde Valley Collective',
        location: 'Austin, TX',
        members: 150,
        energy_generated: 2500.5,
        energy_consumed: 2100.2,
        housing_units: 45,
        governance_proposals: 12,
        financial_health: 8.7,
        created_at: new Date().toISOString()
      },
      {
        id: 'community-2',
        name: 'Solar Springs Co-op',
        location: 'Phoenix, AZ',
        members: 220,
        energy_generated: 3200.8,
        energy_consumed: 2800.1,
        housing_units: 78,
        governance_proposals: 18,
        financial_health: 9.2,
        created_at: new Date().toISOString()
      },
      {
        id: 'community-3',
        name: 'EcoVillage North',
        location: 'Sacramento, CA',
        members: 180,
        energy_generated: 2800.3,
        energy_consumed: 2400.7,
        housing_units: 62,
        governance_proposals: 15,
        financial_health: 8.9,
        created_at: new Date().toISOString()
      }
    ];

    // Sample energy data
    for (let i = 0; i < 10; i++) {
      this.energyData.push({
        id: `energy-${i + 1}`,
        community_id: 'community-1',
        timestamp: new Date(Date.now() - i * 86400000).toISOString(),
        solar_generation: Math.random() * 100 + 50,
        battery_storage: Math.random() * 80 + 20,
        grid_consumption: Math.random() * 60 + 10,
        efficiency_score: Math.random() * 20 + 80
      });
    }

    // Sample housing data
    const housingTypes = ['Studio', '1BR', '2BR', '3BR', 'Family'];
    housingTypes.forEach((type, index) => {
      this.housingData.push({
        id: `housing-${index + 1}`,
        community_id: 'community-1',
        unit_type: type,
        occupancy_rate: Math.random() * 20 + 80,
        maintenance_score: Math.random() * 20 + 80,
        energy_efficiency: Math.random() * 30 + 70,
        affordability_index: Math.random() * 30 + 70
      });
    });

    // Sample governance data
    const proposals = [
      {
        id: 'gov-1',
        community_id: 'community-1',
        proposal_title: 'Install Additional Solar Panels',
        proposal_type: 'Infrastructure',
        votes_for: 85,
        votes_against: 12,
        status: 'approved',
        created_at: new Date().toISOString()
      },
      {
        id: 'gov-2',
        community_id: 'community-1',
        proposal_title: 'Community Garden Expansion',
        proposal_type: 'Community',
        votes_for: 78,
        votes_against: 8,
        status: 'active',
        created_at: new Date().toISOString()
      },
      {
        id: 'gov-3',
        community_id: 'community-1',
        proposal_title: 'New Cooperative Bank Partnership',
        proposal_type: 'Finance',
        votes_for: 92,
        votes_against: 15,
        status: 'approved',
        created_at: new Date().toISOString()
      }
    ];

    this.governanceData = proposals;
  }

  private saveToStorage() {
    localStorage.setItem('community_2030', JSON.stringify(this.communities));
    localStorage.setItem('energy_2030', JSON.stringify(this.energyData));
    localStorage.setItem('housing_2030', JSON.stringify(this.housingData));
    localStorage.setItem('finance_2030', JSON.stringify(this.financeData));
    localStorage.setItem('governance_2030', JSON.stringify(this.governanceData));
  }

  // Community methods
  getCommunities(): CommunityData[] {
    return this.communities;
  }

  getCommunity(id: string): CommunityData | undefined {
    return this.communities.find(c => c.id === id);
  }

  // Energy methods
  getEnergyData(communityId: string): EnergyData[] {
    return this.energyData
      .filter(e => e.community_id === communityId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 30);
  }

  // Housing methods
  getHousingData(communityId: string): HousingData[] {
    return this.housingData.filter(h => h.community_id === communityId);
  }

  // Finance methods
  getFinanceData(communityId: string): FinanceData[] {
    return this.financeData
      .filter(f => f.community_id === communityId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 50);
  }

  // Governance methods
  getGovernanceData(communityId: string): GovernanceData[] {
    return this.governanceData
      .filter(g => g.community_id === communityId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
}

export const dbService = new BrowserDataService();