"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "T1", active: 35, new: 18, warning: 5 },
  { month: "T2", active: 42, new: 22, warning: 8 },
  { month: "T3", active: 38, new: 15, warning: 6 },
  { month: "T4", active: 51, new: 28, warning: 10 },
  { month: "T5", active: 47, new: 21, warning: 7 },
  { month: "T6", active: 58, new: 31, warning: 9 },
  { month: "T7", active: 63, new: 35, warning: 12 },
  { month: "T8", active: 55, new: 26, warning: 8 },
  { month: "T9", active: 70, new: 40, warning: 11 },
  { month: "T10", active: 66, new: 33, warning: 9 },
  { month: "T11", active: 74, new: 42, warning: 13 },
  { month: "T12", active: 80, new: 48, warning: 15 },
];

export default function PerformanceChart() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">Hiệu suất chuỗi cung ứng</h3>
          <p className="text-[13px] text-gray-400 mt-0.5">01 Jan – 31 Dec 2025</p>
        </div>
        <select className="text-[13px] border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 outline-none focus:border-brand-400">
          <option>Năm 2025</option>
          <option>Năm 2024</option>
        </select>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center gap-1.5 text-[13px] text-gray-600">
          <span className="size-2.5 rounded-full bg-brand-500 inline-block" />
          Hoạt động
        </span>
        <span className="flex items-center gap-1.5 text-[13px] text-gray-600">
          <span className="size-2.5 rounded-full bg-amber-400 inline-block" />
          Mới
        </span>
        <span className="flex items-center gap-1.5 text-[13px] text-gray-600">
          <span className="size-2.5 rounded-full bg-red-400 inline-block" />
          Cảnh báo
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: 12 }}
            cursor={{ stroke: "#e5e7eb" }}
          />
          <Line type="monotone" dataKey="active" stroke="#1570ef" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="new" stroke="#f59e0b" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="warning" stroke="#f87171" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
