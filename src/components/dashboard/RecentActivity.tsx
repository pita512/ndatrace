import { CheckCircle2, Clock, AlertCircle, Plus } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "success",
    action: "Phê duyệt đăng ký doanh nghiệp",
    entity: "Công ty CP Nông sản Việt",
    time: "5 phút trước",
  },
  {
    id: 2,
    type: "pending",
    action: "Chờ xác nhận chứng nhận VietGAP",
    entity: "Trang trại Hòa Bình",
    time: "23 phút trước",
  },
  {
    id: 3,
    type: "success",
    action: "Khai báo sự kiện vận chuyển",
    entity: "Lô #LH-2025-0128",
    time: "1 giờ trước",
  },
  {
    id: 4,
    type: "warning",
    action: "Sản phẩm cần cập nhật thông tin",
    entity: "Gạo Jasmine 25kg",
    time: "2 giờ trước",
  },
  {
    id: 5,
    type: "success",
    action: "Tạo mã QR truy xuất nguồn gốc",
    entity: "Lô #LH-2025-0127",
    time: "3 giờ trước",
  },
];

const typeIcon: Record<string, React.ReactNode> = {
  success: <CheckCircle2 size={14} className="text-brand-500" />,
  pending: <Clock size={14} className="text-amber-500" />,
  warning: <AlertCircle size={14} className="text-red-400" />,
};

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <h3 className="font-semibold text-gray-800 text-sm mb-4">Hoạt động gần đây</h3>
      <div className="space-y-3">
        {activities.map((a) => (
          <div key={a.id} className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">{typeIcon[a.type]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-gray-700 truncate">{a.action}</p>
              <p className="text-[13px] text-gray-400 truncate">{a.entity}</p>
            </div>
            <p className="text-[13px] text-gray-400 shrink-0 whitespace-nowrap">{a.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
