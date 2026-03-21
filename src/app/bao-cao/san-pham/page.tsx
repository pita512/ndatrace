"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Package, Tag, Building2, ShieldCheck, QrCode, Calendar } from "lucide-react";

const kpis = [
  { label: "Tổng sản phẩm", value: "8,412", sub: "Đang lưu thông trên hệ thống", color: "text-blue-600" },
  { label: "Có chứng nhận ATTP", value: "6,284", sub: "74.7% tổng số sản phẩm", color: "text-green-600" },
  { label: "Chờ kiểm định", value: "1,248", sub: "Đang trong quá trình xét duyệt", color: "text-amber-600" },
  { label: "Tạm dừng lưu thông", value: "312", sub: "Vi phạm hoặc hết chứng nhận", color: "text-red-600" },
];

const byCategory = [
  { name: "Nông sản", value: 2412 },
  { name: "Thủy sản", value: 1842 },
  { name: "Thực phẩm CB", value: 1624 },
  { name: "Đồ uống", value: 982 },
  { name: "Gia vị - Mắm", value: 748 },
  { name: "Sữa & SPSD", value: 524 },
  { name: "Khác", value: 280 },
];

const COLORS = ["#1570EF", "#17B26A", "#F79009", "#8B5CF6", "#F04438", "#06B6D4", "#84CC16"];

const byMonth = [
  { thang: "T10/25", moi: 312, thu_hoi: 28 },
  { thang: "T11/25", moi: 287, thu_hoi: 22 },
  { thang: "T12/25", moi: 341, thu_hoi: 31 },
  { thang: "T1/26", moi: 398, thu_hoi: 18 },
  { thang: "T2/26", moi: 264, thu_hoi: 24 },
  { thang: "T3/26", moi: 428, thu_hoi: 35 },
];

type SPRow = {
  rank: number; ten: string; nhom: string; doanh_nghiep: string;
  chung_nhan: string; so_uid: number; trang_thai: string;
  ma_sp: string; don_vi: string; xuat_xu: string;
  han_su_dung: string; ngay_dang_ky: string; mo_ta: string; tieu_chuan: string;
};

