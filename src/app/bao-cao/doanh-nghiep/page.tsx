"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import { Building2, MapPin, Tag, Phone, FileText, ShieldCheck } from "lucide-react";

const kpis = [
  { label: "Tổng doanh nghiệp", value: "1,842", sub: "Đang hoạt động trên hệ thống", color: "text-blue-600" },
  { label: "Đang hoạt động", value: "1,504", sub: "81.7% tổng số doanh nghiệp", color: "text-green-600" },
  { label: "Chờ phê duyệt", value: "198", sub: "Hồ sơ đang xét duyệt", color: "text-amber-600" },
  { label: "Ngừng hoạt động", value: "140", sub: "Tạm dừng hoặc giải thể", color: "text-red-600" },
];

const data = [
  { tinh: "TP.HCM", tong: 412, dang_hd: 341, cho_duyet: 42, ngung: 29, loai_chinh: "Công ty CP", trang_thai: "good" },
  { tinh: "Hà Nội", tong: 368, dang_hd: 298, cho_duyet: 38, ngung: 32, loai_chinh: "TNHH", trang_thai: "good" },
  { tinh: "Đà Nẵng", tong: 184, dang_hd: 152, cho_duyet: 18, ngung: 14, loai_chinh: "TNHH", trang_thai: "good" },
  { tinh: "Cần Thơ", tong: 142, dang_hd: 114, cho_duyet: 16, ngung: 12, loai_chinh: "HTX", trang_thai: "good" },
  { tinh: "Lâm Đồng", tong: 128, dang_hd: 102, cho_duyet: 14, ngung: 12, loai_chinh: "HTX", trang_thai: "warning" },
  { tinh: "Bình Dương", tong: 118, dang_hd: 96, cho_duyet: 12, ngung: 10, loai_chinh: "Công ty CP", trang_thai: "good" },
  { tinh: "Đồng Nai", tong: 108, dang_hd: 88, cho_duyet: 11, ngung: 9, loai_chinh: "TNHH", trang_thai: "good" },
  { tinh: "Nghệ An", tong: 96, dang_hd: 76, cho_duyet: 12, ngung: 8, loai_chinh: "HTX", trang_thai: "good" },
  { tinh: "Hải Phòng", tong: 88, dang_hd: 70, cho_duyet: 10, ngung: 8, loai_chinh: "TNHH", trang_thai: "good" },
  { tinh: "Khánh Hòa", tong: 72, dang_hd: 56, cho_duyet: 9, ngung: 7, loai_chinh: "Hộ kinh doanh", trang_thai: "warning" },
];

type DNRow = {
  rank: number; ten: string; tinh: string; loai: string;
  so_sp: number; chung_chi: number; trang_thai: string; tem_kich_hoat: number;
  ma_so_thue: string; dien_thoai: string; dia_chi: string;
  nguoi_dai_dien: string; nam_thanh_lap: number; linh_vuc: string; mo_ta: string;
};

