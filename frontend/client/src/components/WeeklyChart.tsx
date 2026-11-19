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

  return <div>WeeklyChart</div>;
};

export default WeeklyChart;