const topSP: SPRow[] = [
  { rank: 1, ten: "Tôm sú đông lạnh Block", nhom: "Thủy sản", doanh_nghiep: "Cty Minh Phú", chung_nhan: "GlobalGAP, ASC", so_uid: 120400, trang_thai: "active", ma_sp: "SP-00001", don_vi: "kg", xuat_xu: "Cà Mau, Việt Nam", han_su_dung: "24 tháng kể từ ngày sản xuất", ngay_dang_ky: "15/01/2024", mo_ta: "Tôm sú nguyên con đông lạnh dạng block, kích cỡ 16/20, đạt tiêu chuẩn xuất khẩu sang thị trường EU và Mỹ. Nuôi theo quy trình GlobalGAP và ASC.", tieu_chuan: "TCVN 5289:2006, EU Regulation 853/2004" },
  { rank: 2, ten: "Cá tra phi lê đông lạnh", nhom: "Thủy sản", doanh_nghiep: "Cty CP Vĩnh Hoàn", chung_nhan: "ASC, HACCP", so_uid: 95600, trang_thai: "active", ma_sp: "SP-00002", don_vi: "kg", xuat_xu: "Đồng Tháp, Việt Nam", han_su_dung: "18 tháng kể từ ngày sản xuất", ngay_dang_ky: "20/02/2024", mo_ta: "Phi lê cá tra đông lạnh IQF, không chứa phosphate và tạp chất. Chế biến theo tiêu chuẩn ASC và HACCP, xuất khẩu sang hơn 60 quốc gia.", tieu_chuan: "TCVN 8338:2010, ASC Standard" },
  { rank: 3, ten: "Gạo ST25 hữu cơ 5kg", nhom: "Nông sản", doanh_nghiep: "HTX Sóc Trăng", chung_nhan: "VietGAP, Organic", so_uid: 84200, trang_thai: "active", ma_sp: "SP-00003", don_vi: "túi 5kg", xuat_xu: "Sóc Trăng, Việt Nam", han_su_dung: "12 tháng kể từ ngày đóng gói", ngay_dang_ky: "05/03/2024", mo_ta: "Gạo ST25 canh tác hữu cơ, không sử dụng phân bón hóa học và thuốc BVTV. Đạt giải 'Gạo ngon nhất thế giới' năm 2019 tại Philippines.", tieu_chuan: "TCVN 11041-1:2017 (Nông nghiệp hữu cơ)" },
  { rank: 4, ten: "Nước dừa tươi đóng lon 330ml", nhom: "Đồ uống", doanh_nghiep: "Cty CP Bến Tre", chung_nhan: "HACCP, ISO 22000", so_uid: 210000, trang_thai: "active", ma_sp: "SP-00004", don_vi: "lon 330ml", xuat_xu: "Bến Tre, Việt Nam", han_su_dung: "12 tháng kể từ ngày sản xuất", ngay_dang_ky: "10/01/2024", mo_ta: "Nước dừa tươi nguyên chất không pha chế, đóng gói vô trùng theo công nghệ UHT. Không chất bảo quản, không đường, không màu nhân tạo.", tieu_chuan: "TCVN 12827:2019, Codex Stan 247" },
  { rank: 5, ten: "Sữa tươi thanh trùng 1L", nhom: "Sữa & SPSD", doanh_nghiep: "Cty CP Sữa Mộc Châu", chung_nhan: "ISO 22000", so_uid: 380000, trang_thai: "active", ma_sp: "SP-00005", don_vi: "hộp 1L", xuat_xu: "Sơn La, Việt Nam", han_su_dung: "21 ngày kể từ ngày sản xuất (bảo quản 2–6°C)", ngay_dang_ky: "08/02/2024", mo_ta: "Sữa tươi nguyên chất thanh trùng từ đàn bò nuôi tại Mộc Châu. Hàm lượng protein ≥3.2g/100ml, chất béo ≥3.5g/100ml.", tieu_chuan: "TCVN 7405:2018, ISO 22000:2018" },
  { rank: 6, ten: "Nước mắm Phú Quốc 40° 500ml", nhom: "Gia vị - Mắm", doanh_nghiep: "Cty Hưng Thành", chung_nhan: "VietGAP", so_uid: 75000, trang_thai: "active", ma_sp: "SP-00006", don_vi: "chai 500ml", xuat_xu: "Phú Quốc, Kiên Giang", han_su_dung: "24 tháng kể từ ngày sản xuất", ngay_dang_ky: "12/03/2024", mo_ta: "Nước mắm truyền thống Phú Quốc, ủ chượp từ cá cơm tươi và muối biển. Đạt 40° đạm, mang chỉ dẫn địa lý được EU bảo hộ.", tieu_chuan: "TCVN 5107:2018, Chỉ dẫn địa lý Phú Quốc" },
  { rank: 7, ten: "Cà phê Arabica Đà Lạt 250g", nhom: "Đồ uống", doanh_nghiep: "Cty CP Cà phê LĐ", chung_nhan: "4C, VietGAP", so_uid: 31800, trang_thai: "active", ma_sp: "SP-00007", don_vi: "túi 250g", xuat_xu: "Đà Lạt, Lâm Đồng", han_su_dung: "18 tháng kể từ ngày rang xay", ngay_dang_ky: "22/01/2024", mo_ta: "Cà phê Arabica rang xay 100% từ vùng trồng Cầu Đất, Đà Lạt. Độ cao 1,500m, thu hoạch thủ công, chế biến ướt. Hương thơm đặc trưng, vị chua thanh.", tieu_chuan: "4C Code of Conduct, VietGAP 2024" },
  { rank: 8, ten: "Hạt điều rang muối 500g", nhom: "Nông sản", doanh_nghiep: "Cty Điều vàng BP", chung_nhan: "HACCP", so_uid: 42000, trang_thai: "active", ma_sp: "SP-00008", don_vi: "túi 500g", xuat_xu: "Bình Phước, Việt Nam", han_su_dung: "9 tháng kể từ ngày sản xuất", ngay_dang_ky: "18/02/2024", mo_ta: "Hạt điều W240 rang muối nhẹ, không chất bảo quản. Nguyên liệu từ vùng điều Bình Phước đạt chuẩn HACCP. Phù hợp xuất khẩu sang các thị trường khó tính.", tieu_chuan: "TCVN 4850:2010, HACCP Codex" },
  { rank: 9, ten: "Rau muống hữu cơ 300g", nhom: "Nông sản", doanh_nghiep: "HTX Rau sạch LĐ", chung_nhan: "VietGAP", so_uid: 28400, trang_thai: "warning", ma_sp: "SP-00009", don_vi: "bó 300g", xuat_xu: "Lâm Đồng, Việt Nam", han_su_dung: "3 ngày kể từ ngày thu hoạch (bảo quản 4–6°C)", ngay_dang_ky: "01/04/2024", mo_ta: "Rau muống hữu cơ trồng trong nhà kính, tưới nước tinh khiết. Chứng nhận VietGAP đang trong quá trình gia hạn. Cần kiểm tra hồ sơ trước 30/04/2026.", tieu_chuan: "VietGAP (đang gia hạn)" },
  { rank: 10, ten: "Thịt bò Úc nhập khẩu 500g", nhom: "Thực phẩm CB", doanh_nghiep: "Cty NK Á Châu", chung_nhan: "—", so_uid: 67800, trang_thai: "warning", ma_sp: "SP-00010", don_vi: "khay 500g", xuat_xu: "Úc (nhập khẩu)", han_su_dung: "Xem trên bao bì (bảo quản -18°C)", ngay_dang_ky: "14/03/2024", mo_ta: "Thịt bò tươi đông lạnh nhập khẩu từ Úc. Hiện đang thiếu giấy chứng nhận kiểm dịch thú y cho lô hàng mới nhất. Cần bổ sung hồ sơ trong 7 ngày.", tieu_chuan: "Chờ cập nhật chứng nhận" },
];

