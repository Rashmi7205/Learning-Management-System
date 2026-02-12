"use client";

import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", hours: 1.2 },
  { day: "Tue", hours: 2.8 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 4.2 },
  { day: "Fri", hours: 3.0 },
  { day: "Sat", hours: 0.8 },
  { day: "Sun", hours: 2.1 },
];

export const LearningProgressChart = () => {
  return (
    <Card className="p-8 border-none bg-white dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-[2.5rem] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#06D001]/10 blur-[60px] rounded-full -mr-16 -mt-16" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 relative z-10">
        <div>
          <h2 className="text-2xl font-serif font-black italic">
            Learning Journey
          </h2>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1">
            Activity Analysis
          </p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {["7D", "30D", "1Y"].map((t) => (
            <button
              key={t}
              className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all ${t === "7D" ? "bg-[#2845D6] text-white" : "text-slate-500"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2845D6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2845D6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
              opacity={0.1}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontFamily: "Space Mono", fill: "#64748b" }}
              dy={10}
            />
            <YAxis hide domain={[0, 6]} />
            <Tooltip
              cursor={{
                stroke: "#2845D6",
                strokeWidth: 2,
                strokeDasharray: "5 5",
              }}
              contentStyle={{
                backgroundColor: "#0F172A",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#2845D6"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#chartGradient)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
