import { TrendingUp, TrendingDown } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  subtitle: string;
  icon: ReactNode;
  iconBg: string;
}

export default function StatCard({ title, value, change, subtitle, icon, iconBg }: StatCardProps) {
  const isPositive = change >= 0;
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${iconBg}`}>{icon}</div>
        <span
          className={`flex items-center gap-1 text-[14px] font-semibold px-2 py-1 rounded-full ${
            isPositive ? "text-brand-700 bg-brand-50" : "text-red-600 bg-red-50"
          }`}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(change)}%
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-[14px] font-medium text-gray-500">{title}</p>
      <p className="text-[14px] text-gray-400 mt-2">{subtitle}</p>
    </div>
  );
}
