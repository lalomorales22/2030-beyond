import Database from 'better-sqlite3';

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

class DatabaseService {
  private db: Database.Database;

  constructor() {
    this.db = new Database('nexus_community.db');
    this.initializeTables();
    this.seedSampleData();
  }

  private initializeTables() {
    // Communities table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS communities (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        members INTEGER DEFAULT 0,
        energy_generated REAL DEFAULT 0,
        energy_consumed REAL DEFAULT 0,
        housing_units INTEGER DEFAULT 0,
        governance_proposals INTEGER DEFAULT 0,
        financial_health REAL DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Energy data table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS energy_data (
        id TEXT PRIMARY KEY,
        community_id TEXT NOT NULL,
        timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
        solar_generation REAL DEFAULT 0,
        battery_storage REAL DEFAULT 0,
        grid_consumption REAL DEFAULT 0,
        efficiency_score REAL DEFAULT 0,
        FOREIGN KEY (community_id) REFERENCES communities (id)
      )
    `);

    // Housing data table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS housing_data (
        id TEXT PRIMARY KEY,
        community_id TEXT NOT NULL,
        unit_type TEXT NOT NULL,
        occupancy_rate REAL DEFAULT 0,
        maintenance_score REAL DEFAULT 0,
        energy_efficiency REAL DEFAULT 0,
        affordability_index REAL DEFAULT 0,
        FOREIGN KEY (community_id) REFERENCES communities (id)
      )
    `);

    // Finance data table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS finance_data (
        id TEXT PRIMARY KEY,
        community_id TEXT NOT NULL,
        member_id TEXT NOT NULL,
        credit_score INTEGER DEFAULT 0,
        savings_balance REAL DEFAULT 0,
        loan_amount REAL DEFAULT 0,
        cooperative_shares INTEGER DEFAULT 0,
        timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (community_id) REFERENCES communities (id)
      )
    `);

    // Governance data table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS governance_data (
        id TEXT PRIMARY KEY,
        community_id TEXT NOT NULL,
        proposal_title TEXT NOT NULL,
        proposal_type TEXT NOT NULL,
        votes_for INTEGER DEFAULT 0,
        votes_against INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (community_id) REFERENCES communities (id)
      )
    `);
  }

  private seedSampleData() {
    // Check if data already exists
    const existingCommunities = this.db.prepare('SELECT COUNT(*) as count FROM communities').get() as { count: number };
    if (existingCommunities.count > 0) return;

    // Insert sample communities
    const insertCommunity = this.db.prepare(`
      INSERT INTO communities (id, name, location, members, energy_generated, energy_consumed, housing_units, governance_proposals, financial_health)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const communities = [
      ['community-1', 'Verde Valley Collective', 'Austin, TX', 150, 2500.5, 2100.2, 45, 12, 8.7],
      ['community-2', 'Solar Springs Co-op', 'Phoenix, AZ', 220, 3200.8, 2800.1, 78, 18, 9.2],
      ['community-3', 'EcoVillage North', 'Sacramento, CA', 180, 2800.3, 2400.7, 62, 15, 8.9]
    ];

    communities.forEach(community => {
      insertCommunity.run(...community);
    });

    // Insert sample energy data
    const insertEnergy = this.db.prepare(`
      INSERT INTO energy_data (id, community_id, solar_generation, battery_storage, grid_consumption, efficiency_score)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (let i = 0; i < 10; i++) {
      insertEnergy.run(
        `energy-${i + 1}`,
        'community-1',
        Math.random() * 100 + 50,
        Math.random() * 80 + 20,
        Math.random() * 60 + 10,
        Math.random() * 20 + 80
      );
    }

    // Insert sample housing data
    const insertHousing = this.db.prepare(`
      INSERT INTO housing_data (id, community_id, unit_type, occupancy_rate, maintenance_score, energy_efficiency, affordability_index)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const housingTypes = ['Studio', '1BR', '2BR', '3BR', 'Family'];
    housingTypes.forEach((type, index) => {
      insertHousing.run(
        `housing-${index + 1}`,
        'community-1',
        type,
        Math.random() * 20 + 80,
        Math.random() * 20 + 80,
        Math.random() * 30 + 70,
        Math.random() * 30 + 70
      );
    });

    // Insert sample governance data
    const insertGovernance = this.db.prepare(`
      INSERT INTO governance_data (id, community_id, proposal_title, proposal_type, votes_for, votes_against, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const proposals = [
      ['gov-1', 'community-1', 'Install Additional Solar Panels', 'Infrastructure', 85, 12, 'approved'],
      ['gov-2', 'community-1', 'Community Garden Expansion', 'Community', 78, 8, 'active'],
      ['gov-3', 'community-1', 'New Cooperative Bank Partnership', 'Finance', 92, 15, 'approved']
    ];

    proposals.forEach(proposal => {
      insertGovernance.run(...proposal);
    });
  }

  // Community methods
  getCommunities(): CommunityData[] {
    return this.db.prepare('SELECT * FROM communities').all() as CommunityData[];
  }

  getCommunity(id: string): CommunityData | undefined {
    return this.db.prepare('SELECT * FROM communities WHERE id = ?').get(id) as CommunityData | undefined;
  }

  // Energy methods
  getEnergyData(communityId: string): EnergyData[] {
    return this.db.prepare('SELECT * FROM energy_data WHERE community_id = ? ORDER BY timestamp DESC LIMIT 30').all(communityId) as EnergyData[];
  }

  // Housing methods
  getHousingData(communityId: string): HousingData[] {
    return this.db.prepare('SELECT * FROM housing_data WHERE community_id = ?').all(communityId) as HousingData[];
  }

  // Finance methods
  getFinanceData(communityId: string): FinanceData[] {
    return this.db.prepare('SELECT * FROM finance_data WHERE community_id = ? ORDER BY timestamp DESC LIMIT 50').all(communityId) as FinanceData[];
  }

  // Governance methods
  getGovernanceData(communityId: string): GovernanceData[] {
    return this.db.prepare('SELECT * FROM governance_data WHERE community_id = ? ORDER BY created_at DESC').all(communityId) as GovernanceData[];
  }

  close() {
    this.db.close();
  }
}

export const dbService = new DatabaseService();