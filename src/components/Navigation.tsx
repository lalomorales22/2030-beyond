import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Home, 
  DollarSign, 
  Users, 
  Brain,
  BarChart3,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeSystem: string;
  onSystemChange: (system: string) => void;
}

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: BarChart3, color: 'bg-gradient-primary' },
  { id: 'energy', label: 'Energy Commons', icon: Zap, color: 'bg-gradient-energy' },
  { id: 'housing', label: 'Housing Network', icon: Home, color: 'bg-gradient-housing' },
  { id: 'finance', label: 'Finance Co-op', icon: DollarSign, color: 'bg-gradient-finance' },
  { id: 'governance', label: 'Governance', icon: Users, color: 'bg-gradient-governance' },
  { id: 'ai', label: 'AI Engine', icon: Brain, color: 'bg-gradient-ai' },
];

export const Navigation = ({ activeSystem, onSystemChange }: NavigationProps) => {
  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-medium">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">2030</h1>
            <p className="text-sm text-muted-foreground">Community Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSystem === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-12 text-left transition-all duration-300",
                isActive && "shadow-medium"
              )}
              onClick={() => onSystemChange(item.id)}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                isActive ? "bg-white/20" : item.color
              )}>
                <Icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-white" : "text-white"
                )} />
              </div>
              <span className={cn(
                "font-medium",
                isActive ? "text-primary-foreground" : "text-foreground"
              )}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 h-12"
          onClick={() => window.location.href = '/settings'}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Button>
      </div>
    </div>
  );
};