"use client";

import { useState } from "react";
import { CheckpointMap } from "@/components/monitoring/checkpoint-map";
import { Overview } from "@/components/monitoring/overview";
import { RecentActivity } from "@/components/monitoring/recent-activity";
import { PageContainer } from "@/components/dashboard/page-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RefreshCw,
  Download,
  Clock,
  AlertTriangle,
  Filter,
  BarChart3,
  MapPin,
  Activity,
} from "lucide-react";

export default function MonitoringPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <PageContainer
      title="Monitoring"
      description="Real-time monitoring of check gates and vehicle activities across Mizoram."
    >
      {/* Header with status and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium">
              System Status: Operational
            </span>
            <Badge variant="outline" className="ml-2">
              <Clock className="h-3 w-3 mr-1" />
              Live
            </Badge>
            <Badge variant="outline" className="ml-2">
              <AlertTriangle className="h-3 w-3 mr-1" />3 Alerts
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()} • Monitoring 5
            active checkpoints
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
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
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview stats */}
      <Overview />

      {/* Tabs for different views */}
      <Tabs defaultValue="map" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="map">
            <MapPin className="h-4 w-4 mr-2" />
            Map View
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="h-4 w-4 mr-2" />
            Activity Feed
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 md:col-span-2">
              <Card className="overflow-hidden border-0 shadow-md">
                <CardHeader className="bg-muted/50 pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    Checkpoint Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CheckpointMap />
                </CardContent>
              </Card>
            </div>
            <div className="col-span-1">
              <RecentActivity />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md p-6">
                <div className="text-center">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">
                    Activity Timeline View
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    A detailed timeline of all checkpoint activities would be
                    displayed here, showing events across all checkpoints in
                    chronological order.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <RecentActivity />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Checkpoint Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md p-6">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">
                    Analytics Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Detailed analytics and charts would be displayed here,
                    showing traffic patterns, alert frequencies, and checkpoint
                    performance metrics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
