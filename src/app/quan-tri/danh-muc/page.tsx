"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";

const donViTinh = [
  { ma: "DVT01", ten: "Kilogram", viet_tat: "kg", loai: "Khối lượng", trang_thai: "active" },
  { ma: "DVT02", ten: "Gram", viet_tat: "g", loai: "Khối lượng", trang_thai: "active" },
  { ma: "DVT03", ten: "Tấn", viet_tat: "tấn", loai: "Khối lượng", trang_thai: "active" },
  { ma: "DVT04", ten: "Lít", viet_tat: "L", loai: "Thể tích", trang_thai: "active" },
  { ma: "DVT05", ten: "Mililít", viet_tat: "mL", loai: "Thể tích", trang_thai: "active" },
  { ma: "DVT06", ten: "Cái", viet_tat: "cái", loai: "Số lượng", trang_thai: "active" },
  { ma: "DVT07", ten: "Hộp", viet_tat: "hộp", loai: "Số lượng", trang_thai: "active" },
  { ma: "DVT08", ten: "Thùng", viet_tat: "thùng", loai: "Số lượng", trang_thai: "active" },
  { ma: "DVT09", ten: "Bó", viet_tat: "bó", loai: "Số lượng", trang_thai: "active" },
  { ma: "DVT10", ten: "Túi", viet_tat: "túi", loai: "Số lượng", trang_thai: "inactive" },
];

const nhomNganh = [
  { ma: "NN01", ten: "Nông sản", mo_ta: "Rau củ quả, ngũ cốc, gia vị", so_sp: 142, trang_thai: "active" },
  { ma: "NN02", ten: "Thủy sản", mo_ta: "Cá, tôm, mực, cua, hải sản", so_sp: 98, trang_thai: "active" },
  { ma: "NN03", ten: "Thực phẩm chế biến", mo_ta: "Thực phẩm đã qua chế biến", so_sp: 74, trang_thai: "active" },
  { ma: "NN04", ten: "Đồ uống", mo_ta: "Nước giải khát, bia, nước ép", so_sp: 52, trang_thai: "active" },
  { ma: "NN05", ten: "Sản phẩm chăn nuôi", mo_ta: "Thịt, trứng, sữa từ chăn nuôi", so_sp: 43, trang_thai: "active" },
  { ma: "NN06", ten: "Hàng nhập khẩu", mo_ta: "Thực phẩm, hàng hóa nhập khẩu", so_sp: 28, trang_thai: "active" },
  { ma: "NN07", ten: "Dược liệu", mo_ta: "Thảo dược, sản phẩm y tế", so_sp: 19, trang_thai: "active" },
  { ma: "NN08", ten: "Nông sản xuất khẩu", mo_ta: "Nông sản được chứng nhận xuất khẩu", so_sp: 36, trang_thai: "inactive" },
];

const loaiChungChi = [
  { ma: "LCC01", ten: "VietGAP", co_quan: "Bộ Nông nghiệp và PTNT", pham_vi: "Nông sản, rau củ quả", trang_thai: "active" },
  { ma: "LCC02", ten: "GlobalGAP", co_quan: "FoodPLUS GmbH (Đức)", pham_vi: "Nông sản, thủy sản", trang_thai: "active" },
  { ma: "LCC03", ten: "HACCP", co_quan: "Cơ quan có thẩm quyền", pham_vi: "Thực phẩm chế biến", trang_thai: "active" },
  { ma: "LCC04", ten: "ISO 22000", co_quan: "Tổ chức ISO", pham_vi: "Toàn chuỗi thực phẩm", trang_thai: "active" },
  { ma: "LCC05", ten: "Organic (Hữu cơ)", co_quan: "USDA / EU / Việt Nam", pham_vi: "Nông sản hữu cơ", trang_thai: "active" },
  { ma: "LCC06", ten: "ASC", co_quan: "Aquaculture Stewardship Council", pham_vi: "Thủy sản nuôi trồng", trang_thai: "active" },
  { ma: "LCC07", ten: "MSC", co_quan: "Marine Stewardship Council", pham_vi: "Thủy sản khai thác", trang_thai: "active" },
  { ma: "LCC08", ten: "BRC", co_quan: "British Retail Consortium", pham_vi: "Thực phẩm xuất khẩu UK", trang_thai: "inactive" },
];

