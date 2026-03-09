"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const summaryCards = [
  { label: "Tổng sự kiện tháng này", value: "124,830", change: "+8.4%", up: true },
  { label: "UID đã cấp tháng này", value: "145,000", change: "+12.1%", up: true },
  { label: "Sản phẩm truy xuất", value: "4,218", change: "+2.3%", up: true },
  { label: "Lỗi hệ thống", value: "142", change: "-18.2%", up: false },
];

const monthlyData = [
  { month: "T1", events: 88400, uid: 88000 },
  { month: "T2", events: 92100, uid: 95000 },
  { month: "T3", events: 97300, uid: 102000 },
  { month: "T4", events: 89500, uid: 91000 },
  { month: "T5", events: 108200, uid: 115000 },
  { month: "T6", events: 115600, uid: 130000 },
  { month: "T7", events: 112400, uid: 122000 },
  { month: "T8", events: 128900, uid: 140000 },
  { month: "T9", events: 121300, uid: 138000 },
  { month: "T10", events: 135700, uid: 150000 },
  { month: "T11", events: 148200, uid: 162000 },
  { month: "T12", events: 124830, uid: 145000 },
];

export default function Page() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Báo cáo hoạt động</h1>
        <p className="text-sm text-gray-500 mt-1">Tổng hợp báo cáo hoạt động hệ thống NDATrace năm 2026</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {summaryCards.map((c) => (
          <div key={c.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-[13px] text-gray-500 mb-1">{c.label}</p>
            <p className="text-2xl font-bold text-gray-900">{c.value}</p>
            <p className={`text-[13px] mt-1 font-medium ${c.up ? "text-green-600" : "text-red-500"}`}>
              {c.change} so với tháng trước
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Sự kiện truy xuất theo tháng (2026)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} sự kiện`, "Số lượng"]} />
              <Legend />
              <Line type="monotone" dataKey="events" name="Sự kiện" stroke="#1570EF" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">UID được cấp theo tháng (2026)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} UID`, "Số lượng"]} />
              <Bar dataKey="uid" name="UID cấp" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
