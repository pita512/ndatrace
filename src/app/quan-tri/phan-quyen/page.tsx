"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";

const roles = [
  {
    role: "Quản trị viên",
    desc: "Toàn quyền hệ thống",
    permissions: { xem: true, tao: true, sua: true, xoa: true, phe_duyet: true },
  },
  {
    role: "Quản lý",
    desc: "Quản lý đơn vị trực thuộc",
    permissions: { xem: true, tao: true, sua: true, xoa: false, phe_duyet: true },
  },
  {
    role: "Kiểm định viên",
    desc: "Xem xét và phê duyệt sự kiện",
    permissions: { xem: true, tao: false, sua: false, xoa: false, phe_duyet: true },
  },
  {
    role: "Nhân viên nhập liệu",
    desc: "Tạo và cập nhật dữ liệu",
    permissions: { xem: true, tao: true, sua: true, xoa: false, phe_duyet: false },
  },
  {
    role: "Đối tác",
    desc: "Xem dữ liệu liên quan",
    permissions: { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false },
  },
  {
    role: "Người xem",
    desc: "Chỉ xem, không thay đổi",
    permissions: { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false },
  },
];

const modules = [
  { name: "Sản phẩm", roles: { "Quản trị viên": { xem: true, tao: true, sua: true, xoa: true, phe_duyet: true }, "Quản lý": { xem: true, tao: true, sua: true, xoa: false, phe_duyet: true }, "Kiểm định viên": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: true }, "Nhân viên nhập liệu": { xem: true, tao: true, sua: true, xoa: false, phe_duyet: false }, "Đối tác": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false }, "Người xem": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false } } },
  { name: "Sự kiện truy xuất", roles: { "Quản trị viên": { xem: true, tao: true, sua: true, xoa: true, phe_duyet: true }, "Quản lý": { xem: true, tao: true, sua: true, xoa: false, phe_duyet: true }, "Kiểm định viên": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: true }, "Nhân viên nhập liệu": { xem: true, tao: true, sua: true, xoa: false, phe_duyet: false }, "Đối tác": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false }, "Người xem": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false } } },
  { name: "Tem nhãn (UID/QR)", roles: { "Quản trị viên": { xem: true, tao: true, sua: true, xoa: true, phe_duyet: true }, "Quản lý": { xem: true, tao: true, sua: true, xoa: false, phe_duyet: false }, "Kiểm định viên": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false }, "Nhân viên nhập liệu": { xem: true, tao: true, sua: false, xoa: false, phe_duyet: false }, "Đối tác": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false }, "Người xem": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false } } },
  { name: "Chứng chỉ", roles: { "Quản trị viên": { xem: true, tao: true, sua: true, xoa: true, phe_duyet: true }, "Quản lý": { xem: true, tao: true, sua: true, xoa: false, phe_duyet: true }, "Kiểm định viên": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: true }, "Nhân viên nhập liệu": { xem: true, tao: true, sua: true, xoa: false, phe_duyet: false }, "Đối tác": { xem: false, tao: false, sua: false, xoa: false, phe_duyet: false }, "Người xem": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false } } },
  { name: "Báo cáo", roles: { "Quản trị viên": { xem: true, tao: true, sua: true, xoa: true, phe_duyet: true }, "Quản lý": { xem: true, tao: true, sua: false, xoa: false, phe_duyet: false }, "Kiểm định viên": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false }, "Nhân viên nhập liệu": { xem: false, tao: false, sua: false, xoa: false, phe_duyet: false }, "Đối tác": { xem: false, tao: false, sua: false, xoa: false, phe_duyet: false }, "Người xem": { xem: false, tao: false, sua: false, xoa: false, phe_duyet: false } } },
  { name: "Quản trị người dùng", roles: { "Quản trị viên": { xem: true, tao: true, sua: true, xoa: true, phe_duyet: true }, "Quản lý": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false }, "Kiểm định viên": { xem: false, tao: false, sua: false, xoa: false, phe_duyet: false }, "Nhân viên nhập liệu": { xem: false, tao: false, sua: false, xoa: false, phe_duyet: false }, "Đối tác": { xem: false, tao: false, sua: false, xoa: false, phe_duyet: false }, "Người xem": { xem: false, tao: false, sua: false, xoa: false, phe_duyet: false } } },
  { name: "Tích hợp API", roles: { "Quản trị viên": { xem: true, tao: true, sua: true, xoa: true, phe_duyet: true }, "Quản lý": { xem: true, tao: false, sua: false, xoa: false, phe_duyet: false }, "Kiểm định viên": { xem: false, tao: false, sua: false, xoa: false, phe_duyet: false }, "Nhân viên nhập liệu": { xem: false, tao: false, sua: false, xoa: false, phe_duyet: false }, "Đối tác": { xem: true, tao: true, sua: false, xoa: false, phe_duyet: false }, "Người xem": { xem: false, tao: false, sua: false, xoa: false, phe_duyet: false } } },
];

