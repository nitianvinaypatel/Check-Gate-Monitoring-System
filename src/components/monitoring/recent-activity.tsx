"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Car,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  RefreshCw,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  checkpoint: string;
  event: string;
  time: string;
  details: string;
  type: "vehicle" | "alert" | "status";
}

const activities: Activity[] = [
  {
    id: "act1",
    checkpoint: "Vairengte",
    event: "Vehicle passed",
    time: "2 minutes ago",
    details: "MZ01A1234",
    type: "vehicle",
  },
  {
    id: "act2",
    checkpoint: "Bairabi",
    event: "Alert triggered",
    time: "5 minutes ago",
    details: "Suspicious activity",
    type: "alert",
  },
  {
    id: "act3",
    checkpoint: "Lengpui",
    event: "Status change",
    time: "10 minutes ago",
    details: "Checkpoint activated",
    type: "status",
  },
  {
    id: "act4",
    checkpoint: "Champhai",
    event: "Vehicle passed",
    time: "15 minutes ago",
    details: "MZ05B5678",
    type: "vehicle",
  },
  {
    id: "act5",
    checkpoint: "Kolasib",
    event: "Vehicle passed",
    time: "20 minutes ago",
    details: "MZ02C9012",
    type: "vehicle",
  },
];

export function RecentActivity() {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "vehicle":
        return <Car className="h-4 w-4 text-blue-500" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "status":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityBadge = (type: Activity["type"]) => {
    switch (type) {
      case "vehicle":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
          >
            Vehicle
          </Badge>
        );
      case "alert":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
          >
            Alert
          </Badge>
        );
      case "status":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
          >
            Status
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="h-full border-0 shadow-md">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest events from all checkpoints</CardDescription>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5 relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-[19px] w-[2px] bg-muted-foreground/20"></div>

          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start relative">
              {/* Timeline dot */}
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center z-10 mr-3",
                  activity.type === "vehicle" &&
                    "bg-blue-100 dark:bg-blue-900/30",
                  activity.type === "alert" && "bg-red-100 dark:bg-red-900/30",
                  activity.type === "status" &&
                    "bg-green-100 dark:bg-green-900/30"
                )}
              >
                {getActivityIcon(activity.type)}
              </div>

              <div className="flex-1 bg-muted/30 rounded-lg p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium leading-none">
                      {activity.checkpoint}
                    </p>
                    <div className="mx-2">•</div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {activity.event}
                    </p>
                  </div>
                  {getActivityBadge(activity.type)}
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {activity.details}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          className="w-full mt-4 text-xs text-muted-foreground"
        >
          View All Activity
        </Button>
      </CardContent>
    </Card>
  );
}
