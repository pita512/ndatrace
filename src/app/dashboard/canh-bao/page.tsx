"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { FileCheck2, Building2, ClipboardList, FileText, Eye, CheckCircle, AlertTriangle, Calendar, Tag } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type MucDo = "urgent" | "warning";
type TrangThai = "open" | "processing" | "resolved";
type NhomVanDe = "gcn_attp" | "dn_duyet" | "lich_kt" | "ho_so_tcb";
type ThaotacType = "view" | "approve";

type CanhBaoRow = {
  id: string;
  tieu_de: string;
  noi_dung: string; // clickable subject
  noi_dung_label: string; // display text for noi_dung
  mo_ta: string; // popup detail
  muc_do: MucDo;
  trang_thai: TrangThai;
  ngay_den_han: string;
  nhom: NhomVanDe;
  thao_tac: ThaotacType;
  // detail fields
  chu_the: string;
  nguoi_phu_trach: string;
  don_vi: string;
  ghi_chu: string;
};

// ── Data ──────────────────────────────────────────────────────────────────────
const data: CanhBaoRow[] = [
  // Giấy chứng nhận ATTP sắp hết hạn
  { id: "CB-001", tieu_de: "Giấy chứng nhận ATTP sắp hết hạn", noi_dung: "GCN-ATTP-2024-0124", noi_dung_label: "GCN-ATTP-2024-0124", mo_ta: "Giấy chứng nhận ATTP của Công ty CP Nông sản Việt sẽ hết hạn vào ngày 15/04/2026. Cần liên hệ cơ sở tiến hành gia hạn.", muc_do: "urgent", trang_thai: "open", ngay_den_han: "15/04/2026", nhom: "gcn_attp", thao_tac: "view", chu_the: "Công ty CP Nông sản Việt", nguoi_phu_trach: "Phạm Thị Dung", don_vi: "Ban Kiểm định", ghi_chu: "Cơ sở đã được thông báo qua email ngày 01/03/2026." },
  { id: "CB-002", tieu_de: "Giấy chứng nhận ATTP sắp hết hạn", noi_dung: "GCN-ATTP-2024-0198", noi_dung_label: "GCN-ATTP-2024-0198", mo_ta: "Giấy chứng nhận ATTP của HTX Rau sạch Lâm Đồng sẽ hết hạn vào ngày 20/04/2026. Đã có lịch kiểm định lại.", muc_do: "warning", trang_thai: "processing", ngay_den_han: "20/04/2026", nhom: "gcn_attp", thao_tac: "view", chu_the: "HTX Rau sạch Lâm Đồng", nguoi_phu_trach: "Nguyễn Văn An", don_vi: "Ban Kiểm định", ghi_chu: "Lịch kiểm định lại: 28/03/2026 tại địa chỉ cơ sở." },
  { id: "CB-003", tieu_de: "Giấy chứng nhận ATTP sắp hết hạn", noi_dung: "GCN-ATTP-2024-0231", noi_dung_label: "GCN-ATTP-2024-0231", mo_ta: "Giấy chứng nhận ATTP của Công ty TNHH Thủy sản Minh Phú đã hết hạn ngày 05/03/2026. Cần xử lý khẩn cấp.", muc_do: "urgent", trang_thai: "open", ngay_den_han: "05/03/2026", nhom: "gcn_attp", thao_tac: "view", chu_the: "Công ty TNHH Thủy sản Minh Phú", nguoi_phu_trach: "Phạm Thị Dung", don_vi: "Ban Kiểm định", ghi_chu: "Yêu cầu tạm dừng lưu thông sản phẩm đến khi gia hạn xong." },
  { id: "CB-004", tieu_de: "Giấy chứng nhận ATTP sắp hết hạn", noi_dung: "GCN-ATTP-2025-0044", noi_dung_label: "GCN-ATTP-2025-0044", mo_ta: "Giấy chứng nhận ATTP của Trang trại Hữu Cơ Việt sẽ hết hạn vào ngày 30/04/2026.", muc_do: "warning", trang_thai: "resolved", ngay_den_han: "30/04/2026", nhom: "gcn_attp", thao_tac: "view", chu_the: "Trang trại Hữu Cơ Việt", nguoi_phu_trach: "Hoàng Văn Em", don_vi: "Ban Kiểm định", ghi_chu: "Đã gia hạn thành công ngày 10/03/2026. Hiệu lực đến 30/04/2028." },
  { id: "CB-005", tieu_de: "Giấy chứng nhận ATTP sắp hết hạn", noi_dung: "GCN-ATTP-2024-0312", noi_dung_label: "GCN-ATTP-2024-0312", mo_ta: "Giấy chứng nhận ATTP của Cơ sở Chế biến Thực phẩm Bình An sẽ hết hạn vào ngày 10/05/2026.", muc_do: "warning", trang_thai: "open", ngay_den_han: "10/05/2026", nhom: "gcn_attp", thao_tac: "view", chu_the: "Cơ sở CB Thực phẩm Bình An", nguoi_phu_trach: "Nguyễn Văn An", don_vi: "Ban Kiểm định", ghi_chu: "Chưa liên hệ được với đại diện cơ sở." },

  // Doanh nghiệp chờ phê duyệt
  { id: "CB-006", tieu_de: "Doanh nghiệp chờ phê duyệt", noi_dung: "Công ty CP Rau sạch Đà Lạt", noi_dung_label: "Công ty CP Rau sạch Đà Lạt", mo_ta: "Hồ sơ đăng ký của Công ty CP Rau sạch Đà Lạt đã nộp đầy đủ. Chờ cán bộ xét duyệt và phê duyệt tham gia hệ thống.", muc_do: "warning", trang_thai: "open", ngay_den_han: "25/03/2026", nhom: "dn_duyet", thao_tac: "approve", chu_the: "Công ty CP Rau sạch Đà Lạt", nguoi_phu_trach: "Trần Thị Bình", don_vi: "Ban Quản lý DN", ghi_chu: "Hồ sơ đầy đủ, chờ xét duyệt lần cuối." },
  { id: "CB-007", tieu_de: "Doanh nghiệp chờ phê duyệt", noi_dung: "HTX Thủy sản Cần Giờ", noi_dung_label: "HTX Thủy sản Cần Giờ", mo_ta: "HTX Thủy sản Cần Giờ đã nộp hồ sơ đăng ký tham gia hệ thống. Cần kiểm tra và xác minh thông tin trước khi phê duyệt.", muc_do: "warning", trang_thai: "processing", ngay_den_han: "28/03/2026", nhom: "dn_duyet", thao_tac: "approve", chu_the: "HTX Thủy sản Cần Giờ", nguoi_phu_trach: "Lê Minh Cường", don_vi: "Ban Quản lý DN", ghi_chu: "Đang xác minh giấy phép kinh doanh và địa chỉ cơ sở." },
  { id: "CB-008", tieu_de: "Doanh nghiệp chờ phê duyệt", noi_dung: "DNTN Nông sản Tây Bắc", noi_dung_label: "DNTN Nông sản Tây Bắc", mo_ta: "DNTN Nông sản Tây Bắc chờ phê duyệt tham gia hệ thống. Hồ sơ còn thiếu giấy chứng nhận đăng ký kinh doanh bản gốc.", muc_do: "urgent", trang_thai: "open", ngay_den_han: "22/03/2026", nhom: "dn_duyet", thao_tac: "approve", chu_the: "DNTN Nông sản Tây Bắc", nguoi_phu_trach: "Trần Thị Bình", don_vi: "Ban Quản lý DN", ghi_chu: "Đã nhắc nhở bổ sung hồ sơ lần 1 ngày 15/03/2026." },
  { id: "CB-009", tieu_de: "Doanh nghiệp chờ phê duyệt", noi_dung: "Công ty TNHH XNK Phú Quốc", noi_dung_label: "Công ty TNHH XNK Phú Quốc", mo_ta: "Công ty TNHH XNK Phú Quốc đã hoàn thiện hồ sơ và được phê duyệt tham gia hệ thống truy xuất nguồn gốc.", muc_do: "warning", trang_thai: "resolved", ngay_den_han: "18/03/2026", nhom: "dn_duyet", thao_tac: "approve", chu_the: "Công ty TNHH XNK Phú Quốc", nguoi_phu_trach: "Lê Minh Cường", don_vi: "Ban Quản lý DN", ghi_chu: "Đã phê duyệt ngày 18/03/2026. Tài khoản đã kích hoạt." },

  // Lịch kiểm tra ATTP
  { id: "CB-010", tieu_de: "Lịch kiểm tra ATTP", noi_dung: "KH-KT-2026-034", noi_dung_label: "KH-KT-2026-034", mo_ta: "Kế hoạch kiểm tra ATTP định kỳ Q1/2026 tại Quận 1 và Quận 3 TP.HCM. Dự kiến kiểm tra 42 cơ sở kinh doanh thực phẩm.", muc_do: "warning", trang_thai: "open", ngay_den_han: "25/03/2026", nhom: "lich_kt", thao_tac: "view", chu_the: "KH-KT-2026-034", nguoi_phu_trach: "Hoàng Văn Em", don_vi: "Đội Kiểm tra số 1", ghi_chu: "Cần chuẩn bị đoàn kiểm tra gồm 4 cán bộ." },
  { id: "CB-011", tieu_de: "Lịch kiểm tra ATTP", noi_dung: "KH-KT-2026-035", noi_dung_label: "KH-KT-2026-035", mo_ta: "Kế hoạch kiểm tra đột xuất bếp ăn tập thể tại các khu công nghiệp Bình Dương. Phát sinh từ phản ánh của người lao động.", muc_do: "urgent", trang_thai: "processing", ngay_den_han: "22/03/2026", nhom: "lich_kt", thao_tac: "view", chu_the: "KH-KT-2026-035", nguoi_phu_trach: "Phạm Thị Dung", don_vi: "Đội Kiểm tra số 2", ghi_chu: "Đoàn kiểm tra đang thực hiện tại hiện trường." },
  { id: "CB-012", tieu_de: "Lịch kiểm tra ATTP", noi_dung: "KH-KT-2026-036", noi_dung_label: "KH-KT-2026-036", mo_ta: "Kế hoạch kiểm tra chuyên đề thức ăn đường phố mùa hè tại Đà Nẵng, tập trung khu vực ven biển Mỹ Khê.", muc_do: "warning", trang_thai: "open", ngay_den_han: "30/03/2026", nhom: "lich_kt", thao_tac: "view", chu_the: "KH-KT-2026-036", nguoi_phu_trach: "Nguyễn Văn An", don_vi: "Chi cục ATVSTP Đà Nẵng", ghi_chu: "Phối hợp với Sở Du lịch Đà Nẵng." },
  { id: "CB-013", tieu_de: "Lịch kiểm tra ATTP", noi_dung: "KH-KT-2026-029", noi_dung_label: "KH-KT-2026-029", mo_ta: "Kế hoạch kiểm tra định kỳ cơ sở sản xuất thực phẩm tại Gò Vấp và Bình Tân đã hoàn thành.", muc_do: "warning", trang_thai: "resolved", ngay_den_han: "15/03/2026", nhom: "lich_kt", thao_tac: "view", chu_the: "KH-KT-2026-029", nguoi_phu_trach: "Trần Thị Bình", don_vi: "Đội Kiểm tra số 3", ghi_chu: "Đã kiểm tra 38/38 cơ sở. Biên bản đã lưu hồ sơ." },
  { id: "CB-014", tieu_de: "Lịch kiểm tra ATTP", noi_dung: "KH-KT-2026-038", noi_dung_label: "KH-KT-2026-038", mo_ta: "Kế hoạch kiểm tra hậu kiểm cơ sở vi phạm đợt tháng 2/2026 tại Hà Nội. Đảm bảo các vi phạm đã được khắc phục.", muc_do: "urgent", trang_thai: "open", ngay_den_han: "28/03/2026", nhom: "lich_kt", thao_tac: "view", chu_the: "KH-KT-2026-038", nguoi_phu_trach: "Hoàng Văn Em", don_vi: "Chi cục ATVSTP Hà Nội", ghi_chu: "Danh sách 12 cơ sở cần hậu kiểm đã được lập." },

  // Hồ sơ tự công bố sắp hết hạn
  { id: "CB-015", tieu_de: "Hồ sơ tự công bố sắp hết hạn", noi_dung: "TCB-2024-0891", noi_dung_label: "TCB-2024-0891", mo_ta: "Hồ sơ tự công bố sản phẩm 'Nước ép trái cây hỗn hợp' của Công ty CP Thực phẩm Xanh sẽ hết hiệu lực vào ngày 01/05/2026.", muc_do: "warning", trang_thai: "open", ngay_den_han: "01/05/2026", nhom: "ho_so_tcb", thao_tac: "view", chu_the: "TCB-2024-0891", nguoi_phu_trach: "Lê Minh Cường", don_vi: "Ban Quản lý Hồ sơ", ghi_chu: "Sản phẩm đang lưu hành. Cần thông báo cơ sở gia hạn." },
  { id: "CB-016", tieu_de: "Hồ sơ tự công bố sắp hết hạn", noi_dung: "TCB-2024-0934", noi_dung_label: "TCB-2024-0934", mo_ta: "Hồ sơ tự công bố sản phẩm 'Mắm tôm Huế truyền thống' của HTX Làng nghề Huế sẽ hết hiệu lực vào ngày 15/04/2026.", muc_do: "urgent", trang_thai: "processing", ngay_den_han: "15/04/2026", nhom: "ho_so_tcb", thao_tac: "view", chu_the: "TCB-2024-0934", nguoi_phu_trach: "Phạm Thị Dung", don_vi: "Ban Quản lý Hồ sơ", ghi_chu: "Đã nhắc nhở. Cơ sở đang hoàn thiện hồ sơ gia hạn." },
  { id: "CB-017", tieu_de: "Hồ sơ tự công bố sắp hết hạn", noi_dung: "TCB-2024-1012", noi_dung_label: "TCB-2024-1012", mo_ta: "Hồ sơ tự công bố sản phẩm 'Trà thảo mộc túi lọc' của Công ty TNHH Thảo Dược Việt đã hết hiệu lực ngày 10/03/2026.", muc_do: "urgent", trang_thai: "open", ngay_den_han: "10/03/2026", nhom: "ho_so_tcb", thao_tac: "view", chu_the: "TCB-2024-1012", nguoi_phu_trach: "Nguyễn Văn An", don_vi: "Ban Quản lý Hồ sơ", ghi_chu: "Sản phẩm cần tạm dừng lưu thông cho đến khi gia hạn xong." },
  { id: "CB-018", tieu_de: "Hồ sơ tự công bố sắp hết hạn", noi_dung: "TCB-2025-0088", noi_dung_label: "TCB-2025-0088", mo_ta: "Hồ sơ tự công bố sản phẩm 'Bánh tráng cuốn thịt heo' của Cơ sở sản xuất Lan Hương đã được gia hạn thành công.", muc_do: "warning", trang_thai: "resolved", ngay_den_han: "20/04/2026", nhom: "ho_so_tcb", thao_tac: "view", chu_the: "TCB-2025-0088", nguoi_phu_trach: "Trần Thị Bình", don_vi: "Ban Quản lý Hồ sơ", ghi_chu: "Gia hạn thành công ngày 12/03/2026. Hiệu lực đến 20/04/2028." },
  { id: "CB-019", tieu_de: "Hồ sơ tự công bố sắp hết hạn", noi_dung: "TCB-2024-0776", noi_dung_label: "TCB-2024-0776", mo_ta: "Hồ sơ tự công bố sản phẩm 'Nước mắm nhĩ Cát Hải' của HTX Cát Hải sẽ hết hiệu lực vào ngày 05/05/2026.", muc_do: "warning", trang_thai: "open", ngay_den_han: "05/05/2026", nhom: "ho_so_tcb", thao_tac: "view", chu_the: "TCB-2024-0776", nguoi_phu_trach: "Hoàng Văn Em", don_vi: "Ban Quản lý Hồ sơ", ghi_chu: "Chưa liên hệ cơ sở. Cần nhắc nhở trong tuần này." },
];

