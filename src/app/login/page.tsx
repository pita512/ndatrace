"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { login } from "@/lib/auth";

// Figma assets
const imgPhoto = "https://www.figma.com/api/mcp/asset/4e6044a9-9796-46fc-a4c2-3ae0eb8f4901";
const imgEyeHide = "https://www.figma.com/api/mcp/asset/f0f5aaae-765b-4767-98a0-1b1cb10ccd92";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = login(email, password);
    if (ok) {
      router.push("/dashboard");
    } else {
      setError("Email hoặc mật khẩu không đúng.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex overflow-hidden" style={{
      background: "radial-gradient(ellipse at 0% 0%, rgba(112,234,255,0.3) 0%, rgba(183,244,255,0.15) 30%, transparent 60%), radial-gradient(ellipse at 100% 0%, rgba(191,151,255,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, #fff 22%, #C6DEFF 100%)",
    }}>
      {/* Left — photo panel */}
      <div className="hidden lg:block relative w-[50%] shrink-0 overflow-hidden">
        {/* Photo */}
        <img
          src={imgPhoto}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {/* Text */}
        <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[614px] max-w-[90%] text-center text-white">
          <h1 className="font-semibold text-[43px] leading-[1.4] tracking-[-0.01em]">
            Hệ thống Truy xuất nguồn gốc Quốc gia
          </h1>
          <p className="mt-2 font-normal text-[21px] leading-[1.6]">
            Nền tảng quản lý và truy xuất nguồn gốc chuỗi cung ứng tích hợp toàn diện.
          </p>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* Decorative blurs */}
        <div className="pointer-events-none absolute top-[-100px] right-[-40px] w-[200px] h-[200px]">
          <div className="absolute inset-[-150%] opacity-60" style={{ background: "radial-gradient(circle, rgba(191,151,255,0.5), transparent 70%)" }} />
        </div>
        <div className="pointer-events-none absolute bottom-[-60px] left-[30%] w-[200px] h-[200px]">
          <div className="absolute inset-[-150%] opacity-40" style={{ background: "radial-gradient(circle, rgba(112,234,255,0.4), transparent 70%)" }} />
        </div>

        <div className="relative w-full max-w-[385px] flex flex-col gap-5">
          {/* Logo + heading */}
          <div className="flex flex-col gap-4 items-center">
            {/* NDATrace logo */}
            <div className="flex items-center justify-center w-[70px] h-[70px] rounded-[10px] overflow-hidden"
              style={{ background: "radial-gradient(circle at 30% 80%, #fff 22%, #C6DEFF 100%)" }}>
              <Image src="/media/logo.svg" alt="NDATrace" width={52} height={52} priority />
            </div>
            <div className="text-center leading-[1.6]">
              <p className="font-medium text-[25px] text-[#0D0D12]">Đăng nhập</p>
              <p className="font-normal text-[15px] text-[#55555E]">Nhập thông tin tài khoản để tiếp tục</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-[20px]">
              {/* Email */}
              <div className="flex flex-col gap-[4px]">
                <label className="font-medium text-[15px] text-[#0D0D12] leading-[1.6]">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập địa chỉ email"
                  required
                  className="h-[42px] px-3 bg-white border border-[#E3E3E8] rounded-[10px] text-[15px] text-[#0D0D12] placeholder-[#A0A0A8] outline-none focus:border-[#3388FF] focus:ring-2 focus:ring-[#3388FF]/20 transition-all w-full"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-[4px]">
                <label className="font-medium text-[15px] text-[#0D0D12] leading-[1.6]">Mật khẩu</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    required
                    className="h-[42px] w-full px-3 pr-10 bg-white border-[1.5px] border-[#E3E3E8] rounded-[10px] text-[15px] text-[#0D0D12] placeholder-[#A0A0A8] outline-none focus:border-[#3388FF] focus:ring-2 focus:ring-[#3388FF]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center"
                  >
                    <img src={imgEyeHide} alt="toggle" className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" />
                  </button>
                </div>
                <div className="flex justify-end">
                  <button type="button" className="font-medium text-[13px] text-[#3388FF] leading-[1.6]">
                    Quên mật khẩu?
                  </button>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-[14px] text-red-500 bg-red-50 border border-red-100 rounded-[10px] px-3 py-2">{error}</p>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="h-[48px] w-full bg-[#3388FF] hover:bg-[#2277ee] disabled:bg-[#3388FF]/60 rounded-[8px] font-semibold text-[17px] text-white flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : "Đăng nhập"}
            </button>
          </form>


          {/* Demo hint */}
          <div className="px-3.5 py-3 bg-blue-50 rounded-[10px] border border-blue-100">
            <p className="text-[13px] text-blue-600 font-medium">Demo: Nhập bất kỳ email + mật khẩu ≥ 6 ký tự</p>
          </div>

          {/* Sign up */}
          <div className="flex items-center justify-center gap-1 font-medium text-[15px] leading-[1.6] text-center pt-1">
            <span className="text-[#55555E]">Chưa có tài khoản?</span>
            <span className="text-[#3388FF] underline cursor-pointer">Đăng ký</span>
          </div>
        </div>
      </div>
    </div>
  );
}
