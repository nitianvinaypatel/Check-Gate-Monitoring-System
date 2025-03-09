"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    cars: 2500,
    trucks: 1500,
    buses: 800,
    motorcycles: 1200,
    total: 4000,
  },
  {
    name: "Feb",
    cars: 2000,
    trucks: 1200,
    buses: 600,
    motorcycles: 1000,
    total: 3000,
  },
  {
    name: "Mar",
    cars: 3000,
    trucks: 1800,
    buses: 900,
    motorcycles: 1300,
    total: 5000,
  },
  {
    name: "Apr",
    cars: 2800,
    trucks: 1600,
    buses: 800,
    motorcycles: 1200,
    total: 4500,
  },
  {
    name: "May",
    cars: 3500,
    trucks: 2000,
    buses: 1000,
    motorcycles: 1500,
    total: 6000,
  },
  {
    name: "Jun",
    cars: 3200,
    trucks: 1900,
    buses: 900,
    motorcycles: 1400,
    total: 5500,
  },
  {
    name: "Jul",
    cars: 4000,
    trucks: 2400,
    buses: 1200,
    motorcycles: 1800,
    total: 7000,
  },
  {
    name: "Aug",
    cars: 4500,
    trucks: 2700,
    buses: 1300,
    motorcycles: 2000,
    total: 8000,
  },
  {
    name: "Sep",
    cars: 4200,
    trucks: 2500,
    buses: 1200,
    motorcycles: 1900,
    total: 7500,
  },
  {
    name: "Oct",
    cars: 5000,
    trucks: 3000,
    buses: 1500,
    motorcycles: 2200,
    total: 9000,
  },
  {
    name: "Nov",
    cars: 4800,
    trucks: 2800,
    buses: 1400,
    motorcycles: 2100,
    total: 8500,
  },
  {
    name: "Dec",
    cars: 5500,
    trucks: 3300,
    buses: 1600,
    motorcycles: 2400,
    total: 10000,
  },
];

export function TrafficChart() {
  return (
    <div className="h-[400px] w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorCars" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTrucks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBuses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMotorcycles" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
          <XAxis
            dataKey="name"
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-3 shadow-sm">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-sm font-medium">{label}</p>
                      <hr className="border-muted my-1" />
                      {payload.map((entry, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-1">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-xs text-muted-foreground">
                              {entry.name}
                            </span>
                          </div>
                          <span className="text-xs font-medium">
                            {entry.value ? entry.value.toLocaleString() : "0"}
                          </span>
                        </div>
                      ))}
                      <hr className="border-muted my-1" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">Total</span>
                        <span className="text-xs font-medium">
                          {payload
                            .reduce((sum, entry) => sum + (entry.value || 0), 0)
                            .toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            content={({ payload }) => (
              <div className="flex items-center justify-center gap-4">
                {payload?.map((entry, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          />
          <Area
            type="monotone"
            dataKey="cars"
            name="Cars"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorCars)"
            fillOpacity={1}
          />
          <Area
            type="monotone"
            dataKey="trucks"
            name="Trucks"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#colorTrucks)"
            fillOpacity={1}
          />
          <Area
            type="monotone"
            dataKey="buses"
            name="Buses"
            stroke="#f59e0b"
            strokeWidth={2}
            fill="url(#colorBuses)"
            fillOpacity={1}
          />
          <Area
            type="monotone"
            dataKey="motorcycles"
            name="Motorcycles"
            stroke="#8b5cf6"
            strokeWidth={2}
            fill="url(#colorMotorcycles)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