const topDN: DNRow[] = [
  { rank: 1, ten: "Công ty CP Nông sản Việt", tinh: "TP.HCM", loai: "Công ty CP", so_sp: 48, chung_chi: 5, trang_thai: "active", tem_kich_hoat: 124500, ma_so_thue: "0301234567", dien_thoai: "028 3812 3456", dia_chi: "123 Nguyễn Huệ, Q.1, TP.HCM", nguoi_dai_dien: "Nguyễn Văn An", nam_thanh_lap: 2008, linh_vuc: "Sản xuất & xuất khẩu nông sản", mo_ta: "Chuyên sản xuất và xuất khẩu các loại nông sản sạch, có chứng nhận VietGAP và GlobalGAP. Đối tác chiến lược của hệ thống từ năm 2020." },
  { rank: 2, ten: "TNHH Thực phẩm Sạch Miền Nam", tinh: "TP.HCM", loai: "TNHH", so_sp: 41, chung_chi: 4, trang_thai: "active", tem_kich_hoat: 98200, ma_so_thue: "0302345678", dien_thoai: "028 3913 4567", dia_chi: "45 Lê Lợi, Q.3, TP.HCM", nguoi_dai_dien: "Trần Thị Bình", nam_thanh_lap: 2012, linh_vuc: "Chế biến thực phẩm sạch", mo_ta: "Công ty chuyên chế biến và phân phối thực phẩm sạch tại khu vực phía Nam. Được chứng nhận HACCP và ISO 22000." },
  { rank: 3, ten: "HTX Nông nghiệp Xanh Lâm Đồng", tinh: "Lâm Đồng", loai: "HTX", so_sp: 36, chung_chi: 3, trang_thai: "active", tem_kich_hoat: 74800, ma_so_thue: "5801234567", dien_thoai: "0263 382 1234", dia_chi: "78 Trần Phú, Đà Lạt, Lâm Đồng", nguoi_dai_dien: "Lê Minh Cường", nam_thanh_lap: 2015, linh_vuc: "Rau củ quả hữu cơ", mo_ta: "Hợp tác xã chuyên canh tác rau củ quả hữu cơ tại Đà Lạt. Thành viên gồm 120 hộ nông dân, đạt chứng nhận VietGAP và Organic." },
  { rank: 4, ten: "Công ty CP Thủy sản Minh Phú", tinh: "Cần Thơ", loai: "Công ty CP", so_sp: 32, chung_chi: 6, trang_thai: "active", tem_kich_hoat: 312000, ma_so_thue: "1801234567", dien_thoai: "0292 381 2345", dia_chi: "12 Trần Hưng Đạo, Cần Thơ", nguoi_dai_dien: "Phạm Thị Dung", nam_thanh_lap: 2003, linh_vuc: "Nuôi trồng & chế biến thủy sản", mo_ta: "Doanh nghiệp hàng đầu trong lĩnh vực nuôi trồng và xuất khẩu tôm. Có chứng nhận ASC, GlobalGAP, BAP. Kim ngạch xuất khẩu đạt 120 triệu USD/năm." },
  { rank: 5, ten: "HTX Cà phê Tây Nguyên", tinh: "Đắk Lắk", loai: "HTX", so_sp: 28, chung_chi: 3, trang_thai: "active", tem_kich_hoat: 56300, ma_so_thue: "6001234567", dien_thoai: "0262 381 5678", dia_chi: "56 Lý Thường Kiệt, Buôn Ma Thuột", nguoi_dai_dien: "Hoàng Văn Em", nam_thanh_lap: 2016, linh_vuc: "Trồng & chế biến cà phê", mo_ta: "Hợp tác xã với 85 thành viên, chuyên canh tác cà phê Arabica và Robusta theo tiêu chuẩn 4C và Rainforest Alliance." },
  { rank: 6, ten: "Công ty TNHH Rau củ Miền Bắc", tinh: "Hà Nội", loai: "TNHH", so_sp: 24, chung_chi: 2, trang_thai: "active", tem_kich_hoat: 43100, ma_so_thue: "0101234567", dien_thoai: "024 3812 6789", dia_chi: "89 Bà Triệu, Hai Bà Trưng, Hà Nội", nguoi_dai_dien: "Nguyễn Thị Lan", nam_thanh_lap: 2014, linh_vuc: "Rau củ tươi & sơ chế", mo_ta: "Công ty chuyên cung cấp rau củ sạch cho thị trường Hà Nội và các tỉnh phía Bắc. Có vùng trồng đạt chuẩn VietGAP tại Mê Linh, Đông Anh." },
  { rank: 7, ten: "Trang trại Hữu Cơ Việt", tinh: "Bình Dương", loai: "DNTN", so_sp: 21, chung_chi: 2, trang_thai: "active", tem_kich_hoat: 31400, ma_so_thue: "3701234567", dien_thoai: "0274 381 3456", dia_chi: "234 Điện Biên Phủ, Thủ Dầu Một, BD", nguoi_dai_dien: "Võ Minh Tuấn", nam_thanh_lap: 2018, linh_vuc: "Nông sản hữu cơ", mo_ta: "Trang trại chuyên canh tác theo phương pháp hữu cơ không sử dụng thuốc bảo vệ thực vật. Đã đạt chứng nhận Organic quốc tế." },
  { rank: 8, ten: "Công ty CP Sữa Mộc Châu", tinh: "Sơn La", loai: "Công ty CP", so_sp: 18, chung_chi: 4, trang_thai: "active", tem_kich_hoat: 487000, ma_so_thue: "2601234567", dien_thoai: "0212 381 7890", dia_chi: "Khu công nghiệp Mộc Châu, Sơn La", nguoi_dai_dien: "Đặng Thị Hoa", nam_thanh_lap: 2001, linh_vuc: "Sản xuất sữa & sản phẩm từ sữa", mo_ta: "Doanh nghiệp sản xuất sữa với tổng đàn bò 23,000 con. Sản phẩm đạt chứng nhận ISO 22000, HACCP và xuất khẩu sang nhiều thị trường quốc tế." },
  { rank: 9, ten: "HTX Rau sạch Đà Lạt", tinh: "Lâm Đồng", loai: "HTX", so_sp: 16, chung_chi: 2, trang_thai: "warning", tem_kich_hoat: 19600, ma_so_thue: "5802345678", dien_thoai: "0263 382 2345", dia_chi: "12 Hoàng Diệu, Đà Lạt, Lâm Đồng", nguoi_dai_dien: "Trần Văn Khoa", nam_thanh_lap: 2017, linh_vuc: "Rau củ quả sạch", mo_ta: "HTX đang trong quá trình gia hạn chứng nhận VietGAP. Cần cập nhật hồ sơ kiểm định trước ngày 30/04/2026." },
  { rank: 10, ten: "Công ty NK Á Châu", tinh: "Hà Nội", loai: "TNHH", so_sp: 14, chung_chi: 1, trang_thai: "warning", tem_kich_hoat: 28700, ma_so_thue: "0103456789", dien_thoai: "024 3812 9012", dia_chi: "156 Nguyễn Chính, Hoàng Mai, HN", nguoi_dai_dien: "Phạm Quốc Hùng", nam_thanh_lap: 2019, linh_vuc: "Nhập khẩu thực phẩm", mo_ta: "Công ty nhập khẩu thực phẩm từ Úc, New Zealand và châu Âu. Một số lô hàng đang chờ bổ sung hồ sơ chứng nhận xuất xứ." },
];

