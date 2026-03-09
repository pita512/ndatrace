import { AlertTriangle, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";

const alerts = [
  {
    id: 1,
    title: "Lô hàng TP001 hết hạn chứng nhận",
    product: "Gạo ST25",
    time: "Hôm nay, 08:30",
    level: "high",
  },
  {
    id: 2,
    title: "Doanh nghiệp ABC chưa cập nhật hồ sơ",
    product: "Công ty TNHH ABC",
    time: "Hôm nay, 10:15",
    level: "medium",
  },
  {
    id: 3,
    title: "Sự kiện chuỗi cung ứng bất thường",
    product: "Chuỗi #CCU-2024-015",
    time: "Hôm qua, 16:40",
    level: "low",
  },
];

const levelStyle: Record<string, string> = {
  high: "bg-red-50 text-red-700 border-red-100",
  medium: "bg-amber-50 text-amber-700 border-amber-100",
  low: "bg-blue-50 text-blue-700 border-blue-100",
};
const levelLabel: Record<string, string> = { high: "Cao", medium: "Trung bình", low: "Thấp" };

export default function AlertList() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-sm">Cảnh báo rủi ro</h3>
        <span className="bg-red-500 text-white text-[13px] font-bold px-2 py-0.5 rounded-full">
          {alerts.length}
        </span>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3.5 rounded-xl border ${levelStyle[alert.level]} flex gap-3 items-start`}
          >
            <AlertTriangle size={15} className="mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold leading-tight truncate">{alert.title}</p>
              <p className="text-[13px] opacity-70 mt-0.5">{alert.product}</p>
              <p className="flex items-center gap-1 text-[13px] opacity-60 mt-1">
                <Clock size={9} />
                {alert.time}
              </p>
            </div>
            <span className="text-[13px] font-medium shrink-0">{levelLabel[alert.level]}</span>
          </div>
        ))}
      </div>
      <Link
        href="/rui-ro/canh-bao"
        className="mt-4 flex items-center justify-center gap-1 text-[13px] text-brand-600 font-semibold hover:text-brand-700 transition-colors"
      >
        Xem tất cả <ChevronRight size={14} />
      </Link>
    </div>
  );
}
