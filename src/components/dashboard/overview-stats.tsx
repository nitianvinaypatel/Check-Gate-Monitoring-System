"use client";

import { Car, AlertTriangle, CheckSquare, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  className?: string;
}

function StatsCard({
  title,
  value,
  icon,
  description,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatNumber(value)}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function OverviewStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Vehicles"
        value={12458}
        icon={<Car className="h-4 w-4 text-muted-foreground" />}
        description="Total vehicles scanned this month"
      />
      <StatsCard
        title="Flagged Vehicles"
        value={23}
        icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
        description="Vehicles flagged for inspection"
      />
      <StatsCard
        title="Checkpoints Active"
        value={8}
        icon={<CheckSquare className="h-4 w-4 text-green-500" />}
        description="Active checkpoints across Mizoram"
      />
      <StatsCard
        title="Average Wait Time"
        value={3}
        icon={<Clock className="h-4 w-4 text-blue-500" />}
        description="Minutes per vehicle at checkpoints"
      />
    </div>
  );
}
