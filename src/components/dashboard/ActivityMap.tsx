"use client";

const WEEKS = 18;
const DAYS = 7;

function getColor(val: number): string {
  if (val === 0) return "bg-gray-100";
  if (val < 3) return "bg-brand-100";
  if (val < 6) return "bg-brand-300";
  if (val < 9) return "bg-brand-500";
  return "bg-brand-700";
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export default function ActivityMap() {
  const data = Array.from({ length: WEEKS }, () =>
    Array.from({ length: DAYS }, () => Math.floor(Math.random() * 11))
  );

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 text-sm">Bản đồ hoạt động</h3>
        <select className="text-[13px] border border-gray-200 rounded-lg px-2 py-1 text-gray-600 outline-none focus:border-brand-400">
          <option>Tháng 3/2026</option>
          <option>Tháng 2/2026</option>
          <option>Tháng 1/2026</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-1">
          {data.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((val, di) => (
                <div
                  key={di}
                  title={`${val} sự kiện`}
                  className={`size-3.5 rounded-sm cursor-pointer hover:ring-2 hover:ring-brand-400 hover:ring-offset-1 transition-all ${getColor(val)}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {months.map((m) => (
            <span key={m} className="text-[13px] text-gray-400">{m}</span>
          ))}
        </div>
      </div>
      <p className="text-[13px] text-gray-400 mt-3">
        <span className="font-semibold text-gray-700">247</span> sự kiện trong 6 tháng qua
      </p>
    </div>
  );
}
