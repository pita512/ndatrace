"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { X } from "lucide-react";

interface AddPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PartnerData) => void;
}

interface PartnerData {
  ten: string;
  loai: string;
  quoc_gia: string;
  lien_he: string;
  email: string;
  trang_thai: "active" | "inactive";
}

const loaiOptions = [
  "Tổ chức tiêu chuẩn",
  "Nhà bán lẻ",
  "Doanh nghiệp thực phẩm",
  "Tổ chức chứng nhận",
  "Tổ chức kiểm định",
  "Logistics",
  "Thương mại điện tử",
  "Công nghệ thông tin",
  "Kiểm toán & tư vấn",
  "Tổ chức quốc tế",
];

const quocGiaOptions = [
  "Việt Nam",
  "Singapore",
  "Anh",
  "Đức",
  "Pháp",
  "Thụy Sỹ",
  "Hà Lan",
];

export default function AddPartnerModal({ isOpen, onClose, onSave }: AddPartnerModalProps) {
  const [formData, setFormData] = useState<PartnerData>({
    ten: "",
    loai: "",
    quoc_gia: "",
    lien_he: "",
    email: "",
    trang_thai: "active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.ten && formData.email) {
      onSave(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      ten: "",
      loai: "",
      quoc_gia: "",
      lien_he: "",
      email: "",
      trang_thai: "active",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Thêm đối tác mới">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên đối tác */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tên đối tác <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.ten}
            onChange={(e) => setFormData({ ...formData, ten: e.target.value })}
            className="w-full px-4 py-2.5 text-[14px] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-brand-400 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand-400/20 transition-all"
            placeholder="Nhập tên đối tác"
          />
        </div>

        {/* Loại đối tác */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Loại đối tác <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={formData.loai}
            onChange={(e) => setFormData({ ...formData, loai: e.target.value })}
            className="w-full px-4 py-2.5 text-[14px] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-brand-400 bg-white dark:bg-gray-800 transition-all"
          >
            <option value="">Chọn loại đối tác</option>
            {loaiOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Quốc gia */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quốc gia <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={formData.quoc_gia}
            onChange={(e) => setFormData({ ...formData, quoc_gia: e.target.value })}
            className="w-full px-4 py-2.5 text-[14px] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-brand-400 bg-white dark:bg-gray-800 transition-all"
          >
            <option value="">Chọn quốc gia</option>
            {quocGiaOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Liên hệ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Người liên hệ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.lien_he}
            onChange={(e) => setFormData({ ...formData, lien_he: e.target.value })}
            className="w-full px-4 py-2.5 text-[14px] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-brand-400 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand-400/20 transition-all"
            placeholder="Nhập tên người liên hệ"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 text-[14px] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-brand-400 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-brand-400/20 transition-all"
            placeholder="example@email.com"
          />
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Trạng thái
          </label>
          <select
            value={formData.trang_thai}
            onChange={(e) => setFormData({ ...formData, trang_thai: e.target.value as "active" | "inactive" })}
            className="w-full px-4 py-2.5 text-[14px] border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-brand-400 bg-white dark:bg-gray-800 transition-all"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Ngừng hợp tác</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2.5 text-[14px] font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-[14px] font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors"
          >
            Lưu
          </button>
        </div>
      </form>
    </Modal>
  );
}
