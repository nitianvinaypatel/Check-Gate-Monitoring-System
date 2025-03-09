"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

const data = [
  {
    name: "Cars",
    count: 5200,
    trend: "+12%",
    color: "#3b82f6",
  },
  {
    name: "Trucks",
    count: 3100,
    trend: "+8%",
    color: "#10b981",
  },
  {
    name: "Buses",
    count: 1800,
    trend: "-5%",
    color: "#f59e0b",
  },
  {
    name: "Motorcycles",
    count: 1500,
    trend: "+15%",
    color: "#8b5cf6",
  },
  {
    name: "Vans",
    count: 858,
    trend: "+3%",
    color: "#6b7280",
  },
];

export function VehicleTypeChart() {
  return (
    <div className="h-[400px] w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-muted/30"
            horizontal={false}
          />
          <XAxis
            type="number"
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value.toLocaleString()}`}
          />
          <YAxis
            dataKey="name"
            type="category"
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
            width={100}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="rounded-lg border bg-background p-3 shadow-sm">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: data.color }}
                        />
                        <p className="text-sm font-medium">{data.name}</p>
                      </div>
                      <hr className="border-muted my-1" />
                      <div className="flex items-center justify-between gap-8">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            Count
                          </span>
                          <span className="text-sm font-medium">
                            {data.count.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground">
                            Trend
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              data.trend.startsWith("+")
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {data.trend}
                          </span>
                        </div>
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
              <div className="flex items-center justify-center gap-4 mb-4">
                {payload?.map((entry, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: data[index].color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          />
          <Bar
            dataKey="count"
            radius={[4, 4, 4, 4]}
            fill="currentColor"
            className="fill-primary"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