const byCategoryTable = [
  { nhom: "Nông sản", tong: 2412, co_cn: 1842, cho_kd: 412, tam_dung: 158, trang_thai: "good" },
  { nhom: "Thủy sản", tong: 1842, co_cn: 1524, cho_kd: 218, tam_dung: 100, trang_thai: "good" },
  { nhom: "Thực phẩm chế biến", tong: 1624, co_cn: 1184, cho_kd: 312, tam_dung: 128, trang_thai: "good" },
  { nhom: "Đồ uống", tong: 982, co_cn: 764, cho_kd: 148, tam_dung: 70, trang_thai: "good" },
  { nhom: "Gia vị - Mắm", tong: 748, co_cn: 524, cho_kd: 98, tam_dung: 126, trang_thai: "warning" },
  { nhom: "Sữa & Sản phẩm sữa", tong: 524, co_cn: 448, cho_kd: 48, tam_dung: 28, trang_thai: "good" },
  { nhom: "Khác", tong: 280, co_cn: 198, cho_kd: 12, tam_dung: 70, trang_thai: "warning" },
];

const categoryColumns = [
  { key: "nhom", label: "Nhóm ngành hàng" },
  { key: "tong", label: "Tổng SP", render: (row: Record<string, unknown>) => <span className="font-mono font-medium">{(row.tong as number).toLocaleString()}</span> },
  { key: "co_cn", label: "Có chứng nhận", render: (row: Record<string, unknown>) => <span className="font-mono text-green-700">{(row.co_cn as number).toLocaleString()}</span> },
  { key: "cho_kd", label: "Chờ kiểm định", render: (row: Record<string, unknown>) => <span className="font-mono text-amber-700">{(row.cho_kd as number).toLocaleString()}</span> },
  { key: "tam_dung", label: "Tạm dừng", render: (row: Record<string, unknown>) => <span className="font-mono text-red-600">{(row.tam_dung as number).toLocaleString()}</span> },
  {
    key: "ty_le", label: "Tỷ lệ CN",
    render: (row: Record<string, unknown>) => {
      const pct = Math.round(((row.co_cn as number) / (row.tong as number)) * 100);
      return <Badge variant={pct >= 80 ? "success" : pct >= 65 ? "warning" : "danger"}>{pct}%</Badge>;
    },
  },
  {
    key: "trang_thai", label: "Đánh giá",
    render: (row: Record<string, unknown>) => (
      <Badge variant={row.trang_thai === "good" ? "success" : "warning"}>
        {row.trang_thai === "good" ? "Ổn định" : "Cần chú ý"}
      </Badge>
    ),
  },
];

