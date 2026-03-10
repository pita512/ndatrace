"use client";

import SectionPage from "@/components/ui/SectionPage";
import Badge from "@/components/ui/Badge";

const qrBatches = [
  { ma_dot: "QR-2026-0001", ten_dot: "Đợt cấp QR Gạo ST25 tháng 3", so_luong_qr: 5000, san_pham: "Gạo ST25 hữu cơ", ngay_tao: "01/03/2026", tien_do: 100, trang_thai: "completed" },
  { ma_dot: "QR-2026-0002", ten_dot: "Cấp QR Tôm sú đông lạnh lô 2", so_luong_qr: 2000, san_pham: "Tôm sú đông lạnh", ngay_tao: "01/03/2026", tien_do: 100, trang_thai: "completed" },
  { ma_dot: "QR-2026-0003", ten_dot: "QR Cà phê Arabica xuất khẩu", so_luong_qr: 800, san_pham: "Cà phê Arabica Đà Lạt", ngay_tao: "02/03/2026", tien_do: 75, trang_thai: "processing" },
  { ma_dot: "QR-2026-0004", ten_dot: "Nước mắm Phú Quốc - Đợt 4", so_luong_qr: 10000, san_pham: "Nước mắm Phú Quốc 40 độ", ngay_tao: "02/03/2026", tien_do: 100, trang_thai: "completed" },
  { ma_dot: "QR-2026-0005", ten_dot: "QR Xoài cát Hòa Lộc mùa vụ 2026", so_luong_qr: 3000, san_pham: "Xoài cát Hòa Lộc", ngay_tao: "03/03/2026", tien_do: 60, trang_thai: "processing" },
  { ma_dot: "QR-2026-0006", ten_dot: "Cá tra phi-lê - Đợt xuất khẩu EU", so_luong_qr: 4500, san_pham: "Cá tra phi-lê đông lạnh", ngay_tao: "03/03/2026", tien_do: 100, trang_thai: "completed" },
  { ma_dot: "QR-2026-0007", ten_dot: "Rau muống VietGAP - Siêu thị HCM", so_luong_qr: 500, san_pham: "Rau muống VietGAP", ngay_tao: "04/03/2026", tien_do: 40, trang_thai: "processing" },
  { ma_dot: "QR-2026-0008", ten_dot: "Nước dừa Bến Tre - Xuất khẩu Nhật", so_luong_qr: 50000, san_pham: "Nước dừa tươi đóng lon", ngay_tao: "04/03/2026", tien_do: 100, trang_thai: "completed" },
  { ma_dot: "QR-2026-0009", ten_dot: "Hạt điều rang muối lô hàng sai", so_luong_qr: 2000, san_pham: "Hạt điều rang muối", ngay_tao: "04/03/2026", tien_do: 0, trang_thai: "cancelled" },
  { ma_dot: "QR-2026-0010", ten_dot: "Bưởi da xanh - Aeon Việt Nam", so_luong_qr: 1500, san_pham: "Bưởi da xanh Bến Tre", ngay_tao: "05/03/2026", tien_do: 90, trang_thai: "processing" },
  { ma_dot: "QR-2026-0011", ten_dot: "Mực khô Bình Thuận đợt 2", so_luong_qr: 600, san_pham: "Mực khô Bình Thuận", ngay_tao: "05/03/2026", tien_do: 100, trang_thai: "completed" },
  { ma_dot: "QR-2026-0012", ten_dot: "Sữa Mộc Châu tháng 3/2026", so_luong_qr: 20000, san_pham: "Sữa tươi thanh trùng", ngay_tao: "05/03/2026", tien_do: 100, trang_thai: "completed" },
  { ma_dot: "QR-2026-0013", ten_dot: "Mật ong Tây Nguyên - Lô đặc biệt", so_luong_qr: 500, san_pham: "Mật ong rừng Tây Nguyên", ngay_tao: "06/03/2026", tien_do: 55, trang_thai: "processing" },
  { ma_dot: "QR-2026-0014", ten_dot: "Vải thiều Bắc Giang xuất khẩu TQ", so_luong_qr: 8000, san_pham: "Vải thiều Lục Ngạn", ngay_tao: "06/03/2026", tien_do: 20, trang_thai: "processing" },
  { ma_dot: "QR-2026-0015", ten_dot: "Cua Cà Mau - Nhà hàng Hà Nội", so_luong_qr: 300, san_pham: "Cua biển Cà Mau", ngay_tao: "06/03/2026", tien_do: 100, trang_thai: "completed" },
  { ma_dot: "QR-2026-0016", ten_dot: "Tiêu đen Gia Lai - Xuất khẩu EU", so_luong_qr: 1000, san_pham: "Tiêu đen Chư Sê", ngay_tao: "07/03/2026", tien_do: 85, trang_thai: "processing" },
  { ma_dot: "QR-2026-0017", ten_dot: "Cá ngừ Đà Nẵng - Đợt 3/2026", so_luong_qr: 15000, san_pham: "Cá ngừ đại dương đóng hộp", ngay_tao: "07/03/2026", tien_do: 100, trang_thai: "completed" },
  { ma_dot: "QR-2026-0018", ten_dot: "Nhãn lồng Hưng Yên - Siêu thị VN", so_luong_qr: 3000, san_pham: "Nhãn lồng Hưng Yên", ngay_tao: "07/03/2026", tien_do: 30, trang_thai: "processing" },
  { ma_dot: "QR-2026-0019", ten_dot: "Thịt bò Úc - Nhập khẩu tháng 3", so_luong_qr: 1200, san_pham: "Thịt bò nhập khẩu Úc", ngay_tao: "08/03/2026", tien_do: 50, trang_thai: "processing" },
  { ma_dot: "QR-2026-0020", ten_dot: "Gạo ST25 hữu cơ - Đợt 2 tháng 3", so_luong_qr: 6000, san_pham: "Gạo ST25 hữu cơ", ngay_tao: "08/03/2026", tien_do: 10, trang_thai: "processing" },
  { ma_dot: "QR-2026-0021", ten_dot: "Cấp QR Tôm sú mùa vụ chính", so_luong_qr: 3500, san_pham: "Tôm sú đông lạnh", ngay_tao: "08/03/2026", tien_do: 5, trang_thai: "processing" },
  { ma_dot: "QR-2026-0022", ten_dot: "Dưa hấu Long An - Siêu thị HCM", so_luong_qr: 2500, san_pham: "Dưa hấu không hạt", ngay_tao: "08/03/2026", tien_do: 0, trang_thai: "pending" },
  { ma_dot: "QR-2026-0023", ten_dot: "Nước ép cam Vinamilk tháng 3", so_luong_qr: 25000, san_pham: "Nước ép cam tươi", ngay_tao: "08/03/2026", tien_do: 0, trang_thai: "pending" },
  { ma_dot: "QR-2026-0024", ten_dot: "Hạt điều muối - Đợt 2 tháng 3", so_luong_qr: 4000, san_pham: "Hạt điều rang muối", ngay_tao: "08/03/2026", tien_do: 0, trang_thai: "pending" },
  { ma_dot: "QR-2026-0025", ten_dot: "Mực khô đặc sản - Xuất khẩu HQ", so_luong_qr: 800, san_pham: "Mực khô Bình Thuận", ngay_tao: "08/03/2026", tien_do: 0, trang_thai: "pending" },
];