const provinceColumns = [
  { key: "tinh", label: "Tỉnh / Thành phố" },
  { key: "tong", label: "Tổng", render: (row: Record<string, unknown>) => <span className="font-mono font-medium">{String(row.tong)}</span> },
  { key: "dang_hd", label: "Đang HĐ", render: (row: Record<string, unknown>) => <span className="font-mono text-green-700">{String(row.dang_hd)}</span> },
  { key: "cho_duyet", label: "Chờ duyệt", render: (row: Record<string, unknown>) => <span className="font-mono text-amber-700">{String(row.cho_duyet)}</span> },
  { key: "ngung", label: "Ngừng HĐ", render: (row: Record<string, unknown>) => <span className="font-mono text-red-600">{String(row.ngung)}</span> },
];

export default function Page() {
  const [selected, setSelected] = useState<DNRow | null>(null);

  const topColumns = [
    { key: "rank", label: "#", width: "50px" },
    {
      key: "ten", label: "Doanh nghiệp",
      render: (row: Record<string, unknown>) => (
        <button onClick={() => setSelected(row as unknown as DNRow)} className="text-brand-600 hover:underline text-left font-medium">
          {String(row.ten)}
        </button>
      ),
    },
    { key: "tinh", label: "Tỉnh" },
    { key: "so_sp", label: "Số sản phẩm", render: (row: Record<string, unknown>) => <span className="font-mono font-medium">{String(row.so_sp)}</span> },
    { key: "tem_kich_hoat", label: "Tem kích hoạt", render: (row: Record<string, unknown>) => <span className="font-mono font-medium">{(row.tem_kich_hoat as number).toLocaleString()}</span> },
  ];

  return (
    <>
      <DashboardLayout>
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Báo cáo doanh nghiệp</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Thống kê tình trạng doanh nghiệp tham gia hệ thống truy xuất nguồn gốc</p>
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

        {/* Tables */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Thống kê theo tỉnh / thành phố</h2>
            <DataTable columns={provinceColumns} data={data} searchable searchKeys={["tinh", "loai_chinh"] as never[]} />
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Top 10 doanh nghiệp có nhiều sản phẩm nhất</h2>
            <DataTable columns={topColumns} data={topDN} searchable searchKeys={["ten", "tinh", "loai"] as never[]} />
          </div>
        </div>
      </DashboardLayout>

      {selected && (
        <Modal isOpen={true} onClose={() => setSelected(null)} title={selected.ten}>
          <div className="space-y-4">
            {/* Status + rank */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400">#{selected.rank} Top doanh nghiệp</span>
              <Badge variant={selected.trang_thai === "active" ? "success" : "warning"}>
                {selected.trang_thai === "active" ? "Đang hoạt động" : "Cần xem xét"}
              </Badge>
            </div>

            {/* Mô tả */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building2 size={14} className="text-blue-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Giới thiệu</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{selected.mo_ta}</p>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={14} className="text-purple-500" />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Thông tin pháp lý</span>
                </div>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Loại hình</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{selected.loai}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Mã số thuế</dt>
                    <dd className="font-mono font-medium text-gray-800 dark:text-gray-200">{selected.ma_so_thue}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Năm thành lập</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{selected.nam_thanh_lap}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Lĩnh vực</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200 text-right">{selected.linh_vuc}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-green-500" />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Liên hệ</span>
                </div>
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Người đại diện</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200 text-right">{selected.nguoi_dai_dien}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Điện thoại</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{selected.dien_thoai}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500 shrink-0">Tỉnh / TP</dt>
                    <dd className="font-medium text-gray-800 dark:text-gray-200">{selected.tinh}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={14} className="text-teal-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Địa chỉ</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{selected.dia_chi}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3">
                <FileText size={18} className="text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Số sản phẩm</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{selected.so_sp}</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex items-center gap-3">
                <ShieldCheck size={18} className="text-green-500 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Chứng chỉ đạt được</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{selected.chung_chi}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
