"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, ChevronDown } from "lucide-react";

interface HeatmapItem {
  day: string;
  hour: string;
  value: number;
}

// Generate sample data for the heatmap
const generateHeatmapData = (): HeatmapItem[] => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const data: HeatmapItem[] = [];

  days.forEach((day, dayIndex) => {
    hours.forEach((hour) => {
      // Generate more realistic patterns
      let value: number;

      // Lower activity at night (0-5)
      if (hour >= 0 && hour <= 5) {
        value = Math.floor(Math.random() * 30);
      }
      // Morning rush (6-9)
      else if (hour >= 6 && hour <= 9) {
        value = Math.floor(Math.random() * 50) + 50;
      }
      // Midday (10-15)
      else if (hour >= 10 && hour <= 15) {
        value = Math.floor(Math.random() * 40) + 30;
      }
      // Evening rush (16-19)
      else if (hour >= 16 && hour <= 19) {
        value = Math.floor(Math.random() * 50) + 50;
      }
      // Evening (20-23)
      else {
        value = Math.floor(Math.random() * 40) + 20;
      }

      // Weekend adjustment
      if (dayIndex >= 5) {
        // Sat and Sun
        value = Math.floor(value * 0.7); // Less traffic on weekends
      }

      data.push({
        day,
        hour: `${hour.toString().padStart(2, "0")}:00`,
        value,
      });
    });
  });

  return data;
};

const heatmapData = generateHeatmapData();

export function ActivityHeatmap() {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState("all");

  // Get min and max values for color scaling
  const minValue = Math.min(...heatmapData.map((item) => item.value));
  const maxValue = Math.max(...heatmapData.map((item) => item.value));

  // Function to get color based on value
  const getColor = (value: number): string => {
    // Normalize value between 0 and 1
    const normalized = (value - minValue) / (maxValue - minValue);

    // Color gradient from light blue to dark blue
    if (normalized < 0.2) return "bg-blue-50 dark:bg-blue-950/30";
    if (normalized < 0.4) return "bg-blue-100 dark:bg-blue-900/40";
    if (normalized < 0.6) return "bg-blue-200 dark:bg-blue-800/50";
    if (normalized < 0.8) return "bg-blue-300 dark:bg-blue-700/60";
    return "bg-blue-400 dark:bg-blue-600/70";
  };

  // Group data by day
  const groupedData = heatmapData.reduce<Record<string, HeatmapItem[]>>(
    (acc, item) => {
      if (!acc[item.day]) {
        acc[item.day] = [];
      }
      acc[item.day].push(item);
      return acc;
    },
    {}
  );

  // Get unique hours
  const hours = [...new Set(heatmapData.map((item) => item.hour))];

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle>Activity Heatmap</CardTitle>
          <CardDescription>Traffic intensity by hour and day</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={selectedCheckpoint}
            onValueChange={setSelectedCheckpoint}
          >
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="All Checkpoints" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Checkpoints</SelectItem>
              <SelectItem value="aizawl-east">Aizawl East</SelectItem>
              <SelectItem value="aizawl-west">Aizawl West</SelectItem>
              <SelectItem value="lengpui">Lengpui</SelectItem>
              <SelectItem value="champhai">Champhai</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-8">
            <Calendar className="h-4 w-4 mr-2" />
            This Week
            <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-[auto_repeat(24,1fr)] gap-1">
              {/* Header row with hours */}
              <div className="h-8 flex items-center justify-center font-medium text-xs text-muted-foreground">
                Day/Hour
              </div>
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-8 flex items-center justify-center font-medium text-xs text-muted-foreground"
                >
                  {hour}
                </div>
              ))}

              {/* Data rows */}
              {Object.keys(groupedData).map((day) => (
                <React.Fragment key={day}>
                  <div className="h-8 flex items-center justify-center font-medium text-xs text-muted-foreground">
                    {day}
                  </div>
                  {groupedData[day].map((item) => (
                    <div
                      key={`${item.day}-${item.hour}`}
                      className={`h-8 rounded-sm ${getColor(
                        item.value
                      )} flex items-center justify-center text-xs font-medium transition-colors hover:opacity-80`}
                      title={`${item.day} ${item.hour}: ${item.value} vehicles`}
                    >
                      {item.value > maxValue * 0.7 && (
                        <span className="text-[10px] text-white dark:text-white/90">
                          {item.value}
                        </span>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-end">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Low</span>
                <div className="flex">
                  <div className="w-5 h-3 bg-blue-50 dark:bg-blue-950/30 rounded-l-sm"></div>
                  <div className="w-5 h-3 bg-blue-100 dark:bg-blue-900/40"></div>
                  <div className="w-5 h-3 bg-blue-200 dark:bg-blue-800/50"></div>
                  <div className="w-5 h-3 bg-blue-300 dark:bg-blue-700/60"></div>
                  <div className="w-5 h-3 bg-blue-400 dark:bg-blue-600/70 rounded-r-sm"></div>
                </div>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
