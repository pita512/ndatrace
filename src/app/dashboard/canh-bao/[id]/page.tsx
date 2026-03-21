"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import { ArrowLeft, AlertTriangle, Clock, Tag, User, Activity } from "lucide-react";

const alerts = [
  { id: "CB001", title: "Nhiệt độ kho vượt ngưỡng", doi_tuong: "Kho lạnh Hà Nội - KL01", loai: "Môi trường", muc_do: "danger", trang_thai: "danger", ngay: "08/03/2026 07:12",
    mo_ta: "Nhiệt độ trong kho lạnh KL01 đã vượt ngưỡng cho phép (+5°C), hiện tại đo được +8.3°C. Nguy cơ ảnh hưởng đến chất lượng sản phẩm đang bảo quản.",
    nguoi_phu_trach: "Nguyễn Văn An", don_vi: "Kho vận Hà Nội", bien_phap: "Kiểm tra hệ thống làm lạnh, thông báo đội kỹ thuật xử lý ngay." },
  { id: "CB002", title: "Tem nhãn hết hạn sắp tới", doi_tuong: "Lô TN-2024-0892", loai: "Tem nhãn", muc_do: "warning", trang_thai: "warning", ngay: "08/03/2026 06:45",
    mo_ta: "Lô tem nhãn TN-2024-0892 sẽ hết hạn sử dụng trong vòng 7 ngày. Cần đặt lại tem nhãn mới để đảm bảo hoạt động liên tục.",
    nguoi_phu_trach: "Trần Thị Bình", don_vi: "Phòng In ấn - Đóng gói", bien_phap: "Liên hệ nhà cung cấp đặt lô tem nhãn mới, dự kiến giao trong 3 ngày." },
  { id: "CB003", title: "API timeout liên tục", doi_tuong: "Endpoint /v2/events", loai: "Hệ thống", muc_do: "danger", trang_thai: "warning", ngay: "08/03/2026 06:30",
    mo_ta: "Endpoint /v2/events ghi nhận 47 lần timeout trong 2 giờ qua. Tỷ lệ lỗi đạt 23%, ảnh hưởng đến việc ghi nhận sự kiện truy xuất nguồn gốc.",
    nguoi_phu_trach: "Lê Minh Cường", don_vi: "Ban CNTT", bien_phap: "Tăng timeout threshold, kiểm tra tải server và cân bằng tải." },
  { id: "CB004", title: "Chứng chỉ VietGAP sắp hết hạn", doi_tuong: "HTX Rau sạch Lâm Đồng", loai: "Chứng chỉ", muc_do: "warning", trang_thai: "success", ngay: "07/03/2026 22:00",
    mo_ta: "Chứng chỉ VietGAP của HTX Rau sạch Lâm Đồng sẽ hết hạn ngày 15/04/2026. Cần tiến hành kiểm định và gia hạn trước thời hạn.",
    nguoi_phu_trach: "Phạm Thị Dung", don_vi: "Ban Kiểm định", bien_phap: "Đã lên lịch kiểm định lại vào ngày 25/03/2026. Đơn vị đã được thông báo." },
  { id: "CB005", title: "Phát hiện QR bị scan bất thường", doi_tuong: "UID-VN-00293811", loai: "Bảo mật", muc_do: "danger", trang_thai: "danger", ngay: "07/03/2026 21:15",
    mo_ta: "Mã QR UID-VN-00293811 bị scan 312 lần trong vòng 1 giờ từ nhiều địa điểm khác nhau. Khả năng cao là hành vi gian lận hoặc tấn công hệ thống.",
    nguoi_phu_trach: "Hoàng Văn Em", don_vi: "Ban Bảo mật", bien_phap: "Tạm khóa QR code, điều tra nguồn gốc, báo cáo lên ban giám đốc." },
  { id: "CB006", title: "Lô hàng chưa cập nhật sự kiện", doi_tuong: "Lô TCA-2026-0041", loai: "Truy xuất", muc_do: "warning", trang_thai: "warning", ngay: "07/03/2026 18:00",
    mo_ta: "Lô hàng TCA-2026-0041 chưa có sự kiện cập nhật trong 48 giờ qua. Chuỗi truy xuất bị gián đoạn tại điểm vận chuyển.",
    nguoi_phu_trach: "Nguyễn Văn An", don_vi: "Phòng Logistics", bien_phap: "Liên hệ đơn vị vận chuyển yêu cầu cập nhật trạng thái lô hàng." },
  { id: "CB007", title: "Webhook gửi thất bại 5 lần", doi_tuong: "Đối tác Aeon Vietnam", loai: "Tích hợp", muc_do: "warning", trang_thai: "success", ngay: "07/03/2026 17:30",
    mo_ta: "Webhook tích hợp với Aeon Vietnam thất bại 5 lần liên tiếp do lỗi SSL certificate phía đối tác. Dữ liệu đang được queue lại.",
    nguoi_phu_trach: "Lê Minh Cường", don_vi: "Ban CNTT", bien_phap: "Đã liên hệ IT Aeon Vietnam, họ xác nhận sẽ gia hạn certificate trước 18h." },
  { id: "CB008", title: "Người dùng đăng nhập sai 10 lần", doi_tuong: "user: lnguyen@acb.vn", loai: "Bảo mật", muc_do: "danger", trang_thai: "success", ngay: "07/03/2026 16:20",
    mo_ta: "Tài khoản lnguyen@acb.vn bị đăng nhập sai mật khẩu 10 lần liên tiếp trong 5 phút. Hệ thống đã tự động khóa tài khoản.",
    nguoi_phu_trach: "Hoàng Văn Em", don_vi: "Ban Bảo mật", bien_phap: "Tài khoản đã bị khóa. Đã gửi email xác nhận đặt lại mật khẩu cho người dùng." },
  { id: "CB009", title: "Dung lượng lưu trữ > 85%", doi_tuong: "Server SG-NODE-02", loai: "Hệ thống", muc_do: "warning", trang_thai: "warning", ngay: "07/03/2026 14:00",
    mo_ta: "Server SG-NODE-02 đang sử dụng 87.3% dung lượng ổ đĩa (1.75TB/2TB). Cần nâng cấp hoặc dọn dẹp dữ liệu cũ.",
    nguoi_phu_trach: "Lê Minh Cường", don_vi: "Ban Hạ tầng CNTT", bien_phap: "Lên kế hoạch archive dữ liệu logs cũ hơn 1 năm, dự kiến giải phóng 300GB." },
  { id: "CB010", title: "Sản phẩm không có chứng chỉ", doi_tuong: "SP-00412 Cá tra phi-lê", loai: "Chứng chỉ", muc_do: "info", trang_thai: "danger", ngay: "07/03/2026 11:45",
    mo_ta: "Sản phẩm SP-00412 Cá tra phi-lê đang lưu thông trên hệ thống nhưng chưa được gắn chứng chỉ an toàn thực phẩm nào.",
    nguoi_phu_trach: "Phạm Thị Dung", don_vi: "Ban Kiểm định", bien_phap: "Yêu cầu doanh nghiệp nộp hồ sơ chứng nhận trong vòng 7 ngày làm việc." },
  { id: "CB011", title: "Lô hàng nhập khẩu thiếu hồ sơ", doi_tuong: "Lô NK-2026-0088", loai: "Truy xuất", muc_do: "warning", trang_thai: "warning", ngay: "07/03/2026 10:00",
    mo_ta: "Lô hàng nhập khẩu NK-2026-0088 đang thiếu giấy kiểm dịch và chứng nhận xuất xứ (C/O). Lô hàng đang bị tạm giữ tại cửa khẩu.",
    nguoi_phu_trach: "Nguyễn Văn An", don_vi: "Phòng Xuất Nhập khẩu", bien_phap: "Đã liên hệ đơn vị xuất khẩu yêu cầu bổ sung hồ sơ trong 24h." },
  { id: "CB012", title: "Thời gian vận chuyển quá hạn", doi_tuong: "Lô VC-HN-HCMC-2026-019", loai: "Vận chuyển", muc_do: "danger", trang_thai: "success", ngay: "06/03/2026 23:00",
    mo_ta: "Lô hàng VC-HN-HCMC-2026-019 đã vượt thời gian vận chuyển cho phép 6 tiếng. Nhiệt độ container vẫn ổn định, chất lượng hàng hoá không bị ảnh hưởng.",
    nguoi_phu_trach: "Trần Thị Bình", don_vi: "Phòng Logistics", bien_phap: "Lô hàng đã đến nơi. Đã xác nhận chất lượng ổn định. Rà soát lại quy trình vận chuyển." },
  { id: "CB013", title: "Cập nhật firmware cảm biến", doi_tuong: "Sensor IoT kho lạnh Cần Thơ", loai: "Thiết bị", muc_do: "info", trang_thai: "success", ngay: "06/03/2026 20:00",
    mo_ta: "22 cảm biến IoT tại kho lạnh Cần Thơ cần cập nhật firmware lên phiên bản 3.2.1 để vá lỗi bảo mật và cải thiện độ chính xác đo nhiệt độ.",
    nguoi_phu_trach: "Lê Minh Cường", don_vi: "Ban Thiết bị IoT", bien_phap: "Đã cập nhật xong 22/22 thiết bị qua OTA. Kiểm tra sau cập nhật: bình thường." },
  { id: "CB014", title: "Sự kiện truy xuất bị thiếu thông tin GPS", doi_tuong: "SK-2026-0394", loai: "Dữ liệu", muc_do: "info", trang_thai: "danger", ngay: "06/03/2026 18:30",
    mo_ta: "Sự kiện SK-2026-0394 được ghi nhận thiếu thông tin tọa độ GPS. Điều này ảnh hưởng đến tính minh bạch của chuỗi truy xuất.",
    nguoi_phu_trach: "Phạm Thị Dung", don_vi: "Ban Dữ liệu", bien_phap: "Yêu cầu thiết bị ghi nhận lại sự kiện với đầy đủ thông tin GPS." },
  { id: "CB015", title: "Chứng chỉ GlobalGAP hết hạn", doi_tuong: "Công ty TNHH Thủy sản Minh Phú", loai: "Chứng chỉ", muc_do: "danger", trang_thai: "warning", ngay: "06/03/2026 15:00",
    mo_ta: "Chứng chỉ GlobalGAP của Công ty TNHH Thủy sản Minh Phú đã hết hạn ngày 05/03/2026. Cần tạm dừng hoạt động xuất khẩu đến khi gia hạn xong.",
    nguoi_phu_trach: "Phạm Thị Dung", don_vi: "Ban Kiểm định", bien_phap: "Đã thông báo công ty. Đang chờ kết quả kiểm định lại từ tổ chức SGS Việt Nam." },
  { id: "CB016", title: "Database backup thất bại", doi_tuong: "DB-PROD-01", loai: "Hệ thống", muc_do: "danger", trang_thai: "success", ngay: "06/03/2026 04:00",
    mo_ta: "Tiến trình backup tự động lúc 04:00 của DB-PROD-01 thất bại do thiếu dung lượng trên storage backup. Không có bản sao lưu nào được tạo trong ngày.",
    nguoi_phu_trach: "Lê Minh Cường", don_vi: "Ban Hạ tầng CNTT", bien_phap: "Đã xóa backup cũ, thực hiện backup thủ công thành công. Cấu hình lại retention policy." },
  { id: "CB017", title: "Số lượng UID sắp hết", doi_tuong: "Pool UID-REGION-MB", loai: "UID", muc_do: "warning", trang_thai: "warning", ngay: "05/03/2026 22:00",
    mo_ta: "Pool UID khu vực Miền Bắc còn lại 1,240 mã, đủ dùng khoảng 3 ngày theo tốc độ tiêu thụ hiện tại (400 UID/ngày).",
    nguoi_phu_trach: "Nguyễn Văn An", don_vi: "Ban Quản lý UID", bien_phap: "Đã gửi yêu cầu cấp thêm 50,000 UID từ kho trung tâm. Dự kiến cấp trong 24h." },
  { id: "CB018", title: "API key hết hạn sắp tới", doi_tuong: "Partner: FPT.vn", loai: "Tích hợp", muc_do: "info", trang_thai: "success", ngay: "05/03/2026 18:00",
    mo_ta: "API key tích hợp với FPT.vn sẽ hết hạn ngày 20/03/2026. Cần liên hệ FPT để gia hạn hoặc cấp key mới.",
    nguoi_phu_trach: "Lê Minh Cường", don_vi: "Ban Tích hợp", bien_phap: "Đã gia hạn key thành công. Key mới có hiệu lực đến 20/03/2027." },
  { id: "CB019", title: "Phát hiện dữ liệu QR bị trùng lặp", doi_tuong: "Lô QR-2026-0711", loai: "Dữ liệu", muc_do: "warning", trang_thai: "danger", ngay: "05/03/2026 14:30",
    mo_ta: "Phát hiện 14 mã QR trong lô QR-2026-0711 có nội dung trùng lặp với mã đã được cấp trước đó. Nguy cơ hàng giả lưu thông trên thị trường.",
    nguoi_phu_trach: "Hoàng Văn Em", don_vi: "Ban Bảo mật", bien_phap: "Thu hồi 14 mã QR trùng, điều tra nguồn gốc, báo cáo cơ quan chức năng nếu cần." },
  { id: "CB020", title: "Cập nhật chính sách bảo mật", doi_tuong: "Toàn hệ thống", loai: "Hệ thống", muc_do: "info", trang_thai: "success", ngay: "04/03/2026 09:00",
    mo_ta: "Chính sách bảo mật hệ thống phiên bản 2.1 cần được phê duyệt và triển khai áp dụng cho toàn bộ người dùng và đối tác.",
    nguoi_phu_trach: "Hoàng Văn Em", don_vi: "Ban Bảo mật", bien_phap: "Chính sách đã được Giám đốc phê duyệt. Đã gửi thông báo đến toàn bộ người dùng." },
];

