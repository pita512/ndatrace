"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import { ArrowLeft, AlertTriangle, Clock, Tag, Activity } from "lucide-react";
import { alerts as baseAlerts } from "@/lib/mock-data";

const details: Record<string, { mo_ta: string; nguoi_phu_trach: string; don_vi: string; bien_phap: string }> = {
  CB0001: { mo_ta: "Chứng nhận VietGAP của doanh nghiệp sắp hết hạn trong 14 ngày. Cần tiến hành kiểm định và gia hạn kịp thời để tránh gián đoạn hoạt động.", nguoi_phu_trach: "Phạm Thị Dung", don_vi: "Ban Kiểm định", bien_phap: "Đã lên lịch kiểm định lại. Thông báo cho doanh nghiệp chuẩn bị hồ sơ." },
  CB0002: { mo_ta: "Phát hiện sản phẩm lưu thông trên hệ thống không có thông tin xuất xứ rõ ràng. Nguy cơ vi phạm quy định truy xuất nguồn gốc.", nguoi_phu_trach: "Hoàng Văn Em", don_vi: "Ban Bảo mật", bien_phap: "Tạm dừng lưu thông sản phẩm, yêu cầu doanh nghiệp cung cấp đầy đủ hồ sơ." },
  CB0003: { mo_ta: "Doanh nghiệp chưa cập nhật hồ sơ đăng ký kinh doanh trong hệ thống theo quy định. Thông tin hiển thị trên hệ thống có thể không chính xác.", nguoi_phu_trach: "Nguyễn Văn An", don_vi: "Ban Quản lý Doanh nghiệp", bien_phap: "Gửi nhắc nhở qua email và SMS. Nếu không phản hồi trong 7 ngày sẽ tạm khóa tài khoản." },
  CB0004: { mo_ta: "Phát hiện chuỗi sự kiện trong chuỗi cung ứng không theo trình tự tiêu chuẩn. Một lô hàng ghi nhận sự kiện vận chuyển trước khi có sự kiện thu hoạch.", nguoi_phu_trach: "Trần Thị Bình", don_vi: "Phòng Truy xuất nguồn gốc", bien_phap: "Điều tra lô hàng liên quan, xác minh thông tin với doanh nghiệp cung cấp." },
  CB0005: { mo_ta: "Lô hàng vi phạm quy định về dư lượng thuốc bảo vệ thực vật. Kết quả kiểm định cho thấy vượt ngưỡng cho phép 1.8 lần.", nguoi_phu_trach: "Phạm Thị Dung", don_vi: "Ban Kiểm định", bien_phap: "Thu hồi lô hàng, xử phạt hành chính, đình chỉ hoạt động 30 ngày." },
};

const levelMap: Record<string, { label: string; variant: "danger" | "warning" | "info" }> = {
  high: { label: "Cao", variant: "danger" },
  medium: { label: "Trung bình", variant: "warning" },
  low: { label: "Thấp", variant: "info" },
};

const statusMap: Record<string, { label: string; variant: "danger" | "warning" | "success" }> = {
  open: { label: "Chưa xử lý", variant: "danger" },
  processing: { label: "Đang xử lý", variant: "warning" },
  resolved: { label: "Đã xử lý", variant: "success" },
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const alert = baseAlerts.find((a) => a.id === id);
  if (!alert) notFound();

  const detail = details[id] ?? {
    mo_ta: `Cảnh báo ${alert.title} liên quan đến ${alert.entity}. Đang trong quá trình xử lý và theo dõi.`,
    nguoi_phu_trach: "Nguyễn Văn An",
    don_vi: "Ban Quản lý Rủi ro",
    bien_phap: "Đang đánh giá mức độ ảnh hưởng và xây dựng phương án xử lý phù hợp.",
  };

  const level = levelMap[alert.level] ?? { label: alert.level, variant: "info" as const };
  const status = statusMap[alert.status] ?? { label: alert.status, variant: "warning" as const };

  return (
    <DashboardLayout>
      {/* Back + Header */}
      <div className="mb-6">
        <Link href="/rui-ro/canh-bao" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 transition-colors mb-4">
          <ArrowLeft size={14} /> Quay lại danh sách
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">{alert.id}</p>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{alert.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={level.variant}>{level.label}</Badge>
            <Badge variant={status.variant}>{status.label}</Badge>
          </div>
        </div>
      </div>

      {/* Detail cards */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        {/* Description */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-500" />
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Mô tả cảnh báo</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{detail.mo_ta}</p>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={16} className="text-blue-500" />
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Thông tin chung</h2>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Đối tượng</dt>
                <dd className="font-medium text-gray-800 dark:text-gray-200 text-right max-w-[60%]">{alert.entity}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Đơn vị phụ trách</dt>
                <dd className="font-medium text-gray-800 dark:text-gray-200">{detail.don_vi}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} className="text-green-500" />
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Thời gian & Người phụ trách</h2>
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Ngày tạo</dt>
                <dd className="font-medium text-gray-800 dark:text-gray-200">{alert.createdAt}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Người phụ trách</dt>
                <dd className="font-medium text-gray-800 dark:text-gray-200">{detail.nguoi_phu_trach}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Resolution */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-brand-500" />
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Biện pháp xử lý</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{detail.bien_phap}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
