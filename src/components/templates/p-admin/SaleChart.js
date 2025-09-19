"use client";

import React from "react";
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
  { date: "1/1/2025", Amount: 2400 },
  { date: "1/2/2025", Amount: 2210 },
  { date: "1/3/2025", Amount: 2290 },
  { date: "1/4/2025", Amount: 2000 },
  { date: "1/5/2025", Amount: 2181 },
  { date: "1/6/2025", Amount: 2500 },
  { date: "1/7/2025", Amount: 2100 },
];

function SaleChart() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg mt-20">
      <h2 className="text-2xl font-semibold mb-4 text-white">
       📈 Monthly Sales
      </h2>
      <div className="w-full h-96">
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="date" stroke="#D1D5DB" />
            <YAxis stroke="#D1D5DB" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                color: "#F9FAFB",
              }}
              labelStyle={{ color: "#F9FAFB" }}
              itemStyle={{ color: "#F9FAFB" }}
            />
            <Area
              type="monotone"
              dataKey="Amount"
              stroke="#F3F4F6"
              fill="#6B7280"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SaleChart;
