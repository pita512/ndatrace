"use client";

import { useState } from "react";
import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { AlertTriangle, Clock, Tag, Activity } from "lucide-react";
import { alerts as baseAlerts } from "@/lib/mock-data";

type AlertRow = typeof baseAlerts[number];

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

export default function Page() {
  const [selected, setSelected] = useState<AlertRow | null>(null);

  const columns = [
    { key: "id", label: "Mã CB", width: "100px" },
    {
      key: "title",
      label: "Nội dung cảnh báo",
      render: (row: Record<string, unknown>) => (
        <button
          onClick={() => setSelected(row as unknown as AlertRow)}
          className="text-brand-600 hover:underline text-left"
        >
          {String(row.title ?? "")}
        </button>
      ),
    },
    { key: "entity", label: "Đối tượng" },
    {
      key: "level",
      label: "Mức độ",
      render: (row: Record<string, unknown>) => {
        const m = levelMap[row.level as string];
        return <Badge variant={m?.variant ?? "info"}>{m?.label ?? String(row.level)}</Badge>;
      },
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (row: Record<string, unknown>) => {
        const m = statusMap[row.status as string];
        return <Badge variant={m?.variant ?? "warning"}>{m?.label ?? String(row.status)}</Badge>;
      },
    },
    { key: "createdAt", label: "Ngày tạo" },
  ];

  const detail = selected
    ? details[selected.id] ?? {
        mo_ta: `Cảnh báo "${selected.title}" liên quan đến ${selected.entity}. Đang trong quá trình xử lý và theo dõi.`,
        nguoi_phu_trach: "Nguyễn Văn An",
        don_vi: "Ban Quản lý Rủi ro",
        bien_phap: "Đang đánh giá mức độ ảnh hưởng và xây dựng phương án xử lý phù hợp.",
      }
    : null;

  const level = selected ? levelMap[selected.level] ?? { label: selected.level, variant: "info" as const } : null;
  const status = selected ? statusMap[selected.status] ?? { label: selected.status, variant: "warning" as const } : null;

  return (
    <>
      <SectionPage
        title="Danh sách cảnh báo rủi ro"
        subtitle="Theo dõi và xử lý các cảnh báo trong hệ thống"
        stats={[
          { label: "Tổng cảnh báo", value: baseAlerts.length, variant: "info" },
          { label: "Chưa xử lý", value: baseAlerts.filter((a) => a.status === "open").length, variant: "danger" },
          { label: "Đang xử lý", value: baseAlerts.filter((a) => a.status === "processing").length, variant: "warning" },
          { label: "Đã xử lý", value: baseAlerts.filter((a) => a.status === "resolved").length, variant: "success" },
        ]}
        tableColumns={columns}
        tableData={baseAlerts}
        searchKeys={["id", "title", "entity"]}
        addLabel="Tạo cảnh báo"
      />

      {selected && detail && level && status && (
        <Modal isOpen={true} onClose={() => setSelected(null)} title={selected.title}>
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400">{selected.id}</span>
              <Badge variant={level.variant}>{level.label}</Badge>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>

            {/* Mô tả */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-amber-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Mô tả</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{detail.mo_ta}</p>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={14} className="text-blue-500" />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Thông tin</span>
                </div>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Đối tượng</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200 text-right">{selected.entity}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Đơn vị</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200 text-right">{detail.don_vi}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-green-500" />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Thời gian</span>
                </div>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Ngày tạo</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{selected.createdAt}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Phụ trách</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{detail.nguoi_phu_trach}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Biện pháp */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={14} className="text-brand-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Biện pháp xử lý</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{detail.bien_phap}</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
