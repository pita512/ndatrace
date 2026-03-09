"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Sun, Moon, ShieldCheck, FileText, BookOpen, LogOut, User, X, Phone, Mail, Check } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

// ── Modal shell ──────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ── Role Permission Modal ─────────────────────────────────────────────────────
function RolePermissionModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [value, setValue] = useState("");
  const [role, setRole] = useState("viewer");
  const [saved, setSaved] = useState(false);

  const roles = [
    { id: "admin", label: "Quản trị viên", desc: "Toàn quyền hệ thống" },
    { id: "manager", label: "Quản lý", desc: "Quản lý tổ chức & sản phẩm" },
    { id: "inspector", label: "Kiểm định viên", desc: "Xem và kiểm định" },
    { id: "viewer", label: "Người xem", desc: "Chỉ xem dữ liệu" },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Modal title="Phân quyền người dùng" onClose={onClose}>
      {/* Tab */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-5">
        {(["email", "phone"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setValue(""); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
              tab === t ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "email" ? <Mail size={13} /> : <Phone size={13} />}
            {t === "email" ? "Theo Email" : "Theo SĐT"}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-[13px] font-medium text-gray-600 dark:text-gray-400 mb-1.5">
          {tab === "email" ? "Địa chỉ email" : "Số điện thoại"}
        </label>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={tab === "email" ? "vd: user@ndatrace.vn" : "vd: 0912 345 678"}
          type={tab === "email" ? "email" : "tel"}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-brand-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
        />
      </div>

      {/* Role picker */}
      <div className="mb-5">
        <label className="block text-[13px] font-medium text-gray-600 dark:text-gray-400 mb-2">Vai trò</label>
        <div className="space-y-2">
          {roles.map((r) => (
            <label
              key={r.id}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                role === r.id
                  ? "border-brand-400 bg-brand-50 dark:bg-brand-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
              }`}
            >
              <input type="radio" name="role" value={r.id} checked={role === r.id} onChange={() => setRole(r.id)} className="sr-only" />
              <div className={`size-4 rounded-full border-2 flex items-center justify-center shrink-0 ${role === r.id ? "border-brand-500 bg-brand-500" : "border-gray-300"}`}>
                {role === r.id && <div className="size-1.5 bg-white rounded-full" />}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{r.label}</p>
                <p className="text-[13px] text-gray-400">{r.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          saved ? "bg-brand-100 text-brand-700" : "bg-brand-600 hover:bg-brand-700 text-white"
        }`}
      >
        {saved ? <><Check size={15} /> Đã lưu</> : "Lưu phân quyền"}
      </button>
    </Modal>
  );
}

// ── Terms Modal ───────────────────────────────────────────────────────────────
function TermsModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Điều khoản & Điều kiện" onClose={onClose}>
      <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-400 space-y-4 text-sm leading-relaxed">
        <p className="font-semibold text-gray-800 dark:text-gray-200">1. Điều khoản sử dụng</p>
        <p>Bằng cách truy cập và sử dụng hệ thống NDATrace, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu trong tài liệu này.</p>
        <p className="font-semibold text-gray-800 dark:text-gray-200">2. Quyền và nghĩa vụ người dùng</p>
        <p>Người dùng có trách nhiệm bảo mật tài khoản, không chia sẻ thông tin đăng nhập với bên thứ ba và thông báo ngay khi phát hiện truy cập trái phép.</p>
        <p className="font-semibold text-gray-800 dark:text-gray-200">3. Bảo mật dữ liệu</p>
        <p>NDATrace cam kết bảo vệ dữ liệu của người dùng theo quy định pháp luật hiện hành về bảo vệ dữ liệu cá nhân. Dữ liệu được mã hóa và lưu trữ an toàn.</p>
        <p className="font-semibold text-gray-800 dark:text-gray-200">4. Giới hạn trách nhiệm</p>
        <p>Hệ thống không chịu trách nhiệm đối với các thiệt hại phát sinh từ việc sử dụng sai mục đích hoặc vi phạm điều khoản sử dụng.</p>
        <p className="font-semibold text-gray-800 dark:text-gray-200">5. Thay đổi điều khoản</p>
        <p>Chúng tôi có thể cập nhật điều khoản này theo thời gian. Người dùng sẽ được thông báo qua email khi có thay đổi quan trọng.</p>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-[13px] text-gray-400 text-center">Cập nhật lần cuối: 01/01/2026 · Phiên bản 2.1</p>
      </div>
    </Modal>
  );
}

// ── Instruction Modal ─────────────────────────────────────────────────────────
function InstructionModal({ onClose }: { onClose: () => void }) {
  const steps = [
    { step: "01", title: "Đăng ký doanh nghiệp", desc: "Vào Quản lý tổ chức → Đăng ký doanh nghiệp để thêm mới." },
    { step: "02", title: "Khai báo sản phẩm", desc: "Vào Quản lý sản phẩm → Tạo sản phẩm và điền đầy đủ thông tin." },
    { step: "03", title: "Tạo chuỗi cung ứng", desc: "Vào Chuỗi cung ứng → Tạo chuỗi mới và liên kết sản phẩm." },
    { step: "04", title: "Khai báo sự kiện", desc: "Ghi nhận các sự kiện (sản xuất, vận chuyển, lưu kho) theo chuỗi." },
    { step: "05", title: "Tạo QR truy xuất", desc: "Vào Quản lý sản phẩm → QR truy xuất để tạo mã cho lô hàng." },
    { step: "06", title: "Cấp chứng nhận", desc: "Vào Chứng nhận → Cấp chứng nhận cho doanh nghiệp đủ tiêu chuẩn." },
  ];

  return (
    <Modal title="Hướng dẫn sử dụng" onClose={onClose}>
      <p className="text-[13px] text-gray-500 dark:text-gray-400 mb-4">Làm theo các bước dưới đây để bắt đầu sử dụng hệ thống NDATrace.</p>
      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.step} className="flex gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div className="size-8 rounded-lg bg-brand-600 text-white text-[13px] font-bold flex items-center justify-center shrink-0">
              {s.step}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{s.title}</p>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 p-3.5 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800">
        <p className="text-[13px] text-brand-700 dark:text-brand-300 font-medium">Cần hỗ trợ thêm?</p>
        <p className="text-[13px] text-brand-600 dark:text-brand-400 mt-0.5">Liên hệ: support@ndatrace.vn · Hotline: 1800 xxxx</p>
      </div>
    </Modal>
  );
}