// ── Maps ──────────────────────────────────────────────────────────────────────
const mucDoMap: Record<MucDo, { label: string; variant: "danger" | "warning" }> = {
  urgent: { label: "Khẩn cấp", variant: "danger" },
  warning: { label: "Cảnh báo", variant: "warning" },
};

const trangThaiMap: Record<TrangThai, { label: string; variant: "danger" | "warning" | "success" }> = {
  open: { label: "Chưa xử lý", variant: "danger" },
  processing: { label: "Đang xử lý", variant: "warning" },
  resolved: { label: "Đã xử lý", variant: "success" },
};

const nhomConfig: Record<NhomVanDe, { label: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  gcn_attp: { label: "Giấy chứng nhận ATTP sắp hết hạn", icon: FileCheck2 },
  dn_duyet: { label: "Doanh nghiệp chờ phê duyệt", icon: Building2 },
  lich_kt: { label: "Lịch kiểm tra ATTP", icon: ClipboardList },
  ho_so_tcb: { label: "Hồ sơ tự công bố sắp hết hạn", icon: FileText },
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Page() {
  const [selectedGroup, setSelectedGroup] = useState<NhomVanDe | null>(null);
  const [selected, setSelected] = useState<CanhBaoRow | null>(null);

  const filtered = selectedGroup ? data.filter((r) => r.nhom === selectedGroup) : data;

  return (
    <>
      <DashboardLayout>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Cảnh báo hệ thống</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Danh sách cảnh báo và rủi ro cần xử lý</p>
          </div>
        </div>

        {/* Group summary cards */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {(Object.keys(nhomConfig) as NhomVanDe[]).map((key) => {
            const cfg = nhomConfig[key];
            const Icon = cfg.icon;
            const count = data.filter((r) => r.nhom === key).length;
            const openCount = data.filter((r) => r.nhom === key && r.trang_thai === "open").length;
            const isActive = selectedGroup === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedGroup(isActive ? null : key)}
                className={`text-left rounded-2xl border p-4 flex items-start gap-3 transition-all ${
                  isActive
                    ? "bg-brand-50 dark:bg-brand-900/20 border-brand-300 dark:border-brand-700 ring-1 ring-brand-300 dark:ring-brand-700"
                    : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-brand-200 dark:hover:border-brand-800 hover:bg-brand-50/40 dark:hover:bg-brand-900/10"
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${isActive ? "bg-brand-100 dark:bg-brand-900/40" : "bg-brand-50 dark:bg-brand-900/20"}`}>
                  <Icon size={16} className="text-brand-600 dark:text-brand-400" />
                </div>
                <div className="min-w-0">
                  <p className={`text-[13px] leading-tight ${isActive ? "text-brand-700 dark:text-brand-300 font-medium" : "text-gray-500 dark:text-gray-400"}`}>{cfg.label}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{count}</span>
                    {openCount > 0 && <Badge variant="danger">{openCount} chưa xử lý</Badge>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Table card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* Table header row */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {selectedGroup ? nhomConfig[selectedGroup].label : "Tất cả cảnh báo"}
            </p>
            <p className="text-[13px] text-gray-400">{filtered.length} bản ghi</p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/60 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800">
                  {["Mã", "Tiêu đề", "Nội dung", "Mức độ", "Trạng thái", "Ngày đến hạn", "Thao tác"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[13px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const mucDo = mucDoMap[row.muc_do];
                  const trangThai = trangThaiMap[row.trang_thai];
                  return (
                    <tr key={row.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3.5 font-mono text-xs text-gray-400">{row.id}</td>
                      <td className="px-4 py-3.5 text-gray-700 dark:text-gray-300 max-w-[180px]">
                        <span className="text-[13px]">{row.tieu_de}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => setSelected(row)}
                          className="text-brand-600 dark:text-brand-400 hover:underline text-[13px] font-medium text-left"
                        >
                          {row.noi_dung_label}
                        </button>
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={mucDo.variant}>{mucDo.label}</Badge>
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={trangThai.variant}>{trangThai.label}</Badge>
                      </td>
                      <td className="px-4 py-3.5 text-[13px] text-gray-600 dark:text-gray-400 whitespace-nowrap">{row.ngay_den_han}</td>
                      <td className="px-4 py-3.5">
                        {row.thao_tac === "approve" ? (
                          <button className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 px-3 py-1.5 rounded-lg transition-colors">
                            <CheckCircle size={12} /> Phê duyệt
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelected(row)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <Eye size={12} /> Xem chi tiết
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">Không có dữ liệu</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardLayout>

      {/* Detail popup */}
      {selected && (
        <Modal isOpen={true} onClose={() => setSelected(null)} title={selected.noi_dung_label}>
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-gray-400">{selected.id}</span>
              <Badge variant={mucDoMap[selected.muc_do].variant}>{mucDoMap[selected.muc_do].label}</Badge>
              <Badge variant={trangThaiMap[selected.trang_thai].variant}>{trangThaiMap[selected.trang_thai].label}</Badge>
            </div>

            {/* Tiêu đề nhóm */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-amber-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{selected.tieu_de}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{selected.mo_ta}</p>
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
                    <dt className="text-gray-500 shrink-0">Chủ thể</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200 text-right">{selected.chu_the}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Đơn vị</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200 text-right">{selected.don_vi}</dd>
                  </div>
                </dl>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={14} className="text-green-500" />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Thời hạn</span>
                </div>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Ngày đến hạn</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{selected.ngay_den_han}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Phụ trách</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{selected.nguoi_phu_trach}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Ghi chú */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Ghi chú xử lý</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{selected.ghi_chu}</p>
            </div>

            {/* Action button */}
            <div className="flex justify-end gap-2 pt-1">
              {selected.thao_tac === "approve" ? (
                <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-xl transition-colors">
                  <CheckCircle size={14} /> Phê duyệt
                </button>
              ) : (
                <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-2 rounded-xl transition-colors">
                  <Eye size={14} /> Xem chi tiết
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
