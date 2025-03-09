"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Car, TrendingUp } from "lucide-react";
import { CHECKPOINTS, type Checkpoint } from "@/lib/data/checkpoints";
import { cn } from "@/lib/utils";

export function Overview() {
  const activeCheckpoints = CHECKPOINTS.filter(
    (cp: Checkpoint) => cp.status === "active"
  ).length;
  const totalVehicles = CHECKPOINTS.reduce(
    (sum: number, cp: Checkpoint) => sum + cp.vehicles,
    0
  );
  const totalAlerts = CHECKPOINTS.reduce(
    (sum: number, cp: Checkpoint) => sum + cp.alerts,
    0
  );

  // Calculate percentage of active checkpoints
  const activePercentage = Math.round(
    (activeCheckpoints / CHECKPOINTS.length) * 100
  );

  return (
    <div className="col-span-1 md:col-span-2">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20">
          <div className="absolute top-0 right-0 p-3 opacity-20">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Checkpoints
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <div className="text-3xl font-bold">{activeCheckpoints}</div>
              <div className="text-sm text-muted-foreground">
                / {CHECKPOINTS.length}
              </div>
            </div>
            <div className="mt-3 h-2 w-full bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-in-out"
                style={{ width: `${activePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              {activePercentage}% operational
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20">
          <div className="absolute top-0 right-0 p-3 opacity-20">
            <Car className="h-16 w-16 text-blue-500" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Vehicles
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
              <Car className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-3xl font-bold">{totalVehicles}</div>
            </div>
            <div className="mt-3 grid grid-cols-10 gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    i < Math.min(Math.ceil(totalVehicles / 50), 10)
                      ? "bg-blue-500"
                      : "bg-blue-100 dark:bg-blue-900/30"
                  )}
                ></div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Passed through today
            </p>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "overflow-hidden border-0 shadow-md bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20",
            totalAlerts > 0 && "animate-pulse-slow"
          )}
        >
          <div className="absolute top-0 right-0 p-3 opacity-20">
            <AlertTriangle className="h-16 w-16 text-red-500" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-3xl font-bold">{totalAlerts}</div>
            </div>
            <div className="mt-3 flex space-x-1">
              {totalAlerts > 0 ? (
                Array.from({ length: Math.min(totalAlerts, 5) }).map((_, i) => (
                  <div
                    key={i}
                    className="h-2 flex-1 rounded-full bg-red-500 animate-pulse"
                  ></div>
                ))
              ) : (
                <div className="h-2 w-full rounded-full bg-green-500"></div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {totalAlerts === 0
                ? "No alerts - all systems normal"
                : `${totalAlerts} alert${
                    totalAlerts > 1 ? "s" : ""
                  } requiring attention`}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
