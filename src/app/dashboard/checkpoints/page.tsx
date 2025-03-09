"use client";

import { PageContainer } from "@/components/dashboard/page-container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, MapPin, Users, Car, Clock } from "lucide-react";
import { useState } from "react";

// Sample checkpoint data
const checkpoints = [
  {
    id: "CP001",
    name: "Aizawl East",
    location: "Zemabawk, Aizawl",
    coordinates: "23.7362° N, 92.7473° E",
    status: "Active",
    officersOnDuty: 4,
    vehiclesProcessed: 1245,
    avgProcessingTime: "2.5 min",
  },
  {
    id: "CP002",
    name: "Aizawl West",
    location: "Rangvamual, Aizawl",
    coordinates: "23.7107° N, 92.6893° E",
    status: "Active",
    officersOnDuty: 3,
    vehiclesProcessed: 987,
    avgProcessingTime: "3.1 min",
  },
  {
    id: "CP003",
    name: "Lengpui",
    location: "Lengpui Airport Road",
    coordinates: "23.8407° N, 92.6193° E",
    status: "Active",
    officersOnDuty: 5,
    vehiclesProcessed: 756,
    avgProcessingTime: "2.8 min",
  },
  {
    id: "CP004",
    name: "Champhai",
    location: "Champhai-Zokhawthar Road",
    coordinates: "23.4560° N, 93.3301° E",
    status: "Active",
    officersOnDuty: 6,
    vehiclesProcessed: 543,
    avgProcessingTime: "3.5 min",
  },
  {
    id: "CP005",
    name: "Kolasib",
    location: "NH-54, Kolasib",
    coordinates: "24.2240° N, 92.6790° E",
    status: "Active",
    officersOnDuty: 4,
    vehiclesProcessed: 678,
    avgProcessingTime: "2.9 min",
  },
  {
    id: "CP006",
    name: "Lunglei",
    location: "Lunglei-Tlabung Road",
    coordinates: "22.8879° N, 92.7446° E",
    status: "Inactive",
    officersOnDuty: 0,
    vehiclesProcessed: 0,
    avgProcessingTime: "0 min",
  },
  {
    id: "CP007",
    name: "Serchhip",
    location: "NH-54, Serchhip",
    coordinates: "23.3416° N, 92.8483° E",
    status: "Active",
    officersOnDuty: 3,
    vehiclesProcessed: 432,
    avgProcessingTime: "2.7 min",
  },
  {
    id: "CP008",
    name: "Lawngtlai",
    location: "Lawngtlai-Saiha Road",
    coordinates: "22.5280° N, 92.8900° E",
    status: "Active",
    officersOnDuty: 2,
    vehiclesProcessed: 321,
    avgProcessingTime: "3.2 min",
  },
];

export default function CheckpointsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCheckpoints = checkpoints.filter(
    (checkpoint) =>
      checkpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checkpoint.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer title="Checkpoints">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Checkpoint
          </Button>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search checkpoints..."
            className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredCheckpoints.map((checkpoint) => (
            <Card
              key={checkpoint.id}
              className={checkpoint.status === "Inactive" ? "opacity-70" : ""}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{checkpoint.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {checkpoint.location}
                    </CardDescription>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      checkpoint.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                    }`}
                  >
                    {checkpoint.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mb-4">
                  Coordinates: {checkpoint.coordinates}
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                    <Users className="h-4 w-4 mb-1 text-blue-500" />
                    <span className="font-semibold">
                      {checkpoint.officersOnDuty}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Officers
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                    <Car className="h-4 w-4 mb-1 text-green-500" />
                    <span className="font-semibold">
                      {checkpoint.vehiclesProcessed}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Vehicles
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-md">
                    <Clock className="h-4 w-4 mb-1 text-amber-500" />
                    <span className="font-semibold">
                      {checkpoint.avgProcessingTime}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Avg Time
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