const PermCell = ({ allowed }: { allowed: boolean }) => (
  <div className="flex justify-center">
    {allowed
      ? <span className="text-green-600 font-bold text-base">✓</span>
      : <span className="text-gray-300 text-base">—</span>}
  </div>
);

const roleOrder = ["Quản trị viên", "Quản lý", "Kiểm định viên", "Nhân viên nhập liệu", "Đối tác", "Người xem"];

export default function Page() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Phân quyền</h1>
        <p className="text-sm text-gray-500 mt-1">Thiết lập vai trò và phân quyền chức năng trong hệ thống</p>
      </div>

      {/* Role Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {roles.map((r) => (
          <div key={r.role} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-semibold text-gray-800">{r.role}</p>
            </div>
            <p className="text-[14px] text-gray-500 mb-3">{r.desc}</p>
            <div className="flex flex-wrap gap-1">
              {r.permissions.xem && <Badge variant="info">Xem</Badge>}
              {r.permissions.tao && <Badge variant="success">Tạo</Badge>}
              {r.permissions.sua && <Badge variant="warning">Sửa</Badge>}
              {r.permissions.xoa && <Badge variant="danger">Xóa</Badge>}
              {r.permissions.phe_duyet && <Badge variant="neutral">Phê duyệt</Badge>}
            </div>
          </div>
        ))}
      </div>

      {/* Permission Matrix */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Ma trận phân quyền theo module</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-[14px] font-semibold text-gray-600 w-40">Module</th>
                {roleOrder.map((role) => (
                  <th key={role} className="text-center px-2 py-3 text-[14px] font-semibold text-gray-600" colSpan={5}>
                    {role}
                  </th>
                ))}
              </tr>
              <tr className="border-t border-gray-100">
                <th className="text-left px-4 py-2 text-[14px] text-gray-400"></th>
                {roleOrder.map((role) => (
                  ["Xem", "Tạo", "Sửa", "Xóa", "PD"].map((perm) => (
                    <th key={`${role}-${perm}`} className="text-center px-1 py-2 text-[14px] text-gray-400 font-normal">{perm}</th>
                  ))
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map((mod, i) => (
                <tr key={mod.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3 font-medium text-gray-700 text-[14px]">{mod.name}</td>
                  {roleOrder.map((role) => {
                    const perms = mod.roles[role as keyof typeof mod.roles];
                    return (
                      <>
                        <td key={`${role}-xem`} className="px-1 py-3"><PermCell allowed={perms.xem} /></td>
                        <td key={`${role}-tao`} className="px-1 py-3"><PermCell allowed={perms.tao} /></td>
                        <td key={`${role}-sua`} className="px-1 py-3"><PermCell allowed={perms.sua} /></td>
                        <td key={`${role}-xoa`} className="px-1 py-3"><PermCell allowed={perms.xoa} /></td>
                        <td key={`${role}-pd`} className="px-1 py-3"><PermCell allowed={perms.phe_duyet} /></td>
                      </>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