const columns = [
  { key: "ma_dot", label: "Mã đợt", width: "120px" },
  { key: "ten_dot", label: "Tên đợt" },
  { key: "so_luong_qr", label: "Số lượng QR", render: (row: Record<string, unknown>) => <span className="font-mono">{(row.so_luong_qr as number).toLocaleString()}</span> },
  { key: "san_pham", label: "Sản phẩm" },
  { key: "ngay_tao", label: "Ngày tạo" },
  {
    key: "tien_do",
    label: "Tiến độ (%)",
    render: (row: Record<string, unknown>) => {
      const pct = row.tien_do as number;
      return (
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-20">
            <div className="bg-brand-600 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[14px] text-gray-600">{pct}%</span>
        </div>
      );
    },
  },
  {
    key: "trang_thai",
    label: "Trạng thái",
    render: (row: Record<string, unknown>) => {
      const map: Record<string, { label: string; variant: "success" | "info" | "warning" | "danger" }> = {
        completed: { label: "Hoàn thành", variant: "success" },
        processing: { label: "Đang xử lý", variant: "info" },
        pending: { label: "Chờ xử lý", variant: "warning" },
        cancelled: { label: "Đã hủy", variant: "danger" },
      };
      const m = map[row.trang_thai as string];
      return <Badge variant={m.variant}>{m.label}</Badge>;
    },
  },
];

export default function Page() {
  return (
    <SectionPage
      title="Khai báo danh sách QR"
      subtitle="Khai báo sự kiện theo danh sách mã QR"
      stats={[
        { label: "Tổng đợt", value: qrBatches.length, variant: "info" },
        { label: "Hoàn thành", value: qrBatches.filter((q) => q.trang_thai === "completed").length, variant: "success" },
        { label: "Đang xử lý", value: qrBatches.filter((q) => q.trang_thai === "processing").length, variant: "info" },
        { label: "Chờ xử lý", value: qrBatches.filter((q) => q.trang_thai === "pending").length, variant: "warning" },
      ]}
      tableColumns={columns}
      tableData={qrBatches}
      searchKeys={["ma_dot", "ten_dot", "san_pham"]}
      addLabel="Tạo đợt QR mới"
    />
  );
}
