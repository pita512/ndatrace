"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const kpis = [
  { label: "Tỷ lệ truy xuất thành công", value: "99.2%", sub: "↑ 0.3% tuần trước", color: "text-green-600" },
  { label: "Thời gian xử lý TB", value: "163ms", sub: "↓ 12ms so với TB tháng", color: "text-blue-600" },
  { label: "Sự kiện/giờ (peak)", value: "5,840", sub: "Giờ cao điểm 10:00-11:00", color: "text-purple-600" },
  { label: "Uptime hệ thống", value: "99.97%", sub: "Downtime: 2.6h/tháng", color: "text-teal-600" },
];

const performanceData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 7}/2`,
  responseTime: Math.round(145 + Math.random() * 60),
  throughput: Math.round(4200 + Math.random() * 2000),
  errorRate: parseFloat((0.3 + Math.random() * 0.8).toFixed(2)),
}));

const topProducts = [
  { rank: 1, san_pham: "Tôm sú đông lạnh", doanh_nghiep: "Cty Minh Phú", so_su_kien: 18420, uid_active: 120400, hieu_suat: "98.5%", trang_thai: "good" },
  { rank: 2, san_pham: "Cá tra phi-lê đông lạnh", doanh_nghiep: "Cty CP Vĩnh Hoàn", so_su_kien: 16380, uid_active: 95600, hieu_suat: "99.1%", trang_thai: "good" },
  { rank: 3, san_pham: "Gạo ST25 hữu cơ", doanh_nghiep: "HTX Sóc Trăng", so_su_kien: 14250, uid_active: 48200, hieu_suat: "97.8%", trang_thai: "good" },
  { rank: 4, san_pham: "Nước dừa tươi đóng lon", doanh_nghiep: "Cty CP Bến Tre", so_su_kien: 12100, uid_active: 210000, hieu_suat: "99.4%", trang_thai: "good" },
  { rank: 5, san_pham: "Sữa tươi thanh trùng", doanh_nghiep: "Cty CP Sữa Mộc Châu", so_su_kien: 11800, uid_active: 380000, hieu_suat: "99.7%", trang_thai: "good" },
  { rank: 6, san_pham: "Nước mắm Phú Quốc 40 độ", doanh_nghiep: "Cty Hưng Thành", so_su_kien: 9650, uid_active: 75000, hieu_suat: "98.2%", trang_thai: "good" },
  { rank: 7, san_pham: "Cà phê Arabica Đà Lạt", doanh_nghiep: "Cty CP Cà phê Lâm Đồng", so_su_kien: 8420, uid_active: 31800, hieu_suat: "96.4%", trang_thai: "warning" },
  { rank: 8, san_pham: "Hạt điều rang muối", doanh_nghiep: "Cty Điều vàng Bình Phước", so_su_kien: 7890, uid_active: 42000, hieu_suat: "97.1%", trang_thai: "good" },
  { rank: 9, san_pham: "Bia đặc sản Sài Gòn", doanh_nghiep: "Sabeco - Chi nhánh HCM", so_su_kien: 7340, uid_active: 520000, hieu_suat: "99.8%", trang_thai: "good" },
  { rank: 10, san_pham: "Thịt bò nhập khẩu Úc", doanh_nghiep: "Cty Nhập khẩu Á Châu", so_su_kien: 6120, uid_active: 67800, hieu_suat: "95.8%", trang_thai: "warning" },
];

const columns = [
  { key: "rank", label: "#", width: "50px" },
  { key: "san_pham", label: "Sản phẩm" },
  { key: "doanh_nghiep", label: "Doanh nghiệp" },
  { key: "so_su_kien", label: "Số sự kiện", render: (row: Record<string, unknown>) => <span className="font-mono">{(row.so_su_kien as number).toLocaleString()}</span> },
  { key: "uid_active", label: "UID hoạt động", render: (row: Record<string, unknown>) => <span className="font-mono">{(row.uid_active as number).toLocaleString()}</span> },
  { key: "hieu_suat", label: "Hiệu suất" },
  {
    key: "trang_thai",
    label: "Đánh giá",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.trang_thai === "good" ? "success" : "warning"}>
        {row.trang_thai === "good" ? "Tốt" : "Cần cải thiện"}
      </Badge>
    ),
  },
];

export default function Page() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Hiệu suất</h1>
        <p className="text-sm text-gray-500 mt-1">Phân tích hiệu suất vận hành chuỗi cung ứng</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-[14px] text-gray-500 mb-1">{k.label}</p>
            <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-[14px] text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Hiệu suất hệ thống 30 ngày qua (Response time ms)</h2>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={performanceData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1570EF" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#1570EF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={4} />
            <YAxis tick={{ fontSize: 12 }} unit="ms" />
            <Tooltip formatter={(v) => [`${v}ms`, "Response time"]} />
            <Area type="monotone" dataKey="responseTime" stroke="#1570EF" fill="url(#colorPerf)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Top 10 sản phẩm theo số lượng sự kiện truy xuất</h2>
        <DataTable columns={columns} data={topProducts} searchable searchKeys={["san_pham", "doanh_nghiep"] as never[]} />
      </div>
    </DashboardLayout>
  );
}
