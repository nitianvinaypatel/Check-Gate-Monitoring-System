"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  {
    metric: "Speed",
    current: 85,
    target: 90,
    average: 70,
  },
  {
    metric: "Accuracy",
    current: 92,
    target: 95,
    average: 85,
  },
  {
    metric: "Efficiency",
    current: 78,
    target: 85,
    average: 65,
  },
  {
    metric: "Coverage",
    current: 88,
    target: 90,
    average: 75,
  },
  {
    metric: "Reliability",
    current: 95,
    target: 98,
    average: 80,
  },
  {
    metric: "Response",
    current: 82,
    target: 90,
    average: 70,
  },
];

export function PerformanceChart() {
  return (
    <div className="h-[400px] w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid className="stroke-muted/50" />
          <PolarAngleAxis
            dataKey="metric"
            className="text-xs text-muted-foreground"
            tick={{ fill: "currentColor" }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            className="text-xs text-muted-foreground"
            tick={{ fill: "currentColor" }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="rounded-lg border bg-background p-3 shadow-sm">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-sm font-medium">{data.metric}</p>
                      <hr className="border-muted my-1" />
                      {payload.map((entry, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-4"
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
                            {entry.value ? `${entry.value}%` : "0%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            content={({ payload }) => (
              <div className="flex items-center justify-center gap-4 mt-4">
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
          <Radar
            name="Current"
            dataKey="current"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="Target"
            dataKey="target"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.2}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Radar
            name="Average"
            dataKey="average"
            stroke="#6b7280"
            fill="#6b7280"
            fillOpacity={0.1}
            strokeWidth={1}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