// ── Main UserMenu ─────────────────────────────────────────────────────────────
export default function UserMenu() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<"role" | "terms" | "instruction" | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const openModal = (m: typeof modal) => {
    setModal(m);
    setOpen(false);
  };

  const menuItems = [
    {
      icon: theme === "dark" ? Sun : Moon,
      label: theme === "dark" ? "Chế độ sáng" : "Chế độ tối",
      desc: theme === "dark" ? "Chuyển sang light mode" : "Chuyển sang dark mode",
      action: () => { toggleTheme(); setOpen(false); },
      right: (
        <div className={`relative w-9 h-5 rounded-full transition-colors ${theme === "dark" ? "bg-brand-600" : "bg-gray-200"}`}>
          <div className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform ${theme === "dark" ? "translate-x-4" : "translate-x-0.5"}`} />
        </div>
      ),
    },
    {
      icon: ShieldCheck,
      label: "Phân quyền",
      desc: "Cấp quyền theo email / SĐT",
      action: () => openModal("role"),
    },
    {
      icon: FileText,
      label: "Điều khoản & Điều kiện",
      desc: "Xem điều khoản sử dụng",
      action: () => openModal("terms"),
    },
    {
      icon: BookOpen,
      label: "Hướng dẫn sử dụng",
      desc: "Xem tài liệu hướng dẫn",
      action: () => openModal("instruction"),
    },
  ];

  return (
    <>
      <div ref={ref} className="relative">
        {/* Avatar button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl transition-colors ${
            open ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          <div className="size-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-[13px] font-bold">
            A
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-none">Admin</p>
            <p className="text-[13px] text-gray-400">Quản trị viên</p>
          </div>
          <ChevronDown
            size={14}
            className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50">
            {/* User info */}
            <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow">
                A
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin</p>
                <p className="text-[13px] text-gray-400">admin@ndatrace.vn</p>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group text-left"
                  >
                    <div className="size-8 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/30 flex items-center justify-center transition-colors shrink-0">
                      <Icon size={15} className="text-gray-500 group-hover:text-brand-600 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{item.label}</p>
                      <p className="text-[13px] text-gray-400 truncate">{item.desc}</p>
                    </div>
                    {item.right && <div className="shrink-0">{item.right}</div>}
                  </button>
                );
              })}
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors group text-left"
              >
                <div className="size-8 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-red-50 dark:group-hover:bg-red-950/30 flex items-center justify-center transition-colors shrink-0">
                  <LogOut size={15} className="text-gray-500 group-hover:text-red-500 transition-colors" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    Đăng xuất
                  </p>
                  <p className="text-[13px] text-gray-400">Thoát khỏi hệ thống</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal === "role" && <RolePermissionModal onClose={() => setModal(null)} />}
      {modal === "terms" && <TermsModal onClose={() => setModal(null)} />}
      {modal === "instruction" && <InstructionModal onClose={() => setModal(null)} />}
    </>
  );
}
