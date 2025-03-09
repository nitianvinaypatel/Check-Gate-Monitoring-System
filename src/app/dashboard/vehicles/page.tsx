"use client";

import { useState } from "react";
import { PageContainer } from "@/components/dashboard/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Plus } from "lucide-react";
import { formatDate } from "@/lib/utils";

// Sample vehicle data
const vehicles = [
  {
    id: "V001",
    regNumber: "MZ-01-A-1234",
    type: "Car",
    make: "Toyota",
    model: "Innova",
    owner: "John Doe",
    checkpoint: "Aizawl East",
    status: "Cleared",
    timestamp: "2023-06-10T09:30:00",
  },
  {
    id: "V002",
    regNumber: "MZ-02-B-5678",
    type: "Truck",
    make: "Tata",
    model: "407",
    owner: "Jane Smith",
    checkpoint: "Lengpui",
    status: "Flagged",
    timestamp: "2023-06-10T10:15:00",
  },
  {
    id: "V003",
    regNumber: "MZ-03-C-9012",
    type: "Bus",
    make: "Ashok Leyland",
    model: "Viking",
    owner: "Transport Corp",
    checkpoint: "Champhai",
    status: "Cleared",
    timestamp: "2023-06-10T11:00:00",
  },
  {
    id: "V004",
    regNumber: "MZ-04-D-3456",
    type: "Car",
    make: "Maruti",
    model: "Swift",
    owner: "Robert Johnson",
    checkpoint: "Kolasib",
    status: "Cleared",
    timestamp: "2023-06-10T11:45:00",
  },
  {
    id: "V005",
    regNumber: "MZ-05-E-7890",
    type: "Truck",
    make: "Mahindra",
    model: "Bolero Pickup",
    owner: "Logistics Ltd",
    checkpoint: "Aizawl West",
    status: "Flagged",
    timestamp: "2023-06-10T12:30:00",
  },
  {
    id: "V006",
    regNumber: "MZ-06-F-1234",
    type: "Car",
    make: "Hyundai",
    model: "i20",
    owner: "Sarah Williams",
    checkpoint: "Aizawl East",
    status: "Cleared",
    timestamp: "2023-06-10T13:15:00",
  },
  {
    id: "V007",
    regNumber: "MZ-07-G-5678",
    type: "Motorcycle",
    make: "Hero",
    model: "Splendor",
    owner: "Michael Brown",
    checkpoint: "Lengpui",
    status: "Cleared",
    timestamp: "2023-06-10T14:00:00",
  },
  {
    id: "V008",
    regNumber: "MZ-08-H-9012",
    type: "Van",
    make: "Maruti",
    model: "Eeco",
    owner: "Delivery Services",
    checkpoint: "Champhai",
    status: "Flagged",
    timestamp: "2023-06-10T14:45:00",
  },
];

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer title="Vehicles">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search vehicles..."
            className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium">
                      Reg Number
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Type</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Make/Model
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Owner</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Checkpoint
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="border-b">
                      <td className="px-4 py-3">{vehicle.regNumber}</td>
                      <td className="px-4 py-3">{vehicle.type}</td>
                      <td className="px-4 py-3">
                        {vehicle.make} {vehicle.model}
                      </td>
                      <td className="px-4 py-3">{vehicle.owner}</td>
                      <td className="px-4 py-3">{vehicle.checkpoint}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            vehicle.status === "Cleared"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(vehicle.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
