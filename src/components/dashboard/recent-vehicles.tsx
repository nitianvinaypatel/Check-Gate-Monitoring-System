"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const vehicles = [
  {
    id: "V001",
    regNumber: "MZ-01-A-1234",
    type: "Car",
    checkpoint: "Aizawl East",
    status: "Cleared",
    timestamp: "2023-06-10T09:30:00",
  },
  {
    id: "V002",
    regNumber: "MZ-02-B-5678",
    type: "Truck",
    checkpoint: "Lengpui",
    status: "Flagged",
    timestamp: "2023-06-10T10:15:00",
  },
  {
    id: "V003",
    regNumber: "MZ-03-C-9012",
    type: "Bus",
    checkpoint: "Champhai",
    status: "Cleared",
    timestamp: "2023-06-10T11:00:00",
  },
  {
    id: "V004",
    regNumber: "MZ-04-D-3456",
    type: "Car",
    checkpoint: "Kolasib",
    status: "Cleared",
    timestamp: "2023-06-10T11:45:00",
  },
  {
    id: "V005",
    regNumber: "MZ-05-E-7890",
    type: "Truck",
    checkpoint: "Aizawl West",
    status: "Flagged",
    timestamp: "2023-06-10T12:30:00",
  },
];

export function RecentVehicles() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Vehicles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left font-medium">Reg Number</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Checkpoint</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b">
                  <td className="px-4 py-3">{vehicle.regNumber}</td>
                  <td className="px-4 py-3">{vehicle.type}</td>
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
                  <td className="px-4 py-3">{formatDate(vehicle.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
