import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import api from "../api/axios";
import { DayStat } from "../types";

const WeeklyChart = () => {
  const [data, setData] = useState<DayStat[]>([]);

  useEffect(() => {
    api.get("/stats/days").then((res) => setData(res.data.days));
  }, []);

  return (
    <>
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-slate-200 font-semibold text-lg mb-6">
          📊 Ore ultimi 7 giorni
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="label" stroke="#94a3b8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} unit="h" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#f1f5f9" }}
              formatter={(value: unknown) => [`${value}h`, "Ore"]}
            />
            <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default WeeklyChart;
