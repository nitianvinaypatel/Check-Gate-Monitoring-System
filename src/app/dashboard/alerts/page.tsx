"use client";

import { useState } from "react";
import { PageContainer } from "@/components/dashboard/page-container";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Info,
  Search,
  Settings,
  X,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

// Sample alerts data
const alerts = [
  {
    id: "A001",
    title: "Flagged Vehicle Detected",
    description:
      "Vehicle MZ-02-B-5678 has been flagged for inspection at Lengpui checkpoint.",
    type: "warning",
    timestamp: "2023-06-10T10:15:00",
    read: false,
    checkpoint: "Lengpui",
  },
  {
    id: "A002",
    title: "System Maintenance",
    description:
      "Scheduled system maintenance will occur tonight from 2:00 AM to 4:00 AM.",
    type: "info",
    timestamp: "2023-06-10T09:30:00",
    read: true,
    checkpoint: "All",
  },
  {
    id: "A003",
    title: "Checkpoint Offline",
    description:
      "Lunglei checkpoint is currently offline. Technical team has been notified.",
    type: "error",
    timestamp: "2023-06-10T08:45:00",
    read: false,
    checkpoint: "Lunglei",
  },
  {
    id: "A004",
    title: "High Traffic Alert",
    description: "Unusually high traffic detected at Aizawl East checkpoint.",
    type: "warning",
    timestamp: "2023-06-10T08:00:00",
    read: false,
    checkpoint: "Aizawl East",
  },
  {
    id: "A005",
    title: "New Officer Assigned",
    description: "Officer John Doe has been assigned to Champhai checkpoint.",
    type: "success",
    timestamp: "2023-06-09T16:30:00",
    read: true,
    checkpoint: "Champhai",
  },
  {
    id: "A006",
    title: "System Update Completed",
    description: "System has been updated to version 2.3.0 with new features.",
    type: "success",
    timestamp: "2023-06-09T14:15:00",
    read: true,
    checkpoint: "All",
  },
  {
    id: "A007",
    title: "Flagged Vehicle Cleared",
    description:
      "Vehicle MZ-05-E-7890 has been inspected and cleared at Aizawl West checkpoint.",
    type: "success",
    timestamp: "2023-06-09T11:45:00",
    read: true,
    checkpoint: "Aizawl West",
  },
  {
    id: "A008",
    title: "Checkpoint Processing Delay",
    description: "Delays reported at Kolasib checkpoint due to high volume.",
    type: "warning",
    timestamp: "2023-06-09T10:30:00",
    read: true,
    checkpoint: "Kolasib",
  },
];

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const getFilteredAlerts = () => {
    let filtered = alerts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (alert) =>
          alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.checkpoint.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filter !== "all") {
      filtered = filtered.filter((alert) => alert.type === filter);
    }

    return filtered;
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <X className="h-5 w-5 text-red-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <PageContainer title="Alerts">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Alert Settings
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search alerts..."
              className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "warning" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("warning")}
              className="text-amber-500"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Warnings
            </Button>
            <Button
              variant={filter === "error" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("error")}
              className="text-red-500"
            >
              <X className="mr-2 h-4 w-4" />
              Errors
            </Button>
            <Button
              variant={filter === "success" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("success")}
              className="text-green-500"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Success
            </Button>
            <Button
              variant={filter === "info" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("info")}
              className="text-blue-500"
            >
              <Info className="mr-2 h-4 w-4" />
              Info
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {getFilteredAlerts().map((alert) => (
            <Card
              key={alert.id}
              className={`border-l-4 ${
                alert.type === "warning"
                  ? "border-l-amber-500"
                  : alert.type === "error"
                  ? "border-l-red-500"
                  : alert.type === "success"
                  ? "border-l-green-500"
                  : "border-l-blue-500"
              } ${!alert.read ? "bg-muted/30" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {alert.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(alert.timestamp)}
                        </span>
                        {!alert.read && (
                          <span className="h-2 w-2 rounded-full bg-blue-500" />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        {alert.checkpoint}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Mark as {alert.read ? "unread" : "read"}
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {getFilteredAlerts().length === 0 && (
          <Card className="p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No alerts found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                No alerts match your current search or filter criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
