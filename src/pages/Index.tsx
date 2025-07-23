import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { DashboardOverview } from "@/components/DashboardOverview";
import { EnergyDashboard } from "@/components/EnergyDashboard";
import { HousingDashboard } from "@/components/HousingDashboard";
import { FinanceDashboard } from "@/components/FinanceDashboard";
import { GovernanceDashboard } from "@/components/GovernanceDashboard";
import { AIDashboard } from "@/components/AIDashboard";

const Index = () => {
  const [activeSystem, setActiveSystem] = useState('overview');

  const renderActiveSystem = () => {
    switch (activeSystem) {
      case 'overview':
        return <DashboardOverview />;
      case 'energy':
        return <EnergyDashboard />;
      case 'housing':
        return <HousingDashboard />;
      case 'finance':
        return <FinanceDashboard />;
      case 'governance':
        return <GovernanceDashboard />;
      case 'ai':
        return <AIDashboard />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar Navigation */}
      <div className="w-80 flex-shrink-0">
        <Navigation 
          activeSystem={activeSystem} 
          onSystemChange={setActiveSystem} 
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderActiveSystem()}
      </div>
    </div>
  );
};

export default Index;