const loaiSuKien = [
  { ma: "LSK01", ten: "Thu hoạch", mo_ta: "Ghi nhận sự kiện thu hoạch sản phẩm", so_mau: 3, trang_thai: "active" },
  { ma: "LSK02", ten: "Sản xuất", mo_ta: "Ghi nhận quy trình sản xuất, chế biến", so_mau: 4, trang_thai: "active" },
  { ma: "LSK03", ten: "Đóng gói", mo_ta: "Ghi nhận thông tin đóng gói sản phẩm", so_mau: 2, trang_thai: "active" },
  { ma: "LSK04", ten: "Vận chuyển", mo_ta: "Theo dõi lộ trình vận chuyển hàng hóa", so_mau: 3, trang_thai: "active" },
  { ma: "LSK05", ten: "Lưu kho", mo_ta: "Ghi nhận thông tin nhập/xuất kho", so_mau: 2, trang_thai: "active" },
  { ma: "LSK06", ten: "Phân phối", mo_ta: "Ghi nhận phân phối đến đại lý, điểm bán", so_mau: 2, trang_thai: "active" },
  { ma: "LSK07", ten: "Kiểm tra", mo_ta: "Ghi nhận kết quả kiểm tra chất lượng", so_mau: 3, trang_thai: "active" },
  { ma: "LSK08", ten: "Tiêu hủy", mo_ta: "Ghi nhận sự kiện tiêu hủy hàng không đạt", so_mau: 1, trang_thai: "inactive" },
];

const SmallTable = ({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: (string | number | boolean)[][];
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      <button className="text-[14px] text-brand-600 font-medium hover:underline">+ Thêm mới</button>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-2.5 text-[14px] font-semibold text-gray-500">{h}</th>
            ))}
            <th className="text-left px-4 py-2.5 text-[14px] font-semibold text-gray-500">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-t border-gray-50 ${i % 2 === 1 ? "bg-gray-50/50" : ""}`}>
              {row.slice(0, -1).map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-[14px] text-gray-700">{String(cell)}</td>
              ))}
              <td className="px-4 py-2.5">
                <Badge variant={row[row.length - 1] === "active" ? "success" : "neutral"}>
                  {row[row.length - 1] === "active" ? "Hoạt động" : "Ngừng"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default function Page() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Danh mục hệ thống</h1>
        <p className="text-sm text-gray-500 mt-1">Quản lý danh mục và cấu hình hệ thống NDATrace</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <SmallTable
          title="Đơn vị tính"
          headers={["Mã", "Tên đơn vị", "Viết tắt", "Loại"]}
          rows={donViTinh.map((d) => [d.ma, d.ten, d.viet_tat, d.loai, d.trang_thai])}
        />

        <SmallTable
          title="Nhóm ngành hàng"
          headers={["Mã", "Tên nhóm", "Mô tả", "Số SP"]}
          rows={nhomNganh.map((n) => [n.ma, n.ten, n.mo_ta, n.so_sp, n.trang_thai])}
        />

        <SmallTable
          title="Loại chứng chỉ"
          headers={["Mã", "Tên chứng chỉ", "Cơ quan cấp", "Phạm vi"]}
          rows={loaiChungChi.map((l) => [l.ma, l.ten, l.co_quan, l.pham_vi, l.trang_thai])}
        />

        <SmallTable
          title="Loại sự kiện"
          headers={["Mã", "Tên loại", "Mô tả", "Số mẫu"]}
          rows={loaiSuKien.map((l) => [l.ma, l.ten, l.mo_ta, l.so_mau, l.trang_thai])}
        />
      </div>
    </DashboardLayout>
  );
}