const mucDoMap: Record<string, { label: string; variant: "danger" | "warning" | "info" }> = {
  danger: { label: "Nghiêm trọng", variant: "danger" },
  warning: { label: "Cảnh báo", variant: "warning" },
  info: { label: "Thông tin", variant: "info" },
};

const trangThaiMap: Record<string, { label: string; variant: "danger" | "warning" | "success" }> = {
  danger: { label: "Chưa xử lý", variant: "danger" },
  warning: { label: "Đang xử lý", variant: "warning" },
  success: { label: "Đã xử lý", variant: "success" },
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const alert = alerts.find((a) => a.id === id);
  if (!alert) notFound();

  const mucDo = mucDoMap[alert.muc_do] ?? { label: alert.muc_do, variant: "info" as const };
  const trangThai = trangThaiMap[alert.trang_thai] ?? { label: alert.trang_thai, variant: "warning" as const };

  return (
    <DashboardLayout>
      {/* Back + Header */}
      <div className="mb-6">
        <Link href="/dashboard/canh-bao" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 transition-colors mb-4">
          <ArrowLeft size={14} /> Quay lại danh sách
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-mono text-gray-400 mb-1">{alert.id}</p>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{alert.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={mucDo.variant}>{mucDo.label}</Badge>
            <Badge variant={trangThai.variant}>{trangThai.label}</Badge>
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
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{alert.mo_ta}</p>
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
                <dd className="font-medium text-gray-800 dark:text-gray-200 text-right max-w-[60%]">{alert.doi_tuong}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Loại cảnh báo</dt>
                <dd className="font-medium text-gray-800 dark:text-gray-200">{alert.loai}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Đơn vị</dt>
                <dd className="font-medium text-gray-800 dark:text-gray-200">{alert.don_vi}</dd>
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
                <dd className="font-medium text-gray-800 dark:text-gray-200">{alert.ngay}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Người phụ trách</dt>
                <dd className="font-medium text-gray-800 dark:text-gray-200">{alert.nguoi_phu_trach}</dd>
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
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{alert.bien_phap}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
