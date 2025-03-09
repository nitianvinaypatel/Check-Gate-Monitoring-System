"use client";

import { useState } from "react";
import { PageContainer } from "@/components/dashboard/page-container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for charts
const trafficData = [
  { name: "Mon", cars: 420, trucks: 180, buses: 80, motorcycles: 120 },
  { name: "Tue", cars: 380, trucks: 200, buses: 90, motorcycles: 110 },
  { name: "Wed", cars: 450, trucks: 210, buses: 85, motorcycles: 130 },
  { name: "Thu", cars: 470, trucks: 220, buses: 95, motorcycles: 140 },
  { name: "Fri", cars: 540, trucks: 250, buses: 100, motorcycles: 160 },
  { name: "Sat", cars: 580, trucks: 180, buses: 70, motorcycles: 190 },
  { name: "Sun", cars: 390, trucks: 120, buses: 60, motorcycles: 110 },
];

const hourlyData = [
  { hour: "00:00", vehicles: 45 },
  { hour: "02:00", vehicles: 30 },
  { hour: "04:00", vehicles: 25 },
  { hour: "06:00", vehicles: 80 },
  { hour: "08:00", vehicles: 220 },
  { hour: "10:00", vehicles: 180 },
  { hour: "12:00", vehicles: 160 },
  { hour: "14:00", vehicles: 170 },
  { hour: "16:00", vehicles: 210 },
  { hour: "18:00", vehicles: 240 },
  { hour: "20:00", vehicles: 160 },
  { hour: "22:00", vehicles: 90 },
];

const checkpointData = [
  { name: "Aizawl East", value: 3200 },
  { name: "Aizawl West", value: 2800 },
  { name: "Lengpui", value: 1800 },
  { name: "Champhai", value: 1500 },
  { name: "Kolasib", value: 1200 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const processingTimeData = [
  { checkpoint: "Aizawl East", time: 2.5 },
  { checkpoint: "Aizawl West", time: 3.1 },
  { checkpoint: "Lengpui", time: 2.8 },
  { checkpoint: "Champhai", time: 3.5 },
  { checkpoint: "Kolasib", time: 2.9 },
  { checkpoint: "Serchhip", time: 2.7 },
  { checkpoint: "Lawngtlai", time: 3.2 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week");

  return (
    <PageContainer title="Analytics">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={timeRange === "day" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange("day")}
              className="rounded-none"
            >
              Day
            </Button>
            <Button
              variant={timeRange === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange("week")}
              className="rounded-none"
            >
              Week
            </Button>
            <Button
              variant={timeRange === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange("month")}
              className="rounded-none"
            >
              Month
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Traffic by Type</CardTitle>
              <CardDescription>
                Distribution of vehicle types over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trafficData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="name"
                    className="text-xs text-muted-foreground"
                  />
                  <YAxis className="text-xs text-muted-foreground" />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="cars"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                  />
                  <Area
                    type="monotone"
                    dataKey="trucks"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                  />
                  <Area
                    type="monotone"
                    dataKey="buses"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                  />
                  <Area
                    type="monotone"
                    dataKey="motorcycles"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hourly Traffic Distribution</CardTitle>
              <CardDescription>
                Number of vehicles by hour of day
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={hourlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="hour"
                    className="text-xs text-muted-foreground"
                  />
                  <YAxis className="text-xs text-muted-foreground" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="vehicles"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checkpoint Distribution</CardTitle>
              <CardDescription>
                Percentage of vehicles by checkpoint
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={checkpointData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {checkpointData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} vehicles`, "Count"]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Processing Time</CardTitle>
              <CardDescription>
                Average time (minutes) to process a vehicle by checkpoint
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={processingTimeData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 60, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    type="number"
                    className="text-xs text-muted-foreground"
                  />
                  <YAxis
                    dataKey="checkpoint"
                    type="category"
                    className="text-xs text-muted-foreground"
                    width={80}
                  />
                  <Tooltip />
                  <Bar dataKey="time" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Trends Analysis</CardTitle>
            <CardDescription>
              Comparative analysis of traffic patterns over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <div className="flex justify-end mb-4">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter Data
              </Button>
            </div>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart
                data={[
                  { date: "Jan", current: 4200, previous: 3800 },
                  { date: "Feb", current: 4500, previous: 4100 },
                  { date: "Mar", current: 5100, previous: 4600 },
                  { date: "Apr", current: 5400, previous: 4900 },
                  { date: "May", current: 5800, previous: 5200 },
                  { date: "Jun", current: 6200, previous: 5500 },
                  { date: "Jul", current: 6500, previous: 5800 },
                  { date: "Aug", current: 6800, previous: 6100 },
                  { date: "Sep", current: 6500, previous: 5900 },
                  { date: "Oct", current: 6200, previous: 5700 },
                  { date: "Nov", current: 5800, previous: 5300 },
                  { date: "Dec", current: 6000, previous: 5500 },
                ]}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  className="text-xs text-muted-foreground"
                />
                <YAxis className="text-xs text-muted-foreground" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="current"
                  name="Current Year"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="previous"
                  name="Previous Year"
                  stroke="#9ca3af"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
