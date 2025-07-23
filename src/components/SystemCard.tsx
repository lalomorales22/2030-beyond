import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  metrics: Array<{
    label: string;
    value: string | number;
    progress?: number;
    trend?: 'up' | 'down' | 'stable';
  }>;
  gradientClass: string;
  colorClass: string;
  className?: string;
}

export const SystemCard = ({ 
  title, 
  description, 
  icon: Icon, 
  metrics, 
  gradientClass, 
  colorClass,
  className 
}: SystemCardProps) => {
  return (
    <Card className={cn(
      "relative overflow-hidden border-0 shadow-medium hover:shadow-strong transition-all duration-300 group",
      className
    )}>
      {/* Gradient Background */}
      <div className={cn("absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity", gradientClass)} />
      
      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-3 rounded-xl shadow-soft", colorClass)}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">{metric.value}</span>
                  {metric.trend && (
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      metric.trend === 'up' ? 'bg-green-500' : 
                      metric.trend === 'down' ? 'bg-red-500' : 'bg-yellow-500'
                    )} />
                  )}
                </div>
              </div>
              {metric.progress !== undefined && (
                <Progress 
                  value={metric.progress} 
                  className="h-2" 
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};