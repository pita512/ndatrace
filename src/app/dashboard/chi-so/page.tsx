"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const kpis = [
  { label: "Tổng UID đã cấp", value: "1,284,560", sub: "+12,430 tháng này", color: "text-blue-600" },
  { label: "UID hoạt động", value: "1,102,340", sub: "85.8% tổng UID", color: "text-green-600" },
  { label: "Sản phẩm đang truy xuất", value: "4,218", sub: "+83 tuần này", color: "text-indigo-600" },
  { label: "Sự kiện hôm nay", value: "8,724", sub: "+14% so với hôm qua", color: "text-purple-600" },
  { label: "Tem nhãn đã in", value: "982,110", sub: "76.5% tổng UID", color: "text-amber-600" },
  { label: "Chuỗi cung ứng", value: "312", sub: "18 đang hoạt động", color: "text-teal-600" },
  { label: "API calls/ngày", value: "234,810", sub: "Avg 163ms", color: "text-rose-600" },
  { label: "Tỷ lệ thành công", value: "99.2%", sub: "0.8% lỗi", color: "text-green-700" },
];

const monthlyUID = [
  { month: "T1", uid: 88000 },
  { month: "T2", uid: 95000 },
  { month: "T3", uid: 102000 },
  { month: "T4", uid: 91000 },
  { month: "T5", uid: 115000 },
  { month: "T6", uid: 130000 },
  { month: "T7", uid: 122000 },
  { month: "T8", uid: 140000 },
  { month: "T9", uid: 138000 },
  { month: "T10", uid: 150000 },
  { month: "T11", uid: 162000 },
  { month: "T12", uid: 145000 },
];

const dailyEvents = [
  { day: "CN", events: 4200 },
  { day: "T2", events: 8900 },
  { day: "T3", events: 9400 },
  { day: "T4", events: 8100 },
  { day: "T5", events: 9800 },
  { day: "T6", events: 10200 },
  { day: "T7", events: 6100 },
];

export default function Page() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Chỉ số hoạt động</h1>
        <p className="text-sm text-gray-500 mt-1">Tổng quan các chỉ số vận hành hệ thống NDATrace</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-[13px] text-gray-500 mb-1">{k.label}</p>
            <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-[13px] text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Cấp phát UID theo tháng</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyUID} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} UID`, "Số lượng"]} />
              <Bar dataKey="uid" fill="#1570EF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Sự kiện theo ngày trong tuần</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dailyEvents} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} sự kiện`, "Số lượng"]} />
              <Bar dataKey="events" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
