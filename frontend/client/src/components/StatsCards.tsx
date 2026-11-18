import { useEffect, useState } from "react";
import api from "../api/axios";
import { Stats } from "../types";

export default function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get("/stats/me").then((res) => setStats(res.data));
  }, []);

  if (!stats) return null;

  const cards = [
    { label: "Oggi", value: stats.today, color: "text-indigo-400" },
    {
      label: "Questa settimana",
      value: stats.this_week,
      color: "text-emerald-400",
    },
    { label: "Questo mese", value: stats.this_month, color: "text-amber-400" },
    { label: "Totale", value: stats.total, color: "text-rose-400" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-slate-800 rounded-xl p-5 border border-slate-700"
        >
          <p className="text-slate-400 text-xs mb-1">{card.label}</p>
          <p className={`text-3xl font-bold ${card.color}`}>{card.value}h</p>
        </div>
      ))}
    </div>
  );
}