export default function Page() {
  const [selected, setSelected] = useState<SPRow | null>(null);

  const topColumns = [
    { key: "rank", label: "#", width: "50px" },
    {
      key: "ten", label: "Tên sản phẩm",
      render: (row: Record<string, unknown>) => (
        <button onClick={() => setSelected(row as unknown as SPRow)} className="text-brand-600 hover:underline text-left font-medium">
          {String(row.ten)}
        </button>
      ),
    },
    { key: "nhom", label: "Nhóm" },
    { key: "doanh_nghiep", label: "Doanh nghiệp" },
    { key: "chung_nhan", label: "Chứng nhận" },
    { key: "so_uid", label: "Số UID", render: (row: Record<string, unknown>) => <span className="font-mono">{(row.so_uid as number).toLocaleString()}</span> },
    {
      key: "trang_thai", label: "Trạng thái",
      render: (row: Record<string, unknown>) => (
        <Badge variant={row.trang_thai === "active" ? "success" : "warning"}>
          {row.trang_thai === "active" ? "Đang lưu thông" : "Cần xem xét"}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <DashboardLayout>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Báo cáo sản phẩm</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Thống kê sản phẩm lưu thông và tình trạng chứng nhận an toàn thực phẩm</p>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
              <p className="text-[14px] text-gray-500 mb-1">{k.label}</p>
              <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              <p className="text-[14px] text-gray-400 mt-1">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Sản phẩm mới & thu hồi theo tháng</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={byMonth} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="colMoi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1570EF" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1570EF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="thang" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="moi" name="Sản phẩm mới" stroke="#1570EF" fill="url(#colMoi)" strokeWidth={2} />
                <Area type="monotone" dataKey="thu_hoi" name="Thu hồi" stroke="#F04438" fill="transparent" strokeWidth={2} strokeDasharray="4 2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Phân bổ theo nhóm ngành hàng</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} innerRadius={35}>
                  {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${(v as number).toLocaleString()} sản phẩm`]} />
                <Legend iconType="circle" iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Thống kê theo nhóm ngành hàng</h2>
            <DataTable columns={categoryColumns} data={byCategoryTable} />
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Top 10 sản phẩm có nhiều UID nhất</h2>
            <DataTable columns={topColumns} data={topSP} searchable searchKeys={["ten", "nhom", "doanh_nghiep"] as never[]} />
          </div>
        </div>
      </DashboardLayout>

      {selected && (
        <Modal isOpen={true} onClose={() => setSelected(null)} title={selected.ten}>
          <div className="space-y-4">
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400">{selected.ma_sp}</span>
              <Badge variant={selected.trang_thai === "active" ? "success" : "warning"}>
                {selected.trang_thai === "active" ? "Đang lưu thông" : "Cần xem xét"}
              </Badge>
              <Badge variant="neutral">{selected.nhom}</Badge>
            </div>

            {/* Mô tả */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Package size={14} className="text-blue-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Mô tả sản phẩm</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{selected.mo_ta}</p>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={14} className="text-purple-500" />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Thông tin sản phẩm</span>
                </div>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Đơn vị</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{selected.don_vi}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Xuất xứ</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200 text-right">{selected.xuat_xu}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Hạn sử dụng</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200 text-right">{selected.han_su_dung}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 size={14} className="text-green-500" />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Doanh nghiệp</span>
                </div>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Tên</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200 text-right">{selected.doanh_nghiep}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Ngày đăng ký</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{selected.ngay_dang_ky}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Tiêu chuẩn */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={14} className="text-teal-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Chứng nhận & Tiêu chuẩn</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {selected.chung_nhan.split(",").map((c) => (
                  <span key={c} className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">{c.trim()}</span>
                ))}
              </div>
              <p className="text-xs text-gray-500">{selected.tieu_chuan}</p>
            </div>

            {/* UID stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3">
                <QrCode size={18} className="text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Số UID đang hoạt động</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{selected.so_uid.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3">
                <Calendar size={18} className="text-green-500 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Ngày đăng ký hệ thống</p>
                  <p className="text-base font-bold text-gray-800 dark:text-gray-200">{selected.ngay_dang_ky}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
