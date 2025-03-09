"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/dashboard/page-container";
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { TrafficChart } from "@/components/dashboard/traffic-chart";
import { RecentVehicles } from "@/components/dashboard/recent-vehicles";
import { CheckpointChart } from "@/components/dashboard/checkpoint-chart";
import { VehicleTypeChart } from "@/components/dashboard/vehicle-type-chart";
import { CheckpointMap } from "@/components/dashboard/checkpoint-map";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  RefreshCw,
  Calendar,
  TrendingUp,
  Clock,
  Shield,
  AlertTriangle,
  ChevronRight,
  Car,
  MapPin,
  BarChart3,
  Activity,
  Filter,
  Network,
  Database,
  Wifi,
  Cloud,
} from "lucide-react";

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("overview");

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <PageContainer
      title="Command Center"
      description="Comprehensive overview of checkpoint operations and vehicle monitoring across Mizoram"
    >
      {/* Executive Summary */}
      <Card className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-900/20 border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Executive Summary</CardTitle>
              <CardDescription>
                Real-time system status and key metrics
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="text-xs font-normal py-1 backdrop-blur-sm bg-white/50 dark:bg-black/20"
              >
                <Clock className="h-3 w-3 mr-1" />
                {currentTime.toLocaleDateString()}{" "}
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="backdrop-blur-sm bg-white/50 dark:bg-black/20"
              >
                {isRefreshing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/50 dark:bg-black/20 border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
                  <div className="text-xl font-bold">Operational</div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground border-t pt-2">
                <div className="w-full grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <Network className="h-3 w-3 mr-1 text-green-500" />
                    Network OK
                  </div>
                  <div className="flex items-center">
                    <Database className="h-3 w-3 mr-1 text-green-500" />
                    DB Active
                  </div>
                  <div className="flex items-center">
                    <Wifi className="h-3 w-3 mr-1 text-green-500" />
                    API Online
                  </div>
                  <div className="flex items-center">
                    <Cloud className="h-3 w-3 mr-1 text-green-500" />
                    Backup OK
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card className="bg-white/50 dark:bg-black/20 border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Car className="h-4 w-4 mr-2 text-blue-500" />
                  Active Vehicles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold">1,284</div>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12%
                  </Badge>
                </div>
                <div className="mt-2 h-1.5 w-full bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground border-t pt-2">
                Target: 1,500 vehicles/day
              </CardFooter>
            </Card>

            <Card className="bg-white/50 dark:bg-black/20 border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-amber-500" />
                  Checkpoints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold">5/7</div>
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    71.4%
                  </Badge>
                </div>
                <div className="mt-2 h-1.5 w-full bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                    style={{ width: "71.4%" }}
                  ></div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground border-t pt-2">
                2 checkpoints under maintenance
              </CardFooter>
            </Card>

            <Card className="bg-white/50 dark:bg-black/20 border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                  Priority Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold">3</div>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                    Action Required
                  </Badge>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full bg-red-100 dark:bg-red-900/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground border-t pt-2">
                2 high priority, 1 medium
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <Button variant="outline" size="sm" className="shadow-sm">
          <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
          View Alerts
        </Button>
        <Button variant="outline" size="sm" className="shadow-sm">
          <BarChart3 className="h-4 w-4 mr-2 text-blue-500" />
          Analytics
        </Button>
        <Button variant="outline" size="sm" className="shadow-sm">
          <Download className="h-4 w-4 mr-2 text-green-500" />
          Export Report
        </Button>
        <Button variant="outline" size="sm" className="shadow-sm">
          <Filter className="h-4 w-4 mr-2 text-purple-500" />
          Filter Data
        </Button>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <OverviewStats />

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <Card className="md:col-span-2 border-0 shadow-md">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Traffic Overview</CardTitle>
                  <CardDescription>
                    Vehicle traffic across all checkpoints
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last 7 days
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <TrafficChart />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle>Checkpoint Status</CardTitle>
                <CardDescription>
                  Active and inactive checkpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CheckpointChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <Card className="md:col-span-2 border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle>Checkpoint Map</CardTitle>
                <CardDescription>
                  Geographic distribution of checkpoints
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <CheckpointMap />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle>Vehicle Types</CardTitle>
                <CardDescription>
                  Distribution by vehicle category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleTypeChart />
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Vehicles</CardTitle>
                <CardDescription>
                  Latest vehicles passing through checkpoints
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <RecentVehicles />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Key performance indicators across all checkpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart />
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3">
                <CardTitle>Vehicle Distribution</CardTitle>
                <CardDescription>
                  Distribution by vehicle category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VehicleTypeChart />
              </CardContent>
            </Card>
          </div>

          <ActivityHeatmap />

          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>
                    Detailed insights and performance metrics
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-0">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Processing Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2.8 min</div>
                      <p className="text-xs text-muted-foreground">
                        Avg. per vehicle
                      </p>
                      <div className="mt-4 h-2 bg-blue-200 dark:bg-blue-800 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-0">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Success Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">98.5%</div>
                      <p className="text-xs text-muted-foreground">
                        Scan accuracy
                      </p>
                      <div className="mt-4 h-2 bg-green-200 dark:bg-green-800 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: "98.5%" }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border-0">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Peak Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">10AM-2PM</div>
                      <p className="text-xs text-muted-foreground">
                        Highest traffic
                      </p>
                      <div className="mt-4 h-2 bg-amber-200 dark:bg-amber-800 rounded-full">
                        <div
                          className="h-2 bg-amber-500 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-0">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Alert Response</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1.5 min</div>
                      <p className="text-xs text-muted-foreground">
                        Avg. response time
                      </p>
                      <div className="mt-4 h-2 bg-purple-200 dark:bg-purple-800 rounded-full">
                        <div
                          className="h-2 bg-purple-500 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Report Generation</CardTitle>
                  <CardDescription>
                    Create and export detailed reports
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Daily Report</CardTitle>
                    <CardDescription>Last 24 hours activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Generate Report</Button>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Summary</CardTitle>
                    <CardDescription>Past 7 days overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Generate Report</Button>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Analysis</CardTitle>
                    <CardDescription>
                      Comprehensive monthly data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Generate Report</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
